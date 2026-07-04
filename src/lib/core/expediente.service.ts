/**
 * Expediente Service
 * Business logic layer for the Expediente aggregate
 * Based on: CF-026-EXPEDIENTE-DESIGN.md, CF-040-BUSINESS-POLICIES.md
 * 
 * Responsabilidades:
 * - Validación de reglas de negocio del expediente
 * - Machine de estados (transiciones controladas vía TRANSICIONES_ESTADO)
 * - Validación de invariantes
 * - Orquestación de operaciones del agregado
 * 
 * V1 MVP - Single tenant. Sin multitenant.
 * Preparado para migración a multitenant en V3.
 */

import { expedienteRepository } from '@/lib/core/expediente.repository';
import type {
  ExpedienteRow,
  CrearExpedienteInput,
  ActualizarExpedienteInput,
  ExpedienteFilter,
  ExpedienteDeleteResult,
  ExpedienteTransitionResult,
  EstadoExpediente,
} from '@/types/core/expediente';
import {
  ExpedienteValidationError,
  ExpedienteNotFoundError,
  ExpedienteConflictError,
  ExpedienteVersionConflictError,
  ExpedienteEstadoInvalidoError,
  esTransicionValida,
  TRANSICIONES_ESTADO,
} from '@/types/core/expediente';

// ============================================================
// Validation helpers
// ============================================================

/**
 * Patrón de número de expediente: EXP-YYYY-MM-NNNN
 * Ejemplo: EXP-2026-07-0001
 */
const NUMERO_EXPEDIENTE_PATTERN = /^EXP-\d{4}-\d{2}-\d{4}$/;

function validateNumeroExpediente(numero: string): void {
  if (!numero || numero.trim().length === 0) {
    throw new ExpedienteValidationError(
      'El número de expediente no puede estar vacío.'
    );
  }
  if (!NUMERO_EXPEDIENTE_PATTERN.test(numero.trim())) {
    throw new ExpedienteValidationError(
      'El número de expediente debe tener formato EXP-YYYY-MM-NNNN (ej: EXP-2026-07-0001).'
    );
  }
}

function validateClienteId(clienteId: string): void {
  if (!clienteId || clienteId.trim().length === 0) {
    throw new ExpedienteValidationError(
      'El ID del cliente es obligatorio.'
    );
  }
}

function validateEstado(estado: string): asserts estado is EstadoExpediente {
  const estadosValidos: EstadoExpediente[] = [
    'Solicitud', 'PteDocumentacion', 'EnRevisionPITR',
    'Auditado', 'RequiereRevisionManual', 'RevisionManual',
    'Aprobado', 'Rechazado', 'Entregado', 'Cancelado', 'Devuelto',
  ];
  if (!estadosValidos.includes(estado as EstadoExpediente)) {
    throw new ExpedienteValidationError(
      `Estado inválido: ${estado}. Valores permitidos: ${estadosValidos.join(', ')}.`
    );
  }
}

function validateTransition(
  estadoActual: EstadoExpediente | null,
  estadoNuevo: EstadoExpediente
): void {
  // Si es null (creación), solo permitir 'Solicitud'
  if (estadoActual === null) {
    if (estadoNuevo !== 'Solicitud') {
      throw new ExpedienteValidationError(
        `El estado inicial de un expediente debe ser 'Solicitud'. No puede ser '${estadoNuevo}'.`
      );
    }
    return;
  }

  // Validar que la transición es permitida
  if (!esTransicionValida(estadoActual, estadoNuevo)) {
    const permitidos = TRANSICIONES_ESTADO[estadoActual] ?? [];
    throw new ExpedienteEstadoInvalidoError(estadoActual, permitidos);
  }
}

function validateAuditUser(userId: string, fieldName: string): void {
  if (!userId || userId.trim().length === 0) {
    throw new ExpedienteValidationError(
      `El usuario (${fieldName}) es obligatorio para operaciones de auditoría.`
    );
  }
}

// ============================================================
// Service
// ============================================================

export class ExpedienteService {
  /**
   * Crear un nuevo expediente.
   * 
   * Reglas aplicadas:
   * - Estado inicial siempre 'Solicitud'
   * - Número de expediente con formato EXP-YYYY-MM-NNNN
   * - Cliente obligatorio
   */
  async crear(input: CrearExpedienteInput): Promise<ExpedienteRow> {
    // Validar campos requeridos
    validateNumeroExpediente(input.numero_expediente);
    validateClienteId(input.cliente_id);
    validateAuditUser(input.created_by, 'created_by');

    // Estado inicial: siempre Solicitud
    validateTransition(null, 'Solicitud');

    try {
      return await expedienteRepository.crear({
        ...input,
        estado: 'Solicitud',
        servicio: input.servicio ?? 'segunda_opinion',
        updated_by: input.created_by, // Mismo usuario para creación
      });
    } catch (error) {
      if (error instanceof ExpedienteValidationError) throw error;
      throw new Error(`Error al crear expediente: ${(error as Error).message}`, {
        cause: error,
      });
    }
  }

  /**
   * Buscar expediente por ID.
   * 
   * Soft delete: por defecto no devuelve expedientes eliminados.
   */
  async findById(id: string, includeDeleted = false): Promise<ExpedienteRow> {
    if (!id || id.trim().length === 0) {
      throw new ExpedienteValidationError('El ID del expediente es obligatorio.');
    }

    const expediente = await expedienteRepository.findById(id, includeDeleted);

    if (!expediente) {
      throw new ExpedienteNotFoundError(id);
    }

    return expediente;
  }

  /**
   * Buscar expediente por número de expediente.
   */
  async buscarPorNumero(numero: string): Promise<ExpedienteRow | null> {
    if (!numero || numero.trim().length === 0) {
      return null;
    }

    const results = await expedienteRepository.findMany({
      search: numero,
      include_deleted: false,
      limit: 1,
    });

    // Filter exact match on numero_expediente
    return results.find((r) => r.numero_expediente === numero) ?? null;
  }

  /**
   * Listar expedientes con filtros.
   * 
   * Paginación por defecto: 50 resultados, offset 0.
   */
  async findMany(filter: ExpedienteFilter = {}): Promise<ExpedienteRow[]> {
    return expedienteRepository.findMany(filter);
  }

  /**
   * Contar expedientes con filtros.
   */
  async count(filter: ExpedienteFilter = {}): Promise<number> {
    return expedienteRepository.count(filter);
  }

  /**
   * Actualizar un expediente.
   * 
   * Reglas aplicadas:
   * - Validación de transición de estado (máquina de estados)
   * - Optimistic locking vía version
   * - Trazabilidad: updated_by obligatorio
   */
  async actualizar(
    id: string,
    input: ActualizarExpedienteInput
  ): Promise<ExpedienteRow> {
    if (!id || id.trim().length === 0) {
      throw new ExpedienteValidationError('El ID del expediente es obligatorio.');
    }

    validateAuditUser(input.updated_by, 'updated_by');

    if (!input.version || input.version < 1) {
      throw new ExpedienteValidationError(
        'La versión es obligatoria para actualizar (optimistic locking).'
      );
    }

    // Si se está cambiando el estado, validar la transición
    if (input.estado !== undefined) {
      validateEstado(input.estado);

      // Obtener el estado actual para validar la transición
      const actual = await expedienteRepository.findById(id);
      if (!actual) {
        throw new ExpedienteNotFoundError(id);
      }

      validateTransition(actual.estado, input.estado);
    }

    const result = await expedienteRepository.actualizar(id, input);

    if (!result) {
      // Puede ser: no encontrado o conflicto de versión
      const existente = await expedienteRepository.findById(id);
      if (!existente) {
        throw new ExpedienteNotFoundError(id);
      }
      throw new ExpedienteVersionConflictError(id);
    }

    return result;
  }

  /**
   * Cambiar el estado de un expediente (máquina de estados).
   * 
   * Reglas aplicadas:
   * - Solo transiciones permitidas por TRANSICIONES_ESTADO
   * - Optimistic locking vía version
   */
  async cambiarEstado(
    id: string,
    nuevoEstado: EstadoExpediente,
    updatedBy: string,
    version: number
  ): Promise<ExpedienteTransitionResult> {
    if (!id || id.trim().length === 0) {
      throw new ExpedienteValidationError('El ID del expediente es obligatorio.');
    }

    validateEstado(nuevoEstado);
    validateAuditUser(updatedBy, 'updated_by');

    // Obtener expediente actual
    const actual = await expedienteRepository.findById(id);
    if (!actual) {
      throw new ExpedienteNotFoundError(id);
    }

    // Validar transición
    validateTransition(actual.estado, nuevoEstado);

    // Ejecutar actualización de estado
    const result = await expedienteRepository.actualizar(id, {
      estado: nuevoEstado,
      updated_by: updatedBy,
      version,
    });

    if (!result) {
      // Verificar si fue conflicto de versión
      const refreshed = await expedienteRepository.findById(id);
      if (!refreshed) {
        throw new ExpedienteNotFoundError(id);
      }
      if (refreshed.version !== version) {
        throw new ExpedienteVersionConflictError(id);
      }
      throw new ExpedienteConflictError(
        `No se pudo cambiar el estado a '${nuevoEstado}'. Inténtalo de nuevo.`
      );
    }

    return {
      success: true,
      estado_anterior: actual.estado,
      estado_nuevo: nuevoEstado,
      expediente: result,
    };
  }

  /**
   * Soft delete de un expediente.
   * 
   * Reglas aplicadas:
   * - Nunca se elimina físicamente (soft delete)
   * - Solo se permite si el expediente está en estado terminal
   *   (cerrado, rechazado, cancelado) o pendiente
   */
  async softDelete(id: string, deletedBy: string): Promise<ExpedienteDeleteResult> {
    if (!id || id.trim().length === 0) {
      throw new ExpedienteValidationError('El ID del expediente es obligatorio.');
    }
    validateAuditUser(deletedBy, 'deleted_by');

    // Verificar que el expediente existe
    const existente = await expedienteRepository.findById(id);
    if (!existente) {
      throw new ExpedienteNotFoundError(id);
    }

    // Solo permitir soft delete en estados terminales o pendiente
    const estadosPermitidosParaBorrar: EstadoExpediente[] = [
      'Solicitud', 'Rechazado', 'Cancelado',
    ];
    if (!estadosPermitidosParaBorrar.includes(existente.estado)) {
      throw new ExpedienteConflictError(
        `No se puede eliminar un expediente en estado '${existente.estado}'. ` +
        `Solo se permite en: ${estadosPermitidosParaBorrar.join(', ')}.`
      );
    }

    const result = await expedienteRepository.softDelete(id, deletedBy);

    if (!result) {
      throw new ExpedienteConflictError(
        'El expediente ya estaba eliminado o no se encontró.'
      );
    }

    return result;
  }

  /**
   * Iniciar revisión manual del expediente por el AT.
   * Transición: PteDocumentacion -> RevisionManual
   * 
   * El AT toma el expediente de la bandeja y comienza su análisis.
   */
  async iniciarRevision(
    id: string,
    updatedBy: string,
    version: number
  ): Promise<ExpedienteTransitionResult> {
    return this.cambiarEstado(id, 'RevisionManual', updatedBy, version);
  }

  /**
   * Aprobar expediente tras revisión manual del AT.
   * Transición: RevisionManual -> Aprobado
   * 
   * El AT finaliza su análisis y aprueba el resultado técnico.
   */
  async aprobarExpediente(
    id: string,
    updatedBy: string,
    version: number
  ): Promise<ExpedienteTransitionResult> {
    return this.cambiarEstado(id, 'Aprobado', updatedBy, version);
  }

  /**
   * Rechazar expediente tras revisión manual del AT.
   * Transición: RevisionManual -> Rechazado
   * 
   * El AT determina que el certificado no es válido y lo rechaza.
   */
  async rechazarExpediente(
    id: string,
    updatedBy: string,
    version: number
  ): Promise<ExpedienteTransitionResult> {
    return this.cambiarEstado(id, 'Rechazado', updatedBy, version);
  }

  /**
   * Restaurar un expediente eliminado (soft undelete).
   * Solo para administradores.
   */
  async restaurar(id: string, updatedBy: string): Promise<ExpedienteRow> {
    if (!id || id.trim().length === 0) {
      throw new ExpedienteValidationError('El ID del expediente es obligatorio.');
    }
    validateAuditUser(updatedBy, 'updated_by');

    const result = await expedienteRepository.restaurar(id, updatedBy);

    if (!result) {
      const existente = await expedienteRepository.findById(id, true);
      if (!existente) {
        throw new ExpedienteNotFoundError(id);
      }
      // Si existe pero no estaba eliminado
      if (existente.deleted_at === null) {
        throw new ExpedienteConflictError(
          'El expediente no está eliminado. No es necesario restaurarlo.'
        );
      }
      throw new ExpedienteConflictError(
        'No se pudo restaurar el expediente. Inténtalo de nuevo.'
      );
    }

    return result;
  }
}

// Singleton
export const expedienteService = new ExpedienteService();
/**
 * Documento IA Service
 * Business logic layer for the Documento IA aggregate
 * Based on: CF-020 Data Model §3.5, PROPUESTA-MODELO-MVP §5
 * EP-027: Documento IA — child aggregate of Expediente.
 *
 * Responsabilidades:
 * - Validación de reglas de negocio del documento
 * - Gestión del estado de procesamiento IA
 * - Validación de hash SHA-256 para integridad
 * - Validación de metadatos de archivo (tipo MIME, tamaño)
 * - Orquestación de operaciones del agregado
 *
 * V1 MVP - Single tenant. Sin multitenant.
 * Preparado para migración a multitenant en V3.
 */

import { documentoIARepository } from '@/lib/core/documento-ia.repository';
import type {
  DocumentoIARow,
  CrearDocumentoIAInput,
  ActualizarDocumentoIAInput,
  DocumentoIAFilter,
  DocumentoIADeleteResult,
  EstadoProcesamientoIA,
  RegistrarProcesamientoIAInput,
} from '@/types/core/documento-ia';
import {
  DocumentoIAValidationError,
  DocumentoIANotFoundError,
  DocumentoIAConflictError,
  DocumentoIAVersionConflictError,
} from '@/types/core/documento-ia';

// ============================================================
// Constants
// ============================================================

/**
 * Patrón para hash SHA-256: exactamente 64 caracteres hexadecimales
 */
const SHA256_PATTERN = /^[a-f0-9]{64}$/;

/**
 * MIME types permitidos para documentos en Certilab
 */
const MIME_TYPES_PERMITIDOS = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  'text/plain',
  'text/csv',
];

/**
 * Tipos de documento válidos
 */
const TIPOS_DOCUMENTO = [
  'CERTIFICADO_ORIGINAL',
  'DOCUMENTACION_COMPLEMENTARIA',
  'INFORME_FINAL',
  'INFORME_IA',
  'ANALISIS_IA',
  'FOTOGRAFIA',
  'OTRO',
] as const;

/**
 * Estados de procesamiento IA válidos
 */
const ESTADOS_IA = [
  'PENDIENTE',
  'EN_PROCESO',
  'COMPLETADO',
  'ERROR',
  'NO_APLICA',
] as const;

/**
 * Máximo tamaño de archivo: 50 MB
 */
const MAX_TAMANO_BYTES = 50 * 1024 * 1024;

/**
 * Máxima longitud para el nombre del archivo
 */
const MAX_NOMBRE_LENGTH = 255;

// ============================================================
// Validation helpers
// ============================================================

function validateTipoDocumento(tipo: string): asserts tipo is typeof TIPOS_DOCUMENTO[number] {
  if (!TIPOS_DOCUMENTO.includes(tipo as typeof TIPOS_DOCUMENTO[number])) {
    throw new DocumentoIAValidationError(
      `Tipo de documento inválido: ${tipo}. Valores permitidos: ${TIPOS_DOCUMENTO.join(', ')}.`
    );
  }
}

function validateEstadoIA(estado: string): asserts estado is EstadoProcesamientoIA {
  if (!ESTADOS_IA.includes(estado as EstadoProcesamientoIA)) {
    throw new DocumentoIAValidationError(
      `Estado de procesamiento IA inválido: ${estado}. Valores permitidos: ${ESTADOS_IA.join(', ')}.`
    );
  }
}

function validateHashSHA256(hash: string): void {
  if (!hash || hash.trim().length === 0) {
    throw new DocumentoIAValidationError(
      'El hash SHA-256 es obligatorio para verificar la integridad del documento.'
    );
  }
  if (!SHA256_PATTERN.test(hash.trim())) {
    throw new DocumentoIAValidationError(
      'El hash SHA-256 debe ser una cadena hexadecimal de exactamente 64 caracteres.'
    );
  }
}

function validateMimeType(mimeType: string): void {
  if (!mimeType || mimeType.trim().length === 0) {
    throw new DocumentoIAValidationError('El tipo MIME es obligatorio.');
  }
  if (!MIME_TYPES_PERMITIDOS.includes(mimeType)) {
    throw new DocumentoIAValidationError(
      `Tipo MIME no permitido: ${mimeType}. Permisibles: ${MIME_TYPES_PERMITIDOS.join(', ')}.`
    );
  }
}

function validateTamanoBytes(tamano: number): void {
  if (!Number.isInteger(tamano) || tamano <= 0) {
    throw new DocumentoIAValidationError(
      'El tamaño del archivo debe ser un número entero positivo mayor que 0.'
    );
  }
  if (tamano > MAX_TAMANO_BYTES) {
    throw new DocumentoIAValidationError(
      `El tamaño del archivo (${tamano} bytes) excede el máximo permitido de ${MAX_TAMANO_BYTES} bytes (50 MB).`
    );
  }
}

function validateNombre(nombre: string): void {
  if (!nombre || nombre.trim().length === 0) {
    throw new DocumentoIAValidationError('El nombre del documento es obligatorio.');
  }
  if (nombre.length > MAX_NOMBRE_LENGTH) {
    throw new DocumentoIAValidationError(
      `El nombre del documento no puede exceder ${MAX_NOMBRE_LENGTH} caracteres.`
    );
  }
}

function validateStoragePath(path: string): void {
  if (!path || path.trim().length === 0) {
    throw new DocumentoIAValidationError('La ruta de almacenamiento es obligatoria.');
  }
  // Formato esperado: {expediente_id}/{tipo}/{uuid}_{nombre}
  const parts = path.split('/');
  if (parts.length < 3) {
    throw new DocumentoIAValidationError(
      'La ruta de almacenamiento debe tener formato: {expediente_id}/{tipo}/{uuid}_{nombre}'
    );
  }
}

function validateExpedienteId(expedienteId: string): void {
  if (!expedienteId || expedienteId.trim().length === 0) {
    throw new DocumentoIAValidationError('El ID del expediente es obligatorio.');
  }
}

function validateAuditUser(userId: string, fieldName: string): void {
  if (!userId || userId.trim().length === 0) {
    throw new DocumentoIAValidationError(
      `El usuario (${fieldName}) es obligatorio para operaciones de auditoría.`
    );
  }
}

function validateVersion(version: number | undefined): void {
  if (!version || version < 1) {
    throw new DocumentoIAValidationError(
      'La versión es obligatoria para actualizar (optimistic locking).'
    );
  }
}

// ============================================================
// Service
// ============================================================

export class DocumentoIAService {
  /**
   * Crear un nuevo documento IA.
   *
   * Reglas aplicadas:
   * - Expediente obligatorio
   * - Tipo de documento válido
   * - Nombre obligatorio (máx. 255 caracteres)
   * - MIME type permitido
   * - Tamaño > 0 y ≤ 50 MB
   * - Hash SHA-256 válido
   * - Storage path con formato correcto
   * - Estado IA por defecto: NO_APLICA
   */
  async crear(input: CrearDocumentoIAInput): Promise<DocumentoIARow> {
    // Validar campos requeridos
    validateExpedienteId(input.expediente_id);
    validateTipoDocumento(input.tipo);
    validateNombre(input.nombre);
    validateMimeType(input.mime_type);
    validateTamanoBytes(input.tamano_bytes);
    validateHashSHA256(input.hash_sha256);
    validateStoragePath(input.storage_path);
    validateAuditUser(input.created_by, 'created_by');

    // Validar estado IA si se proporciona
    if (input.estado_ia) {
      validateEstadoIA(input.estado_ia);
    }

    try {
      return await documentoIARepository.crear({
        ...input,
        updated_by: input.created_by, // Mismo usuario para creación
      });
    } catch (error) {
      if (error instanceof DocumentoIAValidationError) throw error;
      if (error instanceof Error && error.message.includes('duplicate key')) {
        throw new DocumentoIAConflictError(
          'Ya existe un documento con el mismo hash SHA-256 en este expediente. ' +
          'No se permiten documentos duplicados.'
        );
      }
      throw new Error(`Error al crear documento IA: ${(error as Error).message}`, {
        cause: error,
      });
    }
  }

  /**
   * Buscar documento IA por ID.
   *
   * Soft delete: por defecto no devuelve documentos eliminados.
   */
  async findById(id: string, includeDeleted = false): Promise<DocumentoIARow> {
    if (!id || id.trim().length === 0) {
      throw new DocumentoIAValidationError('El ID del documento es obligatorio.');
    }

    const documento = await documentoIARepository.findById(id, includeDeleted);

    if (!documento) {
      throw new DocumentoIANotFoundError(id);
    }

    return documento;
  }

  /**
   * Listar documentos IA con filtros.
   *
   * Paginación por defecto: 50 resultados, offset 0.
   */
  async findMany(filter: DocumentoIAFilter = {}): Promise<DocumentoIARow[]> {
    return documentoIARepository.findMany(filter);
  }

  /**
   * Listar documentos de un expediente específico.
   * Método de conveniencia sobre findMany.
   */
  async listarPorExpediente(
    expedienteId: string,
    filter: Omit<DocumentoIAFilter, 'expediente_id'> = {}
  ): Promise<DocumentoIARow[]> {
    validateExpedienteId(expedienteId);
    return documentoIARepository.findMany({
      ...filter,
      expediente_id: expedienteId,
    });
  }

  /**
   * Contar documentos IA con filtros.
   */
  async count(filter: DocumentoIAFilter = {}): Promise<number> {
    return documentoIARepository.count(filter);
  }

  /**
   * Actualizar un documento IA.
   *
   * Reglas aplicadas:
   * - Optimistic locking vía version
   * - Trazabilidad: updated_by obligatorio
   * - Validación de campos actualizados
   */
  async actualizar(
    id: string,
    input: ActualizarDocumentoIAInput
  ): Promise<DocumentoIARow> {
    if (!id || id.trim().length === 0) {
      throw new DocumentoIAValidationError('El ID del documento es obligatorio.');
    }

    validateAuditUser(input.updated_by, 'updated_by');
    validateVersion(input.version);

    // Validar campos si se proporcionan
    if (input.tipo !== undefined) {
      validateTipoDocumento(input.tipo);
    }
    if (input.nombre !== undefined) {
      validateNombre(input.nombre);
    }
    if (input.mime_type !== undefined) {
      validateMimeType(input.mime_type);
    }
    if (input.tamano_bytes !== undefined) {
      validateTamanoBytes(input.tamano_bytes);
    }
    if (input.hash_sha256 !== undefined) {
      validateHashSHA256(input.hash_sha256);
    }
    if (input.estado_ia !== undefined) {
      validateEstadoIA(input.estado_ia);
    }

    const result = await documentoIARepository.actualizar(id, input);

    if (!result) {
      // Puede ser: no encontrado o conflicto de versión
      const existente = await documentoIARepository.findById(id);
      if (!existente) {
        throw new DocumentoIANotFoundError(id);
      }
      throw new DocumentoIAVersionConflictError(id);
    }

    return result;
  }

  /**
   * Registrar resultado de procesamiento IA en un documento.
   *
   * Reglas aplicadas:
   * - El documento debe existir y no estar eliminado
   * - El estado IA debe ser válido
   * - Los metadatos IA son obligatorios cuando estado ≠ NO_APLICA
   * - Optimistic locking vía version
   */
  async registrarProcesamientoIA(
    id: string,
    input: RegistrarProcesamientoIAInput
  ): Promise<DocumentoIARow> {
    if (!id || id.trim().length === 0) {
      throw new DocumentoIAValidationError('El ID del documento es obligatorio.');
    }

    validateEstadoIA(input.estado_ia);
    validateAuditUser(input.updated_by, 'updated_by');
    validateVersion(input.version);

    // Verificar que el documento existe
    const existente = await documentoIARepository.findById(id);
    if (!existente) {
      throw new DocumentoIANotFoundError(id);
    }

    // Si estado_ia es distinto de NO_APLICA, metadata_ia es obligatorio
    if (input.estado_ia !== 'NO_APLICA' && !input.metadata_ia) {
      throw new DocumentoIAValidationError(
        'Los metadatos IA son obligatorios cuando el estado de procesamiento no es NO_APLICA.'
      );
    }

    const result = await documentoIARepository.actualizar(id, {
      estado_ia: input.estado_ia,
      metadata_ia: input.metadata_ia,
      updated_by: input.updated_by,
      version: input.version,
    });

    if (!result) {
      const refreshed = await documentoIARepository.findById(id);
      if (!refreshed) {
        throw new DocumentoIANotFoundError(id);
      }
      if (refreshed.version !== input.version) {
        throw new DocumentoIAVersionConflictError(id);
      }
      throw new DocumentoIAConflictError(
        `No se pudo registrar el procesamiento IA. Inténtalo de nuevo.`
      );
    }

    return result;
  }

  /**
   * Soft delete de un documento IA.
   *
   * Reglas aplicadas:
   * - Nunca se elimina físicamente (soft delete)
   * - Trazabilidad: deleted_by obligatorio
   */
  async softDelete(id: string, deletedBy: string): Promise<DocumentoIADeleteResult> {
    if (!id || id.trim().length === 0) {
      throw new DocumentoIAValidationError('El ID del documento es obligatorio.');
    }
    validateAuditUser(deletedBy, 'deleted_by');

    // Verificar que el documento existe
    const existente = await documentoIARepository.findById(id);
    if (!existente) {
      throw new DocumentoIANotFoundError(id);
    }

    const result = await documentoIARepository.softDelete(id, deletedBy);

    if (!result) {
      throw new DocumentoIAConflictError(
        'El documento ya estaba eliminado o no se encontró.'
      );
    }

    return result;
  }

  /**
   * Restaurar un documento eliminado (soft undelete).
   * Solo para administradores.
   */
  async restaurar(id: string, updatedBy: string): Promise<DocumentoIARow> {
    if (!id || id.trim().length === 0) {
      throw new DocumentoIAValidationError('El ID del documento es obligatorio.');
    }
    validateAuditUser(updatedBy, 'updated_by');

    const result = await documentoIARepository.restaurar(id, updatedBy);

    if (!result) {
      const existente = await documentoIARepository.findById(id, true);
      if (!existente) {
        throw new DocumentoIANotFoundError(id);
      }
      if (existente.deleted_at === null) {
        throw new DocumentoIAConflictError(
          'El documento no está eliminado. No es necesario restaurarlo.'
        );
      }
      throw new DocumentoIAConflictError(
        'No se pudo restaurar el documento. Inténtalo de nuevo.'
      );
    }

    return result;
  }
}

// Singleton
export const documentoIAService = new DocumentoIAService();
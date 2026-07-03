/**
 * Inmueble Service
 * Business logic layer for the Inmueble aggregate
 * Based on: CF-025-INMUEBLE-DESIGN.md
 * 
 * Responsabilidades:
 * - Validación de reglas de negocio (R-CR-01..04, R-AC-01..04)
 * - Deduplicación automática por referencia catastral (R-CR-03)
 * - Validación de invariantes (I-IN-01..18)
 * - Orquestación de operaciones del agregado
 * 
 * V1 MVP - Single tenant. Sin multitenant.
 * Preparado para migración a multitenant en V3.
 */

import { inmuebleRepository } from '@/lib/core/inmueble.repository';
import type {
  InmuebleRow,
  CrearInmuebleInput,
  ActualizarInmuebleInput,
  InmuebleFilter,
  InmuebleDeleteResult,
} from '@/types/core/inmueble';

// ============================================================
// Tipos de error específicos del dominio
// ============================================================

export class InmuebleValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InmuebleValidationError';
  }
}

export class InmuebleNotFoundError extends Error {
  constructor(id: string) {
    super(`Inmueble no encontrado: ${id}`);
    this.name = 'InmuebleNotFoundError';
  }
}

export class InmuebleConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InmuebleConflictError';
  }
}

export class InmuebleVersionConflictError extends Error {
  constructor(id: string) {
    super(`Conflicto de versión al actualizar inmueble ${id}. Recarga los datos e inténtalo de nuevo.`);
    this.name = 'InmuebleVersionConflictError';
  }
}

// ============================================================
// Validation helpers
// ============================================================

/**
 * Patrón de referencia catastral española:
 * 20 caracteres alfanuméricos: 7 dígitos (parcela) + 1 letra (control) +
 * 2 dígitos (provincia) + 5 dígitos (municipio) + 1 letra (control) +
 * 4 dígitos (código del inmueble)
 * Formato simplificado para V1: 14-20 caracteres alfanuméricos
 */
const REFCAT_PATTERN = /^[A-Za-z0-9]{14,20}$/;

function validateReferenciaCatastral(refcat: string): void {
  if (!refcat || refcat.trim().length === 0) {
    throw new InmuebleValidationError(
      'La referencia catastral no puede estar vacía.'
    );
  }
  if (!REFCAT_PATTERN.test(refcat)) {
    throw new InmuebleValidationError(
      'La referencia catastral debe tener entre 14 y 20 caracteres alfanuméricos.'
    );
  }
}

function validateDireccion(direccion: string): void {
  if (!direccion || direccion.trim().length === 0) {
    throw new InmuebleValidationError('La dirección es obligatoria.');
  }
  if (direccion.trim().length < 5) {
    throw new InmuebleValidationError(
      'La dirección debe tener al menos 5 caracteres (vía y número).'
    );
  }
}

function validateMunicipio(municipio: string): void {
  if (!municipio || municipio.trim().length === 0) {
    throw new InmuebleValidationError('El municipio es obligatorio.');
  }
}

function validateProvincia(provincia: string): void {
  if (!provincia || provincia.trim().length === 0) {
    throw new InmuebleValidationError('La provincia es obligatoria.');
  }
}

function validateCodigoPostal(cp: string): void {
  if (!cp || cp.trim().length === 0) {
    throw new InmuebleValidationError('El código postal es obligatorio.');
  }
  // Formato español: 5 dígitos
  if (!/^\d{5}$/.test(cp.trim())) {
    throw new InmuebleValidationError(
      'El código postal debe tener 5 dígitos numéricos.'
    );
  }
}

function validateAnoConstruccion(ano: number | undefined | null): void {
  if (ano === undefined || ano === null) return;
  const currentYear = new Date().getFullYear();
  if (ano < 1500) {
    throw new InmuebleValidationError(
      `El año de construcción (${ano}) es anterior a 1500. No es válido.`
    );
  }
  if (ano > currentYear + 1) {
    throw new InmuebleValidationError(
      `El año de construcción (${ano}) no puede ser posterior a ${currentYear + 1}.`
    );
  }
}

function validateSuperficieConstruida(
  superficie: number | undefined | null
): void {
  if (superficie === undefined || superficie === null) return;
  if (superficie <= 0) {
    throw new InmuebleValidationError(
      'La superficie construida debe ser un número positivo.'
    );
  }
  if (superficie > 100000) {
    throw new InmuebleValidationError(
      'La superficie construida no puede superar los 100.000 m².'
    );
  }
}

function validateSuperficieUtil(superficie: number | undefined | null): void {
  if (superficie === undefined || superficie === null) return;
  if (superficie <= 0) {
    throw new InmuebleValidationError(
      'La superficie útil debe ser un número positivo.'
    );
  }
}

function validateNumeroPlantas(plantas: number | undefined | null): void {
  if (plantas === undefined || plantas === null) return;
  if (!Number.isInteger(plantas) || plantas < 1) {
    throw new InmuebleValidationError(
      'El número de plantas debe ser un entero positivo mayor o igual a 1.'
    );
  }
}

function validateAlturaLibre(altura: number | undefined | null): void {
  if (altura === undefined || altura === null) return;
  if (altura <= 0) {
    throw new InmuebleValidationError(
      'La altura libre debe ser un número positivo.'
    );
  }
}

function validateCertificadoLetra(letra: string | undefined | null): void {
  if (letra === undefined || letra === null) return;
  const letrasValidas = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  if (!letrasValidas.includes(letra.toUpperCase())) {
    throw new InmuebleValidationError(
      `La letra del certificado debe ser una de: ${letrasValidas.join(', ')}.`
    );
  }
}

function validateCertificadoConsumo(consumo: number | undefined | null): void {
  if (consumo === undefined || consumo === null) return;
  if (consumo < 0) {
    throw new InmuebleValidationError(
      'El consumo energético no puede ser negativo.'
    );
  }
}

function validateCertificadoEmisiones(
  emisiones: number | undefined | null
): void {
  if (emisiones === undefined || emisiones === null) return;
  if (emisiones < 0) {
    throw new InmuebleValidationError(
      'Las emisiones no pueden ser negativas.'
    );
  }
}

function validateCoordenadas(
  latitud: number | undefined | null,
  longitud: number | undefined | null
): void {
  if (latitud === undefined || latitud === null) return;
  if (latitud < -90 || latitud > 90) {
    throw new InmuebleValidationError(
      'La latitud debe estar entre -90 y 90.'
    );
  }
  if (longitud === undefined || longitud === null) return;
  if (longitud < -180 || longitud > 180) {
    throw new InmuebleValidationError(
      'La longitud debe estar entre -180 y 180.'
    );
  }
}

// ============================================================
// Service
// ============================================================

export class InmuebleService {
  /**
   * Crear un nuevo inmueble.
   * 
   * Reglas aplicadas:
   * - R-CR-01: Cualquier usuario autenticado puede crear
   * - R-CR-02: Validación de formato de referencia catastral
   * - R-CR-03: Deduplicación automática por referencia catastral
   * - R-CR-04: Creación mínima (refcat + dirección)
   * - I-IN-01 a I-IN-18: Validación de invariantes
   */
  async crear(input: CrearInmuebleInput): Promise<InmuebleRow> {
    // Validar campos requeridos
    validateDireccion(input.direccion);
    validateMunicipio(input.municipio);
    validateProvincia(input.provincia);
    validateCodigoPostal(input.codigo_postal);

    // Validar referencia catastral si se proporciona
    if (input.referencia_catastral) {
      validateReferenciaCatastral(input.referencia_catastral);

      // R-CR-03: Deduplicación automática
      const existente = await this.buscarPorReferenciaCatastral(
        input.referencia_catastral
      );
      if (existente) {
        return existente;
      }
    }

    // Validar campos opcionales
    validateAnoConstruccion(input.ano_construccion);
    validateSuperficieConstruida(input.superficie_construida);
    validateSuperficieUtil(input.superficie_util);
    validateNumeroPlantas(input.numero_plantas);
    validateAlturaLibre(input.altura_libre);
    validateCertificadoLetra(input.certificado_letra);
    validateCertificadoConsumo(input.certificado_consumo);
    validateCertificadoEmisiones(input.certificado_emisiones);
    validateCoordenadas(input.latitud, input.longitud);

    try {
      return await inmuebleRepository.crear(input);
    } catch (error) {
      if (error instanceof InmuebleValidationError) throw error;
      throw new Error(`Error al crear inmueble: ${(error as Error).message}`, {
        cause: error,
      });
    }
  }

  /**
   * Buscar inmueble por ID.
   * 
   * Reglas aplicadas:
   * - R-CO-01: Consulta pública de datos básicos
   * - I-IN-16: Soft delete - no se devuelven inmuebles eliminados por defecto
   */
  async findById(id: string, includeDeleted = false): Promise<InmuebleRow> {
    if (!id || id.trim().length === 0) {
      throw new InmuebleValidationError('El ID del inmueble es obligatorio.');
    }

    const inmueble = await inmuebleRepository.findById(id, includeDeleted);

    if (!inmueble) {
      throw new InmuebleNotFoundError(id);
    }

    return inmueble;
  }

  /**
   * Buscar inmueble por referencia catastral.
   * Único por diseño (I-IN-01).
   */
  async buscarPorReferenciaCatastral(
    refcat: string
  ): Promise<InmuebleRow | null> {
    if (!refcat || refcat.trim().length === 0) {
      return null;
    }

    const results = await inmuebleRepository.findMany({
      search: refcat,
      include_deleted: false,
      limit: 1,
    });

    // Filter exact match on referencia_catastral (search is ILIKE)
    return results.find((r) => r.referencia_catastral === refcat) ?? null;
  }

  /**
   * Listar inmuebles con filtros.
   * 
   * Paginación por defecto: 50 resultados, offset 0.
   */
  async findMany(filter: InmuebleFilter = {}): Promise<InmuebleRow[]> {
    return inmuebleRepository.findMany(filter);
  }

  /**
   * Contar inmuebles con filtros.
   */
  async count(filter: InmuebleFilter = {}): Promise<number> {
    return inmuebleRepository.count(filter);
  }

  /**
   * Actualizar un inmueble.
   * 
   * Reglas aplicadas:
   * - R-AC-01: Quién puede actualizar (validación de permisos delegada a RLS)
   * - R-AC-02: Trazabilidad - updated_by es obligatorio
   * - I-IN-03: Identidad inmutable - no se permite cambiar referencia catastral
   * - Optimistic locking vía version
   */
  async actualizar(
    id: string,
    input: ActualizarInmuebleInput
  ): Promise<InmuebleRow> {
    if (!id || id.trim().length === 0) {
      throw new InmuebleValidationError('El ID del inmueble es obligatorio.');
    }

    // I-IN-03: La referencia catastral no se puede modificar
    if (input.referencia_catastral !== undefined) {
      // Si es null, se permite (borrar refcat). Si tiene valor, validar.
      if (input.referencia_catastral !== null) {
        throw new InmuebleValidationError(
          'La referencia catastral no se puede modificar. ' +
          'Si necesitas corregirla, desactiva el inmueble y crea uno nuevo.'
        );
      }
    }

    // Validar campos opcionales
    if (input.direccion !== undefined) validateDireccion(input.direccion);
    if (input.municipio !== undefined) validateMunicipio(input.municipio);
    if (input.provincia !== undefined) validateProvincia(input.provincia);
    if (input.codigo_postal !== undefined) validateCodigoPostal(input.codigo_postal);
    validateAnoConstruccion(input.ano_construccion);
    validateSuperficieConstruida(input.superficie_construida);
    validateSuperficieUtil(input.superficie_util);
    validateNumeroPlantas(input.numero_plantas);
    validateAlturaLibre(input.altura_libre);
    validateCertificadoLetra(input.certificado_letra);
    validateCertificadoConsumo(input.certificado_consumo);
    validateCertificadoEmisiones(input.certificado_emisiones);
    validateCoordenadas(input.latitud, input.longitud);

    const result = await inmuebleRepository.actualizar(id, input);

    if (!result) {
      // Puede ser: no encontrado o conflicto de versión
      const existente = await inmuebleRepository.findById(id);
      if (!existente) {
        throw new InmuebleNotFoundError(id);
      }
      throw new InmuebleVersionConflictError(id);
    }

    return result;
  }

  /**
   * Soft delete de un inmueble.
   * 
   * Reglas aplicadas:
   * - I-IN-16: Nunca se elimina físicamente
   * - I-IN-17: No se permite si hay expedientes activos (delegado a aplicación)
   */
  async softDelete(id: string, deletedBy: string): Promise<InmuebleDeleteResult> {
    if (!id || id.trim().length === 0) {
      throw new InmuebleValidationError('El ID del inmueble es obligatorio.');
    }
    if (!deletedBy || deletedBy.trim().length === 0) {
      throw new InmuebleValidationError(
        'El usuario que elimina es obligatorio.'
      );
    }

    // Verificar que el inmueble existe
    const existente = await inmuebleRepository.findById(id);
    if (!existente) {
      throw new InmuebleNotFoundError(id);
    }

    const result = await inmuebleRepository.softDelete(id, deletedBy);

    if (!result) {
      throw new InmuebleConflictError(
        'El inmueble ya estaba eliminado o no se encontró.'
      );
    }

    return result;
  }

  /**
   * Restaurar un inmueble eliminado (soft undelete).
   * Solo para administradores.
   */
  async restaurar(id: string, updatedBy: string): Promise<InmuebleRow> {
    if (!id || id.trim().length === 0) {
      throw new InmuebleValidationError('El ID del inmueble es obligatorio.');
    }
    if (!updatedBy || updatedBy.trim().length === 0) {
      throw new InmuebleValidationError(
        'El usuario que restaura es obligatorio.'
      );
    }

    const result = await inmuebleRepository.restaurar(id, updatedBy);

    if (!result) {
      const existente = await inmuebleRepository.findById(id, true);
      if (!existente) {
        throw new InmuebleNotFoundError(id);
      }
      // Si existe pero no estaba eliminado, o es conflicto
      if (existente.deleted_at === null) {
        throw new InmuebleConflictError(
          'El inmueble no está eliminado. No es necesario restaurarlo.'
        );
      }
      throw new InmuebleConflictError(
        'No se pudo restaurar el inmueble. Inténtalo de nuevo.'
      );
    }

    return result;
  }
}

// Singleton
export const inmuebleService = new InmuebleService();
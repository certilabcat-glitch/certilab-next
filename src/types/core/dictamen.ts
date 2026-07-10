/**
 * Core domain types for Dictamen (Technical Opinion)
 * Based on: S1-T02-ARQUITECTURA-DISENO.md, CF-026-EXPEDIENTE-DESIGN.md
 *
 * El Dictamen es un documento derivado del Diagnóstico.
 * Es un Value Object inmutable dentro del agregado Expediente.
 * Se genera por transformación del DiagnosticoCompleto en el momento de la emisión.
 *
 * Regla de dominio: Un dictamen emitido nunca se modifica.
 * Si es necesario corregirlo, se emitirá un nuevo dictamen conservando la trazabilidad.
 *
 * V1 MVP - Single tenant. Sin multitenant.
 */

import type {
  VeredictoGlobal,
  NivelConfianza,
  CategoriaProblema,
  VeredictoRetorno,
} from './diagnostico';

// ============================================================
// Enums & Literal Types
// ============================================================

/**
 * Estados del ciclo de vida de un dictamen
 */
export type EstadoDictamen = 'NoEmitido' | 'Emitido' | 'Entregado';

// ============================================================
// Tipos de Error
// ============================================================

export class DictamenValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DictamenValidationError';
  }
}

export class DictamenNotFoundError extends Error {
  constructor(expedienteId: string) {
    super(`Dictamen no encontrado para expediente: ${expedienteId}`);
    this.name = 'DictamenNotFoundError';
  }
}

export class DictamenAlreadyEmittedError extends Error {
  constructor(expedienteId: string) {
    super(`El dictamen ya ha sido emitido para el expediente: ${expedienteId}`);
    this.name = 'DictamenAlreadyEmittedError';
  }
}

export class DictamenNotEmittedError extends Error {
  constructor(expedienteId: string) {
    super(`El dictamen no ha sido emitido para el expediente: ${expedienteId}`);
    this.name = 'DictamenNotEmittedError';
  }
}

// ============================================================
// DictamenTecnico — Value Object
// ============================================================

/**
 * DictamenTecnico — Documento derivado del diagnóstico.
 *
 * Es un Value Object inmutable dentro del agregado Expediente.
 * Se genera por transformación del DiagnosticoCompleto en el momento de la emisión.
 *
 * Contiene dos partes:
 *   1. diagnostico_base: base inmutable del diagnóstico en el momento de la emisión.
 *   2. Metadatos de emisión, entrega y versionado.
 *
 * Regla de dominio: Un dictamen emitido nunca se modifica.
 */
export type DecisionDictamen = 'conforme' | 'no_conforme' | 'pendiente';

export interface DictamenTecnico {
  // Contenido textual emitido por el AT (no puede ser vacío)
  contenido: string;
  // Decisión técnica del AT
  decision: DecisionDictamen;
  // Observaciones opcionales del AT
  observaciones?: string;

  // Base inmutable extraída del diagnóstico completo (S1-T01)
  diagnostico_base: {
    veredicto: VeredictoGlobal;
    nivel_confianza: NivelConfianza;
    resumen: string;
    problemas: Array<{
      nombre: string;
      categoria: CategoriaProblema;
      descripcion: string;
      por_que_importa: string;
      si_no_actuas: string;
      nivel_confianza: NivelConfianza;
    }>;
    actuaciones: Array<{
      nombre: string;
      descripcion: string;
      inversion_estimada: number;
      ahorro_anual: number;
      veredicto: VeredictoRetorno;
      payback: number;
      justificacion_posicion: string;
      nivel_confianza_ahorro: NivelConfianza;
      vida_util: number;
      veredicto_detalle: string;
      notas_at?: string;
    }>;
    ahorro_total: number;
    coste_actual: number;
    coste_tras_mejoras: number;
    coste_inaccion_1a: number;
    coste_inaccion_5a: number;
    coste_inaccion_10a: number;
    impacto_reventa: string;
    riesgo_regulatorio: string;
    observaciones_at: string;
  };

  // Metadatos de emisión
  emitido_por: string; // userId del AT
  emitido_en: string; // ISO timestamp
  version: number; // Versionado (1, 2, ...)

  // Estado de entrega (populado tras entregar al cliente)
  entregado_a?: string; // cliente_id
  entregado_en?: string; // ISO timestamp
}

// ============================================================
// Input Types
// ============================================================

/**
 * Input type for emitting a dictamen
 */
export interface EmitirDictamenInput {
  expedienteId: string;
  userId: string; // AT que emite
}

/**
 * Input type for delivering a dictamen
 */
export interface EntregarDictamenInput {
  expedienteId: string;
  userId: string; // AT que entrega
}

// ============================================================
// Result Types
// ============================================================

/**
 * Result type for emitting a dictamen
 */
export interface EmitirDictamenResult {
  success: boolean;
  error?: string;
  dictamen?: DictamenTecnico;
  newVersion?: number;
}

/**
 * Result type for delivering a dictamen
 */
export interface EntregarDictamenResult {
  success: boolean;
  error?: string;
  entregado?: boolean;
  entregado_en?: string;
}

/**
 * Result type for obtaining a dictamen
 */
export interface ObtenerDictamenResult {
  success: boolean;
  error?: string;
  dictamen?: DictamenTecnico | null;
  estado?: EstadoDictamen;
}

// ============================================================
// Validación del dictamen
// ============================================================

export interface ValidacionDictamen {
  valido: boolean;
  errores: string[];
}

/**
 * Valida que un dictamen sea coherente
 */
export function validarDictamen(d: Partial<DictamenTecnico>): ValidacionDictamen {
  const errores: string[] = [];

  if (!d.diagnostico_base) {
    errores.push('El diagnóstico base es obligatorio.');
    return { valido: false, errores };
  }

  const base = d.diagnostico_base;

  // Veredicto obligatorio
  if (!base.veredicto) {
    errores.push('El veredicto global es obligatorio.');
  }

  // Nivel de confianza obligatorio
  if (!base.nivel_confianza) {
    errores.push('El nivel de confianza es obligatorio.');
  }

  // Resumen obligatorio
  if (!base.resumen || base.resumen.trim().length < 10) {
    errores.push('El resumen debe tener al menos 10 caracteres.');
  }

  // Problemas: al menos 1
  if (!base.problemas || base.problemas.length === 0) {
    errores.push('Debe haber al menos un problema identificado.');
  }

  // Actuaciones: al menos 1
  if (!base.actuaciones || base.actuaciones.length === 0) {
    errores.push('Debe haber al menos una actuación propuesta.');
  }

  // Metadatos de emisión
  if (!d.emitido_por) {
    errores.push('El usuario que emite es obligatorio.');
  }

  if (!d.emitido_en) {
    errores.push('La fecha de emisión es obligatoria.');
  }

  if (d.version == null || d.version < 1) {
    errores.push('La versión debe ser un número positivo.');
  }

  return { valido: errores.length === 0, errores };
}

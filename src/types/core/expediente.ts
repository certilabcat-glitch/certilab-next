/**
 * Core domain types for Expediente entity
 * Based on: CF-020 Data Model §3.5, CF-026-EXPEDIENTE-DESIGN.md §6, CF-028-EXPEDIENTE-WORKFLOW.md §4
 *
 * El Expediente es el agregado raíz del sistema de Certilab.
 * Representa una solicitud de servicio de segunda opinión sobre
 * un certificado energético.
 *
 * Estados canónicos del dominio (CF-026 §6.1):
 * - Solicitud (SOL): Estado inicial. Expediente creado, pendiente de documentación.
 * - PteDocumentacion (PDOC): Se espera certificado original y evidencias.
 * - EnRevisionPITR (PITR): Motor PITR procesando automáticamente.
 * - Auditado (AUD): PITR completado. Pendiente revisión AT.
 * - RequiereRevisionManual (RRM): PITR determinó intervención humana.
 * - RevisionManual (RM): AT revisando el expediente.
 * - Aprobado (AP): AT validó el resultado. Pendiente de entrega.
 * - Rechazado (REC): AT rechazó el certificado original.
 * - Entregado (ENT): Certificado auditado entregado.
 * - Cancelado (CAN): Expediente cancelado.
 * - Devuelto (DEV): Certificado devuelto al cliente para correcciones.
 *
 * V1 MVP - Single tenant. Sin multitenant.
 */

// ============================================================
// Enums & Literal Types
// ============================================================

/**
 * Estados del ciclo de vida de un expediente (CF-026 §6.1)
 * Nomenclatura canónica del dominio.
 */
export type EstadoExpediente =
  | 'Solicitud'
  | 'PteDocumentacion'
  | 'EnRevisionPITR'
  | 'Auditado'
  | 'RequiereRevisionManual'
  | 'RevisionManual'
  | 'Aprobado'
  | 'Rechazado'
  | 'Entregado'
  | 'DictamenEmitido'
  | 'DictamenEntregado'
  | 'Cancelado'
  | 'Devuelto';

/**
 * Tipos de servicio ofrecidos
 */
export type TipoServicio =
  | 'segunda_opinion'
  | 'certificacion'
  | 'revision'
  | 'consulta';

/**
 * Estados de pago
 */
export type EstadoPago =
  | 'pendiente'
  | 'procesando'
  | 'completado'
  | 'reembolsado'
  | 'fallido';

// ============================================================
// Tipos de Error
// ============================================================

export class ExpedienteValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExpedienteValidationError';
  }
}

export class ExpedienteNotFoundError extends Error {
  constructor(id: string) {
    super(`Expediente no encontrado: ${id}`);
    this.name = 'ExpedienteNotFoundError';
  }
}

export class ExpedienteConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExpedienteConflictError';
  }
}

export class ExpedienteVersionConflictError extends Error {
  constructor(id: string) {
    super(`Conflicto de versión al actualizar expediente ${id}. Recarga los datos e inténtalo de nuevo.`);
    this.name = 'ExpedienteVersionConflictError';
  }
}

export class ExpedienteEstadoInvalidoError extends Error {
  constructor(actual: string, esperado: string[]) {
    super(`Estado inválido del expediente: ${actual}. Se esperaba: ${esperado.join(', ')}.`);
    this.name = 'ExpedienteEstadoInvalidoError';
  }
}

// ============================================================
// Database Row (1:1 con core.expediente)
// ============================================================

/**
 * Database row representation of core.expediente
 * Maps 1:1 with the Supabase table
 */
export interface ExpedienteRow {
  id: string; // UUID v7
  numero_expediente: string; // EXP-YYYY-NNNNNN
  cliente_id: string; // UUID
  inmueble_id: string | null; // UUID opcional
  estado: EstadoExpediente;
  servicio: string; // TipoServicio
  titulo: string | null;
  notas: string | null;

  // Diagnóstico (S1-T01) y Dictamen (S1-T02) como JSONB
  diagnostico?: unknown;
  dictamen?: unknown;

  // Auditoría (V1 core pattern)
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  deleted_at: string | null;
  deleted_by: string | null;
  version: number;
}

// ============================================================
// Input Types
// ============================================================

/**
 * Input type for creating a new Expediente
 */
export interface CrearExpedienteInput {
  numero_expediente: string;
  cliente_id: string;
  inmueble_id?: string;
  estado?: EstadoExpediente; // Defaults to 'Solicitud' in service
  servicio?: TipoServicio;
  titulo?: string;
  notas?: string;
  created_by: string;
  updated_by: string;
}

/**
 * Input type for updating an existing Expediente
 * All fields are optional except the required identifiers
 */
export interface ActualizarExpedienteInput {
  estado?: EstadoExpediente;
  inmueble_id?: string | null;
  titulo?: string | null;
  notas?: string | null;
  updated_by: string;
  version: number; // Required for optimistic locking
}

/**
 * Input type for creating a payment record
 */
export interface CrearPagoInput {
  expediente_id: string;
  importe: number;
  moneda: string; // EUR, USD, etc.
  metodo_pago: string; // tarjeta, transferencia, etc.
  estado: EstadoPago;
  referencia_externa?: string; // ID del pago en el gateway
  created_by: string;
}

// ============================================================
// Filter & Query Types
// ============================================================

/**
 * Filter type for querying Expediente
 */
export interface ExpedienteFilter {
  cliente_id?: string;
  estado?: EstadoExpediente;
  servicio?: TipoServicio;
  inmueble_id?: string;
  search?: string; // Searches numero_expediente, titulo
  include_deleted?: boolean;
  limit?: number;
  offset?: number;
}

// ============================================================
// Result Types
// ============================================================

/**
 * Result type for soft-delete
 */
export interface ExpedienteDeleteResult {
  success: boolean;
  deleted_at: string;
  version: number;
}

/**
 * Result type for estado transitions
 */
export interface ExpedienteTransitionResult {
  success: boolean;
  estado_anterior: EstadoExpediente;
  estado_nuevo: EstadoExpediente;
  expediente: ExpedienteRow;
}

// ============================================================
// Machine de Estados (State Machine)
// Basado en CF-026-EXPEDIENTE-DESIGN.md §6.2 y CF-028-EXPEDIENTE-WORKFLOW.md §4
// ============================================================

/**
 * Transiciones permitidas del ciclo de vida del Expediente
 * Estados canónicos del dominio (CF-026 §6.2)
 */
export const TRANSICIONES_ESTADO: Record<EstadoExpediente, EstadoExpediente[]> = {
  Solicitud: ['PteDocumentacion', 'Cancelado'],
  PteDocumentacion: ['EnRevisionPITR', 'RevisionManual', 'Cancelado'],
  EnRevisionPITR: ['Auditado', 'RequiereRevisionManual'],
  Auditado: ['RevisionManual', 'Aprobado'],
  RequiereRevisionManual: ['RevisionManual'],
  RevisionManual: ['Aprobado', 'Rechazado'],
  Aprobado: ['DictamenEmitido', 'Entregado'],
  Rechazado: ['Devuelto'],
  DictamenEmitido: ['DictamenEntregado'],
  DictamenEntregado: [],
  Entregado: [],
  Cancelado: [],
  Devuelto: ['PteDocumentacion'],
};

/**
 * Valida si una transición de estado es válida según CF-026 §6.2
 */
export function esTransicionValida(
  estadoActual: EstadoExpediente,
  estadoNuevo: EstadoExpediente
): boolean {
  const permitidos = TRANSICIONES_ESTADO[estadoActual];
  if (!permitidos) return false;
  return permitidos.includes(estadoNuevo);
}
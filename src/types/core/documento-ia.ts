/**
 * Core domain types for Documento IA entity
 * Based on: CF-020 Data Model §3.5, PROPUESTA-MODELO-MVP §5
 * EP-027: Documento IA — manages documents associated with expedientes,
 * including uploaded certificates, AI-generated reports, and supplementary files.
 *
 * Single Tenant V1: Sin empresa_id. Multitenancy en V3.
 */

// ============================================================
// Tipos de Error
// ============================================================

/**
 * Error de validación para operaciones con Documento IA
 */
export class DocumentoIAValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DocumentoIAValidationError';
  }
}

/**
 * Error cuando un documento no se encuentra
 */
export class DocumentoIANotFoundError extends Error {
  constructor(id: string) {
    super(`Documento IA no encontrado: ${id}`);
    this.name = 'DocumentoIANotFoundError';
  }
}

/**
 * Error de conflicto en operaciones con Documento IA
 */
export class DocumentoIAConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DocumentoIAConflictError';
  }
}

/**
 * Error de conflicto de versión (optimistic locking)
 */
export class DocumentoIAVersionConflictError extends Error {
  constructor(id: string) {
    super(`Conflicto de versión al actualizar documento ${id}. Recarga los datos e inténtalo de nuevo.`);
    this.name = 'DocumentoIAVersionConflictError';
  }
}

// ============================================================
// Enums
// ============================================================

/**
 * Tipos de documento en el sistema Certilab
 */
export type TipoDocumento =
  | 'CERTIFICADO_ORIGINAL'
  | 'DOCUMENTACION_COMPLEMENTARIA'
  | 'INFORME_FINAL'
  | 'INFORME_IA'
  | 'ANALISIS_IA'
  | 'FOTOGRAFIA'
  | 'OTRO';

/**
 * Estado de procesamiento IA del documento
 */
export type EstadoProcesamientoIA =
  | 'PENDIENTE'
  | 'EN_PROCESO'
  | 'COMPLETADO'
  | 'ERROR'
  | 'NO_APLICA';

// ============================================================
// Database row — maps 1:1 with core.documento table
// ============================================================

/**
 * Database row representation of core.documento
 * Maps 1:1 with the Supabase table
 *
 * Single Tenant V1: No tiene empresa_id.
 */
export interface DocumentoIARow {
  id: string; // UUID v7
  expediente_id: string; // FK → core.expediente.id
  tipo: TipoDocumento;
  nombre: string;
  mime_type: string;
  tamano_bytes: number;
  storage_path: string;
  hash_sha256: string;
  metadata_ia: Record<string, unknown> | null;
  estado_ia: EstadoProcesamientoIA;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  deleted_at: string | null;
  deleted_by: string | null;
  version: number;
}

// ============================================================
// Input types
// ============================================================

/**
 * Input type for creating a new Documento IA
 */
export interface CrearDocumentoIAInput {
  expediente_id: string;
  tipo: TipoDocumento;
  nombre: string;
  mime_type: string;
  tamano_bytes: number;
  storage_path: string;
  hash_sha256: string;
  metadata_ia?: Record<string, unknown>;
  estado_ia?: EstadoProcesamientoIA;
  created_by: string;
  updated_by: string;
}

/**
 * Input type for updating an existing Documento IA
 * All fields are optional except the required identifiers
 */
export interface ActualizarDocumentoIAInput {
  tipo?: TipoDocumento;
  nombre?: string;
  mime_type?: string;
  tamano_bytes?: number;
  storage_path?: string;
  hash_sha256?: string;
  metadata_ia?: Record<string, unknown> | null | undefined;
  estado_ia?: EstadoProcesamientoIA;
  updated_by: string;
  version: number; // Required for optimistic locking
}

/**
 * Input for registering AI processing result on a document
 */
export interface RegistrarProcesamientoIAInput {
  estado_ia: EstadoProcesamientoIA;
  metadata_ia?: Record<string, unknown>;
  updated_by: string;
  version: number;
}

// ============================================================
// Filter types
// ============================================================

/**
 * Filter type for querying Documento IA
 */
export interface DocumentoIAFilter {
  expediente_id?: string;
  tipo?: TipoDocumento;
  estado_ia?: EstadoProcesamientoIA;
  search?: string; // Searches nombre
  include_deleted?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * Result type for soft-delete
 */
export interface DocumentoIADeleteResult {
  success: boolean;
  deleted_at: string;
  version: number;
}
/**
 * Core domain types for Cliente entity
 * Based on: CF-020 Data Model §3.4, Migration 20260703_00001
 * Single Tenant V1: Sin empresa_id. Multitenancy en V3.
 */

export type OrigenCliente =
  | 'web'
  | 'whatsapp'
  | 'referido'
  | 'telefono'
  | 'email'
  | 'presencial'
  | 'api'
  | 'backoffice';

/**
 * Database row representation of core.cliente
 * Maps 1:1 with the Supabase table
 *
 * Single Tenant V1: No tiene empresa_id.
 * Preparado para migración a multitenant en V3:
 *   En V3 se añadirá empresa_id + FK a core.empresa.
 *
 * Restricción: Al menos uno de email o telefono debe ser NOT NULL.
 */
export interface ClienteRow {
  id: string; // UUID v7
  usuario_id: string | null;
  email: string | null;     // Opcional en V1, pero obligatorio al menos uno con telefono
  nombre: string;
  apellidos: string;
  telefono: string | null;  // Opcional en V1, pero obligatorio al menos uno con email
  dni: string | null;
  direccion: string | null;
  ciudad: string | null;
  codigo_postal: string | null;
  notas: string | null;
  origen: OrigenCliente;
  consent_id: string;
  retention_days: number;
  anonymized_at: string | null;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  deleted_at: string | null;
  deleted_by: string | null;
  version: number;
}

/**
 * Input type for creating a new Cliente
 * Preparado para migración a multitenant en V3.
 * En V3 se añadirá empresa_id (derivado del usuario autenticado).
 *
 * Restricción: email y telefono son opcionales, pero al menos uno debe ser proporcionado.
 */
export interface CrearClienteInput {
  usuario_id?: string;
  email?: string;           // Opcional (pero al menos uno con telefono requerido)
  nombre: string;
  apellidos: string;
  telefono?: string;        // Opcional (pero al menos uno con email requerido)
  dni?: string;
  direccion?: string;
  ciudad?: string;
  codigo_postal?: string;
  notas?: string;
  origen?: OrigenCliente;
  consent_id: string;
  retention_days?: number;
  created_by: string;
  updated_by: string;
}

/**
 * Input type for updating an existing Cliente
 * All fields are optional except the required identifiers
 */
export interface ActualizarClienteInput {
  email?: string | null;
  nombre?: string;
  apellidos?: string;
  telefono?: string | null;
  dni?: string | null;
  direccion?: string | null;
  ciudad?: string | null;
  codigo_postal?: string | null;
  notas?: string | null;
  origen?: OrigenCliente;
  updated_by: string;
  version: number; // Required for optimistic locking
}

/**
 * Filter type for querying Cliente
 * Preparado para migración a multitenant en V3.
 * En V3 se añadirá empresa_id como filtro obligatorio.
 */
export interface ClienteFilter {
  usuario_id?: string;
  email?: string;
  search?: string; // Searches nombre, apellidos, email
  origen?: OrigenCliente;
  include_deleted?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * Result type for soft-delete
 */
export interface ClienteDeleteResult {
  success: boolean;
  deleted_at: string;
  version: number;
}
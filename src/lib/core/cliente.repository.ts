/**
 * Cliente Repository
 * Data access layer for the core.cliente table
 * Based on: CF-021 Supabase Architecture, Migration 20260703_00001
 */

import { createClient } from '@/lib/supabase/server';
import type {
  ClienteRow,
  CrearClienteInput,
  ActualizarClienteInput,
  ClienteFilter,
  ClienteDeleteResult,
} from '@/types/core/cliente';

/**
 * Cliente Repository - MVP (sin multitenant)
 * Preparado para migración a multitenant en V3.
 * En V3 se añadirá filtro por empresa_id en las queries.
 */
const TABLE = 'core.cliente';
const SOFT_DELETE_COLS = `
  id, usuario_id, email, nombre, apellidos,
  telefono, dni, direccion, ciudad, codigo_postal,
  notas, origen, consent_id, retention_days, anonymized_at,
  created_at, created_by, updated_at, updated_by,
  deleted_at, deleted_by, version
`;

export class ClienteRepository {
  /**
   * Create a new cliente
   */
  async crear(input: CrearClienteInput): Promise<ClienteRow> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        usuario_id: input.usuario_id ?? null,
        email: input.email,
        nombre: input.nombre,
        apellidos: input.apellidos,
        telefono: input.telefono ?? null,
        dni: input.dni ?? null,
        direccion: input.direccion ?? null,
        ciudad: input.ciudad ?? null,
        codigo_postal: input.codigo_postal ?? null,
        notas: input.notas ?? null,
        origen: input.origen ?? 'web',
        consent_id: input.consent_id,
        retention_days: input.retention_days ?? 2190,
        created_by: input.created_by,
        updated_by: input.updated_by,
      })
      .select(SOFT_DELETE_COLS)
      .single();

    if (error) {
      throw new Error(`Error al crear cliente: ${error.message}`, {
        cause: error,
      });
    }

    return data as ClienteRow;
  }

  /**
   * Find a cliente by ID
   */
  async findById(id: string, includeDeleted = false): Promise<ClienteRow | null> {
    const supabase = await createClient();

    let query = supabase
      .from(TABLE)
      .select(SOFT_DELETE_COLS)
      .eq('id', id);

    if (!includeDeleted) {
      query = query.is('deleted_at', null);
    }

    const { data, error } = await query.single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Row not found (single() returns this code)
        return null;
      }
      throw new Error(`Error al buscar cliente: ${error.message}`, {
        cause: error,
      });
    }

    return data as ClienteRow;
  }

  /**
   * Find clientes by filter
   */
  async findMany(filter: ClienteFilter): Promise<ClienteRow[]> {
    const supabase = await createClient();

    let query = supabase
      .from(TABLE)
      .select(SOFT_DELETE_COLS);

    // Optional filters
    if (filter.email) {
      query = query.eq('email', filter.email);
    }

    if (filter.usuario_id) {
      query = query.eq('usuario_id', filter.usuario_id);
    }

    if (filter.origen) {
      query = query.eq('origen', filter.origen);
    }

    // Search across nombre, apellidos, email
    if (filter.search) {
      const term = `%${filter.search}%`;
      query = query.or(
        `nombre.ilike.${term},apellidos.ilike.${term},email.ilike.${term}`
      );
    }

    // Soft delete filter
    if (!filter.include_deleted) {
      query = query.is('deleted_at', null);
    }

    // Pagination
    const limit = filter.limit ?? 50;
    const offset = filter.offset ?? 0;
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error } = await query;

    if (error) {
      throw new Error(`Error al listar clientes: ${error.message}`, {
        cause: error,
      });
    }

    return data as ClienteRow[];
  }

  /**
   * Update a cliente with optimistic locking
   */
  async actualizar(
    id: string,
    input: ActualizarClienteInput
  ): Promise<ClienteRow | null> {
    const supabase = await createClient();

    const updateData: Record<string, unknown> = {
      updated_by: input.updated_by,
    };

    // Only include fields that are provided
    if (input.email !== undefined) updateData.email = input.email;
    if (input.nombre !== undefined) updateData.nombre = input.nombre;
    if (input.apellidos !== undefined) updateData.apellidos = input.apellidos;
    if (input.telefono !== undefined) updateData.telefono = input.telefono;
    if (input.dni !== undefined) updateData.dni = input.dni;
    if (input.direccion !== undefined) updateData.direccion = input.direccion;
    if (input.ciudad !== undefined) updateData.ciudad = input.ciudad;
    if (input.codigo_postal !== undefined) updateData.codigo_postal = input.codigo_postal;
    if (input.notas !== undefined) updateData.notas = input.notas;
    if (input.origen !== undefined) updateData.origen = input.origen;

    // Optimistic locking: only update if version matches
    const { data, error } = await supabase
      .from(TABLE)
      .update(updateData)
      .eq('id', id)
      .eq('version', input.version)
      .is('deleted_at', null)
      .select(SOFT_DELETE_COLS)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Row not found -> version conflict or already deleted
        return null;
      }
      throw new Error(`Error al actualizar cliente: ${error.message}`, {
        cause: error,
      });
    }

    return data as ClienteRow;
  }

  /**
   * Soft delete a cliente
   */
  async softDelete(
    id: string,
    deletedBy: string
  ): Promise<ClienteDeleteResult | null> {
    const supabase = await createClient();

    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from(TABLE)
      .update({
        deleted_at: now,
        deleted_by: deletedBy,
        updated_by: deletedBy,
      })
      .eq('id', id)
      .is('deleted_at', null)
      .select('id, deleted_at, version')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Error al eliminar cliente: ${error.message}`, {
        cause: error,
      });
    }

    return {
      success: true,
      deleted_at: data.deleted_at,
      version: data.version,
    };
  }

  /**
   * Restore a soft-deleted cliente
   */
  async restaurar(id: string, updatedBy: string): Promise<ClienteRow | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from(TABLE)
      .update({
        deleted_at: null,
        deleted_by: null,
        updated_by: updatedBy,
      })
      .eq('id', id)
      .not('deleted_at', 'is', null)
      .select(SOFT_DELETE_COLS)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Error al restaurar cliente: ${error.message}`, {
        cause: error,
      });
    }

    return data as ClienteRow;
  }

  /**
   * Count clientes by filter (useful for pagination)
   */
  async count(filter: ClienteFilter): Promise<number> {
    const supabase = await createClient();

    let query = supabase
      .from(TABLE)
      .select('id, deleted_at', { count: 'exact', head: true });

    if (!filter.include_deleted) {
      query = query.is('deleted_at', null);
    }

    const { count, error } = await query;

    if (error) {
      throw new Error(`Error al contar clientes: ${error.message}`, {
        cause: error,
      });
    }

    return count ?? 0;
  }
}

// Singleton instance
export const clienteRepository = new ClienteRepository();
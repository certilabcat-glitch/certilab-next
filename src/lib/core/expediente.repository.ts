/**
 * Expediente Repository
 * Data access layer for the core.expediente table
 * Based on: CF-020 Data Model §3.5, CF-026-EXPEDIENTE-DESIGN.md, CF-040-BUSINESS-POLICIES.md
 * 
 * El Expediente es el agregado raíz del sistema de Certilab.
 * Representa una solicitud de servicio.
 * 
 * V1 MVP - Single tenant. Sin multitenant.
 */

import { createClient } from '@/lib/supabase/server';
import type {
  ExpedienteRow,
  CrearExpedienteInput,
  ActualizarExpedienteInput,
  ExpedienteFilter,
  ExpedienteDeleteResult,
} from '@/types/core/expediente';

/**
 * Expediente Repository - MVP (sin multitenant)
 * 
 * El expediente pertenece a un cliente y opcionalmente a un inmueble.
 * Lifecycle: pendiente -> pago_pendiente -> pago_recibido -> expediente_creado ->
 *           en_revision -> informe_enviado -> cerrado | rechazado | cancelado.
 * 
 * V1 Fase A: cliente_id es UUID sin FK. Fase B: FK a core.cliente.
 */
const TABLE = 'core.expediente';
const SOFT_DELETE_COLS = `
  id, numero_expediente, cliente_id, inmueble_id,
  estado, servicio, titulo, notas,
  created_at, created_by, updated_at, updated_by,
  deleted_at, deleted_by, version
`;

export class ExpedienteRepository {
  /**
   * Create a new expediente
   */
  async crear(input: CrearExpedienteInput): Promise<ExpedienteRow> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        numero_expediente: input.numero_expediente,
        cliente_id: input.cliente_id,
        inmueble_id: input.inmueble_id ?? null,
        servicio: input.servicio ?? 'segunda_opinion',
        titulo: input.titulo ?? null,
        notas: input.notas ?? null,
        created_by: input.created_by,
        updated_by: input.updated_by,
      })
      .select(SOFT_DELETE_COLS)
      .single();

    if (error) {
      throw new Error(`Error al crear expediente: ${error.message}`, {
        cause: error,
      });
    }

    return data as ExpedienteRow;
  }

  /**
   * Find an expediente by ID
   */
  async findById(id: string, includeDeleted = false): Promise<ExpedienteRow | null> {
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
        return null;
      }
      throw new Error(`Error al buscar expediente: ${error.message}`, {
        cause: error,
      });
    }

    return data as ExpedienteRow;
  }

  /**
   * Find expedientes by filter
   */
  async findMany(filter: ExpedienteFilter): Promise<ExpedienteRow[]> {
    const supabase = await createClient();

    let query = supabase
      .from(TABLE)
      .select(SOFT_DELETE_COLS);

    // Optional filters
    if (filter.cliente_id) {
      query = query.eq('cliente_id', filter.cliente_id);
    }

    if (filter.estado) {
      query = query.eq('estado', filter.estado);
    }

    if (filter.servicio) {
      query = query.eq('servicio', filter.servicio);
    }

    if (filter.inmueble_id) {
      query = query.eq('inmueble_id', filter.inmueble_id);
    }

    // Search across numero_expediente, titulo
    if (filter.search) {
      const term = `%${filter.search}%`;
      query = query.or(
        `numero_expediente.ilike.${term},titulo.ilike.${term}`
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
      throw new Error(`Error al listar expedientes: ${error.message}`, {
        cause: error,
      });
    }

    return data as ExpedienteRow[];
  }

  /**
   * Update an expediente with optimistic locking
   */
  async actualizar(
    id: string,
    input: ActualizarExpedienteInput
  ): Promise<ExpedienteRow | null> {
    const supabase = await createClient();

    const updateData: Record<string, unknown> = {
      updated_by: input.updated_by,
    };

    // Only include fields that are provided
    if (input.estado !== undefined) updateData.estado = input.estado;
    if (input.inmueble_id !== undefined) updateData.inmueble_id = input.inmueble_id;
    if (input.titulo !== undefined) updateData.titulo = input.titulo;
    if (input.notas !== undefined) updateData.notas = input.notas;

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
        return null;
      }
      throw new Error(`Error al actualizar expediente: ${error.message}`, {
        cause: error,
      });
    }

    return data as ExpedienteRow;
  }

  /**
   * Soft delete an expediente
   */
  async softDelete(
    id: string,
    deletedBy: string
  ): Promise<ExpedienteDeleteResult | null> {
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
      throw new Error(`Error al eliminar expediente: ${error.message}`, {
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
   * Restore a soft-deleted expediente
   */
  async restaurar(
    id: string,
    updatedBy: string
  ): Promise<ExpedienteRow | null> {
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
      throw new Error(`Error al restaurar expediente: ${error.message}`, {
        cause: error,
      });
    }

    return data as ExpedienteRow;
  }

  /**
   * Find expedientes by estado, ordered FIFO (oldest first)
   * Método específico para la bandeja de trabajo del Área Técnica.
   * No hereda el orden DESC de findMany para garantizar FIFO.
   */
  async findByEstado(
    estado: string,
    opts?: { limit?: number; offset?: number }
  ): Promise<ExpedienteRow[]> {
    const supabase = await createClient();

    const limit = opts?.limit ?? 50;
    const offset = opts?.offset ?? 0;

    const query = supabase
      .from(TABLE)
      .select(SOFT_DELETE_COLS)
      .eq('estado', estado)
      .is('deleted_at', null)
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1);

    const { data, error } = await query;

    if (error) {
      throw new Error(`Error al buscar expedientes por estado: ${error.message}`, {
        cause: error,
      });
    }

    return data as ExpedienteRow[];
  }

  /**
   * Count expedientes by filter (useful for pagination)
   */
  async count(filter: ExpedienteFilter): Promise<number> {
    const supabase = await createClient();

    let query = supabase
      .from(TABLE)
      .select('id, deleted_at', { count: 'exact', head: true });

    if (filter.cliente_id) {
      query = query.eq('cliente_id', filter.cliente_id);
    }

    if (filter.estado) {
      query = query.eq('estado', filter.estado);
    }

    if (!filter.include_deleted) {
      query = query.is('deleted_at', null);
    }

    const { count, error } = await query;

    if (error) {
      throw new Error(`Error al contar expedientes: ${error.message}`, {
        cause: error,
      });
    }

    return count ?? 0;
  }
}

// Singleton instance
export const expedienteRepository = new ExpedienteRepository();
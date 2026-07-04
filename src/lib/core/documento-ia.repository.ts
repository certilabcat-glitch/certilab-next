/**
 * Documento IA Repository
 * Data access layer for the core.documento table
 * Based on: CF-020 Data Model §3.5, PROPUESTA-MODELO-MVP §5
 * EP-027: Documento IA — child aggregate of Expediente.
 *
 * V1 MVP - Single tenant. Sin multitenant.
 */

import { createClient } from '@/lib/supabase/server';
import type {
  DocumentoIARow,
  CrearDocumentoIAInput,
  ActualizarDocumentoIAInput,
  DocumentoIAFilter,
  DocumentoIADeleteResult,
} from '@/types/core/documento-ia';

/**
 * Documento IA Repository - MVP (sin multitenant)
 *
 * El Documento IA es un agregado hijo de Expediente.
 * Lifecycle: creado → procesado IA (opcional) → archivado/eliminado.
 *
 * Tipos de documento: CERTIFICADO_ORIGINAL, DOCUMENTACION_COMPLEMENTARIA,
 * INFORME_FINAL, INFORME_IA, ANALISIS_IA, FOTOGRAFIA, OTRO
 */
const TABLE = 'core.documento';
const SOFT_DELETE_COLS = `
  id, expediente_id, tipo, nombre, mime_type,
  tamano_bytes, storage_path, hash_sha256,
  metadata_ia, estado_ia,
  created_at, created_by, updated_at, updated_by,
  deleted_at, deleted_by, version
`;

export class DocumentoIARepository {
  /**
   * Create a new documento IA
   */
  async crear(input: CrearDocumentoIAInput): Promise<DocumentoIARow> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        expediente_id: input.expediente_id,
        tipo: input.tipo,
        nombre: input.nombre,
        mime_type: input.mime_type,
        tamano_bytes: input.tamano_bytes,
        storage_path: input.storage_path,
        hash_sha256: input.hash_sha256,
        metadata_ia: input.metadata_ia ?? null,
        estado_ia: input.estado_ia ?? 'NO_APLICA',
        created_by: input.created_by,
        updated_by: input.updated_by,
      })
      .select(SOFT_DELETE_COLS)
      .single();

    if (error) {
      throw new Error(`Error al crear documento IA: ${error.message}`, {
        cause: error,
      });
    }

    return data as DocumentoIARow;
  }

  /**
   * Find a documento IA by ID
   */
  async findById(id: string, includeDeleted = false): Promise<DocumentoIARow | null> {
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
      throw new Error(`Error al buscar documento IA: ${error.message}`, {
        cause: error,
      });
    }

    return data as DocumentoIARow;
  }

  /**
   * Find documentos IA by filter
   */
  async findMany(filter: DocumentoIAFilter): Promise<DocumentoIARow[]> {
    const supabase = await createClient();

    let query = supabase
      .from(TABLE)
      .select(SOFT_DELETE_COLS);

    // Optional filters
    if (filter.expediente_id) {
      query = query.eq('expediente_id', filter.expediente_id);
    }

    if (filter.tipo) {
      query = query.eq('tipo', filter.tipo);
    }

    if (filter.estado_ia) {
      query = query.eq('estado_ia', filter.estado_ia);
    }

    // Search across nombre
    if (filter.search) {
      const term = `%${filter.search}%`;
      query = query.or(`nombre.ilike.${term}`);
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
      throw new Error(`Error al listar documentos IA: ${error.message}`, {
        cause: error,
      });
    }

    return data as DocumentoIARow[];
  }

  /**
   * Update a documento IA with optimistic locking
   */
  async actualizar(
    id: string,
    input: ActualizarDocumentoIAInput
  ): Promise<DocumentoIARow | null> {
    const supabase = await createClient();

    const updateData: Record<string, unknown> = {
      updated_by: input.updated_by,
    };

    // Only include fields that are provided
    if (input.tipo !== undefined) updateData.tipo = input.tipo;
    if (input.nombre !== undefined) updateData.nombre = input.nombre;
    if (input.mime_type !== undefined) updateData.mime_type = input.mime_type;
    if (input.tamano_bytes !== undefined) updateData.tamano_bytes = input.tamano_bytes;
    if (input.storage_path !== undefined) updateData.storage_path = input.storage_path;
    if (input.hash_sha256 !== undefined) updateData.hash_sha256 = input.hash_sha256;
    if (input.metadata_ia !== undefined) updateData.metadata_ia = input.metadata_ia;
    if (input.estado_ia !== undefined) updateData.estado_ia = input.estado_ia;

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
      throw new Error(`Error al actualizar documento IA: ${error.message}`, {
        cause: error,
      });
    }

    return data as DocumentoIARow;
  }

  /**
   * Soft delete a documento IA
   */
  async softDelete(
    id: string,
    deletedBy: string
  ): Promise<DocumentoIADeleteResult | null> {
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
      throw new Error(`Error al eliminar documento IA: ${error.message}`, {
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
   * Restore a soft-deleted documento IA
   */
  async restaurar(
    id: string,
    updatedBy: string
  ): Promise<DocumentoIARow | null> {
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
      throw new Error(`Error al restaurar documento IA: ${error.message}`, {
        cause: error,
      });
    }

    return data as DocumentoIARow;
  }

  /**
   * Count documentos IA by filter (useful for pagination)
   */
  async count(filter: DocumentoIAFilter): Promise<number> {
    const supabase = await createClient();

    let query = supabase
      .from(TABLE)
      .select('id, deleted_at', { count: 'exact', head: true });

    if (filter.expediente_id) {
      query = query.eq('expediente_id', filter.expediente_id);
    }

    if (filter.tipo) {
      query = query.eq('tipo', filter.tipo);
    }

    if (filter.estado_ia) {
      query = query.eq('estado_ia', filter.estado_ia);
    }

    if (!filter.include_deleted) {
      query = query.is('deleted_at', null);
    }

    const { count, error } = await query;

    if (error) {
      throw new Error(`Error al contar documentos IA: ${error.message}`, {
        cause: error,
      });
    }

    return count ?? 0;
  }
}

// Singleton instance
export const documentoIARepository = new DocumentoIARepository();
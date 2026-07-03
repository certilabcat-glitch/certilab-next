/**
 * Inmueble Repository
 * Data access layer for the core.inmueble table
 * Based on: CF-020 Data Model §3.5, CF-021 Supabase Architecture
 * Optimizado para CE3X - auditoría remota de certificados energéticos
 */

import { createClient } from '@/lib/supabase/server';
import type {
  InmuebleRow,
  CrearInmuebleInput,
  ActualizarInmuebleInput,
  InmuebleFilter,
  InmuebleDeleteResult,
} from '@/types/core/inmueble';

/**
 * Inmueble Repository - MVP (sin multitenant)
 * El inmueble es independiente del expediente: un inmueble puede tener
 * múltiples expedientes a lo largo del tiempo.
 * Optimizado para CE3X - contiene todos los campos necesarios para
 * el cálculo de certificación (zonas climáticas, superficies, etc.).
 */
const TABLE = 'core.inmueble';
const SOFT_DELETE_COLS = `
  id, cliente_id, referencia_catastral,
  direccion, municipio, provincia, codigo_postal,
  latitud, longitud, altitud,
  uso, tipo, tipo_edificio,
  superficie_util, superficie_construida,
  ano_construccion, numero_plantas, altura_libre,
  orientacion_principal, orientacion_secundaria,
  zona_climatica_cte, zona_climatica_verano,
  certificado_existente_url, certificado_letra,
  certificado_consumo, certificado_emisiones,
  datos_catastrales, observaciones,
  created_at, created_by, updated_at, updated_by,
  deleted_at, deleted_by, version
`;

export class InmuebleRepository {
  /**
   * Create a new inmueble
   */
  async crear(input: CrearInmuebleInput): Promise<InmuebleRow> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        cliente_id: input.cliente_id,
        referencia_catastral: input.referencia_catastral ?? null,
        direccion: input.direccion,
        municipio: input.municipio,
        provincia: input.provincia,
        codigo_postal: input.codigo_postal,
        latitud: input.latitud ?? null,
        longitud: input.longitud ?? null,
        altitud: input.altitud ?? null,
        uso: input.uso ?? 'residencial',
        tipo: input.tipo ?? 'piso',
        tipo_edificio: input.tipo_edificio ?? null,
        superficie_util: input.superficie_util ?? null,
        superficie_construida: input.superficie_construida ?? null,
        ano_construccion: input.ano_construccion ?? null,
        numero_plantas: input.numero_plantas ?? null,
        altura_libre: input.altura_libre ?? null,
        orientacion_principal: input.orientacion_principal ?? null,
        orientacion_secundaria: input.orientacion_secundaria ?? null,
        zona_climatica_cte: input.zona_climatica_cte ?? null,
        zona_climatica_verano: input.zona_climatica_verano ?? null,
        certificado_existente_url: input.certificado_existente_url ?? null,
        certificado_letra: input.certificado_letra ?? null,
        certificado_consumo: input.certificado_consumo ?? null,
        certificado_emisiones: input.certificado_emisiones ?? null,
        datos_catastrales: input.datos_catastrales ?? null,
        observaciones: input.observaciones ?? null,
        created_by: input.created_by,
        updated_by: input.updated_by,
      })
      .select(SOFT_DELETE_COLS)
      .single();

    if (error) {
      throw new Error(`Error al crear inmueble: ${error.message}`, {
        cause: error,
      });
    }

    return data as InmuebleRow;
  }

  /**
   * Find an inmueble by ID
   */
  async findById(id: string, includeDeleted = false): Promise<InmuebleRow | null> {
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
      throw new Error(`Error al buscar inmueble: ${error.message}`, {
        cause: error,
      });
    }

    return data as InmuebleRow;
  }

  /**
   * Find inmuebles by filter
   */
  async findMany(filter: InmuebleFilter): Promise<InmuebleRow[]> {
    const supabase = await createClient();

    let query = supabase
      .from(TABLE)
      .select(SOFT_DELETE_COLS);

    // Optional filters
    if (filter.cliente_id) {
      query = query.eq('cliente_id', filter.cliente_id);
    }

    if (filter.provincia) {
      query = query.eq('provincia', filter.provincia);
    }

    if (filter.municipio) {
      query = query.eq('municipio', filter.municipio);
    }

    if (filter.codigo_postal) {
      query = query.eq('codigo_postal', filter.codigo_postal);
    }

    if (filter.zona_climatica_cte) {
      query = query.eq('zona_climatica_cte', filter.zona_climatica_cte);
    }

    if (filter.zona_climatica_verano) {
      query = query.eq('zona_climatica_verano', filter.zona_climatica_verano);
    }

    if (filter.tipo) {
      query = query.eq('tipo', filter.tipo);
    }

    // Search across direccion, municipio, provincia
    if (filter.search) {
      const term = `%${filter.search}%`;
      query = query.or(
        `direccion.ilike.${term},municipio.ilike.${term},provincia.ilike.${term}`
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
      throw new Error(`Error al listar inmuebles: ${error.message}`, {
        cause: error,
      });
    }

    return data as InmuebleRow[];
  }

  /**
   * Update an inmueble with optimistic locking
   */
  async actualizar(
    id: string,
    input: ActualizarInmuebleInput
  ): Promise<InmuebleRow | null> {
    const supabase = await createClient();

    const updateData: Record<string, unknown> = {
      updated_by: input.updated_by,
    };

    // Only include fields that are provided
    if (input.referencia_catastral !== undefined) updateData.referencia_catastral = input.referencia_catastral;
    if (input.direccion !== undefined) updateData.direccion = input.direccion;
    if (input.municipio !== undefined) updateData.municipio = input.municipio;
    if (input.provincia !== undefined) updateData.provincia = input.provincia;
    if (input.codigo_postal !== undefined) updateData.codigo_postal = input.codigo_postal;
    if (input.latitud !== undefined) updateData.latitud = input.latitud;
    if (input.longitud !== undefined) updateData.longitud = input.longitud;
    if (input.altitud !== undefined) updateData.altitud = input.altitud;
    if (input.uso !== undefined) updateData.uso = input.uso;
    if (input.tipo !== undefined) updateData.tipo = input.tipo;
    if (input.tipo_edificio !== undefined) updateData.tipo_edificio = input.tipo_edificio;
    if (input.superficie_util !== undefined) updateData.superficie_util = input.superficie_util;
    if (input.superficie_construida !== undefined) updateData.superficie_construida = input.superficie_construida;
    if (input.ano_construccion !== undefined) updateData.ano_construccion = input.ano_construccion;
    if (input.numero_plantas !== undefined) updateData.numero_plantas = input.numero_plantas;
    if (input.altura_libre !== undefined) updateData.altura_libre = input.altura_libre;
    if (input.orientacion_principal !== undefined) updateData.orientacion_principal = input.orientacion_principal;
    if (input.orientacion_secundaria !== undefined) updateData.orientacion_secundaria = input.orientacion_secundaria;
    if (input.zona_climatica_cte !== undefined) updateData.zona_climatica_cte = input.zona_climatica_cte;
    if (input.zona_climatica_verano !== undefined) updateData.zona_climatica_verano = input.zona_climatica_verano;
    if (input.certificado_existente_url !== undefined) updateData.certificado_existente_url = input.certificado_existente_url;
    if (input.certificado_letra !== undefined) updateData.certificado_letra = input.certificado_letra;
    if (input.certificado_consumo !== undefined) updateData.certificado_consumo = input.certificado_consumo;
    if (input.certificado_emisiones !== undefined) updateData.certificado_emisiones = input.certificado_emisiones;
    if (input.datos_catastrales !== undefined) updateData.datos_catastrales = input.datos_catastrales;
    if (input.observaciones !== undefined) updateData.observaciones = input.observaciones;

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
      throw new Error(`Error al actualizar inmueble: ${error.message}`, {
        cause: error,
      });
    }

    return data as InmuebleRow;
  }

  /**
   * Soft delete an inmueble
   */
  async softDelete(
    id: string,
    deletedBy: string
  ): Promise<InmuebleDeleteResult | null> {
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
      throw new Error(`Error al eliminar inmueble: ${error.message}`, {
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
   * Restore a soft-deleted inmueble
   */
  async restaurar(
    id: string,
    updatedBy: string
  ): Promise<InmuebleRow | null> {
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
      throw new Error(`Error al restaurar inmueble: ${error.message}`, {
        cause: error,
      });
    }

    return data as InmuebleRow;
  }

  /**
   * Count inmuebles by filter (useful for pagination)
   */
  async count(filter: InmuebleFilter): Promise<number> {
    const supabase = await createClient();

    let query = supabase
      .from(TABLE)
      .select('id, deleted_at', { count: 'exact', head: true });

    if (filter.cliente_id) {
      query = query.eq('cliente_id', filter.cliente_id);
    }

    if (!filter.include_deleted) {
      query = query.is('deleted_at', null);
    }

    const { count, error } = await query;

    if (error) {
      throw new Error(`Error al contar inmuebles: ${error.message}`, {
        cause: error,
      });
    }

    return count ?? 0;
  }
}

// Singleton instance
export const inmuebleRepository = new InmuebleRepository();
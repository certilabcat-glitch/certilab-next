/**
 * Core domain types for Inmueble entity
 * Based on: CF-020 Data Model §3.5, CF-030 PITR, CF-031, CF-032
 * Optimizado para CE3X - auditoría remota de certificados energéticos
 */

export type TipoInmueble =
  | 'piso'
  | 'unifamiliar'
  | 'local'
  | 'oficina'
  | 'industrial'
  | 'otro';

export type TipoEdificio =
  | 'bloque'
  | 'adosado'
  | 'aislado'
  | 'pareado';

export type UsoInmueble =
  | 'residencial'
  | 'terciario'
  | 'industrial'
  | 'publico'
  | 'otro';

export type Orientacion =
  | 'N' | 'S' | 'E' | 'O'
  | 'NE' | 'NO' | 'SE' | 'SO'
  | 'MIXTA';

export type ZonaClimaticaCTE =
  | 'A1' | 'A2' | 'A3' | 'A4'
  | 'B1' | 'B2' | 'B3' | 'B4'
  | 'C1' | 'C2' | 'C3' | 'C4'
  | 'D1' | 'D2' | 'D3'
  | 'E1';

export type ZonaClimaticaVerano = '1' | '2' | '3' | '4';

export type LetraCertificado = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

/**
 * Database row representation of core.inmueble
 * Maps 1:1 with the Supabase table
 * Optimizado para CE3X - todos los campos necesarios para el cálculo
 */
export interface InmuebleRow {
  id: string; // UUID v7
  cliente_id: string;
  referencia_catastral: string | null;
  direccion: string;
  municipio: string;
  provincia: string;
  codigo_postal: string;
  latitud: number | null;
  longitud: number | null;
  altitud: number | null;
  uso: UsoInmueble;
  tipo: TipoInmueble;
  tipo_edificio: TipoEdificio | null;
  superficie_util: number | null;
  superficie_construida: number | null;
  ano_construccion: number | null;
  numero_plantas: number | null;
  altura_libre: number | null;
  orientacion_principal: Orientacion | null;
  orientacion_secundaria: Orientacion | null;
  zona_climatica_cte: ZonaClimaticaCTE | null;
  zona_climatica_verano: ZonaClimaticaVerano | null;
  certificado_existente_url: string | null;
  certificado_letra: LetraCertificado | null;
  certificado_consumo: number | null;
  certificado_emisiones: number | null;
  datos_catastrales: Record<string, unknown> | null;
  observaciones: string | null;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  deleted_at: string | null;
  deleted_by: string | null;
  version: number;
}

/**
 * Input type for creating a new Inmueble
 */
export interface CrearInmuebleInput {
  cliente_id: string;
  referencia_catastral?: string;
  direccion: string;
  municipio: string;
  provincia: string;
  codigo_postal: string;
  latitud?: number;
  longitud?: number;
  altitud?: number;
  uso?: UsoInmueble;
  tipo?: TipoInmueble;
  tipo_edificio?: TipoEdificio;
  superficie_util?: number;
  superficie_construida?: number;
  ano_construccion?: number;
  numero_plantas?: number;
  altura_libre?: number;
  orientacion_principal?: Orientacion;
  orientacion_secundaria?: Orientacion;
  zona_climatica_cte?: ZonaClimaticaCTE;
  zona_climatica_verano?: ZonaClimaticaVerano;
  certificado_existente_url?: string;
  certificado_letra?: LetraCertificado;
  certificado_consumo?: number;
  certificado_emisiones?: number;
  datos_catastrales?: Record<string, unknown>;
  observaciones?: string;
  created_by: string;
  updated_by: string;
}

/**
 * Input type for updating an existing Inmueble
 * All fields are optional except the required identifiers
 */
export interface ActualizarInmuebleInput {
  referencia_catastral?: string | null;
  direccion?: string;
  municipio?: string;
  provincia?: string;
  codigo_postal?: string;
  latitud?: number | null;
  longitud?: number | null;
  altitud?: number | null;
  uso?: UsoInmueble;
  tipo?: TipoInmueble;
  tipo_edificio?: TipoEdificio | null;
  superficie_util?: number | null;
  superficie_construida?: number | null;
  ano_construccion?: number | null;
  numero_plantas?: number | null;
  altura_libre?: number | null;
  orientacion_principal?: Orientacion | null;
  orientacion_secundaria?: Orientacion | null;
  zona_climatica_cte?: ZonaClimaticaCTE | null;
  zona_climatica_verano?: ZonaClimaticaVerano | null;
  certificado_existente_url?: string | null;
  certificado_letra?: LetraCertificado | null;
  certificado_consumo?: number | null;
  certificado_emisiones?: number | null;
  datos_catastrales?: Record<string, unknown> | null;
  observaciones?: string | null;
  updated_by: string;
  version: number; // Required for optimistic locking
}

/**
 * Filter type for querying Inmueble
 */
export interface InmuebleFilter {
  cliente_id?: string;
  provincia?: string;
  municipio?: string;
  codigo_postal?: string;
  zona_climatica_cte?: ZonaClimaticaCTE;
  zona_climatica_verano?: ZonaClimaticaVerano;
  tipo?: TipoInmueble;
  search?: string; // Searches direccion, municipio, provincia
  include_deleted?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * Result type for soft-delete
 */
export interface InmuebleDeleteResult {
  success: boolean;
  deleted_at: string;
  version: number;
}
-- Migration: 007 - Create table core.documento (Documento IA)
-- Description: Crea la tabla de documentos asociados a expedientes.
--              Gestiona certificados originales, informes IA, documentación
--              complementaria y archivos generados por el sistema.
-- EP-027: Documento IA — agregado hijo de Expediente.
--
-- Based on: CF-020 Data Model §3.5, PROPUESTA-MODELO-MVP §5
-- Pattern: Sigue exactamente el mismo patrón que core.expediente (CF-026)
--
-- Orden de aplicación: AFTER 20260708_00001_create_core_expediente.sql

-- ============================================================
-- STEP 1: Create enum types
-- ============================================================

DO $$ BEGIN
  CREATE TYPE core.tipo_documento AS ENUM (
    'CERTIFICADO_ORIGINAL',
    'DOCUMENTACION_COMPLEMENTARIA',
    'INFORME_FINAL',
    'INFORME_IA',
    'ANALISIS_IA',
    'FOTOGRAFIA',
    'OTRO'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE core.estado_procesamiento_ia AS ENUM (
    'PENDIENTE',
    'EN_PROCESO',
    'COMPLETADO',
    'ERROR',
    'NO_APLICA'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- STEP 2: Create table core.documento
-- ============================================================

CREATE TABLE IF NOT EXISTS core.documento (
  -- PK (UUID v7 para time-ordered clustering, como core.expediente)
  id UUID NOT NULL DEFAULT core.uuid_generate_v7(),

  -- FK — Expediente al que pertenece el documento
  expediente_id UUID NOT NULL,

  -- Tipificación del documento
  tipo core.tipo_documento NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,

  -- Metadatos de almacenamiento
  tamano_bytes BIGINT NOT NULL,
  storage_path TEXT NOT NULL,
  hash_sha256 VARCHAR(64) NOT NULL,

  -- IA enrichment (resultados de análisis automático)
  metadata_ia JSONB,
  estado_ia core.estado_procesamiento_ia NOT NULL DEFAULT 'NO_APLICA',

  -- Auditoría
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID NOT NULL,
  deleted_at TIMESTAMPTZ,
  deleted_by UUID,
  version INTEGER NOT NULL DEFAULT 1,

  -- Constraints
  CONSTRAINT pk_documento PRIMARY KEY (id),
  CONSTRAINT fk_documento_expediente FOREIGN KEY (expediente_id) REFERENCES core.expediente (id),
  CONSTRAINT ck_documento_tamano CHECK (tamano_bytes > 0),
  CONSTRAINT ck_documento_version CHECK (version >= 1)
);

-- ============================================================
-- STEP 3: Create indexes
-- ============================================================

-- Búsqueda por expediente (principal patrón de acceso)
CREATE INDEX IF NOT EXISTS idx_documento_expediente_id
  ON core.documento (expediente_id)
  WHERE deleted_at IS NULL;

-- Filtro por tipo de documento
CREATE INDEX IF NOT EXISTS idx_documento_tipo
  ON core.documento (tipo)
  WHERE deleted_at IS NULL;

-- Búsqueda por hash (deduplicación)
CREATE INDEX IF NOT EXISTS idx_documento_hash
  ON core.documento (hash_sha256)
  WHERE deleted_at IS NULL;

-- Filtro por estado de procesamiento IA
CREATE INDEX IF NOT EXISTS idx_documento_estado_ia
  ON core.documento (estado_ia)
  WHERE deleted_at IS NULL;

-- Índice compuesto expediente + tipo (consulta más frecuente)
CREATE INDEX IF NOT EXISTS idx_documento_expediente_tipo
  ON core.documento (expediente_id, tipo)
  WHERE deleted_at IS NULL;

-- Índice para datos eliminados (soft delete)
CREATE INDEX IF NOT EXISTS idx_documento_deleted_at
  ON core.documento (deleted_at)
  WHERE deleted_at IS NOT NULL;

-- ============================================================
-- STEP 4: Enable RLS
-- ============================================================

ALTER TABLE core.documento ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- STEP 5: Create RLS Policies
-- ============================================================
-- ============================================================
-- STEP 5: Create RLS Policies
-- ============================================================

DROP POLICY IF EXISTS "Usuarios pueden ver documentos de sus expedientes" ON core.documento;
DROP POLICY IF EXISTS "Usuarios pueden crear documentos" ON core.documento;
DROP POLICY IF EXISTS "Usuarios pueden actualizar documentos" ON core.documento;
DROP POLICY IF EXISTS "Solo servicio puede hard-delete documentos" ON core.documento;
DROP POLICY IF EXISTS "Service role acceso completo documentos" ON core.documento;

-- Policy 1: SELECT - Usuarios autenticados ven documentos de sus expedientes
CREATE POLICY "Usuarios pueden ver documentos de sus expedientes"
-- Policy 1: SELECT - Usuarios autenticados ven documentos de sus expedientes
--           En V3: AND empresa_id IN (SELECT empresa_id FROM auth.users...)
CREATE POLICY "Usuarios pueden ver documentos de sus expedientes"
  ON core.documento
  FOR SELECT
  TO authenticated
  USING (
    expediente_id IN (
      SELECT id FROM core.expediente
      WHERE cliente_id IN (
        SELECT id FROM core.cliente
        WHERE usuario_id = auth.uid()
          OR auth.uid() IN (
            SELECT id FROM auth.users
            WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
          )
      )
    )
  );

-- Policy 2: INSERT - Usuarios autenticados pueden crear documentos
CREATE POLICY "Usuarios pueden crear documentos"
  ON core.documento
  FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid()
    AND
    expediente_id IN (
      SELECT id FROM core.expediente
      WHERE cliente_id IN (
        SELECT id FROM core.cliente
        WHERE usuario_id = auth.uid()
          OR auth.uid() IN (
            SELECT id FROM auth.users
            WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
          )
      )
    )
  );

-- Policy 3: UPDATE - Solo el propietario o admin puede actualizar
CREATE POLICY "Usuarios pueden actualizar documentos"
  ON core.documento
  FOR UPDATE
  TO authenticated
  USING (
    expediente_id IN (
      SELECT id FROM core.expediente
      WHERE cliente_id IN (
        SELECT id FROM core.cliente
        WHERE usuario_id = auth.uid()
          OR auth.uid() IN (
            SELECT id FROM auth.users
            WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
          )
      )
    )
  )
  WITH CHECK (
    expediente_id IN (
      SELECT id FROM core.expediente
      WHERE cliente_id IN (
        SELECT id FROM core.cliente
        WHERE usuario_id = auth.uid()
          OR auth.uid() IN (
            SELECT id FROM auth.users
            WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
          )
      )
    )
  );

-- Policy 4: DELETE - Solo service_role puede hard-delete
CREATE POLICY "Solo servicio puede hard-delete documentos"
  ON core.documento
  FOR DELETE
  TO service_role
  USING (true);

-- Policy 5: Service role tiene acceso completo
CREATE POLICY "Service role acceso completo documentos"
  ON core.documento
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- STEP 6: Create trigger for updated_at
-- ============================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'trg_documento_set_updated_at'
  ) THEN
    CREATE TRIGGER trg_documento_set_updated_at
      BEFORE UPDATE ON core.documento
      FOR EACH ROW
      EXECUTE FUNCTION core.trigger_set_updated_at();
  END IF;
END;
$$;

-- ============================================================
-- STEP 7: Add table comments
-- ============================================================

COMMENT ON TABLE core.documento IS
  'Documentos asociados a expedientes. EP-027: Documento IA. Gestiona certificados originales, informes IA, documentación complementaria.';

COMMENT ON COLUMN core.documento.tipo IS 'Tipo de documento: CERTIFICADO_ORIGINAL, DOCUMENTACION_COMPLEMENTARIA, INFORME_FINAL, INFORME_IA, ANALISIS_IA, FOTOGRAFIA, OTRO';
COMMENT ON COLUMN core.documento.tamano_bytes IS 'Tamaño del archivo en bytes. Debe ser > 0.';
COMMENT ON COLUMN core.documento.storage_path IS 'Ruta en Supabase Storage: {expediente_id}/{tipo}/{uuid}_{nombre}';
COMMENT ON COLUMN core.documento.hash_sha256 IS 'Hash SHA-256 del archivo. Permite detectar duplicados y verificar integridad.';
COMMENT ON COLUMN core.documento.metadata_ia IS 'Metadatos del procesamiento IA: confianza, modelo, resultado del análisis, etc.';
COMMENT ON COLUMN core.documento.estado_ia IS 'Estado del procesamiento IA: PENDIENTE, EN_PROCESO, COMPLETADO, ERROR, NO_APLICA';
COMMENT ON COLUMN core.documento.version IS 'Optimistic locking. Se incrementa en cada actualización.';

-- ============================================================
-- STEP 8: Seed data (demo documents)
-- ============================================================

-- Insert demo certificado original para el expediente demo
INSERT INTO core.documento (
  id,
  expediente_id,
  tipo,
  nombre,
  mime_type,
  tamano_bytes,
  storage_path,
  hash_sha256,
  estado_ia,
  created_by,
  updated_by
)
SELECT
  '0191f500-0000-7000-8000-000000000100',
  id,
  'CERTIFICADO_ORIGINAL',
  'certificado-energetico-demo.pdf',
  'application/pdf',
  245760,
  id || '/CERTIFICADO_ORIGINAL/0191f500-0000-7000-8000-000000000100_certificado-energetico-demo.pdf',
  'abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789',
  'PENDIENTE',
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000'
FROM core.expediente
WHERE numero_expediente = 'EXP-2026-07-00001'
  AND NOT EXISTS (
    SELECT 1 FROM core.documento WHERE id = '0191f500-0000-7000-8000-000000000100'
  );
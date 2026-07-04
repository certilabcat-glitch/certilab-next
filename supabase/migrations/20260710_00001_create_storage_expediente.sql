-- ============================================================
-- Migration: Create Storage Bucket for Expediente Documents
-- Based on: CF-028-EXPEDIENTE-WORKFLOW.md §7 (Fase 2: Documentación)
-- EP-028: Recepción de documentación del expediente
--
-- Crea el bucket 'expediente-docs' para almacenar:
-- - Certificado energético original (PDF)
-- - Fotografías del inmueble (JPG/PNG/WebP)
-- - Documentación complementaria
--
-- V1 MVP - Single tenant. RLS basada en auth.uid()
-- ============================================================

-- ============================================================
-- 1. Crear bucket de storage
-- ============================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'expediente-docs',
  'expediente-docs',
  false,
  20971520, -- 20MB en bytes
  ARRAY[
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 2. RLS: Políticas para storage.objects
-- ============================================================

-- 2.1 Permitir a usuarios autenticados subir archivos a sus expedientes
-- La ruta debe coincidir con: {expediente_id}/{documento_id}_{nombre_archivo}
CREATE POLICY "Usuarios pueden subir documentos a sus expedientes"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'expediente-docs'
  AND (
    -- El usuario es propietario del expediente (verificado por la ruta que contiene el expediente_id)
    EXISTS (
      SELECT 1 FROM core.expediente e
      WHERE e.id = (SELECT regexp_replace(name, '^([^/]+)/.*$', '\1'))::uuid
      AND e.cliente_id = auth.uid()
      AND e.deleted_at IS NULL
    )
  )
);

-- 2.2 Permitir a usuarios autenticados leer archivos de sus expedientes
CREATE POLICY "Usuarios pueden leer documentos de sus expedientes"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'expediente-docs'
  AND EXISTS (
    SELECT 1 FROM core.expediente e
    WHERE e.id = (SELECT regexp_replace(name, '^([^/]+)/.*$', '\1'))::uuid
    AND e.cliente_id = auth.uid()
    AND e.deleted_at IS NULL
  )
);

-- 2.3 Permitir a usuarios autenticados eliminar archivos de sus expedientes
CREATE POLICY "Usuarios pueden eliminar documentos de sus expedientes"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'expediente-docs'
  AND EXISTS (
    SELECT 1 FROM core.expediente e
    WHERE e.id = (SELECT regexp_replace(name, '^([^/]+)/.*$', '\1'))::uuid
    AND e.cliente_id = auth.uid()
    AND e.deleted_at IS NULL
  )
);

-- 2.4 Revocar acceso público por defecto
REVOKE ALL ON storage.objects FROM anon;
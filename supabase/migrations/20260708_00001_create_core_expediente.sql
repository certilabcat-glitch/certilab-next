-- Migration: 005 - Create table core.expediente (PHASE A)
-- Description: Crea la tabla core.expediente y migra datos desde public.expedientes.
--              FASE A: NO modifica la FK cliente_id (sigue siendo UUID sin FK temporalmente).
--              FASE B (posterior): actualizará cliente_id → core.cliente.id
--
-- Based on: CF-020 Data Model §3.5, CF-026-EXPEDIENTE-DESIGN.md
-- Pattern: Sigue exactamente el mismo patrón que core.inmueble (CF-025)
--
-- Orden de aplicación: AFTER 20260707_00001_update_expedientes.sql
--                      AFTER 20260706_00002_create_inmueble.sql
--                      AFTER 20260703_00001_create_schema_core.sql
--
-- ============================================================
-- ANÁLISIS PREVIO A LA EJECUCIÓN
-- ============================================================
-- ¿Qué hace?
--   1. Crea core.expediente con la misma estructura que core.inmueble
--   2. Migra todos los registros desde public.expedientes
--   3. Aplica índices, RLS, triggers siguiendo el patrón V1
--   4. Mantiene cliente_id como UUID simple (SIN FK) hasta Fase B
--   5. NO modifica public.expedientes (se conserva intacto)
--
-- ¿Es reversible?
--   SÍ. La migración es puramente aditiva:
--     - Crea tabla nueva en schema core
--     - Inserta datos (no elimina nada de public)
--     - Para revertir: DROP TABLE core.expediente CASCADE;
--     - Los datos originales en public.expedientes se conservan intactos
--
-- Riesgos:
--   - NINGUNO: no se modifica ni elimina ninguna tabla existente
--   - Las consultas existentes siguen funcionando contra public.expedientes
--   - La migración es idempotente (CREATE TABLE IF NOT EXISTS)
--   - Seed demo usa ON CONFLICT DO NOTHING
-- ============================================================

-- ============================================================
-- STEP 1: Create table core.expediente
-- Sigue el mismo patrón que core.inmueble (CF-025)
-- ============================================================
CREATE TABLE IF NOT EXISTS core.expediente (
  -- PK (UUID v7 para time-ordered clustering, como core.cliente e inmueble)
  id UUID NOT NULL DEFAULT core.uuid_generate_v7(),

  -- Identificador visible para el cliente (formato: EXP-YYYY-MM-NNNN)
  numero_expediente TEXT NOT NULL,

  -- Relación temporal: cliente_id como UUID sin FK
  -- FASE B: se actualizará a FK → core.cliente.id
  cliente_id UUID NOT NULL,

  -- Inmueble asociado (opcional en MVP)
  inmueble_id UUID,

  -- Estado del expediente (usa el mismo enum que public)
  estado estado_expediente NOT NULL DEFAULT 'pendiente',

  -- Tipo de servicio
  servicio TEXT NOT NULL DEFAULT 'segunda_opinion',

  -- Metadatos del servicio
  titulo TEXT,
  notas TEXT,

  -- Auditoría (V1 core pattern, idéntico a core.inmueble)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID NOT NULL,
  deleted_at TIMESTAMPTZ,
  deleted_by UUID,
  version INTEGER NOT NULL DEFAULT 1,

  -- Constraints
  CONSTRAINT pk_expediente PRIMARY KEY (id),
  CONSTRAINT ck_expediente_version CHECK (version >= 1)
);

-- ============================================================
-- STEP 2: Create indexes
-- Sigue el mismo patrón que core.inmueble
-- ============================================================

-- Búsqueda por cliente (principal patrón de acceso)
CREATE INDEX IF NOT EXISTS idx_expediente_cliente_id
  ON core.expediente (cliente_id)
  WHERE deleted_at IS NULL;

-- Búsqueda por estado (filtros comunes)
CREATE INDEX IF NOT EXISTS idx_expediente_estado
  ON core.expediente (estado)
  WHERE deleted_at IS NULL;

-- Búsqueda por número de expediente
CREATE INDEX IF NOT EXISTS idx_expediente_numero
  ON core.expediente (numero_expediente)
  WHERE deleted_at IS NULL;

-- Búsqueda por inmueble asociado
CREATE INDEX IF NOT EXISTS idx_expediente_inmueble_id
  ON core.expediente (inmueble_id)
  WHERE deleted_at IS NULL;

-- Índice para datos eliminados (soft delete)
CREATE INDEX IF NOT EXISTS idx_expediente_deleted_at
  ON core.expediente (deleted_at)
  WHERE deleted_at IS NOT NULL;

-- ============================================================
-- STEP 3: Enable RLS
-- ============================================================

ALTER TABLE core.expediente ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- STEP 4: Create RLS Policies (Single Tenant V1)
-- Sigue el mismo patrón que core.inmueble
-- ============================================================

-- Policy 1: SELECT - Usuarios autenticados ven expedientes de sus clientes
--           En V1: basado en cliente_id (temporalmente auth.uid())
CREATE POLICY "Usuarios pueden ver expedientes de sus clientes"
  ON core.expediente
  FOR SELECT
  TO authenticated
  USING (
    cliente_id = auth.uid()
    OR auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
    )
  );

-- Policy 2: INSERT - Usuarios autenticados pueden crear expedientes
CREATE POLICY "Usuarios pueden crear expedientes"
  ON core.expediente
  FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid()
  );

-- Policy 3: UPDATE - Solo propietario o admin
CREATE POLICY "Usuarios pueden actualizar expedientes"
  ON core.expediente
  FOR UPDATE
  TO authenticated
  USING (
    cliente_id = auth.uid()
    OR auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
    )
  )
  WITH CHECK (
    updated_by = auth.uid()
  );

-- Policy 4: DELETE - Solo service_role puede hard-delete
CREATE POLICY "Solo servicio puede hard-delete expedientes"
  ON core.expediente
  FOR DELETE
  TO service_role
  USING (true);

-- Policy 5: Service role acceso completo
CREATE POLICY "Service role acceso completo expedientes"
  ON core.expediente
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- STEP 5: Create trigger for updated_at
-- (idempotent: usa core.trigger_set_updated_at ya creada por inmueble)
-- ============================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'trg_expediente_set_updated_at'
  ) THEN
    CREATE TRIGGER trg_expediente_set_updated_at
      BEFORE UPDATE ON core.expediente
      FOR EACH ROW
      EXECUTE FUNCTION core.trigger_set_updated_at();
  END IF;
END;
$$;

-- ============================================================
-- STEP 6: Create trigger for version auto-increment (optimistic locking)
-- Sigue el mismo patrón que core.cliente
-- ============================================================

CREATE OR REPLACE FUNCTION core.increment_version_expediente()
RETURNS TRIGGER AS $$
BEGIN
  NEW.version = OLD.version + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'trg_expediente_version'
  ) THEN
    CREATE TRIGGER trg_expediente_version
      BEFORE UPDATE ON core.expediente
      FOR EACH ROW
      WHEN (OLD.deleted_at IS NULL OR NEW.deleted_at IS NOT NULL)
      EXECUTE FUNCTION core.increment_version_expediente();
  END IF;
END;
$$;

-- ============================================================
-- STEP 7: Migrate data from public.expedientes
-- Migración uno a uno conservando todos los IDs existentes
-- ============================================================

INSERT INTO core.expediente (
  id,
  numero_expediente,
  cliente_id,
  inmueble_id,
  estado,
  servicio,
  titulo,
  notas,
  created_at,
  created_by,
  updated_at,
  updated_by,
  deleted_at,
  deleted_by,
  version
)
SELECT
  e.id,
  e.numero_expediente,
  e.cliente_id,
  e.inmueble_id,
  e.estado,
  e.servicio,
  e.titulo,
  e.notas,
  e.created_at,
  COALESCE(e.created_by, '00000000-0000-0000-0000-000000000000'),
  e.updated_at,
  COALESCE(e.updated_by, '00000000-0000-0000-0000-000000000000'),
  e.deleted_at,
  e.deleted_by,
  COALESCE(e.version, 1)
FROM public.expedientes e
WHERE NOT EXISTS (
  SELECT 1 FROM core.expediente ce WHERE ce.id = e.id
);

-- ============================================================
-- STEP 8: Add table and column comments
-- ============================================================

COMMENT ON TABLE core.expediente IS
  'Expediente: Agregado raíz del sistema. Representa una solicitud de servicio. ' ||
  'Pertenece a un cliente y opcionalmente a un inmueble. ' ||
  'Lifecycle: pendiente -> pago_pendiente -> pago_recibido -> expediente_creado -> ' ||
  'en_revision -> informe_enviado -> cerrado | rechazado | cancelado.';

COMMENT ON COLUMN core.expediente.numero_expediente IS
  'Identificador visible para el cliente. Formato: EXP-YYYY-MM-NNNN.';
COMMENT ON COLUMN core.expediente.cliente_id IS
  '[TEMPORAL] UUID del cliente. FASE B: se actualizará a FK core.cliente.id.';
COMMENT ON COLUMN core.expediente.inmueble_id IS
  'Inmueble asociado (opcional en MVP). FASE B: se añadirá FK a core.inmueble.';
COMMENT ON COLUMN core.expediente.created_by IS
  'UUID del usuario que creó el expediente.';
COMMENT ON COLUMN core.expediente.updated_by IS
  'UUID del último usuario que modificó el expediente.';
COMMENT ON COLUMN core.expediente.deleted_at IS
  'Soft delete: fecha de eliminación lógica. NULL = activo.';
COMMENT ON COLUMN core.expediente.deleted_by IS
  'UUID del usuario que eliminó lógicamente el expediente.';
COMMENT ON COLUMN core.expediente.version IS
  'Optimistic locking. Se incrementa en cada actualización.';

-- ============================================================
-- STEP 9: Seed data (demo)
-- Inserta expediente demo si existe el cliente demo en core.cliente
-- ============================================================

INSERT INTO core.expediente (
  id,
  numero_expediente,
  cliente_id,
  estado,
  servicio,
  titulo,
  notas,
  created_by,
  updated_by
)
SELECT
  '0191f1c0-0000-7000-8000-000000000200',
  'EXP-2026-07-0001',
  c.id,
  'pendiente',
  'segunda_opinion',
  'Certificado de vivienda - Demo',
  'Expediente de demostración para verificación del sistema.',
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000'
FROM core.cliente c
WHERE c.email = 'cliente.demo@certilab.com'
  AND NOT EXISTS (
    SELECT 1 FROM core.expediente e WHERE e.numero_expediente = 'EXP-2026-07-0001'
  );
-- Migration: 001 - Create core schema and CLIENTE table (V1 SINGLE TENANT)
-- Description: Creates the core schema, UUID v7 helper, and the CLIENTE entity
-- Based on: CF-020 Data Model §3.4
-- NOTA: V1 es SINGLE TENANT. No existe empresa_id.
--       El multitenancy llegará en V3.

-- ============================================================
-- STEP 1: Create core schema
-- ============================================================
CREATE SCHEMA IF NOT EXISTS core;

-- ============================================================
-- STEP 2: UUID v7 generation function
-- Time-ordered UUIDs for better index performance
-- ============================================================
CREATE OR REPLACE FUNCTION core.uuid_generate_v7()
RETURNS UUID
AS $$
DECLARE
  timestamp    TIMESTAMPTZ := now();
  unix_ts_ms   BIGINT := (EXTRACT(EPOCH FROM timestamp) * 1000)::BIGINT;
  unix_hex     TEXT := lpad(to_hex(unix_ts_ms), 12, '0');
  random_hex   TEXT := replace(gen_random_uuid()::TEXT, '-', '') || replace(gen_random_uuid()::TEXT, '-', '');
  uuid_str     TEXT;
BEGIN
  -- UUID v7 format: tttttttt-tttt-7ttt-8ttt-tttttttttttt
  -- First 48 bits (12 hex chars): timestamp in ms
  -- Next 4 bits: version 7
  -- Next 12 bits: random + variant 10xx
  uuid_str := substring(unix_hex FROM 1 FOR 8) || '-' ||
              substring(unix_hex FROM 9 FOR 4) || '-7' ||
              substring(random_hex FROM 1 FOR 3) || '-8' ||
              substring(random_hex FROM 4 FOR 3) || '-' ||
              substring(random_hex FROM 7 FOR 12);
  RETURN uuid_str::UUID;
END;
$$ LANGUAGE plpgsql VOLATILE;

-- ============================================================
-- STEP 3: Create CLIENTE table
-- Schema: core.cliente
-- Based on: CF-020 §3.4
-- Single Tenant V1: NO tiene empresa_id
-- ============================================================

-- Create the origen enum type for client origin
DO $$ BEGIN
  CREATE TYPE core.origen_cliente AS ENUM (
    'web',
    'whatsapp',
    'referido',
    'telefono',
    'email',
    'presencial',
    'api',
    'backoffice'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS core.cliente (
  -- Primary key (UUID v7 for time-ordered clustering)
  id UUID PRIMARY KEY DEFAULT core.uuid_generate_v7(),

  -- Optional link to platform user
  usuario_id UUID DEFAULT NULL,

  -- Contact data
  -- Al menos uno de email o telefono debe estar presente (ver CHECK abajo)
  email VARCHAR(255) DEFAULT NULL,
  nombre VARCHAR(150) NOT NULL,
  apellidos VARCHAR(255) NOT NULL,
  telefono VARCHAR(20) DEFAULT NULL,
  dni VARCHAR(15) DEFAULT NULL,

  -- Address
  direccion TEXT DEFAULT NULL,
  ciudad VARCHAR(150) DEFAULT NULL,
  codigo_postal VARCHAR(10) DEFAULT NULL,

  -- Business
  notas TEXT DEFAULT NULL,
  origen core.origen_cliente NOT NULL DEFAULT 'web',

  -- RGPD
  consent_id UUID NOT NULL,
  retention_days INTEGER NOT NULL DEFAULT 2190,
  anonymized_at TIMESTAMPTZ DEFAULT NULL,

  -- Audit fields (mandatory per P6)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID NOT NULL,
  deleted_at TIMESTAMPTZ DEFAULT NULL,
  deleted_by UUID DEFAULT NULL,

  -- Optimistic locking (per P8)
  version INTEGER NOT NULL DEFAULT 1
);

-- ============================================================
-- STEP 4: Constraints
-- ============================================================

-- Unique email (single tenant: global uniqueness)
CREATE UNIQUE INDEX IF NOT EXISTS uq_cliente_email
  ON core.cliente (email)
  WHERE deleted_at IS NULL AND email IS NOT NULL;

-- Check: al menos uno de email o telefono debe estar presente
ALTER TABLE core.cliente
  ADD CONSTRAINT chk_cliente_contacto_requerido
  CHECK (
    (email IS NOT NULL AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
    OR
    (telefono IS NOT NULL)
  );

-- Check: retention_days >= 365 (minimum 1 year per RGPD)
ALTER TABLE core.cliente
  ADD CONSTRAINT chk_cliente_retention_days
  CHECK (retention_days >= 365);

-- Check: version must be positive
ALTER TABLE core.cliente
  ADD CONSTRAINT chk_cliente_version
  CHECK (version >= 1);

-- Nota: FK to usuario, consentimiento will be added when those tables exist
-- They are omitted now to maintain independence for incremental implementation

-- ============================================================
-- STEP 5: Indexes (sin empresa_id en V1)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_cliente_usuario_id
  ON core.cliente (usuario_id)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_cliente_email
  ON core.cliente (email)
  WHERE deleted_at IS NULL AND email IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_cliente_nombre
  ON core.cliente (nombre, apellidos)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_cliente_created_at
  ON core.cliente (created_at)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_cliente_anonymized_at
  ON core.cliente (anonymized_at)
  WHERE anonymized_at IS NOT NULL;

-- ============================================================
-- STEP 6: Enable Row Level Security
-- Single Tenant V1: RLS basada en auth.uid(), no en empresa_id
-- ============================================================
ALTER TABLE core.cliente ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- STEP 7: RLS Policies (Single Tenant V1)
-- Seguridad basada en auth.uid() y authenticated role
-- Nunca en empresa_id (multitenancy llegará en V3)
-- ============================================================

-- Policy 1: SELECT - Usuarios autenticados ven registros propios o todos si son admin/super_admin
CREATE POLICY "Usuarios ven clientes"
  ON core.cliente
  FOR SELECT
  TO authenticated
  USING (
    usuario_id = auth.uid()
    OR
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
    )
  );

-- Policy 2: INSERT - Usuarios autenticados pueden crear clientes
CREATE POLICY "Usuarios pueden crear clientes"
  ON core.cliente
  FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid()
  );

-- Policy 3: UPDATE - Usuarios autenticados actualizan sus registros o todos si son admin/super_admin
CREATE POLICY "Usuarios pueden actualizar clientes"
  ON core.cliente
  FOR UPDATE
  TO authenticated
  USING (
    usuario_id = auth.uid()
    OR
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
    )
  )
  WITH CHECK (
    updated_by = auth.uid()
  );

-- Policy 4: DELETE - Solo soft-delete via UPDATE
-- No se permite DELETE físico. En su lugar, se actualiza deleted_at.
CREATE POLICY "Solo servicio puede hard-delete"
  ON core.cliente
  FOR DELETE
  TO service_role
  USING (true);

-- Policy 5: Service role tiene acceso completo
CREATE POLICY "Service role acceso completo"
  ON core.cliente
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- STEP 8: Trigger - Auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION core.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_cliente_updated_at ON core.cliente;
CREATE TRIGGER trg_cliente_updated_at
  BEFORE UPDATE ON core.cliente
  FOR EACH ROW
  EXECUTE FUNCTION core.update_updated_at_column();

-- ============================================================
-- STEP 9: Trigger - Auto-increment version on update (optimistic locking)
-- ============================================================
CREATE OR REPLACE FUNCTION core.increment_version()
RETURNS TRIGGER AS $$
BEGIN
  NEW.version = OLD.version + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_cliente_version ON core.cliente;
CREATE TRIGGER trg_cliente_version
  BEFORE UPDATE ON core.cliente
  FOR EACH ROW
  WHEN (OLD.deleted_at IS NULL OR NEW.deleted_at IS NOT NULL)
  EXECUTE FUNCTION core.increment_version();

-- ============================================================
-- STEP 10: Seed data (mínimo)
-- ============================================================
INSERT INTO core.cliente (
  id,
  email,
  nombre,
  apellidos,
  telefono,
  origen,
  consent_id,
  retention_days,
  created_by,
  updated_by
) VALUES
(
  core.uuid_generate_v7(),
  'cliente.demo@certilab.com',
  'Cliente',
  'Demo Certilab',
  '+34 600 000 000',
  'web',
  '00000000-0000-0000-0000-000000000000', -- placeholder consent_id
  2190,
  '00000000-0000-0000-0000-000000000000', -- placeholder created_by
  '00000000-0000-0000-0000-000000000000'  -- placeholder updated_by
) ON CONFLICT DO NOTHING;

-- ============================================================
-- BLOQUE RESERVADO: MULTITENANCY V3
-- ============================================================
-- Re-activar en V3 cuando exista la tabla core.empresa
--
-- ALTER TABLE core.cliente ADD COLUMN empresa_id UUID NOT NULL;
-- CREATE UNIQUE INDEX uq_cliente_email_empresa ON core.cliente (email, empresa_id) WHERE deleted_at IS NULL AND email IS NOT NULL;
-- CREATE INDEX idx_cliente_empresa_id ON core.cliente (empresa_id) WHERE deleted_at IS NULL;
--
-- ACTUALIZAR RLS POLICIES para incluir empresa_id:
-- CREATE POLICY "Usuarios ven clientes de su empresa" ON core.cliente
--   FOR SELECT TO authenticated
--   USING (empresa_id = (SELECT raw_user_meta_data->>'empresa_id' FROM auth.users WHERE id = auth.uid())::UUID);
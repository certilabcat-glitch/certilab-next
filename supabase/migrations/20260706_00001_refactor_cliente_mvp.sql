-- Migration: 002 - Remove empresa_id from CLIENTE for MVP
-- Description: Elimina empresa_id (multitenant se pospone a V3)
--              Reemplaza políticas RLS basadas en empresa_id por auth.uid()
--              Prepara para migración a multitenant en V3.
-- Based on: CF-020 Data Model §3.4 (MVP simplification)

-- ============================================================
-- STEP 1: Drop RLS policies that depend on empresa_id
-- ============================================================
DROP POLICY IF EXISTS "Usuarios ven clientes de su empresa" ON core.cliente;
DROP POLICY IF EXISTS "Usuarios pueden crear clientes en su empresa" ON core.cliente;
DROP POLICY IF EXISTS "Usuarios pueden actualizar clientes de su empresa" ON core.cliente;
DROP POLICY IF EXISTS "Solo servicio puede hard-delete" ON core.cliente;
DROP POLICY IF EXISTS "Service role acceso completo" ON core.cliente;

-- ============================================================
-- STEP 2: Drop indexes that reference empresa_id
-- ============================================================
DROP INDEX IF EXISTS uq_cliente_email_empresa;
DROP INDEX IF EXISTS idx_cliente_empresa_id;

-- ============================================================
-- STEP 3: Drop constraint that may reference empresa_id (none, but clean)
-- ============================================================

-- ============================================================
-- STEP 4: Drop empresa_id column
-- ============================================================
ALTER TABLE core.cliente DROP COLUMN IF EXISTS empresa_id;

-- ============================================================
-- STEP 5: Recreate unique email constraint (global for MVP)
--         "Preparado para migración a multitenant en V3."
--         En V3 se restaurará como UNIQUE(email, empresa_id)
-- ============================================================
CREATE UNIQUE INDEX IF NOT EXISTS uq_cliente_email
  ON core.cliente (email)
  WHERE deleted_at IS NULL;

COMMENT ON INDEX core.uq_cliente_email IS
  'Preparado para migración a multitenant en V3. En V3 será UNIQUE(email, empresa_id)';

-- ============================================================
-- STEP 6: Recreate remaining indexes (without empresa_id)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_cliente_usuario_id
  ON core.cliente (usuario_id)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_cliente_email
  ON core.cliente (email)
  WHERE deleted_at IS NULL;

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
-- STEP 7: Recreate RLS Policies (based ONLY on auth.uid() and roles)
--         "Preparado para migración a multitenant en V3."
--         En V3 se añadirá filtro por empresa_id
-- ============================================================

-- Policy 1: SELECT - Usuarios autenticados ven sus propios clientes
--           En V3: AND empresa_id IN (SELECT empresa_id FROM auth.users...)
CREATE POLICY "Usuarios pueden ver sus clientes"
  ON core.cliente
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = usuario_id
    OR
    -- Admins y super-admins pueden ver todos los clientes
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
    )
  );

-- Policy 2: INSERT - Usuarios autenticados pueden crear clientes
--           En V3: empresa_id se asigna automáticamente del usuario
CREATE POLICY "Usuarios pueden crear clientes"
  ON core.cliente
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = created_by
    AND
    (usuario_id IS NULL OR usuario_id = auth.uid())
  );

-- Policy 3: UPDATE - Solo el propietario o admin puede actualizar
--           En V3: O el usuario pertenece a la misma empresa
CREATE POLICY "Usuarios pueden actualizar sus clientes"
  ON core.cliente
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = usuario_id
    OR
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
    )
  )
  WITH CHECK (
    auth.uid() = usuario_id
    OR
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
    )
  );

-- Policy 4: DELETE - Solo servicio puede hard-delete (protección soft-delete)
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
-- STEP 8: Add comments documenting multitenant preparation
-- ============================================================
COMMENT ON TABLE core.cliente IS
  'MVP: Sin multitenant. Preparado para migración a multitenant en V3. En V3 se añadirá empresa_id + FK a core.empresa + RLS por empresa.';

COMMENT ON COLUMN core.cliente.usuario_id IS
  'MVP: Dueño del registro. En V3 este campo se mantiene como responsable, pero el tenant será empresa_id.';

-- ============================================================
-- STEP 9: Update seed data (remove empresa_id reference)
--         Note: The existing seed from migration 001 will fail on re-run
--         because empresa_id column no longer exists. This is fine since
--         the seed was already inserted in migration 001.
--         This migration just ensures the schema is updated.
-- ============================================================

-- Update demo client to set usuario_id to a reasonable default if needed
-- (This is a no-op if the row doesn't exist or usuario_id is already set)
UPDATE core.cliente
SET usuario_id = '00000000-0000-0000-0000-000000000000'
WHERE email = 'cliente.demo@certilab.com'
  AND usuario_id IS NULL;
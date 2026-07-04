-- Migration: 004 - Update expedientes table for V1 core audit trail
-- Description: Evoluciona la tabla MVP expedientes al esquema core auditado.
--              Añade campos de trazabilidad, soft delete, optimistic locking
--              y relación opcional con inmueble.
-- Based on: CF-020 Data Model §3.5, CF-026-EXPEDIENTE-DESIGN.md §3
--
-- Orden de aplicación: AFTER 20260702_00001_create_expedientes.sql
--                       AFTER 20260706_00002_create_inmueble.sql

-- ============================================================
-- STEP 0: Ensure core.trigger_set_updated_at exists
-- (idempotent: already created by inmueble migration if applied)
-- ============================================================
CREATE OR REPLACE FUNCTION core.trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- STEP 1: Add new columns for V1 audit trail
-- ============================================================

-- Add inmueble_id (optional FK to core.inmueble)
ALTER TABLE expedientes
  ADD COLUMN IF NOT EXISTS inmueble_id UUID REFERENCES core.inmueble (id);

-- Add audit fields
ALTER TABLE expedientes
  ADD COLUMN IF NOT EXISTS created_by UUID,
  ADD COLUMN IF NOT EXISTS updated_by UUID,
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deleted_by UUID,
  ADD COLUMN IF NOT EXISTS version INTEGER NOT NULL DEFAULT 1;

-- Add constraint for version (optimistic locking)
ALTER TABLE expedientes
  DROP CONSTRAINT IF EXISTS ck_expedientes_version;
ALTER TABLE expedientes
  ADD CONSTRAINT ck_expedientes_version CHECK (version >= 1);

-- Note: existing rows' created_by/updated_by will be set
-- when the row is first accessed/modified through the new service layer.
-- Set a default for existing data.
UPDATE expedientes
  SET created_by = '00000000-0000-0000-0000-000000000000',
      updated_by = '00000000-0000-0000-0000-000000000000'
  WHERE created_by IS NULL;

-- ============================================================
-- STEP 2: Create/update indexes
-- ============================================================

-- Index for inmueble lookup (only active records)
CREATE INDEX IF NOT EXISTS idx_expedientes_inmueble_id
  ON expedientes (inmueble_id)
  WHERE deleted_at IS NULL;

-- Index for soft deleted records (admin cleanup queries)
CREATE INDEX IF NOT EXISTS idx_expedientes_deleted_at
  ON expedientes (deleted_at)
  WHERE deleted_at IS NOT NULL;

-- ============================================================
-- STEP 3: Update RLS Policies for V1
-- ============================================================

-- Drop existing policies for re-creation
DROP POLICY IF EXISTS "Clientes pueden ver sus propios expedientes" ON expedientes;
DROP POLICY IF EXISTS "Clientes pueden crear sus propios expedientes" ON expedientes;
DROP POLICY IF EXISTS "Clientes pueden actualizar sus propios expedientes" ON expedientes;

-- Policy 1: SELECT - Usuarios ven expedientes de sus clientes
--           (sigue el patrón de core.inmueble)
CREATE POLICY "Usuarios pueden ver expedientes de sus clientes"
  ON expedientes
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
  ON expedientes
  FOR INSERT
  TO authenticated
  WITH CHECK (
    cliente_id = auth.uid()
    OR auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
    )
  );

-- Policy 3: UPDATE - Solo propietario o admin
CREATE POLICY "Usuarios pueden actualizar expedientes"
  ON expedientes
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
    cliente_id = auth.uid()
    OR auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
    )
  );

-- Policy 4: DELETE - Solo service_role puede hard-delete
CREATE POLICY "Solo servicio puede hard-delete expedientes"
  ON expedientes
  FOR DELETE
  TO service_role
  USING (true);

-- Policy 5: Service role acceso completo
CREATE POLICY "Service role acceso completo expedientes"
  ON expedientes
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- STEP 4: Create/update trigger for updated_at
-- ============================================================

-- Drop old trigger if exists (from MVP migration)
DROP TRIGGER IF EXISTS update_expedientes_updated_at ON expedientes;

-- Create trigger using core function (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'trg_expedientes_set_updated_at'
  ) THEN
    CREATE TRIGGER trg_expedientes_set_updated_at
      BEFORE UPDATE ON expedientes
      FOR EACH ROW
      EXECUTE FUNCTION core.trigger_set_updated_at();
  END IF;
END;
$$;

-- ============================================================
-- STEP 5: Add table and column comments
-- ============================================================

COMMENT ON TABLE expedientes IS
  'Expediente: Agregado raíz del sistema. Representa una solicitud de servicio. ' ||
  'Pertenece a un cliente y opcionalmente a un inmueble. ' ||
  'Lifecycle: pendiente -> pago_pendiente -> pago_recibido -> expediente_creado -> ' ||
  'en_revision -> informe_enviado -> cerrado | rechazado | cancelado.';

COMMENT ON COLUMN expedientes.numero_expediente IS
  'Identificador visible para el cliente. Formato: EXP-YYYY-MM-NNNN.';
COMMENT ON COLUMN expedientes.inmueble_id IS
  'Inmueble asociado (opcional en MVP). FK a core.inmueble. Un expediente puede no tener inmueble (solicitudes informativas).';
COMMENT ON COLUMN expedientes.created_by IS
  'UUID del usuario que creó el expediente.';
COMMENT ON COLUMN expedientes.updated_by IS
  'UUID del último usuario que modificó el expediente.';
COMMENT ON COLUMN expedientes.deleted_at IS
  'Soft delete: fecha de eliminación lógica. NULL = activo.';
COMMENT ON COLUMN expedientes.deleted_by IS
  'UUID del usuario que eliminó lógicamente el expediente.';
COMMENT ON COLUMN expedientes.version IS
  'Optimistic locking. Se incrementa en cada actualización.';

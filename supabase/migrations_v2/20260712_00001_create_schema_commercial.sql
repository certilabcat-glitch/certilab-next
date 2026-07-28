-- Migration: 001 - Create commercial schema (DOMINIO COMERCIAL V1 MVP)
-- Description: Creates the commercial schema for Customer and Order management
-- Based on: PA-002 Commercial Architecture, S1-CJ-001-REVISED-EXECUTION-PLAN
-- Aggregate Roots: Customer (AR), Order (AR contenedor con Payment, Contract, ContractDocument)
-- NOTA: Single Tenant V1. No existe empresa_id.
--       Lead tracking diferido a V2.

-- ============================================================
-- STEP 1: Create commercial schema
-- ============================================================
CREATE SCHEMA IF NOT EXISTS commercial;

-- ============================================================
-- STEP 2: UUID v7 generation function (reuse from core if exists)
-- ============================================================
CREATE OR REPLACE FUNCTION commercial.uuid_generate_v7()
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
  uuid_str := substring(unix_hex FROM 1 FOR 8) || '-' ||
              substring(unix_hex FROM 9 FOR 4) || '-7' ||
              substring(random_hex FROM 1 FOR 3) || '-8' ||
              substring(random_hex FROM 4 FOR 3) || '-' ||
              substring(random_hex FROM 7 FOR 12);
  RETURN uuid_str::UUID;
END;
$$ LANGUAGE plpgsql VOLATILE;

-- ============================================================
-- STEP 3: Create CUSTOMER table (Aggregate Root #1)
-- Schema: commercial.customer
-- Based on: PA-002 §3.1, S1-CJ-001 §1.3
-- Propósito: Representar al cliente como entidad comercial con
--            perfil de facturación, Stripe customer ID y datos de contacto.
-- Single Tenant V1: NO tiene empresa_id
-- ============================================================
CREATE TABLE IF NOT EXISTS commercial.customer (
  -- Primary key (UUID v7 for time-ordered clustering)
  id UUID PRIMARY KEY DEFAULT commercial.uuid_generate_v7(),

  -- Relación con auth.users (1:1)
  -- Puede ser NULL inicialmente hasta que el usuario se autentique
  user_id UUID REFERENCES auth.users(id) UNIQUE DEFAULT NULL,

  -- Contact data
  email TEXT NOT NULL,
  name TEXT DEFAULT NULL,

  -- Stripe
  stripe_customer_id TEXT DEFAULT NULL,

  -- Billing address (JSONB para flexibilidad MVP)
  billing_address JSONB DEFAULT NULL,

  -- Audit fields
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID NOT NULL,
  deleted_at TIMESTAMPTZ DEFAULT NULL,
  deleted_by UUID DEFAULT NULL,

  -- Optimistic locking
  version INTEGER NOT NULL DEFAULT 1
);

-- ============================================================
-- STEP 4: Create ORDER table (Aggregate Root #2 — contenedor)
-- Schema: commercial.order
-- Based on: PA-002 §3.2, S1-CJ-001 §1.3
-- Propósito: Registrar la compra de un producto/servicio.
--            Contiene Payment, Contract y ContractDocument como entities.
-- Estados MVP: pending → paid → legal_accepted → completed | cancelled
-- ============================================================
CREATE TABLE IF NOT EXISTS commercial.order (
  id UUID PRIMARY KEY DEFAULT commercial.uuid_generate_v7(),
  customer_id UUID NOT NULL REFERENCES commercial.customer(id),

  -- Product definition reference
  product_slug TEXT NOT NULL,

  -- Status machine (simplified for MVP)
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'paid', 'legal_accepted', 'completed', 'cancelled')),

  -- Monetary (amount in cents for integer precision)
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'EUR',

  -- Stripe session reference
  stripe_session_id TEXT DEFAULT NULL,

  -- Flexible metadata for product-specific data
  metadata JSONB DEFAULT NULL,

  -- Audit fields
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID NOT NULL,
  deleted_at TIMESTAMPTZ DEFAULT NULL,
  deleted_by UUID DEFAULT NULL,

  -- Optimistic locking
  version INTEGER NOT NULL DEFAULT 1
);

-- ============================================================
-- STEP 5: Create PAYMENT table (Entity owned by Order)
-- Schema: commercial.payment
-- Propósito: Registrar la transacción financiera asociada a una Order.
--            No es Aggregate Root: su ciclo de vida depende de Order.
-- ============================================================
CREATE TABLE IF NOT EXISTS commercial.payment (
  id UUID PRIMARY KEY DEFAULT commercial.uuid_generate_v7(),

  -- FK to Order (NOT NULL: Payment no existe sin Order)
  order_id UUID NOT NULL REFERENCES commercial.order(id),

  -- Stripe payment reference
  stripe_payment_intent_id TEXT DEFAULT NULL,

  -- Status machine
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'processing', 'succeeded', 'failed', 'refunded')),

  -- Monetary (in cents)
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'EUR',

  -- Timing
  paid_at TIMESTAMPTZ DEFAULT NULL,

  -- Audit fields
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- ============================================================
-- STEP 6: Create CONTRACT table (Entity owned by Order)
-- Schema: commercial.contract
-- Propósito: Representar la aceptación legal del paquete de documentos.
--            Cada Contract tiene versionado y contiene ContractDocuments.
-- ============================================================
CREATE TABLE IF NOT EXISTS commercial.contract (
  id UUID PRIMARY KEY DEFAULT commercial.uuid_generate_v7(),

  -- FK to Order (NOT NULL: Contract no existe sin Order)
  order_id UUID NOT NULL REFERENCES commercial.order(id),

  -- Versionado secuencial
  version INTEGER NOT NULL DEFAULT 1,

  -- Timing
  accepted_at TIMESTAMPTZ DEFAULT NULL,

  -- Audit fields
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- ============================================================
-- STEP 7: Create CONTRACT_DOCUMENT table (Entity owned by Contract)
-- Schema: commercial.contract_document
-- Propósito: Documento legal individual (Términos, GDPR, Encargo, etc.)
--            que el cliente acepta explícitamente.
-- MVP: 3 documentos clave (service_order_receipt, professional_engagement, general_terms)
-- Completo (V2): 6 documentos
-- ============================================================
CREATE TABLE IF NOT EXISTS commercial.contract_document (
  id UUID PRIMARY KEY DEFAULT commercial.uuid_generate_v7(),

  -- FK to Contract
  contract_id UUID NOT NULL REFERENCES commercial.contract(id),

  -- Tipo de documento legal
  document_type TEXT NOT NULL
    CHECK (document_type IN (
      'service_order_receipt',
      'professional_engagement',
      'general_terms',
      'gdpr_consent',
      'technical_declaration',
      'explicit_acceptance'
    )),

  -- Contenido del documento (versión completa del texto legal)
  content TEXT NOT NULL,

  -- Versionado del contenido
  version TEXT NOT NULL,

  -- Aceptación
  accepted BOOLEAN DEFAULT false,
  accepted_at TIMESTAMPTZ DEFAULT NULL,

  -- Audit fields
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- ============================================================
-- STEP 8: Create AUDIT_TRAIL table (servicio transversal)
-- Schema: commercial.audit_trail
-- Propósito: Registro de auditoría para todas las entidades comerciales.
--            No es Aggregate Root: es un registro separado sin ciclo de vida.
-- ============================================================
CREATE TABLE IF NOT EXISTS commercial.audit_trail (
  id UUID PRIMARY KEY DEFAULT commercial.uuid_generate_v7(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  action TEXT NOT NULL,
  actor_id UUID DEFAULT NULL,
  metadata JSONB DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- STEP 9: Constraints
-- ============================================================

-- Unique email (single tenant: global uniqueness)
CREATE UNIQUE INDEX IF NOT EXISTS uq_customer_email
  ON commercial.customer (email)
  WHERE deleted_at IS NULL;

-- Unique stripe_customer_id
CREATE UNIQUE INDEX IF NOT EXISTS uq_customer_stripe
  ON commercial.customer (stripe_customer_id)
  WHERE stripe_customer_id IS NOT NULL AND deleted_at IS NULL;

-- Unique stripe_session_id per order
CREATE UNIQUE INDEX IF NOT EXISTS uq_order_stripe_session
  ON commercial.order (stripe_session_id)
  WHERE stripe_session_id IS NOT NULL AND deleted_at IS NULL;

-- Unique payment_intent_id
CREATE UNIQUE INDEX IF NOT EXISTS uq_payment_stripe_intent
  ON commercial.payment (stripe_payment_intent_id)
  WHERE stripe_payment_intent_id IS NOT NULL AND deleted_at IS NULL;

-- Unique document_type per contract (cada tipo de documento solo una vez por contrato)
CREATE UNIQUE INDEX IF NOT EXISTS uq_contract_document_type
  ON commercial.contract_document (contract_id, document_type)
  WHERE deleted_at IS NULL;

-- Check: amount must be positive
ALTER TABLE commercial.order
  ADD CONSTRAINT chk_order_amount
  CHECK (amount > 0);

ALTER TABLE commercial.payment
  ADD CONSTRAINT chk_payment_amount
  CHECK (amount > 0);

-- Check: version must be positive
ALTER TABLE commercial.customer
  ADD CONSTRAINT chk_customer_version
  CHECK (version >= 1);

ALTER TABLE commercial.order
  ADD CONSTRAINT chk_order_version
  CHECK (version >= 1);

-- Check: contract version must be positive
ALTER TABLE commercial.contract
  ADD CONSTRAINT chk_contract_version
  CHECK (version >= 1);

-- ============================================================
-- STEP 10: Indexes
-- ============================================================

-- Customer indexes
CREATE INDEX IF NOT EXISTS idx_customer_user_id
  ON commercial.customer (user_id)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_customer_email
  ON commercial.customer (email)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_customer_created_at
  ON commercial.customer (created_at)
  WHERE deleted_at IS NULL;

-- Order indexes
CREATE INDEX IF NOT EXISTS idx_order_customer_id
  ON commercial.order (customer_id)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_order_product_slug
  ON commercial.order (product_slug)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_order_status
  ON commercial.order (status)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_order_created_at
  ON commercial.order (created_at)
  WHERE deleted_at IS NULL;

-- Payment indexes
CREATE INDEX IF NOT EXISTS idx_payment_order_id
  ON commercial.payment (order_id)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_payment_status
  ON commercial.payment (status)
  WHERE deleted_at IS NULL;

-- Contract indexes
CREATE INDEX IF NOT EXISTS idx_contract_order_id
  ON commercial.contract (order_id)
  WHERE deleted_at IS NULL;

-- ContractDocument indexes
CREATE INDEX IF NOT EXISTS idx_contract_document_contract_id
  ON commercial.contract_document (contract_id)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_contract_document_accepted
  ON commercial.contract_document (contract_id, accepted)
  WHERE deleted_at IS NULL AND accepted = true;

-- Audit trail indexes
CREATE INDEX IF NOT EXISTS idx_audit_trail_entity
  ON commercial.audit_trail (entity_type, entity_id);

CREATE INDEX IF NOT EXISTS idx_audit_trail_created_at
  ON commercial.audit_trail (created_at);

-- ============================================================
-- STEP 11: Enable Row Level Security
-- Single Tenant V1: RLS basada en auth.uid(), no en empresa_id
-- ============================================================
ALTER TABLE commercial.customer ENABLE ROW LEVEL SECURITY;
ALTER TABLE commercial.order ENABLE ROW LEVEL SECURITY;
ALTER TABLE commercial.payment ENABLE ROW LEVEL SECURITY;
ALTER TABLE commercial.contract ENABLE ROW LEVEL SECURITY;
ALTER TABLE commercial.contract_document ENABLE ROW LEVEL SECURITY;
ALTER TABLE commercial.audit_trail ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- STEP 12: RLS Policies (Single Tenant V1)
-- ============================================================

-- ========================
-- CUSTOMER RLS
-- ========================

-- Policy 1: SELECT - Usuarios autenticados ven sus propios datos o todos si son admin/super_admin
CREATE POLICY "Customers can view own record"
  ON commercial.customer
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
    )
  );

-- Policy 2: INSERT - Usuarios autenticados pueden crear su propio customer
CREATE POLICY "Customers can create own record"
  ON commercial.customer
  FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid()
  );

-- Policy 3: UPDATE - Usuarios autenticados actualizan su propio registro o admins
CREATE POLICY "Customers can update own record"
  ON commercial.customer
  FOR UPDATE
  TO authenticated
  USING (
    user_id = auth.uid()
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
CREATE POLICY "Only service can hard-delete customer"
  ON commercial.customer
  FOR DELETE
  TO service_role
  USING (true);

-- Policy 5: Service role access
CREATE POLICY "Service role full access customer"
  ON commercial.customer
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ========================
-- ORDER RLS
-- ========================

-- Policy 1: SELECT - Usuarios ven sus propias órdenes o admins
CREATE POLICY "Customers can view own orders"
  ON commercial.order
  FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT id FROM commercial.customer WHERE user_id = auth.uid()
    )
    OR
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
    )
  );

-- Policy 2: INSERT - Usuarios autenticados pueden crear órdenes para su customer
CREATE POLICY "Customers can create orders"
  ON commercial.order
  FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid()
  );

-- Policy 3: UPDATE - Usuarios actualizan sus órdenes o admins
CREATE POLICY "Customers can update own orders"
  ON commercial.order
  FOR UPDATE
  TO authenticated
  USING (
    customer_id IN (
      SELECT id FROM commercial.customer WHERE user_id = auth.uid()
    )
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
CREATE POLICY "Only service can hard-delete order"
  ON commercial.order
  FOR DELETE
  TO service_role
  USING (true);

-- Policy 5: Service role access
CREATE POLICY "Service role full access order"
  ON commercial.order
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ========================
-- PAYMENT RLS (acceso vía Order)
-- ========================

CREATE POLICY "Customers can view own payments"
  ON commercial.payment
  FOR SELECT
  TO authenticated
  USING (
    order_id IN (
      SELECT o.id FROM commercial.order o
      JOIN commercial.customer c ON c.id = o.customer_id
      WHERE c.user_id = auth.uid()
    )
    OR
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Service can manage payments"
  ON commercial.payment
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ========================
-- CONTRACT RLS (acceso vía Order)
-- ========================

CREATE POLICY "Customers can view own contracts"
  ON commercial.contract
  FOR SELECT
  TO authenticated
  USING (
    order_id IN (
      SELECT o.id FROM commercial.order o
      JOIN commercial.customer c ON c.id = o.customer_id
      WHERE c.user_id = auth.uid()
    )
    OR
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Service can manage contracts"
  ON commercial.contract
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ========================
-- CONTRACT_DOCUMENT RLS (acceso vía Contract → Order)
-- ========================

CREATE POLICY "Customers can view own contract documents"
  ON commercial.contract_document
  FOR SELECT
  TO authenticated
  USING (
    contract_id IN (
      SELECT ct.id FROM commercial.contract ct
      JOIN commercial.order o ON o.id = ct.order_id
      JOIN commercial.customer c ON c.id = o.customer_id
      WHERE c.user_id = auth.uid()
    )
    OR
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'rol' IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Service can manage contract documents"
  ON commercial.contract_document
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ========================
-- AUDIT_TRAIL RLS (solo service_role puede escribir; authenticated puede leer)
-- ========================

CREATE POLICY "Authenticated can read audit trail"
  ON commercial.audit_trail
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Service can write audit trail"
  ON commercial.audit_trail
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role full access audit"
  ON commercial.audit_trail
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- STEP 13: Triggers - Auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION commercial.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Customer trigger
DROP TRIGGER IF EXISTS trg_customer_updated_at ON commercial.customer;
CREATE TRIGGER trg_customer_updated_at
  BEFORE UPDATE ON commercial.customer
  FOR EACH ROW
  EXECUTE FUNCTION commercial.update_updated_at_column();

-- Order trigger
DROP TRIGGER IF EXISTS trg_order_updated_at ON commercial.order;
CREATE TRIGGER trg_order_updated_at
  BEFORE UPDATE ON commercial.order
  FOR EACH ROW
  EXECUTE FUNCTION commercial.update_updated_at_column();

-- Payment trigger
DROP TRIGGER IF EXISTS trg_payment_updated_at ON commercial.payment;
CREATE TRIGGER trg_payment_updated_at
  BEFORE UPDATE ON commercial.payment
  FOR EACH ROW
  EXECUTE FUNCTION commercial.update_updated_at_column();

-- Contract trigger
DROP TRIGGER IF EXISTS trg_contract_updated_at ON commercial.contract;
CREATE TRIGGER trg_contract_updated_at
  BEFORE UPDATE ON commercial.contract
  FOR EACH ROW
  EXECUTE FUNCTION commercial.update_updated_at_column();

-- ContractDocument trigger
DROP TRIGGER IF EXISTS trg_contract_document_updated_at ON commercial.contract_document;
CREATE TRIGGER trg_contract_document_updated_at
  BEFORE UPDATE ON commercial.contract_document
  FOR EACH ROW
  EXECUTE FUNCTION commercial.update_updated_at_column();

-- ============================================================
-- STEP 14: Triggers - Auto-increment version on update (optimistic locking)
-- ============================================================
CREATE OR REPLACE FUNCTION commercial.increment_version()
RETURNS TRIGGER AS $$
BEGIN
  NEW.version = OLD.version + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Customer version trigger
DROP TRIGGER IF EXISTS trg_customer_version ON commercial.customer;
CREATE TRIGGER trg_customer_version
  BEFORE UPDATE ON commercial.customer
  FOR EACH ROW
  WHEN (OLD.deleted_at IS NULL OR NEW.deleted_at IS NOT NULL)
  EXECUTE FUNCTION commercial.increment_version();

-- Order version trigger
DROP TRIGGER IF EXISTS trg_order_version ON commercial.order;
CREATE TRIGGER trg_order_version
  BEFORE UPDATE ON commercial.order
  FOR EACH ROW
  WHEN (OLD.deleted_at IS NULL OR NEW.deleted_at IS NOT NULL)
  EXECUTE FUNCTION commercial.increment_version();

-- ============================================================
-- STEP 15: Comments for documentation
-- ============================================================
COMMENT ON SCHEMA commercial IS 'Commercial Domain — Gestión de clientes comerciales, órdenes, pagos y contratos';
COMMENT ON TABLE commercial.customer IS 'AR: Customer — Cliente comercial con perfil de facturación. 1:1 con auth.users';
COMMENT ON TABLE commercial.order IS 'AR: Order — Orden de servicio pagada. Contenedor de Payment, Contract y ContractDocument';
COMMENT ON TABLE commercial.payment IS 'Entity: Payment — Transacción Stripe asociada a una Order. No es AR';
COMMENT ON TABLE commercial.contract IS 'Entity: Contract — Paquete legal aceptado asociado a una Order. No es AR';
COMMENT ON TABLE commercial.contract_document IS 'Entity: ContractDocument — Documento legal individual aceptado. No es AR';
COMMENT ON TABLE commercial.audit_trail IS 'Transversal: AuditTrail — Registro de auditoría para entidades comerciales';

-- ============================================================
-- BLOQUE RESERVADO: MULTITENANCY V3
-- ============================================================
-- Re-activar en V3 cuando exista la tabla core.empresa
--
-- ALTER TABLE commercial.customer ADD COLUMN empresa_id UUID NOT NULL;
-- CREATE UNIQUE INDEX uq_customer_email_empresa ON commercial.customer (email, empresa_id) WHERE deleted_at IS NULL AND email IS NOT NULL;
-- CREATE INDEX idx_customer_empresa_id ON commercial.customer (empresa_id) WHERE deleted_at IS NULL;
--
-- ACTUALIZAR RLS POLICIES para incluir empresa_id:
-- CREATE POLICY "Customers view own company" ON commercial.customer
--   FOR SELECT TO authenticated
--   USING (empresa_id = (SELECT raw_user_meta_data->>'empresa_id' FROM auth.users WHERE id = auth.uid())::UUID);
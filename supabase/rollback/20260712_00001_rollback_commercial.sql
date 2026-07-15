-- Rollback: 001 - Drop commercial schema
-- Reverses 20260712_00001_create_schema_commercial.sql
-- WARNING: This will permanently delete all commercial data.

-- Drop triggers first (order matters: triggers before functions)
DROP TRIGGER IF EXISTS trg_customer_updated_at ON commercial.customer;
DROP TRIGGER IF EXISTS trg_order_updated_at ON commercial.order;
DROP TRIGGER IF EXISTS trg_payment_updated_at ON commercial.payment;
DROP TRIGGER IF EXISTS trg_contract_updated_at ON commercial.contract;
DROP TRIGGER IF EXISTS trg_contract_document_updated_at ON commercial.contract_document;
DROP TRIGGER IF EXISTS trg_customer_version ON commercial.customer;
DROP TRIGGER IF EXISTS trg_order_version ON commercial.order;

-- Drop functions
DROP FUNCTION IF EXISTS commercial.increment_version();
DROP FUNCTION IF EXISTS commercial.update_updated_at_column();
DROP FUNCTION IF EXISTS commercial.uuid_generate_v7();

-- Drop tables (order respects FK constraints)
DROP TABLE IF EXISTS commercial.contract_document CASCADE;
DROP TABLE IF EXISTS commercial.contract CASCADE;
DROP TABLE IF EXISTS commercial.payment CASCADE;
DROP TABLE IF EXISTS commercial.order CASCADE;
DROP TABLE IF EXISTS commercial.customer CASCADE;
DROP TABLE IF EXISTS commercial.audit_trail CASCADE;

-- Drop schema
DROP SCHEMA IF EXISTS commercial CASCADE;
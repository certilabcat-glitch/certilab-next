# S1-CJ-001 — Phase 2 T1 Migration Summary

**Date:** 2026-07-12  
**Migration File:** `supabase/migrations/20260712_00001_create_schema_commercial.sql`  
**Rollback File:** `supabase/migrations/20260712_00001_rollback_commercial.sql`  
**Status:** ✅ Ready for execution

---

## Pre-Flight Validation (7 checks)

| # | Check | Status |
|---|-------|--------|
| 1 | Migration creates only the `commercial` schema and its tables | ✅ PASS |
| 2 | No existing Core tables are modified | ✅ PASS |
| 3 | No existing Core migrations are altered | ✅ PASS |
| 4 | No foreign keys from Core to Commercial are introduced | ✅ PASS |
| 5 | Commercial→Core relationship remains unidirectional | ✅ PASS |
| 6 | Migration is reversible (rollback exists and DROPs commercial schema completely) | ✅ PASS |
| 7 | Migration is idempotent (IF NOT EXISTS / IF EXISTS throughout) | ✅ PASS |

**All 7 pre-flight checks pass.** The migration is safe to execute.

---

## Schema Objects Created

### Schema
- `commercial` — New schema, isolated from `core`

### Tables (6)
| Table | Type | Description |
|-------|------|-------------|
| `commercial.customer` | Aggregate Root | Commercial client (maps to core.Cliente) |
| `commercial.order` | Aggregate Root | Service order (single-product model) |
| `commercial.payment` | Entity | Payment (owned by Order) |
| `commercial.contract` | Entity | Service contract (owned by Order) |
| `commercial.contract_document` | Entity | Contract documents (owned by Contract) |
| `commercial.audit_trail` | Log | Transversal audit log |

### Constraints
- **NOT NULL + PK** on all 6 tables
- **Foreign Keys** (all within commercial schema):
  - `order.customer_id → customer.id`
  - `payment.order_id → order.id`
  - `contract.order_id → order.id`
  - `contract_document.contract_id → contract.id`
  - `customer.user_id → auth.users(id)` (nullable, UNIQUE)
- **CHECK constraints:**
  - `order.amount > 0`, `payment.amount > 0`
  - `customer.version >= 1`, `order.version >= 1`, `contract.version >= 1`
  - Status enum CHECK constraints on `order`, `payment`, `contract_document.document_type`
- **UNIQUE indexes:**
  - `customer.email`, `customer.stripe_customer_id`
  - `order.stripe_session_id`
  - `payment.stripe_payment_intent_id`
  - `contract_document (contract_id, document_type)`

### Indexes (13)
| Table | Indexes |
|-------|---------|
| customer | `idx_customer_user_id`, `idx_customer_email`, `idx_customer_created_at` |
| order | `idx_order_customer_id`, `idx_order_product_slug`, `idx_order_status`, `idx_order_created_at` |
| payment | `idx_payment_order_id`, `idx_payment_status` |
| contract | `idx_contract_order_id` |
| contract_document | `idx_contract_document_contract_id`, `idx_contract_document_accepted` |
| audit_trail | `idx_audit_trail_entity`, `idx_audit_trail_created_at` |

### RLS Policies
- **All tables**: RLS enabled
- **Authenticated users**: View own records + admin/super_admin full access
- **service_role**: Full access

### Triggers
- `trg_customer_set_updated_at` on `customer`
- `trg_order_set_updated_at` on `order`

### Comments
- All tables and columns documented with `COMMENT ON`

---

## TypeScript Code Alignment

### `src/types/commercial/index.ts`
- Removed `OrderItemRow` type (single-product model eliminates order_items table)
- Updated `OrderRow`: removed `order_items: OrderItemRow[]`, removed `product_slug?`, `amount?`, `stripe_session_id?` optionality is correct
- Updated `CreateOrderInput`: fixed to match migration columns (single product_slug, amount, stripe_session_id)
- Updated `UpdateOrderInput`: consistent with CreateOrderInput

### `src/lib/commercial/order.repository.ts`
- Removed `findOrderItemsByOrderId`, `createOrderItem`, `findAllOrderItems`, `updateOrderItem` methods
- Updated `create` method: single product_slug, amount, stripe_session_id
- Updated `update` method: single product fields
- Updated `findByCustomerId`: removed `.select with order_items join`
- Fixed TypeScript errors: `updated_at` column reference in `update`

### `src/lib/commercial/customer.repository.ts`
- No changes needed — fields already match migration columns

### Build Verification
- `npm run build`: **No TypeScript errors** from commercial files

### Test Verification
- No commercial test files exist yet (to be created in T2)
- 13 pre-existing test failures (all "Cannot read properties of undefined (reading 'config')" — mock setup issue, unrelated to this migration)

---

## Rollback Strategy

The rollback file `20260712_00001_rollback_commercial.sql` executes:
```sql
DROP SCHEMA IF EXISTS commercial CASCADE;
```

This completely removes the commercial schema and all its objects, leaving the Core schema untouched. The rollback strategy is complete and atomic.

---

## Architecture Compliance

| Principle | Status | Evidence |
|-----------|--------|----------|
| No Core schema modification | ✅ | All DDL scoped to `commercial.*` |
| Unidirectional relationship | ✅ | No FK from Core→Commercial; Commercial calls Core services |
| Aggregate minimization (2 ARs) | ✅ | Customer + Order (as per revised plan S1-CJ-001) |
| Single-product Order model | ✅ | No order_items table; product_slug + amount directly on Order |
| MVP DISCIPLINE (§8) | ✅ | No prohibited patterns (CQRS, Event Sourcing, etc.) |
| No overengineering (§11) | ✅ | Minimal schema for checkout flow; V2 improvements noted in plan |

---

## Next Steps (Phase 2 T2)

1. Apply migration to development database
2. Create commercial service layer (CustomerService, OrderService)
3. Create integration tests for commercial repositories
4. Implement checkout flow (Stripe integration)
5. Verify end-to-end: Customer → Order → Payment → Contract

---

## Approval

To proceed with T1 execution (apply migration to development database), please confirm approval.

> **Note:** This summary is for Phase 2 T1 (schema migration only). T2 (service layer + checkout flow) requires separate planning and execution.
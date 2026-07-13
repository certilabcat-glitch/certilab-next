/**
 * Commercial Domain types
 * Based on: PA-002 Commercial Architecture, Migration 20260712_00001
 * Aggregate Roots: Customer, Order
 * Entities: Payment, Contract, ContractDocument
 * Single Tenant V1: Sin empresa_id. Multitenancy en V3.
 *
 * MVP: Single-product Order model (product_slug, amount, currency).
 * OrderItem and multi-product Orders documented as V2 evolution.
 */

// ============================================================
// Error Types
// ============================================================

export class CustomerValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomerValidationError';
  }
}

export class CustomerNotFoundError extends Error {
  constructor(id: string) {
    super(`Customer no encontrado: ${id}`);
    this.name = 'CustomerNotFoundError';
  }
}

export class CustomerVersionConflictError extends Error {
  constructor(id: string) {
    super(`Conflicto de versión al actualizar customer ${id}. Recarga los datos e inténtalo de nuevo.`);
    this.name = 'CustomerVersionConflictError';
  }
}

export class OrderValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OrderValidationError';
  }
}

export class OrderNotFoundError extends Error {
  constructor(id: string) {
    super(`Order no encontrada: ${id}`);
    this.name = 'OrderNotFoundError';
  }
}

export class OrderVersionConflictError extends Error {
  constructor(id: string) {
    super(`Conflicto de versión al actualizar order ${id}. Recarga los datos e inténtalo de nuevo.`);
    this.name = 'OrderVersionConflictError';
  }
}

export class PaymentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PaymentError';
  }
}

export class ContractError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContractError';
  }
}

// ============================================================
// Enums & Literal Types
// ============================================================

/**
 * Estados de Order
 * MVP: pending → paid → legal_accepted → completed | cancelled
 */
export type OrderStatus = 'pending' | 'paid' | 'legal_accepted' | 'completed' | 'cancelled';

/**
 * Estados de Payment
 */
export type PaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';

/**
 * Tipos de documento legal en ContractDocument
 * MVP: service_order_receipt, professional_engagement, general_terms
 * Completo (V2): 6 tipos
 */
export type ContractDocumentType =
  | 'service_order_receipt'
  | 'professional_engagement'
  | 'general_terms'
  | 'gdpr_consent'
  | 'technical_declaration'
  | 'explicit_acceptance';

// ============================================================
// Customer (Aggregate Root #1)
// ============================================================

/**
 * Database row representation of commercial.customer
 * Maps 1:1 with the Supabase table
 *
 * Single Tenant V1: No tiene empresa_id.
 * 1:1 relationship with auth.users via user_id
 */
export interface CustomerRow {
  id: string; // UUID v7
  user_id: string | null;
  email: string;
  name: string | null;
  stripe_customer_id: string | null;
  billing_address: Record<string, unknown> | null;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  deleted_at: string | null;
  deleted_by: string | null;
  version: number;
}

/**
 * Input type for creating a new Customer
 */
export interface CreateCustomerInput {
  user_id?: string;
  email: string;
  name?: string;
  stripe_customer_id?: string;
  billing_address?: Record<string, unknown>;
  created_by: string;
  updated_by: string;
}

/**
 * Input type for updating an existing Customer
 */
export interface UpdateCustomerInput {
  email?: string;
  name?: string | null;
  stripe_customer_id?: string;
  billing_address?: Record<string, unknown> | null;
  updated_by: string;
  version: number; // Required for optimistic locking
}

/**
 * Filter type for querying Customer
 */
export interface CustomerFilter {
  user_id?: string;
  email?: string;
  include_deleted?: boolean;
  limit?: number;
  offset?: number;
}

// ============================================================
// Order (Aggregate Root #2) — Single-product model
// ============================================================

/**
 * Database row representation of commercial.order
 * Contenedor: contains Payment, Contract and ContractDocument as entities.
 *
 * MVP: Single-product model with product_slug, amount, currency.
 * Multi-product (OrderItem) es V2 evolution.
 */
export interface OrderRow {
  id: string; // UUID v7
  customer_id: string;
  product_slug: string;
  status: OrderStatus;
  amount: number; // in cents
  currency: string;
  stripe_session_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  deleted_at: string | null;
  deleted_by: string | null;
  version: number;
}

/**
 * Input type for creating a new Order
 */
export interface CreateOrderInput {
  customer_id: string;
  product_slug: string;
  status?: OrderStatus;
  amount: number;
  currency?: string;
  stripe_session_id?: string;
  metadata?: Record<string, unknown>;
  created_by: string;
  updated_by: string;
}

/**
 * Input type for updating an existing Order
 */
export interface UpdateOrderInput {
  status?: OrderStatus;
  amount?: number;
  currency?: string;
  stripe_session_id?: string | null;
  metadata?: Record<string, unknown> | null;
  updated_by: string;
  version: number; // Required for optimistic locking
}

/**
 * Filter type for querying Order
 */
export interface OrderFilter {
  customer_id?: string;
  status?: OrderStatus;
  product_slug?: string;
  include_deleted?: boolean;
  limit?: number;
  offset?: number;
}

// ============================================================
// Payment (Entity owned by Order)
// ============================================================

/**
 * Database row representation of commercial.payment
 */
export interface PaymentRow {
  id: string; // UUID v7
  order_id: string;
  stripe_payment_intent_id: string | null;
  status: PaymentStatus;
  amount: number; // in cents
  currency: string;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * Input type for recording a payment
 */
export interface CreatePaymentInput {
  order_id: string;
  stripe_payment_intent_id?: string;
  amount: number;
  currency?: string;
}

/**
 * Input type for updating payment status
 */
export interface UpdatePaymentInput {
  status: PaymentStatus;
  stripe_payment_intent_id?: string;
  paid_at?: string;
}

// ============================================================
// Contract (Entity owned by Order)
// ============================================================

/**
 * Database row representation of commercial.contract
 */
export interface ContractRow {
  id: string; // UUID v7
  order_id: string;
  version: number;
  accepted_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * Input type for creating a contract
 */
export interface CreateContractInput {
  order_id: string;
  version?: number;
}

/**
 * Contract with its documents
 */
export interface ContractWithDocuments extends ContractRow {
  documents: ContractDocumentRow[];
}

// ============================================================
// ContractDocument (Entity owned by Contract)
// ============================================================

/**
 * Database row representation of commercial.contract_document
 */
export interface ContractDocumentRow {
  id: string; // UUID v7
  contract_id: string;
  document_type: ContractDocumentType;
  content: string;
  version: string;
  accepted: boolean;
  accepted_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * Input type for adding a document to a contract
 */
export interface CreateContractDocumentInput {
  contract_id: string;
  document_type: ContractDocumentType;
  content: string;
  version: string;
}

/**
 * Input type for accepting a document
 */
export interface AcceptContractDocumentInput {
  accepted: boolean;
  accepted_at: string;
}

// ============================================================
// Audit Trail
// ============================================================

/**
 * Database row representation of commercial.audit_trail
 */
export interface AuditTrailRow {
  id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  actor_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

/**
 * Input type for creating an audit trail entry
 */
export interface CreateAuditTrailInput {
  entity_type: string;
  entity_id: string;
  action: string;
  actor_id?: string;
  metadata?: Record<string, unknown>;
}

// ============================================================
// Composite Types
// ============================================================

/**
 * Complete Order with all its entities
 * Útil para vistas que necesitan toda la información de la orden
 */
export interface OrderWithDetails {
  order: OrderRow;
  customer: CustomerRow;
  payment: PaymentRow | null;
  contract: (ContractRow & { documents: ContractDocumentRow[] }) | null;
}

/**
 * Result type for soft-delete
 */
export interface DeleteResult {
  success: boolean;
  deleted_at: string;
  version: number;
}

/**
 * Status transition map for Order
 */
export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['paid', 'cancelled'],
  paid: ['legal_accepted', 'cancelled'],
  legal_accepted: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
};

/**
 * Validates if an Order status transition is allowed
 */
export function isValidOrderTransition(from: OrderStatus, to: OrderStatus): boolean {
  return ORDER_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}
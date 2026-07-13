/**
 * Order Repository
 * Data access layer for the commercial.order table
 * Based on: PA-002 Commercial Architecture, Migration 20260712_00001
 *
 * Aggregate Root: Order (single-product model MVP)
 * Entities contained: Payment, Contract, ContractDocument
 * Multi-product (OrderItem) es V2 evolution.
 */

import { createClient } from '@/lib/supabase/server';
import type {
  OrderRow,
  CreateOrderInput,
  UpdateOrderInput,
  OrderFilter,
  DeleteResult,
} from '@/types/commercial';

/**
 * Order Repository — MVP (single tenant, single-product model)
 *
 * El Order es un agregado raíz del Commercial Domain.
 * Contiene Payment, Contract y ContractDocument como entidades.
 *
 * Lifecycle: pending → paid → legal_accepted → completed | cancelled
 */
const TABLE = 'commercial.order';

const SOFT_DELETE_COLS = `
  id, customer_id, product_slug, status,
  amount, currency, stripe_session_id, metadata,
  created_at, created_by, updated_at, updated_by,
  deleted_at, deleted_by, version
`;

export class OrderRepository {
  /**
   * Create a new order
   */
  async create(input: CreateOrderInput): Promise<OrderRow> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        customer_id: input.customer_id,
        product_slug: input.product_slug,
        status: input.status ?? 'pending',
        amount: input.amount,
        currency: input.currency ?? 'EUR',
        stripe_session_id: input.stripe_session_id ?? null,
        metadata: input.metadata ?? null,
        created_by: input.created_by,
        updated_by: input.updated_by,
      })
      .select(SOFT_DELETE_COLS)
      .single();

    if (error) {
      throw new Error(`Error al crear order: ${error.message}`, {
        cause: error,
      });
    }

    return data as OrderRow;
  }

  /**
   * Find an order by ID
   */
  async findById(id: string, includeDeleted = false): Promise<OrderRow | null> {
    const supabase = await createClient();

    let query = supabase
      .from(TABLE)
      .select(SOFT_DELETE_COLS)
      .eq('id', id);

    if (!includeDeleted) {
      query = query.is('deleted_at', null);
    }

    const { data, error } = await query.single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Error al buscar order: ${error.message}`, {
        cause: error,
      });
    }

    return data as OrderRow;
  }

  /**
   * Find an order by stripe_session_id (unique)
   */
  async findByStripeSessionId(stripeSessionId: string, includeDeleted = false): Promise<OrderRow | null> {
    const supabase = await createClient();

    let query = supabase
      .from(TABLE)
      .select(SOFT_DELETE_COLS)
      .eq('stripe_session_id', stripeSessionId);

    if (!includeDeleted) {
      query = query.is('deleted_at', null);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      throw new Error(`Error al buscar order por stripe_session_id: ${error.message}`, {
        cause: error,
      });
    }

    return data as OrderRow | null;
  }

  /**
   * Find orders by filter
   */
  async findMany(filter: OrderFilter): Promise<OrderRow[]> {
    const supabase = await createClient();

    let query = supabase
      .from(TABLE)
      .select(SOFT_DELETE_COLS);

    if (filter.customer_id) {
      query = query.eq('customer_id', filter.customer_id);
    }

    if (filter.status) {
      query = query.eq('status', filter.status);
    }

    if (filter.product_slug) {
      query = query.eq('product_slug', filter.product_slug);
    }

    if (!filter.include_deleted) {
      query = query.is('deleted_at', null);
    }

    const limit = filter.limit ?? 50;
    const offset = filter.offset ?? 0;
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error } = await query;

    if (error) {
      throw new Error(`Error al listar orders: ${error.message}`, {
        cause: error,
      });
    }

    return data as OrderRow[];
  }

  /**
   * Update an order with optimistic locking
   */
  async update(id: string, input: UpdateOrderInput): Promise<OrderRow | null> {
    const supabase = await createClient();

    const updateData: Record<string, unknown> = {
      updated_by: input.updated_by,
    };

    if (input.status !== undefined) updateData.status = input.status;
    if (input.amount !== undefined) updateData.amount = input.amount;
    if (input.currency !== undefined) updateData.currency = input.currency;
    if (input.stripe_session_id !== undefined) updateData.stripe_session_id = input.stripe_session_id;
    if (input.metadata !== undefined) updateData.metadata = input.metadata;

    const { data, error } = await supabase
      .from(TABLE)
      .update(updateData)
      .eq('id', id)
      .eq('version', input.version)
      .is('deleted_at', null)
      .select(SOFT_DELETE_COLS)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Error al actualizar order: ${error.message}`, {
        cause: error,
      });
    }

    return data as OrderRow;
  }

  /**
   * Soft delete an order
   */
  async softDelete(id: string, deletedBy: string): Promise<DeleteResult | null> {
    const supabase = await createClient();

    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from(TABLE)
      .update({
        deleted_at: now,
        deleted_by: deletedBy,
        updated_by: deletedBy,
      })
      .eq('id', id)
      .is('deleted_at', null)
      .select('id, deleted_at, version')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Error al eliminar order: ${error.message}`, {
        cause: error,
      });
    }

    return {
      success: true,
      deleted_at: data.deleted_at,
      version: data.version,
    };
  }

  /**
   * Restore a soft-deleted order
   */
  async restore(id: string, updatedBy: string): Promise<OrderRow | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from(TABLE)
      .update({
        deleted_at: null,
        deleted_by: null,
        updated_by: updatedBy,
      })
      .eq('id', id)
      .not('deleted_at', 'is', null)
      .select(SOFT_DELETE_COLS)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Error al restaurar order: ${error.message}`, {
        cause: error,
      });
    }

    return data as OrderRow;
  }

  /**
   * Count orders by filter
   */
  async count(filter: OrderFilter): Promise<number> {
    const supabase = await createClient();

    let query = supabase
      .from(TABLE)
      .select('id, deleted_at', { count: 'exact', head: true });

    if (filter.customer_id) {
      query = query.eq('customer_id', filter.customer_id);
    }

    if (filter.status) {
      query = query.eq('status', filter.status);
    }

    if (filter.product_slug) {
      query = query.eq('product_slug', filter.product_slug);
    }

    if (!filter.include_deleted) {
      query = query.is('deleted_at', null);
    }

    const { count, error } = await query;

    if (error) {
      throw new Error(`Error al contar orders: ${error.message}`, {
        cause: error,
      });
    }

    return count ?? 0;
  }

  /**
   * Get orders by customer_id
   */
  async findByCustomerId(customerId: string): Promise<OrderRow[]> {
    return this.findMany({ customer_id: customerId });
  }
}

// Singleton instance
export const orderRepository = new OrderRepository();
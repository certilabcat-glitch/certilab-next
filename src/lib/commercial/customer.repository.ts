/**
 * Customer Repository
 * Data access layer for the commercial.customer table
 * Based on: PA-002 Commercial Architecture, Migration 20260712_00001
 */

import { createClient } from '@/lib/supabase/server';
import type {
  CustomerRow,
  CreateCustomerInput,
  UpdateCustomerInput,
  CustomerFilter,
  DeleteResult,
  CustomerNotFoundError,
  CustomerVersionConflictError,
} from '@/types/commercial';

/**
 * Customer Repository - MVP (sin multitenant)
 * Preparado para migración a multitenant en V3.
 * En V3 se añadirá filtro por empresa_id en las queries.
 */
const TABLE = 'commercial.customer';
const SOFT_DELETE_COLS = `
  id, user_id, email, name,
  stripe_customer_id, billing_address,
  created_at, created_by, updated_at, updated_by,
  deleted_at, deleted_by, version
`;

export class CustomerRepository {
  /**
   * Create a new customer
   */
  async create(input: CreateCustomerInput): Promise<CustomerRow> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        user_id: input.user_id ?? null,
        email: input.email,
        name: input.name ?? null,
        stripe_customer_id: input.stripe_customer_id ?? null,
        billing_address: input.billing_address ?? null,
        created_by: input.created_by,
        updated_by: input.updated_by,
      })
      .select(SOFT_DELETE_COLS)
      .single();

    if (error) {
      throw new Error(`Error al crear customer: ${error.message}`, {
        cause: error,
      });
    }

    return data as CustomerRow;
  }

  /**
   * Find a customer by ID
   */
  async findById(id: string, includeDeleted = false): Promise<CustomerRow | null> {
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
      throw new Error(`Error al buscar customer: ${error.message}`, {
        cause: error,
      });
    }

    return data as CustomerRow;
  }

  /**
   * Find a customer by user_id (auth.users FK)
   */
  async findByUserId(userId: string, includeDeleted = false): Promise<CustomerRow | null> {
    const supabase = await createClient();

    let query = supabase
      .from(TABLE)
      .select(SOFT_DELETE_COLS)
      .eq('user_id', userId);

    if (!includeDeleted) {
      query = query.is('deleted_at', null);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      throw new Error(`Error al buscar customer por user_id: ${error.message}`, {
        cause: error,
      });
    }

    return data as CustomerRow | null;
  }

  /**
   * Find a customer by email
   */
  async findByEmail(email: string, includeDeleted = false): Promise<CustomerRow | null> {
    const supabase = await createClient();

    let query = supabase
      .from(TABLE)
      .select(SOFT_DELETE_COLS)
      .eq('email', email);

    if (!includeDeleted) {
      query = query.is('deleted_at', null);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      throw new Error(`Error al buscar customer por email: ${error.message}`, {
        cause: error,
      });
    }

    return data as CustomerRow | null;
  }

  /**
   * Find customers by filter
   */
  async findMany(filter: CustomerFilter): Promise<CustomerRow[]> {
    const supabase = await createClient();

    let query = supabase
      .from(TABLE)
      .select(SOFT_DELETE_COLS);

    if (filter.email) {
      query = query.eq('email', filter.email);
    }

    if (filter.user_id) {
      query = query.eq('user_id', filter.user_id);
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
      throw new Error(`Error al listar customers: ${error.message}`, {
        cause: error,
      });
    }

    return data as CustomerRow[];
  }

  /**
   * Update a customer with optimistic locking
   */
  async update(
    id: string,
    input: UpdateCustomerInput
  ): Promise<CustomerRow | null> {
    const supabase = await createClient();

    const updateData: Record<string, unknown> = {
      updated_by: input.updated_by,
    };

    if (input.email !== undefined) updateData.email = input.email;
    if (input.name !== undefined) updateData.name = input.name;
    if (input.stripe_customer_id !== undefined) updateData.stripe_customer_id = input.stripe_customer_id;
    if (input.billing_address !== undefined) updateData.billing_address = input.billing_address;

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
      throw new Error(`Error al actualizar customer: ${error.message}`, {
        cause: error,
      });
    }

    return data as CustomerRow;
  }

  /**
   * Soft delete a customer
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
      throw new Error(`Error al eliminar customer: ${error.message}`, {
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
   * Restore a soft-deleted customer
   */
  async restore(id: string, updatedBy: string): Promise<CustomerRow | null> {
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
      throw new Error(`Error al restaurar customer: ${error.message}`, {
        cause: error,
      });
    }

    return data as CustomerRow;
  }

  /**
   * Count customers by filter (useful for pagination)
   */
  async count(filter: CustomerFilter): Promise<number> {
    const supabase = await createClient();

    let query = supabase
      .from(TABLE)
      .select('id, deleted_at', { count: 'exact', head: true });

    if (!filter.include_deleted) {
      query = query.is('deleted_at', null);
    }

    const { count, error } = await query;

    if (error) {
      throw new Error(`Error al contar customers: ${error.message}`, {
        cause: error,
      });
    }

    return count ?? 0;
  }

  /**
   * Find or create a customer by email
   * Useful for checkout flow: if customer exists, return it; otherwise create
   */
  async findOrCreate(input: CreateCustomerInput): Promise<CustomerRow> {
    const existing = await this.findByEmail(input.email);
    if (existing) {
      return existing;
    }
    return this.create(input);
  }
}

// Singleton instance
export const customerRepository = new CustomerRepository();
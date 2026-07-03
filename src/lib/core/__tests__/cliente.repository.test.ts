import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ClienteRow, CrearClienteInput, ActualizarClienteInput } from '@/types/core/cliente';
import { ClienteRepository } from '@/lib/core/cliente.repository';

// Mock the server client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

import { createClient } from '@/lib/supabase/server';

describe('ClienteRepository', () => {
  let repo: ClienteRepository;
  let mockSupabase: ReturnType<typeof createMockQuery>;
  let mockQuery: ReturnType<typeof createMockQuery>;

  function createMockQuery() {
    const query: Record<string, ReturnType<typeof vi.fn>> = {};

    query.eq = vi.fn().mockReturnThis();
    query.is = vi.fn().mockReturnThis();
    query.or = vi.fn().mockReturnThis();
    query.order = vi.fn().mockReturnThis();
    query.range = vi.fn().mockReturnThis();
    query.single = vi.fn().mockResolvedValue({ data: null, error: null });
    query.select = vi.fn().mockReturnThis();
    query.insert = vi.fn().mockReturnThis();
    query.update = vi.fn().mockReturnThis();

    const fromFn = vi.fn().mockReturnValue(query);
    const client = { from: fromFn };

    return { client, query };
  }

  beforeEach(() => {
    vi.clearAllMocks();
    const mocks = createMockQuery();
    mockSupabase = mocks.client as any;
    mockQuery = mocks.query;
    (createClient as any).mockResolvedValue(mockSupabase);
    repo = new ClienteRepository();
  });

  // ------------------------------------------------------------------
  // Type tests (compile-time - just check they import correctly)
  // ------------------------------------------------------------------
  it('should have correct type exports', () => {
    // This is a compile-time check via runtime assertion
    const input: CrearClienteInput = {
      email: 'test@certilab.com',
      nombre: 'Test',
      apellidos: 'User',
      consent_id: '00000000-0000-0000-0000-000000000000',
      created_by: '00000000-0000-0000-0000-000000000000',
      updated_by: '00000000-0000-0000-0000-000000000000',
    };
    expect(input.email).toBe('test@certilab.com');
  });

  // ------------------------------------------------------------------
  // crear
  // ------------------------------------------------------------------
  describe('crear', () => {
    const mockClienteRow: ClienteRow = {
      id: '0191f1c0-0000-7000-8000-000000000001',
      usuario_id: null,
      email: 'cliente.test@certilab.com',
      nombre: 'Juan',
      apellidos: 'Pérez García',
      telefono: '+34 600 000 000',
      dni: null,
      direccion: null,
      ciudad: null,
      codigo_postal: null,
      notas: null,
      origen: 'web',
      consent_id: '00000000-0000-0000-0000-000000000000',
      retention_days: 2190,
      anonymized_at: null,
      created_at: '2026-07-03T07:00:00.000Z',
      created_by: '00000000-0000-0000-0000-000000000000',
      updated_at: '2026-07-03T07:00:00.000Z',
      updated_by: '00000000-0000-0000-0000-000000000000',
      deleted_at: null,
      deleted_by: null,
      version: 1,
    };

    it('should create a cliente successfully', async () => {
      mockQuery.select.mockReturnThis();
      mockQuery.single.mockResolvedValue({ data: mockClienteRow, error: null });

      const input: CrearClienteInput = {
        email: mockClienteRow.email ?? undefined,
        nombre: mockClienteRow.nombre,
        apellidos: mockClienteRow.apellidos,
        telefono: mockClienteRow.telefono ?? undefined,
        origen: 'web',
        consent_id: mockClienteRow.consent_id,
        created_by: mockClienteRow.created_by,
        updated_by: mockClienteRow.updated_by,
      };

      const result = await repo.crear(input);

      expect(result).toEqual(mockClienteRow);
      expect(mockSupabase.from).toHaveBeenCalledWith('core.cliente');
      expect(mockQuery.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          email: mockClienteRow.email,
          nombre: mockClienteRow.nombre,
          retention_days: 2190,
        })
      );
      expect(mockQuery.select).toHaveBeenCalled();
      expect(mockQuery.single).toHaveBeenCalled();
    });

    it('should throw error when creation fails', async () => {
      mockQuery.single.mockResolvedValue({
        data: null,
        error: { message: 'duplicate key', code: '23505' },
      });

      const input: CrearClienteInput = {
        email: 'duplicate@certilab.com',
        nombre: 'Dup',
        apellidos: 'Test',
        consent_id: '00000000-0000-0000-0000-000000000000',
        created_by: '00000000-0000-0000-0000-000000000000',
        updated_by: '00000000-0000-0000-0000-000000000000',
      };

      await expect(repo.crear(input)).rejects.toThrow('Error al crear cliente');
    });
  });

  // ------------------------------------------------------------------
  // findById
  // ------------------------------------------------------------------
  describe('findById', () => {
    it('should return null when cliente not found', async () => {
      mockQuery.single.mockResolvedValue({
        data: null,
        error: { code: 'PGRST116', message: 'no rows', details: '' },
      });

      const result = await repo.findById('nonexistent-id');

      expect(result).toBeNull();
    });

    it('should find a cliente by id', async () => {
      const mockRow: ClienteRow = {
        id: '0191f1c0-0000-7000-8000-000000000001',
        usuario_id: null,
        email: 'test@certilab.com',
        nombre: 'Test',
        apellidos: 'User',
        telefono: null,
        dni: null,
        direccion: null,
        ciudad: null,
        codigo_postal: null,
        notas: null,
        origen: 'web',
        consent_id: '00000000-0000-0000-0000-000000000000',
        retention_days: 2190,
        anonymized_at: null,
        created_at: '2026-07-03T07:00:00.000Z',
        created_by: '00000000-0000-0000-0000-000000000000',
        updated_at: '2026-07-03T07:00:00.000Z',
        updated_by: '00000000-0000-0000-0000-000000000000',
        deleted_at: null,
        deleted_by: null,
        version: 1,
      };

      mockQuery.single.mockResolvedValue({ data: mockRow, error: null });

      const result = await repo.findById(mockRow.id);

      expect(result).toEqual(mockRow);
      expect(mockSupabase.from).toHaveBeenCalledWith('core.cliente');
      expect(mockQuery.eq).toHaveBeenCalledWith('id', mockRow.id);
      expect(mockQuery.is).toHaveBeenCalledWith('deleted_at', null);
    });
  });

  // ------------------------------------------------------------------
  // actualizar (optimistic locking)
  // ------------------------------------------------------------------
  describe('actualizar', () => {
    it('should update a cliente with optimistic locking', async () => {
      const updatedRow: ClienteRow = {
        id: '0191f1c0-0000-7000-8000-000000000001',
        usuario_id: null,
        email: 'updated@certilab.com',
        nombre: 'Updated',
        apellidos: 'Name',
        telefono: '+34 600 000 001',
        dni: null,
        direccion: null,
        ciudad: null,
        codigo_postal: null,
        notas: 'Updated notes',
        origen: 'web',
        consent_id: '00000000-0000-0000-0000-000000000000',
        retention_days: 2190,
        anonymized_at: null,
        created_at: '2026-07-03T07:00:00.000Z',
        created_by: '00000000-0000-0000-0000-000000000000',
        updated_at: '2026-07-03T07:01:00.000Z',
        updated_by: '00000000-0000-0000-0000-000000000002',
        deleted_at: null,
        deleted_by: null,
        version: 2,
      };

      mockQuery.single.mockResolvedValue({ data: updatedRow, error: null });

      const input: ActualizarClienteInput = {
        email: 'updated@certilab.com',
        nombre: 'Updated',
        notas: 'Updated notes',
        telefono: '+34 600 000 001',
        updated_by: '00000000-0000-0000-0000-000000000002',
        version: 1,
      };

      const result = await repo.actualizar(updatedRow.id, input);

      expect(result).toEqual(updatedRow);
      expect(mockQuery.eq).toHaveBeenCalledWith('id', updatedRow.id);
      expect(mockQuery.eq).toHaveBeenCalledWith('version', 1);
      expect(mockQuery.is).toHaveBeenCalledWith('deleted_at', null);
    });

    it('should return null when version conflict', async () => {
      mockQuery.single.mockResolvedValue({
        data: null,
        error: { code: 'PGRST116', message: 'no rows', details: '' },
      });

      const input: ActualizarClienteInput = {
        email: 'conflict@certilab.com',
        updated_by: 'user-id',
        version: 99, // Stale version
      };

      const result = await repo.actualizar('some-id', input);

      expect(result).toBeNull();
    });
  });

  // ------------------------------------------------------------------
  // softDelete
  // ------------------------------------------------------------------
  describe('softDelete', () => {
    it('should soft delete a cliente', async () => {
      const deleteResult = {
        id: '0191f1c0-0000-7000-8000-000000000001',
        deleted_at: '2026-07-03T08:00:00.000Z',
        version: 2,
      };

      mockQuery.single.mockResolvedValue({ data: deleteResult, error: null });

      const result = await repo.softDelete(deleteResult.id, 'deleter-user-id');

      expect(result).toEqual({
        success: true,
        deleted_at: deleteResult.deleted_at,
        version: 2,
      });
      expect(mockQuery.update).toHaveBeenCalledWith(
        expect.objectContaining({
          deleted_at: expect.any(String),
          deleted_by: 'deleter-user-id',
        })
      );
    });

    it('should return null when cliente already deleted', async () => {
      mockQuery.single.mockResolvedValue({
        data: null,
        error: { code: 'PGRST116', message: 'no rows', details: '' },
      });

      const result = await repo.softDelete('already-deleted-id', 'user-id');

      expect(result).toBeNull();
    });
  });

  // ------------------------------------------------------------------
  // findMany with filters
  // ------------------------------------------------------------------
  describe('findMany', () => {
    it('should query without empresa_id filter (MVP single tenant)', async () => {
      mockQuery.select.mockReturnThis();
      mockQuery.order = vi.fn().mockReturnThis();
      mockQuery.range = vi.fn().mockResolvedValue({ data: [], error: null });

      await repo.findMany({});

      expect(mockSupabase.from).toHaveBeenCalledWith('core.cliente');
      // MVP: Single tenant. No empresa_id filter. Multitenancy en V3.
      expect(mockQuery.is).toHaveBeenCalledWith('deleted_at', null);
    });

    it('should apply search filter correctly', async () => {
      mockQuery.select.mockReturnThis();
      mockQuery.order = vi.fn().mockReturnThis();
      mockQuery.range = vi.fn().mockResolvedValue({ data: [], error: null });

      await repo.findMany({
        search: 'Juan',
      });

      expect(mockQuery.or).toHaveBeenCalledWith(
        'nombre.ilike.%Juan%,apellidos.ilike.%Juan%,email.ilike.%Juan%'
      );
    });
  });

  // ------------------------------------------------------------------
  // count
  // ------------------------------------------------------------------
  describe('count', () => {
    it('should return count with head query', async () => {
      // Mock supabase to return a custom query that supports chaining then resolves
      const countQuery: any = {
        eq: vi.fn().mockReturnThis(),
        is: vi.fn().mockReturnThis(),
        then: vi.fn((resolve: any) =>
          resolve({ data: null, count: 42, error: null })
        ),
      };
      mockQuery.select = vi.fn().mockReturnValue(countQuery);

      const countResult = await repo.count({});

      expect(countResult).toBe(42);
      expect(mockQuery.select).toHaveBeenCalledWith(
        'id, deleted_at',
        { count: 'exact', head: true }
      );
      // MVP: Single tenant. No empresa_id filter. Multitenancy en V3.
      expect(countQuery.is).toHaveBeenCalledWith('deleted_at', null);
    });
  });
});
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import type { ExpedienteRow, CrearExpedienteInput, ActualizarExpedienteInput } from '@/types/core/expediente';
import { ExpedienteRepository } from '@/lib/core/expediente.repository';

// Mock the server client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

import { createClient } from '@/lib/supabase/server';

interface MockQuery {
  eq: Mock;
  is: Mock;
  not: Mock;
  or: Mock;
  order: Mock;
  range: Mock;
  single: Mock;
  select: Mock;
  insert: Mock;
  update: Mock;
}

interface MockSupabase {
  from: Mock;
}

describe('ExpedienteRepository', () => {
  let repo: ExpedienteRepository;
  let mockSupabase: MockSupabase;
  let mockQuery: MockQuery;

  function createMockQuery(): { client: MockSupabase; query: MockQuery } {
    const query: MockQuery = {
      eq: vi.fn().mockReturnThis(),
      is: vi.fn().mockReturnThis(),
      not: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      range: vi.fn().mockResolvedValue({ data: [], error: null }),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
    };

    const fromFn = vi.fn().mockReturnValue(query);
    const client: MockSupabase = { from: fromFn };

    return { client, query };
  }

  beforeEach(() => {
    vi.clearAllMocks();
    const mocks = createMockQuery();
    mockSupabase = mocks.client;
    mockQuery = mocks.query;
    (createClient as Mock).mockResolvedValue(mockSupabase);
    repo = new ExpedienteRepository();
  });

  // ------------------------------------------------------------------
  // crear
  // ------------------------------------------------------------------
  describe('crear', () => {
    const mockExpedienteRow: ExpedienteRow = {
      id: '0191f1c0-0000-7000-8000-000000000200',
      numero_expediente: 'EXP-2026-07-0001',
      cliente_id: '0191f1c0-0000-7000-8000-000000000001',
      inmueble_id: null,
      estado: 'pendiente',
      servicio: 'segunda_opinion',
      titulo: 'Segunda opinión Certificado Energético',
      notas: null,
      created_at: '2026-07-08T07:00:00.000Z',
      created_by: '00000000-0000-0000-0000-000000000000',
      updated_at: '2026-07-08T07:00:00.000Z',
      updated_by: '00000000-0000-0000-0000-000000000000',
      deleted_at: null,
      deleted_by: null,
      version: 1,
    };

    it('should create an expediente successfully', async () => {
      mockQuery.select.mockReturnThis();
      mockQuery.single.mockResolvedValue({ data: mockExpedienteRow, error: null });

      const input: CrearExpedienteInput = {
        numero_expediente: mockExpedienteRow.numero_expediente,
        cliente_id: mockExpedienteRow.cliente_id,
        servicio: 'segunda_opinion',
        titulo: mockExpedienteRow.titulo!,
        created_by: mockExpedienteRow.created_by,
        updated_by: mockExpedienteRow.updated_by,
      };

      const result = await repo.crear(input);

      expect(result).toEqual(mockExpedienteRow);
      expect(mockSupabase.from).toHaveBeenCalledWith('core.expediente');
      expect(mockQuery.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          numero_expediente: mockExpedienteRow.numero_expediente,
          cliente_id: mockExpedienteRow.cliente_id,
          servicio: 'segunda_opinion',
        })
      );
      expect(mockQuery.select).toHaveBeenCalled();
      expect(mockQuery.single).toHaveBeenCalled();
    });

    it('should throw error when creation fails', async () => {
      mockQuery.single.mockResolvedValue({
        data: null,
        error: { message: 'insert error', code: '23505' },
      });

      const input: CrearExpedienteInput = {
        numero_expediente: 'EXP-2026-07-9999',
        cliente_id: '0191f1c0-0000-7000-8000-000000000001',
        created_by: '00000000-0000-0000-0000-000000000000',
        updated_by: '00000000-0000-0000-0000-000000000000',
      };

      await expect(repo.crear(input)).rejects.toThrow('Error al crear expediente');
    });
  });

  // ------------------------------------------------------------------
  // findById (includes soft-delete filter)
  // ------------------------------------------------------------------
  describe('findById', () => {
    it('should return null when expediente not found', async () => {
      mockQuery.single.mockResolvedValue({
        data: null,
        error: { code: 'PGRST116', message: 'no rows', details: '' },
      });

      const result = await repo.findById('nonexistent-id');

      expect(result).toBeNull();
    });

    it('should find an expediente by id', async () => {
      const mockRow: ExpedienteRow = {
        id: '0191f1c0-0000-7000-8000-000000000200',
        numero_expediente: 'EXP-2026-07-0001',
        cliente_id: '0191f1c0-0000-7000-8000-000000000001',
        inmueble_id: null,
        estado: 'pendiente',
        servicio: 'segunda_opinion',
        titulo: null,
        notas: null,
        created_at: '2026-07-08T07:00:00.000Z',
        created_by: '00000000-0000-0000-0000-000000000000',
        updated_at: '2026-07-08T07:00:00.000Z',
        updated_by: '00000000-0000-0000-0000-000000000000',
        deleted_at: null,
        deleted_by: null,
        version: 1,
      };

      mockQuery.single.mockResolvedValue({ data: mockRow, error: null });

      const result = await repo.findById(mockRow.id);

      expect(result).toEqual(mockRow);
      expect(mockSupabase.from).toHaveBeenCalledWith('core.expediente');
      expect(mockQuery.eq).toHaveBeenCalledWith('id', mockRow.id);
      expect(mockQuery.is).toHaveBeenCalledWith('deleted_at', null);
    });
  });

  // ------------------------------------------------------------------
  // actualizar (optimistic locking)
  // ------------------------------------------------------------------
  describe('actualizar', () => {
    it('should update an expediente with optimistic locking', async () => {
      const updatedRow: ExpedienteRow = {
        id: '0191f1c0-0000-7000-8000-000000000200',
        numero_expediente: 'EXP-2026-07-0001',
        cliente_id: '0191f1c0-0000-7000-8000-000000000001',
        inmueble_id: '0191f1c0-0000-7000-8000-000000000100',
        estado: 'pago_pendiente',
        servicio: 'segunda_opinion',
        titulo: 'Segunda opinión Certificado Energético',
        notas: 'Cliente ha solicitado revisión urgente',
        created_at: '2026-07-08T07:00:00.000Z',
        created_by: '00000000-0000-0000-0000-000000000000',
        updated_at: '2026-07-08T08:00:00.000Z',
        updated_by: '00000000-0000-0000-0000-000000000002',
        deleted_at: null,
        deleted_by: null,
        version: 2,
      };

      mockQuery.single.mockResolvedValue({ data: updatedRow, error: null });

      const input: ActualizarExpedienteInput = {
        estado: 'pago_pendiente',
        inmueble_id: '0191f1c0-0000-7000-8000-000000000100',
        titulo: 'Segunda opinión Certificado Energético',
        notas: 'Cliente ha solicitado revisión urgente',
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

      const input: ActualizarExpedienteInput = {
        titulo: 'Updated title',
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
    it('should soft delete an expediente', async () => {
      const deleteResult = {
        id: '0191f1c0-0000-7000-8000-000000000200',
        deleted_at: '2026-07-08T09:00:00.000Z',
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

    it('should return null when expediente already deleted', async () => {
      mockQuery.single.mockResolvedValue({
        data: null,
        error: { code: 'PGRST116', message: 'no rows', details: '' },
      });

      const result = await repo.softDelete('already-deleted-id', 'user-id');

      expect(result).toBeNull();
    });
  });

  // ------------------------------------------------------------------
  // restaurar (restore from soft delete)
  // ------------------------------------------------------------------
  describe('restaurar', () => {
    it('should restore a soft-deleted expediente', async () => {
      const restoredRow: ExpedienteRow = {
        id: '0191f1c0-0000-7000-8000-000000000200',
        numero_expediente: 'EXP-2026-07-0001',
        cliente_id: '0191f1c0-0000-7000-8000-000000000001',
        inmueble_id: null,
        estado: 'pendiente',
        servicio: 'segunda_opinion',
        titulo: 'Segunda opinión Certificado Energético',
        notas: null,
        created_at: '2026-07-08T07:00:00.000Z',
        created_by: '00000000-0000-0000-0000-000000000000',
        updated_at: '2026-07-08T09:00:00.000Z',
        updated_by: '00000000-0000-0000-0000-000000000001',
        deleted_at: null,
        deleted_by: null,
        version: 2,
      };

      mockQuery.single.mockResolvedValue({ data: restoredRow, error: null });

      const result = await repo.restaurar(restoredRow.id, 'restorer-user-id');

      expect(result).toEqual(restoredRow);
      expect(mockSupabase.from).toHaveBeenCalledWith('core.expediente');
      expect(mockQuery.update).toHaveBeenCalledWith(
        expect.objectContaining({
          deleted_at: null,
          deleted_by: null,
          updated_by: 'restorer-user-id',
        })
      );
      expect(mockQuery.eq).toHaveBeenCalledWith('id', restoredRow.id);
      expect(mockQuery.select).toHaveBeenCalled();
      expect(mockQuery.single).toHaveBeenCalled();
    });

    it('should return null when expediente not found for restore', async () => {
      mockQuery.single.mockResolvedValue({
        data: null,
        error: { code: 'PGRST116', message: 'no rows', details: '' },
      });

      const result = await repo.restaurar('nonexistent-id', 'user-id');

      expect(result).toBeNull();
    });
  });

  // ------------------------------------------------------------------
  // findMany with filters
  // ------------------------------------------------------------------
  describe('findMany', () => {
    it('should query without empresa_id filter (MVP)', async () => {
      mockQuery.select.mockReturnThis();
      mockQuery.order.mockReturnThis();
      mockQuery.range.mockResolvedValue({ data: [], error: null });

      await repo.findMany({});

      expect(mockSupabase.from).toHaveBeenCalledWith('core.expediente');
      // MVP: No empresa_id filter. Preparado para migración a multitenant en V3.
      expect(mockQuery.eq).not.toHaveBeenCalled();
      expect(mockQuery.is).toHaveBeenCalledWith('deleted_at', null);
    });

    it('should apply estado filter correctly', async () => {
      mockQuery.select.mockReturnThis();
      mockQuery.order.mockReturnThis();
      mockQuery.range.mockResolvedValue({ data: [], error: null });

      await repo.findMany({
        estado: 'pendiente',
      });

      expect(mockQuery.eq).toHaveBeenCalledWith('estado', 'pendiente');
    });

    it('should apply cliente_id filter correctly', async () => {
      mockQuery.select.mockReturnThis();
      mockQuery.order.mockReturnThis();
      mockQuery.range.mockResolvedValue({ data: [], error: null });

      await repo.findMany({
        cliente_id: '0191f1c0-0000-7000-8000-000000000001',
      });

      expect(mockQuery.eq).toHaveBeenCalledWith(
        'cliente_id',
        '0191f1c0-0000-7000-8000-000000000001'
      );
    });

    it('should apply servicio filter correctly', async () => {
      mockQuery.select.mockReturnThis();
      mockQuery.order.mockReturnThis();
      mockQuery.range.mockResolvedValue({ data: [], error: null });

      await repo.findMany({
        servicio: 'segunda_opinion',
      });

      expect(mockQuery.eq).toHaveBeenCalledWith('servicio', 'segunda_opinion');
    });

    it('should apply search filter correctly', async () => {
      mockQuery.select.mockReturnThis();
      mockQuery.order.mockReturnThis();
      mockQuery.range.mockResolvedValue({ data: [], error: null });

      await repo.findMany({
        search: 'EXP-2026',
      });

      expect(mockQuery.or).toHaveBeenCalledWith(
        'numero_expediente.ilike.%EXP-2026%,titulo.ilike.%EXP-2026%'
      );
    });
  });

  // ------------------------------------------------------------------
  // count
  // ------------------------------------------------------------------
  describe('count', () => {
    it('should return count with head query', async () => {
      const countQuery: Record<string, Mock | unknown> = {
        eq: vi.fn().mockReturnThis(),
        is: vi.fn().mockReturnThis(),
        then: vi.fn((resolve: (value: unknown) => void) =>
          resolve({ data: null, count: 10, error: null })
        ),
      };
      mockQuery.select = vi.fn().mockReturnValue(countQuery);

      const countResult = await repo.count({});

      expect(countResult).toBe(10);
      expect(mockQuery.select).toHaveBeenCalledWith(
        'id, deleted_at',
        { count: 'exact', head: true }
      );
      expect((countQuery.is as Mock)).toHaveBeenCalledWith('deleted_at', null);
    });

    it('should filter by estado in count', async () => {
      const countQuery: Record<string, Mock | unknown> = {
        eq: vi.fn().mockReturnThis(),
        is: vi.fn().mockReturnThis(),
        then: vi.fn((resolve: (value: unknown) => void) =>
          resolve({ data: null, count: 3, error: null })
        ),
      };
      mockQuery.select = vi.fn().mockReturnValue(countQuery);

      const countResult = await repo.count({
        estado: 'pendiente',
      });

      expect(countResult).toBe(3);
      expect((countQuery.eq as Mock)).toHaveBeenCalledWith('estado', 'pendiente');
    });
  });
});
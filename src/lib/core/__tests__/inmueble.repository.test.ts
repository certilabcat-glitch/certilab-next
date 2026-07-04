import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import type { InmuebleRow, CrearInmuebleInput, ActualizarInmuebleInput } from '@/types/core/inmueble';
import { InmuebleRepository } from '@/lib/core/inmueble.repository';

// Mock the server client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

import { createClient } from '@/lib/supabase/server';

interface MockQuery {
  eq: Mock;
  is: Mock;
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

describe('InmuebleRepository', () => {
  let repo: InmuebleRepository;
  let mockSupabase: MockSupabase;
  let mockQuery: MockQuery;

  function createMockQuery(): { client: MockSupabase; query: MockQuery } {
    const query: MockQuery = {
      eq: vi.fn().mockReturnThis(),
      is: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      range: vi.fn().mockReturnThis(),
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
    repo = new InmuebleRepository();
  });

  // ------------------------------------------------------------------
  // crear
  // ------------------------------------------------------------------
  describe('crear', () => {
    const mockInmuebleRow: InmuebleRow = {
      id: '0191f1c0-0000-7000-8000-000000000100',
      cliente_id: '0191f1c0-0000-7000-8000-000000000001',
      referencia_catastral: '1234567XX1234A_0001XX',
      direccion: 'Carrer del Comte d\'Urgell 187, 3º 2ª',
      municipio: 'Barcelona',
      provincia: 'Barcelona',
      codigo_postal: '08036',
      latitud: 41.3874,
      longitud: 2.1686,
      altitud: 12,
      uso: 'residencial',
      tipo: 'piso',
      tipo_edificio: 'bloque',
      superficie_util: 85.50,
      superficie_construida: 95.00,
      ano_construccion: 1975,
      numero_plantas: 5,
      altura_libre: 2.50,
      orientacion_principal: 'S',
      orientacion_secundaria: null,
      zona_climatica_cte: 'C2',
      zona_climatica_verano: '3',
      certificado_existente_url: 'https://ejemplo.com/certificado.pdf',
      certificado_letra: 'E',
      certificado_consumo: 180.50,
      certificado_emisiones: 32.10,
      datos_catastrales: null,
      observaciones: null,
      created_at: '2026-07-06T07:00:00.000Z',
      created_by: '00000000-0000-0000-0000-000000000000',
      updated_at: '2026-07-06T07:00:00.000Z',
      updated_by: '00000000-0000-0000-0000-000000000000',
      deleted_at: null,
      deleted_by: null,
      version: 1,
    };

    it('should create an inmueble successfully', async () => {
      mockQuery.select.mockReturnThis();
      mockQuery.single.mockResolvedValue({ data: mockInmuebleRow, error: null });

      const input: CrearInmuebleInput = {
        cliente_id: mockInmuebleRow.cliente_id,
        referencia_catastral: mockInmuebleRow.referencia_catastral ?? undefined,
        direccion: mockInmuebleRow.direccion,
        municipio: mockInmuebleRow.municipio,
        provincia: mockInmuebleRow.provincia,
        codigo_postal: mockInmuebleRow.codigo_postal,
        latitud: mockInmuebleRow.latitud ?? undefined,
        longitud: mockInmuebleRow.longitud ?? undefined,
        altitud: mockInmuebleRow.altitud ?? undefined,
        uso: mockInmuebleRow.uso,
        tipo: mockInmuebleRow.tipo,
        tipo_edificio: mockInmuebleRow.tipo_edificio ?? undefined,
        superficie_util: mockInmuebleRow.superficie_util ?? undefined,
        superficie_construida: mockInmuebleRow.superficie_construida ?? undefined,
        ano_construccion: mockInmuebleRow.ano_construccion ?? undefined,
        numero_plantas: mockInmuebleRow.numero_plantas ?? undefined,
        altura_libre: mockInmuebleRow.altura_libre ?? undefined,
        orientacion_principal: mockInmuebleRow.orientacion_principal ?? undefined,
        zona_climatica_cte: mockInmuebleRow.zona_climatica_cte ?? undefined,
        zona_climatica_verano: mockInmuebleRow.zona_climatica_verano ?? undefined,
        certificado_existente_url: mockInmuebleRow.certificado_existente_url ?? undefined,
        certificado_letra: mockInmuebleRow.certificado_letra ?? undefined,
        certificado_consumo: mockInmuebleRow.certificado_consumo ?? undefined,
        certificado_emisiones: mockInmuebleRow.certificado_emisiones ?? undefined,
        created_by: mockInmuebleRow.created_by,
        updated_by: mockInmuebleRow.updated_by,
      };

      const result = await repo.crear(input);

      expect(result).toEqual(mockInmuebleRow);
      expect(mockSupabase.from).toHaveBeenCalledWith('core.inmueble');
      expect(mockQuery.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          direccion: mockInmuebleRow.direccion,
          municipio: mockInmuebleRow.municipio,
          provincia: mockInmuebleRow.provincia,
          codigo_postal: mockInmuebleRow.codigo_postal,
          uso: 'residencial',
          tipo: 'piso',
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

      const input: CrearInmuebleInput = {
        cliente_id: '0191f1c0-0000-7000-8000-000000000001',
        direccion: 'Carrer Fail 1',
        municipio: 'Barcelona',
        provincia: 'Barcelona',
        codigo_postal: '08001',
        created_by: '00000000-0000-0000-0000-000000000000',
        updated_by: '00000000-0000-0000-0000-000000000000',
      };

      await expect(repo.crear(input)).rejects.toThrow('Error al crear inmueble');
    });
  });

  // ------------------------------------------------------------------
  // findById
  // ------------------------------------------------------------------
  describe('findById', () => {
    it('should return null when inmueble not found', async () => {
      mockQuery.single.mockResolvedValue({
        data: null,
        error: { code: 'PGRST116', message: 'no rows', details: '' },
      });

      const result = await repo.findById('nonexistent-id');

      expect(result).toBeNull();
    });

    it('should find an inmueble by id', async () => {
      const mockRow: InmuebleRow = {
        id: '0191f1c0-0000-7000-8000-000000000100',
        cliente_id: '0191f1c0-0000-7000-8000-000000000001',
        referencia_catastral: null,
        direccion: 'Carrer Test 456',
        municipio: 'Barcelona',
        provincia: 'Barcelona',
        codigo_postal: '08001',
        latitud: null,
        longitud: null,
        altitud: null,
        uso: 'residencial',
        tipo: 'piso',
        tipo_edificio: null,
        superficie_util: null,
        superficie_construida: null,
        ano_construccion: null,
        numero_plantas: null,
        altura_libre: null,
        orientacion_principal: null,
        orientacion_secundaria: null,
        zona_climatica_cte: null,
        zona_climatica_verano: null,
        certificado_existente_url: null,
        certificado_letra: null,
        certificado_consumo: null,
        certificado_emisiones: null,
        datos_catastrales: null,
        observaciones: null,
        created_at: '2026-07-06T07:00:00.000Z',
        created_by: '00000000-0000-0000-0000-000000000000',
        updated_at: '2026-07-06T07:00:00.000Z',
        updated_by: '00000000-0000-0000-0000-000000000000',
        deleted_at: null,
        deleted_by: null,
        version: 1,
      };

      mockQuery.single.mockResolvedValue({ data: mockRow, error: null });

      const result = await repo.findById(mockRow.id);

      expect(result).toEqual(mockRow);
      expect(mockSupabase.from).toHaveBeenCalledWith('core.inmueble');
      expect(mockQuery.eq).toHaveBeenCalledWith('id', mockRow.id);
      expect(mockQuery.is).toHaveBeenCalledWith('deleted_at', null);
    });
  });

  // ------------------------------------------------------------------
  // actualizar (optimistic locking)
  // ------------------------------------------------------------------
  describe('actualizar', () => {
    it('should update an inmueble with optimistic locking', async () => {
      const updatedRow: InmuebleRow = {
        id: '0191f1c0-0000-7000-8000-000000000100',
        cliente_id: '0191f1c0-0000-7000-8000-000000000001',
        referencia_catastral: '1234567XX1234A_0001XX',
        direccion: 'Carrer del Comte d\'Urgell 187, 3º 2ª',
        municipio: 'Barcelona',
        provincia: 'Barcelona',
        codigo_postal: '08036',
        latitud: 41.3874,
        longitud: 2.1686,
        altitud: 12,
        uso: 'residencial',
        tipo: 'piso',
        tipo_edificio: 'bloque',
        superficie_util: 90.00, // Updated
        superficie_construida: 100.00, // Updated
        ano_construccion: 1975,
        numero_plantas: 5,
        altura_libre: 2.50,
        orientacion_principal: 'S',
        orientacion_secundaria: null,
        zona_climatica_cte: 'C2',
        zona_climatica_verano: '3',
        certificado_existente_url: null,
        certificado_letra: null,
        certificado_consumo: null,
        certificado_emisiones: null,
        datos_catastrales: null,
        observaciones: 'Superficie corregida tras medición',
        created_at: '2026-07-06T07:00:00.000Z',
        created_by: '00000000-0000-0000-0000-000000000000',
        updated_at: '2026-07-06T08:00:00.000Z',
        updated_by: '00000000-0000-0000-0000-000000000002',
        deleted_at: null,
        deleted_by: null,
        version: 2,
      };

      mockQuery.single.mockResolvedValue({ data: updatedRow, error: null });

      const input: ActualizarInmuebleInput = {
        superficie_util: 90.00,
        superficie_construida: 100.00,
        observaciones: 'Superficie corregida tras medición',
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

      const input: ActualizarInmuebleInput = {
        direccion: 'Carrer Conflict 1',
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
    it('should soft delete an inmueble', async () => {
      const deleteResult = {
        id: '0191f1c0-0000-7000-8000-000000000100',
        deleted_at: '2026-07-06T09:00:00.000Z',
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

    it('should return null when inmueble already deleted', async () => {
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
    it('should query without empresa_id filter (MVP)', async () => {
      mockQuery.select.mockReturnThis();
      mockQuery.order.mockReturnThis();
      mockQuery.range.mockResolvedValue({ data: [], error: null });

      await repo.findMany({});

      expect(mockSupabase.from).toHaveBeenCalledWith('core.inmueble');
      // MVP: No empresa_id filter. Preparado para migración a multitenant en V3.
      expect(mockQuery.eq).not.toHaveBeenCalled();
      expect(mockQuery.is).toHaveBeenCalledWith('deleted_at', null);
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

    it('should apply geographic filters correctly', async () => {
      mockQuery.select.mockReturnThis();
      mockQuery.order.mockReturnThis();
      mockQuery.range.mockResolvedValue({ data: [], error: null });

      await repo.findMany({
        provincia: 'Barcelona',
        municipio: 'Barcelona',
        codigo_postal: '08036',
      });

      expect(mockQuery.eq).toHaveBeenCalledWith('provincia', 'Barcelona');
      expect(mockQuery.eq).toHaveBeenCalledWith('municipio', 'Barcelona');
      expect(mockQuery.eq).toHaveBeenCalledWith('codigo_postal', '08036');
    });

    it('should apply climactic zone filters correctly', async () => {
      mockQuery.select.mockReturnThis();
      mockQuery.order.mockReturnThis();
      mockQuery.range.mockResolvedValue({ data: [], error: null });

      await repo.findMany({
        zona_climatica_cte: 'C2',
        zona_climatica_verano: '3',
      });

      expect(mockQuery.eq).toHaveBeenCalledWith('zona_climatica_cte', 'C2');
      expect(mockQuery.eq).toHaveBeenCalledWith('zona_climatica_verano', '3');
    });

    it('should apply search filter correctly', async () => {
      mockQuery.select.mockReturnThis();
      mockQuery.order.mockReturnThis();
      mockQuery.range.mockResolvedValue({ data: [], error: null });

      await repo.findMany({
        search: 'Comte',
      });

      expect(mockQuery.or).toHaveBeenCalledWith(
        'direccion.ilike.%Comte%,municipio.ilike.%Comte%,provincia.ilike.%Comte%'
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
      expect((countQuery.is as Mock)).toHaveBeenCalledWith('deleted_at', null);
    });

    it('should filter by cliente_id in count', async () => {
      const countQuery: Record<string, Mock | unknown> = {
        eq: vi.fn().mockReturnThis(),
        is: vi.fn().mockReturnThis(),
        then: vi.fn((resolve: (value: unknown) => void) =>
          resolve({ data: null, count: 5, error: null })
        ),
      };
      mockQuery.select = vi.fn().mockReturnValue(countQuery);

      const countResult = await repo.count({
        cliente_id: '0191f1c0-0000-7000-8000-000000000001',
      });

      expect(countResult).toBe(5);
      expect((countQuery.eq as Mock)).toHaveBeenCalledWith(
        'cliente_id',
        '0191f1c0-0000-7000-8000-000000000001'
      );
    });
  });
});
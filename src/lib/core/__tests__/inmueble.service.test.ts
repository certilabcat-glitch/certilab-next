import { describe, it, expect, vi, beforeEach } from 'vitest';
import type {
  InmuebleRow,
  CrearInmuebleInput,
  ActualizarInmuebleInput,
} from '@/types/core/inmueble';

// Mock the repository completely
vi.mock('@/lib/core/inmueble.repository', () => ({
  inmuebleRepository: {
    crear: vi.fn(),
    findById: vi.fn(),
    // Default: return empty array so deduplication doesn't interfere
    findMany: vi.fn().mockResolvedValue([]),
    count: vi.fn(),
    actualizar: vi.fn(),
    softDelete: vi.fn(),
    restaurar: vi.fn(),
  },
}));

import { inmuebleRepository } from '@/lib/core/inmueble.repository';
import { InmuebleService } from '@/lib/core/inmueble.service';

const CLIENTE_ID = '0191f1c0-0000-7000-8000-000000000050';
const USER_ID = '00000000-0000-0000-0000-000000000001';

const mockInmuebleRow: InmuebleRow = {
  id: '0191f1c0-0000-7000-8000-000000000001',
  cliente_id: CLIENTE_ID,
  referencia_catastral: '1234567890123456',
  direccion: 'Calle Mayor 1',
  municipio: 'Madrid',
  provincia: 'Madrid',
  codigo_postal: '28001',
  latitud: 40.4168,
  longitud: -3.7038,
  altitud: null,
  uso: 'residencial',
  tipo: 'piso',
  tipo_edificio: 'bloque',
  superficie_util: 85,
  superficie_construida: 95,
  ano_construccion: 1990,
  numero_plantas: 5,
  altura_libre: 2.5,
  orientacion_principal: 'S',
  orientacion_secundaria: null,
  zona_climatica_cte: 'D3',
  zona_climatica_verano: '4',
  certificado_existente_url: null,
  certificado_letra: 'E',
  certificado_consumo: 180.5,
  certificado_emisiones: 35.2,
  datos_catastrales: null,
  observaciones: null,
  created_at: '2026-07-06T07:00:00.000Z',
  created_by: USER_ID,
  updated_at: '2026-07-06T07:00:00.000Z',
  updated_by: USER_ID,
  deleted_at: null,
  deleted_by: null,
  version: 1,
};

describe('InmuebleService', () => {
  let service: InmuebleService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new InmuebleService();
  });

  // ================================================================
  // crear
  // ================================================================
  describe('crear', () => {
    const crearInput: CrearInmuebleInput = {
      cliente_id: CLIENTE_ID,
      referencia_catastral: '1234567890123456',
      direccion: 'Calle Mayor 1',
      municipio: 'Madrid',
      provincia: 'Madrid',
      codigo_postal: '28001',
      uso: 'residencial',
      tipo: 'piso',
      created_by: USER_ID,
      updated_by: USER_ID,
    };

    it('should create an inmueble successfully', async () => {
      vi.mocked(inmuebleRepository.crear).mockResolvedValue(mockInmuebleRow);

      const result = await service.crear(crearInput);

      expect(result).toEqual(mockInmuebleRow);
      expect(inmuebleRepository.crear).toHaveBeenCalledWith(crearInput);
    });

    it('should deduplicate by referencia_catastral (R-CR-03)', async () => {
      // Mock that the refcat already exists
      vi.mocked(inmuebleRepository.findMany).mockResolvedValue([mockInmuebleRow]);

      const result = await service.crear({
        ...crearInput,
        referencia_catastral: '1234567890123456',
      });

      // Should return the existing inmueble without creating
      expect(result).toEqual(mockInmuebleRow);
      expect(inmuebleRepository.crear).not.toHaveBeenCalled();
    });

    it('should validate required direction (R-CR-04)', async () => {
      await expect(
        service.crear({ ...crearInput, direccion: '' })
      ).rejects.toThrow('La dirección es obligatoria.');
    });

    it('should validate municipio is required', async () => {
      await expect(
        service.crear({ ...crearInput, municipio: '' })
      ).rejects.toThrow('El municipio es obligatorio.');
    });

    it('should validate provincia is required', async () => {
      await expect(
        service.crear({ ...crearInput, provincia: '' })
      ).rejects.toThrow('La provincia es obligatoria.');
    });

    it('should validate codigo_postal format', async () => {
      await expect(
        service.crear({ ...crearInput, codigo_postal: '1234' })
      ).rejects.toThrow('El código postal debe tener 5 dígitos numéricos.');
    });

    it('should validate referencia_catastral format', async () => {
      vi.mocked(inmuebleRepository.findMany).mockResolvedValue([]);

      await expect(
        service.crear({ ...crearInput, referencia_catastral: 'short' })
      ).rejects.toThrow('La referencia catastral debe tener entre 14 y 20 caracteres alfanuméricos.');
    });

    it('should validate ano_construccion range', async () => {
      await expect(
        service.crear({ ...crearInput, ano_construccion: 1400 })
      ).rejects.toThrow(/anterior a 1500/);
    });

    it('should validate certificado_letra', async () => {
      await expect(
        service.crear({
          ...crearInput,
          // @ts-expect-error - Testing invalid cert letter 'H' at runtime
          certificado_letra: 'H',
        })
      ).rejects.toThrow(/letra del certificado debe ser una de/);
    });

    it('should validate coordenadas latitud range', async () => {
      await expect(
        service.crear({ ...crearInput, latitud: 100, longitud: 0 })
      ).rejects.toThrow('La latitud debe estar entre -90 y 90.');
    });

    it('should validate coordenadas longitud range', async () => {
      await expect(
        service.crear({ ...crearInput, latitud: 0, longitud: 200 })
      ).rejects.toThrow('La longitud debe estar entre -180 y 180.');
    });

    it('should validate superficie_construida max', async () => {
      await expect(
        service.crear({ ...crearInput, superficie_construida: 200000 })
      ).rejects.toThrow('La superficie construida no puede superar los 100.000 m².');
    });

    it('should wrap repository errors', async () => {
      vi.mocked(inmuebleRepository.crear).mockRejectedValue(
        new Error('DB error')
      );

      await expect(service.crear(crearInput)).rejects.toThrow(
        'Error al crear inmueble'
      );
    });

    it('should allow optional fields to be omitted', async () => {
      const minimalInput: CrearInmuebleInput = {
        cliente_id: CLIENTE_ID,
        direccion: 'Plaza Mayor 1',
        municipio: 'Barcelona',
        provincia: 'Barcelona',
        codigo_postal: '08001',
        created_by: 'user-id',
        updated_by: 'user-id',
      };

      const minimalRow: InmuebleRow = {
        ...mockInmuebleRow,
        id: '00000000-0000-0000-0000-000000000002',
        cliente_id: CLIENTE_ID,
        referencia_catastral: null,
        direccion: 'Plaza Mayor 1',
        municipio: 'Barcelona',
        provincia: 'Barcelona',
        codigo_postal: '08001',
        latitud: null,
        longitud: null,
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
        created_by: 'user-id',
        updated_by: 'user-id',
      };

      vi.mocked(inmuebleRepository.crear).mockResolvedValue(minimalRow);

      const result = await service.crear(minimalInput);
      expect(result.direccion).toBe('Plaza Mayor 1');
      expect(result.referencia_catastral).toBeNull();
    });
  });

  // ================================================================
  // findById
  // ================================================================
  describe('findById', () => {
    it('should find an inmueble by ID', async () => {
      vi.mocked(inmuebleRepository.findById).mockResolvedValue(mockInmuebleRow);

      const result = await service.findById(mockInmuebleRow.id);

      expect(result).toEqual(mockInmuebleRow);
      expect(inmuebleRepository.findById).toHaveBeenCalledWith(
        mockInmuebleRow.id,
        false
      );
    });

    it('should throw validation error for empty ID', async () => {
      await expect(service.findById('')).rejects.toThrow(
        'El ID del inmueble es obligatorio.'
      );
    });

    it('should throw not found error', async () => {
      vi.mocked(inmuebleRepository.findById).mockResolvedValue(null);

      await expect(service.findById('nonexistent')).rejects.toThrow(
        'Inmueble no encontrado: nonexistent'
      );
    });
  });

  // ================================================================
  // buscarPorReferenciaCatastral
  // ================================================================
  describe('buscarPorReferenciaCatastral', () => {
    it('should find by exact referencia_catastral', async () => {
      vi.mocked(inmuebleRepository.findMany).mockResolvedValue([
        mockInmuebleRow,
      ]);

      const result = await service.buscarPorReferenciaCatastral(
        '1234567890123456'
      );

      expect(result).toEqual(mockInmuebleRow);
    });

    it('should return null for empty refcat', async () => {
      const result = await service.buscarPorReferenciaCatastral('');
      expect(result).toBeNull();
    });

    it('should return null when no match', async () => {
      vi.mocked(inmuebleRepository.findMany).mockResolvedValue([]);

      const result = await service.buscarPorReferenciaCatastral(
        '9999999999999999'
      );
      expect(result).toBeNull();
    });
  });

  // ================================================================
  // findMany
  // ================================================================
  describe('findMany', () => {
    it('should return list of inmuebles', async () => {
      vi.mocked(inmuebleRepository.findMany).mockResolvedValue([
        mockInmuebleRow,
      ]);

      const result = await service.findMany({ provincia: 'Madrid' });

      expect(result).toHaveLength(1);
      expect(inmuebleRepository.findMany).toHaveBeenCalledWith({
        provincia: 'Madrid',
      });
    });

    it('should return empty array when no matches', async () => {
      vi.mocked(inmuebleRepository.findMany).mockResolvedValue([]);

      const result = await service.findMany({ provincia: 'Lugo' });

      expect(result).toEqual([]);
    });
  });

  // ================================================================
  // count
  // ================================================================
  describe('count', () => {
    it('should return count', async () => {
      vi.mocked(inmuebleRepository.count).mockResolvedValue(42);

      const result = await service.count({ provincia: 'Madrid' });

      expect(result).toBe(42);
    });
  });

  // ================================================================
  // actualizar
  // ================================================================
  describe('actualizar', () => {
    const updateInput: ActualizarInmuebleInput = {
      direccion: 'Calle Mayor 2',
      updated_by: '00000000-0000-0000-0000-000000000002',
      version: 1,
    };

    it('should update inmueble successfully', async () => {
      const updatedRow: InmuebleRow = {
        ...mockInmuebleRow,
        direccion: 'Calle Mayor 2',
        updated_by: '00000000-0000-0000-0000-000000000002',
        version: 2,
      };
      vi.mocked(inmuebleRepository.actualizar).mockResolvedValue(updatedRow);

      const result = await service.actualizar(mockInmuebleRow.id, updateInput);

      expect(result).toEqual(updatedRow);
      expect(inmuebleRepository.actualizar).toHaveBeenCalledWith(
        mockInmuebleRow.id,
        updateInput
      );
    });

    it('should throw validation error for empty ID', async () => {
      await expect(
        service.actualizar('', updateInput)
      ).rejects.toThrow('El ID del inmueble es obligatorio.');
    });

    it('should reject referencia_catastral change (I-IN-03)', async () => {
      await expect(
        service.actualizar(mockInmuebleRow.id, {
          ...updateInput,
          referencia_catastral: '9876543210987654',
        })
      ).rejects.toThrow('La referencia catastral no se puede modificar.');
    });

    it('should allow setting referencia_catastral to null', async () => {
      const updatedRow: InmuebleRow = {
        ...mockInmuebleRow,
        referencia_catastral: null,
        version: 2,
      };
      vi.mocked(inmuebleRepository.actualizar).mockResolvedValue(updatedRow);

      const result = await service.actualizar(mockInmuebleRow.id, {
        ...updateInput,
        referencia_catastral: null,
      });

      expect(result.referencia_catastral).toBeNull();
    });

    it('should throw version conflict error', async () => {
      vi.mocked(inmuebleRepository.actualizar).mockResolvedValue(null);
      vi.mocked(inmuebleRepository.findById).mockResolvedValue(mockInmuebleRow);

      await expect(
        service.actualizar(mockInmuebleRow.id, {
          ...updateInput,
          version: 99,
        })
      ).rejects.toThrow('Conflicto de versión');
    });

    it('should throw not found error', async () => {
      vi.mocked(inmuebleRepository.actualizar).mockResolvedValue(null);
      vi.mocked(inmuebleRepository.findById).mockResolvedValue(null);

      await expect(
        service.actualizar('nonexistent', updateInput)
      ).rejects.toThrow('Inmueble no encontrado');
    });
  });

  // ================================================================
  // softDelete
  // ================================================================
  describe('softDelete', () => {
    it('should soft delete an inmueble', async () => {
      vi.mocked(inmuebleRepository.findById).mockResolvedValue(mockInmuebleRow);
      vi.mocked(inmuebleRepository.softDelete).mockResolvedValue({
        success: true,
        deleted_at: '2026-07-06T08:00:00.000Z',
        version: 2,
      });

      const result = await service.softDelete(
        mockInmuebleRow.id,
        'deleter-user-id'
      );

      expect(result.success).toBe(true);
      expect(inmuebleRepository.softDelete).toHaveBeenCalledWith(
        mockInmuebleRow.id,
        'deleter-user-id'
      );
    });

    it('should validate empty ID', async () => {
      await expect(service.softDelete('', 'user')).rejects.toThrow(
        'El ID del inmueble es obligatorio.'
      );
    });

    it('should validate empty deletedBy', async () => {
      await expect(
        service.softDelete(mockInmuebleRow.id, '')
      ).rejects.toThrow('El usuario que elimina es obligatorio.');
    });

    it('should throw not found for nonexistent', async () => {
      vi.mocked(inmuebleRepository.findById).mockResolvedValue(null);

      await expect(
        service.softDelete('nonexistent', 'user')
      ).rejects.toThrow('Inmueble no encontrado');
    });

    it('should throw conflict when already deleted', async () => {
      vi.mocked(inmuebleRepository.findById).mockResolvedValue(mockInmuebleRow);
      vi.mocked(inmuebleRepository.softDelete).mockResolvedValue(null);

      await expect(
        service.softDelete(mockInmuebleRow.id, 'user')
      ).rejects.toThrow(
        'El inmueble ya estaba eliminado o no se encontró.'
      );
    });
  });

  // ================================================================
  // restaurar
  // ================================================================
  describe('restaurar', () => {
    it('should restore a deleted inmueble', async () => {
      const restoredRow: InmuebleRow = {
        ...mockInmuebleRow,
        deleted_at: null,
        deleted_by: null,
      };
      vi.mocked(inmuebleRepository.restaurar).mockResolvedValue(restoredRow);

      const result = await service.restaurar(
        mockInmuebleRow.id,
        'restorer-user-id'
      );

      expect(result).toEqual(restoredRow);
      expect(inmuebleRepository.restaurar).toHaveBeenCalledWith(
        mockInmuebleRow.id,
        'restorer-user-id'
      );
    });

    it('should validate empty ID', async () => {
      await expect(service.restaurar('', 'user')).rejects.toThrow(
        'El ID del inmueble es obligatorio.'
      );
    });

    it('should validate empty restoredBy', async () => {
      await expect(
        service.restaurar(mockInmuebleRow.id, '')
      ).rejects.toThrow('El usuario que restaura es obligatorio.');
    });

    it('should throw not found for nonexistent', async () => {
      vi.mocked(inmuebleRepository.restaurar).mockResolvedValue(null);
      vi.mocked(inmuebleRepository.findById).mockResolvedValue(null);

      await expect(
        service.restaurar('nonexistent', 'user')
      ).rejects.toThrow('Inmueble no encontrado');
    });

    it('should throw conflict if inmueble is not deleted', async () => {
      vi.mocked(inmuebleRepository.restaurar).mockResolvedValue(null);
      vi.mocked(inmuebleRepository.findById).mockResolvedValue(
        mockInmuebleRow // deleted_at is null - not deleted
      );

      await expect(
        service.restaurar(mockInmuebleRow.id, 'user')
      ).rejects.toThrow(
        'El inmueble no está eliminado. No es necesario restaurarlo.'
      );
    });
  });

  // ================================================================
  // Singleton
  // ================================================================
  describe('singleton', () => {
    it('should export a singleton instance', async () => {
      const { inmuebleService } = await import('@/lib/core/inmueble.service');
      expect(inmuebleService).toBeInstanceOf(InmuebleService);
      expect(inmuebleService).toBeDefined();
    });
  });
});
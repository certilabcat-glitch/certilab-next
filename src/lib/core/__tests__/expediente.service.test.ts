import { describe, it, expect, vi, beforeEach } from 'vitest';
import type {
  ExpedienteRow,
  CrearExpedienteInput,
  ActualizarExpedienteInput,
} from '@/types/core/expediente';

// Mock the repository completely
vi.mock('@/lib/core/expediente.repository', () => ({
  expedienteRepository: {
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

import { expedienteRepository } from '@/lib/core/expediente.repository';
import { ExpedienteService } from '@/lib/core/expediente.service';

const CLIENTE_ID = '0191f1c0-0000-7000-8000-000000000050';
const USER_ID = '00000000-0000-0000-0000-000000000001';

const mockExpedienteRow: ExpedienteRow = {
  id: '0191f1c0-0000-7000-8000-000000000200',
  numero_expediente: 'EXP-2026-07-0001',
  cliente_id: CLIENTE_ID,
  inmueble_id: null,
  estado: 'Solicitud',
  servicio: 'segunda_opinion',
  titulo: 'Segunda opinión Certificado Energético',
  notas: null,
  created_at: '2026-07-08T07:00:00.000Z',
  created_by: USER_ID,
  updated_at: '2026-07-08T07:00:00.000Z',
  updated_by: USER_ID,
  deleted_at: null,
  deleted_by: null,
  version: 1,
};

describe('ExpedienteService', () => {
  let service: ExpedienteService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ExpedienteService();
  });

  // ================================================================
  // crear
  // ================================================================
  describe('crear', () => {
    const crearInput: CrearExpedienteInput = {
      numero_expediente: 'EXP-2026-07-0001',
      cliente_id: CLIENTE_ID,
      servicio: 'segunda_opinion',
      titulo: 'Segunda opinión Certificado Energético',
      created_by: USER_ID,
      updated_by: USER_ID,
    };

    it('should create an expediente successfully', async () => {
      vi.mocked(expedienteRepository.crear).mockResolvedValue(mockExpedienteRow);

      const result = await service.crear(crearInput);

      expect(result).toEqual(mockExpedienteRow);
      // Service adds default estado 'Solicitud' and uses created_by as updated_by
      expect(expedienteRepository.crear).toHaveBeenCalledWith({
        ...crearInput,
        estado: 'Solicitud',
        updated_by: crearInput.created_by,
      });
    });

    it('should validate numero_expediente is required', async () => {
      await expect(
        service.crear({ ...crearInput, numero_expediente: '' })
      ).rejects.toThrow('El número de expediente no puede estar vacío.');
    });

    it('should validate cliente_id is required', async () => {
      await expect(
        service.crear({ ...crearInput, cliente_id: '' })
      ).rejects.toThrow('El ID del cliente es obligatorio.');
    });

    it('should default servicio to segunda_opinion if not provided', async () => {
      vi.mocked(expedienteRepository.crear).mockResolvedValue(mockExpedienteRow);

      const inputSinServicio: CrearExpedienteInput = {
        numero_expediente: 'EXP-2026-07-0002',
        cliente_id: CLIENTE_ID,
        created_by: USER_ID,
        updated_by: USER_ID,
      };

      await service.crear(inputSinServicio);

      expect(expedienteRepository.crear).toHaveBeenCalledWith(
        expect.objectContaining({
          servicio: 'segunda_opinion',
        })
      );
    });

    it('should default estado to Solicitud if not provided', async () => {
      vi.mocked(expedienteRepository.crear).mockResolvedValue(mockExpedienteRow);

      const inputSinEstado: CrearExpedienteInput = {
        numero_expediente: 'EXP-2026-07-0002',
        cliente_id: CLIENTE_ID,
        created_by: USER_ID,
        updated_by: USER_ID,
      };

      await service.crear(inputSinEstado);

      expect(expedienteRepository.crear).toHaveBeenCalledWith(
        expect.objectContaining({
          estado: 'Solicitud',
        })
      );
    });

    it('should wrap repository errors', async () => {
      vi.mocked(expedienteRepository.crear).mockRejectedValue(
        new Error('DB error')
      );

      await expect(service.crear(crearInput)).rejects.toThrow(
        'Error al crear expediente'
      );
    });

    it('should allow optional fields to be omitted', async () => {
      const minimalInput: CrearExpedienteInput = {
        numero_expediente: 'EXP-2026-07-0003',
        cliente_id: CLIENTE_ID,
        created_by: USER_ID,
        updated_by: USER_ID,
      };

      const minimalRow: ExpedienteRow = {
        ...mockExpedienteRow,
        id: '00000000-0000-0000-0000-000000000003',
        numero_expediente: 'EXP-2026-07-0003',
        servicio: 'segunda_opinion',
        titulo: null,
        notas: null,
        inmueble_id: null,
      };

      vi.mocked(expedienteRepository.crear).mockResolvedValue(minimalRow);

      const result = await service.crear(minimalInput);
      expect(result.numero_expediente).toBe('EXP-2026-07-0003');
      expect(result.servicio).toBe('segunda_opinion');
    });
  });

  // ================================================================
  // findById
  // ================================================================
  describe('findById', () => {
    it('should find an expediente by ID', async () => {
      vi.mocked(expedienteRepository.findById).mockResolvedValue(mockExpedienteRow);

      const result = await service.findById(mockExpedienteRow.id);

      expect(result).toEqual(mockExpedienteRow);
      expect(expedienteRepository.findById).toHaveBeenCalledWith(
        mockExpedienteRow.id,
        false
      );
    });

    it('should throw validation error for empty ID', async () => {
      await expect(service.findById('')).rejects.toThrow(
        'El ID del expediente es obligatorio.'
      );
    });

    it('should throw not found error', async () => {
      vi.mocked(expedienteRepository.findById).mockResolvedValue(null);

      await expect(service.findById('nonexistent')).rejects.toThrow(
        'Expediente no encontrado: nonexistent'
      );
    });
  });

  // ================================================================
  // findMany
  // ================================================================
  describe('findMany', () => {
    it('should return list of expedientes', async () => {
      vi.mocked(expedienteRepository.findMany).mockResolvedValue([
        mockExpedienteRow,
      ]);

      const result = await service.findMany({ estado: 'Solicitud' });

      expect(result).toHaveLength(1);
      expect(expedienteRepository.findMany).toHaveBeenCalledWith({
        estado: 'Solicitud',
      });
    });

    it('should return empty array when no matches', async () => {
      vi.mocked(expedienteRepository.findMany).mockResolvedValue([]);

      const result = await service.findMany({ estado: 'Entregado' });

      expect(result).toEqual([]);
    });
  });

  // ================================================================
  // count
  // ================================================================
  describe('count', () => {
    it('should return count', async () => {
      vi.mocked(expedienteRepository.count).mockResolvedValue(10);

      const result = await service.count({ estado: 'Solicitud' });

      expect(result).toBe(10);
    });
  });

  // ================================================================
  // actualizar
  // ================================================================
  describe('actualizar', () => {
    const updateInput: ActualizarExpedienteInput = {
      titulo: 'Título actualizado',
      updated_by: '00000000-0000-0000-0000-000000000002',
      version: 1,
    };

    it('should update expediente successfully', async () => {
      const updatedRow: ExpedienteRow = {
        ...mockExpedienteRow,
        titulo: 'Título actualizado',
        updated_by: '00000000-0000-0000-0000-000000000002',
        version: 2,
      };
      vi.mocked(expedienteRepository.actualizar).mockResolvedValue(updatedRow);

      const result = await service.actualizar(mockExpedienteRow.id, updateInput);

      expect(result).toEqual(updatedRow);
      expect(expedienteRepository.actualizar).toHaveBeenCalledWith(
        mockExpedienteRow.id,
        updateInput
      );
    });

    it('should throw validation error for empty ID', async () => {
      await expect(
        service.actualizar('', updateInput)
      ).rejects.toThrow('El ID del expediente es obligatorio.');
    });

    it('should validate estado transition when estado is provided', async () => {
      // Estado actual es 'Solicitud', transición a 'EnRevisionPITR' es inválida (requiere pasar por PteDocumentacion primero)
      vi.mocked(expedienteRepository.findById).mockResolvedValue(mockExpedienteRow);

      await expect(
        service.actualizar(mockExpedienteRow.id, {
          estado: 'EnRevisionPITR',
          updated_by: USER_ID,
          version: 1,
        })
      ).rejects.toThrow('Estado inválido del expediente: Solicitud');
    });

    it('should allow valid estado transition', async () => {
      // Estado actual es 'Solicitud', transición a 'PteDocumentacion' es válida
      const updatedRow: ExpedienteRow = {
        ...mockExpedienteRow,
        estado: 'PteDocumentacion',
        version: 2,
      };
      vi.mocked(expedienteRepository.findById).mockResolvedValue(mockExpedienteRow);
      vi.mocked(expedienteRepository.actualizar).mockResolvedValue(updatedRow);

      const result = await service.actualizar(mockExpedienteRow.id, {
        estado: 'PteDocumentacion',
        updated_by: USER_ID,
        version: 1,
      });

      expect(result.estado).toBe('PteDocumentacion');
    });

    it('should throw version conflict error', async () => {
      vi.mocked(expedienteRepository.actualizar).mockResolvedValue(null);
      vi.mocked(expedienteRepository.findById).mockResolvedValue(mockExpedienteRow);

      await expect(
        service.actualizar(mockExpedienteRow.id, {
          ...updateInput,
          version: 99,
        })
      ).rejects.toThrow('Conflicto de versión');
    });

    it('should throw not found error', async () => {
      vi.mocked(expedienteRepository.actualizar).mockResolvedValue(null);
      vi.mocked(expedienteRepository.findById).mockResolvedValue(null);

      await expect(
        service.actualizar('nonexistent', updateInput)
      ).rejects.toThrow('Expediente no encontrado');
    });
  });

  // ================================================================
  // softDelete
  // ================================================================
  describe('softDelete', () => {
    it('should soft delete an expediente', async () => {
      vi.mocked(expedienteRepository.findById).mockResolvedValue(mockExpedienteRow);
      vi.mocked(expedienteRepository.softDelete).mockResolvedValue({
        success: true,
        deleted_at: '2026-07-08T08:00:00.000Z',
        version: 2,
      });

      const result = await service.softDelete(
        mockExpedienteRow.id,
        'deleter-user-id'
      );

      expect(result.success).toBe(true);
      expect(expedienteRepository.softDelete).toHaveBeenCalledWith(
        mockExpedienteRow.id,
        'deleter-user-id'
      );
    });

    it('should validate empty ID', async () => {
      await expect(service.softDelete('', 'user')).rejects.toThrow(
        'El ID del expediente es obligatorio.'
      );
    });

    it('should validate empty deletedBy', async () => {
      await expect(
        service.softDelete(mockExpedienteRow.id, '')
      ).rejects.toThrow('El usuario (deleted_by) es obligatorio para operaciones de auditoría.');
    });

    it('should throw not found for nonexistent', async () => {
      vi.mocked(expedienteRepository.findById).mockResolvedValue(null);

      await expect(
        service.softDelete('nonexistent', 'user')
      ).rejects.toThrow('Expediente no encontrado');
    });

    it('should throw conflict when already deleted', async () => {
      vi.mocked(expedienteRepository.findById).mockResolvedValue(mockExpedienteRow);
      vi.mocked(expedienteRepository.softDelete).mockResolvedValue(null);

      await expect(
        service.softDelete(mockExpedienteRow.id, 'user')
      ).rejects.toThrow(
        'El expediente ya estaba eliminado o no se encontró.'
      );
    });
  });

  // ================================================================
  // restaurar
  // ================================================================
  describe('restaurar', () => {
    it('should restore a deleted expediente', async () => {
      const restoredRow: ExpedienteRow = {
        ...mockExpedienteRow,
        deleted_at: null,
        deleted_by: null,
      };
      vi.mocked(expedienteRepository.restaurar).mockResolvedValue(restoredRow);

      const result = await service.restaurar(
        mockExpedienteRow.id,
        'restorer-user-id'
      );

      expect(result).toEqual(restoredRow);
      expect(expedienteRepository.restaurar).toHaveBeenCalledWith(
        mockExpedienteRow.id,
        'restorer-user-id'
      );
    });

    it('should validate empty ID', async () => {
      await expect(service.restaurar('', 'user')).rejects.toThrow(
        'El ID del expediente es obligatorio.'
      );
    });

    it('should validate empty restoredBy', async () => {
      await expect(
        service.restaurar(mockExpedienteRow.id, '')
      ).rejects.toThrow('El usuario (updated_by) es obligatorio para operaciones de auditoría.');
    });

    it('should throw not found for nonexistent', async () => {
      vi.mocked(expedienteRepository.restaurar).mockResolvedValue(null);
      vi.mocked(expedienteRepository.findById).mockResolvedValue(null);

      await expect(
        service.restaurar('nonexistent', 'user')
      ).rejects.toThrow('Expediente no encontrado');
    });

    it('should throw conflict if expediente is not deleted', async () => {
      vi.mocked(expedienteRepository.restaurar).mockResolvedValue(null);
      vi.mocked(expedienteRepository.findById).mockResolvedValue(
        mockExpedienteRow // deleted_at is null - not deleted
      );

      await expect(
        service.restaurar(mockExpedienteRow.id, 'user')
      ).rejects.toThrow(
        'El expediente no está eliminado. No es necesario restaurarlo.'
      );
    });
  });

  // ================================================================
  // Singleton
  // ================================================================
  describe('singleton', () => {
    it('should export a singleton instance', async () => {
      const { expedienteService } = await import('@/lib/core/expediente.service');
      expect(expedienteService).toBeInstanceOf(ExpedienteService);
      expect(expedienteService).toBeDefined();
    });
  });
});
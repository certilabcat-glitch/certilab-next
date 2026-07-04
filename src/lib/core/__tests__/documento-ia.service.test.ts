import { describe, it, expect, vi, beforeEach } from 'vitest';
import type {
  DocumentoIARow,
  CrearDocumentoIAInput,
  ActualizarDocumentoIAInput,
  RegistrarProcesamientoIAInput,
} from '@/types/core/documento-ia';

// Mock the repository completely
vi.mock('@/lib/core/documento-ia.repository', () => ({
  documentoIARepository: {
    crear: vi.fn(),
    findById: vi.fn(),
    findMany: vi.fn().mockResolvedValue([]),
    count: vi.fn(),
    actualizar: vi.fn(),
    softDelete: vi.fn(),
    restaurar: vi.fn(),
  },
}));

import { documentoIARepository } from '@/lib/core/documento-ia.repository';
import { DocumentoIAService } from '@/lib/core/documento-ia.service';

const EXPEDIENTE_ID = '0191f500-0000-7000-8000-000000000001';
const DOCUMENTO_ID = '0191f500-0000-7000-8000-000000000100';
const USER_ID = '00000000-0000-0000-0000-000000000001';

const mockDocumentoRow: DocumentoIARow = {
  id: DOCUMENTO_ID,
  expediente_id: EXPEDIENTE_ID,
  tipo: 'CERTIFICADO_ORIGINAL',
  nombre: 'certificado-energetico-demo.pdf',
  mime_type: 'application/pdf',
  tamano_bytes: 245760,
  storage_path: `${EXPEDIENTE_ID}/CERTIFICADO_ORIGINAL/${DOCUMENTO_ID}_certificado-energetico-demo.pdf`,
  hash_sha256: 'abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789',
  metadata_ia: null,
  estado_ia: 'NO_APLICA',
  created_at: '2026-07-09T07:00:00.000Z',
  created_by: USER_ID,
  updated_at: '2026-07-09T07:00:00.000Z',
  updated_by: USER_ID,
  deleted_at: null,
  deleted_by: null,
  version: 1,
};

describe('DocumentoIAService', () => {
  let service: DocumentoIAService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new DocumentoIAService();
  });

  // ================================================================
  // crear
  // ================================================================
  describe('crear', () => {
    const crearInput: CrearDocumentoIAInput = {
      expediente_id: EXPEDIENTE_ID,
      tipo: 'CERTIFICADO_ORIGINAL',
      nombre: 'certificado-energetico-demo.pdf',
      mime_type: 'application/pdf',
      tamano_bytes: 245760,
      storage_path: `${EXPEDIENTE_ID}/CERTIFICADO_ORIGINAL/${DOCUMENTO_ID}_certificado-energetico-demo.pdf`,
      hash_sha256: 'abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789',
      created_by: USER_ID,
      updated_by: USER_ID,
    };

    it('should create a documento IA successfully', async () => {
      vi.mocked(documentoIARepository.crear).mockResolvedValue(mockDocumentoRow);

      const result = await service.crear(crearInput);

      expect(result).toEqual(mockDocumentoRow);
      // Service uses created_by as updated_by
      expect(documentoIARepository.crear).toHaveBeenCalledWith({
        ...crearInput,
        updated_by: crearInput.created_by,
      });
    });

    it('should validate expediente_id is required', async () => {
      await expect(
        service.crear({ ...crearInput, expediente_id: '' })
      ).rejects.toThrow('El ID del expediente es obligatorio.');
    });

    it('should validate tipo is valid', async () => {
      await expect(
        service.crear({ ...crearInput, tipo: 'TIPO_INVALIDO' as never })
      ).rejects.toThrow('Tipo de documento inválido');
    });

    it('should validate nombre is required', async () => {
      await expect(
        service.crear({ ...crearInput, nombre: '' })
      ).rejects.toThrow('El nombre del documento es obligatorio.');
    });

    it('should validate mime_type is allowed', async () => {
      await expect(
        service.crear({ ...crearInput, mime_type: 'application/exe' })
      ).rejects.toThrow('Tipo MIME no permitido');
    });

    it('should validate tamano_bytes is positive', async () => {
      await expect(
        service.crear({ ...crearInput, tamano_bytes: 0 })
      ).rejects.toThrow('El tamaño del archivo debe ser un número entero positivo mayor que 0.');
    });

    it('should validate tamano_bytes does not exceed 50 MB', async () => {
      await expect(
        service.crear({ ...crearInput, tamano_bytes: 52 * 1024 * 1024 })
      ).rejects.toThrow('excede el máximo permitido');
    });

    it('should validate hash_sha256 format', async () => {
      await expect(
        service.crear({ ...crearInput, hash_sha256: 'abc' })
      ).rejects.toThrow('hash SHA-256 debe ser una cadena hexadecimal de exactamente 64 caracteres');
    });

    it('should validate storage_path format', async () => {
      await expect(
        service.crear({ ...crearInput, storage_path: 'invalid-path' })
      ).rejects.toThrow('La ruta de almacenamiento debe tener formato');
    });

    it('should accept ANALISIS_IA with IA processing state', async () => {
      const inputConIA: CrearDocumentoIAInput = {
        ...crearInput,
        tipo: 'ANALISIS_IA',
        estado_ia: 'PENDIENTE',
      };
      vi.mocked(documentoIARepository.crear).mockResolvedValue({
        ...mockDocumentoRow,
        tipo: 'ANALISIS_IA',
        estado_ia: 'PENDIENTE',
      });

      const result = await service.crear(inputConIA);
      expect(result.tipo).toBe('ANALISIS_IA');
    });

    it('should wrap repository errors', async () => {
      vi.mocked(documentoIARepository.crear).mockRejectedValue(
        new Error('DB error')
      );

      await expect(service.crear(crearInput)).rejects.toThrow(
        'Error al crear documento IA'
      );
    });
  });

  // ================================================================
  // findById
  // ================================================================
  describe('findById', () => {
    it('should find a documento IA by ID', async () => {
      vi.mocked(documentoIARepository.findById).mockResolvedValue(mockDocumentoRow);

      const result = await service.findById(DOCUMENTO_ID);

      expect(result).toEqual(mockDocumentoRow);
      expect(documentoIARepository.findById).toHaveBeenCalledWith(
        DOCUMENTO_ID,
        false
      );
    });

    it('should throw validation error for empty ID', async () => {
      await expect(service.findById('')).rejects.toThrow(
        'El ID del documento es obligatorio.'
      );
    });

    it('should throw not found error', async () => {
      vi.mocked(documentoIARepository.findById).mockResolvedValue(null);

      await expect(service.findById('nonexistent')).rejects.toThrow(
        'Documento IA no encontrado: nonexistent'
      );
    });
  });

  // ================================================================
  // findMany
  // ================================================================
  describe('findMany', () => {
    it('should return list of documentos', async () => {
      vi.mocked(documentoIARepository.findMany).mockResolvedValue([
        mockDocumentoRow,
      ]);

      const result = await service.findMany({ tipo: 'CERTIFICADO_ORIGINAL' });

      expect(result).toHaveLength(1);
      expect(documentoIARepository.findMany).toHaveBeenCalledWith({
        tipo: 'CERTIFICADO_ORIGINAL',
      });
    });

    it('should return empty array when no matches', async () => {
      vi.mocked(documentoIARepository.findMany).mockResolvedValue([]);

      const result = await service.findMany({ tipo: 'INFORME_IA' });

      expect(result).toEqual([]);
    });
  });

  // ================================================================
  // listarPorExpediente
  // ================================================================
  describe('listarPorExpediente', () => {
    it('should list documentos by expediente', async () => {
      vi.mocked(documentoIARepository.findMany).mockResolvedValue([
        mockDocumentoRow,
      ]);

      const result = await service.listarPorExpediente(EXPEDIENTE_ID);

      expect(result).toHaveLength(1);
      expect(documentoIARepository.findMany).toHaveBeenCalledWith({
        expediente_id: EXPEDIENTE_ID,
      });
    });

    it('should filter by tipo when provided', async () => {
      vi.mocked(documentoIARepository.findMany).mockResolvedValue([
        mockDocumentoRow,
      ]);

      await service.listarPorExpediente(EXPEDIENTE_ID, {
        tipo: 'CERTIFICADO_ORIGINAL',
      });

      expect(documentoIARepository.findMany).toHaveBeenCalledWith({
        expediente_id: EXPEDIENTE_ID,
        tipo: 'CERTIFICADO_ORIGINAL',
      });
    });

    it('should validate expediente_id is required', async () => {
      await expect(
        service.listarPorExpediente('')
      ).rejects.toThrow('El ID del expediente es obligatorio.');
    });
  });

  // ================================================================
  // count
  // ================================================================
  describe('count', () => {
    it('should return count', async () => {
      vi.mocked(documentoIARepository.count).mockResolvedValue(5);

      const result = await service.count({ tipo: 'CERTIFICADO_ORIGINAL' });

      expect(result).toBe(5);
    });
  });

  // ================================================================
  // actualizar
  // ================================================================
  describe('actualizar', () => {
    const updateInput: ActualizarDocumentoIAInput = {
      nombre: 'certificado-actualizado.pdf',
      updated_by: '00000000-0000-0000-0000-000000000002',
      version: 1,
    };

    it('should update documento IA successfully', async () => {
      const updatedRow: DocumentoIARow = {
        ...mockDocumentoRow,
        nombre: 'certificado-actualizado.pdf',
        updated_by: '00000000-0000-0000-0000-000000000002',
        version: 2,
      };
      vi.mocked(documentoIARepository.actualizar).mockResolvedValue(updatedRow);

      const result = await service.actualizar(DOCUMENTO_ID, updateInput);

      expect(result).toEqual(updatedRow);
      expect(documentoIARepository.actualizar).toHaveBeenCalledWith(
        DOCUMENTO_ID,
        updateInput
      );
    });

    it('should throw validation error for empty ID', async () => {
      await expect(
        service.actualizar('', updateInput)
      ).rejects.toThrow('El ID del documento es obligatorio.');
    });

    it('should throw validation error for missing version', async () => {
      await expect(
        service.actualizar(DOCUMENTO_ID, {
          nombre: 'test.pdf',
          updated_by: USER_ID,
          version: 0,
        })
      ).rejects.toThrow('La versión es obligatoria para actualizar (optimistic locking).');
    });

    it('should validate tipo if provided', async () => {
      vi.mocked(documentoIARepository.actualizar).mockResolvedValue({
        ...mockDocumentoRow,
        tipo: 'INFORME_FINAL',
        version: 2,
      });

      const result = await service.actualizar(DOCUMENTO_ID, {
        tipo: 'INFORME_FINAL',
        updated_by: USER_ID,
        version: 1,
      });

      expect(result.tipo).toBe('INFORME_FINAL');
    });

    it('should throw version conflict error', async () => {
      vi.mocked(documentoIARepository.actualizar).mockResolvedValue(null);
      vi.mocked(documentoIARepository.findById).mockResolvedValue(mockDocumentoRow);

      await expect(
        service.actualizar(DOCUMENTO_ID, {
          ...updateInput,
          version: 99,
        })
      ).rejects.toThrow('Conflicto de versión');
    });

    it('should throw not found error', async () => {
      vi.mocked(documentoIARepository.actualizar).mockResolvedValue(null);
      vi.mocked(documentoIARepository.findById).mockResolvedValue(null);

      await expect(
        service.actualizar('nonexistent', updateInput)
      ).rejects.toThrow('Documento IA no encontrado');
    });
  });

  // ================================================================
  // registrarProcesamientoIA
  // ================================================================
  describe('registrarProcesamientoIA', () => {
    const iaInput: RegistrarProcesamientoIAInput = {
      estado_ia: 'COMPLETADO',
      metadata_ia: {
        modelo: 'gpt-4',
        confianza: 0.95,
        resumen: 'Análisis completado exitosamente',
        fecha_procesamiento: '2026-07-09T08:00:00.000Z',
      },
      updated_by: USER_ID,
      version: 1,
    };

    it('should register IA processing successfully', async () => {
      const processedRow: DocumentoIARow = {
        ...mockDocumentoRow,
        estado_ia: 'COMPLETADO',
        metadata_ia: iaInput.metadata_ia,
        version: 2,
      };
      vi.mocked(documentoIARepository.findById).mockResolvedValue(mockDocumentoRow);
      vi.mocked(documentoIARepository.actualizar).mockResolvedValue(processedRow);

      const result = await service.registrarProcesamientoIA(DOCUMENTO_ID, iaInput);

      expect(result.estado_ia).toBe('COMPLETADO');
      expect(result.metadata_ia).toEqual(iaInput.metadata_ia);
      expect(documentoIARepository.actualizar).toHaveBeenCalledWith(DOCUMENTO_ID, {
        estado_ia: 'COMPLETADO',
        metadata_ia: iaInput.metadata_ia,
        updated_by: USER_ID,
        version: 1,
      });
    });

    it('should validate estado_ia', async () => {
      await expect(
        service.registrarProcesamientoIA(DOCUMENTO_ID, {
          ...iaInput,
          estado_ia: 'INVALIDO' as never,
        })
      ).rejects.toThrow('Estado de procesamiento IA inválido');
    });

    it('should require metadata_ia when estado_ia is not NO_APLICA', async () => {
      vi.mocked(documentoIARepository.findById).mockResolvedValue(mockDocumentoRow);

      await expect(
        service.registrarProcesamientoIA(DOCUMENTO_ID, {
          estado_ia: 'COMPLETADO',
          metadata_ia: undefined,
          updated_by: USER_ID,
          version: 1,
        })
      ).rejects.toThrow(
        'Los metadatos IA son obligatorios cuando el estado de procesamiento no es NO_APLICA.'
      );
    });

    it('should allow NO_APLICA without metadata', async () => {
      vi.mocked(documentoIARepository.findById).mockResolvedValue(mockDocumentoRow);
      vi.mocked(documentoIARepository.actualizar).mockResolvedValue(mockDocumentoRow);

      const result = await service.registrarProcesamientoIA(DOCUMENTO_ID, {
        estado_ia: 'NO_APLICA',
        metadata_ia: undefined,
        updated_by: USER_ID,
        version: 1,
      });

      expect(result.estado_ia).toBe('NO_APLICA');
    });

    it('should throw not found if documento does not exist', async () => {
      vi.mocked(documentoIARepository.findById).mockResolvedValue(null);

      await expect(
        service.registrarProcesamientoIA('nonexistent', iaInput)
      ).rejects.toThrow('Documento IA no encontrado');
    });

    it('should throw version conflict on stale version', async () => {
      vi.mocked(documentoIARepository.findById).mockResolvedValue(mockDocumentoRow);
      vi.mocked(documentoIARepository.actualizar).mockResolvedValue(null);

      const refreshed: DocumentoIARow = {
        ...mockDocumentoRow,
        version: 3, // different from input version 1
      };
      vi.mocked(documentoIARepository.findById).mockResolvedValueOnce(mockDocumentoRow);
      vi.mocked(documentoIARepository.findById).mockResolvedValueOnce(refreshed);

      await expect(
        service.registrarProcesamientoIA(DOCUMENTO_ID, {
          ...iaInput,
          version: 1,
        })
      ).rejects.toThrow('Conflicto de versión');
    });
  });

  // ================================================================
  // softDelete
  // ================================================================
  describe('softDelete', () => {
    it('should soft delete a documento IA', async () => {
      vi.mocked(documentoIARepository.findById).mockResolvedValue(mockDocumentoRow);
      vi.mocked(documentoIARepository.softDelete).mockResolvedValue({
        success: true,
        deleted_at: '2026-07-09T08:00:00.000Z',
        version: 2,
      });

      const result = await service.softDelete(DOCUMENTO_ID, 'deleter-user-id');

      expect(result.success).toBe(true);
      expect(documentoIARepository.softDelete).toHaveBeenCalledWith(
        DOCUMENTO_ID,
        'deleter-user-id'
      );
    });

    it('should validate empty ID', async () => {
      await expect(service.softDelete('', 'user')).rejects.toThrow(
        'El ID del documento es obligatorio.'
      );
    });

    it('should validate empty deletedBy', async () => {
      await expect(
        service.softDelete(DOCUMENTO_ID, '')
      ).rejects.toThrow('El usuario (deleted_by) es obligatorio para operaciones de auditoría.');
    });

    it('should throw not found for nonexistent', async () => {
      vi.mocked(documentoIARepository.findById).mockResolvedValue(null);

      await expect(
        service.softDelete('nonexistent', 'user')
      ).rejects.toThrow('Documento IA no encontrado');
    });

    it('should throw conflict when already deleted', async () => {
      vi.mocked(documentoIARepository.findById).mockResolvedValue(mockDocumentoRow);
      vi.mocked(documentoIARepository.softDelete).mockResolvedValue(null);

      await expect(
        service.softDelete(DOCUMENTO_ID, 'user')
      ).rejects.toThrow(
        'El documento ya estaba eliminado o no se encontró.'
      );
    });
  });

  // ================================================================
  // restaurar
  // ================================================================
  describe('restaurar', () => {
    it('should restore a deleted documento IA', async () => {
      const restoredRow: DocumentoIARow = {
        ...mockDocumentoRow,
        deleted_at: null,
        deleted_by: null,
      };
      vi.mocked(documentoIARepository.restaurar).mockResolvedValue(restoredRow);

      const result = await service.restaurar(DOCUMENTO_ID, 'restorer-user-id');

      expect(result).toEqual(restoredRow);
      expect(documentoIARepository.restaurar).toHaveBeenCalledWith(
        DOCUMENTO_ID,
        'restorer-user-id'
      );
    });

    it('should validate empty ID', async () => {
      await expect(service.restaurar('', 'user')).rejects.toThrow(
        'El ID del documento es obligatorio.'
      );
    });

    it('should validate empty restoredBy', async () => {
      await expect(
        service.restaurar(DOCUMENTO_ID, '')
      ).rejects.toThrow('El usuario (updated_by) es obligatorio para operaciones de auditoría.');
    });

    it('should throw not found for nonexistent', async () => {
      vi.mocked(documentoIARepository.restaurar).mockResolvedValue(null);
      vi.mocked(documentoIARepository.findById).mockResolvedValue(null);

      await expect(
        service.restaurar('nonexistent', 'user')
      ).rejects.toThrow('Documento IA no encontrado');
    });

    it('should throw conflict if documento is not deleted', async () => {
      vi.mocked(documentoIARepository.restaurar).mockResolvedValue(null);
      vi.mocked(documentoIARepository.findById).mockResolvedValue(
        mockDocumentoRow // deleted_at is null - not deleted
      );

      await expect(
        service.restaurar(DOCUMENTO_ID, 'user')
      ).rejects.toThrow(
        'El documento no está eliminado. No es necesario restaurarlo.'
      );
    });
  });

  // ================================================================
  // Singleton
  // ================================================================
  describe('singleton', () => {
    it('should export a singleton instance', async () => {
      const { documentoIAService } = await import('@/lib/core/documento-ia.service');
      expect(documentoIAService).toBeInstanceOf(DocumentoIAService);
      expect(documentoIAService).toBeDefined();
    });
  });
});
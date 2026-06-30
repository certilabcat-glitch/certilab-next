/**
 * TIPOS PARA DOCUMENTOS
 * Entidad independiente para gestionar archivos
 */

// Tipos de documento soportados
export enum TipoDocumento {
  CERTIFICADO_ENERGETICO = "certificado_energetico",
  IMAGEN = "imagen",
  CE3X = "ce3x",
  FACTURA = "factura",
  PLANO = "plano",
  FOTOGRAFIA = "fotografia",
  INFORME = "informe",
  OTRO = "otro",
}

// Estados del documento
export enum EstadoDocumento {
  PENDIENTE = "pendiente",
  PROCESANDO = "procesando",
  DISPONIBLE = "disponible",
  RECHAZADO = "rechazado",
  ARCHIVADO = "archivado",
}

/**
 * ENTIDAD: Documento
 * Gestión de archivos adjuntos a expedientes
 */
export interface Documento {
  // Identificación
  id: string;
  expedienteId: string;

  // Tipo de documento
  tipo: TipoDocumento;

  // Información
  nombre: string;
  descripcion?: string;

  // Archivo
  url: string; // Ruta en storage (sin dominio)
  tamaño: number; // bytes
  mimeType: string;
  hash: string; // SHA-256 para integridad

  // Estado
  estado: EstadoDocumento;

  // Metadata
  creadoPor: string;
  fechaCreacion: Date;

  // Versionado
  version: number;
  documentoPadreId?: string; // Para versiones anteriores

  // Observaciones
  observaciones?: string;

  // Auditoría
  deletedAt?: Date; // Soft delete
}

/**
 * DTOs para APIs
 */

// Request para subir documento
export interface SubirDocumentoRequest {
  expedienteId: string;
  tipo: TipoDocumento;
  nombre: string;
  descripcion?: string;
  archivo: File;
}

// Response para documento
export interface DocumentoResponse {
  id: string;
  expedienteId: string;
  tipo: TipoDocumento;
  nombre: string;
  estado: EstadoDocumento;
  tamaño: number;
  fechaCreacion: Date;
  version: number;
}

// Query params para listar documentos
export interface ListarDocumentosQuery {
  expedienteId: string;
  tipo?: TipoDocumento;
  estado?: EstadoDocumento;
  page?: number;
  limit?: number;
}

// Response para listar documentos
export interface ListarDocumentosResponse {
  data: DocumentoResponse[];
  total: number;
  pagina: number;
  totalPaginas: number;
}

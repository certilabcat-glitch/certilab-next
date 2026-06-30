/**
 * INTERFAZ DE ALMACENAMIENTO
 * Abstracción agnóstica de proveedores de storage
 * Soporta: Supabase Storage, AWS S3, Cloudflare R2
 */

/**
 * Interfaz para proveedores de almacenamiento
 * Sin acoplamiento a proveedores específicos
 */
export interface IStorageProvider {
  /**
   * Subir un archivo
   * @param archivo - Archivo a subir
   * @param ruta - Ruta donde guardar (ej: /documentos/exp-123/doc-456/v1/nombre.pdf)
   * @returns URL relativa y hash SHA-256
   */
  subir(
    archivo: File,
    ruta: string
  ): Promise<{ url: string; hash: string }>;

  /**
   * Descargar un archivo
   * @param ruta - Ruta del archivo
   * @returns Buffer del archivo
   */
  descargar(ruta: string): Promise<Buffer>;

  /**
   * Eliminar un archivo
   * @param ruta - Ruta del archivo
   */
  eliminar(ruta: string): Promise<void>;

  /**
   * Verificar si un archivo existe
   * @param ruta - Ruta del archivo
   */
  existe(ruta: string): Promise<boolean>;

  /**
   * Obtener URL pública de un archivo
   * @param ruta - Ruta del archivo
   * @param expiresIn - Segundos hasta que expire (opcional)
   */
  obtenerURL(ruta: string, expiresIn?: number): Promise<string>;
}

/**
 * Estructura de rutas estándar
 */
export const RUTAS_STORAGE = {
  DOCUMENTOS: "/documentos/{expedienteId}/{documentoId}/v{version}/{nombre}",
  INFORMES: "/informes/{expedienteId}/v{version}/{nombre}",
  FACTURAS: "/facturas/{pagoId}/{numeroFactura}",
  TEMPORAL: "/temporal/{usuarioId}/{timestamp}/{nombre}",
} as const;

/**
 * Tipos MIME permitidos
 */
export const MIME_TYPES_PERMITIDOS = {
  PDF: "application/pdf",
  IMAGEN_JPEG: "image/jpeg",
  IMAGEN_PNG: "image/png",
  IMAGEN_WEBP: "image/webp",
  CE3X: "application/xml", // CE3X es XML
  WORD: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  EXCEL: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
} as const;

/**
 * Límites de tamaño
 */
export const LIMITES_TAMAÑO = {
  DOCUMENTO: 50 * 1024 * 1024, // 50 MB
  IMAGEN: 10 * 1024 * 1024, // 10 MB
  INFORME: 100 * 1024 * 1024, // 100 MB
} as const;

/**
 * Validar archivo antes de subir
 */
export function validarArchivo(
  archivo: File,
  tipoDocumento: string
): { valido: boolean; error?: string } {
  // Validar tamaño
  const limiteSize = LIMITES_TAMAÑO.DOCUMENTO;
  if (archivo.size > limiteSize) {
    return {
      valido: false,
      error: `Archivo demasiado grande. Máximo: ${limiteSize / 1024 / 1024}MB`,
    };
  }

  // Validar MIME type
  const mimeValidos = Object.values(MIME_TYPES_PERMITIDOS);
  if (!mimeValidos.includes(archivo.type as unknown as typeof MIME_TYPES_PERMITIDOS[keyof typeof MIME_TYPES_PERMITIDOS])) {
    return {
      valido: false,
      error: `Tipo de archivo no permitido: ${archivo.type}`,
    };
  }

  return { valido: true };
}

/**
 * Generar ruta estándar para documento
 */
export function generarRutaDocumento(
  expedienteId: string,
  documentoId: string,
  version: number,
  nombreArchivo: string
): string {
  return `/documentos/${expedienteId}/${documentoId}/v${version}/${nombreArchivo}`;
}

/**
 * Generar ruta estándar para informe
 */
export function generarRutaInforme(
  expedienteId: string,
  version: number,
  nombreArchivo: string
): string {
  return `/informes/${expedienteId}/v${version}/${nombreArchivo}`;
}

/**
 * Generar ruta estándar para factura
 */
export function generarRutaFactura(
  pagoId: string,
  numeroFactura: string
): string {
  return `/facturas/${pagoId}/${numeroFactura}`;
}

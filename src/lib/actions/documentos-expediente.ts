"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { documentoIARepository } from "@/lib/core/documento-ia.repository";
import { expedienteService } from "@/lib/core/expediente.service";
import { DocumentoIAValidationError } from "@/types/core/documento-ia";
import type { DocumentoIARow, TipoDocumento } from "@/types/core/documento-ia";

/**
 * Server Action: Subir un documento a un expediente.
 *
 * Flujo:
 * 1. Verificar autenticación
 * 2. Verificar que el expediente pertenece al usuario
 * 3. Subir archivo a Supabase Storage (expediente-docs/{expediente_id}/)
 * 4. Calcular hash SHA-256 del archivo
 * 5. Registrar metadatos en core.documento
 *
 * V1 MVP: Sin procesamiento IA automático.
 * Tras la subida, se marca como NO_APLICA en estado_ia.
 */
export async function subirDocumento(
  expedienteId: string,
  tipo: TipoDocumento,
  formData: FormData
): Promise<{ success: boolean; documento?: DocumentoIARow; error?: string }> {
  const supabase = await createClient();

  // 1. Verificar autenticación
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      error: "Debes iniciar sesión para subir documentos.",
    };
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return { success: false, error: "No se ha seleccionado ningún archivo." };
  }

  // Validar tamaño (20MB)
  if (file.size > 20 * 1024 * 1024) {
    return {
      success: false,
      error: "El archivo no puede superar los 20MB.",
    };
  }

  // Validar tipo MIME
  const mimeTypesPermitidos = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];
  if (!mimeTypesPermitidos.includes(file.type)) {
    return {
      success: false,
      error:
        "Tipo de archivo no permitido. Solo PDF, JPG, PNG y WebP.",
    };
  }

  try {
    // 2. Verificar expediente
    const expediente = await expedienteService.findById(expedienteId);
    if (expediente.cliente_id !== user.id) {
      return {
        success: false,
        error: "No tienes permiso para modificar este expediente.",
      };
    }

    // Leer archivo como ArrayBuffer para hash y subida
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);

    // Calcular hash SHA-256 usando Web Crypto API
    const hashBuffer = await crypto.subtle.digest("SHA-256", fileBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Generar nombre único para storage
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storagePath = `${expedienteId}/${timestamp}_${safeName}`;

    // 3. Subir a Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("expediente-docs")
      .upload(storagePath, fileBuffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      return {
        success: false,
        error: `Error al subir el archivo: ${uploadError.message}`,
      };
    }

    // 4. Registrar en core.documento
    const documento = await documentoIARepository.crear({
      expediente_id: expedienteId,
      tipo,
      nombre: file.name,
      mime_type: file.type,
      tamano_bytes: file.size,
      storage_path: storagePath,
      hash_sha256: hashHex,
      estado_ia: "NO_APLICA",
      created_by: user.id,
      updated_by: user.id,
    });

    // 5. Transición automática: Solicitud/Devuelto → PteDocumentacion
    //    Si el expediente está en Solicitud o Devuelto y ya cumple los requisitos mínimos:
    //    - Al menos 1 CERTIFICADO_ORIGINAL (certificado energético)
    //    - Al menos 3 FOTOGRAFIA (fotos del inmueble)
    //    (CF-028 §5.2 — Documentación mínima para comenzar el análisis)
    //
    //    EP-033: Se añade Devuelto para que el cliente pueda corregir
    //    la documentación tras un rechazo del AT.
    if (expediente.estado === "Solicitud" || expediente.estado === "Devuelto") {
      const todosDocs = await documentoIARepository.findMany({
        expediente_id: expedienteId,
        include_deleted: false,
      });

      const tieneCertificado = todosDocs.some(
        (d) => d.tipo === "CERTIFICADO_ORIGINAL"
      );
      const numFotografias = todosDocs.filter(
        (d) => d.tipo === "FOTOGRAFIA"
      ).length;

      if (tieneCertificado && numFotografias >= 3) {
        await expedienteService.cambiarEstado(
          expedienteId,
          "PteDocumentacion",
          user.id,
          expediente.version
        );
      }
    }

    revalidatePath(`/plataforma/expedientes/${expedienteId}`);

    return { success: true, documento };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return {
      success: false,
      error: `Error al subir documento: ${errorMessage}`,
    };
  }
}

/**
 * Server Action: Obtener todos los documentos de un expediente.
 */
export async function getDocumentosExpediente(
  expedienteId: string
): Promise<{
  data: DocumentoIARow[];
  error?: string;
}> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { data: [], error: "Debes iniciar sesión." };
  }

  try {
    const expediente = await expedienteService.findById(expedienteId);
    if (expediente.cliente_id !== user.id) {
      return { data: [], error: "No tienes permiso para ver estos documentos." };
    }

    const documentos = await documentoIARepository.findMany({
      expediente_id: expedienteId,
      include_deleted: false,
    });

    return { data: documentos };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return { data: [], error: errorMessage };
  }
}

/**
 * Server Action: Descargar/enlazar un documento (obtener URL firmada).
 * La URL firmada expira en 60 minutos.
 */
export async function getDocumentoUrl(
  documentoId: string
): Promise<{ url?: string; error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Debes iniciar sesión." };
  }

  try {
    const documento = await documentoIARepository.findById(documentoId);
    if (!documento) {
      return { error: "Documento no encontrado." };
    }

    // Verificar que el usuario es propietario del expediente
    const expediente = await expedienteService.findById(documento.expediente_id);
    if (expediente.cliente_id !== user.id) {
      return { error: "No tienes permiso para descargar este documento." };
    }

    const { data, error } = await supabase.storage
      .from("expediente-docs")
      .createSignedUrl(documento.storage_path, 60 * 60); // 1 hora

    if (error) {
      return { error: `Error al generar URL: ${error.message}` };
    }

    return { url: data.signedUrl };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return { error: errorMessage };
  }
}

/**
 * Server Action: Eliminar (soft delete) un documento.
 */
export async function eliminarDocumento(
  documentoId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: "Debes iniciar sesión." };
  }

  try {
    const documento = await documentoIARepository.findById(documentoId);
    if (!documento) {
      return { success: false, error: "Documento no encontrado." };
    }

    // Verificar que el usuario es propietario del expediente
    const expediente = await expedienteService.findById(documento.expediente_id);
    if (expediente.cliente_id !== user.id) {
      return {
        success: false,
        error: "No tienes permiso para eliminar este documento.",
      };
    }

    // Soft delete en base de datos
    await documentoIARepository.softDelete(documentoId, user.id);

    // No eliminamos de storage para mantener integridad referencial
    // (podría haber otros procesos que referencien el archivo)

    revalidatePath(`/plataforma/expedientes/${documento.expediente_id}`);

    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return { success: false, error: errorMessage };
  }
}
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { expedienteService } from "@/lib/core/expediente.service";

/**
 * Server Action: Corregir un expediente devuelto.
 *
 * Transición: Devuelto -> PteDocumentacion
 *
 * Se ejecuta cuando un técnico indica que un expediente en estado
 * 'Devuelto' ha sido corregido con las observaciones realizadas
 * y debe volver a la cola de revisión documental.
 *
 * Precondiciones:
 * - El expediente debe estar en estado 'Devuelto'
 * - El usuario autenticado debe ser un técnico autorizado
 *
 * Postcondiciones:
 * - El estado del expediente pasa a 'PteDocumentacion'
 * - La caché se invalida para actualizar las vistas
 */
export async function corregirExpediente(
  expedienteId: string,
  version: number
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  // Verificar autenticación
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      error: "Debes iniciar sesión para realizar esta operación.",
    };
  }

  try {
    // Verificar que el expediente existe y está en estado Devuelto
    const expediente = await expedienteService.findById(expedienteId);

    if (!expediente) {
      return { success: false, error: "Expediente no encontrado." };
    }

    if (expediente.estado !== "Devuelto") {
      return {
        success: false,
        error: `El expediente está en estado '${expediente.estado}'. Solo se pueden corregir expedientes en estado 'Devuelto'.`,
      };
    }

    // Ejecutar la transición Devuelto -> PteDocumentacion
    const result = await expedienteService.corregirExpediente(
      expedienteId,
      user.id,
      version
    );

    if (!result.success) {
      return { success: false, error: "No se pudo registrar la corrección." };
    }

    // Revalidar caché
    revalidatePath(`/plataforma/expedientes/${expedienteId}`);
    revalidatePath("/plataforma/mis-expedientes");
    revalidatePath("/plataforma/at/dashboard");

    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return {
      success: false,
      error: `Error al corregir expediente: ${errorMessage}`,
    };
  }
}
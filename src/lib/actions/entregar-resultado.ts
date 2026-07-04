"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { expedienteService } from "@/lib/core/expediente.service";

/**
 * Server Action: Entregar el resultado al cliente.
 *
 * Transición: Aprobado -> Entregado
 *
 * Se ejecuta automáticamente cuando el cliente visualiza el resultado
 * de un expediente en estado Aprobado (Alternativa C del análisis EP-032).
 *
 * V1 MVP:
 * - Sin notificaciones automáticas
 * - La entrega se produce al cargar la vista de detalle del expediente
 * - Reutiliza las notas existentes del Expediente como resultado
 *
 * Precondiciones:
 * - El expediente debe estar en estado 'Aprobado'
 * - El usuario autenticado debe ser el propietario del expediente
 *
 * Postcondiciones:
 * - El estado del expediente pasa a 'Entregado'
 * - La caché se invalida para actualizar las vistas
 */
export async function entregarResultado(
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
      error: "Debes iniciar sesión para ver el resultado.",
    };
  }

  try {
    // Verificar que el expediente pertenece al usuario
    const expediente = await expedienteService.findById(expedienteId);

    if (!expediente) {
      return { success: false, error: "Expediente no encontrado." };
    }

    if (expediente.cliente_id !== user.id) {
      return {
        success: false,
        error: "No tienes permiso para ver este expediente.",
      };
    }

    // Solo entregar si está en estado Aprobado
    if (expediente.estado !== "Aprobado") {
      // Si ya está Entregado, no es error
      if (expediente.estado === "Entregado") {
        return { success: true };
      }
      return {
        success: false,
        error: `El expediente está en estado '${expediente.estado}'. No se puede entregar el resultado.`,
      };
    }

    // Ejecutar la transición Aprobado -> Entregado
    const result = await expedienteService.entregarExpediente(
      expedienteId,
      user.id,
      version
    );

    if (!result.success) {
      return { success: false, error: "No se pudo entregar el resultado." };
    }

    // Revalidar caché
    revalidatePath(`/plataforma/expedientes/${expedienteId}`);
    revalidatePath("/plataforma/mis-expedientes");

    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return {
      success: false,
      error: `Error al entregar el resultado: ${errorMessage}`,
    };
  }
}
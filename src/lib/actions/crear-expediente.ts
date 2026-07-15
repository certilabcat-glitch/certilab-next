"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { expedienteService } from "@/lib/core/expediente.service";
import { clienteRepository } from "@/lib/core/cliente.repository";
import type { ExpedienteRow } from "@/types/core/expediente";

/**
 * Generate a human-readable expediente number.
 * Format: EXP-YYYY-MM-NNNN
 * Example: EXP-2026-07-0001
 */
async function generateNumeroExpediente(): Promise<string> {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");

  const supabase = await createClient();

  // Get today's count to create sequential numbers
  const { count } = await supabase
    .from("core.expediente")
    .select("*", { count: "exact", head: true })
    .gte("created_at", today.toISOString().slice(0, 10) + "T00:00:00Z")
    .lt("created_at", today.toISOString().slice(0, 10) + "T23:59:59Z");

  const seq = ((count ?? 0) + 1).toString().padStart(4, "0");
  return `EXP-${year}-${month}-${seq}`;
}

/**
 * Server Action: Create a new expediente using the Core domain layer
 * 
 * Flujo:
 * 1. Verificar autenticación del usuario
 * 2. Obtener o crear Cliente asociado al usuario autenticado
 * 3. Generar número de expediente único
 * 4. Crear expediente con estado inicial "Solicitud" (canónico del dominio)
 * 5. Revalidar caché
 * 
 * Nota: El estado inicial es siempre "Solicitud" per CF-026 §6.1
 */
export async function crearExpediente(input: {
  titulo?: string;
  notas?: string;
}): Promise<{ success: boolean; expedienteId?: string; error?: string }> {
  const supabase = await createClient();

  // Verificar autenticación
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      error: "Debes iniciar sesión para crear un expediente.",
    };
  }

  try {
    // Obtener o crear cliente asociado al usuario autenticado
    // En V1, el cliente_id es el usuario_id del usuario autenticado
    let cliente = await clienteRepository.findById(user.id);

    if (!cliente) {
      // Si no existe cliente, crear uno con datos mínimos del usuario
      cliente = await clienteRepository.crear({
        usuario_id: user.id,
        email: user.email ?? undefined,
        nombre: user.user_metadata?.nombre ?? "Usuario",
        apellidos: user.user_metadata?.apellidos ?? "",
        consent_id: "default-consent",
        created_by: user.id,
        updated_by: user.id,
      });
    }

    // Generar número de expediente único
    const numeroExpediente = await generateNumeroExpediente();

    // Crear expediente usando el servicio de dominio
    // El estado inicial es siempre "Solicitud" (canónico del dominio)
    const expediente = await expedienteService.crear({
      numero_expediente: numeroExpediente,
      cliente_id: cliente.id,
      titulo: input.titulo,
      notas: input.notas,
      servicio: "segunda_opinion",
      created_by: user.id,
      updated_by: user.id,
    });

    // Revalidar caché de expedientes
    revalidatePath("/mis-expedientes");
    revalidatePath("/solicitar-segunda-opinion");
    revalidatePath(`/plataforma/expedientes/${expediente.id}`);

    return { success: true, expedienteId: expediente.id };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    console.error("Error creating expediente:", errorMessage);
    return {
      success: false,
      error: `Error al crear el expediente: ${errorMessage}`,
    };
  }
}

/**
 * Server Action: Get all expedientes for the current user
 */
export async function getMisExpedientes(): Promise<{
  data: ExpedienteRow[];
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
    const expedientes = await expedienteService.findMany({
      cliente_id: user.id,
      include_deleted: false,
    });

    return { data: expedientes };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    console.error("Error fetching expedientes:", errorMessage);
    return { data: [], error: "Error al obtener los expedientes." };
  }
}

/**
 * Server Action: Get a single expediente by ID
 */
export async function getExpedienteById(
  id: string
): Promise<{ data?: ExpedienteRow; error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Debes iniciar sesión." };
  }

  try {
    const expediente = await expedienteService.findById(id);

    // Verificar que el expediente pertenece al usuario autenticado
    if (expediente.cliente_id !== user.id) {
      return { error: "No tienes permiso para ver este expediente." };
    }

    return { data: expediente };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Expediente no encontrado";
    return { error: errorMessage };
  }
}

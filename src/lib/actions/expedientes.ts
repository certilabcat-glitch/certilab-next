"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { CrearExpedienteInput, ExpedienteRow } from "@/types/expediente-mvp";

/**
 * Generate a human-readable expediente number.
 * Format: EXP-{YYYYMMDD}-{XXXX}
 */
async function generateNumeroExpediente(supabase: Awaited<ReturnType<typeof createClient>>): Promise<string> {
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");

  // Get today's count to create sequential numbers
  const { count } = await supabase
    .from("expedientes")
    .select("*", { count: "exact", head: true })
    .gte("created_at", today.toISOString().slice(0, 10) + "T00:00:00Z")
    .lt("created_at", today.toISOString().slice(0, 10) + "T23:59:59Z");

  const seq = ((count ?? 0) + 1).toString().padStart(4, "0");
  return `EXP-${dateStr}-${seq}`;
}

/**
 * Server Action: Create a new expediente (Segunda Opinión)
 * The client is automatically set to the authenticated user.
 */
export async function solicitarSegundaOpinion(
  input: CrearExpedienteInput
): Promise<{ success: boolean; expedienteId?: string; error?: string }> {
  const supabase = await createClient();

  // Verify the user is authenticated
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: "Debes iniciar sesión para solicitar una segunda opinión." };
  }

  // Generate expediente number
  const numeroExpediente = await generateNumeroExpediente(supabase);

  // Insert the expediente
  const { data, error } = await supabase
    .from("expedientes")
    .insert({
      numero_expediente: numeroExpediente,
      cliente_id: user.id,
      estado: "pendiente",
      servicio: "segunda_opinion",
      titulo: input.titulo ?? null,
      notas: input.notas ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating expediente:", error);
    return { success: false, error: "Error al crear el expediente. Intenta de nuevo." };
  }

  revalidatePath("/mis-expedientes");
  return { success: true, expedienteId: data.id };
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

  const { data, error } = await supabase
    .from("expedientes")
    .select("*")
    .eq("cliente_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching expedientes:", error);
    return { data: [], error: "Error al obtener los expedientes." };
  }

  return { data: data as ExpedienteRow[] };
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

  const { data, error } = await supabase
    .from("expedientes")
    .select("*")
    .eq("id", id)
    .eq("cliente_id", user.id)
    .single();

  if (error) {
    return { error: "Expediente no encontrado." };
  }

  return { data: data as ExpedienteRow };
}
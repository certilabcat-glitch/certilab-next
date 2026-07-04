"use server";

import { expedienteRepository } from "@/lib/core/expediente.repository";
import type { ExpedienteRow } from "@/types/core/expediente";

/**
 * Estado canónico para expedientes con documentación completa
 * pendiente de análisis técnico.
 */
const ESTADO_PTE_DOCUMENTACION = "PteDocumentacion";

/**
 * Server Action: Obtener el siguiente expediente pendiente de revisión (FIFO).
 *
 * Responde a la pregunta: "¿Cuál es el siguiente expediente que debo revisar?"
 * Devuelve el expediente más antiguo en estado PteDocumentacion,
 * o null si no hay trabajo pendiente.
 */
export async function obtenerProximoExpedientePendiente(): Promise<{
  data: ExpedienteRow | null;
  error?: string;
}> {
  try {
    const pendientes = await expedienteRepository.findByEstado(
      ESTADO_PTE_DOCUMENTACION,
      { limit: 1 }
    );

    return { data: pendientes[0] ?? null };
  } catch (error) {
    const msg =
      error instanceof Error ? error.message : "Error desconocido";
    return { data: null, error: `Error al obtener próximo expediente: ${msg}` };
  }
}

/**
 * Server Action: Obtener la bandeja completa de expedientes pendientes.
 *
 * Devuelve todos los expedientes en estado PteDocumentacion
 * ordenados FIFO (más antiguo primero), limitados a 50.
 */
export async function obtenerBandejaTecnica(): Promise<{
  data: ExpedienteRow[];
  error?: string;
}> {
  try {
    const pendientes = await expedienteRepository.findByEstado(
      ESTADO_PTE_DOCUMENTACION
    );

    return { data: pendientes };
  } catch (error) {
    const msg =
      error instanceof Error ? error.message : "Error desconocido";
    return { data: [], error: `Error al obtener bandeja técnica: ${msg}` };
  }
}

/**
 * Server Action: Contar cuántos expedientes están pendientes.
 * Útil para mostrar un indicador en la interfaz.
 */
export async function contarPendientes(): Promise<{
  count: number;
  error?: string;
}> {
  try {
    const pendientes = await expedienteRepository.findByEstado(
      ESTADO_PTE_DOCUMENTACION,
      { limit: 1000 }
    );

    return { count: pendientes.length };
  } catch (error) {
    const msg =
      error instanceof Error ? error.message : "Error desconocido";
    return { count: 0, error: `Error al contar pendientes: ${msg}` };
  }
}
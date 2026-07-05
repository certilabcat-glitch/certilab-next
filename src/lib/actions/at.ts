"use server";

import { expedienteRepository } from "@/lib/core/expediente.repository";
import { expedienteService } from "@/lib/core/expediente.service";
import { clienteRepository } from "@/lib/core/cliente.repository";
import { inmuebleRepository } from "@/lib/core/inmueble.repository";
import { createClient } from "@/lib/supabase/server";
import type { ExpedienteRow } from "@/types/core/expediente";

/**
 * Estado canónico para expedientes con documentación completa
 * pendiente de análisis técnico.
 */
const ESTADO_PTE_DOCUMENTACION = "PteDocumentacion";

// ============================================================
// Bandeja Técnica
// ============================================================

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

// ============================================================
// Detalle de Expediente (Motor PITR V1)
// ============================================================

export interface DetalleExpedienteAT {
  expediente: ExpedienteRow;
  cliente: {
    id: string;
    nombre: string;
    email: string;
    telefono: string | null;
    created_at: string;
  } | null;
  inmueble: {
    id: string;
    direccion: string;
    referencia_catastral: string | null;
    tipo: string | null;
    created_at: string;
  } | null;
  documentos: {
    id: string;
    nombre: string;
    tipo: string;
    created_at: string;
  }[];
}

/**
 * Server Action: Obtener el detalle completo de un expediente para el AT.
 *
 * Carga:
 * - Datos del expediente
 * - Datos del cliente
 * - Datos del inmueble (si existe)
 * - Documentos subidos
 */
export async function obtenerDetalleExpediente(
  expedienteId: string
): Promise<{
  data: DetalleExpedienteAT | null;
  error?: string;
}> {
  try {
    // 1. Obtener expediente
    const expediente = await expedienteRepository.findById(expedienteId);
    if (!expediente) {
      return { data: null, error: "Expediente no encontrado." };
    }

    // 2. Obtener cliente
    let cliente = null;
    try {
      const clienteRow = await clienteRepository.findById(expediente.cliente_id);
      if (clienteRow) {
        cliente = {
          id: clienteRow.id,
          nombre: `${clienteRow.nombre} ${clienteRow.apellidos ?? ""}`.trim(),
          email: clienteRow.email ?? "",
          telefono: clienteRow.telefono ?? null,
          created_at: clienteRow.created_at,
        };
      }
    } catch {
      // Cliente no encontrado — no es bloqueante
    }

    // 3. Obtener inmueble (si existe)
    let inmueble = null;
    if (expediente.inmueble_id) {
      try {
        const inmuebleRow = await inmuebleRepository.findById(expediente.inmueble_id);
        if (inmuebleRow) {
          inmueble = {
            id: inmuebleRow.id,
            direccion: inmuebleRow.direccion,
            referencia_catastral: inmuebleRow.referencia_catastral ?? null,
            tipo: inmuebleRow.tipo ?? null,
            created_at: inmuebleRow.created_at,
          };
        }
      } catch {
        // Inmueble no encontrado — no es bloqueante
      }
    }

    // 4. Obtener documentos (desde Supabase Storage/metadata)
    const supabase = await createClient();
    const { data: docsData, error: docsError } = await supabase
      .from("core.documento")
      .select("id, nombre, tipo, created_at")
      .eq("expediente_id", expedienteId)
      .is("deleted_at", null)
      .order("created_at", { ascending: true });

    const documentos = !docsError && docsData ? docsData : [];
    const docs = documentos.map((d: { id: string; nombre: string; tipo: string; created_at: string }) => ({
      id: d.id,
      nombre: d.nombre,
      tipo: d.tipo,
      created_at: d.created_at,
    }));

    return {
      data: {
        expediente,
        cliente,
        inmueble,
        documentos: docs,
      },
    };
  } catch (error) {
    const msg =
      error instanceof Error ? error.message : "Error desconocido";
    return {
      data: null,
      error: `Error al cargar detalle del expediente: ${msg}`,
    };
  }
}

// ============================================================
// Acciones del AT sobre el expediente
// ============================================================

/**
 * Server Action: Iniciar revisión manual de un expediente.
 * Transición: PteDocumentacion -> RevisionManual
 *
 * El AT toma el expediente para comenzar su análisis.
 */
export async function iniciarRevisionExpediente(
  expedienteId: string,
  userId: string,
  version: number
): Promise<{
  success: boolean;
  error?: string;
  expediente?: ExpedienteRow;
}> {
  try {
    const result = await expedienteService.iniciarRevision(
      expedienteId,
      userId,
      version
    );
    return { success: true, expediente: result.expediente };
  } catch (error) {
    const msg =
      error instanceof Error ? error.message : "Error desconocido";
    return { success: false, error: msg };
  }
}

/**
 * Server Action: Aprobar expediente tras revisión manual.
 * Transición: RevisionManual -> Aprobado
 *
 * El AT finaliza su análisis y aprueba el resultado técnico.
 * Esto genera el Informe Técnico Certilab.
 */
export async function aprobarExpedienteAT(
  expedienteId: string,
  userId: string,
  version: number,
  notas?: string
): Promise<{
  success: boolean;
  error?: string;
  expediente?: ExpedienteRow;
}> {
  try {
    // Actualizar notas si se proporcionan
    if (notas !== undefined) {
      await expedienteService.actualizar(expedienteId, {
        notas,
        updated_by: userId,
        version,
      });

      // Tras actualizar notas, la version ha cambiado — recargar
      const actual = await expedienteRepository.findById(expedienteId);
      if (!actual) {
        return { success: false, error: "Expediente no encontrado tras actualizar notas." };
      }
      version = actual.version;
    }

    const result = await expedienteService.aprobarExpediente(
      expedienteId,
      userId,
      version
    );
    return { success: true, expediente: result.expediente };
  } catch (error) {
    const msg =
      error instanceof Error ? error.message : "Error desconocido";
    return { success: false, error: msg };
  }
}

/**
 * Server Action: Rechazar expediente tras revisión manual.
 * Transición: RevisionManual -> Rechazado -> Devuelto (automática)
 *
 * El AT determina que el certificado no es válido.
 * Automáticamente se marca como Devuelto para que el cliente
 * pueda corregir la documentación y solicitar una nueva revisión.
 *
 * EP-033: Corrección de documentación.
 * Tras rechazar, se transiciona automáticamente a Devuelto
 * porque la máquina de estados lo permite (Rechazado → Devuelto).
 */
export async function rechazarExpedienteAT(
  expedienteId: string,
  userId: string,
  version: number,
  notas?: string
): Promise<{
  success: boolean;
  error?: string;
  expediente?: ExpedienteRow;
}> {
  try {
    // Actualizar notas si se proporcionan
    if (notas !== undefined) {
      await expedienteService.actualizar(expedienteId, {
        notas,
        updated_by: userId,
        version,
      });

      const actual = await expedienteRepository.findById(expedienteId);
      if (!actual) {
        return { success: false, error: "Expediente no encontrado tras actualizar notas." };
      }
      version = actual.version;
    }

    // 1. Rechazar el expediente: RevisionManual → Rechazado
    const result = await expedienteService.rechazarExpediente(
      expedienteId,
      userId,
      version
    );

    // 2. Transición automática a Devuelto: Rechazado → Devuelto
    //    El cliente podrá corregir la documentación y reenviar.
    await expedienteService.cambiarEstado(
      expedienteId,
      "Devuelto",
      userId,
      result.expediente.version
    );

    return { success: true, expediente: result.expediente };
  } catch (error) {
    const msg =
      error instanceof Error ? error.message : "Error desconocido";
    return { success: false, error: msg };
  }
}

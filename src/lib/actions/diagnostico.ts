"use server";

import { expedienteRepository } from "@/lib/core/expediente.repository";
import { expedienteService } from "@/lib/core/expediente.service";
import { createClient } from "@/lib/supabase/server";
import type { ExpedienteRow } from "@/types/core/expediente";
import type {
  DiagnosticoCompleto,
  EstadoDiagnostico,
  ProblemaDiagnostico,
  ActuacionDiagnostico,
  VeredictoGlobal,
  NivelConfianza,
  ValidacionDiagnostico,
} from "@/types/core/diagnostico";
import { v4 as uuid } from "uuid";

// ============================================================
// Validación del diagnóstico
// ============================================================

function validarDiagnostico(d: Partial<DiagnosticoCompleto>): ValidacionDiagnostico {
  const errores: string[] = [];

  // Veredicto obligatorio
  if (!d.veredicto) errores.push("Debe indicar el veredicto global del estado energético.");

  // Nivel de confianza obligatorio
  if (!d.nivel_confianza) errores.push("Debe indicar el nivel de confianza global.");

  // Resumen obligatorio
  if (!d.resumen || d.resumen.trim().length < 10) {
    errores.push("El resumen ejecutivo debe tener al menos 10 caracteres.");
  }

  // Problemas: al menos 1 si hay actuaciones
  if (!d.problemas || d.problemas.length === 0) {
    errores.push("Debe identificar al menos un problema.");
  } else {
    d.problemas.forEach((p, i) => {
      if (!p.nombre?.trim()) errores.push(`Problema #${i + 1}: el nombre es obligatorio.`);
      if (!p.descripcion?.trim()) errores.push(`Problema #${i + 1}: la descripción es obligatoria.`);
      if (!p.por_que_importa?.trim()) errores.push(`Problema #${i + 1}: debe explicar por qué es importante.`);
      if (!p.categoria) errores.push(`Problema #${i + 1}: debe indicar la categoría.`);
      if (!p.nivel_confianza) errores.push(`Problema #${i + 1}: debe indicar el nivel de confianza.`);
    });
  }

  // Actuaciones: al menos 1 si hay problemas
  if (!d.actuaciones || d.actuaciones.length === 0) {
    errores.push("Debe proponer al menos una actuación.");
  } else {
    d.actuaciones.forEach((a, i) => {
      if (!a.nombre?.trim()) errores.push(`Actuación #${i + 1}: el nombre es obligatorio.`);
      if (a.inversion_estimada == null || a.inversion_estimada < 0)
        errores.push(`Actuación #${i + 1}: la inversión estimada debe ser un número positivo.`);
      if (a.ahorro_anual == null || a.ahorro_anual < 0)
        errores.push(`Actuación #${i + 1}: el ahorro anual debe ser un número positivo.`);
      if (!a.veredicto) errores.push(`Actuación #${i + 1}: debe indicar el veredicto de retorno.`);
      if (!a.descripcion?.trim()) errores.push(`Actuación #${i + 1}: la descripción es obligatoria.`);
    });
  }

  // Económico: coste_actual es OPCIONAL si el cliente no dispone del dato
  // Solo validar si se ha proporcionado un valor
  if (d.coste_actual != null && d.coste_actual < 0) {
    errores.push("El coste actual debe ser un número positivo.");
  }
  if (d.coste_tras_mejoras == null || d.coste_tras_mejoras < 0) errores.push("El coste tras mejoras debe ser un número positivo.");
  if (d.ahorro_total == null || d.ahorro_total < 0) errores.push("El ahorro total debe ser un número positivo.");

  return { valido: errores.length === 0, errores };
}

// ============================================================
// Obtener estado del diagnóstico
// ============================================================

export interface DiagnosticoState {
  expedienteId: string;
  estado: EstadoDiagnostico;
  version: number;
  diagnostico: DiagnosticoCompleto | null;
}

/**
 * Server Action: Obtener el estado actual del diagnóstico de un expediente.
 */
export async function obtenerEstadoDiagnostico(
  expedienteId: string
): Promise<{ data?: DiagnosticoState; error?: string }> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("core.expediente")
      .select("id, estado_diagnostico, diagnostico_version, diagnostico")
      .eq("id", expedienteId)
      .single();

    if (error) {
      return { error: `Error al obtener diagnóstico: ${error.message}` };
    }

    return {
      data: {
        expedienteId: data.id,
        estado: (data.estado_diagnostico as EstadoDiagnostico) ?? "SinDiagnostico",
        version: data.diagnostico_version ?? 1,
        diagnostico: data.diagnostico as DiagnosticoCompleto | null,
      },
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    return { error: `Error al obtener diagnóstico: ${msg}` };
  }
}

// ============================================================
// Iniciar diagnóstico (SinDiagnostico → Borrador)
// ============================================================

/**
 * Server Action: Iniciar un nuevo diagnóstico.
 * Transición: SinDiagnostico → Borrador
 * Crea un DiagnosticoCompleto vacío con valores por defecto.
 */
export async function iniciarDiagnostico(
  expedienteId: string,
  userId: string,
  version: number
): Promise<{
  success: boolean;
  error?: string;
  state?: DiagnosticoState;
}> {
  try {
    // Verificar estado actual
    const current = await obtenerEstadoDiagnostico(expedienteId);
    if (current.error) return { success: false, error: current.error };
    if (!current.data) return { success: false, error: "Expediente no encontrado." };
    if (current.data.estado !== "SinDiagnostico") {
      return { success: false, error: "El diagnóstico ya ha sido iniciado." };
    }

    // Crear diagnóstico vacío
    const diagnosticoVacio: DiagnosticoCompleto = {
      veredicto: "Regular",
      nivel_confianza: "Medio",
      resumen: "",
      problemas: [],
      actuaciones: [],
      ahorro_total: 0,
      coste_actual: 0,
      coste_tras_mejoras: 0,
      coste_inaccion_1a: 0,
      coste_inaccion_5a: 0,
      coste_inaccion_10a: 0,
      impacto_reventa: "",
      riesgo_regulatorio: "",
      observaciones_at: "",
    };

    const supabase = await createClient();
    const { error } = await supabase
      .from("core.expediente")
      .update({
        diagnostico: JSON.parse(JSON.stringify(diagnosticoVacio)),
        diagnostico_version: version + 1,
        estado_diagnostico: "Borrador",
        updated_by: userId,
        version: version,
      })
      .eq("id", expedienteId)
      .eq("version", version);

    if (error) {
      return { success: false, error: `Error al iniciar diagnóstico: ${error.message}` };
    }

    return {
      success: true,
      state: {
        expedienteId,
        estado: "Borrador",
        version: version + 1,
        diagnostico: diagnosticoVacio,
      },
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    return { success: false, error: `Error al iniciar diagnóstico: ${msg}` };
  }
}

// ============================================================
// Guardar borrador (Borrador → Borrador)
// ============================================================

/**
 * Server Action: Guardar el diagnóstico como borrador.
 * No validación completa, solo guarda el progreso.
 * Mantiene el estado como Borrador.
 */
export async function guardarBorradorDiagnostico(
  expedienteId: string,
  userId: string,
  version: number,
  diagnostico: DiagnosticoCompleto
): Promise<{
  success: boolean;
  error?: string;
  newVersion?: number;
}> {
  try {
    const supabase = await createClient();
    const newVersion = version + 1;

    const { error } = await supabase
      .from("core.expediente")
      .update({
        diagnostico: JSON.parse(JSON.stringify(diagnostico)) as Record<string, unknown>,
        diagnostico_version: newVersion,
        updated_by: userId,
      })
      .eq("id", expedienteId);

    if (error) {
      return { success: false, error: `Error al guardar borrador: ${error.message}` };
    }

    return { success: true, newVersion };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    return { success: false, error: `Error al guardar borrador: ${msg}` };
  }
}

// ============================================================
// Completar diagnóstico (Borrador → Completado)
// ============================================================

/**
 * Server Action: Completar el diagnóstico.
 * Transición: Borrador → Completado
 * Valida el diagnóstico completo antes de guardar.
 */
export async function completarDiagnostico(
  expedienteId: string,
  userId: string,
  version: number,
  diagnostico: DiagnosticoCompleto
): Promise<{
  success: boolean;
  error?: string;
  errores_validacion?: string[];
  newVersion?: number;
}> {
  try {
    // Validar
    const validacion = validarDiagnostico(diagnostico);
    if (!validacion.valido) {
      return {
        success: false,
        error: "El diagnóstico tiene errores de validación.",
        errores_validacion: validacion.errores,
      };
    }

    const supabase = await createClient();
    const newVersion = version + 1;

    const { error } = await supabase
      .from("core.expediente")
      .update({
        diagnostico: JSON.parse(JSON.stringify(diagnostico)) as Record<string, unknown>,
        diagnostico_version: newVersion,
        estado_diagnostico: "Completado",
        updated_by: userId,
      })
      .eq("id", expedienteId);

    if (error) {
      return { success: false, error: `Error al completar diagnóstico: ${error.message}` };
    }

    return { success: true, newVersion };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    return { success: false, error: `Error al completar diagnóstico: ${msg}` };
  }
}

// ============================================================
// Verificar si el diagnóstico está completado (para blocking)
// ============================================================

/**
 * Server Action: Verificar si el expediente tiene diagnóstico completado.
 * Útil para bloquear la aprobación si no está completado.
 */
export async function verificarDiagnosticoCompletado(
  expedienteId: string
): Promise<{
  completado: boolean;
  error?: string;
}> {
  try {
    const state = await obtenerEstadoDiagnostico(expedienteId);
    if (state.error) return { completado: false, error: state.error };
    return { completado: state.data?.estado === "Completado" };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    return { completado: false, error: msg };
  }
}
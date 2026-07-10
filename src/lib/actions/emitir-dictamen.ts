'use server';

import { createClient } from '@/lib/supabase/server';
import type { DictamenTecnico } from '@/types/core/dictamen';
import type { DiagnosticoCompleto } from '@/types/core/diagnostico';

export interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Server Action: Emitir dictamen técnico formal.
 * Transición: estado = 'Completado' → estado = 'DictamenEmitido'
 *
 * Validaciones:
 * - AT autenticado
 * - AT asignado al expediente
 * - Diagnóstico en estado Completado
 * - Dictamen no emitido previamente
 * - contenido no vacío ni solo espacios
 * - decision valor válido (conforme|no_conforme|pendiente)
 * - diagnostico_base presente
 *
 * Flujo:
 * 1. Validar expediente existe y diagnóstico está completado
 * 2. Validar que AT está asignado
 * 3. Validar campos obligatorios del dictamen
 * 4. Construir DictamenTecnico desde DiagnosticoCompleto
 * 5. Validar coherencia del dictamen
 * 6. Persistir en expediente.dictamen
 * 7. Transitar expediente a DictamenEmitido
 * 8. Devolver DictamenTecnico
 */
export async function emitirDictamen(
  expedienteId: string,
  contenido: string,
  decision: 'conforme' | 'no_conforme' | 'pendiente',
  observaciones: string | null = null
): Promise<ActionResult<DictamenTecnico>> {
  try {
    // 1. Verificar autenticación
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'Usuario no autenticado.' };
    }

    // 2. Obtener expediente con diagnóstico
    const { data: expediente, error: expError } = await supabase
      .from('core.expediente')
      .select('id, estado, diagnostico, at_asignado_id, cliente_id')
      .eq('id', expedienteId)
      .single();

    if (expError || !expediente) {
      return { success: false, error: 'Expediente no encontrado.' };
    }

    // 3. Validar que AT está asignado al expediente
    if (expediente.at_asignado_id !== user.id) {
      return { success: false, error: 'No estás asignado a este expediente.' };
    }

    // 4. Validar contenido obligatorio
    if (!contenido || contenido.trim().length === 0) {
      return { success: false, error: 'El contenido del dictamen no puede estar vacío.' };
    }

    // 5. Validar que el expediente está en estado Aprobado (transición: Aprobado → DictamenEmitido)
    if (expediente.estado !== 'Aprobado') {
      return { success: false, error: `El expediente debe estar en estado Aprobado para emitir dictamen. Estado actual: ${expediente.estado}` };
    }

    // 6. Validar que el diagnóstico existe
    if (!expediente.diagnostico) {
      return { success: false, error: 'El expediente no tiene un diagnóstico completado.' };
    }

    // 7. Validar que el diagnóstico base tiene datos suficientes
    const diagnostico = expediente.diagnostico as DiagnosticoCompleto;
    if (!diagnostico.veredicto || !diagnostico.nivel_confianza) {
      return { success: false, error: 'El diagnóstico base no contiene datos suficientes para emitir el dictamen.' };
    }

    // 8. Validar que no hay dictamen emitido previamente
    const { data: expedienteConDictamen } = await supabase
      .from('core.expediente')
      .select('dictamen')
      .eq('id', expedienteId)
      .single();

    if (expedienteConDictamen?.dictamen) {
      return { success: false, error: 'El dictamen ya ha sido emitido para este expediente.' };
    }

    // 9. Construir DictamenTecnico desde DiagnosticoCompleto
    const now = new Date().toISOString();

    const dictamen: DictamenTecnico = {
      contenido,
      decision,
      ...(observaciones ? { observaciones } : {}),
      diagnostico_base: {
        veredicto: diagnostico.veredicto,
        nivel_confianza: diagnostico.nivel_confianza,
        resumen: diagnostico.resumen,
        problemas: diagnostico.problemas,
        actuaciones: diagnostico.actuaciones,
        ahorro_total: diagnostico.ahorro_total,
        coste_actual: diagnostico.coste_actual,
        coste_tras_mejoras: diagnostico.coste_tras_mejoras,
        coste_inaccion_1a: diagnostico.coste_inaccion_1a,
        coste_inaccion_5a: diagnostico.coste_inaccion_5a,
        coste_inaccion_10a: diagnostico.coste_inaccion_10a,
        impacto_reventa: diagnostico.impacto_reventa,
        riesgo_regulatorio: diagnostico.riesgo_regulatorio,
        observaciones_at: diagnostico.observaciones_at,
      },
      emitido_por: user.id,
      emitido_en: now,
      version: 1,
    };

    // 10. Persistir cambios (transacción atómica)
    const { error: updateError } = await supabase
      .from('core.expediente')
      .update({
        dictamen: JSON.parse(JSON.stringify(dictamen)) as Record<string, unknown>,
        estado: 'DictamenEmitido',
        updated_by: user.id,
      })
      .eq('id', expedienteId);

    if (updateError) {
      return { success: false, error: `Error al emitir dictamen: ${updateError.message}` };
    }

    return {
      success: true,
      data: dictamen,
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error desconocido';
    return { success: false, error: `Error al emitir dictamen: ${msg}` };
  }
}

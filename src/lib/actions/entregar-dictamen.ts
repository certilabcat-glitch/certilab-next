'use server';

import { createClient } from '@/lib/supabase/server';
import type { DictamenTecnico } from '@/types/core/dictamen';

export interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Server Action: Entregar dictamen al cliente.
 * Transición: estado = 'DictamenEmitido' → estado = 'DictamenEntregado'
 *
 * Validaciones:
 * - AT autenticado
 * - Dictamen en estado Emitido (no Entregado previamente)
 *
 * Flujo:
 * 1. Validar expediente existe y tiene dictamen emitido
 * 2. Validar que no esté ya entregado
 * 3. Marcar dictamen como entregado (fecha, cliente)
 * 4. Actualizar estado del expediente a DictamenEntregado
 * 5. Devolver confirmación
 */
export async function entregarDictamen(
  expedienteId: string
): Promise<ActionResult<{ entregado: boolean; entregado_en: string }>> {
  try {
    // 1. Verificar autenticación
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'Usuario no autenticado.' };
    }

    // 2. Obtener expediente con dictamen
    const { data: expediente, error: expError } = await supabase
      .from('core.expediente')
      .select('id, estado, dictamen, cliente_id, at_asignado_id')
      .eq('id', expedienteId)
      .single();

    if (expError || !expediente) {
      return { success: false, error: 'Expediente no encontrado.' };
    }

    // 3. Validar que el usuario sea el AT asignado al expediente
    if (expediente.at_asignado_id !== user.id) {
      return { success: false, error: 'No tienes autorización para entregar este dictamen. Solo el AT asignado puede entregarlo.' };
    }

    // 4. Validar que el dictamen esté emitido
    if (!expediente.dictamen) {
      return { success: false, error: 'El expediente no tiene un dictamen emitido. Debe emitir el dictamen primero.' };
    }

    if (expediente.estado === 'DictamenEntregado') {
      return { success: false, error: 'El dictamen ya ha sido entregado al cliente.' };
    }

    if (expediente.estado !== 'DictamenEmitido') {
      return { success: false, error: `El dictamen no está en estado Emitido. Estado actual: ${expediente.estado}` };
    }

    // 4. Obtener el cliente_id del expediente
    const clienteId = expediente.cliente_id;
    if (!clienteId) {
      return { success: false, error: 'El expediente no tiene un cliente asociado.' };
    }

    // 5. Actualizar dictamen con datos de entrega
    const now = new Date().toISOString();
    const dictamenActual = expediente.dictamen as DictamenTecnico;

    const dictamenActualizado: DictamenTecnico = {
      ...dictamenActual,
      entregado_a: clienteId,
      entregado_en: now,
    };

    // 6. Persistir cambios (transacción atómica)
    const { error: updateError } = await supabase
      .from('core.expediente')
      .update({
        dictamen: JSON.parse(JSON.stringify(dictamenActualizado)) as Record<string, unknown>,
        estado: 'DictamenEntregado',
        updated_by: user.id,
      })
      .eq('id', expedienteId);

    if (updateError) {
      return { success: false, error: `Error al entregar dictamen: ${updateError.message}` };
    }

    return {
      success: true,
      data: {
        entregado: true,
        entregado_en: now,
      },
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error desconocido';
    return { success: false, error: `Error al entregar dictamen: ${msg}` };
  }
}

'use server';

import { createClient } from '@/lib/supabase/server';
import type { DictamenTecnico } from '@/types/core/dictamen';

export interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Server Action: Obtener dictamen del expediente.
 *
 * Comportamiento:
 * - AT ve dictamen inmediatamente tras emisión (estado = DictamenEmitido)
 * - Cliente ve dictamen solo si estado = DictamenEntregado (RLS)
 *
 * Validaciones:
 * - Usuario autenticado
 * - Acceso autorizado (AT asignado o cliente propietario)
 */
export async function obtenerDictamen(
  expedienteId: string
): Promise<ActionResult<DictamenTecnico | null>> {
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
      .select('id, estado, dictamen, at_asignado_id, cliente_id')
      .eq('id', expedienteId)
      .single();

    if (expError || !expediente) {
      return { success: false, error: 'Expediente no encontrado.' };
    }

    // 3. Validar acceso
    // AT asignado puede ver el dictamen en cualquier estado (Emitido o Entregado)
    // Cliente solo puede ver si está entregado (RLS lo valida)
    const esAT = expediente.at_asignado_id === user.id;
    const esCliente = expediente.cliente_id === user.id;

    if (!esAT && !esCliente) {
      return { success: false, error: 'No tienes acceso a este expediente.' };
    }

    // 4. Si es cliente, validar que el dictamen esté entregado
    if (esCliente && expediente.estado !== 'DictamenEntregado') {
      return { success: false, error: 'El dictamen aún no ha sido entregado.' };
    }

    // 5. Devolver dictamen (o null si no existe)
    return {
      success: true,
      data: expediente.dictamen as DictamenTecnico | null,
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error desconocido';
    return { success: false, error: `Error al obtener dictamen: ${msg}` };
  }
}

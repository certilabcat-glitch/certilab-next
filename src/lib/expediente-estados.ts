/**
 * MÁQUINA DE ESTADOS PARA EXPEDIENTES
 * Define transiciones válidas entre estados (13 estados totales)
 */

import { EstadoExpediente } from "@/types/expediente";

/**
 * Mapa de transiciones válidas
 * Cada estado puede transicionar a los estados listados
 */
export const transicionesValidas: Record<EstadoExpediente, EstadoExpediente[]> =
  {
    [EstadoExpediente.PAGO_PENDIENTE]: [
      EstadoExpediente.PAGO_RECIBIDO,
      EstadoExpediente.CANCELADO,
    ],

    [EstadoExpediente.PAGO_RECIBIDO]: [
      EstadoExpediente.EXPEDIENTE_CREADO,
      EstadoExpediente.CANCELADO,
    ],

    [EstadoExpediente.EXPEDIENTE_CREADO]: [
      EstadoExpediente.ESPERANDO_INFORMACION,
      EstadoExpediente.CANCELADO,
    ],

    [EstadoExpediente.ESPERANDO_INFORMACION]: [
      EstadoExpediente.PENDIENTE_DOCUMENTACION,
      EstadoExpediente.PENDIENTE_CLIENTE,
      EstadoExpediente.INFORMACION_RECIBIDA,
      EstadoExpediente.CANCELADO,
    ],

    [EstadoExpediente.PENDIENTE_DOCUMENTACION]: [
      EstadoExpediente.INFORMACION_RECIBIDA,
      EstadoExpediente.CANCELADO,
    ],

    [EstadoExpediente.PENDIENTE_CLIENTE]: [
      EstadoExpediente.INFORMACION_RECIBIDA,
      EstadoExpediente.CANCELADO,
    ],

    [EstadoExpediente.INFORMACION_RECIBIDA]: [
      EstadoExpediente.EN_REVISION,
      EstadoExpediente.RECHAZADO,
      EstadoExpediente.CANCELADO,
    ],

    [EstadoExpediente.EN_REVISION]: [
      EstadoExpediente.INFORME_ENVIADO,
      EstadoExpediente.ESPERANDO_INFORMACION,
      EstadoExpediente.RECHAZADO,
      EstadoExpediente.CANCELADO,
    ],

    [EstadoExpediente.INFORME_ENVIADO]: [
      EstadoExpediente.CERRADO,
      EstadoExpediente.CANCELADO,
    ],

    [EstadoExpediente.CERRADO]: [],
    [EstadoExpediente.RECHAZADO]: [EstadoExpediente.CANCELADO],
    [EstadoExpediente.CANCELADO]: [],
    [EstadoExpediente.BLOQUEADO]: [EstadoExpediente.EXPEDIENTE_CREADO],
  };

/**
 * Validar si una transición es permitida
 */
export function esTransicionValida(
  estadoActual: EstadoExpediente,
  estadoNuevo: EstadoExpediente
): boolean {
  const transiciones = transicionesValidas[estadoActual];
  return transiciones.includes(estadoNuevo);
}

/**
 * Obtener estados permitidos desde un estado actual
 */
export function obtenerEstadosPermitidos(
  estadoActual: EstadoExpediente
): EstadoExpediente[] {
  return transicionesValidas[estadoActual];
}

/**
 * Etiquetas legibles para estados
 */
export const etiquetasEstado: Record<EstadoExpediente, string> = {
  [EstadoExpediente.PAGO_PENDIENTE]: "Pago pendiente",
  [EstadoExpediente.PAGO_RECIBIDO]: "Pago recibido",
  [EstadoExpediente.EXPEDIENTE_CREADO]: "Expediente creado",
  [EstadoExpediente.ESPERANDO_INFORMACION]: "Esperando información",
  [EstadoExpediente.PENDIENTE_DOCUMENTACION]: "Pendiente documentación",
  [EstadoExpediente.PENDIENTE_CLIENTE]: "Pendiente cliente",
  [EstadoExpediente.INFORMACION_RECIBIDA]: "Información recibida",
  [EstadoExpediente.EN_REVISION]: "En revisión",
  [EstadoExpediente.INFORME_ENVIADO]: "Informe enviado",
  [EstadoExpediente.CERRADO]: "Cerrado",
  [EstadoExpediente.RECHAZADO]: "Rechazado",
  [EstadoExpediente.CANCELADO]: "Cancelado",
  [EstadoExpediente.BLOQUEADO]: "Bloqueado",
};

/**
 * Colores para badges de estado
 */
export const coloresEstado: Record<EstadoExpediente, string> = {
  [EstadoExpediente.PAGO_PENDIENTE]: "bg-orange-100 text-orange-800",
  [EstadoExpediente.PAGO_RECIBIDO]: "bg-blue-100 text-blue-800",
  [EstadoExpediente.EXPEDIENTE_CREADO]: "bg-blue-100 text-blue-800",
  [EstadoExpediente.ESPERANDO_INFORMACION]: "bg-yellow-100 text-yellow-800",
  [EstadoExpediente.PENDIENTE_DOCUMENTACION]: "bg-yellow-100 text-yellow-800",
  [EstadoExpediente.PENDIENTE_CLIENTE]: "bg-yellow-100 text-yellow-800",
  [EstadoExpediente.INFORMACION_RECIBIDA]: "bg-yellow-100 text-yellow-800",
  [EstadoExpediente.EN_REVISION]: "bg-purple-100 text-purple-800",
  [EstadoExpediente.INFORME_ENVIADO]: "bg-green-100 text-green-800",
  [EstadoExpediente.CERRADO]: "bg-gray-100 text-gray-800",
  [EstadoExpediente.RECHAZADO]: "bg-red-100 text-red-800",
  [EstadoExpediente.CANCELADO]: "bg-red-100 text-red-800",
  [EstadoExpediente.BLOQUEADO]: "bg-red-100 text-red-800",
};

/**
 * Calcular progreso basado en estado
 */
export function calcularProgresoDesdeEstado(
  estado: EstadoExpediente
): number {
  const progresos: Record<EstadoExpediente, number> = {
    [EstadoExpediente.PAGO_PENDIENTE]: 5,
    [EstadoExpediente.PAGO_RECIBIDO]: 10,
    [EstadoExpediente.EXPEDIENTE_CREADO]: 20,
    [EstadoExpediente.ESPERANDO_INFORMACION]: 30,
    [EstadoExpediente.PENDIENTE_DOCUMENTACION]: 35,
    [EstadoExpediente.PENDIENTE_CLIENTE]: 35,
    [EstadoExpediente.INFORMACION_RECIBIDA]: 50,
    [EstadoExpediente.EN_REVISION]: 75,
    [EstadoExpediente.INFORME_ENVIADO]: 90,
    [EstadoExpediente.CERRADO]: 100,
    [EstadoExpediente.RECHAZADO]: 0,
    [EstadoExpediente.CANCELADO]: 0,
    [EstadoExpediente.BLOQUEADO]: 0,
  };

  return progresos[estado];
}

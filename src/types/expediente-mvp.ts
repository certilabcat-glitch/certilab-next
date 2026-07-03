/**
 * TIPOS MVP PARA EXPEDIENTES
 * Versión simplificada para la primera historia de usuario
 * "Solicitar Segunda Opinión"
 */

export type EstadoExpedienteMvp =
  | 'pendiente'
  | 'pago_pendiente'
  | 'pago_recibido'
  | 'expediente_creado'
  | 'en_revision'
  | 'informe_enviado'
  | 'cerrado'
  | 'rechazado'
  | 'cancelado';

export interface ExpedienteRow {
  id: string;
  numero_expediente: string;
  cliente_id: string;
  estado: EstadoExpedienteMvp;
  servicio: string;
  titulo: string | null;
  notas: string | null;
  created_at: string;
  updated_at: string;
}

export interface CrearExpedienteInput {
  titulo?: string;
  notas?: string;
}
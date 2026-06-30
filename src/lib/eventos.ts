/**
 * SISTEMA DE EVENTOS
 * Eventos que se generan en el sistema (nunca se modifican, solo se agregan)
 */

/**
 * Tipos de eventos
 * IMPORTANTE: Nunca modificar eventos existentes, solo agregar nuevos
 */
export enum TipoEvento {
  // Expediente
  EXPEDIENTE_CREADO = "expediente:creado",
  EXPEDIENTE_ESTADO_CAMBIADO = "expediente:estado-cambiado",
  EXPEDIENTE_CANCELADO = "expediente:cancelado",
  EXPEDIENTE_RECHAZADO = "expediente:rechazado",

  // Documento
  DOCUMENTO_SUBIDO = "documento:subido",
  DOCUMENTO_ELIMINADO = "documento:eliminado",

  // Pago
  PAGO_RECIBIDO = "pago:recibido",
  PAGO_FALLIDO = "pago:fallido",
  PAGO_REEMBOLSADO = "pago:reembolsado",

  // Usuario
  USUARIO_ASIGNADO = "usuario:asignado",
  USUARIO_DESASIGNADO = "usuario:desasignado",

  // Informe
  INFORME_GENERADO = "informe:generado",
  INFORME_ENVIADO = "informe:enviado",
}

/**
 * ENTIDAD: Evento
 * Registro de eventos del sistema
 */
export interface Evento {
  id: string;
  tipo: TipoEvento;
  expedienteId: string;
  datos: Record<string, unknown>;
  timestamp: Date;
  usuarioId: string;
  ipAddress?: string;
}

/**
 * Event Bus
 * Publicador y suscriptor de eventos
 */
export class EventBus {
  private suscriptores: Map<
    TipoEvento,
    Array<(evento: Evento) => Promise<void>>
  > = new Map();

  /**
   * Publicar un evento
   */
  async publicar(evento: Evento): Promise<void> {
    const handlers = this.suscriptores.get(evento.tipo) || [];

    // Ejecutar todos los handlers en paralelo
    await Promise.all(handlers.map((handler) => handler(evento)));
  }

  /**
   * Suscribirse a un tipo de evento
   */
  suscribir(
    tipo: TipoEvento,
    handler: (evento: Evento) => Promise<void>
  ): void {
    if (!this.suscriptores.has(tipo)) {
      this.suscriptores.set(tipo, []);
    }

    this.suscriptores.get(tipo)!.push(handler);
  }

  /**
   * Desuscribirse de un tipo de evento
   */
  desuscribir(
    tipo: TipoEvento,
    handler: (evento: Evento) => Promise<void>
  ): void {
    const handlers = this.suscriptores.get(tipo);
    if (!handlers) return;

    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  }
}

// Instancia global del event bus
export const eventBus = new EventBus();

/**
 * Helpers para crear eventos
 */

export function crearEventoExpedienteCreado(
  expedienteId: string,
  usuarioId: string,
  datos: Record<string, unknown>,
  ipAddress?: string
): Evento {
  return {
    id: crypto.randomUUID(),
    tipo: TipoEvento.EXPEDIENTE_CREADO,
    expedienteId,
    datos,
    timestamp: new Date(),
    usuarioId,
    ipAddress,
  };
}

export function crearEventoEstadoCambiado(
  expedienteId: string,
  usuarioId: string,
  estadoAnterior: string,
  estadoNuevo: string,
  ipAddress?: string
): Evento {
  return {
    id: crypto.randomUUID(),
    tipo: TipoEvento.EXPEDIENTE_ESTADO_CAMBIADO,
    expedienteId,
    datos: { estadoAnterior, estadoNuevo },
    timestamp: new Date(),
    usuarioId,
    ipAddress,
  };
}

export function crearEventoDocumentoSubido(
  expedienteId: string,
  usuarioId: string,
  documentoId: string,
  nombreDocumento: string,
  ipAddress?: string
): Evento {
  return {
    id: crypto.randomUUID(),
    tipo: TipoEvento.DOCUMENTO_SUBIDO,
    expedienteId,
    datos: { documentoId, nombreDocumento },
    timestamp: new Date(),
    usuarioId,
    ipAddress,
  };
}

export function crearEventoPagoRecibido(
  expedienteId: string,
  usuarioId: string,
  pagoId: string,
  importe: number,
  ipAddress?: string
): Evento {
  return {
    id: crypto.randomUUID(),
    tipo: TipoEvento.PAGO_RECIBIDO,
    expedienteId,
    datos: { pagoId, importe },
    timestamp: new Date(),
    usuarioId,
    ipAddress,
  };
}

export function crearEventoUsuarioAsignado(
  expedienteId: string,
  usuarioId: string,
  tecnicoAsignadoId: string,
  ipAddress?: string
): Evento {
  return {
    id: crypto.randomUUID(),
    tipo: TipoEvento.USUARIO_ASIGNADO,
    expedienteId,
    datos: { tecnicoAsignadoId },
    timestamp: new Date(),
    usuarioId,
    ipAddress,
  };
}

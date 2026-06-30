/**
 * TIPOS PARA PAGOS
 * Entidad independiente para rastrear transacciones
 */

// Estados del pago
export enum EstadoPago {
  PENDIENTE = "pendiente",
  PROCESANDO = "procesando",
  COMPLETADO = "completado",
  FALLIDO = "fallido",
  REEMBOLSADO = "reembolsado",
  CANCELADO = "cancelado",
}

// Métodos de pago
export enum MetodoPago {
  TARJETA = "tarjeta",
  TRANSFERENCIA = "transferencia",
  PAYPAL = "paypal",
  OTRO = "otro",
}

// Proveedores de pago
export enum ProveedorPago {
  MYPOS = "mypos",
  STRIPE = "stripe",
  PAYPAL = "paypal",
  MANUAL = "manual",
}

/**
 * ENTIDAD: Pago
 * Rastreo de transacciones y pagos
 */
export interface Pago {
  // Identificación
  id: string;

  // Relaciones
  expedienteId: string;
  clienteId: string;
  servicioId: string;

  // Información de pago
  importe: number; // cents
  moneda: string; // "EUR"

  // Estado
  estado: EstadoPago;

  // Método y proveedor
  metodo: MetodoPago;
  proveedor: ProveedorPago;

  // Referencias
  referenciaExterna: string; // ID de MyPOS, Stripe, etc.

  // Factura
  facturaUrl?: string;
  numeroFactura?: string;

  // Reembolso
  reembolsoId?: string;
  montoReembolsado?: number;

  // Fechas
  fechaCreacion: Date;
  fechaPago?: Date;

  // Auditoría
  creadoPor: string;
  actualizadoPor: string;
  deletedAt?: Date; // Soft delete
}

/**
 * DTOs para APIs
 */

// Request para crear pago
export interface CrearPagoRequest {
  expedienteId: string;
  clienteId: string;
  servicioId: string;
  importe: number;
  metodo: MetodoPago;
  proveedor: ProveedorPago;
}

// Response para pago
export interface PagoResponse {
  id: string;
  expedienteId: string;
  importe: number;
  moneda: string;
  estado: EstadoPago;
  metodo: MetodoPago;
  proveedor: ProveedorPago;
  fechaCreacion: Date;
  fechaPago?: Date;
}

// Query params para listar pagos
export interface ListarPagosQuery {
  expedienteId?: string;
  clienteId?: string;
  estado?: EstadoPago;
  proveedor?: ProveedorPago;
  page?: number;
  limit?: number;
  desde?: Date;
  hasta?: Date;
}

// Response para listar pagos
export interface ListarPagosResponse {
  data: PagoResponse[];
  total: number;
  pagina: number;
  totalPaginas: number;
  totalImporte: number; // suma de todos los pagos
}

// Request para reembolsar
export interface ReembolsarPagoRequest {
  pagoId: string;
  monto: number;
  razon: string;
}

// Webhook de MyPOS
export interface MyPOSWebhookPayload {
  id: string;
  status: "pending" | "completed" | "failed";
  amount: number;
  currency: string;
  clienteId: string;
  servicioId: string;
  timestamp: number;
  signature: string;
}

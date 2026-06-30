/**
 * INTERFACES PARA INTEGRACIONES FUTURAS
 * Puntos de integración con sistemas externos
 */

/**
 * INTEGRACIÓN: MyPOS
 * Sistema de pagos
 */
export interface MyPOSConfig {
  apiKey: string;
  apiSecret: string;
  webhookUrl: string;
}

export interface MyPOSPaymentEvent {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  clienteId: string;
  servicioId: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

/**
 * INTEGRACIÓN: n8n
 * Automatización de workflows
 */
export interface N8nConfig {
  webhookUrl: string;
  apiKey: string;
}

export interface N8nWorkflowTrigger {
  tipo:
    | "cambio_estado"
    | "expediente_creado"
    | "informe_enviado"
    | "expediente_vencido";
  expedienteId: string;
  datos?: Record<string, unknown>;
}

/**
 * INTEGRACIÓN: Supabase
 * Base de datos y autenticación
 */
export interface SupabaseConfig {
  projectUrl: string;
  anonKey: string;
  serviceRoleKey: string;
}

export interface SupabaseAuthUser {
  id: string;
  email: string;
  rol: "cliente" | "tecnico" | "admin";
  metadata?: Record<string, unknown>;
}

/**
 * INTEGRACIÓN: Observatorio
 * Datos de eficiencia energética
 */
export interface ObservatorioConfig {
  apiUrl: string;
  apiKey: string;
}

export interface ObservatorioData {
  inmuebleId: string;
  certificadoEnergeticoId?: string;
  calificacion?: string;
  consumoAnual?: number;
  emisionesAnual?: number;
  datos?: Record<string, unknown>;
}

/**
 * INTEGRACIÓN: IA
 * Análisis automático y sugerencias
 */
export interface IAConfig {
  provider: "openai" | "anthropic" | "custom";
  apiKey: string;
  model?: string;
}

export interface IAAnalysisRequest {
  expedienteId: string;
  tipo: "documentacion" | "expediente" | "sugerencia_estado";
  contenido: string;
}

export interface IAAnalysisResponse {
  resultado: string;
  confianza: number; // 0-1
  sugerencias?: string[];
  metadata?: Record<string, unknown>;
}

/**
 * INTERFAZ GENÉRICA PARA INTEGRACIONES
 */
export interface IntegracionBase {
  nombre: string;
  activa: boolean;
  configuracion: Record<string, unknown>;
  ultimaSincronizacion?: Date;
  erroresUltimos?: string[];
}

/**
 * REGISTRO DE INTEGRACIONES
 */
export interface RegistroIntegraciones {
  mypos?: MyPOSConfig;
  n8n?: N8nConfig;
  supabase?: SupabaseConfig;
  observatorio?: ObservatorioConfig;
  ia?: IAConfig;
}

/**
 * EVENTOS PARA INTEGRACIÓN
 */
export interface EventoIntegracion {
  id: string;
  tipo: string;
  expedienteId: string;
  datos: Record<string, unknown>;
  timestamp: Date;
  procesado: boolean;
  intentos: number;
  ultimoError?: string;
}

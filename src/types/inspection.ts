/**
 * PITR™ — PROTOCOLO DE INSPECCIÓN TÉCNICA REMOTA
 * Motor de inspección reutilizable y completamente configurable
 *
 * Versión: 1.0
 * Fecha: 30/06/2026
 * Responsable: Arquitectura Técnica Certilab
 */

// ──────────────────────────────────────────────
// TIPOS DE PREGUNTA
// ──────────────────────────────────────────────

export enum QuestionType {
  TEXTO = "texto",
  TEXTAREA = "textarea",
  SELECT = "select",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  FECHA = "fecha",
  EMAIL = "email",
  TELEFONO = "telefono",
  NUMERO = "numero",
  FOTOGRAFIA = "fotografia",
  PDF = "pdf",
  ARCHIVO = "archivo",
  REFERENCIA_CATASTRAL = "referencia_catastral",
  COORDENADAS = "coordenadas",
  FIRMA = "firma",
}

// ──────────────────────────────────────────────
// CONFIGURACIÓN DE PREGUNTA
// ──────────────────────────────────────────────

/** Opciones para selects, radios y checkboxes */
export interface QuestionOption {
  id: string;
  label: string;
  value: string;
  /** Si el usuario selecciona esta opción, redirige a una sección */
  destino?: string;
  /** Mostrar pregunta condicional al seleccionar esta opción */
  siguientePregunta?: string;
}

/** Condición para mostrar/ocultar una pregunta */
export interface QuestionCondition {
  /** ID de la pregunta de la que depende */
  preguntaId: string;
  /** Tipo de comparación */
  operador: "igual" | "distinto" | "contiene" | "mayor_que" | "menor_que" | "existe" | "no_existe";
  /** Valor a comparar */
  valor?: string | number | boolean | string[];
}

/** Reglas de validación */
export interface QuestionValidation {
  /** Longitud mínima (texto/textarea) */
  minLength?: number;
  /** Longitud máxima (texto/textarea) */
  maxLength?: number;
  /** Valor mínimo (numero/fecha) */
  min?: number | string;
  /** Valor máximo (numero/fecha) */
  max?: number | string;
  /** Patrón regex */
  pattern?: string;
  /** Mensaje de error personalizado */
  mensaje?: string;
  /** Formato de referencia catastral española (14 o 20 dígitos) */
  formatoCatastral?: boolean;
  /** Tamaño máximo de archivo en bytes */
  maxFileSize?: number;
  /** Tipos MIME permitidos para archivos */
  allowedMimeTypes?: string[];
}

// ──────────────────────────────────────────────
// ENTIDADES PRINCIPALES
// ──────────────────────────────────────────────

/**
 * ENTIDAD: InspectionQuestion
 * Pregunta individual dentro de una sección
 */
export interface InspectionQuestion {
  /** Identificador único */
  id: string;
  /** ID de la sección a la que pertenece */
  sectionId: string;
  /** Tipo de input */
  type: QuestionType;
  /** Etiqueta visible */
  text: string;
  /** Texto descriptivo adicional */
  description?: string;
  /** Texto de ayuda (tooltip) */
  help?: string;
  /** Placeholder del input */
  placeholder?: string;
  /** ¿Es obligatoria? */
  required: boolean;
  /** Condición para mostrar esta pregunta */
  condition?: QuestionCondition;
  /** Validaciones */
  validation?: QuestionValidation;
  /** Orden dentro de la sección */
  order: number;
  /** Sección destino si esta pregunta redirige */
  destino?: string;
  /** Opciones (solo para select, radio, checkbox) */
  options?: QuestionOption[];
  /** Valor por defecto */
  defaultValue?: unknown;
  /** Metadatos para integraciones futuras */
  metadata?: Record<string, unknown>;
}

/**
 * ENTIDAD: InspectionSection
 * Agrupación temática de preguntas
 */
export interface InspectionSection {
  /** Identificador único */
  id: string;
  /** ID de la plantilla a la que pertenece */
  templateId: string;
  /** Nombre visible */
  name: string;
  /** Descripción de la sección */
  description?: string;
  /** Orden dentro de la inspección */
  order: number;
  /** Preguntas de esta sección */
  questions: InspectionQuestion[];
  /** ¿Es obligatorio completar esta sección? */
  required: boolean;
  /** Tiempo estimado en minutos */
  estimatedTime?: number;
  /** Metadatos para integraciones futuras */
  metadata?: Record<string, unknown>;
}

/**
 * ENTIDAD: InspectionTemplate
 * Plantilla maestra de inspección
 */
export interface InspectionTemplate {
  /** Identificador único */
  id: string;
  /** Nombre de la plantilla */
  name: string;
  /** Versión semántica */
  version: string;
  /** Servicio asociado */
  service: string;
  /** ¿Está activa? */
  active: boolean;
  /** Descripción del propósito */
  description: string;
  /** Orden de visualización en selector */
  order: number;
  /** Configuración global */
  config: InspectionTemplateConfig;
  /** Secciones que componen la inspección */
  sections: InspectionSection[];
}

// ──────────────────────────────────────────────
// CONFIGURACIÓN DE PLANTILLA
// ──────────────────────────────────────────────

export interface InspectionTemplateConfig {
  /** Permitir guardar borrador */
  allowDraft: boolean;
  /** Permitir continuar más tarde */
  allowResume: boolean;
  /** Mostrar barra de progreso */
  showProgress: boolean;
  /** Mostrar tiempo estimado */
  showEstimatedTime: boolean;
  /** Validar al avanzar sección */
  validateOnNext: boolean;
  /** Requerir autenticación */
  requireAuth: boolean;
  /** Navegación libre entre secciones */
  freeNavigation: boolean;
  /** Guardado automático cada N segundos (0 = desactivado) */
  autoSaveInterval: number;
  /** Sección de bienvenida (mostrar al iniciar) */
  welcomeSection?: string;
  /** Sección de resumen (mostrar al finalizar) */
  summarySection?: string;
  /** Slots de integración futura */
  slots: InspectionTemplateSlots;
}

/** Slots para integraciones futuras */
export interface InspectionTemplateSlots {
  /** Slot para fotografía/geolocalización */
  photography?: boolean;
  /** Slot para OCR */
  ocr?: boolean;
  /** Slot para IA */
  ai?: boolean;
  /** Slot para Catastro */
  catastro?: boolean;
  /** Slot para CE3X */
  ce3x?: boolean;
}

// ──────────────────────────────────────────────
// ESTADO EN TIEMPO DE EJECUCIÓN
// ──────────────────────────────────────────────

/** Respuesta del usuario a una pregunta */
export interface InspectionAnswer {
  questionId: string;
  value: unknown;
  answeredAt: Date;
  /** Metadatos del archivo si es upload */
  fileMeta?: {
    name: string;
    size: number;
    type: string;
  };
}

/** ID del borrador (generado en cliente) */
export type DraftId = string;

/** Estado completo de una inspección en curso */
export interface InspectionState {
  /** ID de la inspección */
  id: DraftId;
  /** ID del template usado */
  templateId: string;
  /** ID del expediente si existe */
  expedienteId?: string;
  /** Respuestas acumuladas */
  answers: Record<string, InspectionAnswer>;
  /** Sección actual */
  currentSectionId: string;
  /** IDs de secciones completadas */
  completedSections: string[];
  /** Timestamps */
  startedAt: Date;
  updatedAt: Date;
  /** Progreso 0-100 */
  progress: number;
  /** Tiempo total transcurrido en segundos */
  elapsedTime: number;
  /** Estado del borrador */
  status: "in_progress" | "draft" | "submitted";
}

// ──────────────────────────────────────────────
// TIPOS AUXILIARES
// ──────────────────────────────────────────────

/** Resultado de validación de una respuesta */
export interface ValidationResult {
  valid: boolean;
  questionId: string;
  errors: string[];
}

/** Sección navegable (con estado) */
export interface NavigableSection {
  id: string;
  name: string;
  order: number;
  isCompleted: boolean;
  isCurrent: boolean;
  isAccessible: boolean;
  questionCount: number;
  answeredCount: number;
}

/** Estadísticas de progreso */
export interface ProgressStats {
  percentage: number;
  currentStep: number;
  totalSteps: number;
  estimatedMinutes: number;
  elapsedMinutes: number;
  remainingMinutes: number;
  sections: NavigableSection[];
}
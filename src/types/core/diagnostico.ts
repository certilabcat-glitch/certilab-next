/**
 * Diagnóstico Técnico del Arquitecto Técnico
 *
 * Modelo de dominio propio del Diagnóstico, independiente de los documentos
 * RF-002, RF-003, RF-004 y RF-005. El Documento de Decisiones transformará
 * este modelo en la representación mostrada al cliente.
 *
 * Sprint 1 — MVP
 * - Sin IA, sin PITR, sin automatizaciones.
 * - Diagnóstico realizado manualmente por el AT.
 * - Observaciones libres complementan el diagnóstico estructurado.
 */

// ============================================================
// Veredictos
// ============================================================

/** Veredicto global del estado energético */
export type VeredictoGlobal = "Buena" | "Regular" | "Mejorable" | "Deficiente";

/** Nivel de confianza del AT sobre su diagnóstico */
export type NivelConfianza = "Alto" | "Medio" | "Bajo";

/** Categoría de un problema identificado */
export type CategoriaProblema = "critico" | "importante" | "mejora";

/** Veredicto de retorno de inversión para una actuación */
export type VeredictoRetorno = "merece" | "valoralo" | "no_recomendado";

// ============================================================
// Problema identificado
// ============================================================

export interface ProblemaDiagnostico {
  /** Identificador único (uuid generado en cliente) */
  id: string;
  /** Nombre corto del problema (ej: "Filtraciones en cubierta") */
  nombre: string;
  /** Categoría de gravedad */
  categoria: CategoriaProblema;
  /** Descripción del problema */
  descripcion: string;
  /** Por qué es importante resolverlo */
  por_que_importa: string;
  /** Consecuencias de no actuar */
  si_no_actuas: string;
  /** Nivel de confianza del AT en este diagnóstico */
  nivel_confianza: NivelConfianza;
  /** Nombre de la actuación asociada (debe coincidir con una actuación) */
  actuacion_asociada: string;
}

// ============================================================
// Actuación propuesta
// ============================================================

export interface ActuacionDiagnostico {
  /** Identificador único (uuid generado en cliente) */
  id: string;
  /** Posición en la priorización (1-based) */
  posicion: number;
  /** Nombre de la actuación */
  nombre: string;
  /** Inversión estimada en euros */
  inversion_estimada: number;
  /** Ahorro anual estimado en euros */
  ahorro_anual: number;
  /** Veredicto de si merece la pena */
  veredicto: VeredictoRetorno;
  /** Payback en años */
  payback: number;
  /** Descripción de la actuación */
  descripcion: string;
  /** Justificación de por qué ocupa esta posición */
  justificacion_posicion: string;
  /** Nivel de confianza del AT en el ahorro estimado */
  nivel_confianza_ahorro: NivelConfianza;
  /** Vida útil estimada en años */
  vida_util: number;
  /** Explicación detallada del veredicto de retorno */
  veredicto_detalle: string;
  /** Notas opcionales del AT específicas de esta actuación */
  notas_at?: string;
}

// ============================================================
// Diagnóstico completo
// ============================================================

export interface DiagnosticoCompleto {
  /** Veredicto global del estado energético */
  veredicto: VeredictoGlobal;
  /** Nivel de confianza global del diagnóstico */
  nivel_confianza: NivelConfianza;
  /** Resumen ejecutivo del diagnóstico (2-3 frases) */
  resumen: string;

  // Problemas
  /** Problemas identificados (ordenados por gravedad) */
  problemas: ProblemaDiagnostico[];

  // Actuaciones
  /** Actuaciones propuestas (ordenadas por prioridad) */
  actuaciones: ActuacionDiagnostico[];

  // Económico
  /** Ahorro total anual estimado (suma de ahorros) */
  ahorro_total: number;
  /** Coste energético anual actual */
  coste_actual: number;
  /** Coste energético anual tras mejoras */
  coste_tras_mejoras: number;
  /** Coste de inacción a 1 año */
  coste_inaccion_1a: number;
  /** Coste de inacción a 5 años */
  coste_inaccion_5a: number;
  /** Coste de inacción a 10 años */
  coste_inaccion_10a: number;
  /** Impacto en reventa (texto descriptivo) */
  impacto_reventa: string;
  /** Riesgo regulatorio (texto descriptivo) */
  riesgo_regulatorio: string;

  // Observaciones libres del AT
  /** Campo de texto libre para observaciones adicionales */
  observaciones_at: string;
}

// ============================================================
// Persistencia
// ============================================================

/**
 * Representación del diagnóstico para persistencia en base de datos.
 * Se almacena como JSONB en la tabla expedientes.
 */
export interface DiagnosticoRow {
  expediente_id: string;
  diagnostico: DiagnosticoCompleto;
  created_by: string;
  created_at: string;
  updated_at: string;
  version: number;
}

// ============================================================
// Estados del diagnóstico (máquina de estados simplificada)
// ============================================================

export type EstadoDiagnostico =
  | "SinDiagnostico"   // El AT aún no ha comenzado
  | "Borrador"         // El AT está editando
  | "Completado";      // El AT ha finalizado el diagnóstico

/**
 * Resultado de la validación del diagnóstico antes de guardar
 */
export interface ValidacionDiagnostico {
  valido: boolean;
  errores: string[];
}
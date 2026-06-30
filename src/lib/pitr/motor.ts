/**
 * MOTOR PITR™ — PROTOCOLO DE INSPECCIÓN TÉCNICA REMOTA
 *
 * Núcleo de lógica pura (sin dependencias de React):
 * - Mostrar/ocultar preguntas según condiciones
 * - Saltar preguntas según reglas
 * - Validar respuestas
 * - Calcular progreso
 * - Gestionar estado de inspección
 *
 * Versión: 1.0
 * Fecha: 30/06/2026
 */

import type {
  InspectionTemplate,
  InspectionSection,
  InspectionQuestion,
  InspectionAnswer,
  InspectionState,
  ValidationResult,
  ProgressStats,
  NavigableSection,
  DraftId,
  QuestionCondition,
  QuestionValidation,
} from "@/types/inspection";

// ──────────────────────────────────────────────
// 1. VISIBILIDAD DE PREGUNTAS
// ──────────────────────────────────────────────

/**
 * Determina si una pregunta debe mostrarse,
 * evaluando su condición contra las respuestas existentes.
 */
export function evaluarVisibilidad(
  question: InspectionQuestion,
  answers: Record<string, InspectionAnswer>,
  allQuestions: InspectionQuestion[]
): boolean {
  if (!question.condition) return true;

  const { preguntaId, operador, valor } = question.condition;

  // Si la pregunta de la que depende está en otra sección, buscarla globalmente
  const dependantAnswer = answers[preguntaId];

  switch (operador) {
    case "existe":
      return dependantAnswer !== undefined && dependantAnswer.value !== null && dependantAnswer.value !== "";

    case "no_existe":
      return dependantAnswer === undefined || dependantAnswer.value === null || dependantAnswer.value === "";

    case "igual":
      if (!dependantAnswer) return false;
      return String(dependantAnswer.value) === String(valor);

    case "distinto":
      if (!dependantAnswer) return true; // Si no hay respuesta, es distinto
      return String(dependantAnswer.value) !== String(valor);

    case "contiene":
      if (!dependantAnswer) return false;
      if (Array.isArray(dependantAnswer.value)) {
        return dependantAnswer.value.includes(String(valor));
      }
      return String(dependantAnswer.value).includes(String(valor));

    case "mayor_que":
      if (!dependantAnswer) return false;
      return Number(dependantAnswer.value) > Number(valor);

    case "menor_que":
      if (!dependantAnswer) return false;
      return Number(dependantAnswer.value) < Number(valor);

    default:
      return true;
  }
}

/**
 * Obtiene preguntas visibles de una sección,
 * evaluando condiciones contra las respuestas existentes.
 */
export function obtenerPreguntasVisibles(
  section: InspectionSection,
  answers: Record<string, InspectionAnswer>,
  allQuestions: InspectionQuestion[]
): InspectionQuestion[] {
  return section.questions
    .filter((q) => evaluarVisibilidad(q, answers, allQuestions))
    .sort((a, b) => a.order - b.order);
}

// ──────────────────────────────────────────────
// 2. VALIDACIÓN DE RESPUESTAS
// ──────────────────────────────────────────────

/**
 * Valida una respuesta individual contra las reglas de la pregunta.
 */
export function validarRespuesta(
  question: InspectionQuestion,
  answer: InspectionAnswer
): ValidationResult {
  const errors: string[] = [];

  // Obligatoriedad
  if (question.required) {
    if (answer.value === undefined || answer.value === null || answer.value === "") {
      errors.push("Esta pregunta es obligatoria.");
    }
  }

  // Si no hay valor y no es obligatoria, es válida
  if (!answer.value && answer.value !== 0 && answer.value !== false) {
    return { valid: true, questionId: question.id, errors: [] };
  }

  const v = question.validation;
  if (!v) return { valid: true, questionId: question.id, errors: [] };

  const value = String(answer.value);

  // Longitud mínima
  if (v.minLength && value.length < v.minLength) {
    errors.push(v.mensaje || `Mínimo ${v.minLength} caracteres.`);
  }

  // Longitud máxima
  if (v.maxLength && value.length > v.maxLength) {
    errors.push(v.mensaje || `Máximo ${v.maxLength} caracteres.`);
  }

  // Rango numérico
  if (v.min !== undefined && Number(value) < Number(v.min)) {
    errors.push(v.mensaje || `Valor mínimo: ${v.min}.`);
  }
  if (v.max !== undefined && Number(value) > Number(v.max)) {
    errors.push(v.mensaje || `Valor máximo: ${v.max}.`);
  }

  // Patrón regex
  if (v.pattern) {
    try {
      const regex = new RegExp(v.pattern);
      if (!regex.test(value)) {
        errors.push(v.mensaje || "Formato inválido.");
      }
    } catch {
      // Si el patrón es inválido, ignorar
    }
  }

  // Formato catastral
  if (v.formatoCatastral) {
    const limpio = value.replace(/[\s-]/g, "");
    if (limpio.length !== 14 && limpio.length !== 20) {
      errors.push(v.mensaje || "La referencia catastral debe tener 14 o 20 caracteres.");
    }
  }

  // Archivo: tamaño máximo
  if (v.maxFileSize && answer.fileMeta && answer.fileMeta.size > v.maxFileSize) {
    const sizeMB = (v.maxFileSize / (1024 * 1024)).toFixed(1);
    errors.push(v.mensaje || `El archivo no puede superar ${sizeMB} MB.`);
  }

  // Archivo: tipos MIME permitidos
  if (v.allowedMimeTypes && answer.fileMeta) {
    if (!v.allowedMimeTypes.includes(answer.fileMeta.type)) {
      errors.push(v.mensaje || "Tipo de archivo no permitido.");
    }
  }

  return {
    valid: errors.length === 0,
    questionId: question.id,
    errors,
  };
}

/**
 * Valida todas las preguntas de una sección.
 * Solo valida las preguntas visibles.
 */
export function validarSeccion(
  section: InspectionSection,
  answers: Record<string, InspectionAnswer>,
  allQuestions: InspectionQuestion[]
): ValidationResult[] {
  const visibles = obtenerPreguntasVisibles(section, answers, allQuestions);
  const results: ValidationResult[] = [];

  for (const question of visibles) {
    const answer = answers[question.id];
    if (answer) {
      results.push(validarRespuesta(question, answer));
    } else if (question.required) {
      results.push({
        valid: false,
        questionId: question.id,
        errors: ["Esta pregunta es obligatoria."],
      });
    }
  }

  return results;
}

// ──────────────────────────────────────────────
// 3. CÁLCULO DE PROGRESO
// ──────────────────────────────────────────────

/**
 * Calcula el progreso de la inspección (0-100).
 * Basado en: preguntas respondidas / total preguntas visibles.
 */
export function calcularProgreso(
  template: InspectionTemplate,
  state: InspectionState
): number {
  let totalPreguntas = 0;
  let respondidas = 0;

  // Recolectamos todas las preguntas para evaluar visibilidad
  const allQuestions = template.sections.flatMap((s) => s.questions);

  for (const section of template.sections) {
    const visibles = obtenerPreguntasVisibles(section, state.answers, allQuestions);
    totalPreguntas += visibles.length;

    for (const q of visibles) {
      if (state.answers[q.id]?.value) {
        respondidas++;
      }
    }
  }

  if (totalPreguntas === 0) return 0;
  return Math.round((respondidas / totalPreguntas) * 100);
}

/**
 * Genera estadísticas completas de progreso.
 */
export function generarEstadisticas(
  template: InspectionTemplate,
  state: InspectionState
): ProgressStats {
  const allQuestions = template.sections.flatMap((s) => s.questions);
  const sectionsData: NavigableSection[] = [];
  let totalQuestions = 0;
  let totalAnswered = 0;
  let estimatedMinutes = 0;

  const currentSectionIndex = template.sections.findIndex(
    (s) => s.id === state.currentSectionId
  );

  for (let i = 0; i < template.sections.length; i++) {
    const section = template.sections[i];
    const visibles = obtenerPreguntasVisibles(section, state.answers, allQuestions);
    const answered = visibles.filter((q) => state.answers[q.id]?.value).length;

    totalQuestions += visibles.length;
    totalAnswered += answered;
    estimatedMinutes += section.estimatedTime || 5;

    sectionsData.push({
      id: section.id,
      name: section.name,
      order: section.order,
      isCompleted: state.completedSections.includes(section.id),
      isCurrent: section.id === state.currentSectionId,
      isAccessible:
        template.config.freeNavigation ||
        i <= currentSectionIndex + 1 ||
        state.completedSections.includes(section.id),
      questionCount: visibles.length,
      answeredCount: answered,
    });
  }

  const percentage =
    totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0;

  const elapsedMinutes = Math.round(state.elapsedTime / 60);
  const remainingMinutes = Math.max(
    0,
    estimatedMinutes - elapsedMinutes
  );

  return {
    percentage,
    currentStep: currentSectionIndex + 1,
    totalSteps: template.sections.length,
    estimatedMinutes,
    elapsedMinutes,
    remainingMinutes,
    sections: sectionsData,
  };
}

// ──────────────────────────────────────────────
// 4. GESTIÓN DE BORRADORES (localStorage)
// ──────────────────────────────────────────────

const STORAGE_PREFIX = "certilab_pitr_";

/**
 * Guarda el estado actual en localStorage como borrador.
 */
export function guardarBorrador(state: InspectionState): void {
  if (typeof window === "undefined") return;

  const updatedState: InspectionState = {
    ...state,
    updatedAt: new Date(),
  };

  try {
    localStorage.setItem(
      `${STORAGE_PREFIX}${state.id}`,
      JSON.stringify(updatedState)
    );
  } catch {
    // localStorage lleno o no disponible
    console.warn("[PITR] No se pudo guardar el borrador.");
  }
}

/**
 * Carga un borrador desde localStorage.
 */
export function cargarBorrador(draftId: DraftId): InspectionState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${draftId}`);
    if (!raw) return null;

    const state = JSON.parse(raw) as InspectionState;

    // Restaurar fechas
    state.startedAt = new Date(state.startedAt);
    state.updatedAt = new Date(state.updatedAt);

    // Restaurar fechas de respuestas
    for (const key of Object.keys(state.answers)) {
      if (state.answers[key]?.answeredAt) {
        state.answers[key].answeredAt = new Date(
          state.answers[key].answeredAt
        );
      }
    }

    return state;
  } catch {
    console.warn("[PITR] No se pudo cargar el borrador.");
    return null;
  }
}

/**
 * Elimina un borrador.
 */
export function eliminarBorrador(draftId: DraftId): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${draftId}`);
  } catch {
    // No hacer nada
  }
}

/**
 * Lista todos los borradores guardados.
 */
export function listarBorradores(): InspectionState[] {
  if (typeof window === "undefined") return [];

  const drafts: InspectionState[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_PREFIX)) {
        const raw = localStorage.getItem(key);
        if (raw) {
          drafts.push(JSON.parse(raw) as InspectionState);
        }
      }
    }
  } catch {
    // Ignorar errores
  }

  return drafts.sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

// ──────────────────────────────────────────────
// 5. NAVEGACIÓN ENTRE SECCIONES
// ──────────────────────────────────────────────

/**
 * Obtiene la sección anterior a la actual.
 */
export function obtenerSeccionAnterior(
  template: InspectionTemplate,
  currentSectionId: string
): InspectionSection | null {
  const index = template.sections.findIndex((s) => s.id === currentSectionId);
  if (index <= 0) return null;
  return template.sections[index - 1];
}

/**
 * Obtiene la sección siguiente a la actual.
 */
export function obtenerSeccionSiguiente(
  template: InspectionTemplate,
  currentSectionId: string
): InspectionSection | null {
  const index = template.sections.findIndex((s) => s.id === currentSectionId);
  if (index < 0 || index >= template.sections.length - 1) return null;
  return template.sections[index + 1];
}

/**
 * Determina a qué sección ir según las reglas de destino
 * (cuando una pregunta redirige a otra sección).
 */
export function resolverDestino(
  template: InspectionTemplate,
  question: InspectionQuestion,
  answer: InspectionAnswer
): string | null {
  // Si la pregunta tiene destino fijo
  if (question.destino) return question.destino;

  // Si la opción seleccionada tiene destino
  if (question.options && answer.value) {
    const selectedOption = question.options.find(
      (opt) => opt.value === String(answer.value)
    );
    if (selectedOption?.destino) return selectedOption.destino;
  }

  return null;
}

// ──────────────────────────────────────────────
// 6. INICIALIZACIÓN DE ESTADO
// ──────────────────────────────────────────────

let counter = 0;

/**
 * Genera un ID único para borradores.
 */
export function generarDraftId(): DraftId {
  counter++;
  return `draft_${Date.now()}_${counter}_${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * Crea un estado inicial para una nueva inspección.
 */
export function inicializarInspeccion(
  template: InspectionTemplate,
  expedienteId?: string
): InspectionState {
  const firstSection = template.sections[0];
  const welcomeId = template.config.welcomeSection;
  const initialSectionId = welcomeId || firstSection?.id || "";

  const now = new Date();

  return {
    id: generarDraftId(),
    templateId: template.id,
    expedienteId,
    answers: {},
    currentSectionId: initialSectionId,
    completedSections: [],
    startedAt: now,
    updatedAt: now,
    progress: 0,
    elapsedTime: 0,
    status: "in_progress",
  };
}

// ──────────────────────────────────────────────
// 7. UTILIDADES
// ──────────────────────────────────────────────

/**
 * Registra una respuesta en el estado.
 * Retorna el nuevo estado (inmutable).
 */
export function registrarRespuesta(
  state: InspectionState,
  questionId: string,
  value: unknown,
  fileMeta?: { name: string; size: number; type: string }
): InspectionState {
  const newAnswers = { ...state.answers };

  newAnswers[questionId] = {
    questionId,
    value,
    answeredAt: new Date(),
    fileMeta,
  };

  return {
    ...state,
    answers: newAnswers,
    updatedAt: new Date(),
  };
}

/**
 * Marca una sección como completada.
 */
export function completarSeccion(
  state: InspectionState,
  sectionId: string
): InspectionState {
  if (state.completedSections.includes(sectionId)) return state;

  return {
    ...state,
    completedSections: [...state.completedSections, sectionId],
    updatedAt: new Date(),
  };
}

/**
 * Navega a una sección específica.
 */
export function navegarASeccion(
  state: InspectionState,
  sectionId: string
): InspectionState {
  return {
    ...state,
    currentSectionId: sectionId,
    updatedAt: new Date(),
  };
}

/**
 * Finaliza la inspección (marca como enviada).
 */
export function finalizarInspeccion(state: InspectionState): InspectionState {
  return {
    ...state,
    status: "submitted",
    progress: 100,
    updatedAt: new Date(),
  };
}

/**
 * Actualiza el tiempo transcurrido.
 */
export function actualizarTiempo(
  state: InspectionState,
  elapsedSeconds: number
): InspectionState {
  return {
    ...state,
    elapsedTime: elapsedSeconds,
    updatedAt: new Date(),
  };
}
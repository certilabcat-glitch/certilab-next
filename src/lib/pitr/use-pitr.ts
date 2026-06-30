/**
 * HOOK: usePitr
 *
 * Conecta el motor PITR™ con React.
 * Gestiona estado, respuestas, validación, progreso y navegación.
 */

"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type {
  InspectionTemplate,
  InspectionSection,
  InspectionQuestion,
  InspectionState,
  ValidationResult,
  ProgressStats,
} from "@/types/inspection";
import * as motor from "./motor";

interface UsePitrOptions {
  template: InspectionTemplate;
  expedienteId?: string;
}

interface UsePitrReturn {
  /** Estado actual de la inspección */
  state: InspectionState;
  /** Sección activa */
  currentSection: InspectionSection | undefined;
  /** Preguntas visibles de la sección actual */
  visibleQuestions: InspectionQuestion[];
  /** Resultados de validación de la sección actual */
  validationResults: ValidationResult[];
  /** Estadísticas de progreso */
  stats: ProgressStats;
  /** ¿Hay sección anterior? */
  hasPrev: boolean;
  /** ¿Hay sección siguiente? */
  hasNext: boolean;
  /** ¿Es la última sección? */
  isLastSection: boolean;
  /** ¿Sección actual completada? */
  isSectionComplete: boolean;
  /** Marcar/desmarcar respuesta */
  setAnswer: (questionId: string, value: unknown, fileMeta?: { name: string; size: number; type: string }) => void;
  /** Navegar a sección anterior */
  goPrev: () => void;
  /** Navegar a sección siguiente */
  goNext: () => void;
  /** Ir a una sección específica */
  goToSection: (sectionId: string) => void;
  /** Guardar borrador */
  saveDraft: () => void;
  /** Validar sección actual */
  validate: () => ValidationResult[];
  /** Finalizar inspección */
  submit: () => void;
  /** Continuar desde un borrador existente */
  resume: (draftId: string) => boolean;
}

export function usePitr({ template, expedienteId }: UsePitrOptions): UsePitrReturn {
  // ── ESTADO PRINCIPAL ──
  const [state, setState] = useState<InspectionState>(() =>
    motor.inicializarInspeccion(template, expedienteId)
  );

  // ── REFS ──
  const startTimeRef = useRef<number>(Date.now());
  const autoSaveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── DATOS DERIVADOS ──
  const allQuestions = template.sections.flatMap((s) => s.questions);
  const currentSection = template.sections.find((s) => s.id === state.currentSectionId);
  const visibleQuestions = currentSection
    ? motor.obtenerPreguntasVisibles(currentSection, state.answers, allQuestions)
    : [];

  const stats = motor.generarEstadisticas(template, state);
  const currentIndex = template.sections.findIndex((s) => s.id === state.currentSectionId);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < template.sections.length - 1;
  const isLastSection = currentIndex === template.sections.length - 1;

  // Validación continua de la sección actual
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);

  const isSectionComplete = currentSection
    ? motor.validarSeccion(currentSection, state.answers, allQuestions).every((r) => r.valid)
    : false;

  // ── ACTUALIZADOR DE ESTADO INMUTABLE ──
  const updateState = useCallback((updater: (prev: InspectionState) => InspectionState) => {
    setState((prev) => {
      const next = updater(prev);
      const progress = motor.calcularProgreso(template, next);
      return { ...next, progress };
    });
  }, [template]);

  // ── RESPUESTAS ──
  const setAnswer = useCallback(
    (questionId: string, value: unknown, fileMeta?: { name: string; size: number; type: string }) => {
      updateState((prev) => motor.registrarRespuesta(prev, questionId, value, fileMeta));
    },
    [updateState]
  );

  // ── NAVEGACIÓN ──
  const goPrev = useCallback(() => {
    const prev = motor.obtenerSeccionAnterior(template, state.currentSectionId);
    if (prev) {
      updateState((p) => motor.navegarASeccion(p, prev.id));
    }
  }, [template, state.currentSectionId, updateState]);

  const goNext = useCallback(() => {
    const next = motor.obtenerSeccionSiguiente(template, state.currentSectionId);
    if (next) {
      // Validar antes de avanzar
      if (template.config.validateOnNext && currentSection) {
        const results = motor.validarSeccion(currentSection, state.answers, allQuestions);
        setValidationResults(results);
        if (results.some((r) => !r.valid)) return;
      }
      // Completar sección actual
      updateState((prev) => {
        const completed = motor.completarSeccion(prev, state.currentSectionId);
        return motor.navegarASeccion(completed, next.id);
      });
    }
  }, [template, state, currentSection, allQuestions, updateState]);

  const goToSection = useCallback(
    (sectionId: string) => {
      if (template.config.freeNavigation || state.completedSections.includes(sectionId)) {
        updateState((p) => motor.navegarASeccion(p, sectionId));
      }
    },
    [template, state.completedSections, updateState]
  );

  // ── VALIDACIÓN ──
  const validate = useCallback((): ValidationResult[] => {
    if (!currentSection) return [];
    const results = motor.validarSeccion(currentSection, state.answers, allQuestions);
    setValidationResults(results);
    return results;
  }, [currentSection, state.answers, allQuestions]);

  // ── BORRADOR ──
  const saveDraft = useCallback(() => {
    motor.guardarBorrador(state);
  }, [state]);

  const resume = useCallback(
    (draftId: string): boolean => {
      const loaded = motor.cargarBorrador(draftId);
      if (loaded && loaded.templateId === template.id) {
        setState(loaded);
        return true;
      }
      return false;
    },
    [template.id]
  );

  // ── FINALIZAR ──
  const submit = useCallback(() => {
    updateState((prev) => motor.finalizarInspeccion(prev));
    motor.eliminarBorrador(state.id);
  }, [state.id, updateState]);

  // ── AUTO-SAVE ──
  useEffect(() => {
    if (template.config.autoSaveInterval > 0) {
      autoSaveRef.current = setInterval(() => {
        setState((prev) => {
          motor.guardarBorrador(prev);
          return prev;
        });
      }, template.config.autoSaveInterval * 1000);
    }
    return () => {
      if (autoSaveRef.current) clearInterval(autoSaveRef.current);
    };
  }, [template.config.autoSaveInterval]);

  // ── TEMPORIZADOR ──
  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
      updateState((prev) => motor.actualizarTiempo(prev, elapsed));
    }, 1000);
    return () => clearInterval(timer);
  }, [updateState]);

  // ── REEVALUAR VALIDACIONES AL CAMBIAR RESPUESTAS ──
  useEffect(() => {
    if (currentSection && template.config.validateOnNext) {
      const results = motor.validarSeccion(currentSection, state.answers, allQuestions);
      setValidationResults(results);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.answers, state.currentSectionId]);

  return {
    state,
    currentSection,
    visibleQuestions,
    validationResults,
    stats,
    hasPrev,
    hasNext,
    isLastSection,
    isSectionComplete,
    setAnswer,
    goPrev,
    goNext,
    goToSection,
    saveDraft,
    validate,
    submit,
    resume,
  };
}
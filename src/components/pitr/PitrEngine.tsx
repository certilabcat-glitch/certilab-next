/**
 * PITR ENGINE — Motor de inspección reutilizable
 *
 * Renderiza cualquier InspectionTemplate con navegación, progreso,
 * validación y guardado de borrador automático.
 *
 * PITR™ — Protocolo de Inspección Técnica Remota
 */

"use client";

import type { InspectionTemplate } from "@/types/inspection";
import { usePitr } from "@/lib/pitr/use-pitr";
import PitrProgress from "./PitrProgress";
import PitrNavigation from "./PitrNavigation";
import PitrQuestion from "./PitrQuestion";
import styles from "./PitrEngine.module.css";
import { useState } from "react";

interface PitrEngineProps {
  template: InspectionTemplate;
  expedienteId?: string;
  draftId?: string;
  onExit?: () => void;
  onSubmit?: () => void;
}

export default function PitrEngine({
  template,
  expedienteId,
  draftId,
  onExit,
  onSubmit,
}: PitrEngineProps) {
  const {
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
    saveDraft,
    submit,
    resume,
  } = usePitr({ template, expedienteId });

  const [resumeTried, setResumeTried] = useState(false);

  // Intentar cargar borrador si viene draftId
  if (draftId && !resumeTried) {
    setResumeTried(true);
    resume(draftId);
  }

  const handleSubmit = () => {
    submit();
    onSubmit?.();
  };

  if (!currentSection) {
    return (
      <div className={styles.empty}>
        <p>No hay secciones configuradas para este servicio.</p>
      </div>
    );
  }

  return (
    <div className={styles.engine}>
      {/* ── CABECERA ── */}
      <header className={styles.header}>
        <h1 className={styles.title}>{template.name}</h1>
        <p className={styles.version}>v{template.version}</p>
      </header>

      {/* ── BARRA DE PROGRESO ── */}
      {template.config.showProgress && <PitrProgress stats={stats} />}

      {/* ── SECCIÓN ACTUAL ── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.step}>
            Paso {stats.currentStep} de {stats.totalSteps}
          </span>
          <h2 className={styles.sectionName}>{currentSection.name}</h2>
          {currentSection.description && (
            <p className={styles.sectionDesc}>
              {currentSection.description}
            </p>
          )}
          {currentSection.estimatedTime != null && (
            <span className={styles.estTime}>
              ⏱ ~{currentSection.estimatedTime} min
            </span>
          )}
        </div>

        {/* ── PREGUNTAS ── */}
        <div className={styles.questions}>
          {visibleQuestions.map((q) => (
            <PitrQuestion
              key={q.id}
              question={q}
              value={state.answers[q.id]}
              validation={
                validationResults.find((v) => v.questionId === q.id) ?? null
              }
              onChange={(value, fileMeta) =>
                setAnswer(q.id, value, fileMeta)
              }
            />
          ))}
        </div>
      </section>

      {/* ── NAVEGACIÓN ── */}
      <PitrNavigation
        hasPrev={hasPrev}
        hasNext={hasNext}
        isLastSection={isLastSection}
        isSectionComplete={isSectionComplete}
        onPrev={goPrev}
        onNext={goNext}
        onSave={saveDraft}
        onSubmit={handleSubmit}
        onExit={onExit}
      />
    </div>
  );
}
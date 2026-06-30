/**
 * PITR NAVIGATION — Navegación del motor de inspección
 *
 * Botones: Anterior, Siguiente, Guardar, Salir, Continuar.
 *
 * PITR™ — Protocolo de Inspección Técnica Remota
 */

"use client";

import styles from "./PitrNavigation.module.css";

interface PitrNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  onSave: () => void;
  onExit?: () => void;
  onSubmit?: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  isLastSection: boolean;
  isSectionComplete: boolean;
  className?: string;
}

export default function PitrNavigation({
  onPrev,
  onNext,
  onSave,
  onExit,
  onSubmit,
  hasPrev,
  hasNext,
  isLastSection,
  isSectionComplete,
  className,
}: PitrNavigationProps) {
  return (
    <nav className={`${styles.nav} ${className ?? ""}`} role="navigation" aria-label="Navegación de inspección">
      {/* Lado izquierdo */}
      <div className={styles.left}>
      </div>

      {/* Lado derecho */}
      <div className={styles.right}>
        {hasPrev && (
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={onPrev}
          >
            ← Anterior
          </button>
        )}

        {!isLastSection && (
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={onNext}
            disabled={!isSectionComplete}
          >
            Siguiente →
          </button>
        )}

        {isLastSection && (
          <button
            type="button"
            className={styles.btnSubmit}
            onClick={onSubmit}
            disabled={!isSectionComplete}
          >
            ✅ Finalizar inspección
          </button>
        )}

        <button
          type="button"
          className={styles.btnGhost}
          onClick={onSave}
        >
          💾 Guardar
        </button>

        {onExit && (
          <button
            type="button"
            className={styles.btnDanger}
            onClick={onExit}
          >
            🚪 Salir
          </button>
        )}
      </div>
    </nav>
  );
}

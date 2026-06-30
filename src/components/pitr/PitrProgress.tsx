/**
 * PITR PROGRESS — Barra de progreso del motor
 *
 * Muestra: porcentaje, tiempo estimado, paso actual / total.
 *
 * PITR™ — Protocolo de Inspección Técnica Remota
 */

"use client";

import type { ProgressStats } from "@/types/inspection";
import styles from "./PitrProgress.module.css";

interface PitrProgressProps {
  stats: ProgressStats;
}

export default function PitrProgress({ stats }: PitrProgressProps) {
  const pct = Math.round(stats.percentage);

  return (
    <div className={styles.wrapper} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`Progreso: ${pct}%`}>
      {/* Porcentaje numérico */}
      <div className={styles.header}>
        <span className={styles.percentage}>{pct}% completado</span>
        <span className={styles.stepInfo}>
          Paso {stats.currentStep} de {stats.totalSteps}
        </span>
      </div>

      {/* Barra visual */}
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Tiempos */}
      <div className={styles.times}>
        <span>⏱ ~{stats.remainingMinutes} min restantes</span>
        <span className={styles.elapsed}>
          {stats.elapsedMinutes > 0 && `(${stats.elapsedMinutes} min transcurridos)`}
        </span>
      </div>
    </div>
  );
}
"use client";

import styles from "./TrustNumbers.module.css";

interface Stat {
  number: string;
  label: string;
}

const stats: Stat[] = [
  { number: "500+", label: "Certificados analizados" },
  { number: "97%", label: "Clientes satisfechos" },
  { number: "24-48h", label: "Tiempo de respuesta" },
  { number: "CATEB 9457", label: "Arquitecta colegiada" },
];

export default function TrustNumbers() {
  return (
    <section className={styles.section} aria-label="Indicadores de confianza">
      <div className={styles.grid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.item}>
            <span className={styles.value}>{stat.number}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

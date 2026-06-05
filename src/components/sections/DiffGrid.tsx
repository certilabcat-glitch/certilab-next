"use client";

import styles from "./DiffGrid.module.css";

export default function DiffGrid() {
  const items = [
    {
      num: "I",
      title: "Cumplimiento legal",
      text: "El RD 390/2021 exige visita presencial para emitir. No lo hacemos online porque la ley no lo permite.",
    },
    {
      num: "II",
      title: "Independencia total",
      text: "Trabajamos con plena independencia. Sin conflictos de interés, nuestro único compromiso es con la precisión técnica.",
    },
    {
      num: "III",
      title: "Arquitecta Técnica colegiada",
      text: "Cateb 9457. Responsabilidad profesional real, no un algoritmo ni un técnico anónimo.",
    },
    {
      num: "IV",
      title: "Informes que sirven",
      text: "Análisis técnico detallado con datos reales del inmueble, riesgos identificados y recomendaciones accionables.",
    },
  ];

  return (
    <section className="section" aria-labelledby="diff-title">
      <h2 className="section-title" id="diff-title">
        Análisis Forense vs. Informes Automáticos
      </h2>
      <p className="section-sub">
        No somos una plataforma de certificados rápidos. Somos una consultoría
        técnica colegiada que trabaja con responsabilidad profesional real. Sin
        atajos.
      </p>
      <div className={styles.diffGrid}>
        {items.map((item) => (
          <div key={item.num} className={styles.diffCard}>
            <p className={styles.diffNum}>{item.num}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

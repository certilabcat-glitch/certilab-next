"use client";

import styles from "./TrustBlockSection.module.css";

export default function TrustBlockSection() {
  return (
    <section className={styles.trustBlock} aria-label="Información profesional">
      <p>
        <strong>Certilab · Despacho de Auditoría Energética</strong>
      </p>
      <p>Dirigido por Eva María González García · Arquitecta Técnica · Colegiada nº 9457 · Cateb</p>
      <p>Seguro RC Profesional · Servicio 100% online para toda España</p>
      <div className={styles.trustBlockBadges}>
        <span>Cateb 9457</span>
        <span>Seguro RC</span>
        <span>Despacho de Auditoría Energética</span>
      </div>
      <p className={styles.disclaimer}>
        Servicio 100% online para toda España.
        <br />
        Análisis técnicos remotos con responsabilidad profesional real.
      </p>
    </section>
  );
}

"use client";

import Link from "next/link";
import styles from "./DespachoSection.module.css";

export default function DespachoSection() {
  return (
    <section className={styles.section} aria-labelledby="despacho-title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Despacho de Auditoría Energética</p>

        <h2 id="despacho-title" className={styles.title}>
          Nadie entiende tu piso como una arquitecta técnica que ha visto cientos
        </h2>

        <p className={styles.desc}>
          <strong>Eva María González García</strong>,{" "}
          Arquitecta Técnica colegiada por el{" "}
          Colegio de Arquitectos Técnicos de Barcelona, realiza un análisis
          riguroso e independiente de su certificado energético para que usted
          pueda tomar la mejor decisión.
        </p>

        <div className={styles.badges}>
          <span>Colegiada · Cateb 9457</span>
          <span>20 años de experiencia</span>
          <span>Seguro RC Profesional</span>
        </div>

        <p className={styles.nota}>100% remoto · Confidencial</p>

        <div className={styles.ctas}>
          <Link href="/#diagnostico" className="btn-primary">
            Diagnóstico Gratuito
          </Link>
          <Link href="/#servicios" className="btn-ghost">
            Servicios →
          </Link>
        </div>
      </div>
    </section>
  );
}

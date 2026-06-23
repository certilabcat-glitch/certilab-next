"use client";

import Link from "next/link";
import styles from "./LeadMagnetCTA.module.css";

interface Props {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function LeadMagnetCTA({
  title = "¿Dudas sobre tu certificado energético?",
  description = "Descarga gratis nuestra guía: 7 señales de que tu certificado podría contener errores. Sin spam, sin compromiso.",
  ctaText = "Descargar guía gratis →",
  ctaLink = "/landing/7-senales-ce",
}: Props) {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <div className={styles.ctaContent}>
          <h3 className={styles.ctaTitle}>{title}</h3>
          <p className={styles.ctaDescription}>{description}</p>
          <Link href={ctaLink} className={styles.ctaButton}>
            {ctaText}
          </Link>
          <p className={styles.ctaNote}>
            📩 Recibirás la guía en tu email. Puedes darte de baja en cualquier
            momento.
          </p>
        </div>
      </div>
    </section>
  );
}

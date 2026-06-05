"use client";

import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import { waDiagnostico } from "@/lib/wa";
import styles from "./page.module.css";

export default function BuscadorPage() {
  return (
    <>
      <header className={styles.hero}>
        <h1>Buscador de Certificados Energéticos en Cataluña</h1>
        <p className={styles.heroSub}>
          Guía para encontrar un técnico certificador habilitado en tu provincia.
        </p>
      </header>

      <section className={styles.content}>
        <h2>¿Necesitas un certificado energético oficial en Cataluña?</h2>
        <p>
          Aunque Certilab no emite certificados energéticos oficiales, te
          orientamos sobre cómo encontrar un técnico habilitado en tu zona.
        </p>

        <h3>Registro oficial</h3>
        <p>
          El registro oficial de certificadores energéticos de Cataluña lo
          gestiona el ICAEN (Institut Català d'Energia). En su web puedes
          buscar técnicos habilitados por provincia y municipio.
        </p>

        <div className={styles.dirLinks}>
          <a
            href="https://www.registrocertificadosenergeticos.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.dirLink}
          >
            🔗 Registro de Certificadores de Cataluña (ICAEN)
          </a>
          <a
            href="https://www.gencat.cat/icaen/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.dirLink}
          >
            🔗 Institut Català d'Energia
          </a>
        </div>

        <h3>¿Ya tienes un certificado y dudas de su fiabilidad?</h3>
        <p>
          Solicita una Segunda Opinión en Certilab. Por 39€ revisamos tu
          certificado y te decimos si es correcto.
        </p>
        <Link href="/segunda-opinion/" className={styles.inlineLink}>
          Solicitar Segunda Opinión →
        </Link>
      </section>

      <CTASection
        title="¿Necesitas orientación?"
        text="Te ayudamos a encontrar lo que necesitas, sin compromiso."
        buttonText="Consultar gratis"
        buttonHref={waDiagnostico()}
      />
    </>
  );
}

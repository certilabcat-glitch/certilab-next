"use client";

import LandingLeadForm from "@/components/forms/LandingLeadForm";
import styles from "./page.module.css";

export default function SieteSenalesPage() {
  return (
    <>
      <header className={`hero ${styles.heroLanding}`}>
        <p className={styles.heroEyebrow}>
          Guía gratuita · Arquitecta Técnica Cateb 9457
        </p>
        <h1>
          7 Señales de que tu
          <br />
          <span className={styles.heroLight}>
            Certificado Energético Podría Contener Errores
          </span>
        </h1>
        <p className={styles.heroSub}>
          Descarga gratis esta guía y aprende a detectar certificados mal hechos
          antes de comprar o vender tu vivienda. Eva María González García,
          Arquitecta Técnica colegiada, te explica qué mirar y cómo evitarlo.
        </p>
        <ul className={styles.heroBenefits}>
          <li>✅ Las 7 señales de alerta más importantes</li>
          <li>
            ✅ Cómo afectan al precio de tu vivienda (Brown Discount)
          </li>
          <li>
            ✅ Checklist descargable para revisar tu certificado
          </li>
        </ul>
      </header>

      <LandingLeadForm
        leadMagnet="7-senales-ce"
        utmCampaign="7-senales-certificado"
      />
    </>
  );
}

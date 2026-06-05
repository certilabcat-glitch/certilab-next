"use client";

import LandingLeadForm from "@/components/forms/LandingLeadForm";
import styles from "./page.module.css";

export default function GuiaErroresPage() {
  return (
    <>
      <header className={`hero ${styles.heroLanding}`}>
        <p className={styles.heroEyebrow}>
          Guía gratuita · Arquitecta Técnica Cateb 9457
        </p>
        <h1>
          5 Errores que Invalidan
          <br />
          <span className={styles.heroLight}>tu Certificado Energético</span>
        </h1>
        <p className={styles.heroSub}>
          Descarga gratis esta guía y aprende a detectar certificados mal hechos
          antes de comprar o vender tu vivienda. Eva María González Gracia,
          Arquitecta Técnica colegiada, te explica qué mirar y cómo evitarlo.
        </p>
        <ul className={styles.heroBenefits}>
          <li>✅ Errores más frecuentes en calificaciones energéticas</li>
          <li>
            ✅ Cómo afectan al precio de tu vivienda (Brown Discount)
          </li>
          <li>
            ✅ Checklist descargable para revisar tu certificado
          </li>
        </ul>
      </header>

      <LandingLeadForm
        leadMagnet="guia-errores-ce"
        utmCampaign="guia-errores"
      />
    </>
  );
}
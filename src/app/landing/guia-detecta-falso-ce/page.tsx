"use client";

import LandingLeadForm from "@/components/forms/LandingLeadForm";
import styles from "./page.module.css";

export default function GuiaDetectaFalsoCE() {
  return (
    <>
      <header className={styles.heroLanding}>
        <p className={styles.heroEyebrow}>
          Guía gratuita · Arquitecta Técnica Cateb 9457
        </p>
        <h1>
          Guía para Detectar
          <br />
          <span className={styles.heroLight}>un Certificado Energético Falso</span>
        </h1>
        <p className={styles.heroSub}>
          ¿Desconfías de tu certificado energético? Cada año se emiten miles de
          certificados con irregularidades. Esta guía te enseña a identificar
          las 5 señales de alerta más comunes en 10 minutos, sin conocimientos
          técnicos.
        </p>
        <ul className={styles.heroBenefits}>
          <li>✅ 5 pasos para detectar un certificado falso o mal hecho</li>
          <li>✅ Diferencias entre errores inocentes y fraudes reales</li>
          <li>✅ Qué hacer si has comprado una vivienda con certificado fraudulento</li>
          <li>✅ Plantilla de reclamación para exigir una rectificación</li>
        </ul>
      </header>

      <LandingLeadForm
        leadMagnet="guia-detecta-falso-ce"
        utmCampaign="guia-falso-ce"
      />

      <section className={styles.landingPreview}>
        <h2>Qué incluye la guía</h2>
        <div className={styles.previewGrid}>
          <div className={styles.previewCard}>
            <span className={styles.previewNum}>1</span>
            <h3>Identifica al técnico</h3>
            <p>
              Cómo verificar si el técnico que firmó el certificado está
              colegiado y habilitado para certificar en tu comunidad autónoma.
            </p>
          </div>
          <div className={styles.previewCard}>
            <span className={styles.previewNum}>2</span>
            <h3>Comprueba los datos del inmueble</h3>
            <p>
              Errores en dirección, superficie o año de construcción son la
              bandera roja más frecuente en certificados falsificados.
            </p>
          </div>
          <div className={styles.previewCard}>
            <span className={styles.previewNum}>3</span>
            <h3>Analiza la calificación</h3>
            <p>
              Una A o B en una vivienda sin reformas es sospechosa. Te
              explicamos qué calificaciones son realistas según el tipo de
              inmueble.
            </p>
          </div>
          <div className={styles.previewCard}>
            <span className={styles.previewNum}>4</span>
            <h3>Detecta mejoras irreales</h3>
            <p>
              Paneles solares, calderas de biomasa o aislamientos que no
              existen en tu vivienda: cómo identificarlos en la documentación.
            </p>
          </div>
          <div className={styles.previewCard}>
            <span className={styles.previewNum}>5</span>
            <h3>Actúa y reclama</h3>
            <p>
              Pasos concretos para denunciar un certificado fraudulento ante
              el colegio profesional y el organismo competente de tu región.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.landingFaq}>
        <h2>Preguntas frecuentes</h2>
        <div className={styles.faqItem}>
          <h3>¿La guía tiene coste?</h3>
          <p>
            No, es completamente gratuita. Solo necesitas tu email para que te
            la enviemos.
          </p>
        </div>
        <div className={styles.faqItem}>
          <h3>¿Válida para toda España?</h3>
          <p>
            Sí, los 5 pasos aplican a cualquier comunidad autónoma. Incluye
            referencias a los registros oficiales de cada región.
          </p>
        </div>
        <div className={styles.faqItem}>
          <h3>¿Recibiré más correos?</h3>
          <p>
            Solo te enviaremos la guía y, si nos das permiso, algún contenido
            útil sobre certificación energética. Puedes darte de baja en un
            clic.
          </p>
        </div>
      </section>
    </>
  );
}
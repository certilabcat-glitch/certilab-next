"use client";

import { useEffect } from "react";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import { waDiagnostico } from "@/lib/wa";
import { trackViewContent, trackContact } from "@/lib/meta-pixel";
import styles from "./page.module.css";

export default function AyudasEficienciaPage() {
  useEffect(() => {
    trackViewContent({
      content_name: "ayudas-eficiencia-energetica",
      content_category: "guia-educativa",
      content_type: "article",
    });
  }, []);

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline:
                "Ayudas para la Eficiencia Energética en Viviendas — Guía 2026",
              description:
                "Guía informativa sobre ayudas disponibles para mejorar la eficiencia energética de viviendas: fondos Next Generation, CAE, deducciones IRPF y subvenciones autonómicas.",
              author: {
                "@type": "Person",
                name: "Eva María González García",
                jobTitle: "Arquitecta Técnica",
                memberOf: { "@type": "Organization", name: "Cateb" },
              },
              publisher: {
                "@type": "ProfessionalService",
                name: "Certilab",
              },
              datePublished: "2026-05-02",
              dateModified: "2026-05-02",
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Inicio",
                  item: "https://www.certilab.cat/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Ayudas Eficiencia Energética",
                  item: "https://www.certilab.cat/ayudas-eficiencia-energetica/",
                },
              ],
            },
          ]),
        }}
      />

      {/* S1: HERO */}
      <header className={styles.hero}>
        <div className={styles.heroEyebrow}>Guía informativa · Actualizada a mayo 2026</div>
        <h1 className={styles.heroTitle}>
          Ayudas para la<br />
          <span className={styles.heroTitleLight}>Eficiencia Energética</span>
        </h1>
        <p className={styles.heroSub}>
          Fondos Next Generation, CAE, deducciones IRPF y subvenciones autonómicas. Descubre
          qué ayudas aplican a tu vivienda y cómo solicitar tu plan de mejora profesional con
          Certilab.
        </p>
        <div className={styles.heroCredentials}>
          <span>Cateb 9457</span> <span className={styles.dot}>·</span>
          <span>Información contrastada</span> <span className={styles.dot}>·</span>
          <span>Sin intermediación</span>
        </div>
        <div className={styles.heroCtas}>
          <a
            href={waDiagnostico()}
            className={styles.btnPrimary}
            onClick={() => trackContact({ content_name: "ayudas-whatsapp-cta" })}
          >
            Solicitar diagnóstico gratuito
          </a>
          <Link href="/blog/detectar-certificado-energetico-falso/" className={styles.btnSecondary}>
            Saber más
          </Link>
        </div>
      </header>

      {/* S2: PANORAMA */}
      <section className={styles.section} aria-labelledby="panorama-title">
        <h2 id="panorama-title" className={styles.sectionTitle}>
          ¿Qué ayudas están vigentes en 2026?
        </h2>
        <p className={styles.sectionSub}>
          Cuatro líneas principales de financiación para mejorar la eficiencia energética
        </p>

        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <p className={styles.featureNum}>I</p>
            <h4>Fondos Next Generation EU</h4>
            <p>
              El Plan de Recuperación sigue financiando actuaciones de rehabilitación energética
              en viviendas y edificios. Subvenciones de hasta el 80% del coste subvencionable
              para comunidades de propietarios y del 40% para viviendas unifamiliares.
            </p>
          </div>
          <div className={styles.feature}>
            <p className={styles.featureNum}>II</p>
            <h4>Sistema CAE</h4>
            <p>
              Certificados de Ahorro Energético: un sistema de incentivo económico donde el
              ahorro certificado se convierte en un activo que las comercializadoras de energía
              compran. Para actuaciones de climatización, iluminación, envolvente y movilidad.
            </p>
          </div>
          <div className={styles.feature}>
            <p className={styles.featureNum}>III</p>
            <h4>Deducciones IRPF</h4>
            <p>
              Hasta el 60% de deducción en el IRPF por obras de mejora energética en vivienda
              habitual: 20% si reduces un 7% la demanda energética, 40% si reduces un 30% el
              consumo de energía no renovable, y 60% si tu edificio reduce un 30% el consumo de
              energía no renovable.
            </p>
          </div>
          <div className={styles.feature}>
            <p className={styles.featureNum}>IV</p>
            <h4>Subvenciones autonómicas</h4>
            <p>
              Cada Comunidad Autónoma publica convocatorias propias de rehabilitación energética
              que pueden complementar las ayudas estatales. Cataluña, Madrid, Andalucía y País
              Vasco tienen programas activos en 2026.
            </p>
          </div>
        </div>
      </section>

      {/* S3: REQUISITOS */}
      <section className={`${styles.section} ${styles.sectionCream}`} aria-labelledby="req-title">
        <h2 id="req-title" className={styles.sectionTitle}>
          ¿Qué necesitas para solicitar ayudas?
        </h2>
        <p className={styles.sectionSub}>Documentación y condiciones habituales</p>
        <div className={styles.reqContent}>
          <ul className={styles.includesList}>
            <li>Certificado energético antes y después de la actuación (emitido por técnico competente)</li>
            <li>Proyecto o memoria técnica de la actuación</li>
            <li>Presupuesto detallado de las obras</li>
            <li>Facturas y justificantes de pago (post-ejecución)</li>
            <li>Fotografías del antes y después</li>
            <li>Cumplir el porcentaje mínimo de mejora energética exigido por cada programa</li>
          </ul>
          <p className={styles.reqImportant}>
            <strong>Importante:</strong> Los certificados energéticos necesarios para solicitar
            ayudas deben ser emitidos por un técnico certificador con visita presencial
            obligatoria. <strong>Certilab no emite certificados energéticos oficiales.</strong>{' '}
            Nuestro{' '}
            <Link href="/informe-tecnico-energetico/">
              Informe Técnico Energético
            </Link>{' '}
            te da la hoja de ruta para saber qué ayudas aplicar, qué mejoras priorizar y qué
            documentación necesitarás, pero no sustituye al certificado oficial ni tramita la
            solicitud.
          </p>
        </div>
      </section>

      {/* S4: CÓMO TE AYUDAMOS */}
      <section className={styles.section} aria-labelledby="how-title">
        <h2 id="how-title" className={styles.sectionTitle}>
          Cómo te ayuda Certilab con las ayudas
        </h2>
        <p className={styles.sectionSub}>
          No tramitamos solicitudes, pero te preparamos para llegar con todo
        </p>
        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <p className={styles.featureNum}>I</p>
            <h4>Informe Técnico Energético — 399€</h4>
            <p>
              Incluye un mapa de ayudas aplicables a tu caso concreto, con los requisitos de
              cada una y enlaces oficiales para la solicitud. Es el documento que necesitas para
              saber exactamente qué pedir y dónde.
            </p>
            <Link href="/informe-tecnico-energetico/" className={styles.featureLink}>
              Más información →
            </Link>
          </div>
          <div className={styles.feature}>
            <p className={styles.featureNum}>II</p>
            <h4>Calculadora de ahorro — 0€</h4>
            <p>
              Estima cuánto puedes ahorrar al año mejorando tu vivienda. Un primer paso gratuito
              para ver si te compensa solicitar ayudas.
            </p>
            <Link href="/calculadoracat/" className={styles.featureLink}>
              Probar calculadora →
            </Link>
          </div>
          <div className={styles.feature}>
            <p className={styles.featureNum}>III</p>
            <h4>Diagnóstico Express — 0€</h4>
            <p>
              Cuéntanos tu caso y te orientamos sin compromiso sobre qué ayudas podrían aplicar
              a tu vivienda y qué servicio de Certilab te conviene más.
            </p>
            <Link href="/formulario/" className={styles.featureLink}>
              Solicitar →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection} aria-labelledby="faq-title">
        <h2 id="faq-title">
          Preguntas frecuentes sobre ayudas a la eficiencia energética
        </h2>

        <details>
          <summary>¿Puedo solicitar yo las ayudas sin un técnico?</summary>
          <p>
            Sí, muchas ayudas permiten que el ciudadano presente la solicitud directamente. Sin
            embargo, necesitarás documentación técnica (certificado energético, memoria técnica,
            presupuesto) que solo puede elaborar un técnico competente. Un error en la solicitud
            o en la documentación puede suponer la denegación de la ayuda. Por eso recomendamos
            contar con asesoramiento profesional desde el principio.
          </p>
        </details>

        <details>
          <summary>¿Las ayudas son compatibles entre sí?</summary>
          <p>
            Depende. Las deducciones del IRPF son generalmente compatibles con las subvenciones
            Next Generation, pero los importes de la subvención reducen la base de la deducción.
            Las ayudas autonómicas suelen ser incompatibles con las estatales para la misma
            actuación. Cada caso debe analizarse individualmente. En nuestro{' '}
            <Link href="/informe-tecnico-energetico/">Informe Técnico Energético</Link>{' '}
            analizamos la compatibilidad para tu caso concreto.
          </p>
        </details>

        <details>
          <summary>¿Cuánto tardan en conceder las ayudas?</summary>
          <p>
            El plazo varía según el programa. Las deducciones IRPF se aplican en la siguiente
            declaración de la renta. Las subvenciones Next Generation pueden tardar entre 6 y 18
            meses desde la solicitud hasta el cobro. Las ayudas autonómicas suelen resolverse en
            3-12 meses. Las CAE dependen del acuerdo con la comercializadora.
          </p>
        </details>

        <details>
          <summary>¿Qué porcentaje de la inversión cubren las ayudas?</summary>
          <p>
            Varía mucho según el programa y el tipo de actuación. Las ayudas Next Generation
            pueden cubrir entre el 40% y el 80% del coste subvencionable. Las deducciones IRPF
            llegan hasta el 60% de la inversión. Las CAE dependen del precio del ahorro
            certificado en el mercado. En general, puedes esperar recuperar entre el 20% y el
            60% de tu inversión combinando distintas ayudas.
          </p>
        </details>

        <details>
          <summary>¿Necesito el certificado energético antes de pedir la ayuda?</summary>
          <p>
            Sí. Para la mayoría de ayudas necesitas un certificado energético previo a la
            actuación (que acredite la situación de partida) y otro posterior (que demuestre la
            mejora conseguida). Ambos deben ser emitidos por un técnico certificador con visita
            presencial.{' '}
            <strong>Certilab no emite estos certificados oficiales</strong>, pero nuestro
            Informe Técnico te prepara para llegar al técnico certificador con todo el análisis
            previo hecho, ahorrándote tiempo y dinero.
          </p>
        </details>
      </section>

      <CTASection
        title="¿Quieres saber qué ayudas aplican a tu vivienda?"
        text="Solicita un diagnóstico gratuito y te orientamos sin compromiso."
        buttonText="Consultar gratis"
        buttonHref={waDiagnostico()}
      />

      <TrustBlockSection />
    </>
  );
}
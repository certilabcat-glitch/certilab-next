"use client";

import { useEffect } from "react";
import Link from "next/link";
import { trackViewContent } from "@/lib/meta-pixel";
import styles from "./page.module.css";

export default function AyudasEficienciaPage() {
  useEffect(() => {
    trackViewContent({
      content_name: "ayudas-eficiencia-energetica",
      content_category: "guia-informativa",
      content_type: "article",
    });
  }, []);

  return (
    <>
      {/* Schema.org JSON-LD — Article + FAQPage + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline:
                "Ayudas y Subvenciones para la Eficiencia Energética 2026",
              description:
                "Toda la información sobre ayudas energéticas: Next Generation, CAE, deducciones IRPF y subvenciones autonómicas. Cuánto cubren, requisitos y cómo solicitarlas sin errores.",
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
              dateModified: "2026-06-22",
              image: "https://www.certilab.cat/og-image.jpg",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "¿Qué ayudas para eficiencia energética están vigentes en 2026?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Las cuatro líneas principales son: Fondos Next Generation EU (hasta 80% del coste), Sistema CAE (Certificados de Ahorro Energético), deducciones IRPF (hasta 60%) y subvenciones autonómicas. Cada una tiene requisitos y plazos distintos."
                  }
                },
                {
                  "@type": "Question",
                  name: "¿Puedo solicitar las ayudas sin un técnico?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sí, puedes presentar la solicitud tú mismo. Pero necesitarás documentación técnica como el certificado energético y una memoria técnica, que solo puede elaborar un técnico competente. Un error en la solicitud puede provocar la denegación."
                  }
                },
                {
                  "@type": "Question",
                  name: "¿Las ayudas son compatibles entre sí?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Las deducciones del IRPF son compatibles con las subvenciones Next Generation, pero el importe de la subvención reduce la base de la deducción. Las ayudas autonómicas suelen ser incompatibles con las estatales para la misma actuación."
                  }
                },
                {
                  "@type": "Question",
                  name: "¿Cuánto tardan en conceder las ayudas?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Varía según el programa: las deducciones IRPF se aplican en la siguiente declaración, las Next Generation pueden tardar 6-18 meses, las autonómicas 3-12 meses y las CAE dependen del acuerdo con la comercializadora."
                  }
                },
                {
                  "@type": "Question",
                  name: "¿Necesito el certificado energético antes de pedir la ayuda?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sí. Para la mayoría de ayudas necesitas un certificado energético previo (situación de partida) y otro posterior (mejora conseguida). Ambos deben emitirlos un técnico certificador con visita presencial."
                  }
                },
                {
                  "@type": "Question",
                  name: "¿Qué porcentaje de la inversión cubren las ayudas?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Las Next Generation cubren entre el 40% y el 80%, las deducciones IRPF llegan hasta el 60%, y las CAE dependen del mercado. Combinando ayudas puedes recuperar entre el 20% y el 60% de tu inversión."
                  }
                }
              ]
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

      {/* S1: INTRO */}
      <header className={styles.hero}>
        <div className={styles.heroEyebrow}>Guía actualizada · Junio 2026</div>
        <h1 className={styles.heroTitle}>
          Ayudas y Subvenciones para la<br />
          <span className={styles.heroTitleLight}>Eficiencia Energética 2026</span>
        </h1>
        <p className={styles.heroSub}>
          Fondos Next Generation, CAE, deducciones IRPF y subvenciones autonómicas. Te explicamos qué ayudas existen, cuánto cubren y cómo solicitarlas sin perder dinero por el camino.
        </p>
        <div className={styles.heroCredentials}>
          <span>Cateb 9457</span> <span className={styles.dot}>·</span>
          <span>Información actualizada</span> <span className={styles.dot}>·</span>
          <span>Sin intermediación</span>
        </div>
      </header>

      {/* S2: PANORAMA DE AYUDAS */}
      <section className={styles.section} aria-labelledby="panorama-title">
        <h2 id="panorama-title" className={styles.sectionTitle}>
          ¿Qué ayudas están disponibles en 2026?
        </h2>
        <p className={styles.sectionSub}>
          Cuatro líneas principales de financiación para reformar tu vivienda
        </p>

        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <p className={styles.featureNum}>I</p>
            <h3>Fondos Next Generation EU</h3>
            <p>
              El Plan de Recuperación financia actuaciones de rehabilitación energética en viviendas y edificios. Las subvenciones alcanzan hasta el 80% del coste para comunidades de propietarios y el 40% para viviendas unifamiliares.
            </p>
          </div>
          <div className={styles.feature}>
            <p className={styles.featureNum}>II</p>
            <h3>Sistema CAE</h3>
            <p>
              Los Certificados de Ahorro Energético convierten el ahorro certificado en un activo que las comercializadoras compran. Válido para climatización, iluminación, envolvente y movilidad.
            </p>
          </div>
          <div className={styles.feature}>
            <p className={styles.featureNum}>III</p>
            <h3>Deducciones IRPF</h3>
            <p>
              Hasta el 60% de deducción por obras de mejora energética: 20% si reduces un 7% la demanda, 40% si reduces un 30% el consumo no renovable, y 60% si el edificio reduce un 30% el consumo no renovable.
            </p>
          </div>
          <div className={styles.feature}>
            <p className={styles.featureNum}>IV</p>
            <h3>Subvenciones autonómicas</h3>
            <p>
              Cada Comunidad Autónoma publica convocatorias propias que complementan las ayudas estatales. Cataluña, Madrid, Andalucía y País Vasco tienen programas activos en 2026.
            </p>
          </div>
        </div>
      </section>

      {/* S3: REQUISITOS */}
      <section className={`${styles.section} ${styles.sectionCream}`} aria-labelledby="req-title">
        <h2 id="req-title" className={styles.sectionTitle}>
          ¿Qué necesitas para solicitar las ayudas?
        </h2>
        <p className={styles.sectionSub}>Documentación y condiciones que exigen los programas</p>
        <div className={styles.reqContent}>
          <ul className={styles.includesList}>
            <li>Certificado energético antes y después de la actuación (emitido por técnico competente con visita presencial)</li>
            <li>Proyecto o memoria técnica de la actuación</li>
            <li>Presupuesto detallado de las obras</li>
            <li>Facturas y justificantes de pago</li>
            <li>Fotografías del antes y después</li>
            <li>Cumplir el porcentaje mínimo de mejora exigido por cada programa</li>
          </ul>
        </div>
      </section>

      {/* S4: PROBLEMA — CERTIFICADOS INFLADOS */}
      <section className={styles.section} aria-labelledby="problema-title">
        <h2 id="problema-title" className={styles.sectionTitle}>
          El problema: certificados que no reflejan la realidad
        </h2>
        <p className={styles.sectionSub}>
          Una mala certificación puede dejarte sin ayudas o hacerte perder dinero
        </p>
        <div className={styles.problemaContent}>
          <p>
            Para solicitar cualquier ayuda necesitas un certificado energético fiable. Pero no todos lo son. Según el <strong>RD 390/2021</strong>, el certificado debe reflejar el consumo real del inmueble. Sin embargo, muchos técnicos inflan la calificación para complacer al vendedor.
          </p>
          <p>
            <strong>Un certificado inflado tiene consecuencias directas:</strong> si tu certificado dice que tu vivienda es una B pero en realidad es una E, las ayudas que solicites no cubrirán las mejoras necesarias. Y si ya has comprado pensando que la vivienda era eficiente, puedes estar pagando hasta un 15% más de lo que vale.
          </p>
          <p>
            Por eso, antes de solicitar cualquier ayuda, conviene asegurarse de que tu certificado energético es correcto. Una <Link href="/segunda-opinion/">Segunda Opinión</Link> te permite detectar errores o inflados antes de tomar decisiones económicas.
          </p>
        </div>
      </section>

      {/* S5: CÓMO ASEGURARTE */}
      <section className={`${styles.section} ${styles.sectionCream}`} aria-labelledby="como-title">
        <h2 id="como-title" className={styles.sectionTitle}>
          Cómo asegurarte de que tu certificado es correcto
        </h2>
        <p className={styles.sectionSub}>
          Dos formas de verificar tu certificado antes de pedir ayudas
        </p>

        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <p className={styles.featureNum}>Opción 1</p>
            <h3>Segunda Opinión — 59€</h3>
            <p>
              Revisamos tu certificado energético al detalle. Detectamos errores, calificaciones infladas y discrepancias. Recibes un informe claro con las conclusiones. Entrega en 24 horas laborables.
            </p>
            <Link href="/segunda-opinion/" className={styles.featureLink}>
              Quiero revisar mi certificado →
            </Link>
          </div>
          <div className={styles.feature}>
            <p className={styles.featureNum}>Opción 2</p>
            <h3>Segunda Opinión Express — 79€</h3>
            <p>
              El mismo análisis riguroso pero con entrega en 4 horas. Para cuando necesitas una respuesta urgente porque estás a punto de firmar o se acerca el plazo de una ayuda.
            </p>
            <Link href="/segunda-opinion-express/" className={styles.featureLink}>
              Lo necesito urgente →
            </Link>
          </div>
        </div>

        <div className={styles.centeredCta}>
          <p className={styles.ctaNote}>
            Si ya tienes el certificado energético, podemos decirte si es fiable en cuestión de horas. No esperes a que te denieguen una ayuda por un error que podrías haber corregido antes.
          </p>
        </div>
      </section>

      {/* S6: ENLACES ÚTILES */}
      <section className={styles.section} aria-labelledby="enlaces-title">
        <h2 id="enlaces-title" className={styles.sectionTitle}>
          Más información sobre certificados y ayudas
        </h2>
        <p className={styles.sectionSub}>
          Artículos que te ayudarán a tomar mejores decisiones
        </p>
        <ul className={styles.linksList}>
          <li>
            <Link href="/blog/certificado-energetico-inflado/">
              Cómo detectar un certificado energético inflado →
            </Link>
            <span className={styles.linkDesc}>Señales de alerta y qué hacer si tu certificado no es realista.</span>
          </li>
          <li>
            <Link href="/blog/certificado-energetico-f-g-correcto-o-error/">
              ¿Una F o G puede ser correcta? →
            </Link>
            <span className={styles.linkDesc}>No todas las calificaciones bajas son errores. Te explicamos cuándo es normal.</span>
          </li>
          <li>
            <Link href="/blog/reclamar-certificado-energetico-incorrecto/">
              Cómo reclamar un certificado energético erróneo →
            </Link>
            <span className={styles.linkDesc}>Pasos legales para reclamar si tu certificado tiene errores.</span>
          </li>
          <li>
            <Link href="/segunda-opinion/">
              Segunda Opinión del Certificado Energético →
            </Link>
            <span className={styles.linkDesc}>Nuestro servicio estrella para verificar la fiabilidad de tu certificado.</span>
          </li>
        </ul>
      </section>

      {/* S7: FAQ */}
      <section className={styles.faqSection} aria-labelledby="faq-title">
        <h2 id="faq-title">
          Preguntas frecuentes sobre ayudas y eficiencia energética
        </h2>

        <details>
          <summary>¿Puedo solicitar yo las ayudas sin un técnico?</summary>
          <p>
            Sí, muchas ayudas permiten que el ciudadano presente la solicitud directamente. Sin embargo, necesitarás documentación técnica (certificado energético, memoria técnica, presupuesto) que solo puede elaborar un técnico competente. Un error en la solicitud puede suponer la denegación de la ayuda.
          </p>
        </details>

        <details>
          <summary>¿Las ayudas son compatibles entre sí?</summary>
          <p>
            Depende. Las deducciones del IRPF son compatibles con las subvenciones Next Generation, pero los importes de la subvención reducen la base de la deducción. Las ayudas autonómicas suelen ser incompatibles con las estatales para la misma actuación. Cada caso debe analizarse individualmente.
          </p>
        </details>

        <details>
          <summary>¿Cuánto tardan en conceder las ayudas?</summary>
          <p>
            El plazo varía según el programa. Las deducciones IRPF se aplican en la siguiente declaración de la renta. Las subvenciones Next Generation pueden tardar entre 6 y 18 meses desde la solicitud hasta el cobro. Las ayudas autonómicas suelen resolverse en 3-12 meses.
          </p>
        </details>

        <details>
          <summary>¿Qué porcentaje de la inversión cubren las ayudas?</summary>
          <p>
            Varía según el programa. Las Next Generation cubren entre el 40% y el 80% del coste subvencionable. Las deducciones IRPF llegan hasta el 60% de la inversión. Las CAE dependen del mercado. Combinando ayudas puedes recuperar entre el 20% y el 60% de tu inversión.
          </p>
        </details>

        <details>
          <summary>¿Necesito el certificado energético antes de pedir la ayuda?</summary>
          <p>
            Sí. Para la mayoría necesitas un certificado previo (que acredite la situación de partida) y otro posterior (que demuestre la mejora). Ambos deben emitirlos un técnico certificador con visita presencial. Si tu certificado tiene errores, las ayudas podrían no cubrir lo necesario.
          </p>
        </details>

        <details>
          <summary>¿Cómo sé si mi certificado energético es fiable?</summary>
          <p>
            La mejor forma es pedir una <Link href="/segunda-opinion/">Segunda Opinión</Link>. Revisamos la calificación, los datos del técnico, el método de cálculo y la coherencia con las características del inmueble. Si hay errores, te los detectamos antes de que solicites ninguna ayuda.
          </p>
        </details>
      </section>

      {/* S8: CTA FINAL */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBlock}>
          <h2 className={styles.ctaTitle}>
            ¿Ya tienes el certificado energético?
          </h2>
          <p className={styles.ctaText}>
            Antes de pedir cualquier ayuda, asegúrate de que tu certificado es correcto. Una Segunda Opinión te cuesta 59€ y te evita problemas con las subvenciones.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/segunda-opinion/" className={styles.btnPrimary}>
              Revisar mi certificado — 59€
            </Link>
            <Link href="/segunda-opinion-express/" className={styles.btnSecondary}>
              Lo necesito urgente — 79€
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
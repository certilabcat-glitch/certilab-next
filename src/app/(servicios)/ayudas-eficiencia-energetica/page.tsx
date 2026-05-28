"use client";

import { useEffect } from "react";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import { waDiagnostico } from "@/lib/wa";
import { trackViewContent, trackContact } from "@/lib/meta-pixel";

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
                name: "Eva María González Gracia",
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
      <header className="hero">
        <div className="hero-eyebrow">Guía informativa · Actualizada a mayo 2026</div>
        <h1 className="hero-title">
          Ayudas para la<br />
          <span className="hero-title-light">Eficiencia Energética</span>
        </h1>
        <p className="hero-sub">
          Fondos Next Generation, CAE, deducciones IRPF y subvenciones autonómicas. Descubre
          qué ayudas aplican a tu vivienda y cómo solicitar tu plan de mejora profesional con
          Certilab.
        </p>
        <div className="hero-credentials">
          <span>Cateb 9457</span> <span className="dot">·</span>
          <span>Información contrastada</span> <span className="dot">·</span>
          <span>Sin intermediación</span>
        </div>
        <div className="hero-ctas">
          <a
            href={waDiagnostico()}
            className="btn-primary"
            onClick={() => trackContact({ content_name: "ayudas-whatsapp-cta" })}
          >
            Solicitar diagnóstico gratuito
          </a>
          <Link href="/por-que-no-emite-ce/" className="btn-secondary">
            Saber más
          </Link>
        </div>
      </header>

      {/* S2: PANORAMA */}
      <section className="section" aria-labelledby="panorama-title">
        <h2 id="panorama-title" className="section-title">
          ¿Qué ayudas están vigentes en 2026?
        </h2>
        <p className="section-sub">
          Cuatro líneas principales de financiación para mejorar la eficiencia energética
        </p>

        <div className="features-grid">
          <div className="feature">
            <p className="feature-num">I</p>
            <h4>Fondos Next Generation EU</h4>
            <p>
              El Plan de Recuperación sigue financiando actuaciones de rehabilitación energética
              en viviendas y edificios. Subvenciones de hasta el 80% del coste subvencionable
              para comunidades de propietarios y del 40% para viviendas unifamiliares.
            </p>
          </div>
          <div className="feature">
            <p className="feature-num">II</p>
            <h4>Sistema CAE</h4>
            <p>
              Certificados de Ahorro Energético: un sistema de incentivo económico donde el
              ahorro certificado se convierte en un activo que las comercializadoras de energía
              compran. Para actuaciones de climatización, iluminación, envolvente y movilidad.
            </p>
          </div>
          <div className="feature">
            <p className="feature-num">III</p>
            <h4>Deducciones IRPF</h4>
            <p>
              Hasta el 60% de deducción en el IRPF por obras de mejora energética en vivienda
              habitual: 20% si reduces un 7% la demanda energética, 40% si reduces un 30% el
              consumo de energía no renovable, y 60% si tu edificio reduce un 30% el consumo de
              energía no renovable.
            </p>
          </div>
          <div className="feature">
            <p className="feature-num">IV</p>
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
      <section className="section section-cream" aria-labelledby="req-title">
        <h2 id="req-title" className="section-title">
          ¿Qué necesitas para solicitar ayudas?
        </h2>
        <p className="section-sub">Documentación y condiciones habituales</p>
        <div className="req-content">
          <ul className="includes-list">
            <li>Certificado energético antes y después de la actuación (emitido por técnico competente)</li>
            <li>Proyecto o memoria técnica de la actuación</li>
            <li>Presupuesto detallado de las obras</li>
            <li>Facturas y justificantes de pago (post-ejecución)</li>
            <li>Fotografías del antes y después</li>
            <li>Cumplir el porcentaje mínimo de mejora energética exigido por cada programa</li>
          </ul>
          <p className="req-important">
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
      <section className="section" aria-labelledby="how-title">
        <h2 id="how-title" className="section-title">
          Cómo te ayuda Certilab con las ayudas
        </h2>
        <p className="section-sub">
          No tramitamos solicitudes, pero te preparamos para llegar con todo
        </p>
        <div className="features-grid">
          <div className="feature">
            <p className="feature-num">I</p>
            <h4>Informe Técnico Energético — 399€</h4>
            <p>
              Incluye un mapa de ayudas aplicables a tu caso concreto, con los requisitos de
              cada una y enlaces oficiales para la solicitud. Es el documento que necesitas para
              saber exactamente qué pedir y dónde.
            </p>
            <Link href="/informe-tecnico-energetico/" className="feature-link">
              Más información →
            </Link>
          </div>
          <div className="feature">
            <p className="feature-num">II</p>
            <h4>Calculadora de ahorro — 0€</h4>
            <p>
              Estima cuánto puedes ahorrar al año mejorando tu vivienda. Un primer paso gratuito
              para ver si te compensa solicitar ayudas.
            </p>
            <Link href="/calculadoracat/" className="feature-link">
              Probar calculadora →
            </Link>
          </div>
          <div className="feature">
            <p className="feature-num">III</p>
            <h4>Diagnóstico Express — 0€</h4>
            <p>
              Cuéntanos tu caso y te orientamos sin compromiso sobre qué ayudas podrían aplicar
              a tu vivienda y qué servicio de Certilab te conviene más.
            </p>
            <Link href="/formulario/" className="feature-link">
              Solicitar →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" aria-labelledby="faq-title">
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

      <style jsx>{`
        .hero {
          text-align: center;
          padding: 5rem 1.5rem 2rem;
          background: var(--color-crema, #faf6f0);
        }
        .hero-eyebrow {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-terra, #b46a4a);
          margin-bottom: 1.5rem;
        }
        .hero-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 300;
          color: var(--color-black);
          max-width: 700px;
          margin: 0 auto 1rem;
          line-height: 1.2;
        }
        .hero-title-light {
          font-family: var(--font-sans);
          font-weight: 300;
          font-size: clamp(1.8rem, 4vw, 3rem);
        }
        .hero-sub {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          color: var(--color-grey, #666);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .hero-credentials {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
          font-size: 0.85rem;
          color: var(--color-grey, #666);
          font-family: var(--font-sans);
          flex-wrap: wrap;
        }
        .dot {
          color: var(--color-terra, #b46a4a);
        }
        .hero-ctas {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
          flex-wrap: wrap;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          padding: 0.85rem 2rem;
          border-radius: 2rem;
          border: none;
          background: var(--color-black);
          color: var(--color-white);
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.2s;
          cursor: pointer;
        }
        .btn-primary:hover {
          opacity: 0.85;
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          padding: 0.85rem 2rem;
          border-radius: 2rem;
          border: 1px solid var(--color-border, #ddd);
          background: transparent;
          color: var(--color-black);
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          transition: border-color 0.2s;
          cursor: pointer;
        }
        .btn-secondary:hover {
          border-color: var(--color-black);
        }
        .section {
          max-width: 900px;
          margin: 0 auto;
          padding: 4rem 1.5rem;
        }
        .section-cream {
          background: var(--color-crema, #faf6f0);
          max-width: 100%;
          padding: 4rem 1.5rem;
        }
        .section-cream .section-title,
        .section-cream .section-sub,
        .section-cream .req-content {
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        .section-title {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          font-weight: 400;
          color: var(--color-black);
          text-align: center;
          margin-bottom: 0.75rem;
        }
        .section-sub {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-grey, #666);
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        .feature {
          padding: 1.5rem;
        }
        .feature-num {
          font-family: var(--font-serif);
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-terra, #b46a4a);
          margin-bottom: 0.5rem;
        }
        .feature h4 {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 0.75rem;
        }
        .feature p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-dark, #444);
          line-height: 1.7;
        }
        .feature-link {
          display: inline-block;
          margin-top: 0.75rem;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-terra, #b46a4a);
          font-weight: 600;
          text-decoration: none;
        }
        .req-content {
          max-width: 700px;
          margin: 0 auto;
        }
        .includes-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .includes-list li {
          position: relative;
          padding-left: 1.5rem;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-dark, #444);
          line-height: 1.7;
          margin-bottom: 0.75rem;
        }
        .includes-list li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: var(--color-terra, #b46a4a);
          font-weight: bold;
        }
        .req-important {
          margin-top: 1.5rem;
          font-size: 0.9rem;
          color: var(--color-grey, #666);
          font-family: var(--font-sans);
          line-height: 1.7;
        }
        .req-important a {
          color: var(--color-terra, #b46a4a);
          text-decoration: underline;
        }
        .faq-section {
          max-width: 700px;
          margin: 0 auto;
          padding: 4rem 1.5rem;
        }
        .faq-section h2 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--color-black);
          text-align: center;
          margin-bottom: 2rem;
        }
        .faq-section details {
          border-bottom: 1px solid var(--color-border, #e5e5e5);
          padding: 1rem 0;
        }
        .faq-section summary {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--color-black);
          cursor: pointer;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .faq-section summary::-webkit-details-marker {
          display: none;
        }
        .faq-section summary::after {
          content: "+";
          font-size: 1.2rem;
          color: var(--color-terra, #b46a4a);
        }
        .faq-section details[open] summary::after {
          content: "−";
        }
        .faq-section p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-dark, #444);
          line-height: 1.7;
          margin-top: 0.75rem;
          padding-right: 1.5rem;
        }
        .faq-section a {
          color: var(--color-terra, #b46a4a);
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
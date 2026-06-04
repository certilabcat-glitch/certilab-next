"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ObrasBanner from "@/components/ui/ObrasBanner";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import StepsGrid from "@/components/sections/StepsGrid";
import ComparativaSection from "@/components/sections/ComparativaSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import TrustNumbers from "@/components/sections/TrustNumbers";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ComingSoonSection from "@/components/ui/ComingSoonSection";
import { informeTecnicoFaq } from "@/data/faq";

const features = [
  { num: "I", title: "Análisis completo", text: "Evaluación detallada del comportamiento energético del inmueble con datos reales. Sin asunciones genéricas." },
  { num: "II", title: "Mejoras priorizadas", text: "Lista de actuaciones ordenadas por impacto y retorno de la inversión. Sabrás por dónde empezar." },
  { num: "III", title: "Ahorro estimado", text: "Cálculo del ahorro económico anual con cada mejora propuesta. Con cifras reales, no estimaciones genéricas." },
  { num: "IV", title: "Ayudas y subvenciones", text: "Mapa completo de ayudas aplicables: Next Generation, CAE, IRPF, bonificaciones autonómicas y locales." },
];

const steps = [
  { title: "Solicita el estudio", text: "Contáctanos y te explicamos qué documentación necesitamos. Sin compromiso." },
  { title: "Analizamos tu vivienda", text: "Revisamos planos, facturas, instalaciones y documentación técnica. Con rigor profesional." },
  { title: "Recibes tu plan de acción", text: "Informe completo con mejoras priorizadas, ahorros calculados y ayudas aplicables a tu caso." },
];

const trustReasons = [
  {
    num: "01",
    title: "Análisis humano, no automático",
    text: "Cada informe lo elabora personalmente una arquitecta técnica colegiada. Sin IA, sin automatismos, con criterio profesional.",
  },
  {
    num: "02",
    title: "Responsabilidad profesional",
    text: "Eva María González García, colegiada CATEB 9457, con seguro de responsabilidad civil. Firmamos lo que dictaminamos.",
  },
  {
    num: "03",
    title: "Plan de acción real",
    text: "No te damos un tocho técnico. Te entregamos un plan priorizado con ahorros reales y ayudas concretas para tu caso.",
  },
  {
    num: "04",
    title: "Seguimiento personalizado",
    text: "Resolveremos todas tus dudas después de la entrega. No desaparecemos al cobrar.",
  },
];

export default function InformeTecnicoContent() {
  return (
    <div className="page-wrapper">
      <ObrasBanner />

      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Informe Técnico Energético", href: "/informe-tecnico-energetico/" },
        ]}
      />

      <HeroSection
        eyebrow="Próximamente"
        title="Informe Técnico Energético"
        subtitle="Análisis técnico completo del comportamiento energético del inmueble. Propuestas de mejora priorizadas, estimación de ahorro y orientación sobre ayudas disponibles. Para propietarios que quieren actuar."
        badges={["Cateb 9457", "Máximo detalle", "100% remoto"]}
        price="399 €"
        ctaPrimary={{ label: "Avisarme cuando esté disponible »", href: "#coming-soon" }}
        nota="Servicio en preparación. Déjanos tu correo y te avisaremos cuando esté activo."
      >
        <p className="hero-garantia">
          <span className="hero-garantia-icon">&#9432;</span>
          Por 399€ obtienes un plan completo con mejoras, ahorros reales y ayudas aplicables. Inversión que se amortiza sola.
        </p>
      </HeroSection>

      <TrustNumbers />

      {/* AUDIENCE */}
      <section className="section audience-section">
        <h2 className="section-title">¿Estás en alguna de estas situaciones?</h2>
        <p className="section-sub">Identifícate en 2 segundos. Cada caso tiene un enfoque distinto.</p>
        <div className="audience-grid">
          <div className="audience-card">
            <div className="audience-icon">🏠</div>
            <h3>Tu casa gasta demasiado en energía</h3>
            <p>Las facturas no bajan. No sabes si el problema es el aislamiento, la caldera o las ventanas. Necesitas un diagnóstico real antes de invertir en reformas.</p>
            <a href="#coming-soon" className="audience-link">Quiero saber por dónde empezar →</a>
          </div>
          <div className="audience-card">
            <div className="audience-icon">💰</div>
            <h3>Quieres reformar pero no sabes por dónde</h3>
            <p>Sabes que necesitas mejorar tu vivienda pero no sabes qué actuaciones dan más resultado. Invertir sin un plan es tirar el dinero.</p>
            <a href="#coming-soon" className="audience-link">Quiero priorizar mi inversión →</a>
          </div>
          <div className="audience-card">
            <div className="audience-icon">📋</div>
            <h3>Necesitas ayudas pero te pierdes en el papeleo</h3>
            <p>Next Generation, CAE, IRPF, subvenciones autonómicas… Sabes que existen pero no cuáles te corresponden ni cómo solicitarlas.</p>
            <a href="#coming-soon" className="audience-link">Quiero saber qué ayudas me tocan →</a>
          </div>
        </div>
      </section>

      {/* ROI CONTRAST */}
      <section className="section roi-contrast-section">
        <h2 className="section-title">399€ de inversión vs. miles de euros de ahorro</h2>
        <p className="section-sub">Esto es lo que te juegas si reformas sin un diagnóstico real.</p>
        <div className="roi-contrast-grid">
          <div className="roi-contrast-card bad">
            <div className="roi-contrast-label">Sin informe técnico</div>
            <div className="roi-contrast-amount">Hasta 15.000€</div>
            <div className="roi-contrast-desc">en reformas sin priorizar. Puedes gastar en lo menos eficiente.</div>
            <ul className="roi-contrast-list">
              <li>✗ Reformas sin orden de prioridad</li>
              <li>✗ Ayudas que caducan sin solicitar</li>
              <li>✗ Ahorro real desconocido</li>
            </ul>
          </div>
          <div className="roi-contrast-divider">
            <span className="roi-contrast-vs">VS</span>
          </div>
          <div className="roi-contrast-card good">
            <div className="roi-contrast-label">Con Informe Técnico</div>
            <div className="roi-contrast-amount">399€</div>
            <div className="roi-contrast-desc">inversión única. Recuperable con la primera ayuda o ahorro.</div>
            <ul className="roi-contrast-list">
              <li>✓ Mejoras priorizadas por impacto</li>
              <li>✓ Ayudas y subvenciones identificadas</li>
              <li>✓ Ahorro económico real estimado</li>
            </ul>
          </div>
        </div>
        <div className="roi-contrast-cta">
          <a href="#coming-soon" className="roi-contrast-button">Planificar mi reforma con cabeza →</a>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section problem-section">
        <h2 className="section-title">¿Por qué necesitas un Informe Técnico Energético?</h2>
        <p className="section-sub">Reformar sin diagnóstico previo es la mayor fuente de sobrecoste en eficiencia energética.</p>
        <div className="problem-grid">
          <div className="problem-card">
            <h3>El 70% de las reformas no prioriza bien</h3>
            <p>Cambiar ventanas cuando el problema es el aislamiento de fachada. Poner una caldera nueva cuando el verdadero ahorro está en la envolvente. Sin diagnóstico, el dinero se pierde en actuaciones equivocadas.</p>
          </div>
          <div className="problem-card">
            <h3>Ayudas que caducan sin aprovechar</h3>
            <p>Los fondos Next Generation, las deducciones del IRPF y las subvenciones autonómicas tienen plazos y requisitos. Cada año caducan ayudas que miles de propietarios podrían haber solicitado con un buen informe técnico.</p>
          </div>
          <div className="problem-card">
            <h3>Sin datos, cualquier reforma es una apuesta</h3>
            <p>Invertir en eficiencia sin saber el estado real de tu vivienda es como reformar a ciegas. El informe técnico te da los datos objetivos para decidir con criterio.</p>
          </div>
        </div>
        <div className="problem-cta">
          <a href="#coming-soon" className="problem-cta-button">Quiero reformar con datos, no a ciegas →</a>
        </div>
      </section>

      {/* COMPARATIVA */}
      <ComparativaSection
        title="Autodiagnóstico vs. Informe Técnico Certilab"
        subtitle="No todos los análisis son iguales. Mira lo que obtienes con cada uno."
        cols={[
          {
            label: "Autodiagnóstico online (gratis)",
            items: [
              "Preguntas genéricas sobre tu vivienda",
              "Sin visita ni documentación real",
              "Cálculos estimados con datos estadísticos",
              "Sin ayudas personalizadas",
              "Recomendaciones estándar",
            ],
          },
          {
            label: "Informe Técnico Certilab (399€)",
            items: [
              "Análisis basado en documentación real de tu vivienda",
              "Revisado por arquitecta técnica colegiada CATEB 9457",
              "Cálculos precisos con tus datos reales",
              "Mapa de ayudas aplicables a tu caso concreto",
              "Plan de mejora priorizado por coste-beneficio",
            ],
            destacado: true,
          },
        ]}
      />

      <FeaturesGrid features={features} />
      <StepsGrid steps={steps} />

      {/* INCLUDES */}
      <section className="section includes-section">
        <h2 className="section-title">¿Qué incluye por 399€?</h2>
        <p className="section-sub">Todo lo que necesitas para tomar decisiones informadas sobre tu vivienda.</p>
        <div className="includes-box">
          <ul className="includes-grid">
            {[
              "Informe técnico detallado del comportamiento energético",
              "Plan de mejora priorizado por coste-beneficio",
              "Cálculo de ahorro económico anual estimado",
              "Mapa de ayudas y subvenciones aplicables",
              "Recomendaciones personalizadas por instalación",
              "Seguimiento personalizado post-entrega",
            ].map((item, i) => (
              <li key={i} className="includes-item">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* PREVIEW */}
      <section className="section preview-section">
        <h2 className="section-title">Así es tu informe técnico</h2>
        <p className="section-sub">Un documento claro, profesional y listo para presentar donde lo necesites.</p>
        <div className="preview-grid">
          <div className="preview-card">
            <div className="preview-card-header">
              <span className="preview-badge">Diagnóstico</span>
            </div>
            <div className="preview-card-body">
              <div className="preview-line preview-line-lg" />
              <div className="preview-line" />
              <div className="preview-line preview-line-md" />
              <div className="preview-line" />
              <div className="preview-line preview-line-sm" />
            </div>
          </div>
          <div className="preview-card">
            <div className="preview-card-header">
              <span className="preview-badge">Mejoras</span>
            </div>
            <div className="preview-card-body">
              <div className="preview-line" />
              <div className="preview-line preview-line-lg" />
              <div className="preview-line" />
              <div className="preview-line preview-line-md" />
              <div className="preview-line preview-line-sm" />
            </div>
          </div>
          <div className="preview-card">
            <div className="preview-card-header">
              <span className="preview-badge">Ayudas</span>
            </div>
            <div className="preview-card-body">
              <div className="preview-line preview-line-lg" />
              <div className="preview-line" />
              <div className="preview-line preview-line-md" />
              <div className="preview-line" />
              <div className="preview-line" />
            </div>
          </div>
        </div>
        <p className="preview-note">
          <span className="preview-note-icon">📄</span>
          Informe real firmado por arquitecta técnica colegiada. Con respaldo profesional y seguro de responsabilidad civil. Recibirás un PDF listo para descargar e imprimir.
        </p>
      </section>

      {/* TRUST REASONS */}
      <section className="section trust-reasons-section">
        <h2 className="section-title">¿Por qué confiar tu informe técnico a Certilab?</h2>
        <p className="section-sub">No somos un comparador ni un generador automático. Somos profesionales colegiados.</p>
        <div className="trust-reasons-grid">
          {trustReasons.map((r, i) => (
            <div className="trust-reason-card" key={i}>
              <div className="trust-reason-num">{r.num}</div>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <TestimonialsSection />

      <FAQSection items={informeTecnicoFaq} title="Preguntas frecuentes sobre el Informe Técnico Energético" />

      <CTASection
        title="¿Quieres mejorar la eficiencia de tu vivienda?"
        text="Por 399€ obtienes un plan completo con mejoras, ahorros y ayudas. Inversión que se amortiza sola. Déjanos tu correo y te avisaremos cuando esté disponible."
        buttonText="Quiero que me avisen →"
        buttonHref="#coming-soon"
      />

      <TrustBlockSection />

      <ComingSoonSection
        serviceName="Informe Técnico Energético (399€)"
        serviceUrl="https://www.certilab.cat/informe-tecnico-energetico/"
      />

      {/* STICKY CTA BAR */}
      <div className="sticky-cta-bar">
        <div className="sticky-cta-inner">
          <div className="sticky-cta-info">
            <span className="sticky-cta-price">399€</span>
            <span className="sticky-cta-meta">Entrega en 5-7 días · Sin sorpresas</span>
          </div>
          <div className="sticky-cta-actions">
            <a href="#coming-soon" className="sticky-cta-button">
              Avisarme
            </a>
          </div>
        </div>
        <p className="sticky-cta-micro">Servicio en preparación · Sin compromiso</p>
      </div>

      <style jsx>{`
        .page-wrapper {
          overflow-x: hidden;
          width: 100%;
        }
        .section {
          padding: 5rem 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .section-title {
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 400;
          color: var(--color-black);
          text-align: center;
          margin-bottom: 0.75rem;
        }
        .section-sub {
          text-align: center;
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--color-grey);
          max-width: 550px;
          margin: 0 auto 3rem;
          line-height: 1.7;
        }
        .hero-garantia {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-black);
          margin-top: 1.5rem;
          padding: 0.75rem 1.5rem;
          border: 1px solid var(--color-terra);
          background: rgba(196, 168, 130, 0.08);
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        }
        .hero-garantia-icon {
          font-size: 1rem;
          color: var(--color-terra);
          flex-shrink: 0;
        }

        /* AUDIENCE */
        .audience-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .audience-card {
          background: #fff;
          border: 1px solid var(--color-border);
          padding: 2rem 1.75rem;
          text-align: left;
          transition: box-shadow 0.2s;
        }
        .audience-card:hover {
          box-shadow: var(--shadow-card-hover);
        }
        .audience-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .audience-card h3 {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 0.75rem;
        }
        .audience-card p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          line-height: 1.65;
          margin-bottom: 1.25rem;
        }
        .audience-link {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-terra);
          text-decoration: none;
        }
        .audience-link:hover {
          text-decoration: underline;
        }

        /* ROI CONTRAST */
        .roi-contrast-section {
          max-width: 100%;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          background: var(--color-crema);
        }
        .roi-contrast-section .section-title,
        .roi-contrast-section .section-sub {
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }
        .roi-contrast-grid {
          display: flex;
          align-items: stretch;
          gap: 0;
          max-width: 750px;
          margin: 0 auto;
          border: 1px solid var(--color-border);
          background: #fff;
        }
        .roi-contrast-card {
          flex: 1;
          padding: 2rem;
        }
        .roi-contrast-card.bad {
          border-right: 1px solid var(--color-border);
        }
        .roi-contrast-label {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-grey);
          margin-bottom: 0.5rem;
        }
        .roi-contrast-amount {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 500;
          color: var(--color-black);
          margin-bottom: 0.5rem;
        }
        .roi-contrast-card.good .roi-contrast-amount {
          color: #2e7d32;
        }
        .roi-contrast-desc {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        .roi-contrast-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .roi-contrast-list li {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          line-height: 1.6;
          padding: 0.25rem 0;
        }
        .roi-contrast-divider {
          display: none;
        }
        .roi-contrast-vs {
          display: none;
        }
        .roi-contrast-cta {
          text-align: center;
          margin-top: 2rem;
        }
        .roi-contrast-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-black);
          color: #fff;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 500;
          text-decoration: none;
          padding: 0.85rem 2rem;
          border-radius: 6px;
          transition: background 0.2s;
        }
        .roi-contrast-button:hover {
          background: #333;
        }

        /* PROBLEM */
        .problem-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }
        .problem-card {
          border: 1px solid var(--color-border);
          padding: 2rem;
        }
        .problem-card h3 {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 0.75rem;
        }
        .problem-card p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          line-height: 1.65;
          margin: 0;
        }
        .problem-cta {
          text-align: center;
          margin-top: 2.5rem;
        }
        .problem-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-black);
          color: #fff;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 500;
          text-decoration: none;
          padding: 0.85rem 2rem;
          border-radius: 6px;
          transition: background 0.2s;
        }
        .problem-cta-button:hover {
          background: #333;
        }

        /* INCLUDES */
        .includes-section {
          background: var(--color-crema);
          max-width: 100%;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .includes-section .section-title,
        .includes-section .section-sub {
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }
        .includes-box {
          max-width: 600px;
          margin: 0 auto;
        }
        .includes-grid {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .includes-item {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-black);
          line-height: 1.5;
          padding: 0.85rem 1.25rem;
          background: #fff;
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .includes-item::before {
          content: "✓";
          color: var(--color-terra);
          font-weight: 700;
          flex-shrink: 0;
        }

        /* PREVIEW */
        .preview-section {
          max-width: 100%;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .preview-section .section-title,
        .preview-section .section-sub {
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }
        .preview-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .preview-card {
          border: 1px solid var(--color-border);
          background: #fff;
          overflow: hidden;
        }
        .preview-card-header {
          padding: 0.65rem 1rem;
          border-bottom: 1px solid var(--color-border);
          background: var(--color-crema);
        }
        .preview-badge {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-grey);
          font-weight: 600;
        }
        .preview-card-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .preview-line {
          height: 6px;
          background: #e8e4de;
          border-radius: 3px;
          width: 100%;
        }
        .preview-line-lg { width: 85%; }
        .preview-line-md { width: 65%; }
        .preview-line-sm { width: 45%; }
        .preview-note {
          text-align: center;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          margin: 2rem auto 0;
          max-width: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .preview-note-icon {
          font-size: 1.1rem;
        }

        /* TRUST REASONS */
        .trust-reasons-section {
          background: var(--color-crema);
          max-width: 100%;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .trust-reasons-section .section-title,
        .trust-reasons-section .section-sub {
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }
        .trust-reasons-section .section-sub {
          margin-bottom: 3rem;
        }
        .trust-reasons-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .trust-reason-card {
          background: #fff;
          border: 1px solid var(--color-border);
          padding: 2rem 1.5rem;
          text-align: center;
        }
        .trust-reason-num {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: var(--color-terra);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
        }
        .trust-reason-card h3 {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--color-black);
          margin-bottom: 0.65rem;
        }
        .trust-reason-card p {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          line-height: 1.6;
          margin: 0;
        }

        /* STICKY CTA */
        .sticky-cta-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #fff;
          border-top: 1px solid var(--color-border);
          padding: 0.75rem 1rem 0.5rem;
          z-index: 100;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.06);
        }
        .sticky-cta-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .sticky-cta-info {
          display: flex;
          flex-direction: column;
          line-height: 1.3;
        }
        .sticky-cta-price {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--color-black);
        }
        .sticky-cta-meta {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--color-grey);
        }
        .sticky-cta-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .sticky-cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--color-terra);
          color: #fff;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          padding: 0.7rem 1.5rem;
          border-radius: 6px;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .sticky-cta-button:hover {
          background: var(--color-terra-dark);
        }
        .sticky-cta-micro {
          text-align: center;
          font-family: var(--font-sans);
          font-size: 0.65rem;
          color: var(--color-grey);
          margin: 0.35rem 0 0;
          line-height: 1;
          opacity: 0.75;
        }

        @media (max-width: 767px) {
          .section { padding: 3rem 1.5rem; }
          .audience-grid { grid-template-columns: 1fr; }
          .roi-contrast-grid { flex-direction: column; }
          .roi-contrast-card.bad { border-right: none; border-bottom: 1px solid var(--color-border); }
          .problem-grid { grid-template-columns: 1fr; }
          .includes-grid { grid-template-columns: 1fr; }
          .preview-grid { grid-template-columns: 1fr; }
          .trust-reasons-grid { grid-template-columns: 1fr; }
          :global(body) { padding-bottom: 5.5rem; }
          .sticky-cta-bar { display: block; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .audience-grid { grid-template-columns: repeat(2, 1fr); }
          .trust-reasons-grid { grid-template-columns: repeat(2, 1fr); }
          .sticky-cta-bar { display: block; }
        }
        @media (min-width: 1024px) {
          .sticky-cta-bar { display: block; }
        }
      `}</style>
    </div>
  );
}

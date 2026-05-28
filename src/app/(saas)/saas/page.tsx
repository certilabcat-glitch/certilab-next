"use client";

import Link from "next/link";
import { waSaas } from "@/lib/wa";

export default function SaasPage() {
  return (
    <>
      {/* HERO B2B */}
      <section className="saas-hero">
        <div className="saas-hero-content">
          <p className="saas-hero-eyebrow">B2B · Plataforma profesional</p>
          <h1 className="saas-hero-title">
            Centraliza todos tus análisis energéticos en un solo lugar
          </h1>
          <p className="saas-hero-sub">
            Deja de perder tiempo con múltiples técnicos. Sube expedientes en
            lote, recibe informes periciales firmados y ofrece un servicio
            profesional a tus clientes.
          </p>
          <div className="saas-hero-ctas">
            <Link href={waSaas()} className="saas-btn-primary">
              Solicitar demo gratuita
            </Link>
            <Link href="/saas/precios/" className="saas-btn-secondary">
              Ver planes →
            </Link>
          </div>
          <p className="saas-hero-nota">
            Sin compromiso · Primera semana gratis · Sin permanencia
          </p>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="saas-section">
        <h2 className="saas-section-title">
          El sector inmobiliario tiene un problema de confianza energética
        </h2>
        <div className="saas-problem-grid">
          <div className="saas-problem-card">
            <h3>Agencias inmobiliarias</h3>
            <p>
              Tus compradores desconfían de los certificados energéticos.
              Pierdes ventas porque no puedes garantizar la eficiencia real del
              inmueble.
            </p>
          </div>
          <div className="saas-problem-card">
            <h3>Arquitectos técnicos</h3>
            <p>
              Dedicas horas a informes que nadie valora. Necesitas una
              plataforma que centralice tu trabajo y te ayude a escalar.
            </p>
          </div>
          <div className="saas-problem-card">
            <h3>Administradores de fincas</h3>
            <p>
              Gestionas múltiples comunidades sin una herramienta unificada
              para evaluar su estado energético y acceder a ayudas.
            </p>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="saas-section saas-how-section">
        <h2 className="saas-section-title">Cómo funciona</h2>
        <div className="saas-steps">
          <div className="saas-step">
            <span className="saas-step-num">1</span>
            <h3>Sube el expediente</h3>
            <p>
              El cliente te envía el certificado energético o la documentación
              del inmueble. Tú lo subes a la plataforma en 2 clics.
            </p>
          </div>
          <div className="saas-step">
            <span className="saas-step-num">2</span>
            <h3>Nosotros analizamos</h3>
            <p>
              Eva revisa cada caso personalmente. Sin algoritmos, sin
              automatismos. Con rigor técnico profesional.
            </p>
          </div>
          <div className="saas-step">
            <span className="saas-step-num">3</span>
            <h3>Recibes el informe</h3>
            <p>
              Informe pericial PDF firmado por arquitecta técnica colegiada.
              Compártelo con tu cliente y cierra la venta con confianza.
            </p>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section className="saas-section saas-pricing-section">
        <h2 className="saas-section-title">Planes para cada profesional</h2>
        <p className="saas-section-sub">
          Elige el plan que mejor se adapte a tu volumen de trabajo
        </p>
        <div className="saas-pricing-grid">
          {/* Starter */}
          <div className="saas-pricing-card">
            <h3 className="saas-plan-name">Starter</h3>
            <p className="saas-plan-desc">Para autónomos y agentes individuales</p>
            <p className="saas-plan-price">
              29<span className="saas-plan-currency">€</span>
              <span className="saas-plan-period">/mes</span>
            </p>
            <ul className="saas-plan-features">
              <li>10 análisis/mes</li>
              <li>Informes PDF firmados</li>
              <li>Soporte por WhatsApp</li>
              <li>Historial de expedientes</li>
            </ul>
            <Link href={waSaas("Starter")} className="saas-btn-primary saas-btn-full">
              Empezar prueba gratis
            </Link>
          </div>

          {/* Professional */}
          <div className="saas-pricing-card saas-pricing-featured">
            <p className="saas-plan-badge">Más popular</p>
            <h3 className="saas-plan-name">Professional</h3>
            <p className="saas-plan-desc">Para agencias pequeñas (2-5 agentes)</p>
            <p className="saas-plan-price">
              79<span className="saas-plan-currency">€</span>
              <span className="saas-plan-period">/mes</span>
            </p>
            <ul className="saas-plan-features">
              <li>50 análisis/mes</li>
              <li>Todo lo de Starter</li>
              <li>Panel de equipo</li>
              <li>API de integración</li>
              <li>Informes personalizados</li>
            </ul>
            <Link href={waSaas("Professional")} className="saas-btn-primary saas-btn-full">
              Empezar prueba gratis
            </Link>
          </div>

          {/* Enterprise */}
          <div className="saas-pricing-card">
            <h3 className="saas-plan-name">Enterprise</h3>
            <p className="saas-plan-desc">Para grandes volúmenes</p>
            <p className="saas-plan-price saas-plan-price-custom">
              Personalizado
            </p>
            <ul className="saas-plan-features">
              <li>Análisis ilimitados</li>
              <li>Todo lo de Professional</li>
              <li>API dedicada</li>
              <li>Gestión de usuarios</li>
              <li>Soporte prioritario 24/7</li>
            </ul>
            <Link href={waSaas("Enterprise")} className="saas-btn-secondary saas-btn-full">
              Contactar
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="saas-section">
        <h2 className="saas-section-title">Preguntas frecuentes</h2>
        <div className="saas-faq">
          <details className="saas-faq-item">
            <summary>¿Necesito conocimientos técnicos para usar la plataforma?</summary>
            <p>
              No. La plataforma está diseñada para que cualquier profesional del
              sector inmobiliario pueda usarla sin formación técnica. Tú solo
              subes la documentación y nosotros hacemos el análisis.
            </p>
          </details>
          <details className="saas-faq-item">
            <summary>¿Los informes tienen validez legal?</summary>
            <p>
              Sí. Todos los informes están firmados por Eva María González
              Gracia, Arquitecta Técnica colegiada Cateb 9457, y cuentan con
              seguro de responsabilidad civil profesional.
            </p>
          </details>
          <details className="saas-faq-item">
            <summary>¿Puedo cancelar mi suscripción en cualquier momento?</summary>
            <p>
              Sí. Sin permanencia ni penalizaciones. La primera semana es
              gratuita para que pruebes la plataforma sin compromiso.
            </p>
          </details>
          <details className="saas-faq-item">
            <summary>¿Ofrecéis integración con CRMs?</summary>
            <p>
              Sí, a través de nuestra API. Los planes Professional y Enterprise
              incluyen acceso a la API para integrar con vuestro CRM
              inmobiliario.
            </p>
          </details>
          <details className="saas-faq-item">
            <summary>¿Cuánto tardan los análisis?</summary>
            <p>
              El plazo estándar es de 24-48 horas laborables. Para casos
              urgentes, disponemos del servicio Express con entrega en menos de
              2 horas.
            </p>
          </details>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="saas-section saas-cta-section">
        <h2 className="saas-section-title">
          Únete a los profesionales que ya confían en Certilab
        </h2>
        <p className="saas-section-sub">
          Primera semana gratis. Sin compromiso. Sin permanencia.
        </p>
        <Link href={waSaas()} className="saas-btn-primary saas-btn-large">
          Solicitar demo gratuita
        </Link>
      </section>

      {/* Schema.org Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Certilab SaaS",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: [
              {
                "@type": "Offer",
                name: "Starter",
                price: "29",
                priceCurrency: "EUR",
                description: "10 analysis per month",
              },
              {
                "@type": "Offer",
                name: "Professional",
                price: "79",
                priceCurrency: "EUR",
                description: "50 analysis per month",
              },
            ],
          }),
        }}
      />

      <style jsx>{`
        .saas-hero {
          background: var(--color-crema);
          padding: 6rem 1.5rem;
          text-align: center;
          border-bottom: 1px solid var(--color-border);
        }
        .saas-hero-content {
          max-width: 700px;
          margin: 0 auto;
        }
        .saas-hero-eyebrow {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-terra);
          margin-bottom: 1.5rem;
        }
        .saas-hero-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          color: var(--color-black);
          line-height: 1.15;
          margin-bottom: 1.5rem;
        }
        .saas-hero-sub {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          color: var(--color-grey);
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 550px;
          margin-left: auto;
          margin-right: auto;
        }
        .saas-hero-ctas {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }
        .saas-hero-nota {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--color-grey);
        }
        .saas-section {
          padding: 5rem 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .saas-section-title {
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 400;
          color: var(--color-black);
          text-align: center;
          margin-bottom: 1rem;
        }
        .saas-section-sub {
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--color-grey);
          text-align: center;
          max-width: 500px;
          margin: 0 auto 3rem;
          line-height: 1.7;
        }
        .saas-problem-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 3rem;
        }
        .saas-problem-card {
          border: 1px solid var(--color-border);
          padding: 2.5rem 2rem;
        }
        .saas-problem-card h3 {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 0.75rem;
        }
        .saas-problem-card p {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-grey);
          line-height: 1.7;
        }
        .saas-how-section {
          background: var(--color-crema);
          max-width: 100%;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .saas-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          max-width: 1100px;
          margin: 3rem auto 0;
        }
        .saas-step {
          text-align: center;
          padding: 2rem;
        }
        .saas-step-num {
          display: inline-block;
          width: 48px;
          height: 48px;
          border: 1px solid var(--color-terra);
          color: var(--color-terra);
          font-family: var(--font-serif);
          font-size: 1.5rem;
          line-height: 48px;
          text-align: center;
          margin-bottom: 1rem;
        }
        .saas-step h3 {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 0.75rem;
        }
        .saas-step p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          line-height: 1.7;
        }
        .saas-pricing-section {
          max-width: 1100px;
        }
        .saas-pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          align-items: start;
        }
        .saas-pricing-card {
          border: 1px solid var(--color-border);
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
        }
        .saas-pricing-featured {
          border: 2px solid var(--color-black);
          position: relative;
        }
        .saas-plan-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--color-black);
          color: var(--color-crema);
          font-family: var(--font-sans);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.3rem 1rem;
        }
        .saas-plan-name {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 0.25rem;
        }
        .saas-plan-desc {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          margin-bottom: 1.5rem;
        }
        .saas-plan-price {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          font-weight: 300;
          color: var(--color-black);
          margin-bottom: 1.5rem;
        }
        .saas-plan-currency {
          font-size: 1.5rem;
          vertical-align: super;
        }
        .saas-plan-period {
          font-size: 0.9rem;
          color: var(--color-grey);
          font-family: var(--font-sans);
        }
        .saas-plan-price-custom {
          font-size: 1.5rem;
          font-family: var(--font-sans);
          font-weight: 400;
        }
        .saas-plan-features {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem;
          flex-grow: 1;
        }
        .saas-plan-features li {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-dark);
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--color-border);
        }
        .saas-plan-features li:last-child {
          border-bottom: none;
        }
        .saas-faq {
          max-width: 680px;
          margin: 3rem auto 0;
        }
        .saas-faq-item {
          border-top: 1px solid var(--color-border);
          padding: 1.2rem 0;
        }
        .saas-faq-item:last-of-type {
          border-bottom: 1px solid var(--color-border);
        }
        .saas-faq-item summary {
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-black);
          cursor: pointer;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .saas-faq-item summary::-webkit-details-marker {
          display: none;
        }
        .saas-faq-item p {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-grey);
          line-height: 1.7;
          margin-top: 1rem;
        }
        .saas-cta-section {
          text-align: center;
          padding: 6rem 1.5rem;
          border-top: 1px solid var(--color-border);
        }
        .saas-btn-primary {
          display: inline-block;
          background: var(--color-black);
          color: var(--color-crema);
          padding: 0.85rem 2.5rem;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .saas-btn-primary:hover {
          opacity: 0.85;
        }
        .saas-btn-secondary {
          display: inline-block;
          border: 1px solid var(--color-black);
          color: var(--color-black);
          padding: 0.85rem 2.5rem;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .saas-btn-secondary:hover {
          opacity: 0.6;
        }
        .saas-btn-full {
          width: 100%;
          text-align: center;
        }
        .saas-btn-large {
          padding: 1rem 3rem;
          font-size: 0.9rem;
        }
        @media (max-width: 767px) {
          .saas-hero {
            padding: 4rem 1.5rem;
          }
          .saas-section {
            padding: 3rem 1.5rem;
          }
          .saas-pricing-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

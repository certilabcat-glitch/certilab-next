"use client";

import LandingLeadForm from "@/components/forms/LandingLeadForm";

export default function GuiaErroresPage() {
  return (
    <>
      <header className="hero hero--landing">
        <p className="hero-eyebrow">
          Guía gratuita · Arquitecta Técnica Cateb 9457
        </p>
        <h1>
          5 Errores que Invalidan
          <br />
          <span className="hero-light">tu Certificado Energético</span>
        </h1>
        <p className="hero-sub">
          Descarga gratis esta guía y aprende a detectar certificados mal hechos
          antes de comprar o vender tu vivienda. Eva María González Gracia,
          Arquitecta Técnica colegiada, te explica qué mirar y cómo evitarlo.
        </p>
        <ul className="hero-benefits">
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

      <style jsx>{`
        .hero--landing {
          text-align: center;
          padding: 4rem 1.5rem 2rem;
          background: var(--color-crema);
          max-width: 700px;
          margin: 0 auto;
        }
        .hero-eyebrow {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-terra);
          margin-bottom: 1.5rem;
        }
        .hero h1 {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 5vw, 2.75rem);
          font-weight: 300;
          color: var(--color-black);
          line-height: 1.15;
          margin-bottom: 1.25rem;
        }
        .hero-light {
          font-family: var(--font-sans);
          font-weight: 300;
          font-size: clamp(1.6rem, 4vw, 2.5rem);
        }
        .hero-sub {
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--color-grey);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .hero-benefits {
          list-style: none;
          padding: 0;
          margin: 0 auto 0.5rem;
          max-width: 400px;
          text-align: left;
        }
        .hero-benefits li {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-dark);
          line-height: 1.7;
          margin-bottom: 0.25rem;
        }
      `}</style>
    </>
  );
}

"use client";

import Link from "next/link";
import { waSaas } from "@/lib/wa";

const plans = [
  {
    name: "Starter",
    price: "29",
    period: "/mes",
    desc: "Para autónomos y agentes individuales",
    features: [
      "10 análisis/mes",
      "Informes PDF firmados",
      "Soporte por WhatsApp",
      "Historial de expedientes",
    ],
    cta: "Empezar prueba gratis",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "79",
    period: "/mes",
    desc: "Para agencias pequeñas (2-5 agentes)",
    features: [
      "50 análisis/mes",
      "Todo lo de Starter",
      "Panel de equipo",
      "API de integración",
      "Informes personalizados",
    ],
    cta: "Empezar prueba gratis",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: null,
    period: null,
    desc: "Para grandes volúmenes",
    features: [
      "Análisis ilimitados",
      "Todo lo de Professional",
      "API dedicada",
      "Gestión de usuarios",
      "Soporte prioritario 24/7",
    ],
    cta: "Contactar",
    highlighted: false,
  },
];

export default function PreciosPage() {
  return (
    <>
      <header className="pricing-hero">
        <h1>Planes para cada profesional</h1>
        <p className="pricing-sub">
          Elige el plan que mejor se adapte a tu volumen de trabajo. Todos
          incluyen primera semana gratis.
        </p>
      </header>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`pricing-card ${plan.highlighted ? "featured" : ""}`}
          >
            {plan.highlighted && <span className="pricing-badge">Más popular</span>}
            <h2 className="pricing-name">{plan.name}</h2>
            <p className="pricing-desc">{plan.desc}</p>
            <p className="pricing-price">
              {plan.price ? (
                <>
                  {plan.price}
                  <span className="pricing-currency">€</span>
                  <span className="pricing-period">{plan.period}</span>
                </>
              ) : (
                <span className="pricing-custom">Personalizado</span>
              )}
            </p>
            <ul className="pricing-features">
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link
              href={waSaas(plan.name)}
              className={`pricing-cta ${plan.highlighted ? "btn-primary" : "btn-secondary"}`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="pricing-faq">
        <h3>¿Preguntas sobre precios?</h3>
        <p>
          Escríbenos por WhatsApp y te explicamos qué plan se ajusta mejor a tu
          caso.
        </p>
        <Link href={waSaas()} className="pricing-contact">
          Hablar con el equipo →
        </Link>
      </div>

      <style jsx>{`
        .pricing-hero {
          text-align: center;
          padding: 5rem 1.5rem 3rem;
          max-width: 700px;
          margin: 0 auto;
        }
        .pricing-hero h1 {
          font-family: var(--font-serif);
          font-size: 2.25rem;
          font-weight: 300;
          color: var(--color-black);
          margin-bottom: 1rem;
        }
        .pricing-sub {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          color: var(--color-grey);
          line-height: 1.7;
        }
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem 4rem;
          align-items: start;
        }
        .pricing-card {
          border: 1px solid var(--color-border);
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .pricing-card.featured {
          border: 2px solid var(--color-black);
        }
        .pricing-badge {
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
        .pricing-name {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 0.25rem;
        }
        .pricing-desc {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          margin-bottom: 1.5rem;
        }
        .pricing-price {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          font-weight: 300;
          color: var(--color-black);
          margin-bottom: 1.5rem;
        }
        .pricing-currency {
          font-size: 1.5rem;
          vertical-align: super;
        }
        .pricing-period {
          font-size: 0.9rem;
          color: var(--color-grey);
          font-family: var(--font-sans);
        }
        .pricing-custom {
          font-size: 1.5rem;
          font-family: var(--font-sans);
          font-weight: 400;
        }
        .pricing-features {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem;
          flex-grow: 1;
        }
        .pricing-features li {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-dark);
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--color-border);
        }
        .pricing-features li:last-child {
          border-bottom: none;
        }
        .pricing-cta {
          display: inline-block;
          text-align: center;
          padding: 0.75rem 1.5rem;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .pricing-cta.btn-primary {
          background: var(--color-black);
          color: var(--color-crema);
        }
        .pricing-cta.btn-secondary {
          border: 1px solid var(--color-black);
          color: var(--color-black);
        }
        .pricing-cta:hover {
          opacity: 0.85;
        }
        .pricing-faq {
          text-align: center;
          padding: 3rem 1.5rem 5rem;
          border-top: 1px solid var(--color-border);
        }
        .pricing-faq h3 {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 0.75rem;
        }
        .pricing-faq p {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-grey);
          margin-bottom: 1rem;
        }
        .pricing-contact {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-terra);
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}

"use client";

import Link from "next/link";

export default function DespachoSection() {
  return (
    <section className="despacho" aria-labelledby="despacho-title">
      <div className="despacho-inner">
        <p className="despacho-eyebrow">Despacho de Auditoría Energética</p>

        <h2 id="despacho-title" className="despacho-title">
          Nadie entiende tu piso como una arquitecta técnica que ha visto cientos
        </h2>

        <p className="despacho-desc">
          <strong>Eva María González García</strong>,{" "}
          Arquitecta Técnica colegiada por el{" "}
          Colegio de Arquitectos Técnicos de Barcelona, realiza un análisis
          riguroso e independiente de su certificado energético para que usted
          pueda tomar la mejor decisión.
        </p>

        <div className="despacho-badges">
          <span>Colegiada · Cateb 9457</span>
          <span>20 años de experiencia</span>
          <span>Seguro RC Profesional</span>
        </div>

        <p className="despacho-nota">100% remoto · Confidencial</p>

        <div className="despacho-ctas">
          <Link href="/#diagnostico" className="btn-primary">
            Diagnóstico Gratuito
          </Link>
          <Link href="/#servicios" className="btn-ghost">
            Servicios →
          </Link>
        </div>
      </div>

      <style jsx>{`
        .despacho {
          padding: 7.5rem 1.5rem;
          background: var(--color-crema);
          border-top: 1px solid var(--color-border);
          text-align: center;
        }
        .despacho-inner {
          max-width: 700px;
          margin: 0 auto;
        }
        .despacho-eyebrow {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-grey);
          margin-bottom: 1.5rem;
          font-weight: 400;
        }
        .despacho-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          line-height: 1.15;
          color: var(--color-black);
          margin: 0 auto 1.5rem;
          max-width: 640px;
        }
        .despacho-desc {
          font-family: var(--font-sans);
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--color-dark);
          max-width: 560px;
          margin: 0 auto 2rem;
        }
        .despacho-badges {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .despacho-badges span {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-grey);
          padding: 0.4rem 1rem;
          border: 1px solid var(--color-border);
        }
        .despacho-nota {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          margin-bottom: 2rem;
        }
        .despacho-ctas {
          display: flex;
          gap: 2rem;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
        }
        @media (max-width: 767px) {
          .despacho {
            padding: 5rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
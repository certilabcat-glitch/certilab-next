"use client";

interface Stat {
  number: string;
  label: string;
}

const stats: Stat[] = [
  { number: "500+", label: "Certificados analizados" },
  { number: "97%", label: "Clientes satisfechos" },
  { number: "24-48h", label: "Tiempo de respuesta" },
  { number: "CATEB 9457", label: "Arquitecta colegiada" },
];

export default function TrustNumbers() {
  return (
    <section className="trust-numbers" aria-label="Indicadores de confianza">
      <div className="trust-numbers-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="trust-number-item">
            <span className="trust-number-value">{stat.number}</span>
            <span className="trust-number-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .trust-numbers {
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          background: var(--color-crema);
          padding: 2rem 1.5rem;
        }
        .trust-numbers-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        .trust-number-item {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .trust-number-value {
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 400;
          color: var(--color-terra);
        }
        .trust-number-label {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--color-grey);
          letter-spacing: 0.02em;
          line-height: 1.4;
        }
        @media (max-width: 767px) {
          .trust-numbers-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
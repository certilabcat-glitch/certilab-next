"use client";

"use client";

import Link from "next/link";

export default function DiffGrid() {
  const items = [
    {
      num: "I",
      title: "Cumplimiento legal",
      text: "El RD 390/2021 exige visita presencial para emitir. No lo hacemos online porque la ley no lo permite.",
    },
    {
      num: "II",
      title: "Independencia total",
      text: "No vendemos certificados, no tenemos incentivos para inflar calificaciones. Solo te decimos lo que hay.",
    },
    {
      num: "III",
      title: "Arquitecta Técnica colegiada",
      text: "Cateb 9457. Responsabilidad profesional real, no un algoritmo ni un técnico anónimo.",
    },
    {
      num: "IV",
      title: "Informes que sirven",
      text: "No un PDF de 2 páginas. Análisis técnico detallado con datos reales, riesgos y recomendaciones accionables.",
    },
  ];

  return (
    <section className="section" aria-labelledby="diff-title">
      <h2 className="section-title" id="diff-title">
        Análisis Forense vs. Informes Automáticos
      </h2>
      <p className="section-sub">
        No somos una plataforma de certificados rápidos. Somos una consultoría
        técnica colegiada que trabaja con responsabilidad profesional real. Sin
        atajos.
      </p>
      <div className="diff-grid">
        {items.map((item) => (
          <div key={item.num} className="diff-card">
            <p className="diff-num">{item.num}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .section {
          padding: 7.5rem 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .section-title {
          font-family: var(--font-serif);
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 400;
          color: var(--color-black);
          text-align: center;
          margin-bottom: 0.75rem;
        }
        .section-sub {
          text-align: center;
          font-family: var(--font-sans);
          font-size: 1.05rem;
          color: var(--color-grey);
          max-width: 550px;
          margin: 0 auto 3rem;
          line-height: 1.7;
        }
        .diff-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
        }
        .diff-card {
          padding: 2rem 0;
          text-align: center;
        }
        .diff-num {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: var(--color-grey);
          margin-bottom: 1rem;
          letter-spacing: 0.1em;
        }
        .diff-card h3 {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 0.5rem;
        }
        .diff-card p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          line-height: 1.6;
          margin: 0;
        }
        @media (max-width: 767px) {
          .section {
            padding: 5rem 1.5rem;
          }
          .diff-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .diff-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}

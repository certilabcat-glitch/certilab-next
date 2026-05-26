"use client";

import Link from "next/link";

export default function EvaSection() {
  return (
    <section className="eva-section" aria-labelledby="eva-title">
      <div className="eva-inner">
        <p className="eva-nombre">
          La profesional detrás de cada informe
        </p>
        <p className="eva-credenciales">
          Eva María González Gracia · Arquitecta Técnica · Cateb 9457 · 20 años
          de experiencia
        </p>
        <p className="eva-texto">
          He visto cómo se emiten certificados energéticos sin pisar el
          inmueble, con datos inventados o copiados de otros expedientes. He
          visto informes de 2 páginas que no sirven ni para negociar un
          descuento. He visto a compradores que descubren vicios ocultos cuando
          ya es tarde.
        </p>
        <p className="eva-texto">
          No me dedico a emitir certificados. Me dedico a{" "}
          <strong>
            analizar la verdad energética de los inmuebles
          </strong>
          . Con responsabilidad profesional real. Con el respaldo del Cateb. Con
          un seguro RC que protege mi trabajo y a quien confía en él.
        </p>
        <p className="eva-texto">
          Si necesita un certificado oficial con visita presencial, le oriento
          sin coste. Si necesita saber la verdad sobre su inmueble —o sobre el
          inmueble que va a comprar—, está en el sitio correcto.
        </p>
        <Link href="/sobre-nosotros/" className="eva-link">
          Conozca quién está detrás de su análisis
        </Link>
      </div>

      <style jsx>{`
        .eva-section {
          border-top: 1px solid var(--color-border);
          padding: 7.5rem 1.5rem;
          text-align: center;
          background: var(--color-crema);
        }
        .eva-inner {
          max-width: 600px;
          margin: 0 auto;
        }
        .eva-nombre {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 300;
          color: var(--color-black);
          margin-bottom: 0.5rem;
        }
        .eva-credenciales {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-grey);
          margin-bottom: 1.5rem;
        }
        .eva-texto {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          color: var(--color-dark);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .eva-texto:last-child {
          margin-bottom: 0;
        }
        .eva-link {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-black);
          text-decoration: underline;
          text-underline-offset: 2px;
          display: inline-block;
          margin-top: 0.5rem;
        }
        @media (max-width: 767px) {
          .eva-section {
            padding: 5rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}

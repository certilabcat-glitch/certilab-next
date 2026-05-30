"use client";

"use client";

export default function TrustBlockSection() {
  return (
    <section className="trust-block" aria-label="Información profesional">
      <p>
        <strong>Eva María González García</strong>
      </p>
      <p>Arquitecta Técnica · Colegiada nº 9457 · Cateb</p>
      <p>Seguro RC Profesional · Servicio 100% online para toda España</p>
      <div className="trust-block-badges">
        <span>Cateb 9457</span>
        <span>Seguro RC</span>
        <span>Consultoría energética independiente</span>
      </div>
      <p className="disclaimer">
        Certilab no emite certificados energéticos oficiales con registro en
        CCAA.
        <br />
        Somos una consultoría energética independiente especializada en análisis
        técnicos remotos.
      </p>

      <style jsx>{`
        .trust-block {
          padding: 2.5rem 1.5rem;
          text-align: center;
          border-top: 1px solid var(--color-border);
          font-size: 0.92rem;
        }
        .trust-block p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          margin: 0.25rem 0;
        }
        .trust-block strong {
          font-family: var(--font-serif);
          font-weight: 400;
          color: var(--color-black);
        }
        .trust-block .disclaimer {
          font-size: 0.8rem;
          font-style: italic;
          margin-top: 0.8rem;
        }
        .trust-block-badges {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin: 0.8rem 0;
        }
        .trust-block-badges span {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-grey);
          padding: 0.4rem 1rem;
          border: 1px solid var(--color-border);
        }
      `}</style>
    </section>
  );
}

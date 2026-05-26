"use client";

"use client";

export default function ContrastSection() {
  return (
    <section className="section contraste-section" aria-labelledby="contraste-title">
      <h2 className="section-title" id="contraste-title">
        No todos los análisis son iguales
      </h2>
      <p className="section-sub">
        Y su patrimonio no merece atajos. Compare lo que hay detrás de cada tipo
        de informe.
      </p>
      <div className="contraste-duo">
        <div className="contraste-card contraste-algoritmico">
          <p className="contraste-label">Informe Algorítmico</p>
          <ul>
            <li>Generado por software sin intervención técnica real</li>
            <li>Sin responsabilidad profesional</li>
            <li>Datos genéricos del catastro, sin verificación in situ</li>
            <li>Sin garantía legal ni colegio profesional detrás</li>
            <li>PDF de 2-3 páginas con plantilla estándar</li>
          </ul>
        </div>
        <div className="contraste-card contraste-forense">
          <p className="contraste-label contraste-label-destacado">
            Análisis Forense Certilab
          </p>
          <ul>
            <li>Revisado personalmente por Eva González, Cateb 9457</li>
            <li>Con seguro de responsabilidad civil profesional</li>
            <li>Análisis basado en documentación real de su inmueble</li>
            <li>Detecta el Brown Discount antes de que afecte a su precio</li>
            <li>Informe de 10-15 páginas con validez ante notario y banco</li>
          </ul>
        </div>
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
        .contraste-duo {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .contraste-card {
          padding: 2.5rem 2rem;
          border: 1px solid var(--color-border);
        }
        .contraste-label {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-grey);
          margin-bottom: 1.5rem;
        }
        .contraste-label-destacado {
          color: var(--color-terra);
          font-weight: 600;
        }
        .contraste-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .contraste-card li {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          line-height: 1.6;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--color-border);
        }
        .contraste-card li:last-child {
          border-bottom: none;
        }
        @media (max-width: 700px) {
          .section {
            padding: 5rem 1.5rem;
          }
          .contraste-duo {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

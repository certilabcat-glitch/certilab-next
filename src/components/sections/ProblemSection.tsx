"use client";

import Link from "next/link";

export default function ProblemSection() {
  return (
    <section className="section problem-section" aria-labelledby="problema-title">
      <h2 className="section-title" id="problema-title">
        El mercado de los informes energéticos tiene un problema
      </h2>
      <p className="section-sub">
        Cada día, cientos de compradores y propietarios reciben informes que
        parecen técnicos pero no lo son.
      </p>
      <div className="problem-grid">
        <div className="problem-card">
          <h3>Algoritmos sin criterio</h3>
          <p>
            Software que rellena datos genéricos del catastro sin haber visto el
            inmueble. Ni una foto. Ni una factura real de consumo.
          </p>
        </div>
        <div className="problem-card">
          <h3>Comerciales disfrazados</h3>
          <p>
            Vendedores que se presentan como &ldquo;técnicos&rdquo; pero no
            firman ni asumen responsabilidad alguna sobre el informe.
          </p>
        </div>
        <div className="problem-card">
          <h3>Cero responsabilidad</h3>
          <p>
            Sin colegio profesional detrás. Sin seguro RC. Si el informe
            contiene errores graves, usted se queda solo.
          </p>
        </div>
      </div>
      <p className="problem-afirmacion">
        En Certilab hacemos lo contrario:{" "}
        <strong>
          análisis forense con responsabilidad profesional real.
        </strong>
      </p>
      <p className="problem-data">
        <strong>Dato:</strong> Un inmueble con mala calificación energética (E,
        F o G) puede perder entre un <strong>5% y un 15%</strong> de su valor
        de mercado. Eso son hasta <strong>40.000€</strong> en una vivienda de
        270.000€.{" "}
        <Link href="/blog/brown-discount-precio-vivienda/">
          Descubra qué es el Brown Discount →
        </Link>
      </p>

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
        .problem-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .problem-card h3 {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 0.5rem;
        }
        .problem-card p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          line-height: 1.6;
          margin: 0;
        }
        .problem-afirmacion {
          text-align: center;
          font-family: var(--font-serif);
          font-size: 1.1rem;
          color: var(--color-black);
          margin-top: 3rem;
        }
        .problem-data {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          text-align: center;
          margin-top: 1rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
        }
        .problem-data a {
          color: var(--color-terra);
          text-decoration: underline;
        }
        @media (max-width: 767px) {
          .section {
            padding: 5rem 1.5rem;
          }
          .problem-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

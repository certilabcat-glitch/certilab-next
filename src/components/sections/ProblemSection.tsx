"use client";

import Link from "next/link";

export default function ProblemSection() {
  return (
    <section className="section problem-section" aria-labelledby="problema-title">
      <h2 className="section-title" id="problema-title">
        Información energética: el valor de un análisis riguroso
      </h2>
      <p className="section-sub">
        En un mercado donde la velocidad a veces prima sobre el rigor, contar con un
        análisis técnico independiente marca la diferencia.
      </p>
      <div className="problem-grid">
        <div className="problem-card">
          <h3>Datos que marcan la diferencia</h3>
          <p>
            Un análisis riguroso se basa en información detallada y verificada del
            inmueble: fotografías, documentación técnica y datos reales de consumo.
            No en suposiciones genéricas.
          </p>
        </div>
        <div className="problem-card">
          <h3>Independencia y transparencia</h3>
          <p>
            Trabajamos sin conflictos de interés. Nuestro único objetivo es
            ofrecerle una evaluación técnica honesta que le permita tomar
            decisiones informadas con total confianza.
          </p>
        </div>
        <div className="problem-card">
          <h3>Responsabilidad profesional</h3>
          <p>
            Cada informe está firmado por una arquitecta técnica colegiada, con
            seguro de responsabilidad civil y el respaldo del Colegio de
            Arquitectos Técnicos de Barcelona.
          </p>
        </div>
      </div>
      <p className="problem-afirmacion">
        En Certilab ofrecemos{" "}
        <strong>
          análisis técnico con responsabilidad profesional real.
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
      `}</style>
    </section>
  );
}

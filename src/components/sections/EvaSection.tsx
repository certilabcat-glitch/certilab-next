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
          Eva María González García · Arquitecta Técnica colegiada · Colegio de Arquitectos Técnicos de Barcelona · 20 años
          de experiencia
        </p>
        <p className="eva-texto">
          Creo en un análisis energético riguroso, transparente y útil.
          Cada informe que firmo es el resultado de una revisión cuidadosa,
          basada en datos reales del inmueble y con el respaldo del Colegio de
          Arquitectos Técnicos de Barcelona y del Ministerio para la Transición
          Ecológica.
        </p>
        <p className="eva-texto">
          Mi compromiso es ofrecerle una{" "}
          <strong>
            evaluación técnica independiente
          </strong>{" "}
          que le permita tomar decisiones con conocimiento de causa.
          Con la responsabilidad profesional que otorga la colegiación
          y un seguro de responsabilidad civil que protege nuestro trabajo.
        </p>
        <p className="eva-texto">
          Si necesita un certificado energético oficial, le orientaré sobre
          cómo obtenerlo. Si lo que busca es un análisis profundo y fiable de
          su inmueble, está en el lugar adecuado.
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

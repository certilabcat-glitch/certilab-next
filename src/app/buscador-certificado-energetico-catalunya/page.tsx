"use client";

import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import { waDiagnostico } from "@/lib/wa";

export default function BuscadorPage() {
  return (
    <>
      <header className="hero">
        <h1>Buscador de Certificados Energéticos en Cataluña</h1>
        <p className="hero-sub">
          Guía para encontrar un técnico certificador habilitado en tu provincia.
        </p>
      </header>

      <section className="content">
        <h2>¿Necesitas un certificado energético oficial en Cataluña?</h2>
        <p>
          Aunque Certilab no emite certificados energéticos oficiales, te
          orientamos sobre cómo encontrar un técnico habilitado en tu zona.
        </p>

        <h3>Registro oficial</h3>
        <p>
          El registro oficial de certificadores energéticos de Cataluña lo
          gestiona el ICAEN (Institut Català d&apos;Energia). En su web puedes
          buscar técnicos habilitados por provincia y municipio.
        </p>

        <div className="dir-links">
          <a
            href="https://www.registrocertificadosenergeticos.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="dir-link"
          >
            🔗 Registro de Certificadores de Cataluña (ICAEN)
          </a>
          <a
            href="https://www.gencat.cat/icaen/"
            target="_blank"
            rel="noopener noreferrer"
            className="dir-link"
          >
            🔗 Institut Català d&apos;Energia
          </a>
        </div>

        <h3>¿Ya tienes un certificado y dudas de su fiabilidad?</h3>
        <p>
          Solicita una Segunda Opinión en Certilab. Por 39€ revisamos tu
          certificado y te decimos si es correcto.
        </p>
        <Link href="/segunda-opinion/" className="inline-link">
          Solicitar Segunda Opinión →
        </Link>
      </section>

      <CTASection
        title="¿Necesitas orientación?"
        text="Te ayudamos a encontrar lo que necesitas, sin compromiso."
        buttonText="Consultar gratis"
        buttonHref={waDiagnostico()}
      />

      <style jsx>{`
        .hero {
          text-align: center;
          padding: 5rem 1.5rem 2rem;
          background: var(--color-crema);
        }
        .hero h1 {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 300;
          color: var(--color-black);
          max-width: 700px;
          margin: 0 auto 1rem;
        }
        .hero-sub {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          color: var(--color-grey);
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .content {
          max-width: 700px;
          margin: 0 auto;
          padding: 3rem 1.5rem 4rem;
        }
        .content h2 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 1rem;
        }
        .content h3 {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          font-weight: 400;
          color: var(--color-black);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .content p {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-dark);
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        .dir-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin: 1.5rem 0;
        }
        .dir-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          border: 1px solid var(--color-border);
          text-decoration: none;
          color: var(--color-terra);
          font-weight: 500;
          font-size: 0.9rem;
          transition: border-color 0.2s;
        }
        .dir-link:hover {
          border-color: var(--color-black);
        }
        .inline-link {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-terra);
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}

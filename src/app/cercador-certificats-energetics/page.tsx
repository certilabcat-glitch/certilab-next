"use client";

import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import { waDiagnostico } from "@/lib/wa";

export default function CercadorPage() {
  return (
    <>
      <header className="hero">
        <h1>Cercador de Certificats Energètics a Catalunya</h1>
        <p className="hero-sub">
          Guia per trobar un tècnic certificador habilitat a la teva província.
        </p>
      </header>

      <section className="content">
        <h2>Necessites un certificat energètic oficial a Catalunya?</h2>
        <p>
          Tot i que Certilab no emet certificats energètics oficials,
          t&apos;orientem sobre com trobar un tècnic habilitat a la teva zona.
        </p>

        <h3>Registre oficial</h3>
        <p>
          El registre oficial de certificadors energètics de Catalunya el
          gestiona l&apos;ICAEN (Institut Català d&apos;Energia). Al seu web
          pots buscar tècnics habilitats per província i municipi.
        </p>

        <div className="dir-links">
          <a
            href="https://www.registrocertificadosenergeticos.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="dir-link"
          >
            🔗 Registre de Certificadors de Catalunya (ICAEN)
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

        <h3>Ja tens un certificat i dubtes de la seva fiabilitat?</h3>
        <p>
          Sol·licita una Segona Opinió a Certilab. Per 39€ revisem el teu
          certificat i et diem si és correcte.
        </p>
        <Link href="/segunda-opinion/" className="inline-link">
          Sol·licitar Segona Opinió →
        </Link>
      </section>

      <CTASection
        title="Necessites orientació?"
        text="T&apos;ajudem a trobar el que necessites, sense compromís."
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

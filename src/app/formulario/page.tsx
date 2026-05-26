"use client";

import { Metadata } from "next";
import { waDiagnostico } from "@/lib/wa";

export default function FormularioPage() {
  return (
    <>
      <header className="hero" role="banner">
        <h1>Diagnóstico Express Gratuito</h1>
        <p className="hero-sub">
          Cuéntanos tu caso y te orientamos sin compromiso. En menos de 5
          minutos sabremos qué necesitas.
        </p>
      </header>

      <section className="form-section">
        <div className="form-card">
          <h2>Contáctanos por WhatsApp</h2>
          <p>
            El método más rápido y directo. Háblanos directamente por WhatsApp y
            te responderemos en menos de 24 horas (normalmente antes).
          </p>
          <a
            href={waDiagnostico()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Abrir WhatsApp
          </a>
          <p className="form-note">
            O si lo prefieres, escríbenos un correo desde tu gestor habitual.
            Te responderemos a la mayor brevedad.
          </p>
        </div>

        <div className="form-card form-card-secondary">
          <h3>¿Qué necesitas tener a mano?</h3>
          <ul>
            <li>Dirección completa del inmueble</li>
            <li>Certificado energético (si tienes)</li>
            <li>Nota Simple (si tienes)</li>
            <li>Cualquier documento que creas relevante</li>
          </ul>
          <p className="form-note">
            No te preocupes si no tienes toda la documentación. Con la
            dirección podemos empezar el análisis.
          </p>
        </div>
      </section>

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
          margin-bottom: 1rem;
        }
        .hero-sub {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          color: var(--color-grey);
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .form-section {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem 1.5rem 5rem;
          display: grid;
          gap: 2rem;
        }
        .form-card {
          border: 1px solid var(--color-border);
          padding: 2.5rem;
          text-align: center;
        }
        .form-card h2 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 1rem;
        }
        .form-card h3 {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 1rem;
        }
        .form-card p {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-grey);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .form-card ul {
          text-align: left;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-dark);
          line-height: 1.7;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .form-card ul li {
          margin-bottom: 0.5rem;
        }
        .btn-primary {
          display: inline-block;
          background: var(--color-black);
          color: var(--color-crema);
          padding: 0.75rem 2rem;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .btn-primary:hover {
          opacity: 0.8;
        }
        .form-note {
          font-size: 0.85rem !important;
          color: var(--color-grey) !important;
          font-style: italic;
          margin-top: 1rem;
          margin-bottom: 0 !important;
        }
        .form-card-secondary {
          text-align: left;
        }
      `}</style>
    </>
  );
}

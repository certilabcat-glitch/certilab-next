"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { waDiagnostico } from "@/lib/wa";

function GraciasContent() {
  const searchParams = useSearchParams();
  const magnet = searchParams.get("magnet");

  useEffect(() => {
    // Evento Lead en píxel + CAPI (servidor)
    import("@/lib/meta-pixel").then((m) => {
      m.trackLeadComplete({
        contentName: magnet || "lead-general",
        customData: { page: "gracias" },
      });
    });

    // Redirigir a WhatsApp a los 3 segundos (solo si viene de landing)
    if (magnet) {
      const timer = setTimeout(() => {
        window.location.href = waDiagnostico();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [magnet]);

  return (
    <div className="gracias-page">
      <div className="gracias-card">
        <h1>¡Gracias por confiar en Certilab!</h1>
        <p className="gracias-texto">
          {magnet
            ? "Te hemos enviado el contenido solicitado por email. Revísalo en unos minutos."
            : "Hemos recibido tu solicitud. Eva revisará tu caso personalmente y te responderá en menos de 24 horas laborables."}
        </p>

        {magnet && (
          <div className="gracias-redirect">
            <p>
              Te estamos redirigiendo a WhatsApp para que hables con Eva...
            </p>
            <div className="spinner" />
          </div>
        )}

        <div className="gracias-info">
          <p>
            <strong>Mientras tanto:</strong>
          </p>
          <ul>
            <li>Revisa tu WhatsApp (recibirás la respuesta por este canal)</li>
            <li>
              Ten a mano el certificado energético y documentación del inmueble
            </li>
            <li>
              Si es urgente, contáctanos directamente por WhatsApp
            </li>
          </ul>
        </div>
        <a
          href={waDiagnostico()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Hablar por WhatsApp
        </a>
        <Link href="/" className="btn-secondary">
          Volver al inicio
        </Link>
      </div>

      <style jsx>{`
        .gracias-page {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 1.5rem;
        }
        .gracias-card {
          max-width: 500px;
          text-align: center;
          border: 1px solid var(--color-border);
          padding: 3rem 2rem;
          background: white;
        }
        h1 {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 300;
          color: var(--color-black);
          margin-bottom: 1.5rem;
        }
        .gracias-texto {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-dark);
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .gracias-info {
          text-align: left;
          border: 1px solid var(--color-border);
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        .gracias-info p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-dark);
          margin-bottom: 0.75rem;
        }
        .gracias-info ul {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          line-height: 1.7;
          padding-left: 1.25rem;
          margin: 0;
        }
        .gracias-info li {
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
          margin-bottom: 1rem;
        }
        .btn-primary:hover {
          opacity: 0.8;
        }
        .gracias-redirect {
          margin-bottom: 2rem;
        }
        .gracias-redirect p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          margin-bottom: 1rem;
        }
        .spinner {
          width: 24px;
          height: 24px;
          border: 2px solid var(--color-border);
          border-top-color: var(--color-terra);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .btn-secondary {
          display: block;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-terra);
          text-decoration: underline;
        }
  `}</style>
    </div>
  );
}

function GraciasPageContent() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <GraciasContent />
    </Suspense>
  );
}

export default function GraciasPage() {
  return (
    <>
      <meta name="robots" content="noindex, follow" />
      <GraciasPageContent />
    </>
  );
}

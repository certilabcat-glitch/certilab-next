"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { waDiagnostico } from "@/lib/wa";

function ResultadoContent() {
  const searchParams = useSearchParams();
  const direccion = searchParams.get("direccion");
  return (
    <div className="resultado-page">
      <div className="resultado-card">
        <h1>Expediente en proceso</h1>
        {direccion && (
          <p className="direccion">
            <strong>Dirección:</strong> {direccion}
          </p>
        )}
        <div className="status">
          <div className="status-dot"></div>
          <p>Nuestro sistema está procesando su solicitud.</p>
        </div>
        <p className="info">
          Hemos recibido su expediente. En breve recibirá un análisis
          preliminar por WhatsApp. Si tiene cualquier duda, contáctenos
          directamente.
        </p>
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
        .resultado-page {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 1.5rem;
        }
        .resultado-card {
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
        .direccion {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-dark);
          margin-bottom: 2rem;
        }
        .status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .status-dot {
          width: 12px;
          height: 12px;
          background: var(--color-verde);
          border-radius: 50%;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .status p {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-dark);
          margin: 0;
        }
        .info {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          line-height: 1.7;
          margin-bottom: 2rem;
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

export default function ResultadoAuditoriaPage() {
  return (
    <>
      <meta name="robots" content="noindex, follow" />
      <Suspense fallback={<div className="resultado-page" style={{ textAlign: "center", padding: "4rem" }}><p>Cargando...</p></div>}>
        <ResultadoContent />
      </Suspense>
    </>
  );
}
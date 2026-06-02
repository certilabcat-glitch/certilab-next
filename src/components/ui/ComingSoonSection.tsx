"use client";
import { useState } from "react";
import Link from "next/link";

interface Props {
  serviceName: string;
  serviceUrl: string;
}

export default function ComingSoonSection({ serviceName, serviceUrl }: Props) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(true);
      return;
    }
    setError(false);
    // Guardar en localStorage para analytics básico
    const interest = JSON.parse(localStorage.getItem("certilab-interest") || "[]");
    interest.push({ service: serviceName, email, date: new Date().toISOString() });
    localStorage.setItem("certilab-interest", JSON.stringify(interest));
    setSent(true);
  };

  const mailtoHref = `mailto:info@certilab.cat?subject=Interés%20en%20${encodeURIComponent(serviceName)}&body=Hola,%20estoy%20interesado%20en%20el%20servicio%20${encodeURIComponent(serviceName)}%20(${serviceUrl}).%20Avisadme%20cuando%20esté%20disponible.%0A%0AMi%20email:%20${encodeURIComponent(email)}`;

  return (
    <section className="coming-soon-section" id="coming-soon">
      <div className="coming-soon-inner">
        <span className="coming-soon-badge">Próximamente</span>
        <h2 className="coming-soon-title">
          {serviceName} estará disponible pronto
        </h2>
        <p className="coming-soon-sub">
          Estamos ultimando los detalles de este servicio. Si quieres que te
          avisemos cuando esté activo, déjanos tu correo.
        </p>

        {sent ? (
          <div className="coming-soon-success">
            <p className="coming-soon-success-text">
              ✅ ¡Gracias! Te avisaremos cuando {serviceName} esté disponible.
            </p>
            <p className="coming-soon-success-extra">
              Mientras tanto, descubre nuestra{" "}
              <Link href="/segunda-opinion/">
                Segunda Opinión del Certificado Energético por 39€
              </Link>
              , el servicio que ya está activo y operativo.
            </p>
            <p className="coming-soon-success-wa">
              También puedes escribirnos directamente por{" "}
              <a
                href="https://wa.me/34608515922?text=Hola%2C%20estoy%20interesado%20en%20el%20servicio%20de"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              .
            </p>
          </div>
        ) : (
          <form className="coming-soon-form" onSubmit={handleSubmit}>
            <div className="coming-soon-field">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
                placeholder="tu@email.com"
                className={`coming-soon-input ${error ? "error" : ""}`}
                aria-label="Tu correo electrónico"
              />
              <button type="submit" className="coming-soon-button">
                Avisarme
              </button>
            </div>
            {error && (
              <p className="coming-soon-error">
                Introduce un correo electrónico válido.
              </p>
            )}
            <p className="coming-soon-note">
              Sin spam. Solo te escribiremos cuando este servicio esté listo.
            </p>
          </form>
        )}

        <div className="coming-soon-alternative">
          <p className="coming-soon-alt-text">
            ⚡ El servicio que ya está activo:{" "}
            <Link href="/segunda-opinion/">
              Segunda Opinión del Certificado (39€)
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .coming-soon-section {
          background: var(--color-crema);
          padding: 5rem 1.5rem;
          border-top: 1px solid var(--color-border);
        }
        .coming-soon-inner {
          max-width: 550px;
          margin: 0 auto;
          text-align: center;
        }
        .coming-soon-badge {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-terra);
          background: rgba(196, 168, 130, 0.15);
          padding: 0.3rem 0.85rem;
          margin-bottom: 1rem;
        }
        .coming-soon-title {
          font-family: var(--font-serif);
          font-size: clamp(1.35rem, 2.5vw, 1.75rem);
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 0.75rem;
        }
        .coming-soon-sub {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-grey);
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .coming-soon-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .coming-soon-field {
          display: flex;
          gap: 0.5rem;
          max-width: 420px;
          margin: 0 auto;
          width: 100%;
        }
        .coming-soon-input {
          flex: 1;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          padding: 0.75rem 1rem;
          border: 1px solid var(--color-border);
          background: #fff;
          outline: none;
          transition: border-color 0.2s;
          border-radius: 0;
        }
        .coming-soon-input:focus {
          border-color: var(--color-terra);
        }
        .coming-soon-input.error {
          border-color: #d32f2f;
        }
        .coming-soon-button {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 500;
          color: #fff;
          background: var(--color-black);
          border: none;
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s;
          border-radius: 0;
        }
        .coming-soon-button:hover {
          background: #333;
        }
        .coming-soon-error {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: #d32f2f;
          margin: 0;
        }
        .coming-soon-note {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--color-grey);
          margin: 0;
          opacity: 0.7;
        }
        .coming-soon-success {
          text-align: center;
        }
        .coming-soon-success-text {
          font-family: var(--font-sans);
          font-size: 1rem;
          color: #2e7d32;
          font-weight: 500;
          margin-bottom: 1rem;
        }
        .coming-soon-success-extra {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          line-height: 1.6;
          margin-bottom: 0.5rem;
        }
        .coming-soon-success-extra a,
        .coming-soon-success-wa a,
        .coming-soon-alt-text a {
          color: var(--color-terra);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .coming-soon-success-extra a:hover,
        .coming-soon-success-wa a:hover,
        .coming-soon-alt-text a:hover {
          color: var(--color-terra-dark);
        }
        .coming-soon-success-wa {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          margin: 0;
        }
        .coming-soon-alternative {
          margin-top: 2.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-border);
        }
        .coming-soon-alt-text {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          margin: 0;
        }

        @media (max-width: 767px) {
          .coming-soon-section {
            padding: 3rem 1.5rem;
          }
          .coming-soon-field {
            flex-direction: column;
          }
          .coming-soon-button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
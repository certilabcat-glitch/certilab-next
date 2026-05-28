"use client";

import { useState, FormEvent, useEffect } from "react";
import { sendToWebhook } from "@/lib/webhook";
import { trackLeadComplete, trackViewContent } from "@/lib/meta-pixel";
import { useUtm } from "@/lib/utm";

interface Props {
  leadMagnet: string;
  utmCampaign?: string;
}

export default function LandingLeadForm({ leadMagnet, utmCampaign }: Props) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    // ViewContent al cargar la landing
    trackViewContent({
      content_name: leadMagnet,
      content_category: "lead-magnet",
    });
  }, [leadMagnet]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    const utm = useUtm();

    // Enviar a n8n
    await sendToWebhook({
      nombre,
      email,
      telefono,
      mensaje: `Lead magnet: ${leadMagnet}, campaña: ${utmCampaign || "desconocida"}`,
      servicio: "lead-magnet",
      origen: `landing-${leadMagnet}`,
      timestamp: new Date().toISOString(),
    });

    // Meta: evento Lead (píxel + CAPI)
    await trackLeadComplete({
      contentName: leadMagnet,
      email,
      phone: telefono,
      value: 0,
      currency: "EUR",
      customData: {
        lead_magnet: leadMagnet,
        campaign: utmCampaign,
        utms: utm,
      },
    });

    setSending(false);
    setSent(true);

    // Redirigir a página de gracias
    window.location.href = `/gracias/?magnet=${leadMagnet}`;
  };

  if (sent) {
    return (
      <div className="form-sent">
        <p>Redirigiendo...</p>
      </div>
    );
  }

  return (
    <section className="landing-form-section">
      <div className="landing-form-card">
        <h2>Descarga tu guía gratuita</h2>
        <p className="form-sub">
          Te la enviamos por email. Sin spam, sin compromiso.
        </p>
        <form onSubmit={handleSubmit} className="landing-form">
          <div className="form-group">
            <label htmlFor="l-nombre">Nombre *</label>
            <input
              id="l-nombre"
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: María García"
            />
          </div>
          <div className="form-group">
            <label htmlFor="l-email">Email *</label>
            <input
              id="l-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="l-telefono">Teléfono (opcional)</label>
            <input
              id="l-telefono"
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="612 345 678"
            />
          </div>
          <button type="submit" className="btn-primary" disabled={sending}>
            {sending ? "Enviando..." : "Descargar guía gratis →"}
          </button>
          <p className="form-note">
            📩 Recibirás la guía en tu email. Puedes darte de baja en cualquier
            momento.
          </p>
        </form>
      </div>

      <style jsx>{`
        .landing-form-section {
          display: flex;
          justify-content: center;
          padding: 1rem 1.5rem 4rem;
          background: var(--color-crema);
        }
        .landing-form-card {
          background: white;
          border-radius: 1rem;
          padding: 2.5rem 2rem;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }
        .landing-form-card h2 {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 400;
          color: var(--color-black);
          text-align: center;
          margin-bottom: 0.5rem;
        }
        .form-sub {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-group label {
          display: block;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--color-black);
          margin-bottom: 0.3rem;
        }
        .form-group input {
          width: 100%;
          padding: 0.7rem 0.9rem;
          border: 1px solid var(--color-border);
          border-radius: 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-black);
          background: white;
          box-sizing: border-box;
        }
        .form-group input:focus {
          outline: none;
          border-color: var(--color-terra);
        }
        .btn-primary {
          width: 100%;
          padding: 0.85rem;
          border-radius: 2rem;
          border: none;
          background: var(--color-black);
          color: white;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
          margin-top: 0.5rem;
        }
        .btn-primary:hover {
          opacity: 0.85;
        }
        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .form-note {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--color-grey);
          text-align: center;
          margin-top: 1rem;
        }
        .form-sent {
          text-align: center;
          padding: 2rem;
          font-family: var(--font-sans);
          color: var(--color-grey);
        }
      `}</style>
    </section>
  );
}

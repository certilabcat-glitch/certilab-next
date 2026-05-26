"use client";

import { useState, FormEvent } from "react";
import { sendToWebhook } from "@/lib/webhook";
import { waUrl } from "@/lib/wa";

interface FormData {
  nombre: string;
  telefono: string;
  email: string;
  mensaje: string;
  servicio: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    telefono: "",
    email: "",
    mensaje: "",
    servicio: "diagnostico-express",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Enviar a n8n
    await sendToWebhook({
      nombre: formData.nombre,
      telefono: formData.telefono,
      email: formData.email,
      mensaje: formData.mensaje,
      servicio: formData.servicio,
      origen: "formulario-diagnostico-express",
      timestamp: new Date().toISOString(),
    });

    setSending(false);
    setSent(true);

    // Redirigir a WhatsApp con mensaje predefinido
    const waMessage = `Hola, soy ${formData.nombre}. Vengo del formulario de Certilab. Mi consulta: ${formData.mensaje || "Quiero un Diagnóstico Express"}`;
    window.location.href = waUrl(waMessage);
  };

  if (sent) {
    return (
      <div className="form-sent">
        <p>Redirigiendo a WhatsApp...</p>
        <style jsx>{`
          .form-sent {
            text-align: center;
            padding: 2rem;
            font-family: var(--font-sans);
            color: var(--color-grey);
          }
        `}</style>
      </div>
    );
  }

  return (
    <section className="form-section">
      <div className="form-card">
        <h2>Solicita tu Diagnóstico Express Gratuito</h2>
        <p className="form-sub">
          En menos de 5 minutos te orientamos sin compromiso.
        </p>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo *</label>
            <input
              id="nombre"
              type="text"
              required
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              placeholder="Ej: María García"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono *</label>
            <input
              id="telefono"
              type="tel"
              required
              value={formData.telefono}
              onChange={(e) =>
                setFormData({ ...formData, telefono: e.target.value })
              }
              placeholder="Ej: 612 345 678"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="tu@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="servicio">¿Qué necesitas? *</label>
            <select
              id="servicio"
              required
              value={formData.servicio}
              onChange={(e) =>
                setFormData({ ...formData, servicio: e.target.value })
              }
            >
              <option value="diagnostico-express">
                Diagnóstico Express (Gratuito)
              </option>
              <option value="segunda-opinion">
                Segunda Opinión (39€)
              </option>
              <option value="segunda-opinion-express">
                Segunda Opinión Express (79€)
              </option>
              <option value="check-up-inmobiliario">
                Check-Up Inmobiliario (199€)
              </option>
              <option value="informe-tecnico">
                Informe Técnico Energético (399€)
              </option>
              <option value="otro">Otro / No lo sé</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">Cuéntanos tu caso</label>
            <textarea
              id="mensaje"
              rows={4}
              value={formData.mensaje}
              onChange={(e) =>
                setFormData({ ...formData, mensaje: e.target.value })
              }
              placeholder="Describe brevemente tu situación..."
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={sending}
          >
            {sending ? "Enviando..." : "Solicitar Diagnóstico Gratuito"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .form-section {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }
        .form-card {
          background: var(--color-crema);
          border: 1px solid var(--color-border);
          padding: 2.5rem;
        }
        .form-card h2 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 0.5rem;
        }
        .form-sub {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-grey);
          margin-bottom: 2rem;
        }
        .form-group {
          margin-bottom: 1.25rem;
        }
        .form-group label {
          display: block;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-dark);
          margin-bottom: 0.4rem;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--color-border);
          background: white;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-black);
          transition: border-color 0.2s;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--color-terra);
        }
        .btn-primary {
          display: inline-block;
          width: 100%;
          background: var(--color-black);
          color: var(--color-crema);
          padding: 0.85rem 2rem;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .btn-primary:hover {
          opacity: 0.85;
        }
        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}

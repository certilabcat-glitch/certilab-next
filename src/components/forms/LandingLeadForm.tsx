"use client";

import { useState, FormEvent, useEffect } from "react";
import styles from "./LandingLeadForm.module.css";
import { sendToWebhook } from "@/lib/webhook";
import { trackLeadComplete, trackViewContent } from "@/lib/meta-pixel";
import { getUtm } from "@/lib/utm";

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const utm = getUtm();

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
      <div className={styles.formSent}>
        <p>Redirigiendo...</p>
      </div>
    );
  }

  return (
    <section className={styles.landingFormSection}>
      <div className={styles.landingFormCard}>
        <h2>Descarga tu guía gratuita</h2>
        <p className={styles.formSub}>
          Te la enviamos por email. Sin spam, sin compromiso.
        </p>
        <form onSubmit={handleSubmit} className="landing-form">
          <div className={styles.formGroup}>
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
          <div className={styles.formGroup}>
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
          <div className={styles.formGroup}>
            <label htmlFor="l-telefono">Teléfono (opcional)</label>
            <input
              id="l-telefono"
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="612 345 678"
            />
          </div>
          <button type="submit" className={styles.btnPrimary} disabled={sending}>
            {sending ? "Enviando..." : "Descargar guía gratis →"}
          </button>
          <p className={styles.formNote}>
            📩 Recibirás la guía en tu email. Puedes darte de baja en cualquier
            momento.
          </p>
        </form>
      </div>
    </section>
  );
}

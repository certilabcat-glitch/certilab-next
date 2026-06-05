"use client";

import { useState, FormEvent } from "react";
import { sendToWebhook } from "@/lib/webhook";
import { waUrl } from "@/lib/wa";
import { trackLeadComplete } from "@/lib/meta-pixel";
import styles from "./ContactForm.module.css";

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

    // Meta: evento Lead (píxel + CAPI)
    await trackLeadComplete({
      contentName: "diagnostico-express",
      email: formData.email || undefined,
      phone: formData.telefono,
      value: 0,
      currency: "EUR",
      customData: {
        servicio: formData.servicio,
      },
    });

    setSending(false);
    setSent(true);

    // Redirigir a WhatsApp con mensaje predefinido
    const waMessage = `Hola, soy ${formData.nombre}. Vengo del formulario de Certilab. Mi consulta: ${formData.mensaje || "Quiero un Diagnóstico Express"}`;
    window.location.href = waUrl(waMessage);
  };

  if (sent) {
    return (
      <div className={styles.formSent}>
        <p>Redirigiendo a WhatsApp...</p>
      </div>
    );
  }

  return (
    <section className={styles.formSection}>
      <div className={styles.formCard}>
        <h2>Solicita tu Diagnóstico Express Gratuito</h2>
        <p className={styles.formSub}>
          En menos de 5 minutos te orientamos sin compromiso.
        </p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
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

          <div className={styles.formGroup}>
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

          <div className={styles.formGroup}>
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

          <div className={styles.formGroup}>
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

          <div className={styles.formGroup}>
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
            className={styles.btnPrimary}
            disabled={sending}
          >
            {sending ? "Enviando..." : "Solicitar Diagnóstico Gratuito"}
          </button>
        </form>
      </div>
    </section>
  );
}

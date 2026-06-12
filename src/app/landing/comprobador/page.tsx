"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sendToWebhook } from "@/lib/webhook";
import { trackLeadComplete, trackViewContent } from "@/lib/meta-pixel";
import { getUtm } from "@/lib/utm";
import styles from "./page.module.css";

export default function ComprobadorLandingPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    trackViewContent({
      content_name: "landing-comprobador",
      content_category: "tool-landing",
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const utm = getUtm();

    await sendToWebhook({
      nombre,
      email,
      telefono,
      mensaje: `Lead desde landing comprobador`,
      servicio: "comprobador",
      origen: "landing-comprobador",
      timestamp: new Date().toISOString(),
    });

    await trackLeadComplete({
      contentName: "landing-comprobador",
      email,
      phone: telefono,
      value: 0,
      currency: "EUR",
      customData: {
        lead_magnet: "landing-comprobador",
        utms: utm,
      },
    });

    setSending(false);

    // Redirigir al comprobador con indicador de lead capturado
    const params = new URLSearchParams({ email, nombre });
    router.push(`/comprobador-certificado-energetico/?${params.toString()}`);
  };

  const irDirecto = () => {
    router.push("/comprobador-certificado-energetico/");
  };

  return (
    <>
      <header className={`hero ${styles.heroLanding}`}>
        <p className={styles.heroEyebrow}>
          Herramienta gratuita · Arquitecta Técnica Cateb 9457
        </p>
        <h1>
          ¿Tu Certificado Energético
          <br />
          <span className={styles.heroLight}>es realmente fiable?</span>
        </h1>
        <p className={styles.heroSub}>
          Comprueba gratis si tu certificado tiene errores en consumo, emisiones
          o fecha de validez. En menos de 2 minutos obtienes alertas
          personalizadas.
        </p>
        <ul className={styles.heroBenefits}>
          <li>✅ Sube el PDF o introduce los datos manualmente</li>
          <li>✅ Detecta discrepancias entre letra y consumo</li>
          <li>✅ Recibe alertas según tu zona climática y gasto real</li>
        </ul>
      </header>

      <section className={styles.formSection}>
        <div className={styles.formCard}>
          <h2>Recibe tu informe personalizado</h2>
          <p className={styles.formSub}>
            Déjanos tu email y te enviaremos las alertas con recomendaciones
            para tu certificado.
          </p>
          <form onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={sending}
            >
              {sending ? "Enviando..." : "Comprobar mi certificado →"}
            </button>
          </form>
          <p className={styles.formNote}>
            📩 Recibirás las alertas en tu email. Sin spam, puedes darte de baja
            en cualquier momento.
          </p>

          <div className={styles.separator}>
            <span>o</span>
          </div>

          <button onClick={irDirecto} className={styles.btnSecondary}>
            Solo quiero probar la herramienta →
          </button>
        </div>
      </section>
    </>
  );
}
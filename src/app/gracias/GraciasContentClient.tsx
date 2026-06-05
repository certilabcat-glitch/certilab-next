"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { waDiagnostico } from "@/lib/wa";
import styles from "./GraciasContentClient.module.css";

export default function GraciasContentClient() {
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
    <div className={styles.graciasPage}>
      <div className={styles.graciasCard}>
        <h1 className={styles.h1}>¡Gracias por confiar en Certilab!</h1>
        <p className={styles.graciasTexto}>
          {magnet
            ? "Te hemos enviado el contenido solicitado por email. Revísalo en unos minutos."
            : "Hemos recibido tu solicitud. Eva revisará tu caso personalmente y te responderá en menos de 24 horas laborables."}
        </p>

        {magnet && (
          <div className={styles.graciasRedirect}>
            <p>
              Te estamos redirigiendo a WhatsApp para que hables con Eva...
            </p>
            <div className={styles.spinner} />
          </div>
        )}

        <div className={styles.graciasInfo}>
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
          className={styles.btnPrimary}
        >
          Hablar por WhatsApp
        </a>
        <Link href="/" className={styles.btnSecondary}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
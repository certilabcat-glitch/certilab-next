"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { waDiagnostico } from "@/lib/wa";
import styles from "./ResultadoAuditoriaContent.module.css";

export default function ResultadoAuditoriaContent() {
  const searchParams = useSearchParams();
  const direccion = searchParams.get("direccion");

  return (
    <div className={styles.resultadoPage}>
      <div className={styles.resultadoCard}>
        <h1 className={styles.h1}>Expediente en proceso</h1>
        {direccion && (
          <p className={styles.direccion}>
            <strong>Dirección:</strong> {direccion}
          </p>
        )}
        <div className={styles.status}>
          <div className={styles.statusDot}></div>
          <p>Nuestro sistema está procesando su solicitud.</p>
        </div>
        <p className={styles.info}>
          Hemos recibido su expediente. En breve recibirá un análisis
          preliminar por WhatsApp. Si tiene cualquier duda, contáctenos
          directamente.
        </p>
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
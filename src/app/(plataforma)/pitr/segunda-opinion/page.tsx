/**
 * PITR DEMO — Segunda Opinión
 *
 * Página funcional de demostración del motor PITR™
 * usando el template completo de Segunda Opinión.
 *
 * PITR™ v1.2
 */

"use client";

import { templateSegundaOpinion } from "@/lib/pitr/templates/segunda-opinion";
import PitrEngine from "@/components/pitr/PitrEngine";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default function SegundaOpinionPitrPage() {
  const router = useRouter();

  // Intentar cargar draft anterior si existe
  const draftId =
    typeof window !== "undefined"
      ? localStorage.getItem("pitr-draft-id-segunda-opinion")
      : null;

  const handleExit = () => {
    router.push("/dashboard");
  };

  const handleSubmit = () => {
    // Limpiar draft al enviar
    localStorage.removeItem("pitr-draft-id-segunda-opinion");
    router.push("/dashboard");
  };

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <Link href="/dashboard" className={styles.back}>
          ← Dashboard
        </Link>
        <span className={styles.badge}>Motor PITR™ v1.2</span>
      </header>

      <div className={styles.engineWrapper}>
        <PitrEngine
          template={templateSegundaOpinion}
          expedienteId="demo-segunda-opinion-001"
          draftId={draftId ?? undefined}
          onExit={handleExit}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
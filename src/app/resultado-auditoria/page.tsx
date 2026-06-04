import type { Metadata } from "next";
import { Suspense } from "react";
import ResultadoAuditoriaContent from "./ResultadoAuditoriaContent";

export const metadata: Metadata = {
  title: "Resultado de auditoría | Certilab",
  description:
    "Tu expediente está siendo procesado. Recibirás un análisis preliminar por WhatsApp en breve.",
  robots: { index: false, follow: true },
};

export default function ResultadoAuditoriaPage() {
  return (
    <Suspense
      fallback={
        <div
          className="resultado-page"
          style={{ textAlign: "center", padding: "4rem" }}
        >
          <p>Cargando...</p>
        </div>
      }
    >
      <ResultadoAuditoriaContent />
    </Suspense>
  );
}
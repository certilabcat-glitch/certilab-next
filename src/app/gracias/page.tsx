import type { Metadata } from "next";
import { Suspense } from "react";
import GraciasContentClient from "./GraciasContentClient";

export const metadata: Metadata = {
  title: "Gracias por contactar | Certilab",
  description:
    "Hemos recibido tu solicitud. Eva revisará tu caso y te responderá en menos de 24 horas laborables. Revisa tu WhatsApp.",
  robots: { index: false, follow: true },
};

export default function GraciasPage() {
  return (
    <Suspense fallback={<div className="gracias-fallback">Cargando...</div>}>
      <GraciasContentClient />
    </Suspense>
  );
}
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ayudas y Subvenciones para Eficiencia Energética 2026 | Certilab",
  description:
    "Guía completa de ayudas energéticas 2026: Next Generation, CAE, deducciones IRPF y subvenciones autonómicas. Requisitos, plazos y cómo solicitarlas sin errores.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Ayudas y Subvenciones para la Eficiencia Energética 2026",
    description:
      "Fondos Next Generation, CAE, deducciones IRPF y subvenciones autonómicas. Te explicamos qué ayudas existen, cuánto cubren y cómo solicitarlas sin perder dinero.",
    type: "article",
    publishedTime: "2026-05-02",
    modifiedTime: "2026-06-22",
  },
};

export default function AyudasEficienciaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Servicios de Consultoría Energética | Certilab",
    template: "%s | Certilab",
  },
  description:
    "Servicios profesionales de análisis energético forense: Segunda Opinión, Check-Up Inmobiliario, Informe Técnico. Arquitecta Técnica Cateb 9457.",
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

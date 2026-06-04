import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscador de Certificados Energéticos en Cataluña | Certilab",
  description:
    "Guía para encontrar un técnico certificador habilitado en tu provincia. Todo lo que necesitas saber sobre el certificado energético en Cataluña.",
  alternates: {
    canonical: "https://www.certilab.cat/buscador-certificado-energetico-catalunya/",
  },
  openGraph: {
    title: "Buscador de Certificados Energéticos en Cataluña | Certilab",
    description:
      "Guía para encontrar un técnico certificador habilitado en tu provincia.",
    url: "https://www.certilab.cat/buscador-certificado-energetico-catalunya/",
  },
};

export default function BuscadorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
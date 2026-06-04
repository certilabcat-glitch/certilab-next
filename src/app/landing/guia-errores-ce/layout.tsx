import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5 Errores que Invalidan tu Certificado Energético | Certilab",
  description:
    "Descarga gratis esta guía y aprende a detectar certificados mal hechos antes de comprar o vender tu vivienda. Por Eva María González Gracia, Arquitecta Técnica colegiada Cateb 9457.",
  alternates: {
    canonical: "https://www.certilab.cat/landing/guia-errores-ce/",
  },
  openGraph: {
    title: "5 Errores que Invalidan tu Certificado Energético | Certilab",
    description:
      "Descarga gratis esta guía y aprende a detectar certificados mal hechos antes de comprar o vender tu vivienda.",
    url: "https://www.certilab.cat/landing/guia-errores-ce/",
  },
};

export default function GuiaErroresLayout({ children }: { children: React.ReactNode }) {
  return children;
}
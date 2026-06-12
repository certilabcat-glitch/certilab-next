import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comprueba si tu Certificado Energético es fiable | Certilab",
  description:
    "Herramienta gratuita para comprobar si tu certificado energético tiene errores. Introduce tus datos y recibe un análisis detallado. Por Eva María González Gracia, Arquitecta Técnica colegiada Cateb 9457.",
  alternates: {
    canonical: "https://www.certilab.cat/landing/comprobador/",
  },
  openGraph: {
    title: "Comprueba si tu Certificado Energético es fiable | Certilab",
    description:
      "Herramienta gratuita para comprobar si tu certificado energético tiene errores. Recibe un análisis detallado al instante.",
    url: "https://www.certilab.cat/landing/comprobador/",
  },
};

export default function ComprobadorLandingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
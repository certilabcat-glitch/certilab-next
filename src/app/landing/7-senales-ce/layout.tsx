import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "7 Señales de que tu Certificado Energético Podría Contener Errores | Certilab",
  description:
    "Descarga gratis esta guía y aprende a detectar certificados energéticos mal hechos. 7 señales de alerta que todo propietario debe conocer. Eva María González García, Arquitecta Técnica.",
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

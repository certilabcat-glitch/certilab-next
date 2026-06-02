import { Metadata } from "next";
import CheckUpInmobiliarioClient from "@/components/sections/CheckUpInmobiliarioClient";

export const metadata: Metadata = {
  title:
    "Check-Up Inmobiliario Forense (199€) – Auditoría Técnica para Compraventas | Certilab",
  description:
    "Auditoría técnica forense 100% remota para blindar su compraventa inmobiliaria. Analizamos certificado energético, cargas registrales, instalaciones, Brown Discount y vicios ocultos. Informe de 10-15 páginas firmado por arquitecta Cateb 9457. Próximamente disponible.",
  alternates: { canonical: "https://www.certilab.cat/check-up-inmobiliario/" },
  openGraph: {
    title:
      "Check-Up Inmobiliario Forense – Blindamos tu Compraventa | Certilab",
    description:
      "Auditoría técnica forense 100% remota. Detecte Brown Discount, vicios ocultos, cargas registrales y riesgos técnicos antes de firmar. Informe pericial con validez jurídica. Próximamente disponible.",
    url: "https://www.certilab.cat/check-up-inmobiliario/",
  },
};

export default function CheckUpInmobiliarioPage() {
  return <CheckUpInmobiliarioClient />;
}
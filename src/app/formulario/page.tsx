import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Diagnóstico Express Gratuito | Certilab",
  description:
    "Solicita tu Diagnóstico Express gratuito. En 5 minutos recibirás un análisis orientativo de tu situación energética sin compromiso. Arquitecta Técnica Cateb 9457.",
  path: "/formulario/",
});

export default function FormularioPage() {
  return (
    <>
      <header className="hero" role="banner">
        <p className="hero-eyebrow">Sin compromiso · 100% remoto</p>
        <h1>Diagnóstico Express Gratuito</h1>
        <p className="hero-sub">
          Cuéntanos tu caso y te orientamos sin compromiso. En menos de 5
          minutos sabremos qué necesitas y te recomendaremos el servicio
          adecuado para ti.
        </p>
      </header>

      <ContactForm />
      <TrustBlockSection />
    </>
  );
}

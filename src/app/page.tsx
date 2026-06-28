import HeroSection from "@/components/sections/HeroSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProblemSection from "@/components/sections/ProblemSection";
import HowItWorks from "@/components/sections/HowItWorks";
import DespachoSection from "@/components/sections/DespachoSection";
import ContrastSection from "@/components/sections/ContrastSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import { homeFaq } from "@/data/faq";
import { PRECIOS, fmtPrecio } from "@/config/pricing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certilab | Arquitectura Técnica Forense · Consultoría Energética",
  description:
    "Consultoría energética forense. Análisis técnico independiente del certificado energético con responsabilidad profesional Cateb 9457. Segunda opinión desde 59€.",
  alternates: { canonical: "https://www.certilab.cat/" },
  openGraph: {
    title: "Certilab | Arquitectura Técnica Forense · Consultoría Energética",
    description:
      "Análisis técnico independiente de su certificado energético. Eva González, Arquitecta Técnica Cateb 9457.",
    url: "https://www.certilab.cat/",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection
        eyebrow="Despacho de Auditoría Energética · Análisis forense"
        title="Certilab · Arquitectura Técnica Forense y Consultoría Energética"
        subtitle="Análisis riguroso e independiente de tu certificado energético. 100% online y remoto, sin visitas. Con responsabilidad profesional."
        badges={[
          "Arquitecta Técnica colegiada · Cateb 9457",
          "20 años de experiencia",
          "Seguro RC Profesional",
        ]}
        ctaPrimary={{ label: `Revisar mi certificado por ${fmtPrecio(PRECIOS.segundaOpinion)}`, href: "/segunda-opinion/" }}
        ctaSecondary={{
          label: "Cómo funciona →",
          href: "#servicios",
        }}
        nota="Sin compromiso · Confidencial"
      />

      <ProblemSection />

      <ServicesGrid />

      <HowItWorks />

      <DespachoSection />

      <ContrastSection />

      <FAQSection items={homeFaq} />

      <CTASection
        title="¿Quieres saber si tu certificado es fiable?"
        text="Revisamos tu certificado energético con rigor técnico. 100% online, sin visitas. Recibes tu dictamen en 24-48h. Sin compromiso."
        buttonText={`Revisar mi certificado por ${fmtPrecio(PRECIOS.segundaOpinion)}`}
        buttonHref="/segunda-opinion/"
      />

      <TrustBlockSection />
    </>
  );
}

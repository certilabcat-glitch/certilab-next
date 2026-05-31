import HeroSection from "@/components/sections/HeroSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProblemSection from "@/components/sections/ProblemSection";
import HowItWorks from "@/components/sections/HowItWorks";
import EvaSection from "@/components/sections/EvaSection";
import ContrastSection from "@/components/sections/ContrastSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import { homeFaq } from "@/data/faq";
import { waDiagnostico } from "@/lib/wa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certilab | Arquitectura Técnica Forense · Consultoría Energética",
  description:
    "Consultoría energética forense. Análisis técnico independiente del certificado energético con responsabilidad profesional Cateb 9457. Segunda opinión desde 39€.",
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
        eyebrow="Arquitecta Técnica colegiada · Análisis forense"
        title='La verdad energética de tu inmueble,<br />con responsabilidad profesional real'
        subtitle="Analizamos su certificado energético de forma rigurosa e independiente. Sin sesgos. Con responsabilidad profesional."
        badges={[
          "Colegiada · Colegio Arquitectos Técnicos Barcelona",
          "20 años de experiencia",
          "Seguro RC Profesional",
        ]}
        ctaPrimary={{ label: "Diagnóstico Gratuito", href: waDiagnostico() }}
        ctaSecondary={{
          label: "Cómo funciona →",
          href: "#servicios",
        }}
        nota="Sin compromiso · Confidencial"
      />

      <ProblemSection />

      <ServicesGrid />

      <HowItWorks />

      <EvaSection />

      <ContrastSection />

      <FAQSection items={homeFaq} />

      <CTASection
        title="¿Listo para proteger tu inversión?"
        text="El Diagnóstico Express es gratuito y confidencial. En 5 minutos sabrás qué riesgos energéticos e inmobiliarios afectan a tu caso. Sin compromiso. Sin presiones."
        buttonText="Diagnóstico Gratuito"
        buttonHref={waDiagnostico()}
      />

      <TrustBlockSection />
    </>
  );
}

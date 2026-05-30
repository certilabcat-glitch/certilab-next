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

export default function HomePage() {
  return (
    <>
      <HeroSection
        eyebrow="Arquitecta Técnica colegiada · Análisis forense"
        title='La verdad energética de tu inmueble,<br />con responsabilidad profesional real'
        subtitle="Eva María González García, Arquitecta Técnica colegiada del Colegio de Arquitectos Técnicos de Barcelona, analiza tu certificado energético y detecta lo que otros informes ocultan. Sin algoritmos. Sin intermediarios."
        badges={[
          "Colegiada · Colegio Arquitectos Técnicos Barcelona",
          "20 años de experiencia",
          "Seguro RC Profesional",
          "100% remoto · Confidencial",
        ]}
        ctaPrimary={{ label: "Diagnóstico Gratuito", href: waDiagnostico() }}
        ctaSecondary={{
          label: "Servicios →",
          href: "#servicios",
        }}
        nota="Sin compromiso · Sin visita presencial · Sin alertar al vendedor"
      />

      <ServicesGrid />

      <ProblemSection />

      <div className="trust-bar" aria-label="Credenciales">
        <p>
          Eva María González García · Arquitecta Técnica colegiada ·
          Colegio de Arquitectos Técnicos de Barcelona · 20 años de experiencia
        </p>
      </div>

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

import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import DiffGrid from "@/components/sections/DiffGrid";
import ServicesGrid from "@/components/sections/ServicesGrid";
import PrivacySection from "@/components/sections/PrivacySection";
import HowItWorks from "@/components/sections/HowItWorks";
import ContrastSection from "@/components/sections/ContrastSection";
import EvaSection from "@/components/sections/EvaSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import CertiExpedienteForm from "@/components/forms/CertiExpedienteForm";
import { homeFaq } from "@/data/faq";
import { waDiagnostico } from "@/lib/wa";

export default function HomePage() {
  return (
    <>
      <HeroSection
        eyebrow="Arquitectura Técnica Forense · Cateb 9457"
        title='No contrate un papel.<br />Exija una <em>verdad técnica</em> con responsabilidad profesional.'
        subtitle="Análisis energético e inmobiliario firmado por arquitecta técnica colegiada. Sin algoritmos opacos. Sin comerciales disfrazados de técnicos."
        badges={[
          "Cateb 9457",
          "20 años de experiencia",
          "Seguro RC Profesional",
          "Privacidad por Diseño",
        ]}
        ctaPrimary={{ label: "Análisis Forense Gratuito", href: waDiagnostico() }}
        ctaSecondary={{
          label: "Qué es el Brown Discount →",
          href: "/blog/brown-discount-precio-vivienda/",
        }}
        nota="100% remoto · Sin visita presencial · Sin alertar al vendedor · Protegemos la intimidad de su hogar"
      >
        <CertiExpedienteForm />
      </HeroSection>

      <ProblemSection />

      <div className="trust-bar" role="complementary" aria-label="Credenciales">
        <p>
          Eva María González Gracia · Arquitecta Técnica · Cateb 9457 ·
          Colegiada y habilitada · Especialista en eficiencia energética
        </p>
      </div>

      <DiffGrid />
      <ServicesGrid />
      <PrivacySection />
      <HowItWorks />
      <ContrastSection />
      <EvaSection />

      <FAQSection items={homeFaq} />

      <CTASection
        title="¿Listo para blindar su patrimonio?"
        text="El Diagnóstico Express es gratuito y confidencial. En 5 minutos sabrá qué riesgos energéticos e inmobiliarios afectan a su caso. Sin compromiso. Sin presiones. Con secreto profesional."
        buttonText="Abrir Expediente de Blindaje"
        buttonHref={waDiagnostico()}
      />

      <TrustBlockSection />
    </>
  );
}

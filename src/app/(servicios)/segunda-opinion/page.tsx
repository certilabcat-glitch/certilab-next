import { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import IncludesBox from "@/components/ui/IncludesBox";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import StepsGrid from "@/components/sections/StepsGrid";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import { segundaOpinionFaq } from "@/data/faq";
import { waDiagnostico } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Segunda Opinión Certificado Energético | Desde 39€ | Certilab",
  description:
    "Segunda opinión de tu certificado energético desde 39€. Análisis técnico sin desplazamientos. Dictamen en 24-48h (Express <2h). Arquitecta Técnica Cateb 9457.",
  alternates: { canonical: "https://www.certilab.cat/segunda-opinion/" },
  openGraph: {
    title: "Segunda Opinión del Certificado Energético | Desde 39€ | Certilab",
    description:
      "Segunda opinión de tu certificado energético desde 39€. Análisis técnico sin desplazamientos. Arquitecta Técnica Cateb 9457.",
    url: "https://www.certilab.cat/segunda-opinion/",
  },
};

// We need to access services array this way since it's a named export
const service = {
  title: "Segunda Opinión del Certificado Energético",
  description:
    "Tienes un certificado energético y quieres saber si es fiable. Revisamos la calificación, detectamos errores o inflados y te explicamos qué significa realmente para tu inmueble.",
  price: 39,
  badge: "Más popular",
  features: [
    { num: "I", title: "Revisión de calificación", text: "Analizamos la calificación asignada y la comparamos con los datos reales del inmueble." },
    { num: "II", title: "Detección de errores", text: "Identificamos discrepancias, valores inflados u omisiones que puedan afectar a la calificación." },
    { num: "III", title: "Informe claro", text: "Te explicamos en lenguaje sencillo qué significa realmente tu certificado y si es fiable." },
    { num: "IV", title: "Entrega rápida", text: "Recibes tu análisis en 24-48 horas laborables. Sin esperas ni burocracia." },
  ],
  steps: [
    { title: "Envíanos tu certificado", text: "Sube tu certificado energético en PDF o imagen junto con la dirección del inmueble." },
    { title: "Analizamos con rigor", text: "Eva revisa personalmente cada caso. Sin automatismos. Con criterio técnico real." },
    { title: "Recibes tu dictamen", text: "Informe PDF detallado con conclusiones, errores detectados y próximos pasos." },
  ],
  includes: [
    "Análisis detallado del certificado existente",
    "Detección de discrepancias y anomalías",
    "Informe PDF con conclusiones técnicas",
    "Recomendaciones accionables",
  ],
};

export default function SegundaOpinionPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Segunda Opinión Certificado Energético", href: "/segunda-opinion/" },
        ]}
      />

      <HeroSection
        eyebrow="Servicio técnico forense"
        title="Segunda Opinión del Certificado Energético"
        subtitle="Tienes un certificado energético y quieres saber si es fiable. Revisamos la calificación, detectamos errores o inflados y te explicamos qué significa realmente para tu inmueble."
        badges={["Cateb 9457", "24-48h", "100% remoto"]}
        price="39 €"
        ctaPrimary={{ label: "Solicitar Segunda Opinión", href: waDiagnostico() }}
      />

      <FeaturesGrid features={service.features} />
      <StepsGrid steps={service.steps} />
      <IncludesBox items={service.includes} />
      <FAQSection items={segundaOpinionFaq} title="Preguntas frecuentes sobre la Segunda Opinión" />
      <CTASection
        title="¿Tienes un certificado y no te fías?"
        text="Por 39€ te decimos si es fiable. Sin compromiso. Con rigor técnico profesional."
        buttonText="Enviar mi certificado para revisión"
        buttonHref={waDiagnostico()}
      />
      <TrustBlockSection />

      {/* Schema.org Service + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Segunda Opinión Certificado Energético",
              provider: {
                "@type": "ProfessionalService",
                name: "Certilab - Eva González",
                telephone: "+34608515922",
              },
              areaServed: { "@type": "Country", name: "España" },
              offers: [
                {
                  "@type": "Offer",
                  name: "Básica",
                  price: "39",
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                  description: "Análisis técnico completo en 24-48 horas laborables",
                },
                {
                  "@type": "Offer",
                  name: "Express",
                  price: "79",
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                  description: "Mismo rigor técnico con entrega urgente en menos de 2 horas laborables",
                },
              ],
              description: service.description,
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.certilab.cat/" },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Segunda Opinión Certificado Energético",
                  item: "https://www.certilab.cat/segunda-opinion/",
                },
              ],
            },
          ]),
        }}
      />
    </>
  );
}

import { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import StepsGrid from "@/components/sections/StepsGrid";
import IncludesBox from "@/components/ui/IncludesBox";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import { waDiagnostico } from "@/lib/wa";

const features = [
  { num: "I", title: "Análisis completo", text: "Evaluación detallada del comportamiento energético del inmueble con datos reales." },
  { num: "II", title: "Mejoras priorizadas", text: "Lista de actuaciones ordenadas por impacto y retorno de la inversión." },
  { num: "III", title: "Ahorro estimado", text: "Cálculo del ahorro económico anual con cada mejora propuesta." },
  { num: "IV", title: "Ayudas disponibles", text: "Orientación sobre Next Generation, CAE, IRPF y subvenciones autonómicas." },
];

const steps = [
  { title: "Solicita el estudio", text: "Contáctanos y te explicamos qué documentación necesitamos." },
  { title: "Analizamos tu casa", text: "Revisamos planos, facturas, instalaciones y documentación técnica." },
  { title: "Recibes tu plan", text: "Informe completo con mejoras, ahorros y ayudas aplicables." },
];

export const metadata: Metadata = {
  title: "Informe Técnico Energético 399€ | Certilab",
  description:
    "Análisis completo del comportamiento energético de tu vivienda. Mejoras priorizadas, ahorro estimado y mapa de ayudas. 399€. Arquitecta Técnica Cateb 9457.",
  alternates: { canonical: "https://www.certilab.cat/informe-tecnico-energetico/" },
  openGraph: {
    title: "Informe Técnico Energético 399€ | Certilab",
    description:
      "Análisis completo del comportamiento energético de tu vivienda. Mejoras priorizadas, ahorro y ayudas.",
    url: "https://www.certilab.cat/informe-tecnico-energetico/",
  },
};

export default function InformeTecnicoPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Informe Técnico Energético", href: "/informe-tecnico-energetico/" },
        ]}
      />
      <HeroSection
        eyebrow="Máximo detalle"
        title="Informe Técnico Energético"
        subtitle="Análisis técnico completo del comportamiento energético del inmueble. Propuestas de mejora priorizadas, estimación de ahorro y orientación sobre ayudas disponibles. Para propietarios que quieren actuar."
        badges={["Cateb 9457", "Máximo detalle", "100% remoto"]}
        price="399 €"
        ctaPrimary={{ label: "Solicitar Informe Técnico", href: waDiagnostico() }}
      />
      <FeaturesGrid features={features} />
      <StepsGrid steps={steps} />
      <section className="section" style={{ paddingTop: 0 }}>
        <IncludesBox
          items={[
            "Informe técnico detallado",
            "Plan de mejora priorizado por coste-beneficio",
            "Mapa de ayudas y subvenciones aplicables",
            "Seguimiento personalizado",
          ]}
        />
      </section>
      <CTASection
        title="¿Quieres mejorar la eficiencia de tu vivienda?"
        text="Por 399€ obtienes un plan completo con mejoras, ahorros y ayudas. Inversión que se amortiza sola."
        buttonText="Solicitar mi Informe Técnico"
        buttonHref={waDiagnostico()}
      />
      <TrustBlockSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Informe Técnico Energético",
              provider: {
                "@type": "ProfessionalService",
                name: "Certilab - Eva González",
                telephone: "+34608515922",
              },
              areaServed: { "@type": "Country", name: "España" },
              offers: {
                "@type": "Offer",
                price: "399",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
              },
              description: "Análisis técnico completo del comportamiento energético de la vivienda con propuestas de mejora priorizadas.",
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.certilab.cat/" },
                { "@type": "ListItem", position: 2, name: "Informe Técnico Energético", item: "https://www.certilab.cat/informe-tecnico-energetico/" },
              ],
            },
          ]),
        }}
      />
    </>
  );
}

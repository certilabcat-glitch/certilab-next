import type { Metadata } from "next";
import InformeTecnicoContent from "./InformeTecnicoContent";

export const metadata: Metadata = {
  title: "Informe Técnico Energético (399€) | Certilab",
  description:
    "Análisis técnico completo del comportamiento energético del inmueble. Propuestas de mejora priorizadas, estimación de ahorro y orientación sobre ayudas disponibles. Firmado por arquitecta técnica colegiada CATEB 9457.",
  alternates: {
    canonical: "https://www.certilab.cat/informe-tecnico-energetico/",
  },
  openGraph: {
    title: "Informe Técnico Energético (399€) | Certilab",
    description:
      "Análisis técnico completo del comportamiento energético del inmueble. Propuestas de mejora priorizadas, estimación de ahorro y orientación sobre ayudas disponibles.",
    url: "https://www.certilab.cat/informe-tecnico-energetico/",
    siteName: "Certilab",
    locale: "es_ES",
    type: "website",
  },
};

export default function InformeTecnicoPage() {
  return (
    <>
      <InformeTecnicoContent />

      {/* Schema.org - renderizado estático en Server Component */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Informe Técnico Energético (399€)",
              description:
                "Análisis técnico completo del comportamiento energético del inmueble. Mejoras priorizadas, ahorro estimado y mapa de ayudas. Firmado por arquitecta técnica colegiada CATEB 9457.",
              image: "https://www.certilab.cat/og-image.jpg",
              provider: {
                "@type": "ProfessionalService",
                name: "Certilab - Eva María González García",
                telephone: "+34608515922",
                areaServed: { "@type": "Country", name: "ES" },
              },
              areaServed: { "@type": "Country", name: "España" },
              offers: {
                "@type": "Offer",
                name: "Informe Técnico Energético",
                price: "399",
                priceCurrency: "EUR",
                availability: "https://schema.org/PreOrder",
                description:
                  "Análisis técnico completo con plan de mejora priorizado y mapa de ayudas.",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                bestRating: "5",
                ratingCount: "87",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Inicio",
                  item: "https://www.certilab.cat/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Informe Técnico Energético",
                  item: "https://www.certilab.cat/informe-tecnico-energetico/",
                },
              ],
            },
          ]),
        }}
      />
    </>
  );
}
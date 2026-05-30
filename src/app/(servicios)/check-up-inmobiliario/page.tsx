import { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import { waDiagnostico } from "@/lib/wa";

const faq = [
  {
    q: "¿Qué incluye exactamente el Check-Up Inmobiliario?",
    a: "Incluye: Nota Simple actualizada, certificado Catastral, análisis de cargas y gravámenes, revisión del certificado energético, análisis técnico energético del inmueble, detección de riesgos y anomalías, y resumen ejecutivo. Todo en un informe de 10-15 páginas.",
  },
  {
    q: "¿En cuánto tiempo recibo el informe?",
    a: "El plazo estándar es de 48-72 horas laborables desde que recibimos toda la documentación necesaria.",
  },
  {
    q: "¿Esto sustituye a una inspección presencial?",
    a: "No. Nuestro análisis es complementario. La normativa exige visita presencial para emitir un certificado energético oficial. Nuestro valor está en el análisis forense de la documentación existente.",
  },
];

export const metadata: Metadata = {
  title: "Check-Up Inmobiliario Forense (199€) | Arquitectura Técnica | Certilab",
  description:
    "No compre a ciegas. Auditoría técnica forense 100% remota que blinda su compraventa inmobiliaria. Detectamos Brown Discount, certificados no fiables y riesgos ocultos. Arquitecta Técnica Cateb 9457.",
  alternates: { canonical: "https://www.certilab.cat/check-up-inmobiliario/" },
  openGraph: {
    title: "Check-Up Inmobiliario Forense (199€) | Certilab",
    description:
      "Auditoría técnica forense 100% remota. Detecte el Brown Discount y los vicios ocultos antes de firmar. Cateb 9457.",
    url: "https://www.certilab.cat/check-up-inmobiliario/",
  },
};

export default function CheckUpInmobiliarioPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Check-Up Inmobiliario Forense", href: "/check-up-inmobiliario/" },
        ]}
      />

      <HeroSection
        eyebrow="Antes de comprar"
        title="Check-Up Inmobiliario Forense"
        subtitle="Evaluación técnica independiente de su futuro inmueble. Analizamos el certificado energético, la documentación registral y los riesgos que podrían afectar al valor de su inversión antes de formalizar la compra."
        badges={["Cateb 9457", "48-72h", "100% remoto"]}
        price="199 €"
        ctaPrimary={{ label: "Solicitar Check-Up", href: waDiagnostico() }}
      />

      {/* ROI Grid */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="roi-grid">
          <div className="roi-box">
            <p className="roi-label">Sin Certilab</p>
            <p className="roi-price">¿Cuánto puedes perder?</p>
            <p className="roi-desc">Un piso mal calificado (E-G) pierde 5-15% de valor. Hasta 40.000€ en una vivienda de 270.000€.</p>
          </div>
          <div className="roi-box highlight">
            <p className="roi-label">Con Certilab</p>
            <p className="roi-price">199€ de inversión</p>
            <p className="roi-desc">Detectamos el Brown Discount, vicios ocultos y riesgos antes de firmar. Informe de 10-15 páginas.</p>
          </div>
        </div>
      </section>

      {/* Casos reales */}
      <section className="section" style={{ paddingTop: "2rem" }}>
        <h2 className="section-title">Casos reales que nos encontramos cada semana</h2>
        <div className="caso-card">
          <p className="caso-label">Caso 1</p>
          <p className="caso-title">Certificado con calificación A que era una D</p>
          <p className="caso-text">Comprador a punto de firmar. El certificado del vendedor marcaba A. Nuestro análisis forense reveló que era realmente una D. El comprador renegoció el precio y ahorró 18.000€.</p>
        </div>
        <div className="caso-card">
          <p className="caso-label">Caso 2</p>
          <p className="caso-title">Cargas registrales no declaradas</p>
          <p className="caso-text">El vendedor omitió una hipoteca y un embargo en la nota simple informativa. El Check-Up las detectó a tiempo. El comprador evitó una herencia de deudas de 34.000€.</p>
        </div>
        <div className="caso-card">
          <p className="caso-label">Caso 3</p>
          <p className="caso-title">Vicios ocultos en instalaciones</p>
          <p className="caso-text">Certificado energético correcto pero instalaciones eléctricas sin boletines. Detectado en el análisis técnico. El vendedor tuvo que regularizarlas antes de la venta.</p>
        </div>
      </section>

      <FeaturesGrid
        features={[
          { num: "I", title: "Nota Simple + Catastral", text: "Obtenemos y analizamos los registros oficiales del inmueble para detectar cargas, hipotecas y discrepancias." },
          { num: "II", title: "Análisis del CE", text: "Revisamos el certificado energético existente. Detectamos calificaciones infladas, errores y omisiones." },
          { num: "III", title: "Brown Discount", text: "Calculamos el impacto real de la calificación energética en el valor de mercado del inmueble." },
          { num: "IV", title: "Resumen ejecutivo", text: "Informe claro y directo con los hallazgos principales, riesgos detectados y recomendaciones para tu decisión." },
        ]}
      />

      <FAQSection items={faq} />
      <CTASection
        title="¿Vas a comprar una vivienda?"
        text="Una inversión de 199€ que le proporciona la tranquilidad de conocer el estado real del inmueble antes de comprometerse."
        buttonText="Solicitar mi Check-Up"
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
              name: "Check-Up Inmobiliario Forense",
              provider: {
                "@type": "ProfessionalService",
                name: "Certilab",
                url: "https://www.certilab.cat",
                founder: {
                  "@type": "Person",
                  name: "Eva María González García",
                  jobTitle: "Arquitecta Técnica",
                  identifier: "Cateb 9457",
                },
              },
              description: "Auditoría técnica forense 100% remota para blindar su compraventa inmobiliaria.",
              offers: {
                "@type": "Offer",
                price: "199",
                priceCurrency: "EUR",
                url: "https://www.certilab.cat/check-up-inmobiliario/",
              },
              areaServed: { "@type": "Country", name: "España" },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.certilab.cat/" },
                { "@type": "ListItem", position: 2, name: "Check-Up Inmobiliario Forense (199€)", item: "https://www.certilab.cat/check-up-inmobiliario/" },
              ],
            },
          ]),
        }}
      />
    </>
  );
}

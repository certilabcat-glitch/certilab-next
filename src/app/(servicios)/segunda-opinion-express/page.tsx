import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import StepsGrid from "@/components/sections/StepsGrid";
import IncludesBox from "@/components/ui/IncludesBox";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import TrustNumbers from "@/components/sections/TrustNumbers";
import { waDiagnostico } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Segunda Opinión Express | Certilab",
  description:
    "Análisis técnico forense urgente de certificados energéticos con entrega en menos de 4 horas. Mismo rigor que la modalidad estándar. Arquitecta técnica colegiada CATEB.",
  alternates: {
    canonical: "https://www.certilab.cat/segunda-opinion-express/",
  },
  openGraph: {
    title: "Segunda Opinión Express | Certilab",
    description:
      "Análisis técnico forense urgente de certificados energéticos con entrega en menos de 4 horas. Mismo rigor que la modalidad estándar.",
    url: "https://www.certilab.cat/segunda-opinion-express/",
    siteName: "Certilab",
    locale: "es_ES",
    type: "website",
    images: [{ url: "https://www.certilab.cat/og-image.jpg" }],
  },
};

const faq = [
  {
    q: "¿El análisis Express tiene el mismo rigor que el estándar?",
    a: "Sí, el análisis técnico es idéntico. La única diferencia es el plazo de entrega: menos de 4 horas en lugar de 24-48h.",
  },
  {
    q: "¿En qué horario está disponible el servicio Express?",
    a: "De lunes a viernes, de 9:00 a 18:00 horas. Los pedidos fuera de este horario se procesan al inicio de la siguiente ventana disponible.",
  },
  {
    q: "¿Qué necesito para solicitarlo?",
    a: "El certificado energético en PDF o imagen y la dirección del inmueble. Misma documentación que la modalidad estándar.",
  },
];

const waUrl = waDiagnostico();

export default function SegundaOpinionExpressPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Segunda Opinión Express", href: "/segunda-opinion-express/" },
        ]}
      />

      <HeroSection
        eyebrow="Respuesta urgente"
        title="Segunda Opinión Express"
        subtitle="El mismo análisis que la Segunda Opinión estándar, pero con entrega en menos de 4 horas. Para cuando no puedes esperar."
        badges={["Colegiada CATEB Barcelona", "Entrega <4h", "Urgente"]}
        price="79 €"
        credentials="Eva María González García · Arquitecta Técnica colegiada"
        ctaPrimary={{ label: "Solicitar Express", href: waUrl }}
        ctaSecondary={{ label: "→ Volver a la estándar (39€)", href: "/segunda-opinion/" }}
        nota="Precio cerrado sin sorpresas (sin IVA). Servicio disponible lunes a viernes de 9:00 a 18:00 h."
      >
        <p className="hero-garantia">
          <span className="hero-garantia-icon">&#9432;</span>
          Mismo análisis riguroso que la Segunda Opinión estándar. Solo cambia el plazo: de 24-48h a menos de 4h.
        </p>
      </HeroSection>

      {/* TRUST INDICATORS */}
      <TrustNumbers />

      {/* FEATURES */}
      <FeaturesGrid
        features={[
          { num: "I", title: "Mismo rigor técnico", text: "El análisis es idéntico al de la modalidad estándar. El equipo técnico revisa personalmente cada caso." },
          { num: "II", title: "Entrega rápida", text: "Menos de 4 horas laborables desde que recibimos tu documentación." },
          { num: "III", title: "Para firmas inminentes", text: "Perfecto si tienes una compraventa, firma de hipoteca o fecha límite." },
          { num: "IV", title: "Soporte prioritario", text: "Atención preferente durante todo el proceso. Habla directamente con el equipo técnico." },
        ]}
      />

      {/* HORARIOS */}
      <section className="section schedule-section">
        <h2 className="section-title">Horarios del servicio Express</h2>
        <p className="section-sub">Consulta la disponibilidad para saber cuándo puedes recibir tu informe urgente.</p>
        <div className="schedule-grid">
          <div className="schedule-item">
            <span className="schedule-label">Disponibilidad</span>
            <span className="schedule-value">Lunes a viernes, 9:00 – 18:00 h (laborables)</span>
          </div>
          <div className="schedule-item">
            <span className="schedule-label">Plazo de entrega</span>
            <span className="schedule-value">Menos de 4 horas desde la recepción de documentos</span>
          </div>
          <div className="schedule-item">
            <span className="schedule-label">Pedidos fuera de horario</span>
            <span className="schedule-value">Se procesan al inicio de la siguiente ventana disponible</span>
          </div>
        </div>
      </section>

      {/* COMPARATIVA */}
      <section className="section comparison-section">
        <h2 className="section-title">Comparativa: Estándar vs Express</h2>
        <p className="section-sub">Las dos modalidades comparten el mismo rigor técnico. La diferencia está en el plazo y el precio.</p>
        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Característica</th>
                <th>Estándar (39€)</th>
                <th>Express (79€)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="comparison-highlight">Plazo de entrega</td>
                <td>24-48 horas laborables</td>
                <td>Menos de 4 horas</td>
              </tr>
              <tr>
                <td className="comparison-highlight">Rigor técnico</td>
                <td>Máximo</td>
                <td>Máximo (idéntico)</td>
              </tr>
              <tr>
                <td className="comparison-highlight">Horario</td>
                <td>24/7</td>
                <td>L–V 9–18 h</td>
              </tr>
              <tr>
                <td className="comparison-highlight">Soporte</td>
                <td>Estándar</td>
                <td>Prioritario</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* STEPS */}
      <StepsGrid
        steps={[
          { title: "Solicita", text: "Contáctanos por WhatsApp con tu certificado y dirección." },
          { title: "Analizamos", text: "El equipo técnico revisa tu caso de forma prioritaria y urgente." },
          { title: "Recibes", text: "En menos de 4h tienes tu dictamen técnico detallado." },
        ]}
      />

      {/* INCLUDES */}
      <section className="section includes-section">
        <h2 className="section-title">¿Qué incluye por 79€?</h2>
        <p className="section-sub">Todo lo que incluye la modalidad estándar, con prioridad absoluta.</p>
        <IncludesBox
          items={[
            "Análisis completo del certificado energético",
            "Detección de discrepancias y anomalías",
            "Detección de Brown Discount",
            "Informe PDF urgente con conclusiones técnicas",
            "Soporte prioritario durante todo el proceso",
            "Orientación sobre próximos pasos",
          ]}
        />
      </section>

      <FAQSection items={faq} title="Preguntas sobre el servicio Express" />

      <CTASection
        title="¿Necesitas una respuesta urgente?"
        text="Para firmas inminentes, compraventas o plazos ajustados. Entrega en menos de 4 horas."
        buttonText="Solicitar Express ahora"
        buttonHref={waUrl}
      />
      <TrustBlockSection />

      {/* STICKY CTA BAR */}
      <div className="sticky-cta-bar">
        <div className="sticky-cta-inner">
          <div className="sticky-cta-info">
            <span className="sticky-cta-price">79€</span>
            <span className="sticky-cta-meta">{'<'}4h · Urgente</span>
          </div>
          <div className="sticky-cta-actions">
            <a href={waUrl} className="sticky-cta-button">
              Solicitar Express
            </a>
            <a
              href={waUrl}
              className="sticky-cta-wa"
              aria-label="Contactar por WhatsApp"
              title="Escríbenos por WhatsApp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>
        <p className="sticky-cta-micro">Pago seguro · Datos protegidos · Sin compromiso</p>
      </div>

      {/* Schema.org Service — renderizado estático desde Server Component */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Segunda Opinión Express Certificado Energético",
            description: "Análisis técnico forense urgente de certificados energéticos con entrega en menos de 4 horas. Mismo rigor que la modalidad estándar. Firmado por arquitecta técnica colegiada CATEB 9457.",
            image: "https://www.certilab.cat/og-image.jpg",
            provider: {
              "@type": "ProfessionalService",
              name: "Certilab - Eva María González García",
              telephone: "+34608515922",
              areaServed: { "@type": "Country", name: "ES" },
            },
            areaServed: { "@type": "Country", name: "España" },
            offers: [
              {
                "@type": "Offer",
                name: "Segunda Opinión Express",
                price: "79",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                description: "Análisis técnico completo con entrega urgente en menos de 4 horas. Ideal para firmas inminentes.",
              },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              bestRating: "5",
              ratingCount: "87",
            },
          }),
        }}
      />

      {/* Schema.org HowTo — renderizado estático desde Server Component */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Cómo obtener una segunda opinión express de tu certificado energético",
            description: "Tres pasos para saber si tu certificado energético es fiable en menos de 4 horas.",
            image: "https://www.certilab.cat/og-image.jpg",
            totalTime: "PT4H",
            estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "79" },
            supply: { "@type": "HowToSupply", name: "Certificado energético original en PDF o imagen" },
            tool: { "@type": "HowToTool", name: "WhatsApp" },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Solicita por WhatsApp",
                text: "Contáctanos al 608 51 59 22 con tu certificado y la dirección del inmueble.",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Analizamos de forma prioritaria",
                text: "Nuestra arquitecta técnica revisa el certificado de forma urgente, detectando errores y calificaciones infladas.",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Recibes tu dictamen en menos de 4h",
                text: "Te entregamos un informe PDF firmado con las conclusiones técnicas.",
              },
            ],
          }),
        }}
      />

      {/* Schema.org BreadcrumbList — renderizado estático desde Server Component */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.certilab.cat/" },
              { "@type": "ListItem", position: 2, name: "Segunda Opinión Express", item: "https://www.certilab.cat/segunda-opinion-express/" },
            ],
          }),
        }}
      />

    </>
  );
}
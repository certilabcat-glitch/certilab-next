import { COMPANY, CONTACTO, RESPONSABLE } from "@/config";
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
import { waUrl } from "@/lib/wa";

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
        rating={{ value: 4.9, count: 87 }}
        ctaPrimary={{ label: "Solicitar Express", href: waUrl("Hola, quiero solicitar la Segunda Opinión Express para mi certificado energético (79€).") }}

        nota="Precio cerrado sin sorpresas (IVA incluido). Disponible lunes a viernes de 9:00 a 18:00 h. Pedidos fuera de horario se procesan al inicio de la siguiente ventana."
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

      {/* STEPS MOVED HERE */}
      
      
        
        
        
          
            
              <tr>
                
                
                
              </tr>
            
            
              <tr>
                
                
                
              </tr>
              <tr>
                
                
                
              </tr>
              <tr>
                
                
                
              </tr>
              <tr>
                
                
                
              </tr>
            
          
        </div>
      </section>

      </>); } // END OF COMPONENT - EVERYTHING BELOW IS COMMENTED
      {/* STEPS */}
      <StepsGrid
        steps={[
          { title: "Solicita", text: "Contacta por WhatsApp con tu certificado y dirección." },
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
        buttonText="Solicitar Express"
        buttonHref={waUrl("Hola, quiero solicitar la Segunda Opinión Express para mi certificado energético (79€).") }
      />
      <TrustBlockSection />

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
             url: "https://www.certilab.cat/segunda-opinion-express/",
             provider: {
               "@type": "ProfessionalService",
               name: `${COMPANY.marca} - ${RESPONSABLE.nombreCompleto}`,
               telephone: `+34${CONTACTO.whatsappNumero.slice(3)}`,
               email: CONTACTO.email,
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
                 url: "https://www.certilab.cat/segunda-opinion-express/",
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
                text: "Contáctanos al {CONTACTO.whatsappFormateado} con tu certificado y la dirección del inmueble.",
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

      {/* Schema.org FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />

    </>
  );
}

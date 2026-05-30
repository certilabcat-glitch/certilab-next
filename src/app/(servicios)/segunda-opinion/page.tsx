"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import IncludesBox from "@/components/ui/IncludesBox";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import StepsGrid from "@/components/sections/StepsGrid";
import ComparativaSection from "@/components/sections/ComparativaSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import { segundaOpinionFaq } from "@/data/faq";
import { waDiagnostico } from "@/lib/wa";

const features = [
  { num: "I", title: "Revisión de calificación", text: "Analizamos la calificación asignada y la comparamos con los datos reales del inmueble para detectar si está inflada o es incorrecta." },
  { num: "II", title: "Detección de errores", text: "Identificamos discrepancias, valores inventados, omisiones y cualquier anomalía que pueda afectar a la calificación." },
  { num: "III", title: "Informe claro y útil", text: "Te explicamos en lenguaje sencillo qué significa realmente tu certificado y si puedes confiar en él para tu compra o venta." },
  { num: "IV", title: "Detección de Brown Discount", text: "Identificamos si tu inmueble sufre el descuento por mala calificación energética, que puede restar hasta un 15% de su valor." },
];

const steps = [
  { title: "Envíanos tu certificado", text: "Sube tu certificado energético en PDF o imagen junto con la dirección del inmueble. Sin desplazamientos." },
  { title: "Eva lo analiza", text: "Eva revisa personalmente cada caso. Sin algoritmos, sin automatismos. Con rigor técnico profesional." },
  { title: "Recibes tu dictamen", text: "Informe PDF detallado con conclusiones, errores detectados, detección de Brown Discount y próximos pasos." },
];

export default function SegundaOpinionPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Segunda Opinión", href: "/segunda-opinion/" },
        ]}
      />

      <HeroSection
        eyebrow="Servicio estrella · El más solicitado"
        title="Segunda Opinión del Certificado Energético"
        subtitle="Tienes un certificado energético pero no te fías. Por 39€ revisamos la calificación, detectamos errores o inflados y te decimos si puedes confiar en él. Sin desplazamientos. Sin complicaciones."
        badges={["Colegiada CATEB Barcelona", "24-48h", "100% remoto", "Más solicitado"]}
        price="39 €"
        credentials="Eva María González García · Arquitecta Técnica colegiada"
        ctaPrimary={{ label: "Solicitar Segunda Opinión", href: waDiagnostico() }}
        ctaSecondary={{ label: "Express 2h (79€) →", href: "/segunda-opinion-express/" }}
        nota="Precio cerrado sin sorpresas. Si necesitas más profundidad, te recomendaremos el servicio adecuado."
      />

      {/* PROBLEMA QUE RESUELVE */}
      <section className="section problem-section">
        <h2 className="section-title">¿Por qué necesitas una Segunda Opinión?</h2>
        <p className="section-sub">El 30% de los certificados energéticos contienen errores que pueden costarte miles de euros.</p>
        <div className="problem-grid">
          <div className="problem-card">
            <h3>Calificaciones infladas</h3>
            <p>El vendedor contrata a un técnico que asigna una calificación superior a la real. Una B que debería ser una E puede ocultar un sobrecoste energético de miles de euros al año.</p>
          </div>
          <div className="problem-card">
            <h3>Brown Discount: pérdida de valor</h3>
            <p>Un inmueble con calificación E, F o G puede perder entre un <strong>5% y un 15%</strong> de su valor de mercado. Son hasta <strong>40.000€</strong> en una vivienda de 270.000€. Nuestro informe detecta este riesgo.</p>
          </div>
          <div className="problem-card">
            <h3>Datos sin verificar</h3>
            <p>Muchos certificados se elaboran con datos genéricos del catastro, sin visita presencial. Si tu certificado no es fiable, cualquier decisión que tomes sobre él tampoco lo será.</p>
          </div>
        </div>
      </section>

      {/* COMPARATIVA VISUAL */}
      <ComparativaSection
        title="Informe Algorítmico vs. Segunda Opinión Certilab"
        subtitle="No todos los análisis son iguales. Mira lo que obtienes con cada uno."
        cols={[
          {
            label: "Informe Algorítmico (30-50€)",
            items: [
              "Generado por software sin revisión técnica real",
              "Sin responsabilidad profesional",
              "Datos genéricos del catastro, sin verificar",
              "Sin detección de Brown Discount",
              "PDF de 2-3 páginas con plantilla estándar",
            ],
          },
          {
            label: "Segunda Opinión Certilab (39€)",
            items: [
              "Revisado personalmente por Eva, CATEB Barcelona",
              "Con seguro de responsabilidad civil profesional",
              "Análisis basado en documentación real de tu inmueble",
              "Detecta el Brown Discount antes de que afecte a tu precio",
              "Informe de 5-10 páginas con validez ante notario y banco",
            ],
            destacado: true,
          },
        ]}
      />

      <FeaturesGrid features={features} />
      <StepsGrid steps={steps} />

      {/* CROSS-SELLING: OTROS SERVICIOS */}
      <section className="section cross-section">
        <h2 className="section-title">¿Necesitas algo más completo?</h2>
        <p className="section-sub">Si tu caso requiere más profundidad, estos servicios son el siguiente paso natural.</p>
        <div className="cross-grid">
          <Link href="/segunda-opinion-express/" className="cross-card">
            <span className="cross-badge">Urgente</span>
            <h3>Express 2h (79€)</h3>
            <p>El mismo análisis, pero con entrega en menos de 2 horas. Para firmas inminentes o plazos ajustados.</p>
            <span className="cross-link">Ver servicio →</span>
          </Link>
          <Link href="/check-up-inmobiliario/" className="cross-card destacado">
            <span className="cross-badge">Recomendado</span>
            <h3>Check-Up Inmobiliario (199€)</h3>
            <p>Incluye Nota Simple, Catastral, análisis de cargas, revisión del CE y detección completa de riesgos. Ideal antes de firmar.</p>
            <span className="cross-link">Ver servicio →</span>
          </Link>
          <Link href="/informe-tecnico-energetico/" className="cross-card">
            <span className="cross-badge">Máximo detalle</span>
            <h3>Informe Técnico (399€)</h3>
            <p>Análisis completo del comportamiento energético con propuestas de mejora y orientación sobre ayudas.</p>
            <span className="cross-link">Ver servicio →</span>
          </Link>
        </div>
      </section>

      <IncludesBox items={[
        "Análisis detallado del certificado existente",
        "Detección de discrepancias y anomalías",
        "Detección de Brown Discount",
        "Informe PDF con conclusiones técnicas",
        "Recomendaciones accionables",
        "Orientación sobre próximos pasos",
      ]} />

      <FAQSection items={segundaOpinionFaq} title="Preguntas frecuentes sobre la Segunda Opinión" />

      <CTASection
        title="¿Tienes un certificado y no te fías?"
        text="Por 39€ te decimos si es fiable. Sin compromiso. Con el rigor técnico de una arquitecta técnica colegiada."
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
                name: "Certilab - Eva María González García",
                telephone: "+34608515922",
              },
              areaServed: { "@type": "Country", name: "España" },
              offers: [
                {
                  "@type": "Offer",
                  name: "Segunda Opinión Estándar",
                  price: "39",
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                  description: "Análisis técnico completo en 24-48 horas laborables",
                },
                {
                  "@type": "Offer",
                  name: "Segunda Opinión Express",
                  price: "79",
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                  description: "Mismo rigor técnico con entrega urgente en menos de 2 horas",
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.certilab.cat/" },
                { "@type": "ListItem", position: 2, name: "Segunda Opinión Certificado Energético", item: "https://www.certilab.cat/segunda-opinion/" },
              ],
            },
          ]),
        }}
      />

      <style jsx>{`
        .section {
          padding: 5rem 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .section-title {
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 400;
          color: var(--color-black);
          text-align: center;
          margin-bottom: 0.75rem;
        }
        .section-sub {
          text-align: center;
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--color-grey);
          max-width: 550px;
          margin: 0 auto 3rem;
          line-height: 1.7;
        }
        .problem-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }
        .problem-card {
          border: 1px solid var(--color-border);
          padding: 2rem;
        }
        .problem-card h3 {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 0.75rem;
        }
        .problem-card p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          line-height: 1.65;
          margin: 0;
        }
        .cross-section {
          background: var(--color-crema);
          max-width: 100%;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .cross-section .section-title,
        .cross-section .section-sub {
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }
        .cross-section .section-sub {
          margin-bottom: 3rem;
        }
        .cross-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .cross-card {
          display: block;
          text-decoration: none;
          color: inherit;
          border: 1px solid var(--color-border);
          padding: 2rem;
          background: #fff;
          position: relative;
          transition: all 0.3s ease;
        }
        .cross-card:hover {
          box-shadow: var(--shadow-card-hover);
          transform: translateY(-2px);
        }
        .cross-card.destacado {
          border: 2px solid var(--color-black);
        }
        .cross-badge {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-terra);
          font-weight: 600;
          background: rgba(196, 168, 130, 0.15);
          padding: 0.2rem 0.75rem;
          border-radius: 4px;
          margin-bottom: 1rem;
        }
        .cross-card h3 {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--color-black);
          margin-bottom: 0.75rem;
          transition: color 0.2s;
        }
        .cross-card:hover h3 {
          color: var(--color-terra);
        }
        .cross-card p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          line-height: 1.65;
          margin-bottom: 1.5rem;
        }
        .cross-link {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-terra);
        }
        .cross-card:hover .cross-link {
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        @media (max-width: 767px) {
          .section { padding: 3rem 1.5rem; }
          .problem-grid { grid-template-columns: 1fr; }
          .cross-grid { grid-template-columns: 1fr; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .cross-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </>
  );
}

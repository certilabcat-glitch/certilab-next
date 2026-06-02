"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import IncludesBox from "@/components/ui/IncludesBox";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import StepsGrid from "@/components/sections/StepsGrid";
import ComparativaSection from "@/components/sections/ComparativaSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import TrustNumbers from "@/components/sections/TrustNumbers";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
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
  { title: "Analizamos tu certificado", text: "El equipo técnico revisa personalmente cada caso. Sin algoritmos, sin automatismos. Con rigor técnico profesional." },
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
        eyebrow="¿No se fía de su certificado energético?"
        title="Segunda Opinión del Certificado Energético"
        subtitle="Por 39€ revisamos su certificado, detectamos calificaciones infladas, errores técnicos y Brown Discount. Le decimos si su certificado es fiable o si le están engañando. Sin desplazamientos."
        badges={["Colegiada CATEB Barcelona", "24-48h", "100% remoto"]}
        price="39 €"
        priceOld="60 €"
        credentials="Eva María González García · Arquitecta Técnica colegiada"
        ctaPrimary={{ label: "Solicitar Segunda Opinión", href: waDiagnostico() }}
        ctaSecondary={{ label: "Express 2h (79€) →", href: "/segunda-opinion-express/" }}
        nota="Precio cerrado sin sorpresas. Si necesita más profundidad, le recomendaremos el servicio adecuado."
      >
        <p className="hero-garantia">
          <span className="hero-garantia-icon">&#9432;</span>
          Garantía de satisfacción: si su certificado es correcto, le devolvemos el dinero.
        </p>
      </HeroSection>

      {/* TRUST INDICATORS */}
      <TrustNumbers />

      {/* PROBLEMA QUE RESUELVE */}
      <section className="section problem-section">
        <h2 className="section-title">¿Por qué necesita una Segunda Opinión?</h2>
        <p className="section-sub">El 30% de los certificados energéticos contienen errores que pueden costarle miles de euros.</p>
        <div className="problem-grid">
          <div className="problem-card">
            <h3>Calificaciones infladas</h3>
            <p>El vendedor contrata un técnico que asigna una calificación superior a la real. Una B que debería ser una E puede ocultar un sobrecoste energético de miles de euros al año.</p>
          </div>
          <div className="problem-card">
            <h3>Brown Discount: pérdida de valor</h3>
            <p>Un inmueble con calificación E, F o G puede perder entre un <strong>5% y un 15%</strong> de su valor de mercado. Son hasta <strong>40.000€</strong> en una vivienda de 270.000€. Nuestro informe detecta este riesgo.</p>
          </div>
          <div className="problem-card">
            <h3>Datos sin verificar</h3>
            <p>Muchos certificados se elaboran con datos genéricos del catastro, sin visita presencial. Si su certificado no es fiable, cualquier decisión que tome sobre él tampoco lo será.</p>
          </div>
        </div>
        <div className="problem-cta">
          <a href={waDiagnostico()} className="problem-cta-button">Quiero saber si mi certificado es fiable →</a>
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
              "Revisado por arquitecta técnica colegiada, CATEB Barcelona",
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

      {/* QUÉ INCLUYE – MOVED UP AFTER STEPS */}
      <section className="section includes-section">
        <h2 className="section-title">¿Qué incluye por 39€?</h2>
        <p className="section-sub">Todo lo que necesita para saber si puede confiar en su certificado energético.</p>
        <IncludesBox items={[
          "Análisis detallado del certificado existente",
          "Detección de discrepancias y anomalías",
          "Detección de Brown Discount",
          "Informe PDF con conclusiones técnicas",
          "Recomendaciones accionables",
          "Orientación sobre próximos pasos",
        ]} />
      </section>

      {/* ASÍ ES SU INFORME */}
      <section className="section preview-section">
        <h2 className="section-title">Así es su informe</h2>
        <p className="section-sub">Un documento claro, profesional y listo para presentar ante notario o banco.</p>
        <div className="preview-grid">
          <div className="preview-card">
            <div className="preview-card-header">
              <span className="preview-badge">Portada</span>
            </div>
            <div className="preview-card-body">
              <div className="preview-line preview-line-lg" />
              <div className="preview-line" />
              <div className="preview-line preview-line-md" />
              <div className="preview-line" />
              <div className="preview-line preview-line-sm" />
            </div>
          </div>
          <div className="preview-card">
            <div className="preview-card-header">
              <span className="preview-badge">Conclusiones</span>
            </div>
            <div className="preview-card-body">
              <div className="preview-line" />
              <div className="preview-line preview-line-lg" />
              <div className="preview-line" />
              <div className="preview-line preview-line-md" />
              <div className="preview-line preview-line-sm" />
            </div>
          </div>
          <div className="preview-card">
            <div className="preview-card-header">
              <span className="preview-badge">Brown Discount</span>
            </div>
            <div className="preview-card-body">
              <div className="preview-line preview-line-lg" />
              <div className="preview-line" />
              <div className="preview-line preview-line-md" />
              <div className="preview-line" />
              <div className="preview-line" />
            </div>
          </div>
        </div>
        <p className="preview-note">
          <span className="preview-note-icon">📄</span>
          Informe real de 5-10 páginas con validez jurídica. Recibirá un PDF listo para descargar e imprimir.
        </p>
      </section>

      {/* MICRO-CONFIANZA: POR QUÉ CERTILAB */}
      <section className="section trust-reasons-section">
        <h2 className="section-title">¿Por qué confiar su revisión a Certilab?</h2>
        <p className="section-sub">No somos un comparador ni un generador automático. Somos profesionales colegiados.</p>
        <div className="trust-reasons-grid">
          <div className="trust-reason-card">
            <div className="trust-reason-num">01</div>
            <h3>Revisión humana real</h3>
            <p>Cada certificado lo analiza personalmente una arquitecta técnica colegiada. Sin IA, sin automatismos.</p>
          </div>
          <div className="trust-reason-card">
            <div className="trust-reason-num">02</div>
            <h3>Responsabilidad profesional</h3>
            <p>Eva María González García, colegiada CATEB 9457, con seguro de responsabilidad civil. Firmamos lo que dictaminamos.</p>
          </div>
          <div className="trust-reason-card">
            <div className="trust-reason-num">03</div>
            <h3>Independencia total</h3>
            <p>No vendemos certificados energéticos. No tenemos conflicto de interés. Nuestra única función es decirle la verdad sobre el suyo.</p>
          </div>
          <div className="trust-reason-card">
            <div className="trust-reason-num">04</div>
            <h3>Sin esperas ni papeleo</h3>
            <p>100% online. Envíenos su PDF por WhatsApp y recibirá su informe en 24-48h. Sin desplazarse, sin llamadas, sin compromiso.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      <FAQSection items={segundaOpinionFaq} title="Preguntas frecuentes sobre la Segunda Opinión" />

      <CTASection
        title="¿Desconfía de la calificación de su certificado?"
        text="Por 39€ le decimos si es fiable. Sin compromiso. Con el rigor técnico de una arquitecta técnica colegiada."
        buttonText="Enviar mi certificado para revisión"
        buttonHref={waDiagnostico()}
      />
      <TrustBlockSection />

      {/* STICKY CTA BAR – TODOS LOS DISPOSITIVOS */}
      <div className="sticky-cta-bar">
        <div className="sticky-cta-inner">
          <div className="sticky-cta-info">
            <span className="sticky-cta-price">39€</span>
            <span className="sticky-cta-meta">24-48h · Sin sorpresas</span>
          </div>
          <div className="sticky-cta-actions">
            <a href={waDiagnostico()} className="sticky-cta-button">
              Solicitar ahora
            </a>
            <a
              href={waDiagnostico()}
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

      {/* Schema.org Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Segunda Opinión Certificado Energético",
            description: "Análisis técnico forense de certificados energéticos. Detectamos calificaciones infladas, errores técnicos y Brown Discount. Firmado por arquitecta técnica colegiada CATEB 9457 con seguro de responsabilidad civil.",
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
                name: "Segunda Opinión Estándar",
                price: "39",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                description: "Análisis técnico completo en 24-48 horas laborables. Incluye informe detallado en PDF firmado por arquitecta colegiada.",
              },
              {
                "@type": "Offer",
                name: "Segunda Opinión Express",
                price: "79",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                description: "Mismo rigor técnico con entrega urgente en menos de 2 horas. Ideal para firmas inminentes.",
              },
            ],
            review: {
              "@type": "Review",
              reviewRating: {
                "@type": "Rating",
                ratingValue: "4.9",
                bestRating: "5",
              },
              author: {
                "@type": "Person",
                name: "Certilab",
              },
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              bestRating: "5",
              ratingCount: "87",
            },
          }),
        }}
      />

      {/* Schema.org HowTo — pasos del servicio */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Cómo obtener una segunda opinión de tu certificado energético",
            description: "Tres pasos para saber si tu certificado energético es fiable.",
            image: "https://www.certilab.cat/og-image.jpg",
            totalTime: "P1D",
            estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "39" },
            supply: { "@type": "HowToSupply", name: "Certificado energético original en PDF o imagen" },
            tool: { "@type": "HowToTool", name: "WhatsApp o formulario web" },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Envíanos tu certificado",
                text: "Mándanos tu certificado energético por WhatsApp al 608 51 59 22 o a través del formulario de la web. Solo necesitas el PDF y la dirección del inmueble.",
                image: "https://www.certilab.cat/og-image.jpg",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Analizamos técnicamente",
                text: "Nuestra arquitecta técnica revisa el certificado en detalle: calificación energética, datos catastrales, antigüedad, superficie, y detecta posibles errores o calificaciones infladas.",
                image: "https://www.certilab.cat/og-image.jpg",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Recibes tu dictamen",
                text: "Te entregamos un informe PDF firmado con la conclusión: si el certificado es correcto o si tiene errores que afectan a la calificación y al valor del inmueble.",
                image: "https://www.certilab.cat/og-image.jpg",
              },
            ],
          }),
        }}
      />

      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.certilab.cat/" },
              { "@type": "ListItem", position: 2, name: "Segunda Opinión Certificado Energético", item: "https://www.certilab.cat/segunda-opinion/" },
            ],
          }),
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

        /* HERO GARANTÍA */
        .hero-garantia {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-black);
          margin-top: 1.5rem;
          padding: 0.75rem 1.5rem;
          border: 1px solid var(--color-terra);
          background: rgba(196, 168, 130, 0.08);
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        }
        .hero-garantia-icon {
          font-size: 1rem;
          color: var(--color-terra);
          flex-shrink: 0;
        }

        /* PROBLEM */
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
        .problem-cta {
          text-align: center;
          margin-top: 2.5rem;
        }
        .problem-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-black);
          color: #fff;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 500;
          text-decoration: none;
          padding: 0.85rem 2rem;
          border-radius: 6px;
          transition: background 0.2s;
        }
        .problem-cta-button:hover {
          background: #333;
        }

        /* INCLUDES SECTION */
        .includes-section {
          background: var(--color-crema);
          max-width: 100%;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .includes-section .section-title,
        .includes-section .section-sub {
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }
        .includes-section :global(.includes-box) {
          max-width: 600px;
          margin: 0 auto;
          background: #fff;
        }

        /* PREVIEW SECTION */
        .preview-section {
          max-width: 100%;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .preview-section .section-title,
        .preview-section .section-sub {
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }
        .preview-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .preview-card {
          border: 1px solid var(--color-border);
          background: #fff;
          overflow: hidden;
        }
        .preview-card-header {
          padding: 0.65rem 1rem;
          border-bottom: 1px solid var(--color-border);
          background: var(--color-crema);
        }
        .preview-badge {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-grey);
          font-weight: 600;
        }
        .preview-card-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .preview-line {
          height: 6px;
          background: #e8e4de;
          border-radius: 3px;
          width: 100%;
        }
        .preview-line-lg { width: 85%; }
        .preview-line-md { width: 65%; }
        .preview-line-sm { width: 45%; }
        .preview-note {
          text-align: center;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          margin: 2rem auto 0;
          max-width: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .preview-note-icon {
          font-size: 1.1rem;
        }

        /* TRUST REASONS */
        .trust-reasons-section {
          background: var(--color-crema);
          max-width: 100%;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .trust-reasons-section .section-title,
        .trust-reasons-section .section-sub {
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }
        .trust-reasons-section .section-sub {
          margin-bottom: 3rem;
        }
        .trust-reasons-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .trust-reason-card {
          background: #fff;
          border: 1px solid var(--color-border);
          padding: 2rem 1.5rem;
          text-align: center;
        }
        .trust-reason-num {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: var(--color-terra);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
        }
        .trust-reason-card h3 {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--color-black);
          margin-bottom: 0.65rem;
        }
        .trust-reason-card p {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          line-height: 1.6;
          margin: 0;
        }

        /* STICKY CTA BAR */
        .sticky-cta-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #fff;
          border-top: 1px solid var(--color-border);
          padding: 0.75rem 1rem 0.5rem;
          z-index: 100;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.06);
        }
        .sticky-cta-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .sticky-cta-info {
          display: flex;
          flex-direction: column;
          line-height: 1.3;
        }
        .sticky-cta-price {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--color-black);
        }
        .sticky-cta-meta {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--color-grey);
        }
        .sticky-cta-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .sticky-cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--color-terra);
          color: #fff;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          padding: 0.7rem 1.5rem;
          border-radius: 6px;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .sticky-cta-button:hover {
          background: var(--color-terra-dark);
        }
        .sticky-cta-wa {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border: 1px solid var(--color-border);
          border-radius: 6px;
          color: var(--color-grey);
          transition: all 0.2s;
          flex-shrink: 0;
          text-decoration: none;
        }
        .sticky-cta-wa:hover {
          color: #25D366;
          border-color: #25D366;
        }
        .sticky-cta-micro {
          text-align: center;
          font-family: var(--font-sans);
          font-size: 0.65rem;
          color: var(--color-grey);
          margin: 0.35rem 0 0;
          line-height: 1;
          opacity: 0.75;
        }

        @media (max-width: 767px) {
          .section { padding: 3rem 1.5rem; }
          :global(body) { padding-bottom: 5.5rem; }
          .problem-grid { grid-template-columns: 1fr; }
          .trust-reasons-grid { grid-template-columns: 1fr; }
          .preview-grid { grid-template-columns: 1fr; max-width: 400px; }
          .sticky-cta-bar { display: block; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .trust-reasons-grid { grid-template-columns: repeat(2, 1fr); }
          .preview-grid { grid-template-columns: repeat(2, 1fr); }
          .sticky-cta-bar { display: block; }
        }
        @media (min-width: 1024px) {
          .sticky-cta-bar { display: block; }
        }
      `}</style>
    </>
  );
}
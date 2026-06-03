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
import BDHelp from "@/components/ui/BDHelp";
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
        eyebrow="¿Confías en que la letra de tu certificado energético es real?"
        title="La Segunda Opinión que te saca de dudas"
        subtitle="Por 39€ revisamos su certificado, detectamos calificaciones infladas, errores técnicos y Brown Discount. Le decimos si su certificado es fiable o si le están engañando. Sin desplazamientos."
        badges={["Colegiada CATEB Barcelona", "24-48h", "100% remoto"]}
        price="39 €"
        priceOld="69 €"
        credentials="Eva María González García · Arquitecta Técnica colegiada"
        ctaPrimary={{ label: "Solicitar Segunda Opinión", href: waDiagnostico() }}
        ctaSecondary={{ label: "Express 4h (79€) →", href: "/segunda-opinion-express/" }}
        nota="Precio cerrado sin sorpresas (sin IVA). Si lo necesita urgente, dispone de la Segunda Opinión Express con entrega en 4 horas."
      >
        <p className="hero-garantia">
          <span className="hero-garantia-icon">&#9432;</span>
          Por 39 € obtienes tranquilidad: si tu certificado es correcto, lo validamos; si tiene errores, los detectamos. Sales ganando siempre.
        </p>
      </HeroSection>

      {/* TRUST INDICATORS */}
      <TrustNumbers />

      {/* TARGET AUDIENCE — ¿ERES...? */}
      <section className="section audience-section">
        <h2 className="section-title">¿Estás en alguna de estas situaciones?</h2>
        <p className="section-sub">Identifícate en 2 segundos. Cada caso tiene una respuesta distinta.</p>
        <div className="audience-grid">
          <div className="audience-card">
            <h3>Vas a comprar una vivienda</h3>
            <p>El certificado del vendedor marca una A, pero ¿es real? Si la calificación está inflada, puedes estar pagando hasta un 15% más del valor real. Por 39€ lo comprobamos antes de firmar.</p>
            <a href={waDiagnostico()} className="audience-link">Quiero verificar antes de comprar →</a>
          </div>
          <div className="audience-card">
            <h3>Vas a vender tu piso</h3>
            <p>Un certificado con errores te hace perder dinero. Si tu calificación real es mejor de lo que pone, estás regalando tu inmueble. Si es peor, puedes arreglarlo antes de ponerlo en venta.</p>
            <a href={waDiagnostico()} className="audience-link">Quiero saber cuánto vale mi piso realmente →</a>
          </div>
          <div className="audience-card">
            <h3>Vives en tu casa y quieres saber tu letra</h3>
            <p>Saber tu calificación real te permite calcular cuánto gastas en energía, cuánto puedes ahorrar con mejoras, y si puedes acceder a subvenciones. ¿Has reformado? Quizás te corresponda una letra mejor. Con la Segunda Opinión descubres tu punto de partida real para tomar decisiones con conocimiento.</p>
            <a href={waDiagnostico()} className="audience-link">Quiero saber mi letra y aprovechar las ayudas →</a>
          </div>
        </div>
      </section>

      {/* ROI CONTRAST — CUÁNTO PUEDES PERDER */}
      <section className="section roi-contrast-section">
        <h2 className="section-title">39€ de inversión vs. miles de euros de riesgo</h2>
        <p className="section-sub">Esto es lo que está en juego si tu certificado no es fiable.</p>
        <div className="roi-contrast-grid">
          <div className="roi-contrast-card bad">
            <div className="roi-contrast-label">Sin revisión</div>
            <div className="roi-contrast-amount">Hasta 40.000€</div>
            <div className="roi-contrast-desc">de pérdida por <BDHelp /> en una vivienda de 270.000€</div>
            <ul className="roi-contrast-list">
              <li>✗ No sabes si la calificación es real</li>
              <li>✗ Pagas de más, vendes por menos o pierdes ayudas</li>
              <li>✗ Sin respaldo profesional</li>
            </ul>
          </div>
          <div className="roi-contrast-divider">
            <span className="roi-contrast-vs">VS</span>
          </div>
          <div className="roi-contrast-card good">
            <div className="roi-contrast-label">Con Segunda Opinión</div>
            <div className="roi-contrast-amount">39€</div>
            <div className="roi-contrast-desc">inversión única. Recuperable si hay errores.</div>
            <ul className="roi-contrast-list">
              <li>✓ Sabes si tu certificado es fiable</li>
              <li>✓ Detectamos errores y Brown Discount</li>
              <li>✓ Informe firmado por arquitecta colegiada</li>
            </ul>
          </div>
        </div>
        <div className="roi-contrast-cta">
          <a href={waDiagnostico()} className="roi-contrast-button">Proteger mi inversión por 39€ →</a>
        </div>
      </section>

      {/* PROBLEMA QUE RESUELVE */}
      <section className="section problem-section">
        <h2 className="section-title">¿Por qué necesita una Segunda Opinión?</h2>
        <p className="section-sub">El 30% de los certificados energéticos contienen errores. Si compras, puedes estar pagando de más. Si vendes, puedes estar regalando dinero.</p>
        <div className="problem-grid">
          <div className="problem-card">
            <h3>Calificaciones infladas</h3>
            <p>Una calificación superior a la real puede engañar a compradores o perjudicar a vendedores que infravaloran su inmueble. Una B que debería ser una E oculta un sobrecoste energético de miles de euros al año.</p>
          </div>
          <div className="problem-card">
            <h3><BDHelp />: pérdida de valor</h3>
            <p>Un inmueble con calificación E, F o G puede perder entre un <strong>5% y un 15%</strong> de su valor de mercado. Son hasta <strong>40.000€</strong> en una vivienda de 270.000€. Si vendes, puedes estar regalando dinero. Si compras, puedes estar pagando de más. Nuestro informe lo detecta.</p>
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

      {/* MICRO-CONFIANZA: POR QUÉ CERTILAB */}
      <section className="section trust-reasons-section">
        <h2 className="section-title">¿Por qué confiar su revisión a Certilab?</h2>
        <p className="section-sub">No somos comprador, ni vendedor, ni agencia inmobiliaria. No tenemos interés en la operación. Somos profesionales independientes, como un juez técnico: nuestra única función es decir la verdad sobre su certificado.</p>
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
            <p>No compramos, no vendemos, no intermediarios. No somos agencia inmobiliaria. Actuamos como peritos independientes: no nos beneficia que compre, venda o alquile. Solo nos importa la verdad técnica de su certificado.</p>
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
                description: "Mismo rigor técnico con entrega urgente en menos de 4 horas. Ideal para firmas inminentes.",
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

        /* AUDIENCE SECTION */
        .audience-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 5rem 1.5rem;
        }
        .audience-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .audience-card {
          background: #fff;
          border: 1px solid var(--color-border);
          padding: 2rem 1.75rem;
          text-align: left;
          transition: box-shadow 0.2s;
        }
        .audience-card:hover {
          box-shadow: var(--shadow-card-hover);
        }
        .audience-card h3 {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--color-black);
          margin-bottom: 0.75rem;
        }
        .audience-card p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          line-height: 1.65;
          margin-bottom: 1.25rem;
        }
        .audience-link {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-terra);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .audience-link:hover {
          color: var(--color-terra-dark);
        }

        /* ROI CONTRAST */
        .roi-contrast-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 5rem 1.5rem;
          text-align: center;
        }
        .roi-contrast-grid {
          display: flex;
          align-items: stretch;
          justify-content: center;
          gap: 0;
          margin: 0 auto;
          max-width: 750px;
        }
        .roi-contrast-card {
          flex: 1;
          padding: 2rem;
          text-align: left;
          border: 1px solid var(--color-border);
        }
        .roi-contrast-card.bad {
          background: #fff;
        }
        .roi-contrast-card.good {
          background: var(--color-crema);
          border-color: var(--color-terra);
        }
        .roi-contrast-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 0.75rem;
          flex-shrink: 0;
        }
        .roi-contrast-vs {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--color-grey);
          text-transform: uppercase;
        }
        .roi-contrast-label {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-grey);
          margin-bottom: 0.5rem;
        }
        .roi-contrast-amount {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          font-weight: 500;
          color: var(--color-black);
          margin-bottom: 0.35rem;
        }
        .roi-contrast-card.good .roi-contrast-amount {
          color: #2e7d32;
        }
        .roi-contrast-desc {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .roi-contrast-card.good .roi-contrast-desc {
          color: #2e7d32;
        }
        .roi-contrast-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .roi-contrast-list li {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          line-height: 1.8;
          padding-left: 0;
        }
        .roi-contrast-cta {
          text-align: center;
          margin-top: 2rem;
        }
        .roi-contrast-button {
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
        .roi-contrast-button:hover {
          background: #333;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .audience-grid,
          .problem-grid {
            grid-template-columns: 1fr;
          }
          .trust-reasons-grid {
            grid-template-columns: 1fr 1fr;
          }
          .sticky-cta-bar {
            display: block;
          }
          .roi-contrast-grid {
            flex-direction: column;
            gap: 0;
          }
          .roi-contrast-card {
            padding: 1.5rem;
          }
          .roi-contrast-divider {
            padding: 0.75rem 0;
            position: relative;
          }
          .roi-contrast-vs {
            display: block;
            text-align: center;
            font-size: 0.7rem;
            color: var(--color-grey);
            letter-spacing: 0.15em;
          }
          .roi-contrast-card.good {
            border-color: var(--color-terra);
          }
        }
        @media (max-width: 480px) {
          .trust-reasons-grid {
            grid-template-columns: 1fr;
          }
          .sticky-cta-button {
            font-size: 0.85rem;
            padding: 0.65rem 1.2rem;
          }
        }
      `}</style>
    </>
  );
}

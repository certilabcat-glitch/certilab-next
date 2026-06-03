"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ObrasBanner from "@/components/ui/ObrasBanner";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import StepsGrid from "@/components/sections/StepsGrid";
import ComparativaSection from "@/components/sections/ComparativaSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import TrustNumbers from "@/components/sections/TrustNumbers";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ComingSoonSection from "@/components/ui/ComingSoonSection";
import { segundaOpinionFaq } from "@/data/faq";

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

const trustReasons = [
  {
    num: "01",
    title: "Revisión humana real",
    text: "Cada certificado lo analiza personalmente una arquitecta técnica colegiada. Sin IA, sin automatismos.",
  },
  {
    num: "02",
    title: "Responsabilidad profesional",
    text: "Eva María González García, colegiada CATEB 9457, con seguro de responsabilidad civil. Firmamos lo que dictaminamos.",
  },
  {
    num: "03",
    title: "Independencia total",
    text: "No vendemos certificados energéticos. No tenemos conflicto de interés. Nuestra única función es decirle la verdad sobre el suyo.",
  },
  {
    num: "04",
    title: "Sin esperas ni papeleo",
    text: "100% online. Envíenos su PDF por WhatsApp y recibirá su informe en 24-48h. Sin desplazarse, sin llamadas, sin compromiso.",
  },
];

export default function SegundaOpinionPage() {
  return (
    <div className="page-wrapper">
      <ObrasBanner />

      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Segunda Opinión", href: "/segunda-opinion/" },
        ]}
      />

      <HeroSection
        eyebrow="Próximamente"
        title="Segunda Opinión del Certificado Energético"
        subtitle="Por 39€ revisamos su certificado, detectamos calificaciones infladas, errores técnicos y Brown Discount. Le decimos si su certificado es fiable o si le están engañando. Sin desplazamientos."
        badges={["Colegiada CATEB Barcelona", "24-48h", "100% remoto"]}
        price="39 €"
        priceOld="69 €"
        ctaPrimary={{ label: "Avisarme cuando esté disponible »", href: "#coming-soon" }}
        nota="Servicio en preparación. Déjanos tu correo y te avisaremos cuando esté activo."
      >
        <p className="hero-garantia">
          <span className="hero-garantia-icon">&#9432;</span>
          Por 39€ obtienes tranquilidad: si tu certificado es correcto, lo validamos; si tiene errores, los detectamos. Sales ganando siempre.
        </p>
      </HeroSection>

      <TrustNumbers />

      {/* AUDIENCE */}
      <section className="section audience-section">
        <h2 className="section-title">¿Estás en alguna de estas situaciones?</h2>
        <p className="section-sub">Identifícate en 2 segundos. Cada caso tiene una respuesta distinta.</p>
        <div className="audience-grid">
          <div className="audience-card">
            <div className="audience-icon">🏠</div>
            <h3>Vas a comprar una vivienda</h3>
            <p>El certificado del vendedor marca una A, pero ¿es real? Si la calificación está inflada, puedes estar pagando hasta un 15% más del valor real. Por 39€ lo comprobamos antes de firmar.</p>
            <a href="#coming-soon" className="audience-link">Quiero verificar antes de comprar →</a>
          </div>
          <div className="audience-card">
            <div className="audience-icon">💰</div>
            <h3>Vas a vender tu piso</h3>
            <p>Un certificado con errores te hace perder dinero. Si tu calificación real es mejor de lo que pone, estás regalando tu inmueble. Si es peor, puedes arreglarlo antes de ponerlo en venta.</p>
            <a href="#coming-soon" className="audience-link">Quiero saber cuánto vale mi piso realmente →</a>
          </div>
          <div className="audience-card">
            <div className="audience-icon">🔍</div>
            <h3>Ya tienes un informe y no te fías</h3>
            <p>Tu certificado te parece extraño. La calificación no cuadra con lo que sabes de tu casa. O simplemente quieres asegurarte de que es correcto antes de tomar decisiones importantes.</p>
            <a href="#coming-soon" className="audience-link">Quiero una segunda opinión profesional →</a>
          </div>
        </div>
      </section>

      {/* ROI CONTRAST */}
      <section className="section roi-contrast-section">
        <h2 className="section-title">39€ de inversión vs. miles de euros de riesgo</h2>
        <p className="section-sub">Esto es lo que está en juego si tu certificado no es fiable.</p>
        <div className="roi-contrast-grid">
          <div className="roi-contrast-card bad">
            <div className="roi-contrast-label">Sin revisión</div>
            <div className="roi-contrast-amount">Hasta 40.000€</div>
            <div className="roi-contrast-desc">de pérdida por Brown Discount en una vivienda de 270.000€</div>
            <ul className="roi-contrast-list">
              <li>✗ No sabes si la calificación es real</li>
              <li>✗ Pagas de más o vendes por menos</li>
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
          <a href="#coming-soon" className="roi-contrast-button">Proteger mi inversión por 39€ →</a>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section problem-section">
        <h2 className="section-title">¿Por qué necesita una Segunda Opinión?</h2>
        <p className="section-sub">El 30% de los certificados energéticos contienen errores. Si compras, puedes estar pagando de más. Si vendes, puedes estar regalando dinero.</p>
        <div className="problem-grid">
          <div className="problem-card">
            <h3>Calificaciones infladas</h3>
            <p>Una calificación superior a la real puede engañar a compradores o perjudicar a vendedores que infravaloran su inmueble. Una B que debería ser una E oculta un sobrecoste energético de miles de euros al año.</p>
          </div>
          <div className="problem-card">
            <h3>Brown Discount: pérdida de valor</h3>
            <p>Un inmueble con calificación E, F o G puede perder entre un <strong>5% y un 15%</strong> de su valor de mercado. Son hasta <strong>40.000€</strong> en una vivienda de 270.000€. Si vendes, puedes estar regalando dinero. Si compras, puedes estar pagando de más. Nuestro informe lo detecta.</p>
          </div>
          <div className="problem-card">
            <h3>Datos sin verificar</h3>
            <p>Muchos certificados se elaboran con datos genéricos del catastro, sin visita presencial. Si su certificado no es fiable, cualquier decisión que tome sobre él tampoco lo será.</p>
          </div>
        </div>
        <div className="problem-cta">
          <a href="#coming-soon" className="problem-cta-button">Quiero saber si mi certificado es fiable →</a>
        </div>
      </section>

      {/* COMPARATIVA */}
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

      {/* INCLUDES */}
      <section className="section includes-section">
        <h2 className="section-title">¿Qué incluye por 39€?</h2>
        <p className="section-sub">Todo lo que necesita para saber si puede confiar en su certificado energético.</p>
        <div className="includes-box">
          <ul className="includes-grid">
            {[
              "Análisis detallado del certificado existente",
              "Detección de discrepancias y anomalías",
              "Detección de Brown Discount",
              "Informe PDF con conclusiones técnicas",
              "Recomendaciones accionables",
              "Orientación sobre próximos pasos",
            ].map((item, i) => (
              <li key={i} className="includes-item">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* PREVIEW */}
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
          Informe real detallado firmado por arquitecta técnica colegiada. Con respaldo profesional y seguro de responsabilidad civil. Recibirá un PDF listo para descargar e imprimir.
        </p>
      </section>

      {/* TRUST REASONS */}
      <section className="section trust-reasons-section">
        <h2 className="section-title">¿Por qué confiar su revisión a Certilab?</h2>
        <p className="section-sub">No somos un comparador ni un generador automático. Somos profesionales colegiados.</p>
        <div className="trust-reasons-grid">
          {trustReasons.map((r, i) => (
            <div className="trust-reason-card" key={i}>
              <div className="trust-reason-num">{r.num}</div>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <TestimonialsSection />

      <FAQSection items={segundaOpinionFaq} title="Preguntas frecuentes sobre la Segunda Opinión" />

      <CTASection
        title="¿Desconfía de la calificación de su certificado?"
        text="Por 39€ le decimos si es fiable. Sin compromiso. Con el rigor técnico de una arquitecta técnica colegiada. Déjanos tu correo y te avisaremos cuando esté disponible."
        buttonText="Quiero que me avisen →"
        buttonHref="#coming-soon"
      />
      <TrustBlockSection />

      <ComingSoonSection
        serviceName="Segunda Opinión del Certificado Energético (39€)"
        serviceUrl="https://www.certilab.cat/segunda-opinion/"
      />

      {/* STICKY CTA BAR */}
      <div className="sticky-cta-bar">
        <div className="sticky-cta-inner">
          <div className="sticky-cta-info">
            <span className="sticky-cta-price">39€</span>
            <span className="sticky-cta-meta">24-48h · Sin sorpresas</span>
          </div>
          <div className="sticky-cta-actions">
            <a href="#coming-soon" className="sticky-cta-button">
              Avisarme
            </a>
          </div>
        </div>
        <p className="sticky-cta-micro">Servicio en preparación · Sin compromiso</p>
      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Segunda Opinión Certificado Energético (39€)",
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
                  availability: "https://schema.org/PreOrder",
                  description: "Análisis técnico completo en 24-48 horas laborables. Incluye informe detallado en PDF firmado por arquitecta colegiada.",
                },
                {
                  "@type": "Offer",
                  name: "Segunda Opinión Express",
                  price: "79",
                  priceCurrency: "EUR",
                  availability: "https://schema.org/PreOrder",
                  description: "Mismo rigor técnico con entrega urgente en menos de 2 horas. Ideal para firmas inminentes.",
                },
              ],
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
                { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.certilab.cat/" },
                { "@type": "ListItem", position: 2, name: "Segunda Opinión Certificado Energético (39€)", item: "https://www.certilab.cat/segunda-opinion/" },
              ],
            },
          ]),
        }}
      />

      <style jsx>{`
        .page-wrapper {
          overflow-x: hidden;
          width: 100%;
        }
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

        /* AUDIENCE */
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
        .audience-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .audience-card h3 {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 400;
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
          text-decoration: none;
        }
        .audience-link:hover {
          text-decoration: underline;
        }

        /* ROI CONTRAST */
        .roi-contrast-section {
          max-width: 100%;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          background: var(--color-crema);
        }
        .roi-contrast-section .section-title,
        .roi-contrast-section .section-sub {
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }
        .roi-contrast-grid {
          display: flex;
          align-items: stretch;
          gap: 0;
          max-width: 750px;
          margin: 0 auto;
          border: 1px solid var(--color-border);
          background: #fff;
        }
        .roi-contrast-card {
          flex: 1;
          padding: 2rem;
        }
        .roi-contrast-card.bad {
          border-right: 1px solid var(--color-border);
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
          font-size: 1.3rem;
          font-weight: 500;
          color: var(--color-black);
          margin-bottom: 0.5rem;
        }
        .roi-contrast-card.good .roi-contrast-amount {
          color: #2e7d32;
        }
        .roi-contrast-desc {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          line-height: 1.5;
          margin-bottom: 1rem;
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
          line-height: 1.6;
          padding: 0.25rem 0;
        }
        .roi-contrast-divider {
          display: none;
        }
        .roi-contrast-vs {
          display: none;
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

        /* INCLUDES */
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
        .includes-box {
          max-width: 600px;
          margin: 0 auto;
        }
        .includes-grid {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .includes-item {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-black);
          line-height: 1.5;
          padding: 0.85rem 1.25rem;
          background: #fff;
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .includes-item::before {
          content: "✓";
          color: var(--color-terra);
          font-weight: 700;
          flex-shrink: 0;
        }

        /* PREVIEW */
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

        /* STICKY CTA */
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
          .audience-grid { grid-template-columns: 1fr; }
          .roi-contrast-grid { flex-direction: column; }
          .roi-contrast-card.bad { border-right: none; border-bottom: 1px solid var(--color-border); }
          .problem-grid { grid-template-columns: 1fr; }
          .includes-grid { grid-template-columns: 1fr; }
          .preview-grid { grid-template-columns: 1fr; }
          .trust-reasons-grid { grid-template-columns: 1fr; }
          :global(body) { padding-bottom: 5.5rem; }
          .sticky-cta-bar { display: block; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .audience-grid { grid-template-columns: repeat(2, 1fr); }
          .trust-reasons-grid { grid-template-columns: repeat(2, 1fr); }
          .sticky-cta-bar { display: block; }
        }
        @media (min-width: 1024px) {
          .sticky-cta-bar { display: block; }
        }
      `}</style>
    </div>
  );
}

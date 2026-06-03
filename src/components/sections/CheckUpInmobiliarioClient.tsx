"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import TrustNumbers from "@/components/sections/TrustNumbers";
import ComingSoonSection from "@/components/ui/ComingSoonSection";

const faq = [
  {
    q: "¿Qué incluye exactamente el Check-Up Inmobiliario Forense?",
    a: "Incluye: Nota Simple actualizada del Registro de la Propiedad, Certificado Catastral descriptivo y gráfico, análisis de cargas, hipotecas y embargos, revisión forense del certificado energético existente, detección de Brown Discount con cálculo de impacto en valor de mercado, análisis técnico de instalaciones (electricidad, gas, climatización), detección de vicios ocultos documentales y un resumen ejecutivo con recomendaciones. Todo en un informe de 10-15 páginas firmado por arquitecta técnica colegiada Cateb 9457.",
  },
  {
    q: "¿El Check-Up Inmobiliario sustituye a la visita del técnico?",
    a: "No, nuestro análisis es complementario. La normativa exige visita presencial para emitir un certificado energético oficial (Real Decreto 390/2021). Nuestro valor está en el análisis forense de la documentación existente: detectamos lo que el ojo no ve en los papeles. Si tras nuestro informe se necesita inspección presencial, te orientamos sobre los pasos a seguir.",
  },
  {
    q: "¿En cuánto tiempo recibo el informe?",
    a: "El plazo estándar es de 48 a 72 horas laborables desde que recibamos toda la documentación necesaria (copia del certificado energético existente, referencia catastral y datos del inmueble). Si necesitas urgencia, podemos priorizar tu caso bajo petición expresa.",
  },
  {
    q: "¿Qué es el Brown Discount y por qué debería importarme?",
    a: "El Brown Discount es la pérdida de valor de mercado que sufre un inmueble con mala calificación energética (E, F o G). Según estudios del sector inmobiliario europeo, esta pérdida puede oscilar entre el 5% y el 15% del valor de tasación. En una vivienda de 270.000€, hablamos de hasta 40.000€. Si compras, puedes estar pagando un sobreprecio. Si vendes, puedes estar regalando dinero. Nuestro informe detecta y cuantifica este riesgo.",
  },
  {
    q: "¿Detectáis cargas y embargos no declarados?",
    a: "Sí. Analizamos la Nota Simple del Registro de la Propiedad para identificar hipotecas vigentes, embargos, anotaciones preventivas, servidumbres, usufructos y cualquier carga que pueda afectar a la transmisión del inmueble. Es habitual que el vendedor omita información relevante en la nota simple informativa que entrega al comprador.",
  },
  {
    q: "¿Revisáis instalaciones eléctricas y de gas?",
    a: "Sí, en la medida que la documentación lo permita. Analizamos boletines eléctricos, certificados de instalación de gas, fichas técnicas de calderas y equipos de climatización. Detectamos instalaciones sin legalizar, ausencia de mantenimientos obligatorios y riesgos potenciales que podrían derivar en costes imprevistos tras la compra.",
  },
  {
    q: "¿Qué diferencia hay entre el Check-Up Inmobiliario y la Segunda Opinión?",
    a: "La Segunda Opinión (39€) se centra exclusivamente en el certificado energético: detecta calificaciones infladas y Brown Discount. El Check-Up Inmobiliario (199€) es una auditoría integral: además del certificado energético, analiza la documentación registral, las cargas, las instalaciones técnicas y los riesgos ocultos. Es el servicio completo para blindar una compraventa.",
  },
  {
    q: "¿Esto sirve para cualquier tipo de inmueble?",
    a: "Sí. El Check-Up Inmobiliario Forense está diseñado para viviendas, locales comerciales, oficinas, naves industriales y edificios completos. El alcance del análisis se adapta al tipo de inmueble y a la documentación disponible. Cada caso es único y recibe un tratamiento personalizado.",
  },
];

const casosReales = [
  {
    label: "Caso 1 – Calificación inflada",
    title: "Certificado con calificación A que era realmente una D",
    text: "Comprador a punto de firmar una vivienda en L'Hospitalet. El certificado energético entregado por el vendedor marcaba una calificación A. Nuestro análisis forense reveló discrepancias en la superficie, en el año de construcción y en los coeficientes de envolvente térmica. La calificación real era una D. El comprador renegoció el precio a la baja y ahorró 18.000€, equivalentes al sobrecoste energético proyectado a 10 años y al Brown Discount aplicable.",
  },
  {
    label: "Caso 2 – Cargas ocultas",
    title: "Hipoteca y embargo no declarados",
    text: "El vendedor de un piso en Badalona entregó una nota simple informativa que ocultaba una hipoteca vigente de 120.000€ y un embargo judicial de 14.000€. El comprador, confiado, había reservado ya la firma. El Check-Up detectó ambas cargas antes de la transmisión. El comprador evitó una herencia de deudas de 134.000€ que legalmente habría tenido que asumir tras la compra.",
  },
  {
    label: "Caso 3 – Instalaciones sin legalizar",
    title: "Instalación eléctrica sin boletines ni legalización",
    text: "Certificado energético aparentemente correcto para un local comercial en Barcelona. Sin embargo, el análisis técnico reveló que la instalación eléctrica carecía de boletín de legalización y el cuadro general no cumplía el REBT. Además, la caldera de gas no tenía ficha técnica ni registro de mantenimiento. El vendedor hubo de regularizar las instalaciones antes de la venta, asumiendo un coste de 3.200€ que evitó una posible sanción futura al comprador.",
  },
  {
    label: "Caso 4 – Superficie incorrecta",
    title: "Discrepancia catastral de 22m² que inflaba el precio",
    text: "Un piso en Sabadell se vendía con una superficie declarada de 95m². El certificado catastral obtenido por Certilab reveló que la superficie real era de 73m². El vendedor había incluido zonas comunes y un trastero en la medición. Nuestro informe detectó la discrepancia y el comprador renegoció el precio ajustándolo a los metros reales, ahorrando aproximadamente 28.000€.",
  },
];

const trustReasons = [
  {
    num: "01",
    title: "Arquitecta colegiada Cateb 9457",
    text: "Eva María González García firma personalmente cada informe. Con seguro de responsabilidad civil profesional. No somos un generador automático ni un comparador.",
  },
  {
    num: "02",
    title: "Análisis integral real",
    text: "No miramos solo el certificado. Cruzamos Registro de la Propiedad, Catastro, instalaciones técnicas y normativa. Un análisis forense completo, no un checklist superficial.",
  },
  {
    num: "03",
    title: "Independencia total",
    text: "No vendemos certificados energéticos, no hacemos reformas, no cobramos comisiones de inmobiliarias. Nuestra única función es decirte la verdad sobre el inmueble que quieres comprar o vender.",
  },
  {
    num: "04",
    title: "Informe con validez jurídica",
    text: "Cada informe está firmado por una arquitecta técnica colegiada y puede presentarse como prueba pericial en caso de litigio. Con cobertura de seguro de responsabilidad civil.",
  },
];

export default function CheckUpInmobiliarioClient() {
  return (
    <div className="page-wrapper">
      {/* TRIÁNGULO DE OBRAS */}
      <div className="obras-banner">
        <div className="obras-triangle">
          <span className="obras-icon">!</span>
        </div>
        <div className="obras-text">
          <span className="obras-label">EN OBRAS</span>
          <span className="obras-desc">Página en construcción — Próximamente disponible</span>
        </div>
      </div>

      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Check-Up Inmobiliario Forense", href: "/check-up-inmobiliario/" },
        ]}
      />

      <HeroSection
        eyebrow="Próximamente"
        title="Check-Up Inmobiliario Forense"
        subtitle="Evaluación técnica independiente de su futuro inmueble. Analizamos el certificado energético, la documentación registral del Catastro y el Registro de la Propiedad, las instalaciones técnicas y los riesgos ocultos que podrían afectar al valor de su inversión. Todo antes de formalizar la compra. Informe de 10-15 páginas firmado por arquitecta técnica colegiada Cateb 9457."
        badges={["Cateb 9457", "48-72h", "100% remoto"]}
        price="199 €"
        priceOld={undefined}
        ctaPrimary={{ label: "Avisarme cuando esté disponible »", href: "#coming-soon" }}
        nota="Servicio en preparación. Déjanos tu correo y te avisaremos cuando esté activo."
      />

      {/* TRUST INDICATORS */}
      <TrustNumbers />

      {/* PROBLEMA QUE RESUELVE */}
      <section className="section problem-section">
        <h2 className="section-title">¿Por qué necesitas un Check-Up Inmobiliario antes de comprar?</h2>
        <p className="section-sub">
          Comprar una vivienda es la inversión más importante de tu vida. Y sin embargo, la mayoría de compradores firman basándose solo en lo que les cuenta el vendedor. Esto es lo que puede salir mal.
        </p>
        <div className="problem-grid">
          <div className="problem-card">
            <h3>Calificaciones energéticas falsas</h3>
            <p>Hasta un 30% de los certificados energéticos contienen errores. Una calificación inflada (A o B cuando debería ser D o E) puede hacer que pagues hasta un 15% más del valor real del inmueble. Son miles de euros que no recuperarás.</p>
          </div>
          <div className="problem-card">
            <h3>Cargas y deudas ocultas</h3>
            <p>Hipotecas no canceladas, embargos judiciales, usufructos no declarados, servidumbres que limitan el uso del inmueble. Si no aparecen en la nota simple que te entrega el vendedor, las acabas heredando tú. Pueden ascender a decenas de miles de euros.</p>
          </div>
          <div className="problem-card">
            <h3>Vicios ocultos y deficiencias técnicas</h3>
            <p>Instalaciones eléctricas sin legalizar, calderas sin mantenimiento, humedades no declaradas, amianto, estructura deficiente. Todo ello sale a la luz después de la firma, cuando ya es tarde. El coste de reparación puede superar los 20.000€.</p>
          </div>
        </div>
      </section>

      {/* ROI GRID */}
      <section className="section roi-section">
        <div className="roi-grid">
          <div className="roi-box">
            <p className="roi-label">Sin Certilab</p>
            <p className="roi-price">Riesgo de hasta 40.000€</p>
            <p className="roi-desc">Brown Discount (5-15% del valor), más cargas ocultas, más reparaciones imprevistas. Una compra a ciegas que puede salir muy cara.</p>
          </div>
          <div className="roi-box highlight">
            <p className="roi-label">Con Certilab</p>
            <p className="roi-price">199€ de inversión</p>
            <p className="roi-desc">Auditoría forense integral. Detectamos Brown Discount, cargas registrales ocultas, vicios técnicos e irregularidades. Informe de 10-15 páginas con validez jurídica.</p>
          </div>
        </div>
      </section>

      {/* CASOS REALES */}
      <section className="section casos-section">
        <h2 className="section-title">Casos reales que nos encontramos cada semana en Cataluña</h2>
        <p className="section-sub">
          Esto no es teoría. Son casos documentados de compradores que evitaron pérdidas gracias a nuestro análisis forense. Cada semana detectamos situaciones similares.
        </p>
        <div className="casos-grid">
          {casosReales.map((caso, i) => (
            <div className="caso-card" key={i}>
              <p className="caso-label">{caso.label}</p>
              <p className="caso-title">{caso.title}</p>
              <p className="caso-text">{caso.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES GRID */}
      <FeaturesGrid
        features={[
          { num: "I", title: "Nota Simple + Catastral", text: "Obtenemos y analizamos los registros oficiales del inmueble para detectar cargas, hipotecas, embargos y discrepancias entre la superficie declarada y la real." },
          { num: "II", title: "Análisis forense del CE", text: "Revisamos el certificado energético existente con el mismo rigor que en nuestro servicio de Segunda Opinión. Detectamos calificaciones infladas, errores técnicos y omisiones." },
          { num: "III", title: "Brown Discount cuantificado", text: "Calculamos el impacto real de la calificación energética en el valor de mercado. Te decimos cuánto puedes perder o ahorrar en cifras concretas, no en porcentajes genéricos." },
          { num: "IV", title: "Instalaciones técnicas", text: "Analizamos boletines eléctricos, instalaciones de gas, calderas y climatización. Detectamos instalaciones sin legalizar, deficiencias y riesgos de costes futuros." },
        ]}
      />

      {/* QUÉ INCLUYE */}
      <section className="section includes-section">
        <h2 className="section-title">¿Qué incluye el Check-Up Inmobiliario Forense por 199€?</h2>
        <p className="section-sub">Un análisis completo que cubre todos los frentes de una compraventa inmobiliaria.</p>
        <ul className="includes-grid">
          {[
            "Nota Simple del Registro de la Propiedad (titularidad, cargas, hipotecas, embargos)",
            "Certificado Catastral descriptivo y gráfico (superficie, linderos, usos)",
            "Análisis forense del certificado energético existente",
            "Detección y cuantificación del Brown Discount",
            "Revisión de instalaciones técnicas (electricidad, gas, climatización)",
            "Detección de vicios ocultos documentales",
            "Informe PDF de 10-15 páginas firmado por arquitecta colegiada",
            "Resumen ejecutivo con recomendaciones accionables",
            "Orientación sobre próximos pasos y documentación adicional necesaria",
          ].map((item, i) => (
            <li key={i} className="includes-item">{item}</li>
          ))}
        </ul>
      </section>

      {/* MICRO-CONFIANZA */}
      <section className="section trust-reasons-section">
        <h2 className="section-title">¿Por qué confiar tu Check-Up a Certilab?</h2>
        <p className="section-sub">No somos una plataforma automática ni un comparador online. Somos profesionales colegiados con responsabilidad civil.</p>
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

      {/* FAQ */}
      <FAQSection items={faq} title="Preguntas frecuentes sobre el Check-Up Inmobiliario Forense" />

      <CTASection
        title="¿Vas a comprar o vender una vivienda?"
        text="Asegúrate de que todo está en orden antes de firmar. Por 199€ blindamos tu inversión con un análisis forense completo. Déjanos tu correo y te avisaremos cuando esté disponible."
        buttonText="Quiero que me avisen →"
        buttonHref="#coming-soon"
      />
      <TrustBlockSection />

      {/* COMING SOON */}
      <ComingSoonSection
        serviceName="Check-Up Inmobiliario Forense (199€)"
        serviceUrl="https://www.certilab.cat/check-up-inmobiliario/"
      />

      {/* STICKY CTA BAR */}
      <div className="sticky-cta-bar">
        <div className="sticky-cta-inner">
          <div className="sticky-cta-info">
            <span className="sticky-cta-price">199€</span>
            <span className="sticky-cta-meta">48-72h · Auditoría integral</span>
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
              name: "Check-Up Inmobiliario Forense",
              provider: {
                "@type": "ProfessionalService",
                name: "Certilab - Eva María González García",
                telephone: "+34608515922",
                areaServed: { "@type": "Country", name: "ES" },
              },
              description: "Auditoría técnica forense 100% remota para blindar tu compraventa inmobiliaria. Incluye análisis registral, catastral, certificado energético, instalaciones, detección de Brown Discount y vicios ocultos. Informe de 10-15 páginas firmado por arquitecta técnica colegiada Cateb 9457.",
              offers: {
                "@type": "Offer",
                price: "199",
                priceCurrency: "EUR",
                availability: "https://schema.org/PreOrder",
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

      <style jsx>{`
        .page-wrapper {
          overflow-x: hidden;
          width: 100%;
        }

        /* TRIÁNGULO DE OBRAS */
        .obras-banner {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.6rem 1.5rem;
          background: #fff9e6;
          border-bottom: 2px solid #f0c040;
          justify-content: center;
          flex-wrap: wrap;
        }
        .obras-triangle {
          width: 0;
          height: 0;
          border-left: 22px solid transparent;
          border-right: 22px solid transparent;
          border-bottom: 40px solid #e8a317;
          position: relative;
          flex-shrink: 0;
        }
        .obras-icon {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-sans);
          font-size: 1.3rem;
          font-weight: 900;
          color: #fff;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          line-height: 1;
        }
        .obras-text {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }
        .obras-label {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #b8860b;
          text-transform: uppercase;
          line-height: 1.2;
        }
        .obras-desc {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: #8b7355;
          line-height: 1.3;
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
          max-width: 680px;
          margin: 0 auto 3rem;
          line-height: 1.7;
        }

        /* PROBLEM GRID */
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

        /* ROI GRID */
        .roi-section {
          padding-top: 0;
          padding-bottom: 2rem;
        }
        .roi-grid {
          display: flex;
          gap: 0;
          max-width: 750px;
          margin: 0 auto;
          border: 1px solid var(--color-border);
        }
        .roi-box {
          flex: 1;
          padding: 2rem;
        }
        .roi-box.highlight {
          background: var(--color-crema);
          border-left: 1px solid var(--color-border);
        }
        .roi-label {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-grey);
          margin-bottom: 0.5rem;
        }
        .roi-price {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 500;
          color: var(--color-black);
          margin-bottom: 0.5rem;
        }
        .roi-box.highlight .roi-price { color: #2e7d32; }
        .roi-desc {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          line-height: 1.6;
          margin: 0;
        }

        /* CASOS */
        .casos-section {
          background: var(--color-crema);
          max-width: 100%;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .casos-section .section-title,
        .casos-section .section-sub {
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }
        .casos-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .caso-card {
          background: #fff;
          border: 1px solid var(--color-border);
          padding: 2rem;
          text-align: left;
        }
        .caso-label {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-terra);
          margin: 0 0 0.5rem;
        }
        .caso-title {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--color-black);
          margin-bottom: 0.75rem;
        }
        .caso-text {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          line-height: 1.65;
          margin: 0;
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
        .includes-grid {
          max-width: 750px;
          margin: 0 auto;
          list-style: none;
          padding: 0;
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

        /* TRUST REASONS */
        .trust-reasons-section {
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
          .problem-grid { grid-template-columns: 1fr; }
          .roi-grid { flex-direction: column; }
          .roi-box.highlight { border-left: none; border-top: 1px solid var(--color-border); }
          .casos-grid { grid-template-columns: 1fr; }
          .includes-grid { grid-template-columns: 1fr; }
          .trust-reasons-grid { grid-template-columns: 1fr; }
          :global(body) { padding-bottom: 5.5rem; }
          .sticky-cta-bar { display: block; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .trust-reasons-grid { grid-template-columns: repeat(2, 1fr); }
          .casos-grid { grid-template-columns: 1fr; }
          .sticky-cta-bar { display: block; }
        }
        @media (min-width: 1024px) {
          .sticky-cta-bar { display: block; }
        }
      `}</style>
    </div>
  );
}

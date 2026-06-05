"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import TrustNumbers from "@/components/sections/TrustNumbers";
import ComingSoonSection from "@/components/ui/ComingSoonSection";
import ObrasBanner from "@/components/ui/ObrasBanner";
import styles from "./CheckUpInmobiliarioClient.module.css";

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
    <div className={styles.pageWrapper}>
      <ObrasBanner />

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
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>¿Por qué necesitas un Check-Up Inmobiliario antes de comprar?</h2>
        <p className={styles.sectionSub}>
          Comprar una vivienda es la inversión más importante de tu vida. Y sin embargo, la mayoría de compradores firman basándose solo en lo que les cuenta el vendedor. Esto es lo que puede salir mal.
        </p>
        <div className={styles.problemGrid}>
          <div className={styles.problemCard}>
            <h3>Calificaciones energéticas falsas</h3>
            <p>Hasta un 30% de los certificados energéticos contienen errores. Una calificación inflada (A o B cuando debería ser D o E) puede hacer que pagues hasta un 15% más del valor real del inmueble. Son miles de euros que no recuperarás.</p>
          </div>
          <div className={styles.problemCard}>
            <h3>Cargas y deudas ocultas</h3>
            <p>Hipotecas no canceladas, embargos judiciales, usufructos no declarados, servidumbres que limitan el uso del inmueble. Si no aparecen en la nota simple que te entrega el vendedor, las acabas heredando tú. Pueden ascender a decenas de miles de euros.</p>
          </div>
          <div className={styles.problemCard}>
            <h3>Vicios ocultos y deficiencias técnicas</h3>
            <p>Instalaciones eléctricas sin legalizar, calderas sin mantenimiento, humedades no declaradas, amianto, estructura deficiente. Todo ello sale a la luz después de la firma, cuando ya es tarde. El coste de reparación puede superar los 20.000€.</p>
          </div>
        </div>
      </section>

      {/* ROI GRID */}
      <section className={styles.roiSection}>
        <div className={styles.roiGrid}>
          <div className={styles.roiBox}>
            <p className={styles.roiLabel}>Sin Certilab</p>
            <p className={styles.roiPrice}>Riesgo de hasta 40.000€</p>
            <p className={styles.roiDesc}>Brown Discount (5-15% del valor), más cargas ocultas, más reparaciones imprevistas. Una compra a ciegas que puede salir muy cara.</p>
          </div>
          <div className={styles.roiBoxHighlight}>
            <p className={styles.roiLabel}>Con Certilab</p>
            <p className={styles.roiPrice}>199€ de inversión</p>
            <p className={styles.roiDesc}>Auditoría forense integral. Detectamos Brown Discount, cargas registrales ocultas, vicios técnicos e irregularidades. Informe de 10-15 páginas con validez jurídica.</p>
          </div>
        </div>
      </section>

      {/* CASOS REALES */}
      <section className={styles.casosSection}>
        <h2 className={styles.sectionTitle}>Casos reales que nos encontramos cada semana en Cataluña</h2>
        <p className={styles.sectionSub}>
          Esto no es teoría. Son casos documentados de compradores que evitaron pérdidas gracias a nuestro análisis forense. Cada semana detectamos situaciones similares.
        </p>
        <div className={styles.casosGrid}>
          {casosReales.map((caso, i) => (
            <div className={styles.casoCard} key={i}>
              <p className={styles.casoLabel}>{caso.label}</p>
              <p className={styles.casoTitle}>{caso.title}</p>
              <p className={styles.casoText}>{caso.text}</p>
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
      <section className={styles.includesSection}>
        <h2 className={styles.sectionTitle}>¿Qué incluye el Check-Up Inmobiliario Forense por 199€?</h2>
        <p className={styles.sectionSub}>Un análisis completo que cubre todos los frentes de una compraventa inmobiliaria.</p>
        <ul className={styles.includesGrid}>
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
            <li key={i} className={styles.includesItem}>{item}</li>
          ))}
        </ul>
      </section>

      {/* MICRO-CONFIANZA */}
      <section className={styles.trustReasonsSection}>
        <h2 className={styles.sectionTitle}>¿Por qué confiar tu Check-Up a Certilab?</h2>
        <p className={styles.sectionSub}>No somos una plataforma automática ni un comparador online. Somos profesionales colegiados con responsabilidad civil.</p>
        <div className={styles.trustReasonsGrid}>
          {trustReasons.map((r, i) => (
            <div className={styles.trustReasonCard} key={i}>
              <div className={styles.trustReasonNum}>{r.num}</div>
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
      <div className={styles.stickyCtaBar}>
        <div className={styles.stickyCtaInner}>
          <div className={styles.stickyCtaInfo}>
            <span className={styles.stickyCtaPrice}>199€</span>
            <span className={styles.stickyCtaMeta}>48-72h · Auditoría integral</span>
          </div>
          <div className={styles.stickyCtaActions}>
            <a href="#coming-soon" className={styles.stickyCtaButton}>
              Avisarme
            </a>
          </div>
        </div>
        <p className={styles.stickyCtaMicro}>Servicio en preparación · Sin compromiso</p>
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

    </div>
  );
}

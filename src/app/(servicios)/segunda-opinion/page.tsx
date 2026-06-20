import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import HeroSection from "@/components/sections/HeroSection";
import FAQSection from "@/components/sections/FAQSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { segundaOpinionFaq } from "@/data/faq";
import { waUrl } from "@/lib/wa";
import styles from "./SegundaOpinion.module.css";

export const metadata: Metadata = {
  title: "Segunda Opinión Certificado Energético (59€ IVA incluido) | Certilab",
  description:
    "Revisamos tu certificado energético y detectamos calificaciones infladas, errores técnicos y Brown Discount. Informe forense en 24-48h. Eva Mª González, Arquitecta Técnica Cateb 9457.",
  alternates: { canonical: "https://www.certilab.cat/segunda-opinion/" },
  openGraph: {
    title: "Segunda Opinión Certificado Energético | Certilab",
    description:
      "¿Confías en que la letra de tu certificado es real? Por 59€ IVA incluido revisamos tu certificado y te decimos si refleja la realidad técnica de tu inmueble.",
    url: "https://www.certilab.cat/segunda-opinion/",
  },
};

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
        subtitle="Por 59€ IVA incluido revisamos su certificado, detectamos calificaciones infladas, errores técnicos y Brown Discount. Le decimos si su certificado refleja la realidad técnica de su inmueble o si contiene errores que le pueden costar dinero. Sin desplazamientos."
        badges={["Colegiada CATEB Barcelona", "24-48h", "100% remoto"]}
        price="59 €"
        priceOld="69 €"
        credentials=""
        ctaPrimary={{ label: "Solicitar Segunda Opinión", href: waUrl("Hola, quiero solicitar la Segunda Opinión de mi certificado energético (59€).") }}
        ctaSecondary={{ label: "Express 4h (79€) →", href: "/segunda-opinion-express/" }}
        nota="Precio cerrado sin sorpresas (IVA incluido). Si lo necesita urgente, dispone de la Segunda Opinión Express con entrega en 4 horas."
      >
        <p className={styles["hero-garantia"]}>
          <span className={styles["hero-garantia-icon"]}>&#9432;</span>
          Por 59 € obtienes tranquilidad: si tu certificado es correcto, lo validamos; si tiene errores, los detectamos. Sales ganando siempre.
        </p>
        <p className={styles["hero-nota"]}>
          <strong>Brown Discount:</strong> pérdida de valor del inmueble por mala calificación energética. Hasta un 15% menos en el precio de venta.
        </p>
        <p className={styles["hero-credentials"]}>
          Revisado y firmado por <strong>Eva María González García</strong> · Arquitecta Técnica colegiada CATEB 9457 · Seguro de responsabilidad civil
        </p>
      </HeroSection>

      {/* ===== EL PROBLEMA ===== */}
      <section className={`${styles.section} ${styles["audience-section"]}`}>
        <h2 className={styles["section-title"]}>El problema que resuelve la Segunda Opinión</h2>
        <p className={styles["section-sub"]}>
          Cada situaci&oacute;n requiere una respuesta distinta. Descubre c&oacute;mo te afecta tu certificado energ&eacute;tico.
        </p>
        <div className={styles["audience-grid"]}>
          <div className={styles["audience-card"]}>
            <h3>Vas a comprar una vivienda</h3>
            <p>El certificado del vendedor marca una A, pero ¿es real? Si la calificación está inflada, puedes estar pagando hasta un 15% más del valor real. Por 59€ IVA incluido lo comprobamos antes de firmar.</p>
            <a href="#" className={styles["audience-link"]}>Quiero verificar antes de comprar →</a>
          </div>
          <div className={styles["audience-card"]}>
            <h3>Vas a vender tu piso</h3>
            <p>Un certificado con errores te hace perder dinero. Si tu calificación real es mejor de lo que pone, estás regalando tu inmueble. Si es peor, puedes arreglarlo antes de ponerlo en venta.</p>
            <a href="#" className={styles["audience-link"]}>Quiero saber cuánto vale mi piso realmente →</a>
          </div>
          <div className={styles["audience-card"]}>
            <h3>Vives en tu casa y quieres saber tu letra</h3>
            <p>Saber tu calificación real te permite calcular cuánto gastas en energía, cuánto puedes ahorrar con mejoras, y si puedes acceder a subvenciones. ¿Has reformado? Quizás te corresponda una letra mejor.</p>
            <a href="#" className={styles["audience-link"]}>Quiero saber mi letra real →</a>
          </div>
        </div>
      </section>

      {/* ===== ROI CONTRAST ===== */}
      <section className={`${styles.section} ${styles["roi-contrast-section"]}`}>
        <h2 className={styles["section-title"]}>59€ de inversión vs. miles de euros de riesgo</h2>
        <p className={styles["section-sub"]}>Esto es lo que está en juego si tu certificado no es fiable.</p>
        <div className={styles["roi-contrast-grid"]}>
          <div className={`${styles["roi-contrast-card"]} ${styles.bad}`}>
            <div className={styles["roi-contrast-label"]}>Sin revisión</div>
            <div className={styles["roi-contrast-amount"]}>Hasta 40.000€</div>
            <div className={styles["roi-contrast-desc"]}>de pérdida por Brown Discount en una vivienda de 270.000€</div>
            <ul className={styles["roi-contrast-list"]}>
              <li>✗ No sabes si la calificación es real</li>
              <li>✗ Pagas de más, vendes por menos o pierdes ayudas</li>
              <li>✗ Sin respaldo profesional</li>
            </ul>
          </div>
          <div className={styles["roi-contrast-divider"]}>
            <span className={styles["roi-contrast-vs"]}>VS</span>
          </div>
          <div className={`${styles["roi-contrast-card"]} ${styles.good}`}>
            <div className={styles["roi-contrast-label"]}>Con Segunda Opinión</div>
            <div className={styles["roi-contrast-amount"]}>59€</div>
            <div className={styles["roi-contrast-desc"]}>inversión única. Recuperable si hay errores.</div>
            <ul className={styles["roi-contrast-list"]}>
              <li>✓ Sabes si tu certificado es fiable</li>
              <li>✓ Detectamos errores y Brown Discount</li>
              <li>✓ Informe firmado por arquitecta colegiada</li>
            </ul>
          </div>
        </div>
        <div className={styles["roi-contrast-cta"]}>
          <a href={waUrl("Hola, quiero proteger mi inversión con la Segunda Opinión de mi certificado energético.")} className={styles["roi-contrast-button"]}>Proteger mi inversión por 59€ →</a>
        </div>
      </section>

      {/* ===== QUÉ INCLUYE Y CÓMO FUNCIONA (fusionado) ===== */}
      <section className={`${styles.section} ${styles["merged-section"]}`}>
        <h2 className={styles["section-title"]}>Qué incluye y cómo funciona</h2>
        <p className={styles["section-sub"]}>
          Todo lo que necesitas para saber si puedes confiar en tu certificado energético, explicado paso a paso.
        </p>
        <div className={styles["merged-grid"]}>
          <div className={styles["merged-include-col"]}>
            <h3 className={styles["merged-col-title"]}>Incluye</h3>
            <ul className={styles["merged-include-list"]}>
              <li>Revisión de la calificación energética asignada</li>
              <li>Detección de errores, discrepancias y valores inventados</li>
              <li>Detección de Brown Discount (pérdida de valor del inmueble)</li>
              <li>Informe PDF detallado con conclusiones técnicas</li>
              <li>Recomendaciones accionables</li>
              <li>Orientación sobre próximos pasos</li>
            </ul>
          </div>
          <div className={styles["merged-steps-col"]}>
            <h3 className={styles["merged-col-title"]}>Cómo funciona</h3>
            <div className={styles["merged-step"]}>
              <span className={styles["merged-step-num"]}>1</span>
              <div>
                <h4>Envíanos tu certificado</h4>
                <p>Sube tu certificado energético en PDF o imagen junto con la dirección del inmueble. Sin desplazamientos.</p>
              </div>
            </div>
            <div className={styles["merged-step"]}>
              <span className={styles["merged-step-num"]}>2</span>
              <div>
                <h4>Analizamos tu certificado</h4>
                <p>El equipo técnico revisa personalmente cada caso. Sin algoritmos, sin automatismos. Con rigor técnico profesional.</p>
              </div>
            </div>
            <div className={styles["merged-step"]}>
              <span className={styles["merged-step-num"]}>3</span>
              <div>
                <h4>Recibes tu dictamen</h4>
                <p>Informe PDF detallado con conclusiones, errores detectados, detección de Brown Discount y próximos pasos.</p>
              </div>
            </div>
            <div className={styles["merged-step-cta"]}>
              <a href={waUrl("Hola, quiero solicitar la Segunda Opinión de mi certificado energético.")} className={styles["merged-step-button"]}>Solicitar Segunda Opinión →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== POR QUÉ CERTILAB ===== */}
      <section className={`${styles.section} ${styles["trust-reasons-section"]}`}>
        <h2 className={styles["section-title"]}>¿Por qué confiar tu revisión a Certilab?</h2>
        <p className={styles["section-sub"]}>No somos comprador, ni vendedor, ni agencia inmobiliaria. No tenemos interés en la operación. Somos profesionales independientes, como un juez técnico: nuestra única función es decir la verdad sobre tu certificado.</p>
        <div className={styles["trust-reasons-grid"]}>
          <div className={styles["trust-reason-card"]}>
            <div className={styles["trust-reason-num"]}>01</div>
            <h3>Revisión humana real</h3>
            <p>Cada certificado lo analiza personalmente una arquitecta técnica colegiada. Sin IA, sin automatismos.</p>
          </div>
          <div className={styles["trust-reason-card"]}>
            <div className={styles["trust-reason-num"]}>02</div>
            <h3>Responsabilidad profesional</h3>
            <p>Eva María González García, colegiada CATEB 9457, con seguro de responsabilidad civil. Firmamos lo que dictaminamos.</p>
          </div>
          <div className={styles["trust-reason-card"]}>
            <div className={styles["trust-reason-num"]}>03</div>
            <h3>Independencia total</h3>
            <p>No compramos, no vendemos, no intermediarios. Actuamos como peritos independientes: no nos beneficia que compres, vendas o alquiles. Solo nos importa la verdad técnica de tu certificado.</p>
          </div>
          <div className={styles["trust-reason-card"]}>
            <div className={styles["trust-reason-num"]}>04</div>
            <h3>Sin esperas ni papeleo</h3>
            <p>100% online. Envíanos tu PDF por WhatsApp y recibe tu informe en 24-48h. Sin desplazarte, sin llamadas, sin compromiso.</p>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialsSection />

      {/* ===== FAQ ===== */}
      <FAQSection items={segundaOpinionFaq} title="Preguntas frecuentes sobre la Segunda Opinión" />

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
                price: "59",
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
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              bestRating: "5",
              ratingCount: "87",
            },
          }),
        }}
      />

      {/* Schema.org HowTo */}
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
            estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "59" },
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
              { "@type": "ListItem", position: 2, name: "Segunda Opinión", item: "https://www.certilab.cat/segunda-opinion/" },
            ],
          }),
        }}
      />

       {/* ===== CTA FINAL ===== */}
       <section className={`${styles.section}`} style={{ textAlign: 'center', paddingTop: '3rem', paddingBottom: '3rem' }}>
         <h2 className={styles["section-title"]}>¿Listo para saber la verdad sobre tu certificado?</h2>
         <p className={styles["section-sub"]} style={{ marginBottom: '2rem' }}>
           Por 59€ IVA incluido, un técnico colegiado revisa tu certificado en 24-48 horas.
         </p>
         <a href={waUrl("Hola, quiero solicitar la Segunda Opinión de mi certificado energético (59€).")} className={styles["roi-contrast-button"]} style={{ display: 'inline-block' }}>Solicitar Segunda Opinión por 59€ →</a>
       </section>
    </>
  );
}
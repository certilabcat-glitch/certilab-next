import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import HeroSection from "@/components/sections/HeroSection";
import ComparativaSection from "@/components/sections/ComparativaSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { segundaOpinionFaq } from "@/data/faq";
import { waDiagnostico } from "@/lib/wa";
import styles from "./SegundaOpinion.module.css";

export const metadata: Metadata = {
  title: "Segunda Opinión Certificado Energético (39€) | Certilab",
  description:
    "Revisamos tu certificado energético y detectamos calificaciones infladas, errores técnicos y Brown Discount. Informe forense en 24-48h. Eva Mª González, Arquitecta Técnica Cateb 9457.",
  alternates: { canonical: "https://www.certilab.cat/segunda-opinion/" },
  openGraph: {
    title: "Segunda Opinión Certificado Energético | Certilab",
    description:
      "¿Confías en que la letra de tu certificado es real? Por 39€ revisamos tu certificado y te decimos si es fiable o si te están engañando.",
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
        subtitle="Por 39€ revisamos su certificado, detectamos calificaciones infladas, errores técnicos y Brown Discount. Le decimos si su certificado es fiable o si le están engañando. Sin desplazamientos."
        badges={["Colegiada CATEB Barcelona", "24-48h", "100% remoto"]}
        price="39 €"
        priceOld="69 €"
        credentials="Eva María González García · Arquitecta Técnica colegiada"
        ctaPrimary={{ label: "Solicitar Segunda Opinión", href: waDiagnostico() }}
        ctaSecondary={{ label: "Express 4h (79€) →", href: "/segunda-opinion-express/" }}
        nota="Precio cerrado sin sorpresas (sin IVA). Si lo necesita urgente, dispone de la Segunda Opinión Express con entrega en 4 horas."
      >
        <p className={styles["hero-garantia"]}>
          <span className={styles["hero-garantia-icon"]}>&#9432;</span>
          Por 39 € obtienes tranquilidad: si tu certificado es correcto, lo validamos; si tiene errores, los detectamos. Sales ganando siempre.
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
            <p>El certificado del vendedor marca una A, pero ¿es real? Si la calificación está inflada, puedes estar pagando hasta un 15% más del valor real. Por 39€ lo comprobamos antes de firmar.</p>
            <a href={waDiagnostico()} className={styles["audience-link"]}>Quiero verificar antes de comprar →</a>
          </div>
          <div className={styles["audience-card"]}>
            <h3>Vas a vender tu piso</h3>
            <p>Un certificado con errores te hace perder dinero. Si tu calificación real es mejor de lo que pone, estás regalando tu inmueble. Si es peor, puedes arreglarlo antes de ponerlo en venta.</p>
            <a href={waDiagnostico()} className={styles["audience-link"]}>Quiero saber cuánto vale mi piso realmente →</a>
          </div>
          <div className={styles["audience-card"]}>
            <h3>Vives en tu casa y quieres saber tu letra</h3>
            <p>Saber tu calificación real te permite calcular cuánto gastas en energía, cuánto puedes ahorrar con mejoras, y si puedes acceder a subvenciones. ¿Has reformado? Quizás te corresponda una letra mejor.</p>
            <a href={waDiagnostico()} className={styles["audience-link"]}>Quiero saber mi letra real →</a>
          </div>
        </div>
      </section>

      {/* ===== ROI CONTRAST ===== */}
      <section className={`${styles.section} ${styles["roi-contrast-section"]}`}>
        <h2 className={styles["section-title"]}>39€ de inversión vs. miles de euros de riesgo</h2>
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
            <div className={styles["roi-contrast-amount"]}>39€</div>
            <div className={styles["roi-contrast-desc"]}>inversión única. Recuperable si hay errores.</div>
            <ul className={styles["roi-contrast-list"]}>
              <li>✓ Sabes si tu certificado es fiable</li>
              <li>✓ Detectamos errores y Brown Discount</li>
              <li>✓ Informe firmado por arquitecta colegiada</li>
            </ul>
          </div>
        </div>
        <div className={styles["roi-contrast-cta"]}>
          <a href={waDiagnostico()} className={styles["roi-contrast-button"]}>Proteger mi inversión por 39€ →</a>
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
              <a href={waDiagnostico()} className={styles["merged-step-button"]}>Solicitar Segunda Opinión →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMPARATIVA ===== */}
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

      {/* ===== CTA FINAL ===== */}
      <CTASection
        title="¿Desconfías de la calificación de tu certificado?"
        text="Por 39€ te decimos si es fiable. Sin compromiso. Con el rigor técnico de una arquitecta técnica colegiada."
        buttonText="Enviar mi certificado para revisión"
        buttonHref={waDiagnostico()}
      />

      {/* ===== STICKY CTA BAR ===== */}
      <div className={styles["sticky-cta-bar"]}>
        <div className={styles["sticky-cta-inner"]}>
          <div className={styles["sticky-cta-info"]}>
            <span className={styles["sticky-cta-price"]}>39€</span>
            <span className={styles["sticky-cta-meta"]}>24-48h · Sin sorpresas</span>
          </div>
          <div className={styles["sticky-cta-actions"]}>
            <a href={waDiagnostico()} className={styles["sticky-cta-button"]}>
              Solicitar ahora
            </a>
            <a
              href={waDiagnostico()}
              className={styles["sticky-cta-wa"]}
              aria-label="Contactar por WhatsApp"
              title="Escríbenos por WhatsApp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>
        <p className={styles["sticky-cta-micro"]}>Pago seguro · Datos protegidos · Sin compromiso</p>
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
              { "@type": "ListItem", position: 2, name: "Segunda Opinión", item: "https://www.certilab.cat/segunda-opinion/" },
            ],
          }),
        }}
      />
    </>
  );
}
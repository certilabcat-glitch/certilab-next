import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import HeroSection from "@/components/sections/HeroSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import { waDiagnostico } from "@/lib/wa";

const faqItems = [
  {
    q: "¿Los certificados energéticos online baratos son ilegales?",
    a: "Sí, si no incluyen visita presencial al inmueble. El RD 390/2021 art. 6.5 exige que el técnico realice al menos una visita antes de emitir el certificado. Un certificado energético emitido sin visita incumple la normativa y puede ser declarado nulo.",
  },
  {
    q: "¿Cuánto debería costar un certificado energético real con visita?",
    a: "Entre 80 y 200 € según la ubicación, superficie y complejidad del inmueble. Los precios inferiores a 60 € suelen indicar modelos sin visita presencial, lo que incumple el RD 390/2021.",
  },
  {
    q: "¿Puedo reclamar si me han hecho un certificado energético sin visita?",
    a: 'Sí. Puedes reclamar ante la administración autonómica competente en materia de energía y ante asociaciones de consumidores como FACUA. El técnico firmante también puede ser objeto de expediente deontológico en su colegio profesional.',
  },
  {
    q: "¿Certilab me puede ayudar aunque no emita el certificado energético?",
    a: "Sí. Nuestra especialidad es la segunda opinión técnica: analizamos certificados existentes para detectar errores, calificaciones infladas o fraudulentas. También ofrecemos el Check-Up Inmobiliario y el Informe Técnico Energético para quienes necesitan un análisis profundo sin certificado oficial.",
  },
];

export const metadata: Metadata = {
  title: "Por qué no emitimos certificados energéticos | Certilab",
  description:
    "La ley exige visita presencial para emitir un CE. Conoce los riesgos de los certificados online y las alternativas legales. Arquitecta Técnica Cateb 9457.",
  alternates: { canonical: "https://www.certilab.cat/por-que-no-emite-ce/" },
  openGraph: {
    title: "Por qué no emitimos certificados energéticos | Certilab",
    description:
      "No emitimos certificados energéticos porque la ley exige visita presencial. Conoce los riesgos legales y nuestra alternativa ética.",
    url: "https://www.certilab.cat/por-que-no-emite-ce/",
  },
};

export default function PorQueNoEmiteCEPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Por qué no emitimos CE", href: "/por-que-no-emite-ce/" },
        ]}
      />

      <HeroSection
        eyebrow="Transparencia total"
        title="¿Por qué Certilab no<em> emite</em> certificados energéticos?"
        subtitle="No es porque no queramos. Es porque la ley no lo permite sin visita presencial. Y nosotros no hacemos trampas."
        badges={["RD 390/2021", "Transparencia", "Ética profesional"]}
        ctaPrimary={{
          label: "¿Necesitas ayuda? Consulta gratis →",
          href: waDiagnostico(),
        }}
      />

      {/* Empathy section */}
      <section className="empathy-section">
        <p>
          Cada semana nos llegan mensajes de propietarios y compradores que han pagado
          30-50€ por un certificado energético online. Y cada semana tenemos que
          decirles que ese documento, probablemente, no vale nada.
        </p>
        <p>
          No porque seamos aguafiestas. Sino porque el <strong>Real Decreto 390/2021</strong>,
          en su artículo 6.5, es tajante:
        </p>
        <p className="transition-text">
          &ldquo;El técnico competente deberá realizar una visita al inmueble para la correcta
          realización del certificado de eficiencia energética.&rdquo;
        </p>
        <p>
          No hay atajos. No hay &ldquo;inteligencia artificial&rdquo; que pueda inspeccionar
          una instalación real. No hay sustituto para los ojos de un técnico colegiado
          sobre el terreno.
        </p>
      </section>

      {/* Law section */}
      <section className="law-section">
        <div className="content-narrow">
          <h2 className="section-title">Lo que dice la ley</h2>
          <div className="legal-quote">
            <p>
              &ldquo;Artículo 6.5. El técnico competente deberá realizar una visita al inmueble
              para la correcta realización del certificado de eficiencia energética. La visita
              tendrá como objeto la recogida de los datos necesarios para la evaluación de la
              calificación de eficiencia energética del edificio o, en su caso, de la parte
              del mismo.&rdquo;
            </p>
            <cite>
              Real Decreto 390/2021, de 1 de junio, por el que se aprueba el procedimiento
              básico para la certificación de la eficiencia energética de los edificios
              <br />
              <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2021-9179" target="_blank" rel="noopener noreferrer">
                Ver texto completo en el BOE →
              </a>
            </cite>
          </div>
        </div>
      </section>

      {/* Router cards */}
      <section className="section">
        <h2 className="section-title">Alternativas que sí podemos ofrecerte</h2>
        <p className="section-sub">
          Aunque no emitimos el certificado oficial, tenemos servicios que pueden ayudarte
          más de lo que imaginas.
        </p>
        <div className="router-grid">
          <div className="card">
            <p className="card-tag">Servicio estrella</p>
            <h3>Segunda Opinión</h3>
            <p>¿Ya tienes un certificado pero no te fías? Lo revisamos y te decimos si es fiable.</p>
            <p className="card-price">39€ <small>/ 24h</small></p>
            <Link href="/segunda-opinion/" className="card-cta">Ver detalles →</Link>
          </div>
          <div className="card">
            <p className="card-tag">Urgente</p>
            <h3>Segunda Opinión Express</h3>
            <p>Mismo análisis, entrega en menos de 2 horas.</p>
            <p className="card-price">79€ <small>/ &lt;2h</small></p>
            <Link href="/segunda-opinion-express/" className="card-cta">Ver detalles →</Link>
          </div>
          <div className="card destacado">
            <p className="card-tag">Antes de comprar</p>
            <h3>Check-Up Inmobiliario</h3>
            <p>Análisis completo del inmueble antes de firmar. Nota Simple, Catastral, CE y más.</p>
            <p className="card-price">199€ <small>/ 48-72h</small></p>
            <Link href="/check-up-inmobiliario/" className="card-cta">Ver detalles →</Link>
          </div>
          <div className="card">
            <p className="card-tag">Máximo detalle</p>
            <h3>Informe Técnico Energético</h3>
            <p>Análisis completo con mejoras, ahorros y ayudas disponibles.</p>
            <p className="card-price">399€</p>
            <Link href="/informe-tecnico-energetico/" className="card-cta">Ver detalles →</Link>
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} title="Preguntas frecuentes sobre certificados energéticos" />
      <CTASection
        title="¿Tienes un certificado dudoso?"
        text="Por 39€ te decimos si es fiable. Sin compromiso. Con el rigor de una arquitecta técnica colegiada."
        buttonText="Enviar mi certificado para revisión"
        buttonHref={waDiagnostico()}
      />
      <TrustBlockSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.certilab.cat/" },
                { "@type": "ListItem", position: 2, name: "Por qué no emitimos certificados energéticos", item: "https://www.certilab.cat/por-que-no-emite-ce/" },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            },
          ]),
        }}
      />
    </>
  );
}

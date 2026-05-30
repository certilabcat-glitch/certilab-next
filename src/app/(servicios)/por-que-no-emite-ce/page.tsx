import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import { waDiagnostico } from "@/lib/wa";
import "./guia.css";

const faqItems = [
  {
    q: "¿Cómo puedo saber si mi certificado energético es falso?",
    a: 'Señales de alerta: (1) no incluye fecha de visita presencial al inmueble, (2) el precio fue inferior a 60€, (3) el técnico firmante no aparece en el registro de su colegio profesional, (4) los datos son genéricos del catastro sin verificar, (5) la calificación es sospechosamente alta para las características del inmueble. Si sospechas que tu certificado no es fiable, solicita una <a href="/segunda-opinion/" style="color:var(--color-terra);text-decoration:underline;">Segunda Opinión</a> y en 24h sabrás si es correcto.',
  },
  {
    q: "¿Cuánto debería costar un certificado energético con visita presencial?",
    a: "Entre 80 y 200 € según la ubicación, superficie y complejidad del inmueble. Los precios inferiores a 60 € suelen indicar certificados emitidos sin visita presencial, lo que incumple el Real Decreto 390/2021 y puede invalidar el documento.",
  },
  {
    q: "¿Qué hago si descubro que mi certificado energético no es válido?",
    a: 'Puedes: (1) solicitar una Segunda Opinión en Certilab para confirmar las irregularidades, (2) reclamar ante el colegio profesional del técnico firmante, (3) denunciar ante la administración autonómica competente en materia de energía, (4) contactar con asociaciones de consumidores como FACUA.',
  },
  {
    q: "¿Puedo reclamar si el vendedor me ocultó que el certificado no era fiable?",
    a: "Sí. Si el vendedor tenía conocimiento de que el certificado energético contenía errores o estaba inflado y no te lo comunicó, puede haber ocultación de información relevante. Nuestro informe de Segunda Opinión puede servirte como prueba documental en una reclamación.",
  },
  {
    q: "¿Certilab puede ayudarme aunque no emita certificados energéticos?",
    a: "Sí. Nuestra especialidad es la segunda opinión técnica: analizamos certificados existentes para detectar errores, calificaciones infladas o fraudulentas. También ofrecemos el Check-Up Inmobiliario (199€) para quien va a comprar y el Informe Técnico Energético (399€) para análisis profundos con propuestas de mejora.",
  },
];

export const metadata: Metadata = {
  title: "¿Tu certificado energético es falso? Guía para detectarlo | Certilab",
  description:
    "Guía para detectar si tu certificado energético es falso: señales de alerta, precio justo, cómo reclamar y alternativas legales. Arquitecta Técnica colegiada.",
  alternates: { canonical: "https://www.certilab.cat/por-que-no-emite-ce/" },
  openGraph: {
    title: "¿Tu certificado energético es falso? Guía para detectarlo | Certilab",
    description:
      "Aprende a detectar señales de alerta en tu certificado energético: visita presencial, precio, colegiación del técnico y más. Guía práctica con alternativas.",
    url: "https://www.certilab.cat/por-que-no-emite-ce/",
  },
};

export default function PorQueNoEmiteCEPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Guía: ¿Tu certificado energético es falso?", href: "/por-que-no-emite-ce/" },
        ]}
      />

      <header className="guide-hero">
        <p className="guide-eyebrow">Guía práctica · Actualizado 2026</p>
        <h1>¿Tu certificado energético es falso?<br />Guía para detectarlo</h1>
        <p className="guide-sub">
          <strong>3 de cada 10 certificados energéticos contienen errores graves.</strong> Antes de comprar
          una vivienda, saber si tu certificado es fiable puede ahorrarte miles de euros. Esta guía te
          enseña a identificar las señales de alerta.
        </p>
      </header>

      {/* Señales de alerta */}
      <section className="guide-section">
        <h2>Señales de alerta: cómo detectar un certificado energético no fiable</h2>
        <p className="guide-section-sub">
          Estas son las 5 señales más comunes que indican que tu certificado energético puede no ser
          válido. Si tu certificado cumple una o más, solicita una segunda opinión profesional.
        </p>
        <div className="alertas-grid">
          <div className="alerta-card">
            <span className="alerta-icon">🔍</span>
            <h3>1. No incluye fecha de visita presencial</h3>
            <p>El Real Decreto 390/2021 exige que el técnico visite el inmueble. Si tu certificado no menciona una visita in situ, probablemente se hizo sin pisar la vivienda. Esto lo invalida.</p>
          </div>
          <div className="alerta-card">
            <span className="alerta-icon">💰</span>
            <h3>2. Precio inferior a 60€</h3>
            <p>Un certificado energético real con visita presencial cuesta entre 80 y 200€. Si pagaste menos de 60€, es muy probable que no haya habido visita. Por debajo de 40€, es casi seguro que es irregular.</p>
          </div>
          <div className="alerta-card">
            <span className="alerta-icon">👤</span>
            <h3>3. Técnico no colegiado o no verificable</h3>
            <p>El técnico debe estar colegiado. Busca su número de colegiado en el registro del Colegio de Arquitectos Técnicos de tu provincia. Si no aparece, el certificado carece de responsabilidad profesional.</p>
          </div>
          <div className="alerta-card">
            <span className="alerta-icon">📋</span>
            <h3>4. Datos genéricos sin verificar</h3>
            <p>Si el certificado usa solo datos del catastro sin mencionar reformas, aislamiento real o instalaciones específicas del inmueble, es una señal de que no hubo visita. Cada vivienda es única.</p>
          </div>
          <div className="alerta-card">
            <span className="alerta-icon">📈</span>
            <h3>5. Calificación sospechosamente alta</h3>
            <p>Una vivienda antigua sin reformas difícilmente obtiene una A o B. Si la calificación parece inflada para lo que sabes de tu inmueble, probablemente lo está. Esto se conoce como <strong>Brown Discount</strong>.</p>
          </div>
        </div>
      </section>

      {/* La ley en lenguaje claro */}
      <section className="guide-section guide-section-alt">
        <h2>¿Qué dice la ley sobre los certificados energéticos?</h2>
        <p className="guide-section-sub">
          Resumen en lenguaje claro de la normativa aplicable.
        </p>
        <div className="ley-grid">
          <div className="ley-card">
            <h3>Real Decreto 390/2021</h3>
            <p><strong>Artículo 6.5:</strong> &ldquo;El técnico competente deberá realizar una visita al inmueble para la correcta realización del certificado de eficiencia energética.&rdquo;</p>
            <p>Esto significa que cualquier certificado emitido sin visita presencial incumple la ley y puede ser declarado nulo.</p>
          </div>
          <div className="ley-card">
            <h3>Validez del certificado</h3>
            <p>Un certificado energético tiene una validez de <strong>10 años</strong>. Sin embargo, si el inmueble ha tenido reformas significativas (cambio de ventanas, aislamiento, caldera), el certificado debería actualizarse para reflejar la nueva calificación.</p>
          </div>
          <div className="ley-card">
            <h3>Sanciones y responsabilidades</h3>
            <p>El técnico firmante puede ser sancionado por su colegio profesional si emite certificados sin visita. El comprador del inmueble puede reclamar si el certificado contenía errores que le causaron un perjuicio económico.</p>
          </div>
        </div>
        <p className="ley-footer">
          <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2021-9179" target="_blank" rel="noopener noreferrer">
            Ver texto completo del Real Decreto 390/2021 →
          </a>
        </p>
      </section>

      {/* Qué hacer si es falso */}
      <section className="guide-section">
        <h2>¿Qué hacer si tu certificado energético no es fiable?</h2>
        <p className="guide-section-sub">
          Si has identificado alguna señal de alerta, estos son los pasos que recomendamos.
        </p>
        <div className="pasos-guia">
          <div className="paso-guia">
            <span className="paso-num">1</span>
            <h3>Solicita una Segunda Opinión</h3>
            <p>Por 39€ analizamos tu certificado actual y te decimos si es fiable, qué errores tiene y si la calificación es correcta. Entrega en 24-48h.</p>
            <Link href="/segunda-opinion/" className="paso-cta">Solicitar Segunda Opinión →</Link>
          </div>
          <div className="paso-guia">
            <span className="paso-num">2</span>
            <h3>Reclama ante el colegio profesional</h3>
            <p>Si el técnico firmante actuó de forma negligente, puedes presentar una queja ante su colegio profesional (Cateb, COAAT, etc.). Ellos pueden abrir expediente.</p>
          </div>
          <div className="paso-guia">
            <span className="paso-num">3</span>
            <h3>Denuncia ante la administración</h3>
            <p>Puedes presentar una reclamación ante la Dirección General de Energía de tu comunidad autónoma. El certificado falso puede ser anulado y el técnico sancionado.</p>
          </div>
        </div>
      </section>

      {/* Alternativas */}
      <section className="guide-section guide-section-alt">
        <h2>Alternativas que sí podemos ofrecerte</h2>
        <p className="guide-section-sub">
          Aunque no emitimos certificados energéticos oficiales (porque la ley exige visita presencial y nuestro modelo es 100% remoto), estos servicios pueden ayudarte.
        </p>
        <div className="alt-grid">
          <Link href="/segunda-opinion/" className="alt-card">
            <span className="alt-badge">Más popular</span>
            <h3>Segunda Opinión (39€)</h3>
            <p>¿Ya tienes un certificado pero no te fías? Lo revisamos y te decimos si es fiable. Incluye detección de Brown Discount.</p>
            <span className="alt-link">Ver servicio →</span>
          </Link>
          <Link href="/segunda-opinion-express/" className="alt-card">
            <span className="alt-badge">Urgente</span>
            <h3>Express (79€)</h3>
            <p>Mismo análisis, entrega en menos de 2 horas. Para firmas inminentes o plazos ajustados.</p>
            <span className="alt-link">Ver servicio →</span>
          </Link>
          <Link href="/check-up-inmobiliario/" className="alt-card alt-destacado">
            <span className="alt-badge">Recomendado</span>
            <h3>Check-Up Inmobiliario (199€)</h3>
            <p>Análisis completo antes de comprar: Nota Simple, Catastral, cargas, certificado energético y detección de riesgos.</p>
            <span className="alt-link">Ver servicio →</span>
          </Link>
          <Link href="/informe-tecnico-energetico/" className="alt-card">
            <span className="alt-badge">Máximo detalle</span>
            <h3>Informe Técnico (399€)</h3>
            <p>Análisis completo del comportamiento energético con propuestas de mejora y orientación sobre ayudas.</p>
            <span className="alt-link">Ver servicio →</span>
          </Link>
        </div>
      </section>

      <FAQSection items={faqItems} title="Preguntas frecuentes sobre certificados energéticos" />

      <CTASection
        title="¿Tu certificado te genera dudas?"
        text="Por 39€ lo revisamos y te decimos si es fiable. Sin compromiso. Con el rigor de una arquitecta técnica colegiada."
        buttonText="Solicitar Segunda Opinión"
        buttonHref={waDiagnostico()}
      />

      <TrustBlockSection />
    </>
  );
}

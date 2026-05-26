import { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import StepsGrid from "@/components/sections/StepsGrid";
import IncludesBox from "@/components/ui/IncludesBox";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import { waDiagnostico } from "@/lib/wa";

const faq = [
  {
    q: "¿El análisis Express tiene el mismo rigor que el estándar?",
    a: "Sí, el análisis técnico es idéntico. La única diferencia es el plazo de entrega: menos de 2 horas en lugar de 24-48h.",
  },
  {
    q: "¿En qué horario está disponible el servicio Express?",
    a: "De lunes a viernes, de 9:00 a 18:00 horas. Los pedidos fuera de este horario se procesan al inicio de la siguiente ventana disponible.",
  },
  {
    q: "¿Qué necesito para solicitarlo?",
    a: "El certificado energético en PDF o imagen y la dirección del inmueble. Misma documentación que la modalidad estándar.",
  },
];

export const metadata: Metadata = {
  title: "Segunda Opinión Express (79€) | Entrega en 2h | Certilab",
  description:
    "Segunda opinión de tu certificado energético con entrega urgente en menos de 2 horas. 79€. Mismo rigor técnico que la estándar. Arquitecta Técnica Cateb 9457.",
  alternates: { canonical: "https://www.certilab.cat/segunda-opinion-express/" },
  openGraph: {
    title: "Segunda Opinión Express (79€) | Entrega en 2h | Certilab",
    description:
      "Segunda opinión de tu certificado energético con entrega urgente en menos de 2 horas. 79€. Cateb 9457.",
    url: "https://www.certilab.cat/segunda-opinion-express/",
  },
};

export default function SegundaOpinionExpressPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Segunda Opinión Express", href: "/segunda-opinion-express/" },
        ]}
      />

      <HeroSection
        eyebrow="Respuesta urgente"
        title="Segunda Opinión Express"
        subtitle="El mismo análisis que la Segunda Opinión estándar, pero con entrega en menos de 2 horas. Para cuando no puedes esperar."
        badges={["Cateb 9457", "Entrega <2h", "Urgente"]}
        price="79 €"
        credentials="Disponible lunes a viernes de 9 a 18 h"
        ctaPrimary={{ label: "Solicitar Express", href: waDiagnostico() }}
      />

      <FeaturesGrid
        features={[
          { num: "I", title: "Mismo rigor técnico", text: "El análisis es idéntico al de la modalidad estándar. Eva revisa personalmente cada caso." },
          { num: "II", title: "Entrega récord", text: "Menos de 2 horas laborables desde que recibimos tu documentación." },
          { num: "III", title: "Para firmas inminentes", text: "Perfecto si tienes una compraventa, firma de hipoteca o fecha límite." },
          { num: "IV", title: "Soporte prioritario", text: "Atención preferente durante todo el proceso. Habla directamente con Eva." },
        ]}
      />

      {/* Schedule box */}
      <section className="bg-cream-top" style={{ padding: "0 1.5rem" }}>
        <div className="schedule-box">
          <h3>Horarios del servicio Express</h3>
          <div className="schedule-item">
            <p className="schedule-label">Disponibilidad</p>
            <p className="schedule-value">Lunes a viernes, 9:00 - 18:00 (laborables)</p>
          </div>
          <div className="schedule-item">
            <p className="schedule-label">Plazo de entrega</p>
            <p className="schedule-value">Menos de 2 horas desde la recepción de documentos</p>
          </div>
          <div className="schedule-item">
            <p className="schedule-label">Pedidos fuera de horario</p>
            <p className="schedule-value">Se procesan al inicio de la siguiente ventana disponible</p>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section" style={{ paddingTop: "0" }}>
        <h2 className="section-title" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 400, textAlign: "center", marginBottom: "2rem" }}>
          Comparativa: Estándar vs Express
        </h2>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Característica</th>
              <th>Estándar (39€)</th>
              <th>Express (79€)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="highlight">Plazo de entrega</td>
              <td>24-48 horas laborables</td>
              <td>Menos de 2 horas</td>
            </tr>
            <tr>
              <td className="highlight">Rigor técnico</td>
              <td>Máximo</td>
              <td>Máximo (idéntico)</td>
            </tr>
            <tr>
              <td className="highlight">Horario</td>
              <td>24/7</td>
              <td>L-V 9-18h</td>
            </tr>
            <tr>
              <td className="highlight">Soporte</td>
              <td>Estándar</td>
              <td>Prioritario</td>
            </tr>
          </tbody>
        </table>
      </section>

      <StepsGrid
        steps={[
          { title: "Solicita", text: "Contáctanos por WhatsApp con tu certificado y dirección." },
          { title: "Analizamos", text: "Eva revisa tu caso de forma prioritaria y urgente." },
          { title: "Recibes", text: "En menos de 2h tienes tu dictamen técnico detallado." },
        ]}
      />

      <IncludesBox
        items={[
          "Análisis completo del certificado",
          "Detección de errores en tiempo récord",
          "Informe PDF urgente",
          "Soporte prioritario",
        ]}
      />

      <FAQSection items={faq} title="Preguntas sobre el servicio Express" />
      <CTASection
        title="¿Necesitas una respuesta urgente?"
        text="Para firmas inminentes, compraventas o plazos ajustados. Entrega en menos de 2 horas."
        buttonText="Solicitar Express ahora"
        buttonHref={waDiagnostico()}
      />
      <TrustBlockSection />
    </>
  );
}

// Hacemos accesibles las variables desde el scope del CSS-in-JS con estilos globales

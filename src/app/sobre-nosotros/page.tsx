import type { Metadata } from "next";
import EvaSection from "@/components/sections/EvaSection";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import { waDiagnostico } from "@/lib/wa";
import "./sobre-nosotros.css";

export const metadata: Metadata = {
  title: "Sobre nosotros | Certilab",
  description:
    "Conoce a Eva María González Gracia, Arquitecta Técnica Cateb 9457. La profesional detrás de cada análisis forense de Certilab.",
  alternates: { canonical: "https://www.certilab.cat/sobre-nosotros/" },
  openGraph: {
    title: "Sobre nosotros | Certilab",
    description: "Conoce a la arquitecta técnica detrás de Certilab.",
    url: "https://www.certilab.cat/sobre-nosotros/",
  },
};

export default function SobreNosotrosPage() {
  return (
    <>
      <header className="hero" role="banner">
        <p className="hero-eyebrow">Arquitectura Técnica Forense · Cateb 9457</p>
        <h1>Nadie entiende tu piso como una arquitecta técnica que ha visto cientos</h1>
        <p className="hero-sub">
          Detrás de Certilab hay una persona real, colegiada, con 20 años de
          experiencia y un compromiso ético inquebrantable.
        </p>
      </header>

      <section className="prose-block">
        <p>
          Certilab nace de una vocación: ofrecer un análisis energético riguroso,
          transparente y útil, donde cada informe está respaldado por la responsabilidad
          de una arquitecta técnica colegiada.
        </p>
        <p>
          No somos una plataforma ni un agregador de técnicos. Somos una consultoría
          técnica independiente que prioriza el cumplimiento normativo y la calidad
          del análisis sobre la velocidad comercial.
        </p>
        <p>
          Nuestro servicio consiste en analizar su certificado energético existente
          para determinar si es fiable, si contiene errores y si la calificación
          se ajusta a las características reales del inmueble.
        </p>
      </section>

      <EvaSection />

      <CTASection
        title="¿Hablamos?"
        text="Si tienes cualquier duda sobre tu certificado energético o tu vivienda, escríbenos. Sin compromiso. Sin presión."
        buttonText="Hablar con Eva"
        buttonHref={waDiagnostico()}
      />
      <TrustBlockSection />


    </>
  );
}

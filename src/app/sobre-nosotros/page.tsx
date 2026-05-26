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
          Certilab nace de una convicción: el mercado de los informes energéticos
          está roto, y alguien tenía que poner rigor donde hay algoritmo,
          responsabilidad donde hay anonimato, y ética donde hay comisión.
        </p>
        <p>
          No somos una plataforma. No somos un agregador de técnicos. No vendemos
          certificados energéticos porque la ley no nos permite hacerlo sin visita
          presencial, y no vamos a saltarnos la ley para ganar dinero.
        </p>
        <p>
          Somos una consultoría técnica independiente. Nuestro servicio estrella es
          la segunda opinión: coger ese certificado que te han dado y decirte si es
          fiable, si hay errores, si te están engañando.
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

import type { Metadata } from "next";
import CTASection from "@/components/sections/CTASection";
import { waUrl } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Profesionales | Certilab — Segunda Opinión para Arquitectos e Inmobiliarias",
  description:
    "Para arquitectos técnicos, agencias inmobiliarias y administradores de fincas. Segunda opinión técnica de certificados energéticos para tus clientes.",
  alternates: { canonical: "https://www.certilab.cat/profesionales/" },
  openGraph: {
    title: "Profesionales | Certilab",
    description: "Segunda opinión técnica para profesionales del sector inmobiliario-energético.",
    url: "https://www.certilab.cat/profesionales/",
  },
};

const waProfesionales = waUrl(
  "Hola, soy profesional del sector. Quiero información sobre vuestros servicios para profesionales."
);

const benefits = [
  {
    title: "Para agencias inmobiliarias",
    text: "Ofrece a tus compradores una segunda opinión independiente del certificado energético. Aumenta la confianza y reduce objeciones en la venta.",
  },
  {
    title: "Para arquitectos técnicos",
    text: "Validación externa de tus certificados. Cuando un cliente cuestiona un CE, nosotros emitimos un análisis técnico imparcial que respalda tu trabajo.",
  },
  {
    title: "Para administradores de fincas",
    text: "Gestiona los certificados energéticos de comunidades enteras con descuentos por volumen. Un solo interlocutor para toda la finca.",
  },
];

const s = {
  section: { padding: "7.5rem 1.5rem", maxWidth: "1100px", margin: "0 auto" },
  sectionTitle: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
    fontWeight: 400 as const,
    color: "var(--color-black)",
    textAlign: "center" as const,
    marginBottom: "0.75rem",
  },
  sectionSubtitle: {
    textAlign: "center" as const,
    maxWidth: "650px",
    margin: "0 auto 3rem",
    fontFamily: "var(--font-sans)",
    fontSize: "1rem",
    color: "var(--color-grey)",
    lineHeight: 1.7,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
    marginBottom: "3rem",
  },
  card: {
    border: "1px solid var(--color-border)",
    padding: "2rem",
  },
  cardTitle: {
    fontFamily: "var(--font-serif)",
    fontSize: "1.1rem",
    fontWeight: 400 as const,
    color: "var(--color-black)",
    marginBottom: "0.5rem",
  },
  cardText: {
    fontFamily: "var(--font-sans)",
    fontSize: "0.9rem",
    color: "var(--color-grey)",
    lineHeight: 1.6,
    margin: 0,
  },
  ctaBox: {
    border: "1px solid var(--color-border)",
    padding: "3rem 2rem",
    textAlign: "center" as const,
  },
  ctaTitle: {
    fontFamily: "var(--font-serif)",
    fontSize: "1.25rem",
    fontWeight: 400 as const,
    color: "var(--color-black)",
    marginBottom: "0.75rem",
  },
  ctaText: {
    fontFamily: "var(--font-sans)",
    fontSize: "0.9rem",
    color: "var(--color-grey)",
    marginBottom: "1.5rem",
  },
  ctaButton: {
    display: "inline-block",
    fontFamily: "var(--font-sans)",
    fontSize: "0.85rem",
    fontWeight: 500 as const,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    color: "var(--color-white)",
    background: "var(--color-black)",
    padding: "1rem 2.5rem",
    textDecoration: "none",
    transition: "opacity 0.2s",
    cursor: "pointer",
  },
};

export default function ProfesionalesPage() {
  return (
    <>
      <section style={s.section}>
        <h1 style={s.sectionTitle}>Servicios para Profesionales</h1>
        <p style={s.sectionSubtitle}>
          Colaboramos con arquitectos técnicos, agencias inmobiliarias y administradores de fincas
          para ofrecer segundas opiniones técnicas de certificados energéticos.
        </p>

        <div style={s.grid}>
          {benefits.map((b, i) => (
            <div key={i} style={s.card}>
              <h3 style={s.cardTitle}>{b.title}</h3>
              <p style={s.cardText}>{b.text}</p>
            </div>
          ))}
        </div>

        <div style={s.ctaBox}>
          <h2 style={s.ctaTitle}>¿Eres profesional y quieres colaborar?</h2>
          <p style={s.ctaText}>Háblanos de tu caso y te proponemos un acuerdo adaptado.</p>
          <a href={waProfesionales} style={s.ctaButton}>Contactar ahora</a>
        </div>
      </section>
    </>
  );
}

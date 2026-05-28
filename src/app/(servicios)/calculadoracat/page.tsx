import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Eficiencia Energética | Certilab",
  description:
    "Herramienta interactiva para estimar el ahorro energético de tu vivienda. Próximamente disponible.",
  alternates: { canonical: "https://www.certilab.cat/calculadoracat/" },
};

export default function CalculadoraCatPage() {
  return (
    <section
      style={{
        padding: "7.5rem 1.5rem",
        maxWidth: "1100px",
        margin: "0 auto",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            fontWeight: 400,
            color: "var(--color-black)",
            textAlign: "center",
            marginBottom: "0.75rem",
          }}
        >
          Calculadora de Eficiencia Energética
        </h1>
        <p
          style={{
            maxWidth: "600px",
            margin: "1.5rem auto",
            fontFamily: "var(--font-sans)",
            fontSize: "1rem",
            color: "var(--color-grey)",
            lineHeight: 1.7,
          }}
        >
          Estamos desarrollando una herramienta interactiva para estimar el ahorro potencial de tu vivienda.
          Próximamente podrás calcular tu certificado energético online de forma instantánea.
        </p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--color-grey)" }}>
          Mientras tanto, puedes{" "}
          <a href="/formulario/" style={{ color: "var(--color-black)", textDecoration: "underline" }}>
            solicitar tu certificado
          </a>{" "}
          o contactarnos por{" "}
          <a href="https://wa.me/34608515922" style={{ color: "var(--color-black)", textDecoration: "underline" }}>
            WhatsApp
          </a>.
        </p>
      </div>
    </section>
  );
}

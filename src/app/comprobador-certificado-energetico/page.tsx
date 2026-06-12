import type { Metadata } from "next";
import ComprobadorEnergetico from "@/components/comprobador/ComprobadorEnergetico";

export const metadata: Metadata = {
  title: "Comprobador de coherencia energética gratuito",
  description:
    "¿Es fiable tu certificado energético? Compruébalo gratis en 10 segundos. Sube tu PDF o introduce los datos manualmente.",
  openGraph: {
    title: "Comprobador de coherencia energética gratuito",
    description:
      "¿Es fiable tu certificado energético? Compruébalo gratis en 10 segundos.",
  },
};

export default function ComprobadorPage() {
  return (
    <main>
      <section style={{ paddingTop: "2rem" }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
          <span
            style={{
              display: "inline-block",
              background: "#dbeafe",
              color: "#1e40af",
              padding: "0.35rem 0.85rem",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 600,
              marginBottom: "1rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Gratuito · Sin registro
          </span>
          <h1
            style={{
              fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: "1rem",
              color: "#111827",
            }}
          >
            ¿Es fiable tu certificado energético?
          </h1>
          <p
            style={{
              fontSize: "1.15rem",
              color: "#6b7280",
              maxWidth: 560,
              margin: "0 auto 2rem",
              lineHeight: 1.6,
            }}
          >
            Compruébalo gratis en 10 segundos. Solo necesitas tu certificado en
            PDF o los datos de tu etiqueta.
          </p>
        </div>
      </section>

      <ComprobadorEnergetico />

      <section
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "2rem 1.5rem 4rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "#f9fafb",
            borderRadius: "0.75rem",
            padding: "1.5rem",
          }}
        >
          <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.5rem", color: "#374151" }}>
            ¿Necesitas una revisión profesional?
          </h3>
          <p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "1rem" }}>
            Si eres profesional del sector inmobiliario o necesitas un análisis
            detallado de tu certificado, podemos ayudarte.
          </p>
          <a
            href="https://certilab.cat"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "#2563eb",
              color: "#fff",
              borderRadius: "0.5rem",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          >
            Solicitar revisión profesional →
          </a>
        </div>
      </section>
    </main>
  );
}
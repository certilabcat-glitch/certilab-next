import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { waUrl } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Configurar Auditoría Energética | Certilab",
  description:
    "Solicita una auditoría energética personalizada para tu vivienda. Te guiamos paso a paso.",
  alternates: { canonical: "https://www.certilab.cat/configurar-auditoria/" },
};

const waConfigurar = waUrl(
  "Hola, quiero configurar una auditoría energética para mi vivienda."
);

export default function ConfigurarAuditoriaPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Configurar Auditoría", href: "/configurar-auditoria/" },
        ]}
      />
      <section
        style={{
          padding: "7.5rem 1.5rem",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
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
          Configura tu Auditoría Energética
        </h1>
        <p
          style={{
            textAlign: "center",
            maxWidth: "500px",
            margin: "0 auto 3rem",
            fontFamily: "var(--font-sans)",
            fontSize: "1rem",
            color: "var(--color-grey)",
            lineHeight: 1.7,
          }}
        >
          Cuéntanos qué necesitas y te preparamos una propuesta sin compromiso.
        </p>

        <div
          style={{
            display: "grid",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              border: "1px solid var(--color-border)",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "0.85rem",
                color: "var(--color-grey)",
                marginBottom: "0.5rem",
                display: "block",
              }}
            >
              1
            </span>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.1rem",
                fontWeight: 400,
                color: "var(--color-black)",
                marginBottom: "0.5rem",
              }}
            >
              Datos del inmueble
            </h3>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                color: "var(--color-grey)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Dirección, tipo de vivienda, antigüedad, superficie aproximada.
            </p>
          </div>
          <div
            style={{
              border: "1px solid var(--color-border)",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "0.85rem",
                color: "var(--color-grey)",
                marginBottom: "0.5rem",
                display: "block",
              }}
            >
              2
            </span>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.1rem",
                fontWeight: 400,
                color: "var(--color-black)",
                marginBottom: "0.5rem",
              }}
            >
              Tipo de servicio
            </h3>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                color: "var(--color-grey)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              ¿Necesitas certificado, segunda opinión, check-up inmobiliario o informe técnico?
            </p>
          </div>
          <div
            style={{
              border: "1px solid var(--color-border)",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "0.85rem",
                color: "var(--color-grey)",
                marginBottom: "0.5rem",
                display: "block",
              }}
            >
              3
            </span>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.1rem",
                fontWeight: 400,
                color: "var(--color-black)",
                marginBottom: "0.5rem",
              }}
            >
              Recibe propuesta
            </h3>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                color: "var(--color-grey)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Te enviamos presupuesto y plazos en menos de 24 horas.
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              color: "var(--color-grey)",
              marginBottom: "1.5rem",
            }}
          >
            Empieza ahora por WhatsApp
          </p>
          <a
            href={waConfigurar}
            style={{
              display: "inline-block",
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--color-white)",
              background: "var(--color-black)",
              padding: "1rem 2.5rem",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            Hablar con Certilab
          </a>
        </div>
      </section>
    </>
  );
}

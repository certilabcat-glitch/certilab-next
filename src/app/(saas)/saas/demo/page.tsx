"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { trackLeadComplete } from "@/lib/meta-pixel";

type EmpresaType = "inmobiliaria" | "arquitecto" | "administrador" | "otro";

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  tipo: EmpresaType | "";
}

const errors: Record<string, string> = {};

export default function DemoPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    tipo: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.nombre.trim()) errs.nombre = "El nombre es obligatorio";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Email válido requerido";
    if (!form.telefono.trim() || !/^[+]?[\d\s()-]{7,15}$/.test(form.telefono))
      errs.telefono = "Teléfono válido requerido";
    if (!form.tipo) errs.tipo = "Selecciona tu tipo de empresa";
    Object.assign(errors, errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/saas/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al enviar");

      // Track Meta event (pixel + CAPI)
      await trackLeadComplete({
        contentName: "SaaS Demo",
        email: form.email,
        phone: form.telefono,
        value: 0,
        currency: "EUR",
        customData: { tipo_empresa: form.tipo, empresa: form.empresa },
      });

      router.push("/saas/demo/gracias");
    } catch {
      setError("Hubo un error. Inténtalo de nuevo o escríbenos por WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="demo-hero">
        <h1>Solicita tu demo gratuita</h1>
        <p className="demo-sub">
          Sin compromiso. Te explicamos cómo Certilab SaaS puede ayudarte a
          centralizar tus análisis energéticos y ofrecer un servicio diferencial
          a tus clientes.
        </p>
      </section>

      <div className="demo-layout">
        <form className="demo-form" onSubmit={handleSubmit} noValidate>
          {error && <p className="demo-error">{error}</p>}

          <label className="demo-field">
            <span>Nombre completo *</span>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              placeholder="Ej: María García"
              required
            />
            {errors.nombre && (
              <span className="demo-field-error">{errors.nombre}</span>
            )}
          </label>

          <label className="demo-field">
            <span>Email profesional *</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="maria@inmobiliaria.com"
              required
            />
            {errors.email && (
              <span className="demo-field-error">{errors.email}</span>
            )}
          </label>

          <label className="demo-field">
            <span>Teléfono *</span>
            <input
              type="tel"
              value={form.telefono}
              onChange={(e) => handleChange("telefono", e.target.value)}
              placeholder="+34 612 345 678"
              required
            />
            {errors.telefono && (
              <span className="demo-field-error">{errors.telefono}</span>
            )}
          </label>

          <label className="demo-field">
            <span>Empresa</span>
            <input
              type="text"
              value={form.empresa}
              onChange={(e) => handleChange("empresa", e.target.value)}
              placeholder="Nombre de tu agencia o despacho"
            />
          </label>

          <label className="demo-field">
            <span>Tipo de empresa *</span>
            <select
              value={form.tipo}
              onChange={(e) =>
                handleChange("tipo", e.target.value as EmpresaType)
              }
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="inmobiliaria">Agencia inmobiliaria</option>
              <option value="arquitecto">
                Arquitecto técnico / Despacho
              </option>
              <option value="administrador">
                Administrador de fincas
              </option>
              <option value="otro">Otro</option>
            </select>
            {errors.tipo && (
              <span className="demo-field-error">{errors.tipo}</span>
            )}
          </label>

          <button
            type="submit"
            className="demo-submit"
            disabled={submitting}
          >
            {submitting ? "Enviando..." : "Solicitar demo gratuita"}
          </button>

          <p className="demo-legal">
            Al enviar aceptas nuestra{" "}
            <Link href="/privacidad/">política de privacidad</Link>. Te
            contactaremos en menos de 24h.
          </p>
        </form>

        <aside className="demo-sidebar">
          <h3>¿Prefieres hablar ahora?</h3>
          <p>
            Escríbenos directamente por WhatsApp y te respondemos al
            instante.
          </p>
          <a
            href="https://wa.me/34608515922?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20Certilab%20SaaS"
            className="demo-wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp →
          </a>

          <hr className="demo-divider" />

          <h3>¿Por qué Certilab SaaS?</h3>
          <ul className="demo-benefits">
            <li>Informes periciales firmados por arquitecta técnica</li>
            <li>Primera semana gratuita</li>
            <li>Sin permanencia</li>
            <li>Análisis en 24-48h</li>
          </ul>
        </aside>
      </div>

      <style jsx>{`
        .demo-hero {
          text-align: center;
          padding: 5rem 1.5rem 3rem;
          max-width: 700px;
          margin: 0 auto;
        }
        .demo-hero h1 {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 300;
          color: var(--color-black);
          margin-bottom: 1rem;
        }
        .demo-sub {
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--color-grey);
          line-height: 1.7;
        }
        .demo-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 3rem;
          max-width: 960px;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
          align-items: start;
        }
        .demo-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .demo-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          padding: 0.75rem 1rem;
        }
        .demo-field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .demo-field > span {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-black);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .demo-field input,
        .demo-field select {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          padding: 0.75rem 1rem;
          border: 1px solid var(--color-border);
          color: var(--color-black);
          background: #fff;
          transition: border-color 0.2s;
        }
        .demo-field input:focus,
        .demo-field select:focus {
          outline: none;
          border-color: var(--color-black);
        }
        .demo-field-error {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: #b91c1c;
        }
        .demo-submit {
          background: var(--color-black);
          color: var(--color-crema);
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.9rem 2rem;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .demo-submit:hover:not(:disabled) {
          opacity: 0.85;
        }
        .demo-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .demo-legal {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--color-grey);
          line-height: 1.6;
        }
        .demo-legal a {
          color: var(--color-terra);
          text-decoration: underline;
        }
        .demo-sidebar {
          border: 1px solid var(--color-border);
          padding: 2rem;
        }
        .demo-sidebar h3 {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 0.75rem;
        }
        .demo-sidebar p {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        .demo-wa {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-terra);
          text-decoration: underline;
        }
        .demo-divider {
          border: none;
          border-top: 1px solid var(--color-border);
          margin: 1.5rem 0;
        }
        .demo-benefits {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .demo-benefits li {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-dark);
          padding: 0.4rem 0;
          padding-left: 1.2rem;
          position: relative;
        }
        .demo-benefits li::before {
          content: "→";
          position: absolute;
          left: 0;
          color: var(--color-terra);
        }
        @media (max-width: 768px) {
          .demo-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Schema.org Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Certilab SaaS Demo",
            provider: {
              "@type": "Organization",
              name: "Certilab",
              url: "https://www.certilab.cat",
            },
            areaServed: { "@type": "Country", name: "ES" },
            audience: {
              "@type": "Audience",
              audienceType: "RealEstateAgent Architect PropertyManager",
            },
          }),
        }}
      />
    </>
  );
}
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { trackLeadComplete } from "@/lib/meta-pixel";
import styles from "./demo.module.css";

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
      <section className={styles.hero}>
        <h1>Solicita tu demo gratuita</h1>
        <p className={styles.sub}>
          Sin compromiso. Te explicamos cómo Certilab SaaS puede ayudarte a
          centralizar tus análisis energéticos y ofrecer un servicio diferencial
          a tus clientes.
        </p>
      </section>

      <div className={styles.layout}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {error && <p className={styles.error}>{error}</p>}

          <label className={styles.field}>
            <span>Nombre completo *</span>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              placeholder="Ej: María García"
              required
            />
            {errors.nombre && (
              <span className={styles.fieldError}>{errors.nombre}</span>
            )}
          </label>

          <label className={styles.field}>
            <span>Email profesional *</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="maria@inmobiliaria.com"
              required
            />
            {errors.email && (
              <span className={styles.fieldError}>{errors.email}</span>
            )}
          </label>

          <label className={styles.field}>
            <span>Teléfono *</span>
            <input
              type="tel"
              value={form.telefono}
              onChange={(e) => handleChange("telefono", e.target.value)}
              placeholder="+34 612 345 678"
              required
            />
            {errors.telefono && (
              <span className={styles.fieldError}>{errors.telefono}</span>
            )}
          </label>

          <label className={styles.field}>
            <span>Empresa</span>
            <input
              type="text"
              value={form.empresa}
              onChange={(e) => handleChange("empresa", e.target.value)}
              placeholder="Nombre de tu agencia o despacho"
            />
          </label>

          <label className={styles.field}>
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
              <span className={styles.fieldError}>{errors.tipo}</span>
            )}
          </label>

          <button
            type="submit"
            className={styles.submit}
            disabled={submitting}
          >
            {submitting ? "Enviando..." : "Solicitar demo gratuita"}
          </button>

          <p className={styles.legal}>
            Al enviar aceptas nuestra{" "}
            <Link href="/privacidad/">política de privacidad</Link>. Te
            contactaremos en menos de 24h.
          </p>
        </form>

        <aside className={styles.sidebar}>
          <h3>¿Prefieres hablar ahora?</h3>
          <p>
            Escríbenos directamente por WhatsApp y te respondemos al
            instante.
          </p>
          <a
            href="https://wa.me/34608515922?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20Certilab%20SaaS"
            className={styles.wa}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp →
          </a>

          <hr className={styles.divider} />

          <h3>¿Por qué Certilab SaaS?</h3>
          <ul className={styles.benefits}>
            <li>Informes periciales firmados por arquitecta técnica</li>
            <li>Primera semana gratuita</li>
            <li>Sin permanencia</li>
            <li>Análisis en 24-48h</li>
          </ul>
        </aside>
      </div>


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
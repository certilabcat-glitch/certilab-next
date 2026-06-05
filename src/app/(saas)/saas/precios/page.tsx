"use client";

import Link from "next/link";
import { waSaas } from "@/lib/wa";
import styles from "./page.module.css";

const plans = [
  {
    name: "Starter",
    price: "29",
    period: "/mes",
    desc: "Para autónomos y agentes individuales",
    features: [
      "10 análisis/mes",
      "Informes PDF firmados",
      "Soporte por WhatsApp",
      "Historial de expedientes",
    ],
    cta: "Empezar prueba gratis",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "79",
    period: "/mes",
    desc: "Para agencias pequeñas (2-5 agentes)",
    features: [
      "50 análisis/mes",
      "Todo lo de Starter",
      "Panel de equipo",
      "API de integración",
      "Informes personalizados",
    ],
    cta: "Empezar prueba gratis",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: null,
    period: null,
    desc: "Para grandes volúmenes",
    features: [
      "Análisis ilimitados",
      "Todo lo de Professional",
      "API dedicada",
      "Gestión de usuarios",
      "Soporte prioritario 24/7",
    ],
    cta: "Contactar",
    highlighted: false,
  },
];

export default function PreciosPage() {
  return (
    <>
      <header className={styles.hero}>
        <h1>Planes para cada profesional</h1>
        <p className={styles.sub}>
          Elige el plan que mejor se adapte a tu volumen de trabajo. Todos
          incluyen primera semana gratis.
        </p>
      </header>

      <div className={styles.grid}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`${styles.card} ${plan.highlighted ? styles.featured : ""}`}
          >
            {plan.highlighted && <span className={styles.badge}>Más solicitado</span>}
            <h2 className={styles.name}>{plan.name}</h2>
            <p className={styles.desc}>{plan.desc}</p>
            <p className={styles.price}>
              {plan.price ? (
                <>
                  {plan.price}
                  <span className={styles.currency}>€</span>
                  <span className={styles.period}>{plan.period}</span>
                </>
              ) : (
                <span className={styles.custom}>Personalizado</span>
              )}
            </p>
            <ul className={styles.features}>
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link
              href={waSaas(plan.name)}
              className={`${styles.cta} ${plan.highlighted ? styles.btnPrimary : styles.btnSecondary}`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.faq}>
        <h3>¿Preguntas sobre precios?</h3>
        <p>
          Escríbenos por WhatsApp y te explicamos qué plan se ajusta mejor a tu
          caso.
        </p>
        <Link href={waSaas()} className={styles.faqContact}>
          Hablar con el equipo →
        </Link>
      </div>
    </>
  );
}
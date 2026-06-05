"use client";
import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
  const steps = [
    {
      title: "Cuéntanos tu caso",
      text: "Rellena el formulario o empieza con el Diagnóstico Express gratuito. En 5 minutos sabemos qué necesitas.",
    },
    {
      title: "Enviamos documentación",
      text: "Nos mandas el certificado energético existente, fotos o documentos según el servicio. Sin desplazamientos.",
    },
    {
      title: "Analizamos con rigor",
      text: "El equipo técnico revisa personalmente cada caso. No hay automatismos ni plantillas genéricas.",
    },
    {
      title: "Recibes tu informe",
      text: "PDF técnico detallado con conclusiones claras, riesgos identificados y próximos pasos.",
    },
  ];

  return (
    <section className="section" aria-labelledby="como-title">
      <h2 className="section-title" id="como-title">
        Cómo funciona
      </h2>
      <p className="section-sub">
        Todo 100% remoto. Sin visitas, sin esperas, sin burocracia innecesaria.
      </p>
      <div className={styles.pasosGrid}>
        {steps.map((step, i) => (
          <div key={i} className={styles.paso}>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

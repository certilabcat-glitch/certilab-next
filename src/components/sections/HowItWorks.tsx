"use client";

"use client";

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
      text: "Eva revisa personalmente cada caso. No hay automatismos ni plantillas genéricas.",
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
      <div className="pasos-grid">
        {steps.map((step, i) => (
          <div key={i} className="paso">
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .section {
          padding: 7.5rem 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .section-title {
          font-family: var(--font-serif);
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 400;
          color: var(--color-black);
          text-align: center;
          margin-bottom: 0.75rem;
        }
        .section-sub {
          text-align: center;
          font-family: var(--font-sans);
          font-size: 1.05rem;
          color: var(--color-grey);
          max-width: 550px;
          margin: 0 auto 3rem;
          line-height: 1.7;
        }
        .pasos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          counter-reset: paso;
        }
        .paso {
          text-align: center;
          counter-increment: paso;
        }
        .paso::before {
          content: counter(paso);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          font-family: var(--font-serif);
          font-size: 1rem;
          color: var(--color-grey);
          margin: 0 auto 1rem;
          border: 1px solid var(--color-border);
        }
        .paso h3 {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 0.4rem;
        }
        .paso p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          line-height: 1.6;
          margin: 0;
        }
        @media (max-width: 767px) {
          .section {
            padding: 5rem 1.5rem;
          }
          .pasos-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 768px) {
          .pasos-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </section>
  );
}

"use client";

import LandingLeadForm from "@/components/forms/LandingLeadForm";

export default function GuiaDetectaFalsoCE() {
  return (
    <>
      <header className="hero hero--landing">
        <p className="hero-eyebrow">
          Guía gratuita · Arquitecta Técnica Cateb 9457
        </p>
        <h1>
          Guía para Detectar
          <br />
          <span className="hero-light">un Certificado Energético Falso</span>
        </h1>
        <p className="hero-sub">
          ¿Desconfías de tu certificado energético? Cada año se emiten miles de
          certificados con irregularidades. Esta guía te enseña a identificar
          las 5 señales de alerta más comunes en 10 minutos, sin conocimientos
          técnicos.
        </p>
        <ul className="hero-benefits">
          <li>✅ 5 pasos para detectar un certificado falso o mal hecho</li>
          <li>✅ Diferencias entre errores inocentes y fraudes reales</li>
          <li>✅ Qué hacer si has comprado una vivienda con certificado fraudulento</li>
          <li>✅ Plantilla de reclamación para exigir una rectificación</li>
        </ul>
      </header>

      <LandingLeadForm
        leadMagnet="guia-detecta-falso-ce"
        utmCampaign="guia-falso-ce"
      />

      <section className="landing-preview">
        <h2>Qué incluye la guía</h2>
        <div className="preview-grid">
          <div className="preview-card">
            <span className="preview-num">1</span>
            <h3>Identifica al técnico</h3>
            <p>
              Cómo verificar si el técnico que firmó el certificado está
              colegiado y habilitado para certificar en tu comunidad autónoma.
            </p>
          </div>
          <div className="preview-card">
            <span className="preview-num">2</span>
            <h3>Comprueba los datos del inmueble</h3>
            <p>
              Errores en dirección, superficie o año de construcción son la
              bandera roja más frecuente en certificados falsificados.
            </p>
          </div>
          <div className="preview-card">
            <span className="preview-num">3</span>
            <h3>Analiza la calificación</h3>
            <p>
              Una A o B en una vivienda sin reformas es sospechosa. Te
              explicamos qué calificaciones son realistas según el tipo de
              inmueble.
            </p>
          </div>
          <div className="preview-card">
            <span className="preview-num">4</span>
            <h3>Detecta mejoras irreales</h3>
            <p>
              Paneles solares, calderas de biomasa o aislamientos que no
              existen en tu vivienda: cómo identificarlos en la documentación.
            </p>
          </div>
          <div className="preview-card">
            <span className="preview-num">5</span>
            <h3>Actúa y reclama</h3>
            <p>
              Pasos concretos para denunciar un certificado fraudulento ante
              el colegio profesional y el organismo competente de tu región.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-faq">
        <h2>Preguntas frecuentes</h2>
        <div className="faq-item">
          <h3>¿La guía tiene coste?</h3>
          <p>
            No, es completamente gratuita. Solo necesitas tu email para que te
            la enviemos.
          </p>
        </div>
        <div className="faq-item">
          <h3>¿Válida para toda España?</h3>
          <p>
            Sí, los 5 pasos aplican a cualquier comunidad autónoma. Incluye
            referencias a los registros oficiales de cada región.
          </p>
        </div>
        <div className="faq-item">
          <h3>¿Recibiré más correos?</h3>
          <p>
            Solo te enviaremos la guía y, si nos das permiso, algún contenido
            útil sobre certificación energética. Puedes darte de baja en un
            clic.
          </p>
        </div>
      </section>

      <style jsx>{`
        .hero--landing {
          text-align: center;
          padding: 4rem 1.5rem 2rem;
          background: var(--color-crema);
          max-width: 700px;
          margin: 0 auto;
        }
        .hero-eyebrow {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-terra);
          margin-bottom: 1.5rem;
        }
        .hero h1 {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 5vw, 2.75rem);
          font-weight: 300;
          color: var(--color-black);
          line-height: 1.15;
          margin-bottom: 1.25rem;
        }
        .hero-light {
          font-family: var(--font-sans);
          font-weight: 300;
          font-size: clamp(1.6rem, 4vw, 2.5rem);
        }
        .hero-sub {
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--color-grey);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .hero-benefits {
          list-style: none;
          padding: 0;
          margin: 0 auto 0.5rem;
          max-width: 440px;
          text-align: left;
        }
        .hero-benefits li {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-dark);
          line-height: 1.7;
          margin-bottom: 0.25rem;
        }

        .landing-preview {
          max-width: 700px;
          margin: 0 auto;
          padding: 3rem 1.5rem;
        }
        .landing-preview h2 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--color-black);
          text-align: center;
          margin-bottom: 2rem;
        }
        .preview-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .preview-card {
          border: 1px solid var(--color-border);
          padding: 1.5rem;
          border-radius: 0.75rem;
        }
        .preview-num {
          display: inline-block;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--color-terra);
          color: white;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          line-height: 28px;
          text-align: center;
          margin-bottom: 0.5rem;
        }
        .preview-card h3 {
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-black);
          margin-bottom: 0.5rem;
        }
        .preview-card p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          line-height: 1.6;
          margin: 0;
        }

        .landing-faq {
          max-width: 700px;
          margin: 0 auto;
          padding: 0 1.5rem 4rem;
        }
        .landing-faq h2 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--color-black);
          text-align: center;
          margin-bottom: 2rem;
        }
        .faq-item {
          margin-bottom: 1.5rem;
        }
        .faq-item h3 {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-black);
          margin-bottom: 0.3rem;
        }
        .faq-item p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          line-height: 1.6;
          margin: 0;
        }
      `}</style>
    </>
  );
}
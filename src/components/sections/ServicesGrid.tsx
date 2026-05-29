"use client";
import Link from "next/link";
import { services } from "@/data/services";

export default function ServicesGrid() {
  return (
    <section className="servicios-section" aria-labelledby="servicios-title">
      <div className="servicios-header">
        <h2 className="section-title" id="servicios-title">
          Nuestros servicios
        </h2>
        <p className="section-sub">
          Cinco servicios diseñados para distintas necesidades. Sin letra
          pequeña, sin sorpresas.
        </p>
      </div>
      <div className="servicios-grid">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={service.href}
            className={`servicio-card ${service.destacado ? "destacado" : ""}`}
          >
            <div className="servicio-card-inner">
              <div className="servicio-card-top">
                <p className="servicio-badge">{service.badge}</p>
                <h3>{service.title}</h3>
              </div>
              <p className="servicio-desc">{service.description}</p>
              <div className="servicio-card-footer">
                <span className="servicio-precio">
                  {service.price === 0
                    ? "Gratuito"
                    : `Tarifa: ${service.price} €`}
                </span>
                <span className="card-link">Ver detalles →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .servicios-section {
          background: var(--color-crema);
          padding: 7.5rem 1.5rem;
          border-top: 1px solid var(--color-border);
        }
        .servicios-header {
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
        .servicios-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .servicio-card {
          display: block;
          text-decoration: none;
          color: inherit;
          background: #fff;
          border-radius: 12px;
          box-shadow: var(--shadow-card);
          border: 1px solid var(--color-border);
          transition: all 0.3s ease;
        }
        .servicio-card:hover {
          box-shadow: var(--shadow-card-hover);
          transform: translateY(-2px);
        }
        .servicio-card.destacado {
          border: 2px solid var(--color-black);
          box-shadow: 0 4px 16px rgba(139,111,71,0.12), 0 1px 3px rgba(139,111,71,0.06);
        }
        .servicio-card.destacado:hover {
          box-shadow: 0 12px 32px rgba(139,111,71,0.16), 0 4px 8px rgba(139,111,71,0.08);
        }
        .servicio-card-inner {
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .servicio-card-top {
          margin-bottom: 1rem;
        }
        .servicio-badge {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-terra);
          font-weight: 600;
          margin-bottom: 0.75rem;
          display: inline-block;
          background: rgba(196, 168, 130, 0.15);
          padding: 0.2rem 0.75rem;
          border-radius: 4px;
        }
        .servicio-card h3 {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 500;
          color: var(--color-black);
          line-height: 1.35;
          transition: color 0.2s;
        }
        .servicio-card:hover h3 {
          color: var(--color-terra);
        }
        .servicio-desc {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-grey);
          line-height: 1.65;
          flex: 1;
          margin-bottom: 1.5rem;
        }
        .servicio-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid var(--color-border);
        }
        .servicio-precio {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-black);
        }
        .card-link {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-terra);
          transition: gap 0.2s;
        }
        .servicio-card:hover .card-link {
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        @media (max-width: 767px) {
          .servicios-section {
            padding: 5rem 1.5rem;
          }
          .servicios-grid {
            grid-template-columns: 1fr;
          }
          .servicio-card-inner {
            padding: 1.75rem 1.5rem;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .servicios-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .servicios-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  );
}

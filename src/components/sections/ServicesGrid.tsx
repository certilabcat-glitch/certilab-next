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
            <p className="servicio-badge">{service.badge}</p>
            <h3>{service.title}</h3>
            <p className="servicio-precio">
              {service.price === 0
                ? "Gratuito"
                : `Tarifa: ${service.price} €`}
            </p>
            <p>{service.description}</p>
            <span className="card-link">Ver detalles</span>
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
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .servicio-card {
          border: 1px solid var(--color-border);
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          transition: opacity 0.2s;
          text-decoration: none;
          color: inherit;
        }
        .servicio-card:hover {
          opacity: 0.85;
        }
        .servicio-card.destacado {
          border: 2px solid var(--color-black);
        }
        .servicio-badge {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-grey);
          margin-bottom: 0.75rem;
        }
        .servicio-card h3 {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 0.5rem;
        }
        .servicio-precio {
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-black);
          margin-bottom: 1rem;
        }
        .servicio-card p {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-grey);
          line-height: 1.6;
          flex: 1;
          margin-bottom: 1.5rem;
        }
        .card-link {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-black);
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 400;
        }
        @media (max-width: 767px) {
          .servicios-section {
            padding: 5rem 1.5rem;
          }
          .servicios-grid {
            grid-template-columns: 1fr;
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

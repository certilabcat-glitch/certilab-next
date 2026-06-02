"use client";

"use client";

import Link from "next/link";
import { footerLegal } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-brand">
          <p>
            <strong>Certilab</strong> · Despacho de Auditoría Energética
            <br />
            Eva María González García · Arquitecta Técnica colegiada · Colegio de Arquitectos Técnicos de Barcelona
          </p>
          <div className="footer-contacto">
            <a href="mailto:info@certilab.cat">info@certilab.cat</a>
          </div>
        </div>

        <nav className="footer-servicios" aria-label="Servicios">
          <h4>Servicios</h4>
          <Link href="/segunda-opinion/">Segunda Opinión (39€)</Link>
          <Link href="/segunda-opinion-express/">Express (79€)</Link>
          <Link href="/check-up-inmobiliario/">Check-Up Inmobiliario (199€)</Link>
          <Link href="/informe-tecnico-energetico/">Informe Técnico (399€)</Link>
        </nav>

        <nav className="footer-legal" aria-label="Legal">
          <h4>Legal</h4>
          {footerLegal.map((item) => (
            <Link key={item.label} href={item.href}>{item.label}</Link>
          ))}
        </nav>
      </div>

      <p className="footer-copy">
        © 2026 Certilab · Todos los derechos reservados
      </p>

      <style jsx>{`
        .footer {
          border-top: 1px solid var(--color-border);
          padding: 4rem 1.5rem 2rem;
          background: var(--color-crema);
        }
        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 2rem;
        }
        .footer-brand p {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--color-grey);
          margin: 0;
          line-height: 1.5;
        }
        .footer-brand .footer-contacto {
          display: flex;
          gap: 1rem;
          margin-top: 0.75rem;
        }
        .footer-brand .footer-contacto a {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-terra);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .footer-servicios h4,
        .footer-legal h4 {
          font-family: var(--font-serif);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-black);
          margin-bottom: 1rem;
        }
        .footer-servicios,
        .footer-legal {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .footer-servicios a,
        .footer-legal a {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .footer-servicios a:hover,
        .footer-legal a:hover {
          opacity: 0.6;
        }
        .footer-legal {
          text-align: left;
        }
        .footer-copy {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--color-grey);
          text-align: center;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid var(--color-border);
        }
        .footer-copy a {
          color: var(--color-grey);
          text-decoration: underline;
        }

        @media (max-width: 767px) {
          .footer-inner {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .footer-legal {
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}

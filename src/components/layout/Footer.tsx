"use client";

"use client";

import Link from "next/link";
import { footerServices, footerLegal } from "@/data/navigation";

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
        </div>

        <nav className="footer-nav" aria-label="Navegación pie de página">
          <ul>
            {footerServices.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-legal" aria-label="Páginas legales">
          <ul>
            {footerLegal.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="footer-copy">
        © 2026 Certilab · Todos los derechos reservados ·
        <Link href="/por-que-no-emite-ce/">
          No emitimos certificados energéticos oficiales
        </Link>
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
          grid-template-columns: 1fr 2fr 1fr;
          gap: 2rem;
        }
        .footer-brand p {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--color-grey);
          margin: 0;
          line-height: 1.5;
        }
        .footer-nav ul,
        .footer-legal ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin: 0;
          padding: 0;
        }
        .footer-nav a,
        .footer-legal a {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .footer-nav a:hover,
        .footer-legal a:hover {
          opacity: 0.6;
        }
        .footer-legal {
          text-align: right;
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

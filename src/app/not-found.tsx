import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Página no encontrada | Certilab",
  description:
    "La página que buscas no existe o ha sido movida. Vuelve al inicio para encontrar lo que necesitas.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p className="not-found-sub">Página no encontrada</p>
      <p>La página que buscas no existe o ha sido movida.</p>
      <Link href="/" className="btn-primary">
        Volver al inicio
      </Link>

      <style jsx>{`
        .not-found {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          text-align: center;
          padding: 2rem;
        }
        h1 {
          font-family: var(--font-serif);
          font-size: 8rem;
          font-weight: 300;
          color: var(--color-terra-light);
          line-height: 1;
          margin-bottom: 0;
        }
        .not-found-sub {
          font-family: var(--font-sans);
          font-size: 1.5rem;
          color: var(--color-black);
          margin-bottom: 0.5rem;
        }
        p {
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--color-grey);
          margin-bottom: 2rem;
        }
        .btn-primary {
          display: inline-block;
          background: var(--color-black);
          color: var(--color-crema);
          padding: 0.75rem 2rem;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .btn-primary:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}
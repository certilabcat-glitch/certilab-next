import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Página no encontrada | Certilab",
  description: "La página que buscas no existe o ha sido movida. Vuelve al inicio de Certilab.",
};

export default function NotFound() {
  return (
    <div className="not-found-page">
      <h1 className="not-found-page__code">404</h1>
      <p className="not-found-page__subtitle">Página no encontrada</p>
      <p className="not-found-page__text">
        La página que buscas no existe o ha sido movida.
      </p>
      <Link href="/" className="not-found-page__link">
        Volver al inicio
      </Link>
    </div>
  );
}
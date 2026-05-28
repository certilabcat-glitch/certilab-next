import type { Metadata } from "next";
import Link from "next/link";
import "./saas.css";

export const metadata: Metadata = {
  title: {
    default: "Certilab SaaS | Análisis Energético para Profesionales",
    template: "%s | Certilab SaaS",
  },
  description:
    "La plataforma SaaS para agencias inmobiliarias y arquitectos técnicos. Centraliza tus análisis energéticos, sube expedientes en lote y ofrece informes profesionales a tus clientes.",
  metadataBase: new URL("https://www.certilab.cat"),
  alternates: {
    canonical: "/saas/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Certilab SaaS",
    title: "Certilab SaaS | Análisis Energético para Profesionales",
    description:
      "La plataforma SaaS para agencias inmobiliarias y arquitectos técnicos. Centraliza tus análisis energéticos.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SaasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="saas-nav" role="navigation" aria-label="Navegación SaaS">
        <div className="saas-nav-inner">
          <Link href="/saas/" className="saas-logo">
            <span className="saas-logo-certilab">Certilab</span>
            <span className="saas-logo-saas">SaaS</span>
          </Link>

          <div className="saas-nav-links">
            <Link href="/saas/precios/" className="saas-nav-link">
              Precios
            </Link>
            <Link href="/saas/login/" className="saas-nav-link">
              Iniciar sesión
            </Link>
            <Link href="/saas/register/" className="saas-nav-cta">
              Empieza gratis
            </Link>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="saas-footer">
        <div className="saas-footer-inner">
          <div className="saas-footer-col">
            <h4>Certilab SaaS</h4>
            <p>
              Análisis energético forense para profesionales del sector
              inmobiliario.
            </p>
          </div>
          <div className="saas-footer-col">
            <h4>Enlaces</h4>
            <Link href="/saas/precios/">Precios</Link>
            <Link href="/privacidad/">Privacidad</Link>
            <Link href="/aviso-legal/">Aviso legal</Link>
          </div>
          <div className="saas-footer-col">
            <h4>Contacto</h4>
            <a href="https://wa.me/34608515922">WhatsApp</a>
            <a href="mailto:info@certilab.cat">info@certilab.cat</a>
          </div>
        </div>
        <div className="saas-footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Certilab. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </>
  );
}

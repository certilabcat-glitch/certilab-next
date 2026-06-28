import type { Metadata } from "next";
import { Crimson_Pro, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import { COMPANY, RESPONSABLE, CONTACTO, UBICACION, REDES_SOCIALES, HORARIO } from "@/config";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/layout/CookieConsent";
import StickyCTA from "@/components/layout/StickyCTA";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const crimson = Crimson_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Certilab | Arquitectura Técnica Forense · Consultoría Energética",
    template: "%s | Certilab",
  },
  description:
    "Consultoría energética forense en España. Análisis técnico con responsabilidad profesional Cateb 9457. Sin algoritmos opacos. Sin comerciales disfrazados de técnicos.",
  metadataBase: new URL("https://www.certilab.cat"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Certilab",
    url: "https://www.certilab.cat/",
    title: "Certilab | Arquitectura Técnica Forense · Consultoría Energética",
    description:
      "Consultoría energética forense en España. Análisis técnico con responsabilidad profesional Cateb 9457.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Certilab | Arquitectura Técnica Forense",
    description:
      "Análisis técnico independiente con responsabilidad profesional real.",
    images: ["/og-image.jpg"],
  },
  other: {
    "fb:app_id": "1271893388238243",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${crimson.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <meta
          name="google-site-verification"
          content="vbxqc3rtusTH9zjcV54qo7HI9PV9D2exiFZ4VjhDyv4"
        />
        {/* Hreflang self-referencing (monolingual site) */}
        <link rel="alternate" href="https://www.certilab.cat/" hrefLang="es" />
        <link rel="alternate" href="https://www.certilab.cat/" hrefLang="x-default" />

        {/* Schema.org ProfessionalService + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ProfessionalService",
                  "@id": "https://www.certilab.cat/#organization",
                  name: "Certilab",
                  url: "https://www.certilab.cat/",
                  logo: "https://www.certilab.cat/favicon.png",
                  description:
                    "Consultoría energética forense 100% online y remota. Análisis técnico independiente con responsabilidad profesional Cateb 9457.",
                  founder: {
                    "@type": "Person",
                    "@id": "https://www.certilab.cat/#person",
                    name: "Eva María González García",
                    jobTitle: "Arquitecta Técnica",
                    description: "Arquitecta Técnica especializada en análisis forense de certificados energéticos y consultoría energética. Colegiada CATEB 9457 con seguro de responsabilidad civil.",
                    memberOf: {
                      "@type": "Organization",
                      name: "Cateb",
                      identifier: "9457",
                    },
                    worksFor: {
                      "@type": "Organization",
                      "@id": "https://www.certilab.cat/#organization",
                      name: "Certilab",
                    },
                  },
                  areaServed: {
                    "@type": "Country",
                    name: "España",
                  },
                  serviceType: [
                    "Segunda Opinión Certificado Energético",
                    "Check-Up Inmobiliario",
                    "Informe Técnico Energético",
                  ],
                  priceRange: "0€ – 399€",
                  telephone: "+34 722 437 675",
                  email: "info@certilab.cat",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "ES",
                    addressRegion: "Cataluña",
                  },
                  sameAs: [
                    "https://www.linkedin.com/company/certilab",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.certilab.cat/#website",
                  url: "https://www.certilab.cat/",
                  name: "Certilab",
                  publisher: { "@id": "https://www.certilab.cat/#organization" },
                  inLanguage: "es",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <StickyCTA />
        <Analytics />
      </body>
    </html>
  );
}

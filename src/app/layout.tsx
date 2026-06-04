import type { Metadata } from "next";
import { Crimson_Pro, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
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
                    "Consultoría energética forense. Análisis técnico con responsabilidad profesional Cateb 9457. Segunda opinión, Check-Up inmobiliario e Informe Técnico Energético.",
                  founder: {
                    "@type": "Person",
                    name: "Eva María González García",
                    jobTitle: "Arquitecta Técnica",
                    memberOf: {
                      "@type": "Organization",
                      name: "Cateb",
                      identifier: "9457",
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
                    "Diagnóstico Express Energético",
                  ],
                  priceRange: "0€ – 399€",
                  address: {
                    "@type": "PostalAddress",
                    addressRegion: "Cataluña",
                    addressCountry: "ES",
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
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}

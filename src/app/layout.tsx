import type { Metadata } from "next";
import { Crimson_Pro, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
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
      "Análisis técnico con responsabilidad profesional Cateb 9457. Sin algoritmos. Rigor forense real.",
    images: ["/og-image.jpg"],
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
        {/* Schema.org ProfessionalService + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ProfessionalService",
                  "@id": "https://certilab.cat/#organization",
                  name: "Certilab",
                  url: "https://certilab.cat/",
                  logo: "https://certilab.cat/favicon.png",
                  description:
                    "Consultoría energética forense. Análisis técnico con responsabilidad profesional Cateb 9457. Segunda opinión, Check-Up inmobiliario e Informe Técnico Energético.",
                  founder: {
                    "@type": "Person",
                    name: "Eva María González Gracia",
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
                },
                {
                  "@type": "WebSite",
                  "@id": "https://certilab.cat/#website",
                  url: "https://certilab.cat/",
                  name: "Certilab",
                  publisher: { "@id": "https://certilab.cat/#organization" },
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
      </body>
    </html>
  );
}

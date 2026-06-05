import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' https://connect.facebook.net https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.facebook.com https://*.googleapis.com; connect-src 'self' https://api.certilab.cat https://n8n.certilab.cat; frame-src 'self' https://www.facebook.com; font-src 'self' https://fonts.gstatic.com;",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // URLs .html legacy → nuevas rutas
      {
        source: "/privacidad.html",
        destination: "/privacidad",
        permanent: true,
      },
      { source: "/cookies.html", destination: "/cookies", permanent: true },
      {
        source: "/legal.html",
        destination: "/aviso-legal",
        permanent: true,
      },
      // Redirigir guía certificados falsos al blog
      {
        source: "/por-que-no-emite-ce",
        destination: "/blog/detectar-certificado-energetico-falso",
        permanent: true,
      },
      // Diagnóstico exprés (sinónimo de segunda-opinion-express)
      {
        source: "/diagnostico-express-energetico",
        destination: "/segunda-opinion-express",
        permanent: true,
      },
      // URLs legacy del plan de migración EasyPanel
      {
        source: "/auditoria-energetica-online",
        destination: "/informe-tecnico-energetico",
        permanent: true,
      },
      {
        source: "/fondos-next-generation-2026",
        destination: "/ayudas-eficiencia-energetica",
        permanent: true,
      },
      {
        source: "/certificadoenergeticoinflado",
        destination: "/segunda-opinion",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
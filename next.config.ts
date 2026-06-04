import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

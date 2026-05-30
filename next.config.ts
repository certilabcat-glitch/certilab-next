import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
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
    ];
  },
};

export default nextConfig;

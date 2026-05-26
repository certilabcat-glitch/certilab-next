import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;
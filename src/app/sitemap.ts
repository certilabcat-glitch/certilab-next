import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.certilab.cat";

  const routes = [
    { path: "", priority: 1.0, freq: "weekly" as const },
    { path: "/segunda-opinion", priority: 0.9, freq: "monthly" as const },
    { path: "/segunda-opinion-express", priority: 0.9, freq: "monthly" as const },
    { path: "/check-up-inmobiliario", priority: 0.8, freq: "monthly" as const },
    { path: "/informe-tecnico-energetico", priority: 0.8, freq: "monthly" as const },
    { path: "/diagnostico-express", priority: 0.9, freq: "monthly" as const },
    { path: "/por-que-no-emite-ce", priority: 0.8, freq: "monthly" as const },
    { path: "/blog", priority: 0.7, freq: "weekly" as const },
    { path: "/sobre-nosotros", priority: 0.7, freq: "monthly" as const },
    { path: "/calculadoracat", priority: 0.6, freq: "monthly" as const },
    { path: "/formulario", priority: 0.9, freq: "monthly" as const },
    { path: "/ayudas-eficiencia-energetica", priority: 0.7, freq: "monthly" as const },
    { path: "/profesionales", priority: 0.6, freq: "monthly" as const },
    { path: "/privacidad", priority: 0.3, freq: "yearly" as const },
    { path: "/cookies", priority: 0.3, freq: "yearly" as const },
    { path: "/aviso-legal", priority: 0.3, freq: "yearly" as const },
    { path: "/resultado-auditoria", priority: 0.5, freq: "monthly" as const },
    { path: "/configurar-auditoria", priority: 0.5, freq: "monthly" as const },
    { path: "/gracias", priority: 0.4, freq: "monthly" as const },
    {
      path: "/buscador-certificado-energetico-catalunya",
      priority: 0.5,
      freq: "monthly" as const,
    },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.freq,
    priority: route.priority,
  }));
}

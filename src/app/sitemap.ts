import { MetadataRoute } from "next";
import { articles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.certilab.cat";

  const routes = [
    // Core pages
    { path: "", priority: 1.0, freq: "weekly" as const },

    // Services (via route group)
    { path: "/segunda-opinion", priority: 0.9, freq: "monthly" as const },
    { path: "/segunda-opinion-express", priority: 0.9, freq: "monthly" as const },
    { path: "/check-up-inmobiliario", priority: 0.8, freq: "monthly" as const },
    { path: "/informe-tecnico-energetico", priority: 0.8, freq: "monthly" as const },
    { path: "/ayudas-eficiencia-energetica", priority: 0.8, freq: "monthly" as const },
    { path: "/profesionales", priority: 0.7, freq: "monthly" as const },
    { path: "/calculadoracat", priority: 0.7, freq: "monthly" as const },
    { path: "/configurar-auditoria", priority: 0.7, freq: "monthly" as const },

    // Formulario contacto
    { path: "/formulario", priority: 0.5, freq: "monthly" as const },

    // Secondary search tools
    { path: "/buscador-certificado-energetico-catalunya", priority: 0.5, freq: "monthly" as const },
    { path: "/cercador-certificats-energetics", priority: 0.5, freq: "monthly" as const },

    // Content
    { path: "/blog", priority: 0.7, freq: "weekly" as const },
    { path: "/sobre-nosotros", priority: 0.7, freq: "monthly" as const },
    { path: "/landing/guia-errores-ce", priority: 0.6, freq: "monthly" as const },
    { path: "/landing/guia-detecta-falso-ce", priority: 0.6, freq: "monthly" as const },

    // Result / Gracias pages
    { path: "/gracias", priority: 0.3, freq: "yearly" as const },
    { path: "/resultado-auditoria", priority: 0.3, freq: "yearly" as const },

    // SaaS
    { path: "/saas", priority: 0.7, freq: "monthly" as const },
    { path: "/saas/demo", priority: 0.5, freq: "monthly" as const },
    { path: "/saas/login", priority: 0.5, freq: "monthly" as const },
    { path: "/saas/precios", priority: 0.8, freq: "monthly" as const },
    { path: "/saas/register", priority: 0.5, freq: "monthly" as const },

    // Legal
    { path: "/privacidad", priority: 0.3, freq: "yearly" as const },
    { path: "/cookies", priority: 0.3, freq: "yearly" as const },
    { path: "/aviso-legal", priority: 0.3, freq: "yearly" as const },
  ];

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.freq,
    priority: route.priority,
  }));

  const blogRoutes = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
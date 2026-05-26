import { Service } from "@/types/service";

export const services: Service[] = [
  {
    slug: "segunda-opinion",
    title: "Segunda Opinión del Certificado Energético",
    description:
      "Tienes un certificado energético y quieres saber si es fiable. Revisamos la calificación, detectamos errores o inflados y te explicamos qué significa realmente para tu inmueble. Entrega en 24 h.",
    price: 39,
    badge: "Más popular",
    href: "/segunda-opinion/",
    destacado: true,
    features: [
      "Revisión de calificación energética",
      "Detección de errores o inflados",
      "Explicación clara de resultados",
      "Entrega en 24 horas laborables",
    ],
    includes: [
      "Análisis detallado del certificado existente",
      "Detección de discrepancias y anomalías",
      "Informe PDF con conclusiones técnicas",
      "Recomendaciones accionables",
    ],
  },
  {
    slug: "segunda-opinion-express",
    title: "Segunda Opinión del Certificado Energético Express",
    description:
      "El mismo análisis que la Segunda Opinión estándar, pero con entrega en menos de 2 horas. Disponible lunes a viernes de 9 a 18 h. Para cuando no puedes esperar.",
    price: 79,
    badge: "Urgente",
    href: "/segunda-opinion-express/",
    features: [
      "Mismo rigor técnico que la estándar",
      "Entrega en menos de 2 horas",
      "Disponible lunes a viernes 9-18h",
      "Ideal para firmas inminentes",
    ],
    includes: [
      "Análisis completo del certificado",
      "Detección de errores en tiempo récord",
      "Informe PDF urgente",
      "Soporte prioritario",
    ],
  },
  {
    slug: "check-up-inmobiliario",
    title: "Check-Up Inmobiliario",
    description:
      "Para quien está a punto de firmar. Incluye Nota Simple, Catastral, análisis de cargas, revisión del certificado energético, análisis técnico energético, red flags y audio-resumen IA.",
    price: 199,
    badge: "Antes de comprar",
    href: "/check-up-inmobiliario/",
    features: [
      "Nota Simple y Catastral",
      "Análisis de cargas y gravámenes",
      "Revisión del certificado energético",
      "Audio-resumen con IA",
    ],
    includes: [
      "Informe de 10-15 páginas",
      "Detección de brown discount",
      "Análisis de vicios ocultos",
      "Validez ante notario y banco",
    ],
  },
  {
    slug: "informe-tecnico-energetico",
    title: "Informe Técnico Energético",
    description:
      "Análisis técnico completo del comportamiento energético del inmueble. Propuestas de mejora priorizadas, estimación de ahorro y orientación sobre ayudas disponibles.",
    price: 399,
    badge: "Máximo detalle",
    href: "/informe-tecnico-energetico/",
    features: [
      "Análisis completo del comportamiento energético",
      "Propuestas de mejora priorizadas",
      "Estimación de ahorro económico",
      "Orientación sobre ayudas disponibles",
    ],
    includes: [
      "Informe técnico detallado",
      "Plan de mejora priorizado por coste-beneficio",
      "Mapa de ayudas y subvenciones aplicables",
      "Seguimiento personalizado",
    ],
  },
  {
    slug: "diagnostico-express",
    title: "Diagnóstico Express",
    description:
      "Cuestionario de 5 minutos + análisis automático de tu situación energética. Recibes un informe orientativo y la recomendación del servicio que más te conviene. Sin compromiso.",
    price: 0,
    badge: "Gratuito",
    href: "/formulario/",
    features: [
      "Cuestionario rápido de 5 minutos",
      "Análisis automático de tu situación",
      "Recomendación personalizada",
      "Sin compromiso",
    ],
    includes: [
      "Informe orientativo gratuito",
      "Recomendación del servicio adecuado",
      "Primer contacto con Eva",
    ],
  },
];

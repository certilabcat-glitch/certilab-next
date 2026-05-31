import { Service } from "@/types/service";

export const services: Service[] = [
  {
    slug: "diagnostico-express",
    title: "Diagnóstico Express",
    description:
      "Cuestionario de 5 minutos. Recibe un informe orientativo gratuito y la recomendación del servicio que mejor se adapta a tu caso.",
    price: 0,
    badge: "Gratuito · 5 min",
    href: "/formulario/",
    ctaLabel: "Empezar diagnóstico",
    features: [
      "Cuestionario rápido de 5 minutos",
      "Análisis automático de tu situación",
      "Recomendación personalizada",
      "Sin compromiso",
    ],
    includes: [
      "Informe orientativo gratuito",
      "Recomendación del servicio adecuado",
      "Primer contacto con el equipo técnico",
    ],
  },
  {
    slug: "segunda-opinion",
    title: "Segunda Opinión del Certificado Energético",
    description:
      "Revisamos tu certificado, detectamos errores o inflados y te explicamos qué significa realmente para tu inmueble. Entrega en 24 h.",
    price: 39,
    badge: "Más solicitado",
    href: "/segunda-opinion/",
    destacado: true,
    ctaLabel: "Saber si es fiable",
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
    title: "Segunda Opinión Express",
    description:
      "El mismo análisis riguroso, pero con entrega en menos de 2 horas. De lunes a viernes de 9 a 18 h. Para cuando no puedes esperar.",
    price: 79,
    badge: "Urgente",
    href: "/segunda-opinion-express/",
    ctaLabel: "Lo necesito ya",
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
      "Para quien está a punto de firmar. Nota Simple, Catastral, cargas, certificado energético, análisis técnico y audio-resumen IA en un solo informe.",
    price: 199,
    badge: "Antes de comprar",
    href: "/check-up-inmobiliario/",
    ctaLabel: "Proteger mi compra",
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
      "Análisis completo del comportamiento energético con propuestas de mejora priorizadas, estimación de ahorro y ayudas disponibles.",
    price: 399,
    badge: "Máximo detalle",
    href: "/informe-tecnico-energetico/",
    ctaLabel: "Ver propuestas de mejora",
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
];

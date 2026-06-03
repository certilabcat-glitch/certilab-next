import { NavItem } from "@/types/navigation";

export const navigation: NavItem[] = [
  { label: "Inicio", href: "/" },
  {
    label: "Servicios",
    children: [
      { label: "Diagnóstico Gratuito", href: "/formulario/" },
      { label: "Segunda Opinión (39€)", href: "/segunda-opinion/" },
      { label: "Check-Up Inmobiliario (199€)", href: "/check-up-inmobiliario/" },
      { label: "Informe Técnico (399€)", href: "/informe-tecnico-energetico/" },
      { label: "Calculadora de ahorro", href: "/calculadoracat/" },
      { label: "Ayudas energéticas", href: "/ayudas-eficiencia-energetica/" },
    ],
  },
  { label: "SaaS · B2B", href: "/saas/" },
  {
    label: "Blog",
    children: [
      { label: "Ver todos los artículos", href: "/blog/" },
      { label: "Brown Discount: qué es", href: "/blog/brown-discount-precio-vivienda/" },
      { label: "Precio del Certificado Energético 2026", href: "/blog/cuanto-cuesta-certificado-energetico-2026/" },
      { label: "¿Certificado Gratis? Guía 2026", href: "/blog/obtener-certificado-energetico-gratis/" },
      { label: "Errores comunes en el CE", href: "/blog/errores-certificado-energetico/" },
      { label: "Next Generation 2026", href: "/blog/ayudas-next-generation-rehabilitacion-energetica-2026/" },
    ],
  },
  { label: "Sobre nosotros", href: "/sobre-nosotros/" },
];

export const footerServices = [
  { label: "Segunda Opinión (39€)", href: "/segunda-opinion/" },
  { label: "Check-Up Inmobiliario (199€)", href: "/check-up-inmobiliario/" },
  { label: "Informe Técnico (399€)", href: "/informe-tecnico-energetico/" },
];

export const footerLegal = [
  { label: "Privacidad", href: "/privacidad/" },
  { label: "Cookies", href: "/cookies/" },
  { label: "Aviso legal", href: "/aviso-legal/" },
];

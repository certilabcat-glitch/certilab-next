import { NavItem } from "@/types/navigation";

export const navigation: NavItem[] = [
  { label: "Inicio", href: "/" },
  {
    label: "Servicios",
    children: [
      { label: "Segunda Opinión", href: "/segunda-opinion/" },
      { label: "Check-Up Inmobiliario", href: "/check-up-inmobiliario/" },
      { label: "Informe Técnico", href: "/informe-tecnico-energetico/" },
    ],
  },
  { label: "Blog", href: "/blog/" },
  { label: "Sobre nosotros", href: "/sobre-nosotros/" },
];

export const footerServices = [
  { label: "Segunda Opinión", href: "/segunda-opinion/" },
  { label: "Check-Up Inmobiliario", href: "/check-up-inmobiliario/" },
  { label: "Informe Técnico", href: "/informe-tecnico-energetico/" },
];

export const footerLegal = [
  { label: "Privacidad", href: "/privacidad/" },
  { label: "Cookies", href: "/cookies/" },
  { label: "Aviso legal", href: "/aviso-legal/" },
  { label: "Reembolso", href: "/politica-de-reembolso/" },
];

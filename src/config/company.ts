// ===== FUENTE ÚNICA DE VERDAD — Datos de empresa =====
// Cualquier modificación de estos datos debe hacerse AQUÍ.

export const COMPANY = {
  nombreOficial: "Certilab",
  marca: "Certilab",
  url: "https://www.certilab.cat",
  dominio: "certilab.cat",
  fundacion: 2024,
  get copyright(): string {
    return `© ${new Date().getFullYear()} Certilab`;
  },
} as const;

export const RESPONSABLE = {
  nombreCompleto: "Eva María González García",
  nombreCorto: "Eva María González",
  titulo: "Arquitecta Técnica",
  colegio: "Cateb",
  numeroColegiada: "9457",
  credencialColegio: "Cateb 9457",
  experiencia: "20 años de experiencia",
  seguro: "Seguro RC Profesional",
} as const;

export const CONTACTO = {
  email: "info@certilab.cat",
  whatsappNumero: "34608515922",
  whatsappFormateado: "+34 608 515 922",
  telefonoFormateado: "+34 722 437 675",
  get whatsappUrl(): string {
    return `https://wa.me/${this.whatsappNumero}`;
  },
} as const;

export const UBICACION = {
  pais: "España",
  paisCodigo: "ES",
  provincia: "Cataluña",
  municipio: "",
  areaServicio: "España (100% online y remoto)",
} as const;

export const HORARIO = {
  general: "24/7",
  express: "L–V 9–18 h",
  expressDetallado: "De lunes a viernes, de 9:00 a 18:00 horas. Los pedidos fuera de este horario se procesan al inicio de la siguiente ventana disponible.",
  diasLaborables: "Lunes a Viernes",
  franjaLaboral: "9:00 a 18:00 h",
} as const;

export const REDES_SOCIALES = {
  linkedin: "https://www.linkedin.com/company/certilab",
} as const;

export const META_IDS = {
  fbAppId: "1271893388238243",
  googleVerification: "vbxqc3rtusTH9zjcV54qo7HI9PV9D2exiFZ4VjhDyv4",
} as const;

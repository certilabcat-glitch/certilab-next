import { WHATSAPP_NUMBER } from "./constants";

export function waUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}

export function waDiagnostico(): string {
  return waUrl(
    "Hola, vengo desde certilab.cat. Quiero hacer el Diagnóstico Express gratuito."
  );
}

export function waSaas(plan?: string): string {
  const msg = plan
    ? `Hola, vengo desde la web de Certilab SaaS. Me interesa el plan ${plan}.`
    : "Hola, vengo desde la web de Certilab SaaS. Me interesa saber más.";
  return waUrl(msg);
}

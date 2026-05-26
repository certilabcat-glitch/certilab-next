/**
 * Webhook utilities for n8n lead capture
 */

export interface LeadData {
  direccion?: string;
  calle?: string;
  poblacion?: string;
  nombre?: string;
  telefono?: string;
  email?: string;
  mensaje?: string;
  servicio?: string;
  origen: string;
  timestamp: string;
}

export async function sendToWebhook(data: LeadData): Promise<{ ok: boolean; error?: string }> {
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("N8N_WEBHOOK_URL no configurado. Lead no enviado.");
    return { ok: false, error: "Webhook URL not configured" };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Webhook error:", response.status);
      return { ok: false, error: `HTTP ${response.status}` };
    }

    return { ok: true };
  } catch (error) {
    console.error("Webhook error:", error);
    return { ok: false, error: String(error) };
  }
}

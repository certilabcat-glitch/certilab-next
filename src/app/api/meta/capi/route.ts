import { NextResponse } from "next/server";

const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/** SHA-256 hash para datos del usuario (obligatorio para CAPI) */
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message.normalize("NFKD"));
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: Request) {
  if (!META_ACCESS_TOKEN) {
    console.error("[Meta CAPI] META_ACCESS_TOKEN no configurado");
    return NextResponse.json(
      { error: "CAPI not configured: missing token" },
      { status: 500 }
    );
  }

  if (!PIXEL_ID) {
    console.error("[Meta CAPI] META_PIXEL_ID no configurado");
    return NextResponse.json(
      { error: "CAPI not configured: missing pixel ID" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { eventName, email, phone, url, fbc, fbp, customData } = body;

    // Construir user_data con hash SHA-256
    const userData: Record<string, string> = {};

    if (email) {
      userData.em = await sha256(email.toLowerCase().trim());
    }
    if (phone) {
      userData.ph = await sha256(phone.replace(/[\s\-\(\)\+]/g, ""));
    }

    // IP y User-Agent desde headers del servidor
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
      userData.client_ip_address = forwarded.split(",")[0].trim();
    }
    const ua = request.headers.get("user-agent");
    if (ua) userData.client_user_agent = ua;

    if (fbc) userData.fbc = fbc;
    if (fbp) userData.fbp = fbp;

    const payload = {
      data: [
        {
          event_name: eventName || "PageView",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: url || "https://www.certilab.cat/",
          user_data: userData,
          custom_data: customData || {},
        },
      ],
    };

    // Enviar a Graph API v22.0
    const response = await fetch(
      `https://graph.facebook.com/v22.0/${PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error(
        "[Meta CAPI] Error response:",
        JSON.stringify(result, null, 2)
      );
      return NextResponse.json({ error: result }, { status: response.status });
    }

    console.log("[Meta CAPI] Evento enviado:", eventName, "→", result);
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error("[Meta CAPI] Exception:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

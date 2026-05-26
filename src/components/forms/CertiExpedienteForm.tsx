"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function CertiExpedienteForm() {
  const [direccion, setDireccion] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!direccion.trim()) {
      router.push("/resultado-auditoria/");
      return;
    }

    setLoading(true);

    const cleaned = direccion.trim().replace(/\s{2,}/g, "").substring(0, 300);
    const parsed = parseDireccion(cleaned);

    // Fire-and-forget to n8n (no esperamos respuesta)
    try {
      await fetch(
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
          "https://tu-n8n.com/webhook/lead-certilab",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            direccion: cleaned,
            calle: parsed.calle,
            poblacion: parsed.poblacion,
            ts: new Date().toISOString(),
            source: "certi-expediente-home",
          }),
        }
      );
    } catch {
      // fail-safe: no bloquear al usuario
    }

    // Simular animación de conexión
    setTimeout(() => {
      const params = new URLSearchParams({
        direccion: cleaned,
        calle: parsed.calle,
        poblacion: parsed.poblacion,
        ts: Date.now().toString(),
      });
      router.push(`/resultado-auditoria/?${params.toString()}`);
    }, 2500);
  };

  return (
    <form
      id="certi-expediente-form"
      onSubmit={handleSubmit}
      className="certi-buscador"
      aria-label="Iniciar expediente forense"
    >
      <label htmlFor="certi-input" className="sr-only">
        Dirección o referencia catastral de su inmueble
      </label>
      <input
        id="certi-input"
        type="text"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        placeholder="Ej: Calle Mayor 12, Barcelona o ref. catastral"
        autoComplete="off"
        aria-label="Dirección o referencia catastral"
        disabled={loading}
      />
      <button type="submit" className="certi-submit" disabled={loading}>
        {loading ? (
          <>
            <span className="certi-spinner"></span> Conectando…
          </>
        ) : (
          "🔍 Analizar"
        )}
      </button>

      <style jsx>{`
        .certi-buscador {
          max-width: 560px;
          margin: 1.5rem auto 0 auto;
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        input {
          flex: 1;
          padding: 0.8rem 1rem;
          border: 2px solid var(--color-border);
          border-radius: 8px;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          background: white;
          color: var(--color-dark);
          outline: none;
        }
        input:focus {
          border-color: var(--color-terra);
        }
        input:disabled {
          opacity: 0.7;
        }
        .certi-submit {
          white-space: nowrap;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.95rem;
          background: var(--color-terra);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .certi-submit:hover:not(:disabled) {
          opacity: 0.85;
        }
        .certi-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .certi-spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid white;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
        @media (max-width: 500px) {
          .certi-buscador {
            flex-direction: column;
          }
          input {
            width: 100%;
          }
        }
      `}</style>
    </form>
  );
}

function parseDireccion(texto: string) {
  const partes = texto.split(",").map((s) => s.trim()).filter(Boolean);
  if (partes.length >= 2) {
    return { calle: partes[0], poblacion: partes.slice(1).join(", ") };
  }
  const tokens = texto.split(" ");
  if (tokens.length >= 3) {
    const ultimo = tokens[tokens.length - 1];
    if (ultimo.length > 4) {
      return {
        calle: tokens.slice(0, -1).join(" "),
        poblacion: ultimo,
      };
    }
    if (tokens.length >= 4) {
      return {
        calle: tokens.slice(0, -2).join(" "),
        poblacion: tokens.slice(-2).join(" "),
      };
    }
  }
  return { calle: texto, poblacion: "" };
}

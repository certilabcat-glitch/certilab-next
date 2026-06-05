"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./CertiExpedienteForm.module.css";

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
      className={styles.buscador}
      aria-label="Iniciar expediente forense"
    >
      <label htmlFor="certi-input" className={styles.srOnly}>
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
        className={styles.input}
      />
      <button type="submit" className={styles.submit} disabled={loading}>
        {loading ? (
          <>
            <span className={styles.spinner}></span> Conectando…
          </>
        ) : (
          "🔍 Analizar"
        )}
      </button>
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

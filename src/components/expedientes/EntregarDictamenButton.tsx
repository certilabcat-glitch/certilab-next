"use client";

import { useState } from "react";
import { entregarDictamen } from "@/lib/actions/entregar-dictamen";

/**
 * EntregarDictamenButton
 *
 * Botón que entrega el dictamen al cliente.
 * Solo visible cuando el dictamen está emitido pero no entregado.
 *
 * Uso:
 * - En la página de detalle del expediente del AT
 * - Cuando estado = "DictamenEmitido"
 *
 * V1 MVP:
 * - Entrega inmediata sin confirmación adicional
 * - Actualiza estado a DictamenEntregado
 */

interface EntregarDictamenButtonProps {
  expedienteId: string;
  disabled?: boolean;
  onEntregado?: () => void;
  className?: string;
}

export default function EntregarDictamenButton({
  expedienteId,
  disabled = false,
  onEntregado,
  className = "",
}: EntregarDictamenButtonProps) {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEntregar() {
    setCargando(true);
    setError(null);

    const result = await entregarDictamen(expedienteId);

    if (result.success) {
      onEntregado?.();
    } else {
      setError(result.error ?? "Error al entregar el dictamen");
    }

    setCargando(false);
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleEntregar}
        disabled={disabled || cargando}
        className={`px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
      >
        {cargando ? "Entregando..." : "✓ Entregar al Cliente"}
      </button>
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}
    </div>
  );
}

EntregarDictamenButton.displayName = "EntregarDictamenButton";

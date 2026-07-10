"use client";

import type { EstadoExpediente } from "@/types/core/expediente";
import type { DictamenTecnico } from "@/types/core/dictamen";

// ============================================================
// DictamenStatusBadge
//
// Badge visual que muestra el estado del dictamen derivado
// del estado del expediente. Solo se muestra en estados
// relacionados con el dictamen (DictamenEmitido, DictamenEntregado).
// ============================================================

interface DictamenStatusBadgeProps {
  estado: EstadoExpediente;
  dictamen?: DictamenTecnico;
  className?: string;
}

type EstadoVisualDictamen = "NoEmitido" | "Emitido" | "Entregado";

const variantMap: Record<EstadoVisualDictamen, { label: string; bg: string; text: string; border: string }> = {
  NoEmitido: {
    label: "No emitido",
    bg: "bg-gray-100",
    text: "text-gray-600",
    border: "border-gray-200",
  },
  Emitido: {
    label: "Emitido",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  Entregado: {
    label: "Entregado",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
};

function derivarEstadoDictamen(estado: EstadoExpediente): EstadoVisualDictamen | null {
  switch (estado) {
    case "DictamenEmitido":
      return "Emitido";
    case "DictamenEntregado":
      return "Entregado";
    default:
      return null;
  }
}

export default function DictamenStatusBadge({
  estado,
  className = "",
}: DictamenStatusBadgeProps) {
  const estadoDictamen = derivarEstadoDictamen(estado);

  // No mostrar el badge si no estamos en un estado de dictamen
  if (!estadoDictamen) {
    return null;
  }

  const v = variantMap[estadoDictamen];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${v.bg} ${v.text} ${v.border} ${className}`}
    >
      {estadoDictamen === "NoEmitido" && (
        <svg
          className="w-3.5 h-3.5 mr-1.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      {estadoDictamen === "Emitido" && (
        <svg
          className="w-3.5 h-3.5 mr-1.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      )}
      {estadoDictamen === "Entregado" && (
        <svg
          className="w-3.5 h-3.5 mr-1.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
      {v.label}
    </span>
  );
}

DictamenStatusBadge.displayName = "DictamenStatusBadge";

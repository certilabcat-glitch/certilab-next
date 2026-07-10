"use client";

import { useState } from "react";
import EmitirDictamenModal from "./EmitirDictamenModal";

/**
 * EmitirDictamenButton
 *
 * Botón que abre el modal para emitir el dictamen técnico.
 * Solo visible cuando el diagnóstico está completado.
 *
 * Uso:
 * - En la página de detalle del expediente del AT
 * - Cuando estado = "Completado" (diagnóstico completado)
 *
 * V1 MVP:
 * - Abre modal de emisión
 * - Sin validaciones adicionales (ya validadas en el modal)
 */

interface EmitirDictamenButtonProps {
  expedienteId: string;
  disabled?: boolean;
  onEmitido?: () => void;
  onEntregado?: () => void;
  className?: string;
}

export default function EmitirDictamenButton({
  expedienteId,
  disabled = false,
  onEmitido,
  onEntregado,
  className = "",
}: EmitirDictamenButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={disabled}
        className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
      >
        📋 Emitir Dictamen
      </button>

      <EmitirDictamenModal
        expedienteId={expedienteId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEmitido={() => {
          onEmitido?.();
          setIsModalOpen(false);
        }}
        onEntregado={() => {
          onEntregado?.();
          setIsModalOpen(false);
        }}
      />
    </>
  );
}

EmitirDictamenButton.displayName = "EmitirDictamenButton";

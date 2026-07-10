"use client";

import { useState, useCallback } from "react";
import { emitirDictamen } from "@/lib/actions/emitir-dictamen";
import { entregarDictamen } from "@/lib/actions/entregar-dictamen";

// ============================================================
// EmitirDictamenModal
//
// Modal que permite al AT emitir el dictamen técnico formal.
// Después de emitir, ofrece la opción de entregar al cliente.
//
// Flujo:
//   Diagnóstico Completado
//     → Paso 1: Redactar dictamen y emitir
//       → Paso 2: (opcional) Entregar al cliente
//
// V1 MVP:
//   - Sin firma digital
//   - Sin PDF generado automáticamente
//   - Sin previsualización de cómo se verá al cliente
// ============================================================

interface EmitirDictamenModalProps {
  expedienteId: string;
  isOpen: boolean;
  onClose: () => void;
  onEmitido?: () => void;
  onEntregado?: () => void;
}

type DictamenStep = "form" | "emitido" | "entregado";

export default function EmitirDictamenModal({
  expedienteId,
  isOpen,
  onClose,
  onEmitido,
  onEntregado,
}: EmitirDictamenModalProps) {
  const [step, setStep] = useState<DictamenStep>("form");
  const [contenido, setContenido] = useState("");
  const [decision, setDecision] = useState<"conforme" | "no_conforme" | "pendiente">("conforme");
  const [observaciones, setObservaciones] = useState("");
  const [accionando, setAccionando] = useState(false);
  const [mensaje, setMensaje] = useState<{
    tipo: "success" | "error" | "info";
    texto: string;
  } | null>(null);

  const mostrarMensaje = useCallback(
    (tipo: "success" | "error" | "info", texto: string) => {
      setMensaje({ tipo, texto });
      setTimeout(() => setMensaje(null), 5000);
    },
    []
  );

  // ============================================================
  // Emitir dictamen
  // ============================================================

  async function handleEmitir() {
    if (!contenido.trim()) {
      mostrarMensaje("error", "El contenido del dictamen no puede estar vacío.");
      return;
    }

    setAccionando(true);
    setMensaje(null);

    const result = await emitirDictamen(
      expedienteId,
      contenido.trim(),
      decision,
      observaciones.trim() || null
    );

    if (result.success) {
      setStep("emitido");
      mostrarMensaje("success", "Dictamen emitido correctamente.");
      onEmitido?.();
    } else {
      mostrarMensaje("error", result.error ?? "Error al emitir dictamen.");
    }

    setAccionando(false);
  }

  // ============================================================
  // Entregar dictamen
  // ============================================================

  async function handleEntregar() {
    setAccionando(true);
    setMensaje(null);

    const result = await entregarDictamen(expedienteId);

    if (result.success) {
      setStep("entregado");
      mostrarMensaje("success", "Dictamen entregado al cliente.");
      onEntregado?.();
    } else {
      mostrarMensaje("error", result.error ?? "Error al entregar dictamen.");
    }

    setAccionando(false);
  }

  // ============================================================
  // Cerrar y resetear
  // ============================================================

  function handleCerrar() {
    setStep("form");
    setContenido("");
    setDecision("conforme");
    setObservaciones("");
    setMensaje(null);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Cabecera */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {step === "form" && "Emitir Dictamen Técnico"}
            {step === "emitido" && "Dictamen Emitido"}
            {step === "entregado" && "Dictamen Entregado"}
          </h2>
          <button
            onClick={handleCerrar}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mensaje */}
        {mensaje && (
          <div className="mx-6 mt-4">
            <div
              className={`p-3 rounded-md text-sm border ${
                mensaje.tipo === "success"
                  ? "bg-green-50 text-green-800 border-green-200"
                  : mensaje.tipo === "error"
                  ? "bg-red-50 text-red-800 border-red-200"
                  : "bg-blue-50 text-blue-800 border-blue-200"
              }`}
            >
              {mensaje.texto}
            </div>
          </div>
        )}

        {/* Contenido */}
        <div className="px-6 py-4 space-y-6">
          {/* ============================================================ */}
          {/* Paso 1: Formulario de emisión */}
          {/* ============================================================ */}
          {step === "form" && (
            <>
              {/* Decisión */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Decisión técnica *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setDecision("conforme")}
                    className={`p-3 rounded-lg border text-sm font-medium text-left transition-colors ${
                      decision === "conforme"
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700 ring-2 ring-emerald-500"
                        : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span className="block font-semibold">Conforme</span>
                    <span className="block text-xs font-normal mt-1 text-gray-500">
                      El certificado es válido
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDecision("no_conforme")}
                    className={`p-3 rounded-lg border text-sm font-medium text-left transition-colors ${
                      decision === "no_conforme"
                        ? "bg-red-50 border-red-300 text-red-700 ring-2 ring-red-500"
                        : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span className="block font-semibold">No conforme</span>
                    <span className="block text-xs font-normal mt-1 text-gray-500">
                      El certificado requiere correcciones
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDecision("pendiente")}
                    className={`p-3 rounded-lg border text-sm font-medium text-left transition-colors ${
                      decision === "pendiente"
                        ? "bg-amber-50 border-amber-300 text-amber-700 ring-2 ring-amber-500"
                        : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span className="block font-semibold">Pendiente</span>
                    <span className="block text-xs font-normal mt-1 text-gray-500">
                      Se necesita más información
                    </span>
                  </button>
                </div>
              </div>

              {/* Contenido */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contenido del dictamen *
                </label>
                <textarea
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Redacta el dictamen técnico. Este texto será visible para el cliente tras la entrega..."
                />
                <p className="text-xs text-gray-400 mt-1">
                  {contenido.length} caracteres
                </p>
              </div>

              {/* Observaciones */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observaciones (opcional)
                </label>
                <textarea
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Observaciones internas del AT (no visibles para el cliente)..."
                />
              </div>

              {/* Acciones */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCerrar}
                  disabled={accionando}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleEmitir}
                  disabled={accionando || !contenido.trim()}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {accionando ? "Emitiendo..." : "Emitir Dictamen"}
                </button>
              </div>
            </>
          )}

          {/* ============================================================ */}
          {/* Paso 2: Confirmación de emisión — opción de entregar */}
          {/* ============================================================ */}
          {step === "emitido" && (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Dictamen emitido correctamente
              </h3>
              <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                El dictamen técnico ha sido registrado y está disponible para el
                Arquitecto Técnico. Puedes entregarlo al cliente ahora o hacerlo
                más tarde desde el panel del expediente.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleCerrar}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={handleEntregar}
                  disabled={accionando}
                  className="px-6 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {accionando ? "Entregando..." : "Entregar al Cliente"}
                </button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* Paso 3: Confirmación de entrega */}
          {/* ============================================================ */}
          {step === "entregado" && (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Dictamen entregado al cliente
              </h3>
              <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                El dictamen ya está visible para el cliente en su panel de
                expedientes. Se ha registrado la fecha y hora de entrega.
              </p>
              <button
                type="button"
                onClick={handleCerrar}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Finalizar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

EmitirDictamenModal.displayName = "EmitirDictamenModal";
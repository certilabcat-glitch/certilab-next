"use client";

import { useRef, useState } from "react";
import { corregirExpediente } from "@/lib/actions/corregir-expediente";

interface CorregirExpedienteButtonProps {
  expedienteId: string;
  estado: string;
  version: number;
}

/**
 * Botón que permite al cliente solicitar la corrección de un expediente
 * que ha sido devuelto por el Arquitecto Técnico.
 *
 * V1 MVP:
 * - Solo visible cuando el expediente está en estado "Devuelto"
 * - Ejecuta la Server Action corregirExpediente
 * - Muestra feedback visual de carga y resultado
 * - Recarga la página tras éxito para reflejar el cambio de estado
 */
export function CorregirExpedienteButton({
  expedienteId,
  estado,
  version,
}: CorregirExpedienteButtonProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  if (estado !== "Devuelto") {
    return null;
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-amber-200">
        <h2 className="text-lg font-semibold text-amber-900">
          Expediente devuelto para correcciones
        </h2>
        <p className="text-sm text-amber-700 mt-1">
          El Arquitecto Técnico ha solicitado correcciones en tu expediente.
          Una vez realizadas, puedes solicitar una nueva revisión.
        </p>
      </div>
      <div className="px-6 py-5 space-y-4">
        {feedback && (
          <div
            className={`rounded-md p-3 text-sm ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {feedback.message}
          </div>
        )}

        <form
          ref={formRef}
          action={async (formData: FormData) => {
            setIsSubmitting(true);
            setFeedback(null);

            try {
              const result = await corregirExpediente(
                formData.get("expedienteId") as string,
                Number(formData.get("version"))
              );

              if (result.success) {
                setFeedback({
                  type: "success",
                  message:
                    "Solicitud enviada correctamente. El expediente ha sido actualizado.",
                });
                // Recargar la página para reflejar el cambio de estado
                setTimeout(() => window.location.reload(), 1500);
              } else {
                setFeedback({
                  type: "error",
                  message:
                    result.error ??
                    "Error al procesar la solicitud. Inténtalo de nuevo.",
                });
              }
            } catch (err) {
              setFeedback({
                type: "error",
                message:
                  err instanceof Error
                    ? err.message
                    : "Error inesperado. Inténtalo de nuevo.",
              });
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <input type="hidden" name="expedienteId" value={expedienteId} />
          <input type="hidden" name="version" value={version} />
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent 
                       text-sm font-medium rounded-md shadow-sm text-white 
                       bg-amber-600 hover:bg-amber-700 focus:outline-none 
                       focus:ring-2 focus:ring-offset-2 focus:ring-amber-500
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Enviando...
              </>
            ) : (
              "Solicitar nueva revisión"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
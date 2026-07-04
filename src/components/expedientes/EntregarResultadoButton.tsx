"use client";

import { useEffect, useRef } from "react";
import { entregarResultado } from "@/lib/actions/entregar-resultado";

interface EntregarResultadoButtonProps {
  expedienteId: string;
  estado: string;
  version: number;
  notas: string | null;
}

/**
 * Componente cliente que ejecuta la entrega automática del resultado
 * cuando se visualiza un expediente en estado 'Aprobado'.
 *
 * Alternativa C del análisis EP-032:
 * La entrega se produce al cargar la vista de detalle, sin interacción
 * adicional del cliente.
 *
 * V1 MVP:
 * - No genera PDF automáticamente
 * - Reutiliza las notas del expediente como resultado textual
 * - Sin notificaciones push/email
 *
 * Implementación:
 * - Usa un formulario oculto con Server Action que se auto-envía
 *   al montar el componente si el estado es 'Aprobado'.
 * - Evita setState en efectos usando submit nativo del form.
 */
export function EntregarResultadoButton({
  expedienteId,
  estado,
  version,
  notas,
}: EntregarResultadoButtonProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const submittedRef = useRef(false);

  useEffect(() => {
    // Auto-entregar si el expediente está en estado Aprobado
    if (estado === "Aprobado" && !submittedRef.current) {
      submittedRef.current = true;
      const timer = setTimeout(() => {
        formRef.current?.requestSubmit();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [estado]);

  // Solo mostrar la sección de resultado si está Entregado
  if (estado !== "Aprobado" && estado !== "Entregado") {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Resultado de la Revisión
        </h2>
      </div>
      <div className="px-6 py-5 space-y-4">
        {estado === "Aprobado" && (
          <div className="flex items-center space-x-2 text-blue-600">
            <svg
              className="animate-spin h-5 w-5"
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
            <span className="text-sm">Preparando resultado...</span>
          </div>
        )}

        {estado === "Entregado" && (
          <div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-md p-4 mb-4">
              <p className="text-sm font-medium text-emerald-800">
                ✓ Resultado entregado correctamente
              </p>
              <p className="text-xs text-emerald-600 mt-1">
                El Arquitecto Técnico ha completado la revisión de tu
                certificado. A continuación se detalla el resultado.
              </p>
            </div>

            {notas ? (
              <div className="bg-gray-50 rounded-md p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Notas del Arquitecto Técnico
                </h3>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                  {notas}
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-md p-4 text-center">
                <p className="text-sm text-gray-500">
                  El resultado de la revisión está disponible. Contacta con
                  soporte si necesitas más detalles.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Formulario oculto con Server Action para auto-entregar */}
        <form
          ref={formRef}
          action={async () => {
            await entregarResultado(expedienteId, version);
          }}
          style={{ display: "none" }}
        >
          <input type="hidden" name="expedienteId" value={expedienteId} />
          <input type="hidden" name="version" value={version} />
        </form>
      </div>
    </div>
  );
}
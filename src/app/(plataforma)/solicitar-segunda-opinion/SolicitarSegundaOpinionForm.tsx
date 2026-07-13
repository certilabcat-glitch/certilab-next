"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { crearExpediente } from "@/lib/actions/crear-expediente";
import Button from "@/components/ui/Button";

export default function SolicitarSegundaOpinionForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    const result = await crearExpediente({
      titulo: "Solicitud de Segunda Opinión",
    });

    if (result.success && result.expedienteId) {
      router.push(`/plataforma/expedientes/${result.expedienteId}`);
    } else {
      setError(result.error ?? "Error al crear el expediente.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Segunda Opinión Profesional
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Un técnico certificado revisará tu documentación y emitirá un
              informe detallado con su segunda opinión.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Revisión por técnico certificado</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Informe detallado de resultados</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Respuesta en 48-72 horas hábiles</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          loading={isSubmitting}
          className="w-full"
        >
          Solicitar Segunda Opinión
        </Button>
      </div>
    </div>
  );
}

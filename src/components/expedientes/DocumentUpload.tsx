"use client";

import { useState, useRef } from "react";
import { subirDocumento } from "@/lib/actions/documentos-expediente";
import type { TipoDocumento } from "@/types/core/documento-ia";

interface DocumentUploadProps {
  expedienteId: string;
  tipo: TipoDocumento;
  label: string;
  accept?: string;
  onSuccess?: () => void;
}

const TIPOS_MIME_PERMITIDOS = "application/pdf,image/jpeg,image/png,image/webp";

/**
 * Componente de subida de documentos para expedientes.
 *
 * Proporciona:
 * - Input de archivo con validación de tipo y tamaño
 * - Selector de tipo de documento (CERTIFICADO_ORIGINAL o FOTOGRAFIA)
 * - Estado de carga durante la subida
 * - Feedback visual de éxito/error
 *
 * V1 MVP: Subida simple sin procesamiento IA.
 */
export function DocumentUpload({
  expedienteId,
  tipo,
  label,
  accept,
  onSuccess,
}: DocumentUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const formData = new FormData(event.currentTarget);
    const file = formData.get("file") as File;

    if (!file || file.size === 0) {
      setError("Selecciona un archivo para subir.");
      return;
    }

    // Validación adicional en cliente
    if (file.size > 20 * 1024 * 1024) {
      setError("El archivo no puede superar los 20MB.");
      return;
    }

    setIsUploading(true);

    try {
      const result = await subirDocumento(expedienteId, tipo, formData);

      if (!result.success) {
        setError(result.error ?? "Error al subir el documento.");
        return;
      }

      setSuccess(true);
      formRef.current?.reset();
      onSuccess?.();

      // Ocultar mensaje de éxito tras 3 segundos
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Error inesperado al subir el documento.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
          <p className="text-xs text-gray-500 mb-4">
            PDF, JPG, PNG o WebP (máx. 20MB)
          </p>
        </div>

        <div className="flex items-center justify-center">
          <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <svg
              className="w-5 h-5 mr-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Seleccionar archivo
            <input
              type="file"
              name="file"
              accept={accept ?? TIPOS_MIME_PERMITIDOS}
              className="sr-only"
              disabled={isUploading}
              onChange={() => setError(null)}
            />
          </label>
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}

        {success && (
          <p className="text-sm text-green-600 text-center">
            Documento subido correctamente.
          </p>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isUploading}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Subiendo...
              </>
            ) : (
              "Subir documento"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
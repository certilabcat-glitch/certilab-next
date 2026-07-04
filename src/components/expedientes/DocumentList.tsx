"use client";

import { useState, useEffect } from "react";
import {
  getDocumentosExpediente,
  getDocumentoUrl,
  eliminarDocumento,
} from "@/lib/actions/documentos-expediente";
import type { DocumentoIARow } from "@/types/core/documento-ia";

interface DocumentListProps {
  expedienteId: string;
  refreshKey?: number;
}

/**
 * Mapa de tipo de documento a etiqueta legible
 */
const TIPO_LABEL: Record<string, string> = {
  CERTIFICADO_ORIGINAL: "Certificado Energético Original",
  FOTOGRAFIA: "Fotografía del Inmueble",
  DOCUMENTO_COMPLEMENTARIO: "Documento Complementario",
  INFORME_PITR: "Informe PITR",
  INFORME_FINAL: "Informe Final",
};

function formatFileSize(bytes: number): string {
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Componente que lista los documentos adjuntos de un expediente.
 *
 * Muestra:
 * - Tipo de documento con etiqueta descriptiva
 * - Nombre del archivo y tamaño
 * - Fecha de subida
 * - Botón de descarga (URL firmada)
 * - Botón de eliminar (solo para propietario en V1)
 *
 * V1 MVP: Sin procesamiento IA automático.
 * El usuario sube documentos y puede verlos/descargarlos.
 */
export function DocumentList({
  expedienteId,
  refreshKey = 0,
}: DocumentListProps) {
  const [documentos, setDocumentos] = useState<DocumentoIARow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadDocumentos() {
      setLoading(true);
      setError(null);

      const result = await getDocumentosExpediente(expedienteId);
      if (cancelled) return;
      if (result.error) {
        setError(result.error);
      } else {
        setDocumentos(result.data);
      }
      setLoading(false);
    }

    loadDocumentos();

    return () => {
      cancelled = true;
    };
  }, [expedienteId, refreshKey, refreshTrigger]);

  async function handleDownload(documento: DocumentoIARow) {
    setDownloadingId(documento.id);
    const result = await getDocumentoUrl(documento.id);

    if (result.url) {
      window.open(result.url, "_blank");
    } else {
      setError(result.error ?? "Error al descargar.");
    }
    setDownloadingId(null);
  }

  async function handleDelete(documento: DocumentoIARow) {
    if (
      !window.confirm(
        "¿Eliminar este documento? Esta acción no se puede deshacer."
      )
    ) {
      return;
    }

    setDeletingId(documento.id);
    const result = await eliminarDocumento(documento.id);

    if (result.success) {
      setRefreshTrigger((prev) => prev + 1);
    } else {
      setError(result.error ?? "Error al eliminar.");
    }
    setDeletingId(null);
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2" />
        <p className="text-sm text-gray-500">Cargando documentos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {documentos.length === 0 && !error && (
        <div className="text-center py-8">
          <svg
            className="mx-auto h-12 w-12 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-500">
            Todavía no hay documentos adjuntos.
          </p>
          <p className="text-xs text-gray-400">
            Sube el certificado energético original y fotografías del inmueble.
          </p>
        </div>
      )}

      {documentos.length > 0 && (
        <ul className="divide-y divide-gray-200">
          {documentos.map((doc) => (
            <li
              key={doc.id}
              className="py-4 flex items-center justify-between"
            >
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2">
                  {/* Icono según tipo MIME */}
                  {doc.mime_type === "application/pdf" ? (
                    <svg
                      className="w-6 h-6 text-red-500 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-green-500 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {TIPO_LABEL[doc.tipo] ?? doc.tipo}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {doc.nombre} · {formatFileSize(doc.tamano_bytes)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDate(doc.created_at)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleDownload(doc)}
                  disabled={downloadingId === doc.id}
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {downloadingId === doc.id ? "..." : "Descargar"}
                </button>
                <button
                  onClick={() => handleDelete(doc)}
                  disabled={deletingId === doc.id}
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {deletingId === doc.id ? "..." : "Eliminar"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
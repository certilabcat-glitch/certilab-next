import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getExpedienteById } from "@/lib/actions/crear-expediente";
import { DocumentUpload } from "@/components/expedientes/DocumentUpload";
import { DocumentList } from "@/components/expedientes/DocumentList";
import { EntregarResultadoButton } from "@/components/expedientes/EntregarResultadoButton";
export const metadata: Metadata = {
  title: "Expediente | Plataforma Certilab",
  description: "Detalle del expediente",
};

/**
 * Labels canónicos de estado (CF-026 §6.1)
 * Mapea los estados del dominio a etiquetas legibles para el cliente.
 */
const estadoLabels: Record<string, string> = {
  Solicitud: "Solicitud",
  PteDocumentacion: "Pendiente de documentación",
  EnRevisionPITR: "En revisión automática",
  Auditado: "Auditado",
  RequiereRevisionManual: "Requiere revisión manual",
  RevisionManual: "En revisión técnica",
  Aprobado: "Aprobado",
  Rechazado: "Rechazado",
  Entregado: "Resultado entregado",
  Cancelado: "Cancelado",
  Devuelto: "Devuelto para correcciones",
  // Legacy states (pre-core)
  pendiente: "Pendiente",
  pago_pendiente: "Pago pendiente",
  pago_recibido: "Pago recibido",
  expediente_creado: "Expediente creado",
  en_revision: "En revisión",
  informe_enviado: "Informe enviado",
  cerrado: "Cerrado",
};

const estadoColors: Record<string, string> = {
  Solicitud: "bg-yellow-100 text-yellow-800",
  PteDocumentacion: "bg-orange-100 text-orange-800",
  EnRevisionPITR: "bg-purple-100 text-purple-800",
  Auditado: "bg-blue-100 text-blue-800",
  RequiereRevisionManual: "bg-red-100 text-red-800",
  RevisionManual: "bg-indigo-100 text-indigo-800",
  Aprobado: "bg-green-100 text-green-800",
  Rechazado: "bg-red-100 text-red-800",
  Entregado: "bg-emerald-100 text-emerald-800",
  Cancelado: "bg-gray-100 text-gray-800",
  Devuelto: "bg-yellow-100 text-yellow-800",
  // Legacy states (pre-core)
  pendiente: "bg-yellow-100 text-yellow-800",
  pago_pendiente: "bg-orange-100 text-orange-800",
  pago_recibido: "bg-blue-100 text-blue-800",
  expediente_creado: "bg-blue-100 text-blue-800",
  en_revision: "bg-purple-100 text-purple-800",
  informe_enviado: "bg-green-100 text-green-800",
  cerrado: "bg-gray-100 text-gray-800",
};

export default async function ExpedienteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: expediente, error } = await getExpedienteById(id);

  if (error || !expediente) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/plataforma/mis-expedientes"
          className="text-sm text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← Volver a Mis Expedientes
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {expediente.titulo ?? "Segunda Opinión"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {expediente.numero_expediente}
            </p>
          </div>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              estadoColors[expediente.estado] ?? "bg-gray-100 text-gray-800"
            }`}
          >
            {estadoLabels[expediente.estado] ?? expediente.estado}
          </span>
        </div>
      </div>

      {/* Info card */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Información del Expediente
          </h2>
        </div>
        <dl className="divide-y divide-gray-200">
          <div className="px-6 py-4 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Número de expediente
            </dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {expediente.numero_expediente}
            </dd>
          </div>
          <div className="px-6 py-4 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Servicio</dt>
            <dd className="text-sm text-gray-900 col-span-2 capitalize">
              {expediente.servicio === "segunda_opinion"
                ? "Segunda Opinión"
                : expediente.servicio}
            </dd>
          </div>
          <div className="px-6 py-4 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Estado</dt>
            <dd className="text-sm text-gray-900 col-span-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  estadoColors[expediente.estado] ??
                  "bg-gray-100 text-gray-800"
                }`}
              >
                {estadoLabels[expediente.estado] ?? expediente.estado}
              </span>
            </dd>
          </div>
          <div className="px-6 py-4 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Fecha de creación
            </dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {new Date(expediente.created_at).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </dd>
          </div>
          <div className="px-6 py-4 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Última actualización
            </dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {new Date(expediente.updated_at).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </dd>
          </div>
          {expediente.notas && (
            <div className="px-6 py-4 grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Notas</dt>
              <dd className="text-sm text-gray-900 col-span-2">
                {expediente.notas}
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* Documentos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Documentos del Expediente
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Adjunta el certificado energético original y fotografías del
            inmueble para comenzar el análisis.
          </p>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Certificado Energético Original */}
          <div>
            <DocumentUpload
              expedienteId={id}
              tipo="CERTIFICADO_ORIGINAL"
              label="Certificado Energético Original"
              accept="application/pdf"
            />
          </div>

          {/* Fotografías del Inmueble */}
          <div>
            <DocumentUpload
              expedienteId={id}
              tipo="FOTOGRAFIA"
              label="Fotografía del Inmueble"
            />
          </div>

          {/* Separador */}
          <hr className="border-gray-200" />

          {/* Lista de documentos subidos */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Documentos subidos
            </h3>
            <DocumentList expedienteId={id} />
          </div>

          {/* Separador */}
          <hr className="border-gray-200" />

        </div>
      </div>

      {/* Resultado de la revisión (auto-entrega si está Aprobado) */}
      <EntregarResultadoButton
        expedienteId={id}
        estado={expediente.estado}
        version={expediente.version}
        notas={expediente.notas}
      />

      {/* Timeline placeholder */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Actividad</h2>
        </div>
        <div className="px-6 py-8 text-center">
          <p className="text-gray-500">
            El historial de actividad estará disponible próximamente.
          </p>
        </div>
      </div>
    </div>
  );
}
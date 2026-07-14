import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getExpedienteById } from "@/lib/actions/crear-expediente";
import { obtenerDictamen } from "@/lib/actions/obtener-dictamen";
import { DocumentUpload } from "@/components/expedientes/DocumentUpload";
import { DocumentList } from "@/components/expedientes/DocumentList";
import { EntregarResultadoButton } from "@/components/expedientes/EntregarResultadoButton";
import { CorregirExpedienteButton } from "@/components/expedientes/CorregirExpedienteButton";
import DictamenView from "@/components/expedientes/DictamenView";
import Badge from "@/components/ui/Badge";

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
  DictamenEmitido: "Dictamen emitido",
  DictamenEntregado: "Dictamen entregado",
  // Legacy states (pre-core)
  pendiente: "Pendiente",
  pago_pendiente: "Pago pendiente",
  pago_recibido: "Pago recibido",
  expediente_creado: "Expediente creado",
  en_revision: "En revisión",
  informe_enviado: "Informe enviado",
  cerrado: "Cerrado",
};

const estadoVariants: Record<string, "default" | "success" | "warning" | "error" | "info"> = {
  Solicitud: "warning",
  PteDocumentacion: "warning",
  EnRevisionPITR: "info",
  Auditado: "info",
  RequiereRevisionManual: "error",
  RevisionManual: "info",
  Aprobado: "success",
  Rechazado: "error",
  Entregado: "success",
  Cancelado: "default",
  Devuelto: "warning",
  DictamenEmitido: "info",
  DictamenEntregado: "success",
  // Legacy states (pre-core)
  pendiente: "warning",
  pago_pendiente: "warning",
  pago_recibido: "info",
  expediente_creado: "info",
  en_revision: "info",
  informe_enviado: "success",
  cerrado: "default",
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

  // Obtener dictamen si está en estado emitido o entregado
  let dictamen = null;
  if (
    expediente.estado === "DictamenEmitido" ||
    expediente.estado === "DictamenEntregado"
  ) {
    const result = await obtenerDictamen(id);
    if (result.data) {
      dictamen = result.data;
    }
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
          <Badge variant={estadoVariants[expediente.estado] ?? "default"}>
            {estadoLabels[expediente.estado] ?? expediente.estado}
          </Badge>
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
              <Badge variant={estadoVariants[expediente.estado] ?? "default"} size="sm">
                {estadoLabels[expediente.estado] ?? expediente.estado}
              </Badge>
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

      {/* Corrección de expediente (visible si está Devuelto) */}
      <CorregirExpedienteButton
        expedienteId={id}
        estado={expediente.estado}
        version={expediente.version}
      />

      {/* Resultado de la revisión (auto-entrega si está Aprobado) */}
      <EntregarResultadoButton
        expedienteId={id}
        estado={expediente.estado}
        version={expediente.version}
        notas={expediente.notas}
      />

      {/* Dictamen Técnico (visible si emitido o entregado por AT) */}
      {dictamen && (expediente.estado === "DictamenEmitido" || expediente.estado === "DictamenEntregado") && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Dictamen Técnico
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Resultado completo de la revisión técnica
            </p>
          </div>
          <div className="px-6 py-5">
            <DictamenView
              dictamen={dictamen}
              estado={expediente.estado === "DictamenEntregado" ? "Entregado" : "Emitido"}
            />
          </div>
        </div>
      )}

      {/* Resultado entregado (auto-entrega vía ADR-002: Aprobado -> Entregado) */}
      {expediente.estado === "Entregado" && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Resultado entregado
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              El resultado de la revisión ha sido entregado
            </p>
          </div>
          <div className="px-6 py-5 space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <svg className="w-6 h-6 text-green-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-green-800">
                  Tu expediente ha sido revisado y el resultado está disponible.
                </p>
                <p className="text-sm text-green-700 mt-1">
                  El certificado energético ha sido evaluado según los criterios técnicos establecidos.
                  Puedes consultar las notas incluidas a continuación.
                </p>
              </div>
            </div>
            {expediente.notas && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Notas de la revisión
                </h3>
                <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
                  {expediente.notas}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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
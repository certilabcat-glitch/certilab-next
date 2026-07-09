"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import {
  obtenerDetalleExpediente,
  iniciarRevisionExpediente,
  aprobarExpedienteAT,
  rechazarExpedienteAT,
} from "@/lib/actions/at";
import { obtenerEstadoDiagnostico } from "@/lib/actions/diagnostico";
import AsistenteDecisionTecnica from "@/components/expedientes/AsistenteDecisionTecnica";
import type { DetalleExpedienteAT } from "@/lib/actions/at";
import type { EstadoDiagnostico, DiagnosticoCompleto } from "@/types/core/diagnostico";

/**
 * PITR V1 — Página de Revisión Manual del Arquitecto Técnico
 *
 * El AT puede:
 * - Ver datos completos del expediente, cliente, inmueble y documentos
 * - Escribir notas técnicas
 * - Iniciar revisión (PteDocumentacion → RevisionManual)
 * - Usar el Asistente de Decisión Técnica (ADT) para construir el diagnóstico
 * - Aprobar (solo si el diagnóstico está completado)
 * - Rechazar (solo si el diagnóstico está completado)
 *
 * La aprobación queda bloqueada hasta que el ADT haya completado el DiagnosticoData.
 */
export default function AtExpedienteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user, loading: userLoading } = useUser();

  const [detalle, setDetalle] = useState<DetalleExpedienteAT | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Notas editables
  const [notas, setNotas] = useState("");
  const [notasOriginal, setNotasOriginal] = useState("");

  // Estado del diagnóstico (ADT) — valores iniciales antes de comenzar el ADT
  const [diagnosticoEstado, setDiagnosticoEstado] = useState<EstadoDiagnostico>("SinDiagnostico");
  const [diagnosticoVersion, setDiagnosticoVersion] = useState<number>(1);
  const [diagnosticoData, setDiagnosticoData] = useState<DiagnosticoCompleto | null>(null);
  const [cargandoDiagnostico, setCargandoDiagnostico] = useState(false);

  // Estado de acciones
  const [accionando, setAccionando] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<{
    tipo: "success" | "error";
    texto: string;
  } | null>(null);

  // Cargar detalle al montar
  useEffect(() => {
    async function cargar() {
      const result = await obtenerDetalleExpediente(id);
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setDetalle(result.data);
        setNotas(result.data.expediente.notas ?? "");
        setNotasOriginal(result.data.expediente.notas ?? "");
      }
      setCargando(false);

      // Cargar estado del diagnóstico si ya está en revisión
      if (result.data && (result.data.expediente.estado === "RevisionManual")) {
        setCargandoDiagnostico(true);
        const diagResult = await obtenerEstadoDiagnostico(id);
        if (diagResult.data && diagResult.data.estado) {
          setDiagnosticoEstado(diagResult.data.estado);
          setDiagnosticoVersion(diagResult.data.version);
          setDiagnosticoData(diagResult.data.diagnostico ?? null);
        } else {
          // Si no hay diagnóstico aún, asumir SinDiagnostico
          setDiagnosticoEstado("SinDiagnostico");
          setDiagnosticoVersion(result.data.expediente.version);
        }
        setCargandoDiagnostico(false);
      }
    }
    cargar();
  }, [id]);

  if (userLoading || cargando) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <p className="text-gray-500">Cargando expediente...</p>
      </div>
    );
  }

  if (error || !detalle) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Error al cargar el expediente
        </h1>
        <p className="text-gray-700">{error ?? "Expediente no encontrado."}</p>
        <Link
          href="/at/dashboard"
          className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
        >
          ← Volver a la bandeja técnica
        </Link>
      </div>
    );
  }

  const { expediente, cliente, inmueble, documentos } = detalle;
  const enRevision = expediente.estado === "RevisionManual";
  const pendiente = expediente.estado === "PteDocumentacion";
  const finalizado = expediente.estado === "Aprobado" || expediente.estado === "Rechazado";
  const puedeIniciar = pendiente && !!user;
  const diagnosticoCompletado = diagnosticoEstado === "Completado";
  const puedeAprobarRechazar = enRevision && !!user && diagnosticoCompletado;
  const notasModificadas = notas !== notasOriginal;
  const revisionSinDiagnostico = enRevision && diagnosticoEstado === "SinDiagnostico";
  const revisionEnBorrador = enRevision && diagnosticoEstado === "Borrador";

  async function handleIniciarRevision() {
    if (!user) return;
    setAccionando("iniciar");
    setMensaje(null);
    const result = await iniciarRevisionExpediente(id, user.id, expediente.version);
    if (result.success && result.expediente) {
      setDetalle((prev) => {
        if (!prev) return prev;
        return { ...prev, expediente: result.expediente! };
      });
      setMensaje({ tipo: "success", texto: "Revisión iniciada correctamente." });
      // Inicializar diagnóstico como SinDiagnostico al iniciar revisión
      setDiagnosticoEstado("SinDiagnostico");
      setDiagnosticoVersion(result.expediente.version);
    } else {
      setMensaje({ tipo: "error", texto: result.error ?? "Error al iniciar revisión." });
    }
    setAccionando(null);
  }

  async function handleAprobar() {
    if (!user) return;
    setAccionando("aprobar");
    setMensaje(null);
    const result = await aprobarExpedienteAT(
      id,
      user.id,
      expediente.version,
      notas
    );
    if (result.success && result.expediente) {
      setDetalle((prev) => {
        if (!prev) return prev;
        return { ...prev, expediente: result.expediente! };
      });
      setNotasOriginal(notas);
      setMensaje({ tipo: "success", texto: "Expediente aprobado. Informe Técnico Certilab generado." });
    } else {
      setMensaje({ tipo: "error", texto: result.error ?? "Error al aprobar expediente." });
    }
    setAccionando(null);
  }

  async function handleRechazar() {
    if (!user) return;
    setAccionando("rechazar");
    setMensaje(null);
    const result = await rechazarExpedienteAT(
      id,
      user.id,
      expediente.version,
      notas
    );
    if (result.success && result.expediente) {
      setDetalle((prev) => {
        if (!prev) return prev;
        return { ...prev, expediente: result.expediente! };
      });
      setNotasOriginal(notas);
      setMensaje({ tipo: "success", texto: "Expediente rechazado." });
    } else {
      setMensaje({ tipo: "error", texto: result.error ?? "Error al rechazar expediente." });
    }
    setAccionando(null);
  }

  function handleDiagnosticoCompletado() {
    setDiagnosticoEstado("Completado");
    // Refrescar detalle del expediente para obtener la nueva versión
    obtenerDetalleExpediente(id).then((result) => {
      if (result.data) {
        setDetalle(result.data);
      }
    });
  }

  function handleDiagnosticoGuardado() {
    // Refrescar estado del diagnóstico para obtener la versión actualizada
    obtenerEstadoDiagnostico(id).then((result) => {
      if (result.data) {
        setDiagnosticoEstado(result.data.estado);
        setDiagnosticoVersion(result.data.version);
        setDiagnosticoData(result.data.diagnostico ?? null);
      }
    });
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Cabecera */}
      <div>
        <Link
          href="/at/dashboard"
          className="text-sm text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← Volver a la bandeja técnica
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {expediente.titulo ?? "Revisión Técnica"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {expediente.numero_expediente}
            </p>
          </div>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              pendiente
                ? "bg-yellow-100 text-yellow-800"
                : enRevision
                ? "bg-blue-100 text-blue-800"
                : expediente.estado === "Aprobado"
                ? "bg-green-100 text-green-800"
                : expediente.estado === "Rechazado"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {expediente.estado}
          </span>
        </div>
      </div>

      {/* Mensaje de feedback */}
      {mensaje && (
        <div
          className={`p-4 rounded-md text-sm ${
            mensaje.tipo === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {mensaje.texto}
        </div>
      )}

      {/* Tarjeta: Datos del Cliente */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">
            Datos del Cliente
          </h2>
        </div>
        {cliente ? (
          <dl className="divide-y divide-gray-200">
            <div className="px-6 py-3 grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Nombre</dt>
              <dd className="text-sm text-gray-900 col-span-2">
                {cliente.nombre}
              </dd>
            </div>
            <div className="px-6 py-3 grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="text-sm text-gray-900 col-span-2">
                {cliente.email}
              </dd>
            </div>
            <div className="px-6 py-3 grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Teléfono</dt>
              <dd className="text-sm text-gray-900 col-span-2">
                {cliente.telefono ?? "—"}
              </dd>
            </div>
          </dl>
        ) : (
          <div className="px-6 py-4 text-sm text-gray-500">
            Cliente no disponible.
          </div>
        )}
      </div>

      {/* Tarjeta: Datos del Inmueble */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">
            Datos del Inmueble
          </h2>
        </div>
        {inmueble ? (
          <dl className="divide-y divide-gray-200">
            <div className="px-6 py-3 grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Dirección</dt>
              <dd className="text-sm text-gray-900 col-span-2">
                {inmueble.direccion}
              </dd>
            </div>
            <div className="px-6 py-3 grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Referencia Catastral
              </dt>
              <dd className="text-sm text-gray-900 col-span-2 font-mono">
                {inmueble.referencia_catastral ?? "—"}
              </dd>
            </div>
            <div className="px-6 py-3 grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Tipo</dt>
              <dd className="text-sm text-gray-900 col-span-2 capitalize">
                {inmueble.tipo ?? "—"}
              </dd>
            </div>
          </dl>
        ) : (
          <div className="px-6 py-4 text-sm text-gray-500">
            Inmueble no disponible para este expediente.
          </div>
        )}
      </div>

      {/* Tarjeta: Documentos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Documentos</h2>
          <p className="text-sm text-gray-500 mt-1">
            Documentos subidos por el cliente para su revisión.
          </p>
        </div>
        {documentos.length === 0 ? (
          <div className="px-6 py-4 text-sm text-gray-500">
            No se han subido documentos a este expediente.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {documentos.map((doc) => (
              <li
                key={doc.id}
                className="px-6 py-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {doc.nombre}
                  </p>
                  <p className="text-xs text-gray-500">
                    {doc.tipo} —{" "}
                    {new Date(doc.created_at).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {doc.tipo === "CERTIFICADO_ORIGINAL"
                    ? "Certificado"
                    : doc.tipo === "FOTOGRAFIA"
                    ? "Fotografía"
                    : doc.tipo}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Asistente de Decisión Técnica (solo en revisión) */}
      {enRevision && (
        <AsistenteDecisionTecnica
          expedienteId={id}
          userId={user?.id ?? ""}
          expedienteVersion={diagnosticoVersion}
          estadoInicial={diagnosticoEstado}
          diagnosticoInicial={diagnosticoData}
          onCompletado={handleDiagnosticoCompletado}
          onGuardado={handleDiagnosticoGuardado}
        />
      )}

      {/* Notas Técnicas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">
            Notas Técnicas
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {pendiente
              ? "Escribe tus observaciones antes de iniciar la revisión."
              : enRevision
              ? "Documenta tus hallazgos durante la revisión. Estas notas se incluirán en el Informe Técnico Certilab."
              : "Notas registradas durante la revisión."}
          </p>
        </div>
        <div className="px-6 py-4">
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            disabled={finalizado}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            placeholder={
              pendiente
                ? "Ej: Certificado energético clase D, construido en 1995..."
                : enRevision
                ? "Ej: Se ha verificado la coherencia de los datos del certificado con las fotografías..."
                : "Revisión finalizada."
            }
          />
          {notasModificadas && !finalizado && (
            <p className="text-xs text-amber-600 mt-1">
              Las notas han sido modificadas. Se guardarán al aprobar o rechazar
              el expediente.
            </p>
          )}
        </div>
      </div>

      {/* Acciones del AT */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Acciones</h2>
        </div>
        <div className="px-6 py-4 space-y-4">
          {/* Explicación del estado actual */}
          <p className="text-sm text-gray-600">
            {pendiente &&
              "El expediente está pendiente de documentación. Si ya has revisado los documentos, puedes iniciar la revisión manual."}
            {revisionSinDiagnostico &&
              "El expediente está en revisión manual. Utiliza el Asistente de Decisión Técnica (ADT) para completar el diagnóstico."}
            {revisionEnBorrador &&
              "Estás elaborando el diagnóstico con el ADT. Complétalo antes de aprobar el expediente."}
            {diagnosticoCompletado &&
              "Diagnóstico completado. Puedes aprobar o rechazar el expediente."}
            {finalizado &&
              "Este expediente ha sido finalizado. No se pueden realizar más acciones."}
          </p>

          <div className="flex flex-wrap gap-4">
            {/* Botón: Iniciar Revisión */}
            {puedeIniciar && (
              <button
                onClick={handleIniciarRevision}
                disabled={accionando !== null}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {accionando === "iniciar"
                  ? "Iniciando..."
                  : "Iniciar Revisión"}
              </button>
            )}

            {/* Botón: Aprobar (solo si diagnóstico completado) */}
            {puedeAprobarRechazar && diagnosticoCompletado && (
              <button
                onClick={handleAprobar}
                disabled={accionando !== null}
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {accionando === "aprobar"
                  ? "Aprobando..."
                  : "✓ Aprobar y Generar Informe"}
              </button>
            )}

            {/* Botón: Rechazar (solo si diagnóstico completado) */}
            {puedeAprobarRechazar && diagnosticoCompletado && (
              <button
                onClick={handleRechazar}
                disabled={accionando !== null}
                className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {accionando === "rechazar"
                  ? "Rechazando..."
                  : "✕ Rechazar Expediente"}
              </button>
            )}

            {/* Mensaje informativo cuando no se puede aprobar/rechazar por diagnóstico pendiente */}
            {enRevision && !diagnosticoCompletado && (
              <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-4 py-3 w-full">
                ⚠️ La aprobación o rechazo del expediente requiere completar primero el
                Asistente de Decisión Técnica (ADT) más arriba.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
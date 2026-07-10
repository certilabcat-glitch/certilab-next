"use client";

import type { DictamenTecnico } from "@/types/core/dictamen";
import DictamenStatusBadge from "./DictamenStatusBadge";

/**
 * DictamenView
 *
 * Componente de visualización del dictamen técnico emitido.
 * Muestra el contenido, decisión, diagnóstico base y metadatos de emisión.
 *
 * Uso:
 * - En la página de detalle del expediente del AT (lectura)
 * - En el panel del cliente (lectura, solo si DictamenEntregado)
 *
 * V1 MVP:
 * - Visualización de solo lectura
 * - Sin edición
 * - Sin firma digital
 * - Sin PDF
 */

interface DictamenViewProps {
  dictamen: DictamenTecnico;
  estado: "Emitido" | "Entregado";
  className?: string;
}

export default function DictamenView({
  dictamen,
  estado,
  className = "",
}: DictamenViewProps) {
  const base = dictamen.diagnostico_base;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Cabecera con estado */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Dictamen Técnico
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Emitido por el Arquitecto Técnico
          </p>
        </div>
        <DictamenStatusBadge estado={estado === "Emitido" ? "DictamenEmitido" : "DictamenEntregado"} />
      </div>

      {/* Decisión técnica */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-4">
          Decisión Técnica
        </h4>
        <div className="flex items-center gap-3">
          {dictamen.decision === "conforme" && (
            <>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-emerald-700">Conforme</p>
                <p className="text-sm text-gray-500">
                  El certificado es válido
                </p>
              </div>
            </>
          )}
          {dictamen.decision === "no_conforme" && (
            <>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-red-700">No conforme</p>
                <p className="text-sm text-gray-500">
                  El certificado requiere correcciones
                </p>
              </div>
            </>
          )}
          {dictamen.decision === "pendiente" && (
            <>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-amber-700">Pendiente</p>
                <p className="text-sm text-gray-500">
                  Se necesita más información
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Contenido del dictamen */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-4">
          Contenido del Dictamen
        </h4>
        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {dictamen.contenido}
        </p>
      </div>

      {/* Observaciones (si existen) */}
      {dictamen.observaciones && (
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h4 className="text-sm font-semibold text-blue-900 mb-4">
            Observaciones del AT
          </h4>
          <p className="text-sm text-blue-800 whitespace-pre-wrap leading-relaxed">
            {dictamen.observaciones}
          </p>
        </div>
      )}

      {/* Diagnóstico base */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-4">
            Base del Diagnóstico
          </h4>

          {/* Veredicto y confianza */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">
                Veredicto
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {base.veredicto}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">
                Nivel de Confianza
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {base.nivel_confianza}
              </p>
            </div>
          </div>

          {/* Resumen */}
          <div className="mb-6">
            <p className="text-xs font-medium text-gray-500 uppercase mb-2">
              Resumen
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {base.resumen}
            </p>
          </div>

          {/* Problemas identificados */}
          {base.problemas && base.problemas.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-medium text-gray-500 uppercase mb-3">
                Problemas Identificados
              </p>
              <div className="space-y-3">
                {base.problemas.map((problema, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-red-300 bg-red-50 p-3 rounded"
                  >
                    <p className="font-medium text-sm text-red-900">
                      {problema.nombre}
                    </p>
                    <p className="text-xs text-red-700 mt-1">
                      {problema.descripcion}
                    </p>
                    <p className="text-xs text-red-600 mt-2">
                      <strong>Por qué importa:</strong> {problema.por_que_importa}
                    </p>
                    <p className="text-xs text-red-600 mt-1">
                      <strong>Si no actúas:</strong> {problema.si_no_actuas}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actuaciones propuestas */}
          {base.actuaciones && base.actuaciones.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-medium text-gray-500 uppercase mb-3">
                Actuaciones Propuestas
              </p>
              <div className="space-y-3">
                {base.actuaciones.map((actuacion, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-emerald-300 bg-emerald-50 p-3 rounded"
                  >
                    <p className="font-medium text-sm text-emerald-900">
                      {actuacion.nombre}
                    </p>
                    <p className="text-xs text-emerald-700 mt-1">
                      {actuacion.descripcion}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                      <div>
                        <span className="text-emerald-600 font-medium">
                          Inversión:
                        </span>{" "}
                        <span className="text-emerald-700">
                          €{actuacion.inversion_estimada.toLocaleString("es-ES")}
                        </span>
                      </div>
                      <div>
                        <span className="text-emerald-600 font-medium">
                          Ahorro anual:
                        </span>{" "}
                        <span className="text-emerald-700">
                          €{actuacion.ahorro_anual.toLocaleString("es-ES")}
                        </span>
                      </div>
                      <div>
                        <span className="text-emerald-600 font-medium">
                          Payback:
                        </span>{" "}
                        <span className="text-emerald-700">
                          {actuacion.payback.toFixed(1)} años
                        </span>
                      </div>
                      <div>
                        <span className="text-emerald-600 font-medium">
                          Veredicto:
                        </span>{" "}
                        <span className="text-emerald-700">
                          {actuacion.veredicto}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Análisis económico */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-xs font-medium text-gray-500 uppercase">
                Coste Actual
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                €{base.coste_actual.toLocaleString("es-ES")}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-xs font-medium text-gray-500 uppercase">
                Coste Tras Mejoras
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                €{base.coste_tras_mejoras.toLocaleString("es-ES")}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-xs font-medium text-gray-500 uppercase">
                Ahorro Total
              </p>
              <p className="text-sm font-semibold text-emerald-600 mt-1">
                €{base.ahorro_total.toLocaleString("es-ES")}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-xs font-medium text-gray-500 uppercase">
                Impacto en Reventa
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {base.impacto_reventa}
              </p>
            </div>
          </div>

          {/* Coste de inacción */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded">
            <p className="text-xs font-medium text-amber-900 uppercase mb-2">
              Coste de Inacción
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-amber-700 font-medium">1 año:</span>
                <p className="text-amber-600">
                  €{base.coste_inaccion_1a.toLocaleString("es-ES")}
                </p>
              </div>
              <div>
                <span className="text-amber-700 font-medium">5 años:</span>
                <p className="text-amber-600">
                  €{base.coste_inaccion_5a.toLocaleString("es-ES")}
                </p>
              </div>
              <div>
                <span className="text-amber-700 font-medium">10 años:</span>
                <p className="text-amber-600">
                  €{base.coste_inaccion_10a.toLocaleString("es-ES")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Riesgo regulatorio */}
        {base.riesgo_regulatorio && (
          <div className="border-t border-gray-200 pt-6">
            <p className="text-xs font-medium text-gray-500 uppercase mb-2">
              Riesgo Regulatorio
            </p>
            <p className="text-sm text-gray-700">{base.riesgo_regulatorio}</p>
          </div>
        )}

        {/* Observaciones del AT */}
        {base.observaciones_at && (
          <div className="border-t border-gray-200 pt-6">
            <p className="text-xs font-medium text-gray-500 uppercase mb-2">
              Observaciones Técnicas
            </p>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {base.observaciones_at}
            </p>
          </div>
        )}
      </div>

      {/* Metadatos de emisión */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-xs text-gray-600">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-gray-700">Emitido por</p>
            <p className="text-gray-600 mt-1">{dictamen.emitido_por}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Fecha de emisión</p>
            <p className="text-gray-600 mt-1">
              {new Date(dictamen.emitido_en).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          {dictamen.entregado_en && (
            <>
              <div>
                <p className="font-medium text-gray-700">Entregado a</p>
                <p className="text-gray-600 mt-1">{dictamen.entregado_a}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Fecha de entrega</p>
                <p className="text-gray-600 mt-1">
                  {new Date(dictamen.entregado_en).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </>
          )}
          <div>
            <p className="font-medium text-gray-700">Versión</p>
            <p className="text-gray-600 mt-1">{dictamen.version}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

DictamenView.displayName = "DictamenView";

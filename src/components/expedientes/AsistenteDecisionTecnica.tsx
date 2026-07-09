"use client";

import { useState, useCallback } from "react";
import type {
  DiagnosticoCompleto,
  ProblemaDiagnostico,
  ActuacionDiagnostico,
  VeredictoGlobal,
  NivelConfianza,
  EstadoDiagnostico,
  CategoriaProblema,
  VeredictoRetorno,
} from "@/types/core/diagnostico";
import {
  iniciarDiagnostico,
  guardarBorradorDiagnostico,
  completarDiagnostico,
} from "@/lib/actions/diagnostico";

// ============================================================
// Constantes (adaptadas al modelo de dominio real)
// ============================================================

const VEREDICTOS: VeredictoGlobal[] = [
  "Buena",
  "Regular",
  "Mejorable",
  "Deficiente",
];

const NIVELES_CONFIANZA: NivelConfianza[] = ["Alto", "Medio", "Bajo"];

const CATEGORIAS_PROBLEMA: { value: CategoriaProblema; label: string }[] = [
  { value: "critico", label: "Crítico" },
  { value: "importante", label: "Importante" },
  { value: "mejora", label: "Mejora" },
];

const VEREDICTOS_RETORNO: { value: VeredictoRetorno; label: string }[] = [
  { value: "merece", label: "Merece la pena" },
  { value: "valoralo", label: "Valóralo" },
  { value: "no_recomendado", label: "No recomendado" },
];

type WizardStep = "welcome" | 1 | 2 | 3 | 4 | 5 | 6;

// ============================================================
// Props
// ============================================================

interface AsistenteDecisionTecnicaProps {
  expedienteId: string;
  userId: string;
  expedienteVersion: number;
  estadoInicial: EstadoDiagnostico;
  diagnosticoInicial: DiagnosticoCompleto | null;
  onCompletado: () => void;
  onGuardado: () => void;
}

// ============================================================
// Helper: crear DiagnosticoCompleto vacío por defecto
// ============================================================

function crearDiagnosticoVacio(): DiagnosticoCompleto {
  return {
    veredicto: "Regular",
    nivel_confianza: "Medio",
    resumen: "",
    problemas: [],
    actuaciones: [],
    ahorro_total: 0,
    coste_actual: 0,
    coste_tras_mejoras: 0,
    coste_inaccion_1a: 0,
    coste_inaccion_5a: 0,
    coste_inaccion_10a: 0,
    impacto_reventa: "",
    riesgo_regulatorio: "",
    observaciones_at: "",
  };
}

// ============================================================
// Componente Principal
// ============================================================

export default function AsistenteDecisionTecnica({
  expedienteId,
  userId,
  expedienteVersion,
  estadoInicial,
  diagnosticoInicial,
  onCompletado,
  onGuardado,
}: AsistenteDecisionTecnicaProps) {
  const [step, setStep] = useState<WizardStep>(
    estadoInicial === "SinDiagnostico" ? "welcome" : 1
  );
  const [estado, setEstado] = useState<EstadoDiagnostico>(estadoInicial);
  const [version, setVersion] = useState(expedienteVersion);
  const [d, setD] = useState<DiagnosticoCompleto>(
    diagnosticoInicial ?? crearDiagnosticoVacio()
  );
  const [accionando, setAccionando] = useState(false);
  const [mensaje, setMensaje] = useState<{
    tipo: "success" | "error" | "info";
    texto: string;
  } | null>(null);
  const [erroresValidacion, setErroresValidacion] = useState<string[]>([]);

  // ============================================================
  // Helpers
  // ============================================================

  const mostrarMensaje = useCallback(
    (tipo: "success" | "error" | "info", texto: string) => {
      setMensaje({ tipo, texto });
      setTimeout(() => setMensaje(null), 5000);
    },
    []
  );

  const actualizarD = useCallback(
    <K extends keyof DiagnosticoCompleto>(
      key: K,
      value: DiagnosticoCompleto[K]
    ) => {
      setD((prev) => ({ ...prev, [key]: value }));
      setErroresValidacion([]);
    },
    []
  );

  // ============================================================
  // Iniciar diagnóstico
  // ============================================================

  async function handleIniciar() {
    setAccionando(true);
    setMensaje(null);
    const result = await iniciarDiagnostico(expedienteId, userId, version);
    if (result.success && result.state) {
      setEstado("Borrador");
      setVersion(result.state.version);
      if (result.state.diagnostico) setD(result.state.diagnostico);
      setStep(1);
      mostrarMensaje(
        "success",
        "Diagnóstico iniciado. Puedes guardar tu progreso en cualquier momento."
      );
    } else {
      mostrarMensaje("error", result.error ?? "Error al iniciar el diagnóstico.");
    }
    setAccionando(false);
  }

  // ============================================================
  // Guardar borrador
  // ============================================================

  async function handleGuardarBorrador() {
    setAccionando(true);
    setMensaje(null);
    const result = await guardarBorradorDiagnostico(
      expedienteId,
      userId,
      version,
      d
    );
    if (result.success && result.newVersion != null) {
      setVersion(result.newVersion);
      mostrarMensaje("success", "Borrador guardado correctamente.");
      onGuardado();
    } else {
      mostrarMensaje("error", result.error ?? "Error al guardar borrador.");
    }
    setAccionando(false);
  }

  // ============================================================
  // Completar diagnóstico
  // ============================================================

  async function handleCompletar() {
    setAccionando(true);
    setMensaje(null);
    setErroresValidacion([]);
    const result = await completarDiagnostico(expedienteId, userId, version, d);
    if (result.success) {
      setEstado("Completado");
      mostrarMensaje("success", "Diagnóstico completado correctamente.");
      onCompletado();
    } else {
      if (result.errores_validacion) {
        setErroresValidacion(result.errores_validacion);
      }
      mostrarMensaje("error", result.error ?? "Error al completar diagnóstico.");
    }
    setAccionando(false);
  }

  // ============================================================
  // Problemas
  // ============================================================

  function handleAgregarProblema() {
    const nuevo: ProblemaDiagnostico = {
      id: crypto.randomUUID(),
      nombre: "",
      categoria: "importante",
      descripcion: "",
      por_que_importa: "",
      si_no_actuas: "",
      nivel_confianza: "Medio",
      actuacion_asociada: "",
    };
    actualizarD("problemas", [...d.problemas, nuevo]);
  }

  function handleActualizarProblema(
    index: number,
    campo: keyof ProblemaDiagnostico,
    valor: string
  ) {
    const problemas = [...d.problemas];
    problemas[index] = { ...problemas[index], [campo]: valor };
    actualizarD("problemas", problemas);
  }

  function handleEliminarProblema(index: number) {
    actualizarD(
      "problemas",
      d.problemas.filter((_, i) => i !== index)
    );
  }

  // ============================================================
  // Actuaciones
  // ============================================================

  function handleAgregarActuacion() {
    const nueva: ActuacionDiagnostico = {
      id: crypto.randomUUID(),
      posicion: d.actuaciones.length + 1,
      nombre: "",
      inversion_estimada: 0,
      ahorro_anual: 0,
      veredicto: "valoralo",
      payback: 0,
      descripcion: "",
      justificacion_posicion: "",
      nivel_confianza_ahorro: "Medio",
      vida_util: 0,
      veredicto_detalle: "",
    };
    actualizarD("actuaciones", [...d.actuaciones, nueva]);
  }

  function handleActualizarActuacionText(
    index: number,
    campo: keyof ActuacionDiagnostico,
    valor: string
  ) {
    const actuaciones = [...d.actuaciones];
    (actuaciones[index] as unknown as Record<string, unknown>)[campo] = valor;
    actualizarD("actuaciones", actuaciones);
  }

  function handleActualizarActuacionNum(
    index: number,
    campo: keyof ActuacionDiagnostico,
    valor: number
  ) {
    const actuaciones = [...d.actuaciones];
    (actuaciones[index] as unknown as Record<string, unknown>)[campo] = valor;
    actualizarD("actuaciones", actuaciones);
  }

  function handleEliminarActuacion(index: number) {
    const nuevas = d.actuaciones.filter((_, i) => i !== index);
    // Recalcular posiciones
    const reindexadas = nuevas.map((a, i) => ({ ...a, posicion: i + 1 }));
    actualizarD("actuaciones", reindexadas);
  }

  // ============================================================
  // Navegación: validación antes de avanzar
  // ============================================================

   function canAvanzarStep(current: number): boolean {
     switch (current) {
       case 1:
         return (
           d.problemas.length > 0 &&
           d.problemas.every((p) => p.nombre?.trim() && p.descripcion?.trim())
         );
       case 2:
         return (
           d.actuaciones.length > 0 &&
           d.actuaciones.every((a) => a.nombre?.trim() && a.descripcion?.trim())
         );
       case 3:
         // Paso 3 es opcional: el usuario puede continuar sin información económica
         return true;
       case 4:
         return true; // veredicto siempre tiene valor por defecto
       case 5:
         return d.resumen?.trim().length >= 10;
       default:
         return true;
     }
   }

  // ============================================================
  // Render: Welcome
  // ============================================================

  if (step === "welcome") {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-6 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Asistente de Decisión Técnica
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto text-sm">
            Este asistente te guiará paso a paso para construir el diagnóstico
            energético del inmueble. Al finalizar, el diagnóstico quedará
            registrado y podrás proceder con la aprobación del expediente.
          </p>

          <div className="text-left max-w-md mx-auto mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Pasos del asistente:
            </h3>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
              <li>Identificar problemas energéticos</li>
              <li>Proponer actuaciones de mejora</li>
              <li>Evaluar impacto económico</li>
              <li>Determinar veredicto global</li>
              <li>Redactar resumen ejecutivo</li>
              <li>Revisión final y completar diagnóstico</li>
            </ol>
          </div>

          <button
            onClick={handleIniciar}
            disabled={accionando}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {accionando ? "Iniciando..." : "Comenzar Diagnóstico"}
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // Render: Steps 1-6
  // ============================================================

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Barra de progreso */}
      <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">
            Asistente de Decisión Técnica
          </h2>
          <span className="text-sm text-gray-500">
            Paso {String(step)} de 6
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                (typeof step === "number" ? step : 6) / 6 * 100
              }%`,
            }}
          />
        </div>
      </div>

      {/* Mensaje */}
      {mensaje && (
        <div
          className={`mx-6 mt-4 p-3 rounded-md text-sm ${
            mensaje.tipo === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : mensaje.tipo === "error"
              ? "bg-red-50 text-red-800 border border-red-200"
              : "bg-blue-50 text-blue-800 border border-blue-200"
          }`}
        >
          {mensaje.texto}
        </div>
      )}

      {/* Errores de validación */}
      {erroresValidacion.length > 0 && (
        <div className="mx-6 mt-4 p-3 rounded-md bg-red-50 border border-red-200">
          <p className="text-sm font-medium text-red-800 mb-1">
            Errores de validación:
          </p>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-0.5">
            {erroresValidacion.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="px-6 py-4 space-y-6">
        {/* ========================================================== */}
        {/* Paso 1: Problemas */}
        {/* ========================================================== */}
        {step === 1 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Identificar problemas energéticos
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Describe los problemas detectados en el certificado energético y
              la documentación aportada.
            </p>

            {d.problemas.map((problema, index) => (
              <div
                key={problema.id}
                className="border border-gray-200 rounded-lg p-4 mb-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    Problema #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleEliminarProblema(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Eliminar
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre del problema *
                    </label>
                    <input
                      type="text"
                      value={problema.nombre}
                      onChange={(e) =>
                        handleActualizarProblema(index, "nombre", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ej: Filtraciones en cubierta"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoría *
                    </label>
                    <select
                      value={problema.categoria}
                      onChange={(e) =>
                        handleActualizarProblema(index, "categoria", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {CATEGORIAS_PROBLEMA.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción *
                    </label>
                    <textarea
                      value={problema.descripcion}
                      onChange={(e) =>
                        handleActualizarProblema(
                          index,
                          "descripcion",
                          e.target.value
                        )
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe el problema detectado..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ¿Por qué es importante? *
                    </label>
                    <textarea
                      value={problema.por_que_importa}
                      onChange={(e) =>
                        handleActualizarProblema(
                          index,
                          "por_que_importa",
                          e.target.value
                        )
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Explica el impacto de este problema..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ¿Qué pasa si no se actúa?
                    </label>
                    <textarea
                      value={problema.si_no_actuas}
                      onChange={(e) =>
                        handleActualizarProblema(
                          index,
                          "si_no_actuas",
                          e.target.value
                        )
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Consecuencias de no resolverlo..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nivel de confianza *
                    </label>
                    <select
                      value={problema.nivel_confianza}
                      onChange={(e) =>
                        handleActualizarProblema(
                          index,
                          "nivel_confianza",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {NIVELES_CONFIANZA.map((nc) => (
                        <option key={nc} value={nc}>
                          {nc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Actuación asociada
                    </label>
                    <input
                      type="text"
                      value={problema.actuacion_asociada}
                      onChange={(e) =>
                        handleActualizarProblema(
                          index,
                          "actuacion_asociada",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nombre de la actuación que lo resuelve"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAgregarProblema}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              + Añadir problema
            </button>
          </div>
        )}

        {/* ========================================================== */}
        {/* Paso 2: Actuaciones */}
        {/* ========================================================== */}
        {step === 2 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Proponer actuaciones de mejora
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Para cada problema identificado, propón una o más actuaciones
              con su análisis de retorno de inversión.
            </p>

            {d.actuaciones.map((actuacion, index) => (
              <div
                key={actuacion.id}
                className="border border-gray-200 rounded-lg p-4 mb-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    Actuación #{actuacion.posicion}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleEliminarActuacion(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Eliminar
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de la actuación *
                    </label>
                    <input
                      type="text"
                      value={actuacion.nombre}
                      onChange={(e) =>
                        handleActualizarActuacionText(
                          index,
                          "nombre",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ej: Aislamiento de fachada con SATE"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción *
                    </label>
                    <textarea
                      value={actuacion.descripcion}
                      onChange={(e) =>
                        handleActualizarActuacionText(
                          index,
                          "descripcion",
                          e.target.value
                        )
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe en qué consiste la actuación..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Inversión estimada (€) *
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={actuacion.inversion_estimada}
                      onChange={(e) =>
                        handleActualizarActuacionNum(
                          index,
                          "inversion_estimada",
                          Number(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ahorro anual estimado (€) *
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={actuacion.ahorro_anual}
                      onChange={(e) =>
                        handleActualizarActuacionNum(
                          index,
                          "ahorro_anual",
                          Number(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payback (años)
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={0.1}
                      value={actuacion.payback}
                      onChange={(e) =>
                        handleActualizarActuacionNum(
                          index,
                          "payback",
                          Number(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vida útil (años)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={actuacion.vida_util}
                      onChange={(e) =>
                        handleActualizarActuacionNum(
                          index,
                          "vida_util",
                          Number(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Veredicto de retorno *
                    </label>
                    <select
                      value={actuacion.veredicto}
                      onChange={(e) =>
                        handleActualizarActuacionText(
                          index,
                          "veredicto",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {VEREDICTOS_RETORNO.map((v) => (
                        <option key={v.value} value={v.value}>
                          {v.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nivel de confianza del ahorro *
                    </label>
                    <select
                      value={actuacion.nivel_confianza_ahorro}
                      onChange={(e) =>
                        handleActualizarActuacionText(
                          index,
                          "nivel_confianza_ahorro",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {NIVELES_CONFIANZA.map((nc) => (
                        <option key={nc} value={nc}>
                          {nc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Justificación de la posición *
                    </label>
                    <textarea
                      value={actuacion.justificacion_posicion}
                      onChange={(e) =>
                        handleActualizarActuacionText(
                          index,
                          "justificacion_posicion",
                          e.target.value
                        )
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Explica por qué esta actuación ocupa esta posición en la priorización..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Detalle del veredicto
                    </label>
                    <textarea
                      value={actuacion.veredicto_detalle}
                      onChange={(e) =>
                        handleActualizarActuacionText(
                          index,
                          "veredicto_detalle",
                          e.target.value
                        )
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Explica por qué se ha determinado este veredicto..."
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAgregarActuacion}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              + Añadir actuación
            </button>
          </div>
        )}

        {/* ========================================================== */}
        {/* Paso 3: Impacto económico */}
        {/* ========================================================== */}
        {step === 3 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Evaluar impacto económico
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Indica los costes energéticos actuales y proyectados tras las
              mejoras.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coste energético anual actual (€) *
                </label>
                <input
                  type="number"
                  min={0}
                  value={d.coste_actual}
                  onChange={(e) =>
                    actualizarD("coste_actual", Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coste tras mejoras (€) *
                </label>
                <input
                  type="number"
                  min={0}
                  value={d.coste_tras_mejoras}
                  onChange={(e) =>
                    actualizarD("coste_tras_mejoras", Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ahorro total estimado (€)
                </label>
                <input
                  type="number"
                  min={0}
                  value={d.ahorro_total}
                  onChange={(e) =>
                    actualizarD("ahorro_total", Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2 border-t border-gray-200 pt-4 mt-2">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Coste de la inacción
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      A 1 año (€)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={d.coste_inaccion_1a}
                      onChange={(e) =>
                        actualizarD("coste_inaccion_1a", Number(e.target.value))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      A 5 años (€)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={d.coste_inaccion_5a}
                      onChange={(e) =>
                        actualizarD("coste_inaccion_5a", Number(e.target.value))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      A 10 años (€)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={d.coste_inaccion_10a}
                      onChange={(e) =>
                        actualizarD("coste_inaccion_10a", Number(e.target.value))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Impacto en reventa
                </label>
                <input
                  type="text"
                  value={d.impacto_reventa}
                  onChange={(e) => actualizarD("impacto_reventa", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: +5% valor de mercado"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Riesgo regulatorio
                </label>
                <input
                  type="text"
                  value={d.riesgo_regulatorio}
                  onChange={(e) =>
                    actualizarD("riesgo_regulatorio", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: No cumple CTE DB-HE 2019"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* Paso 4: Veredicto Global — la conclusión */}
        {/* ========================================================== */}
        {step === 4 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Determinar veredicto global
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Basándote en los problemas identificados y las actuaciones
              propuestas, determina el veredicto global del estado energético
              del inmueble.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Veredicto global *
                </label>
                <div className="space-y-2">
                  {VEREDICTOS.map((v) => (
                    <label
                      key={v}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        d.veredicto === v
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="veredicto"
                        value={v}
                        checked={d.veredicto === v}
                        onChange={(e) =>
                          actualizarD(
                            "veredicto",
                            e.target.value as VeredictoGlobal
                          )
                        }
                        className="mr-3"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-900">
                          {v}
                        </span>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {v === "Buena" &&
                            "Situación energética favorable, consumo contenido"}
                          {v === "Regular" &&
                            "Rendimiento medio, hay margen de mejora"}
                          {v === "Mejorable" &&
                            "Rendimiento bajo, mejoras recomendadas"}
                          {v === "Deficiente" &&
                            "Rendimiento crítico, actuaciones necesarias"}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nivel de confianza global *
                </label>
                <div className="space-y-2">
                  {NIVELES_CONFIANZA.map((nc) => (
                    <label
                      key={nc}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        d.nivel_confianza === nc
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="nivel_confianza"
                        value={nc}
                        checked={d.nivel_confianza === nc}
                        onChange={(e) =>
                          actualizarD(
                            "nivel_confianza",
                            e.target.value as NivelConfianza
                          )
                        }
                        className="mr-3"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {nc}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* Paso 5: Resumen */}
        {/* ========================================================== */}
        {step === 5 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Redactar resumen ejecutivo
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Sintetiza el diagnóstico en un resumen claro para el cliente.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resumen ejecutivo *
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Explica la situación energética del inmueble, los principales
                  problemas y las actuaciones recomendadas. Mínimo 10 caracteres.
                </p>
                <textarea
                  value={d.resumen}
                  onChange={(e) => actualizarD("resumen", e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="El inmueble presenta..."
                />
                <p className="text-xs text-gray-400 mt-1">
                  {d.resumen.length} caracteres
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observaciones del AT
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Notas internas. No se muestran al cliente en el informe final.
                </p>
                <textarea
                  value={d.observaciones_at}
                  onChange={(e) =>
                    actualizarD("observaciones_at", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Notas internas..."
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* Paso 6: Revisión final */}
        {/* ========================================================== */}
        {step === 6 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Revisión final
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Revisa el diagnóstico completo antes de finalizar. Una vez
              completado, no podrá modificarse sin iniciar una nueva revisión.
            </p>

            <div className="space-y-4 border border-gray-200 rounded-lg p-4">
              {/* Problemas */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Problemas identificados ({d.problemas.length})
                </h4>
                {d.problemas.length === 0 ? (
                  <p className="text-sm text-gray-400">Ninguno</p>
                ) : (
                  <ul className="space-y-1">
                    {d.problemas.map((p, i) => (
                      <li
                        key={p.id}
                        className="text-sm text-gray-600 flex items-start gap-2"
                      >
                        <span className="text-blue-500 mt-0.5">•</span>
                        <div>
                          <span className="font-medium">{p.nombre}</span>
                          <span className="text-gray-400">
                            {" "}
                            — {p.categoria}
                          </span>
                          <span
                            className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                              p.nivel_confianza === "Alto"
                                ? "bg-green-100 text-green-700"
                                : p.nivel_confianza === "Medio"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {p.nivel_confianza}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Actuaciones */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Actuaciones propuestas ({d.actuaciones.length})
                </h4>
                {d.actuaciones.length === 0 ? (
                  <p className="text-sm text-gray-400">Ninguna</p>
                ) : (
                  <ul className="space-y-2">
                    {d.actuaciones.map((a) => (
                      <li
                        key={a.id}
                        className="text-sm text-gray-600 flex items-start gap-2"
                      >
                        <span className="text-green-500 mt-0.5">•</span>
                        <div>
                          <span className="font-medium">{a.nombre}</span>
                          <span className="text-gray-400">
                            {" "}
                            — Inv: {a.inversion_estimada.toLocaleString()}€ | 
                            Ahorro: {a.ahorro_anual.toLocaleString()}€/año | 
                            Payback: {a.payback > 0 ? `${a.payback.toFixed(1)} años` : "N/A"}
                          </span>
                          <span
                            className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                              a.veredicto === "merece"
                                ? "bg-green-100 text-green-700"
                                : a.veredicto === "valoralo"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {VEREDICTOS_RETORNO.find((v) => v.value === a.veredicto)?.label ?? a.veredicto}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Económico */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Impacto económico
                </h4>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="text-gray-500">Coste actual:</dt>
                  <dd className="text-gray-900 font-medium">
                    {d.coste_actual.toLocaleString()} €
                  </dd>
                  <dt className="text-gray-500">Coste tras mejoras:</dt>
                  <dd className="text-gray-900 font-medium">
                    {d.coste_tras_mejoras.toLocaleString()} €
                  </dd>
                  <dt className="text-gray-500">Ahorro total:</dt>
                  <dd className="text-green-700 font-medium">
                    {d.ahorro_total.toLocaleString()} €
                  </dd>
                </dl>
              </div>

              {/* Veredicto */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Veredicto global
                </h4>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      d.veredicto === "Buena"
                        ? "bg-green-100 text-green-800"
                        : d.veredicto === "Regular"
                        ? "bg-yellow-100 text-yellow-800"
                        : d.veredicto === "Mejorable"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {d.veredicto}
                  </span>
                  <span className="text-sm text-gray-500">
                    Confianza: {d.nivel_confianza}
                  </span>
                </div>
              </div>

              {/* Resumen */}
              {d.resumen && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    Resumen ejecutivo
                  </h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {d.resumen}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* Navegación */}
        {/* ========================================================== */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div>
            {typeof step === "number" && step > 1 && (
              <button
                type="button"
                onClick={() => setStep((step - 1) as WizardStep)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                ← Anterior
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Guardar borrador */}
            {estado === "Borrador" && (
              <button
                type="button"
                onClick={handleGuardarBorrador}
                disabled={accionando}
                className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                {accionando ? "Guardando..." : "Guardar borrador"}
              </button>
            )}

            {/* Siguiente / Completar */}
            {typeof step === "number" && step < 6 ? (
              <button
                type="button"
                onClick={() => {
                  if (canAvanzarStep(step)) {
                    setStep((step + 1) as WizardStep);
                  } else {
                    mostrarMensaje(
                      "info",
                      step === 1
                        ? "Debes añadir al menos un problema con nombre y descripción."
                        : step === 2
                        ? "Debes añadir al menos una actuación con nombre y descripción."
                        : step === 3
                        ? "El coste energético actual debe ser mayor que 0."
                        : "El resumen ejecutivo debe tener al menos 10 caracteres."
                    );
                  }
                }}
                className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Siguiente →
              </button>
            ) : typeof step === "number" && step === 6 ? (
              <button
                type="button"
                onClick={handleCompletar}
                disabled={accionando || estado === "Completado"}
                className="px-6 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {accionando
                  ? "Completando..."
                  : estado === "Completado"
                  ? "Diagnóstico completado"
                  : "Completar diagnóstico"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
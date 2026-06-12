"use client";

import { useState, useRef } from "react";
import {
  validarCoherencia,
  validarFecha,
  generarAlertasPersonales,
  type Semaforo,
  type Alerta,
} from "@/lib/validacion-energetica";
import styles from "./ComprobadorEnergetico.module.css";

type Camino = "seleccion" | "pdf" | "papel";
type Paso =
  | "elegir"
  | "certificado"
  | "contexto"
  | "lead"
  | "alertas"
  | "cta";

interface DatosCertificado {
  letra: string;
  consumo: number | null;
  emisiones: number | null;
  fecha: string | null;
  semaforo: Semaforo;
  mensajeValidacion: string;
  fechaValida: boolean;
  fechaMensaje: string;
}

interface DatosContexto {
  gastoMensual: number | null;
  codigoPostal: string;
}

const PASOS = [
  { key: "certificado", label: "Certificado" },
  { key: "contexto", label: "Contexto" },
  { key: "lead", label: "Email" },
  { key: "alertas", label: "Alertas" },
  { key: "cta", label: "Solución" },
] as const;

export default function ComprobadorEnergetico() {
  // Flujo maestro
  const [paso, setPaso] = useState<Paso>("elegir");
  const [camino, setCamino] = useState<Camino>("seleccion");

  // Datos recogidos
  const [certificado, setCertificado] = useState<DatosCertificado | null>(null);
  const [contexto, setContexto] = useState<DatosContexto>({
    gastoMensual: null,
    codigoPostal: "",
  });
  const [lead, setLead] = useState({ nombre: "", email: "" });
  const [leadSent, setLeadSent] = useState(false);
  const [alertas, setAlertas] = useState<Alerta[]>([]);

  // UI states
  const [loading, setLoading] = useState(false);
  const [sendingLead, setSendingLead] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado para el camino papel
  const [papelLetra, setPapelLetra] = useState("D");
  const [papelConsumo, setPapelConsumo] = useState("");
  const [papelEmisiones, setPapelEmisiones] = useState("");

  // Estado para formulario contexto
  const [ctxGasto, setCtxGasto] = useState("");
  const [ctxCP, setCtxCP] = useState("");

  // ====== RESETEAR ======
  function resetear() {
    setPaso("elegir");
    setCamino("seleccion");
    setCertificado(null);
    setContexto({ gastoMensual: null, codigoPostal: "" });
    setLead({ nombre: "", email: "" });
    setLeadSent(false);
    setAlertas([]);
    setLoading(false);
    setSendingLead(false);
    setPapelLetra("D");
    setPapelConsumo("");
    setPapelEmisiones("");
    setCtxGasto("");
    setCtxCP("");
  }

  // ====== PASO: ELEGIR => certificado ======
  function irACertificado(caminoElegido: Camino) {
    setCamino(caminoElegido);
    setPaso("certificado");
  }

  // ====== PASO: PROCESAR CERTIFICADO ======
  function procesarResultadoValidacion(
    letra: string,
    consumo: number | null,
    emisiones: number | null,
    fecha: string | null
  ) {
    const validacion = validarCoherencia(letra, consumo, emisiones);
    const fechaResult = fecha ? validarFecha(fecha) : { valida: true, mensaje: "" };

    const mensajeFinal = !fechaResult.valida
      ? validacion.mensaje + " | " + fechaResult.mensaje
      : validacion.mensaje;
    const fechaValida = fechaResult.valida;
    const fechaMensaje = fechaResult.mensaje;

    setCertificado({
      letra,
      consumo,
      emisiones,
      fecha,
      semaforo: validacion.semaforo,
      mensajeValidacion: mensajeFinal,
      fechaValida,
      fechaMensaje,
    });

    // Avanzar al paso de contexto
    setPaso("contexto");
  }

  // ====== CAMINO PDF ======
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/extraer-certificado", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.imagePdf) {
          // PDF es imagen escaneada → redirigir a papel
          setCamino("papel");
          setPaso("certificado");
          setLoading(false);
          return;
        }
        // Error real
        setCertificado({
          letra: "D",
          consumo: null,
          emisiones: null,
          fecha: null,
          semaforo: "rojo",
          mensajeValidacion: data.error || "Error al procesar el PDF.",
          fechaValida: true,
          fechaMensaje: "",
        });
        setPaso("contexto");
        setLoading(false);
        return;
      }

      procesarResultadoValidacion(
        data.letra,
        data.consumo,
        data.emisiones,
        data.fecha || null
      );
    } catch {
      setCertificado({
        letra: "D",
        consumo: null,
        emisiones: null,
        fecha: null,
        semaforo: "rojo",
        mensajeValidacion: "Error de conexión. Inténtalo de nuevo.",
        fechaValida: true,
        fechaMensaje: "",
      });
      setPaso("contexto");
    }

    setLoading(false);
  }

  // ====== CAMINO PAPEL ======
  function handlePapelSubmit(e: React.FormEvent) {
    e.preventDefault();
    const consumo = papelConsumo ? parseFloat(papelConsumo.replace(",", ".")) : null;
    const emisiones = papelEmisiones ? parseFloat(papelEmisiones.replace(",", ".")) : null;
    procesarResultadoValidacion(papelLetra, consumo, emisiones, null);
  }

  // ====== PASO: CONTEXTO ======
  function handleContextoSubmit(e: React.FormEvent) {
    e.preventDefault();
    const gasto = ctxGasto ? parseFloat(ctxGasto.replace(",", ".")) : null;
    const cp = ctxCP.trim();
    setContexto({ gastoMensual: gasto, codigoPostal: cp });
    setPaso("lead");
  }

  // ====== PASO: LEAD ======
  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!lead.email) return;

    setSendingLead(true);

    try {
      await fetch("/api/capturar-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: lead.nombre,
          email: lead.email,
          origen: "comprobador-energetico",
          letra: certificado?.letra,
          consumo: certificado?.consumo,
          emisiones: certificado?.emisiones,
          resultado: certificado?.semaforo,
          gastoMensual: contexto.gastoMensual,
          codigoPostal: contexto.codigoPostal,
        }),
      });
    } catch {
      // Silencioso
    }

    setLeadSent(true);
    setSendingLead(false);

    // Generar alertas
    if (certificado) {
      const nuevasAlertas = generarAlertasPersonales({
        letra: certificado.letra,
        consumo: certificado.consumo,
        fecha: certificado.fecha,
        gastoMensual: contexto.gastoMensual,
        codigoPostal: contexto.codigoPostal,
      });
      setAlertas(nuevasAlertas);
    }

    setPaso("alertas");
  }

  // ====== RENDER ======

  /** Barra de progreso (pasos 1-5) */
  function renderProgress() {
    const numPaso = PASOS.findIndex((p) => p.key === paso) + 1;
    const enProgreso = ["certificado", "contexto", "lead", "alertas", "cta"].includes(paso);

    if (!enProgreso) return null;

    return (
      <div className={styles.progressBar}>
        {PASOS.map((p, i) => {
          const idx = i + 1;
          const activo = ["certificado", "contexto", "lead", "alertas", "cta"]
            .slice(i)
            .includes(paso);
          const completado = numPaso > idx;
          return (
            <div
              key={p.key}
              className={`${styles.progressStep} ${
                activo || completado ? styles.progressActive : ""
              } ${completado ? styles.progressDone : ""}`}
            >
              <span className={styles.progressNum}>{completado ? "✓" : idx}</span>
              <span className={styles.progressLabel}>{p.label}</span>
            </div>
          );
        })}
      </div>
    );
  }

  // ===== PASO 0: ELEGIR =====
  if (paso === "elegir") {
    return (
      <section className={styles.container}>
        <h2 className={styles.subtitle}>¿Cómo tienes tu certificado?</h2>
        <div className={styles.botones}>
          <button
            className={`${styles.btn} ${styles.btnPdf}`}
            onClick={() => irACertificado("pdf")}
          >
            <span className={styles.btnIcon}>&#128196;</span>
            <span className={styles.btnLabel}>Tengo el PDF</span>
            <span className={styles.btnDesc}>Sube el archivo y lo analizamos</span>
          </button>
          <button
            className={`${styles.btn} ${styles.btnPapel}`}
            onClick={() => irACertificado("papel")}
          >
            <span className={styles.btnIcon}>&#9997;</span>
            <span className={styles.btnLabel}>Lo tengo en papel</span>
            <span className={styles.btnDesc}>Introduce los datos manualmente</span>
          </button>
        </div>
        <p className={styles.aviso}>
          Esta comprobación es orientativa y no sustituye una verificación oficial.
          No almacenamos los certificados sin tu permiso.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      {renderProgress()}

      <button className={styles.backBtn} onClick={resetear}>
        ← Volver al inicio
      </button>

      {/* ===== PASO 1: CERTIFICADO ===== */}
      {paso === "certificado" && camino === "pdf" && !loading && (
        <div className={styles.pdfUpload}>
          <h2 className={styles.subtitle}>Sube tu certificado en PDF</h2>
          <p className={styles.desc}>
            Selecciona el archivo PDF de tu certificado energético. Extraeremos
            los datos automáticamente.
          </p>
          <div
            className={styles.dropZone}
            onClick={() => fileInputRef.current?.click()}
          >
            <span className={styles.dropIcon}>&#128229;</span>
            <p>Haz clic para seleccionar el PDF</p>
            <p className={styles.dropHint}>o arrastra el archivo aquí</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </div>
      )}

      {paso === "certificado" && camino === "pdf" && loading && (
        <div className={styles.pdfUpload}>
          <h2 className={styles.subtitle}>Analizando certificado...</h2>
          <div className={styles.spinner}>
            <div className={styles.spinnerCircle}></div>
            <p>Extrayendo datos del PDF...</p>
          </div>
        </div>
      )}

      {paso === "certificado" && camino === "papel" && (
        <div className={styles.papelForm}>
          <h2 className={styles.subtitle}>Introduce los datos de tu etiqueta</h2>
          <p className={styles.desc}>
            Busca estos tres valores en tu certificado energético en papel.
          </p>
          <form onSubmit={handlePapelSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="letra">Letra de calificación energética</label>
              <select
                id="letra"
                value={papelLetra}
                onChange={(e) => setPapelLetra(e.target.value)}
                className={styles.select}
              >
                {["A","B","C","D","E","F","G"].map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="consumo">
                Consumo de energía primaria (kWh/m² año)
              </label>
              <input
                id="consumo"
                type="number"
                step="0.1"
                min="0"
                placeholder="Ej: 145.2"
                value={papelConsumo}
                onChange={(e) => setPapelConsumo(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="emisiones">
                Emisiones de CO₂ (kg CO₂/m² año)
              </label>
              <input
                id="emisiones"
                type="number"
                step="0.1"
                min="0"
                placeholder="Ej: 32.5"
                value={papelEmisiones}
                onChange={(e) => setPapelEmisiones(e.target.value)}
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              Siguiente →
            </button>
          </form>
        </div>
      )}

      {/* ===== PASO 2: CONTEXTO ===== */}
      {paso === "contexto" && certificado && (
        <div className={styles.pasoContexto}>
          <h2 className={styles.subtitle}>Cuéntanos más sobre tu vivienda</h2>
          <p className={styles.desc}>
            Estos datos nos ayudarán a darte alertas personalizadas.
          </p>

          {/* Miniresumen del certificado */}
          <div
            className={`${styles.miniSemaforo} ${
              certificado.semaforo === "verde"
                ? styles.semaforoVerde
                : certificado.semaforo === "amarillo"
                ? styles.semaforoAmarillo
                : styles.semaforoRojo
            }`}
          >
            <span>
              {certificado.semaforo === "verde"
                ? "✅"
                : certificado.semaforo === "amarillo"
                ? "⚠️"
                : "❌"}
            </span>
            <span>{certificado.mensajeValidacion}</span>
          </div>

          <div className={styles.tablaResumen}>
            <div className={styles.resumenRow}>
              <span>Letra</span>
              <strong>{certificado.letra}</strong>
            </div>
            {certificado.consumo !== null && (
              <div className={styles.resumenRow}>
                <span>Consumo</span>
                <strong>{certificado.consumo} kWh/m²</strong>
              </div>
            )}
            {certificado.emisiones !== null && (
              <div className={styles.resumenRow}>
                <span>Emisiones</span>
                <strong>{certificado.emisiones} kg CO₂/m²</strong>
              </div>
            )}
            {certificado.fecha && (
              <div className={styles.resumenRow}>
                <span>Fecha</span>
                <strong>{certificado.fecha}</strong>
              </div>
            )}
          </div>

          <form onSubmit={handleContextoSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="gasto">
                ¿Cuánto pagas aproximadamente al mes de luz y gas? (€)
              </label>
              <input
                id="gasto"
                type="number"
                step="10"
                min="0"
                placeholder="Ej: 120"
                value={ctxGasto}
                onChange={(e) => setCtxGasto(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="cp">Código postal de tu vivienda</label>
              <input
                id="cp"
                type="text"
                inputMode="numeric"
                maxLength={5}
                placeholder="Ej: 08001"
                value={ctxCP}
                onChange={(e) => setCtxCP(e.target.value.replace(/\D/g, "").slice(0, 5))}
                className={styles.input}
              />
            </div>
            <p className={styles.fieldHint}>
              Estos datos nos permiten estimar tu zona climática y detectar
              discrepancias.
            </p>
            <button type="submit" className={styles.submitBtn}>
              Siguiente →
            </button>
          </form>
        </div>
      )}

      {/* ===== PASO 3: LEAD ===== */}
      {paso === "lead" && !leadSent && (
        <div className={styles.emailCta}>
          <h2 className={styles.subtitle}>
            Tu informe personalizado de alertas
          </h2>
          <p className={styles.desc}>
            Introduce tus datos para descubrir alertas exclusivas sobre tu
            certificado: subvenciones, ahorro potencial y discrepancias.
          </p>
          <form onSubmit={handleLeadSubmit} className={styles.emailForm}>
            <div className={styles.field}>
              <label htmlFor="leadNombre">Nombre (opcional)</label>
              <input
                id="leadNombre"
                type="text"
                placeholder="Ej: María"
                value={lead.nombre}
                onChange={(e) => setLead((p) => ({ ...p, nombre: e.target.value }))}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="leadEmail">Email *</label>
              <input
                id="leadEmail"
                type="email"
                placeholder="tu@email.com"
                required
                value={lead.email}
                onChange={(e) => setLead((p) => ({ ...p, email: e.target.value }))}
                className={styles.input}
              />
            </div>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={sendingLead}
            >
              {sendingLead
                ? "Enviando..."
                : "Ver alertas personalizadas →"}
            </button>
          </form>
          <p className={styles.aviso}>
            Sin spam. Puedes darte de baja en cualquier momento.
          </p>
        </div>
      )}

      {paso === "lead" && leadSent && (
        <div className={styles.loadingTransition}>
          <div className={styles.spinner}>
            <div className={styles.spinnerCircle}></div>
            <p>Generando tus alertas personalizadas...</p>
          </div>
        </div>
      )}

      {/* ===== PASO 4: ALERTAS ===== */}
      {paso === "alertas" && (
        <div className={styles.pasoAlertas}>
          <h2 className={styles.subtitle}>
            Alertas para tu certificado {certificado?.letra}
          </h2>
          <p className={styles.desc}>
            Basadas en tu certificado, gasto mensual y zona climática.
          </p>

          {alertas.length === 0 && (
            <div className={styles.alertaCard + " " + styles.alertaInfo}>
              <div className={styles.alertaHeader}>
                <span className={styles.alertaIcon}>✅</span>
                <strong className={styles.alertaTitulo}>
                  Sin alertas destacadas
                </strong>
              </div>
              <p className={styles.alertaDesc}>
                Tu certificado parece estar en orden. Si quieres un análisis
                más profundo, solicita una segunda opinión profesional.
              </p>
            </div>
          )}

          {alertas.map((alerta, i) => (
            <div
              key={i}
              className={`${styles.alertaCard} ${
                alerta.tipo === "error"
                  ? styles.alertaError
                  : alerta.tipo === "warning"
                  ? styles.alertaWarning
                  : alerta.tipo === "success"
                  ? styles.alertaSuccess
                  : styles.alertaInfo
              }`}
            >
              <div className={styles.alertaHeader}>
                <span className={styles.alertaIcon}>{alerta.icono}</span>
                <strong className={styles.alertaTitulo}>
                  {alerta.titulo}
                </strong>
              </div>
              <p className={styles.alertaDesc}>{alerta.descripcion}</p>
            </div>
          ))}

          <button className={styles.submitBtn} onClick={() => setPaso("cta")}>
            Ver soluciones →
          </button>
        </div>
      )}

      {/* ===== PASO 5: CTA OFERTA ===== */}
      {paso === "cta" && (
        <div className={styles.pasoCTA}>
          <h2 className={styles.subtitle}>
            ¿Quieres resolverlo con profesionales?
          </h2>
          <p className={styles.desc}>
            En CertiLab te ayudamos a interpretar tu certificado, conseguir
            subvenciones y mejorar la eficiencia de tu vivienda.
          </p>

          <div className={styles.ctaCards}>
            <div className={styles.ctaCard}>
              <span className={styles.ctaCardIcon}>&#128221;</span>
              <h3>Segunda opinión</h3>
              <p>
                Un técnico revisa tu certificado y te dice si es correcto o
                tiene errores.
              </p>
              <a
                href="/segunda-opinion"
                className={styles.ctaBtn}
              >
                Solicitar
              </a>
            </div>
            <div className={styles.ctaCard}>
              <span className={styles.ctaCardIcon}>📋</span>
              <h3>Informe Técnico</h3>
              <p>
                Análisis completo con plan de mejora, subvenciones y ahorro
                estimado.
              </p>
              <a
                href="/informe-tecnico-energetico"
                className={styles.ctaBtn}
              >
                Solicitar
              </a>
            </div>
            <div className={styles.ctaCard}>
              <span className={styles.ctaCardIcon}>🏛️</span>
              <h3>Gestión de ayudas</h3>
              <p>
                Te ayudamos a solicitar subvenciones Next Generation para tu
                reforma.
              </p>
              <a
                href="/ayudas-eficiencia-energetica"
                className={styles.ctaBtn}
              >
                Información
              </a>
            </div>
          </div>

          <button className={styles.otraBtn} onClick={resetear}>
            Comprobar otro certificado
          </button>
        </div>
      )}
    </section>
  );
}
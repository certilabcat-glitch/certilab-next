import React, { useState } from 'react';

/* ───────────────────────────────────────────
 * Types
 * ─────────────────────────────────────────── */

type Veredicto = 'Buena' | 'Regular' | 'Mejorable' | 'Deficiente';
type NivelConfianza = 'Alto' | 'Medio' | 'Bajo';
type CategoriaProblema = 'critico' | 'importante' | 'mejora';
type VeredictoRetorno = 'merece' | 'valoralo' | 'no_recomendado';

interface Problema {
  id: string;
  nombre: string;
  categoria: CategoriaProblema;
  descripcion: string;
  por_que_importa: string;
  si_no_actuas: string;
  nivel_confianza: NivelConfianza;
  actuacion_asociada: string;
}

interface Actuacion {
  id: string;
  posicion: number;
  nombre: string;
  inversion_estimada: number;
  ahorro_anual: number;
  veredicto: VeredictoRetorno;
  payback: number;
  descripcion: string;
  justificacion_posicion: string;
  nivel_confianza_ahorro: NivelConfianza;
  vida_util: number;
  veredicto_detalle: string;
  notas_at?: string;
}

interface EstadoReal {
  veredicto: Veredicto;
  direccion: string;
  nivel_confianza: NivelConfianza;
  fecha: string;
  resumen: string;
}

interface DesgloseAhorro {
  calefaccion: number;
  refrigeracion: number;
  acs: number;
  iluminacion: number;
}

interface DatosDocumento {
  estado_real: EstadoReal;
  problemas: Problema[];
  actuaciones: Actuacion[];
  ahorro_total: number;
  coste_actual: number;
  coste_tras_mejoras: number;
  desglose_ahorro: DesgloseAhorro;
  coste_inaccion_1a: number;
  coste_inaccion_5a: number;
  coste_inaccion_10a: number;
  impacto_reventa: string;
  riesgo_regulatorio: string;
}

/* ───────────────────────────────────────────
 * Mock data — caso realista con críticos
 * ─────────────────────────────────────────── */

const MOCK_DATA: DatosDocumento = {
  estado_real: {
    veredicto: 'Mejorable',
    direccion: 'C/ Mayor, 42, 3º 2ª, Barcelona',
    nivel_confianza: 'Alto',
    fecha: '15 de julio de 2026',
    resumen:
      'Tu vivienda tiene un estado energético Mejorable con un nivel de confianza Alto. El consumo real supera en un 40% el consumo estimado de tu certificado energético, y se han identificado 2 problemas críticos.',
  },
  problemas: [
    {
      id: 'p1',
      nombre: 'Filtraciones en cubierta',
      categoria: 'critico',
      descripcion:
        'La cubierta presenta grietas por las que entra agua cuando llueve. El aislamiento está mojado y ha perdido su capacidad aislante.',
      por_que_importa:
        'Además del riesgo de goteras, estás perdiendo entre un 20-30% de la calefacción por la cubierta. La humedad puede provocar problemas de salud (moho) y dañar la estructura.',
      si_no_actuas:
        'A 1 año: las facturas de calefacción seguirán siendo altas. A 3 años: el moho puede afectar a paredes y muebles. A 5 años: la estructura de la cubierta puede requerir una reparación mayor, multiplicando el coste.',
      nivel_confianza: 'Alto',
      actuacion_asociada: 'Impermeabilización y aislamiento de cubierta',
    },
    {
      id: 'p2',
      nombre: 'Caldera de gas sin mantenimiento',
      categoria: 'critico',
      descripcion:
        'Tu caldera tiene más de 15 años y no ha pasado la ITE en los últimos 5 años. El rendimiento ha caído al 65%.',
      por_que_importa:
        'Una caldera en este estado consume casi el doble de gas para dar el mismo calor. Además, existe riesgo de seguridad: fugas de monóxido de carbono.',
      si_no_actuas:
        'A 1 año: pagarás 300-400 € extra en gas. A 3 años: la probabilidad de avería total es alta. Una avería urgente en invierno puede costar 800-1.200 €.',
      nivel_confianza: 'Alto',
      actuacion_asociada: 'Sustitución de caldera por bomba de calor',
    },
    {
      id: 'p3',
      nombre: 'Ventanas con puente térmico',
      categoria: 'importante',
      descripcion:
        'Las ventanas son de aluminio sin rotura de puente térmico. El doble acristalamiento tiene más de 20 años.',
      por_que_importa:
        'Por las ventanas se escapa el 25-30% de la calefacción. En verano, el calor exterior penetra con facilidad. Notarás corrientes cerca de las ventanas en invierno.',
      si_no_actuas:
        'A 1 año: pérdida de confort constante. A 5 años: el coste acumulado en calefacción y aire acondicionado superará el precio de cambiar las ventanas.',
      nivel_confianza: 'Medio',
      actuacion_asociada: 'Sustitución de ventanas a Clase 1',
    },
    {
      id: 'p4',
      nombre: 'Aislamiento de fachada mejorable',
      categoria: 'mejora',
      descripcion:
        'La fachada no tiene aislamiento térmico por el exterior. Es anterior a la normativa CTE 2006.',
      por_que_importa:
        'Una fachada sin aislamiento pierde calor en invierno y se sobrecalienta en verano. Es la principal causa de facturas altas.',
      si_no_actuas:
        'No es urgente, pero mientras no actúes seguirás pagando entre 200-400 €/año más de lo necesario en climatización.',
      nivel_confianza: 'Medio',
      actuacion_asociada: 'SATE (Aislamiento térmico por el exterior)',
    },
  ],
  actuaciones: [
    {
      id: 'a1',
      posicion: 1,
      nombre: 'Impermeabilización y aislamiento de cubierta',
      inversion_estimada: 4800,
      ahorro_anual: 540,
      veredicto: 'merece',
      payback: 9,
      descripcion:
        'Reparación de grietas, impermeabilización de la cubierta y adición de 10 cm de aislamiento térmico. Soluciona el problema de filtraciones y reduce la pérdida de calor.',
      justificacion_posicion:
        'Es la actuación más urgente porque soluciona un problema crítico (filtraciones) y además aporta el mayor ahorro relativo. Sin esta reparación, el resto de mejoras tendrían un rendimiento menor.',
      nivel_confianza_ahorro: 'Alto',
      vida_util: 25,
      veredicto_detalle:
        'Payback de 9 años. La impermeabilización tiene una vida útil de 25 años, por lo que recuperarás la inversión 2,7 veces durante su vida útil. Además, protege la estructura de tu vivienda.',
      notas_at:
        'Recomendamos hacer esta actuación antes del invierno para evitar daños mayores por lluvia.',
    },
    {
      id: 'a2',
      posicion: 2,
      nombre: 'Sustitución de caldera por bomba de calor',
      inversion_estimada: 6500,
      ahorro_anual: 620,
      veredicto: 'merece',
      payback: 10.5,
      descripcion:
        'Sustitución de la caldera de gas actual por una bomba de calor aerotérmica. Incluye el depósito de ACS y la conexión al sistema existente.',
      justificacion_posicion:
        'Segunda prioridad porque la caldera actual tiene un rendimiento muy bajo y supone un riesgo de seguridad. La bomba de calor reduce el consumo de gas a cero y aprovecha la electricidad renovable.',
      nivel_confianza_ahorro: 'Alto',
      vida_util: 15,
      veredicto_detalle:
        'Payback de 10,5 años. La bomba de calor dura 15 años. Recuperas la inversión 1,4 veces durante su vida útil. A esto hay que sumar la eliminación del riesgo de seguridad.',
    },
    {
      id: 'a3',
      posicion: 3,
      nombre: 'Sustitución de ventanas a Clase 1',
      inversion_estimada: 4200,
      ahorro_anual: 310,
      veredicto: 'merece',
      payback: 13.5,
      descripcion:
        'Sustitución de 5 ventanas de aluminio sin RPT por ventanas de PVC con rotura de puente térmico y doble acristalamiento bajo emisivo.',
      justificacion_posicion:
        'Tercera prioridad porque las ventanas actuales son muy mejorables, pero el coste de sustitución es alto y el payback es más largo que las actuaciones anteriores.',
      nivel_confianza_ahorro: 'Medio',
      vida_util: 25,
      veredicto_detalle:
        'Payback de 13,5 años. Vida útil de 25 años. Recuperas la inversión 1,8 veces. El confort térmico mejora notablemente: eliminas corrientes y ruido exterior.',
    },
    {
      id: 'a4',
      posicion: 4,
      nombre: 'SATE (Aislamiento térmico por el exterior)',
      inversion_estimada: 8500,
      ahorro_anual: 380,
      veredicto: 'valoralo',
      payback: 22,
      descripcion:
        'Aplicación de sistema de aislamiento térmico por el exterior (SATE) en toda la fachada. 10 cm de aislamiento con acabado monocapa.',
      justificacion_posicion:
        'Última prioridad porque el coste es elevado y el payback supera los 20 años. Sin embargo, si tienes previsto hacer una reforma de fachada, es el momento de incluir el SATE.',
      nivel_confianza_ahorro: 'Medio',
      vida_util: 30,
      veredicto_detalle:
        'Payback de 22 años. Vida útil de 30 años. Apenas recuperas la inversión 1,3 veces durante su vida útil. Recomendable solo si ya tienes prevista una reforma de fachada o si buscas la máxima calificación energética.',
    },
  ],
  ahorro_total: 1850,
  coste_actual: 2800,
  coste_tras_mejoras: 950,
  desglose_ahorro: {
    calefaccion: 960,
    refrigeracion: 240,
    acs: 520,
    iluminacion: 130,
  },
  coste_inaccion_1a: 1850,
  coste_inaccion_5a: 9250,
  coste_inaccion_10a: 18500,
  impacto_reventa:
    'Una vivienda con calificación G puede perder entre un 10-20% de su valor de mercado frente a una equivalente con calificación C.',
  riesgo_regulatorio:
    'A partir de 2030 será obligatorio que todas las viviendas en venta o alquiler tengan una calificación mínima E. En 2033 este mínimo subirá a D. Tu vivienda actual está en G.',
};

/* ───────────────────────────────────────────
 * Sistema visual: color + icono + texto
 * Cada veredicto tiene un combo único que no
 * depende únicamente del color.
 * ─────────────────────────────────────────── */

type VeredictoVisual = {
  icon: string;
  label: string;       /* texto corto de una o dos palabras */
  color: { bg: string; text: string; border: string };
  urgencia: number;    /* 0 = ninguna, 3 = máxima */
};

const SISTEMA_VEREDICTO: Record<Veredicto, VeredictoVisual> = {
  Buena: {
    icon: '✅',
    label: 'En buen estado',
    color: { bg: '#ecfdf5', text: '#166534', border: '#bbf7d0' },
    urgencia: 0,
  },
  Regular: {
    icon: '🔶',
    label: 'A mejorar',
    color: { bg: '#fffbeb', text: '#92400e', border: '#fde68a' },
    urgencia: 1,
  },
  Mejorable: {
    icon: '⚠️',
    label: 'Requiere actuación',
    color: { bg: '#fff7ed', text: '#9a3412', border: '#fed7aa' },
    urgencia: 2,
  },
  Deficiente: {
    icon: '🚨',
    label: 'Actuación urgente',
    color: { bg: '#fef2f2', text: '#991b1b', border: '#fecaca' },
    urgencia: 3,
  },
};

/** Texto que explica QUÉ SIGNIFICA cada veredicto (decisión) */
const SUBTEXTO_VEREDICTO: Record<Veredicto, string> = {
  Buena: 'No necesitas hacer nada urgente. Tu vivienda cumple los requisitos normativos actuales.',
  Regular:
    'Hay problemas que te están costando dinero. No son críticos, pero cada año que pasa estás pagando más de lo necesario.',
  Mejorable:
    'Hay problemas que empeorarán si no actúas. Cuanto antes los abordes, menor será el coste total.',
  Deficiente:
    'Hay problemas críticos que requieren acción inmediata. Ignorarlos puede multiplicar el coste a corto plazo.',
};

/** Frase corta de apertura en el resumen */
const FRASE_APERTURA: Record<Veredicto, string> = {
  Buena: 'Tu vivienda está en buen estado energético. No hay urgencias, pero puedes plantearte mejoras opcionales.',
  Regular:
    'Tu vivienda tiene margen de mejora. Algunos problemas están incrementando tus facturas sin que sean críticos.',
  Mejorable:
    'Tu vivienda tiene problemas que es mejor no ignorar. Si actúas ahora, evitarás que el coste se dispare.',
  Deficiente:
    'Tu vivienda tiene problemas críticos. Actuar ahora evitará daños mayores y un coste muy superior.',
};

function confianzaColor(confianza: NivelConfianza): string {
  if (confianza === 'Alto') return 'hsl(142, 50%, 42%)';
  if (confianza === 'Medio') return 'hsl(38, 80%, 50%)';
  return 'hsl(0, 70%, 50%)';
}

function getVeredictoVisual(veredicto: Veredicto): VeredictoVisual {
  return SISTEMA_VEREDICTO[veredicto];
}

function veredictoEmoji(veredicto: VeredictoRetorno): string {
  if (veredicto === 'merece') return '✅';
  if (veredicto === 'valoralo') return '🔶';
  return '❌';
}

function formatoEuro(n: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);
}

/* ───────────────────────────────────────────
 * Accordion (re-usable mini component)
 * ─────────────────────────────────────────── */

interface AccordionProps {
  open: boolean;
  onToggle: () => void;
  label: string;
  badge?: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ open, onToggle, label, badge, children }) => (
  <div
    style={{
      borderBottom: '1px solid hsl(0, 0%, 90%)',
      padding: '0.75rem 0',
    }}
  >
    <button
      type="button"
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem 0',
        fontFamily: 'inherit',
        fontSize: '0.95rem',
        fontWeight: 600,
        color: 'hsl(0, 0%, 20%)',
        textAlign: 'left',
      }}
    >
      <span>
        {label}
        {badge && (
          <span
            style={{
              marginLeft: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'hsl(0, 0%, 50%)',
            }}
          >
            {badge}
          </span>
        )}
      </span>
      <span style={{ fontSize: '0.8rem', color: 'hsl(0, 0%, 60%)', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
        ▼
      </span>
    </button>
    {open && <div style={{ padding: '0.5rem 0 0.25rem 0', fontSize: '0.9rem', lineHeight: 1.6, color: 'hsl(0, 0%, 35%)' }}>{children}</div>}
  </div>
);

/* ───────────────────────────────────────────
 * Indicador de urgencia visual (barra 0-3)
 * ─────────────────────────────────────────── */

function IndicadorUrgencia({ nivel, label }: { nivel: number; label: string }) {
  const niveles = [
    { color: '#166534', texto: 'Sin urgencia' },
    { color: '#92400e', texto: 'Poca urgencia' },
    { color: '#9a3412', texto: 'Urgencia media' },
    { color: '#991b1b', texto: 'Urgencia alta' },
  ];
  const info = niveles[nivel] ?? niveles[0];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
      <span style={{ color: 'hsl(0, 0%, 55%)' }}>Urgencia:</span>
      <div style={{ display: 'flex', gap: '3px', flex: 1, maxWidth: '80px' }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              height: '6px',
              flex: 1,
              borderRadius: '3px',
              backgroundColor: i <= nivel ? info.color : 'hsl(0, 0%, 88%)',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </div>
      <span style={{ color: info.color, fontWeight: 600 }}>{info.texto}</span>
    </div>
  );
}

/* ───────────────────────────────────────────
 * Capa components
 * ─────────────────────────────────────────── */

function CapaHeader({ numero, titulo, pregunta }: { numero: number; titulo: string; pregunta: string }) {
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'hsl(0, 0%, 55%)',
        }}
      >
        Capa {numero} — {titulo}
      </span>
      <h2
        style={{
          margin: '0.25rem 0 0 0',
          fontSize: '1.2rem',
          fontWeight: 700,
          color: 'hsl(0, 0%, 15%)',
        }}
      >
        {pregunta}
      </h2>
    </div>
  );
}

interface CapaEstadoRealProps {
  data: EstadoReal;
  costeInaccion1a: number;
  costeInaccion5a: number;
  costeInaccion10a: number;
  ahorroTotal: number;
  tieneCriticos: boolean;
}

function CapaEstadoReal({ data, costeInaccion1a, costeInaccion5a, costeInaccion10a, ahorroTotal, tieneCriticos }: CapaEstadoRealProps) {
  const [helpOpen, setHelpOpen] = useState(false);

  const visual = getVeredictoVisual(data.veredicto);
  const cColor = confianzaColor(data.nivel_confianza);
  const esBuena = data.veredicto === 'Buena';

  return (
    <section
      style={{
        padding: '1.5rem',
        borderRadius: '12px',
        backgroundColor: 'white',
        border: '1px solid hsl(0, 0%, 92%)',
        marginBottom: '1rem',
      }}
    >
      <CapaHeader numero={1} titulo="Estado Real" pregunta="¿Cuál es el estado real de tu vivienda?" />

      {/* Veredicto principal — color + icono + texto + indicador de urgencia */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: visual.color.bg,
          borderRadius: '8px',
          border: `1px solid ${visual.color.border}`,
          margin: '0.75rem 0',
        }}
      >
        <span style={{ fontSize: '2rem', lineHeight: 1 }}>{visual.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: visual.color.text }}>
            {visual.label}
          </div>
          <div style={{ fontSize: '0.85rem', color: visual.color.text, opacity: 0.8, marginTop: '0.15rem' }}>
            Estado {data.veredicto}
          </div>
          <div style={{ fontSize: '0.8rem', color: visual.color.text, opacity: 0.6, marginTop: '0.15rem' }}>
            {data.direccion}
          </div>
        </div>
        <IndicadorUrgencia nivel={visual.urgencia} label={visual.label} />
      </div>

      {/* Barra informativa: coste de inacción (más protagonismo) + ahorro potencial */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: esBuena ? '1fr' : '1fr 1fr',
          gap: '0.5rem',
          margin: '0.75rem 0',
        }}
      >
        {/* Coste de inacción — primera tarjeta, más grande si no es Buena */}
        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            backgroundColor: esBuena ? '#ecfdf5' : '#fef2f2',
            border: `1px solid ${esBuena ? '#bbf7d0' : '#fecaca'}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: esBuena ? '#166534' : '#991b1b' }}>
              {esBuena ? 'Estado actual' : 'Coste de no actuar'}
            </span>
            {!esBuena && tieneCriticos && (
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  color: '#991b1b',
                  backgroundColor: '#fecaca',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '4px',
                }}
              >
                Crítico
              </span>
            )}
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: esBuena ? '#166534' : '#991b1b', marginTop: '0.15rem' }}>
            {esBuena ? '✅ Cumples requisitos 2030' : formatoEuro(costeInaccion10a)}
          </div>
          <div style={{ fontSize: '0.75rem', color: esBuena ? '#166534' : '#991b1b', opacity: 0.7 }}>
            {esBuena
              ? 'Tu vivienda no requiere actuaciones urgentes'
              : 'en 10 años si no actúas — cada año que pasa pierdes dinero'}
          </div>
          {!esBuena && (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem', fontSize: '0.75rem', color: '#991b1b', opacity: 0.6 }}>
              <span>1 año: {formatoEuro(costeInaccion1a)}</span>
              <span>5 años: {formatoEuro(costeInaccion5a)}</span>
            </div>
          )}
        </div>

        {/* Ahorro potencial — solo si no es Buena (si es Buena ya ocupa todo el ancho) */}
        {!esBuena && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#166534' }}>
              Ahorro potencial
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#166534', marginTop: '0.15rem' }}>
              {formatoEuro(ahorroTotal)}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#166534', opacity: 0.7 }}>
              al año si aplicas las mejoras
            </div>
          </div>
        )}
      </div>

      {/* Resumen */}
      <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'hsl(0, 0%, 30%)', margin: '0.5rem 0' }}>
        {FRASE_APERTURA[data.veredicto]}
      </p>

      {/* Metadatos */}
      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'hsl(0, 0%, 50%)', marginTop: '0.5rem', flexWrap: 'wrap' }}>
        <span>
          Confianza:{' '}
          <span style={{ color: cColor, fontWeight: 600 }}>
            <span style={{ color: cColor }}>●</span> {data.nivel_confianza}
          </span>
        </span>
        <span>Fecha: {data.fecha}</span>
      </div>

      {/* Ayuda expandible */}
      <Accordion open={helpOpen} onToggle={() => setHelpOpen(!helpOpen)} label="¿Qué significa este veredicto?" badge="(toca para entender)">
        <p style={{ margin: 0 }}>
          {SUBTEXTO_VEREDICTO[data.veredicto]}
        </p>
      </Accordion>
    </section>
  );
}

function CapaProblemas({ problemas }: { problemas: Problema[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(
    // Si hay críticos, el primer crítico se expande por defecto
    problemas.find((p) => p.categoria === 'critico')?.id ?? null
  );

  const criticos = problemas.filter((p) => p.categoria === 'critico');
  const importantes = problemas.filter((p) => p.categoria === 'importante');
  const mejoras = problemas.filter((p) => p.categoria === 'mejora');

  function renderProblemas(lista: Problema[], titulo: string, emoji: string, defaultExpanded: boolean) {
    return (
      <div style={{ marginBottom: '0.75rem' }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: '0.95rem',
            color: 'hsl(0, 0%, 25%)',
            padding: '0.5rem 0',
          }}
        >
          {emoji} {titulo}
        </div>
        {lista.map((p) => {
          const isOpen = expandedId === p.id;
          return (
            <Accordion
              key={p.id}
              open={isOpen}
              onToggle={() => setExpandedId(isOpen ? null : p.id)}
              label={p.nombre}
              badge={`Confianza: ${p.nivel_confianza}`}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div><strong>¿Qué es?</strong><br />{p.descripcion}</div>
                <div><strong>¿Por qué importa?</strong><br />{p.por_que_importa}</div>
                <div><strong>¿Qué pasa si no actúas?</strong><br />{p.si_no_actuas}</div>
                <div style={{ color: 'hsl(0, 0%, 45%)', fontSize: '0.85rem' }}>
                  Se resuelve con: <strong>{p.actuacion_asociada}</strong>
                </div>
              </div>
            </Accordion>
          );
        })}
      </div>
    );
  }

  return (
    <section
      style={{
        padding: '1.5rem',
        borderRadius: '12px',
        backgroundColor: 'white',
        border: '1px solid hsl(0, 0%, 92%)',
        marginBottom: '1rem',
      }}
    >
      <CapaHeader numero={2} titulo="Problemas Priorizados" pregunta="¿Qué problemas son realmente importantes?" />

      {criticos.length > 0 && renderProblemas(criticos, 'Críticos', '🔴', true)}
      {importantes.length > 0 && renderProblemas(importantes, 'Importantes', '🟠', criticos.length === 0)}
      {mejoras.length > 0 && renderProblemas(mejoras, 'Mejoras', '🟢', criticos.length === 0 && importantes.length === 0)}
    </section>
  );
}

function CapaPlanAccion({ actuaciones }: { actuaciones: Actuacion[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section
      style={{
        padding: '1.5rem',
        borderRadius: '12px',
        backgroundColor: 'white',
        border: '1px solid hsl(0, 0%, 92%)',
        marginBottom: '1rem',
      }}
    >
      <CapaHeader numero={3} titulo="Plan de Acción" pregunta="¿Qué debes hacer primero?" />

      <div style={{ fontSize: '0.9rem', color: 'hsl(0, 0%, 45%)', marginBottom: '1rem' }}>
        Esto es lo que debes hacer, en orden de prioridad:
      </div>

      {actuaciones.map((a) => {
        const isOpen = expandedId === a.id;
        return (
          <div
            key={a.id}
            style={{
              padding: '0.75rem',
              marginBottom: '0.5rem',
              borderRadius: '8px',
              border: isOpen ? '1px solid hsl(0, 0%, 80%)' : '1px solid hsl(0, 0%, 92%)',
              backgroundColor: isOpen ? 'hsl(0, 0%, 98%)' : 'white',
            }}
          >
            <button
              type="button"
              onClick={() => setExpandedId(isOpen ? null : a.id)}
              style={{
                display: 'grid',
                gridTemplateColumns: '2rem 1fr auto',
                gap: '0.75rem',
                alignItems: 'center',
                width: '100%',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                textAlign: 'left',
                padding: 0,
              }}
            >
              <span
                style={{
                  width: '1.75rem',
                  height: '1.75rem',
                  borderRadius: '50%',
                  backgroundColor: 'hsl(0, 0%, 10%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                }}
              >
                {a.posicion}
              </span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'hsl(0, 0%, 20%)' }}>
                  {a.nombre}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'hsl(0, 0%, 50%)', display: 'flex', gap: '0.75rem', marginTop: '0.15rem' }}>
                  <span>{formatoEuro(a.inversion_estimada)}</span>
                  <span>Ahorro: {formatoEuro(a.ahorro_anual)}/año</span>
                  <span>{veredictoEmoji(a.veredicto)} Payback: {a.payback} años</span>
                </div>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'hsl(0, 0%, 60%)' }}>{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
              <div
                style={{
                  marginTop: '0.75rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid hsl(0, 0%, 88%)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: 'hsl(0, 0%, 35%)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <div><strong>¿En qué consiste?</strong><br />{a.descripcion}</div>
                <div><strong>¿Por qué esta posición?</strong><br />{a.justificacion_posicion}</div>
                <div><strong>Veredicto detallado:</strong><br />{a.veredicto_detalle}</div>
                <div style={{ fontSize: '0.85rem', color: 'hsl(0, 0%, 45%)' }}>
                  Vida útil: {a.vida_util} años • Confianza del ahorro: {a.nivel_confianza_ahorro}
                </div>
                {a.notas_at && (
                  <div style={{ backgroundColor: 'hsl(40, 30%, 95%)', padding: '0.5rem', borderRadius: '6px', fontSize: '0.85rem' }}>
                    <strong>📝 Nota del AT:</strong> {a.notas_at}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}

function CapaAhorroEconomico({
  total,
  costeActual,
  costeMejoras,
  desglose,
}: {
  total: number;
  costeActual: number;
  costeMejoras: number;
  desglose: DesgloseAhorro;
}) {
  const [desgloseOpen, setDesgloseOpen] = useState(false);
  const [proyeccionOpen, setProyeccionOpen] = useState(false);
  const ahorroPct = Math.round(((costeActual - costeMejoras) / costeActual) * 100);

  return (
    <section
      style={{
        padding: '1.5rem',
        borderRadius: '12px',
        backgroundColor: 'white',
        border: '1px solid hsl(0, 0%, 92%)',
        marginBottom: '1rem',
      }}
    >
      <CapaHeader numero={4} titulo="Ahorro Económico" pregunta="¿Cuánto puedes ahorrar?" />

      {/* Total ahorro — única cifra que importa en primera lectura */}
      <div
        style={{
          padding: '1rem',
          backgroundColor: 'hsl(142, 30%, 95%)',
          borderRadius: '8px',
          border: '1px solid hsl(142, 30%, 80%)',
          marginBottom: '0.75rem',
        }}
      >
        <div style={{ fontSize: '0.85rem', color: 'hsl(142, 40%, 30%)', fontWeight: 500 }}>
          Ahorro total si aplicas todas las actuaciones
        </div>
        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'hsl(142, 50%, 25%)' }}>
          {formatoEuro(total)} / año
        </div>
      </div>

      {/* Barra de comparativa */}
      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'hsl(0, 0%, 50%)', marginBottom: '0.25rem' }}>
          <span>Coste actual: {formatoEuro(costeActual)}/año</span>
          <span>Tras mejoras: {formatoEuro(costeMejoras)}/año</span>
        </div>
        <div
          style={{
            height: '1.5rem',
            borderRadius: '8px',
            backgroundColor: 'hsl(0, 0%, 90%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${ahorroPct}%`,
              backgroundColor: 'hsl(142, 50%, 42%)',
              borderRadius: '8px',
              transition: 'width 0.5s',
            }}
          />
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '0.25rem', color: 'hsl(142, 50%, 30%)' }}>
          Ahorras el {ahorroPct}% de tu factura energética actual
        </div>
      </div>

      {/* Desglose por concepto — colapsado por defecto (micro-detalle) */}
      <Accordion open={desgloseOpen} onToggle={() => setDesgloseOpen(!desgloseOpen)} label="Ver desglose por concepto (calefacción, ACS...)" badge="(detalle)">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {Object.entries(desglose).map(([key, val]) => (
            <div
              key={key}
              style={{
                padding: '0.5rem',
                backgroundColor: 'hsl(0, 0%, 96%)',
                borderRadius: '6px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'hsl(0, 0%, 50%)', textTransform: 'capitalize' }}>
                {key === 'acs' ? 'ACS' : key}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'hsl(0, 0%, 25%)' }}>
                {formatoEuro(val)}
              </div>
            </div>
          ))}
        </div>
      </Accordion>

      <Accordion open={proyeccionOpen} onToggle={() => setProyeccionOpen(!proyeccionOpen)} label="Proyección a 5 años" badge="(detalle)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {[1, 2, 3, 4, 5].map((year) => (
            <div
              key={year}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.3rem 0',
                borderBottom: '1px solid hsl(0, 0%, 92%)',
                fontSize: '0.85rem',
              }}
            >
              <span>Año {year}</span>
              <span style={{ fontWeight: 600, color: 'hsl(142, 50%, 30%)' }}>
                {formatoEuro(total * year)}
              </span>
            </div>
          ))}
        </div>
      </Accordion>
    </section>
  );
}

function CapaInversionRetorno({ actuaciones }: { actuaciones: Actuacion[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const grupos: { titulo: string; emoji: string; veredicto: VeredictoRetorno; descripcion: string }[] = [
    {
      titulo: 'Merece la pena',
      emoji: '✅',
      veredicto: 'merece',
      descripcion:
        'La inversión se recupera durante la vida útil de la actuación. Es una decisión económicamente sólida.',
    },
    {
      titulo: 'Valóralo',
      emoji: '🔶',
      veredicto: 'valoralo',
      descripcion:
        'La inversión apenas se recupera durante la vida útil. Solo recomendable si tienes prevista una reforma o buscas la máxima calificación.',
    },
    {
      titulo: 'No recomendado',
      emoji: '❌',
      veredicto: 'no_recomendado',
      descripcion: 'La inversión no se recupera durante la vida útil. No es aconsejable económicamente.',
    },
  ];

  return (
    <section
      style={{
        padding: '1.5rem',
        borderRadius: '12px',
        backgroundColor: 'white',
        border: '1px solid hsl(0, 0%, 92%)',
        marginBottom: '1rem',
      }}
    >
      <CapaHeader numero={5} titulo="Inversión y Retorno" pregunta="¿Qué inversión merece la pena?" />

      {grupos.map(({ titulo, emoji, veredicto, descripcion }) => {
        const list = actuaciones.filter((a) => a.veredicto === veredicto);
        if (list.length === 0) return null;
        return (
          <div key={veredicto} style={{ marginBottom: '0.75rem' }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: '0.95rem',
                color: 'hsl(0, 0%, 25%)',
                padding: '0.5rem 0',
              }}
            >
              {emoji} {titulo}
            </div>
            {/* Explicación breve de la categoría */}
            <div
              style={{
                fontSize: '0.8rem',
                color: 'hsl(0, 0%, 50%)',
                marginBottom: '0.4rem',
                lineHeight: 1.5,
                paddingLeft: '0.25rem',
              }}
            >
              {descripcion}
            </div>
            {list.map((a) => {
              const isOpen = expandedId === a.id;
              return (
                <div
                  key={a.id}
                  style={{
                    padding: '0.75rem',
                    marginBottom: '0.35rem',
                    borderRadius: '8px',
                    border: isOpen ? '1px solid hsl(0, 0%, 80%)' : '1px solid hsl(0, 0%, 92%)',
                    backgroundColor: isOpen ? 'hsl(0, 0%, 98%)' : 'white',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedId(isOpen ? null : a.id)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      textAlign: 'left',
                      padding: 0,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'hsl(0, 0%, 25%)' }}>
                        {a.nombre}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'hsl(0, 0%, 55%)', display: 'flex', gap: '0.5rem', marginTop: '0.15rem' }}>
                        <span>{formatoEuro(a.inversion_estimada)}</span>
                        <span>→ {formatoEuro(a.ahorro_anual)}/año</span>
                        <span>Payback: {a.payback} años</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'hsl(0, 0%, 60%)', marginLeft: '0.5rem' }}>
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        marginTop: '0.75rem',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid hsl(0, 0%, 88%)',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        color: 'hsl(0, 0%, 35%)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      <div><strong>¿Por qué este veredicto?</strong><br />{a.veredicto_detalle}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
                        <div style={{ backgroundColor: 'hsl(0, 0%, 96%)', padding: '0.4rem', borderRadius: '4px' }}>
                          <span style={{ color: 'hsl(0, 0%, 50%)' }}>Inversión</span><br />
                          <strong>{formatoEuro(a.inversion_estimada)}</strong>
                        </div>
                        <div style={{ backgroundColor: 'hsl(0, 0%, 96%)', padding: '0.4rem', borderRadius: '4px' }}>
                          <span style={{ color: 'hsl(0, 0%, 50%)' }}>Ahorro anual</span><br />
                          <strong>{formatoEuro(a.ahorro_anual)}</strong>
                        </div>
                        <div style={{ backgroundColor: 'hsl(0, 0%, 96%)', padding: '0.4rem', borderRadius: '4px' }}>
                          <span style={{ color: 'hsl(0, 0%, 50%)' }}>Payback</span><br />
                          <strong>{a.payback} años</strong>
                        </div>
                        <div style={{ backgroundColor: 'hsl(0, 0%, 96%)', padding: '0.4rem', borderRadius: '4px' }}>
                          <span style={{ color: 'hsl(0, 0%, 50%)' }}>Vida útil</span><br />
                          <strong>{a.vida_util} años</strong>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </section>
  );
}

function CapaCosteInaccion({
  coste1a,
  coste5a,
  coste10a,
  impactoReventa,
  riesgoRegulatorio,
  ahorroTotal,
}: {
  coste1a: number;
  coste5a: number;
  coste10a: number;
  impactoReventa: string;
  riesgoRegulatorio: string;
  ahorroTotal: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      style={{
        padding: '1.5rem',
        borderRadius: '12px',
        backgroundColor: 'white',
        border: '1px solid hsl(0, 0%, 92%)',
        marginBottom: '1rem',
      }}
    >
      <CapaHeader numero={6} titulo="Coste de la Inacción" pregunta="¿Qué ocurre si no haces nada?" />

      {/* Proyección temporal */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {[
          { label: '1 año', value: coste1a },
          { label: '5 años', value: coste5a },
          { label: '10 años', value: coste10a },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor: 'hsl(0, 50%, 95%)',
              borderRadius: '8px',
              textAlign: 'center',
              border: '1px solid hsl(0, 50%, 85%)',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'hsl(0, 50%, 40%)', fontWeight: 500 }}>{label}</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'hsl(0, 60%, 30%)' }}>
              {formatoEuro(value)}
            </div>
          </div>
        ))}
      </div>

      {/* Coste anual */}
      <div
        style={{
          padding: '0.75rem',
          backgroundColor: 'hsl(0, 0%, 96%)',
          borderRadius: '8px',
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
        }}
      >
        <span style={{ color: 'hsl(0, 0%, 50%)' }}>Coste anual de la inacción:</span>{' '}
        <strong style={{ color: 'hsl(0, 60%, 35%)' }}>{formatoEuro(ahorroTotal)}/año</strong>
        <span style={{ color: 'hsl(0, 0%, 50%)' }}>
          {' '}— esto es lo que pagas de más cada año al no hacer las mejoras.
        </span>
      </div>

      {/* Impacto reventa */}
      <div style={{ fontSize: '0.9rem', color: 'hsl(0, 0%, 35%)', marginBottom: '0.5rem', lineHeight: 1.6 }}>
        <strong>Impacto en valor de reventa:</strong> {impactoReventa}
      </div>

      <Accordion open={expanded} onToggle={() => setExpanded(!expanded)} label="Riesgo regulatorio futuro" badge="(toca para ver)">
        <p style={{ margin: 0 }}>{riesgoRegulatorio}</p>
      </Accordion>
    </section>
  );
}

/* ───────────────────────────────────────────
 * DocumentoDecisiones — Componente principal
 * ─────────────────────────────────────────── */

export interface DocumentoDecisionesProps {
  /** Opcional: sobreescribe los datos mock */
  data?: DatosDocumento;
}

const DocumentoDecisiones: React.FC<DocumentoDecisionesProps> = ({ data: propData }) => {
  const data = propData ?? MOCK_DATA;

  return (
    <div
      style={{
        maxWidth: '640px',
        margin: '0 auto',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        padding: '0 1rem',
      }}
    >
      {/* Header del documento */}
      <div style={{ padding: '1rem 0', borderBottom: '2px solid hsl(0, 0%, 92%)', marginBottom: '1rem' }}>
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'hsl(0, 0%, 10%)',
            margin: 0,
          }}
        >
          Diagnóstico energético de tu vivienda
        </h1>
        <div style={{ fontSize: '0.85rem', color: 'hsl(0, 0%, 50%)', marginTop: '0.25rem' }}>
          Informe ATI-03 — Documento de Decisiones
        </div>
      </div>

      {/* Capas */}
      <CapaEstadoReal
        data={data.estado_real}
        costeInaccion1a={data.coste_inaccion_1a}
        costeInaccion5a={data.coste_inaccion_5a}
        costeInaccion10a={data.coste_inaccion_10a}
        ahorroTotal={data.ahorro_total}
        tieneCriticos={data.problemas?.some(p => p.categoria === 'critico') ?? false}
      />
      <CapaProblemas problemas={data.problemas} />
      <CapaPlanAccion actuaciones={data.actuaciones} />
      <CapaAhorroEconomico
        total={data.ahorro_total}
        costeActual={data.coste_actual}
        costeMejoras={data.coste_tras_mejoras}
        desglose={data.desglose_ahorro}
      />
      <CapaInversionRetorno actuaciones={data.actuaciones} />
      <CapaCosteInaccion
        coste1a={data.coste_inaccion_1a}
        coste5a={data.coste_inaccion_5a}
        coste10a={data.coste_inaccion_10a}
        impactoReventa={data.impacto_reventa}
        riesgoRegulatorio={data.riesgo_regulatorio}
        ahorroTotal={data.ahorro_total}
      />

      {/* Anexo Técnico — referencia sutil sin CTA llamativo */}
      <div
        style={{
          padding: '1rem 1.5rem',
          borderRadius: '8px',
          backgroundColor: 'hsl(0, 0%, 98%)',
          border: '1px solid hsl(0, 0%, 90%)',
          marginBottom: '2rem',
          fontSize: '0.85rem',
          color: 'hsl(0, 0%, 50%)',
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: 'hsl(0, 0%, 40%)' }}>📄 Anexo Técnico</strong>
        {' — '}El detalle completo de la inspección, mediciones, cálculos y metodología está disponible en el anexo técnico.
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '1rem 0',
          borderTop: '1px solid hsl(0, 0%, 92%)',
          fontSize: '0.75rem',
          color: 'hsl(0, 0%, 55%)',
          textAlign: 'center',
        }}
      >
        Documento generado por Certilab — Fecha: {data.estado_real.fecha}
      </div>
    </div>
  );
};

DocumentoDecisiones.displayName = 'DocumentoDecisiones';

export default DocumentoDecisiones;
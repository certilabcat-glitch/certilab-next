import type { Meta, StoryObj } from '@storybook/react';
import DocumentoDecisiones from '../../src/components/ui/DocumentoDecisiones';

/* ───────────────────────────────────────────
 * Meta
 * ─────────────────────────────────────────── */

const meta = {
  title: 'Organisms/DocumentoDecisiones',
  component: DocumentoDecisiones,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `# DocumentoDecisiones

Documento de Decisiones ATI-03 — Informe Técnico Energético para el cliente final.

## Anatomía (6 Capas)

\`\`\`
DocumentoDecisiones
├── Capa 1 · Estado Real       → Veredicto + resumen + nivel de confianza
├── Capa 2 · Problemas         → Críticos / Importantes / Mejoras (acordeón)
├── Capa 3 · Plan de Acción    → Actuaciones priorizadas (1..N)
├── Capa 4 · Ahorro Económico  → Ahorro total + desglose + proyección
├── Capa 5 · Inversión y Retorno → Merece / Valóralo / No recomendado
├── Capa 6 · Coste Inacción    → 1a / 5a / 10a + impacto reventa
└── Anexo Técnico              → Placeholder de descarga PDF
\`\`\`

## Funcionalidad UX

- **Acordeones interactivos** en cada capa para expandir/colapsar detalles
- **Mock data realista** con problemas críticos, paybacks y niveles de confianza
- **Sin dependencias externas** — CSS-in-JS puro con estilos inline
- **Responsive** — max-width 640px centrado (lectura mobile-first)

## Uso

\`\`\`tsx
import DocumentoDecisiones from '@/components/ui/DocumentoDecisiones';

// Con datos mock por defecto:
<DocumentoDecisiones />

// Con datos personalizados:
<DocumentoDecisiones data={miData} />
\`\`\``,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DocumentoDecisiones>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ═══════════════════════════════════════════
 * 1 · DEFAULT (mock data)
 * ═══════════════════════════════════════════ */

export const Default: Story = {
  name: '1 · Default (datos mock)',
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Documento de Decisiones con los datos mock realistas. Incluye 2 problemas críticos, 4 actuaciones priorizadas y proyección de ahorro.',
      },
    },
  },
};

/* ═══════════════════════════════════════════
 * 2 · ESTADO BUENA
 * ═══════════════════════════════════════════ */

export const EstadoBuena: Story = {
  name: '2 · Estado: Buena',
  args: {
    data: {
      estado_real: {
        veredicto: 'Buena',
        direccion: 'Av. Diagonal, 123, Barcelona',
        nivel_confianza: 'Alto',
        fecha: '15 de julio de 2026',
        resumen: 'Tu vivienda tiene un estado energético Bueno. El consumo real está dentro de lo esperado para tu certificado energético. Solo se recomiendan mejoras opcionales.',
      },
      problemas: [
        {
          id: 'p1',
          nombre: 'Aislamiento de fachada mejorable',
          categoria: 'mejora',
          descripcion: 'La fachada no tiene aislamiento térmico exterior. Es anterior a CTE 2006.',
          por_que_importa: 'Una fachada sin aislamiento pierde calor en invierno, aunque tu consumo actual es aceptable.',
          si_no_actuas: 'No hay urgencia, pero podrías ahorrar hasta 150 €/año adicionales.',
          nivel_confianza: 'Medio',
          actuacion_asociada: 'SATE (Aislamiento térmico exterior)',
        },
      ],
      actuaciones: [
        {
          id: 'a1',
          posicion: 1,
          nombre: 'SATE (Aislamiento térmico exterior)',
          inversion_estimada: 8500,
          ahorro_anual: 150,
          veredicto: 'valoralo',
          payback: 57,
          descripcion: 'Aislamiento térmico por el exterior con 10 cm de EPS.',
          justificacion_posicion: 'Única mejora recomendada. El payback es muy largo pero mejora la calificación.',
          nivel_confianza_ahorro: 'Medio',
          vida_util: 30,
          veredicto_detalle: 'Payback de 57 años. Solo recomendable si ya planeas reformar la fachada.',
          notas_at: 'Consulta subvenciones disponibles para rehabilitación.',
        },
      ],
      ahorro_total: 150,
      coste_actual: 1200,
      coste_tras_mejoras: 1050,
      desglose_ahorro: { calefaccion: 90, refrigeracion: 30, acs: 20, iluminacion: 10 },
      coste_inaccion_1a: 150,
      coste_inaccion_5a: 750,
      coste_inaccion_10a: 1500,
      impacto_reventa: 'Tu vivienda ya tiene una buena calificación. Las mejoras pueden aumentar el atractivo comercial pero no son necesarias.',
      riesgo_regulatorio: 'Tu vivienda cumple con los requisitos actuales y previsibles para 2030.',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Escenario con estado "Buena". Solo aparece una mejora opcional con veredicto "Valóralo". Sin problemas críticos ni importantes.',
      },
    },
  },
};

/* ═══════════════════════════════════════════
 * 3 · ESTADO DEFICIENTE (caso extremo)
 * ═══════════════════════════════════════════ */

export const EstadoDeficiente: Story = {
  name: '3 · Estado: Deficiente',
  args: {
    data: {
      estado_real: {
        veredicto: 'Deficiente',
        direccion: 'C/ Industria, 8, 1º, L\'Hospitalet',
        nivel_confianza: 'Alto',
        fecha: '15 de julio de 2026',
        resumen: 'Tu vivienda tiene un estado energético Deficiente. El consumo real duplica el estimado de tu certificado. Hay 3 problemas críticos que requieren atención inmediata.',
      },
      problemas: [
        {
          id: 'p1',
          nombre: 'Cubierta sin aislamiento con goteras',
          categoria: 'critico',
          descripcion: 'La cubierta plana no tiene aislamiento y presenta múltiples filtraciones de agua.',
          por_que_importa: 'Pérdida del 30% de calefacción por la cubierta. La humedad afecta a toda la estructura.',
          si_no_actuas: 'A 1 año: daños estructurales graves. A 3 años:可能需要 reparación mayor de cubierta >10.000 €.',
          nivel_confianza: 'Alto',
          actuacion_asociada: 'Impermeabilización y aislamiento de cubierta',
        },
        {
          id: 'p2',
          nombre: 'Caldera sin mantenimiento (20 años)',
          categoria: 'critico',
          descripcion: 'Caldera de gasoil con más de 20 años. Rendimiento estimado del 55%.',
          por_que_importa: 'Consume el doble de combustible. Riesgo alto de avería y seguridad.',
          si_no_actuas: 'A 1 año: 600 € extra en combustible. A 2 años: avería total probable.',
          nivel_confianza: 'Alto',
          actuacion_asociada: 'Sustitución por aerotermia',
        },
        {
          id: 'p3',
          nombre: 'Ventanas monovidrio',
          categoria: 'critico',
          descripcion: 'Ventanas de aluminio con monovidrio de 4 mm. Sin rotura de puente térmico.',
          por_que_importa: 'Se escapa el 40% de la calefacción por las ventanas. Sensación de frío constante.',
          si_no_actuas: 'Pérdida energética continua. El confort es muy bajo en invierno y verano.',
          nivel_confianza: 'Alto',
          actuacion_asociada: 'Sustitución de ventanas a Clase 1',
        },
        {
          id: 'p4',
          nombre: 'Fachada sin aislamiento',
          categoria: 'importante',
          descripcion: 'Fachada de ladrillo visto sin cámara de aire ni aislamiento.',
          por_que_importa: 'Puente térmico generalizado en toda la envolvente.',
          si_no_actuas: 'Pérdida constante de energía. Las facturas serán siempre altas.',
          nivel_confianza: 'Medio',
          actuacion_asociada: 'SATE',
        },
      ],
      actuaciones: [
        {
          id: 'a1', posicion: 1, nombre: 'Impermeabilización y aislamiento de cubierta',
          inversion_estimada: 5800, ahorro_anual: 720, veredicto: 'merece', payback: 8,
          descripcion: 'Impermeabilización completa + 12 cm de aislamiento rígido.',
          justificacion_posicion: 'Crítico: soluciona goteras y aporta el mayor ahorro.',
          nivel_confianza_ahorro: 'Alto', vida_util: 25,
          veredicto_detalle: 'Payback de 8 años. Recuperas la inversión 3 veces durante su vida útil.',
        },
        {
          id: 'a2', posicion: 2, nombre: 'Sustitución de caldera por aerotermia',
          inversion_estimada: 9500, ahorro_anual: 840, veredicto: 'merece', payback: 11.3,
          descripcion: 'Bomba de calor aerotérmica + depósito ACS.',
          justificacion_posicion: 'Crítico: riesgo de seguridad y consumo desorbitado.',
          nivel_confianza_ahorro: 'Alto', vida_util: 15,
          veredicto_detalle: 'Payback de 11,3 años. Eliminas el consumo de gasoil por completo.',
        },
        {
          id: 'a3', posicion: 3, nombre: 'Sustitución de ventanas a Clase 1',
          inversion_estimada: 5200, ahorro_anual: 480, veredicto: 'merece', payback: 10.8,
          descripcion: '5 ventanas de PVC con triple aislamiento.',
          justificacion_posicion: 'Crítico por pérdida de confort y eficiencia.',
          nivel_confianza_ahorro: 'Alto', vida_util: 25,
          veredicto_detalle: 'Payback de 10,8 años. Mejora drástica del confort térmico.',
        },
        {
          id: 'a4', posicion: 4, nombre: 'SATE',
          inversion_estimada: 10200, ahorro_anual: 420, veredicto: 'valoralo', payback: 24.3,
          descripcion: '12 cm de EPS en toda la fachada.',
          justificacion_posicion: 'Importante pero payback largo. Háztelo si reformas fachada.',
          nivel_confianza_ahorro: 'Medio', vida_util: 30,
          veredicto_detalle: 'Payback de 24,3 años. Recomendable solo con reforma.',
        },
      ],
      ahorro_total: 2460,
      coste_actual: 3800,
      coste_tras_mejoras: 1340,
      desglose_ahorro: { calefaccion: 1280, refrigeracion: 340, acs: 620, iluminacion: 220 },
      coste_inaccion_1a: 2460,
      coste_inaccion_5a: 12300,
      coste_inaccion_10a: 24600,
      impacto_reventa: 'Una vivienda con calificación G puede perder hasta un 20% de valor frente a una C.',
      riesgo_regulatorio: 'A partir de 2033 será obligatorio calificación mínima D. Tu vivienda actual no la alcanza.',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Caso extremo con estado "Deficiente". 3 problemas críticos, 3 actuaciones "Merece la pena" y 1 "Valóralo". Proyecciones de ahorro agresivas y riesgo regulatorio alto.',
      },
    },
  },
};

/* ═══════════════════════════════════════════
 * 4 · SIN PROBLEMAS CRÍTICOS
 * ═══════════════════════════════════════════ */

export const SinCriticos: Story = {
  name: '4 · Sin problemas críticos',
  args: {
    data: {
      estado_real: {
        veredicto: 'Regular',
        direccion: 'C/ Valencia, 45, 2º, Barcelona',
        nivel_confianza: 'Alto',
        fecha: '15 de julio de 2026',
        resumen: 'Tu vivienda tiene un estado Regular. Sin problemas críticos, pero hay mejoras importantes que pueden reducir tu factura.',
      },
      problemas: [
        {
          id: 'p1',
          nombre: 'Ventanas con puente térmico',
          categoria: 'importante',
          descripcion: 'Ventanas de aluminio sin RPT de más de 15 años.',
          por_que_importa: 'Pérdida del 25% de calefacción. Confort reducido.',
          si_no_actuas: 'Seguirás pagando 200 €/año extra en climatización.',
          nivel_confianza: 'Medio',
          actuacion_asociada: 'Sustitución de ventanas',
        },
        {
          id: 'p2',
          nombre: 'Aislamiento de fachada mejorable',
          categoria: 'mejora',
          descripcion: 'Fachada sin aislamiento exterior.',
          por_que_importa: 'Pérdida adicional de eficiencia.',
          si_no_actuas: 'No urgente, pero a largo plazo pagas más.',
          nivel_confianza: 'Bajo',
          actuacion_asociada: 'SATE',
        },
      ],
      actuaciones: [
        {
          id: 'a1', posicion: 1, nombre: 'Sustitución de ventanas a Clase 1',
          inversion_estimada: 4200, ahorro_anual: 280, veredicto: 'merece', payback: 15,
          descripcion: '5 ventanas de PVC con doble acristalamiento bajo emisivo.',
          justificacion_posicion: 'Mayor impacto inmediato en confort y ahorro.',
          nivel_confianza_ahorro: 'Medio', vida_util: 25,
          veredicto_detalle: 'Payback de 15 años. Vida útil de 25 años. Mejora notable del confort.',
        },
        {
          id: 'a2', posicion: 2, nombre: 'SATE',
          inversion_estimada: 8500, ahorro_anual: 180, veredicto: 'valoralo', payback: 47,
          descripcion: 'Aislamiento térmico exterior.',
          justificacion_posicion: 'Payback muy largo. Solo si reformas fachada.',
          nivel_confianza_ahorro: 'Bajo', vida_util: 30,
          veredicto_detalle: 'Payback de 47 años. No recuperas la inversión.',
        },
      ],
      ahorro_total: 460,
      coste_actual: 1900,
      coste_tras_mejoras: 1440,
      desglose_ahorro: { calefaccion: 240, refrigeracion: 80, acs: 100, iluminacion: 40 },
      coste_inaccion_1a: 460,
      coste_inaccion_5a: 2300,
      coste_inaccion_10a: 4600,
      impacto_reventa: 'Mejorar la calificación puede aumentar el valor de reventa hasta un 8%.',
      riesgo_regulatorio: 'Tu vivienda cumple los requisitos actuales pero podría necesitar mejoras antes de 2033.',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Escenario sin problemas críticos. Solo importantes y mejoras. Útil para visualizar el comportamiento del componente cuando no hay elementos de categoría "critico".',
      },
    },
  },
};
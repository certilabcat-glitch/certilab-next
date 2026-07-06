import type { Meta, StoryObj } from '@storybook/react';
import DataTable, { type Column } from '../../src/components/ui/DataTable';

/* ───────────────────────────────────────────
 * Mock Types & Helpers
 * ─────────────────────────────────────────── */

/** Simula un Badge inline para Storybook (sin importar componente real) */
const FakeBadge = ({ label, variant }: { label: string; variant: 'default' | 'success' | 'warning' | 'error' | 'info' }) => {
  const v: Record<string, { bg: string; color: string; border: string }> = {
    default: { bg: '#F5EFE6', color: '#8B6F47', border: '#E8E4DD' },
    success: { bg: '#ecfdf5', color: '#166534', border: '#bbf7d0' },
    warning: { bg: '#fffbeb', color: '#92400e', border: '#fde68a' },
    error: { bg: '#fef2f2', color: '#991b1b', border: '#fecaca' },
    info: { bg: '#eff6ff', color: '#1e40af', border: '#bfdbfe' },
  };
  const s = v[variant] ?? v.default;
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.125rem 0.5rem',
      fontSize: '0.75rem',
      fontWeight: 600,
      borderRadius: '9999px',
      background: s.bg,
      color: s.color,
      border: `1px solid ${s.border}`,
      lineHeight: 1.4,
    }}>
      {label}
    </span>
  );
};

/** Simula un botón inline */
const FakeButton = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      padding: '0.25rem 0.75rem',
      fontSize: '0.75rem',
      fontWeight: 600,
      borderRadius: '6px',
      border: '1px solid #8B6F47',
      background: '#8B6F47',
      color: '#fff',
      cursor: 'pointer',
      lineHeight: 1.4,
    }}
  >
    {label}
  </button>
);

/** Simula un link inline */
const FakeLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: '#8B6F47',
      fontWeight: 500,
      textDecoration: 'underline',
      textUnderlineOffset: '2px',
    }}
    onClick={(e) => e.preventDefault()}
  >
    {label}
  </a>
);

/* ───────────────────────────────────────────
 * Mock Data Types
 * ─────────────────────────────────────────── */

interface Expediente {
  id: string;
  referencia: string;
  cliente: string;
  tipo: string;
  estado: string;
  fecha: string;
  acciones?: string;
}

interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  expedientes: number;
  estado: string;
}

interface Documento {
  id: string;
  nombre: string;
  expediente: string;
  tipo: string;
  tamaño: string;
  fecha: string;
}

/* ───────────────────────────────────────────
 * Mock Data
 * ─────────────────────────────────────────── */

const statusList = ['Completado', 'En curso', 'Pendiente', 'Revisión', 'Entregado'];
const statusMap: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
  'Completado': 'success',
  'Entregado': 'success',
  'En curso': 'info',
  'Pendiente': 'warning',
  'Revisión': 'warning',
  'Inactivo': 'error',
  'Activo': 'success',
};

const sampleExpedientes: Expediente[] = [
  { id: '1', referencia: 'EXP-2024-001', cliente: 'Ana García López', tipo: 'Certificado Energético', estado: 'Completado', fecha: '2024-01-15' },
  { id: '2', referencia: 'EXP-2024-002', cliente: 'Carlos Martínez Ruiz', tipo: 'Inspección Técnica', estado: 'En curso', fecha: '2024-02-20' },
  { id: '3', referencia: 'EXP-2024-003', cliente: 'Elena Sánchez Pérez', tipo: 'Certificado Energético', estado: 'Pendiente', fecha: '2024-03-10' },
  { id: '4', referencia: 'EXP-2024-004', cliente: 'Miguel Ángel Torres', tipo: 'Auditoría Energética', estado: 'Revisión', fecha: '2024-03-22' },
  { id: '5', referencia: 'EXP-2024-005', cliente: 'Laura Jiménez Díaz', tipo: 'Certificado Energético', estado: 'Entregado', fecha: '2024-04-05' },
];

const sampleClientes: Cliente[] = [
  { id: '1', nombre: 'Ana García López', email: 'ana.garcia@email.com', telefono: '+34 612 345 678', expedientes: 3, estado: 'Activo' },
  { id: '2', nombre: 'Carlos Martínez Ruiz', email: 'carlos.martinez@email.com', telefono: '+34 623 456 789', expedientes: 7, estado: 'Activo' },
  { id: '3', nombre: 'Elena Sánchez Pérez', email: 'elena.sanchez@email.com', telefono: '+34 634 567 890', expedientes: 1, estado: 'Inactivo' },
  { id: '4', nombre: 'Miguel Ángel Torres', email: 'miguel.torres@email.com', telefono: '+34 645 678 901', expedientes: 5, estado: 'Activo' },
  { id: '5', nombre: 'Laura Jiménez Díaz', email: 'laura.jimenez@email.com', telefono: '+34 656 789 012', expedientes: 2, estado: 'Activo' },
];

const sampleDocumentos: Documento[] = [
  { id: '1', nombre: 'Certificado_2024_001.pdf', expediente: 'EXP-2024-001', tipo: 'PDF', tamaño: '2.4 MB', fecha: '2024-01-15' },
  { id: '2', nombre: 'Informe_tecnico_002.docx', expediente: 'EXP-2024-002', tipo: 'DOCX', tamaño: '1.8 MB', fecha: '2024-02-20' },
  { id: '3', nombre: 'Plano_energetico_003.pdf', expediente: 'EXP-2024-003', tipo: 'PDF', tamaño: '4.2 MB', fecha: '2024-03-10' },
  { id: '4', nombre: 'Fotografias_004.zip', expediente: 'EXP-2024-004', tipo: 'ZIP', tamaño: '8.5 MB', fecha: '2024-03-22' },
  { id: '5', nombre: 'Acta_inspeccion_005.pdf', expediente: 'EXP-2024-005', tipo: 'PDF', tamaño: '1.2 MB', fecha: '2024-04-05' },
];

const generateManyExpedientes = (count: number): Expediente[] =>
  Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    referencia: `EXP-2024-${String(i + 1).padStart(3, '0')}`,
    cliente: `Cliente ${i + 1}`,
    tipo: ['Certificado Energético', 'Inspección Técnica', 'Auditoría Energética'][i % 3],
    estado: statusList[i % statusList.length],
    fecha: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
  }));

/* ───────────────────────────────────────────
 * Column Definitions
 * ─────────────────────────────────────────── */

/* Las columnas se definen con el tipo T concreto para type-safety interna */
/* pero los stories las reciben como Column<unknown>[] — la inferencia falla */
/* por ser DataTable un componente genérico. Es un error conocido de Storybook. */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const C = DataTable as React.ComponentType<any>;

const baseColumns: Column<Expediente>[] = [
  { key: 'referencia', header: 'Referencia' },
  { key: 'cliente', header: 'Cliente' },
  { key: 'tipo', header: 'Tipo' },
  {
    key: 'estado',
    header: 'Estado',
    render: (item: Expediente) => <FakeBadge label={item.estado} variant={statusMap[item.estado] ?? 'default'} />,
  },
  { key: 'fecha', header: 'Fecha' },
];

const clienteColumns: Column<Cliente>[] = [
  { key: 'nombre', header: 'Nombre' },
  { key: 'email', header: 'Email', hideOnMobile: true },
  { key: 'telefono', header: 'Teléfono', hideOnMobile: true },
  { key: 'expedientes', header: 'Exp.' },
  {
    key: 'estado',
    header: 'Estado',
    render: (item: Cliente) => <FakeBadge label={item.estado} variant={statusMap[item.estado] ?? 'default'} />,
  },
];

const documentoColumns: Column<Documento>[] = [
  {
    key: 'nombre',
    header: 'Documento',
    render: (item: Documento) => <FakeLink href={`/docs/${item.id}`} label={item.nombre} />,
  },
  { key: 'expediente', header: 'Expediente' },
  { key: 'tipo', header: 'Tipo' },
  { key: 'tamaño', header: 'Tamaño' },
  { key: 'fecha', header: 'Subido' },
];

/* ───────────────────────────────────────────
 * Meta
 * ─────────────────────────────────────────── */

const meta = {
  title: 'Molecules/DataTable',
  component: C,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `# DataTable

Sistema oficial de tablas de Certilab Platform.

## Anatomy

\`\`\`
DataTable<T>
├── Loading state   → spinner + texto
├── Error state     → banner con role="alert"
├── Empty state     → icono + mensaje personalizable
└── Data state
    ├── <thead>     → sticky opcional, hideOnMobile
    └── <tbody>     → striped, clickable vía onRowClick
\`\`\`

## Composición

DataTable se compone con **Badge**, **Button**, **Link** y cualquier componente React
mediante la prop \`col.render(item)\` — sin acoplamiento directo.

## Accesibilidad

- \`role="table"\`, \`role="button"\` en filas clickables
- \`role="alert"\` en error, \`role="status"\` en loading
- Navegación por teclado (Enter/Space) en filas interactivas
- \`aria-label\` para describir la tabla`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof C>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ═══════════════════════════════════════════
 * 1. BASIC TABLE
 * ═══════════════════════════════════════════ */

export const Basic: Story = {
  name: '1 · Tabla básica',
  args: {
    columns: [
      { key: 'referencia', header: 'Referencia' },
      { key: 'cliente', header: 'Cliente' },
      { key: 'tipo', header: 'Tipo' },
      { key: 'estado', header: 'Estado' },
      { key: 'fecha', header: 'Fecha' },
    ] as Column<unknown>[],
    data: sampleExpedientes,
    'aria-label': 'Expedientes básicos',
  },
  parameters: {
    docs: {
      description: { story: 'Uso mínimo: columnas, datos y aria-label.' },
    },
  },
};

/* ═══════════════════════════════════════════
 * 2. TABLE WITH BADGES
 * ═══════════════════════════════════════════ */

export const WithBadges: Story = {
  name: '2 · Tabla con Badges',
  args: {
    columns: [
      { key: 'referencia', header: 'Referencia' },
      { key: 'cliente', header: 'Cliente' },
      { key: 'tipo', header: 'Tipo' },
      {
        key: 'estado',
        header: 'Estado',
        render: (item: Expediente) => <FakeBadge label={item.estado} variant={statusMap[item.estado] ?? 'default'} />,
      },
      { key: 'fecha', header: 'Fecha' },
    ] as Column<unknown>[],
    data: sampleExpedientes,
    'aria-label': 'Expedientes con badges de estado',
  },
  parameters: {
    docs: {
      description: { story: 'La columna "Estado" usa `render` para inyectar un Badge con el color correspondiente.' },
    },
  },
};

/* ═══════════════════════════════════════════
 * 3. TABLE WITH BUTTONS
 * ═══════════════════════════════════════════ */

export const WithButtons: Story = {
  name: '3 · Tabla con Buttons',
  args: {
    columns: [
      { key: 'referencia', header: 'Referencia' },
      { key: 'cliente', header: 'Cliente' },
      {
        key: 'acciones',
        header: 'Acciones',
        render: () => <FakeButton label="Ver detalle" />,
        className: 'text-right',
        headerClassName: 'text-right',
      },
    ] as Column<unknown>[],
    data: sampleExpedientes,
    'aria-label': 'Expedientes con botones de acción',
  },
  parameters: {
    docs: {
      description: { story: 'Botones inyectados mediante `render`. El click del botón no interfiere con `onRowClick`.' },
    },
  },
};

/* ═══════════════════════════════════════════
 * 4. TABLE WITH LINKS
 * ═══════════════════════════════════════════ */

export const WithLinks: Story = {
  name: '4 · Tabla con Links',
  args: {
    columns: [
      {
        key: 'nombre',
        header: 'Documento',
        render: (item: Documento) => <FakeLink href={`/docs/${item.id}`} label={item.nombre} />,
      },
      { key: 'expediente', header: 'Expediente' },
      { key: 'tipo', header: 'Tipo' },
      { key: 'tamaño', header: 'Tamaño' },
      { key: 'fecha', header: 'Subido' },
    ] as Column<unknown>[],
    data: sampleDocumentos,
    'aria-label': 'Documentos con enlaces',
  },
  parameters: {
    docs: {
      description: { story: 'Enlaces a documentos inyectados mediante `render`.' },
    },
  },
};

/* ═══════════════════════════════════════════
 * 5. EMPTY TABLE
 * ═══════════════════════════════════════════ */

export const Empty: Story = {
  name: '5 · Tabla vacía',
  args: {
    columns: baseColumns as Column<unknown>[],
    data: [],
    'aria-label': 'Tabla vacía',
  },
  parameters: {
    docs: {
      description: { story: 'Estado vacío por defecto. Muestra icono + mensaje "No hay datos disponibles."' },
    },
  },
};

export const EmptyCustom: Story = {
  name: '5b · Tabla vacía (mensaje personalizado)',
  args: {
    columns: baseColumns as Column<unknown>[],
    data: [],
    emptyMessage: 'No se encontraron expedientes para este filtro.',
    'aria-label': 'Tabla vacía con mensaje personalizado',
  },
  parameters: {
    docs: {
      description: { story: 'Mensaje personalizado mediante la prop `emptyMessage`.' },
    },
  },
};

/* ═══════════════════════════════════════════
 * 6. LOADING TABLE
 * ═══════════════════════════════════════════ */

export const Loading: Story = {
  name: '6 · Tabla Loading',
  args: {
    columns: baseColumns as Column<unknown>[],
    data: [],
    loading: true,
    'aria-label': 'Tabla en carga',
  },
  parameters: {
    docs: {
      description: { story: 'Estado de carga con spinner animado y texto. `role="status"` para accesibilidad.' },
    },
  },
};

/* ═══════════════════════════════════════════
 * 7. ERROR TABLE
 * ═══════════════════════════════════════════ */

export const ErrorState: Story = {
  name: '7 · Tabla Error',
  args: {
    columns: baseColumns as Column<unknown>[],
    data: [],
    error: 'Error de conexión con el servidor. Verifique su conexión a internet e intente nuevamente.',
    'aria-label': 'Tabla con error',
  },
  parameters: {
    docs: {
      description: { story: 'Estado de error con banner rojo, icono y mensaje. `role="alert"` para accesibilidad.' },
    },
  },
};

/* ═══════════════════════════════════════════
 * 8. STICKY HEADER
 * ═══════════════════════════════════════════ */

export const StickyHeader: Story = {
  name: '8 · Sticky Header',
  args: {
    columns: baseColumns as Column<unknown>[],
    data: generateManyExpedientes(15),
    stickyHeader: true,
    'aria-label': 'Expedientes con cabecera fija',
  },
  parameters: {
    docs: {
      description: { story: 'Cabecera fija (sticky) al hacer scroll vertical. Útil para tablas con muchos registros.' },
    },
  },
  decorators: [
    (StoryComponent) => (
      <div style={{ maxHeight: '350px', overflow: 'auto' }}>
        <StoryComponent />
      </div>
    ),
  ],
};

/* ═══════════════════════════════════════════
 * 9. ZEBRA STRIPES
 * ═══════════════════════════════════════════ */

export const Striped: Story = {
  name: '9 · Zebra Stripes',
  args: {
    columns: baseColumns as Column<unknown>[],
    data: sampleExpedientes,
    striped: true,
    'aria-label': 'Expedientes con filas alternadas',
  },
  parameters: {
    docs: {
      description: { story: 'Filas con color alternado (striped) para mejorar legibilidad en tablas densas.' },
    },
  },
};

/* ═══════════════════════════════════════════
 * 10. RESPONSIVE MOBILE
 * ═══════════════════════════════════════════ */

export const ResponsiveMobile: Story = {
  name: '10 · Responsive Mobile',
  args: {
    columns: [
      { key: 'nombre', header: 'Nombre' },
      { key: 'email', header: 'Email', hideOnMobile: true },
      { key: 'expedientes', header: 'Exp.' },
      {
        key: 'estado',
        header: 'Estado',
        render: (item: Cliente) => <FakeBadge label={item.estado} variant={statusMap[item.estado] ?? 'default'} />,
      },
    ] as Column<unknown>[],
    data: sampleClientes,
    striped: true,
    'aria-label': 'Clientes responsive',
  },
  parameters: {
    docs: {
      description: { story: 'Columnas con `hideOnMobile` se ocultan en viewports < 768px. Escalar el panel de Storybook para ver el efecto.' },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/* ═══════════════════════════════════════════
 * 11. DASHBOARD DE EXPEDIENTES
 * ═══════════════════════════════════════════ */

const dashboardColumns: Column<Expediente>[] = [
  { key: 'referencia', header: 'Referencia' },
  { key: 'cliente', header: 'Cliente' },
  {
    key: 'estado',
    header: 'Estado',
    render: (item: Expediente) => <FakeBadge label={item.estado} variant={statusMap[item.estado] ?? 'default'} />,
  },
  { key: 'fecha', header: 'Fecha' },
  {
    key: 'acciones',
    header: '',
    render: () => <FakeButton label="Abrir" />,
    className: 'text-right',
    headerClassName: 'text-right',
  },
];

export const ExpedientesDashboard: Story = {
  name: '11 · Dashboard de Expedientes',
  args: {
    columns: dashboardColumns as Column<unknown>[],
    data: sampleExpedientes,
    onRowClick: (item: unknown) => console.log('Row clicked:', (item as Expediente).referencia),
    striped: true,
    'aria-label': 'Dashboard de expedientes',
  },
  parameters: {
    docs: {
      description: { story: 'Simulación del dashboard de expedientes con filas clickables, badges de estado y botón de acción.' },
    },
  },
};

/* ═══════════════════════════════════════════
 * 12. LISTA DE CLIENTES
 * ═══════════════════════════════════════════ */

export const ClientesList: Story = {
  name: '12 · Lista de Clientes',
  args: {
    columns: clienteColumns as Column<unknown>[],
    data: sampleClientes,
    onRowClick: (item: unknown) => console.log('Cliente:', (item as Cliente).nombre),
    striped: true,
    stickyHeader: true,
    'aria-label': 'Lista de clientes',
  },
  parameters: {
    docs: {
      description: { story: 'Lista completa de clientes con email y teléfono ocultos en mobile, filas clickables y cabecera fija.' },
    },
  },
};

/* ═══════════════════════════════════════════
 * 13. LISTA DE DOCUMENTOS
 * ═══════════════════════════════════════════ */

export const DocumentosList: Story = {
  name: '13 · Lista de Documentos',
  args: {
    columns: documentoColumns as Column<unknown>[],
    data: sampleDocumentos,
    'aria-label': 'Lista de documentos',
  },
  parameters: {
    docs: {
      description: { story: 'Lista de documentos con enlaces directos a cada archivo.' },
    },
  },
};

/* ═══════════════════════════════════════════
 * 14. MÁS DE 50 FILAS
 * ═══════════════════════════════════════════ */

const manyColumns: Column<Expediente>[] = [
  { key: 'referencia', header: 'Ref.' },
  { key: 'cliente', header: 'Cliente' },
  { key: 'tipo', header: 'Tipo', hideOnMobile: true },
  {
    key: 'estado',
    header: 'Estado',
    render: (item: Expediente) => <FakeBadge label={item.estado} variant={statusMap[item.estado] ?? 'default'} />,
  },
  { key: 'fecha', header: 'Fecha', hideOnMobile: true },
];

export const ManyRows: Story = {
  name: '14 · Más de 50 filas',
  args: {
    columns: manyColumns as Column<unknown>[],
    data: generateManyExpedientes(55),
    striped: true,
    stickyHeader: true,
    onRowClick: (item: unknown) => console.log('Row:', (item as Expediente).referencia),
    'aria-label': 'Listado completo de expedientes',
  },
  parameters: {
    docs: {
      description: { story: '55 filas con sticky header, striped y filas clickables. Prueba de rendimiento y scroll vertical.' },
    },
  },
  decorators: [
    (StoryComponent) => (
      <div style={{ maxHeight: '450px', overflow: 'auto' }}>
        <StoryComponent />
      </div>
    ),
  ],
};

/* ═══════════════════════════════════════════
 * 15. ACCIONES POR FILA
 * ═══════════════════════════════════════════ */

export const RowActions: Story = {
  name: '15 · Acciones por fila',
  args: {
    columns: [
      { key: 'referencia', header: 'Expediente' },
      { key: 'cliente', header: 'Cliente' },
      {
        key: 'estado',
        header: 'Estado',
        render: (item: Expediente) => <FakeBadge label={item.estado} variant={statusMap[item.estado] ?? 'default'} />,
      },
      {
        key: 'acciones',
        header: '',
        render: (item: Expediente) => (
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <FakeButton label="Editar" onClick={() => console.log('Editar:', item.referencia)} />
            <button
              type="button"
              style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: '6px',
                border: '1px solid #dc2626',
                background: '#fff',
                color: '#dc2626',
                cursor: 'pointer',
                lineHeight: 1.4,
              }}
              onClick={() => console.log('Eliminar:', item.referencia)}
            >
              Eliminar
            </button>
          </div>
        ),
        className: 'text-right',
        headerClassName: 'text-right',
      },
    ] as Column<unknown>[],
    data: sampleExpedientes,
    striped: true,
    'aria-label': 'Expedientes con acciones por fila',
  },
  parameters: {
    docs: {
      description: { story: 'Múltiples acciones por fila usando composición dentro de `render`. Botón primario y botón de peligro.' },
    },
  },
};
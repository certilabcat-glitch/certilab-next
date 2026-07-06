'use client';

import { useRouter } from 'next/navigation';
import DataTable, { type Column } from '@/components/ui/DataTable';
import Badge from '@/components/ui/Badge';

/* ───────────────────────────────────────────
 * Types
 * ─────────────────────────────────────────── */

type ExpedienteRow = {
  id: string;
  numero_expediente: string;
  estado: string;
  titulo: string | null;
  created_at: string;
};

interface ExpedientesTableProps {
  expedientes: ExpedienteRow[];
  tipo: 'activos' | 'completados';
}

/* ───────────────────────────────────────────
 * Estado → Badge variant mapper
 * Mantiene el mismo mapping visual que el
 * sistema anterior (colores ad-hoc).
 * ─────────────────────────────────────────── */

const estadoVariant: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  Solicitud: 'warning',
  PteDocumentacion: 'warning',
  EnRevisionPITR: 'info',
  Auditado: 'info',
  RevisionManual: 'info',
  Aprobado: 'success',
  Entregado: 'success',
  pendiente: 'warning',
  pago_pendiente: 'warning',
  pago_recibido: 'info',
  expediente_creado: 'info',
  en_revision: 'info',
  informe_enviado: 'success',
  cerrado: 'default',
  rechazado: 'error',
  cancelado: 'error',
};

const estadoLabels: Record<string, string> = {
  Solicitud: 'Solicitud',
  PteDocumentacion: 'Pendiente de documentación',
  EnRevisionPITR: 'En revisión automática',
  Auditado: 'Auditado',
  RevisionManual: 'En revisión técnica',
  Aprobado: 'Aprobado',
  Entregado: 'Resultado entregado',
  pendiente: 'Pendiente',
  pago_pendiente: 'Pago pendiente',
  pago_recibido: 'Pago recibido',
  expediente_creado: 'Expediente creado',
  en_revision: 'En revisión',
  informe_enviado: 'Informe enviado',
  cerrado: 'Cerrado',
  rechazado: 'Rechazado',
  cancelado: 'Cancelado',
};

/* ───────────────────────────────────────────
 * Column definitions
 * ─────────────────────────────────────────── */

function createColumns(): Column<ExpedienteRow>[] {
  return [
    {
      key: 'titulo',
      header: 'Expediente',
      render: (item) => (
        <div>
          <p className="text-sm font-medium text-gray-900">
            {item.titulo ?? 'Segunda Opinión'}
          </p>
          <p className="text-sm text-gray-500 mt-0.5">
            {item.numero_expediente}
          </p>
        </div>
      ),
    },
    {
      key: 'estado',
      header: 'Estado',
      render: (item) => (
        <Badge
          variant={estadoVariant[item.estado] ?? 'default'}
          size="sm"
          label={estadoLabels[item.estado] ?? item.estado}
        />
      ),
    },
    {
      key: 'created_at',
      header: 'Creado',
      className: 'hidden md:table-cell',
      headerClassName: 'hidden md:table-cell',
      render: (item) => (
        <span className="text-sm text-gray-500">
          {new Date(item.created_at).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      ),
    },
  ];
}

/* ───────────────────────────────────────────
 * Component
 * ─────────────────────────────────────────── */

export default function ExpedientesTable({ expedientes, tipo }: ExpedientesTableProps) {
  const router = useRouter();

  const emptyMessage =
    tipo === 'activos'
      ? 'No tienes expedientes activos en este momento.'
      : 'No tienes expedientes completados aún.';

  return (
    <DataTable
      columns={createColumns()}
      data={expedientes}
      emptyMessage={emptyMessage}
      onRowClick={(item) => router.push(`/plataforma/expedientes/${item.id}`)}
      striped
      stickyHeader
      aria-label={
        tipo === 'activos' ? 'Expedientes activos' : 'Expedientes completados'
      }
    />
  );
}
'use client';

import { useRouter } from 'next/navigation';
import DataTable, { type Column } from '@/components/ui/DataTable';
import Badge from '@/components/ui/Badge';
import type { ExpedienteRow } from '@/types/core/expediente';

interface BandejaTecnicaTableProps {
  expedientes: ExpedienteRow[];
}

export default function BandejaTecnicaTable({ expedientes }: BandejaTecnicaTableProps) {
  const router = useRouter();

  const columns: Column<ExpedienteRow>[] = [
    {
      key: 'numero_expediente',
      header: 'Nº Expediente',
      className: 'font-mono text-blue-600',
      render: (item) => item.numero_expediente,
    },
    {
      key: 'servicio',
      header: 'Servicio',
      render: (item) => (
        <span className="capitalize">
          {item.servicio?.replace(/_/g, ' ') ?? '—'}
        </span>
      ),
    },
    {
      key: 'titulo',
      header: 'Título',
      render: (item) => (
        <span className="max-w-xs truncate block">
          {item.titulo ?? '—'}
        </span>
      ),
    },
    {
      key: 'created_at',
      header: 'Recibido',
      render: (item) => (
        <span className="text-sm text-gray-500">
          {new Date(item.created_at).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      ),
    },
    {
      key: 'estado',
      header: 'Estado',
      render: (item) => (
        <Badge variant="warning" size="sm" label={item.estado} />
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={expedientes}
      emptyMessage="No hay expedientes pendientes."
      onRowClick={(item) => router.push(`/at/expedientes/${item.id}`)}
      striped
      stickyHeader
      aria-label="Bandeja técnica de expedientes pendientes"
    />
  );
}
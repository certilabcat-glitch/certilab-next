import { type ReactNode } from 'react';

/* ───────────────────────────────────────────
 * Types
 * ─────────────────────────────────────────── */

export interface Column<T> {
  /** Unique key for the column. Used as React key. */
  key: string;
  /** Header text or element */
  header: ReactNode;
  /**
   * Custom cell renderer. Receives the whole row item.
   * When omitted, `String(item[key as keyof T])` is used as fallback.
   *
   * This is the contract that makes DataTable completely agnostic:
   * consumers pass Badge, Button, Link or any component via this function.
   */
  render?: (item: T) => ReactNode;
  /** Optional class name for every cell in this column */
  className?: string;
  /** Optional class name for the header cell */
  headerClassName?: string;
  /** Hide this column on mobile (below md breakpoint) */
  hideOnMobile?: boolean;
}

export interface DataTableProps<T> {
  /** Column definitions */
  columns: Column<T>[];
  /** Row data */
  data: T[];
  /** Show loading skeleton */
  loading?: boolean;
  /** Message shown when data is empty and not loading */
  emptyMessage?: string;
  /** Error message shown in an error banner above the table */
  error?: string;
  /** Called when a row is clicked */
  onRowClick?: (item: T) => void;
  /** Alternate row background colors */
  striped?: boolean;
  /** Make the header sticky (top-0) */
  stickyHeader?: boolean;
  /** Accessible label for the table region */
  'aria-label'?: string;
  /** Additional class name for the outer wrapper */
  className?: string;
}

/* ───────────────────────────────────────────
 * Inline icons (self-contained, tree-shakable)
 * ─────────────────────────────────────────── */

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin w-6 h-6 text-[var(--color-terra,#8B6F47)]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

function EmptyIcon() {
  return (
    <svg
      className="w-12 h-12 text-[var(--color-border,#E8E4DD)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

/* ───────────────────────────────────────────
 * Component
 * ─────────────────────────────────────────── */

function DataTable<T>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No hay datos disponibles.',
  error,
  onRowClick,
  striped = false,
  stickyHeader = false,
  'aria-label': ariaLabel,
  className = '',
}: DataTableProps<T>) {
  /* ─── Loading state ─── */
  if (loading) {
    return (
      <div
        role="status"
        aria-label="Cargando datos"
        className="flex flex-col items-center justify-center py-16 space-y-4"
      >
        <LoadingSpinner />
        <p className="text-sm text-[var(--color-grey,#4A4A4A)]">Cargando datos...</p>
      </div>
    );
  }

  /* ─── Error state ─── */
  if (error) {
    return (
      <div
        role="alert"
        className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200"
      >
        <span className="text-red-500 flex-shrink-0 mt-0.5">
          <ErrorIcon />
        </span>
        <div>
          <p className="text-sm font-medium text-red-800">Error al cargar los datos</p>
          <p className="text-sm text-red-600 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  /* ─── Empty state ─── */
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-3">
        <EmptyIcon />
        <p className="text-sm text-[var(--color-grey,#4A4A4A)]">{emptyMessage}</p>
      </div>
    );
  }

  /* ─── Data state ─── */
  const rowClasses = (index: number) => {
    const base = 'transition-colors duration-[var(--ease-default,200ms)]';
    const clickable = onRowClick
      ? 'cursor-pointer hover:bg-[var(--color-crema,#F5EFE6)]'
      : '';
    const stripe =
      striped && index % 2 !== 0
        ? 'bg-[var(--color-crema,#F5EFE6)]/40'
        : '';
    return [base, clickable, stripe].filter(Boolean).join(' ');
  };

  const headerClass = [
    'sticky top-0 z-10',
    'bg-[var(--color-dark,#333333)]',
    'text-white',
    'text-xs font-semibold uppercase tracking-wider',
    'px-4 py-3.5',
    'text-left',
    'whitespace-nowrap',
  ].join(' ');

  const cellClass = 'px-4 py-3.5 text-sm text-[var(--color-black,#0A0A0A)] whitespace-nowrap';

  const resolvedLabel = ariaLabel ?? 'Tabla de datos';

  return (
    <div className={`overflow-x-auto rounded-lg border border-[var(--color-border,#E8E4DD)] ${className}`}>
      <table role="table" aria-label={resolvedLabel} className="min-w-full divide-y divide-[var(--color-border,#E8E4DD)]">
        {/* ─── Header ─── */}
        <thead>
          <tr>
            {columns.map((col) => {
              const hideMobile = col.hideOnMobile
                ? 'hidden md:table-cell'
                : '';
              return (
                <th
                  key={col.key}
                  scope="col"
                  className={[
                    headerClass,
                    hideMobile,
                    col.headerClassName ?? '',
                    stickyHeader ? 'top-0' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={stickyHeader ? { position: 'sticky', top: 0 } : undefined}
                >
                  {col.header}
                </th>
              );
            })}
          </tr>
        </thead>

        {/* ─── Body ─── */}
        <tbody className="divide-y divide-[var(--color-border,#E8E4DD)] bg-white">
          {data.map((item, rowIndex) => {
            const clickProps = onRowClick
              ? {
                  onClick: () => onRowClick(item),
                  tabIndex: 0,
                  onKeyDown: (e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onRowClick(item);
                    }
                  },
                  'aria-label': `Fila ${rowIndex + 1}`,
                }
              : {};

            return (
              <tr
                key={rowIndex}
                className={rowClasses(rowIndex)}
                role={onRowClick ? 'button' : undefined}
                {...clickProps}
              >
                {columns.map((col) => {
                  const hideMobile = col.hideOnMobile
                    ? 'hidden md:table-cell'
                    : '';

                  const rendered = col.render
                    ? col.render(item)
                    : String(item[col.key as keyof T] ?? '');

                  return (
                    <td
                      key={col.key}
                      className={[cellClass, hideMobile, col.className ?? '']
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {rendered}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

DataTable.displayName = 'DataTable';

export default DataTable;
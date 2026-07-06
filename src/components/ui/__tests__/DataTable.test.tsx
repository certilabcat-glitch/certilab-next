import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataTable, { type Column } from '../DataTable';

/* ───────────────────────────────────────────
 * Test types
 * ─────────────────────────────────────────── */

interface TestItem {
  id: string;
  name: string;
  email: string;
  status: string;
}

const columns: Column<TestItem>[] = [
  { key: 'name', header: 'Nombre' },
  { key: 'email', header: 'Email' },
  { key: 'status', header: 'Estado' },
];

const sampleData: TestItem[] = [
  { id: '1', name: 'Ana García', email: 'ana@example.com', status: 'Activo' },
  { id: '2', name: 'Carlos López', email: 'carlos@example.com', status: 'Inactivo' },
  { id: '3', name: 'Elena Ruiz', email: 'elena@example.com', status: 'Pendiente' },
];

const getRowElements = () => screen.getAllByRole('button');

describe('DataTable', () => {
  /* ─── Rendering ─── */
  it('renders column headers', () => {
    render(<DataTable columns={columns} data={sampleData} />);
    expect(screen.getByText('Nombre')).toBeDefined();
    expect(screen.getByText('Email')).toBeDefined();
    expect(screen.getByText('Estado')).toBeDefined();
  });

  it('renders data rows', () => {
    render(<DataTable columns={columns} data={sampleData} />);
    expect(screen.getByText('Ana García')).toBeDefined();
    expect(screen.getByText('carlos@example.com')).toBeDefined();
    expect(screen.getByText('Pendiente')).toBeDefined();
  });

  it('renders with accessible table role and aria-label', () => {
    render(<DataTable columns={columns} data={sampleData} aria-label="Lista de usuarios" />);
    const table = screen.getByRole('table');
    expect(table).toBeDefined();
    expect(table.getAttribute('aria-label')).toBe('Lista de usuarios');
  });

  /* ─── States ─── */
  it('shows loading state', () => {
    render(<DataTable columns={columns} data={[]} loading />);
    expect(screen.getByText('Cargando datos...')).toBeDefined();
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('shows empty state with default message', () => {
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByText('No hay datos disponibles.')).toBeDefined();
  });

  it('shows custom empty message', () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        emptyMessage="No se encontraron usuarios."
      />,
    );
    expect(screen.getByText('No se encontraron usuarios.')).toBeDefined();
  });

  it('shows error state', () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        error="Error de conexión con el servidor."
      />,
    );
    expect(screen.getByText('Error al cargar los datos')).toBeDefined();
    expect(screen.getByText('Error de conexión con el servidor.')).toBeDefined();
    const alert = screen.getByRole('alert');
    expect(alert).toBeDefined();
  });

  /* ─── Row click ─── */
  it('calls onRowClick when a row is clicked', async () => {
    const handleClick = vi.fn();
    render(<DataTable columns={columns} data={sampleData} onRowClick={handleClick} />);

    const rows = getRowElements();
    expect(rows.length).toBe(sampleData.length);

    await userEvent.click(rows[0]);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(sampleData[0]);
  });

  it('calls onRowClick when Enter key is pressed on a row', () => {
    const handleClick = vi.fn();
    render(<DataTable columns={columns} data={sampleData} onRowClick={handleClick} />);

    const rows = getRowElements();
    fireEvent.keyDown(rows[0], { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledWith(sampleData[0]);
  });

  it('calls onRowClick when Space key is pressed on a row', () => {
    const handleClick = vi.fn();
    render(<DataTable columns={columns} data={sampleData} onRowClick={handleClick} />);

    const rows = getRowElements();
    fireEvent.keyDown(rows[0], { key: ' ' });
    expect(handleClick).toHaveBeenCalledWith(sampleData[0]);
  });

  it('does not call onRowClick when data is empty', () => {
    const handleClick = vi.fn();
    render(<DataTable columns={columns} data={[]} onRowClick={handleClick} />);
    expect(handleClick).not.toHaveBeenCalled();
  });

  /* ─── Custom render ─── */
  it('renders custom cell content via render function', () => {
    const customColumns: Column<TestItem>[] = [
      { key: 'name', header: 'Nombre' },
      {
        key: 'actions',
        header: 'Acciones',
        render: (item) => <button type="button">Editar {item.name}</button>,
      },
    ];
    render(<DataTable columns={customColumns} data={sampleData} />);
    expect(screen.getByText('Editar Ana García')).toBeDefined();
    expect(screen.getByText('Editar Carlos López')).toBeDefined();
  });

  /* ─── Hide on mobile ─── */
  it('applies hideOnMobile class to specified columns', () => {
    const mobileColumns: Column<TestItem>[] = [
      { key: 'name', header: 'Nombre' },
      { key: 'email', header: 'Email', hideOnMobile: true },
    ];
    const { container } = render(
      <DataTable columns={mobileColumns} data={sampleData.slice(0, 1)} />,
    );
    // The second column header should have 'hidden md:table-cell'
    const headers = container.querySelectorAll('th');
    expect(headers[1].className).toContain('hidden');
    expect(headers[1].className).toContain('md:table-cell');
  });

  /* ─── Sticky header ─── */
  it('applies sticky positioning when stickyHeader is true', () => {
    const { container } = render(
      <DataTable columns={columns} data={sampleData.slice(0, 1)} stickyHeader />,
    );
    const headers = container.querySelectorAll('th');
    headers.forEach((th) => {
      expect(th.style.position).toBe('sticky');
      expect(th.style.top).toBe('0px');
    });
  });

  /* ─── Striped rows ─── */
  it('renders without errors with striped prop', () => {
    render(<DataTable columns={columns} data={sampleData} striped />);
    expect(screen.getByText('Ana García')).toBeDefined();
    expect(screen.getByText('Carlos López')).toBeDefined();
  });

  /* ─── Fallback rendering ─── */
  it('renders String() fallback for columns without render function', () => {
    const simpleData = [{ id: '1', name: 'Test', email: 'test@test.com' }];
    const simpleColumns: Column<{ id: string; name: string; email: string }>[] = [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ];
    render(<DataTable columns={simpleColumns} data={simpleData} />);
    expect(screen.getByText('Test')).toBeDefined();
    expect(screen.getByText('test@test.com')).toBeDefined();
  });
});
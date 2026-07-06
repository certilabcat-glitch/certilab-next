import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from '../Badge';

describe('Badge', () => {
  /* ─── Rendering ─── */
  it('renders label text', () => {
    render(<Badge label="Activo" />);
    expect(screen.getByText('Activo')).toBeDefined();
  });

  it('renders children', () => {
    render(<Badge>Pendiente</Badge>);
    expect(screen.getByText('Pendiente')).toBeDefined();
  });

  it('renders with correct element type', () => {
    const { container } = render(<Badge label="Test" />);
    expect(container.querySelector('span')).toBeDefined();
  });

  /* ─── Variants ─── */
  it('renders default variant by default', () => {
    render(<Badge label="Default" />);
    const badge = screen.getByText('Default');
    expect(badge.className).toContain('bg-[var(--color-crema');
  });

  it('renders success variant', () => {
    render(<Badge label="Completado" variant="success" />);
    const badge = screen.getByText('Completado');
    expect(badge.className).toContain('bg-[#ecfdf5]');
  });

  it('renders warning variant', () => {
    render(<Badge label="Pendiente" variant="warning" />);
    const badge = screen.getByText('Pendiente');
    expect(badge.className).toContain('bg-[#fffbeb]');
  });

  it('renders error variant', () => {
    render(<Badge label="Error" variant="error" />);
    const badge = screen.getByText('Error');
    expect(badge.className).toContain('bg-[#fef2f2]');
  });

  it('renders info variant', () => {
    render(<Badge label="Info" variant="info" />);
    const badge = screen.getByText('Info');
    expect(badge.className).toContain('bg-[#eff6ff]');
  });

  /* ─── Sizes ─── */
  it('renders md size by default', () => {
    render(<Badge label="Default size" />);
    const badge = screen.getByText('Default size');
    expect(badge.className).toContain('text-sm');
  });

  it('renders sm size', () => {
    render(<Badge label="Small" size="sm" />);
    const badge = screen.getByText('Small');
    expect(badge.className).toContain('text-xs');
  });

  /* ─── Custom className ─── */
  it('applies custom className', () => {
    render(<Badge label="Custom" className="my-custom-class" />);
    const badge = screen.getByText('Custom');
    expect(badge.className).toContain('my-custom-class');
  });

  /* ─── Accessibility ─── */
  it('renders with role none implied by span', () => {
    const { container } = render(<Badge label="Accesible" />);
    const badge = container.querySelector('span');
    expect(badge).toBeDefined();
    expect(badge?.textContent).toBe('Accesible');
  });
});
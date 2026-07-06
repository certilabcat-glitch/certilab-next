import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

describe('Input', () => {
  /* ──────────────────────────────────────
   * Rendering
   * ────────────────────────────────────── */

  it('renders with label and placeholder', () => {
    render(<Input label="Nombre" placeholder="Tu nombre" />);
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tu nombre')).toBeInTheDocument();
  });

  it('renders with hidden label (sr-only)', () => {
    render(<Input label="Buscar" hideLabel placeholder="Buscar…" />);
    const label = screen.getByText('Buscar');
    expect(label.className).toContain('sr-only');
    // Still accessible via aria-label
    const input = screen.getByPlaceholderText('Buscar…');
    expect(input).toBeInTheDocument();
  });

  it('forwards ref to the input element', () => {
    const ref = { current: null } as React.MutableRefObject<HTMLInputElement | null>;
    render(<Input label="Ref test" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  /* ──────────────────────────────────────
   * Types
   * ────────────────────────────────────── */

  it.each(['text', 'email', 'password', 'search', 'number', 'tel', 'url'] as const)(
    'renders type="%s"',
    (type) => {
      render(<Input label={type} type={type} />);
      const input = screen.getByLabelText(type);
      if (type === 'password') {
        // Password reveal may transform to 'text'
        expect(['password', 'text']).toContain(input.getAttribute('type'));
      } else {
        expect(input.getAttribute('type')).toBe(type);
      }
    },
  );

  /* ──────────────────────────────────────
   * Sizes
   * ────────────────────────────────────── */

  it.each(['sm', 'md', 'lg'] as const)('renders size="%s" without error', (size) => {
    const { container } = render(<Input label={size} size={size} />);
    const wrapper = container.querySelector('.rounded-lg');
    expect(wrapper).toBeInTheDocument();
  });

  /* ──────────────────────────────────────
   * States
   * ────────────────────────────────────── */

  it('renders disabled state', () => {
    render(<Input label="Disabled" disabled />);
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });

  it('renders readOnly state', () => {
    render(<Input label="ReadOnly" readOnly defaultValue="value" />);
    const input = screen.getByLabelText('ReadOnly');
    expect(input).toHaveAttribute('readOnly');
  });

  it('renders error state with aria-invalid', () => {
    render(<Input label="Error" error />);
    expect(screen.getByLabelText('Error')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders success state without aria-invalid', () => {
    render(<Input label="Success" success />);
    expect(screen.getByLabelText('Success')).not.toHaveAttribute('aria-invalid');
  });

  it('renders loading state with aria-busy', () => {
    render(<Input label="Loading" loading />);
    expect(screen.getByLabelText('Loading')).toHaveAttribute('aria-busy', 'true');
  });

  /* ──────────────────────────────────────
   * Required & Optional
   * ────────────────────────────────────── */

  it('shows required marker and aria-required', () => {
    render(<Input label="Nombre" required />);
    const input = screen.getByRole('textbox', { name: /nombre/i });
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows optional text when optional prop is true', () => {
    render(<Input label="Teléfono" optional />);
    expect(screen.getByText('(opcional)')).toBeInTheDocument();
  });

  /* ──────────────────────────────────────
   * Helper text & Validation message
   * ────────────────────────────────────── */

  it('shows helper text', () => {
    render(
      <Input
        label="Contraseña"
        helperText="Mínimo 8 caracteres"
      />,
    );
    const helper = screen.getByText('Mínimo 8 caracteres');
    expect(helper).toBeInTheDocument();
    const input = screen.getByLabelText('Contraseña');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('shows validation message when error is true', () => {
    render(
      <Input
        label="Email"
        error
        validationMessage="Formato inválido"
      />,
    );
    const msg = screen.getByRole('alert');
    expect(msg).toHaveTextContent('Formato inválido');
  });

  it('hides helper text when error is shown', () => {
    render(
      <Input
        label="Email"
        error
        helperText="Introduce tu correo"
        validationMessage="Formato inválido"
      />,
    );
    expect(screen.queryByText('Introduce tu correo')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Formato inválido');
  });

  /* ──────────────────────────────────────
   * Icons
   * ────────────────────────────────────── */

  it('renders leading icon', () => {
    render(
      <Input
        label="Email"
        iconLeft={<span data-testid="leading-icon">🔍</span>}
      />,
    );
    expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
  });

  it('renders trailing icon', () => {
    render(
      <Input
        label="Password"
        iconRight={<span data-testid="trailing-icon">👁</span>}
      />,
    );
    expect(screen.getByTestId('trailing-icon')).toBeInTheDocument();
  });

  /* ──────────────────────────────────────
   * Clear button
   * ────────────────────────────────────── */

  it('renders clear button and calls onClear when clicked', async () => {
    const onClear = vi.fn();
    render(
      <Input
        label="Search"
        clearable
        onClear={onClear}
      />,
    );
    const clearBtn = screen.getByLabelText('Clear input');
    expect(clearBtn).toBeInTheDocument();
    await userEvent.click(clearBtn);
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('does not render clear button when disabled', () => {
    render(
      <Input
        label="Search"
        clearable
        onClear={vi.fn()}
        disabled
      />,
    );
    expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument();
  });

  it('does not render clear button when readOnly', () => {
    render(
      <Input
        label="Search"
        clearable
        onClear={vi.fn()}
        readOnly
      />,
    );
    expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument();
  });

  /* ──────────────────────────────────────
   * Password reveal
   * ────────────────────────────────────── */

  it('renders reveal password toggle for type="password"', () => {
    render(
      <Input
        type="password"
        label="Contraseña"
        revealPassword
      />,
    );
    const toggleBtn = screen.getByLabelText('Mostrar contraseña');
    expect(toggleBtn).toBeInTheDocument();
  });

  it('toggles password visibility on reveal button click', async () => {
    render(
      <Input
        type="password"
        label="Contraseña"
        revealPassword
        defaultValue="secret"
      />,
    );
    const input = screen.getByLabelText('Contraseña') as HTMLInputElement;
    expect(input.type).toBe('password');

    const toggleBtn = screen.getByLabelText('Mostrar contraseña');
    await userEvent.click(toggleBtn);

    expect(input.type).toBe('text');
    expect(screen.getByLabelText('Ocultar contraseña')).toBeInTheDocument();
  });

  it('does not render reveal button when iconRight is provided', () => {
    render(
      <Input
        type="password"
        label="Contraseña"
        revealPassword
        iconRight={<span data-testid="custom-icon">🔑</span>}
      />,
    );
    expect(screen.queryByLabelText('Mostrar contraseña')).not.toBeInTheDocument();
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('does not render reveal button when disabled', () => {
    render(
      <Input
        type="password"
        label="Contraseña"
        revealPassword
        disabled
      />,
    );
    expect(screen.queryByLabelText('Mostrar contraseña')).not.toBeInTheDocument();
  });

  /* ──────────────────────────────────────
   * Prefix & Suffix
   * ────────────────────────────────────── */

  it('renders prefix text', () => {
    render(
      <Input
        label="Website"
        prefix="https://"
      />,
    );
    expect(screen.getByText('https://')).toBeInTheDocument();
  });

  it('renders suffix text', () => {
    render(
      <Input
        label="Area"
        suffix="m²"
      />,
    );
    expect(screen.getByText('m²')).toBeInTheDocument();
  });

  it('renders both prefix and suffix', () => {
    render(
      <Input
        label="Precio"
        prefix="€"
        suffix="IVA incl."
      />,
    );
    expect(screen.getByText('€')).toBeInTheDocument();
    expect(screen.getByText('IVA incl.')).toBeInTheDocument();
  });

  /* ──────────────────────────────────────
   * Events
   * ────────────────────────────────────── */

  it('calls onChange when value changes', async () => {
    const onChange = vi.fn();
    render(
      <Input
        label="Nombre"
        onChange={onChange}
      />,
    );
    const input = screen.getByLabelText('Nombre');
    await userEvent.type(input, 'a');
    expect(onChange).toHaveBeenCalled();
  });

  /* ──────────────────────────────────────
   * Accessibility
   * ────────────────────────────────────── */

  it('associates label with input via htmlFor/id', () => {
    render(<Input label="Nombre" />);
    const input = screen.getByLabelText('Nombre');
    expect(input).toBeInTheDocument();
  });

  it('connects helper text via aria-describedby', () => {
    render(
      <Input
        label="Email"
        helperText="Tu correo electrónico"
      />,
    );
    const input = screen.getByLabelText('Email');
    const describedby = input.getAttribute('aria-describedby');
    expect(describedby).toBeTruthy();
    const helper = document.getElementById(describedby!);
    expect(helper).toHaveTextContent('Tu correo electrónico');
  });

  it('connects validation message via aria-describedby', () => {
    render(
      <Input
        label="Email"
        error
        validationMessage="Error message"
      />,
    );
    const input = screen.getByLabelText('Email');
    const describedby = input.getAttribute('aria-describedby');
    expect(describedby).toBeTruthy();
    const validation = document.getElementById(describedby!);
    expect(validation).toHaveTextContent('Error message');
  });

  it('sets aria-required when required prop is true', () => {
    render(<Input label="Nombre" required />);
    const input = screen.getByRole('textbox', { name: /nombre/i });
    expect(input).toHaveAttribute('aria-required', 'true');
  });
});
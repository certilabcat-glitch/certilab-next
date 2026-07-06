import type { Meta, StoryObj } from '@storybook/react';
import Input from '../../src/components/ui/Input';
import { fn } from '@storybook/test';
import { useState } from 'react';

/**
 * The **Input** atom is the text-entry element of the Certilab Design System.
 *
 * It is the sibling of the Button Frozen v1 — sharing the same visual language,
 * proportions, rhythm, spacing, and hierarchy.
 *
 * ## Types
 *
 * | Type | Use case |
 * |------|----------|
 * | `text` | General-purpose text entry |
 * | `email` | Email address entry |
 * | `password` | Password entry with optional reveal |
 * | `search` | Search/buscador entry |
 * | `number` | Numeric input |
 * | `tel` | Phone number entry |
 * | `url` | URL entry |
 *
 * ## States
 *
 * - **Default** — clean, ready for interaction
 * - **Hover** — subtle border highlight
 * - **Focus** — visible focus ring (identical to Button)
 * - **Filled** — user has entered a value
 * - **Disabled** — field is not interactive
 * - **ReadOnly** — field displays but cannot be edited
 * - **Error** — visual error state (does NOT perform validation)
 * - **Success** — visual success state (does NOT perform validation)
 * - **Loading** — spinner shown in place of trailing icon
 *
 * ## Accessibility (WCAG AA)
 *
 * - All inputs have an associated `<label>` or `sr-only` label.
 * - `aria-invalid` is set when `error` is true.
 * - `aria-describedby` connects helper text and validation messages.
 * - `aria-required` reflects the `required` prop.
 * - `aria-busy` is set when `loading` is true.
 * - Focus ring is visible via keyboard navigation only (`focus-visible`).
 *
 * ## Usage guidelines
 *
 * ✅ **Correct:**
 * - Always provide a visible label for public-facing forms.
 * - Use `hideLabel` sparingly for search inputs or icon-labeled fields.
 * - Pair `error` with a `validationMessage` to explain what went wrong.
 * - Use `clearable` + `onClear` for search inputs.
 *
 * ❌ **Incorrect:**
 * - Using `error` or `success` without a `validationMessage`.
 * - Using `loading` on non-search inputs without a clear purpose.
 * - Omitting label entirely (always provide at least a screen-reader label).
 */
const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The **Input** atom is the text-entry element of the Certilab Design System — the sibling of Button Frozen v1. It shares the same visual language: same heights, same radius, same focus ring, same tokens.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Visual size — same scale as Button Frozen v1',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'number', 'tel', 'url'],
      description: 'HTML input type',
    },
    label: {
      control: 'text',
      description: 'Visible label text',
    },
    hideLabel: {
      control: 'boolean',
      description: 'Visually hide the label (still accessible via sr-only)',
    },
    required: {
      control: 'boolean',
      description: 'Mark the field as required',
    },
    optional: {
      control: 'boolean',
      description: 'Show "(opcional)" suffix in label',
    },
    error: {
      control: 'boolean',
      description: 'Show error visual state. Does NOT perform validation.',
    },
    success: {
      control: 'boolean',
      description: 'Show success visual state. Does NOT perform validation.',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    clearable: {
      control: 'boolean',
      description: 'Show a clear button (requires onClear)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    readOnly: {
      control: 'boolean',
      description: 'Make the input read-only',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the input',
    },
    validationMessage: {
      control: 'text',
      description: 'Validation message shown when error or success is active',
    },
    prefix: {
      control: 'text',
      description: 'Prefix adornment (e.g., currency symbol)',
    },
    suffix: {
      control: 'text',
      description: 'Suffix adornment (e.g., unit)',
    },
    defaultValue: {
      control: 'text',
      description: 'Default value',
    },
    onChange: { action: 'changed' },
    onClear: { action: 'cleared' },
  },
  args: {
    onChange: fn(),
    onClear: fn(),
    label: 'Label',
    placeholder: 'Placeholder',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ──────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────── */

export const Text: Story = {
  args: {
    type: 'text',
    label: 'Nombre completo',
    placeholder: 'Ej: María García López',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default **text** input for general-purpose text entry.',
      },
    },
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    label: 'Correo electrónico',
    placeholder: 'usuario@ejemplo.com',
    defaultValue: 'maria@certilab.com',
  },
  parameters: {
    docs: {
      description: {
        story: '**Email** input with appropriate keyboard on mobile devices.',
      },
    },
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Contraseña',
    placeholder: '••••••••',
    defaultValue: 'supersecret',
  },
  parameters: {
    docs: {
      description: {
        story: '**Password** input masks the value. Pair with a reveal toggle via `iconRight`.',
      },
    },
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    label: 'Buscar',
    hideLabel: true,
    placeholder: 'Buscar expedientes…',
    clearable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Search** input with hidden label and clear button for buscador patterns.',
      },
    },
  },
};

export const Number_: Story = {
  args: {
    type: 'number',
    label: 'Metros cuadrados',
    placeholder: '0',
    suffix: 'm²',
  },
  parameters: {
    docs: {
      description: {
        story: '**Number** input with suffix adornment showing units.',
      },
    },
  },
};

export const Tel: Story = {
  args: {
    type: 'tel',
    label: 'Teléfono',
    placeholder: '+34 600 000 000',
  },
};

export const URL: Story = {
  args: {
    type: 'url',
    label: 'Sitio web',
    placeholder: 'https://ejemplo.com',
    prefix: 'https://',
  },
  parameters: {
    docs: {
      description: {
        story: '**URL** input with protocol prefix adornment.',
      },
    },
  },
};

/* ──────────────────────────────────────────────
 * Sizes — matching Button Frozen v1 exactly
 * ────────────────────────────────────────────── */

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small input',
    placeholder: 'h-9 · text-sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Medium input',
    placeholder: 'h-11 · text-base',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large input',
    placeholder: 'h-[3.25rem] · text-lg',
  },
};

export const SizesRow: Story = {
  name: 'Sizes (row)',
  parameters: {
    docs: {
      description: {
        story:
          'All three sizes side by side — **same heights as Button Frozen v1**: `h-9`, `h-11`, `h-[3.25rem]`.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <div key={s} style={{ width: '200px' }}>
          <Input size={s} label={s === 'sm' ? 'Small' : s === 'md' ? 'Medium' : 'Large'} placeholder="Placeholder" />
        </div>
      ))}
    </div>
  ),
};

/* ──────────────────────────────────────────────
 * States
 * ────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    label: 'Default',
    defaultValue: '',
  },
};

export const Hover: Story = {
  args: {
    label: 'Hover',
    defaultValue: 'Pasa el ratón',
  },
  parameters: {
    pseudo: { hover: true },
    docs: {
      description: {
        story: '**Hover** state — border transitions to `--color-terra-light`. Simulated with `pseudo` addon.',
      },
    },
  },
};

export const Focus: Story = {
  args: {
    label: 'Focus',
    defaultValue: 'Tecla Tab',
  },
  parameters: {
    pseudo: { focusVisible: true },
    docs: {
      description: {
        story:
          '**Focus** state — identical ring pattern to Button Frozen v1: `focus-visible:ring-2 ring-offset-2 ring-offset-crema`.',
      },
    },
  },
};

export const Filled: Story = {
  args: {
    label: 'Filled',
    defaultValue: 'María García López',
  },
  parameters: {
    docs: {
      description: {
        story: '**Filled** state — user has entered a value.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    defaultValue: 'No editable',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Read-only',
    defaultValue: 'Dato informativo',
    readOnly: true,
  },
};

export const Error: Story = {
  args: {
    type: 'email',
    label: 'Correo electrónico',
    defaultValue: 'correo-invalido',
    error: true,
    validationMessage: 'Introduce un correo electrónico válido.',
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Error** state — `ring-2 ring-terra` + validation message in terra color. Does NOT validate — only represents the visual state.',
      },
    },
  },
};

export const Success: Story = {
  args: {
    type: 'email',
    label: 'Correo electrónico',
    defaultValue: 'maria@certilab.com',
    success: true,
    validationMessage: 'Correo verificado correctamente.',
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Success** state — `ring-2 ring-verde` + validation message in verde color. Does NOT validate — only represents the visual state.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    type: 'search',
    label: 'Verificando…',
    placeholder: 'Espera un momento',
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Loading** state — spinner replaces the trailing icon position.',
      },
    },
  },
};

/* ──────────────────────────────────────────────
 * Icons
 * ────────────────────────────────────────────── */

export const LeadingIcon: Story = {
  args: {
    type: 'email',
    label: 'Correo electrónico',
    placeholder: 'usuario@ejemplo.com',
    iconLeft: <IconMail />,
  },
  parameters: {
    docs: {
      description: {
        story: '**Leading icon** — placed on the left side inside the input wrapper.',
      },
    },
  },
};

export const TrailingIcon: Story = {
  args: {
    type: 'password',
    label: 'Contraseña',
    placeholder: '••••••••',
    defaultValue: 'secret123',
    iconRight: <IconEye />,
  },
  parameters: {
    docs: {
      description: {
        story: '**Trailing icon** — placed on the right side. Useful for password reveal toggles.',
      },
    },
  },
};

export const BothIcons: Story = {
  args: {
    type: 'search',
    label: 'Buscar',
    hideLabel: true,
    placeholder: 'Buscar en Certilab…',
    iconLeft: <IconSearch />,
    clearable: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Leading icon + clear button** — common pattern for search inputs. The clear button replaces the trailing icon position when visible.',
      },
    },
  },
};

/* ──────────────────────────────────────────────
 * Prefix & Suffix
 * ────────────────────────────────────────────── */

export const Prefix: Story = {
  args: {
    type: 'url',
    label: 'Sitio web',
    placeholder: 'ejemplo.com',
    prefix: 'https://',
  },
};

export const Suffix: Story = {
  args: {
    type: 'number',
    label: 'Superficie',
    placeholder: '0',
    suffix: 'm²',
  },
};

export const PrefixAndSuffix: Story = {
  args: {
    type: 'text',
    label: 'Precio',
    placeholder: '0,00',
    prefix: '€',
    suffix: 'IVA incl.',
  },
};

/* ──────────────────────────────────────────────
 * Required & Optional
 * ────────────────────────────────────────────── */

export const Required: Story = {
  args: {
    label: 'Nombre completo',
    required: true,
    placeholder: 'Obligatorio',
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Required** field — shows a terra-colored asterisk next to the label and sets `aria-required="true"`.',
      },
    },
  },
};

export const Optional: Story = {
  args: {
    label: 'Teléfono',
    optional: true,
    placeholder: 'Opcional',
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Optional** field — shows "(opcional)" in grey next to the label.',
      },
    },
  },
};

/* ──────────────────────────────────────────────
 * Helper Text & Validation
 * ────────────────────────────────────────────── */

export const WithHelperText: Story = {
  args: {
    label: 'Contraseña',
    type: 'password',
    placeholder: 'Mínimo 8 caracteres',
    helperText: 'Debe contener al menos 8 caracteres, una mayúscula y un número.',
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Helper text** — always visible below the input, linked via `aria-describedby`.',
      },
    },
  },
};

/* ──────────────────────────────────────────────
 * Real-world scenarios (REQUIRED by DS-02B Rule 4)
 * ────────────────────────────────────────────── */

export const LoginForm: Story = {
  name: '🔐 Login form',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Real-world **login** scenario: email + password inputs with a primary submit button.',
      },
    },
  },
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <Input
        type="email"
        label="Correo electrónico"
        placeholder="usuario@certilab.com"
        iconLeft={<IconMail />}
        defaultValue="tecnico@certilab.com"
      />
      <Input
        type="password"
        label="Contraseña"
        placeholder="••••••••"
        revealPassword
        defaultValue="mi-contraseña"
      />
      <p style={{ fontSize: '0.75rem', color: '#4A4A4A', textAlign: 'right', margin: 0 }}>
        <a href="#" style={{ color: '#8B6F47', textDecoration: 'underline' }}>¿Has olvidado tu contraseña?</a>
      </p>
    </div>
  ),
};

function SearchFieldComponent() {
  const [value, setValue] = useState('');

  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Input
        type="search"
        label="Buscar expedientes"
        hideLabel
        placeholder="Buscar por nombre, referencia o dirección…"
        iconLeft={<IconSearch />}
        clearable
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
      {value && (
        <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#4A4A4A' }}>
          Resultados para: <strong>{value}</strong>
        </p>
      )}
    </div>
  );
}

export const SearchField: Story = {
  name: '� Buscador',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Real-world **buscador** scenario: search input with leading icon, clear button, and full width.',
      },
    },
  },
  render: () => <SearchFieldComponent />,
};

function EmailValidationComponent() {
  const [value, setValue] = useState('correo-invalido');

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  return (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Input
        type="email"
        label="Correo electrónico"
        placeholder="usuario@ejemplo.com"
        iconLeft={<IconMail />}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={!isValidEmail && value.length > 0}
        success={isValidEmail}
        validationMessage={
          isValidEmail
            ? 'Correo válido ✓'
            : 'Introduce un correo electrónico válido.'
        }
      />
      <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#4A4A4A' }}>
        ⚠️ El Input solo representa estados visuales. La validación es responsabilidad del formulario.
      </p>
    </div>
  );
}

export const EmailValidation: Story = {
  name: '� Email con validación',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Real-world **email** scenario: field transitions from error to success state.',
      },
    },
  },
  render: () => <EmailValidationComponent />,
};

function PasswordWithHelperComponent() {
  return (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Input
        type="password"
        label="Contraseña"
        placeholder="Mínimo 8 caracteres"
        required
        revealPassword
        helperText="Debe contener al menos 8 caracteres, una mayúscula y un número."
      />
    </div>
  );
}

export const PasswordWithHelper: Story = {
  name: '🔑 Contraseña segura',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Real-world **password** scenario with helper text, required marker, and trailing reveal icon.',
      },
    },
  },
  render: () => <PasswordWithHelperComponent />,
};

function FieldErrorRecoveredComponent() {
  const [step, setStep] = useState<'error' | 'success'>('error');

  return (
    <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Input
        type="text"
        label="Referencia catastral"
        placeholder="0000000XX0000X"
        defaultValue={step === 'error' ? 'INVALIDO' : '1234567XX1234A'}
        error={step === 'error'}
        success={step === 'success'}
        validationMessage={
          step === 'error'
            ? 'Formato incorrecto. Debe tener 14 caracteres alfanuméricos.'
            : 'Referencia válida ✓'
        }
        iconLeft={step === 'error' ? <IconAlert /> : <IconCheck />}
      />
      <button
        type="button"
        onClick={() => setStep(step === 'error' ? 'success' : 'error')}
        style={{
          padding: '0.5rem 1rem',
          background: '#F5EFE6',
          border: '1px solid #E8E4DD',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '0.875rem',
          color: '#333',
          alignSelf: 'flex-start',
        }}
      >
        {step === 'error' ? '✅ Corregir campo' : '❌ Volver a error'}
      </button>
    </div>
  );
}

export const FieldErrorRecovered: Story = {
  name: '⚠️ Campo con error → recuperado',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Real-world **error recovery** scenario: field shows error, then transitions to success once corrected.',
      },
    },
  },
  render: () => <FieldErrorRecoveredComponent />,
};

export const LoadingVerification: Story = {
  name: '⏳ Campo verificando…',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Real-world **loading** scenario: input shows a spinner while verifying data.',
      },
    },
  },
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Input
        type="text"
        label="Verificando documento…"
        placeholder="Espera un momento"
        defaultValue="DNI 12345678Z"
        loading
        helperText="Estamos verificando el documento con la base de datos."
      />
    </div>
  ),
};

/* ──────────────────────────────────────────────
 * ✅ Correct usage examples
 * ────────────────────────────────────────────── */

export const CorrectLabelProvided: Story = {
  name: '✅ Correct: label provided',
  parameters: {
    docs: {
      description: {
        story: '✅ **Correct:** Always provide a visible label for public-facing forms.',
      },
    },
  },
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Input label="Nombre completo" placeholder="Ej: María García" />
    </div>
  ),
};

function CorrectSearchWithClearComponent() {
  const [value, setValue] = useState('');

  return (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Input
        type="search"
        label="Buscar"
        hideLabel
        placeholder="Buscar…"
        iconLeft={<IconSearch />}
        clearable
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    </div>
  );
}

export const CorrectSearchWithClear: Story = {
  name: '✅ Correct: search with clear',
  parameters: {
    docs: {
      description: {
        story:
          '✅ **Correct:** Search input with leading icon, hidden label (still accessible), and clear button.',
      },
    },
  },
  render: () => <CorrectSearchWithClearComponent />,
};

export const CorrectErrorWithMessage: Story = {
  name: '✅ Correct: error with message',
  parameters: {
    docs: {
      description: {
        story:
          '✅ **Correct:** Error state paired with a `validationMessage` explaining what the user needs to fix.',
      },
    },
  },
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Input
        type="email"
        label="Correo electrónico"
        defaultValue="inválido"
        error
        validationMessage="Revisa el formato del correo."
      />
    </div>
  ),
};

/* ──────────────────────────────────────────────
 * ❌ Incorrect usage examples
 * ────────────────────────────────────────────── */

export const IncorrectNoLabel: Story = {
  name: '❌ Incorrect: no label',
  parameters: {
    docs: {
      description: {
        story:
          '❌ **Incorrect:** Input without any label. Always provide a label, even if visually hidden via `hideLabel`.',
      },
    },
  },
  render: () => (
    <div style={{ border: '2px dashed #DC2626', padding: '1rem', borderRadius: '8px', display: 'inline-block' }}>
      <Input placeholder="¿Qué buscas?" hideLabel={false} label="" />
      <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#DC2626' }}>
        ⚠️ Missing label
      </p>
    </div>
  ),
};

export const IncorrectErrorWithoutMessage: Story = {
  name: '❌ Incorrect: error without message',
  parameters: {
    docs: {
      description: {
        story:
          '❌ **Incorrect:** Error state without a `validationMessage`. The user sees red but doesn\'t know what to fix.',
      },
    },
  },
  render: () => (
    <div style={{ border: '2px dashed #DC2626', padding: '1rem', borderRadius: '8px', display: 'inline-block' }}>
      <Input
        type="email"
        label="Correo electrónico"
        defaultValue="inválido"
        error
      />
      <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#DC2626' }}>
        ⚠️ Error without validation message
      </p>
    </div>
  ),
};

export const IncorrectDisabledNoReason: Story = {
  name: '❌ Incorrect: disabled without context',
  parameters: {
    docs: {
      description: {
        story:
          '❌ **Incorrect:** Disabled input without any context. Users should understand why a field is disabled.',
      },
    },
  },
  render: () => (
    <div style={{ border: '2px dashed #DC2626', padding: '1rem', borderRadius: '8px', display: 'inline-block' }}>
      <Input
        label="Nombre completo"
        defaultValue="María García"
        disabled
      />
      <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#DC2626' }}>
        ⚠️ Disabled without explaining why
      </p>
    </div>
  ),
};

/* ──────────────────────────────────────────────
 * Icon helper components (inline for portability)
 * ────────────────────────────────────────────── */

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13L2 4" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconAlert() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
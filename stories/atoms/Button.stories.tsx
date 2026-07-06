import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../src/components/ui/Button';
import { fn } from '@storybook/test';

/**
 * The **Button** atom triggers an action or navigates to a destination.
 *
 * It is the primary interactive element of the Certilab Design System.
 * All interactive states (default, hover, focus, active, disabled, loading)
 * are built-in and must never be emulated with custom CSS.
 *
 * ## Variants
 *
 * | Variant | Usage |
 * |---------|-------|
 * | `primary` | Primary action on a page. Max 1 per view. |
 * | `secondary` | Alternative action with same visual weight. |
 * | `tertiary` | Subtle action for less prominent commands. |
 * | `ghost` | Minimal action for dense UI areas. |
 * | `destructive` | Irreversible/destructive action. Must be accompanied by a confirmation dialog. |
 * | `link` | Text-only navigation trigger. |
 *
 * ## Sizes
 *
 * | Size | Height | Font | Use case |
 * |------|--------|------|----------|
 * | `sm` | 32px | 14px | Dense UI, tables, inline actions |
 * | `md` | 40px | 16px | Default size for most use cases |
 * | `lg` | 48px | 18px | Hero sections, prominent CTAs |
 *
 * ## Accessibility
 *
 * - All buttons have visible focus rings (`focus-visible`).
 * - Icon-only buttons **must** receive an `aria-label`.
 * - Loading buttons use `aria-busy="true"`.
 *
 * ## Usage guidelines
 *
 * ✅ **Correct:**
 * - One primary button per view.
 * - Icon before the label for leading actions (e.g., + Add).
 * - Icon after the label for trailing actions (e.g., → Next).
 * - Icon-only buttons for widely understood actions (e.g., edit, delete).
 *
 * ❌ **Incorrect:**
 * - Multiple primary buttons competing for attention.
 * - Using `destructive` without a confirmation dialog.
 * - Icon-only buttons without an `aria-label`.
 * - Disabled buttons without a reason.
 */
const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The **Button** atom is the primary interactive element of the Certilab Design System. Use it to trigger actions, submit forms, or navigate.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'destructive', 'link'],
      description: 'Visual variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner and disable interaction',
    },
    iconLeft: {
      control: 'text',
      description: 'Icon component to render on the left side',
    },
    iconRight: {
      control: 'text',
      description: 'Icon component to render on the right side',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Render as icon-only (hides label visually, requires aria-label)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    children: {
      control: 'text',
      description: 'Button label content',
    },
    onClick: {
      action: 'clicked',
    },
  },
  args: {
    onClick: fn(),
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ───────────────────────────────────────────
 * Variants (size: md)
 * ─────────────────────────────────────────── */

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use **primary** for the main call-to-action on a page. Limit to one per view.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Eliminar',
  },
  parameters: {
    docs: {
      description: {
        story: '⚠️ **Destructive** indicates an irreversible action. Always pair with a confirmation dialog.',
      },
    },
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Ver detalles',
  },
};

/* ───────────────────────────────────────────
 * Sizes
 * ─────────────────────────────────────────── */

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

/* ───────────────────────────────────────────
 * States
 * ─────────────────────────────────────────── */

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Default',
  },
};

export const Hover: Story = {
  args: {
    variant: 'primary',
    children: 'Hover',
  },
  parameters: {
    pseudo: { hover: true },
    docs: {
      description: {
        story: 'Hover state. Simulated with `pseudo` addon for documentation.',
      },
    },
  },
};

export const Focus: Story = {
  args: {
    variant: 'primary',
    children: 'Focus',
  },
  parameters: {
    pseudo: { focusVisible: true },
    docs: {
      description: {
        story: 'Focus-visible state. Shows the focus ring. Activated via keyboard navigation.',
      },
    },
  },
};

export const Active: Story = {
  args: {
    variant: 'primary',
    children: 'Active',
  },
  parameters: {
    pseudo: { active: true },
    docs: {
      description: {
        story: 'Active/pressed state.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    children: 'Loading…',
    loading: true,
  },
};

/* ───────────────────────────────────────────
 * Loading across variants
 * ─────────────────────────────────────────── */

export const LoadingSecondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Enviando…',
    loading: true,
  },
};

export const LoadingGhost: Story = {
  args: {
    variant: 'ghost',
    children: 'Cargando…',
    loading: true,
  },
};

export const LoadingDestructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Eliminando…',
    loading: true,
  },
};

/* ───────────────────────────────────────────
 * Icon Left
 * ─────────────────────────────────────────── */

export const IconLeftSmall: Story = {
  args: {
    size: 'sm',
    iconLeft: <IconPlus />,
    children: 'Añadir',
  },
};

export const IconLeftMedium: Story = {
  args: {
    size: 'md',
    iconLeft: <IconPlus />,
    children: 'Añadir inmueble',
  },
};

export const IconLeftLarge: Story = {
  args: {
    size: 'lg',
    iconLeft: <IconPlus />,
    children: 'Crear expediente',
  },
};

/* ───────────────────────────────────────────
 * Icon Right
 * ─────────────────────────────────────────── */

export const IconRightSmall: Story = {
  args: {
    size: 'sm',
    iconRight: <IconArrow />,
    children: 'Siguiente',
  },
};

export const IconRightMedium: Story = {
  args: {
    size: 'md',
    iconRight: <IconArrow />,
    children: 'Continuar',
  },
};

export const IconRightLarge: Story = {
  args: {
    size: 'lg',
    iconRight: <IconArrow />,
    children: 'Enviar solicitud',
  },
};

/* ───────────────────────────────────────────
 * Icon Only
 * ─────────────────────────────────────────── */

export const IconOnlySmall: Story = {
  args: {
    size: 'sm',
    iconOnly: true,
    'aria-label': 'Editar',
    children: <IconEdit />,
  },
};

export const IconOnlyMedium: Story = {
  args: {
    size: 'md',
    variant: 'secondary',
    iconOnly: true,
    'aria-label': 'Eliminar',
    children: <IconEdit />,
  },
};

export const IconOnlyLarge: Story = {
  args: {
    size: 'lg',
    variant: 'ghost',
    iconOnly: true,
    'aria-label': 'Configuración',
    children: <IconEdit />,
  },
};

/* ───────────────────────────────────────────
 * Sizes matrix — all variants × all sizes
 * ─────────────────────────────────────────── */

export const SizesRow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Button key={size} variant="primary" size={size}>
          {size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}
        </Button>
      ))}
    </div>
  ),
};

export const VariantsRow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      {(['primary', 'secondary', 'tertiary', 'ghost', 'destructive', 'link'] as const).map((v) => (
        <Button key={v} variant={v}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Button>
      ))}
    </div>
  ),
};

export const StatesRow: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All interactive states side by side: default, disabled, loading.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="primary">Default</Button>
      <Button variant="primary" disabled>Disabled</Button>
      <Button variant="primary" loading>Loading</Button>
      <Button variant="primary" iconLeft={<IconPlus />}>Icon Left</Button>
      <Button variant="secondary" iconRight={<IconArrow />}>Icon Right</Button>
      <Button variant="ghost" iconOnly aria-label="Menu"><IconEdit /></Button>
    </div>
  ),
};

/* ───────────────────────────────────────────
 * ✅ Correct usage examples
 * ─────────────────────────────────────────── */

export const CorrectMaxOnePrimary: Story = {
  parameters: {
    docs: {
      description: {
        story: '✅ **Correct:** Maximum one primary button per view. Secondary actions use `secondary` or `tertiary` variants.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button variant="primary">Enviar solicitud</Button>
      <Button variant="secondary">Cancelar</Button>
    </div>
  ),
};

export const CorrectIconButtonWithAriaLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: '✅ **Correct:** Icon-only buttons must always have an `aria-label` for screen readers.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button variant="ghost" iconOnly aria-label="Editar expediente"><IconEdit /></Button>
      <Button variant="ghost" iconOnly aria-label="Eliminar expediente"><IconEdit /></Button>
    </div>
  ),
};

export const CorrectLeadingIconAction: Story = {
  parameters: {
    docs: {
      description: {
        story: '✅ **Correct:** Leading icon before the label for create/Add actions.',
      },
    },
  },
  render: () => (
    <Button variant="primary" iconLeft={<IconPlus />}>Nuevo expediente</Button>
  ),
};

/* ───────────────────────────────────────────
 * ❌ Incorrect usage examples
 * ─────────────────────────────────────────── */

export const IncorrectMultiplePrimary: Story = {
  parameters: {
    docs: {
      description: {
        story: '❌ **Incorrect:** Multiple primary buttons competing for attention. Only one primary action per view.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', border: '2px dashed #DC2626', padding: '1rem', borderRadius: '8px' }}>
      <Button variant="primary">Guardar</Button>
      <Button variant="primary">Enviar</Button>
      <Button variant="primary">Eliminar</Button>
    </div>
  ),
};

export const IncorrectDestructiveNoDialog: Story = {
  parameters: {
    docs: {
      description: {
        story: '❌ **Incorrect:** Destructive button without confirmation dialog. Always pair `destructive` with a modal or dialog asking for confirmation.',
      },
    },
  },
  render: () => (
    <div style={{ border: '2px dashed #DC2626', padding: '1rem', borderRadius: '8px', display: 'inline-block' }}>
      <Button variant="destructive">Eliminar expediente</Button>
      <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#DC2626' }}>
        ⚠️ Missing confirmation dialog
      </p>
    </div>
  ),
};

export const IncorrectIconOnlyNoLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: '❌ **Incorrect:** Icon-only button without `aria-label`. Screen readers cannot announce the action.',
      },
    },
  },
  render: () => (
    <div style={{ border: '2px dashed #DC2626', padding: '1rem', borderRadius: '8px', display: 'inline-block' }}>
      <Button variant="ghost" iconOnly aria-label={undefined as unknown as string}><IconEdit /></Button>
      <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#DC2626' }}>
        ⚠️ Missing aria-label
      </p>
    </div>
  ),
};

/* ───────────────────────────────────────────
 * All variants disabled
 * ─────────────────────────────────────────── */

export const AllVariantsDisabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      {(['primary', 'secondary', 'tertiary', 'ghost', 'destructive', 'link'] as const).map((v) => (
        <Button key={v} variant={v} disabled>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Button>
      ))}
    </div>
  ),
};

export const AllVariantsLoading: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      {(['primary', 'secondary', 'tertiary', 'ghost', 'destructive', 'link'] as const).map((v) => (
        <Button key={v} variant={v} loading>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Button>
      ))}
    </div>
  ),
};

/* ───────────────────────────────────────────
 * Composition — buttons in a form footer
 * ─────────────────────────────────────────── */

export const FormFooter: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Typical form footer with primary submit and secondary cancel buttons.',
      },
    },
  },
  render: () => (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0.75rem',
      padding: '1rem 0',
      borderTop: '1px solid var(--color-border, #E8E4DD)',
      maxWidth: '480px',
    }}>
      <Button variant="secondary">Cancelar</Button>
      <Button variant="primary">Guardar cambios</Button>
    </div>
  ),
};

/* ───────────────────────────────────────────
 * Icon helper components (inline for portability)
 * ─────────────────────────────────────────── */

function IconPlus() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
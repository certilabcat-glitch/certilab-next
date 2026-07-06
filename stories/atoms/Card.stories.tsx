import type { Meta, StoryObj } from '@storybook/react';

/**
 * Placeholder for the Card component.
 *
 * This is a temporary implementation to verify Storybook infrastructure.
 * The final Card will be implemented after the Design System is fully defined.
 */
const CardPlaceholder = (props: {
  title?: string;
  content?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}) => {
  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      background: 'var(--color-surface, #ffffff)',
      border: '1px solid var(--color-border, #e5e7eb)',
      boxShadow: 'none',
    },
    elevated: {
      background: 'var(--color-surface, #ffffff)',
      border: 'none',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    },
    outlined: {
      background: 'transparent',
      border: '2px solid var(--color-terra, #8B6F47)',
      boxShadow: 'none',
    },
  };

  const vs = variantStyles[props.variant || 'default'];

  return (
    <div
      style={{
        fontFamily: 'var(--font-sans, system-ui)',
        borderRadius: 'var(--radius-lg, 12px)',
        padding: '1.5rem',
        maxWidth: '320px',
        width: '100%',
        ...vs,
      }}
    >
      {props.title && (
        <h3
          style={{
            margin: 0,
            marginBottom: '0.75rem',
            fontSize: '1.125rem',
            fontWeight: 700,
            color: 'var(--color-text, #1a1a2e)',
          }}
        >
          {props.title}
        </h3>
      )}
      {props.content && (
        <p
          style={{
            margin: 0,
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary, #6b7280)',
            lineHeight: 1.6,
          }}
        >
          {props.content}
        </p>
      )}
    </div>
  );
};

const meta = {
  title: 'Atoms/Card',
  component: CardPlaceholder,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '⚠️ **Placeholder** — This is a temporary component to verify Storybook infrastructure. The final Card will be implemented in a future epic.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', defaultValue: 'Card Title' },
    content: { control: 'text', defaultValue: 'This is placeholder content for the card component.' },
    variant: { control: 'select', options: ['default', 'elevated', 'outlined'] },
  },
} satisfies Meta<typeof CardPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    content: 'This is placeholder content demonstrating the card component structure.',
  },
};

export const Elevated: Story = {
  args: {
    title: 'Elevated Card',
    content: 'This card has a shadow to appear elevated above the surface.',
    variant: 'elevated',
  },
};

export const Outlined: Story = {
  args: {
    title: 'Outlined Card',
    content: 'This card uses the Terra brand color for its border.',
    variant: 'outlined',
  },
};

export const ContentOnly: Story = {
  args: {
    content: 'This card has no title, only content text.',
  },
};
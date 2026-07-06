import type { Meta, StoryObj } from '@storybook/react';
import Badge from '../../src/components/ui/Badge';

/**
 * The Badge component is used to display status, labels, or categories.
 *
 * It supports 5 variants and 2 sizes, all styled with Certilab design tokens.
 */
const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Frozen v1 — Badge component for status and category labels. Replaces the previous placeholder.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Badge text content (alternative to children)',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Badge size',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Pendiente', variant: 'default' },
};

export const Success: Story = {
  args: { label: 'Completado', variant: 'success' },
};

export const Warning: Story = {
  args: { label: 'En revisión', variant: 'warning' },
};

export const Error: Story = {
  args: { label: 'Rechazado', variant: 'error' },
};

export const Info: Story = {
  args: { label: 'Informativo', variant: 'info' },
};

export const Small: Story = {
  args: { label: 'Nuevo', size: 'sm' },
};

export const SizeMd: Story = {
  args: { label: 'Predeterminado', size: 'md' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge label="Default" variant="default" />
      <Badge label="Success" variant="success" />
      <Badge label="Warning" variant="warning" />
      <Badge label="Error" variant="error" />
      <Badge label="Info" variant="info" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Badge label="Small" size="sm" />
      <Badge label="Medium" size="md" />
    </div>
  ),
};

export const WithChildren: Story = {
  args: {
    variant: 'info',
    children: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        <span style={{ fontSize: '0.8em' }}>●</span>
        Online
      </span>
    ),
  },
};
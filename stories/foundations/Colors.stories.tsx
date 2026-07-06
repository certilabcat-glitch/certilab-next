import type { Meta, StoryObj } from '@storybook/react';

const ColorsSwatch = () => {
  const colors = [
    { name: 'Terra', token: 'var(--color-terra)', value: '#8B6F47' },
    { name: 'Terra Dark', token: 'var(--color-terra-dark)', value: '#5C4A2A' },
    { name: 'Terra Light', token: 'var(--color-terra-light)', value: '#C4A882' },
    { name: 'Crema', token: 'var(--color-crema)', value: '#F5EFE6' },
    { name: 'Verde', token: 'var(--color-verde)', value: '#4A7C59' },
    { name: 'Black', token: 'var(--color-black)', value: '#0A0A0A' },
    { name: 'Dark', token: 'var(--color-dark)', value: '#333333' },
    { name: 'Grey', token: 'var(--color-grey)', value: '#4A4A4A' },
    { name: 'Border', token: 'var(--color-border)', value: '#E8E4DD' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: 'var(--font-sans)' }}>
      {colors.map((color) => (
        <div key={color.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '8px',
              background: color.value,
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          />
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{color.name}</div>
            <code style={{ fontSize: '0.8rem', color: 'var(--color-grey)' }}>{color.token}</code>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-grey)' }}>{color.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const meta = {
  title: 'Foundations/Colors',
  component: ColorsSwatch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The Certilab color palette. All colors are available as CSS custom properties via the `@theme` block.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorsSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {};

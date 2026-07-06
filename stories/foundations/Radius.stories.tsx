import type { Meta, StoryObj } from '@storybook/react';

const RadiusTable = () => {
  const radii = [
    { token: '--radius-sm', value: '4px', usage: 'Checkboxes, small badges' },
    { token: '--radius-md', value: '8px', usage: 'Buttons, inputs, cards' },
    { token: '--radius-lg', value: '12px', usage: 'Modals, dropdowns' },
    { token: '--radius-xl', value: '16px', usage: 'Sections, containers' },
  ];

  return (
    <div style={{ fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {radii.map((r) => (
        <div key={r.token} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              background: 'var(--color-terra)',
              borderRadius: r.value,
            }}
          />
          <div>
            <code style={{ fontSize: '0.9rem', fontWeight: 600 }}>{r.token}</code>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>{r.value} — {r.usage}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const meta = {
  title: 'Foundations/Border Radius',
  component: RadiusTable,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Border radius tokens define the corner rounding for UI elements.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadiusTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {};

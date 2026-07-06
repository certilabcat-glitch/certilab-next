import type { Meta, StoryObj } from '@storybook/react';

const SpacingTable = () => {
  const spaces = [
    { token: '--space-section', value: '5rem', usage: 'Section vertical spacing (desktop)' },
    { token: '--space-section-mobile', value: '3rem', usage: 'Section vertical spacing (mobile)' },
    { token: '--space-element', value: '1.5rem', usage: 'Default element gap' },
    { token: 'p-0', value: '0px', usage: 'No spacing' },
    { token: 'p-1', value: '0.25rem', usage: 'Extra tight' },
    { token: 'p-2', value: '0.5rem', usage: 'Tight' },
    { token: 'p-3', value: '0.75rem', usage: 'Compact' },
    { token: 'p-4', value: '1rem', usage: 'Default padding' },
    { token: 'p-6', value: '1.5rem', usage: 'Relaxed' },
    { token: 'p-8', value: '2rem', usage: 'Loose' },
    { token: 'p-12', value: '3rem', usage: 'Extra loose' },
    { token: 'p-16', value: '4rem', usage: 'Section padding' },
  ];

  return (
    <div style={{ fontFamily: 'var(--font-sans)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
            <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600 }}>Token</th>
            <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600 }}>Value</th>
            <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600 }}>Visual</th>
            <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600 }}>Usage</th>
          </tr>
        </thead>
        <tbody>
          {spaces.map((space) => (
            <tr key={space.token} style={{ borderBottom: '1px solid var(--color-border)' }}>
              <td style={{ padding: '0.75rem 1rem' }}>
                <code style={{ fontSize: '0.85rem' }}>{space.token}</code>
              </td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.9rem' }}>{space.value}</td>
              <td style={{ padding: '0.75rem 1rem' }}>
                <div
                  style={{
                    width: space.value,
                    height: '1rem',
                    background: 'var(--color-terra)',
                    borderRadius: '2px',
                  }}
                />
              </td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#666' }}>{space.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const meta = {
  title: 'Foundations/Spacing',
  component: SpacingTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Spacing tokens define the vertical and horizontal rhythm of the interface. Use consistent spacing to maintain visual harmony.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpacingTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {};

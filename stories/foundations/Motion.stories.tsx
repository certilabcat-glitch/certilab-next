import type { Meta, StoryObj } from '@storybook/react';

const MotionTable = () => {
  const motions = [
    { token: '--ease-default', value: '0.2s ease', usage: 'Hover states, micro-interactions' },
    { token: '--ease-smooth', value: '0.3s ease', usage: 'Transitions, panel slides' },
    { token: '--ease-spring', value: '0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', usage: 'Entrance animations, playful reveals' },
  ];

  return (
    <div style={{ fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {motions.map((m) => (
        <div key={m.token} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <code style={{ fontWeight: 600 }}>{m.token}</code>
          <div style={{ fontSize: '0.85rem', color: '#666' }}>{m.value}</div>
          <div style={{ fontSize: '0.85rem', color: '#666' }}>{m.usage}</div>
          <div
            style={{
              width: '100%',
              height: '4px',
              background: 'var(--color-terra)',
              borderRadius: '2px',
              transition: 'width 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.width = '100%'; }}
            onMouseLeave={(e) => { e.currentTarget.style.width = '50%'; }}
          />
        </div>
      ))}
    </div>
  );
};

const meta = {
  title: 'Foundations/Motion',
  component: MotionTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Motion tokens define the timing and easing curves for animations and transitions throughout the interface.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MotionTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Easing: Story = {};

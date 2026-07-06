import type { Meta, StoryObj } from '@storybook/react';

const TypographyTable = () => {
  const styles = [
    { name: 'Heading 1', className: 'text-4xl font-bold font-serif', usage: 'Page titles, hero sections' },
    { name: 'Heading 2', className: 'text-3xl font-bold font-serif', usage: 'Section headings' },
    { name: 'Heading 3', className: 'text-2xl font-semibold font-serif', usage: 'Subsection headings' },
    { name: 'Heading 4', className: 'text-xl font-semibold font-sans', usage: 'Card titles, form labels' },
    { name: 'Body Large', className: 'text-lg font-sans', usage: 'Lead paragraphs, featured content' },
    { name: 'Body', className: 'text-base font-sans', usage: 'Default body text' },
    { name: 'Body Small', className: 'text-sm font-sans', usage: 'Metadata, captions' },
    { name: 'Caption', className: 'text-xs font-sans', usage: 'Footnotes, timestamps' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontFamily: 'var(--font-sans)' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Serif (Crimson Pro)</h2>
        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
          Used for headings and display text. Evokes professionalism and tradition.
        </p>
      </div>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Sans (Inter)</h2>
        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
          Used for body text, UI elements, and data. Ensures readability and modernity.
        </p>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
            <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600 }}>Token</th>
            <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600 }}>Sample</th>
            <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600 }}>Usage</th>
          </tr>
        </thead>
        <tbody>
          {styles.map((style) => (
            <tr key={style.name} style={{ borderBottom: '1px solid var(--color-border)' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>{style.name}</td>
              <td style={{ padding: '0.75rem 1rem' }}>
                <span className={style.className}>
                  The quick brown fox jumps over the lazy dog
                </span>
              </td>
              <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#666' }}>{style.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const meta = {
  title: 'Foundations/Typography',
  component: TypographyTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Certilab uses a two-font system: Crimson Pro (serif) for headings and Inter (sans-serif) for body text and UI.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TypographyTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};

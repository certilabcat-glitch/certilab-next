import type { Preview } from '@storybook/react';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    backgrounds: {
      disable: true,
      grid: {
        cellSize: 8,
      },
    },
    viewport: {
      viewports: {
        sm: {
          name: 'Small (sm ≥640px)',
          styles: { width: '640px', height: '900px' },
        },
        md: {
          name: 'Medium (md ≥768px)',
          styles: { width: '768px', height: '900px' },
        },
        lg: {
          name: 'Large (lg ≥1024px)',
          styles: { width: '1024px', height: '900px' },
        },
        xl: {
          name: 'XL (xl ≥1280px)',
          styles: { width: '1280px', height: '900px' },
        },
        '2xl': {
          name: '2XL (2xl ≥1536px)',
          styles: { width: '1536px', height: '900px' },
        },
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
    layout: 'padded',
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      return <Story />;
    },
  ],
  tags: ['autodocs'],
};

export default preview;
# Volume VII — Implementation

## From Design to Production: Engineering the Certilab Interface

---

**Volume:** VII of VII
**Status:** ✅ ACTIVE
**Last Updated:** 2026-07-05
**Estimated Pages:** 100–150

---

## Table of Contents

1. [Implementation Philosophy](#1-implementation-philosophy)
2. [Technology Stack](#2-technology-stack)
3. [Design Token Mapping](#3-design-token-mapping)
4. [Component Implementation Guide](#4-component-implementation-guide)
5. [State and Loading Implementation](#5-state-and-loading-implementation)
6. [Accessibility Implementation](#6-accessibility-implementation)
7. [Responsive Implementation](#7-responsive-implementation)
8. [Performance Implementation](#8-performance-implementation)
9. [Implementation Checklist](#9-implementation-checklist)
10. [Design Governance and Conflict Resolution](#10-design-governance-and-conflict-resolution)
11. [Open Implementation Questions](#11-open-implementation-questions)

---

## 1. Implementation Philosophy

### 1.1 The Engineer's Contract with the Designer

The relationship between design and engineering at Certilab follows a simple contract:

> **Design defines the what and the why. Engineering defines the how. Neither dictates to the other.**

This contract means:
- Designers specify the interface using the design system tokens. Engineers implement them exactly.
- Engineers may propose simplifications for performance or accessibility reasons.
- Designers may request refinements for quality or consistency reasons.
- Disagreements are resolved by reference to the UX Bible (Volume IV) and the Design System (Volume III).

### 1.2 Fidelity First, Optimisation Second

The implementation process follows a two-phase approach:

**Phase 1: Fidelity (V1)**
- Implement the design exactly as specified.
- Use the design tokens directly.
- Prioritise visual correctness over performance optimisation.
- No premature optimisation.

**Phase 2: Optimisation (V1.1+)**
- Measure performance.
- Identify bottlenecks.
- Optimise without changing the visual result.
- Document all optimisations.

### 1.3 Consistency Over Cleverness

The goal of implementation is consistency, not cleverness.

**✅ Correct:**
- Using the same `Button` component everywhere, even when a custom element might be slightly more appropriate.
- Repeating the same pattern 100 times rather than creating a novel abstraction.
- Following the existing conventions rather than inventing new ones.

**❌ Incorrect:**
- Creating a new component for every unique use case.
- Over-abstracting early ("we might need this flexibility later").
- Using design patterns that differ from the established system.

---

## 2. Technology Stack

### 2.1 Core Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 14+ |
| Language | TypeScript | 5+ |
| Styling | Tailwind CSS | 3+ |
| Component primitives | Radix UI | With accessibility |
| State management | React hooks + Zustand (if needed) | |
| Animation | CSS transitions / Framer Motion (limited) | |
| Testing | Vitest + React Testing Library | |

### 2.2 Styling Approach

**Primary: Tailwind CSS utility classes.**
- All design tokens are mapped to Tailwind configuration.
- No custom CSS unless absolutely necessary.
- No CSS modules (except for legacy code).
- No CSS-in-JS libraries.

**Secondary: Component-level tailwind classes.**
- Each component uses `cn()` utility for conditional classes.
- Variants are handled via component props, not CSS classes.
- The `tw-merge` pattern is used to prevent class conflicts.

### 2.3 Component Architecture

```
Component
├── Primitive (Radix UI or HTML)
├── Variant (prop-based)
├── State (loading, error, empty, disabled)
└── Composition (compound components)
```

**Rules:**
- Primitive components (Button, Input, Select) come from the design system.
- Composite components (Form, Table, Dialog) compose primitives.
- Page-specific components are built from composite components.
- No page should contain raw HTML elements when a primitive exists.

---

## 3. Design Token Mapping

### 3.1 Colour Token Mapping

All colour tokens defined in Volume II must be mapped to Tailwind configuration.

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EFF6FF',  // Lightest brand
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E3A8A',  // Primary brand blue
          900: '#1E40AF',
          950: '#172554',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        success: {
          DEFAULT: '#059669',
          light: '#D1FAE5',
          dark: '#065F46',
        },
        warning: {
          DEFAULT: '#D97706',
          light: '#FEF3C7',
          dark: '#92400E',
        },
        error: {
          DEFAULT: '#DC2626',
          light: '#FEE2E2',
          dark: '#991B1B',
        },
        info: {
          DEFAULT: '#0284C7',
          light: '#E0F2FE',
          dark: '#075985',
        },
      },
    },
  },
};
```

### 3.2 Typography Token Mapping

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1rem' }],    // 12px
        'sm':   ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        'base': ['1rem',     { lineHeight: '1.5rem' }],  // 16px
        'lg':   ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        'xl':   ['1.25rem',  { lineHeight: '1.75rem' }], // 20px
        '2xl':  ['1.5rem',   { lineHeight: '2rem' }],    // 24px
        '3xl':  ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl':  ['2.25rem',  { lineHeight: '2.5rem' }],  // 36px
        '5xl':  ['3rem',     { lineHeight: '1.16' }],    // 48px
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
};
```

### 3.3 Spacing Token Mapping

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      spacing: {
        '0':   '0px',
        'px':  '1px',
        '0.5': '0.125rem', // 2px
        '1':   '0.25rem',  // 4px
        '1.5': '0.375rem', // 6px
        '2':   '0.5rem',   // 8px
        '2.5': '0.625rem', // 10px
        '3':   '0.75rem',  // 12px
        '3.5': '0.875rem', // 14px
        '4':   '1rem',     // 16px
        '5':   '1.25rem',  // 20px
        '6':   '1.5rem',   // 24px
        '7':   '1.75rem',  // 28px
        '8':   '2rem',     // 32px
        '9':   '2.25rem',  // 36px
        '10':  '2.5rem',   // 40px
        '11':  '2.75rem',  // 44px
        '12':  '3rem',     // 48px
        '14':  '3.5rem',   // 56px
        '16':  '4rem',     // 64px
        '20':  '5rem',     // 80px
        '24':  '6rem',     // 96px
        '28':  '7rem',     // 112px
        '32':  '8rem',     // 128px
      },
    },
  },
};
```

### 3.4 Shadow Tokens

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      boxShadow: {
        'card':     '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'dialog':   '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.04)',
        'dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04)',
        'elevated': '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)',
      },
    },
  },
};
```

### 3.5 Radius Tokens

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      borderRadius: {
        'sm':    '0.25rem',  // 4px
        'md':    '0.375rem', // 6px
        'lg':    '0.5rem',   // 8px
        'xl':    '0.75rem',  // 12px
        '2xl':   '1rem',     // 16px
        'full':  '9999px',
      },
    },
  },
};
```

---

## 4. Component Implementation Guide

### 4.1 Component Structure Convention

Every component in the design system follows the same structure:

```typescript
// components/ui/Button.tsx

import { cn } from '@/lib/utils';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

// 1. Variant types
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

// 2. Props interface
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

// 3. Variant classes (constant, outside component)
const variantClasses: Record<ButtonVariant, string> = {
  primary:   'bg-brand-800 text-white hover:bg-brand-900 focus-visible:ring-brand-800',
  secondary: 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50',
  ghost:     'bg-transparent text-neutral-700 hover:bg-neutral-100',
  danger:    'bg-error text-white hover:bg-error-dark focus-visible:ring-error',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

// 4. Component
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" ... />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
```

### 4.2 Primitive Components

The following primitives must be implemented before any composite component:

| Component | Files | Priority |
|-----------|-------|----------|
| Button | `components/ui/button.tsx` | P0 |
| Input | `components/ui/input.tsx` | P0 |
| Label | `components/ui/label.tsx` | P0 |
| Select | `components/ui/select.tsx` | P0 |
| Textarea | `components/ui/textarea.tsx` | P0 |
| Checkbox | `components/ui/checkbox.tsx` | P0 |
| Radio | `components/ui/radio.tsx` | P0 |
| Avatar | `components/ui/avatar.tsx` | P1 |
| Badge | `components/ui/badge.tsx` | P0 |
| Card | `components/ui/card.tsx` | P0 |
| Dialog | `components/ui/dialog.tsx` | P0 |
| Dropdown | `components/ui/dropdown.tsx` | P0 |
| Toast | `components/ui/toast.tsx` | P0 |
| Tooltip | `components/ui/tooltip.tsx` | P1 |
| Skeleton | `components/ui/skeleton.tsx` | P0 |
| Progress | `components/ui/progress.tsx` | P1 |
| Tabs | `components/ui/tabs.tsx` | P0 |
| Table | `components/ui/table.tsx` | P0 |
| Pagination | `components/ui/pagination.tsx` | P1 |
| Breadcrumb | `components/ui/breadcrumb.tsx` | P1 |

### 4.3 Composite Components

Composite components are built from primitives:

| Component | Composes | Priority |
|-----------|----------|----------|
| Form | Input, Label, Select, Textarea, Button | P0 |
| DataTable | Table, Pagination, Badge | P0 |
| SearchInput | Input, Icon | P0 |
| FileUpload | Button, Progress | P0 |
| StatusBadge | Badge | P0 |
| ConfirmDialog | Dialog, Button | P0 |
| EmptyState | Icon, Button | P0 |
| PageHeader | Breadcrumb, Button | P0 |
| FilterBar | Select, Input, Button | P1 |
| ActivityTimeline | Card, Badge | P2 |

### 4.4 Icon Implementation

> **Pending validation of design.** Icon set selection is not yet determined. The following principles apply:

- Use an established icon library (Lucide, Heroicons, or Phosphor).
- All icons must be outline style (not filled).
- Default size: 16×16px for inline, 20×20px for standalone.
- All icons must support `className` for colour inheritance.
- No custom icon creation in V1.

---

## 5. State and Loading Implementation

### 5.1 State Management Pattern

Every data-fetching component follows the same pattern:

```typescript
// Pattern for data-fetching components

type ViewState<T> = 
  | { status: 'loading' }
  | { status: 'error'; error: Error; retry: () => void }
  | { status: 'empty'; message: string; action?: { label: string; onClick: () => void } }
  | { status: 'success'; data: T };

function CaseFileList() {
  const [state, setState] = useState<ViewState<CaseFile[]>>({ status: 'loading' });

  // Fetch logic...
  
  if (state.status === 'loading') return <CaseFileListSkeleton />;
  if (state.status === 'error') return <ErrorState message={state.error.message} onRetry={state.retry} />;
  if (state.status === 'empty') return <EmptyState message={state.message} action={state.action} />;
  
  return <CaseFileListContent data={state.data} />;
}
```

### 5.2 Loading State Implementation

Loading states use skeleton components that match the layout of the content they replace.

```typescript
// components/ui/skeleton.tsx

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-neutral-200',
        className
      )}
    />
  );
}

// Usage in a case file list skeleton
function CaseFileListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      ))}
    </div>
  );
}
```

### 5.3 Error State Implementation

```typescript
// components/ui/error-state.tsx

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

function ErrorState({ title = 'Algo ha ido mal', message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-error-light p-3 mb-4">
        <AlertCircle className="h-6 w-6 text-error" />
      </div>
      <h3 className="text-lg font-medium text-neutral-900 mb-1">{title}</h3>
      <p className="text-sm text-neutral-500 mb-6 max-w-sm">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </div>
  );
}
```

### 5.4 Empty State Implementation

```typescript
// components/ui/empty-state.tsx

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {Icon && (
        <div className="rounded-full bg-neutral-100 p-3 mb-4">
          <Icon className="h-6 w-6 text-neutral-400" />
        </div>
      )}
      <h3 className="text-lg font-medium text-neutral-900 mb-1">{title}</h3>
      <p className="text-sm text-neutral-500 mb-6 max-w-sm">{description}</p>
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
```

### 5.5 Autosave Pattern

```typescript
// hooks/use-autosave.ts

function useAutosave<T>(
  data: T,
  saveFn: (data: T) => Promise<void>,
  delay: number = 30000 // 30 seconds
) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(async () => {
      setStatus('saving');
      try {
        await saveFn(data);
        setStatus('saved');
        // Auto-dismiss after 2 seconds
        setTimeout(() => setStatus('idle'), 2000);
      } catch {
        setStatus('error');
      }
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [data, delay, saveFn]);

  return { status };
}
```

### 5.6 Toast Implementation

```typescript
// components/ui/toast.tsx

type ToastType = 'success' | 'error' | 'info';

interface ToastData {
  id: string;
  type: ToastType;
  message: string;
}

const toastConfig: Record<ToastType, { icon: string; className: string }> = {
  success: { icon: '✓', className: 'bg-success text-white' },
  error:   { icon: '✕', className: 'bg-error text-white' },
  info:    { icon: 'ⓘ', className: 'bg-info text-white' },
};

function ToastContainer() {
  const toasts = useToastStore(state => state.toasts);
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={cn(
            'px-4 py-3 rounded-lg shadow-dialog text-sm font-medium',
            'animate-in slide-in-from-right',
            toastConfig[toast.type].className
          )}
          role="alert"
          aria-live="polite"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
```

**Toast auto-dismiss rules:**
- Success: 3 seconds
- Info: 5 seconds
- Error: Until user dismisses (add close button)
- No toast should require user action to dismiss, except for errors.

---

## 6. Accessibility Implementation

### 6.1 HTML Semantics Checklist

Every component must pass the following semantic HTML checks:

| Element | Correct HTML | ARIA Attributes |
|---------|-------------|-----------------|
| Navigation | `<nav>` | `aria-label="Main menu"` (if multiple navs) |
| Main content | `<main>` | `role="main"` (fallback) |
| Headings | `<h1>`–`<h6>` | Proper hierarchy, no skipping |
| Lists | `<ul>`/`<ol>` + `<li>` | `role="list"` if CSS removes semantics |
| Buttons | `<button>` | Never use `<div>` as button |
| Links | `<a>` | `href` attribute |
| Form inputs | `<input>`/`<select>`/`<textarea>` | Associated `<label>` |
| Images | `<img>` | `alt` attribute |
| Tables | `<table>` + `<th>` + scope | `role="grid"` if interactive |
| Dialogs | `<dialog>` or Radix Dialog | `role="dialog"`, `aria-modal` |
| Toast | `<div role="alert">` | `aria-live` |

### 6.2 Focus Management

```typescript
// hooks/use-focus-trap.ts

function useFocusTrap(containerRef: RefObject<HTMLElement>, active: boolean) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    function handleTab(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    }

    // Focus first element when opened
    firstFocusable?.focus();
    
    container.addEventListener('keydown', handleTab);
    return () => container.removeEventListener('keydown', handleTab);
  }, [active, containerRef]);
}
```

### 6.3 Keyboard Navigation

| Component | Keyboard Interaction |
|-----------|---------------------|
| Button | Enter/Space to activate |
| Input | Tab to focus, type to input |
| Select | Tab to focus, arrow keys to navigate, Enter to select |
| Checkbox | Tab to focus, Space to toggle |
| Radio group | Arrow keys to navigate between options |
| Tabs | Arrow keys to navigate between tabs, Tab to enter tab panel |
| Dialog | Escape to close, Tab to cycle through focusable elements |
| Dropdown | Enter to open, arrow keys to navigate, Enter to select, Escape to close |
| Table (sortable) | Click/Enter on header to sort, Tab to navigate cells |
| Toast | Auto-dismissed, or Tab to focus close button |
| File upload | Enter to open file picker, or drag-and-drop |

### 6.4 Screen Reader Announcements

```typescript
// hooks/use-announce.ts

function useAnnounce() {
  const [message, setMessage] = useState('');
  const [key, setKey] = useState(0);

  const announce = useCallback((text: string) => {
    setMessage(text);
    setKey(k => k + 1);
  }, []);

  return {
    announce,
    Announcer: () => (
      <div
        key={key}
        role="status"
        aria-live="polite"
        className="sr-only"
      >
        {message}
      </div>
    ),
  };
}
```

### 6.5 Colour Contrast Implementation

All colour combinations must meet WCAG AA contrast ratios:

| Combination | Ratio Requirement | Example |
|-------------|------------------|---------|
| Body text on white | 4.5:1 | Neutral 700 (#334155) on white (#FFFFFF) = 9.7:1 |
| Large text on white | 3:1 | Brand 800 (#1E3A8A) on white = 8.2:1 |
| Body text on card | 4.5:1 | Neutral 700 on Neutral 50 = 8.5:1 |
| Disabled text | 3:1 | Neutral 400 on white = 4.3:1 |

---

## 7. Responsive Implementation

### 7.1 Breakpoint Definitions

| Breakpoint | Tailwind Class | Target |
|------------|---------------|--------|
| Mobile | `sm:`, default | < 640px |
| Tablet | `md:` | 640px – 1023px |
| Desktop | `lg:` | 1024px – 1279px |
| Wide | `xl:` | 1280px+ |

### 7.2 Responsive Patterns

| Pattern | Implementation | Example |
|---------|---------------|---------|
| Stack to row | `flex flex-col md:flex-row` | Form with sidebar |
| Table to cards | `hidden md:table`, `block md:hidden` on mobile cards | AT dashboard case list |
| Sidebar to top nav | `hidden lg:block` for sidebar, `block lg:hidden` for mobile nav | Platform layout |
| Multi-column to single | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | Card grids |
| Modal to sheet | Full modal on desktop, bottom sheet on mobile | Dialogs |

### 7.3 Touch Target Implementation

```typescript
// touch-target utility
const touchBase = 'min-h-[44px] min-w-[44px]';
```

All interactive elements must use this minimum touch target size. If the visible element is smaller, padding must be added to reach 44×44px.

---

## 8. Performance Implementation

### 8.1 Bundle Size Budget

| Asset | Target | Warning | Critical |
|-------|--------|---------|----------|
| Initial JS | < 100 KB | 100-150 KB | > 150 KB |
| Initial CSS | < 20 KB | 20-30 KB | > 30 KB |
| Fonts (Inter) | < 30 KB | 30-50 KB | > 50 KB |
| Total page weight | < 300 KB | 300-500 KB | > 500 KB |
| Images (per page) | < 100 KB | 100-200 KB | > 200 KB |

### 8.2 Image Implementation

```typescript
// Always use Next.js Image component for optimisation

import Image from 'next/image';

// ✅ Correct
<Image
  src="/hero.jpg"
  alt="Certilab Platform"
  width={1200}
  height={600}
  priority  // Only for above-the-fold images
  className="object-cover"
/>

// ❌ Incorrect
<img src="/hero.jpg" alt="Certilab Platform" />
```

### 8.3 Lazy Loading

```typescript
// Lazy load below-the-fold content

import dynamic from 'next/dynamic';

const PITRInterface = dynamic(() => import('@/components/pitr/PITRInterface'), {
  loading: () => <PITRSkeleton />,
});
```

### 8.4 Animation Guidelines

```css
/* CSS transitions for all interactive elements */
* {
  @apply transition-colors duration-150 ease-in-out;
}

/* Specific durations */
.button {
  @apply transition-all duration-150 ease-in-out;
}

.modal {
  @apply transition-opacity duration-200 ease-in-out;
}

.skeleton {
  @apply animate-pulse;
}
```

**Animation rules:**
- Duration: 150ms for UI elements, 200ms for modals, 300ms for page transitions.
- Easing: `ease-in-out` for UI elements, `ease-out` for entrances, `ease-in` for exits.
- Reduced motion: Support `prefers-reduced-motion: reduce` — disable all animations.
- No keyframe animations in V1 except for the skeleton pulse.

---

## 9. Implementation Checklist

### 9.1 Per-Component Checklist

Each component, before being considered "done", must pass:

- [ ] Component is built from design system tokens (colours, spacing, typography).
- [ ] Component uses `cn()` for class merging.
- [ ] Component has proper TypeScript types exported.
- [ ] Component supports `className` prop for override.
- [ ] Component uses `forwardRef` if it accepts focus.
- [ ] Component has a loading state (if data-fetching).
- [ ] Component has an empty state (if list/data display).
- [ ] Component has an error state.
- [ ] Component is keyboard accessible.
- [ ] Component has `aria-*` attributes where needed.
- [ ] Component is tested (unit test).
- [ ] Component is responsive (tested at mobile, tablet, desktop).
- [ ] Component has no console errors or warnings.

### 9.2 Page-Level Checklist

- [ ] Page title is set (document head).
- [ ] Meta description is set.
- [ ] Heading hierarchy is correct (one h1, sequential h2-h6).
- [ ] All interactive elements are keyboard accessible.
- [ ] Focus management works (focus trap for modals, focus return).
- [ ] Loading state is shown while data is fetching.
- [ ] Error state handles all expected errors.
- [ ] Empty state guides the user to the next action.
- [ ] Page is responsive at all breakpoints.
- [ ] Page meets accessibility requirements.
- [ ] Bundle size is within budget.

### 9.3 Design Token Checklist

- [ ] All colours use design system tokens (no hardcoded hex values).
- [ ] All spacing uses design system tokens (no arbitrary values).
- [ ] All typography uses design system tokens (font size, weight, family).
- [ ] All shadows use design system tokens.
- [ ] All radii use design system tokens.
- [ ] Tailwind config is the single source of truth for tokens.

### 9.4 Accessibility Checklist

- [ ] All form elements have associated labels.
- [ ] All images have alt text (or `alt=""` for decorative).
- [ ] All interactive elements have visible focus indicators.
- [ ] Colour contrast meets WCAG AA minimum (4.5:1 body, 3:1 large).
- [ ] Information is not conveyed by colour alone.
- [ ] All states (loading, error, empty, success) are communicated to screen readers.
- [ ] Dialog focus is trapped inside the dialog.
- [ ] Dialog returns focus to trigger element when closed.
- [ ] Keyboard navigation follows logical tab order.

---

## 10. Design Governance and Conflict Resolution

### 10.1 The Book Supremacy

> **If any technical decision conflicts with The Book of Certilab, The Book of Certilab always prevails.**

The Book of Certilab is the supreme design and experience reference for Certilab Platform. It is the constitution of the product's interface, identity, and experience.

This rule is non-negotiable. It takes precedence over:

- AGENTS.md governance rules
- CF documents (including CF-000, CF-001, CF-001A)
- ADR documents
- Session prompts and directives
- Any other documentation

The Book may only be overridden by a future edition of itself, approved through the design governance process defined in this section.

### 10.2 Conflict Detection Protocol

When a conflict is detected between a technical decision (architecture, implementation, dependency choice, component structure, CSS approach) and any volume of this book, the following protocol applies:

| Step | Action | Responsibility | Artifact |
|------|--------|----------------|----------|
| 1 | **Detect** — Identify that a conflict exists between a technical decision and The Book | Engineer or Designer | Brief description |
| 2 | **Document** — Identify the exact sections of The Book and the technical decision in conflict | Engineer | Conflict record |
| 3 | **Stop** — Do not proceed with the conflicting technical decision | Engineer | Halted implementation |
| 4 | **Escalate** — The conflict must be resolved by either: (a) updating the technical decision to align with The Book, or (b) proposing a revision to The Book via the design governance process | Lead | Resolution proposal |
| 5 | **Resolve** — Decision is made: either the technical decision is corrected, or The Book is amended | Design Lead + Lead Engineer | Updated decision |

**No technical decision may proceed while a conflict with The Book remains unresolved.**

### 10.3 Conflict Record Template

When a conflict is detected, it must be documented using this template:

```
---
id: CONF-XXX
title: [Short description of the conflict]
detected: [Date]
detected_by: [Engineer/Designer name]
status: open | resolved | rejected
volume_section: [Exact Volume and Section reference]
technical_decision: [Description of the conflicting technical decision]
conflict_description: [Why they conflict]
resolution: [How the conflict was resolved]
resolved_by: [Lead name]
resolved_date: [Date]
---
```

### 10.4 Design Governance Process

The Book of Certilab is a living document. It evolves as the product evolves. But evolution must be controlled.

**Proposing a change to The Book:**

1. Identify the specific section and text that needs to change.
2. Justify why the change is necessary:
   - New product capability not covered by the current text
   - User research or usability testing that contradicts the current guidance
   - Accessibility requirement not adequately addressed
   - Performance or technical constraint that cannot be resolved within the current guidance
3. The proposal must include the exact new text, not just a description of the change.
4. The proposal must identify all other sections and volumes that would be affected by the change.
5. The proposal is reviewed by the Design Lead and Lead Engineer.
6. If approved, the change is applied to all affected volumes, and the INDEX.md changelog is updated.
7. If rejected, the reason is documented, and the original text stands.

**Changes that do not require governance:**

- Fixing typos or grammatical errors
- Clarifying ambiguous language
- Updating references to implementation decisions (e.g., which icon library was chosen)
- Adding examples that illustrate existing principles

### 10.5 Implementation Halt Authority

The following roles have the authority to halt implementation when a conflict with The Book is detected:

- Lead Designer
- Lead Engineer
- Product Manager
- Quality Assurance Lead

Any team member may raise a conflict, but the halt must be confirmed by one of the above roles.

**When implementation is halted:**

1. The conflicting work is paused immediately.
2. The conflict is documented using the template in §10.3.
3. The resolution process begins within 24 hours.
4. Work may resume only when the conflict is resolved.

### 10.6 Relationship with AGENTS.md

The Book of Certilab and AGENTS.md serve complementary roles:

| Document | Domain | Precedence |
|----------|--------|------------|
| The Book of Certilab | Design, UX, visual identity, brand, copy | **Supreme** — overrides all |
| AGENTS.md | Development governance, architecture rules, session protocol | Subordinate to The Book |
| CF documents | Architecture decisions, data model, domain model | Subordinate to The Book |

If AGENTS.md or CF documents conflict with The Book, The Book prevails. The conflict must be escalated and resolved before any implementation proceeds.

✅ **Correct:** "The Design System specifies a 4px spacing scale. Even though the current implementation uses a custom value, we must refactor to use the token system as defined in The Book."

✅ **Correct:** "The UX Bible specifies that confirmation dialogs must not have a 'Don't ask again' checkbox. Our current implementation includes one. We must remove it to align with The Book."

❌ **Incorrect:** "This technical constraint prevents us from using the design system token. We will deviate from The Book and document the reason later."

❌ **Incorrect:** "AGENTS.md allows this pattern, so we will proceed despite The Book's guidance."

### 10.7 Examples

**Example 1: Component conflict**

> **Conflict:** The implementation uses `Button` with a custom purple background (`#7C3AED`) because the developer preferred it. The Design System (Volume III, §4.1) specifies the primary action colour as `blue-600` (`#2563EB`).
>
> **Resolution:** The custom colour is replaced with the design system token. The button now uses `bg-blue-600` as specified.

**Example 2: Spacing conflict**

> **Conflict:** An engineer used `gap-3` (12px) in a card layout. The Visual Language (Volume II, §3.2) specifies that the spacing scale uses increments of 8px. `12px` is not a valid token.
>
> **Resolution:** The spacing is corrected to `gap-2` (8px) with a re-evaluation of the layout to accommodate the correct spacing.

**Example 3: Flow conflict**

> **Conflict:** The implementation of the PITR™ workflow includes a multi-step wizard. The UX Bible (Volume IV, §6.2) specifies that the inspection workflow should be a single scrollable page, not a wizard.
>
> **Resolution:** The wizard is replaced with a scrollable page design. The development effort is re-estimated to account for the redesign.

---

## 11. Open Implementation Questions

| ID | Question | Context | Depends On |
|----|----------|---------|------------|
| IMP-001 | Which icon library should be used? | Lucide, Heroicons, and Phosphor are all viable. Each has different coverage, licensing, and bundle size. | V2:§Iconography, DS validation |
>>>>>>>
This is the first occurrence of IMP-001. 
>>>>>>>>>
Let me read the full open questions section to do a proper replace.

<read_file>
<path>docs/book/Volume-07-Implementation.md</path>
<start_line>918</start_line>
<end_line>948</end_line>
| IMP-002 | How should the PITR™ question tree be implemented? | Stateful form with save position tracking. Should answers be stored client-side or server-side during the session? | UX-001 resolution |
| IMP-003 | Should CSS animations be implemented with Tailwind or Framer Motion? | Tailwind covers most needs. Framer Motion adds bundle weight but enables complex animations. | V1 scope decision |
| IMP-004 | How should document comparison (side-by-side) be implemented? | PDF.js for rendering, custom comparison UI. Performance considerations for large documents. | V2 planning |
| IMP-005 | Should the design system components be extracted to a separate package? | A separate package would enable reuse across projects but adds overhead. For V1, co-location is preferred. | V2 planning |
| IMP-006 | How should the autosave mechanism handle conflicts? | If two sessions save simultaneously, which wins? Last-write-wins is simple but may lose data. | Product decision |
| IMP-007 | Should we use React Server Components for data-fetching pages? | RSC would reduce client-side JS but requires different data-fetching patterns. | Architecture decision |
| IMP-008 | What is the error tracking and monitoring strategy? | Sentry? LogRocket? Custom? Error boundaries must be implemented regardless. | V1.1 planning |

---

## Volume VII — References

| Reference | Relationship |
|-----------|-------------|
| → II (Visual Language) | Design token values |
| → III (Design System) | Component specifications |
| → IV (UX Bible) | State and interaction specifications |
| → VI (Brand Book) | Brand expression in code |

---

*End of Volume VII — Implementation*

*All implementation decisions in this Volume are based on the design system architecture and visual language defined in Volumes II and III. Where decisions could not be deduced from existing documents, they are identified as "Pending validation of design" with an IMP- reference ID.*
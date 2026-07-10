'use client';

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  type ReactNode,
} from 'react';

/* ───────────────────────────────────────────
 * Types
 * ─────────────────────────────────────────── */

type DropdownMenuContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const DropdownMenuContext = createContext<DropdownMenuContextType | null>(null);

/* ───────────────────────────────────────────
 * Root
 * ─────────────────────────────────────────── */

export interface DropdownMenuProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block text-left">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};
DropdownMenu.displayName = 'DropdownMenu';

/* ───────────────────────────────────────────
 * Trigger
 * ─────────────────────────────────────────── */

export interface DropdownMenuTriggerProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
  children,
  className = '',
}) => {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) throw new Error('DropdownMenuTrigger must be used within DropdownMenu');

  const handleClick = () => {
    ctx.setOpen(!ctx.open);
  };

  return (
    <button
      // En este punto solo se pasa el RefObject al atributo `ref` (uso canónico de React),
      // y se lee `ctx.open` (booleano de estado). En ningún momento se accede a
      // `triggerRef.current` durante el render. La regla `react-hooks/refs` marca ambas
      // líneas porque su análisis estático no puede diferenciar entre propiedades de un
      // mismo objeto contextual que contiene tanto estado como referencias.
      // eslint-disable-next-line react-hooks/refs
      ref={ctx.triggerRef}
      type="button"
      onClick={handleClick}
      aria-haspopup="true"
      // eslint-disable-next-line react-hooks/refs
      aria-expanded={ctx.open}
      className={className}
    >
      {children}
    </button>
  );
};
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

/* ───────────────────────────────────────────
 * Content
 * ─────────────────────────────────────────── */

export interface DropdownMenuContentProps {
  children: ReactNode;
  align?: 'start' | 'end' | 'center';
  className?: string;
}

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  children,
  align = 'start',
  className = '',
}) => {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) throw new Error('DropdownMenuContent must be used within DropdownMenu');

  const contentRef = useRef<HTMLDivElement | null>(null);

  // Close on click outside
  useEffect(() => {
    if (!ctx.open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        ctx.triggerRef.current &&
        !ctx.triggerRef.current.contains(event.target as Node)
      ) {
        ctx.setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        ctx.setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [ctx.open, ctx.setOpen, ctx.triggerRef]);

  if (!ctx.open) return null;

  const alignClasses = {
    start: 'left-0',
    end: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <div
      ref={contentRef}
      role="menu"
      aria-orientation="vertical"
      className={`absolute z-50 mt-1 min-w-[12rem] rounded-lg border border-gray-200 bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none ${alignClasses[align]} ${className}`}
    >
      {children}
    </div>
  );
};
DropdownMenuContent.displayName = 'DropdownMenuContent';

/* ───────────────────────────────────────────
 * Item
 * ─────────────────────────────────────────── */

export interface DropdownMenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) throw new Error('DropdownMenuItem must be used within DropdownMenu');

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    ctx.setOpen(false);
  };

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={handleClick}
      className={`flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};
DropdownMenuItem.displayName = 'DropdownMenuItem';

/* ───────────────────────────────────────────
 * Separator
 * ─────────────────────────────────────────── */

export const DropdownMenuSeparator: React.FC = () => (
  <div className="my-1 border-t border-gray-100" />
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

/* ───────────────────────────────────────────
 * Label
 * ─────────────────────────────────────────── */

export interface DropdownMenuLabelProps {
  children: ReactNode;
  className?: string;
}

export const DropdownMenuLabel: React.FC<DropdownMenuLabelProps> = ({
  children,
  className = '',
}) => (
  <div className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 ${className}`}>
    {children}
  </div>
);
DropdownMenuLabel.displayName = 'DropdownMenuLabel';
import React, { type ReactNode } from 'react';

/* ───────────────────────────────────────────
 * Types
 * ─────────────────────────────────────────── */

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  /** Text or ReactNode displayed inside the badge */
  children?: ReactNode;
  /** Alternative way to pass text (overrides children) */
  label?: string;
  /** Visual variant */
  variant?: BadgeVariant;
  /** Size */
  size?: BadgeSize;
  /** Additional class names */
  className?: string;
}

/* ───────────────────────────────────────────
 * Variant styles — using design tokens where
 * available, preserving the exact visual
 * contract from the original placeholder.
 * ─────────────────────────────────────────── */

type VariantStyles = {
  bg: string;
  text: string;
  border: string;
};

const variantMap: Record<BadgeVariant, VariantStyles> = {
  /* Default — brand tones */
  default: {
    bg: 'bg-[var(--color-crema,#F5EFE6)]',
    text: 'text-[var(--color-terra,#8B6F47)]',
    border: 'border-[var(--color-crema,#F5EFE6)]',
  },
  /* Success — green */
  success: {
    bg: 'bg-[#ecfdf5]',
    text: 'text-[#166534]',
    border: 'border-[#bbf7d0]',
  },
  /* Warning — amber */
  warning: {
    bg: 'bg-[#fffbeb]',
    text: 'text-[#92400e]',
    border: 'border-[#fde68a]',
  },
  /* Error — red */
  error: {
    bg: 'bg-[#fef2f2]',
    text: 'text-[#991b1b]',
    border: 'border-[#fecaca]',
  },
  /* Info — blue */
  info: {
    bg: 'bg-[#eff6ff]',
    text: 'text-[#1e40af]',
    border: 'border-[#bfdbfe]',
  },
};

/* ───────────────────────────────────────────
 * Size styles
 * ─────────────────────────────────────────── */

type SizeStyles = {
  padding: string;
  fontSize: string;
};

const sizeMap: Record<BadgeSize, SizeStyles> = {
  sm: {
    padding: 'px-2 py-0.5',
    fontSize: 'text-xs',
  },
  md: {
    padding: 'px-3 py-1',
    fontSize: 'text-sm',
  },
};

/* ───────────────────────────────────────────
 * Badge component
 * ─────────────────────────────────────────── */

const Badge: React.FC<BadgeProps> = ({
  children,
  label,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const v = variantMap[variant];
  const s = sizeMap[size];
  const content = label ?? children;

  const classes = [
    /* Base */
    'inline-flex items-center',
    'font-semibold leading-tight',
    'rounded-full border',
    /* Size */
    s.padding,
    s.fontSize,
    /* Variant */
    v.bg,
    v.text,
    v.border,
    /* Custom */
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{content}</span>;
};

Badge.displayName = 'Badge';

export default Badge;
import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';

/* ───────────────────────────────────────────
 * Types
 * ─────────────────────────────────────────── */

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'destructive'
  | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant */
  variant?: ButtonVariant;
  /** Size */
  size?: ButtonSize;
  /** Loading state — disables the button and shows a spinner */
  loading?: boolean;
  /** Icon placed before (leading) the label */
  iconLeft?: ReactNode;
  /** Icon placed after (trailing) the label */
  iconRight?: ReactNode;
  /** When true the button renders as icon-only (requires aria-label) */
  iconOnly?: boolean;
  /** Ref forwarding is supported via normal ref prop */
}

/* ───────────────────────────────────────────
 * Variant styles
 * ─────────────────────────────────────────── */

type VariantStyles = {
  base: string;
  hover: string;
  active: string;
  focus: string;
  disabled: string;
};

const variantMap: Record<ButtonVariant, VariantStyles> = {
  /* Primary — filled terra */
  primary: {
    base: 'bg-[var(--color-terra)] text-white border-[var(--color-terra)]',
    hover: 'hover:bg-[var(--color-terra-dark)] hover:border-[var(--color-terra-dark)]',
    active: 'active:bg-[var(--color-terra-dark)] active:border-[var(--color-terra-dark)]',
    focus: 'focus-visible:ring-[var(--color-terra)]',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-terra)]',
  },
  /* Secondary — outline terra, reduced visual weight */
  secondary: {
    base: 'bg-transparent text-[var(--color-terra)] border border-[var(--color-terra)]',
    hover: 'hover:bg-[var(--color-terra)] hover:text-white',
    active: 'active:bg-[var(--color-terra-dark)] active:text-white active:border-[var(--color-terra-dark)]',
    focus: 'focus-visible:ring-[var(--color-terra)]',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[var(--color-terra)]',
  },
  /* Tertiary — crema fill, terra text */
  tertiary: {
    base: 'bg-[var(--color-crema)] text-[var(--color-terra)] border border-[var(--color-border)]',
    hover: 'hover:bg-[var(--color-border)] hover:text-[var(--color-terra-dark)]',
    active: 'active:bg-[var(--color-terra-light)] active:text-[var(--color-terra-dark)]',
    focus: 'focus-visible:ring-[var(--color-terra)]',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-crema)]',
  },
  /* Ghost — transparent, borderless, minimal */
  ghost: {
    base: 'bg-transparent text-[var(--color-terra)] border-0',
    hover: 'hover:bg-[var(--color-crema)] hover:text-[var(--color-terra-dark)]',
    active: 'active:bg-[var(--color-border)] active:text-[var(--color-terra-dark)]',
    focus: 'focus-visible:ring-[var(--color-terra)]',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent',
  },
  /* Destructive — serious tone using terra-dark as base */
  destructive: {
    base: 'bg-[var(--color-terra-dark)] text-white border-[var(--color-terra-dark)]',
    hover: 'hover:bg-[#4A3A1E] hover:border-[#4A3A1E]',
    active: 'active:bg-[#3D2E14] active:border-[#3D2E14]',
    focus: 'focus-visible:ring-[var(--color-terra-dark)]',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-terra-dark)]',
  },
  /* Link — text only, no border/background */
  link: {
    base: 'bg-transparent text-[var(--color-terra)] border-none underline-offset-2',
    hover: 'hover:text-[var(--color-terra-dark)] hover:underline',
    active: 'active:text-[var(--color-terra-dark)]',
    focus: 'focus-visible:ring-[var(--color-terra)]',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-[var(--color-terra)] disabled:hover:no-underline',
  },
};

/* ───────────────────────────────────────────
 * Size styles
 * ─────────────────────────────────────────── */

type SizeStyles = {
  height: string;
  paddingX: string;
  fontSize: string;
  gap: string;
  iconOnlySize: string;
};

const sizeMap: Record<ButtonSize, SizeStyles> = {
  sm: {
    height: 'h-9',
    paddingX: 'px-4',
    fontSize: 'text-sm',
    gap: 'gap-1.5',
    iconOnlySize: 'w-9',
  },
  md: {
    height: 'h-11',
    paddingX: 'px-5',
    fontSize: 'text-base',
    gap: 'gap-2',
    iconOnlySize: 'w-11',
  },
  lg: {
    height: 'h-[3.25rem]',
    paddingX: 'px-6',
    fontSize: 'text-lg',
    gap: 'gap-2.5',
    iconOnlySize: 'w-[3.25rem]',
  },
};

/* ───────────────────────────────────────────
 * Spinner
 * ─────────────────────────────────────────── */

const Spinner: React.FC<{ size: ButtonSize }> = ({ size }) => {
  const dimension = size === 'sm' ? '14' : size === 'lg' ? '20' : '16';
  return (
    <svg
      className="animate-spin"
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

/* ───────────────────────────────────────────
 * Button component
 * ─────────────────────────────────────────── */

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      iconLeft,
      iconRight,
      iconOnly = false,
      disabled,
      children,
      className = '',
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    const v = variantMap[variant];
    const s = sizeMap[size];

    const isDisabled = disabled || loading;

    const classes = [
      /* Base reset */
      'inline-flex items-center justify-center',
      'font-semibold no-underline',
      'border cursor-pointer select-none',
      'rounded-lg',
      /* Typography */
      s.fontSize,
      /* Sizing */
      s.height,
      iconOnly ? s.iconOnlySize : s.paddingX,
      /* Gap for icon+text */
      !iconOnly && s.gap,
      /* Transition */
      'transition-all duration-[var(--ease-default,200ms)] ease-[var(--ease-default,ease)]',
      /* Variant */
      v.base,
      /* Interactive states */
      v.hover,
      v.active,
      /* Focus ring — clean and elegant */
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-crema)]',
      v.focus,
      /* Disabled */
      v.disabled,
      /* Loading */
      loading && 'relative cursor-wait',
      /* Icon-only */
      iconOnly && '!px-0',
      /* Link variant reset */
      variant === 'link' && '!rounded-none !border-0 !ring-offset-0',
      /* Custom classes last for override */
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        className={classes}
        {...rest}
      >
        {/* Loading spinner replaces icons when loading */}
        {loading ? (
          <Spinner size={size} />
        ) : iconLeft ? (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {iconLeft}
          </span>
        ) : null}

        {/* Label — hidden when loading or iconOnly */}
        {loading ? null : iconOnly ? (
          <span className="sr-only">{children}</span>
        ) : (
          <span>{children}</span>
        )}

        {/* Icon right — hidden when loading */}
        {!loading && iconRight && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
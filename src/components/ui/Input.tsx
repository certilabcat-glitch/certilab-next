import {
  type InputHTMLAttributes,
  type ReactNode,
  forwardRef,
  useId,
  useState,
  useCallback,
} from 'react';

/* ───────────────────────────────────────────
 * Types
 * ─────────────────────────────────────────── */

type InputSize = 'sm' | 'md' | 'lg';

type InputType = 'text' | 'email' | 'password' | 'search' | 'number' | 'tel' | 'url';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** Visual size — same scale as Button Frozen v1 */
  size?: InputSize;
  /** HTML input type */
  type?: InputType;
  /** Visible label. When omitted, screen-reader-only fallback is generated from type. */
  label?: string;
  /** Visually hide the label (still accessible) */
  hideLabel?: boolean;
  /** Mark the field as required */
  required?: boolean;
  /** Mark the field as optional (shown when !required) */
  optional?: boolean;
  /** Show error visual state. Does NOT perform validation. */
  error?: boolean;
  /** Show success visual state. Does NOT perform validation. */
  success?: boolean;
  /** Show loading spinner */
  loading?: boolean;
  /** Leading icon (left side inside the input) */
  iconLeft?: ReactNode;
  /** Trailing icon (right side inside the input) */
  iconRight?: ReactNode;
  /** Show a clear button */
  clearable?: boolean;
  /** Called when the clear button is clicked */
  onClear?: () => void;
  /** Prefix text/element inside the input (before the value) */
  prefix?: ReactNode;
  /** Suffix text/element inside the input (after the value) */
  suffix?: ReactNode;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Validation message displayed below the input when error/success is active */
  validationMessage?: string;
  /**
   * Built-in password reveal toggle.
   * When `true` and `type="password"`, a show/hide icon is automatically rendered
   * on the trailing side and toggles the input type between `password` and `text`.
   * When a custom `iconRight` is provided, this prop is ignored.
   */
  revealPassword?: boolean;
}

/* ───────────────────────────────────────────
 * Size style maps — matching Button Frozen v1
 * ─────────────────────────────────────────── */

const heightMap: Record<InputSize, string> = {
  sm: 'h-9',
  md: 'h-11',
  lg: 'h-[3.25rem]',
};

const paddingXMap: Record<InputSize, string> = {
  sm: 'px-3.5',
  md: 'px-4',
  lg: 'px-5',
};

const fontSizeMap: Record<InputSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const iconSizeMap: Record<InputSize, { w: string; h: string }> = {
  sm: { w: 'w-4', h: 'h-4' },
  md: { w: 'w-4', h: 'h-4' },
  lg: { w: 'w-5', h: 'h-5' },
};

/* ───────────────────────────────────────────
 * Shared ring style — identical to Button Frozen v1
 * ─────────────────────────────────────────── */

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-crema,#F5EFE6)] focus-visible:ring-[var(--color-terra,#8B6F47)]';

/* ───────────────────────────────────────────
 * Icon components (inline, self-contained)
 * ─────────────────────────────────────────── */

function EyeIcon({ size }: { size: InputSize }) {
  const dim = size === 'lg' ? '20' : '16';
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon({ size }: { size: InputSize }) {
  const dim = size === 'lg' ? '20' : '16';
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

/* ───────────────────────────────────────────
 * Component
 * ─────────────────────────────────────────── */

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      type = 'text',
      label,
      hideLabel = false,
      required = false,
      optional = false,
      error = false,
      success = false,
      loading = false,
      iconLeft,
      iconRight,
      clearable,
      onClear,
      prefix,
      suffix,
      helperText,
      validationMessage,
      revealPassword = false,
      disabled = false,
      readOnly = false,
      className = '',
      id: externalId,
      'aria-describedby': externalDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = externalId ?? autoId;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const validationId = validationMessage ? `${inputId}-validation` : undefined;

    // Collect describedby IDs
    const describedByIds = [helperId, validationId, externalDescribedBy]
      .filter(Boolean)
      .join(' ');

    // Built-in password reveal state
    const [passwordRevealed, setPasswordRevealed] = useState(false);
    const isPasswordType = type === 'password';
    const resolvedType = isPasswordType && revealPassword && passwordRevealed ? 'text' : type;

    const handleRevealToggle = useCallback(() => {
      setPasswordRevealed((prev) => !prev);
    }, []);

    // Screen-reader-only label when label is hidden
    const labelClass = hideLabel
      ? 'sr-only'
      : 'block text-sm font-medium mb-2.5 text-[var(--color-dark,#333333)]';

    // Input wrapper styles
    const wrapperBorder =
      error
        ? 'ring-2 ring-[var(--color-terra,#8B6F47)]'
        : success
          ? 'ring-2 ring-[var(--color-verde,#4A7C59)]'
          : disabled
            ? 'border border-[var(--color-border,#E8E4DD)] opacity-50 cursor-not-allowed'
            : 'border border-[var(--color-border,#E8E4DD)]';

    const wrapperBg = disabled
      ? 'bg-[var(--color-crema,#F5EFE6)]'
      : 'bg-white';

    const wrapperClasses = [
      'flex items-center w-full rounded-lg',
      wrapperBorder,
      wrapperBg,
      heightMap[size],
      'transition-all duration-[var(--ease-default,200ms)]',
      !disabled && !readOnly && 'hover:border-[var(--color-terra-light,#C4A882)]',
      !disabled && !readOnly && focusRing,
      error && !disabled && 'focus-visible:ring-[var(--color-terra,#8B6F47)]',
      success && !disabled && 'focus-visible:ring-[var(--color-verde,#4A7C59)]',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Actual <input> styles
    const inputClasses = [
      'flex-1 bg-transparent outline-none border-none',
      fontSizeMap[size],
      'text-[var(--color-black,#0A0A0A)]',
      'placeholder:text-[var(--color-grey,#4A4A4A)] placeholder:opacity-70',
      disabled && 'cursor-not-allowed',
      readOnly && 'cursor-default',
      iconLeft && 'pl-0',
      iconRight && 'pr-0',
      prefix && 'pl-0',
      suffix && 'pr-0',
      paddingXMap[size],
      'h-full py-0',
      'min-w-0', // allow shrinking inside flex
    ]
      .filter(Boolean)
      .join(' ');

    /* ───────────────────────────────────────
     * Icons & adornments
     * ─────────────────────────────────────── */

    const iconColor = disabled
      ? 'text-[var(--color-grey,#4A4A4A)] opacity-50'
      : error
        ? 'text-[var(--color-terra,#8B6F47)]'
        : success
          ? 'text-[var(--color-verde,#4A7C59)]'
          : 'text-[var(--color-grey,#4A4A4A)]';

    const iconWrapper = (position: 'left' | 'right') =>
      `flex items-center justify-center ${iconColor} flex-shrink-0 ${
        position === 'left' ? 'pl-3 pr-0' : 'pl-0 pr-3'
      }`;

    const adornmentClasses = [
      'flex items-center justify-center',
      'text-[var(--color-grey,#4A4A4A)]',
      fontSizeMap[size],
      'px-2',
      'flex-shrink-0',
      'select-none',
    ].join(' ');

    /* ───────────────────────────────────────
     * Loading spinner
     * ─────────────────────────────────────── */

    const spinner = (
      <svg
        className={`animate-spin ${iconColor} ${iconSizeMap[size].w} ${iconSizeMap[size].h}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    );

    /* ───────────────────────────────────────
     * Clear button
     * ─────────────────────────────────────── */

    const clearButton = clearable && onClear && !disabled && !readOnly ? (
      <button
        type="button"
        onClick={onClear}
        tabIndex={-1}
        aria-label="Clear input"
        className="flex items-center justify-center flex-shrink-0 pr-3 text-[var(--color-grey,#4A4A4A)] hover:text-[var(--color-terra,#8B6F47)] transition-colors duration-[var(--ease-default,200ms)]"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    ) : null;

    /* ───────────────────────────────────────
     * Built-in password reveal button
     * ─────────────────────────────────────── */

    const passwordRevealButton =
      revealPassword && isPasswordType && !iconRight && !disabled && !readOnly ? (
        <button
          type="button"
          onClick={handleRevealToggle}
          tabIndex={-1}
          aria-label={passwordRevealed ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className={`flex items-center justify-center flex-shrink-0 pr-3 ${iconColor} hover:text-[var(--color-terra,#8B6F47)] transition-colors duration-[var(--ease-default,200ms)]`}
        >
          {passwordRevealed ? <EyeOffIcon size={size} /> : <EyeIcon size={size} />}
        </button>
      ) : null;

    /* ───────────────────────────────────────
     * Determine trailing element (priority: spinner > clear > reveal > iconRight)
     * ─────────────────────────────────────── */

    const renderTrailing = () => {
      if (loading) {
        return <span className={iconWrapper('right')}>{spinner}</span>;
      }
      if (clearButton) {
        return clearButton;
      }
      if (passwordRevealButton) {
        return passwordRevealButton;
      }
      if (iconRight) {
        return <span className={iconWrapper('right')}>{iconRight}</span>;
      }
      return null;
    };

    return (
      <div className="w-full">
        {/* ─── Label ─── */}
        {label && (
          <label htmlFor={inputId} className={labelClass}>
            {label}
            {required && (
              <span className="ml-0.5 text-[var(--color-terra,#8B6F47)]" aria-hidden="true">
                *
              </span>
            )}
            {optional && !required && (
              <span className="ml-1.5 text-xs text-[var(--color-grey,#4A4A4A)] font-normal">
                (opcional)
              </span>
            )}
          </label>
        )}

        {/* ─── Input wrapper ─── */}
        <div className={wrapperClasses}>
          {/* Leading icon */}
          {iconLeft && <span className={iconWrapper('left')}>{iconLeft}</span>}

          {/* Prefix */}
          {prefix && <span className={`${adornmentClasses} border-r border-[var(--color-border,#E8E4DD)] mr-2`}>{prefix}</span>}

          {/* The actual <input> */}
          <input
            ref={ref}
            id={inputId}
            type={resolvedType}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={error || undefined}
            aria-describedby={describedByIds || undefined}
            aria-required={required || undefined}
            aria-busy={loading || undefined}
            className={inputClasses}
            {...rest}
          />

          {/* Suffix */}
          {suffix && <span className={`${adornmentClasses} border-l border-[var(--color-border,#E8E4DD)] ml-2`}>{suffix}</span>}

          {/* Trailing element */}
          {renderTrailing()}
        </div>

        {/* ─── Helper text ─── */}
        {helperText && !error && !success && (
          <p
            id={helperId}
            className="mt-1.5 text-xs text-[var(--color-grey,#4A4A4A)]"
          >
            {helperText}
          </p>
        )}

        {/* ─── Validation message ─── */}
        {validationMessage && (error || success) && (
          <p
            id={validationId}
            role="alert"
            className={`mt-1.5 text-xs ${
              error
                ? 'text-[var(--color-terra,#8B6F47)]'
                : 'text-[var(--color-verde,#4A7C59)]'
            }`}
          >
            {validationMessage}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

/* ───────────────────────────────────────────
 * Types
 * ─────────────────────────────────────────── */

export type ToastVariant = 'default' | 'success' | 'error' | 'warning';

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

type ToastContextType = {
  toasts: Toast[];
  addToast: (message: string, variant?: ToastVariant) => void;
  removeToast: (id: string) => void;
};

/* ───────────────────────────────────────────
 * Context
 * ─────────────────────────────────────────── */

const ToastContext = createContext<ToastContextType | null>(null);

/* ───────────────────────────────────────────
 * Provider
 * ─────────────────────────────────────────── */

export interface ToastProviderProps {
  children: ReactNode;
}

let toastCounter = 0;

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, variant: ToastVariant = 'default') => {
    const id = `toast-${++toastCounter}`;
    setToasts((prev) => [...prev, { id, message, variant }]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
ToastProvider.displayName = 'ToastProvider';

/* ───────────────────────────────────────────
 * Hook
 * ─────────────────────────────────────────── */

export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

/* ───────────────────────────────────────────
 * Toast Item (internal)
 * ─────────────────────────────────────────── */

const variantStyles: Record<ToastVariant, string> = {
  default: 'bg-gray-800 text-white',
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  warning: 'bg-amber-500 text-white',
};

const ToastItem: React.FC<{ toast: Toast; onClose: (id: string) => void }> = ({
  toast,
  onClose,
}) => (
  <div
    className={`flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg text-sm animate-in slide-in-from-right ${variantStyles[toast.variant]}`}
    role="alert"
  >
    <span className="flex-1">{toast.message}</span>
    <button
      type="button"
      onClick={() => onClose(toast.id)}
      className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
      aria-label="Cerrar notificación"
    >
      ✕
    </button>
  </div>
);
ToastItem.displayName = 'ToastItem';
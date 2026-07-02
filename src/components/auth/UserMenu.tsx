"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { logout } from "@/lib/actions/auth";

/**
 * UserMenu — shows user avatar/email on the platform navbar.
 *
 * When authenticated: displays user email + logout button.
 * When not authenticated: shows login link.
 * Supports basic navigation items for authenticated users.
 */
export default function UserMenu() {
  const { user, loading } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
    );
  }

  if (!user) {
    return (
      <Link
        href="/saas/login/"
        className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
      >
        Iniciar sesión
      </Link>
    );
  }

  const initials = user.email?.charAt(0).toUpperCase() ?? "?";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 transition-colors"
        aria-label="Menú de usuario"
        aria-expanded={open}
      >
        <div className="h-8 w-8 rounded-full bg-terra-600 text-white flex items-center justify-center text-sm font-semibold">
          {initials}
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.email}
            </p>
          </div>

          <div className="py-1">
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/mis-expedientes"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              Mis expedientes
            </Link>
            <Link
              href="/configuracion"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              Configuración
            </Link>
          </div>

          <div className="border-t border-gray-100">
            <form action={logout}>
              <button
                type="submit"
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
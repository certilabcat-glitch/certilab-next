"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";
import { waDiagnostico } from "@/lib/wa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRefs = useRef<Map<string, HTMLElement>>(new Map());
  const menuRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Cerrar menú al cambiar de ruta (sincronización de UI, no de datos)
  const prevPathname = useRef(pathname);
  useLayoutEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      setMenuOpen(false);
      setOpenDropdown(null);
    }
  }, [pathname]);

  // Detectar scroll para sombra
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (openDropdown) {
        const el = dropdownRefs.current.get(openDropdown);
        if (el && !el.contains(e.target as Node)) {
          setOpenDropdown(null);
        }
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openDropdown]);

  // Cerrar menú al hacer clic fuera en móvil
  useEffect(() => {
    if (!menuOpen) return;
    function handleOutsideClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [menuOpen]);

  // Bloquear scroll body cuando el menú está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Cerrar dropdown con Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (openDropdown) setOpenDropdown(null);
        if (menuOpen) setMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openDropdown, menuOpen]);

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`header ${scrolled ? "header-scrolled" : ""}`}
      role="banner"
    >
      <nav className="nav" role="navigation" aria-label="Navegación principal">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" aria-label="Certilab — inicio">
            <span className="nav-logo-title">Certilab</span>
            <span className="nav-logo-sub">Despacho de Auditoría Energética</span>
          </Link>

          <button
            ref={toggleRef}
            className={`nav-toggle ${menuOpen ? "is-active" : ""}`}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul
            ref={menuRef}
            className={`nav-menu ${menuOpen ? "is-open" : ""}`}
            id="nav-menu"
            role="navigation"
          >
            {navigation.map((item) => {
              const hasChildren = !!item.children;
              const isLinkActive = isActive(item.href);

              if (hasChildren) {
                return (
                  <li
                    key={item.label}
                    className={`nav-dropdown ${openDropdown === item.label ? "open" : ""}`}
                    ref={(el) => {
                      if (el) dropdownRefs.current.set(item.label, el);
                    }}
                  >
                    <button
                      className="nav-dropdown-toggle"
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <svg
                        className="dropdown-arrow"
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <ul className="nav-dropdown-menu" role="menu">
                      {item.children?.map((child) => (
                        <li key={child.label} role="none">
                          <Link
                            href={child.href || "#"}
                            role="menuitem"
                            onClick={() => {
                              setMenuOpen(false);
                              setOpenDropdown(null);
                            }}
                            className={
                              isActive(child.href) ? "active-child" : ""
                            }
                            aria-current={
                              isActive(child.href) ? "page" : undefined
                            }
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              return (
                <li
                  key={item.label}
                  className={isLinkActive ? "active" : ""}
                  role="none"
                >
                  <Link
                    href={item.href || "#"}
                    role="menuitem"
                    aria-current={isLinkActive ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="nav-ctas" role="none">
              <a
                href={waDiagnostico()}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta"
              >
                Diagnóstico Gratis
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <style jsx>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          transition: box-shadow 0.3s ease;
        }

        .header-scrolled {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06),
            0 1px 2px rgba(0, 0, 0, 0.04);
        }

        .nav {
          background: var(--color-crema);
          border-bottom: 1px solid var(--color-border);
        }

        .nav-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 64px;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .nav-logo {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav-logo-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 300;
          color: var(--color-terra);
        }
        .nav-logo-sub {
          font-family: var(--font-sans);
          font-size: 0.6rem;
          letter-spacing: 0.05em;
          color: var(--color-grey);
          text-transform: none;
          font-weight: 400;
        }

        /* ===== Hamburger ===== */
        .nav-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          z-index: 101;
          -webkit-tap-highlight-color: transparent;
        }

        .nav-toggle span {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--color-black);
          border-radius: 2px;
          transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55),
            opacity 0.2s ease;
          transform-origin: center;
        }

        .nav-toggle.is-active span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .nav-toggle.is-active span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }

        .nav-toggle.is-active span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* ===== Desktop Menu ===== */
        .nav-menu {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-menu li a,
        .nav-menu li button {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 400;
          color: var(--color-black);
          text-decoration: none;
          transition: color 0.2s ease;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          position: relative;
        }

        .nav-menu li a::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: var(--color-terra);
          transition: width 0.25s ease;
        }

        .nav-menu li a:hover::after,
        .nav-menu li a:focus-visible::after {
          width: 100%;
        }

        .nav-menu li a:hover,
        .nav-menu li button:hover {
          color: var(--color-terra);
        }

        .nav-menu li a:focus-visible,
        .nav-menu li button:focus-visible {
          outline: 2px solid var(--color-terra-light);
          outline-offset: 4px;
          border-radius: 2px;
        }

        .nav-menu .active > a,
        .nav-menu a[aria-current="page"] {
          color: var(--color-terra);
          font-weight: 600;
        }

        .nav-menu .active > a::after,
        .nav-menu a[aria-current="page"]::after {
          width: 100%;
        }

        /* ===== CTAs ===== */
        .nav-ctas {
          display: flex;
          gap: 0.75rem;
          margin-left: 0.5rem;
        }

        .nav-cta {
          padding: 8px 18px;
          background: var(--color-black);
          color: var(--color-crema) !important;
          border: 2px solid var(--color-black);
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          transition: background 0.2s ease, border-color 0.2s ease,
            opacity 0.2s ease;
          white-space: nowrap;
        }

        .nav-cta:hover {
          background: var(--color-terra);
          border-color: var(--color-terra);
          color: var(--color-crema) !important;
        }

        .nav-cta-secondary {
          padding: 8px 18px;
          background: transparent;
          color: var(--color-black) !important;
          border: 2px solid var(--color-black);
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          text-decoration: none !important;
          transition: background 0.2s ease, color 0.2s ease;
          white-space: nowrap;
        }

        .nav-cta-secondary:hover {
          background: var(--color-black);
          color: var(--color-crema) !important;
        }

        /* ===== Dropdown ===== */
        .nav-dropdown {
          position: relative;
        }

        .nav-dropdown-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dropdown-arrow {
          transition: transform 0.25s ease;
        }

        .nav-dropdown.open .dropdown-arrow {
          transform: rotate(180deg);
        }

        .nav-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) translateY(-4px);
          background: #fff;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          min-width: 260px;
          padding: 0.5rem;
          list-style: none;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
        }

        .nav-dropdown.open .nav-dropdown-menu {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }

        .nav-dropdown-menu li a {
          display: block;
          padding: 0.6rem 1rem;
          font-size: 0.85rem;
          font-weight: 400;
          color: var(--color-black);
          text-decoration: none;
          transition: background 0.15s ease, color 0.15s ease;
          border-radius: 6px;
          white-space: nowrap;
        }

        .nav-dropdown-menu li a:hover {
          background: rgba(139, 111, 71, 0.08);
          color: var(--color-terra);
        }

        .nav-dropdown-menu li a.active-child {
          color: var(--color-terra);
          font-weight: 600;
          background: rgba(139, 111, 71, 0.06);
        }

        /* ===== Mobile ===== */
        @media (max-width: 767px) {
          .nav-toggle {
            display: flex;
          }

          .nav-menu {
            display: flex;
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--color-crema);
            flex-direction: column;
            align-items: stretch;
            padding: 1.5rem;
            gap: 0;
            overflow-y: auto;
            overscroll-behavior: contain;
            opacity: 0;
            pointer-events: none;
            transform: translateY(-8px);
            transition: opacity 0.3s ease, transform 0.3s ease;
            z-index: 99;
          }

          .nav-menu.is-open {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
          }

          .nav-menu li {
            border-bottom: 1px solid var(--color-border);
          }

          .nav-menu li:last-child {
            border-bottom: none;
          }

          .nav-menu li a,
          .nav-menu li button {
            display: block;
            padding: 1rem 0;
            font-size: 1rem;
            font-weight: 500;
          }

          .nav-menu li a::after {
            display: none;
          }

          /* Dropdown en móvil */
          .nav-dropdown-menu {
            position: static;
            transform: none;
            box-shadow: none;
            border: none;
            border-radius: 0;
            padding: 0 0 0.5rem 0.75rem;
            min-width: auto;
            background: transparent;
            opacity: 0;
            max-height: 0;
            overflow: hidden;
            pointer-events: none;
            transition: opacity 0.25s ease, max-height 0.35s ease;
          }

          .nav-dropdown.open .nav-dropdown-menu {
            opacity: 1;
            max-height: 500px;
            pointer-events: auto;
            transform: none;
          }

          .nav-dropdown-menu li a {
            padding: 0.6rem 0;
            font-size: 0.9rem;
            font-weight: 400;
          }

          .nav-dropdown-menu li a:hover {
            background: transparent;
          }

          .nav-dropdown-toggle {
            padding: 1rem 0;
            width: 100%;
            justify-content: space-between;
          }

          /* CTAs en móvil */
          .nav-ctas {
            flex-direction: column;
            gap: 0.75rem;
            margin-left: 0;
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--color-border);
          }

          .nav-cta,
          .nav-cta-secondary {
            text-align: center;
            padding: 0.9rem 1.5rem;
            font-size: 0.9rem;
            width: 100%;
          }
        }

        /* ===== Desktop <1100px (overflow prevention) ===== */
        @media (min-width: 768px) and (max-width: 1024px) {
          .nav-menu {
            gap: 0.75rem;
          }
          .nav-cta,
          .nav-cta-secondary {
            padding: 6px 12px;
            font-size: 0.72rem;
          }
        }
      `}</style>
    </header>
  );
}
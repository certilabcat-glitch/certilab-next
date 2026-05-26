"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";
import { waDiagnostico } from "@/lib/wa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Close dropdown when clicking outside
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

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <nav className="nav" role="navigation" aria-label="Navegación principal">
      <div className="nav-inner">
        <Link href="/" className="nav-logo" aria-label="Certilab — inicio">
          <span>Certilab</span>
        </Link>

        <button
          className="nav-toggle"
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
          className={`nav-menu ${menuOpen ? "is-open" : ""}`}
          id="nav-menu"
          role="list"
          aria-label="Navegación principal"
        >
          {navigation.map((item) => (
            <li
              key={item.label}
              className={
                item.children
                  ? `nav-dropdown ${openDropdown === item.label ? "open" : ""}`
                  : isActive(item.href)
                  ? "active"
                  : ""
              }
              ref={(el) => {
                if (item.children && el) {
                  dropdownRefs.current.set(item.label, el as unknown as HTMLDivElement);
                }
              }}
            >
              {item.children ? (
                <>
                  <button
                    className="nav-dropdown-toggle"
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      );
                    }}
                  >
                    {item.label} <span className="arrow"></span>
                  </button>
                  <ul className="nav-dropdown-menu">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href || "#"}
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  href={item.href || "#"}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <a
              href={waDiagnostico()}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
            >
              Diagnóstico Gratis
            </a>
          </li>
          <li>
            <Link href="/por-que-no-emite-ce/" className="nav-cta-secondary">
              Por qué no emitimos CE
            </Link>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .nav {
          background: var(--color-crema);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          z-index: 100;
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
        }
        .nav-logo span {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 300;
          color: var(--color-terra-light);
        }
        .nav-toggle {
          display: none;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .nav-toggle span {
          display: block;
          width: 22px;
          height: 1px;
          background: var(--color-black);
          transition: transform 0.2s, opacity 0.2s;
        }
        .nav-toggle[aria-expanded="true"] span:nth-child(1) {
          transform: rotate(45deg) translate(3px, 3px);
        }
        .nav-toggle[aria-expanded="true"] span:nth-child(2) {
          opacity: 0;
        }
        .nav-toggle[aria-expanded="true"] span:nth-child(3) {
          transform: rotate(-45deg) translate(3px, -3px);
        }
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
          transition: opacity 0.2s;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .nav-menu li a:hover,
        .nav-menu li button:hover {
          opacity: 0.6;
        }
        .nav-menu .active > a,
        .nav-menu a[aria-current="page"] {
          color: var(--color-terra);
          font-weight: 600;
        }
        .nav-menu .nav-cta {
          padding: 8px 18px;
          background: var(--color-black);
          color: var(--color-crema) !important;
          border: 2px solid var(--color-black);
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          transition: opacity 0.2s, background 0.2s, color 0.2s;
        }
        .nav-menu .nav-cta:hover {
          opacity: 0.85;
          background: var(--color-terra);
          border-color: var(--color-terra);
        }
        .nav-menu .nav-cta-secondary {
          padding: 8px 18px;
          background: transparent;
          color: var(--color-black) !important;
          border: 2px solid var(--color-black);
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          text-decoration: none !important;
          transition: opacity 0.2s, background 0.2s, color 0.2s;
        }
        .nav-menu .nav-cta-secondary:hover {
          opacity: 0.85;
          background: var(--color-black);
          color: var(--color-crema) !important;
        }

        /* Dropdown */
        .nav-dropdown {
          position: relative;
        }
        .nav-dropdown-toggle {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nav-dropdown-toggle .arrow {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-right: 1.5px solid var(--color-black);
          border-bottom: 1.5px solid var(--color-black);
          transform: rotate(45deg);
          margin-top: -2px;
          transition: transform 0.2s;
        }
        .nav-dropdown.open .nav-dropdown-toggle .arrow {
          transform: rotate(-135deg);
          margin-top: 2px;
        }
        .nav-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: var(--color-crema);
          border: 1px solid var(--color-border);
          min-width: 260px;
          padding: 0.5rem 0;
          list-style: none;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
        }
        .nav-dropdown.open .nav-dropdown-menu {
          opacity: 1;
          pointer-events: auto;
        }
        .nav-dropdown-menu li a {
          display: block;
          padding: 0.6rem 1.25rem;
          font-size: 0.85rem;
          font-weight: 400;
          color: var(--color-black);
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .nav-dropdown-menu li a:hover {
          background: rgba(139, 111, 71, 0.08);
          color: var(--color-terra);
        }

        /* Mobile */
        @media (max-width: 767px) {
          .nav-toggle {
            display: flex;
          }
          .nav-menu {
            display: none;
            position: absolute;
            top: 64px;
            left: 0;
            right: 0;
            background: var(--color-crema);
            flex-direction: column;
            padding: 1.5rem;
            gap: 1rem;
            border-bottom: 1px solid var(--color-border);
          }
          .nav-menu.is-open {
            display: flex;
          }
          .nav-dropdown-menu {
            position: static;
            transform: none;
            box-shadow: none;
            border: none;
            padding-left: 1rem;
            min-width: auto;
            background: transparent;
          }
          .nav-dropdown-menu li a {
            padding: 0.4rem 0;
          }
        }
      `}</style>
    </nav>
  );
}

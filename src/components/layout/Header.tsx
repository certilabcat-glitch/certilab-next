"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";
import { waDiagnostico } from "@/lib/wa";
import styles from "./Header.module.css";

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
      className={`${styles.header} ${scrolled ? styles["header-scrolled"] : ""}`}
      role="banner"
    >
      <nav className={styles.nav} role="navigation" aria-label="Navegación principal">
        <div className={styles["nav-inner"]}>
          <Link href="/" className={styles["nav-logo"]} aria-label="Certilab — inicio">
            <span className={styles["nav-logo-title"]}>Certilab</span>
            <span className={styles["nav-logo-sub"]}>Despacho de Auditoría Energética</span>
          </Link>

          <button
            ref={toggleRef}
            className={`${styles["nav-toggle"]} ${menuOpen ? styles["is-active"] : ""}`}
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
            className={`${styles["nav-menu"]} ${menuOpen ? styles["is-open"] : ""}`}
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
                    className={`${styles["nav-dropdown"]} ${openDropdown === item.label ? styles.open : ""}`}
                    ref={(el) => {
                      if (el) dropdownRefs.current.set(item.label, el);
                    }}
                  >
                    <button
                      className={styles["nav-dropdown-toggle"]}
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
                        className={styles["dropdown-arrow"]}
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
                    <ul className={styles["nav-dropdown-menu"]} role="menu">
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
                              isActive(child.href) ? styles["active-child"] : ""
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
                  className={isLinkActive ? styles.active : ""}
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
            <li className={styles["nav-ctas"]} role="none">
              <a
                href={waDiagnostico()}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["nav-cta"]}
              >
                Diagnóstico Gratis
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
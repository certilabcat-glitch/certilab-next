"use client";

import { useState } from "react";

interface BDHelpProps {
  /** Texto opcional que precede al tooltip. Si no se pasa, solo muestra "Brown Discount ?" */
  prefix?: string;
  className?: string;
}

export default function BDHelp({ prefix, className = "" }: BDHelpProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className={`bd-help-wrapper ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
      style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 0, cursor: "pointer" }}
    >
      {prefix && <>{prefix} </>}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.15em",
          whiteSpace: "nowrap",
        }}
      >
        <span>Brown Discount</span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "1.1em",
            height: "1.1em",
            borderRadius: "50%",
            background: "var(--color-terra)",
            color: "#fff",
            fontSize: "0.7em",
            fontWeight: 600,
            lineHeight: 1,
            marginLeft: "0.25em",
            flexShrink: 0,
          }}
          aria-label="Más información sobre Brown Discount"
        >
          ?
        </span>
      </span>
      {open && (
        <span
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#222",
            color: "#fff",
            fontSize: "0.8rem",
            lineHeight: 1.5,
            padding: "0.65rem 0.9rem",
            borderRadius: 6,
            maxWidth: 280,
            width: "max-content",
            whiteSpace: "normal",
            textAlign: "left",
            zIndex: 50,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          Descuento en el valor de tu vivienda por tener una calificación energética baja (letra E, F o G). Puede restar hasta un 15% del precio de mercado.
          <span
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              border: "6px solid transparent",
              borderTopColor: "#222",
            }}
          />
        </span>
      )}
    </span>
  );
}
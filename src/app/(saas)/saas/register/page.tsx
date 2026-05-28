"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Implementar registro con Supabase
    console.log("Register attempt", { nombre, email });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Crear cuenta gratuita</h1>
        <p className="auth-sub">
          Empieza tu prueba de 7 días sin compromiso
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: María García"
            />
          </div>
          <div className="auth-group">
            <label htmlFor="email">Email profesional</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="maria@tuagencia.com"
            />
          </div>
          <div className="auth-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
            />
          </div>
          <button type="submit" className="auth-btn">
            Crear cuenta gratuita
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta?{" "}
          <Link href="/saas/login/">Inicia sesión</Link>
        </p>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: var(--color-crema);
        }
        .auth-card {
          max-width: 400px;
          width: 100%;
          border: 1px solid var(--color-border);
          padding: 2.5rem;
          background: white;
        }
        .auth-card h1 {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          font-weight: 300;
          color: var(--color-black);
          margin-bottom: 0.5rem;
        }
        .auth-sub {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          margin-bottom: 2rem;
        }
        .auth-group {
          margin-bottom: 1.25rem;
        }
        .auth-group label {
          display: block;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--color-dark);
          margin-bottom: 0.4rem;
        }
        .auth-group input {
          width: 100%;
          padding: 0.7rem 1rem;
          border: 1px solid var(--color-border);
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-black);
        }
        .auth-group input:focus {
          outline: none;
          border-color: var(--color-terra);
        }
        .auth-btn {
          width: 100%;
          background: var(--color-black);
          color: var(--color-crema);
          padding: 0.85rem;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .auth-btn:hover {
          opacity: 0.85;
        }
        .auth-footer {
          margin-top: 1.5rem;
          text-align: center;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-grey);
        }
        .auth-footer a {
          color: var(--color-terra);
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

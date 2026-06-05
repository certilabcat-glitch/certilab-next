"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import styles from "../auth.module.css";

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
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <h1>Crear cuenta gratuita</h1>
        <p className={styles.authSub}>
          Empieza tu prueba de 7 días sin compromiso
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.authGroup}>
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
          <div className={styles.authGroup}>
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
          <div className={styles.authGroup}>
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
          <button type="submit" className={styles.authBtn}>
            Crear cuenta gratuita
          </button>
        </form>

        <p className={styles.authFooter}>
          ¿Ya tienes cuenta?{" "}
          <Link href="/saas/login/">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

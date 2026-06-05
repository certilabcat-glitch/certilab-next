"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import styles from "../auth.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Implementar autenticación con Supabase
    console.log("Login attempt", { email });
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <h1>Iniciar sesión</h1>
        <p className={styles.authSub}>Accede a tu panel de Certilab SaaS</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.authGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
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
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className={styles.authBtn}>
            Acceder
          </button>
        </form>

        <p className={styles.authFooter}>
          ¿No tienes cuenta?{" "}
          <Link href="/saas/register/">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

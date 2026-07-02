"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { loginWithMagicLink } from "@/lib/actions/auth";
import styles from "../auth.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string; success?: boolean } | null, formData: FormData) => {
      const result = await loginWithMagicLink(formData);
      if (result?.success) {
        setSubmitted(true);
      }
      return result;
    },
    null,
  );

  if (submitted) {
    return (
      <div className={styles.authPage}>
        <div className={styles.authCard}>
          <h1>Revisa tu email</h1>
          <p className={styles.authSub}>
            Te hemos enviado un enlace mágico a <strong>{email}</strong>.
            Haz clic en el enlace para acceder a tu panel.
          </p>
          <button
            className={styles.authBtn}
            onClick={() => {
              setSubmitted(false);
              setEmail("");
            }}
          >
            Enviar otro enlace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <h1>Iniciar sesión</h1>
        <p className={styles.authSub}>
          Accede a tu panel con un enlace mágico (sin contraseña)
        </p>

        <form action={formAction}>
          <div className={styles.authGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              autoComplete="email"
            />
          </div>

          {state?.error && (
            <p
              className={styles.authError}
              role="alert"
            >
              {state.error}
            </p>
          )}

          <button
            type="submit"
            className={styles.authBtn}
            disabled={pending}
          >
            {pending ? "Enviando..." : "Enviar enlace mágico"}
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
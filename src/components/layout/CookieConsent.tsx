'use client';

import { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const hasConsent = localStorage.getItem('cookie-consent');
      if (!hasConsent) {
        setIsVisible(true);
      }
    } catch {
      // localStorage no disponible (entorno de pruebas/SSR/privacidad estricta)
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('cookie-consent', 'accepted');
    } catch {
      // localStorage no disponible
    }
    setIsVisible(false);
  };

  const handleReject = () => {
    try {
      localStorage.setItem('cookie-consent', 'rejected');
    } catch {
      // localStorage no disponible
    }
    setIsVisible(false);
  };

  // No renderizar nada hasta que la hidratación esté completa
  if (!mounted) return null;
  if (!isVisible) return null;

  return (
    <div className={styles.cookieConsent} suppressHydrationWarning>
      <div className={styles.cookieContent}>
        <div className={styles.cookieText}>
          <h3 className={styles.cookieTitle}>Consentimiento de cookies</h3>
          <p className={styles.cookieDescription}>
            Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. 
            Al continuar navegando, aceptas nuestro uso de cookies.{' '}
            <a href="/privacidad" className={styles.cookieLink}>
              Leer política de privacidad
            </a>
          </p>
        </div>
        <div className={styles.cookieActions}>
          <button 
            className={styles.cookieReject}
            onClick={handleReject}
            aria-label="Rechazar cookies"
          >
            Rechazar
          </button>
          <button 
            className={styles.cookieAccept}
            onClick={handleAccept}
            aria-label="Aceptar cookies"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

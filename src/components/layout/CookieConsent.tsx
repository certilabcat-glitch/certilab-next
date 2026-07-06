'use client';

import { useState } from 'react';
import styles from './CookieConsent.module.css';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    const hasConsent = localStorage.getItem('cookie-consent');
    return !hasConsent;
  });

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  // SSR: no renderizar nada para evitar mismatch de hidratación
  if (typeof window === 'undefined') return null;
  if (!isVisible) return null;

  return (
    <div className={styles.cookieConsent}>
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

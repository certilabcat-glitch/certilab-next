'use client';

import { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

export default function CookieConsent() {
  // 1. TODOS LOS ESTADOS PRIMERO
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(() => {
    // Inicializar estado desde localStorage
    if (typeof window === 'undefined') return false;
    const hasConsent = localStorage.getItem('cookie-consent');
    return !hasConsent;
  });

  // 2. TODOS LOS EFECTOS DESPUÉS
  useEffect(() => { 
    setMounted(true); 
  }, []);

  useEffect(() => {
    // Solo para sincronización con cambios externos
  }, []);

  // 3. FUNCIONES MANEJADORAS
  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  // 4. RETORNOS ANTICIPADOS (Siempre después de los Hooks)
  if (!mounted) return null;
  if (!isVisible) return null;

  // 5. RENDERIZADO VISUAL
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
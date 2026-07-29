'use client';

import { useState, useEffect } from 'react';
import styles from './StickyCTA.module.css';

export default function StickyCTA() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isCookieAccepted, setIsCookieAccepted] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Leer consentimiento de cookies solo en cliente, después de hidratación
    const cookieConsent = localStorage.getItem('cookie-consent');
    setIsCookieAccepted(cookieConsent === 'accepted');
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Mostrar CTA sticky solo en móvil y después de scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Mostrar después de 500px de scroll
      setIsVisible(scrollPosition > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  if (!mounted) return null;
  if (!isVisible || !isCookieAccepted) return null;

  return (
    <div className={styles.stickyCTA}>
      <a 
        href="/segunda-opinion"
        className={styles.ctaButton}
        aria-label="Solicitar segunda opinión"
      >
        Solicitar Segunda Opinión
      </a>
      <p className={styles.ctaPrice}>desde 59€</p>
    </div>
  );
}

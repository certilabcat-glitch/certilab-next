'use client';

import { useState, useEffect } from 'react';
import styles from './StickyCTA.module.css';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCookieAccepted, setIsCookieAccepted] = useState(() => {
    if (typeof window === 'undefined') return true;
    const cookieConsent = localStorage.getItem('cookie-consent');
    return cookieConsent === 'accepted';
  });

  useEffect(() => {
    // Mostrar CTA sticky solo en móvil y después de scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Mostrar después de 500px de scroll
      setIsVisible(scrollPosition > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

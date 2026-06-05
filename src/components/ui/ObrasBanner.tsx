"use client";

import styles from "./ObrasBanner.module.css";

export default function ObrasBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.triangle}>
        <span className={styles.icon}>!</span>
      </div>
      <div className={styles.text}>
        <span className={styles.label}>EN OBRAS</span>
        <span className={styles.desc}>Página en construcción — Próximamente disponible</span>
      </div>
    </div>
  );
}

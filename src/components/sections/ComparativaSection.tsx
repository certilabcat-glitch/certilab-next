"use client";

import styles from "./ComparativaSection.module.css";

interface Col {
  label: string;
  items: string[];
  destacado?: boolean;
}

export default function ComparativaSection({ cols, title, subtitle }: { cols: [Col, Col]; title: string; subtitle: string }) {
  return (
    <section className={styles.section} aria-labelledby="comp-title">
      <h2 className={styles.sectionTitle} id="comp-title">{title}</h2>
      <p className={styles.sectionSub}>{subtitle}</p>
      <div className={styles.compGrid}>
        {cols.map((col, i) => (
          <div key={i} className={`${styles.compCard} ${col.destacado ? styles.compCardDestacado : ""}`}>
            <p className={`${styles.compLabel} ${col.destacado ? styles.labelDest : ""}`}>{col.label}</p>
            <ul>
              {col.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
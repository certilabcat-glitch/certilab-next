"use client";

import styles from "./IncludesBox.module.css";

interface IncludesBoxProps {
  title?: string;
  items: string[];
}

export default function IncludesBox({
  title = "Incluye",
  items,
}: IncludesBoxProps) {
  return (
    <div className={styles.box}>
      <h3>{title}</h3>
      <ul className={styles.list}>
        {items.map((item, i) => (
          <li key={i}>
            <span className={styles.check}>✓</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

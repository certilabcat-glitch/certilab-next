"use client";

import styles from "./StepsGrid.module.css";

interface Step {
  title: string;
  text: string;
}

interface StepsGridProps {
  steps: Step[];
  className?: string;
}

export default function StepsGrid({ steps, className = "" }: StepsGridProps) {
  return (
    <section className={`${styles.wrapper} ${className}`}>
      <div className={styles.grid}>
        {steps.map((step, i) => (
          <div key={i} className={styles.step}>
            <div className={styles.stepNum}>{i + 1}</div>
            <h4 className={styles.stepTitle}>{step.title}</h4>
            <p className={styles.stepText}>{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

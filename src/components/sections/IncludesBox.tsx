import styles from "./IncludesBox.module.css";

export default function IncludesBox({ items, title = "Incluye" }: { items: string[]; title?: string }) {
  return (
    <section className={styles.section} aria-labelledby="includes-title">
      <h2 className={styles.title} id="includes-title">{title}</h2>
      <ul className={styles.list}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

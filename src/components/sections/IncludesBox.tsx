export default function IncludesBox({ items, title = "Incluye" }: { items: string[]; title?: string }) {
  return (
    <section className="includes-section" aria-labelledby="includes-title">
      <h2 className="includes-title" id="includes-title">{title}</h2>
      <ul className="includes-list">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <style jsx>{`
        .includes-section {
          padding: 3rem 1.5rem 5rem;
          max-width: 700px;
          margin: 0 auto;
        }
        .includes-title {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 400;
          color: var(--color-black);
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .includes-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .includes-list li {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-dark);
          padding: 0.6rem 1rem;
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .includes-list li::before {
          content: "→";
          color: var(--color-terra);
          flex-shrink: 0;
        }
        @media (max-width: 600px) {
          .includes-list { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

interface Col {
  label: string;
  items: string[];
  destacado?: boolean;
}

export default function ComparativaSection({ cols, title, subtitle }: { cols: [Col, Col]; title: string; subtitle: string }) {
  return (
    <section className="section" aria-labelledby="comp-title">
      <h2 className="section-title" id="comp-title">{title}</h2>
      <p className="section-sub">{subtitle}</p>
      <div className="comp-grid">
        {cols.map((col, i) => (
          <div key={i} className={`comp-card ${col.destacado ? "destacado" : ""}`}>
            <p className={`comp-label ${col.destacado ? "label-dest" : ""}`}>{col.label}</p>
            <ul>
              {col.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <style jsx>{`
        .section {
          padding: 5rem 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .section-title {
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 400;
          color: var(--color-black);
          text-align: center;
          margin-bottom: 0.75rem;
        }
        .section-sub {
          text-align: center;
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--color-grey);
          max-width: 500px;
          margin: 0 auto 3rem;
          line-height: 1.7;
        }
        .comp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .comp-card {
          padding: 2rem;
          border: 1px solid var(--color-border);
        }
        .comp-card.destacado {
          border: 2px solid var(--color-black);
        }
        .comp-label {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-grey);
          margin-bottom: 1.5rem;
        }
        .label-dest {
          color: var(--color-terra);
          font-weight: 600;
        }
        .comp-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .comp-card li {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-grey);
          line-height: 1.6;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--color-border);
        }
        .comp-card li:last-child { border-bottom: none; }
        @media (max-width: 700px) {
          .section { padding: 3rem 1.5rem; }
          .comp-grid { grid-template-columns: 1fr; gap: 1rem; }
          .comp-card { padding: 1.5rem; }
          .comp-card.destacado { border-width: 2px; }
          .comp-label { margin-bottom: 1rem; }
          .comp-card li { font-size: 0.85rem; padding: 0.4rem 0; }
        }
      `}</style>
    </section>
  );
}

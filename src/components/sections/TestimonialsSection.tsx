"use client";
import styles from "./TestimonialsSection.module.css";

interface Testimonial {
  text: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Tenía un certificado con calificación B. La segunda opinión detectó que era una D inflada. El vendedor tuvo que bajarlo y negocié un descuento de 8.000€.",
    author: "Marc B.",
    role: "Comprador, Barcelona",
  },
  {
    text: "Rápido, profesional y muy claro. En 24h tenía el informe con los errores del certificado. Recomendable 100% antes de firmar nada.",
    author: "Anna S.",
    role: "Propietaria, Girona",
  },
  {
    text: "Me explicaron el Brown Discount de una forma que entendí. Por 39€ evitamos pagar de más en la hipoteca. Increíble.",
    author: "Javier L.",
    role: "Comprador, Tarragona",
  },
];

export default function TestimonialsSection() {
  return (
    <section className={styles.testimonialsSection} aria-label="Testimonios de clientes">
      <h2 className={styles.sectionTitle}>Lo que dicen nuestros clientes</h2>
      <p className={styles.sectionSub}>Personas como tú ya han confiado en nuestra revisión antes de tomar decisiones.</p>
      <div className={styles.testimonialsGrid}>
        {testimonials.map((t, i) => (
          <blockquote key={i} className={styles.testimonialCard}>
            <svg className={styles.quoteIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M10 11H6C5.44772 11 5 10.5523 5 10V7C5 6.44772 5.44772 6 6 6H9C9.55228 6 10 6.44772 10 7V11ZM10 11C10 13.5 8 16 6 17M14 11H18C18.5523 11 19 10.5523 19 10V7C19 6.44772 18.5523 6 18 6H15C14.4477 6 14 6.44772 14 7V11ZM14 11C14 13.5 16 16 18 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p className={styles.testimonialText}>{t.text}</p>
            <footer className={styles.testimonialFooter}>
              <div className={styles.testimonialAvatar}>{t.author.charAt(0)}</div>
              <div>
                <cite className={styles.testimonialAuthor}>{t.author}</cite>
                <span className={styles.testimonialRole}>{t.role}</span>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
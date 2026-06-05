"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./ComingSoonSection.module.css";

interface Props {
  serviceName: string;
  serviceUrl: string;
}

export default function ComingSoonSection({ serviceName, serviceUrl }: Props) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(true);
      return;
    }
    setError(false);
    const interest = JSON.parse(localStorage.getItem("certilab-interest") || "[]");
    interest.push({ service: serviceName, email, date: new Date().toISOString() });
    localStorage.setItem("certilab-interest", JSON.stringify(interest));
    setSent(true);
  };

  const mailtoHref = `mailto:info@certilab.cat?subject=Interes%20en%20${encodeURIComponent(serviceName)}&body=Hola,%20estoy%20interesado%20en%20el%20servicio%20${encodeURIComponent(serviceName)}%20(${serviceUrl}).%20Avisadme%20cuando%20este%20disponible.%0A%0AMi%20email:%20${encodeURIComponent(email)}`;

  return (
    <section className={styles.comingSoonSection} id="coming-soon">
      <div className={styles.comingSoonInner}>
        <span className={styles.comingSoonBadge}>En obras</span>
        <h2 className={styles.comingSoonTitle}>
          {serviceName} estara disponible pronto
        </h2>
        <p className={styles.comingSoonSub}>
          Estamos ultimando los detalles de este servicio. Si quieres que te
          avisemos cuando este activo, dejame tu correo.
        </p>

        {sent ? (
          <div className={styles.comingSoonSuccess}>
            <p className={styles.comingSoonSuccessText}>
              Gracias! Te avisaremos cuando {serviceName} este disponible.
            </p>
            <p className={styles.comingSoonSuccessExtra}>
              Mientras tanto, descubre nuestra{" "}
              <Link href="/segunda-opinion/">
                Segunda Opinion del Certificado Energetico por 39EUR
              </Link>
              , el servicio que ya esta activo y operativo.
            </p>
            <p className={styles.comingSoonSuccessWa}>
              Tambien puedes escribirnos directamente por{" "}
              <a
                href="https://wa.me/34608515922?text=Hola%2C%20estoy%20interesado%20en%20el%20servicio%20de"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              .
            </p>
          </div>
        ) : (
          <form className={styles.comingSoonForm} onSubmit={handleSubmit}>
            <div className={styles.comingSoonField}>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
                placeholder="tu@email.com"
                className={`${styles.comingSoonInput} ${error ? styles.comingSoonInputError : ""}`}
                aria-label="Tu correo electronico"
              />
              <button type="submit" className={styles.comingSoonButton}>
                Avisarme
              </button>
            </div>
            {error && (
              <p className={styles.comingSoonError}>
                Introduce un correo electronico valido.
              </p>
            )}
            <p className={styles.comingSoonNote}>
              Sin spam. Solo te escribiremos cuando este servicio este listo.
            </p>
          </form>
        )}

        <div className={styles.comingSoonAlternative}>
          <p className={styles.comingSoonAltText}>
            El servicio que ya esta activo:{" "}
            <Link href="/segunda-opinion/">
              Segunda Opinion del Certificado (39EUR)
            </Link>
          </p>
        </div>
      </div>

    </section>
  );
}
"use client";
import Link from "next/link";
import { services } from "@/data/services";
import styles from "./ServicesGrid.module.css";

const comingSoonSlugs = ["check-up-inmobiliario", "informe-tecnico-energetico"];

export default function ServicesGrid() {
  return (
    <section className={styles.serviciosSection} aria-labelledby="servicios-title">
      <div className={styles.serviciosHeader}>
        <h2 className={styles.sectionTitle} id="servicios-title">
          Nuestros servicios
        </h2>
        <p className={styles.sectionSub}>
          Cinco servicios diseñados para distintas necesidades. Sin letra
          pequeña, sin sorpresas.
        </p>
      </div>
      <div className={styles.serviciosGrid}>
        {services.map((service) => (
          <Link
            key={service.slug}
            href={service.href}
            className={`${styles.servicioCard} ${service.destacado ? styles.destacado : ""} ${
              comingSoonSlugs.includes(service.slug) ? styles.comingSoonCard : ""
            }`}
          >
            <div className={styles.servicioCardInner}>
              <div className={styles.servicioCardTop}>
                <p className={styles.servicioBadge}>{service.badge}</p>
                <h3>{service.title}</h3>
                {comingSoonSlugs.includes(service.slug) && (
                  <p className={styles.servicioComingBadge}>Proximamente</p>
                )}
              </div>
              <p className={styles.servicioDesc}>{service.description}</p>
              <div className={styles.servicioCardFooter}>
                <span className={styles.servicioPrecio}>
                  {service.price === 0
                    ? "Gratuito"
                    : `${service.price} €`}
                </span>
                {comingSoonSlugs.includes(service.slug) ? (
                  <span className={`${styles.cardLink} ${styles.cardLinkComing}`}>Proximamente →</span>
                ) : (
                  <span className={styles.cardLink}>{service.ctaLabel || "Ver detalles"} →</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
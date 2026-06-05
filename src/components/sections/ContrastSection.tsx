"use client";

import styles from "./ContrastSection.module.css";

export default function ContrastSection() {
  return (
    <section className="section contraste-section" aria-labelledby="contraste-title">
      <h2 className="section-title" id="contraste-title">
        No todos los análisis son iguales
      </h2>
      <p className="section-sub">
        Y su patrimonio no merece atajos. Compare lo que hay detrás de cada tipo
        de informe.
      </p>
      <div className={styles["contraste-duo"]}>
        <div className={styles["contraste-card"]}>
          <p className={styles["contraste-label"]}>Informe Algorítmico</p>
          <ul>
            <li>Generado mediante software, sin intervención de un técnico colegiado</li>
            <li>Sin verificación técnica personalizada</li>
            <li>Datos genéricos del catastro, sin contraste con documentación real</li>
            <li>Sin respaldo de un colegio profesional ni seguro de responsabilidad</li>
            <li>Informe breve con formato estándar</li>
          </ul>
        </div>
        <div className={styles["contraste-card"]}>
          <p className={`${styles["contraste-label"]} ${styles["contraste-label-destacado"]}`}>
            Análisis Forense Certilab
          </p>
          <ul>
            <li>Revisado por arquitecta técnica colegiada, Cateb 9457</li>
            <li>Con seguro de responsabilidad civil profesional</li>
            <li>Análisis basado en documentación real de su inmueble</li>
            <li>Detecta el Brown Discount antes de que afecte a su precio</li>
            <li>Informe de 10-15 páginas con validez ante notario y banco</li>
          </ul>
        </div>
      </div>

    </section>
  );
}

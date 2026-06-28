"use client";
import { PRECIOS, fmtPrecio } from "@/config/pricing";

import styles from "./ServicesComparison.module.css";

interface ComparisonRow {
  feature: string;
  segundaOpinion: string;
  express: string;
  informeTecnico: string;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "Para quién es",
    segundaOpinion: "Compradores, vendedores, propietarios que dudan del certificado",
    express: "Mismo que estándar, pero con urgencia",
    informeTecnico: "Propietarios que quieren reformar con plan",
  },
  {
    feature: "Precio",
    segundaOpinion: "59€",
    express: "79€",
    informeTecnico: "399€",
  },
  {
    feature: "Tiempo de entrega",
    segundaOpinion: "24-48 horas",
    express: "Menos de 4 horas (L-V 9-18h)",
    informeTecnico: "5-7 días",
  },
  {
    feature: "Qué incluye",
    segundaOpinion: "Revisión del certificado, detección de errores, Brown Discount",
    express: "Mismo análisis que estándar, entrega urgente",
    informeTecnico: "Análisis completo, mejoras priorizadas, mapa de ayudas",
  },
  {
    feature: "Cuándo elegirlo",
    segundaOpinion: "Antes de comprar/vender o si desconfías del certificado",
    express: "Cuando tienes firma inminente (48h)",
    informeTecnico: "Cuando vas a reformar y necesitas plan de acción",
  },
];

export default function ServicesComparison() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Elige el servicio que necesitas</h2>
        <p className={styles.subtitle}>
          Cada servicio resuelve un problema diferente. Aquí está claro cuál es el tuyo.
        </p>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.featureCol}>Característica</th>
                <th className={styles.serviceCol}>
                  <span className={styles.serviceName}>Segunda Opinión</span>
                  <span className={styles.servicePrice}>{fmtPrecio(PRECIOS.segundaOpinion)}</span>
                </th>
                <th className={styles.serviceCol}>
                  <span className={styles.serviceName}>Express</span>
                  <span className={styles.servicePrice}>{fmtPrecio(PRECIOS.segundaOpinionExpress)}</span>
                </th>
                <th className={styles.serviceCol}>
                  <span className={styles.serviceName}>Informe Técnico</span>
                  <span className={styles.servicePrice}>{fmtPrecio(PRECIOS.informeTecnico)}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx} className={row.feature === "Cuándo elegirlo" ? styles.lastRow : ""}>
                  <td className={styles.featureCell} data-label="Característica">
                    <strong>{row.feature}</strong>
                  </td>
                  <td className={styles.serviceCell} data-label="Segunda Opinión">{row.segundaOpinion}</td>
                  <td className={styles.serviceCell} data-label="Express">{row.express}</td>
                  <td className={styles.serviceCell} data-label="Informe Técnico">{row.informeTecnico}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.ctas}>
          <a href="/segunda-opinion/" className={styles.ctaButton}>
            Segunda Opinión (59€)
          </a>
          <a href="/segunda-opinion-express/" className={styles.ctaButton}>
            Express (79€)
          </a>
          <a href="/informe-tecnico-energetico/" className={styles.ctaButton}>
            Informe Técnico (399€)
          </a>
        </div>
      </div>
    </section>
  );
}

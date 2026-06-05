"use client";

import Link from "next/link";
import { waSaas } from "@/lib/wa";
import styles from "./page.module.css";

export default function SaasPage() {
  return (
    <>
      {/* HERO B2B */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>B2B · Plataforma profesional</p>
          <h1 className={styles.heroTitle}>
            Convierte certificados energéticos en confianza para tus clientes
          </h1>
          <p className={styles.heroSub}>
            Agencias inmobiliarias y arquitectos técnicos: centraliza
            expedientes, recibe informes periciales firmados en 24-48h y
            cierra más ventas con la garantía de un análisis profesional.
          </p>
          <div className={styles.heroCtas}>
            <Link href={waSaas()} className={styles.btnPrimary}>
              Solicitar demo gratuita
            </Link>
            <Link href="#precios" className={styles.btnSecondary}>
              Ver planes →
            </Link>
          </div>
          <p className={styles.heroNota}>
            Sin compromiso · Primera semana gratis · Sin permanencia
          </p>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          El sector inmobiliario tiene un problema de confianza energética
        </h2>
        <div className={styles.problemGrid}>
          <div className={styles.problemCard}>
            <h3>Agencias inmobiliarias</h3>
            <p>
              Tus compradores desconfían de los certificados energéticos.
              Pierdes ventas porque no puedes garantizar la eficiencia real del
              inmueble.
            </p>
          </div>
          <div className={styles.problemCard}>
            <h3>Arquitectos técnicos</h3>
            <p>
              Dedicas horas a informes que nadie valora. Necesitas una
              plataforma que centralice tu trabajo y te ayude a escalar.
            </p>
          </div>
            <div className={styles.problemCard}>
            <h3>Administradores de fincas</h3>
            <p>
              Gestionas múltiples comunidades sin una herramienta unificada
              para evaluar su estado energético y acceder a ayudas.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={`${styles.section} ${styles.featuresSection}`}>
        <h2 className={styles.sectionTitle}>
          Todo lo que necesitas para escalar tu negocio
        </h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3>Informes periciales con validez legal</h3>
            <p>
              Cada informe está firmado por Eva María González García,
              Arquitecta Técnica colegiada Cateb 9457, con seguro de
              responsabilidad civil. Tus clientes obtienen un documento
              profesional que pueden presentar ante notarías, bancos y
              administraciones.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3>Panel de equipo multi-usuario</h3>
            <p>
              Invita a tus colaboradores, asigna expedientes y haz seguimiento
              del estado de cada análisis en tiempo real. Ideal para agencias
              con 2-5 agentes que gestionan decenas de inmuebles al mes.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3>API de integración con tu CRM</h3>
            <p>
              Conecta Certilab con tu CRM inmobiliario o software de gestión.
              Automatiza la creación de expedientes y sincroniza los
              resultados sin intervención manual.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3>Subida en lote y plantillas</h3>
            <p>
              Sube múltiples expedientes a la vez con nuestras plantillas
              CSV. Procesa carteras completas de inmuebles en minutos, no en
              horas.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3>Servicio Express 2h</h3>
            <p>
              ¿Urgencia? Activa el modo Express y recibe tu informe en menos
              de 2 horas. Perfecto para cierres de venta inminentes o
              segundas opiniones sobre la marcha.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3>Historial completo de expedientes</h3>
            <p>
              Accede a todos tus análisis anteriores desde un mismo panel.
              Descarga informes antiguos, compara resultados y genera
              reportes para tus clientes recurrentes.
            </p>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className={`${styles.section} ${styles.howSection}`}>
        <h2 className={styles.sectionTitle}>Cómo funciona</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepNum}>1</span>
            <h3>Sube el expediente</h3>
            <p>
              El cliente te envía el certificado energético o la documentación
              del inmueble. Tú lo subes a la plataforma en 2 clics.
            </p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNum}>2</span>
            <h3>Nosotros analizamos</h3>
            <p>
              Eva revisa cada caso personalmente. Sin algoritmos, sin
              automatismos. Con rigor técnico profesional.
            </p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNum}>3</span>
            <h3>Recibes el informe</h3>
            <p>
              Informe pericial PDF firmado por arquitecta técnica colegiada.
              Compártelo con tu cliente y cierra la venta con confianza.
            </p>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="precios" className={`${styles.section} ${styles.pricingSection}`}>
        <h2 className={styles.sectionTitle}>Planes para cada profesional</h2>
        <p className={styles.sectionSub}>
          Elige el plan que mejor se adapte a tu volumen de trabajo
        </p>
        <div className={styles.pricingGrid}>
          {/* Starter */}
          <div className={styles.pricingCard}>
            <h3 className={styles.planName}>Starter</h3>
            <p className={styles.planDesc}>Para autónomos y agentes individuales</p>
            <p className={styles.planPrice}>
              49<span className={styles.planCurrency}>€</span>
              <span className={styles.planPeriod}>/mes</span>
            </p>
            <ul className={styles.planFeatures}>
              <li>10 análisis/mes</li>
              <li>Informes PDF firmados</li>
              <li>Soporte por WhatsApp</li>
              <li>Historial de expedientes</li>
            </ul>
            <Link href="/saas/demo/" className={`${styles.btnPrimary} ${styles.btnFull}`}>
              Empezar prueba gratis
            </Link>
          </div>

          {/* Professional */}
          <div className={`${styles.pricingCard} ${styles.pricingFeatured}`}>
            <p className={styles.planBadge}>Más solicitado</p>
            <h3 className={styles.planName}>Professional</h3>
            <p className={styles.planDesc}>Para agencias pequeñas (2-5 agentes)</p>
            <p className={styles.planPrice}>
              99<span className={styles.planCurrency}>€</span>
              <span className={styles.planPeriod}>/mes</span>
            </p>
            <ul className={styles.planFeatures}>
              <li>50 análisis/mes</li>
              <li>Todo lo de Starter</li>
              <li>Panel de equipo</li>
              <li>API de integración</li>
              <li>Informes personalizados</li>
            </ul>
            <Link href="/saas/demo/" className={`${styles.btnPrimary} ${styles.btnFull}`}>
              Empezar prueba gratis
            </Link>
          </div>

          {/* Enterprise */}
          <div className={styles.pricingCard}>
            <h3 className={styles.planName}>Enterprise</h3>
            <p className={styles.planDesc}>Para grandes volúmenes</p>
            <p className={styles.planPrice}>
              199<span className={styles.planCurrency}>€</span>
              <span className={styles.planPeriod}>/mes</span>
            </p>
            <ul className={styles.planFeatures}>
              <li>Análisis ilimitados</li>
              <li>Todo lo de Professional</li>
              <li>API dedicada</li>
              <li>Gestión de usuarios</li>
              <li>Soporte prioritario 24/7</li>
            </ul>
              <Link href="/saas/demo/" className={`${styles.btnSecondary} ${styles.btnFull}`}>
              Solicitar demo
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Preguntas frecuentes</h2>
        <div className={styles.faq}>
          <details className={styles.faqItem}>
            <summary>¿Necesito conocimientos técnicos para usar la plataforma?</summary>
            <p>
              No. La plataforma está diseñada para que cualquier profesional del
              sector inmobiliario pueda usarla sin formación técnica. Tú solo
              subes la documentación y nosotros hacemos el análisis.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary>¿Los informes tienen validez legal?</summary>
            <p>
              Sí. Todos los informes están firmados por Eva María González
              Gracia, Arquitecta Técnica colegiada Cateb 9457, y cuentan con
              seguro de responsabilidad civil profesional.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary>¿Puedo cancelar mi suscripción en cualquier momento?</summary>
            <p>
              Sí. Sin permanencia ni penalizaciones. La primera semana es
              gratuita para que pruebes la plataforma sin compromiso.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary>¿Ofrecéis integración con CRMs?</summary>
            <p>
              Sí, a través de nuestra API. Los planes Professional y Enterprise
              incluyen acceso a la API para integrar con vuestro CRM
              inmobiliario.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary>¿Cuánto tardan los análisis?</summary>
            <p>
              El plazo estándar es de 24-48 horas laborables. Para casos
              urgentes, disponemos del servicio Express con entrega en menos de
              2 horas.
            </p>
          </details>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={`${styles.section} ${styles.ctaSection}`}>
        <h2 className={styles.sectionTitle}>
          Únete a los profesionales que ya confían en Certilab
        </h2>
        <p className={styles.sectionSub}>
          Primera semana gratis. Sin compromiso. Sin permanencia.
        </p>
        <Link href={waSaas()} className={`${styles.btnPrimary} ${styles.btnLarge}`}>
          Solicitar demo gratuita
        </Link>
      </section>

      {/* Schema.org Service + Products */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "Certilab SaaS",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web",
                offers: [
                  {
                    "@type": "Offer",
                    name: "Starter",
                    price: "49",
                    priceCurrency: "EUR",
                    description: "10 análisis/mes con informes PDF firmados",
                  },
                  {
                    "@type": "Offer",
                    name: "Professional",
                    price: "99",
                    priceCurrency: "EUR",
                    description: "50 análisis/mes con panel de equipo y API",
                  },
                  {
                    "@type": "Offer",
                    name: "Enterprise",
                    price: "199",
                    priceCurrency: "EUR",
                    description: "Análisis ilimitados con soporte prioritario 24/7",
                  },
                ],
              },
              {
                "@type": "Product",
                name: "Certilab SaaS - Starter",
                description: "10 análisis/mes con informes periciales firmados. Ideal para autónomos y agentes individuales.",
                offers: {
                  "@type": "Offer",
                  price: "49",
                  priceCurrency: "EUR",
                  priceValidUntil: "2027-12-31",
                  availability: "https://schema.org/InStock",
                },
              },
              {
                "@type": "Product",
                name: "Certilab SaaS - Professional",
                description: "50 análisis/mes con panel de equipo multi-usuario y API de integración CRM.",
                offers: {
                  "@type": "Offer",
                  price: "99",
                  priceCurrency: "EUR",
                  priceValidUntil: "2027-12-31",
                  availability: "https://schema.org/InStock",
                },
              },
              {
                "@type": "Product",
                name: "Certilab SaaS - Enterprise",
                description: "Análisis ilimitados, API dedicada, gestión de usuarios y soporte prioritario 24/7.",
                offers: {
                  "@type": "Offer",
                  price: "199",
                  priceCurrency: "EUR",
                  priceValidUntil: "2027-12-31",
                  availability: "https://schema.org/InStock",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
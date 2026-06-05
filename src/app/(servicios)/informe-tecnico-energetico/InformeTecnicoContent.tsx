"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ObrasBanner from "@/components/ui/ObrasBanner";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import StepsGrid from "@/components/sections/StepsGrid";
import ComparativaSection from "@/components/sections/ComparativaSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import TrustBlockSection from "@/components/sections/TrustBlockSection";
import TrustNumbers from "@/components/sections/TrustNumbers";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ComingSoonSection from "@/components/ui/ComingSoonSection";
import { informeTecnicoFaq } from "@/data/faq";
import styles from "./InformeTecnicoContent.module.css";

const features = [
  { num: "I", title: "Análisis completo", text: "Evaluación detallada del comportamiento energético del inmueble con datos reales. Sin asunciones genéricas." },
  { num: "II", title: "Mejoras priorizadas", text: "Lista de actuaciones ordenadas por impacto y retorno de la inversión. Sabrás por dónde empezar." },
  { num: "III", title: "Ahorro estimado", text: "Cálculo del ahorro económico anual con cada mejora propuesta. Con cifras reales, no estimaciones genéricas." },
  { num: "IV", title: "Ayudas y subvenciones", text: "Mapa completo de ayudas aplicables: Next Generation, CAE, IRPF, bonificaciones autonómicas y locales." },
];

const steps = [
  { title: "Solicita el estudio", text: "Contáctanos y te explicamos qué documentación necesitamos. Sin compromiso." },
  { title: "Analizamos tu vivienda", text: "Revisamos planos, facturas, instalaciones y documentación técnica. Con rigor profesional." },
  { title: "Recibes tu plan de acción", text: "Informe completo con mejoras priorizadas, ahorros calculados y ayudas aplicables a tu caso." },
];

const trustReasons = [
  {
    num: "01",
    title: "Análisis humano, no automático",
    text: "Cada informe lo elabora personalmente una arquitecta técnica colegiada. Sin IA, sin automatismos, con criterio profesional.",
  },
  {
    num: "02",
    title: "Responsabilidad profesional",
    text: "Eva María González García, colegiada CATEB 9457, con seguro de responsabilidad civil. Firmamos lo que dictaminamos.",
  },
  {
    num: "03",
    title: "Plan de acción real",
    text: "No te damos un tocho técnico. Te entregamos un plan priorizado con ahorros reales y ayudas concretas para tu caso.",
  },
  {
    num: "04",
    title: "Seguimiento personalizado",
    text: "Resolveremos todas tus dudas después de la entrega. No desaparecemos al cobrar.",
  },
];

export default function InformeTecnicoContent() {
  return (
    <div className={styles.pageWrapper}>
      <ObrasBanner />

      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Informe Técnico Energético", href: "/informe-tecnico-energetico/" },
        ]}
      />

      <HeroSection
        eyebrow="Próximamente"
        title="Informe Técnico Energético"
        subtitle="Análisis técnico completo del comportamiento energético del inmueble. Propuestas de mejora priorizadas, estimación de ahorro y orientación sobre ayudas disponibles. Para propietarios que quieren actuar."
        badges={["Cateb 9457", "Máximo detalle", "100% remoto"]}
        price="399 €"
        ctaPrimary={{ label: "Avisarme cuando esté disponible »", href: "#coming-soon" }}
        nota="Servicio en preparación. Déjanos tu correo y te avisaremos cuando esté activo."
      >
        <p className={styles.heroGarantia}>
          <span className={styles.heroGarantiaIcon}>&#9432;</span>
          Por 399€ obtienes un plan completo con mejoras, ahorros reales y ayudas aplicables. Inversión que se amortiza sola.
        </p>
      </HeroSection>

      <TrustNumbers />

      {/* AUDIENCE */}
      <section className={`${styles.section} audience-section`}>
        <h2 className={styles.sectionTitle}>¿Estás en alguna de estas situaciones?</h2>
        <p className={styles.sectionSub}>Identifícate en 2 segundos. Cada caso tiene un enfoque distinto.</p>
        <div className={styles.audienceGrid}>
          <div className={styles.audienceCard}>
            <div className={styles.audienceIcon}>🏠</div>
            <h3>Tu casa gasta demasiado en energía</h3>
            <p>Las facturas no bajan. No sabes si el problema es el aislamiento, la caldera o las ventanas. Necesitas un diagnóstico real antes de invertir en reformas.</p>
            <a href="#coming-soon" className={styles.audienceLink}>Quiero saber por dónde empezar →</a>
          </div>
          <div className={styles.audienceCard}>
            <div className={styles.audienceIcon}>💰</div>
            <h3>Quieres reformar pero no sabes por dónde</h3>
            <p>Sabes que necesitas mejorar tu vivienda pero no sabes qué actuaciones dan más resultado. Invertir sin un plan es tirar el dinero.</p>
            <a href="#coming-soon" className={styles.audienceLink}>Quiero priorizar mi inversión →</a>
          </div>
          <div className={styles.audienceCard}>
            <div className={styles.audienceIcon}>📋</div>
            <h3>Necesitas ayudas pero te pierdes en el papeleo</h3>
            <p>Next Generation, CAE, IRPF, subvenciones autonómicas… Sabes que existen pero no cuáles te corresponden ni cómo solicitarlas.</p>
            <a href="#coming-soon" className={styles.audienceLink}>Quiero saber qué ayudas me tocan →</a>
          </div>
        </div>
      </section>

      {/* ROI CONTRAST */}
      <section className={`${styles.section} ${styles.roiContrastSection}`}>
        <h2 className={styles.sectionTitle}>399€ de inversión vs. miles de euros de ahorro</h2>
        <p className={styles.sectionSub}>Esto es lo que te juegas si reformas sin un diagnóstico real.</p>
        <div className={styles.roiContrastGrid}>
          <div className={`${styles.roiContrastCard} ${styles.roiContrastBad}`}>
            <div className={styles.roiContrastLabel}>Sin informe técnico</div>
            <div className={styles.roiContrastAmount}>Hasta 15.000€</div>
            <div className={styles.roiContrastDesc}>en reformas sin priorizar. Puedes gastar en lo menos eficiente.</div>
            <ul className={styles.roiContrastList}>
              <li>✗ Reformas sin orden de prioridad</li>
              <li>✗ Ayudas que caducan sin solicitar</li>
              <li>✗ Ahorro real desconocido</li>
            </ul>
          </div>
          <div className={styles.roiContrastDivider}>
            <span className={styles.roiContrastVs}>VS</span>
          </div>
          <div className={`${styles.roiContrastCard} ${styles.roiContrastGood}`}>
            <div className={styles.roiContrastLabel}>Con Informe Técnico</div>
            <div className={styles.roiContrastAmount}>399€</div>
            <div className={styles.roiContrastDesc}>inversión única. Recuperable con la primera ayuda o ahorro.</div>
            <ul className={styles.roiContrastList}>
              <li>✓ Mejoras priorizadas por impacto</li>
              <li>✓ Ayudas y subvenciones identificadas</li>
              <li>✓ Ahorro económico real estimado</li>
            </ul>
          </div>
        </div>
        <div className={styles.roiContrastCta}>
          <a href="#coming-soon" className={styles.roiContrastButton}>Planificar mi reforma con cabeza →</a>
        </div>
      </section>

      {/* PROBLEM */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>¿Por qué necesitas un Informe Técnico Energético?</h2>
        <p className={styles.sectionSub}>Reformar sin diagnóstico previo es la mayor fuente de sobrecoste en eficiencia energética.</p>
        <div className={styles.problemGrid}>
          <div className={styles.problemCard}>
            <h3>El 70% de las reformas no prioriza bien</h3>
            <p>Cambiar ventanas cuando el problema es el aislamiento de fachada. Poner una caldera nueva cuando el verdadero ahorro está en la envolvente. Sin diagnóstico, el dinero se pierde en actuaciones equivocadas.</p>
          </div>
          <div className={styles.problemCard}>
            <h3>Ayudas que caducan sin aprovechar</h3>
            <p>Los fondos Next Generation, las deducciones del IRPF y las subvenciones autonómicas tienen plazos y requisitos. Cada año caducan ayudas que miles de propietarios podrían haber solicitado con un buen informe técnico.</p>
          </div>
          <div className={styles.problemCard}>
            <h3>Sin datos, cualquier reforma es una apuesta</h3>
            <p>Invertir en eficiencia sin saber el estado real de tu vivienda es como reformar a ciegas. El informe técnico te da los datos objetivos para decidir con criterio.</p>
          </div>
        </div>
        <div className={styles.problemCta}>
          <a href="#coming-soon" className={styles.problemCtaButton}>Quiero reformar con datos, no a ciegas →</a>
        </div>
      </section>

      {/* COMPARATIVA */}
      <ComparativaSection
        title="Autodiagnóstico vs. Informe Técnico Certilab"
        subtitle="No todos los análisis son iguales. Mira lo que obtienes con cada uno."
        cols={[
          {
            label: "Autodiagnóstico online (gratis)",
            items: [
              "Preguntas genéricas sobre tu vivienda",
              "Sin visita ni documentación real",
              "Cálculos estimados con datos estadísticos",
              "Sin ayudas personalizadas",
              "Recomendaciones estándar",
            ],
          },
          {
            label: "Informe Técnico Certilab (399€)",
            items: [
              "Análisis basado en documentación real de tu vivienda",
              "Revisado por arquitecta técnica colegiada CATEB 9457",
              "Cálculos precisos con tus datos reales",
              "Mapa de ayudas aplicables a tu caso concreto",
              "Plan de mejora priorizado por coste-beneficio",
            ],
            destacado: true,
          },
        ]}
      />

      <FeaturesGrid features={features} />
      <StepsGrid steps={steps} />

      {/* INCLUDES */}
      <section className={`${styles.section} ${styles.includesSection}`}>
        <h2 className={styles.sectionTitle}>¿Qué incluye por 399€?</h2>
        <p className={styles.sectionSub}>Todo lo que necesitas para tomar decisiones informadas sobre tu vivienda.</p>
        <div className={styles.includesBox}>
          <ul className={styles.includesGrid}>
            {[
              "Informe técnico detallado del comportamiento energético",
              "Plan de mejora priorizado por coste-beneficio",
              "Cálculo de ahorro económico anual estimado",
              "Mapa de ayudas y subvenciones aplicables",
              "Recomendaciones personalizadas por instalación",
              "Seguimiento personalizado post-entrega",
            ].map((item, i) => (
              <li key={i} className={styles.includesItem}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* PREVIEW */}
      <section className={`${styles.section} ${styles.previewSection}`}>
        <h2 className={styles.sectionTitle}>Así es tu informe técnico</h2>
        <p className={styles.sectionSub}>Un documento claro, profesional y listo para presentar donde lo necesites.</p>
        <div className={styles.previewGrid}>
          <div className={styles.previewCard}>
            <div className={styles.previewCardHeader}>
              <span className={styles.previewBadge}>Diagnóstico</span>
            </div>
            <div className={styles.previewCardBody}>
              <div className={`${styles.previewLine} ${styles.previewLineLg}`} />
              <div className={styles.previewLine} />
              <div className={`${styles.previewLine} ${styles.previewLineMd}`} />
              <div className={styles.previewLine} />
              <div className={`${styles.previewLine} ${styles.previewLineSm}`} />
            </div>
          </div>
          <div className={styles.previewCard}>
            <div className={styles.previewCardHeader}>
              <span className={styles.previewBadge}>Mejoras</span>
            </div>
            <div className={styles.previewCardBody}>
              <div className={styles.previewLine} />
              <div className={`${styles.previewLine} ${styles.previewLineLg}`} />
              <div className={styles.previewLine} />
              <div className={`${styles.previewLine} ${styles.previewLineMd}`} />
              <div className={`${styles.previewLine} ${styles.previewLineSm}`} />
            </div>
          </div>
          <div className={styles.previewCard}>
            <div className={styles.previewCardHeader}>
              <span className={styles.previewBadge}>Ayudas</span>
            </div>
            <div className={styles.previewCardBody}>
              <div className={`${styles.previewLine} ${styles.previewLineLg}`} />
              <div className={styles.previewLine} />
              <div className={`${styles.previewLine} ${styles.previewLineMd}`} />
              <div className={styles.previewLine} />
              <div className={styles.previewLine} />
            </div>
          </div>
        </div>
        <p className={styles.previewNote}>
          <span className={styles.previewNoteIcon}>📄</span>
          Informe real firmado por arquitecta técnica colegiada. Con respaldo profesional y seguro de responsabilidad civil. Recibirás un PDF listo para descargar e imprimir.
        </p>
      </section>

      {/* TRUST REASONS */}
      <section className={`${styles.section} ${styles.trustReasonsSection}`}>
        <h2 className={styles.sectionTitle}>¿Por qué confiar tu informe técnico a Certilab?</h2>
        <p className={styles.sectionSub}>No somos un comparador ni un generador automático. Somos profesionales colegiados.</p>
        <div className={styles.trustReasonsGrid}>
          {trustReasons.map((r, i) => (
            <div className={styles.trustReasonCard} key={i}>
              <div className={styles.trustReasonNum}>{r.num}</div>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <TestimonialsSection />

      <FAQSection items={informeTecnicoFaq} title="Preguntas frecuentes sobre el Informe Técnico Energético" />

      <CTASection
        title="¿Quieres mejorar la eficiencia de tu vivienda?"
        text="Por 399€ obtienes un plan completo con mejoras, ahorros y ayudas. Inversión que se amortiza sola. Déjanos tu correo y te avisaremos cuando esté disponible."
        buttonText="Quiero que me avisen →"
        buttonHref="#coming-soon"
      />

      <TrustBlockSection />

      <ComingSoonSection
        serviceName="Informe Técnico Energético (399€)"
        serviceUrl="https://www.certilab.cat/informe-tecnico-energetico/"
      />

      {/* STICKY CTA BAR */}
      <div className={styles.stickyCtaBar}>
        <div className={styles.stickyCtaInner}>
          <div className={styles.stickyCtaInfo}>
            <span className={styles.stickyCtaPrice}>399€</span>
            <span className={styles.stickyCtaMeta}>Entrega en 5-7 días · Sin sorpresas</span>
          </div>
          <div className={styles.stickyCtaActions}>
            <a href="#coming-soon" className={styles.stickyCtaButton}>
              Avisarme
            </a>
          </div>
        </div>
        <p className={styles.stickyCtaMicro}>Servicio en preparación · Sin compromiso</p>
      </div>
    </div>
  );
}
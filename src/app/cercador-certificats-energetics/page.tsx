"use client";

import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import { waDiagnostico } from "@/lib/wa";
import styles from "./page.module.css";

export default function CercadorPage() {
  return (
    <>
      <header className={styles.hero}>
        <h1>Cercador de Certificats Energ&egrave;tics a Catalunya</h1>
        <p className={styles.heroSub}>
          Guia per trobar un t&egrave;cnic certificador habilitat a la teva
          prov&iacute;ncia.
        </p>
      </header>

      <section className={styles.content}>
        <h2>Necessites un certificat energ&egrave;tic oficial a Catalunya?</h2>
        <p>
          Tot i que Certilab no emet certificats energ&egrave;tics oficials,
          t&rsquo;orientem sobre com trobar un t&egrave;cnic habilitat a la
          teva zona.
        </p>

        <h3>Registre oficial</h3>
        <p>
          El registre oficial de certificadors energ&egrave;tics de Catalunya
          el gestiona l&rsquo;ICAEN (Institut Catal&agrave; d&rsquo;Energia).
          Al seu web pots buscar t&egrave;cnics habilitats per prov&iacute;ncia
          i municipi.
        </p>

        <div className={styles.dirLinks}>
          <a
            href="https://www.registrocertificadosenergeticos.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.dirLink}
          >
            🔗 Registre de Certificadors de Catalunya (ICAEN)
          </a>
          <a
            href="https://www.gencat.cat/icaen/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.dirLink}
          >
            🔗 Institut Catal&agrave; d&rsquo;Energia
          </a>
        </div>

        <h3>Ja tens un certificat i dubtes de la seva fiabilitat?</h3>
        <p>
          Sol&middot;licita una Segona Opini&oacute; a Certilab. Per 39&euro;
          revisem el teu certificat i et diem si &eacute;s correcte.
        </p>
        <Link href="/segona-opinio/" className={styles.inlineLink}>
          Sol&middot;licitar Segona Opini&oacute; &rarr;
        </Link>
      </section>

      <CTASection
        title="Necessites orientaci&oacute;?"
        text="T&rsquo;ajudem a trobar el que necessites, sense comprom&iacute;s."
        buttonText="Consultar gratis"
        buttonHref={waDiagnostico()}
      />
    </>
  );
}
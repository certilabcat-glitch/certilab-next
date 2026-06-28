import Link from "next/link";
import { footerLegal } from "@/data/navigation";
import { COMPANY, RESPONSABLE, CONTACTO } from "@/config";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-brand">
          <p>
            <strong>{COMPANY.marca}</strong> · Despacho de Auditoría Energética
            <br />
            {RESPONSABLE.nombreCompleto} · {RESPONSABLE.titulo} colegiada · Colegio de Arquitectos Técnicos de Barcelona
          </p>
          <div className="footer-contacto">
            <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a>
          </div>
        </div>

        <nav className="footer-servicios" aria-label="Servicios">
          <h4>Servicios</h4>
          <Link href="/segunda-opinion/">Segunda Opinión</Link>
          <Link href="/check-up-inmobiliario/">Check-Up Inmobiliario</Link>
          <Link href="/informe-tecnico-energetico/">Informe Técnico</Link>
        </nav>

        <nav className="footer-legal" aria-label="Legal">
          <h4>Legal</h4>
          {footerLegal.map((item) => (
            <Link key={item.label} href={item.href}>{item.label}</Link>
          ))}
        </nav>
      </div>

      <p className="footer-copy">
        {COMPANY.copyright} · Todos los derechos reservados
      </p>

    </footer>
  );
}

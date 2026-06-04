import Link from "next/link";
import { footerLegal } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-brand">
          <p>
            <strong>Certilab</strong> · Despacho de Auditoría Energética
            <br />
            Eva María González García · Arquitecta Técnica colegiada · Colegio de Arquitectos Técnicos de Barcelona
          </p>
          <div className="footer-contacto">
            <a href="mailto:info@certilab.cat">info@certilab.cat</a>
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
        © 2026 Certilab · Todos los derechos reservados
      </p>

    </footer>
  );
}

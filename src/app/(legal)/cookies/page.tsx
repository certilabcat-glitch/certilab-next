import type { Metadata } from "next";
import "../legal.css";

export const metadata: Metadata = {
  title: "Política de Cookies | Certilab",
  description: "Política de cookies de Certilab. Infórmate sobre cómo usamos las cookies y gestiona tus preferencias.",
  alternates: { canonical: "https://www.certilab.cat/cookies/" },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <main className="legal-page">
      <div className="legal-content">
        <h1>Política de Cookies</h1>
        <p className="legal-update">Última actualización: mayo 2026</p>

        <h2>¿Qué son las cookies?</h2>
        <p>Las cookies son pequeños archivos de texto que se almacenan en tu navegador cuando visitas un sitio web. Nos permiten recordar tus preferencias y mejorar tu experiencia de navegación.</p>

        <h2>Tipos de cookies que utilizamos</h2>

        <h3>Cookies técnicas esenciales</h3>
        <p>Son necesarias para el funcionamiento básico del sitio web. No requieren tu consentimiento explícito.</p>
        <ul>
          <li><strong>certilab_cookies_accepted:</strong> Almacena tu preferencia de consentimiento de cookies (365 días)</li>
        </ul>

        <h3>Cookies analíticas / de marketing</h3>
        <p><strong>Meta Pixel (Facebook):</strong> Utilizamos Meta Pixel para medir la efectividad de nuestras campañas y entender cómo los usuarios interactúan con la web. Solo se activa si aceptas todas las cookies.</p>
        <p>Meta Pixel puede recopilar información sobre tu navegación para mostrarte anuncios personalizados en las plataformas de Meta (Facebook e Instagram).</p>

        <h2>Gestión de cookies</h2>
        <p>Puedes gestionar tus preferencias de cookies en cualquier momento:</p>
        <ul>
          <li><strong>Aceptar todas:</strong> Activas tanto las cookies técnicas como Meta Pixel</li>
          <li><strong>Solo técnicas:</strong> Solo cookies esenciales, sin Meta Pixel</li>
        </ul>
        <p>Puedes cambiar tu elección en cualquier momento utilizando el enlace &ldquo;Configurar cookies&rdquo; en el footer de la web.</p>

        <h2>Más información</h2>
        <p>Para más información sobre cómo tratamos tus datos, consulta nuestra <a href="/privacidad/">Política de Privacidad</a>.</p>
      </div>


    </main>
  );
}

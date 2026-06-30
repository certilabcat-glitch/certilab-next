# 06 — INVENTARIO DE ACTIVOS DEL PROYECTO

Lista completa de todos los activos intelectuales, documentales y técnicos del proyecto Certilab.

---

## 1. Repositorio

| Activo | Valor |
|---|---|
| **Repositorio GitHub** | `certilabcat-glitch/certilab-next` |
| **URL** | https://github.com/certilabcat-glitch/certilab-next.git |
| **Rama principal** | `main` |
| **Acceso** | Organización `certilabcat-glitch` |

---

## 2. Framework Certilab

| Activo | Descripción |
|---|---|
| **Stack** | Next.js (App Router) + TypeScript + Tailwind CSS |
| **Base de datos** | Supabase (PostgreSQL) |
| **Autenticación** | Supabase Auth + NextAuth |
| **IA / Cline** | Conexión Anthropic API (Claude) |
| **Pagos** | MyPOS (integración planificada) |
| **Automatización** | n8n webhooks |
| **Email** | SMTP (Resend o proveedor configurado) |
| **Hosting** | Vercel |
| **CI/CD** | Vercel auto-deploy desde `main` |

---

## 3. Project Brain

| Activo | Ruta |
|---|---|
| **Cerebro del proyecto** | `docs/CF-000-PROJECT-BRAIN.md` |
| **Foundation** | `docs/CF-011-FOUNDATION.md` |
| **Expediente Digital** | `docs/CF-002-EXPEDIENTE-DIGITAL.md` |
| **PITR Motor** | `docs/CF-012-PITR-MOTOR.md` |

---

## 4. Documentación técnica

| Activo | Ruta |
|---|---|
| **Auditoría de arquitectura** | `docs/AUDITORIA-ARQUITECTURA-V1.1.md` |
| **Implementación** | `docs/IMPLEMENTACION-V1.1.md` |
| **Release v1.2** | `docs/RELEASE-V1.2.md` |
| **Release Cleanup Report** | `RELEASE_CLEANUP_V1.0_REPORT.md` |

---

## 5. Arquitectura

| Activo | Ruta |
|---|---|
| **Plan maestro** | `docs/architecture/PLAN-MAESTRO.md` |
| **Arquitectura temática** | `docs/architecture/ARQUITECTURA-TEMATICA.md` |
| **Mapa de keywords** | `docs/architecture/10-mapa-keywords.md` |
| **Estrategia GBP** | `docs/architecture/11-estrategia-gbp.md` |
| **Plan diferenciación** | `docs/architecture/PLAN-DIFERENCIACION-CERTIFICADO-INCORRECTO.md` |
| **Informe diferenciación** | `docs/architecture/INFORME-DIFERENCIACION-CERTIFICADO-INCORRECTO.md` |
| **Comparación fusión** | `docs/architecture/COMPARACION-FUSION-CERTIFICADO-INCORRECTO.md` |

---

## 6. Roadmap

| Activo | Ruta |
|---|---|
| **Roadmap** | Incluido en `docs/CF-000-PROJECT-BRAIN.md` Sección 13 |
| **Próximos pasos** | Incluido en `docs/CF-000-PROJECT-BRAIN.md` Sección 17 |

---

## 7. Observatorio

| Activo | Ruta |
|---|---|
| **Plan del Observatorio** | `docs/observatorio/OBSERVATORIO-CERTILAB-PLAN.md` |

---

## 8. PITR™ (Protocolo de Inspección Técnica Remota)

| Activo | Ruta |
|---|---|
| **Motor PITR** | `src/lib/pitr/motor.ts` |
| **Hook use-pitr** | `src/lib/pitr/use-pitr.ts` |
| **Templates** | `src/lib/pitr/templates/segunda-opinion.ts` |
| **Componente PitrEngine** | `src/components/pitr/PitrEngine.tsx` |
| **Componente PitrQuestion** | `src/components/pitr/PitrQuestion.tsx` |
| **Componente PitrNavigation** | `src/components/pitr/PitrNavigation.tsx` |
| **Componente PitrProgress** | `src/components/pitr/PitrProgress.tsx` |
| **Página PITR** | `src/app/(plataforma)/pitr/segunda-opinion/page.tsx` |
| **Documentación** | `docs/CF-012-PITR-MOTOR.md` |

---

## 9. Backoffice

| Activo | Ruta |
|---|---|
| **Expedientes** | `src/app/(plataforma)/backoffice/expedientes/page.tsx` |
| **Clientes** | `src/app/(plataforma)/backoffice/clientes/page.tsx` |
| **Inmuebles** | `src/app/(plataforma)/backoffice/inmuebles/page.tsx` |
| **Usuarios** | `src/app/(plataforma)/backoffice/usuarios/page.tsx` |
| **Configuración** | `src/app/(plataforma)/backoffice/configuracion/page.tsx` |

---

## 10. Área Cliente (Plataforma)

| Activo | Ruta |
|---|---|
| **Dashboard** | `src/app/(plataforma)/dashboard/page.tsx` |
| **Mis expedientes** | `src/app/(plataforma)/mis-expedientes/page.tsx` |
| **Nuevo expediente** | `src/app/(plataforma)/nuevo-expediente/page.tsx` |
| **Configuración** | `src/app/(plataforma)/configuracion/page.tsx` |
| **Layout plataforma** | `src/app/(plataforma)/layout.tsx` |

---

## 11. Inspection Engine

| Activo | Ruta |
|---|---|
| **Tipos de inspección** | `src/types/inspection.ts` |
| **Extraer certificado** | `src/app/api/extraer-certificado/route.ts` |
| **Estados de expediente** | `src/lib/expediente-estados.ts` |
| **Eventos** | `src/lib/eventos.ts` |
| **Integraciones** | `src/lib/integraciones.ts` |

---

## 12. Web pública

| Activo | Ruta |
|---|---|
| **Home** | `src/app/page.tsx` |
| **Blog** | `src/app/blog/[slug]/page.tsx` |
| **Artículos (data)** | `src/data/articles/` |
| **Artículos (índice)** | `src/data/articles.ts` |
| **Buscador certificados** | `src/app/buscador-certificado-energetico-catalunya/page.tsx` |
| **Cercador certificats** | `src/app/cercador-certificats-energetics/page.tsx` |
| **Sobre nosotros** | `src/app/sobre-nosotros/page.tsx` |
| **Ayudas eficiencia** | `src/app/ayudas-eficiencia-energetica/page.tsx` |
| **Landing 7 señales** | `src/app/landing/7-senales-ce/page.tsx` |
| **Gracias** | `src/app/gracias/page.tsx` |
| **Resultado auditoría** | `src/app/resultado-auditoria/page.tsx` |
| **Landing genérica (export)** | `public/7-senales-certificado-energetico-incorrecto.html` |

---

## 13. Servicios

| Activo | Ruta |
|---|---|
| **Segunda opinión** | `src/app/(servicios)/segunda-opinion/page.tsx` |
| **Segunda opinión express** | `src/app/(servicios)/segunda-opinion-express/page.tsx` |
| **Informe técnico energético** | `src/app/(servicios)/informe-tecnico-energetico/page.tsx` |

---

## 14. Páginas legales

| Activo | Ruta |
|---|---|
| **Aviso legal** | `src/app/(legal)/aviso-legal/page.tsx` |
| **Privacidad** | `src/app/(legal)/privacidad/page.tsx` |
| **Cookies** | `src/app/(legal)/cookies/page.tsx` |

---

## 15. Componentes compartidos

| Activo | Ruta |
|---|---|
| **Header** | `src/components/layout/Header.tsx` |
| **StickyCTA** | `src/components/layout/StickyCTA.tsx` |
| **CookieConsent** | `src/components/layout/CookieConsent.tsx` |
| **HeroSection** | `src/components/sections/HeroSection.tsx` |
| **ProblemSection** | `src/components/sections/ProblemSection.tsx` |
| **ContrastSection** | `src/components/sections/ContrastSection.tsx` |
| **ServicesGrid** | `src/components/sections/ServicesGrid.tsx` |
| **ServicesComparison** | `src/components/sections/ServicesComparison.tsx` |
| **HowItWorks** | `src/components/sections/HowItWorks.tsx` |
| **TestimonialsSection** | `src/components/sections/TestimonialsSection.tsx` |
| **FAQSection** | `src/components/sections/FAQSection.tsx` |
| **LeadMagnetCTA** | `src/components/sections/LeadMagnetCTA.tsx` |
| **CheckUpInmobiliarioClient** | `src/components/sections/CheckUpInmobiliarioClient.tsx` |
| **ContactForm** | `src/components/forms/ContactForm.tsx` |
| **AutorBloque** | `src/components/blog/AutorBloque.tsx` |
| **EstadoBadge** | `src/components/plataforma/EstadoBadge.tsx` |
| **ProgressBar** | `src/components/plataforma/ProgressBar.tsx` |

---

## 16. Tipos y librerías

| Activo | Ruta |
|---|---|
| **Tipo Documento** | `src/types/documento.ts` |
| **Tipo Pago** | `src/types/pago.ts` |
| **Tipo Expediente** | `src/types/expediente.ts` |
| **Tipo Inspection** | `src/types/inspection.ts` |
| **Expediente estados** | `src/lib/expediente-estados.ts` |
| **Eventos** | `src/lib/eventos.ts` |
| **Integraciones** | `src/lib/integraciones.ts` |
| **Storage interface** | `src/lib/storage/storage-interface.ts` |
| **WhatsApp** | `src/lib/wa.ts` |
| **FAQ data** | `src/data/faq.ts` |
| **Services data** | `src/data/services.ts` |

---

## 17. Scripts de mantenimiento

| Activo | Ruta |
|---|---|
| **Análisis FAQ** | `scripts/analyze-faq.mjs` |
| **Análisis FAQ artículos** | `scripts/analyze-faq-articles.mjs` |
| **Check SEO** | `scripts/check-seo.mjs` |
| **Check CSS no usado** | `scripts/check-unused-css.mjs` |
| **Generar LLMs** | `scripts/generate-llms.mjs` |
| **Generar OG image** | `scripts/generate-og-image.mjs` |
| **Extraer artículos** | `scripts/extracted_articles.json` |
| **Artículos reescritos** | `scripts/rewritten_articles.json` |
| **Reescritos v2** | `scripts/rewritten_v2.json` |
| **Archive scripts** | `scripts/archive/README.md` |

---

## 18. Releases

| Activo | Ruta |
|---|---|
| **v1.2.0** | `docs/RELEASE-V1.2.md` |
| **Cleanup v1.0** | `RELEASE_CLEANUP_V1.0_REPORT.md` |
| **Plan releases** | `docs/releases/` |

---

## 19. Auditorías

| Activo | Ruta |
|---|---|
| **Auditoría completa** | `docs/audits/AUDITORIA-COMPLETA-CERTILAB.md` |
| **Auditoría final** | `docs/audits/AUDITORIA-FINAL-CERTILAB-V1.0.md` |
| **Auditoría conversión** | `docs/audits/AUDITORIA-CONVERSION-SERVICIOS.md` |
| **Auditoría editorial** | `docs/audits/AUDITORIA-MAESTRA-EDITORIAL-V1.0.md` |
| **Auditoría SEO** | `docs/audits/SEO-AUDIT-REPORT.md` |
| **Auditoría lectura móvil** | `docs/audits/AUDITORIA-LECTURA-MOVIL.md` |
| **Auditoría responsive** | `docs/audits/RESPONSIVE_AUDIT.md` |
| **Auditoría style-jsx** | `docs/audits/STYLE-JSX-AUDIT.md` |
| **Gap analysis** | `docs/audits/00-gap-analysis.md` |
| **Canibalización** | `docs/audits/REPORTE-CANIBALIZACION.md` |
| **Schema** | `docs/audits/SCHEMA-IMPLEMENTATION-REPORT.md` |
| **Consistencia** | `docs/audits/SPRINT1-CONSISTENCIA-AUDITORIA.md` |

---

## 20. Editorial

| Activo | Ruta |
|---|---|
| **Manual editorial** | `docs/editorial/MANUAL-EDITORIAL-CERTILAB-V1.0.md` |
| **Briefing Eva** | `docs/editorial/BRIEFING-EVA.md` |
| **Progreso editorial** | `docs/editorial/EDITORIAL-PROGRESS.md` |
| **Informe editorial** | `docs/editorial/INFORME-EDITORIAL-COMPLETO.md` |
| **Optimización comercial** | `docs/editorial/INFORME-OPTIMIZACION-COMERCIAL.md` |
| **Lead magnet estructura** | `docs/editorial/LEAD-MAGNET-ESTRUCTURA.md` |
| **Protocolo respuesta leads** | `docs/editorial/PROTOCOLO-RESPUESTA-LEADS.md` |

---

## 21. Expedientes

| Activo | Ruta |
|---|---|
| **Diagrama flujo** | `docs/expedientes/DIAGRAMA-FLUJO-CLIENTE-EXPEDIENTES.md` |
| **Sistema fase 1** | `docs/expedientes/SISTEMA-EXPEDIENTES-CERTILAB-FASE1.md` |

---

## 22. Archivos públicos

| Activo | Ruta |
|---|---|
| **Favicon** | `public/favicon.png` |
| **OG Image** | `public/og-image.jpg` |
| **Robots.txt** | `public/robots.txt` |
| **LLMs.txt** | `public/llms.txt` |
| **LLMs full** | `public/llms-full.txt` |
| **Sitemap** | `src/app/sitemap.ts` (generado dinámicamente) |
| **Landing export** | `public/7-senales-certificado-energetico-incorrecto.html` |

---

## 23. Configuración del proyecto

| Activo | Ruta |
|---|---|
| **package.json** | `package.json` |
| **tsconfig.json** | `tsconfig.json` |
| **next.config.ts** | `next.config.ts` |
| **eslint.config.mjs** | `eslint.config.mjs` |
| **postcss.config.mjs** | `postcss.config.mjs` |
| **vercel.json** | `vercel.json` |
| **.gitignore** | `.gitignore` |
| **DEPLOY.md** | `DEPLOY.md` |

---

## 24. Recovery Kit (este kit)

| Activo | Ruta |
|---|---|
| **Guía de recuperación** | `docs/recovery/01-RECOVERY-GUIDE.md` |
| **Variables de entorno** | `docs/recovery/02-ENVIRONMENT-CHECKLIST.md` |
| **Checklist de backup** | `docs/recovery/03-BACKUP-CHECKLIST.md` |
| **Ordenador nuevo** | `docs/recovery/04-NEW-COMPUTER.md` |
| **Recuperación ante desastres** | `docs/recovery/05-DISASTER-RECOVERY.md` |
| **Inventario de activos** | `docs/recovery/06-PROJECT-ASSETS.md` (este documento) |
| **Cambio de dispositivo** | `docs/recovery/07-CHANGE-DEVICE.md` |
| **Script de verificación** | `docs/recovery/08-CHECK-SCRIPT.md` |
| **Informe de recovery** | `docs/recovery/RECOVERY-REPORT.md` |

---

## Resumen numérico

| Categoría | Cantidad |
|---|---|
| Documentos CF | 4 |
| Documentos de arquitectura | 7 |
| Documentos editoriales | 7 |
| Auditorías | 12 |
| Páginas web | 18+ |
| Componentes | 18+ |
| Tipos/librerías | 10+ |
| Scripts | 10+ |
| **Total activos documentados** | **100+** |
# 02 — CHECKLIST DE VARIABLES DE ENTORNO

**Regla:** Este documento lista todas las variables de entorno necesarias. NO contiene valores reales, solo nombres y descripciones.

---

## Variables de API / IA

| Variable | Para qué sirve |
|---|---|
| `ANTHROPIC_API_KEY` | Clave de API de Anthropic. La usa Cline para el asistente de desarrollo con IA. |
| `OPENAI_API_KEY` | Clave de API de OpenAI. Usada para funcionalidades de IA si están activas. |

---

## Variables de Supabase (Base de datos)

| Variable | Para qué sirve |
|---|---|
| `SUPABASE_URL` | URL del proyecto de Supabase. Endpoint de la base de datos. |
| `SUPABASE_ANON_KEY` | Clave anónima de Supabase. Permite operaciones públicas (lectura). |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio de Supabase. Para operaciones administrativas (servidor, NUNCA en cliente). |
| `NEXT_PUBLIC_SUPABASE_URL` | URL de Supabase expuesta al navegador (prefijo `NEXT_PUBLIC_`). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima expuesta al navegador. |

---

## Variables de Correo Electrónico (SMTP)

| Variable | Para qué sirve |
|---|---|
| `SMTP_HOST` | Servidor SMTP para envío de correos (ej: smtp.resend.com, smtp.gmail.com). |
| `SMTP_PORT` | Puerto del servidor SMTP (ej: 587 para TLS, 465 para SSL). |
| `SMTP_USER` | Usuario/email para autenticación SMTP. |
| `SMTP_PASSWORD` | Contraseña o API key del servicio SMTP. |

---

## Variables de Integraciones

| Variable | Para qué sirve |
|---|---|
| `MYPOS_API_KEY` | Clave de API de MyPOS. Integración con sistema de pagos/T PV. |
| `N8N_WEBHOOK_URL` | URL del webhook de n8n. Automatización de flujos de trabajo. |

---

## Variables de Despliegue

| Variable | Para qué sirve |
|---|---|
| `VERCEL_TOKEN` | Token de Vercel para despliegue automático desde CLI. |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio en producción (ej: https://certilab.es). |

---

## Variables de Seguridad

| Variable | Para qué sirve |
|---|---|
| `NEXTAUTH_SECRET` | Clave secreta de NextAuth.js. Encripta sesiones y tokens JWT. |
| `NEXTAUTH_URL` | URL base de NextAuth. Normalmente la misma que `NEXT_PUBLIC_SITE_URL`. |

---

## Cómo usarlas

1. Crea el archivo `.env.local` en la raíz del proyecto.
2. Cada variable va en formato `CLAVE=valor` (una por línea).
3. Las variables con prefijo `NEXT_PUBLIC_` estarán disponibles en el navegador.
4. Las variables SIN ese prefijo solo en el servidor.
5. **Jamás** subas `.env.local` a GitHub. Está incluido en `.gitignore`.

---

## Dónde conseguir los valores

- **Anthropic API Key:** https://console.anthropic.com → API Keys
- **OpenAI API Key:** https://platform.openai.com → API Keys
- **Supabase:** https://app.supabase.com → proyecto → Settings → API
- **SMTP:** Panel de tu proveedor de correo (Resend, SendGrid, etc.)
- **MyPOS:** Panel de comercio de MyPOS
- **n8n:** URL del webhook configurado en tu instancia de n8n
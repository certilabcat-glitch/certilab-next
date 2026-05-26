# 🚀 Deploy a Vercel — Guía visual

## Paso 1 — Subir a GitHub (desde el navegador)

1. Ve a [github.com/new](https://github.com/new)
2. Crea un repo llamado **`certilab-next`** (público)
3. **No marques** "Initialize with README" (ya tenemos uno)
4. Haz clic en **Create repository**

Te aparecerán instrucciones. Copia estas líneas y pégalas en tu terminal:

```powershell
cd C:\Users\achib\Documents\web-garraf\certilab-next
git remote add origin https://github.com/TU-USUARIO/certilab-next.git
git branch -M main
git push -u origin main
```

(Reemplaza `TU-USUARIO` por tu nombre de GitHub)

## Paso 2 — Desplegar en Vercel (desde el navegador)

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Inicia sesión con tu GitHub
3. Selecciona el repo `certilab-next`
4. Vercel detecta automáticamente Next.js — **no toques nada**
5. Haz clic en **Environment Variables** y añade:

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.certilab.cat` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `34608515922` |
| `NEXT_PUBLIC_META_PIXEL_ID` | `1271893388238243` |
| `N8N_WEBHOOK_URL` | `https://tu-n8n.com/webhook/lead-certilab` |

6. Haz clic en **Deploy**

En 2 minutos tu web estará en producción 🎉

## Paso 3 — Verificar

- Abre `https://tusitio.vercel.app/` — debe cargar Certilab
- Prueba `/sitemap.xml`, `/robots.txt`, `/blog/`
- Comprueba que el diseño, menú y enlaces funcionan

## Paso 4 — Dominio personalizado

En el dashboard de Vercel → **Domains** → añade `certilab.cat`

## Paso 5 — Post-deploy SEO

- [Google Search Console](https://search.google.com/search-console) — verifica el dominio
- [Rich Results Test](https://search.google.com/test/rich-results) — prueba Schema.org
- Revisa que `https://www.certilab.cat/robots.txt` permite crawlers de IA

---

> ⚠️ Si no tienes PowerShell, puedes hacer el **Paso 1** desde GitHub Desktop o directamente desde VS Code (pestaña Source Control → Publicar en GitHub).

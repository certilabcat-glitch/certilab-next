# Removal Plan: SaaS & Supabase/Auth

> **Investigación read-only — 29 Julio 2026**
> Ningún archivo ha sido modificado todavía.

---

## 📋 Resumen Ejecutivo

El proyecto tiene **dos grandes capas removibles**:

1. **Capa SaaS** (`(saas)` route group) — completamente autocontenida, puede eliminarse sin afectar nada.
2. **Capa Supabase/Auth** — más profunda, ya que alimenta todo el backend de `(plataforma)`.

Las páginas **públicas** (landing, servicios, legales, buscador) **NO dependen** de ninguna de estas dos capas.

---

## 🔍 HALLAZGO 1: SaaS (`(saas)` route group)

### Rutas a eliminar

| Ruta | Archivo | Notas |
|------|---------|-------|
| `/saas` | `src/app/(saas)/saas/page.tsx` | Landing de SaaS |
| `/saas/login` | `src/app/(saas)/saas/login/page.tsx` | Login con email + contraseña |
| `/saas/register` | `src/app/(saas)/saas/register/page.tsx` | Formulario de registro |
| `/saas/precios` | `src/app/(saas)/saas/precios/page.tsx` | Planes de precios |

### Archivos de layout/estilo a eliminar

| Archivo | Notas |
|---------|-------|
| `src/app/(saas)/layout.tsx` | Layout propio con Header/Footer duplicados |
| `src/app/(saas)/saas.css` | 147 líneas de estilos específicos SaaS |
| `src/app/(saas)/saas/auth.module.css` | Estilos CSS module para login |

### ⚠️ Impacto en páginas públicas: **NINGUNO**

El `src/app/layout.tsx` **raíz** ya tiene su propio `<Header />` y `<Footer />` importados directamente. Las páginas públicas (`/`, `/(servicios)/*`, `/(legal)/*`, `/buscador-*`) usan este layout raíz, **no** el layout de `(saas)`.

**El grupo (saas) es 100% autocontenido y puede eliminarse sin afectar a nada.**

---

## 🔍 HALLAZGO 2: Supabase & Auth

### Archivos de librería (núcleo Supabase)

| Archivo | Propósito | Dependencias |
|---------|-----------|--------------|
| `src/lib/supabase/client.ts` | Cliente browser (`createBrowserClient` de `@supabase/ssr`) | `@supabase/ssr` |
| `src/lib/supabase/server.ts` | Cliente server (`createServerClient` de `@supabase/ssr`) | `@supabase/ssr`, `next/headers` (cookies) |
| `src/lib/supabase/middleware.ts` | `updateSession()` — refresca sesión en cada request | `@supabase/ssr`, `next/server` |
| `src/middleware.ts` | Next.js middleware que invoca `updateSession()` | `src/lib/supabase/middleware.ts` |
| `src/lib/__mocks__/supabase.ts` | Mock para tests unitarios | `@supabase/supabase-js` |

### Componentes de autenticación

| Archivo | Propósito |
|---------|-----------|
| `src/hooks/use-user.ts` | Hook React que suscribe a `supabase.auth.onAuthStateChange` |
| `src/lib/actions/auth.ts` | Server actions: `login()`, `register()`, `logout()` |
| `src/app/auth/callback/route.ts` | Ruta API para callback OAuth de Supabase |
| `src/app/api/supabase-health/route.ts` | Health check de conexión a Supabase |
| `src/components/auth/UserMenu.tsx` | Menú desplegable de usuario (avatar, logout) |

### Dependencias npm (package.json)

| Paquete | Versión |
|---------|---------|
| `@supabase/ssr` | `^0.12.0` |
| `@supabase/supabase-js` | `^2.110.0` |

### Variables de entorno (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

---

## 🔥 HALLAZGO CRÍTICO: El problema de `(plataforma)`

**El grupo `(plataforma)` Y TODOS SUS COMPONENTES ASOCIADOS dependen de Supabase para funcionar.**

### Dependencias directas de Supabase en `(plataforma)`:

| Capa | Archivos | Dependencia |
|------|----------|-------------|
| **Layout** | `src/app/(plataforma)/layout.tsx` | Renderiza `<UserMenu />` (auth) |
| **Repositorios** | `src/lib/core/cliente.repository.ts` | `createClient()` de supabase/server |
| | `src/lib/core/inmueble.repository.ts` | ídem |
| | `src/lib/core/expediente.repository.ts` | ídem |
| | `src/lib/core/documento-ia.repository.ts` | ídem |
| **Server Actions** | `src/lib/actions/*.ts` (10+ archivos) | `createClient()` de supabase/server |
| **Hooks** | `src/lib/pitr/use-pitr.ts` | `createClient()` de supabase/client |
| **Tests** | `src/lib/core/__tests__/*.test.ts` | `src/lib/__mocks__/supabase.ts` |

### ¿Qué contiene `(plataforma)`?

```
(plataforma)/
├── at/dashboard/          → Backoffice técnico
├── backoffice/expedientes → Gestión de expedientes
├── configuracion/         → Configuración
├── dashboard/             → Dashboard principal
├── expedientes/[id]/      → Detalle de expediente
├── mis-expedientes/       → Listado de expedientes propios
├── nuevo-expediente/      → Crear expediente
├── solicitar-segunda-opinion/ → Solicitar segunda opinión
├── layout.tsx             → Layout protegido (auth required)
```

---

## 🧭 PLAN DE ELIMINACIÓN

Hay **dos enfoques** dependiendo de qué quieras conservar:

---

### OPCIÓN A: Eliminar SOLO SaaS (dejar `(plataforma)` + backend intacto)

Si quieres mantener el negocio de informes técnicos (plataforma de expedientes) pero eliminar el modelo SaaS de suscripción:

**Paso 1:** Eliminar el grupo `(saas)` entero
```bash
rm -rf src/app/\(saas\)/
```

**Paso 2:** Eliminar referencias a rutas SaaS en `src/data/navigation.ts` (si existen)

**Resultado:** No se toca Supabase, auth, ni (plataforma). Las páginas públicas y la plataforma siguen funcionando igual.

---

### OPCIÓN B: Eliminar SaaS + Supabase/Auth (recomendada para consulting ligero)

Si el modelo es **consultoría remota ligera** (landing page + checkout), entonces `(plataforma)` también sobra. La secuencia completa sería:

#### FASE 1 — Preparación (layouts)
1. Verificar que `src/app/layout.tsx` (raíz) tiene Header y Footer completos → ✅ ya los tiene
2. Verificar que las páginas públicas no importan nada de `(saas)` → ✅ confirmado

#### FASE 2 — Eliminar SaaS
3. Eliminar `src/app/(saas)/` (directorio completo)
4. Limpiar referencias a rutas SaaS en `src/data/navigation.ts`

#### FASE 3 — Eliminar `(plataforma)` y su backend Supabase
5. Eliminar `src/app/(plataforma)/` (directorio completo + sus layouts)
6. Eliminar `src/lib/supabase/` (directorio completo)
7. Eliminar `src/lib/__mocks__/supabase.ts`
8. Eliminar `src/middleware.ts`
9. Eliminar `src/app/auth/` (directorio completo)
10. Eliminar `src/app/api/supabase-health/route.ts`
11. Eliminar `src/hooks/use-user.ts`
12. Eliminar `src/lib/actions/auth.ts`
13. Eliminar `src/components/auth/` (directorio completo)
14. Eliminar `src/lib/actions/*.ts` (todos los server actions o reemplazar donde sea necesario)
15. Eliminar `src/lib/core/*.repository.ts` (ya no hay base de datos)
16. Eliminar `supabase/` (migraciones, seeds, scripts)
17. Eliminar `scripts/apply-*.mjs` y `scripts/check-*.mjs`

#### FASE 4 — Limpiar dependencias y config
18. `npm uninstall @supabase/ssr @supabase/supabase-js`
19. Eliminar variables de Supabase de `.env.local`
20. Actualizar `tsconfig.json` si hay paths referenciando `@/lib/supabase`
21. Actualizar `.gitignore` si hay entradas específicas de Supabase

#### FASE 5 — Tests
22. Eliminar/actualizar tests que mockean Supabase
23. Verificar que `vitest.config.ts` no referencia mocks de Supabase

#### FASE 6 — Build & Verify
24. `npm run build` — comprobar que no hay errores de compilación
25. `npm run lint` — comprobar lint
26. Verificar que las páginas públicas siguen funcionando

---

## 📊 RESUMEN DE ARCHIVOS A ELIMINAR

### Grupo (saas) — 7 archivos
```
src/app/(saas)/layout.tsx
src/app/(saas)/saas.css
src/app/(saas)/saas/auth.module.css
src/app/(saas)/saas/page.tsx
src/app/(saas)/saas/login/page.tsx
src/app/(saas)/saas/register/page.tsx
src/app/(saas)/saas/precios/page.tsx
```

### Supabase/Auth — 10+ archivos
```
src/lib/supabase/client.ts
src/lib/supabase/server.ts
src/lib/supabase/middleware.ts
src/lib/__mocks__/supabase.ts
src/middleware.ts
src/app/auth/callback/route.ts
src/app/api/supabase-health/route.ts
src/components/auth/UserMenu.tsx
src/hooks/use-user.ts
src/lib/actions/auth.ts
```

### (plataforma) — ~20+ archivos de páginas + ~10 server actions + 4 repositorios
```
src/app/(plataforma)/ (directorio completo)
src/lib/core/cliente.repository.ts
src/lib/core/inmueble.repository.ts
src/lib/core/expediente.repository.ts
src/lib/core/documento-ia.repository.ts
src/lib/actions/*.ts (10+ archivos)
```

### Infraestructura — ~20+ archivos
```
supabase/ (directorio completo)
scripts/apply-*.mjs (8+ archivos)
scripts/check-*.mjs (5+ archivos)
```

---

## ❓ DECISIÓN REQUERIDA

**¿Qué opción prefieres?**

- **Opción A:** Eliminar solo SaaS, conservar `(plataforma)` + Supabase (backend operativo)
- **Opción B:** Eliminar SaaS + Supabase/Auth + `(plataforma)` completo (empezar desde landing page + checkout)

**¿O quieres una opción intermedia?** Por ejemplo:
- Eliminar SaaS + auth/login, pero conservar `(plataforma)` con un backend alternativo (SQLite local, JSON file, etc.)
- Eliminar SaaS pero reemplazar Supabase por otra solución serverless (Neon, Turso, etc.)
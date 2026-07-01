# CF-021 — SUPABASE ARCHITECTURE

**Versión:** 1.0  
**Fecha:** 01/07/2026  
**Responsable:** Arquitectura Técnica Certilab  
**Estado:** Documento de diseño (sin implementación)  
**Build:** ✅ Compilado (0 errores)

---

## 📋 Índice

1. [Arquitectura completa](#1-arquitectura-completa)
2. [Diagramas](#2-diagramas)
3. [Flujo autenticación](#3-flujo-autenticación)
4. [Flujo expediente](#4-flujo-expediente)
5. [Flujo documentos](#5-flujo-documentos)
6. [Flujo pagos](#6-flujo-pagos)
7. [Flujo PITR](#7-flujo-pitr)
8. [Flujo IA](#8-flujo-ia)
9. [Storage](#9-storage)
10. [RLS](#10-rls)
11. [Repositories](#11-repositories)
12. [Services](#12-services)
13. [Casos de uso](#13-casos-de-uso)
14. [Variables entorno](#14-variables-entorno)
15. [Deploy](#15-deploy)
16. [Testing](#16-testing)
17. [Riesgos](#17-riesgos)
18. [Roadmap implementación](#18-roadmap-implementación)

---

# 1. ARQUITECTURA COMPLETA

## 1.1 Principio de integración

Todo el proyecto se conecta con Supabase a través de **una única instancia de cliente** por contexto (server/client/admin). No hay conexiones directas a PostgreSQL sin pasar por Supabase. No hay SDKs alternativos. No hay bypass de RLS.

## 1.2 Mapa de integración global

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          NEXT.JS 16 APPLICATION                            │
│                                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  MIDDLEWARE   │  │ SERVER COMPS │  │ CLIENT COMPS │  │ SERVER ACT.  │   │
│  │  (auth guard) │  │ (read data)  │  │ (interact)   │  │ (mutations)  │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         │                 │                 │                 │            │
│         ▼                 ▼                 ▼                 ▼            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    LAYER ADAPTER (src/lib/supabase/)                 │  │
│  │                                                                      │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │  │
│  │  │ server.ts   │  │ client.ts   │  │ admin.ts    │                  │  │
│  │  │ (Service    │  │ (Browser    │  │ (Service    │                  │  │
│  │  │  Role key)  │  │  anon key)  │  │  Role key   │                  │  │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                  │  │
│  └─────────┼────────────────┼────────────────┼─────────────────────────┘  │
│            │                │                │                            │
│            ▼                ▼                ▼                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    DOMAIN LAYER (src/lib/domain/)                    │  │
│  │                                                                      │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │  │
│  │  │ USE CASES   │  │  SERVICES   │  │ REPOSITORY  │  │ VALIDATORS │  │  │
│  │  │ (orquest.)  │  │ (negocio)   │  │   (datos)   │  │  (reglas)  │  │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                           │                  │              │
          ┌────────────────┼──────────────────┼──────────────┼──────────────┐
          │                │                  │              │              │
          ▼                ▼                  ▼              ▼              ▼
   ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
   │ SUPABASE   │  │ SUPABASE   │  │ SUPABASE   │  │ SUPABASE   │  │ SUPABASE   │
   │   AUTH     │  │ POSTGRES  │  │  STORAGE   │  │ REALTIME   │  │  EDGE F.   │
   └────────────┘  └────────────┘  └────────────┘  └────────────┘  └────────────┘
                           │
                           ▼
                    ┌──────────────┐    ┌──────────────┐
                    │   n8n        │    │    MyPOS     │
                    │ (webhooks)   │    │ (payments)   │
                    └──────────────┘    └──────────────┘
```

## 1.3 Capas de la arquitectura

La integración con Supabase se estructura en **cinco capas verticales** más dos horizontales:

### Capas verticales (flujo de datos)

| Capa | Responsabilidad | Archivos clave |
|------|----------------|----------------|
| **0. Infraestructura** | Conexión Supabase, pools, retry | `src/lib/supabase/server.ts`, `client.ts`, `admin.ts` |
| **1. Repository** | Acceso a datos con RLS, abstracción SQL | `src/lib/domain/repositories/*.ts` |
| **2. Services** | Lógica de negocio, transacciones | `src/lib/domain/services/*.ts` |
| **3. Use Cases** | Orquestación, coordinación multi-servicio | `src/lib/domain/use-cases/*.ts` |
| **4. Adapters** | Conectan UI/API con Use Cases | Server Components, Client Components, Server Actions, API Routes |

### Capas horizontales (cross-cutting)

| Capa | Responsabilidad |
|------|----------------|
| **Auth** | Autenticación (Supabase Auth), autorización (RLS + permisos), sesiones |
| **Events** | Publicación de eventos transaccionales, integración con n8n |

## 1.4 Clientes Supabase

### Cliente Server (Server Components, Server Actions, API Routes)

```typescript
// src/lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
```

**Características:**
- Usa `@supabase/ssr` para manejo de cookies httpOnly
- Acceso a sesión del usuario autenticado
- RLS activo: solo ve datos del usuario/empresa

### Cliente Server (Admin — Service Role)

```typescript
// src/lib/supabase/admin.ts
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
```

**Características:**
- Service Role: bypass RLS
- Solo para operaciones internas (webhooks, n8n, migraciones, backoffice admin)
- Nunca se expone al cliente

### Cliente Client (Client Components)

```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export const supabaseClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

**Características:**
- Anon key (pública pero segura gracias a RLS)
- Sesión manejada por cookies
- Mutaciones deben usar Server Actions, no este cliente

### Regla de uso

```
┌─────────────────┬────────────┬──────────────┬───────────┐
│                 │ server.ts  │  admin.ts    │ client.ts │
├─────────────────┼────────────┼──────────────┼───────────┤
│ Server Comps    │ ✅ lectura  │ ❌            │ ❌         │
│ Server Actions  │ ✅ r/w     │ ❌            │ ❌         │
│ API Routes      │ ✅ r/w     │ ✅ admin ops │ ❌         │
│ Client Comps    │ ❌         │ ❌            │ ✅ lectura │
│ Webhooks        │ ❌         │ ✅            │ ❌         │
│ n8n             │ ❌         │ ✅            │ ❌         │
│ Middleware       │ ✅ auth    │ ❌            │ ❌         │
│ Edge Functions  │ ❌         │ ✅            │ ❌         │
└─────────────────┴────────────┴──────────────┴───────────┘
```

---

# 2. DIAGRAMAS

## 2.1 Diagrama de contexto del sistema

```
┌─────────────────────────────────────────────────────────────────────┐
│                      CERTILAB — SYSTEM CONTEXT                       │
│                                                                      │
│  ┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐   │
│  │             │     │                  │     │                 │   │
│  │  CLIENTE    │────▶│  CERTILAB WEB    │────▶│  SUPABASE       │   │
│  │  (browser)  │     │  (Next.js 16)    │     │  (Auth + DB +   │   │
│  │             │◀────│                  │◀────│   Storage + RT) │   │
│  └─────────────┘     └────────┬─────────┘     └────────┬────────┘   │
│                               │                         │            │
│                               │                         │            │
│                               ▼                         ▼            │
│                        ┌──────────────┐        ┌──────────────┐      │
│                        │              │        │              │      │
│                        │  TÉCNICO    │        │  ARQUITECTO  │      │
│                        │  (browser)   │        │  (browser)   │      │
│                        │              │        │              │      │
│                        └──────────────┘        └──────────────┘      │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │                   SISTEMAS EXTERNOS                           │    │
│  │                                                               │    │
│  │  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌────────┐  │    │
│  │  │   n8n    │    │  MyPOS   │    │Catastro  │    │  CE3X  │  │    │
│  │  │(webhooks)│    │(payments)│    │(API pub) │    │(motor) │  │    │
│  │  └──────────┘    └──────────┘    └──────────┘    └────────┘  │    │
│  └──────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

## 2.2 Diagrama de componentes (C4 Nivel 2)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CERTILAB — COMPONENT DIAGRAM (C4 L2)                      │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                        NEXT.JS 16 LANDING                            │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────────────┐   │   │
│  │  │  Home    │ │  Blog   │ │ Servicios│ │  PITR   │ │ Observatorio │   │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └──────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                        NEXT.JS 16 PLATFORM                           │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────────────┐   │   │
│  │  │Dashboard │ │Expedites│ │Documentos│ │  Pagos  │ │Configuración │   │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └──────────────┘   │   │
│  └──────────────┬───────────────────────────────────────────────────────┘   │
│                 │                                                            │
│                 ▼                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                    DOMAIN LAYER (src/lib/)                           │   │
│  │                                                                      │   │
│  │  ┌──────────────────────┐  ┌──────────────────┐  ┌──────────────┐   │   │
│  │  │   USE CASES          │  │    SERVICES      │  │  VALIDATORS  │   │   │
│  │  │                      │  │                  │  │              │   │   │
│  │  │ • crearExpediente    │  │ • ExpedienteSvc  │  │ • PagoVal    │   │   │
│  │  │ • procesarPago       │  │ • DocumentoSvc   │  │ • DocVal     │   │   │
│  │  │ • completarPITR      │  │ • PagoSvc        │  │ • PITRVal    │   │   │
│  │  │ • asignarTecnico     │  │ • PITRSvc        │  │ • ClienteVal │   │   │
│  │  │ • enviarDictamen     │  │ • ClienteSvc     │  │              │   │   │
│  │  └──────────────────────┘  └──────────────────┘  └──────────────┘   │   │
│  │                                                                      │   │
│  │  ┌──────────────────────────────────────────────────────────────┐   │   │
│  │  │                     REPOSITORIES                              │   │   │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │   │   │
│  │  │  │Expediente│ │Documento │ │   Pago   │ │   PITR         │ │   │   │
│  │  │  │Repo      │ │Repo      │ │  Repo    │ │   Repo          │ │   │   │
│  │  │  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘ │   │   │
│  │  └──────────────────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                    SUPABASE LAYER                                    │   │
│  │                                                                      │   │
│  │  ┌────────────┐  ┌──────────────────────┐  ┌──────────────────────┐  │   │
│  │  │   AUTH     │  │    POSTGRESQL        │  │    STORAGE           │  │   │
│  │  │            │  │                      │  │                      │  │   │
│  │  │ • users    │  │ • core schema        │  │ • documentos/       │  │   │
│  │  │ • sessions │  │ • auth schema        │  │ • informes/         │  │   │
│  │  │ • JWT      │  │ • billing schema     │  │ • facturas/         │  │   │
│  │  │            │  │ • pitr schema        │  │ • firmas/           │  │   │
│  │  │            │  │ • events schema      │  │                      │  │   │
│  │  │            │  │ • analytics schema   │  │                      │  │   │
│  │  │            │  │ • automation schema  │  │                      │  │   │
│  │  │            │  │ • ai schema          │  │                      │  │   │
│  │  └────────────┘  └──────────────────────┘  └──────────────────────┘  │   │
│  │                      │                                                 │   │
│  │                      ▼                                                 │   │
│  │            ┌────────────────────┐  ┌──────────────────┐               │   │
│  │            │     REALTIME       │  │   EDGE FUNCTIONS │               │   │
│  │            │                    │  │                  │               │   │
│  │            │ • broadcast        │  │ • webhook-mypos  │               │   │
│  │            │ • presence         │  │ • webhook-n8n    │               │   │
│  │            │ • postgres changes │  │ • generate-pdf   │               │   │
│  │            └────────────────────┘  └──────────────────┘               │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                                │
│                              ▼                                                │
│  ┌──────────────┐  ┌──────────────────┐  ┌──────────────────┐               │
│  │   n8n        │  │     MyPOS        │  │  Catastro/CE3X   │               │
│  │  (workflows) │  │   (payments)     │  │  (externals)     │               │
│  └──────────────┘  └──────────────────┘  └──────────────────┘               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 2.3 Diagrama de depliegue (C4 Nivel 3)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        DEPLOYMENT DIAGRAM                                │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    VERCEL (Next.js 16)                           │   │
│  │                                                                  │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │   │
│  │  │ Landing Pages│  │  Platform    │  │  API Routes  │           │   │
│  │  │ (SSG/ISR)    │  │  (SSR)       │  │  (serverless)│           │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘           │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    SUPABASE (Managed Cloud)                       │   │
│  │                                                                  │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │   │
│  │  │ PostgreSQL 16│  │   Storage    │  │  Edge Func.  │           │   │
│  │  │ (PITR: 7d)   │  │  (S3 compat) │  │  (Deno)      │           │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘           │   │
│  │                                                                  │   │
│  │  ┌──────────────┐  ┌──────────────┐                              │   │
│  │  │   Realtime   │  │   Auth       │                              │   │
│  │  │  (WebSocket) │  │  (GoTrue)    │                              │   │
│  │  └──────────────┘  └──────────────┘                              │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    n8N (Self-hosted)                              │   │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐  │   │
│  │  │ Workflow:        │  │ Workflow:        │  │ Workflow:      │  │   │
│  │  │ Pago confirmado  │  │ Expediente       │  │ Email          │  │   │
│  │  │ → crear exp.     │  │ próximo a vencer │  │ recordatorio   │  │   │
│  │  └──────────────────┘  └──────────────────┘  └────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    MYPOS (External)                               │   │
│  │  ┌────────────────────────────────────────────────────────────┐  │   │
│  │  │  Payment Gateway → Webhook → Supabase Edge Function        │  │   │
│  │  └────────────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

# 3. FLUJO AUTENTICACIÓN

## 3.1 Flujo completo de login

```
CLIENTE                    NEXT.JS                          SUPABASE
  │                          │                                │
  │  1. POST /saas/login     │                                │
  │  {email, password} ─────▶│                                │
  │                          │  2. supabase.auth.signInWith   │
  │                          │     Password({email, password})│
  │                          │ ───────────────────────────────▶
  │                          │                                │
  │                          │  3. Validar credenciales       │
  │                          │  4. JWT + refresh token        │
  │                          │◀───────────────────────────────│
  │                          │                                │
  │                          │  5. Obtener rol desde          │
  │                          │     usuario.rol (BD pública)   │
  │                          │                                │
  │                          │  6. Establecer cookies:        │
  │                          │     • supabase-auth-token      │
  │                          │     • rol (httpOnly)           │
  │                          │                                │
  │  7. Redirect /dashboard ◀─│                                │
  │                          │                                │
```

## 3.2 Middleware de autenticación

```typescript
// src/middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Rutas protegidas
  const protectedPaths = [
    "/dashboard",
    "/mis-expedientes",
    "/backoffice",
    "/nuevo-expediente",
    "/configuracion",
    "/profile",
  ];

  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/saas/login";
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Redirigir a login si ya autenticado
  if (user && request.nextUrl.pathname === "/saas/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon|api/auth|robots|sitemap).*)",
  ],
};
```

## 3.3 JWT y claims personalizados

```typescript
// Configuración en Supabase Dashboard > Auth > Settings > JWT
// Custom claims añadidos via trigger SQL:

/*
CREATE OR REPLACE FUNCTION auth.custom_claims()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  claims jsonb;
BEGIN
  SELECT jsonb_build_object(
    'rol', u.rol,
    'empresa_id', u.empresa_id,
    'empresa_slug', e.slug
  )
  INTO claims
  FROM auth.usuario u
  JOIN core.empresa e ON e.id = u.empresa_id
  WHERE u.auth_user_id = auth.uid();
  
  RETURN claims;
END;
$$;
*/
```

## 3.4 Registro de usuario nuevo

```
1. Cliente completa formulario de registro
2. Server Action llama a supabase.auth.signUp({email, password})
3. Supabase crea auth.users + envía email de confirmación
4. Trigger AFTER INSERT ON auth.users crea registro en auth.usuario
5. Cliente verifica email
6. Primer login → middleware redirige a onboarding
```

**Trigger de sincronización:**

```sql
-- Función: sincronizar auth.users → auth.usuario
CREATE OR REPLACE FUNCTION auth.sync_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO auth.usuario (
    id,
    empresa_id,
    auth_user_id,
    email,
    nombre,
    rol,
    activo,
    created_by
  ) VALUES (
    gen_random_uuid(),
    (SELECT id FROM core.empresa LIMIT 1), -- empresa por defecto
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nombre', 'Usuario'),
    'cliente',
    true,
    (SELECT id FROM auth.usuario WHERE rol = 'admin' LIMIT 1)
  );
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION auth.sync_user();
```

## 3.5 Matriz de autenticación

| Ruta | Middleware | Auth | RLS | Rol mínimo |
|------|-----------|------|-----|-----------|
| `/` | ❌ | ❌ | ❌ | Público |
| `/blog/*` | ❌ | ❌ | ❌ | Público |
| `/saas/login` | ❌ | ❌ | ❌ | Público |
| `/saas/register` | ❌ | ❌ | ❌ | Público |
| `/dashboard` | ✅ | ✅ | ✅ | cliente |
| `/mis-expedientes` | ✅ | ✅ | ✅ | cliente |
| `/nuevo-expediente` | ✅ | ✅ | ✅ | cliente |
| `/backoffice/*` | ✅ | ✅ | ✅ | backoffice |
| `/configuracion` | ✅ | ✅ | ✅ | tecnico |
| `/api/*` | ✅ | ✅ | ✅ | según endpoint |

---

# 4. FLUJO EXPEDIENTE

## 4.1 Ciclo de vida completo

```
PAGO_PENDIENTE ──→ PAGO_RECIBIDO ──→ EXPEDIENTE_CREADO ──→ ESPERANDO_INFORMACION
      │                  │                  │                       │
      │                  │                  │                       │
      ▼                  ▼                  ▼                       ▼
  CANCELADO          CANCELADO          CANCELADO              PENDIENTE_DOC
                                                                 PENDIENTE_CLIENTE
                                                                     │
                                                                     ▼
                                                              INFORMACION_RECIBIDA
                                                                     │
                                                                     ▼
                                                               EN_REVISION ──→ RECHAZADO
                                                                     │
                                                                     ▼
                                                              INFORME_ENVIADO ──→ CANCELADO
                                                                     │
                                                                     ▼
                                                                CERRADO
```

## 4.2 Flujo de creación de expediente (con Supabase)

```
CLIENTE                  SERVER ACTION                    SUPABASE                  n8n
  │                          │                              │                       │
  │ 1. POST /api/expediente  │                              │                       │
  │   crearExpediente()      │                              │                       │
  │──────────────────────────▶│                              │                       │
  │                          │                              │                       │
  │                          │ 2. Validar datos             │                       │
  │                          │ 3. Iniciar transacción       │                       │
  │                          │                              │                       │
  │                          │ 4. INSERT expediente         │                       │
  │                          │    (con RLS: empresa_id)     │                       │
  │                          │─────────────────────────────▶│                       │
  │                          │                              │                       │
  │                          │ 5. INSERT actividad          │                       │
  │                          │    (tipo: EXPEDIENTE.CREADO) │                       │
  │                          │─────────────────────────────▶│                       │
  │                          │                              │                       │
  │                          │ 6. COMMIT                    │                       │
  │                          │                              │                       │
  │                          │ 7. Publicar evento Realtime  │                       │
  │                          │─────────────────────────────▶│                       │
  │                          │                              │ 8. Webhook expediente │
  │                          │                              │    creado             │
  │                          │                              │──────────────────────▶│
  │                          │                              │                       │
  │ 9. Redirect              │                              │                       │
  │   /mis-expedientes/{id} ◀─│                              │                       │
  │                          │                              │                       │
```

## 4.3 Código del Use Case

```typescript
// src/lib/domain/use-cases/expediente/crear-expediente.ts
import { createClient } from "@/lib/supabase/server";
import { ExpedienteRepository } from "@/lib/domain/repositories/expediente-repository";
import { ActividadRepository } from "@/lib/domain/repositories/actividad-repository";
import { EventBus } from "@/lib/events/event-bus";

interface CrearExpedienteInput {
  clienteId: string;
  inmuebleId: string;
  servicioId: string;
  fechaLimite: Date;
  notas?: string;
}

interface CrearExpedienteResult {
  expedienteId: string;
  numeroVisible: string;
}

export async function crearExpedienteUseCase(
  input: CrearExpedienteInput,
  usuarioId: string
): Promise<CrearExpedienteResult> {
  const supabase = await createClient();
  const expedienteRepo = new ExpedienteRepository(supabase);
  const actividadRepo = new ActividadRepository(supabase);
  const eventBus = new EventBus(supabase);

  // 1. Validar que el servicio existe y tiene precio
  const servicio = await expedienteRepo.obtenerServicio(input.servicioId);
  if (!servicio) throw new Error("SERVICIO_NO_ENCONTRADO");

  // 2. Generar número de expediente visible
  const numeroVisible = await expedienteRepo.generarNumeroVisible();

  // 3. Crear expediente (INSERT con RLS)
  const expediente = await expedienteRepo.crear({
    numeroVisible,
    clienteId: input.clienteId,
    inmuebleId: input.inmuebleId,
    servicioId: input.servicioId,
    estado: "EXPEDIENTE_CREADO",
    fechaLimite: input.fechaLimite,
    fechaInicio: new Date(),
    prioridad: "media",
    notas: input.notas,
    creadoPor: usuarioId,
  });

  // 4. Registrar actividad
  await actividadRepo.registrar({
    expedienteId: expediente.id,
    usuarioId,
    tipo: "EXPEDIENTE.CREADO",
    datos: { input },
  });

  // 5. Publicar evento
  await eventBus.publicar({
    tipo: "EXPEDIENTE.CREADO",
    expedienteId: expediente.id,
    datos: { numeroVisible, servicio },
  });

  return {
    expedienteId: expediente.id,
    numeroVisible,
  };
}
```

## 4.4 Server Action

```typescript
// src/app/(plataforma)/nuevo-expediente/actions.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { crearExpedienteUseCase } from "@/lib/domain/use-cases/expediente/crear-expediente";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function actionCrearExpediente(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("NO_AUTENTICADO");

  const result = await crearExpedienteUseCase(
    {
      clienteId: formData.get("clienteId") as string,
      inmuebleId: formData.get("inmuebleId") as string,
      servicioId: formData.get("servicioId") as string,
      fechaLimite: new Date(formData.get("fechaLimite") as string),
      notas: formData.get("notas") as string | undefined,
    },
    user.id
  );

  revalidatePath("/backoffice/expedientes");
  redirect(`/backoffice/expedientes/${result.expedienteId}`);
}
```

---

# 5. FLUJO DOCUMENTOS

## 5.1 Subida de documentos

```
CLIENTE/TÉCNICO         SERVER ACTION              SUPABASE STORAGE            SUPABASE DB
      │                      │                           │                        │
      │ 1. Seleccionar archivo│                          │                        │
      │ 2. POST documento     │                          │                        │
      │    con FormData       │                          │                        │
      │──────────────────────▶│                          │                        │
      │                      │                          │                        │
      │                      │ 3. Validar tipo MIME     │                        │
      │                      │ 4. Generar hash SHA-256  │                        │
      │                      │                          │                        │
      │                      │ 5. upload file           │                        │
      │                      │─────────────────────────▶│                        │
      │                      │                          │                        │
      │                      │ 6. Obtener public URL    │                        │
      │                      │◀─────────────────────────│                        │
      │                      │                          │                        │
      │                      │ 7. INSERT documento      │                        │
      │                      │ (tipo, storage_path,     │                        │
      │                      │  hash, expediente_id)    │                        │
      │                      │─────────────────────────────────────────────────▶│
      │                      │                          │                        │
      │ 8. Resultado ◀───────│                          │                        │
      │                      │                          │                        │
```

## 5.2 Estructura de carpetas en Storage

```
/documentos/
  /{expediente_id}/
    /{documento_id}/
      /v1/
        certificado-original.pdf
      /v2/
        certificado-corregido.pdf

/informes/
  /{expediente_id}/
    /v1/
        dictamen-tecnico.pdf
    /v2/
        dictamen-revisado.pdf

/facturas/
  /{pago_id}/
    factura-2026-0001.pdf

/firmas/
  /{expediente_id}/
    firma-cliente.png
    firma-tecnico.png

/temp/
  /{session_id}/
    archivo-temporal.pdf
```

## 5.3 Patrón de subida seguro

```typescript
// src/lib/domain/use-cases/documento/subir-documento.ts
export async function subirDocumentoUseCase(
  input: {
    expedienteId: string;
    tipo: TipoDocumento;
    archivo: File;
    usuarioId: string;
  },
  supabase: SupabaseClient
): Promise<Documento> {
  // 1. Validar tipo y tamaño
  validarDocumento(input.archivo, input.tipo);

  // 2. Generar hash para detección de duplicados
  const hash = await generarHash(input.archivo);

  // 3. Verificar que no existe ya (mismo hash, mismo expediente)
  const existente = await documentoRepo.buscarPorHash(
    input.expedienteId,
    hash
  );
  if (existente) throw new Error("DOCUMENTO_DUPLICADO");

  // 4. Subir a Storage
  const storagePath = construirRuta(
    input.expedienteId,
    input.tipo,
    hash
  );

  const { error: uploadError } = await supabase.storage
    .from("documentos")
    .upload(storagePath, input.archivo, {
      cacheControl: "3600",
      upsert: false,
      contentType: input.archivo.type,
    });

  if (uploadError) throw new Error("ERROR_SUBIDA_STORAGE");

  // 5. Insertar registro en BD
  const documento = await documentoRepo.crear({
    expedienteId: input.expedienteId,
    tipo: input.tipo,
    nombre: input.archivo.name,
    mimeType: input.archivo.type,
    tamanoBytes: input.archivo.size,
    storagePath,
    hash,
    version: 1,
    creadoPor: input.usuarioId,
  });

  // 6. Publicar evento
  await eventBus.publicar({
    tipo: "DOCUMENTO.SUBIDO",
    expedienteId: input.expedienteId,
    datos: { documentoId: documento.id, tipo: input.tipo },
  });

  return documento;
}
```

## 5.4 RLS para Storage

```sql
-- Los documentos son accesibles solo por:
-- • El cliente propietario del expediente
-- • El técnico asignado
-- • Backoffice/Admin

CREATE POLICY "clientes_leer_sus_documentos" ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'documentos'
    AND EXISTS (
      SELECT 1 FROM core.expediente e
      JOIN auth.usuario u ON u.id = auth.uid()
      WHERE e.id = SPLIT_PART(name, '/', 2)::uuid
      AND (
        e.cliente_id IN (SELECT cliente.id FROM core.cliente WHERE cliente.usuario_id = u.id)
        OR e.tecnico_asignado_id = u.id
        OR u.rol IN ('admin', 'backoffice')
      )
    )
  );

CREATE POLICY "tecnicos_subir_documentos" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'documentos'
    AND EXISTS (
      SELECT 1 FROM core.expediente e
      JOIN auth.usuario u ON u.id = auth.uid()
      WHERE e.id = SPLIT_PART(name, '/', 2)::uuid
      AND e.tecnico_asignado_id = u.id
    )
  );
```

---

# 6. FLUJO PAGOS

## 6.1 Integración completa MyPOS → Supabase

```
CLIENTE               NEXT.JS                  SUPABASE                   MYPOS                n8n
  │                     │                         │                        │                   │
  │ 1. Seleccionar      │                         │                        │                   │
  │    servicio         │                         │                        │                   │
  │────────────────────▶│                         │                        │                   │
  │                     │                         │                        │                   │
  │                     │ 2. Crear PAGO           │                        │                   │
  │                     │    INSERT pago          │                        │                   │
  │                     │    (PENDIENTE)          │                        │                   │
  │                     │────────────────────────▶│                        │                   │
  │                     │                         │                        │                   │
  │ 3. Link de pago ◀──│                         │                        │                   │
  │                     │ 4. Solicitar link       │                        │                   │
  │                     │────────────────────────────────────────────────▶│                   │
  │                     │                         │                        │                   │
  │                     │ 5. URL de pago ◀────────│                        │                   │
  │                     │                         │                        │                   │
  │ 6. Redirect to MyPOS│                         │                        │                   │
  │──────────────────────────────────────────────────────────────────────▶│                   │
  │                     │                         │                        │                   │
  │                     │                         │                        │ 7. Pago completado │
  │                     │                         │                        │    Webhook POST    │
  │                     │                         │◀───────────────────────│                   │
  │                     │                         │                        │                   │
  │                     │                         │ 8. Edge Function       │                   │
  │                     │                         │    webhook-mypos       │                   │
  │                     │                         │    - Verificar firma   │                   │
  │                     │                         │    - Actualizar pago   │                   │
  │                     │                         │    - INSERT actividad  │                   │
  │                     │                         │                        │                   │
  │                     │                         │ 9. Publicar Realtime   │                   │
  │                     │                         │    (PAGO.COMPLETADO)   │                   │
  │                     │                         │                        │                   │
  │                     │                         │                        │ 10. n8n trigger    │
  │                     │                         │───────────────────────────────────────────▶│
  │                     │                         │                        │                   │
  │ 11. UI se actualiza │                         │                        │                   │
  │     en tiempo real  │                         │                        │                   │
```

## 6.2 Edge Function: webhook-mypos

```typescript
// supabase/functions/webhook-mypos/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface MyPOSWebhook {
  TransactionID: string;
  Status: string;
  Amount: number;
  Currency: string;
  Signature: string;
  CustomParameters?: Record<string, string>;
}

serve(async (req) => {
  // 1. Verificar método
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // 2. Verificar firma MyPOS
  const payload: MyPOSWebhook = await req.json();
  const signature = req.headers.get("X-MyPOS-Signature");

  if (!verificarFirmaMyPOS(payload, signature)) {
    return new Response("Invalid signature", { status: 401 });
  }

  // 3. Obtener admin client (Service Role)
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // 4. Buscar pago por proveedor_pago_id
  const { data: pago } = await supabase
    .from("billing.pago")
    .select("*")
    .eq("proveedor_pago_id", payload.TransactionID)
    .single();

  if (!pago) {
    return new Response("Pago no encontrado", { status: 404 });
  }

  // 5. Actualizar estado según MyPOS status
  const nuevoEstado = mapearEstadoMyPOS(payload.Status);

  await supabase
    .from("billing.pago")
    .update({
      estado: nuevoEstado,
      fecha_pago: payload.Status === "SUCCESS" ? new Date().toISOString() : null,
      webhook_recibido: true,
      webhook_payload: payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", pago.id);

  // 6. Si pago completado, insertar actividad
  if (nuevoEstado === "COMPLETADO") {
    await supabase.from("events.actividad").insert({
      empresa_id: pago.empresa_id,
      expediente_id: pago.expediente_id,
      usuario_id: pago.created_by,
      tipo: "PAGO.COMPLETADO",
      datos: { proveedor: "mypos", importe: payload.Amount },
    });
  }

  return new Response("OK", { status: 200 });
});

function verificarFirmaMyPOS(
  payload: MyPOSWebhook,
  signature: string | null
): boolean {
  // Implementar verificación HMAC-SHA256 con secret key de MyPOS
  return true; // Placeholder
}

function mapearEstadoMyPOS(status: string): string {
  const mapa: Record<string, string> = {
    SUCCESS: "COMPLETADO",
    FAILED: "RECHAZADO",
    PENDING: "PROCESANDO",
    REFUND: "REEMBOLSADO",
    CANCELED: "CANCELADO",
  };
  return mapa[status] || "PENDIENTE";
}
```

## 6.3 Repositorio de pagos

```typescript
// src/lib/domain/repositories/pago-repository.ts
import { SupabaseClient } from "@supabase/supabase-js";

interface CrearPagoInput {
  expedienteId: string;
  servicioId: string;
  importe: number;
  proveedor: "mypos" | "stripe" | "transferencia";
  creadoPor: string;
}

export class PagoRepository {
  constructor(private supabase: SupabaseClient) {}

  async crear(input: CrearPagoInput) {
    const { data, error } = await this.supabase
      .from("billing.pago")
      .insert({
        expediente_id: input.expedienteId,
        servicio_id: input.servicioId,
        importe: input.importe,
        proveedor: input.proveedor,
        estado: "PENDIENTE",
        created_by: input.creadoPor,
      })
      .select()
      .single();

    if (error) throw new Error(`ERROR_CREAR_PAGO: ${error.message}`);
    return data;
  }

  async obtenerPorId(id: string) {
    const { data, error } = await this.supabase
      .from("billing.pago")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(`ERROR_OBTENER_PAGO: ${error.message}`);
    return data;
  }

  async obtenerPorExpediente(expedienteId: string) {
    const { data, error } = await this.supabase
      .from("billing.pago")
      .select("*")
      .eq("expediente_id", expedienteId)
      .order("created_at", { ascending: false });

    if (error) throw new Error(`ERROR_OBTENER_PAGOS: ${error.message}`);
    return data;
  }

  async actualizarEstado(
    id: string,
    estado: string,
    proveedorPagoId?: string
  ) {
    const { data, error } = await this.supabase
      .from("billing.pago")
      .update({
        estado,
        proveedor_pago_id: proveedorPagoId,
        fecha_pago: estado === "COMPLETADO" ? new Date().toISOString() : undefined,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`ERROR_ACTUALIZAR_PAGO: ${error.message}`);
    return data;
  }
}
```

## 6.4 Servicio de pagos

```typescript
// src/lib/domain/services/pago-service.ts
export class PagoService {
  constructor(
    private pagoRepo: PagoRepository,
    private expedienteRepo: ExpedienteRepository,
    private eventBus: EventBus
  ) {}

  async iniciarPago(input: {
    expedienteId: string;
    usuarioId: string;
  }) {
    const expediente = await this.expedienteRepo.obtenerPorId(
      input.expedienteId
    );

    const pago = await this.pagoRepo.crear({
      expedienteId: input.expedienteId,
      servicioId: expediente.servicio_id,
      importe: expediente.precio, // del servicio
      proveedor: "mypos",
      creadoPor: input.usuarioId,
    });

    // Solicitar link de pago a MyPOS (vía API)
    const linkPago = await solicitarLinkMyPOS({
      importe: pago.importe,
      pagoId: pago.id,
      expedienteId: input.expedienteId,
      email: expediente.email_cliente,
    });

    await this.pagoRepo.actualizarLink(pago.id, linkPago.url);

    return { pagoId: pago.id, linkPago: linkPago.url };
  }
}
```

---

# 7. FLUJO PITR

## 7.1 Ciclo completo de inspección

```
TÉCNICO               NEXT.JS                    SUPABASE DB               SUPABASE STORAGE
  │                      │                          │                          │
  │ 1. Accede al PITR    │                          │                          │
  │─────────────────────▶│                          │                          │
  │                      │                          │                          │
  │                      │ 2. Cargar template       │                          │
  │                      │   (plantilla_pitr +      │                          │
  │                      │    secciones + preguntas) │                          │
  │                      │─────────────────────────▶│                          │
  │                      │                          │                          │
  │ 3. Renderizar UI ◀──│                          │                          │
  │                      │                          │                          │
  │ 4. Responder         │                          │                          │
  │    preguntas         │                          │                          │
  │─────────────────────▶│                          │                          │
  │                      │                          │                          │
  │                      │ 5. Auto-save (cada 30s)  │                          │
  │                      │   UPSERT respuesta_pitr  │                          │
  │                      │─────────────────────────▶│                          │
  │                      │                          │                          │
  │ 6. Subir fotos       │                          │                          │
  │─────────────────────▶│                          │                          │
  │                      │ 7. Upload a Storage      │                          │
  │                      │   /documentos/{exp}/foto │                          │
  │                      │──────────────────────────────────────────────────▶│
  │                      │                          │                          │
  │ 8. Firmar            │                          │                          │
  │─────────────────────▶│                          │                          │
  │                      │ 9. Upload firma + UPDATE │                          │
  │                      │    respuesta_pitr        │                          │
  │                      │─────────────────────────▶│                          │
  │                      │                          │                          │
  │10. Completar PITR    │                          │                          │
  │─────────────────────▶│                          │                          │
  │                      │11. UPDATE expediente     │                          │
  │                      │    estado → EN_REVISION  │                          │
  │                      │─────────────────────────▶│                          │
  │                      │                          │                          │
  │12. Confirmación ◀───│                          │                          │
```

## 7.2 Repositorio PITR

```typescript
// src/lib/domain/repositories/pitr-repository.ts
export class PitrRepository {
  constructor(private supabase: SupabaseClient) {}

  async obtenerTemplate(slug: string) {
    const { data, error } = await this.supabase
      .from("pitr.plantilla_pitr")
      .select(`
        *,
        secciones:pitr.seccion_pitr(
          *,
          preguntas:pitr.pregunta_pitr(*)
        )
      `)
      .eq("slug", slug)
      .eq("activa", true)
      .single();

    if (error) throw new Error(`ERROR_TEMPLATE: ${error.message}`);
    return data;
  }

  async obtenerRespuesta(expedienteId: string) {
    const { data, error } = await this.supabase
      .from("pitr.respuesta_pitr")
      .select("*")
      .eq("expediente_id", expedienteId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows
      throw new Error(`ERROR_RESPUESTA: ${error.message}`);
    }
    return data;
  }

  async guardarRespuesta(input: {
    expedienteId: string;
    plantillaId: string;
    respuestas: Record<string, unknown>;
    progreso: number;
    usuarioId: string;
  }) {
    const existente = await this.obtenerRespuesta(input.expedienteId);

    if (existente) {
      const { data, error } = await this.supabase
        .from("pitr.respuesta_pitr")
        .update({
          respuestas: input.respuestas,
          progreso: input.progreso,
          updated_at: new Date().toISOString(),
        })
        .eq("expediente_id", input.expedienteId)
        .select()
        .single();

      if (error) throw new Error(`ERROR_UPDATE_RESPUESTA: ${error.message}`);
      return data;
    } else {
      const { data, error } = await this.supabase
        .from("pitr.respuesta_pitr")
        .insert({
          expediente_id: input.expedienteId,
          plantilla_id: input.plantillaId,
          respuestas: input.respuestas,
          progreso: input.progreso,
          estado: "EN_PROGRESO",
          created_by: input.usuarioId,
        })
        .select()
        .single();

      if (error) throw new Error(`ERROR_INSERT_RESPUESTA: ${error.message}`);
      return data;
    }
  }
}
```

---

# 8. FLUJO IA

## 8.1 Arquitectura de integración con IA

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FLUJO IA COMPLETO                            │
│                                                                     │
│  TÉCNICO                   NEXT.JS                  SUPABASE        │
│    │                         │                        │             │
│    │ 1. Solicitar análisis   │                        │             │
│    │    de certificado       │                        │             │
│    │────────────────────────▶│                        │             │
│    │                         │                        │             │
│    │                         │ 2. INSERT              │             │
│    │                         │    prediccion_ia       │             │
│    │                         │    (PENDIENTE)         │             │
│    │                         │────────────────────────▶             │
│    │                         │                        │             │
│    │                         │ 3. Publicar mensaje    │             │
│    │                         │    Realtime (broadcast)│             │
│    │                         │────────────────────────▶             │
│    │                         │                        │             │
│    │                         │ 4. Edge Function       │             │
│    │                         │    procesar-prediccion │             │
│    │                         │    (escucha Realtime)  │             │
│    │                         │◀───────────────────────│             │
│    │                         │                        │             │
│    │                         │ 5. Llamar a API OpenAI │             │
│    │                         │    (desde Edge Func.)  │             │
│    │                         │                        │             │
│    │                         │ 6. Procesar respuesta  │             │
│    │                         │                        │             │
│    │                         │ 7. UPDATE              │             │
│    │                         │    prediccion_ia       │             │
│    │                         │    (COMPLETADA)        │             │
│    │                         │────────────────────────▶             │
│    │                         │                        │             │
│    │                         │ 8. Realtime broadcast  │             │
│    │                         │    (resultado listo)   │             │
│    │                         │────────────────────────▶             │
│    │ 9. UI se actualiza ◀───│                        │             │
│    │    en tiempo real       │                        │             │
│    │                         │                        │             │
└─────────────────────────────────────────────────────────────────────┘
```

## 8.2 Edge Function: procesar-prediccion

```typescript
// supabase/functions/procesar-prediccion/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import OpenAI from "https://esm.sh/openai@4";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { prediccionId } = await req.json();

  // 1. Obtener predicción pendiente
  const { data: prediccion } = await supabase
    .from("ai.prediccion_ia")
    .select("*, prompt:ai.prompt_ia(*)")
    .eq("id", prediccionId)
    .single();

  if (!prediccion || prediccion.estado !== "PENDIENTE") {
    return new Response("No pendiente", { status: 400 });
  }

  // 2. Llamar a OpenAI
  const openai = new OpenAI({
    apiKey: Deno.env.get("OPENAI_API_KEY")!,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: prediccion.prompt.contenido },
      { role: "user", content: prediccion.datos_entrada },
    ],
    temperature: 0.3,
  });

  // 3. Guardar resultado
  await supabase
    .from("ai.prediccion_ia")
    .update({
      resultado: completion.choices[0].message.content,
      modelo: "gpt-4o",
      tokens_usados: completion.usage?.total_tokens,
      estado: "COMPLETADA",
      tiempo_procesamiento_ms: performance.now(),
    })
    .eq("id", prediccionId);

  // 4. Registrar auditoría
  await supabase.from("ai.auditoria_ia").insert({
    prediccion_id: prediccionId,
    accion: "PREDICCION_COMPLETADA",
    usuario_id: prediccion.created_by,
    metadata: {
      modelo: "gpt-4o",
      tokens: completion.usage?.total_tokens,
    },
  });

  return new Response("OK", { status: 200 });
});
```

---

# 9. STORAGE

## 9.1 Buckets de Storage

| Bucket | Visibilidad | Tamaño máx. | Archivos permitidos | Propósito |
|--------|------------|-------------|-------------------|-----------|
| `documentos` | Privado (RLS) | 50 MB | PDF, PNG, JPG, XML | Documentos de expedientes |
| `informes` | Privado (RLS) | 50 MB | PDF | Informes técnicos |
| `facturas` | Privado (RLS) | 10 MB | PDF | Facturas |
| `firmas` | Privado (RLS) | 5 MB | PNG | Firmas digitales |
| `temp` | Privado (RLS) | 10 MB | Según tipo | Archivos temporales |
| `public` | Público | 5 MB | PNG, JPG, SVG | Assets públicos |

## 9.2 Políticas de Storage

```sql
-- ============================================
-- BUCKET: documentos
-- ============================================

-- SELECT: solo usuarios autorizados del expediente
CREATE POLICY "documentos_select" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'documentos'
    AND EXISTS (
      SELECT 1 FROM core.expediente e
      JOIN auth.usuario u ON u.id = auth.uid()
      WHERE e.id = SPLIT_PART(name, '/', 2)::uuid
      AND (
        e.cliente_id IN (
          SELECT c.id FROM core.cliente c WHERE c.usuario_id = u.id
        )
        OR e.tecnico_asignado_id = u.id
        OR u.rol IN ('admin', 'backoffice')
      )
    )
  );

-- INSERT: técnico asignado o admin
CREATE POLICY "documentos_insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'documentos'
    AND EXISTS (
      SELECT 1 FROM core.expediente e
      JOIN auth.usuario u ON u.id = auth.uid()
      WHERE e.id = SPLIT_PART(name, '/', 2)::uuid
      AND (
        e.tecnico_asignado_id = u.id
        OR u.rol IN ('admin', 'backoffice')
      )
    )
  );

-- DELETE: solo admin
CREATE POLICY "documentos_delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'documentos'
    AND EXISTS (
      SELECT 1 FROM auth.usuario u
      WHERE u.id = auth.uid() AND u.rol = 'admin'
    )
  );
```

## 9.3 Generación de URLs firmadas

```typescript
// src/lib/domain/services/documento-service.ts
export class DocumentoService {
  async obtenerUrlDescarga(documentoId: string, usuarioId: string) {
    // Verificar permisos via RLS
    const documento = await this.documentoRepo.obtenerPorId(documentoId);
    if (!documento) throw new Error("DOCUMENTO_NO_ENCONTRADO");

    // Generar URL firmada (expira en 1 hora)
    const { data, error } = await this.supabase.storage
      .from("documentos")
      .createSignedUrl(documento.storage_path, 3600);

    if (error) throw new Error("ERROR_URL_FIRMADA");
    return data.signedUrl;
  }
}
```

---

# 10. RLS

## 10.1 Filosofía de RLS

**RLS es la última línea de defensa, no la única.** Cada capa (middleware, server action, repository) también verifica permisos. Pero RLS garantiza que incluso si una capa falla, el dato está protegido a nivel de base de datos.

**Reglas RLS:**

1. **Por defecto: DENY** — Todo acceso denegado hasta que una política explícita lo permita
2. **Basado en empresa_id** — Todos los datos están aislados por empresa
3. **Basado en rol** — El rol del usuario (admin, tecnico, backoffice, cliente) determina qué puede ver
4. **Basado en asignación** — Técnicos solo ven expedientes asignados; clientes solo los suyos

## 10.2 Esquemas de RLS

```sql
-- ============================================
-- SCHEMA: core
-- ============================================

-- TABLA: expediente
ALTER TABLE core.expediente ENABLE ROW LEVEL SECURITY;

-- Admin: todo
CREATE POLICY "expediente_admin_all" ON core.expediente
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.usuario u
      WHERE u.id = auth.uid() AND u.rol = 'admin'
    )
  );

-- Técnico: expedientes asignados
CREATE POLICY "expediente_tecnico_read" ON core.expediente
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.usuario u
      WHERE u.id = auth.uid() AND u.rol = 'tecnico'
      AND expediente.tecnico_asignado_id = u.id
    )
  );

CREATE POLICY "expediente_tecnico_write" ON core.expediente
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM auth.usuario u
      WHERE u.id = auth.uid() AND u.rol = 'tecnico'
      AND expediente.tecnico_asignado_id = u.id
    )
  );

-- Backoffice: todos los expedientes (solo lectura + update no crítico)
CREATE POLICY "expediente_backoffice_read" ON core.expediente
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.usuario u
      WHERE u.id = auth.uid() AND u.rol = 'backoffice'
    )
  );

CREATE POLICY "expediente_backoffice_write" ON core.expediente
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM auth.usuario u
      WHERE u.id = auth.uid() AND u.rol = 'backoffice'
    )
  );

-- Cliente: solo sus expedientes
CREATE POLICY "expediente_cliente_read" ON core.expediente
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.usuario u
      JOIN core.cliente c ON c.usuario_id = u.id
      WHERE u.id = auth.uid() AND u.rol = 'cliente'
      AND expediente.cliente_id = c.id
    )
  );

-- ============================================
-- SCHEMA: billing
-- ============================================
ALTER TABLE billing.pago ENABLE ROW LEVEL SECURITY;

-- Solo admin y backoffice ven datos financieros
CREATE POLICY "pago_admin_all" ON billing.pago
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.usuario u
      WHERE u.id = auth.uid() AND u.rol = 'admin'
    )
  );

CREATE POLICY "pago_backoffice_read" ON billing.pago
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.usuario u
      WHERE u.id = auth.uid() AND u.rol = 'backoffice'
    )
  );

-- Cliente solo ve sus pagos (sin datos de comisión)
CREATE POLICY "pago_cliente_read" ON billing.pago
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.usuario u
      JOIN core.expediente e ON e.cliente_id IN (
        SELECT c.id FROM core.cliente c WHERE c.usuario_id = u.id
      )
      WHERE u.id = auth.uid() AND u.rol = 'cliente'
      AND pago.expediente_id = e.id
    )
  );

-- ============================================
-- SCHEMA: events
-- ============================================
ALTER TABLE events.actividad ENABLE ROW LEVEL SECURITY;

-- Las actividades son append-only (INSERT) y select-only
CREATE POLICY "actividad_insert" ON events.actividad
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.usuario u
      WHERE u.id = auth.uid()
    )
  );

CREATE POLICY "actividad_select" ON events.actividad
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.usuario u
      WHERE u.id = auth.uid()
      AND (
        u.rol IN ('admin', 'backoffice', 'tecnico')
        OR actividad.expediente_id IN (
          SELECT e.id FROM core.expediente e
          JOIN core.cliente c ON c.id = e.cliente_id
          WHERE c.usuario_id = u.id
        )
      )
    )
  );

-- DENY update y delete (política por defecto)
CREATE POLICY "actividad_no_update" ON events.actividad
  FOR UPDATE
  USING (false);

CREATE POLICY "actividad_no_delete" ON events.actividad
  FOR DELETE
  USING (false);
```

## 10.3 Helper para queries con RLS

```typescript
// src/lib/supabase/rls-helper.ts
/**
 * Helper para asegurar que las queries usan RLS correctamente
 * Añade automáticamente filtros de empresa_id cuando corresponde
 */

export function withEmpresaFilter<T extends Record<string, unknown>>(
  query: T,
  empresaId?: string
): T {
  if (!empresaId) return query;

  return {
    ...query,
    empresa_id: empresaId,
  };
}

/**
 * Función para obtener el usuario actual y su empresa
 */
export async function getCurrentUser(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("NO_AUTENTICADO");

  const { data: usuario } = await supabase
    .from("auth.usuario")
    .select("*, empresa:core.empresa(*)")
    .eq("auth_user_id", user.id)
    .single();

  return usuario;
}
```

---

# 11. REPOSITORIES

## 11.1 Patrón Repository

Cada entidad tiene su propio repositorio. Todos los repositorios siguen el mismo contrato:

```typescript
// src/lib/domain/repositories/base-repository.ts
export interface IRepository<T> {
  obtenerPorId(id: string): Promise<T | null>;
  listar(filtros?: FilterParams): Promise<T[]>;
  crear(input: CreateInput<T>): Promise<T>;
  actualizar(id: string, input: UpdateInput<T>): Promise<T>;
  eliminar(id: string): Promise<void>; // soft delete
}
```

## 11.2 Catálogo de repositorios

| Repositorio | Schema | Métodos principales |
|------------|--------|-------------------|
| `EmpresaRepository` | `core.empresa` | obtenerPorSlug, actualizarConfig |
| `UsuarioRepository` | `auth.usuario` | obtenerPorAuthId, listarPorRol, crear, actualizarRol |
| `ClienteRepository` | `core.cliente` | buscarPorEmail, crear, actualizar, listarPorEmpresa |
| `InmuebleRepository` | `core.inmueble` | buscarPorCatastro, crear, listarPorCliente |
| `ServicioRepository` | `core.servicio` | listarActivos, obtenerPorSlug |
| `ExpedienteRepository` | `core.expediente` | crear, cambiarEstado, asignarTecnico, listarPorCliente, listarPorTecnico, listarTodos, generarNumeroVisible |
| `DocumentoRepository` | `core.documento` | crear, buscarPorHash, listarPorExpediente, obtenerUrlDescarga |
| `PagoRepository` | `billing.pago` | crear, obtenerPorProveedorId, actualizarEstado, listarPorExpediente |
| `FacturaRepository` | `billing.factura` | crear, obtenerPorPago, generarNumero |
| `ActividadRepository` | `events.actividad` | registrar, listarPorExpediente |
| `PITRRepository` | `pitr.*` | obtenerTemplate, obtenerRespuesta, guardarRespuesta, completar |
| `PrediccionAIRepository` | `ai.prediccion_ia` | crear, actualizarResultado, listarPorExpediente |

## 11.3 Ejemplo: ExpedienteRepository completo

```typescript
// src/lib/domain/repositories/expediente-repository.ts
export class ExpedienteRepository {
  constructor(private supabase: SupabaseClient) {}

  async obtenerPorId(id: string): Promise<Expediente | null> {
    const { data, error } = await this.supabase
      .from("core.expediente")
      .select("*, cliente:core.cliente(*), inmueble:core.inmueble(*), servicio:core.servicio(*), tecnico:auth.usuario(*)")
      .eq("id", id)
      .maybeSingle();

    if (error) throw new Error(`DB_ERROR: ${error.message}`);
    return data;
  }

  async listarPorCliente(
    clienteId: string,
    options?: { estado?: string; limit?: number; offset?: number }
  ): Promise<Expediente[]> {
    let query = this.supabase
      .from("core.expediente")
      .select("*")
      .eq("cliente_id", clienteId)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (options?.estado) query = query.eq("estado", options.estado);
    if (options?.limit) query = query.limit(options.limit);
    if (options?.offset) query = query.range(options.offset, options.offset + (options.limit || 10) - 1);

    const { data, error } = await query;
    if (error) throw new Error(`DB_ERROR: ${error.message}`);
    return data || [];
  }

  async listarPorTecnico(
    tecnicoId: string
  ): Promise<Expediente[]> {
    const { data, error } = await this.supabase
      .from("core.expediente")
      .select("*")
      .eq("tecnico_asignado_id", tecnicoId)
      .is("deleted_at", null)
      .not("estado", "in", '("CERRADO","CANCELADO","RECHAZADO")')
      .order("fecha_limite", { ascending: true });

    if (error) throw new Error(`DB_ERROR: ${error.message}`);
    return data || [];
  }

  async crear(input: CrearExpedienteInput): Promise<Expediente> {
    const { data, error } = await this.supabase
      .from("core.expediente")
      .insert({
        numero_visible: input.numeroVisible,
        cliente_id: input.clienteId,
        inmueble_id: input.inmuebleId,
        servicio_id: input.servicioId,
        estado: input.estado,
        fecha_limite: input.fechaLimite.toISOString(),
        fecha_inicio: input.fechaInicio?.toISOString(),
        prioridad: input.prioridad || "media",
        notas: input.notas,
        created_by: input.creadoPor,
      })
      .select()
      .single();

    if (error) throw new Error(`DB_ERROR: ${error.message}`);
    return data;
  }

  async cambiarEstado(
    id: string,
    estado: EstadoExpediente,
    usuarioId: string
  ): Promise<Expediente> {
    const { data, error } = await this.supabase
      .from("core.expediente")
      .update({
        estado,
        updated_at: new Date().toISOString(),
        updated_by: usuarioId,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`DB_ERROR: ${error.message}`);
    return data;
  }

  async asignarTecnico(
    id: string,
    tecnicoId: string,
    usuarioId: string
  ): Promise<Expediente> {
    const { data, error } = await this.supabase
      .from("core.expediente")
      .update({
        tecnico_asignado_id: tecnicoId,
        updated_at: new Date().toISOString(),
        updated_by: usuarioId,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`DB_ERROR: ${error.message}`);
    return data;
  }

  async generarNumeroVisible(): Promise<string> {
    const año = new Date().getFullYear();
    const { count, error } = await this.supabase
      .from("core.expediente")
      .select("*", { count: "exact", head: true })
      .gte("created_at", `${año}-01-01`)
      .lt("created_at", `${año + 1}-01-01`);

    if (error) throw new Error(`DB_ERROR: ${error.message}`);
    const secuencial = String((count || 0) + 1).padStart(6, "0");
    return `EXP-${año}-${secuencial}`;
  }
}
```

---

# 12. SERVICES

## 12.1 Capa de Servicios

Los servicios encapsulan **lógica de negocio** y operan sobre uno o más repositorios. No conocen la capa de presentación ni los detalles de Supabase (reciben el cliente ya creado).

```typescript
// src/lib/domain/services/expediente-service.ts
export class ExpedienteService {
  constructor(
    private expedienteRepo: ExpedienteRepository,
    private actividadRepo: ActividadRepository,
    private eventBus: EventBus
  ) {}

  async transicionarEstado(
    expedienteId: string,
    estadoNuevo: EstadoExpediente,
    usuarioId: string
  ): Promise<Expediente> {
    const expediente = await this.expedienteRepo.obtenerPorId(expedienteId);

    // Validar transición
    if (!esTransicionValida(expediente.estado, estadoNuevo)) {
      throw new Error(`TRANSICION_INVALIDA: ${expediente.estado} → ${estadoNuevo}`);
    }

    // Actualizar estado
    const actualizado = await this.expedienteRepo.cambiarEstado(
      expedienteId,
      estadoNuevo,
      usuarioId
    );

    // Registrar actividad
    await this.actividadRepo.registrar({
      expedienteId,
      usuarioId,
      tipo: "EXPEDIENTE.CAMBIO_ESTADO",
      datos: {
        estadoAnterior: expediente.estado,
        estadoNuevo,
      },
    });

    // Publicar evento
    await this.eventBus.publicar({
      tipo: "EXPEDIENTE.CAMBIO_ESTADO",
      expedienteId,
      datos: { estadoAnterior: expediente.estado, estadoNuevo },
    });

    return actualizado;
  }
}
```

## 12.2 Catálogo completo de servicios

| Servicio | Dependencias | Responsabilidad |
|----------|-------------|----------------|
| `AuthService` | Supabase Auth | Login, logout, registro, refresh session, cambio contraseña |
| `ExpedienteService` | ExpedienteRepo, ActividadRepo, EventBus | Transiciones de estado, asignación, cierre |
| `DocumentoService` | DocumentoRepo, Supabase Storage | Subida, descarga, versionado, validación de tipos |
| `PagoService` | PagoRepo, MyPOS API, EventBus | Crear pago, solicitar link, procesar webhook, reembolso |
| `FacturaService` | FacturaRepo, PagoRepo | Emisión, PDF, numeración secuencial |
| `ClienteService` | ClienteRepo, UsuarioRepo | Registro, verificación RGPD, anonimización |
| `InmuebleService` | InmuebleRepo, Catastro API | Creación, consulta catastral, geolocalización |
| `PITRService` | PITRRepo, DocumentoRepo | Carga template, guardado, finalización, firma |
| `IAService` | PrediccionAIRepo, OpenAI API | Predicción, análisis de certificados, auditoría de IA |
| `ObservatorioService` | AgregadoRepo | Anonimización, agregación, publicación |
| `NotificacionService` | NotificacionRepo, EmailService | Notificaciones push, email, in-app |
| `ActividadService` | ActividadRepo | Consulta de auditoría, reportes |

---

# 13. CASOS DE USO

## 13.1 Catálogo completo de casos de uso

### Expedientes

| Caso de uso | Servicios involucrados | Server Action | Descripción |
|------------|----------------------|---------------|-------------|
| `crearExpediente` | ExpedienteService, PagoService, FacturaService | ✅ | Creación completa tras pago |
| `cambiarEstadoExpediente` | ExpedienteService | ✅ | Transición de máquina de estados |
| `asignarTecnico` | ExpedienteService, NotificacionService | ✅ | Asignar técnico a expediente |
| `listarMisExpedientes` | ExpedienteService | ❌ (Server Component) | Vista de cliente |
| `listarExpedientesAsignados` | ExpedienteService | ❌ (Server Component) | Vista de técnico |
| `listarTodosExpedientes` | ExpedienteService | ❌ (Server Component) | Vista de backoffice |
| `cerrarExpediente` | ExpedienteService, ObservatorioService | ✅ | Cierre y anonimización |

### Documentos

| Caso de uso | Servicios involucrados | Server Action | Descripción |
|------------|----------------------|---------------|-------------|
| `subirDocumento` | DocumentoService, ActividadService | ✅ | Subida a Storage + registro BD |
| `descargarDocumento` | DocumentoService | ❌ (API Route) | URL firmada temporal |
| `eliminarDocumento` | DocumentoService | ✅ | Soft delete en BD + Storage |
| `listarDocumentosExpediente` | DocumentoService | ❌ (Server Component) | Galería de documentos |

### Pagos

| Caso de uso | Servicios involucrados | Server Action | Descripción |
|------------|----------------------|---------------|-------------|
| `iniciarPago` | PagoService, MyPOS API | ✅ | Crear pago + link de pago |
| `procesarWebhookMyPOS` | PagoService, ExpedienteService, EventBus | ❌ (Edge Function) | Webhook de confirmación |
| `reembolsarPago` | PagoService, MyPOS API | ✅ | Devolución |
| `listarPagosExpediente` | PagoService | ❌ (Server Component) | Historial de pagos |

### PITR

| Caso de uso | Servicios involucrados | Server Action | Descripción |
|------------|----------------------|---------------|-------------|
| `iniciarPITR` | PITRService, ExpedienteService | ✅ | Preparar inspección |
| `guardarRespuestaPITR` | PITRService | ✅ | Auto-save de respuestas |
| `subirFotoPITR` | PITRService, DocumentoService | ✅ | Foto de inspección |
| `firmarPITR` | PITRService, DocumentoService | ✅ | Firma digital |
| `completarPITR` | PITRService, ExpedienteService, IAService | ✅ | Finalizar y transicionar estado |

### IA

| Caso de uso | Servicios involucrados | Server Action | Descripción |
|------------|----------------------|---------------|-------------|
| `solicitarAnalisisCertificado` | IAService, DocumentoService | ✅ | Analizar certificado con IA |
| `obtenerResultadoIA` | IAService | ❌ (Server Component) | Consultar predicción |
| `generarDictamen` | IAService, ExpedienteService | ✅ | Generar dictamen final |

### Automatizaciones (n8n)

| Caso de uso | Disparador | Acción n8n | Efecto en Supabase |
|------------|-----------|-----------|-------------------|
| `pagoCompletado → crearExpediente` | Webhook Supabase → n8n | n8n llama API de expediente | INSERT expediente + actividad |
| `expedienteProximoAVencer` | Programación n8n (cron) | n8n consulta Supabase y envía email | UPDATE recordatorio |
| `informeEnviado → notificarCliente` | Webhook Supabase → n8n | n8n envía email con enlace | INSERT notificación |
| `clienteInactivo → emailReactivacion` | Programación n8n (cron semanal) | n8n consulta clientes sin actividad | Log en actividad |
| `backupDiario` | Programación n8n (cron diario) | n8n ejecuta pg_dump vía Supabase API | Exportación |

---

# 14. VARIABLES ENTORNO

## 14.1 Variables de entorno (Next.js)

```env
# ============================================
# SUPABASE — CONEXIÓN
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ============================================
# SUPABASE — EDGE FUNCTIONS
# ============================================
NEXT_PUBLIC_SUPABASE_EDGE_FUNCTIONS_URL=https://xxxxxxxxxxxx.functions.supabase.co

# ============================================
# MYPOS — PAYMENT GATEWAY
# ============================================
MYPOS_API_URL=https://api.mypos.com/v1
MYPOS_SHOP_ID=SHOP123456
MYPOS_API_KEY=myp_test_xxxxxxxxxxxxxxxxxx
MYPOS_SECRET_KEY=secret_xxxxxxxxxxxxxxxxxxx
MYPOS_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxx

# ============================================
# OPENAI — IA
# ============================================
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_MODEL=gpt-4o

# ============================================
# n8n — AUTOMATION
# ============================================
N8N_WEBHOOK_URL=https://n8n.certilab.cat/webhook
N8N_API_KEY=n8n_api_xxxxxxxxxxxxxxxxxxxx

# ============================================
# EMAIL — (futuro: SendGrid / Resend)
# ============================================
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# ============================================
# NEXT.JS
# ============================================
NEXT_PUBLIC_APP_URL=https://certilab.cat
NEXT_PUBLIC_APP_NAME=Certilab
```

## 14.2 Variables de Supabase Edge Functions

```env
# Configurar en Supabase Dashboard > Edge Functions > Secrets
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
MYPOS_SECRET_KEY=whsec_xxxxxxxxxxxxxxxxxx
MYPOS_SHOP_ID=SHOP123456
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
```

## 14.3 Validación de variables en build

```typescript
// src/lib/env.ts
/**
 * Validación de variables de entorno en tiempo de build
 * Todas las variables REQUIRED deben estar definidas
 */
export function validateEnv() {
  const required = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
  ];

  const missing = required.filter(
    (key) => !process.env[key]
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing required env vars: ${missing.join(", ")}`
    );
  }
}
```

---

# 15. DEPLOY

## 15.1 Pipeline de deploy

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  DEVELOP     │     │  STAGING     │     │  PRODUCTION  │
│  (main)      │────▶│  (preview)   │────▶│  (prod)      │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                     │
       ▼                    ▼                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Vercel      │     │  Vercel      │     │  Vercel      │
│  (dev)       │     │  (preview)   │     │  (production)│
├──────────────┤     ├──────────────┤     ├──────────────┤
│  Supabase    │     │  Supabase    │     │  Supabase    │
│  (dev)       │     │  (staging)   │     │  (production)│
│              │     │              │     │              │
│  Branch DB   │     │  Branch DB   │     │  Main DB     │
└──────────────┘     └──────────────┘     └──────────────┘
```

## 15.2 Comandos de deploy

```bash
# 1. Migraciones de base de datos
supabase db push --db-url="$SUPABASE_DB_URL"

# 2. Deploy Edge Functions
supabase functions deploy webhook-mypos --project-ref "$PROJECT_REF"
supabase functions deploy procesar-prediccion --project-ref "$PROJECT_REF"

# 3. Deploy Next.js (Vercel)
vercel --prod

# 4. Verificar RLS
supabase db test
```

## 15.3 Archivo de configuración Supabase

```typescript
// supabase/config.toml
[project]
name = "certilab"

[auth]
enabled = true
site_url = "https://certilab.cat"
additional_redirect_urls = [
  "https://certilab.cat/**",
  "http://localhost:3000/**"
]

[auth.email]
enable_confirmations = true
enable_autoconfirm = false
secure_password = true
min_password_length = 8

[api]
port = 54321
schemas = ["public", "core", "auth", "billing", "pitr", "events", "analytics", "automation", "ai"]

[db.migrations]
enabled = true
directory = "./supabase/migrations"

[storage]
enabled = true
file_size_limit = "50MB"

[edge_runtime]
enabled = true
policy = "per_worker"
```

## 15.4 Migraciones

```bash
# Crear nueva migración
supabase migration new add_expediente_table

# Aplicar migraciones
supabase db push

# Generar tipos TypeScript desde esquema
supabase gen types typescript --local > src/types/supabase.ts

# Vincular proyecto local con Supabase Cloud
supabase link --project-ref "$PROJECT_REF"
```

## 15.5 Seed data

```typescript
// supabase/seed.sql
-- Empresa por defecto
INSERT INTO core.empresa (id, nombre, nif, slug, email_contacto, created_by)
VALUES (
  gen_random_uuid(),
  'Certilab',
  'B-12345678',
  'certilab',
  'info@certilab.cat',
  (SELECT id FROM auth.usuario LIMIT 1)
);

-- Servicios por defecto
INSERT INTO core.servicio (empresa_id, codigo, nombre, slug, descripcion, precio_base, dias_limite, activo, created_by)
VALUES
  ((SELECT id FROM core.empresa LIMIT 1), 'SO-001', 'Segunda Opinión', 'segunda-opinion', 'Auditoría completa de certificado energético', 150.00, 7, true, (SELECT id FROM auth.usuario LIMIT 1)),
  ((SELECT id FROM core.empresa LIMIT 1), 'EX-001', 'Express', 'express', 'Revisión rápida de certificado', 49.00, 2, true, (SELECT id FROM auth.usuario LIMIT 1));
```

---

# 16. TESTING

## 16.1 Estrategia de testing

```
┌────────────────────────────────────────────────────────────┐
│                   PIRÁMIDE DE TESTING                       │
│                                                             │
│                    ╱╲                                        │
│                   ╱  ╲  E2E (Playwright)                    │
│                  ╱    ╲  3-5 flujos críticos                 │
│                 ╱      ╲                                      │
│                ╱────────╲                                    │
│               ╱          ╲  Integration (Vitest)             │
│              ╱            ╲  10-15 casos de uso              │
│             ╱              ╲                                  │
│            ╱────────────────╲                                │
│           ╱                  ╲  Unit (Vitest)                 │
│          ╱                    ╲  50+ repos, services          │
│         ╱──────────────────────╲                              │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

## 16.2 Testing de repositorios (mocks de Supabase)

```typescript
// src/lib/domain/repositories/__tests__/expediente-repository.test.ts
import { describe, it, expect, vi } from "vitest";

// Mock de Supabase
const mockSupabase = {
  from: vi.fn(() => ({
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        maybeSingle: vi.fn(() =>
          Promise.resolve({
            data: {
              id: "123",
              numero_visible: "EXP-2026-000001",
              estado: "EXPEDIENTE_CREADO",
            },
            error: null,
          })
        ),
      })),
    })),
  })),
};

describe("ExpedienteRepository", () => {
  it("obtenerPorId returns expediente", async () => {
    const repo = new ExpedienteRepository(mockSupabase as any);
    const result = await repo.obtenerPorId("123");

    expect(result).toBeDefined();
    expect(result?.numero_visible).toBe("EXP-2026-000001");
  });
});
```

## 16.3 Testing de casos de uso (con repositorios mockeados)

```typescript
// src/lib/domain/use-cases/__tests__/crear-expediente.test.ts
describe("crearExpedienteUseCase", () => {
  it("creates expediente successfully", async () => {
    const mockExpedienteRepo = {
      generarNumeroVisible: vi.fn(() => "EXP-2026-000001"),
      crear: vi.fn((input) => ({
        id: "exp-123",
        ...input,
      })),
      obtenerServicio: vi.fn(() => ({
        id: "svc-1",
        nombre: "Segunda Opinión",
        precio_base: 150,
      })),
    };

    const result = await crearExpedienteUseCase(
      {
        clienteId: "cli-1",
        inmuebleId: "inm-1",
        servicioId: "svc-1",
        fechaLimite: new Date("2026-07-15"),
      },
      "usr-1"
    );

    expect(result.expedienteId).toBe("exp-123");
    expect(result.numeroVisible).toBe("EXP-2026-000001");
  });
});
```

## 16.4 Testing de RLS

```sql
-- tests/rls/expediente-rls.test.sql
-- Test: Cliente solo ve sus expedientes
BEGIN;
  -- Setup
  SET LOCAL "request.jwt.claim.sub" TO 'cliente-auth-id';
  
  -- Should return only 1 row (the client's expediente)
  SELECT * FROM core.expediente;
  
  -- Verify count = 1
  ASSERT (SELECT count(*) FROM core.expediente) = 1;
ROLLBACK;

-- Test: Admin ve todos los expedientes
BEGIN;
  SET LOCAL "request.jwt.claim.sub" TO 'admin-auth-id';
  SET LOCAL "request.jwt.claim.rol" TO 'admin';
  
  SELECT * FROM core.expediente;
  ASSERT (SELECT count(*) FROM core.expediente) = 10;
ROLLBACK;
```

## 16.5 Testing de Edge Functions

```typescript
// supabase/functions/webhook-mypos/index.test.ts
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("webhook-mypos: valid signature", async () => {
  const req = new Request("http://localhost", {
    method: "POST",
    headers: {
      "X-MyPOS-Signature": "valid-signature",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      TransactionID: "TXN-123",
      Status: "SUCCESS",
      Amount: 150.00,
      Currency: "EUR",
    }),
  });

  const response = await serve(req);
  assertEquals(response.status, 200);
});
```

## 16.6 E2E con Playwright

```typescript
// e2e/flujo-completo.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Flujo completo: Login → Expediente → Pago", () => {
  test("usuario completa ciclo de contratación", async ({ page }) => {
    // 1. Login
    await page.goto("/saas/login");
    await page.fill("[name=email]", "test@certilab.cat");
    await page.fill("[name=password]", "Test1234!");
    await page.click("[type=submit]");
    await expect(page).toHaveURL(/\/dashboard/);

    // 2. Crear expediente
    await page.goto("/nuevo-expediente");
    await page.selectOption("[name=servicio]", "Segunda Opinión");
    await page.fill("[name=referencia]", "12345678901234567890");
    await page.click("[type=submit]");
    await expect(page).toHaveURL(/\/mis-expedientes/);
  });
});
```

---

# 17. RIESGOS

## 17.1 Matriz de riesgos

| # | Riesgo | Probabilidad | Impacto | Severidad | Mitigación |
|---|--------|-------------|---------|-----------|------------|
| R1 | **RLS mal configurado**: fuga de datos entre empresas | Baja | Crítico | 🔴 Alta | Testing automatizado de RLS, code review obligatorio, pruebas de penetración periódicas |
| R2 | **Service Role Key expuesta**: acceso total a BD | Muy baja | Crítico | 🔴 Alta | Service Key solo en Server Components/Edge Functions, nunca en cliente, rotación trimestral |
| R3 | **Sesiones JWT no expiran**: acceso persistente | Media | Alto | 🟠 Media | Refresh token 7 días, expiry 1 hora, revocación en logout |
| R4 | **Rate limiting insuficiente**: ataque de fuerza bruta | Media | Alto | 🟠 Media | Supabase Auth Rate Limiting, captcha en login, monitoreo de intentos |
| R5 | **Pérdida de datos por migración mal ejecutada**: downtime | Media | Alto | 🟠 Media | Backup automático antes de migrar, PITR 7 días, staging mirror |
| R6 | **Webhook MyPOS no verificado**: pagos falsos | Baja | Crítico | 🔴 Alta | Verificación HMAC-SHA256 en Edge Function, logging de todos los intentos |
| R7 | **n8n sin autenticación**: workflows maliciosos | Baja | Alto | 🟠 Media | API Key en webhooks, IP whitelist de n8n, logging de ejecuciones |
| R8 | **Archivos maliciosos en Storage**: malware | Media | Medio | 🟡 Baja | Validación MIME + tamaño + antivirus (ClamAV), cuarentena automática |
| R9 | **CORS mal configurado**: acceso cross-site | Baja | Medio | 🟡 Baja | CORS restringido a dominios conocidos, preflight validation |
| R10 | **Inyección SQL**: bypass de RLS | Muy baja | Crítico | 🔴 Alta | Prepared statements siempre, RLS como defensa en profundidad, input sanitization |
| R11 | **Dependencia de Supabase**: vendor lock-in | Media | Medio | 🟡 Baja | Interfaces abstractas (IStorageProvider, IRepository), migración posible |
| R12 | **Costos de Storage/DB**: escalado imprevisto | Media | Bajo | 🟢 Muy baja | Monitoreo de uso, alertas de thresholds, optimización de queries |

## 17.2 Plan de contingencia

| Escenario | Acción | SLA |
|-----------|--------|-----|
| Supabase caído (DB) | Switch a réplica de lectura en otra región | < 5 min |
| Supabase caído (Auth) | Login deshabilitado, read-only mode | < 15 min |
| Fuga de datos (RLS) | Revocar todas las sesiones, auditar accesos, parchear RLS, notificar RGPD | < 1 hora |
| Pérdida de datos | Restaurar desde PITR (último snapshot) | < 30 min |
| Ataque DDoS | Cloudflare + WAF + Rate limiting en Supabase | < 10 min |

---

# 18. ROADMAP IMPLEMENTACIÓN

## 18.1 Fases de implementación

### FASE 1: Fundación (Sprint 1-2) — Semanas 1-2
```
┌─────────────────────────────────────────────────────────────┐
│ FASE 1 — FUNDACIÓN                                          │
├─────────────────────────────────────────────────────────────┤
│ ✅ Configuración del proyecto Supabase                       │
│ ✅ Variables de entorno                                      │
│ ✅ Clientes Supabase (server, client, admin)                 │
│ ✅ Middleware de autenticación                                │
│ ✅ Esquemas PostgreSQL (core, auth, billing, pitr, events)   │
│ ✅ RLS básico (expediente + pago + actividad)                │
│ ✅ Trigger sync auth.users → auth.usuario                    │
│ ✅ Migración inicial + seed data                             │
│ ✅ npm run build → 0 errores                                 │
└─────────────────────────────────────────────────────────────┘
```

### FASE 2: Repositorios + Servicios (Sprint 2-4) — Semanas 3-4
```
┌─────────────────────────────────────────────────────────────┐
│ FASE 2 — DOMAIN LAYER                                       │
├─────────────────────────────────────────────────────────────┤
│ □ BaseRepository (interfaz genérica)                         │
│ □ ExpedienteRepository (CRUD + estados + asignación)        │
│ □ DocumentoRepository (CRUD + hash + versionado)            │
│ □ PagoRepository (CRUD + webhook + estados)                 │
│ □ PITRRepository (template + respuestas + firma)            │
│ □ ClienteRepository + InmuebleRepository + ServicioRepo     │
│ □ ActividadRepository (append-only)                         │
│ □ EventBus (publicación de eventos + Realtime)              │
│ □ ExpedienteService (transiciones + asignaciones)           │
│ □ DocumentoService (subida + descarga + validación)         │
│ □ PagoService (creación + webhook + reembolso)              │
│ □ PITRService (template + guardado + finalización)          │
│ □ Tests unitarios (repos + services, +80% cobertura)        │
└─────────────────────────────────────────────────────────────┘
```

### FASE 3: Casos de uso + Server Actions (Sprint 4-6) — Semanas 5-6
```
┌─────────────────────────────────────────────────────────────┐
│ FASE 3 — USE CASES + SERVER ACTIONS                         │
├─────────────────────────────────────────────────────────────┤
│ □ crearExpediente (use case + action)                       │
│ □ cambiarEstadoExpediente (use case + action)               │
│ □ asignarTecnico (use case + action)                        │
│ □ subirDocumento (use case + action)                        │
│ □ descargarDocumento (API Route + Signed URL)               │
│ □ iniciarPago (use case + action + MyPOS link)              │
│ □ completarPITR (use case + action + firma)                 │
│ □ iniciarPITR + guardarRespuestaPITR (use case + action)    │
│ □ Server Components para listar expedientes, docs, pagos    │
│ □ Tests de integración (use cases completos)                │
└─────────────────────────────────────────────────────────────┘
```

### FASE 4: Edge Functions + n8n (Sprint 6-8) — Semanas 7-8
```
┌─────────────────────────────────────────────────────────────┐
│ FASE 4 — INFRAESTRUCTURA EXTERNA                            │
├─────────────────────────────────────────────────────────────┤
│ □ Edge Function: webhook-mypos (verificación + update)      │
│ □ Edge Function: procesar-prediccion (OpenAI + Realtime)    │
│ □ Configuración MyPOS webhook → Edge Function               │
│ □ n8n workflow: pago completado → crear expediente          │
│ □ n8n workflow: expediente próximo a vencer → email         │
│ □ n8n workflow: informe enviado → notificar cliente         │
│ □ n8n workflow: backup diario (pg_dump)                     │
│ □ Monitorización y alertas (Supabase Logs + n8n)            │
│ □ Tests E2E (Playwright, 3 flujos críticos)                 │
└─────────────────────────────────────────────────────────────┘
```

### FASE 5: IA + Realtime + Storage (Sprint 8-10) — Semanas 9-10
```
┌─────────────────────────────────────────────────────────────┐
│ FASE 5 — IA + REALTIME + STORAGE                            │
├─────────────────────────────────────────────────────────────┤
│ □ Edge Function: procesar-prediccion (producción)           │
│ □ Realtime subscriptions (cambios de estado en UI)          │
│ □ Realtime broadcasts (notificaciones push)                  │
│ □ Storage policies (RLS para documentos, informes, firmas)  │
│ □ Generación de URLs firmadas (descarga segura)             │
│ □ Versionado de documentos en Storage                        │
│ □ ObservatorioService + anonimización de datos              │
│ □ Tests RLS (SQL tests + integración)                       │
│ □ Tests E2E (4 flujos adicionales)                          │
└─────────────────────────────────────────────────────────────┘
```

### FASE 6: Hardening + Deploy (Sprint 10-12) — Semanas 11-12
```
┌─────────────────────────────────────────────────────────────┐
│ FASE 6 — HARDENING + PRODUCTION                             │
├─────────────────────────────────────────────────────────────┤
│ □ Auditoría de seguridad (RLS, JWT, CORS, Rate Limiting)    │
│ □ Pruebas de penetración (OWASP Top 10)                     │
│ □ Optimización de queries (índices, explain analyze)        │
│ □ Load testing (k6: 1000 usuarios concurrentes)             │
│ □ Documentación completa (CF-021 + README actualizado)      │
│ □ Configuración de producción (Vercel + Supabase Pro)       │
│ □ PITR habilitado (7 días)                                  │
│ □ Monitoreo (Supabase Logs + Vercel Analytics)              │
│ □ Deploy a producción                                       │
│ □ Post-mortem + lecciones aprendidas                        │
└─────────────────────────────────────────────────────────────┘
```

## 18.2 Estimación total

| Fase | Semanas | Dependencias | Riesgo |
|------|---------|-------------|--------|
| F1: Fundación | 2 | Ninguna | Bajo |
| F2: Domain Layer | 2 | F1 | Medio |
| F3: Use Cases | 2 | F2 | Medio |
| F4: Infraestructura | 2 | F3 | Alto |
| F5: IA + Realtime | 2 | F4 | Alto |
| F6: Hardening | 2 | F5 | Medio |
| **Total** | **12** | — | — |

## 18.3 Hitos críticos

| Hito | Fecha estimada | Criterio de éxito |
|------|---------------|-------------------|
| **H1:** Build con Supabase integrado | Semana 2 | `npm run build` sin errores, login funcional |
| **H2:** Repositorios + Servicios completados | Semana 4 | Tests pasando (>80% coverage) |
| **H3:** Server Actions operativas | Semana 6 | Creación de expediente end-to-end |
| **H4:** Pagos MyPOS funcionales | Semana 8 | Webhook recibe pago y actualiza expediente |
| **H5:** IA + Realtime en producción | Semana 10 | Predicción de IA con resultados en tiempo real |
| **H6:** **GO LIVE** | **Semana 12** | Todos los tests pasando, deploy a producción |

---

**Responsable:** Arquitectura Técnica Certilab  
**Fecha:** 01/07/2026  
**Versión:** 1.0  
**Estado:** Documento de diseño (sin implementación)
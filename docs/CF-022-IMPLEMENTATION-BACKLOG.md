# CF-022 — PLAN MAESTRO DE IMPLEMENTACIÓN

| Campo | Valor |
|-------|-------|
| **Documento** | CF-022-IMPLEMENTATION-BACKLOG.md |
| **Versión** | 1.0 |
| **Fecha** | 2026-07-02 |
| **Estado** | Aprobado |
| **Autor** | Framework Certilab |

---

# 1. PROPÓSITO

Descomponer TODO el proyecto Certilab en tareas pequeñas, ejecutables y verificables.

Cada tarea está diseñada para completarse en **entre 1 y 4 horas**.

Ninguna tarea debería requerir más de una sesión de trabajo.

Este documento no rediseña la arquitectura. La arquitectura ya está definida en CF-000, CF-002, CF-011, CF-012, CF-020 y CF-021.

---

# 2. ESTRUCTURA DE CADA TAREA

| Campo | Descripción |
|-------|-------------|
| **ID** | Identificador único: `E{EPICA}-T{NUMERO}` (ej: `E22-T01`) |
| **Título** | Nombre corto de la tarea |
| **Objetivo** | Qué se consigue al completarla |
| **Descripción** | Qué hay que hacer exactamente |
| **Archivos afectados** | Lista de archivos a crear/modificar |
| **Dependencias** | IDs de tareas que deben completarse antes |
| **Estimación** | Horas estimadas (1h–4h) |
| **Riesgo** | Bajo / Medio / Alto |
| **Prioridad** | P0 (crítica) / P1 (alta) / P2 (media) / P3 (baja) |
| **Criterios de aceptación** | Checklist de validación |
| **Cómo probarla** | Pasos concretos para verificar |
| **Resultado esperado** | Estado final tras completar la tarea |

---

# 3. ÉPICA 22 — SUPABASE FOUNDATION

> Crear proyecto Supabase, configurar variables de entorno, implementar clientes (browser, server, middleware), health check, verificar conexión.

---

## E22-T01: Crear proyecto Supabase

| Campo | Valor |
|-------|-------|
| **Objetivo** | Tener un proyecto Supabase operativo vinculado al repositorio |
| **Descripción** | Crear proyecto en dashboard.supabase.com. Registrar URL del proyecto y anon key. Configurar región (EU-West). Vincular al repositorio de Vercel si aplica. |
| **Archivos afectados** | `.env.local`, `.env.example` |
| **Dependencias** | Ninguna |
| **Estimación** | 1h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Proyecto creado en Supabase dashboard<br>— URL y anon key copiadas<br>— Región EU-West configurada<br>— Proyecto accesible desde entorno local |
| **Cómo probarla** | Hacer clic en "Project Settings" y verificar que el proyecto está en verde |
| **Resultado esperado** | Proyecto Supabase activo listo para recibir conexiones |

---

## E22-T02: Configurar variables de entorno

| Campo | Valor |
|-------|-------|
| **Objetivo** | Tener todas las variables de Supabase accesibles desde la app |
| **Descripción** | Crear/actualizar `.env.local` con `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`. Añadir al `.env.example`. |
| **Archivos afectados** | `.env.local`, `.env.example` |
| **Dependencias** | E22-T01 |
| **Estimación** | 1h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — `NEXT_PUBLIC_SUPABASE_URL` apunta al proyecto<br>— `NEXT_PUBLIC_SUPABASE_ANON_KEY` es la anon key<br>— `SUPABASE_SERVICE_ROLE_KEY` solo en server<br>— `.env.example` tiene las variables documentadas |
| **Cómo probarla** | `node -e "console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)"` desde terminal |
| **Resultado esperado** | Variables de entorno listas para ser consumidas por los clientes Supabase |

---

## E22-T03: Implementar cliente browser (Supabase)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Tener un cliente Supabase para el navegador (componentes React) |
| **Descripción** | Crear `src/lib/supabase/browser.ts` con `createBrowserClient` de `@supabase/ssr`. Configurar cookies para sesión persistente. |
| **Archivos afectados** | `src/lib/supabase/browser.ts` (nuevo) |
| **Dependencias** | E22-T02 |
| **Estimación** | 2h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Cliente browser exportado como `supabase`<br>— Usa `@supabase/ssr`<br>— Cookies configuradas correctamente<br>— Tipado estricto (no `any`) |
| **Cómo probarla** | Importar `supabase` desde el cliente y ejecutar `await supabase.auth.getSession()` |
| **Resultado esperado** | Cliente Supabase funcional en el navegador con persistencia de sesión |

---

## E22-T04: Implementar cliente server (Supabase)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Tener un cliente Supabase para Server Components y Route Handlers |
| **Descripción** | Crear `src/lib/supabase/server.ts` con `createServerClient` de `@supabase/ssr`. Usar cookies de request/response. |
| **Archivos afectados** | `src/lib/supabase/server.ts` (nuevo) |
| **Dependencias** | E22-T02 |
| **Estimación** | 2h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Cliente server exportado como `createSupabaseServerClient`<br>— Función que recibe `cookies()` de Next.js<br>— Compatible con Server Components y Route Handlers |
| **Cómo probarla** | Crear un Route Handler de prueba que use el cliente y devuelva la sesión |
| **Resultado esperado** | Cliente Supabase funcional en el servidor con contexto de request |

---

## E22-T05: Implementar cliente middleware (Supabase)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Tener un cliente Supabase para Next.js Middleware (protección de rutas) |
| **Descripción** | Crear `src/lib/supabase/middleware.ts` con `createServerClient` para middleware. Usar `NextRequest` y `NextResponse`. |
| **Archivos afectados** | `src/lib/supabase/middleware.ts` (nuevo) |
| **Dependencias** | E22-T02 |
| **Estimación** | 2h |
| **Riesgo** | Medio |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Cliente middleware exportado<br>— Función `updateSession(request)` que refresca cookie<br>— Función `createClient(request)` para uso en middleware |
| **Cómo probarla** | Crear middleware.ts que use `updateSession` y verificar que renueva sesión |
| **Resultado esperado** | Cliente Supabase funcional en middleware con refresh de sesión automático |

---

## E22-T06: Implementar health check de Supabase

| Campo | Valor |
|-------|-------|
| **Objetivo** | Poder verificar que Supabase responde correctamente desde la app |
| **Descripción** | Crear API route `GET /api/health/supabase` que ejecute un `SELECT 1` y devuelva `{ status: "ok", timestamp }`. Incluir verificación de Auth (`getSession()`) y Storage (list buckets). |
| **Archivos afectados** | `src/app/api/health/supabase/route.ts` (nuevo) |
| **Dependencias** | E22-T03, E22-T04 |
| **Estimación** | 2h |
| **Riesgo** | Bajo |
| **Prioridad** | P2 |
| **Criterios de aceptación** | — Endpoint devuelve `status: "ok"`<br>— Ejecuta `SELECT 1` en DB<br>— Verifica Auth (sesión anónima)<br>— Verifica Storage buckets list |
| **Cómo probarla** | `curl http://localhost:3000/api/health/supabase` |
| **Resultado esperado** | Endpoint funcional que confirma conexión a Supabase |

---

## E22-T07: Verificar conexión completa

| Campo | Valor |
|-------|-------|
| **Objetivo** | Confirmar que los tres clientes (browser, server, middleware) funcionan correctamente |
| **Descripción** | Ejecutar un test manual: login desde browser, verificar sesión en server component, verificar refresh en middleware. Documentar resultados. |
| **Archivos afectados** | Ninguno (prueba manual) |
| **Dependencias** | E22-T03, E22-T04, E22-T05 |
| **Estimación** | 1h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Sesión persiste en browser<br>— Server Component lee sesión correctamente<br>— Middleware refresca sesión vencida<br>— Sin errores en consola |
| **Cómo probarla** | Flujo completo: login → recargar → ver dashboard → esperar 5 min → recargar |
| **Resultado esperado** | Conexión Supabase plenamente funcional en los tres contextos |

---

## E22-T08: Configurar ESLint + TypeScript strict para Supabase

| Campo | Valor |
|-------|-------|
| **Objetivo** | Garantizar type safety en todo el código que interactúa con Supabase |
| **Descripción** | Verificar que `tsconfig.json` tiene `strict: true`. Añadir reglas ESLint para prohibir `any` en imports de Supabase. Configurar tipos generados de Supabase. |
| **Archivos afectados** | `tsconfig.json`, `eslint.config.mjs`, `src/lib/supabase/types.ts` (nuevo) |
| **Dependencias** | E22-T03 |
| **Estimación** | 1h |
| **Riesgo** | Bajo |
| **Prioridad** | P2 |
| **Criterios de aceptación** | — `strict: true` en tsconfig<br>— Tipos generados de Supabase importados<br>— ESLint no permite `any` en código Supabase |
| **Cómo probarla** | `npm run lint` sin errores |
| **Resultado esperado** | Entorno TypeScript estricto configurado para Supabase |

---

# 4. ÉPICA 23 — AUTH

> Sistema completo de autenticación: login, logout, magic link, reset password, middleware de protección, roles y RBAC.

---

## E23-T01: Implementar login con email y contraseña

| Campo | Valor |
|-------|-------|
| **Objetivo** | Cliente puede iniciar sesión con email + contraseña |
| **Descripción** | Crear página `/login` con formulario de email + password. Usar `supabase.auth.signInWithPassword()`. Redirigir a dashboard tras login. Mostrar errores de autenticación. |
| **Archivos afectados** | `src/app/(auth)/login/page.tsx`, `src/app/(auth)/login/login-form.tsx` |
| **Dependencias** | E22-T03, E22-T04, E22-T05 |
| **Estimación** | 3h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Formulario con email + password<br>— Validación de campos requeridos<br>— Mensaje de error si credenciales inválidas<br>— Redirección a dashboard tras éxito<br>— Estado de carga durante el inicio de sesión |
| **Cómo probarla** | Crear usuario en Supabase Auth, hacer login con email+password |
| **Resultado esperado** | Usuario autenticado redirigido al dashboard |

---

## E23-T02: Implementar registro de usuario

| Campo | Valor |
|-------|-------|
| **Objetivo** | Nuevo usuario puede registrarse en la plataforma |
| **Descripción** | Crear página `/registro` con formulario de registro (email, password, nombre, apellidos, aceptar términos). Usar `supabase.auth.signUp()`. Redirigir a verificación de email. |
| **Archivos afectados** | `src/app/(auth)/registro/page.tsx`, `src/app/(auth)/registro/registro-form.tsx` |
| **Dependencias** | E23-T01 |
| **Estimación** | 3h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Formulario con todos los campos<br>— Validación de email válido<br>— Password mínimo 8 caracteres<br>— Checkbox de términos obligatorio<br>— Redirección a "verifica tu email" |
| **Cómo probarla** | Registrar nuevo usuario, verificar email de confirmación en Supabase |
| **Resultado esperado** | Usuario creado en Supabase Auth, pendiente de verificación |

---

## E23-T03: Implementar logout

| Campo | Valor |
|-------|-------|
| **Objetivo** | Usuario puede cerrar sesión |
| **Descripción** | Implementar botón de logout en dashboard/layout. Usar `supabase.auth.signOut()`. Limpiar cookies de sesión. Redirigir a home. |
| **Archivos afectados** | `src/components/plataforma/logout-button.tsx`, `src/app/(plataforma)/layout.tsx` |
| **Dependencias** | E23-T01 |
| **Estimación** | 1h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Botón de logout visible en dashboard<br>— Al hacer clic, cierra sesión<br>— Redirige a home<br>— Sesión no persiste tras recargar |
| **Cómo probarla** | Iniciar sesión, hacer logout, recargar página |
| **Resultado esperado** | Sesión cerrada, usuario redirigido a página pública |

---

## E23-T04: Implementar Magic Link

| Campo | Valor |
|-------|-------|
| **Objetivo** | Usuario puede iniciar sesión sin contraseña mediante Magic Link |
| **Descripción** | Añadir opción "Enviar Magic Link" en login. Usar `supabase.auth.signInWithOtp()`. Mostrar mensaje de "Revisa tu email". Manejar el callback de confirmación. |
| **Archivos afectados** | `src/app/(auth)/login/page.tsx`, `src/app/(auth)/login/magic-link-form.tsx`, `src/app/auth/confirm/route.ts` |
| **Dependencias** | E23-T01 |
| **Estimación** | 3h |
| **Riesgo** | Medio |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Input de email para enviar magic link<br>— Mensaje "Revisa tu email" tras envío<br>— Email recibido con link válido<br>— Al hacer clic, sesión iniciada |
| **Cómo probarla** | Introducir email, recibir magic link, hacer clic |
| **Resultado esperado** | Usuario autenticado sin contraseña mediante link enviado por email |

---

## E23-T05: Implementar Reset Password

| Campo | Valor |
|-------|-------|
| **Objetivo** | Usuario puede restablecer su contraseña olvidada |
| **Descripción** | Crear flujo: "Olvidé mi contraseña" → formulario email → enviar reset link → nueva contraseña. Usar `supabase.auth.resetPasswordForEmail()` y `supabase.auth.updateUser()`. |
| **Archivos afectados** | `src/app/(auth)/reset-password/page.tsx`, `src/app/(auth)/reset-password/update-password.tsx`, `src/app/auth/confirm/route.ts` |
| **Dependencias** | E23-T01 |
| **Estimación** | 3h |
| **Riesgo** | Medio |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Enlace "Olvidé mi contraseña" en login<br>— Formulario de email para reset<br>— Email recibido con link<br>— Formulario de nueva contraseña<br>— Contraseña actualizada correctamente |
| **Cómo probarla** | Solicitar reset, cambiar contraseña, iniciar sesión con nueva |
| **Resultado esperado** | Contraseña restablecida, usuario puede iniciar sesión |

---

## E23-T06: Implementar middleware de protección de rutas

| Campo | Valor |
|-------|-------|
| **Objetivo** | Proteger rutas privadas redirigiendo a login si no hay sesión |
| **Descripción** | Crear `src/middleware.ts` que use `updateSession` del cliente middleware. Definir `matcher` con rutas protegidas: `/dashboard`, `/mis-expedientes`, `/nuevo-expediente`, `/backoffice`, `/configuracion`, `/pitr`. Redirigir a `/login` si no hay sesión. |
| **Archivos afectados** | `src/middleware.ts` (nuevo) |
| **Dependencias** | E22-T05, E23-T01 |
| **Estimación** | 2h |
| **Riesgo** | Medio |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Rutas protegidas redirigen a login sin sesión<br>— Rutas públicas (home, blog, servicios) sin protección<br>— Refresco de sesión automático<br>— Sin bucles de redirección |
| **Cómo probarla** | Acceder a `/dashboard` sin sesión → redirige a `/login`. Acceder con sesión → muestra dashboard. |
| **Resultado esperado** | Middleware de protección funcional |

---

## E23-T07: Implementar roles de usuario (admin, tecnico, cliente)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Asignar y verificar roles de usuario en la plataforma |
| **Descripción** | Crear tabla `user_roles` en Supabase con `user_id` y `role`. Implementar helper `getUserRole()` en `src/lib/auth/roles.ts`. Añadir `role` al contexto de sesión. |
| **Archivos afectados** | `src/lib/auth/roles.ts` (nuevo), `src/types/auth.ts` (nuevo), migración SQL `migrations/001_roles.sql` |
| **Dependencias** | E23-T01 |
| **Estimación** | 3h |
| **Riesgo** | Medio |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Tabla `user_roles` creada<br>— Helper `getUserRole()` funcional<br>— Rol accesible desde sesión<br>— Roles válidos: admin, tecnico, cliente |
| **Cómo probarla** | Asignar rol manualmente en DB, verificar que `getUserRole()` lo devuelve |
| **Resultado esperado** | Roles de usuario implementados y consultables |

---

## E23-T08: Implementar RBAC (Route-Based Access Control)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Restringir acceso a rutas según rol del usuario |
| **Descripción** | Crear componente `<RoleGuard role={string[]}>` que envuelva layouts y verifique rol. Implementar en layout del backoffice (solo admin/tecnico). Añadir ruta 403 para acceso denegado. |
| **Archivos afectados** | `src/components/auth/role-guard.tsx`, `src/app/(plataforma)/backoffice/layout.tsx`, `src/app/(auth)/acceso-denegado/page.tsx` |
| **Dependencias** | E23-T07 |
| **Estimación** | 2h |
| **Riesgo** | Medio |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Componente `RoleGuard` funcional<br>— Backoffice solo accesible para admin/tecnico<br>— Cliente redirigido a 403<br>— Página 403 con mensaje claro |
| **Cómo probarla** | Acceder a `/backoffice` con usuario cliente → 403. Con admin → acceso permitido. |
| **Resultado esperado** | RBAC funcional basado en roles |

---

# 5. ÉPICA 24 — DATABASE

> Migraciones, seeds, y todas las tablas del modelo de datos.

---

## E24-T01: Configurar migraciones con Supabase CLI

| Campo | Valor |
|-------|-------|
| **Objetivo** | Tener sistema de migraciones versionadas con Supabase CLI |
| **Descripción** | Instalar Supabase CLI (`npm install supabase --save-dev`). Ejecutar `supabase init`. Configurar `supabase/config.toml` con URL del proyecto. Crear primera migración de schemas base. |
| **Archivos afectados** | `supabase/config.toml`, `supabase/migrations/001_schemas.sql` |
| **Dependencias** | E22-T01 |
| **Estimación** | 2h |
| **Riesgo** | Medio |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Supabase CLI instalado<br>— `supabase init` ejecutado<br>— Config.toml apunta al proyecto<br>— Primera migración aplicable |
| **Cómo probarla** | `supabase migration list` muestra la migración |
| **Resultado esperado** | Sistema de migraciones listo para versionar la base de datos |

---

## E24-T02: Migración de ENUMs y schemas base

| Campo | Valor |
|-------|-------|
| **Objetivo** | Crear todos los schemas y tipos ENUM del modelo de datos |
| **Descripción** | Migración SQL que crea schemas: `core`, `auth`, `pitr`, `events`, `billing`, `analytics`, `automation`, `ai`, `types`. Crear todos los ENUMs definidos en CF-020 sección 4.3. |
| **Archivos afectados** | `supabase/migrations/002_enums_schemas.sql` |
| **Dependencias** | E24-T01 |
| **Estimación** | 2h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Schemas creados correctamente<br>— Todos los ENUMs creados<br>— Sin errores de sintaxis SQL |
| **Cómo probarla** | `SELECT * FROM information_schema.schemata` |
| **Resultado esperado** | Schemas y ENUMs listos en la base de datos |

---

## E24-T03: Migración de tabla empresa

| Campo | Valor |
|-------|-------|
| **Objetivo** | Crear tabla `core.empresa` con todos sus campos |
| **Descripción** | Migración SQL con tabla empresa, índices, RLS. Siguiendo el modelo de CF-020 sección 3.1. |
| **Archivos afectados** | `supabase/migrations/003_empresa.sql` |
| **Dependencias** | E24-T02 |
| **Estimación** | 1h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Tabla creada con todos los campos<br>— Índices creados<br>— RLS habilitado<br>— Políticas de acceso creadas |
| **Cómo probarla** | `INSERT INTO core.empresa ...` funciona con permisos |
| **Resultado esperado** | Tabla empresa operativa |

---

## E24-T04: Migración de tabla usuario

| Campo | Valor |
|-------|-------|
| **Objetivo** | Crear tabla `auth.usuario` vinculada a Supabase Auth |
| **Descripción** | Migración SQL con tabla usuario, FK a `auth.users` de Supabase, campos de perfil, RLS. |
| **Archivos afectados** | `supabase/migrations/004_usuario.sql` |
| **Dependencias** | E24-T02, E24-T03 |
| **Estimación** | 1h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Tabla creada<br>— FK a `auth.users`<br>— FK a `core.empresa`<br>— RLS configurado |
| **Cómo probarla** | Crear usuario desde Trigger after signup |
| **Resultado esperado** | Tabla usuario operativa y sincronizada con Auth |

---

## E24-T05: Trigger de creación de usuario al registrarse

| Campo | Valor |
|-------|-------|
| **Objetivo** | Crear automáticamente registro en `auth.usuario` cuando alguien se registra |
| **Descripción** | Trigger SQL `on_auth_user_created` en `auth.users` que inserta en `auth.usuario` y `core.cliente`. Asigna rol 'cliente' por defecto. |
| **Archivos afectados** | `supabase/migrations/005_trigger_auth_user.sql` |
| **Dependencias** | E24-T04 |
| **Estimación** | 2h |
| **Riesgo** | Medio |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Trigger creado<br>— Al registrar, se crea usuario y cliente<br>— Rol 'cliente' asignado automáticamente |
| **Cómo probarla** | Registrar nuevo usuario, verificar filas en `auth.usuario` y `core.cliente` |
| **Resultado esperado** | Sincronización automática entre Auth y tablas internas |

---

## E24-T06: Migración de tabla cliente

| Campo | Valor |
|-------|-------|
| **Objetivo** | Crear tabla `core.cliente` con todos sus campos |
| **Descripción** | Migración SQL con campos, FKs, índices, RLS. |
| **Archivos afectados** | `supabase/migrations/006_cliente.sql` |
| **Dependencias** | E24-T03, E24-T04 |
| **Estimación** | 1h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Tabla creada<br>— FK a empresa y usuario<br>— RLS configurado |
| **Cómo probarla** | `SELECT * FROM core.cliente` devuelve registros |
| **Resultado esperado** | Tabla cliente operativa |

---

## E24-T07: Migración de tabla inmueble

| Campo | Valor |
|-------|-------|
| **Objetivo** | Crear tabla `core.inmueble` con todos sus campos |
| **Descripción** | Migración SQL con campos de dirección, referencia catastral, tipo, superficie, año. FKs a cliente y empresa. |
| **Archivos afectados** | `supabase/migrations/007_inmueble.sql` |
| **Dependencias** | E24-T03, E24-T06 |
| **Estimación** | 1h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Tabla creada<br>— Validación de referencia catastral (14 dígitos)<br>— RLS configurado |
| **Cómo probarla** | Insertar inmueble, verificar restricciones |
| **Resultado esperado** | Tabla inmueble operativa |

---

## E24-T08: Migración de tabla servicio

| Campo | Valor |
|-------|-------|
| **Objetivo** | Crear tabla `core.servicio` con servicios disponibles |
| **Descripción** | Migración SQL con campos de nombre, código, precio, duración estimada. Seed inicial con los 3 servicios. |
| **Archivos afectados** | `supabase/migrations/008_servicio.sql` |
| **Dependencias** | E24-T03 |
| **Estimación** | 1h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Tabla creada<br>— Seed con servicios insertados |
| **Cómo probarla** | `SELECT * FROM core.servicio` devuelve los servicios |
| **Resultado esperado** | Servicios precargados en BD |

---

## E24-T09: Migración de tabla expediente

| Campo | Valor |
|-------|-------|
| **Objetivo** | Crear tabla `core.expediente`, la entidad central del sistema |
| **Descripción** | Migración SQL con todos los campos: estado, tipo_servicio, fechas, FKs a cliente, inmueble, servicio, usuario (técnico asignado). CHECK constraints para estados válidos. |
| **Archivos afectados** | `supabase/migrations/009_expediente.sql` |
| **Dependencias** | E24-T03, E24-T06, E24-T07, E24-T08 |
| **Estimación** | 2h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Tabla creada con todos los campos<br>— CHECK constraint en estado<br>— FKs correctas<br>— RLS configurado |
| **Cómo probarla** | Insertar expediente completo, verificar FK |
| **Resultado esperado** | Tabla expediente operativa |

---

## E24-T10: Migración de tabla actividad (eventos)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Crear tabla `events.actividad` para eventos inmutables |
| **Descripción** | Migración SQL con campos: tipo, datos JSONB, actor, timestamp. RLS de solo INSERT y SELECT (no UPDATE/DELETE). Índices compuestos. |
| **Archivos afectados** | `supabase/migrations/010_actividad.sql` |
| **Dependencias** | E24-T02, E24-T09 |
| **Estimación** | 1h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Tabla creada<br>— RLS solo INSERT/SELECT<br>— Política de no UPDATE/DELETE |
| **Cómo probarla** | Intentar UPDATE en events.actividad → error |
| **Resultado esperado** | Tabla actividad inmutable operativa |

---

## E24-T11: Migración de tabla pago

| Campo | Valor |
|-------|-------|
| **Objetivo** | Crear tabla `billing.pago` para registro de pagos |
| **Descripción** | Migración SQL con campos: importe, estado, método, mypos_transaction_id, mypos_link, fechas. FKs a expediente y empresa. |
| **Archivos afectados** | `supabase/migrations/011_pago.sql` |
| **Dependencias** | E24-T03, E24-T09 |
| **Estimación** | 1h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Tabla creada<br>— FK a expediente<br>— CHECK en estado |
| **Cómo probarla** | Insertar pago vinculado a expediente |
| **Resultado esperado** | Tabla pago operativa |

---

## E24-T12: Migración de tabla documento

| Campo | Valor |
|-------|-------|
| **Objetivo** | Crear tabla `core.documento` para gestión de archivos |
| **Descripción** | Migración SQL con campos: tipo, nombre, storage_path, hash_sha256, tamaño, versión, metadatos JSONB. FKs a expediente, inmueble, empresa. |
| **Archivos afectados** | `supabase/migrations/012_documento.sql` |
| **Dependencias** | E24-T03, E24-T09 |
| **Estimación** | 1h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Tabla creada<br>— Hash SHA-256 almacenado<br>— Versionado (versión INTEGER)<br>— RLS configurado |
| **Cómo probarla** | Insertar documento con hash, verificar unique |
| **Resultado esperado** | Tabla documento operativa |

---

## E24-T13: Migración de tablas PITR (plantilla, sección, pregunta)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Crear tablas del motor PITR en schema `pitr` |
| **Descripción** | Migraciones para `plantilla_pitr`, `seccion_pitr`, `pregunta_pitr`. Cada una con sus campos, FKs, ordenación, validaciones. |
| **Archivos afectados** | `supabase/migrations/013_pitr_templates.sql` |
| **Dependencias** | E24-T02, E24-T03 |
| **Estimación** | 2h |
| **Riesgo** | Bajo |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Tablas creadas<br>— FK entre plantilla → sección → pregunta<br>— Orden por numero_orden<br>— RLS configurado |
| **Cómo probarla** | Insertar plantilla con secciones y preguntas |
| **Resultado esperado** | Tablas PITR operativas |

---

## E24-T14: Migración de tablas respuesta PITR y firma

| Campo | Valor |
|-------|-------|
| **Objetivo** | Crear tablas `respuesta_pitr` y `firma_pitr` |
| **Descripción** | Migraciones para almacenar respuestas de inspección y firmas digitales. Versionado con optimistic locking. |
| **Archivos afectados** | `supabase/migrations/014_pitr_respuestas.sql` |
| **Dependencias** | E24-T09, E24-T13 |
| **Estimación** | 2h |
| **Riesgo** | Bajo |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Tablas creadas<br>— FK a expediente y plantilla<br>— CHECK progreso 0-100<br>— Firma con hash SHA-256 |
| **Cómo probarla** | Insertar respuesta, verificar progreso |
| **Resultado esperado** | Respuestas PITR persistentes en BD |

---

## E24-T15: Migración de tabla observatorio

| Campo | Valor |
|-------|-------|
| **Objetivo** | Crear tabla `analytics.observatorio` para datos anonimizados |
| **Descripción** | Migración SQL con todos los campos de datos anonimizados. Restricciones de letras A-G, diferencia 0-6. Sin datos personales. RLS público de solo lectura. |
| **Archivos afectados** | `supabase/migrations/015_observatorio.sql` |
| **Dependencias** | E24-T02, E24-T09 |
| **Estimación** | 1h |
| **Riesgo** | Bajo |
| **Prioridad** | P2 |
| **Criterios de aceptación** | — Tabla creada<br>— CHECK constraints en letras<br>— Sin datos personales en esquema<br>— RLS público SELECT |
| **Cómo probarla** | Insertar registro anonimizado, consultar sin autenticación |
| **Resultado esperado** | Tabla observatorio pública operativa |

---

## E24-T16: Seeds de datos iniciales

| Campo | Valor |
|-------|-------|
| **Objetivo** | Poblar la base de datos con datos de prueba |
| **Descripción** | Crear archivo seed con: 1 empresa demo, 1 admin, 1 técnico, 1 cliente, 1 inmueble, 1 expediente de prueba, 1 plantilla PITR básica. |
| **Archivos afectados** | `supabase/seed.sql` |
| **Dependencias** | E24-T03 a E24-T15 |
| **Estimación** | 2h |
| **Riesgo** | Bajo |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Seed ejecutable<br>— Datos coherentes (FKs válidas)<br>— Contraseñas de prueba documentadas |
| **Cómo probarla** | `supabase db reset` ejecuta seed y datos visibles |
| **Resultado esperado** | BD poblada con datos de prueba funcionales |

---

# 6. ÉPICA 25 — STORAGE

> Buckets, upload, download, signed URLs, versionado, hash.

---

## E25-T01: Crear buckets de Storage

| Campo | Valor |
|-------|-------|
| **Objetivo** | Tener todos los buckets de Supabase Storage creados |
| **Descripción** | Crear buckets vía SQL/Supabase Admin: `documentos-expediente`, `informes`, `firmas`, `facturas`, `fotos-inmueble`, `publico`. Configurar visibilidad (privado/público). |
| **Archivos afectados** | `supabase/migrations/016_buckets.sql` |
| **Dependencias** | E22-T01 |
| **Estimación** | 1h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — 6 buckets creados<br>— Visibilidad correcta<br>— RLS configurado en cada bucket |
| **Cómo probarla** | Listar buckets desde Supabase dashboard |
| **Resultado esperado** | Buckets listos para almacenar archivos |

---

## E25-T02: Implementar upload de documentos

| Campo | Valor |
|-------|-------|
| **Objetivo** | Cliente puede subir documentos a Supabase Storage |
| **Descripción** | Crear función `uploadDocument()` en `src/lib/storage/upload.ts`. Recibir File, expediente_id, tipo_documento. Generar hash SHA-256, subir a bucket, crear registro en `core.documento`. |
| **Archivos afectados** | `src/lib/storage/upload.ts` (nuevo), `src/lib/storage/hash.ts` (nuevo) |
| **Dependencias** | E25-T01, E24-T12 |
| **Estimación** | 3h |
| **Riesgo** | Medio |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Función `uploadDocument()` implementada<br>— Hash SHA-256 calculado<br>— Documento registrado en `core.documento`<br>— Ruta en Storage: `{empresa_id}/{expediente_id}/{tipo}/{archivo}` |
| **Cómo probarla** | Subir PDF desde UI, verificar en Storage y en tabla documentos |
| **Resultado esperado** | Documentos subidos y registrados correctamente |

---

## E25-T03: Implementar download de documentos

| Campo | Valor |
|-------|-------|
| **Objetivo** | Usuario puede descargar documentos desde Storage |
| **Descripción** | Crear función `getDocumentUrl()` que genere signed URL (válida 1h). Crear componente `DocumentDownload` con botón de descarga y estado de carga. |
| **Archivos afectados** | `src/lib/storage/download.ts`, `src/components/storage/document-download.tsx` |
| **Dependencias** | E25-T02 |
| **Estimación** | 2h |
| **Riesgo** | Medio |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Signed URL generada con expiración 1h<br>— Descarga funcional en navegador<br>— Estado de carga durante descarga<br>— Error si archivo no existe |
| **Cómo probarla** | Subir documento, descargarlo desde la UI |
| **Resultado esperado** | Descarga de documentos funcional con URLs seguras |

---

## E25-T04: Implementar signed URLs para documentos compartidos

| Campo | Valor |
|-------|-------|
| **Objetivo** | Generar enlaces temporales para compartir documentos |
| **Descripción** | Crear función `createSharedUrl()` que genere signed URL con expiración configurable (1h, 24h, 7d). Crear endpoint API para generar link. |
| **Archivos afectados** | `src/lib/storage/signed-url.ts`, `src/app/api/storage/signed-url/route.ts` |
| **Dependencias** | E25-T03 |
| **Estimación** | 2h |
| **Riesgo** | Medio |
| **Prioridad** | P2 |
| **Criterios de aceptación** | — Signed URL generada<br>— TTL configurable<br>— Endpoint API protegido por auth<br>— Link funcional en navegador |
| **Cómo probarla** | Generar signed URL desde API, abrir en ventana de incógnito |
| **Resultado esperado** | Enlaces temporales seguros para compartir documentos |

---

## E25-T05: Implementar versionado de documentos

| Campo | Valor |
|-------|-------|
| **Objetivo** | Mantener historial de versiones de cada documento |
| **Descripción** | Implementar lógica de versionado: al subir documento con mismo tipo y expediente, incrementar versión. Guardar versión anterior como registro histórico. Función `getLatestDocument()` y `getDocumentVersions()`. |
| **Archivos afectados** | `src/lib/storage/versioning.ts` (nuevo) |
| **Dependencias** | E25-T02 |
| **Estimación** | 3h |
| **Riesgo** | Medio |
| **Prioridad** | P2 |
| **Criterios de aceptación** | — Versiones se incrementan automáticamente<br>— Versión anterior accesible como histórico<br>— `getLatestDocument()` devuelve la más reciente<br>— `getDocumentVersions()` devuelve historial |
| **Cómo probarla** | Subir mismo documento 2 veces, verificar versión 1 y 2 |
| **Resultado esperado** | Versionado de documentos funcional con trazabilidad |

---

## E25-T06: Implementar detección de duplicados por hash

| Campo | Valor |
|-------|-------|
| **Objetivo** | Evitar almacenar archivos duplicados |
| **Descripción** | En `uploadDocument()`, antes de subir, consultar si el hash SHA-256 ya existe. Si existe, crear nuevo registro en `core.documento` apuntando al mismo storage_path (sin duplicar el archivo físico). |
| **Archivos afectados** | `src/lib/storage/upload.ts` (modificar) |
| **Dependencias** | E25-T02 |
| **Estimación** | 2h |
| **Riesgo** | Bajo |
| **Prioridad** | P2 |
| **Criterios de aceptación** | — Hash duplicado detectado<br>— No se sube archivo duplicado<br>— Nuevo registro en tabla<br>— Referencia al mismo storage_path |
| **Cómo probarla** | Subir mismo archivo dos veces, verificar solo un archivo en Storage |
| **Resultado esperado** | Sin duplicados físicos en Storage |

---

# 7. ÉPICA 26 — EXPEDIENTES

> Crear, editar, estados, eventos, timeline, dashboard.

---

## E26-T01: Implementar creación de expediente (borrador)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Cliente puede crear un nuevo expediente |
| **Descripción** | Crear página `/nuevo-expediente` con wizard de 3 pasos: 1) seleccionar servicio, 2) datos del inmueble (nuevo o existente), 3) resumen y crear. Estado inicial: `PAGO_RECIBIDO` (o `EXPEDIENTE_CREADO` según flujo). |
| **Archivos afectados** | `src/app/(plataforma)/nuevo-expediente/page.tsx`, `src/app/(plataforma)/nuevo-expediente/wizard.tsx`, `src/lib/expediente/crear.ts` |
| **Dependencias** | E23-T01, E24-T09, E24-T11 |
| **Estimación** | 4h |
| **Riesgo** | Medio |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Wizard de 3 pasos funcional<br>— Selección de servicio<br>— Creación o selección de inmueble existente<br>— Expediente creado en BD<br>— Evento `EXPEDIENTE_CREADO` registrado<br>— Redirección a detalle del expediente |
| **Cómo probarla** | Completar wizard, verificar expediente creado en BD |
| **Resultado esperado** | Creación de expediente funcional con eventos |

---

## E26-T02: Implementar listado de expedientes del cliente

| Campo | Valor |
|-------|-------|
| **Objetivo** | Cliente ve todos sus expedientes en el dashboard |
| **Descripción** | Crear componente `ExpedienteList` en dashboard con tabla: número, servicio, estado, fecha, acciones. Filtros por estado y búsqueda. Estados de carga, vacío y error. |
| **Archivos afectados** | `src/components/plataforma/expediente-list.tsx`, `src/app/(plataforma)/mis-expedientes/page.tsx` |
| **Dependencias** | E26-T01 |
| **Estimación** | 3h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Lista de expedientes del cliente autenticado<br>— Columnas visibles: nº, servicio, estado, fecha, acciones<br>— Filtro por estado<br>— Estados loading, empty, error |
| **Cómo probarla** | Crear varios expedientes, ver listado |
| **Resultado esperado** | Listado de expedientes con filtros funcional |

---

## E26-T03: Implementar detalle de expediente

| Campo | Valor |
|-------|-------|
| **Objetivo** | Cliente/técnico puede ver el detalle completo de un expediente |
| **Descripción** | Crear página `/expediente/[id]` con: datos generales, servicio contratado, inmueble, documentos, timeline de eventos, botón de acción según estado. |
| **Archivos afectados** | `src/app/(plataforma)/expediente/[id]/page.tsx`, `src/components/plataforma/expediente-detalle.tsx` |
| **Dependencias** | E26-T01 |
| **Estimación** | 4h |
| **Riesgo** | Medio |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Datos del expediente visibles<br>— Inmueble asociado visible<br>— Documentos listados<br>— Timeline de eventos visible<br>— Botones de acción según estado y rol |
| **Cómo probarla** | Navegar a detalle de expediente creado |
| **Resultado esperado** | Vista detallada de expediente completa |

---

## E26-T04: Implementar máquina de estados de expediente

| Campo | Valor |
|-------|-------|
| **Objetivo** | Transiciones de estado controladas y validadas |
| **Descripción** | Crear `src/lib/expediente/estados.ts` con máquina de estados: `PAGO_RECIBIDO → EXPEDIENTE_CREADO → ESPERANDO_INFORMACION → INFORMACION_RECIBIDA → EN_REVISION → INFORME_ENVIADO → CERRADO`. Función `transitarEstado(expedienteId, nuevoEstado)` que valida transición y registra evento. |
| **Archivos afectados** | `src/lib/expediente/estados.ts`, `src/lib/expediente/transiciones.ts` |
| **Dependencias** | E24-T09, E24-T10 |
| **Estimación** | 3h |
| **Riesgo** | Medio |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Función `transitarEstado()` implementada<br>— Transiciones inválidas rechazadas con error<br>— Evento registrado en cada transición<br>— Timestamp `updated_at` actualizado |
| **Cómo probarla** | Transitar estado válido → éxito. Transitar estado inválido → error. |
| **Resultado esperado** | Máquina de estados operativa con eventos |

---

## E26-T05: Implementar timeline de eventos en expediente

| Campo | Valor |
|-------|-------|
| **Objetivo** | Mostrar historial cronológico de eventos del expediente |
| **Descripción** | Crear componente `EventTimeline` que muestre eventos ordenados por timestamp descendente. Cada evento con icono según tipo, fecha legible, descripción. Scroll infinito o paginación. |
| **Archivos afectados** | `src/components/plataforma/event-timeline.tsx` |
| **Dependencias** | E26-T03, E26-T04 |
| **Estimación** | 3h |
| **Riesgo** | Bajo |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Eventos ordenados por fecha descendente<br>— Icono por tipo de evento<br>— Fecha legible (formato relativo)<br>— Paginación si > 20 eventos<br>— Estado vacío si no hay eventos |
| **Cómo probarla** | Crear expediente, realizar acciones, ver timeline |
| **Resultado esperado** | Timeline funcional con todos los eventos del expediente |

---

## E26-T06: Implementar dashboard de cliente

| Campo | Valor |
|-------|-------|
| **Objetivo** | Cliente tiene dashboard con resumen de su actividad |
| **Descripción** | Crear página `/dashboard` con: resumen de expedientes (total, activos, cerrados), timeline de últimos eventos, botón "Nuevo expediente", notificaciones recientes. |
| **Archivos afectados** | `src/app/(plataforma)/dashboard/page.tsx` |
| **Dependencias** | E26-T02, E26-T05 |
| **Estimación** | 3h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Cards con totales de expedientes<br>— Últimos eventos visibles<br>— Botón "Nuevo expediente" funcional<br>— Notificaciones recientes |
| **Cómo probarla** | Iniciar sesión como cliente, ver dashboard |
| **Resultado esperado** | Dashboard de cliente con información relevante |

---

# 8. ÉPICA 27 — PITR

> Persistencia, fotos, firmas, PDF, autoguardado.

---

## E27-T01: Migrar motor PITR existente a usar Supabase

| Campo | Valor |
|-------|-------|
| **Objetivo** | El motor PITR persiste respuestas en Supabase en lugar de localStorage |
| **Descripción** | Modificar `src/lib/pitr/use-pitr.ts` para que `guardarRespuesta()` y `cargarRespuesta()` usen Supabase (tabla `respuesta_pitr`) en lugar de localStorage. Mantener caché local como fallback offline. |
| **Archivos afectados** | `src/lib/pitr/use-pitr.ts`, `src/lib/pitr/supabase-persistence.ts` (nuevo) |
| **Dependencias** | E24-T14, E26-T01 |
| **Estimación** | 4h |
| **Riesgo** | Alto |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Respuestas guardadas en Supabase (`respuesta_pitr`)<br>— Carga de respuestas desde Supabase<br>— Caché local como fallback<br>— Incremento de versión en cada guardado<br>— Sin pérdida de datos offline |
| **Cómo probarla** | Iniciar PITR, responder preguntas, verificar en BD. Desconectar red, responder, reconectar, verificar persistencia. |
| **Resultado esperado** | Persistencia PITR en Supabase con caché local |

---

## E27-T02: Implementar autoguardado automático

| Campo | Valor |
|-------|-------|
| **Objetivo** | Las respuestas del PITR se autoguardan cada 30 segundos y al cambiar de pregunta |
| **Descripción** | Implementar autosave en `use-pitr.ts`: guardar automáticamente cada 30s, al cambiar de bloque/pregunta, al cerrar pestaña (beforeunload). Mostrar indicador "Guardado" / "Guardando..." / "Error al guardar". |
| **Archivos afectados** | `src/lib/pitr/use-pitr.ts`, `src/lib/pitr/autosave.ts` (nuevo) |
| **Dependencias** | E27-T01 |
| **Estimación** | 3h |
| **Riesgo** | Medio |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Autoguardado cada 30s<br>— Guardado al cambiar de pregunta<br>— beforeunload activa guardado<br>— Indicador visual de estado de guardado<br>— Sin pérdida de datos al cerrar pestaña |
| **Cómo probarla** | Responder preguntas, esperar 30s, verificar BD. Cerrar pestaña, reabrir, verificar datos. |
| **Resultado esperado** | Autoguardado funcional sin pérdida de datos |

---

## E27-T03: Implementar subida de fotos durante PITR

| Campo | Valor |
|-------|-------|
| **Objetivo** | Cliente puede subir fotos del inmueble durante la inspección |
| **Descripción** | Implementar componente `PitrPhotoUpload` que permita: hacer foto con cámara (dispositivos móviles), seleccionar desde galería, previsualizar, eliminar. Subir a bucket `fotos-inmueble`. Asociar a pregunta PITR correspondiente. |
| **Archivos afectados** | `src/components/pitr/pitr-photo-upload.tsx`, `src/lib/pitr/photo-upload.ts` |
| **Dependencias** | E25-T02, E27-T01 |
| **Estimación** | 4h |
| **Riesgo** | Medio |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Captura de foto desde cámara<br>— Selección desde galería<br>— Previsualización antes de guardar<br>— Subida a Storage bucket correcto<br>— Asociación a pregunta PITR |
| **Cómo probarla** | Iniciar PITR, subir foto, verificar en Storage y BD |
| **Resultado esperado** | Fotos subidas y asociadas a preguntas del PITR |

---

## E27-T04: Implementar firma digital del cliente

| Campo | Valor |
|-------|-------|
| **Objetivo** | Cliente firma digitalmente al completar el PITR |
| **Descripción** | Crear componente `FirmaPad` con canvas para firma manuscrita. Al completar PITR, solicitar firma. Guardar como PNG en bucket `firmas`. Registrar en `firma_pitr` con hash SHA-256. |
| **Archivos afectados** | `src/components/pitr/firma-pad.tsx`, `src/lib/pitr/firma.ts` |
| **Dependencias** | E25-T02, E27-T01 |
| **Estimación** | 4h |
| **Riesgo** | Medio |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Canvas de firma funcional (touch + mouse)<br>— Botón "Limpiar" y "Confirmar"<br>— Firma guardada como PNG<br>— Hash SHA-256 calculado<br>— Registro en `firma_pitr` |
| **Cómo probarla** | Completar PITR, firmar, verificar firma en Storage y BD |
| **Resultado esperado** | Firma digital del cliente almacenada con integridad criptográfica |

---

## E27-T05: Implementar generación de PDF del informe

| Campo | Valor |
|-------|-------|
| **Objetivo** | Generar PDF del informe técnico a partir de los datos del PITR |
| **Descripción** | Crear función `generarPDF()` que tome los datos del expediente + respuestas PITR + dictamen y genere PDF con librería (pdf-lib, puppeteer, o API). Incluir: encabezado, datos cliente/inmueble, resumen respuestas, dictamen, firma. |
| **Archivos afectados** | `src/lib/pitr/generar-pdf.ts`, `package.json` |
| **Dependencias** | E27-T04, E26-T04 |
| **Estimación** | 4h |
| **Riesgo** | Alto |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — PDF generado con datos correctos<br>— Encabezado con logo y datos de Certilab<br>— Datos del cliente e inmueble<br>— Resumen de respuestas PITR<br>— Dictamen visible<br>— Firma digital incluida<br>— PDF subido a bucket `informes` |
| **Cómo probarla** | Cerrar expediente con dictamen, verificar PDF generado |
| **Resultado esperado** | PDF del informe generado y almacenado automáticamente |

---

## E27-T06: Implementar estado de progreso del PITR

| Campo | Valor |
|-------|-------|
| **Objetivo** | Cliente ve su progreso en la inspección |
| **Descripción** | Crear componente `PitrProgress` con barra de progreso (0-100%), bloques completados/pendientes, tiempo estimado restante. Persistir progreso en `respuesta_pitr.progreso`. |
| **Archivos afectados** | `src/components/pitr/pitr-progress.tsx`, `src/lib/pitr/progress.ts` |
| **Dependencias** | E27-T01 |
| **Estimación** | 2h |
| **Riesgo** | Bajo |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Barra de progreso visible durante PITR<br>— Porcentaje correcto (preguntas respondidas / total)<br>— Bloques completados marcados en verde<br>— Tiempo estimado mostrado |
| **Cómo probarla** | Iniciar PITR, responder preguntas, verificar progreso |
| **Resultado esperado** | Indicador de progreso funcional |

---

# 9. ÉPICA 28 — BACKOFFICE

> Cola de trabajo, detalle expediente, revisión, dictamen.

---

## E28-T01: Implementar lista de expedientes para técnico

| Campo | Valor |
|-------|-------|
| **Objetivo** | Técnico/admin ve todos los expedientes de la empresa |
| **Descripción** | Crear página `/backoffice/expedientes` con tabla completa: nº expediente, cliente, servicio, estado, fecha creación, técnico asignado, prioridad. Filtros combinados (estado, servicio, fecha). Paginación. |
| **Archivos afectados** | `src/app/(plataforma)/backoffice/expedientes/page.tsx`, `src/components/backoffice/expedientes-table.tsx` |
| **Dependencias** | E26-T02, E23-T08 |
| **Estimación** | 4h |
| **Riesgo** | Medio |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Lista completa de expedientes (sin filtrar por cliente)<br>— Filtros por estado, servicio, técnico, fecha<br>— Paginación (20 por página)<br>— Columna de prioridad<br>— Estado vacío si no hay expedientes<br>— Solo accesible para admin/tecnico |
| **Cómo probarla** | Iniciar sesión como técnico, acceder a backoffice |
| **Resultado esperado** | Backoffice con lista completa de expedientes |

---

## E28-T02: Implementar detalle de expediente en backoffice

| Campo | Valor |
|-------|-------|
| **Objetivo** | Técnico ve detalle completo con datos del cliente e inmueble |
| **Descripción** | Crear página `/backoffice/expedientes/[id]` con: datos del expediente, datos del cliente (nombre, email, teléfono), datos del inmueble, documentos subidos, timeline, respuestas PITR, acciones disponibles. |
| **Archivos afectados** | `src/app/(plataforma)/backoffice/expedientes/[id]/page.tsx`, `src/components/backoffice/expediente-detalle-bo.tsx` |
| **Dependencias** | E28-T01, E27-T01 |
| **Estimación** | 4h |
| **Riesgo** | Medio |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Datos del expediente visibles<br>— Datos del cliente visibles<br>— Datos del inmueble visibles<br>— Documentos listados con descarga<br>— Timeline de eventos<br>— Respuestas PITR visibles |
| **Cómo probarla** | Acceder a detalle de expediente como técnico |
| **Resultado esperado** | Vista completa de expediente para técnico |

---

## E28-T03: Implementar cola de trabajo (asignación automática)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Los expedientes se asignan automáticamente a técnicos disponibles |
| **Descripción** | Implementar lógica de asignación: al llegar a `EN_REVISION`, asignar al técnico con menos expedientes activos. Mostrar cola en `/backoffice` con prioridad (fecha + urgencia). Permitir reasignación manual por admin. |
| **Archivos afectados** | `src/lib/expediente/asignacion.ts`, `src/components/backoffice/cola-trabajo.tsx` |
| **Dependencias** | E28-T02 |
| **Estimación** | 3h |
| **Riesgo** | Medio |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Asignación automática al llegar a EN_REVISION<br>— Cola ordenada por prioridad<br>— Reasignación manual por admin<br>— Evento registrado al asignar |
| **Cómo probarla** | Transitar expediente a EN_REVISION, verificar técnico asignado |
| **Resultado esperado** | Cola de trabajo con asignación automática |

---

## E28-T04: Implementar panel de revisión PITR

| Campo | Valor |
|-------|-------|
| **Objetivo** | Técnico puede revisar las respuestas del PITR |
| **Descripción** | Crear componente `PitrReview` que muestre todas las respuestas del cliente organizadas por bloque. Fotos visibles en línea. Posibilidad de marcar respuestas como válidas o solicitar corrección. |
| **Archivos afectados** | `src/components/backoffice/pitr-review.tsx` |
| **Dependencias** | E27-T01, E28-T02 |
| **Estimación** | 4h |
| **Riesgo** | Medio |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Respuestas visibles por bloque<br>— Fotos visibles en línea<br>— Botón "Validar respuesta"<br>— Botón "Solicitar corrección"<br>— Nota del técnico por respuesta |
| **Cómo probarla** | Completar PITR como cliente, revisar como técnico |
| **Resultado esperado** | Panel de revisión PITR funcional |

---

## E28-T05: Implementar emisión de dictamen

| Campo | Valor |
|-------|-------|
| **Objetivo** | Técnico puede emitir dictamen sobre el certificado |
| **Descripción** | Crear formulario de dictamen con campos: letra energética detectada (A-G), conclusión (CORRECTO/INFLADO/MAL_CALCULADO/FALSEADO), observaciones, notas internas. Al emitir: registrar evento `DICTAMEN_EMITIDO`, transitar a `INFORME_ENVIADO`, generar PDF. |
| **Archivos afectados** | `src/components/backoffice/dictamen-form.tsx`, `src/lib/expediente/dictamen.ts` |
| **Dependencias** | E28-T04, E26-T04, E27-T05 |
| **Estimación** | 4h |
| **Riesgo** | Alto |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Formulario con letra A-G<br>— 4 opciones de conclusión<br>— Campo de observaciones<br>— Notas internas (solo visibles para técnico)<br>— Al emitir: evento registrado<br>— Estado transita a INFORME_ENVIADO<br>— PDF generado automáticamente |
| **Cómo probarla** | Revisar expediente, emitir dictamen, verificar PDF y evento |
| **Resultado esperado** | Dictamen emitido con evento, PDF generado |

---

## E28-T06: Implementar cierre de expediente

| Campo | Valor |
|-------|-------|
| **Objetivo** | Técnico/admin puede cerrar el expediente tras emitir informe |
| **Descripción** | Botón "Cerrar expediente" que transita a `CERRADO`. Registrar evento `EXPEDIENTE_CERRADO`. Disparar workflow de anonimización (observatorio). El cliente ya no puede modificar datos. |
| **Archivos afectados** | `src/components/backoffice/cierre-expediente.tsx`, `src/lib/expediente/cierre.ts` |
| **Dependencias** | E28-T05 |
| **Estimación** | 2h |
| **Riesgo** | Medio |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Botón "Cerrar expediente" visible solo para admin/tecnico<br>— Confirmación antes de cerrar<br>— Evento `EXPEDIENTE_CERRADO` registrado<br>— Estado transita a CERRADO<br>— Cliente bloqueado para edición |
| **Cómo probarla** | Emitir dictamen, cerrar expediente, verificar estado |
| **Resultado esperado** | Cierre de expediente funcional con bloqueo de edición |

---

# 10. ÉPICA 29 — CLIENTE

> Dashboard, estado, mensajes, documentos, descargas.

---

## E29-T01: Implementar vista de estado del expediente para cliente

| Campo | Valor |
|-------|-------|
| **Objetivo** | Cliente ve el estado actual de su expediente de forma clara |
| **Descripción** | Crear componente `EstadoExpediente` que muestre: estado actual con icono, fecha del último cambio, descripción del estado en lenguaje llano, próximos pasos esperados. |
| **Archivos afectados** | `src/components/plataforma/estado-expediente.tsx` |
| **Dependencias** | E26-T03 |
| **Estimación** | 2h |
| **Riesgo** | Bajo |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Estado mostrado con icono claro<br>— Fecha del último cambio<br>— Texto en lenguaje no técnico<br>— Próximos pasos visibles |
| **Cómo probarla** | Ver detalle de expediente como cliente |
| **Resultado esperado** | Cliente entiende el estado sin jerga técnica |

---

## E29-T02: Implementar notificaciones al cliente (dashboard + email)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Cliente recibe notificaciones de cambios en su expediente |
| **Descripción** | Implementar sistema de notificaciones en plataforma (tabla `notificacion`). Al cambiar estado, crear notificación para el cliente. Mostrar en dashboard con badge de no leídas. Marcar como leídas. |
| **Archivos afectados** | `src/lib/notificaciones/notificaciones.ts`, `src/components/plataforma/notificaciones-dropdown.tsx`, `src/app/api/notificaciones/marcar-leida/route.ts` |
| **Dependencias** | E26-T04, E24-T13 (tabla notificacion) |
| **Estimación** | 3h |
| **Riesgo** | Medio |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Notificación creada al cambiar estado<br>— Badge de no leídas en dashboard<br>— Dropdown con últimas 10 notificaciones<br>— Marcar como leída funcional |
| **Cómo probarla** | Cambiar estado expediente, verificar notificación visible |
| **Resultado esperado** | Notificaciones en plataforma funcionales |

---

## E29-T03: Implementar descarga de documentos para el cliente

| Campo | Valor |
|-------|-------|
| **Objetivo** | Cliente puede descargar sus propios documentos |
| **Descripción** | En detalle de expediente, sección "Documentos" con lista de archivos subidos. Botón de descarga con signed URL (válida 1h). Mostrar tipo, nombre, fecha, tamaño. |
| **Archivos afectados** | `src/components/plataforma/documentos-list.tsx` |
| **Dependencias** | E25-T03, E26-T03 |
| **Estimación** | 2h |
| **Riesgo** | Bajo |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Lista de documentos del expediente<br>— Botón de descarga por documento<br>— Nombre, tipo, fecha, tamaño visibles<br>— Error si el archivo no existe |
| **Cómo probarla** | Subir documento, ver en detalle, descargar |
| **Resultado esperado** | Descarga de documentos funcional para el cliente |

---

## E29-T04: Implementar página de perfil/configuración del cliente

| Campo | Valor |
|-------|-------|
| **Objetivo** | Cliente puede ver y editar sus datos personales |
| **Descripción** | Crear página `/configuracion` con: datos personales (nombre, email, teléfono), cambio de contraseña, preferencias de notificación, historial de inicios de sesión, botón de eliminar cuenta (con confirmación). |
| **Archivos afectados** | `src/app/(plataforma)/configuracion/page.tsx`, `src/components/plataforma/perfil-form.tsx` |
| **Dependencias** | E23-T01 |
| **Estimación** | 3h |
| **Riesgo** | Bajo |
| **Prioridad** | P2 |
| **Criterios de aceptación** | — Datos personales editables<br>— Cambio de contraseña funcional<br>— Preferencias guardables<br>— Historial de sesiones visible |
| **Cómo probarla** | Acceder a configuración, modificar datos, guardar |
| **Resultado esperado** | Perfil de usuario configurable |

---

# 11. ÉPICA 30 — MYPOS

> Checkout, webhook, factura, estado.

---

## E30-T01: Integrar API de MyPOS para crear link de pago

| Campo | Valor |
|-------|-------|
| **Objetivo** | Generar link de pago MyPOS al crear expediente |
| **Descripción** | Implementar función `crearLinkPago()` que llame a API de MyPOS con importe, concepto, webhook URL. Almacenar link y transaction_id en `billing.pago`. Devolver URL para redirigir al cliente. |
| **Archivos afectados** | `src/lib/pagos/mypos.ts` (nuevo), `src/lib/pagos/types.ts` |
| **Dependencias** | E24-T11, E26-T01 |
| **Estimación** | 4h |
| **Riesgo** | Alto |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Llamada a API MyPOS exitosa<br>— Link de pago almacenado en BD<br>— transaction_id almacenado<br>— URL devuelta para redirección |
| **Cómo probarla** | Crear expediente, verificar link generado en BD |
| **Resultado esperado** | Link de pago MyPOS generado y almacenado |

---

## E30-T02: Implementar redirección a checkout MyPOS

| Campo | Valor |
|-------|-------|
| **Objetivo** | Cliente es redirigido a la pasarela de pago MyPOS |
| **Descripción** | Al crear expediente y generar link, redirigir al cliente a la URL de MyPOS. Crear página `/checkout` intermedia con resumen del pedido y botón "Pagar ahora". Mostrar estado de carga y error. |
| **Archivos afectados** | `src/app/(plataforma)/checkout/page.tsx`, `src/components/checkout/checkout-summary.tsx` |
| **Dependencias** | E30-T01 |
| **Estimación** | 2h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Página de checkout con resumen<br>— Botón "Pagar ahora" redirige a MyPOS<br>— Estado de carga mientras se genera link<br>— Error si falla generación |
| **Cómo probarla** | Crear expediente, ver página de checkout |
| **Resultado esperado** | Checkout funcional con redirección a MyPOS |

---

## E30-T03: Implementar webhook de MyPOS

| Campo | Valor |
|-------|-------|
| **Objetivo** | Recibir confirmación de pago desde MyPOS |
| **Descripción** | Crear API route `POST /api/webhooks/mypos` que reciba notificación de MyPOS. Validar firma del webhook. Actualizar estado del pago a COMPLETADO. Transitar expediente a PAGO_RECIBIDO. |
| **Archivos afectados** | `src/app/api/webhooks/mypos/route.ts`, `src/lib/pagos/webhook.ts` |
| **Dependencias** | E30-T01 |
| **Estimación** | 3h |
| **Riesgo** | Alto |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Webhook recibe POST<br>— Firma validada<br>— Pago actualizado a COMPLETADO<br>— Expediente transita a PAGO_RECIBIDO<br>— Evento registrado |
| **Cómo probarla** | Simular webhook MyPOS con curl |
| **Resultado esperado** | Webhook procesa pagos correctamente |

---

## E30-T04: Implementar generación de factura

| Campo | Valor |
|-------|-------|
| **Objetivo** | Generar factura en PDF tras pago confirmado |
| **Descripción** | Crear función `generarFactura()` que genere PDF con datos fiscales. Incluir: número de factura secuencial, datos de Certilab, datos del cliente, concepto, importe, IVA. Subir a bucket `facturas`. |
| **Archivos afectados** | `src/lib/pagos/factura.ts`, `src/lib/pagos/numero-factura.ts` |
| **Dependencias** | E30-T03 |
| **Estimación** | 3h |
| **Riesgo** | Medio |
| **Prioridad** | P2 |
| **Criterios de aceptación** | — Factura generada en PDF<br>— Número de factura secuencial<br>— Datos fiscales correctos<br>— IVA calculado<br>— Subida a bucket facturas |
| **Cómo probarla** | Confirmar pago, verificar factura generada |
| **Resultado esperado** | Factura generada automáticamente tras pago |

---

## E30-T05: Implementar consulta de estado de pago

| Campo | Valor |
|-------|-------|
| **Objetivo** | Consultar estado actualizado del pago desde MyPOS |
| **Descripción** | Función `consultarEstadoPago()` que llame a API MyPOS para verificar estado. Usar en dashboard para mostrar estado actualizado. Programar verificación automática cada 5 minutos si estado es PENDIENTE. |
| **Archivos afectados** | `src/lib/pagos/consulta.ts` |
| **Dependencias** | E30-T01 |
| **Estimación** | 2h |
| **Riesgo** | Medio |
| **Prioridad** | P2 |
| **Criterios de aceptación** | — Consulta a API MyPOS exitosa<br>— Estado devuelto correctamente<br>— Dashboard muestra estado actualizado<br>— Verificación automática cada 5 min |
| **Cómo probarla** | Ver dashboard con pago pendiente, esperar actualización |
| **Resultado esperado** | Estado de pago consultable y actualizable |

---

# 12. ÉPICA 31 — N8N

> Emails, automatizaciones, CRM, recordatorios.

---

## E31-T01: Configurar webhooks n8n en Supabase

| Campo | Valor |
|-------|-------|
| **Objetivo** | Supabase puede enviar eventos a n8n |
| **Descripción** | Crear tabla `webhook_outbox` para eventos que deben ser enviados a n8n. Implementar trigger que inserte en outbox al crear eventos. Crear endpoint `POST /api/webhooks/n8n/sync` para que n8n recolecte eventos pendientes. |
| **Archivos afectados** | `supabase/migrations/017_webhook_outbox.sql`, `src/app/api/webhooks/n8n/sync/route.ts` |
| **Dependencias** | E24-T10 |
| **Estimación** | 3h |
| **Riesgo** | Medio |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Tabla webhook_outbox creada<br>— Trigger inserta eventos relevantes<br>— Endpoint devuelve eventos pendientes<br>— Eventos marcados como enviados |
| **Cómo probarla** | Crear evento, verificar en webhook_outbox |
| **Resultado esperado** | Eventos disponibles para n8n |

---

## E31-T02: Implementar workflow n8n de email de bienvenida

| Campo | Valor |
|-------|-------|
| **Objetivo** | Nuevo cliente recibe email de bienvenida automático |
| **Descripción** | Workflow n8n: trigger (nuevo cliente en Supabase) → obtener datos → enviar email SMTP con plantilla "Bienvenido a Certilab". Incluir: nombre, link a dashboard, próximos pasos. |
| **Archivos afectados** | `n8n/workflows/bienvenida.json` (nuevo) |
| **Dependencias** | E31-T01 |
| **Estimación** | 2h |
| **Riesgo** | Medio |
| **Prioridad** | P2 |
| **Criterios de aceptación** | — Workflow creado en n8n<br>— Email enviado al crear cliente<br>— Plantilla correcta<br>— Sin errores en ejecución |
| **Cómo probarla** | Crear nuevo cliente, verificar email recibido |
| **Resultado esperado** | Email de bienvenida automático funcional |

---

## E31-T03: Implementar workflow n8n de email de cambio de estado

| Campo | Valor |
|-------|-------|
| **Objetivo** | Cliente recibe email cuando cambia el estado de su expediente |
| **Descripción** | Workflow n8n: trigger (cambio estado expediente) → obtener datos → enviar email con plantilla según estado. 8 plantillas de email. |
| **Archivos afectados** | `n8n/workflows/cambio-estado.json` (nuevo), `src/data/emails/plantillas.ts` |
| **Dependencias** | E31-T01 |
| **Estimación** | 3h |
| **Riesgo** | Medio |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Workflow creado<br>— Email enviado en cada cambio de estado<br>— Plantilla específica por estado<br>— Incluye número de expediente |
| **Cómo probarla** | Transitar expediente, verificar email recibido |
| **Resultado esperado** | Emails de cambio de estado automáticos |

---

## E31-T04: Implementar workflow n8n de recordatorio PITR pendiente

| Campo | Valor |
|-------|-------|
| **Objetivo** | Recordar al cliente completar el PITR si no lo ha hecho en 72h |
| **Descripción** | Workflow n8n: programado (cada 12h) → consultar expedientes en `PITR_EN_CURSO` con más de 72h sin cambios → enviar email recordatorio. Máximo 1 recordatorio cada 48h. |
| **Archivos afectados** | `n8n/workflows/recordatorio-pitr.json` (nuevo) |
| **Dependencias** | E31-T01 |
| **Estimación** | 2h |
| **Riesgo** | Bajo |
| **Prioridad** | P2 |
| **Criterios de aceptación** | — Workflow programado<br>— Consulta expedientes PITR_EN_CURSO > 72h<br>— Email enviado<br>— Límite de frecuencia 48h |
| **Cómo probarla** | Simular expediente PITR_EN_CURSO antiguo |
| **Resultado esperado** | Recordatorios automáticos de PITR pendiente |

---

## E31-T05: Implementar workflow n8n de anonimización observatorio

| Campo | Valor |
|-------|-------|
| **Objetivo** | Al cerrar expediente, anonimizar datos y publicar en observatorio |
| **Descripción** | Workflow n8n: trigger (expediente cerrado) → extraer datos → anonimizar (truncar CP, agrupar fechas, eliminar datos personales) → insertar en `analytics.observatorio`. |
| **Archivos afectados** | `n8n/workflows/anonimizar-observatorio.json` (nuevo) |
| **Dependencias** | E31-T01, E24-T15 |
| **Estimación** | 3h |
| **Riesgo** | Medio |
| **Prioridad** | P2 |
| **Criterios de aceptación** | — Workflow creado<br>— Datos anonimizados correctamente<br>— Sin datos personales en observatorio<br>— Insertado en tabla analytics.observatorio |
| **Cómo probarla** | Cerrar expediente, verificar registro en observatorio |
| **Resultado esperado** | Anonimización automática de expedientes cerrados |

---

# 13. ÉPICA 32 — OBSERVATORIO

> Anonimización, dataset, consultas, KPIs.

---

## E32-T01: Implementar página pública del Observatorio

| Campo | Valor |
|-------|-------|
| **Objetivo** | Página pública con datos del Observatorio |
| **Descripción** | Crear página `/observatorio` con: resumen de datos (total expedientes, % correctos/incorrectos), gráficos (distribución por letra, por dictamen, por CCAA), tabla de datos, descarga CSV/JSON. |
| **Archivos afectados** | `src/app/observatorio/page.tsx`, `src/components/observatorio/observatorio-dashboard.tsx` |
| **Dependencias** | E31-T05 |
| **Estimación** | 4h |
| **Riesgo** | Bajo |
| **Prioridad** | P2 |
| **Criterios de aceptación** | — Página pública (sin autenticación)<br>— Resumen con totales<br>— Gráficos estáticos (SVG)<br>— Tabla de datos<br>— Descarga CSV funcional<br>— SEO: metadatos, Schema.org Dataset |
| **Cómo probarla** | Acceder a /observatorio sin sesión |
| **Resultado esperado** | Observatorio público con datos anonimizados |

---

## E32-T02: Implementar endpoint de datos del Observatorio

| Campo | Valor |
|-------|-------|
| **Objetivo** | API pública para consultar datos del Observatorio (CSV/JSON) |
| **Descripción** | Crear API route `GET /api/observatorio/data` que devuelva datos en JSON o CSV según query param. Filtros: por rango de fechas, por dictamen, por CCAA. Paginación. |
| **Archivos afectados** | `src/app/api/observatorio/data/route.ts` |
| **Dependencias** | E32-T01 |
| **Estimación** | 3h |
| **Riesgo** | Bajo |
| **Prioridad** | P3 |
| **Criterios de aceptación** | — Endpoint público (sin auth)<br>— JSON y CSV según `?format=`<br>— Filtros funcionales<br>— Paginación |
| **Cómo probarla** | `curl http://localhost:3000/api/observatorio/data?format=json` |
| **Resultado esperado** | API pública del Observatorio funcional |

---

## E32-T03: Implementar KPIs del Observatorio

| Campo | Valor |
|-------|-------|
| **Objetivo** | Generar KPIs automáticos a partir de datos del Observatorio |
| **Descripción** | Crear función `calcularKPIs()` que agregue datos: % certificados incorrectos por CCAA, media de diferencia de letras, distribución por tipo de dictamen, evolución temporal. Almacenar en `agregado_observatorio`. |
| **Archivos afectados** | `src/lib/observatorio/kpis.ts`, `supabase/migrations/018_agregado_trigger.sql` |
| **Dependencias** | E31-T05, E24-T15 |
| **Estimación** | 3h |
| **Riesgo** | Bajo |
| **Prioridad** | P3 |
| **Criterios de aceptación** | — Función calcularKPIs implementada<br>— Datos agregados por provincia y dictamen<br>— Evolución temporal (por trimestre)<br>— Almacenados en agregado_observatorio |
| **Cómo probarla** | Ejecutar función, verificar datos agregados |
| **Resultado esperado** | KPIs del Observatorio calculados automáticamente |

---

# 14. ÉPICA 33 — IA

> OCR, RAG, embeddings, recomendaciones.

---

## E33-T01: Implementar OCR mejorado de certificados PDF

| Campo | Valor |
|-------|-------|
| **Objetivo** | Extraer datos de certificados PDF independientemente del formato |
| **Descripción** | Mejorar API `/api/extraer-certificado` con OCR vía IA (OpenAI Vision o Tesseract). Extraer: referencia catastral, dirección, letra, consumo, emisiones, fecha. Pre-llenar formulario PITR. |
| **Archivos afectados** | `src/app/api/extraer-certificado/route.ts`, `src/lib/ocr/ocr.ts` |
| **Dependencias** | E25-T02, E27-T01 |
| **Estimación** | 4h |
| **Riesgo** | Alto |
| **Prioridad** | P2 |
| **Criterios de aceptación** | — OCR procesa PDFs escaneados<br>— Campos extraídos con confianza > 70%<br>— Datos pre-llenan formulario PITR<br>— Técnico valida datos extraídos |
| **Cómo probarla** | Subir certificado escaneado, verificar extracción |
| **Resultado esperado** | OCR funcional con extracción de datos estructurados |

---

## E33-T02: Implementar propuesta de letra energética por IA

| Campo | Valor |
|-------|-------|
| **Objetivo** | IA propone rango de letra energética según datos del PITR |
| **Descripción** | Crear función `proponerLetra()` que envíe datos PITR (anonimizados) a modelo IA y reciba propuesta de rango de letra A-G. Mostrar en panel de revisión. Técnico acepta o corrige. |
| **Archivos afectados** | `src/lib/ia/letra-energetica.ts`, `src/lib/ia/client.ts` |
| **Dependencias** | E28-T04 |
| **Estimación** | 4h |
| **Riesgo** | Alto |
| **Prioridad** | P3 |
| **Criterios de aceptación** | — Propuesta de letra generada<br>— Datos anonimizados antes de enviar<br>— Confianza mostrada al técnico<br>— Técnico acepta o corrige |
| **Cómo probarla** | Completar PITR, ver propuesta en revisión |
| **Resultado esperado** | IA propone letra energética, técnico decide |

---

## E33-T03: Implementar recomendaciones automáticas al cliente

| Campo | Valor |
|-------|-------|
| **Objetivo** | IA genera recomendaciones basadas en datos del expediente |
| **Descripción** | Al cerrar expediente, generar recomendaciones: mejoras energéticas sugeridas, subvenciones aplicables, próximos pasos. Incluir en PDF del informe final. |
| **Archivos afectados** | `src/lib/ia/recomendaciones.ts` |
| **Dependencias** | E27-T05, E28-T06 |
| **Estimación** | 3h |
| **Riesgo** | Medio |
| **Prioridad** | P3 |
| **Criterios de aceptación** | — Recomendaciones generadas automáticamente<br>— Incluidas en PDF del informe<br>— Personalizadas según datos del inmueble |
| **Cómo probarla** | Cerrar expediente, verificar recomendaciones en PDF |
| **Resultado esperado** | Recomendaciones automáticas personalizadas |

---

# 15. ÉPICA 34 — TESTING

> Unit, Integration, E2E, RLS, Security.

---

## E34-T01: Tests unitarios del motor PITR

| Campo | Valor |
|-------|-------|
| **Objetivo** | Motor PITR tiene cobertura de tests unitarios |
| **Descripción** | Escribir tests con Vitest para `src/lib/pitr/motor.ts`: ejecución de template, condiciones, validaciones, progreso. Cubrir casos borde: template vacío, preguntas condicionales sin dependencia, 100% progreso. |
| **Archivos afectados** | `src/lib/pitr/__tests__/motor.test.ts` |
| **Dependencias** | E27-T01 |
| **Estimación** | 3h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Tests escritos con Vitest<br>— Cobertura > 80% del motor<br>— Tests de casos borde incluidos |
| **Cómo probarla** | `npx vitest run src/lib/pitr/__tests__/motor.test.ts` |
| **Resultado esperado** | Motor PITR testeado unitariamente |

---

## E34-T02: Tests unitarios de la máquina de estados

| Campo | Valor |
|-------|-------|
| **Objetivo** | Máquina de estados tiene tests unitarios |
| **Descripción** | Tests para `src/lib/expediente/estados.ts` y `src/lib/expediente/transiciones.ts`: todas las transiciones válidas, todas las inválidas, eventos generados correctamente. |
| **Archivos afectados** | `src/lib/expediente/__tests__/estados.test.ts` |
| **Dependencias** | E26-T04 |
| **Estimación** | 2h |
| **Riesgo** | Bajo |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Tests para todas las transiciones válidas<br>— Tests para todas las transiciones inválidas<br>— Tests de eventos generados |
| **Cómo probarla** | `npx vitest run src/lib/expediente/__tests__/estados.test.ts` |
| **Resultado esperado** | Máquina de estados testeada completamente |

---

## E34-T03: Tests de integración de expedientes (crear, transitar, cerrar)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Flujo completo de expediente funciona correctamente |
| **Descripción** | Tests de integración con Supabase local: crear expediente, asignar servicio, transitar todos los estados, registrar eventos, cerrar. Usar Supabase local (`supabase db start`). |
| **Archivos afectados** | `src/lib/expediente/__tests__/integracion.test.ts` |
| **Dependencias** | E34-T02, E24-T01 |
| **Estimación** | 4h |
| **Riesgo** | Medio |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Flujo completo: crear → pagar → PITR → revisar → cerrar<br>— Eventos registrados en cada paso<br>— Estados correctos después de cada transición |
| **Cómo probarla** | `npx vitest run src/lib/expediente/__tests__/integracion.test.ts` |
| **Resultado esperado** | Flujo de expediente verificado integralmente |

---

## E34-T04: Tests de RLS (Row Level Security)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Verificar que las políticas RLS funcionan correctamente |
| **Descripción** | Tests SQL que verifiquen: cliente solo ve sus datos, técnico ve todos de su empresa, admin ve todo, anónimo solo ve observatorio, eventos no se modifican. |
| **Archivos afectados** | `supabase/tests/rls_expediente.sql`, `supabase/tests/rls_cliente.sql`, `supabase/tests/rls_eventos.sql` |
| **Dependencias** | E24-T09, E24-T10, E24-T15 |
| **Estimación** | 3h |
| **Riesgo** | Medio |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Tests RLS ejecutables<br>— Cliente no ve datos de otros<br>— Técnico ve todos de su empresa<br>— Eventos no modificables<br>— Observatorio público |
| **Cómo probarla** | Ejecutar tests SQL contra Supabase |
| **Resultado esperado** | RLS verificado y funcionando |

---

## E34-T05: Tests E2E del flujo completo (Playwright)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Flujo cliente completo verificado con E2E |
| **Descripción** | Tests Playwright: registrar usuario → crear expediente → pagar → completar PITR → ver estado → descargar informe. SEO: verificar sitemap, robots.txt, metadatos. |
| **Archivos afectados** | `e2e/flujo-cliente.spec.ts`, `e2e/seo.spec.ts`, `playwright.config.ts` |
| **Dependencias** | E34-T03, E26-T06, E29-T03 |
| **Estimación** | 4h |
| **Riesgo** | Alto |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Tests E2E ejecutables con Playwright<br>— Flujo cliente completo cubierto<br>— SEO verificado<br>— Sin fallos intermitentes |
| **Cómo probarla** | `npx playwright test` |
| **Resultado esperado** | Tests E2E funcionales y estables |

---

## E34-T06: Tests de seguridad y vulnerabilidades

| Campo | Valor |
|-------|-------|
| **Objetivo** | Verificar que no hay vulnerabilidades comunes |
| **Descripción** | Revisión de seguridad: SQL injection, XSS, CSRF, exposición de API keys, headers de seguridad. Usar herramientas automatizadas (OWASP ZAP, npm audit). |
| **Archivos afectados** | Documento `docs/security-audit.md` |
| **Dependencias** | E34-T04 |
| **Estimación** | 3h |
| **Riesgo** | Bajo |
| **Prioridad** | P2 |
| **Criterios de aceptación** | — npm audit sin vulnerabilidades críticas<br>— Headers de seguridad configurados<br>— Sin exposición de API keys<br>— Documento de auditoría creado |
| **Cómo probarla** | `npm audit`, revisar headers HTTP |
| **Resultado esperado** | Seguridad verificada y documentada |

---

# 16. ÉPICA 35 — DEPLOY

> Producción, backups, logs, monitoring, alertas.

---

## E35-T01: Configurar despliegue en Vercel

| Campo | Valor |
|-------|-------|
| **Objetivo** | Aplicación desplegada en Vercel correctamente |
| **Descripción** | Conectar repositorio a Vercel. Configurar variables de entorno en Vercel dashboard. Verificar build exitoso. Configurar dominio personalizado. HTTPS automático. |
| **Archivos afectados** | `vercel.json` (verificar configuración) |
| **Dependencias** | Todas las épicas anteriores |
| **Estimación** | 2h |
| **Riesgo** | Medio |
| **Prioridad** | P0 |
| **Criterios de aceptación** | — Build exitoso en Vercel<br>— Variables de entorno configuradas<br>— Dominio personalizado apuntando<br>— HTTPS funcionando |
| **Cómo probarla** | `npm run build` en local + verificar deploy en Vercel |
| **Resultado esperado** | App desplegada en producción con HTTPS |

---

## E35-T02: Configurar backups automáticos de base de datos

| Campo | Valor |
|-------|-------|
| **Objetivo** | Base de datos con backups automáticos diarios |
| **Descripción** | Configurar backup diario en Supabase (Project Settings → Database → Backups). Configurar retención de 7 días. Verificar restauración. |
| **Archivos afectados** | Ninguno (configuración en Supabase dashboard) |
| **Dependencias** | E24-T01 |
| **Estimación** | 1h |
| **Riesgo** | Bajo |
| **Prioridad** | P1 |
| **Criterios de aceptación** | — Backup diario configurado<br>— Retención 7 días<br>— Restauración verificada |
| **Cómo probarla** | Iniciar restauración en entorno de prueba |
| **Resultado esperado** | Backups automáticos funcionales |

---

## E35-T03: Configurar logging y monitoring

| Campo | Valor |
|-------|-------|
| **Objetivo** | Tener logs centralizados y monitorización de errores |
| **Descripción** | Configurar Vercel Logs para errores de server. Implementar logging estructurado con `console.log` con formato JSON. Configurar alertas en Supabase (errores de autenticación, RLS, queries lentas). |
| **Archivos afectados** | `src/lib/logging/logger.ts` (nuevo) |
| **Dependencias** | E35-T01 |
| **Estimación** | 3h |
| **Riesgo** | Bajo |
| **Prioridad** | P2 |
| **Criterios de aceptación** | — Logs visibles en Vercel dashboard<br>— Logging estructurado JSON<br>— Alertas configuradas en Supabase |
| **Cómo probarla** | Generar error intencional, verificar en logs |
| **Resultado esperado** | Logging y monitoring operativos |

---

## E35-T04: Configurar alertas de producción

| Campo | Valor |
|-------|-------|
| **Objetivo** | Recibir alertas ante fallos críticos en producción |
| **Descripción** | Configurar alertas Vercel (deployment failed, high error rate). Configurar alertas Supabase (auth failures, storage errors). Configurar webhook a Slack/email. |
| **Archivos afectados** | Ninguno (configuración en dashboards) |
| **Dependencias** | E35-T01 |
| **Estimación** | 2h |
| **Riesgo** | Bajo |
| **Prioridad** | P2 |
| **Criterios de aceptación** | — Alertas configuradas en Vercel<br>— Alertas configuradas en Supabase<br>— Webhook a Slack/email funcional |
| **Cómo probarla** | Simular fallo, verificar alerta recibida |
| **Resultado esperado** | Alertas de producción funcionales |

---

# 17. ROADMAP DE IMPLEMENTACIÓN

## Semana 1 — Foundation

| Día | Tareas |
|-----|--------|
| Lunes | E22-T01 (Crear proyecto Supabase), E22-T02 (Variables entorno), E22-T03 (Cliente browser) |
| Martes | E22-T04 (Cliente server), E22-T05 (Cliente middleware), E22-T07 (Verificar conexión) |
| Miércoles | E24-T01 (Migraciones CLI), E24-T02 (ENUMs y schemas), E24-T03 (Empresa) |
| Jueves | E24-T04 (Usuario), E24-T05 (Trigger auth), E24-T06 (Cliente) |
| Viernes | E24-T07 (Inmueble), E24-T08 (Servicio), E24-T16 (Seeds) |

## Semana 2 — Auth + Core DB

| Día | Tareas |
|-----|--------|
| Lunes | E23-T01 (Login), E23-T02 (Registro), E23-T03 (Logout) |
| Martes | E23-T04 (Magic Link), E23-T05 (Reset Password) |
| Miércoles | E23-T06 (Middleware protección), E23-T07 (Roles), E23-T08 (RBAC) |
| Jueves | E24-T09 (Expediente), E24-T10 (Actividad eventos), E24-T11 (Pago) |
| Viernes | E24-T12 (Documento), E24-T13 (PITR templates), E24-T14 (PITR respuestas) |

## Semana 3 — Storage + Expedientes Core

| Día | Tareas |
|-----|--------|
| Lunes | E25-T01 (Buckets), E25-T02 (Upload), E25-T03 (Download) |
| Martes | E26-T01 (Crear expediente), E26-T02 (Listado expedientes) |
| Miércoles | E26-T03 (Detalle expediente), E26-T04 (Máquina estados) |
| Jueves | E26-T05 (Timeline eventos), E26-T06 (Dashboard cliente) |
| Viernes | E25-T05 (Versionado), E25-T06 (Hash duplicados) |

## Semana 4 — PITR + Pagos

| Día | Tareas |
|-----|--------|
| Lunes | E27-T01 (Migrar PITR a Supabase), E27-T02 (Autoguardado) |
| Martes | E27-T03 (Subir fotos), E27-T06 (Progreso PITR) |
| Miércoles | E27-T04 (Firma digital), E30-T01 (Integrar MyPOS) |
| Jueves | E30-T02 (Checkout), E30-T03 (Webhook MyPOS) |
| Viernes | E30-T04 (Factura), E30-T05 (Estado pago) |

## Semana 5 — Backoffice + Notificaciones

| Día | Tareas |
|-----|--------|
| Lunes | E28-T01 (Lista backoffice), E28-T02 (Detalle backoffice) |
| Martes | E28-T03 (Cola trabajo asignación), E28-T04 (Panel revisión PITR) |
| Miércoles | E28-T05 (Dictamen), E28-T06 (Cierre expediente) |
| Jueves | E27-T05 (PDF informe), E29-T01 (Estado cliente) |
| Viernes | E29-T02 (Notificaciones), E29-T03 (Descarga docs) |

## Semana 6 — Automatizaciones + Observatorio

| Día | Tareas |
|-----|--------|
| Lunes | E31-T01 (Webhooks n8n), E31-T02 (Email bienvenida) |
| Martes | E31-T03 (Email cambio estado), E31-T04 (Recordatorio PITR) |
| Miércoles | E31-T05 (Anonimización observatorio) |
| Jueves | E32-T01 (Página observatorio), E32-T02 (API observatorio) |
| Viernes | E24-T15 (Tabla observatorio), E32-T03 (KPIs) |

## Semana 7 — IA + Tests

| Día | Tareas |
|-----|--------|
| Lunes | E33-T01 (OCR mejorado), E33-T02 (Propuesta letra IA) |
| Martes | E33-T03 (Recomendaciones), E29-T04 (Perfil cliente) |
| Miércoles | E34-T01 (Tests motor PITR), E34-T02 (Tests estados) |
| Jueves | E34-T03 (Tests integración), E34-T04 (Tests RLS) |
| Viernes | E34-T05 (Tests E2E), E34-T06 (Tests seguridad) |

## Semana 8 — Deploy + Producción

| Día | Tareas |
|-----|--------|
| Lunes | E35-T01 (Despliegue Vercel), E35-T02 (Backups) |
| Martes | E35-T03 (Logging), E35-T04 (Alertas) |
| Miércoles | Corrección de bugs, ajustes finales |
| Jueves | Validación completa, testing en producción |
| Viernes | **MVP LANZADO** 🚀 |

---

# 18. CAMINO MÁS CORTO PARA TENER EL PRIMER CLIENTE DE PAGO

Este plan identifica las tareas estrictamente necesarias para que un cliente real pague y reciba el servicio completo.

---

## Fase 0 — Fundación mínima (Semana 1)

| Tarea | Por qué es imprescindible |
|-------|---------------------------|
| E22-T01 | Proyecto Supabase operativo |
| E22-T02 | Variables de entorno |
| E22-T03 | Cliente browser para login |
| E22-T04 | Cliente server para API |
| E22-T05 | Cliente middleware para proteger rutas |
| E24-T01 | Sistema de migraciones |
| E24-T02 | Schemas y ENUMs |
| E24-T03 | Tabla empresa |
| E24-T04 | Tabla usuario |
| E24-T05 | Trigger auto-creación usuario |
| E24-T06 | Tabla cliente |
| E24-T07 | Tabla inmueble |
| E24-T08 | Tabla servicio |
| E24-T16 | Seeds con servicios y datos demo |

## Fase 1 — Auth + Expedientes (Semana 2)

| Tarea | Por qué es imprescindible |
|-------|---------------------------|
| E23-T01 | Login del cliente |
| E23-T02 | Registro del cliente |
| E23-T03 | Logout |
| E23-T06 | Proteger rutas privadas |
| E23-T07 | Roles (al menos cliente y admin) |
| E24-T09 | Tabla expediente (entidad central) |
| E24-T10 | Eventos inmutables (trazabilidad) |
| E24-T11 | Tabla pago |
| E24-T12 | Tabla documento |
| E24-T13 | Tablas PITR templates |

## Fase 2 — Pago + PITR (Semana 3)

| Tarea | Por qué es imprescindible |
|-------|---------------------------|
| E25-T01 | Buckets Storage |
| E25-T02 | Upload de documentos |
| E25-T03 | Download de documentos |
| E26-T01 | **Crear expediente** (el cliente contrata) |
| E26-T02 | Ver listado de expedientes |
| E26-T03 | Ver detalle del expediente |
| E26-T04 | Máquina de estados (control del flujo) |
| E30-T01 | **Integrar MyPOS** (el cliente paga) |
| E30-T02 | Redirigir a checkout |
| E30-T03 | **Webhook MyPOS** (confirmar pago) |
| E27-T01 | **PITR en Supabase** (el cliente inspecciona) |
| E27-T02 | Autoguardado (no perder datos) |
| E27-T03 | Subir fotos (requisito del servicio) |
| E27-T06 | Progreso visible |

## Fase 3 — Revisión + Dictamen (Semana 4)

| Tarea | Por qué es imprescindible |
|-------|---------------------------|
| E28-T01 | Backoffice: ver expedientes |
| E28-T02 | Backoffice: detalle completo |
| E28-T04 | **Revisar PITR** (el técnico valida) |
| E28-T05 | **Emitir dictamen** (el técnico concluye) |
| E27-T04 | Firma digital del cliente |
| E27-T05 | **Generar PDF del informe** (entregable) |
| E28-T06 | **Cerrar expediente** (servicio completado) |
| E29-T01 | Cliente ve estado actualizado |
| E29-T03 | **Cliente descarga informe** (entrega final) |

---

## Resumen del camino crítico

| Fase | Semana | Tareas | Hito |
|------|--------|--------|------|
| Fase 0 | 1 | 13 tareas | Fundación técnica lista |
| Fase 1 | 2 | 10 tareas | Cliente puede registrarse y crear expediente |
| Fase 2 | 3 | 11 tareas | Cliente paga y completa inspección |
| Fase 3 | 4 | 9 tareas | Técnico revisa, emite dictamen, cliente descarga |

**Total tareas imprescindibles: 43**

**Tiempo estimado mínimo: 4 semanas**

**Lo que NO es necesario para el primer cliente:**
- Observatorio público (Épica 32)
- IA (Épica 33)
- Tests E2E (Épica 34, aunque unitarios sí son necesarios)
- Backups, logging, alertas (Épica 35)
- Magic Link, Reset Password (Épica 23)
- Notificaciones avanzadas (Épica 29)
- n8n workflows automáticos (Épica 31, se pueden hacer manualmente al principio)
- Facturación automática (se puede generar factura manual)

---

# 19. TABLA RESUMEN POR PRIORIDAD

| Prioridad | Tareas | Epic |
|-----------|--------|------|
| **P0** | E22-T01 a E22-T07, E23-T01 a E23-T03, E23-T06, E23-T07, E24-T01 a E24-T12, E25-T01 a E25-T03, E26-T01 a E26-T06, E27-T01, E30-T01 a E30-T03, E28-T01, E28-T02, E34-T01 a E34-T03, E35-T01 | Foundation, Auth, Database, Storage, Expedientes, PITR, MyPOS, Backoffice, Testing, Deploy |
| **P1** | E23-T04, E23-T05, E23-T08, E24-T13, E24-T14, E24-T16, E27-T02 a E27-T06, E28-T03 a E28-T06, E29-T01 a E29-T03, E31-T01, E31-T03, E34-T04, E34-T05, E35-T02 | Auth, PITR, Backoffice, Cliente, N8N, Testing, Deploy |
| **P2** | E22-T08, E25-T04 a E25-T06, E29-T04, E30-T04, E30-T05, E31-T02, E31-T04, E31-T05, E32-T01 a E32-T03, E33-T01, E34-T06, E35-T03, E35-T04 | Foundation, Storage, Cliente, MyPOS, N8N, Observatorio, IA, Testing, Deploy |
| **P3** | E33-T02, E33-T03 | IA |

---

# 20. ESTADÍSTICAS DEL BACKLOG

| Métrica | Valor |
|---------|-------|
| **Total épicas** | 14 |
| **Total tareas** | 82 |
| **Tareas P0** | 38 |
| **Tareas P1** | 27 |
| **Tareas P2** | 14 |
| **Tareas P3** | 3 |
| **Horas estimadas totales** | ~210h |
| **Semanas a dedicación completa** | 8 semanas |
| **Tareas camino crítico (1er cliente)** | 43 |

---

*Fin del documento CF-022-IMPLEMENTATION-BACKLOG.md — Plan Maestro de Implementación*
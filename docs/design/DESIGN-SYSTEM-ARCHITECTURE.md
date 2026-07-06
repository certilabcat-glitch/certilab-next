# DESIGN SYSTEM ARCHITECTURE

> **Documento técnico preparatorio del futuro Design System de Certilab.**
>
> **Propósito:** Analizar el frontend actual e identificar la arquitectura necesaria para
> un Design System modular, escalable y desacoplado de decisiones visuales.
>
> **Estado:** Preparatorio — sin implementación de diseño, sin migración de estilos,
> sin modificación de código.
>
> **Fase:** DESIGN-000 (Product-First Execution Mode)

---

## Índice

1. [Inventario completo de componentes existentes](#1-inventario-completo-de-componentes-existentes)
2. [Componentes duplicados](#2-componentes-duplicados)
3. [Clasificación Atomic Design](#3-clasificación-atomic-design)
4. [Estructura recomendada](#4-estructura-recomendada)
5. [Tokens que deberán existir](#5-tokens-que-deberán-existir)
6. [Dependencias actuales](#6-dependencias-actuales)
7. [Recomendaciones estratégicas](#7-recomendaciones-estratégicas)

---

## 1. Inventario completo de componentes existentes

### 1.1 Botones

| # | Ubicación | Variantes | Estilo actual |
|---|-----------|-----------|---------------|
| B1 | `globals.css` (`.btn`) | Base | CSS vars + inline |
| B2 | `globals.css` (`.btn-primary`) | Fondo negro, texto blanco, `border-radius: 6px` | CSS class |
| B3 | `globals.css` (`.btn-secondary`) | Borde + texto negro, fondo transparente | CSS class |
| B4 | `globals.css` (`.btn-outline`) | Borde gris claro | CSS class |
| B5 | `globals.css` (`.btn-sm`, `.btn-lg`) | Tamaños | CSS class |
| B6 | `globals.css` (`.cta-button`) | Botón hero grande con padding extra | CSS class |
| B7 | `DocumentUpload.tsx` | Botón "Seleccionar archivo" (label sobre input file) | Inline Tailwind |
| B8 | `DocumentUpload.tsx` | Botón "Subir documento" + estado loading | Inline Tailwind |
| B9 | `DocumentList.tsx` | Botones "Descargar" y "Eliminar" | Inline Tailwind |
| B10 | `UserMenu.tsx` | Botón avatar circular | Inline Tailwind |
| B11 | `UserMenu.tsx` | Botón "Cerrar sesión" | Inline Tailwind |
| B12 | `EntregarResultadoButton.tsx` | Botón "Entregar resultado" + estado loading | Inline Tailwind |
| B13 | `SolicitarSegundaOpinionForm.tsx` | Botón submit del formulario | Inline Tailwind |
| B14 | `CookieConsent.tsx` | Botón "Aceptar" y "Configurar" | Inline Tailwind |
| B15 | `SolicitarSegundaOpinionForm.tsx` | Botón "Añadir otro inmueble" | Inline Tailwind |
| B16 | `(saas)/saas/login/page.tsx` | Botón "Iniciar sesión" | Inline Tailwind |
| B17 | Blog pages / marketing pages | Links con estilo botón (`.not-found-page__link`) | CSS class |

**Total estimado:** ~17 variantes de botón, repartidas entre clases CSS globales e inline Tailwind.

### 1.2 Inputs / Formularios

| # | Ubicación | Tipo | Estilo actual |
|---|-----------|------|---------------|
| I1 | `globals.css` (`.form-input`, `.form-textarea`) | Input text/textarea | CSS vars |
| I2 | `globals.css` (`.form-select`) | Select nativo | CSS vars |
| I3 | `globals.css` (`.form-group`) | Contenedor label + input | CSS vars |
| I4 | `globals.css` (`.form-label`) | Label | CSS vars |
| I5 | `globals.css` (`.form-hint`) | Texto de ayuda | CSS vars |
| I6 | `globals.css` (`.form-error`) | Mensaje de error | CSS vars |
| I7 | `DocumentUpload.tsx` | `<input type="file">` | Inline Tailwind |
| I8 | `SolicitarSegundaOpinionForm.tsx` | Inputs texto + selects + checklist | Inline Tailwind |
| I9 | `(saas)/saas/login/page.tsx` | Input email + password | Inline Tailwind |
| I10 | Blog / marketing | Newsletter / suscripción | Inline |

**Total estimado:** ~10 variantes de input, con estilos duplicados entre clases globales y Tailwind.

### 1.3 Tablas

| # | Ubicación | Tipo | Estilo actual |
|---|-----------|------|---------------|
| T1 | `globals.css` (`.comparison-table`) | Tabla comparativa marketing | CSS class |
| T2 | `(plataforma)/mis-expedientes/page.tsx` | Lista de expedientes (no tabla `<table>`, sino filas con Tailwind) | Inline Tailwind |
| T3 | `(plataforma)/at/expedientes/[id]/page.tsx` | Tabla de inspección Técnica | Inline Tailwind |
| T4 | `(plataforma)/expedientes/[id]/page.tsx` | Detalle de expediente | Inline Tailwind |

**Observación:** No existe un componente `<Table>` único. Cada tabla se construye ad-hoc.

### 1.4 Cards

| # | Ubicación | Tipo | Estilo actual |
|---|-----------|------|---------------|
| C1 | `globals.css` (`.card`) | Card genérica | CSS class |
| C2 | `globals.css` (`.service-card`) | Card de servicio/precio | CSS class |
| C3 | `globals.css` (`.service-card:hover`) | Hover elevación | CSS class |
| C4 | Blog pages | Artículos como cards | Inline Tailwind |
| C5 | `(plataforma)/mis-expedientes/page.tsx` | Cards de expediente | Inline Tailwind |
| C6 | `(plataforma)/at/dashboard/page.tsx` | Dashboard widgets | Inline Tailwind |
| C7 | `SolicitarSegundaOpinionForm.tsx` | Card de inmueble añadido | Inline Tailwind |

**Total estimado:** ~7 variantes de card, con dos definiciones CSS globales y el resto inline.

### 1.5 Modales / Diálogos / Overlays

| # | Ubicación | Tipo | Estilo actual |
|---|-----------|------|---------------|
| M1 | `CookieConsent.tsx` | Banner / modal de cookies | Inline Tailwind |
| M2 | `UserMenu.tsx` | Dropdown menú usuario | Inline Tailwind |
| M3 | `DocumentList.tsx` | `window.confirm()` para eliminar | Nativo |
| M4 | `(plataforma)/at/expedientes/[id]/page.tsx` | Pestañas / paneles expandibles | Inline Tailwind |

**Observación:** No existe un componente `<Modal>` o `<Dialog>` unificado. Los modales actuales usan confirm nativo o dropdowns position absolutos.

### 1.6 Badges

| # | Ubicación | Tipo | Estilo actual |
|---|-----------|------|---------------|
| D1 | `globals.css` (`.badge`, `.badge-success`, `.badge-warning`, `.badge-error`) | Badge de estado | CSS class |
| D2 | `(plataforma)/mis-expedientes/page.tsx` | Estado de expediente | Inline Tailwind |
| D3 | `(plataforma)/expedientes/[id]/page.tsx` | Estado de resultado | Inline Tailwind |
| D4 | `(plataforma)/at/expedientes/[id]/page.tsx` | Estados de inspección técnica | Inline Tailwind |

**Observación:** Existe una definición base en globals.css pero no se usa consistentemente.

### 1.7 Formularios compuestos

| # | Ubicación | Tipo | Estilo actual |
|---|-----------|------|---------------|
| F1 | `SolicitarSegundaOpinionForm.tsx` | Formulario multi-step expediente | Inline Tailwind |
| F2 | `DocumentUpload.tsx` | Formulario de subida documento | Inline Tailwind |
| F3 | `(saas)/saas/login/page.tsx` | Formulario login | Inline Tailwind |
| F4 | Blog newsletter | Formulario suscripción | Inline |

### 1.8 Layouts / Contenedores

| # | Ubicación | Tipo | Estilo actual |
|---|-----------|------|---------------|
| L1 | `globals.css` (`.container`) | Contenedor max-width responsivo | CSS class |
| L2 | `globals.css` (`.section`) | Sección con padding vertical | CSS class |
| L3 | `globals.css` (`.section-title`, `.section-sub`) | Títulos de sección | CSS class |
| L4 | `globals.css` (`.grid-2`, `.grid-3`, `.grid-4`) | Grid columns | CSS class |
| L5 | `globals.css` (`.flex-center`) | Flexbox utility | CSS class |
| L6 | `(plataforma)/layout.tsx` | Layout principal plataforma | Inline Tailwind |
| L7 | Blog / marketing pages | Layout marketing | Inline Tailwind |

### 1.9 Navegación

| # | Ubicación | Tipo | Estilo actual |
|---|-----------|------|---------------|
| N1 | `globals.css` (`.navbar`) | Navbar principal | CSS class |
| N2 | `globals.css` (`.nav-link`) | Links de navegación | CSS class |
| N3 | `globals.css` (`.footer`) | Footer | CSS class |
| N4 | `globals.css` (`.footer-inner`, `.footer-brand`, etc.) | Subcomponentes footer | CSS class |
| N5 | `globals.css` (`.mobile-menu`) | Menú responsive móvil | CSS class |
| N6 | `UserMenu.tsx` | Menú usuario dropdown | Componente React |
| N7 | `CookieConsent.tsx` | Banner cookies | Componente React |
| N8 | Blog pages | Navegación articulos | Inline Tailwind |
| N9 | Marketing pages | Navbar con scroll | Inline Tailwind |

### 1.10 Iconos

| # | Ubicación | Tipo | Estilo actual |
|---|-----------|------|---------------|
| IC1 | `DocumentUpload.tsx` | SVG upload inline `(strokeWidth={2})` | Inline SVG |
| IC2 | `DocumentUpload.tsx` | SVG spinner loading | Inline SVG |
| IC3 | `DocumentList.tsx` | SVG PDF icon | Inline SVG |
| IC4 | `DocumentList.tsx` | SVG image icon | Inline SVG |
| IC5 | `DocumentList.tsx` | SVG empty state | Inline SVG |
| IC6 | Blog pages | Check icons, arrow icons | Inline SVG |
| IC7 | Marketing pages | Iconos varios | Inline SVG / Unicodes |
| IC8 | `EntregarResultadoButton.tsx` | Spinner SVG | Inline SVG |
| IC9 | `UserMenu.tsx` | Avatar initials (no icon) | Text |

**Observación crÍtica:** Todos los iconos son SVGs inline. No existe una librería de iconos unificada (como lucide-react, heroicons, etc.). Esto genera código repetitivo y difícil de mantener.

---

## 2. Componentes duplicados

### 2.1 Botón primario (3+ implementaciones)

El botón primario (fondo azul, texto blanco, `rounded-md`, `border-0`) aparece implementado de forma independiente en:

- `DocumentUpload.tsx` (línea 133): `bg-blue-600 text-white ... rounded-md hover:bg-blue-700 ... disabled:opacity-50`
- `EntregarResultadoButton.tsx`: estilos inline similares
- `(saas)/saas/login/page.tsx`: estilos inline similares
- `globals.css` `.btn-primary`: fondo negro, NO azul — inconsistente con los inline.

**Impacto:** 4 definiciones diferentes de "botón primario" con colores inconsistentes (azul vs negro).

### 2.2 Loading spinner (2+ implementaciones)

- `DocumentUpload.tsx` (línea 138): SVG spinner con `animate-spin`
- `DocumentList.tsx` (línea 128): Circular spinner con `animate-spin`
- `EntregarResultadoButton.tsx`: SVG spinner con `animate-spin`

**Impacto:** El mismo patrón de loading replicado en 3 componentes. Debe ser un componente único.

### 2.3 Estado empty / vacío (2+ implementaciones)

- `DocumentList.tsx` (línea 143): SVG + texto "Todavía no hay documentos adjuntos."
- Páginas de expedientes: mensajes ad-hoc "No hay expedientes"

**Impacto:** Debería existir un componente `<EmptyState>` con icono, título y descripción.

### 2.4 Badge de estado (2+ implementaciones)

- `globals.css` `.badge` - no usado consistentemente
- Inline Tailwind en páginas de expedientes (clases de color directas)

**Impacto:** Los estados se muestran con estilos diferentes según la página.

### 2.5 Form field + label pattern (3+ implementaciones)

- `globals.css` `.form-group` + `.form-label` + `.form-input`
- `SolicitarSegundaOpinionForm.tsx`: `<div>` + `<label>` + `<input>` con clases inline
- `(saas)/saas/login/page.tsx`: `<div>` + `<label>` + `<input>` con clases inline

**Impacto:** Patrón duplicado que debe unificarse en un `<FormField>`.

---

## 3. Clasificación Atomic Design

### 3.1 Atoms (componentes básicos)

| Componente | Estado actual | Prioridad DS |
|------------|---------------|--------------|
| `Button` | Fragmentado en CSS + inline | 🔴 Alta |
| `Input` | Fragmentado en CSS + inline | 🔴 Alta |
| `Select` | CSS class + inline | 🔴 Alta |
| `Textarea` | CSS class | 🟡 Media |
| `Label` | CSS class + inline | 🟡 Media |
| `Badge` | CSS class (infrautilizado) | 🟡 Media |
| `Spinner` / `Loader` | Inline SVG replicado | 🔴 Alta |
| `Icon` | Inline SVG sin librería | 🔴 Alta |
| `Checkbox` | Nativo / inline | 🟡 Media |
| `Radio` | Nativo | 🟢 Baja |
| `Avatar` | Inline en UserMenu | 🟢 Baja |
| `Link` | Nativo + clases inline | 🟢 Baja |

### 3.2 Molecules (combinaciones de atoms)

| Componente | Estado actual | Prioridad DS |
|------------|---------------|--------------|
| `FormField` (label + input + error) | 3 implementaciones | 🔴 Alta |
| `FileUpload` (botón + input file + estado) | 1 implementación | 🟡 Media |
| `SearchInput` (input + icono + botón) | No existe | 🟢 Baja |
| `Pagination` | No existe | 🟢 Baja |
| `Breadcrumbs` | No existe | 🟢 Baja |
| `Tabs` | Ad-hoc en AT expediente | 🟡 Media |
| `Card` (contenido + acciones) | CSS class + inline | 🟡 Media |
| `Toast` / `Alert` | Inline en DocumentList, DocumentUpload | 🟡 Media |
| `EmptyState` (icono + texto + CTA) | 2 implementaciones | 🟡 Media |

### 3.3 Organisms (secciones completas)

| Componente | Estado actual | Prioridad DS |
|------------|---------------|--------------|
| `Navbar` | CSS class + inline | 🔴 Alta |
| `Footer` | CSS class | 🔴 Alta |
| `UserMenu` | Componente React | 🟡 Media |
| `CookieConsent` | Componente React | 🟢 Baja |
| `ExpedienteForm` | `SolicitarSegundaOpinionForm.tsx` | 🟡 Media |
| `DocumentUpload` | Componente React | 🟡 Media |
| `DocumentList` | Componente React | 🟡 Media |
| `LoginForm` | Inline en login page | 🟡 Media |
| `HeroSection` | CSS class marketing | 🟢 Baja |
| `ComparisonTable` | CSS class marketing | 🟢 Baja |
| `Schedule` | CSS class marketing | 🟢 Baja |
| `DashboardWidget` | Ad-hoc en AT dashboard | 🟡 Media |
| `ExpedienteCard` | Ad-hoc en mis-expedientes | 🟡 Media |

---

## 4. Estructura recomendada

Se propone la siguiente estructura de directorios dentro de `src/components/`:

```
src/components/
├── ui/                          # Atoms — componentes base
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── Input.test.tsx
│   │   └── index.ts
│   ├── Select/
│   ├── Textarea/
│   ├── Label/
│   ├── Badge/
│   │   ├── Badge.tsx
│   │   └── index.ts
│   ├── Spinner/
│   │   ├── Spinner.tsx
│   │   └── index.ts
│   ├── Avatar/
│   ├── Icon/
│   │   └── Icon.tsx          # Wrapper sobre lucide-react
│   └── index.ts              # Barrel export
│
├── forms/                      # Molecules de formularios
│   ├── FormField/
│   │   ├── FormField.tsx
│   │   └── index.ts
│   ├── FileUpload/
│   ├── CheckboxGroup/
│   ├── RadioGroup/
│   └── index.ts
│
├── data-display/               # Molecules de datos
│   ├── Table/
│   │   ├── Table.tsx
│   │   ├── Table.test.tsx
│   │   └── index.ts
│   ├── Card/
│   │   ├── Card.tsx
│   │   └── index.ts
│   ├── EmptyState/
│   │   ├── EmptyState.tsx
│   │   └── index.ts
│   ├── Pagination/
│   ├── Tabs/
│   └── index.ts
│
├── feedback/                   # Molecules de feedback
│   ├── Toast/
│   │   ├── Toast.tsx
│   │   ├── ToastProvider.tsx
│   │   └── index.ts
│   ├── Alert/
│   ├── Modal/
│   │   ├── Modal.tsx
│   │   └── index.ts
│   ├── ConfirmDialog/
│   └── index.ts
│
├── navigation/                 # Organisms de navegación
│   ├── Navbar/
│   │   ├── Navbar.tsx
│   │   ├── Navbar.test.tsx
│   │   └── index.ts
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── Sidebar/
│   ├── Breadcrumbs/
│   └── index.ts
│
├── layout/                     # Organisms de layout
│   ├── Container/
│   ├── Section/
│   ├── Grid/
│   ├── Stack/
│   └── index.ts
│
└── index.ts                    # Barrel export global
```

### 4.1 Principios de la estructura

1. **Cada componente en su propia carpeta** con `index.ts` para export limpio.
2. **Tests co-localizados** (`Button.test.tsx`).
3. **Barrel export** por carpeta y barrel global en `src/components/index.ts`.
4. **Sin dependencia de carpetas de páginas**: los componentes del DS no deben importar nada de `app/`.
5. **Sin dependencia de `lib/actions`**: los componentes del DS deben recibir callbacks por props.

### 4.2 Ruta de migración recomendada

```
Fase 1: ui/        → Button, Input, Select, Badge, Spinner, Icon
Fase 2: forms/     → FormField, FileUpload
Fase 3: feedback/  → Toast, Alert, Modal
Fase 4: data-display/ → Table, Card, EmptyState
Fase 5: navigation/   → Navbar, Footer    (requiere coordinación con layout)
Fase 6: layout/       → Container, Section (bajo impacto, baja prioridad)
```

---

## 5. Tokens que deberán existir

> **Nota:** No se asignan valores. Solo se identifican las categorías de tokens
> que el Design System deberá definir cuando la Design Bible esté disponible.

### 5.1 Colors

```typescript
interface ColorTokens {
  // Brand
  primary: string;       // Color principal de marca
  primaryHover: string;
  primaryLight: string;
  
  // Neutral
  background: string;
  surface: string;       // Fondos de cards, modales
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  
  // Semántico
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Estados
  disabledBg: string;
  disabledText: string;
  
  // Actuales en globals.css a mapear:
  // --color-black, --color-grey, --color-terra, --color-terra-light,
  // --color-crema, --color-border
}
```

### 5.2 Spacing

```typescript
interface SpacingTokens {
  0: string;    // 0
  1: string;    // 0.25rem (4px)
  2: string;    // 0.5rem  (8px)
  3: string;    // 0.75rem (12px)
  4: string;    // 1rem    (16px)
  5: string;    // 1.25rem (20px)
  6: string;    // 1.5rem  (24px)
  8: string;    // 2rem    (32px)
  10: string;   // 2.5rem  (40px)
  12: string;   // 3rem    (48px)
  16: string;   // 4rem    (64px)
  20: string;   // 5rem    (80px)
  24: string;   // 6rem    (96px)
}
```

### 5.3 Border Radius

```typescript
interface RadiusTokens {
  none: string;    // 0
  sm: string;      // 2px / 0.125rem
  md: string;      // 6px  (actual en botones)
  lg: string;      // 8px
  xl: string;      // 12px
  full: string;    // 9999px (avatars, pills)
}
```

### 5.4 Typography

```typescript
interface TypographyTokens {
  fontFamily: {
    sans: string;    // Inter, system-ui, etc.
    serif: string;   // Para títulos editoriales (--font-serif actual)
    mono: string;    // Para código
  };
  fontSize: {
    xs: string;      // 0.75rem
    sm: string;      // 0.85rem (actual en tablas)
    base: string;    // 1rem
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    normal: number;  // 400
    medium: number;  // 500
    semibold: number; // 600
    bold: number;    // 700
  };
  lineHeight: {
    tight: string;   // 1.2
    normal: string;  // 1.5
    relaxed: string; // 1.7 (actual en textos largos)
  };
}
```

### 5.5 Shadows

```typescript
interface ShadowTokens {
  sm: string;    // Sombras sutiles (cards)
  md: string;    // Sombras medias (dropdowns)
  lg: string;    // Sombras grandes (modales)
  xl: string;    // Sombras extra grandes
}
```

### 5.6 Z-index

```typescript
interface ZIndexTokens {
  dropdown: number;     // 50 (actual en UserMenu)
  sticky: number;       // 100
  modal: number;        // 200
  toast: number;        // 300
  tooltip: number;      // 400
}
```

### 5.7 Animations / Transitions

```typescript
interface AnimationTokens {
  duration: {
    fast: string;    // 150ms
    normal: string;  // 200ms (actual en botones)
    slow: string;    // 300ms
  };
  easing: {
    default: string; // ease-in-out
    enter: string;   // ease-out
    exit: string;    // ease-in
  };
}
```

### 5.8 Breakpoints

```typescript
interface BreakpointTokens {
  sm: string;    // 640px  (móvil)
  md: string;    // 768px  (tablet)
  lg: string;    // 1024px (desktop)
  xl: string;    // 1280px (wide)
  '2xl': string; // 1536px (extra wide)
}

// Breakpoints actualmente usados en globals.css:
// @media (max-width: 767px)  → equivalente a md
// @media (max-width: 1023px) → equivalente a lg
```

### 5.9 Tokens adicionales identificados

```typescript
// Opacidad
interface OpacityTokens {
  disabled: number;   // 0.5  (actual)
  hover: number;      // 0.08 (actual en hero-garantia bg)
}

// Tamaños de contenedor
interface ContainerTokens {
  sm: string;    // 600px (schedule, includes-box)
  md: string;    // 700px (comparison-table)
  lg: string;    // 1100px (sections)
  xl: string;    // 1200px (full width sections)
}
```

---

## 6. Dependencias actuales

### 6.1 Dependencias de producción (`package.json`)

| Dependencia | Versión | Impacto en Design System |
|-------------|---------|--------------------------|
| `next` | ^15.3.1 | Framework. No afecta directamente. |
| `react` | ^19.1.0 | Framework UI. Compatibilidad con componentes. |
| `react-dom` | ^19.1.0 | Render. Sin impacto directo. |
| `@supabase/supabase-js` | ^2.49.4 | Backend. Sin impacto en DS. |
| `@supabase/ssr` | ^0.6.0 | Backend. Sin impacto en DS. |

### 6.2 Dependencias de desarrollo

| Dependencia | Versión | Impacto en Design System |
|-------------|---------|--------------------------|
| `tailwindcss` | ^4.1.6 | **Alto** — El sistema de estilos actual. |
| `@tailwindcss/postcss` | ^4.1.6 | **Alto** — PostCSS plugin para Tailwind v4. |
| `typescript` | ^5 | **Medio** — Tipado de componentes. |
| `@types/react` | ^19 | **Medio** — Tipado de React. |
| `@types/node` | ^22 | Bajo. |
| `vitest` | ^3.1.2 | **Medio** — Testing de componentes DS. |
| `@vitejs/plugin-react` | ^4.4.1 | Testing. |
| `eslint` | ^9.24.0 | Linting. |
| `@eslint/eslintrc` | ^3 | Linting. |
| `eslint-config-next` | ^15.3.1 | Linting. |
| `@tailwindcss/typography` | ^0.5.16 | **Alto** — Estilos de contenido rich-text (blog). |
| `postcss` | ^8.5.3 | Build. |

### 6.3 Dependencias faltantes (recomendadas para DS)

| Librería | Propósito | Prioridad |
|----------|-----------|-----------|
| `lucide-react` | Iconos unificados (reemplazar SVGs inline) | 🔴 Alta |
| `clsx` | Gestión de clases condicionales | 🟡 Media |
| `tailwind-merge` | Fusión de clases Tailwind sin conflictos | 🟡 Media |
| `@radix-ui/react-dialog` | Modal accesible | 🟡 Media |
| `@radix-ui/react-select` | Select accesible | 🟢 Baja |
| `@radix-ui/react-tabs` | Tabs accesibles | 🟢 Baja |
| `@radix-ui/react-toast` | Toast accesible | 🟢 Baja |
| `framer-motion` | Animaciones avanzadas (V2) | 🟢 Baja (V2) |

### 6.4 Problemas identificados con dependencias actuales

1. **Tailwind CSS v4** — La versión 4 introduce cambios significativos (configuración basada en CSS en lugar de JS). Cualquier token del DS deberá definirse compatible con el nuevo sistema `@theme` de Tailwind v4.

2. **Ausencia de librería de iconos** — 100% de los iconos son SVGs inline. Esto implica:
   - Código repetitivo (cada SVG tiene ~10-15 líneas).
   - Dificultad para mantener consistencia visual.
   - Sin soporte de accesibilidad (aria-hidden, etc.).
   - Cada componente replica su propio SVG.

3. **Radix UI no está presente** — Componentes como Modal, Select, Tabs, Toast necesitan gestión de accesibilidad, foco y estado. Sin Radix UI (o alternativa), el equipo deberá implementar manualmente:
   - Trapping de foco en modales.
   - Gestión de aria-* attributes.
   - Keyboard navigation.
   - Portal rendering.

4. **Sin `clsx` ni `tailwind-merge`** — La gestión de clases condicionales se hace con template literals:
   ```tsx
   className={`inline-flex items-center px-4 py-2 bg-blue-600 ... ${isUploading ? 'opacity-50' : ''}`}
   ```
   Esto es frágil y propenso a errores.

---

## 7. Recomendaciones estratégicas

### 7.1 No mezclar estilos globales con inline

**Problema actual:** El frontend mezcla tres sistemas de estilo:
1. Clases CSS globales en `globals.css` (`.btn`, `.card`, `.navbar`)
2. Clases Tailwind inline en componentes (`className="px-4 py-2 bg-blue-600"`)
3. CSS Modules (`auth.module.css`)

**Recomendación:** El Design System debe elegir **un único mecanismo de estilo**. Dado que Tailwind v4 ya está instalado y es el estándar del proyecto, se recomienda:
- Tailwind CSS v4 como sistema de estilo único.
- Migrar clases CSS globales a componentes con Tailwind.
- CSS Modules solo para casos excepcionales (ej: estilos de contenido rich-text).

### 7.2 Adoptar Radix UI para componentes de interfaz complejos

**Problema actual:** No hay gestión de accesibilidad en modales, selects, tabs o toasts.

**Recomendación:** Integrar `@radix-ui/*` para:
- `Dialog` → Modal
- `Select` → Select
- `Tabs` → Tabs
- `Toast` → Toast
- `DropdownMenu` → UserMenu (dropdown)

### 7.3 Unificar iconos con lucide-react

**Problema actual:** SVGs inline replicados.

**Recomendación:** Instalar `lucide-react` y crear un wrapper `<Icon name="upload" />` que mapee nombres a componentes de lucide. Esto reducirá ~200 líneas de SVG inline a ~20 líneas de configuración.

### 7.4 Estrategia de migración por capas

No intentar migrar todo de golpe. La migración debe ser progresiva:

```
Fase 1 (inmediata):
  - Crear estructura de directorios
  - Implementar Button, Input, Badge, Spinner, Icon
  - Reemplazar usos en 1-2 páginas como piloto

Fase 2 (corto plazo):
  - FormField, FileUpload
  - Toast, Alert
  - Table, Card, EmptyState

Fase 3 (medio plazo):
  - Modal, ConfirmDialog
  - Tabs, Pagination
  - Navbar, Footer (requiere refactor de layouts)

Fase 4 (larga plazo):
  - Container, Section, Grid (bajo impacto)
  - Migración completa de páginas existentes
  - Eliminación de clases CSS duplicadas en globals.css
```

### 7.5 No tocar el Core ni el dominio

> **Restricción:** El Design System no debe modificar ni depender de:
> - `src/lib/core/` (repositorios, servicios)
> - `src/lib/actions/` (server actions)
> - `src/types/core/` (tipos del dominio)
> - `src/hooks/` (hooks de negocio)
>
> Los componentes del DS deben recibir datos y callbacks por props,
> no importar lógica de negocio directamente.

### 7.6 Gestión de tokens

**Recomendación técnica:** Definir los tokens en un archivo CSS usando la sintaxis `@theme` de Tailwind CSS v4:

```css
/* src/styles/tokens.css */
@theme {
  --color-primary: ...;
  --color-primary-hover: ...;
  --spacing-1: 0.25rem;
  --radius-md: 6px;
  --font-family-sans: 'Inter', system-ui, sans-serif;
  /* ... */
}
```

Esto permitirá usar `bg-primary`, `p-4`, `rounded-md` directamente en clases Tailwind, manteniendo los valores centralizados y tipados.

### 7.7 Testing del Design System

Cada componente del DS debe tener:
- **Unit test** (vitest + @testing-library/react)
  - Renderizado básico
  - Variantes (prop variant)
  - Estados (disabled, loading, error)
  - Eventos (onClick, onChange)
- **Accessibility test** (vitest + @axe-core/react)
  - ARIA attributes correctos
  - Keyboard navigation
  - Focus management
- **Snapshot test** (opcional, para detectar cambios no intencionados)

---

## 8. INVENTARIO OFICIAL FROZEN V1

> **Última actualización:** 2026-07-06
>
> **Propósito:** Catálogo oficial de componentes del Design System de Certilab
> que han superado el proceso de congelación (Frozen v1).
>
> **Regla:** Ningún componente puede considerarse parte del catálogo oficial
> hasta haber superado Engineering Review + Accessibility Review + Visual Design Review
> y contar con la aprobación explícita del usuario.

### 8.1 Componentes Frozen v1

| Componente | Archivo | Estado | Fecha | Épica |
|-----------|---------|--------|-------|-------|
| `Badge` | `src/components/ui/Badge.tsx` | 🧊 Frozen v1 | 2026-07-XX | DS-01 |
| `Button` | `src/components/ui/Button.tsx` | 🧊 Frozen v1 | 2026-07-XX | DS-02A |
| `Input` | `src/components/ui/Input.tsx` | 🧊 Frozen v1 | 2026-07-06 | DS-02B |
| `DataTable` | `src/components/ui/DataTable.tsx` | 🧊 Frozen v1 | 2026-07-06 | DS-03 |

### 8.2 Principios compartidos por todos los componentes Frozen v1

1. **Design Tokens exclusivamente** — Sin valores hardcodeados.
2. **WCAG AA** — ARIA attributes correctos, keyboard navigation, focus visible.
3. **TypeScript estricto** — Props tipadas, sin `any`.
4. **Light/Dark Theme** — Compatibilidad mediante CSS variables.
5. **API mínima** — Composición sobre configuración.
6. **Sin lógica de negocio** — Los componentes solo representan estados.
7. **Storybook First** — Documentación completa con escenarios reales.
8. **Sin TODO, FIXME, console.log** en producción.

### 8.3 Reglas de gobierno

- **No modificar la API pública** de un componente Frozen v1 salvo incidencia crítica.
- **No añadir nuevas props** sin una necesidad demostrada mediante caso de uso real.
- **Cualquier mejora futura** debe realizarse mediante una nueva épica (DS-XX-R1, DS-XX-R2, etc.), nunca alterando Frozen v1.
- **Los nuevos componentes** deben reutilizar el mismo lenguaje visual (proporciones, pesos, espaciados, focus, jerarquía, ritmo visual).

### 8.4 Próximos componentes (orden sugerido)

Basado en la prioridad para formularios y la experiencia de uso del MVP:

1. `Select` — El más importante para formularios
2. `Textarea`
3. `Checkbox`
4. `Radio`
5. `Switch`
6. `Modal` / `Dialog`
7. `Toast`

> **Nota:** `DataTable` ya está implementado y congelado como Frozen v1 (DS-03).

---

## Apéndice A: Resumen de hallazgos

| Categoría | Cantidad | Problema principal |
|-----------|----------|-------------------|
| Variantes de botón | ~17 | Sin componente `<Button>` unificado |
| Implementaciones de loading | 3 | Sin componente `<Spinner>` |
| Implementaciones de empty state | 2+ | Sin componente `<EmptyState>` |
| Implementaciones de form field | 3 | Sin componente `<FormField>` |
| Iconos | ~9 (todos inline) | Sin librería de iconos |
| Badges | CSS + 3 páginas inline | Sin consistencia de uso |
| Modales | 4 (2 nativos, 1 dropdown, 1 banner) | Sin componente `<Modal>` |
| Tablas | 4 (ad-hoc) | Sin componente `<Table>` |

## Apéndice B: Componentes actuales en `src/components/` (raw listing)

```
src/components/
├── auth/
│   └── UserMenu.tsx
├── expedientes/
│   ├── DocumentList.tsx
│   ├── DocumentUpload.tsx
│   └── EntregarResultadoButton.tsx
└── layout/
    └── CookieConsent.tsx
```

**Observación:** Actualmente solo existen 4 componentes React en `src/components/`. El resto del UI está incrustado en páginas (`src/app/`) como código inline o en `globals.css`. Esto confirma la necesidad de extraer componentes al DS.

---

> **Documento generado en:** DESIGN-000 — Preparación del Design System
>
> **Próximo paso:** Cuando la Design Bible esté disponible, iniciar DESIGN-001 con la
> definición de tokens visuales (colores, tipografía, spacing) y la implementación
> de los primeros componentes Atomics (Button, Input, Badge, Spinner).
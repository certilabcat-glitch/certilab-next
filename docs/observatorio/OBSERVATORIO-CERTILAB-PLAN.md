# 🔬 OBSERVATORIO CERTILAB — Plan de Diseño

> **Versión:** 1.0 — Junio 2026  
> **Objetivo:** Convertir Certilab en fuente de datos propia sobre certificados energéticos incorrectos  
> **Estado:** Diseño (sin implementación)  
> **Responsable:** Eva González + Abdelaziz

---

## 📋 Índice

1. [Visión general](#-visión-general)
2. [Modelo de datos](#-modelo-de-datos)
3. [Dashboard interno](#-dashboard-interno)
4. [Página pública del Observatorio](#-página-pública-del-observatorio)
5. [Métricas principales](#-métricas-principales)
6. [Sistema de informes trimestrales](#-sistema-de-informes-trimestrales)
7. [Estructura SEO](#-estructura-seo)
8. [Arquitectura técnica](#-arquitectura-técnica)
9. [Roadmap de implementación](#-roadmap-de-implementación)

---

## 🎯 Visión General

El **Observatorio Certilab** es una iniciativa de transparencia que convierte cada Segunda Opinión en un punto de datos sobre la calidad de los certificados energéticos en España.

### Objetivos

1. **Acumular datos propios** sobre errores, discrepancias y patrones en certificados energéticos
2. **Generar inteligencia de mercado** que diferencie a Certilab como experto independiente
3. **Publicar informes trimestrales** con hallazgos, tendencias y recomendaciones
4. **Construir autoridad SEO** con contenido data-driven único en el sector
5. **Crear valor para clientes** mostrando el impacto real de los errores detectados

### Diferenciadores

- **Datos reales, no teóricos**: Basados en análisis forenses de certificados reales
- **Independencia**: No vendemos certificados, solo analizamos
- **Transparencia**: Publicamos hallazgos sin filtros comerciales
- **Granularidad geográfica**: Datos por provincia, comunidad autónoma, tipo de inmueble
- **Impacto económico cuantificado**: Cada error tiene un coste estimado

---

## 📊 Modelo de Datos

### Tabla: `second_opinions` (Segunda Opinión)

Cada análisis registra:

```typescript
interface SecondOpinion {
  // Identificadores
  id: string;                    // UUID único
  createdAt: Date;               // Fecha de análisis
  
  // Ubicación
  province: string;              // Provincia (Cataluña, Madrid, etc.)
  region: string;                // Comunidad autónoma
  municipality: string;          // Municipio (opcional)
  
  // Inmueble
  propertyType: 'vivienda' | 'local' | 'oficina' | 'otro';
  buildingYear: number;          // Año construcción
  surfaceArea: number;           // m² útiles
  
  // Certificado original
  originalRating: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  originalCertificateDate: Date; // Fecha emisión certificado
  originalCertificateId: string; // ID del certificado (si disponible)
  
  // Análisis Certilab
  estimatedRating: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  ratingDifference: number;      // Diferencia en letras (ej: -2 = 2 letras peor)
  
  // Errores detectados
  errors: ErrorDetected[];
  
  // Impacto económico
  brownDiscountEstimate: number; // % de pérdida de valor
  economicImpact: number;        // € estimados de pérdida
  
  // Metadata
  analysisType: 'standard' | 'express';
  analyzerName: string;          // "Eva María González García"
  status: 'completed' | 'pending';
}

interface ErrorDetected {
  type: ErrorType;
  description: string;
  severity: 'critical' | 'major' | 'minor';
  estimatedCost: number;         // € de impacto
}

enum ErrorType {
  // Errores de datos
  MISSING_DATA = 'missing_data',                    // Datos faltantes
  INCONSISTENT_DATA = 'inconsistent_data',          // Datos inconsistentes
  WRONG_SURFACE = 'wrong_surface',                  // Superficie incorrecta
  WRONG_YEAR = 'wrong_year',                        // Año construcción incorrecto
  
  // Errores técnicos
  INFLATED_RATING = 'inflated_rating',              // Calificación inflada
  MISSING_INSPECTION = 'missing_inspection',        // Sin inspección presencial
  OUTDATED_DATA = 'outdated_data',                  // Datos obsoletos
  WRONG_CALCULATION = 'wrong_calculation',          // Cálculo incorrecto
  
  // Errores de contexto
  BROWN_DISCOUNT = 'brown_discount',                // Penalización por eficiencia
  MARKET_MISMATCH = 'market_mismatch',              // No coincide con mercado
  REGULATORY_BREACH = 'regulatory_breach',          // Incumplimiento normativo
}
```

### Tabla: `error_statistics` (Estadísticas de errores)

Agregación diaria/semanal/mensual:

```typescript
interface ErrorStatistics {
  id: string;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  periodDate: Date;
  
  // Conteos
  totalAnalyzed: number;
  totalWithErrors: number;
  percentageWithErrors: number;
  
  // Por tipo de error
  errorCounts: Record<ErrorType, number>;
  errorPercentages: Record<ErrorType, number>;
  
  // Por provincia
  byProvince: {
    province: string;
    count: number;
    errorRate: number;
    averageImpact: number;
  }[];
  
  // Por tipo de inmueble
  byPropertyType: {
    type: string;
    count: number;
    errorRate: number;
  }[];
  
  // Por calificación original
  byRating: {
    rating: string;
    count: number;
    errorRate: number;
    avgDifference: number;
  }[];
  
  // Impacto económico
  totalEconomicImpact: number;
  averageImpactPerProperty: number;
  totalBrownDiscountRisk: number;
}
```

### Tabla: `quarterly_reports` (Informes trimestrales)

```typescript
interface QuarterlyReport {
  id: string;
  year: number;
  quarter: 1 | 2 | 3 | 4;
  publishedAt: Date;
  
  // Resumen ejecutivo
  summary: string;
  keyFindings: string[];
  
  // Datos
  statistics: ErrorStatistics;
  
  // Análisis
  trends: Trend[];
  recommendations: Recommendation[];
  
  // Contenido
  articleSlug: string;           // /blog/observatorio-q1-2026
  publicUrl: string;
}

interface Trend {
  title: string;
  description: string;
  dataPoints: number[];
  direction: 'up' | 'down' | 'stable';
}

interface Recommendation {
  title: string;
  description: string;
  audience: 'buyers' | 'sellers' | 'professionals' | 'regulators';
}
```

---

## 🎛️ Dashboard Interno

### Ubicación
`/admin/observatorio/` (protegido con autenticación)

### Secciones principales

#### 1. **Resumen ejecutivo** (Overview)

```
┌─────────────────────────────────────────────────────────┐
│ OBSERVATORIO CERTILAB — Dashboard                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Período: [Selector: Hoy | Esta semana | Este mes]      │
│                                                         │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│ │ Análisis     │  │ Con errores  │  │ Tasa error   │   │
│ │ 47           │  │ 23 (48,9%)   │  │ 48,9%        │   │
│ └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                         │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│ │ Impacto €    │  │ Brown Disc.  │  │ Promedio €   │   │
│ │ 847.500€     │  │ 12 casos     │  │ 18.000€      │   │
│ └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Widgets:**
- Total de análisis en período
- Número y % con errores
- Impacto económico total
- Casos de Brown Discount
- Promedio de impacto por propiedad
- Tasa de error vs. período anterior

#### 2. **Errores más comunes** (Top Errors)

```
┌─────────────────────────────────────────────────────────┐
│ ERRORES MÁS FRECUENTES                                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 1. Calificación inflada          18 casos (38,3%)      │
│    └─ Impacto medio: 22.000€                           │
│                                                         │
│ 2. Datos inconsistentes          12 casos (25,5%)      │
│    └─ Impacto medio: 8.500€                            │
│                                                         │
│ 3. Superficie incorrecta          8 casos (17,0%)       │
│    └─ Impacto medio: 5.200€                            │
│                                                         │
│ 4. Año construcción incorrecto    5 casos (10,6%)       │
│    └─ Impacto medio: 3.800€                            │
│                                                         │
│ 5. Sin inspección presencial      4 casos (8,5%)        │
│    └─ Impacto medio: 12.000€                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### 3. **Análisis geográfico** (By Province)

Tabla interactiva:

| Provincia | Análisis | Con errores | Tasa | Impacto medio | Tendencia |
|-----------|----------|-------------|------|---------------|-----------|
| Barcelona | 18 | 9 | 50% | 19.500€ | ↑ |
| Madrid | 12 | 5 | 41,7% | 16.800€ | → |
| Valencia | 8 | 4 | 50% | 18.200€ | ↓ |
| Sevilla | 5 | 2 | 40% | 14.000€ | ↑ |
| Bilbao | 4 | 2 | 50% | 21.000€ | → |

**Visualización:** Mapa de España con colores por tasa de error

#### 4. **Por tipo de inmueble** (By Property Type)

```
Vivienda unifamiliar:    28 análisis | 46% con errores | 20.100€ promedio
Piso en bloque:          15 análisis | 53% con errores | 17.800€ promedio
Local comercial:         3 análisis  | 33% con errores | 12.500€ promedio
Oficina:                 1 análisis  | 100% con errores | 25.000€ promedio
```

#### 5. **Diferencias de calificación** (Rating Differences)

Gráfico de distribución:

```
Calificación original vs. Estimada

A → A: 8 casos (sin cambio)
A → B: 3 casos (-1 letra)
A → C: 2 casos (-2 letras)
B → B: 12 casos (sin cambio)
B → C: 5 casos (-1 letra)
B → D: 2 casos (-2 letras)
C → C: 10 casos (sin cambio)
C → D: 3 casos (-1 letra)
D → D: 5 casos (sin cambio)
```

**Insight:** El 38% de los análisis muestran una calificación original inflada

#### 6. **Tendencias temporales** (Trends)

Gráficos de línea:

- **Tasa de error por mes** (últimos 12 meses)
- **Impacto económico acumulado** (últimos 12 meses)
- **Errores más comunes por trimestre**
- **Casos de Brown Discount por mes**

#### 7. **Gestión de informes** (Reports)

```
┌─────────────────────────────────────────────────────────┐
│ INFORMES TRIMESTRALES                                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Q1 2026 (Ene-Mar)                                       │
│ ├─ Estado: Publicado                                    │
│ ├─ Análisis: 47                                         │
│ ├─ Errores: 23 (48,9%)                                  │
│ ├─ Impacto: 847.500€                                    │
│ └─ URL: /blog/observatorio-q1-2026                      │
│                                                         │
│ Q2 2026 (Abr-Jun)                                       │
│ ├─ Estado: En borrador                                  │
│ ├─ Análisis: 34 (en progreso)                           │
│ ├─ Errores: 16 (47,1%)                                  │
│ ├─ Impacto: 612.000€ (estimado)                         │
│ └─ [Editar] [Publicar] [Descargar PDF]                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Acciones:**
- Ver informe completo
- Descargar como PDF
- Editar datos
- Publicar en blog
- Compartir en redes

#### 8. **Filtros y exportación**

- Filtrar por período (fecha inicio/fin)
- Filtrar por provincia
- Filtrar por tipo de inmueble
- Filtrar por tipo de error
- Exportar a CSV
- Exportar a PDF
- Exportar a Excel

---

## 📱 Página Pública del Observatorio

### URL
`/observatorio/` (o `/observatorio-certificados-energeticos/`)

### Estructura

#### 1. **Hero Section**

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│ OBSERVATORIO CERTILAB                                   │
│ Datos reales sobre certificados energéticos incorrectos │
│                                                         │
│ Cada análisis que hacemos es un punto de datos.         │
│ Publicamos hallazgos trimestrales sin filtros.          │
│                                                         │
│ [Ver último informe] [Suscribirse a actualizaciones]   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Elementos:**
- Eyebrow: "Transparencia de datos"
- H1: "Observatorio Certilab de Certificados Energéticos"
- Subtítulo: Explicación de qué es y por qué importa
- CTAs: Ver informe trimestral + Suscribirse
- Badges: "Datos reales", "Independiente", "Actualizado trimestralmente"

#### 2. **Resumen de hallazgos** (Key Findings)

```
┌─────────────────────────────────────────────────────────┐
│ HALLAZGOS PRINCIPALES (Q1 2026)                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 📊 48,9% de certificados analizados tienen errores      │
│                                                         │
│ 💰 Impacto económico medio: 18.000€ por propiedad       │
│                                                         │
│ 🏠 El Brown Discount afecta a 1 de cada 4 viviendas     │
│                                                         │
│ 📈 La calificación inflada es el error más común        │
│                                                         │
│ 🗺️ Barcelona lidera con 50% de tasa de error            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### 3. **Estadísticas interactivas** (Interactive Stats)

Gráficos interactivos (Chart.js o similar):

- **Tasa de error por provincia** (mapa + tabla)
- **Errores más comunes** (gráfico de barras)
- **Diferencias de calificación** (distribución)
- **Impacto económico** (gráfico de línea temporal)
- **Por tipo de inmueble** (gráfico de pastel)

#### 4. **Últimos informes** (Latest Reports)

```
┌─────────────────────────────────────────────────────────┐
│ INFORMES TRIMESTRALES                                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Q1 2026 — Enero a Marzo                                 │
│ ├─ 47 análisis | 48,9% con errores | 847.500€ impacto  │
│ ├─ Hallazgo principal: Calificaciones infladas          │
│ └─ [Leer informe completo →]                            │
│                                                         │
│ Q4 2025 — Octubre a Diciembre                           │
│ ├─ 52 análisis | 46,2% con errores | 923.000€ impacto  │
│ ├─ Hallazgo principal: Brown Discount en auge           │
│ └─ [Leer informe completo →]                            │
│                                                         │
│ Q3 2025 — Julio a Septiembre                            │
│ ├─ 38 análisis | 44,7% con errores | 712.000€ impacto  │
│ ├─ Hallazgo principal: Datos inconsistentes             │
│ └─ [Leer informe completo →]                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### 5. **Metodología** (Methodology)

Sección explicativa:

- Cómo se recopilan los datos
- Qué análisis incluimos
- Cómo se calcula el impacto económico
- Limitaciones y disclaimers
- Independencia y transparencia

#### 6. **FAQ del Observatorio**

```
¿Qué datos incluye el Observatorio?
→ Cada Segunda Opinión que realizamos, anonimizada.

¿Cómo se calcula el impacto económico?
→ Basado en pérdida de valor (Brown Discount) + costes de corrección.

¿Puedo acceder a los datos brutos?
→ Publicamos agregaciones trimestrales. Los datos individuales son anónimos.

¿Qué significa "calificación inflada"?
→ Cuando la letra asignada es superior a la que corresponde técnicamente.

¿Por qué algunas provincias tienen más errores?
→ Puede deberse a diferencias en criterios de certificadores locales.
```

#### 7. **Suscripción a actualizaciones**

Formulario simple:

```
┌─────────────────────────────────────────────────────────┐
│ RECIBE LOS INFORMES TRIMESTRALES                        │
│                                                         │
│ [Email input] [Suscribirse]                             │
│                                                         │
│ ✓ Informe trimestral en tu bandeja                      │
│ ✓ Análisis de tendencias                                │
│ ✓ Recomendaciones para profesionales                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### 8. **CTA contextual**

```
¿Quieres saber si tu certificado está en el grupo de los incorrectos?

Solicita una Segunda Opinión por 59€ y contribuye a los datos del Observatorio.
[Solicitar análisis →]
```

---

## 📈 Métricas Principales

### 1. **% de certificados con discrepancias**

```
Definición: (Análisis con errores / Total análisis) × 100

Fórmula: 
  Discrepancias = 23 análisis
  Total = 47 análisis
  % = (23 / 47) × 100 = 48,9%

Desglose:
  - Por provincia
  - Por tipo de inmueble
  - Por rango de antigüedad
  - Por calificación original
  - Tendencia temporal (mes a mes)
```

### 2. **Errores más comunes**

```
Ranking por frecuencia:

1. Calificación inflada (38,3%)
   └─ Impacto medio: 22.000€
   
2. Datos inconsistentes (25,5%)
   └─ Impacto medio: 8.500€
   
3. Superficie incorrecta (17,0%)
   └─ Impacto medio: 5.200€
   
4. Año construcción incorrecto (10,6%)
   └─ Impacto medio: 3.800€
   
5. Sin inspección presencial (8,5%)
   └─ Impacto medio: 12.000€

Visualización: Gráfico de barras + tabla
```

### 3. **Diferencias de calificación**

```
Distribución de cambios:

Sin cambio (A→A, B→B, etc.):     35 casos (74,5%)
-1 letra (A→B, B→C, etc.):       10 casos (21,3%)
-2 letras (A→C, B→D, etc.):      2 casos (4,3%)
-3 o más letras:                 0 casos (0%)

Insight: El 25,5% de certificados tienen calificación inflada
```

### 4. **Impacto económico estimado**

```
Cálculo por propiedad:

Impacto = Brown Discount (%) × Valor estimado + Costes de corrección

Ejemplo:
  - Vivienda: 270.000€
  - Brown Discount: 15% (por calificación E)
  - Pérdida: 40.500€
  - Costes corrección: 8.000€
  - Impacto total: 48.500€

Agregado trimestral:
  - Total impacto: 847.500€
  - Promedio por propiedad: 18.000€
  - Mediana: 15.200€
  - Máximo: 52.000€
  - Mínimo: 2.100€
```

### 5. **Análisis por segmentos**

#### Por provincia
```
Barcelona:    50% error rate | 19.500€ promedio
Madrid:       41,7% error rate | 16.800€ promedio
Valencia:     50% error rate | 18.200€ promedio
Sevilla:      40% error rate | 14.000€ promedio
Bilbao:       50% error rate | 21.000€ promedio
```

#### Por tipo de inmueble
```
Vivienda unifamiliar:  46% error rate | 20.100€ promedio
Piso en bloque:        53% error rate | 17.800€ promedio
Local comercial:       33% error rate | 12.500€ promedio
Oficina:               100% error rate | 25.000€ promedio
```

#### Por antigüedad
```
< 10 años:    35% error rate | 12.000€ promedio
10-30 años:   48% error rate | 18.500€ promedio
30-50 años:   52% error rate | 21.000€ promedio
> 50 años:    58% error rate | 24.500€ promedio
```

---

## 📅 Sistema de Informes Trimestrales

### Estructura del informe

#### Portada
```
OBSERVATORIO CERTILAB
Informe Trimestral Q1 2026
Enero — Marzo 2026

Datos reales sobre certificados energéticos incorrectos
```

#### Resumen ejecutivo (1 página)

- Número de análisis realizados
- Tasa de error general
- Impacto económico total
- 3-5 hallazgos principales
- Recomendaciones clave

#### Sección 1: Datos generales (2 páginas)

- Total de análisis
- Distribución temporal
- Distribución geográfica
- Distribución por tipo de inmueble
- Gráficos y tablas

#### Sección 2: Errores detectados (3 páginas)

- Top 5 errores más comunes
- Frecuencia y severidad
- Impacto económico por tipo de error
- Casos de estudio anónimos
- Gráficos de distribución

#### Sección 3: Análisis geográfico (2 páginas)

- Mapa de España con tasas de error
- Tabla por provincia
- Provincias con mayor impacto
- Tendencias regionales

#### Sección 4: Análisis por segmentos (2 páginas)

- Por tipo de inmueble
- Por antigüedad
- Por calificación original
- Por rango de valor

#### Sección 5: Impacto económico (2 páginas)

- Cálculo de Brown Discount
- Costes de corrección
- Impacto total acumulado
- Proyecciones anuales

#### Sección 6: Tendencias y comparativas (2 páginas)

- Comparación con trimestre anterior
- Comparación con año anterior
- Evolución de errores más comunes
- Predicciones para próximo trimestre

#### Sección 7: Recomendaciones (1 página)

**Para compradores:**
- Solicitar Segunda Opinión antes de firmar
- Indicadores de riesgo a vigilar
- Cómo negociar con datos

**Para vendedores:**
- Revisar certificado antes de vender
- Oportunidades de mejora
- Impacto en precio de venta

**Para profesionales:**
- Estándares de calidad esperados
- Áreas de mejora en el sector
- Oportunidades de diferenciación

**Para reguladores:**
- Patrones de incumplimiento
- Recomendaciones de control
- Propuestas de mejora normativa

#### Anexos

- Metodología detallada
- Definiciones de errores
- Fórmulas de cálculo
- Casos de estudio completos
- Datos brutos (agregados)

### Formato de publicación

1. **Artículo en blog** (`/blog/observatorio-q1-2026/`)
   - Versión resumida (1.500-2.000 palabras)
   - Gráficos interactivos
   - CTAs contextuales
   - Schema.org Article

2. **PDF descargable**
   - Informe completo (15-20 páginas)
   - Diseño profesional
   - Gráficos de alta calidad
   - Disponible en `/downloads/observatorio-q1-2026.pdf`

3. **Presentación ejecutiva**
   - Versión de 5-10 diapositivas
   - Para compartir con profesionales
   - Formato PowerPoint/PDF

4. **Datos abiertos** (opcional)
   - CSV con datos agregados
   - JSON con estadísticas
   - Disponible para investigadores

### Calendario de publicación

```
Q1 (Ene-Mar):  Publicar 15 de abril
Q2 (Abr-Jun):  Publicar 15 de julio
Q3 (Jul-Sep):  Publicar 15 de octubre
Q4 (Oct-Dic):  Publicar 15 de enero
```

---

## 🔍 Estructura SEO

### URLs

```
/observatorio/                          # Página principal
/observatorio/q1-2026/                  # Informe trimestral
/observatorio/q4-2025/
/observatorio/q3-2025/
/observatorio/metodologia/              # Cómo se recopilan datos
/observatorio/datos/                    # Datos abiertos
/observatorio/suscribirse/              # Suscripción
```

### Meta tags

#### Página principal (`/observatorio/`)

```html
<title>Observatorio Certilab | Datos sobre Certificados Energéticos Incorrectos</title>
<meta name="description" content="Datos reales sobre errores en certificados energéticos. Informes trimestrales con análisis de discrepancias, impacto económico y tendencias por provincia.">
<meta name="keywords" content="observatorio certificados energéticos, datos certificados, errores certificados, brown discount, calificación energética">
<link rel="canonical" href="https://www.certilab.cat/observatorio/">
```

#### Informe trimestral (`/observatorio/q1-2026/`)

```html
<title>Observatorio Q1 2026 | 48,9% de certificados con errores | Certilab</title>
<meta name="description" content="Informe trimestral Q1 2026: 47 análisis, 48,9% con errores, 847.500€ de impacto económico. Hallazgos sobre calificaciones infladas y Brown Discount.">
<link rel="canonical" href="https://www.certilab.cat/observatorio/q1-2026/">
```

### Schema.org

#### Página principal

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Observatorio Certilab de Certificados Energéticos",
  "description": "Datos reales sobre errores en certificados energéticos españoles",
  "url": "https://www.certilab.cat/observatorio/",
  "creator": {
    "@type": "Organization",
    "name": "Certilab",
    "url": "https://www.certilab.cat"
  },
  "datePublished": "2026-04-15",
  "dateModified": "2026-04-15",
  "distribution": {
    "@type": "DataDownload",
    "encodingFormat": "PDF",
    "url": "https://www.certilab.cat/downloads/observatorio-q1-2026.pdf"
  },
  "spatialCoverage": {
    "@type": "Country",
    "name": "España"
  },
  "keywords": "certificados energéticos, errores, brown discount, calificación energética"
}
```

#### Informe trimestral (como Article)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Observatorio Q1 2026: 48,9% de certificados con errores",
  "description": "Informe trimestral con análisis de 47 certificados energéticos",
  "datePublished": "2026-04-15",
  "dateModified": "2026-04-15",
  "author": {
    "@type": "Person",
    "name": "Eva María González García"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Certilab"
  },
  "image": "https://www.certilab.cat/images/observatorio-q1-2026.jpg"
}
```

### Palabras clave objetivo

**Primarias:**
- Observatorio certificados energéticos
- Errores certificados energéticos
- Brown discount
- Calificación energética incorrecta
- Certificado energético inflado

**Secundarias:**
- Datos certificados energéticos España
- Análisis certificados energéticos
- Impacto económico certificado
- Certificado energético por provincia
- Tendencias certificados energéticos

**Long-tail:**
- Qué es el brown discount y cómo afecta
- Porcentaje de certificados incorrectos
- Errores más comunes en certificados
- Cómo detectar certificado energético falso
- Impacto económico certificado incorrecto

### Estrategia de contenido

1. **Página principal del Observatorio**
   - Posicionar para "observatorio certificados energéticos"
   - Incluir datos principales en H2/H3
   - CTAs a informes trimestrales

2. **Informes trimestrales**
   - Cada informe posiciona para keywords específicas
   - Incluir datos únicos no disponibles en otros sitios
   - Backlinks internos a servicios

3. **Artículos de blog relacionados**
   - "¿Qué es el Brown Discount?" → `/blog/brown-discount/`
   - "Cómo detectar un certificado inflado" → `/blog/certificado-inflado/`
   - "Errores más comunes en certificados" → `/blog/errores-certificados/`
   - Cada artículo enlaza al Observatorio

4. **Datos estructurados**
   - Schema.org Dataset para página principal
   - Schema.org Article para informes
   - Schema.org BreadcrumbList en todas las páginas

---

## 🏗️ Arquitectura Técnica

### Stack

| Capa | Tecnología |
|------|-----------|
| **Base de datos** | Supabase (PostgreSQL) |
| **Backend** | Next.js API Routes |
| **Frontend** | React + TypeScript |
| **Gráficos** | Chart.js o Recharts |
| **Autenticación** | Supabase Auth (admin) |
| **Almacenamiento** | Supabase Storage (PDFs) |
| **Email** | SendGrid (suscripciones) |

### Estructura de carpetas

```
src/
├── app/
│   ├── observatorio/
│   │   ├── page.tsx                 # Página principal
│   │   ├── layout.tsx
│   │   ├── observatorio.module.css
│   │   ├── [quarter]/
│   │   │   └── page.tsx             # Informe trimestral
│   │   ├── metodologia/
│   │   │   └── page.tsx
│   │   ├── datos/
│   │   │   └── page.tsx
│   │   └── suscribirse/
│   │       └── page.tsx
│   │
│   └── admin/
│       └── observatorio/
│           ├── page.tsx             # Dashboard
│           ├── layout.tsx
│           ├── dashboard.module.css
│           └── [section]/
│               └── page.tsx
│
├── components/
│   ├── observatorio/
│   │   ├── ObservatorioHero.tsx
│   │   ├── KeyFindings.tsx
│   │   ├── InteractiveStats.tsx
│   │   ├── LatestReports.tsx
│   │   ├── SubscriptionForm.tsx
│   │   └── observatorio.module.css
│   │
│   └── admin/
│       ├── DashboardOverview.tsx
│       ├── ErrorChart.tsx
│       ├── ProvinceMap.tsx
│       ├── ReportManager.tsx
│       └── admin.module.css
│
├── lib/
│   ├── observatorio/
│   │   ├── calculations.ts          # Cálculos de métricas
│   │   ├── aggregations.ts          # Agregaciones de datos
│   │   ├── reportGenerator.ts       # Generación de informes
│   │   └── schema.ts                # Schema.org
│   │
│   └── supabase.ts
│
├── data/
│   └── observatorio/
│       ├── errorTypes.ts
│       ├── provinces.ts
│       └── propertyTypes.ts
│
└── types/
    └── observatorio.ts              # Interfaces
```

### API Routes

```
/api/observatorio/
├── /stats                           # GET: Estadísticas generales
├── /stats/[period]                  # GET: Por período
├── /errors                          # GET: Errores más comunes
├── /provinces                       # GET: Datos por provincia
├── /reports                         # GET: Lista de informes
├── /reports/[quarter]               # GET: Informe específico
├── /subscribe                       # POST: Suscripción
└── /admin/
    ├── /second-opinions             # POST: Registrar análisis
    ├── /reports/generate            # POST: Generar informe
    └── /reports/publish             # POST: Publicar informe
```

### Flujo de datos

```
1. Segunda Opinión completada
   ↓
2. Datos guardados en `second_opinions` table
   ↓
3. Trigger automático calcula estadísticas
   ↓
4. Dashboard actualiza en tiempo real
   ↓
5. Cada trimestre: generar informe
   ↓
6. Publicar en blog + PDF
   ↓
7. Enviar email a suscriptores
```

---

## 🚀 Roadmap de Implementación

### Fase 1: Infraestructura de datos (Semanas 1-2)

- [ ] Crear tablas en Supabase
  - `second_opinions`
  - `error_statistics`
  - `quarterly_reports`
  - `subscriptions`
- [ ] Crear índices y relaciones
- [ ] Crear funciones de agregación
- [ ] Crear triggers automáticos

### Fase 2: Backend (Semanas 2-3)

- [ ] Crear API routes para estadísticas
- [ ] Crear funciones de cálculo de métricas
- [ ] Crear generador de informes
- [ ] Crear sistema de suscripciones (SendGrid)
- [ ] Crear autenticación admin

### Fase 3: Dashboard interno (Semanas 3-4)

- [ ] Componente de resumen ejecutivo
- [ ] Gráficos de errores más comunes
- [ ] Mapa de provincias
- [ ] Tabla de análisis
- [ ] Gestor de informes
- [ ] Exportación a CSV/PDF

### Fase 4: Página pública (Semanas 4-5)

- [ ] Hero section
- [ ] Sección de hallazgos principales
- [ ] Gráficos interactivos
- [ ] Últimos informes
- [ ] Sección de metodología
- [ ] FAQ
- [ ] Formulario de suscripción

### Fase 5: Informes trimestrales (Semanas 5-6)

- [ ] Plantilla de informe
- [ ] Generador automático de PDF
- [ ] Publicación en blog
- [ ] Email a suscriptores
- [ ] Compartir en redes

### Fase 6: SEO y optimización (Semana 6)

- [ ] Meta tags y Schema.org
- [ ] Sitemap
- [ ] Robots.txt
- [ ] Breadcrumbs
- [ ] Lighthouse audit
- [ ] Testing

### Fase 7: Lanzamiento (Semana 7)

- [ ] Deploy a producción
- [ ] Verificación en Google Search Console
- [ ] Anuncio en redes
- [ ] Primer informe trimestral

---

## 📊 Métricas de éxito

### Corto plazo (3 meses)

- ✅ Dashboard funcional con datos en tiempo real
- ✅ Primer informe trimestral publicado
- ✅ 100+ suscriptores
- ✅ 50+ análisis registrados

### Medio plazo (6 meses)

- ✅ 200+ suscriptores
- ✅ 150+ análisis registrados
- ✅ 2 informes trimestrales publicados
- ✅ 5.000+ visitas a página del Observatorio
- ✅ Posicionamiento en Google para "observatorio certificados"

### Largo plazo (12 meses)

- ✅ 500+ suscriptores
- ✅ 400+ análisis registrados
- ✅ 4 informes trimestrales publicados
- ✅ 20.000+ visitas anuales
- ✅ Reconocimiento como fuente de datos independiente
- ✅ Menciones en medios especializados

---

## 🎯 Próximos pasos

1. **Validar con Eva**: Revisar modelo de datos y métricas
2. **Diseñar UI/UX**: Mockups del dashboard y página pública
3. **Planificar implementación**: Asignar recursos y timeline
4. **Preparar datos históricos**: Revisar análisis anteriores para retroalimentar
5. **Comenzar Fase 1**: Crear infraestructura de datos

---

> **Nota:** Este documento es un plan de diseño. No incluye implementación técnica detallada ni código. Está listo para revisión y aprobación antes de proceder con el desarrollo.

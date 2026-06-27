# 📋 Sistema de Expedientes Certilab — Fase 1: Diseño Completo

> **Versión:** 1.0 — Junio 2026  
> **Objetivo:** Diseñar e implementar experiencia premium desde pago hasta entrega del informe  
> **Estado:** Diseño arquitectónico (sin implementación)  
> **Responsable:** Abdelaziz + Eva González  

---

## 📑 Índice

1. [Visión general](#-visión-general)
2. [Flujo del cliente (diagrama)](#-flujo-del-cliente)
3. [Arquitectura de datos](#-arquitectura-de-datos)
4. [Pantallas y componentes](#-pantallas-y-componentes)
5. [Rutas API necesarias](#-rutas-api-necesarias)
6. [Emails automáticos](#-emails-automáticos)
7. [Integración futura con n8n](#-integración-futura-con-n8n)
8. [Preparación para Observatorio](#-preparación-para-observatorio)
9. [Estructura de carpetas](#-estructura-de-carpetas)
10. [Roadmap de implementación](#-roadmap-de-implementación)

---

## 🎯 Visión General

El **Sistema de Expedientes Certilab** es el flujo completo que convierte un cliente que paga en un cliente que recibe un informe profesional.

### Objetivos de Fase 1

1. **Diseñar arquitectura completa** sin implementar automatizaciones complejas
2. **Crear todas las pantallas** necesarias para el flujo
3. **Preparar base de datos** para futuras integraciones (n8n, Observatorio)
4. **Documentar flujos de email** automáticos
5. **Generar diagrama visual** del cliente desde pago hasta entrega

### Diferenciadores

- **Experiencia premium**: Cada paso es una comunicación clara
- **Transparencia**: El cliente ve el estado en tiempo real
- **Automatización preparada**: Estructura lista para n8n sin cambios posteriores
- **Datos para Observatorio**: Cada expediente alimenta el Observatorio Certilab

---

## 🔄 Flujo del Cliente

### Diagrama completo: Pago → Entrega → Futuro

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SISTEMA DE EXPEDIENTES CERTILAB                          │
│                                                                             │
│  FASE 1: PAGO → ENTREGA (Diseño Fase 1)                                    │
│  FASE 2: INFORME TÉCNICO (Futuro)                                          │
│  FASE 3: OBSERVATORIO (Futuro)                                             │
│  FASE 4: SAAS (Futuro)                                                     │
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
FASE 1: PAGO → ENTREGA (DISEÑO ACTUAL)
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│ PASO 1: COMPRA (MyPOS)                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Cliente en web → Selecciona servicio → Paga con MyPOS                     │
│                                                                             │
│  Webhook MyPOS:                                                             │
│  ├─ Pago confirmado                                                         │
│  ├─ Crear expediente (EXP-2026-001)                                        │
│  ├─ Guardar datos de pago                                                   │
│  └─ Redirigir a página de confirmación                                      │
│                                                                             │
│  Email: "Pago recibido"                                                     │
│  ├─ Número de expediente                                                    │
│  ├─ Resumen de compra                                                       │
│  ├─ Próximos pasos                                                          │
│  └─ Link a panel de estado                                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│ PASO 2: CONFIRMACIÓN                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Página: /expediente/[id]/confirmacion                                     │
│                                                                             │
│  Muestra:                                                                   │
│  ├─ ✓ Pago confirmado                                                       │
│  ├─ Número de expediente (EXP-2026-001)                                    │
│  ├─ Resumen de compra                                                       │
│  ├─ Instrucciones claras                                                    │
│  └─ CTA: "Comenzar a recopilar documentación"                              │
│                                                                             │
│  Datos guardados:                                                           │
│  ├─ ID expediente                                                           │
│  ├─ Fecha pago                                                              │
│  ├─ Monto                                                                   │
│  ├─ Servicio contratado                                                     │
│  └─ Estado: "pago_confirmado"                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│ PASO 3: ASISTENTE DE DOCUMENTACIÓN (4 pasos)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Página: /expediente/[id]/documentacion                                    │
│                                                                             │
│  PASO 3.1: Datos del inmueble                                              │
│  ├─ Dirección completa                                                      │
│  ├─ Tipo de inmueble (vivienda, local, oficina)                            │
│  ├─ Año construcción                                                        │
│  ├─ Superficie útil (m²)                                                    │
│  ├─ Número de plantas                                                       │
│  └─ Descripción general                                                     │
│                                                                             │
│  PASO 3.2: Certificado actual                                              │
│  ├─ Subir PDF del certificado                                              │
│  ├─ Extraer datos automáticamente (OCR)                                    │
│  ├─ Verificar: Número de certificado                                       │
│  ├─ Verificar: Calificación (A-G)                                          │
│  ├─ Verificar: Fecha emisión                                               │
│  └─ Verificar: Certificador                                                │
│                                                                             │
│  PASO 3.3: Documentación adicional                                         │
│  ├─ Fotos del inmueble (mínimo 3)                                          │
│  ├─ Planos o croquis (opcional)                                            │
│  ├─ Facturas de servicios (opcional)                                       │
│  ├─ Historial de reformas (opcional)                                       │
│  └─ Notas adicionales                                                       │
│                                                                             │
│  PASO 3.4: Confirmación                                                    │
│  ├─ Resumen de datos recopilados                                           │
│  ├─ Checklist de documentación                                             │
│  ├─ Confirmación: "Todos los datos son correctos"                          │
│  └─ CTA: "Enviar documentación"                                            │
│                                                                             │
│  Datos guardados:                                                           │
│  ├─ Datos del inmueble                                                      │
│  ├─ PDF del certificado                                                     │
│  ├─ Datos extraídos del certificado                                        │
│  ├─ Fotos (URLs en Supabase Storage)                                       │
│  ├─ Documentación adicional                                                │
│  └─ Estado: "documentacion_recibida"                                       │
│                                                                             │
│  Email: "Documentación recibida"                                            │
│  ├─ Confirmación de recepción                                              │
│  ├─ Resumen de datos                                                        │
│  ├─ Próximos pasos                                                          │
│  └─ Tiempo estimado de análisis                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│ PASO 4: PANEL DE ESTADO DEL EXPEDIENTE                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Página: /expediente/[id]/estado                                           │
│                                                                             │
│  Timeline visual:                                                           │
│  ├─ ✓ Pago confirmado (fecha)                                              │
│  ├─ ✓ Documentación recibida (fecha)                                       │
│  ├─ ⏳ En revisión (fecha inicio)                                           │
│  ├─ ⏳ Análisis en progreso                                                 │
│  └─ ⏳ Informe disponible (próximamente)                                    │
│                                                                             │
│  Información actual:                                                        │
│  ├─ Número de expediente                                                    │
│  ├─ Servicio contratado                                                     │
│  ├─ Fecha de pago                                                           │
│  ├─ Datos del inmueble (resumen)                                           │
│  ├─ Certificado actual (calificación)                                      │
│  └─ Tiempo estimado restante                                               │
│                                                                             │
│  Acciones disponibles:                                                      │
│  ├─ Descargar resumen de documentación                                     │
│  ├─ Contactar con soporte                                                   │
│  └─ Actualizar datos (si es necesario)                                     │
│                                                                             │
│  Email: "Expediente en revisión"                                            │
│  ├─ Confirmación de inicio de análisis                                     │
│  ├─ Tiempo estimado                                                         │
│  ├─ Qué estamos analizando                                                 │
│  └─ Link al panel de estado                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│ PASO 5: INFORME DISPONIBLE                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Página: /expediente/[id]/informe                                          │
│                                                                             │
│  Informe completo:                                                          │
│  ├─ Resumen ejecutivo                                                       │
│  ├─ Análisis del inmueble                                                   │
│  ├─ Certificado actual vs. Estimado                                        │
│  ├─ Errores detectados                                                      │
│  ├─ Impacto económico                                                       │
│  ├─ Recomendaciones                                                         │
│  └─ Certificador responsable (Eva María González García)                   │
│                                                                             │
│  Acciones:                                                                  │
│  ├─ Descargar PDF                                                           │
│  ├─ Compartir por email                                                     │
│  ├─ Imprimir                                                                │
│  └─ Solicitar Segunda Opinión Técnica (upsell)                             │
│                                                                             │
│  Datos guardados:                                                           │
│  ├─ Informe completo (PDF)                                                 │
│  ├─ Calificación estimada                                                   │
│  ├─ Errores detectados                                                      │
│  ├─ Impacto económico                                                       │
│  ├─ Recomendaciones                                                         │
│  └─ Estado: "informe_disponible"                                           │
│                                                                             │
│  Email: "Informe disponible"                                                │
│  ├─ Resumen de hallazgos                                                    │
│  ├─ Link para descargar                                                     │
│  ├─ Próximos pasos recomendados                                            │
│  └─ CTA: Solicitar Informe Técnico (futuro)                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
FUTURO: AMPLIACIONES (DISEÑO PREPARADO)
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│ FASE 2: INFORME TÉCNICO (Futuro)                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Desde panel de informe:                                                    │
│  └─ CTA: "Solicitar Informe Técnico Completo (+199€)"                      │
│                                                                             │
│  Flujo:                                                                     │
│  ├─ Pago adicional                                                          │
│  ├─ Análisis técnico profundo                                              │
│  ├─ Propuestas de mejora                                                    │
│  ├─ Presupuestos de reforma                                                │
│  └─ Informe técnico PDF                                                     │
│                                                                             │
│  Datos reutilizados:                                                        │
│  ├─ Datos del inmueble (ya recopilados)                                    │
│  ├─ Certificado (ya analizado)                                             │
│  ├─ Fotos (ya subidas)                                                      │
│  └─ Documentación (ya disponible)                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│ FASE 3: OBSERVATORIO CERTILAB (Futuro)                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Cada expediente alimenta:                                                  │
│  ├─ Estadísticas de errores                                                │
│  ├─ Análisis por provincia                                                  │
│  ├─ Análisis por tipo de inmueble                                          │
│  ├─ Impacto económico agregado                                             │
│  └─ Informes trimestrales públicos                                         │
│                                                                             │
│  Datos anonimizados:                                                        │
│  ├─ Ubicación (provincia, no dirección)                                    │
│  ├─ Tipo de inmueble                                                        │
│  ├─ Calificación original vs. estimada                                     │
│  ├─ Errores detectados                                                      │
│  └─ Impacto económico                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│ FASE 4: SAAS PARA PROFESIONALES (Futuro)                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Acceso a:                                                                  │
│  ├─ API de análisis automático                                             │
│  ├─ Dashboard de expedientes                                               │
│  ├─ Reportes personalizados                                                │
│  ├─ Integración con sistemas propios                                       │
│  └─ Soporte prioritario                                                     │
│                                                                             │
│  Datos disponibles:                                                         │
│  ├─ Histórico de análisis                                                   │
│  ├─ Métricas de calidad                                                     │
│  ├─ Tendencias del mercado                                                  │
│  └─ Benchmarking vs. sector                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Arquitectura de Datos

### Tabla: `expedientes` (Expedientes)

```typescript
interface Expediente {
  // Identificadores
  id: string;                          // UUID único
  numero: string;                      // EXP-2026-001 (generado automáticamente)
  createdAt: Date;                     // Fecha creación
  updatedAt: Date;                     // Última actualización
  
  // Cliente
  clienteId: string;                   // FK a tabla clientes (futuro)
  clienteEmail: string;                // Email del cliente
  clienteNombre: string;               // Nombre del cliente
  clienteTelefono?: string;            // Teléfono (opcional)
  
  // Pago
  pagoId: string;                      // ID de transacción MyPOS
  pagoMonto: number;                   // Monto en €
  pagoFecha: Date;                     // Fecha del pago
  pagoMetodo: 'mypos' | 'stripe' | 'otro';
  pagoEstado: 'pendiente' | 'confirmado' | 'fallido' | 'reembolsado';
  
  // Servicio
  servicio: 'segunda-opinion' | 'segunda-opinion-express' | 'informe-tecnico';
  servicioDescripcion: string;
  
  // Datos del inmueble
  inmueble: {
    direccion: string;
    codigoPostal: string;
    provincia: string;
    municipio: string;
    tipo: 'vivienda' | 'local' | 'oficina' | 'otro';
    tipoDetalle?: string;              // Ej: "Piso en bloque", "Casa unifamiliar"
    anioConstruccion: number;
    superficieUtil: number;            // m²
    numeroPlanta?: number;
    numeroHabitaciones?: number;
    numeroBanios?: number;
    descripcion?: string;
  };
  
  // Certificado actual
  certificado: {
    numero: string;                    // Número del certificado
    calificacion: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
    fechaEmision: Date;
    certificador: string;              // Nombre del certificador
    pdfUrl: string;                    // URL en Supabase Storage
    datosExtraidos: {
      consumoEnergetico: number;       // kWh/m²/año
      emisionesGEI: number;            // kg CO2/m²/año
      superficieRef: number;           // m² de referencia
      // ... otros datos extraídos
    };
  };
  
  // Documentación
  documentacion: {
    fotosUrls: string[];               // URLs en Supabase Storage
    planosUrl?: string;
    facturasUrls?: string[];
    historicoReformas?: string;
    notasAdicionales?: string;
    fechaRecepcion: Date;
  };
  
  // Análisis
  analisis?: {
    calificacionEstimada: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
    diferencia: number;                // Diferencia en letras (ej: -2)
    erroresDetectados: ErrorDetectado[];
    impactoEconomico: {
      brownDiscount: number;           // % de pérdida de valor
      costesCorreccion: number;        // € estimados
      impactoTotal: number;            // € totales
    };
    recomendaciones: string[];
    analista: string;                  // Nombre del analista (Eva María González García)
    fechaAnalisis: Date;
    pdfInformeUrl: string;             // URL del informe PDF
  };
  
  // Estado
  estado: 'pago_confirmado' | 'documentacion_recibida' | 'en_revision' | 'informe_disponible' | 'cancelado';
  
  // Metadata
  tags?: string[];                     // Para categorización futura
  notas?: string;                      // Notas internas
  
  // Observatorio (anonimizado)
  observatorio?: {
    incluirEnObservatorio: boolean;
    datosAnonimizados: {
      provincia: string;
      tipo: string;
      calificacionOriginal: string;
      calificacionEstimada: string;
      errores: string[];
      impacto: number;
    };
  };
}

interface ErrorDetectado {
  tipo: ErrorType;
  descripcion: string;
  severidad: 'critica' | 'mayor' | 'menor';
  impactoEstimado: number;             // € de impacto
  recomendacion: string;
}

enum ErrorType {
  // Errores de datos
  DATOS_FALTANTES = 'datos_faltantes',
  DATOS_INCONSISTENTES = 'datos_inconsistentes',
  SUPERFICIE_INCORRECTA = 'superficie_incorrecta',
  ANIO_CONSTRUCCION_INCORRECTO = 'anio_construccion_incorrecto',
  
  // Errores técnicos
  CALIFICACION_INFLADA = 'calificacion_inflada',
  SIN_INSPECCION = 'sin_inspeccion',
  DATOS_OBSOLETOS = 'datos_obsoletos',
  CALCULO_INCORRECTO = 'calculo_incorrecto',
  
  // Errores de contexto
  BROWN_DISCOUNT = 'brown_discount',
  DESAJUSTE_MERCADO = 'desajuste_mercado',
  INCUMPLIMIENTO_NORMATIVO = 'incumplimiento_normativo',
}
```

### Tabla: `clientes` (Clientes - Futuro)

```typescript
interface Cliente {
  id: string;
  email: string;
  nombre: string;
  telefono?: string;
  direccion?: string;
  ciudad?: string;
  codigoPostal?: string;
  tipoCliente: 'particular' | 'profesional' | 'empresa';
  expedientes: string[];               // FK a expedientes
  createdAt: Date;
  updatedAt: Date;
}
```

### Tabla: `emails_enviados` (Registro de emails)

```typescript
interface EmailEnviado {
  id: string;
  expedienteId: string;
  tipo: 'pago_recibido' | 'documentacion_recibida' | 'en_revision' | 'informe_disponible';
  destinatario: string;
  asunto: string;
  contenido: string;
  estado: 'enviado' | 'fallido' | 'rebotado';
  fechaEnvio: Date;
  fechaLectura?: Date;
  intentos: number;
}
```

---

## 🎨 Pantallas y Componentes

### 1. Página de Confirmación de Pago

**Ruta:** `/expediente/[id]/confirmacion`

**Componentes:**
- `ConfirmacionPago.tsx` - Componente principal
- `ResumenCompra.tsx` - Resumen de la compra
- `ProximosPasos.tsx` - Instrucciones claras
- `BotonComenzar.tsx` - CTA principal

**Datos mostrados:**
- ✓ Pago confirmado
- Número de expediente (EXP-2026-001)
- Resumen: Servicio, monto, fecha
- Instrucciones: "Ahora necesitamos tu documentación"
- CTA: "Comenzar a recopilar documentación"

**Estilos:** Premium, limpio, confianza

---

### 2. Asistente de Documentación (4 pasos)

**Ruta:** `/expediente/[id]/documentacion`

**Componentes:**
- `AsistenteDocumentacion.tsx` - Contenedor principal
- `Paso1DatosInmueble.tsx` - Formulario datos
- `Paso2Certificado.tsx` - Upload + OCR
- `Paso3DocumentacionAdicional.tsx` - Fotos y archivos
- `Paso4Confirmacion.tsx` - Resumen y envío
- `ProgressBar.tsx` - Indicador de progreso
- `FormularioInmueble.tsx` - Reutilizable

**Paso 1: Datos del inmueble**
- Dirección completa
- Tipo de inmueble (select)
- Año construcción
- Superficie útil (m²)
- Número de plantas
- Descripción general

**Paso 2: Certificado actual**
- Upload PDF
- Extracción automática (OCR)
- Verificación de datos
- Edición manual si es necesario

**Paso 3: Documentación adicional**
- Fotos (mínimo 3)
- Planos (opcional)
- Facturas (opcional)
- Historial de reformas (opcional)
- Notas adicionales

**Paso 4: Confirmación**
- Resumen de datos
- Checklist de documentación
- Confirmación: "Todos los datos son correctos"
- CTA: "Enviar documentación"

**Validaciones:**
- Campos obligatorios
- Formato de email
- Tamaño de archivos
- Tipos de archivo permitidos

---

### 3. Panel de Estado del Expediente

**Ruta:** `/expediente/[id]/estado`

**Componentes:**
- `PanelEstado.tsx` - Contenedor principal
- `Timeline.tsx` - Timeline visual
- `ResumenExpediente.tsx` - Información actual
- `AccionesDisponibles.tsx` - Botones de acción
- `ContactoSoporte.tsx` - Formulario de contacto

**Timeline visual:**
- ✓ Pago confirmado (fecha)
- ✓ Documentación recibida (fecha)
- ⏳ En revisión (fecha inicio)
- ⏳ Análisis en progreso
- ⏳ Informe disponible (próximamente)

**Información mostrada:**
- Número de expediente
- Servicio contratado
- Fecha de pago
- Datos del inmueble (resumen)
- Certificado actual (calificación)
- Tiempo estimado restante

**Acciones:**
- Descargar resumen de documentación
- Contactar con soporte
- Actualizar datos (si es necesario)

---

### 4. Página de Informe

**Ruta:** `/expediente/[id]/informe`

**Componentes:**
- `PaginaInforme.tsx` - Contenedor principal
- `ResumenEjecutivo.tsx` - Resumen
- `AnalisisInmueble.tsx` - Análisis detallado
- `ComparativaCalificaciones.tsx` - Gráfico comparativo
- `ErroresDetectados.tsx` - Lista de errores
- `ImpactoEconomico.tsx` - Impacto financiero
- `Recomendaciones.tsx` - Recomendaciones
- `AccionesInforme.tsx` - Descargar, compartir, etc.

**Contenido del informe:**
- Resumen ejecutivo (hallazgos principales)
- Análisis del inmueble
- Certificado actual vs. Estimado
- Errores detectados (con severidad)
- Impacto económico (Brown Discount + costes)
- Recomendaciones
- Certificador responsable

**Acciones:**
- Descargar PDF
- Compartir por email
- Imprimir
- Solicitar Informe Técnico (futuro)

---

## 🔌 Rutas API Necesarias

### Webhooks

```
POST /api/webhooks/mypos
├─ Recibe: Confirmación de pago
├─ Crea: Expediente
├─ Envía: Email "Pago recibido"
└─ Redirige: A página de confirmación

POST /api/webhooks/documentacion
├─ Recibe: Documentación completada
├─ Actualiza: Estado a "documentacion_recibida"
├─ Envía: Email "Documentación recibida"
└─ Inicia: Proceso de análisis
```

### Expedientes

```
GET /api/expedientes/[id]
├─ Retorna: Datos completos del expediente
└─ Autenticación: Token del cliente

POST /api/expedientes
├─ Crea: Nuevo expediente
├─ Genera: Número único (EXP-2026-001)
└─ Retorna: ID del expediente

PUT /api/expedientes/[id]
├─ Actualiza: Datos del expediente
└─ Retorna: Expediente actualizado

GET /api/expedientes/[id]/estado
├─ Retorna: Estado actual
└─ Retorna: Timeline de eventos
```

### Documentación

```
POST /api/expedientes/[id]/documentacion
├─ Recibe: Datos del inmueble
├─ Valida: Campos obligatorios
└─ Guarda: En base de datos

POST /api/expedientes/[id]/certificado
├─ Recibe: PDF del certificado
├─ Extrae: Datos con OCR
├─ Guarda: PDF en Storage
└─ Retorna: Datos extraídos

POST /api/expedientes/[id]/fotos
├─ Recibe: Fotos del inmueble
├─ Valida: Tamaño y formato
├─ Guarda: En Storage
└─ Retorna: URLs

POST /api/expedientes/[id]/enviar-documentacion
├─ Valida: Documentación completa
├─ Actualiza: Estado a "documentacion_recibida"
├─ Envía: Email de confirmación
└─ Inicia: Análisis
```

### Análisis

```
POST /api/expedientes/[id]/analizar
├─ Recibe: Solicitud de análisis
├─ Actualiza: Estado a "en_revision"
├─ Envía: Email "En revisión"
└─ Inicia: Proceso de análisis (n8n en futuro)

GET /api/expedientes/[id]/analisis
├─ Retorna: Resultados del análisis
└─ Retorna: Informe completo

POST /api/expedientes/[id]/generar-informe
├─ Genera: PDF del informe
├─ Guarda: En Storage
├─ Actualiza: Estado a "informe_disponible"
├─ Envía: Email "Informe disponible"
└─ Retorna: URL del PDF
```

### Emails

```
POST /api/emails/enviar
├─ Tipo: 'pago_recibido' | 'documentacion_recibida' | 'en_revision' | 'informe_disponible'
├─ Destinatario: Email del cliente
├─ Contenido: Template + datos
└─ Retorna: ID del email enviado

GET /api/emails/[id]
├─ Retorna: Estado del email
└─ Retorna: Fecha de lectura (si disponible)
```

### Observatorio (Futuro)

```
POST /api/observatorio/registrar-analisis
├─ Recibe: Datos del expediente
├─ Anonimiza: Datos personales
├─ Guarda: En tabla de Observatorio
└─ Actualiza: Estadísticas

GET /api/observatorio/estadisticas
├─ Retorna: Estadísticas generales
├─ Retorna: Por provincia
├─ Retorna: Por tipo de inmueble
└─ Retorna: Por tipo de error
```

---

## 📧 Emails Automáticos

### 1. Email: "Pago recibido"

**Trigger:** Webhook de MyPOS confirmado

**Destinatario:** Email del cliente

**Asunto:** "✓ Pago confirmado — Expediente EXP-2026-001"

**Contenido:**
```
Hola [Nombre],

Tu pago ha sido confirmado correctamente.

Número de expediente: EXP-2026-001
Servicio: Segunda Opinión
Monto: 59€
Fecha: [Fecha]

Próximos pasos:
1. Accede a tu panel de expediente
2. Completa el formulario de documentación (4 pasos)
3. Sube el certificado energético actual
4. Envía fotos del inmueble
5. Recibirás el informe en 5-7 días hábiles

[Botón: Ir a mi expediente]

¿Preguntas? Contacta con nosotros en soporte@certilab.cat

Saludos,
Equipo Certilab
```

**Datos guardados:**
- ID email
- Expediente ID
- Tipo: 'pago_recibido'
- Fecha envío
- Estado: 'enviado'

---

### 2. Email: "Documentación recibida"

**Trigger:** Cliente completa asistente de documentación

**Destinatario:** Email del cliente

**Asunto:** "✓ Documentación recibida — Expediente EXP-2026-001"

**Contenido:**
```
Hola [Nombre],

Hemos recibido toda tu documentación correctamente.

Expediente: EXP-2026-001
Inmueble: [Dirección]
Certificado actual: [Calificación]
Fecha recepción: [Fecha]

Resumen de datos:
- Tipo de inmueble: [Tipo]
- Año construcción: [Año]
- Superficie: [m²]
- Certificado: [Número]
- Fotos: [Número] recibidas

Próximos pasos:
Nuestro equipo de expertos comenzará el análisis inmediatamente.
Tiempo estimado: 5-7 días hábiles

Recibirás un email cuando el informe esté disponible.

[Botón: Ver estado del expediente]

¿Preguntas? Contacta con nosotros en soporte@certilab.cat

Saludos,
Equipo Certilab
```

**Datos guardados:**
- ID email
- Expediente ID
- Tipo: 'documentacion_recibida'
- Fecha envío
- Estado: 'enviado'

---

### 3. Email: "Expediente en revisión"

**Trigger:** Estado cambia a "en_revision"

**Destinatario:** Email del cliente

**Asunto:** "⏳ Tu expediente está en revisión — EXP-2026-001"

**Contenido:**
```
Hola [Nombre],

Tu expediente ha entrado en fase de análisis.

Expediente: EXP-2026-001
Inmueble: [Dirección]
Fecha inicio: [Fecha]
Tiempo estimado: 5-7 días hábiles

Qué estamos analizando:
✓ Certificado energético actual
✓ Datos del inmueble
✓ Fotos y documentación
✓ Comparativa con estándares técnicos
✓ Cálculo de impacto económico

Puedes seguir el progreso en tu panel:
[Botón: Ver estado del expediente]

Te notificaremos cuando el informe esté listo.

¿Preguntas? Contacta con nosotros en soporte@certilab.cat

Saludos,
Equipo Certilab
```

**Datos guardados:**
- ID email
- Expediente ID
- Tipo: 'en_revision'
- Fecha envío
- Estado: 'enviado'

---

### 4. Email: "Informe disponible"

**Trigger:** Estado cambia a "informe_disponible"

**Destinatario:** Email del cliente

**Asunto:** "✓ Tu informe está disponible — EXP-2026-001"

**Contenido:**
```
Hola [Nombre],

¡Tu informe está listo!

Expediente: EXP-2026-001
Inmueble: [Dirección]
Fecha análisis: [Fecha]

Hallazgos principales:
- Calificación actual: [Calificación]
- Calificación estimada: [Calificación]
- Errores detectados: [Número]
- Impacto económico: [€]

Descargar informe:
[Botón: Descargar PDF]

Próximos pasos recomendados:
1. Revisar el informe completo
2. Contactar con un certificador para correcciones
3. Solicitar Informe Técnico con propuestas de mejora (opcional)

[Botón: Solicitar Informe Técnico (+199€)]

¿Preguntas sobre el informe? Contacta con nosotros en soporte@certilab.cat

Saludos,
Eva María González García
Certificadora Energética
Certilab
```

**Datos guardados:**
- ID email
- Expediente ID
- Tipo: 'informe_disponible'
- Fecha envío
- Estado: 'enviado'

---

## 🔗 Integración Futura con n8n

### Estructura preparada (sin implementar en Fase 1)

**Objetivo:** Automatizar procesos sin código

**Flujos n8n a implementar:**

```
FLUJO 1: Análisis automático de certificados
├─ Trigger: Documentación recibida
├─ Paso 1: Extraer datos del PDF (OCR)
├─ Paso 2: Validar datos contra normativa
├─ Paso 3: Calcular calificación estimada
├─ Paso 4: Detectar errores
├─ Paso 5: Calcular impacto económico
├─ Paso 6: Generar informe PDF
├─ Paso 7: Actualizar expediente
└─ Paso 8: Enviar email al cliente

FLUJO 2: Generación de informes trimestrales
├─ Trigger: Primer día del mes siguiente al trimestre
├─ Paso 1: Agregar datos de expedientes
├─ Paso 2: Calcular estadísticas
├─ Paso 3: Generar gráficos
├─ Paso 4: Crear informe PDF
├─ Paso 5: Publicar en blog
├─ Paso 6: Enviar a suscriptores
└─ Paso 7: Actualizar dashboard

FLUJO 3: Sincronización con Observatorio
├─ Trigger: Informe completado
├─ Paso 1: Anonimizar datos
├─ Paso 2: Guardar en tabla Observatorio
├─ Paso 3: Actualizar estadísticas
└─ Paso 4: Actualizar dashboard público

FLUJO 4: Recordatorios automáticos
├─ Trigger: Cada 2 días
├─ Paso 1: Buscar expedientes sin documentación
├─ Paso 2: Enviar email de recordatorio
└─ Paso 3: Registrar intento
```

### Estructura de datos para n8n

**Tabla: `n8n_workflows`** (Registro de flujos)

```typescript
interface N8nWorkflow {
  id: string;
  nombre: string;
  descripcion: string;
  trigger: string;
  pasos: N8nPaso[];
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface N8nPaso {
  orden: number;
  nombre: string;
  tipo: 'extraccion' | 'validacion' | 'calculo' | 'generacion' | 'envio';
  configuracion: Record<string, any>;
}
```

### Webhooks preparados para n8n

```
POST /api/webhooks/n8n/documentacion-recibida
├─ Recibe: Notificación de documentación
├─ Inicia: Flujo de análisis en n8n
└─ Retorna: ID del flujo

POST /api/webhooks/n8n/analisis-completado
├─ Recibe: Resultados del análisis
├─ Actualiza: Expediente
├─ Genera: Informe PDF
└─ Envía: Email al cliente

POST /api/webhooks/n8n/informe-generado
├─ Recibe: Informe completado
├─ Actualiza: Estado a "informe_disponible"
├─ Registra: En Observatorio
└─ Envía: Email al cliente
```

---

## 📊 Preparación para Observatorio Certilab

### Datos que se recopilan automáticamente

Cada expediente completo alimenta el Observatorio con:

```typescript
interface DatosObservatorio {
  // Ubicación (anonimizada)
  provincia: string;
  municipio?: string;
  
  // Inmueble
  tipo: 'vivienda' | 'local' | 'oficina' | 'otro';
  anioConstruccion: number;
  superficieUtil: number;
  
  // Certificado
  calificacionOriginal: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  calificacionEstimada: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  diferencia: number;
  
  // Errores
  erroresDetectados: {
    tipo: string;
    severidad: 'critica' | 'mayor' | 'menor';
  }[];
  
  // Impacto
  brownDiscount: number;
  impactoEconomico: number;
  
  // Metadata
  fechaAnalisis: Date;
  incluirEnObservatorio: boolean;
}
```

### Tabla: `observatorio_datos` (Datos anonimizados)

```typescript
interface ObservatorioDatos {
  id: string;
  expedienteId: string;              // FK (para auditoría)
  
  // Datos anonimizados
  provincia: string;
  tipo: string;
  anioConstruccion: number;
  superficieUtil: number;
  
  calificacionOriginal: string;
  calificacionEstimada: string;
  diferencia: number;
  
  errores: string[];
  brownDiscount: number;
  impactoEconomico: number;
  
  fechaAnalisis: Date;
  createdAt: Date;
}
```

### Dashboard del Observatorio (Futuro)

**Ruta:** `/admin/observatorio/`

**Datos mostrados:**
- Total de análisis
- % con errores
- Errores más comunes
- Análisis por provincia
- Análisis por tipo de inmueble
- Impacto económico total
- Tendencias temporales

**Informes trimestrales:**
- Generación automática
- Publicación en blog
- Envío a suscriptores
- Descarga en PDF

---

## 📁 Estructura de Carpetas

```
src/
├── app/
│   ├── expediente/
│   │   ├── [id]/
│   │   │   ├── confirmacion/
│   │   │   │   ├── page.tsx
│   │   │   │   └── confirmacion.module.css
│   │   │   ├── documentacion/
│   │   │   │   ├── page.tsx
│   │   │   │   └── documentacion.module.css
│   │   │   ├── estado/
│   │   │   │   ├── page.tsx
│   │   │   │   └── estado.module.css
│   │   │   ├── informe/
│   │   │   │   ├── page.tsx
│   │   │   │   └── informe.module.css
│   │   │   └── layout.tsx
│   │   └── layout.tsx
│   │
│   ├── api/
│   │   ├── webhooks/
│   │   │   ├── mypos/
│   │   │   │   └── route.ts
│   │   │   └── documentacion/
│   │   │       └── route.ts
│   │   │
│   │   ├── expedientes/
│   │   │   ├── route.ts                    # POST crear, GET listar
│   │   │   ├── [id]/
│   │   │   │   ├── route.ts                # GET, PUT
│   │   │   │   ├── estado/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── documentacion/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── certificado/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── fotos/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── enviar-documentacion/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── analizar/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── analisis/
│   │   │   │   │   └── route.ts
│   │   │   │   └── generar-informe/
│   │   │   │       └── route.ts
│   │   │   └── generar-numero/
│   │   │       └── route.ts
│   │   │
│   │   ├── emails/
│   │   │   ├── route.ts                    # POST enviar
│   │   │   └── [id]/
│   │   │       └── route.ts                # GET estado
│   │   │
│   │   └── observatorio/
│   │       ├── registrar-analisis/
│   │       │   └── route.ts
│   │       └── estadisticas/
│   │           └── route.ts
│   │
│   └── admin/
│       └── observatorio/
│           ├── page.tsx
│           ├── layout.tsx
│           └── observatorio.module.css
│
├── components/
│   ├── expediente/
│   │   ├── ConfirmacionPago.tsx
│   │   ├── ResumenCompra.tsx
│   │   ├── ProximosPasos.tsx
│   │   ├── BotonComenzar.tsx
│   │   │
│   │   ├── AsistenteDocumentacion.tsx
│   │   ├── Paso1DatosInmueble.tsx
│   │   ├── Paso2Certificado.tsx
│   │   ├── Paso3DocumentacionAdicional.tsx
│   │   ├── Paso4Confirmacion.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── FormularioInmueble.tsx
│   │   │
│   │   ├── PanelEstado.tsx
│   │   ├── Timeline.tsx
│   │   ├── ResumenExpediente.tsx
│   │   ├── AccionesDisponibles.tsx
│   │   ├── ContactoSoporte.tsx
│   │   │
│   │   ├── PaginaInforme.tsx
│   │   ├── ResumenEjecutivo.tsx
│   │   ├── AnalisisInmueble.tsx
│   │   ├── ComparativaCalificaciones.tsx
│   │   ├── ErroresDetectados.tsx
│   │   ├── ImpactoEconomico.tsx
│   │   ├── Recomendaciones.tsx
│   │   ├── AccionesInforme.tsx
│   │   │
│   │   └── expediente.module.css
│   │
│   └── admin/
│       ├── DashboardObservatorio.tsx
│       ├── ErrorChart.tsx
│       ├── ProvinceMap.tsx
│       ├── ReportManager.tsx
│       └── admin.module.css
│
├── lib/
│   ├── expedientes/
│   │   ├── generarNumero.ts
│   │   ├── validaciones.ts
│   │   ├── calculos.ts
│   │   ├── ocr.ts
│   │   ├── generarInforme.ts
│   │   └── schema.ts
│   │
│   ├── emails/
│   │   ├── templates.ts
│   │   ├── enviar.ts
│   │   └── registro.ts
│   │
│   ├── observatorio/
│   │   ├── anonimizar.ts
│   │   ├── estadisticas.ts
│   │   └── reportes.ts
│   │
│   ├── supabase.ts
│   └── mypos.ts
│
├── data/
│   ├── expedientes/
│   │   ├── tiposInmueble.ts
│   │   ├── tiposErrores.ts
│   │   └── provincias.ts
│   │
│   └── emails/
│       └── templates.ts
│
└── types/
    ├── expediente.ts
    ├── email.ts
    ├── observatorio.ts
    └── n8n.ts
```

---

## 🚀 Roadmap de Implementación

### Fase 1: Infraestructura (Semanas 1-2)

- [ ] Crear tablas en Supabase
  - `expedientes`
  - `clientes` (preparada)
  - `emails_enviados`
  - `observatorio_datos` (preparada)
  - `n8n_workflows` (preparada)

- [ ] Crear índices y relaciones
- [ ] Crear funciones de agregación
- [ ] Crear triggers automáticos

### Fase 2: Autenticación y Seguridad (Semana 1)

- [ ] Implementar autenticación de clientes
- [ ] Crear tokens de acceso
- [ ] Implementar CORS
- [ ] Crear middleware de autenticación

### Fase 3: Webhooks (Semana 2)

- [ ] Webhook MyPOS
  - Recibir confirmación de pago
  - Crear expediente
  - Generar número único
  - Enviar email

- [ ] Webhook documentación
  - Recibir documentación completada
  - Validar datos
  - Actualizar estado
  - Enviar email

### Fase 4: Componentes Frontend (Semanas 2-3)

- [ ] Página de confirmación de pago
- [ ] Asistente de documentación (4 pasos)
- [ ] Panel de estado del expediente
- [ ] Página de informe

### Fase 5: APIs (Semana 3)

- [ ] GET /api/expedientes/[id]
- [ ] POST /api/expedientes
- [ ] PUT /api/expedientes/[id]
- [ ] POST /api/expedientes/[id]/documentacion
- [ ] POST /api/expedientes/[id]/certificado
- [ ] POST /api/expedientes/[id]/fotos
- [ ] POST /api/expedientes/[id]/enviar-documentacion
- [ ] GET /api/expedientes/[id]/estado

### Fase 6: Emails (Semana 3)

- [ ] Template: "Pago recibido"
- [ ] Template: "Documentación recibida"
- [ ] Template: "En revisión"
- [ ] Template: "Informe disponible"
- [ ] Sistema de envío (SendGrid)
- [ ] Registro de emails

### Fase 7: OCR y Extracción (Semana 4)

- [ ] Integración con Tesseract.js
- [ ] Extracción de datos del certificado
- [ ] Validación de datos extraídos
- [ ] Edición manual de datos

### Fase 8: Generación de Informes (Semana 4)

- [ ] Crear template de informe
- [ ] Generar PDF
- [ ] Guardar en Storage
- [ ] Enviar por email

### Fase 9: Testing (Semana 5)

- [ ] Tests unitarios
- [ ] Tests de integración
- [ ] Tests E2E
- [ ] Testing de webhooks

### Fase 10: Documentación (Semana 5)

- [ ] Documentación de APIs
- [ ] Documentación de flujos
- [ ] Documentación de base de datos
- [ ] Guía de usuario

### Fase 11: Preparación para n8n (Semana 6)

- [ ] Crear webhooks para n8n
- [ ] Documentar flujos
- [ ] Crear ejemplos de configuración
- [ ] Preparar tabla de workflows

### Fase 12: Preparación para Observatorio (Semana 6)

- [ ] Crear tabla de datos anonimizados
- [ ] Crear funciones de anonimización
- [ ] Crear APIs de Observatorio
- [ ] Documentar estructura de datos

### Fase 13: Deploy (Semana 7)

- [ ] Configurar variables de entorno
- [ ] Deploy a Vercel
- [ ] Configurar Supabase
- [ ] Configurar SendGrid
- [ ] Testing en producción

---

## 📋 Checklist de Diseño

### Completado en este documento

- [x] Diagrama completo del flujo del cliente
- [x] Arquitectura de datos (tablas y relaciones)
- [x] Pantallas y componentes necesarios
- [x] Rutas API necesarias
- [x] Emails automáticos (4 tipos)
- [x] Estructura preparada para n8n
- [x] Estructura preparada para Observatorio
- [x] Estructura de carpetas
- [x] Roadmap de implementación

### Próximos pasos

1. **Revisión y aprobación** del diseño
2. **Creación de tablas** en Supabase
3. **Implementación de webhooks** MyPOS
4. **Desarrollo de componentes** frontend
5. **Implementación de APIs**
6. **Testing completo**
7. **Deploy a producción**

---

## 📞 Contacto y Soporte

**Responsables:**
- Abdelaziz (Desarrollo)
- Eva María González García (Certificadora)

**Preguntas sobre el diseño:**
- Contactar a Abdelaziz

**Preguntas sobre certificación:**
- Contactar a Eva María González García

---

**Versión:** 1.0  
**Fecha:** Junio 2026  
**Estado:** Diseño completado, listo para implementación

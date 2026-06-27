# 📊 Diagrama del Flujo del Cliente — Sistema de Expedientes Certilab

> **Versión:** 1.0 — Junio 2026  
> **Objetivo:** Visualizar el viaje completo del cliente desde pago hasta entrega del informe  
> **Incluye:** Futuras ampliaciones (Informe Técnico, Observatorio, SaaS)  

---

## 🎯 Flujo Principal: Pago → Entrega

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    CLIENTE DESCUBRE CERTILAB                               │
│                                                                             │
│  Web → Blog → Redes → Recomendación → Buscador                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    CLIENTE SELECCIONA SERVICIO                             │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Opciones:                                                           │   │
│  │ • Segunda Opinión (59€)                                             │   │
│  │ • Segunda Opinión Express (39€)                                     │   │
│  │ • Informe Técnico (199€)                                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  CTA: "Comenzar análisis"                                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    PASO 1: PAGO CON MyPOS                                  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Formulario de pago:                                                 │   │
│  │ • Email                                                             │   │
│  │ • Nombre                                                            │   │
│  │ • Teléfono (opcional)                                              │   │
│  │ • Datos de tarjeta                                                 │   │
│  │ • Aceptar términos                                                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Webhook MyPOS:                                                             │
│  ├─ ✓ Pago confirmado                                                      │
│  ├─ Crear expediente (EXP-2026-001)                                       │
│  ├─ Guardar datos de pago                                                  │
│  ├─ Generar token de acceso                                               │
│  └─ Enviar email "Pago recibido"                                          │
│                                                                             │
│  Email 1: "Pago recibido"                                                  │
│  ├─ Número de expediente                                                   │
│  ├─ Resumen de compra                                                      │
│  ├─ Próximos pasos                                                         │
│  └─ Link a panel de expediente                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    PASO 2: CONFIRMACIÓN                                    │
│                                                                             │
│  Página: /expediente/[id]/confirmacion                                    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ✓ PAGO CONFIRMADO                                                   │   │
│  │                                                                     │   │
│  │ Expediente: EXP-2026-001                                            │   │
│  │ Servicio: Segunda Opinión                                           │   │
│  │ Monto: 59€                                                          │   │
│  │ Fecha: 26 de junio de 2026                                          │   │
│  │                                                                     │   │
│  │ Próximos pasos:                                                     │   │
│  │ 1. Completa el formulario de documentación (4 pasos)               │   │
│  │ 2. Sube el certificado energético actual                           │   │
│  │ 3. Envía fotos del inmueble                                        │   │
│  │ 4. Recibirás el informe en 5-7 días hábiles                        │   │
│  │                                                                     │   │
│  │ [Botón: Comenzar a recopilar documentación]                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Estado en BD: "pago_confirmado"                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    PASO 3: ASISTENTE DE DOCUMENTACIÓN                      │
│                                                                             │
│  Página: /expediente/[id]/documentacion                                   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ PASO 3.1: DATOS DEL INMUEBLE (25%)                                  │   │
│  │                                                                     │   │
│  │ Formulario:                                                         │   │
│  │ • Dirección completa (obligatorio)                                 │   │
│  │ • Código postal (obligatorio)                                      │   │
│  │ • Provincia (obligatorio)                                          │   │
│  │ • Municipio (obligatorio)                                          │   │
│  │ • Tipo de inmueble (obligatorio)                                   │   │
│  │   └─ Vivienda unifamiliar / Piso en bloque / Local / Oficina       │   │
│  │ • Año construcción (obligatorio)                                   │   │
│  │ • Superficie útil en m² (obligatorio)                              │   │
│  │ • Número de plantas (opcional)                                     │   │
│  │ • Número de habitaciones (opcional)                                │   │
│  │ • Número de baños (opcional)                                       │   │
│  │ • Descripción general (opcional)                                   │   │
│  │                                                                     │   │
│  │ [Siguiente →]                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ PASO 3.2: CERTIFICADO ACTUAL (50%)                                  │   │
│  │                                                                     │   │
│  │ Upload PDF:                                                         │   │
│  │ • Seleccionar archivo PDF (obligatorio)                            │   │
│  │ • Validar: Tamaño máximo 10MB                                      │   │
│  │ • Validar: Formato PDF                                             │   │
│  │                                                                     │   │
│  │ Extracción automática (OCR):                                        │   │
│  │ • Número de certificado                                            │   │
│  │ • Calificación (A-G)                                               │   │
│  │ • Fecha de emisión                                                 │   │
│  │ • Nombre del certificador                                          │   │
│  │ • Consumo energético (kWh/m²/año)                                  │   │
│  │ • Emisiones GEI (kg CO2/m²/año)                                    │   │
│  │                                                                     │   │
│  │ Edición manual:                                                     │   │
│  │ • Verificar datos extraídos                                        │   │
│  │ • Corregir si es necesario                                         │   │
│  │                                                                     │   │
│  │ [← Anterior] [Siguiente →]                                         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ PASO 3.3: DOCUMENTACIÓN ADICIONAL (75%)                             │   │
│  │                                                                     │   │
│  │ Fotos del inmueble (obligatorio):                                   │   │
│  │ • Mínimo 3 fotos                                                    │   │
│  │ • Máximo 10 fotos                                                   │   │
│  │ • Formatos: JPG, PNG                                               │   │
│  │ • Tamaño máximo: 5MB por foto                                      │   │
│  │ • Sugerencias: Fachada, interior, detalles                         │   │
│  │                                                                     │   │
│  │ Documentación adicional (opcional):                                 │   │
│  │ • Planos o croquis (PDF, JPG)                                      │   │
│  │ • Facturas de servicios (PDF)                                      │   │
│  │ • Historial de reformas (texto)                                    │   │
│  │ • Notas adicionales (texto)                                        │   │
│  │                                                                     │   │
│  │ [← Anterior] [Siguiente →]                                         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ PASO 3.4: CONFIRMACIÓN (100%)                                       │   │
│  │                                                                     │   │
│  │ Resumen de datos recopilados:                                       │   │
│  │ ✓ Datos del inmueble                                               │   │
│  │ ✓ Certificado actual                                               │   │
│  │ ✓ Fotos (3 recibidas)                                              │   │
│  │ ✓ Documentación adicional                                          │   │
│  │                                                                     │   │
│  │ Confirmación:                                                       │   │
│  │ ☐ Confirmo que todos los datos son correctos                       │   │
│  │                                                                     │   │
│  │ [← Anterior] [Enviar documentación]                                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Datos guardados en BD:                                                    │
│  ├─ Datos del inmueble                                                     │
│  ├─ PDF del certificado (Storage)                                         │
│  ├─ Datos extraídos del certificado                                       │
│  ├─ URLs de fotos (Storage)                                               │
│  ├─ Documentación adicional (Storage)                                     │
│  └─ Estado: "documentacion_recibida"                                      │
│                                                                             │
│  Email 2: "Documentación recibida"                                         │
│  ├─ Confirmación de recepción                                             │
│  ├─ Resumen de datos                                                      │
│  ├─ Próximos pasos                                                        │
│  └─ Tiempo estimado: 5-7 días hábiles                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    PASO 4: PANEL DE ESTADO                                 │
│                                                                             │
│  Página: /expediente/[id]/estado                                          │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ TIMELINE DEL EXPEDIENTE                                             │   │
│  │                                                                     │   │
│  │ ✓ Pago confirmado                                                   │   │
│  │   26 de junio de 2026                                               │   │
│  │                                                                     │   │
│  │ ✓ Documentación recibida                                            │   │
│  │   26 de junio de 2026                                               │   │
│  │                                                                     │   │
│  │ ⏳ En revisión                                                       │   │
│  │   Iniciado: 26 de junio de 2026                                     │   │
│  │   Tiempo estimado: 5-7 días hábiles                                 │   │
│  │                                                                     │   │
│  │ ⏳ Análisis en progreso                                              │   │
│  │   Próximamente                                                      │   │
│  │                                                                     │   │
│  │ ⏳ Informe disponible                                                │   │
│  │   Próximamente                                                      │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ INFORMACIÓN DEL EXPEDIENTE                                          │   │
│  │                                                                     │   │
│  │ Número: EXP-2026-001                                                │   │
│  │ Servicio: Segunda Opinión                                           │   │
│  │ Fecha pago: 26 de junio de 2026                                     │   │
│  │                                                                     │   │
│  │ Inmueble:                                                           │   │
│  │ • Dirección: Calle Principal 123, Barcelona                         │   │
│  │ • Tipo: Piso en bloque                                              │   │
│  │ • Año: 1995                                                         │   │
│  │ • Superficie: 85 m²                                                 │   │
│  │                                                                     │   │
│  │ Certificado actual:                                                 │   │
│  │ • Calificación: D                                                   │   │
│  │ • Número: ES-08-123456-ABC                                          │   │
│  │ • Fecha: 15 de marzo de 2023                                        │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ACCIONES DISPONIBLES                                                │   │
│  │                                                                     │   │
│  │ [Descargar resumen de documentación]                                │   │
│  │ [Contactar con soporte]                                             │   │
│  │ [Actualizar datos]                                                  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Estado en BD: "en_revision"                                              │
│                                                                             │
│  Email 3: "Expediente en revisión"                                         │
│  ├─ Confirmación de inicio de análisis                                    │
│  ├─ Tiempo estimado                                                       │
│  ├─ Qué estamos analizando                                               │
│  └─ Link al panel de estado                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
                        [ANÁLISIS INTERNO - 5-7 DÍAS]
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    PASO 5: INFORME DISPONIBLE                              │
│                                                                             │
│  Página: /expediente/[id]/informe                                         │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ INFORME DE SEGUNDA OPINIÓN                                          │   │
│  │                                                                     │   │
│  │ Expediente: EXP-2026-001                                            │   │
│  │ Inmueble: Calle Principal 123, Barcelona                            │   │
│  │ Fecha análisis: 1 de julio de 2026                                  │   │
│  │ Certificadora: Eva María González García                            │   │
│  │                                                                     │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ RESUMEN EJECUTIVO                                                   │   │
│  │                                                                     │   │
│  │ Hallazgos principales:                                              │   │
│  │ • Calificación actual: D                                            │   │
│  │ • Calificación estimada: E                                          │   │
│  │ • Diferencia: -1 letra (peor)                                       │   │
│  │ • Errores detectados: 3                                             │   │
│  │ • Impacto económico: 18.500€                                        │   │
│  │                                                                     │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ ANÁLISIS DEL INMUEBLE                                               │   │
│  │                                                                     │   │
│  │ Datos verificados:                                                  │   │
│  │ • Dirección: Calle Principal 123, Barcelona                         │   │
│  │ • Tipo: Piso en bloque                                              │   │
│  │ • Año construcción: 1995                                            │   │
│  │ • Superficie: 85 m²                                                 │   │
│  │ • Plantas: 4                                                        │   │
│  │ • Habitaciones: 3                                                   │   │
│  │ • Baños: 1                                                          │   │
│  │                                                                     │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ COMPARATIVA DE CALIFICACIONES                                       │   │
│  │                                                                     │   │
│  │ Certificado actual:        D                                        │   │
│  │ Calificación estimada:     E                                        │   │
│  │                                                                     │   │
│  │ Consumo energético:                                                 │   │
│  │ • Actual: 185 kWh/m²/año                                            │   │
│  │ • Estimado: 210 kWh/m²/año                                          │   │
│  │                                                                     │   │
│  │ Emisiones GEI:                                                      │   │
│  │ • Actual: 42 kg CO2/m²/año                                          │   │
│  │ • Estimado: 48 kg CO2/m²/año                                        │   │
│  │                                                                     │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ ERRORES DETECTADOS                                                  │   │
│  │                                                                     │   │
│  │ 1. CALIFICACIÓN INFLADA (Severidad: Mayor)                          │   │
│  │    Descripción: La calificación D no corresponde técnicamente       │   │
│  │    Impacto: 12.000€ de pérdida de valor                             │   │
│  │    Recomendación: Solicitar corrección al certificador              │   │
│  │                                                                     │   │
│  │ 2. DATOS INCONSISTENTES (Severidad: Menor)                          │   │
│  │    Descripción: Superficie reportada no coincide con realidad       │   │
│  │    Impacto: 4.500€ de pérdida de valor                              │   │
│  │    Recomendación: Verificar planos                                  │   │
│  │                                                                     │   │
│  │ 3. SIN INSPECCIÓN PRESENCIAL (Severidad: Mayor)                     │   │
│  │    Descripción: Certificado emitido sin visita al inmueble          │   │
│  │    Impacto: 2.000€ de pérdida de valor                              │   │
│  │    Recomendación: Exigir nueva inspección                           │   │
│  │                                                                     │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ IMPACTO ECONÓMICO                                                   │   │
│  │                                                                     │   │
│  │ Brown Discount (15% por calificación E):                            │   │
│  │ • Valor estimado del inmueble: 270.000€                             │   │
│  │ • Pérdida por Brown Discount: 40.500€                               │   │
│  │                                                                     │   │
│  │ Costes de corrección:                                               │   │
│  │ • Nuevo certificado: 300€                                           │   │
│  │ • Mejoras energéticas: 8.000€                                       │   │
│  │ • Total costes: 8.300€                                              │   │
│  │                                                                     │   │
│  │ IMPACTO TOTAL: 48.800€                                              │   │
│  │ (Redondeado a 48.500€ en el resumen)                                │   │
│  │                                                                     │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ RECOMENDACIONES                                                     │   │
│  │                                                                     │   │
│  │ 1. Contactar inmediatamente con el certificador original            │   │
│  │    para solicitar corrección del certificado                        │   │
│  │                                                                     │   │
│  │ 2. Realizar mejoras energéticas prioritarias:                       │   │
│  │    • Cambiar ventanas (aislamiento)                                 │   │
│  │    • Mejorar aislamiento de fachada                                 │   │
│  │    • Cambiar caldera por sistema más eficiente                      │   │
│  │                                                                     │   │
│  │ 3. Solicitar nueva inspección presencial                            │   │
│  │                                                                     │   │
│  │ 4. Considerar Informe Técnico Completo para propuestas              │   │
│  │    de mejora detalladas y presupuestos                              │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ACCIONES DISPONIBLES                                                │   │
│  │                                                                     │   │
│  │ [Descargar PDF]                                                     │   │
│  │ [Compartir por email]                                               │   │
│  │ [Imprimir]                                                          │   │
│  │ [Solicitar Informe Técnico (+199€)]                                 │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Estado en BD: "informe_disponible"                                       │
│                                                                             │
│  Email 4: "Informe disponible"                                             │
│  ├─ Resumen de hallazgos                                                  │
│  ├─ Link para descargar                                                   │
│  ├─ Próximos pasos recomendados                                           │
│  └─ CTA: Solicitar Informe Técnico (futuro)                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Futuras Ampliaciones

### FASE 2: Informe Técnico (Futuro)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    CLIENTE VE INFORME DE SEGUNDA OPINIÓN                   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ [Solicitar Informe Técnico Completo (+199€)]                        │   │
│  │                                                                     │   │
│  │ Incluye:                                                            │   │
│  │ • Análisis técnico profundo                                         │   │
│  │ • Propuestas de mejora detalladas                                   │   │
│  │ • Presupuestos de reforma                                           │   │
│  │ • Planos de mejora                                                  │   │
│  │ • Cronograma de ejecución                                           │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    PAGO ADICIONAL (+199€)                                  │
│                                                                             │
│  Webhook MyPOS:                                                             │
│  ├─ Pago confirmado                                                         │
│  ├─ Crear expediente adicional (EXP-2026-001-TECH)                         │
│  ├─ Reutilizar datos del expediente anterior                              │
│  └─ Enviar email de confirmación                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    ANÁLISIS TÉCNICO PROFUNDO (7-10 DÍAS)                   │
│                                                                             │
│  Datos reutilizados:                                                        │
│  ├─ Datos del inmueble (ya recopilados)                                    │
│  ├─ Certificado (ya analizado)                                             │
│  ├─ Fotos (ya subidas)                                                     │
│  └─ Documentación (ya disponible)                                           │
│                                                                             │
│  Análisis adicional:                                                        │
│  ├─ Inspección técnica detallada                                           │
│  ├─ Cálculo de mejoras energéticas                                         │
│  ├─ Presupuestos de reforma                                                │
│  ├─ Planos de mejora                                                       │
│  └─ Cronograma de ejecución                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    INFORME TÉCNICO DISPONIBLE                              │
│                                                                             │
│  Página: /expediente/[id]/informe-tecnico                                 │
│                                                                             │
│  Contenido:                                                                 │
│  ├─ Resumen ejecutivo                                                      │
│  ├─ Análisis técnico detallado                                             │
│  ├─ Propuestas de mejora (3-5 opciones)                                    │
│  ├─ Presupuestos por opción                                                │
│  ├─ Planos de mejora                                                       │
│  ├─ Cronograma de ejecución                                                │
│  ├─ Ahorro energético estimado                                             │
│  ├─ ROI de las mejoras                                                     │
│  └─ Certificador responsable                                               │
│                                                                             │
│  Acciones:                                                                  │
│  ├─ Descargar PDF                                                          │
│  ├─ Compartir con contratistas                                             │
│  ├─ Solicitar presupuestos                                                 │
│  └─ Contactar con Certilab para ejecución                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### FASE 3: Observatorio Certilab (Futuro)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    DATOS DEL EXPEDIENTE ALIMENTAN OBSERVATORIO             │
│                                                                             │
│  Cada expediente completado:                                                │
│  ├─ Anonimizar datos personales                                            │
│  ├─ Guardar en tabla observatorio_datos                                    │
│  ├─ Actualizar estadísticas                                                │
│  └─ Actualizar dashboard público                                           │
│                                                                             │
│  Datos anonimizados:                                                        │
│  ├─ Provincia (no dirección)                                               │
│  ├─ Tipo de inmueble                                                       │
│  ├─ Año construcción                                                       │
│  ├─ Calificación original vs. estimada                                     │
│  ├─ Errores detectados                                                     │
│  └─ Impacto económico                                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    PÁGINA PÚBLICA: OBSERVATORIO CERTILAB                   │
│                                                                             │
│  URL: /observatorio/                                                        │
│                                                                             │
│  Contenido público:                                                         │
│  ├─ Estadísticas generales                                                 │
│  │  └─ % de certificados con errores                                       │
│  │  └─ Impacto económico promedio                                          │
│  │  └─ Errores más comunes                                                 │
│  │                                                                         │
│  ├─ Análisis por provincia                                                 │
│  │  └─ Mapa interactivo                                                    │
│  │  └─ Tabla de datos                                                      │
│  │                                                                         │
│  ├─ Análisis por tipo de inmueble                                          │
│  │  └─ Vivienda unifamiliar                                                │
│  │  └─ Piso en bloque                                                      │
│  │  └─ Local comercial                                                     │
│  │  └─ Oficina                                                             │
│  │                                                                         │
│  ├─ Informes trimestrales                                                  │
│  │  └─ Q1 2026: 47 análisis, 48,9% con errores                             │
│  │  └─ Q4 2025: 52 análisis, 46,2% con errores                             │
│  │  └─ Q3 2025: 38 análisis, 44,7% con errores                             │
│  │                                                                         │
│  └─ Suscripción a actualizaciones                                          │
│     └─ Email trimestral con hallazgos                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    INFORMES TRIMESTRALES AUTOMÁTICOS                       │
│                                                                             │
│  Cada trimestre (15 de abril, julio, octubre, enero):                      │
│                                                                             │
│  1. Agregar datos de expedientes completados                               │
│  2. Calcular estadísticas                                                   │
│  3. Generar gráficos                                                        │
│  4. Crear informe PDF                                                       │
│  5. Publicar en blog (/blog/observatorio-q1-2026/)                          │
│  6. Enviar email a suscriptores                                             │
│  7. Actualizar dashboard público                                            │
│                                                                             │
│  Contenido del informe:                                                     │
│  ├─ Resumen ejecutivo                                                      │
│  ├─ Datos generales                                                        │
│  ├─ Errores detectados                                                     │
│  ├─ Análisis geográfico                                                    │
│  ├─ Análisis por segmentos                                                 │
│  ├─ Impacto económico                                                      │
│  ├─ Tendencias y comparativas                                              │
│  └─ Recomendaciones                                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### FASE 4: SaaS para Profesionales (Futuro)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    PROFESIONALES ACCEDEN A SAAS                            │
│                                                                             │
│  URL: /saas/                                                                │
│                                                                             │
│  Acceso a:                                                                  │
│  ├─ API de análisis automático                                             │
│  │  └─ Integración con sistemas propios                                    │
│  │  └─ Análisis en tiempo real                                             │
│  │                                                                         │
│  ├─ Dashboard de expedientes                                               │
│  │  └─ Histórico de análisis                                               │
│  │  └─ Métricas de calidad                                                 │
│  │  └─ Reportes personalizados                                             │
│  │                                                                         │
│  ├─ Datos del Observatorio                                                 │
│  │  └─ Tendencias del mercado                                              │
│  │  └─ Benchmarking vs. sector                                             │
│  │  └─ Análisis competitivo                                                │
│  │                                                                         │
│  └─ Soporte prioritario                                                    │
│     └─ Chat en vivo                                                        │
│     └─ Email prioritario                                                   │
│     └─ Consultoría técnica                                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Matriz de Datos por Fase

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    DATOS RECOPILADOS EN CADA FASE                          │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ FASE 1: PAGO → ENTREGA                                                     │
│                                                                             │
│ Datos del cliente:                                                          │
│ ├─ Email                                                                    │
│ ├─ Nombre                                                                   │
│ └─ Teléfono (opcional)                                                     │
│                                                                             │
│ Datos del inmueble:                                                         │
│ ├─ Dirección completa                                                       │
│ ├─ Tipo de inmueble                                                         │
│ ├─ Año construcción                                                         │
│ ├─ Superficie útil                                                          │
│ ├─ Número de plantas                                                        │
│ ├─ Número de habitaciones                                                   │
│ └─ Número de baños                                                          │
│                                                                             │
│ Datos del certificado:                                                      │
│ ├─ Número de certificado                                                    │
│ ├─ Calificación (A-G)                                                       │
│ ├─ Fecha de emisión                                                         │
│ ├─ Certificador                                                             │
│ ├─ Consumo energético                                                       │
│ └─ Emisiones GEI                                                            │
│                                                                             │
│ Documentación:                                                              │
│ ├─ PDF del certificado                                                      │
│ ├─ Fotos del inmueble (3+)                                                  │
│ ├─ Planos (opcional)                                                        │
│ ├─ Facturas (opcional)                                                      │
│ └─ Historial de reformas (opcional)                                         │
│                                                                             │
│ Análisis:                                                                   │
│ ├─ Calificación estimada                                                    │
│ ├─ Errores detectados                                                       │
│ ├─ Impacto económico                                                        │
│ └─ Recomendaciones                                                          │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ FASE 2: INFORME TÉCNICO (Futuro)                                           │
│                                                                             │
│ Datos adicionales:                                                          │
│ ├─ Análisis técnico detallado                                              │
│ ├─ Propuestas de mejora (3-5)                                              │
│ ├─ Presupuestos por opción                                                 │
│ ├─ Planos de mejora                                                         │
│ ├─ Cronograma de ejecución                                                 │
│ ├─ Ahorro energético estimado                                              │
│ └─ ROI de las mejoras                                                       │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ FASE 3: OBSERVATORIO (Futuro)                                              │
│                                                                             │
│ Datos anonimizados:                                                         │
│ ├─ Provincia (no dirección)                                                │
│ ├─ Tipo de inmueble                                                         │
│ ├─ Año construcción                                                         │
│ ├─ Calificación original vs. estimada                                      │
│ ├─ Errores detectados                                                       │
│ ├─ Impacto económico                                                        │
│ └─ Fecha de análisis                                                        │
│                                                                             │
│ Estadísticas agregadas:                                                     │
│ ├─ % de certificados con errores                                           │
│ ├─ Errores más comunes                                                      │
│ ├─ Análisis por provincia                                                   │
│ ├─ Análisis por tipo de inmueble                                           │
│ ├─ Impacto económico total                                                 │
│ └─ Tendencias temporales                                                    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ FASE 4: SAAS (Futuro)                                                      │
│                                                                             │
│ Datos disponibles para profesionales:                                       │
│ ├─ Histórico de análisis                                                    │
│ ├─ Métricas de calidad                                                      │
│ ├─ Tendencias del mercado                                                   │
│ ├─ Benchmarking vs. sector                                                  │
│ └─ Análisis competitivo                                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de Datos Completo

```
CLIENTE PAGA
    ↓
WEBHOOK MyPOS
    ├─ Crear expediente
    ├─ Guardar datos de pago
    └─ Enviar email
    ↓
CLIENTE COMPLETA DOCUMENTACIÓN
    ├─ Datos del inmueble
    ├─ Certificado (OCR)
    ├─ Fotos
    └─ Documentación adicional
    ↓
WEBHOOK DOCUMENTACIÓN
    ├─ Validar datos
    ├─ Guardar en BD
    └─ Enviar email
    ↓
ANÁLISIS INTERNO (5-7 DÍAS)
    ├─ Revisar certificado
    ├─ Detectar errores
    ├─ Calcular impacto
    └─ Generar informe
    ↓
INFORME DISPONIBLE
    ├─ Guardar en Storage
    ├─ Actualizar BD
    └─ Enviar email
    ↓
CLIENTE DESCARGA INFORME
    ├─ PDF disponible
    ├─ Datos en panel
    └─ Acciones disponibles
    ↓
DATOS ALIMENTAN OBSERVATORIO
    ├─ Anonimizar
    ├─ Guardar en tabla
    └─ Actualizar estadísticas
    ↓
INFORMES TRIMESTRALES
    ├─ Agregar datos
    ├─ Calcular estadísticas
    ├─ Generar informe
    ├─ Publicar en blog
    └─ Enviar a suscriptores
```

---

## 📱 Resumen de Pantallas

| Pantalla | URL | Estado | Datos mostrados |
|----------|-----|--------|-----------------|
| Confirmación de pago | `/expediente/[id]/confirmacion` | pago_confirmado | Número expediente, resumen compra |
| Asistente documentación | `/expediente/[id]/documentacion` | documentacion_recibida | Formulario 4 pasos |
| Panel de estado | `/expediente/[id]/estado` | en_revision | Timeline, información, acciones |
| Informe | `/expediente/[id]/informe` | informe_disponible | Análisis completo, PDF |
| Informe técnico | `/expediente/[id]/informe-tecnico` | informe_tecnico_disponible | Propuestas, presupuestos, planos |
| Observatorio | `/observatorio/` | público | Estadísticas, gráficos, informes |
| Dashboard admin | `/admin/observatorio/` | privado | Métricas, reportes, gestión |

---

## 📧 Emails Automáticos

| Email | Trigger | Contenido |
|-------|---------|----------|
| Pago recibido | Webhook MyPOS | Número expediente, próximos pasos |
| Documentación recibida | Documentación completada | Confirmación, resumen datos |
| En revisión | Estado cambia a en_revision | Inicio análisis, tiempo estimado |
| Informe disponible | Estado cambia a informe_disponible | Hallazgos, link descarga, CTA |

---

**Versión:** 1.0  
**Fecha:** Junio 2026  
**Estado:** Diagrama completado, listo para implementación

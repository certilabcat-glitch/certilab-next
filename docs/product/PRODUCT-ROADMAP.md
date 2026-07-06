# PRODUCT ROADMAP — Certilab Platform

**Versión:** 2.0
**Fecha:** 2026-07-05
**Estado:** ✅ APROBADO — FASE PRODUCTO INICIADA

---

## Jerarquía del producto

```
Certilab Platform
    ├── Módulo 1: Auditoría de Certificados Energéticos (V1 — Primer módulo)
    ├── Módulo 2: ITE / Inspección Técnica de Edificios (futuro, V3+)
    ├── Módulo 3: Accesibilidad (futuro, V3+)
    └── Módulo N: Nuevos módulos de inspección técnica
```

**Principio rector del roadmap:**

> Certilab Platform es una plataforma modular de gestión y auditoría técnica. Los módulos implementan capacidades específicas, pero ninguno define la plataforma. Todos reutilizan el mismo Core de Cliente, Inmueble, Expediente y Documento IA.

---

## Filosofía del Roadmap

El roadmap de Certilab sigue el principio de **mínima expansión** del Core V1. Cada versión añade capacidades funcionales visibles para el usuario final, priorizando la integración de componentes existentes sobre la creación de nuevos.

**Reglas del roadmap:**

1. **V1**: Primer módulo: flujo básico propietario → AT → dictamen. Valor funcional mínimo.
2. **V1.1**: Evolución controlada del primer módulo. Sin nueva arquitectura.
3. **V2**: Nuevos canales, nuevo perfil (observatorio, administradores de fincas). Nuevos módulos en análisis.
4. **V3**: Escalado del modelo AT múltiple. Nuevos mercados. Incorporación de nuevos módulos de inspección técnica.
5. Lo clasificado como **V2** o **V3** no se implementa en V1/V1.1 a menos que una ADR lo justifique.

---

## V1 — MVP — Primer módulo: Auditoría de Certificados Energéticos (Actual: v1.0.0-rc1)

**Estado:** ✅ CORE V1 COMPLETADO. MVP listo para lanzamiento.

### Capacidades actuales

| Funcionalidad | Estado | Prioridad |
|---------------|--------|-----------|
| Cliente: solicitar Segunda Opinión (PITR™) | ✅ Implementado | P0 |
| AT: dashboard de expedientes | ✅ Implementado | P0 |
| AT: revisión y dictamen técnico | ✅ Implementado | P0 |
| Cliente: visualizar dictamen | ✅ Implementado | P0 |
| Documentación: subida y gestión | ✅ Implementado | P0 |
| Autenticación y RLS | ✅ Implementado | P0 |
| Landing page + blog SEO | ✅ Implementado | P0 |
| Privacidad / RGPD (cookies, aviso legal) | ✅ Implementado | P0 |
| PITR™ v1 — Preguntas guiadas (árbol manual) | ✅ Implementado | P0 |
| Workflow de correcciones (AT ↔ cliente) | ✅ Implementado | P0 |
| Entrega de resultado (dictamen formal) | ✅ Implementado | P0 |

### Lo que NO está en V1 (por decisión consciente)

- ❌ Pago online integrado (pendiente de Pasarela/Supabase Payments)
- ❌ Onboarding de ATs externos (el AT en V1 es interno)
- ❌ Observatorio público de datos
- ❌ API pública
- ❌ IA asistente para AT
- ❌ Programa de afiliados / referidos
- ❌ Multi-idioma (español solo)
- ❌ Nuevos módulos de inspección (ITE, accesibilidad, etc.)

### Requisitos de lanzamiento V1

- [x] Build correcto (npm run build)
- [x] Tests pasando
- [x] Migraciones aplicadas
- [x] Documentación de release generada
- [ ] **Pago online integrado** (pendiente)
- [ ] **Primeros 5 expedientes reales completados**

---

## V1.1 — Post-MVP — Evolución del primer módulo (Prioridad inmediata)

**Estado:** 📋 PLANIFICADO — Inicio Q3 2026

### Objetivo

Cerrar las carencias identificadas en el release audit (RC-001-FINAL-AUDIT) y preparar la plataforma para la adquisición de los primeros clientes de pago del **Módulo 1 (Auditoría de Certificados Energéticos)**.

| Funcionalidad | Prioridad | Esfuerzo estimado | Dependencias |
|---------------|-----------|-------------------|--------------|
| **Pasarela de pago online** (Stripe o similar) | P0 | 2-3 semanas | Contrato Stripe, compliance |
| **Página de pricing / servicios** pública | P0 | 1 semana | Pasarela de pago |
| **Onboarding de cliente** mejorado (UX) | P1 | 2 semanas | — |
| **Email transaccional** (notificaciones de estado) | P1 | 2 semanas | Proveedor email (Resend/SendGrid) |
| **Panel AT**: filtros, búsqueda, paginación | P1 | 1 semana | — |
| **Modo invitado** (solicitar sin registro complejo) | P1 | 3 semanas | — |
| **Dictamen en PDF descargable** | P1 | 1 semana | — |
| **Mejora PITR™ v1.1**: preguntas dinámicas | P2 | 2 semanas | — |
| **Programa de referidos** manual (AT → cliente) | P2 | 1 semana | — |
| **Analítica básica** (expedientes, conversión, ingresos) | P2 | 1 semana | — |

### Criterios de salida V1.1

- [ ] Pasarela de pago funcionando en producción
- [ ] 10 expedientes de pago completados (Módulo 1)
- [ ] NPS ≥ 30 (encuesta post-dictamen)
- [ ] Sin bugs críticos abiertos

---

## V2 — Crecimiento — Escalar el primer módulo + preparar nuevos módulos (Q1-Q2 2027)

**Estado:** 📋 PLANIFICADO

### Objetivo

Escalar el **Módulo 1 (Auditoría de Certificados Energéticos)** con nuevos perfiles de usuario (administrador de fincas, agente inmobiliario), lanzar el Observatorio, y comenzar el análisis de viabilidad del **Módulo 2 (ITE)**.

| Funcionalidad | Prioridad | Esfuerzo | Perfil beneficiado |
|---------------|-----------|----------|-------------------|
| **Observatorio Certilab** (datos anonimizados públicos) | P0 | 4 semanas | Todos |
| **Perfil Administrador de fincas** (auditoría múltiple) | P0 | 6 semanas | Alba (persona 5) |
| **Perfil Agente inmobiliario** (cartera de certificados) | P1 | 4 semanas | Canal |
| **API REST pública** (consulta de estado, integraciones) | P1 | 6 semanas | Desarrolladores, partners |
| **Onboarding AT externo** (registro, verificación, alta) | P0 | 4 semanas | Marc (persona 2) |
| **Sistema de comisiones AT** (split de pago automático) | P0 | 3 semanas | Marc (persona 2) |
| **IA asistente PITR™** (detección automática de anomalías básicas) | P1 | 6 semanas | AT, eficiencia |
| **Google Ads** (campaña SEM) | P1 | Continuo | Adquisición |
| **Programa de afiliados** (inmobiliarias, notarías) | P2 | 4 semanas | Canal |
| **Multi-idioma** (catalán, inglés) | P2 | 4 semanas | Expansión |
| **Dashboard de métricas AT** (ingresos, eficiencia, calidad) | P1 | 3 semanas | Marc (persona 2) |
| **Personalización landing pages** por perfil | P2 | 2 semanas | Marketing |
| **Análisis de viabilidad Módulo 2 (ITE)** | P1 | 2 semanas | Producto |

### Criterios de salida V2

- [ ] 50 expedientes/mes sostenidos (Módulo 1)
- [ ] 5+ ATs externos activos en plataforma
- [ ] Observatorio con 3 informes publicados
- [ ] API pública documentada y estable
- [ ] NPS ≥ 45
- [ ] Informe de viabilidad del Módulo 2 (ITE) completado

---

## V3 — Escalado y mercado LATAM — Nuevos módulos de inspección (2028)

**Estado:** 📋 VISIÓN — Sin plan detallado

### Objetivo

Consolidar Certilab como plataforma de referencia en España, expandirse a Latinoamérica (México, Colombia, Chile) y escalar la red de ATs. **Incorporar nuevos módulos de inspección técnica (ITE, accesibilidad, eficiencia hídrica, peritajes) sobre la misma arquitectura de Cliente, Inmueble, Expediente y Documento IA.**

| Funcionalidad | Prioridad | Esfuerzo | Perfil beneficiado |
|---------------|-----------|----------|-------------------|
| **Expansión LATAM** (México, Colombia, Chile) | P0 | 12-16 semanas | Mercado |
| **Marketplace AT** (asignación inteligente por ubicación/especialidad) | P0 | 8 semanas | Marc (persona 2) |
| **Planes de suscripción AT** (Básico, Profesional, Ilimitado) | P0 | 4 semanas | Marc (persona 2) |
| **Partnerships certificadoras** (API whitelabel, informes de calidad) | P0 | 8 semanas | Inés (persona 3) |
| **IA avanzada**: detección de patrones, clustering de errores | P1 | 8 semanas | Observatorio |
| **App móvil básica** (estado expediente, notificaciones) | P1 | 8 semanas | Cliente final |
| **Integración con portales inmobiliarios** (Idealista, Fotocasa) | P1 | 6 semanas | Canal |
| **Sello de calidad Certilab** (para certificadoras partner) | P1 | 4 semanas | Inés (persona 3) |
| **Herramientas de rehabilitación** (recomendaciones básicas post-auditoría) | P2 | 6 semanas | Cliente final |
| **Auditoría legal integrada** (plantillas de reclamación) | P2 | 4 semanas | Cliente final |
| **Módulo 2: ITE — Inspección Técnica de Edificios** | P0 | 12 semanas | Nuevo mercado |
| **Módulo 3: Certificados de Accesibilidad** | P1 | 8 semanas | Nuevo mercado |
| **Módulo 4: Eficiencia Hídrica** | P2 | 8 semanas | Nuevo mercado |

### Criterios de salida V3

- [ ] 200+ expedientes/mes sostenidos (todos los módulos)
- [ ] 50+ ATs activos en plataforma
- [ ] Presencia en 3 países LATAM
- [ ] Al menos 1 partnership con certificadora grande (>1.000 certificados/año)
- [ ] Ingresos recurrentes sostenibles (MRR > 10.000 €)
- [ ] Al menos 1 módulo adicional activo (ITE o equivalente)

---

## Más allá de V3 (2029-2031)

| Funcionalidad | Horizonte | Notas |
|---------------|-----------|-------|
| **App móvil completa** (AT y cliente) | 2029 | UX nativa, push notifications |
| **IA proactiva**: alertas de certificados sospechosos en mercado | 2029 | Crawling de portales inmobiliarios |
| **Integración con registro oficial** (CAEE, órganos autonómicos) | 2029-2030 | Depende de voluntad política |
| **Expansión a Portugal** | 2029 | Mercado UE contiguo |
| **API pública v2** (inserción de datos, webhooks) | 2030 | Ecosistema de terceros |
| **Observatorio v2**: informes automáticos, predicciones | 2030 | ML sobre la base de datos acumulada |
| **Estándar de facto** de verificación de certificados en España | 2030-2031 | Objetivo aspiracional |
| **Módulo 5: Peritajes técnicos** | 2030 | Nuevo mercado |
| **Módulo 6: Auditoría de subvenciones y ayudas** | 2031 | Next Generation EU, fondos |

---

## Tabla resumen de prioridades por versión

| Versión | Timeline | Foco principal | Módulo(s) | Perfiles | Ingresos esperados |
|---------|----------|----------------|-----------|----------|-------------------|
| **V1** | Lanzamiento (Q3 2026) | Validar flujo básico | M1: Certificación Energética | Propietario, AT interno | 0-500 €/mes |
| **V1.1** | Q3-Q4 2026 | Cerrar gaps, habilitar pago | M1: Certificación Energética | Propietario, AT interno | 500-3.000 €/mes |
| **V2** | 2027 | Escalar con datos y canales | M1 (+ análisis M2) | + Adm. fincas, + AT externo | 3.000-15.000 €/mes |
| **V3** | 2028 | Escalar red AT, LATAM, nuevos módulos | M1 + M2 (ITE) + M3 (Accesibilidad) | + Certificadoras, + LATAM | 10.000-50.000 €/mes |
| **V4+** | 2029-2031 | IA proactiva, estándar de mercado | M1 + M2 + M3 + M4 + M5 + M6 | Todo mercado | 50.000+ €/mes |

---

## Principios de priorización

1. **Valor funcional para el usuario**: Lo que el usuario ve y usa directamente tiene prioridad sobre mejoras internas.
2. **Reutilización del Core V1**: Ninguna nueva funcionalidad puede requerir cambios en el dominio del Core V1 (Cliente, Inmueble, Expediente, Documento IA) sin una ADR.
3. **Mínima expansión**: Crear nuevos agregados, bounded contexts o servicios de dominio solo si la funcionalidad no puede resolverse mediante composición o extensión de los existentes.
4. **Blindaje de ingresos**: Las funcionalidades que desbloquean ingresos (pasarela de pago, pricing) tienen prioridad sobre las que mejoran la experiencia.
5. **Datos primero**: Las funcionalidades que generan datos para el Observatorio tienen prioridad sobre las que no.
6. **Modularidad**: Los nuevos módulos de inspección técnica se implementan como capacidades del Expediente, no como nuevos agregados. Todos reutilizan el mismo Core.

---

*Fin del documento PRODUCT-ROADMAP.md*
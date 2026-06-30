# AUDITORÍA CRÍTICA DE ARQUITECTURA — PLATAFORMA CERTILAB V1.1

**Auditor:** Software Architect (SaaS B2B)  
**Fecha:** 29/06/2026  
**Alcance:** Análisis de arquitectura, escalabilidad, extensibilidad, seguridad

---

## 1. MODELO DE ENTIDADES

### ✔ Qué está bien

- **Estructura clara:** 6 entidades bien definidas (Expediente, Cliente, Inmueble, Servicio, Usuario, Actividad)
- **Tipos TypeScript:** Interfaces explícitas, enums para valores permitidos
- **Auditoría integrada:** Entidad Actividad registra todos los cambios
- **Metadata flexible:** Campos opcionales para extensión futura
- **DTOs separados:** Request/Response bien tipados

### ⚠ Qué mejoraría

- **Falta entidad Documento:** No hay modelo para documentos/archivos adjuntos
- **Falta entidad Notificación:** No hay registro de notificaciones enviadas
- **Falta entidad Pago:** No hay relación explícita con pagos (solo clienteId)
- **Timestamps:** Usar `Date` en BD es problemático; mejor `timestamp` (número)
- **Soft deletes:** No hay campo `deletedAt` para borrado lógico

### ❌ Qué rehacería

**CRÍTICO:** Agregar entidad `Documento` antes de Épica 2:
```typescript
interface Documento {
  id: string;
  expedienteId: string;
  tipo: "certificado" | "inspección" | "informe" | "otro";
  url: string;
  tamaño: number;
  mimeType: string;
  creadoPor: string;
  fechaCreacion: Date;
}
```

**CRÍTICO:** Agregar entidad `Pago` para rastrear transacciones:
```typescript
interface Pago {
  id: string;
  clienteId: string;
  servicioId: string;
  monto: number;
  estado: "pendiente" | "completado" | "fallido" | "reembolsado";
  referenciaMYPOS: string;
  fechaCreacion: Date;
}
```

---

## 2. RELACIONES ENTRE ENTIDADES

### ✔ Qué está bien

- **Relaciones claras:** Cliente → Inmueble → Expediente
- **Foreign keys explícitas:** clienteId, inmuebleId, servicioId, tecnicoAsignadoId
- **Auditoría de cambios:** Actividad registra quién hizo qué y cuándo
- **Cascada lógica:** Un cliente puede tener múltiples inmuebles y expedientes

### ⚠ Qué mejoraría

- **Falta relación Pago → Expediente:** No hay vínculo directo
- **Falta relación Documento → Expediente:** No hay modelo de archivos
- **Falta relación Notificación → Expediente:** No hay registro de comunicaciones
- **Falta relación Usuario → Equipo:** No hay concepto de equipos/departamentos
- **Falta relación Expediente → Expediente:** No hay expedientes relacionados/vinculados

### ❌ Qué rehacería

Agregar relaciones antes de producción:
- Expediente → Documento (1:N)
- Expediente → Pago (1:N)
- Expediente → Notificación (1:N)
- Usuario → Equipo (N:1)
- Expediente → Expediente (N:N, para expedientes relacionados)

---

## 3. MÁQUINA DE ESTADOS

### ✔ Qué está bien

- **Transiciones claras:** 7 estados bien definidos
- **Validación centralizada:** `esTransicionValida()` previene cambios inválidos
- **Progreso automático:** Cálculo de % basado en estado
- **Etiquetas y colores:** UI-ready con badges
- **Lineal y predecible:** Flujo sin bifurcaciones

### ⚠ Qué mejoraría

- **Sin estados de error:** No hay estado para "Rechazado" o "En espera de cliente"
- **Sin transiciones hacia atrás:** No se puede volver a estado anterior (ej: "En revisión" → "Esperando información")
- **Sin timeout automático:** No hay mecanismo para cambiar estado si pasa tiempo
- **Sin condiciones:** Las transiciones no validan precondiciones (ej: "¿tiene documentación?")
- **Progreso manual:** El progreso se calcula pero no se valida

### ❌ Qué rehacería

Extender máquina de estados:
```typescript
// Agregar estados
RECHAZADO = "rechazado"
EN_ESPERA_CLIENTE = "en_espera_cliente"
CANCELADO = "cancelado"

// Agregar transiciones bidireccionales
EN_REVISION → ESPERANDO_INFORMACION (si falta documentación)
INFORME_ENVIADO → EN_REVISION (si cliente solicita revisión)

// Agregar validaciones
interface TransicionConValidacion {
  desde: EstadoExpediente;
  hacia: EstadoExpediente;
  requiere?: string[]; // ["documentacion", "tecnico_asignado"]
  timeout?: number; // ms
}
```

---

## 4. ESCALABILIDAD

### ✔ Qué está bien

- **Índices implícitos:** IDs como UUIDs (escalable)
- **Paginación en DTOs:** `ListarExpedientesQuery` soporta page/limit
- **Filtros múltiples:** Estado, prioridad, técnico, búsqueda
- **Ordenación flexible:** Fecha, prioridad, estado
- **Auditoría escalable:** Actividad registra cambios sin afectar Expediente

### ⚠ Qué mejoraría

- **Sin índices de BD:** No hay especificación de índices (clienteId, estado, fechaCreacion)
- **Sin particionamiento:** No hay estrategia para millones de expedientes
- **Sin caché:** No hay layer de caché (Redis) para queries frecuentes
- **Sin búsqueda full-text:** Búsqueda por "numeroExpediente" es básica
- **Sin agregaciones:** No hay queries pre-calculadas para dashboards

### ❌ Qué rehacería

Antes de producción:
1. **Definir índices:**
   - `(clienteId, estado, fechaCreacion)` para queries comunes
   - `(tecnicoAsignadoId, estado)` para asignaciones
   - `(numeroExpediente)` para búsqueda rápida

2. **Implementar caché:**
   - Redis para expedientes activos
   - TTL de 5 minutos para datos no críticos

3. **Agregar búsqueda full-text:**
   - PostgreSQL FTS o Elasticsearch
   - Índice en numeroExpediente, cliente.nombre, inmueble.direccion

4. **Preparar particionamiento:**
   - Por año (expedientes.fechaCreacion)
   - Por cliente (para multi-tenancy futuro)

---

## 5. MÚLTIPLES ARQUITECTOS TÉCNICOS

### ✔ Qué está bien

- **Separación clara:** Types, lib, components en carpetas distintas
- **Convenciones:** Nombres consistentes (expediente-estados.ts, EstadoBadge.tsx)
- **Documentación:** CF-002 y IMPLEMENTACION-V1.1 bien estructurados
- **TypeScript estricto:** Previene errores en tiempo de compilación
- **Componentes reutilizables:** EstadoBadge, ProgressBar sin lógica de negocio

### ⚠ Qué mejoraría

- **Sin guía de contribución:** No hay CONTRIBUTING.md
- **Sin patrones de API:** No hay especificación de cómo crear endpoints
- **Sin patrones de componentes:** No hay template para nuevos componentes
- **Sin convenciones de BD:** No hay especificación de migrations
- **Sin versionado de API:** No hay v1/, v2/ en rutas

### ❌ Qué rehacería

Crear antes de Épica 2:
1. **CONTRIBUTING.md** con:
   - Estructura de carpetas
   - Convenciones de nombres
   - Proceso de PR
   - Testing requirements

2. **API Design Guide:**
   - Estructura de endpoints
   - Formato de errores
   - Versionado (v1/)
   - Rate limiting

3. **Component Template:**
   - Props interface
   - Docstring
   - Ejemplo de uso
   - Tests

---

## 6. MILES DE EXPEDIENTES

### ✔ Qué está bien

- **IDs como UUIDs:** Escalable a millones
- **Paginación:** Soporta limit/offset
- **Filtros:** Reducen dataset antes de paginar
- **Auditoría separada:** No ralentiza queries de Expediente

### ⚠ Qué mejoraría

- **Sin índices:** Queries sin índices serán lentas
- **Sin caché:** Cada query toca BD
- **Sin agregaciones:** Dashboard recalcula cada vez
- **Sin archivado:** Expedientes cerrados ocupan espacio activo
- **Sin sharding:** Un servidor no aguanta millones

### ❌ Qué rehacería

Estrategia de escalabilidad:
1. **Índices en BD:**
   ```sql
   CREATE INDEX idx_expediente_cliente_estado 
   ON expedientes(cliente_id, estado, fecha_creacion DESC);
   ```

2. **Caché de expedientes activos:**
   - Redis: expedientes con estado ≠ CERRADO
   - TTL: 5 minutos

3. **Agregaciones pre-calculadas:**
   - Tabla `expediente_stats` actualizada cada hora
   - Conteos por estado, técnico, cliente

4. **Archivado automático:**
   - Expedientes cerrados hace >1 año → tabla `expedientes_archive`
   - Queries por defecto excluyen archive

5. **Sharding por cliente:**
   - Preparar para multi-tenancy
   - Cada cliente en shard diferente (futuro)

---

## 7. AGREGAR IA SIN REHACER CÓDIGO

### ✔ Qué está bien

- **Interfaz IAConfig:** Preparada para OpenAI, Anthropic, custom
- **IAAnalysisRequest/Response:** DTOs bien definidos
- **Separación:** IA en integraciones.ts, no acoplada a Expediente

### ⚠ Qué mejoraría

- **Sin servicio IA:** No hay `src/lib/ia-service.ts`
- **Sin prompts:** No hay templates de prompts
- **Sin validación:** No hay validación de respuestas IA
- **Sin fallback:** Si IA falla, ¿qué pasa?
- **Sin auditoría:** No se registra qué IA sugirió

### ❌ Qué rehacería

Crear antes de integrar IA:
1. **Servicio IA:**
   ```typescript
   // src/lib/ia-service.ts
   export async function analizarDocumentacion(
     expedienteId: string,
     contenido: string
   ): Promise<IAAnalysisResponse>
   ```

2. **Prompts centralizados:**
   ```typescript
   // src/lib/ia-prompts.ts
   export const PROMPT_ANALIZAR_DOCUMENTACION = `...`
   export const PROMPT_SUGERIR_ESTADO = `...`
   ```

3. **Validación de respuestas:**
   ```typescript
   export function validarRespuestaIA(
     response: IAAnalysisResponse
   ): boolean
   ```

4. **Fallback graceful:**
   - Si IA falla, usar heurística simple
   - Registrar error en Actividad

5. **Auditoría:**
   - Actividad.tipo = "sugerencia_ia"
   - Guardar prompt + respuesta

---

## 8. INTEGRACIÓN MyPOS

### ✔ Qué está bien

- **MyPOSPaymentEvent:** Estructura clara para webhook
- **clienteId + servicioId:** Vinculación correcta
- **Status enum:** Estados de pago bien definidos
- **Timestamp:** Auditoría de cuándo se pagó

### ⚠ Qué mejoraría

- **Sin entidad Pago:** No hay tabla para guardar pagos
- **Sin webhook handler:** No hay endpoint para recibir webhooks
- **Sin validación:** No se valida firma de webhook
- **Sin reintentos:** Si webhook falla, ¿se reintenta?
- **Sin reconciliación:** ¿Qué pasa si MyPOS y BD se desincronizar?

### ❌ Qué rehacería

Antes de conectar MyPOS:
1. **Crear entidad Pago** (ver punto 1)

2. **Endpoint webhook:**
   ```typescript
   // src/app/api/webhooks/mypos/route.ts
   POST /api/webhooks/mypos
   ```

3. **Validación de firma:**
   ```typescript
   function validarFirmaMyPOS(
     payload: string,
     signature: string,
     secret: string
   ): boolean
   ```

4. **Crear expediente automáticamente:**
   ```typescript
   // Cuando MyPOS envía "completed"
   // 1. Validar firma
   // 2. Crear Pago
   // 3. Crear Expediente (estado = PAGO_RECIBIDO)
   // 4. Enviar email a cliente
   ```

5. **Reintentos con exponential backoff:**
   - Si falla, guardar en cola
   - Reintentar cada 5, 10, 30 minutos

---

## 9. INTEGRACIÓN n8n

### ✔ Qué está bien

- **N8nWorkflowTrigger:** Eventos bien definidos
- **Tipos de triggers:** cambio_estado, expediente_creado, etc.
- **Datos flexibles:** Record<string, unknown> para payload

### ⚠ Qué mejoraría

- **Sin endpoint para triggers:** No hay forma de enviar eventos a n8n
- **Sin validación:** No se valida que n8n recibió el evento
- **Sin reintentos:** Si n8n está caído, ¿qué pasa?
- **Sin logging:** No hay registro de qué se envió a n8n
- **Sin transformación:** No hay mapeo de Expediente → N8nWorkflowTrigger

### ❌ Qué rehacería

Crear servicio n8n:
```typescript
// src/lib/n8n-service.ts
export async function dispararWorkflow(
  trigger: N8nWorkflowTrigger
): Promise<void>

// Llamar desde cambio de estado:
// await dispararWorkflow({
//   tipo: "cambio_estado",
//   expedienteId: exp.id,
//   datos: { estadoAnterior, estadoNuevo }
// })
```

Con reintentos, logging y validación.

---

## 10. ALIMENTAR OBSERVATORIO AUTOMÁTICAMENTE

### ✔ Qué está bien

- **ObservatorioData:** Estructura clara
- **inmuebleId + certificadoEnergeticoId:** Vinculación correcta
- **Datos flexibles:** Extensible para nuevos campos

### ⚠ Qué mejoraría

- **Sin trigger:** No hay evento que envíe datos a Observatorio
- **Sin sincronización:** ¿Cuándo se envían datos?
- **Sin validación:** ¿Qué datos son obligatorios?
- **Sin error handling:** Si Observatorio rechaza, ¿qué pasa?
- **Sin auditoría:** No se registra qué se envió

### ❌ Qué rehacería

Crear servicio Observatorio:
```typescript
// src/lib/observatorio-service.ts
export async function sincronizarInmueble(
  inmuebleId: string
): Promise<void>

// Llamar cuando:
// 1. Se crea Inmueble
// 2. Se actualiza certificadoEnergeticoId
// 3. Cada noche (batch)
```

Con validación, reintentos y auditoría.

---

## 11. ACOPLAMIENTO ENTRE COMPONENTES

### ✔ Qué está bien

- **Separación clara:** Types, lib, components en carpetas distintas
- **Componentes sin lógica:** EstadoBadge, ProgressBar son puros
- **Máquina de estados centralizada:** expediente-estados.ts
- **Integraciones aisladas:** integraciones.ts no toca Expediente

### ⚠ Qué mejoraría

- **Páginas acopladas a tipos:** `/plataforma/dashboard` importa de `types/expediente.ts`
- **Sin inyección de dependencias:** Componentes importan directamente
- **Sin interfaces de servicio:** No hay abstracción de BD
- **Sin eventos:** Cambios de estado no disparan eventos
- **Sin middleware:** No hay forma de interceptar cambios

### ❌ Qué rehacería

Reducir acoplamiento:
1. **Crear servicios:**
   ```typescript
   // src/lib/services/expediente-service.ts
   export interface IExpedienteService {
     obtener(id: string): Promise<Expediente>
     listar(query: ListarExpedientesQuery): Promise<ListarExpedientesResponse>
     cambiarEstado(id: string, nuevoEstado: EstadoExpediente): Promise<void>
   }
   ```

2. **Inyectar dependencias:**
   ```typescript
   // En componentes
   export default function Dashboard({
     expedienteService
   }: {
     expedienteService: IExpedienteService
   })
   ```

3. **Usar eventos:**
   ```typescript
   // Cuando cambia estado
   eventBus.emit("expediente:estado-cambiado", {
     expedienteId,
     estadoAnterior,
     estadoNuevo
   })
   ```

---

## 12. RIESGOS DE DEUDA TÉCNICA

### ✔ Qué está bien

- **Documentación:** CF-002 y IMPLEMENTACION-V1.1 bien hechas
- **TypeScript:** Strict mode previene muchos errores
- **Componentes reutilizables:** Evita duplicación

### ⚠ Qué mejoraría

- **Sin tests:** No hay tests unitarios ni de integración
- **Sin CI/CD:** No hay validación automática en PRs
- **Sin linting:** No hay ESLint configurado
- **Sin versionado de BD:** No hay migrations
- **Sin monitoreo:** No hay alertas de errores en producción

### ❌ Qué rehacería

Antes de producción:
1. **Tests:**
   - Unitarios: expediente-estados.ts
   - Integración: cambiar estado de expediente
   - E2E: flujo completo cliente

2. **CI/CD:**
   - GitHub Actions: lint, test, build
   - Bloquear merge si falla

3. **Migrations:**
   - Prisma o Supabase migrations
   - Versionado de esquema

4. **Monitoreo:**
   - Sentry para errores
   - DataDog para performance
   - Alertas en Slack

---

## 13. CÓDIGO DUPLICADO

### ✔ Qué está bien

- **Máquina de estados centralizada:** No hay duplicación de lógica de transiciones
- **Componentes reutilizables:** EstadoBadge, ProgressBar
- **DTOs centralizados:** Tipos en expediente.ts

### ⚠ Qué mejoraría

- **Etiquetas duplicadas:** etiquetasEstado en expediente-estados.ts
- **Colores duplicados:** coloresEstado en expediente-estados.ts
- **Validaciones duplicadas:** No hay validador centralizado
- **Transformaciones:** No hay mappers de Expediente → DTO

### ❌ Qué rehacería

Crear utilidades:
```typescript
// src/lib/expediente-utils.ts
export function obtenerEtiquetaEstado(estado: EstadoExpediente): string
export function obtenerColorEstado(estado: EstadoExpediente): string
export function expedienteADTO(exp: Expediente): ExpedienteDTO
export function validarExpediente(exp: Partial<Expediente>): ValidationError[]
```

---

## 14. SOLID

### ✔ Qué está bien

- **S (Single Responsibility):** EstadoBadge solo muestra estado
- **O (Open/Closed):** Máquina de estados extensible sin modificar
- **L (Liskov Substitution):** Interfaces bien definidas
- **I (Interface Segregation):** DTOs específicos por caso de uso
- **D (Dependency Inversion):** Integraciones.ts define interfaces

### ⚠ Qué mejoraría

- **Sin inyección de dependencias:** Componentes importan directamente
- **Sin interfaces de servicio:** No hay abstracción de implementación
- **Sin factory pattern:** No hay forma de crear instancias

### ❌ Qué rehacería

Implementar inyección de dependencias:
```typescript
// src/lib/di-container.ts
export class DIContainer {
  private services = new Map()
  
  register<T>(key: string, factory: () => T) {
    this.services.set(key, factory)
  }
  
  get<T>(key: string): T {
    return this.services.get(key)()
  }
}
```

---

## 15. CLEAN ARCHITECTURE

### ✔ Qué está bien

- **Entities:** Expediente, Cliente, etc. bien definidas
- **Use Cases:** Máquina de estados es un use case
- **Interface Adapters:** DTOs para APIs
- **Frameworks:** Next.js, React aislados

### ⚠ Qué mejoraría

- **Sin casos de uso explícitos:** No hay `src/use-cases/`
- **Sin repositorios:** No hay abstracción de BD
- **Sin presenters:** No hay transformación de datos para UI
- **Sin gateways:** No hay abstracción de integraciones

### ❌ Qué rehacería

Estructura Clean Architecture:
```
src/
├── entities/              # Expediente, Cliente, etc.
├── use-cases/             # CrearExpediente, CambiarEstado
├── interface-adapters/
│   ├── controllers/       # API endpoints
│   ├── presenters/        # Transformar para UI
│   └── gateways/          # Integraciones
├── frameworks/            # Next.js, React
└── lib/                   # Utilidades
```

---

## 16. PREPARACIÓN PARA FUTURAS APIs

### ✔ Qué está bien

- **DTOs bien definidos:** Request/Response tipados
- **Query params:** Paginación, filtros, ordenación
- **Versionado implícito:** Estructura permite v2 en futuro

### ⚠ Qué mejoraría

- **Sin especificación OpenAPI:** No hay swagger.json
- **Sin rate limiting:** No hay protección contra abuso
- **Sin autenticación:** No hay JWT o similar
- **Sin CORS:** No hay configuración de CORS
- **Sin validación de entrada:** No hay Zod o similar

### ❌ Qué rehacería

Antes de exponer APIs:
1. **OpenAPI/Swagger:**
   ```typescript
   // src/lib/openapi.ts
   export const openapi = {
     paths: {
       "/api/expedientes": {
         get: { ... }
       }
     }
   }
   ```

2. **Validación con Zod:**
   ```typescript
   export const CrearExpedienteSchema = z.object({
     clienteId: z.string().uuid(),
     inmuebleId: z.string().uuid(),
     servicioId: z.string().uuid(),
     prioridad: z.enum(["baja", "media", "alta", "urgente"]),
     fechaLimite: z.date()
   })
   ```

3. **Rate limiting:**
   - 100 requests/minuto por IP
   - 1000 requests/hora por usuario

4. **Autenticación:**
   - JWT con refresh tokens
   - Roles en token

---

## 17. SEGURIDAD

### ✔ Qué está bien

- **TypeScript strict:** Previene muchos errores
- **Enums:** Previene valores inválidos
- **Auditoría:** Actividad registra quién hizo qué
- **Roles:** Cliente, Técnico, Admin definidos

### ⚠ Qué mejoraría

- **Sin autenticación:** No hay login
- **Sin autorización:** No hay validación de permisos
- **Sin encriptación:** Datos sensibles en texto plano
- **Sin HTTPS:** No hay TLS
- **Sin CSRF:** No hay protección contra CSRF
- **Sin SQL injection:** Supabase protege, pero no hay validación

### ❌ Qué rehacería

Antes de producción:
1. **Autenticación:**
   - Supabase Auth o NextAuth
   - JWT con expiry

2. **Autorización:**
   ```typescript
   // src/lib/auth.ts
   export function requiereRol(rol: RolUsuario) {
     return (handler) => async (req) => {
       const usuario = await obtenerUsuario(req)
       if (usuario.rol !== rol) throw new UnauthorizedError()
       return handler(req)
     }
   }
   ```

3. **Encriptación:**
   - Campos sensibles con AES-256
   - Hashes para contraseñas

4. **HTTPS:**
   - Vercel fuerza HTTPS
   - HSTS headers

5. **CSRF:**
   - Tokens CSRF en formularios
   - SameSite cookies

6. **Validación:**
   - Zod para entrada
   - Sanitización de strings

---

## 18. RENDIMIENTO

### ✔ Qué está bien

- **Build rápido:** 20.9s compilación
- **TypeScript check:** 12.6s
- **Componentes ligeros:** EstadoBadge, ProgressBar sin lógica

### ⚠ Qué mejoraría

- **Sin caché:** Cada query toca BD
- **Sin índices:** Queries sin índices serán lentas
- **Sin lazy loading:** Componentes cargan todo
- **Sin compresión:** No hay gzip
- **Sin CDN:** Assets no están distribuidos

### ❌ Qué rehacería

Optimizaciones:
1. **Caché:**
   - Redis para expedientes activos
   - Browser cache con ETag

2. **Índices:**
   - (clienteId, estado, fechaCreacion)
   - (tecnicoAsignadoId, estado)

3. **Lazy loading:**
   - Componentes con React.lazy()
   - Rutas con dynamic imports

4. **Compresión:**
   - Vercel comprime automáticamente
   - Brotli para mejor ratio

5. **CDN:**
   - Vercel Edge Network
   - Cloudflare para assets

---

## 19. PERMISOS

### ✔ Qué está bien

- **Roles definidos:** Cliente, Técnico, Admin
- **Matriz de permisos:** Documentada en CF-002
- **Auditoría:** Actividad registra quién hizo qué

### ⚠ Qué mejoraría

- **Sin middleware de autorización:** No hay validación en endpoints
- **Sin granularidad:** No hay permisos por recurso
- **Sin delegación:** No hay forma de delegar permisos
- **Sin auditoría de acceso:** No se registra quién accedió a qué

### ❌ Qué rehacería

Sistema de permisos:
```typescript
// src/lib/permissions.ts
export const PERMISOS = {
  CLIENTE: {
    "expediente:ver-propio": true,
    "expediente:crear": false,
    "expediente:editar": false
  },
  TECNICO: {
    "expediente:ver-asignados": true,
    "expediente:cambiar-estado": true,
    "expediente:asignar": false
  },
  ADMIN: {
    "expediente:*": true
  }
}

export function tienePermiso(
  usuario: Usuario,
  permiso: string
): boolean
```

---

## 20. RIESGOS PARA PRODUCCIÓN

### ✔ Qué está bien

- **Build exitoso:** Sin errores de compilación
- **TypeScript:** Strict mode
- **Documentación:** Bien estructurada

### ⚠ Qué mejoraría

- **Sin tests:** Cero cobertura
- **Sin monitoreo:** Sin alertas de errores
- **Sin backups:** Sin estrategia de recuperación
- **Sin load testing:** No se sabe cuánta carga aguanta
- **Sin runbook:** Sin procedimientos de operación

### ❌ Qué rehacería

Antes de producción:
1. **Tests:**
   - 80%+ cobertura
   - Tests de integración
   - Tests E2E

2. **Monitoreo:**
   - Sentry para errores
   - DataDog para performance
   - Alertas en Slack

3. **Backups:**
   - Diarios de BD
   - Replicación a otra región
   - RTO/RPO definidos

4. **Load testing:**
   - k6 o JMeter
   - 1000 usuarios simultáneos
   - Identificar cuellos de botella

5. **Runbook:**
   - Procedimientos de deploy
   - Rollback plan
   - Escalada de incidentes

---

## PUNTUACIONES

| Aspecto | Puntuación | Justificación |
|---------|-----------|---------------|
| **Arquitectura** | 7/10 | Sólida pero le faltan entidades (Documento, Pago, Notificación) |
| **Escalabilidad** | 6/10 | Preparada para crecimiento pero sin índices ni caché |
| **Mantenibilidad** | 7/10 | Código limpio pero sin tests ni CI/CD |
| **Extensibilidad** | 8/10 | Bien preparada para integraciones (MyPOS, n8n, IA) |
| **Seguridad** | 5/10 | Estructura buena pero sin autenticación ni autorización |
| **Preparación IA** | 8/10 | Interfaces bien definidas, solo falta servicio |
| **Preparación SaaS** | 7/10 | Multi-tenancy posible pero no implementada |
| **Preparación Observatorio** | 7/10 | Interfaz clara, solo falta servicio de sincronización |
| **Preparación Automatización** | 7/10 | n8n listo, solo falta event bus |
| **Preparación Producción** | 4/10 | Código listo pero sin tests, monitoreo, backups |

---

## DECISIÓN FINAL

### ¿Empezarías la Épica 2 con esta arquitectura?

**RESPUESTA: SÍ, CON CONDICIONES**

### Justificación

**Razones para SÍ:**
1. ✅ Arquitectura sólida y bien documentada
2. ✅ TypeScript estricto previene errores
3. ✅ Máquina de estados centralizada y validada
4. ✅ Preparada para integraciones (MyPOS, n8n, IA, Observatorio)
5. ✅ Componentes reutilizables y sin acoplamiento
6. ✅ Build exitoso sin errores
7. ✅ Escalable a miles de expedientes con optimizaciones

**Razones para NO (sin condiciones):**
1. ❌ Faltan entidades críticas (Documento, Pago, Notificación)
2. ❌ Sin autenticación ni autorización
3. ❌ Sin tests (0% cobertura)
4. ❌ Sin monitoreo ni alertas
5. ❌ Sin CI/CD
6. ❌ Máquina de estados muy rígida (sin estados de error)

### Condiciones para proceder a Épica 2

**CRÍTICAS (bloquean Épica 2):**
1. ✅ Agregar entidad `Documento` (para archivos)
2. ✅ Agregar entidad `Pago` (para rastrear transacciones)
3. ✅ Extender máquina de estados (agregar RECHAZADO, CANCELADO)
4. ✅ Implementar autenticación (Supabase Auth)
5. ✅ Implementar autorización (middleware de permisos)

**IMPORTANTES (antes de producción):**
1. ⚠ Agregar tests (unitarios + integración)
2. ⚠ Configurar CI/CD (GitHub Actions)
3. ⚠ Implementar monitoreo (Sentry + DataDog)
4. ⚠ Definir índices de BD
5. ⚠ Crear servicios (ExpedienteService, etc.)

**RECOMENDADAS (antes de producción):**
1. ⚠ Implementar caché (Redis)
2. ⚠ Crear OpenAPI/Swagger
3. ⚠ Agregar validación (Zod)
4. ⚠ Implementar rate limiting
5. ⚠ Crear runbook de operaciones

### Recomendación

**Proceder a Épica 2 INMEDIATAMENTE** pero:
- Implementar las 5 condiciones CRÍTICAS en paralelo
- Hacer las IMPORTANTES antes de producción
- Las RECOMENDADAS pueden esperar a Épica 3

**Estimación:**
- Épica 2 (Lógica de expedientes): 2-3 semanas
- Condiciones CRÍTICAS: 1-2 semanas (paralelo)
- Condiciones IMPORTANTES: 2-3 semanas (antes de prod)

**Total antes de producción: 5-8 semanas**

---

**Auditor:** Software Architect  
**Fecha:** 29/06/2026  
**Veredicto:** ✅ APTO PARA ÉPICA 2 CON CONDICIONES

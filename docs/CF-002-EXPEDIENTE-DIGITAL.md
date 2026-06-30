# CF-002 — EXPEDIENTE DIGITAL

**Versión:** 1.0  
**Fecha:** 29/06/2026  
**Responsable:** Arquitectura Técnica Certilab  
**Estado:** Documento de diseño (sin implementación)

---

## 📋 Índice

1. [Visión general](#visión-general)
2. [Entidades](#entidades)
3. [Relaciones](#relaciones)
4. [Flujo de estados](#flujo-de-estados)
5. [Estados permitidos](#estados-permitidos)
6. [APIs requeridas](#apis-requeridas)
7. [Componentes UI](#componentes-ui)
8. [Rutas de la plataforma](#rutas-de-la-plataforma)
9. [Permisos y roles](#permisos-y-roles)
10. [Automatizaciones futuras](#automatizaciones-futuras)

---

## Visión General

La **Plataforma Certilab** es un sistema de gestión de expedientes digitales que comienza inmediatamente después del pago de un servicio.

**Objetivo principal:** Crear y gestionar expedientes (NO generar informes en esta fase).

**Usuarios:**
- **Cliente:** Accede a su expediente, ve estado y progreso
- **Técnico:** Gestiona expedientes asignados
- **Backoffice:** Administra todos los expedientes, filtros, búsqueda

---

## Entidades

### 1. Expediente

Entidad central del sistema.

```typescript
interface Expediente {
  // Identificación
  id: string;                    // UUID
  numeroExpediente: string;      // Ej: "EXP-2026-001234"
  
  // Relaciones
  clienteId: string;             // FK → Cliente
  inmuebleId: string;            // FK → Inmueble
  servicioId: string;            // FK → Servicio
  tecnicoAsignadoId?: string;    // FK → Usuario (técnico)
  
  // Estado
  estado: EstadoExpediente;      // Enum: ver sección Estados
  
  // Prioridad
  prioridad: "baja" | "media" | "alta" | "urgente";
  
  // Fechas
  fechaCreacion: Date;           // Cuando se crea el expediente
  fechaLimite: Date;             // Deadline del servicio
  fechaActualizacion: Date;      // Última modificación
  
  // Progreso
  progreso: number;              // 0-100 (%)
  
  // Metadata
  notas?: string;                // Notas internas
  tags?: string[];               // Etiquetas para búsqueda
  
  // Auditoría
  creadoPor: string;             // Usuario que creó
  actualizadoPor: string;        // Último usuario que modificó
}
```

### 2. Cliente

Usuario que compra un servicio.

```typescript
interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa?: string;
  
  // Dirección
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
  
  // Metadata
  fechaRegistro: Date;
  estado: "activo" | "inactivo" | "suspendido";
}
```

### 3. Inmueble

Propiedad sobre la que se realiza el servicio.

```typescript
interface Inmueble {
  id: string;
  clienteId: string;             // FK → Cliente
  
  // Identificación
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
  
  // Características
  tipoInmueble: "vivienda" | "local" | "oficina" | "industrial" | "otro";
  superficie: number;            // m²
  anoConstriccion?: number;
  
  // Certificado energético (si existe)
  certificadoEnergeticoId?: string;
  
  // Metadata
  notas?: string;
}
```

### 4. Servicio

Tipo de servicio contratado.

```typescript
interface Servicio {
  id: string;
  nombre: string;                // Ej: "Segunda Opinión"
  slug: string;                  // Ej: "segunda-opinion"
  descripcion: string;
  precio: number;
  
  // Configuración
  diasLimite: number;            // Plazo de entrega
  requiereInspeccion: boolean;
  requiereDocumentacion: boolean;
  
  // Metadata
  activo: boolean;
}
```

### 5. Usuario (Técnico)

Profesional que gestiona expedientes.

```typescript
interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: "tecnico" | "admin" | "cliente";
  
  // Credenciales profesionales
  numeroColegial?: string;       // Ej: CATEB 9457
  especialidad?: string;
  
  // Estado
  activo: boolean;
  
  // Metadata
  fechaRegistro: Date;
}
```

### 6. Actividad (Auditoría)

Registro de cambios en expedientes.

```typescript
interface Actividad {
  id: string;
  expedienteId: string;          // FK → Expediente
  usuarioId: string;             // FK → Usuario
  
  tipo: "creacion" | "cambio_estado" | "asignacion" | "comentario" | "documento";
  descripcion: string;
  
  // Cambios
  cambiosAnteriores?: Record<string, any>;
  cambiosNuevos?: Record<string, any>;
  
  // Metadata
  fechaCreacion: Date;
}
```

---

## Relaciones

```
Cliente (1) ──→ (N) Expediente
Cliente (1) ──→ (N) Inmueble

Inmueble (1) ──→ (N) Expediente

Servicio (1) ──→ (N) Expediente

Usuario (1) ──→ (N) Expediente (como técnico asignado)

Expediente (1) ──→ (N) Actividad
```

---

## Flujo de Estados

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUJO DE EXPEDIENTE                      │
└─────────────────────────────────────────────────────────────┘

1. PAGO RECIBIDO
   ↓
   [Sistema crea expediente automáticamente]
   ↓
2. EXPEDIENTE CREADO
   ↓
   [Cliente recibe notificación]
   ↓
3. ESPERANDO INFORMACIÓN
   ↓
   [Cliente completa inspección / envía documentos]
   ↓
4. INFORMACIÓN RECIBIDA
   ↓
   [Técnico revisa documentación]
   ↓
5. EN REVISIÓN
   ↓
   [Técnico analiza y prepara informe]
   ↓
6. INFORME ENVIADO
   ↓
   [Cliente recibe informe]
   ↓
7. CERRADO
   ↓
   [Expediente finalizado]
```

---

## Estados Permitidos

| Estado | Descripción | Quién puede cambiar | Siguiente estado |
|--------|-------------|-------------------|-----------------|
| **Pago recibido** | Se ha procesado el pago | Sistema | Expediente creado |
| **Expediente creado** | Expediente inicializado | Sistema | Esperando información |
| **Esperando información** | Aguardando datos del cliente | Técnico | Información recibida |
| **Información recibida** | Cliente ha enviado datos | Sistema | En revisión |
| **En revisión** | Técnico analiza | Técnico | Informe enviado |
| **Informe enviado** | Informe entregado al cliente | Técnico | Cerrado |
| **Cerrado** | Expediente finalizado | Técnico | (ninguno) |

---

## APIs Requeridas

### 1. Expedientes

#### GET /api/expedientes
Listar expedientes (con filtros y paginación).

```typescript
// Query params
{
  page?: number;
  limit?: number;
  estado?: EstadoExpediente;
  clienteId?: string;
  tecnicoId?: string;
  prioridad?: string;
  busqueda?: string;  // Busca en numeroExpediente, cliente, inmueble
  ordenar?: "fecha" | "prioridad" | "estado";
  direccion?: "asc" | "desc";
}

// Response
{
  data: Expediente[];
  total: number;
  pagina: number;
  totalPaginas: number;
}
```

#### POST /api/expedientes
Crear expediente (automático tras pago).

```typescript
{
  clienteId: string;
  inmuebleId: string;
  servicioId: string;
  prioridad: string;
  fechaLimite: Date;
}
```

#### GET /api/expedientes/:id
Obtener expediente por ID.

#### PATCH /api/expedientes/:id
Actualizar expediente.

```typescript
{
  estado?: EstadoExpediente;
  tecnicoAsignadoId?: string;
  prioridad?: string;
  progreso?: number;
  notas?: string;
}
```

#### GET /api/expedientes/:id/actividad
Obtener historial de cambios.

### 2. Clientes

#### GET /api/clientes
Listar clientes.

#### POST /api/clientes
Crear cliente.

#### GET /api/clientes/:id/expedientes
Expedientes de un cliente.

### 3. Inmuebles

#### GET /api/inmuebles
Listar inmuebles.

#### POST /api/inmuebles
Crear inmueble.

### 4. Usuarios

#### GET /api/usuarios
Listar usuarios (técnicos).

#### POST /api/usuarios
Crear usuario.

---

## Componentes UI

### Cliente (Área privada)

#### 1. Dashboard Cliente
- Número de expediente
- Estado actual
- Barra de progreso (0-100%)
- Botón: "Completar inspección"
- Historial de cambios (timeline)

#### 2. Detalle Expediente (Cliente)
- Información del inmueble
- Servicio contratado
- Fechas (creación, límite)
- Estado actual
- Botón: "Enviar documentación"
- Botón: "Descargar informe" (si estado = Informe enviado)

### Backoffice (Área técnica)

#### 1. Dashboard Backoffice
- Resumen: expedientes por estado
- Gráfico: expedientes por prioridad
- Expedientes próximos a vencer
- Técnicos con más carga

#### 2. Lista de Expedientes
- Tabla con columnas:
  - Número expediente
  - Cliente
  - Inmueble
  - Servicio
  - Estado (badge con color)
  - Prioridad
  - Técnico asignado
  - Fecha límite
  - Progreso (barra)
- Acciones: Ver, Editar, Asignar, Cambiar estado

#### 3. Filtros
- Por estado
- Por prioridad
- Por técnico
- Por rango de fechas
- Búsqueda por número, cliente, inmueble

#### 4. Ordenación
- Por fecha creación
- Por fecha límite
- Por prioridad
- Por estado

#### 5. Detalle Expediente (Backoffice)
- Información completa
- Cambiar estado
- Asignar técnico
- Editar prioridad
- Agregar notas
- Ver historial de cambios
- Botón: "Enviar informe"

---

## Rutas de la Plataforma

```
/plataforma
├── /dashboard                    # Dashboard principal
├── /mis-expedientes              # Lista de expedientes del cliente
├── /expedientes/:id              # Detalle expediente
├── /nuevo-expediente             # Crear expediente (admin)
├── /configuracion                # Configuración de cuenta
│
├── /backoffice                   # Área técnica
│   ├── /expedientes              # Lista completa
│   ├── /expedientes/:id          # Detalle + edición
│   ├── /clientes                 # Gestión de clientes
│   ├── /inmuebles                # Gestión de inmuebles
│   ├── /usuarios                 # Gestión de técnicos
│   ├── /reportes                 # Reportes (futuro)
│   └── /configuracion            # Configuración del sistema
│
└── /cliente                      # Área cliente (estructura)
    ├── /expediente/:id           # Ver expediente
    ├── /documentos               # Subir documentos
    └── /descargas                # Descargar informe
```

---

## Permisos y Roles

### Cliente
- ✅ Ver su expediente
- ✅ Ver estado y progreso
- ✅ Subir documentación
- ✅ Descargar informe (cuando esté disponible)
- ❌ Ver otros expedientes
- ❌ Cambiar estado
- ❌ Asignar técnico

### Técnico
- ✅ Ver todos los expedientes
- ✅ Cambiar estado
- ✅ Asignar expedientes
- ✅ Editar prioridad
- ✅ Agregar notas
- ✅ Generar informe
- ✅ Ver historial
- ❌ Eliminar expedientes
- ❌ Crear usuarios

### Admin
- ✅ Acceso total
- ✅ Crear/editar usuarios
- ✅ Crear/editar clientes
- ✅ Crear/editar servicios
- ✅ Ver reportes
- ✅ Configurar sistema

---

## Automatizaciones Futuras

### 1. Integración MyPOS
- Webhook: Pago recibido → Crear expediente automáticamente
- Webhook: Pago rechazado → Notificar cliente

### 2. Integración n8n
- Workflow: Cambio de estado → Enviar email al cliente
- Workflow: Expediente próximo a vencer → Notificar técnico
- Workflow: Informe enviado → Enviar WhatsApp al cliente

### 3. Integración Supabase
- Base de datos PostgreSQL para expedientes
- Autenticación con Supabase Auth
- Realtime: Cambios en expedientes (para dashboard en vivo)

### 4. Integración Observatorio
- Sincronizar datos de expedientes con Observatorio
- Reportes automáticos de eficiencia energética

### 5. Integración IA
- Análisis automático de documentación
- Sugerencias de estado siguiente
- Generación de resúmenes de expedientes

---

## Notas de Implementación

### Principios SOLID
- **S**ingle Responsibility: Cada componente una responsabilidad
- **O**pen/Closed: Abierto a extensión, cerrado a modificación
- **L**iskov Substitution: Interfaces consistentes
- **I**nterface Segregation: Interfaces específicas
- **D**ependency Inversion: Inyección de dependencias

### Clean Architecture
- **Entities**: Expediente, Cliente, Inmueble, Servicio, Usuario
- **Use Cases**: CrearExpediente, CambiarEstado, ListarExpedientes
- **Interface Adapters**: Controllers, Presenters, Gateways
- **Frameworks**: Next.js, Supabase, n8n

### TypeScript Estricto
- `strict: true` en tsconfig.json
- Tipos explícitos en todas las funciones
- No usar `any`
- Validación en runtime con Zod o similar

### Componentes Reutilizables
- `<EstadoBadge estado={estado} />`
- `<ProgressBar progreso={progreso} />`
- `<PrioridadBadge prioridad={prioridad} />`
- `<FechaFormato fecha={fecha} />`
- `<TablaPaginada datos={datos} />`

---

## Checklist de Validación

- [ ] Entidades definidas en TypeScript
- [ ] Relaciones mapeadas en base de datos
- [ ] Estados y transiciones validadas
- [ ] APIs documentadas con ejemplos
- [ ] Componentes UI diseñados
- [ ] Rutas definidas
- [ ] Permisos implementados
- [ ] Automatizaciones planificadas
- [ ] Integración con MyPOS lista
- [ ] Integración con n8n lista
- [ ] Integración con Supabase lista

---

**Próximo paso:** FASE 2 — Crear infraestructura base `/plataforma`

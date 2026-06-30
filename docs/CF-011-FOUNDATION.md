# CF-011 — FOUNDATION ARCHITECTURE

**Versión:** 1.0  
**Fecha:** 29/06/2026  
**Responsable:** Arquitectura Técnica Certilab  
**Estado:** Documento de diseño final (sin implementación)

---

## 📋 Índice

1. [Visión general](#visión-general)
2. [Entidades](#entidades)
3. [Relaciones](#relaciones)
4. [Autenticación](#autenticación)
5. [Autorización](#autorización)
6. [Máquina de estados](#máquina-de-estados)
7. [Sistema de eventos](#sistema-de-eventos)
8. [Auditoría](#auditoría)
9. [Versionado](#versionado)
10. [Almacenamiento](#almacenamiento)

---

## Visión General

La **Arquitectura Foundation** es el núcleo definitivo de la Plataforma Certilab. No volverá a modificarse durante las siguientes versiones. Todo lo nuevo se apoyará sobre este núcleo.

**Principios:**
- ✅ Arquitectura cerrada y estable
- ✅ Sin acoplamiento a proveedores externos
- ✅ Preparada para escalar a millones de expedientes
- ✅ Auditoría completa de todas las operaciones
- ✅ Eventos para integración con sistemas externos

---

## Entidades

### 1. Expediente (existente, mejorado)

```typescript
interface Expediente {
  // Identificación
  id: string;
  numeroExpediente: string;
  
  // Relaciones
  clienteId: string;
  inmuebleId: string;
  servicioId: string;
  tecnicoAsignadoId?: string;
  
  // Estado
  estado: EstadoExpediente;
  
  // Prioridad
  prioridad: Prioridad;
  
  // Fechas
  fechaCreacion: Date;
  fechaLimite: Date;
  fechaActualizacion: Date;
  
  // Progreso
  progreso: number; // 0-100
  
  // Metadata
  notas?: string;
  tags?: string[];
  
  // Auditoría
  creadoPor: string;
  actualizadoPor: string;
  
  // Versionado
  version: number;
  deletedAt?: Date; // Soft delete
}
```

### 2. Documento (NUEVA)

Entidad independiente para gestionar archivos.

```typescript
interface Documento {
  // Identificación
  id: string;
  expedienteId: string;
  
  // Tipo de documento
  tipo: TipoDocumento;
  
  // Información
  nombre: string;
  descripcion?: string;
  
  // Archivo
  url: string; // Ruta en storage (sin dominio)
  tamaño: number; // bytes
  mimeType: string;
  hash: string; // SHA-256 para integridad
  
  // Estado
  estado: EstadoDocumento;
  
  // Metadata
  creadoPor: string;
  fechaCreacion: Date;
  
  // Versionado
  version: number;
  documentoPadreId?: string; // Para versiones anteriores
  
  // Observaciones
  observaciones?: string;
  
  // Auditoría
  deletedAt?: Date; // Soft delete
}

enum TipoDocumento {
  CERTIFICADO_ENERGETICO = "certificado_energetico",
  IMAGEN = "imagen",
  CE3X = "ce3x",
  FACTURA = "factura",
  PLANO = "plano",
  FOTOGRAFIA = "fotografia",
  INFORME = "informe",
  OTRO = "otro"
}

enum EstadoDocumento {
  PENDIENTE = "pendiente",
  PROCESANDO = "procesando",
  DISPONIBLE = "disponible",
  RECHAZADO = "rechazado",
  ARCHIVADO = "archivado"
}
```

### 3. Pago (NUEVA)

Entidad independiente para rastrear transacciones.

```typescript
interface Pago {
  // Identificación
  id: string;
  
  // Relaciones
  expedienteId: string;
  clienteId: string;
  servicioId: string;
  
  // Información de pago
  importe: number; // cents
  moneda: string; // "EUR"
  
  // Estado
  estado: EstadoPago;
  
  // Método y proveedor
  metodo: MetodoPago;
  proveedor: ProveedorPago;
  
  // Referencias
  referenciaExterna: string; // ID de MyPOS, Stripe, etc.
  
  // Factura
  facturaUrl?: string;
  numeroFactura?: string;
  
  // Reembolso
  reembolsoId?: string;
  montoReembolsado?: number;
  
  // Fechas
  fechaCreacion: Date;
  fechaPago?: Date;
  
  // Auditoría
  creadoPor: string;
  actualizadoPor: string;
  deletedAt?: Date;
}

enum EstadoPago {
  PENDIENTE = "pendiente",
  PROCESANDO = "procesando",
  COMPLETADO = "completado",
  FALLIDO = "fallido",
  REEMBOLSADO = "reembolsado",
  CANCELADO = "cancelado"
}

enum MetodoPago {
  TARJETA = "tarjeta",
  TRANSFERENCIA = "transferencia",
  PAYPAL = "paypal",
  OTRO = "otro"
}

enum ProveedorPago {
  MYPOS = "mypos",
  STRIPE = "stripe",
  PAYPAL = "paypal",
  MANUAL = "manual"
}
```

### 4. Cliente (existente)

Sin cambios.

### 5. Inmueble (existente)

Sin cambios.

### 6. Servicio (existente)

Sin cambios.

### 7. Usuario (existente, mejorado)

```typescript
interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: RolUsuario;
  
  // Credenciales profesionales
  numeroColegial?: string;
  especialidad?: string;
  
  // Estado
  activo: boolean;
  
  // Metadata
  fechaRegistro: Date;
  
  // Auditoría
  deletedAt?: Date;
}

enum RolUsuario {
  ADMINISTRADOR = "administrador",
  ARQUITECTO_TECNICO = "arquitecto_tecnico",
  ADMINISTRATIVO = "administrativo",
  CLIENTE = "cliente"
}
```

### 8. Actividad (existente, mejorado)

```typescript
interface Actividad {
  id: string;
  expedienteId: string;
  usuarioId: string;
  
  // Tipo de actividad
  tipo: TipoActividad;
  descripcion: string;
  
  // Cambios
  cambiosAnteriores?: Record<string, unknown>;
  cambiosNuevos?: Record<string, unknown>;
  
  // Contexto
  ipAddress?: string;
  userAgent?: string;
  
  // Metadata
  fechaCreacion: Date;
}

enum TipoActividad {
  CREACION = "creacion",
  CAMBIO_ESTADO = "cambio_estado",
  ASIGNACION = "asignacion",
  COMENTARIO = "comentario",
  DOCUMENTO_SUBIDO = "documento_subido",
  PAGO_RECIBIDO = "pago_recibido",
  USUARIO_ASIGNADO = "usuario_asignado",
  INFORME_GENERADO = "informe_generado"
}
```

---

## Relaciones

```
Cliente (1) ──→ (N) Inmueble
Cliente (1) ──→ (N) Expediente
Inmueble (1) ──→ (N) Expediente
Servicio (1) ──→ (N) Expediente
Usuario (1) ──→ (N) Expediente (tecnicoAsignado)
Expediente (1) ──→ (N) Documento
Expediente (1) ──→ (N) Pago
Expediente (1) ──→ (N) Actividad
Usuario (1) ──→ (N) Actividad
```

---

## Autenticación

### Proveedor: Supabase Auth

**Configuración:**
- Email + contraseña
- Sin login social (por ahora)
- JWT con expiry de 1 hora
- Refresh token con expiry de 7 días

**Flujo:**
1. Usuario ingresa email + contraseña
2. Supabase valida y devuelve JWT
3. JWT se almacena en httpOnly cookie
4. Cada request incluye JWT en header Authorization

**Roles en JWT:**
```typescript
interface JWTPayload {
  sub: string; // user_id
  email: string;
  rol: RolUsuario;
  iat: number;
  exp: number;
}
```

---

## Autorización

### Middleware centralizado

```typescript
// src/lib/auth/middleware.ts
export function requiereAutenticacion(
  handler: NextApiHandler
): NextApiHandler

export function requiereRol(
  rolesPermitidos: RolUsuario[]
): (handler: NextApiHandler) => NextApiHandler

export function requierePermiso(
  permiso: string
): (handler: NextApiHandler) => NextApiHandler
```

### Matriz de permisos

```typescript
// src/lib/auth/permisos.ts
export const PERMISOS = {
  [RolUsuario.ADMINISTRADOR]: {
    "expediente:crear": true,
    "expediente:editar": true,
    "expediente:eliminar": true,
    "expediente:ver-todos": true,
    "usuario:crear": true,
    "usuario:editar": true,
    "usuario:eliminar": true,
    "documento:descargar": true,
    "pago:ver": true,
    "pago:reembolsar": true
  },
  [RolUsuario.ARQUITECTO_TECNICO]: {
    "expediente:ver-asignados": true,
    "expediente:cambiar-estado": true,
    "documento:subir": true,
    "documento:descargar": true
  },
  [RolUsuario.ADMINISTRATIVO]: {
    "expediente:ver-todos": true,
    "expediente:editar": true,
    "usuario:crear": true,
    "pago:ver": true
  },
  [RolUsuario.CLIENTE]: {
    "expediente:ver-propio": true,
    "documento:descargar": true
  }
}
```

---

## Máquina de Estados

### Estados (13 total)

```typescript
enum EstadoExpediente {
  // Iniciales
  PAGO_PENDIENTE = "pago_pendiente",
  PAGO_RECIBIDO = "pago_recibido",
  
  // Creación
  EXPEDIENTE_CREADO = "expediente_creado",
  
  // Información
  ESPERANDO_INFORMACION = "esperando_informacion",
  PENDIENTE_DOCUMENTACION = "pendiente_documentacion",
  PENDIENTE_CLIENTE = "pendiente_cliente",
  INFORMACION_RECIBIDA = "informacion_recibida",
  
  // Revisión
  EN_REVISION = "en_revision",
  
  // Finalización
  INFORME_ENVIADO = "informe_enviado",
  CERRADO = "cerrado",
  
  // Excepciones
  RECHAZADO = "rechazado",
  CANCELADO = "cancelado",
  BLOQUEADO = "bloqueado"
}
```

### Transiciones válidas

```typescript
export const transicionesValidas: Record<EstadoExpediente, EstadoExpediente[]> = {
  [EstadoExpediente.PAGO_PENDIENTE]: [
    EstadoExpediente.PAGO_RECIBIDO,
    EstadoExpediente.CANCELADO
  ],
  
  [EstadoExpediente.PAGO_RECIBIDO]: [
    EstadoExpediente.EXPEDIENTE_CREADO,
    EstadoExpediente.CANCELADO
  ],
  
  [EstadoExpediente.EXPEDIENTE_CREADO]: [
    EstadoExpediente.ESPERANDO_INFORMACION,
    EstadoExpediente.CANCELADO
  ],
  
  [EstadoExpediente.ESPERANDO_INFORMACION]: [
    EstadoExpediente.PENDIENTE_DOCUMENTACION,
    EstadoExpediente.PENDIENTE_CLIENTE,
    EstadoExpediente.INFORMACION_RECIBIDA,
    EstadoExpediente.CANCELADO
  ],
  
  [EstadoExpediente.PENDIENTE_DOCUMENTACION]: [
    EstadoExpediente.INFORMACION_RECIBIDA,
    EstadoExpediente.CANCELADO
  ],
  
  [EstadoExpediente.PENDIENTE_CLIENTE]: [
    EstadoExpediente.INFORMACION_RECIBIDA,
    EstadoExpediente.CANCELADO
  ],
  
  [EstadoExpediente.INFORMACION_RECIBIDA]: [
    EstadoExpediente.EN_REVISION,
    EstadoExpediente.RECHAZADO,
    EstadoExpediente.CANCELADO
  ],
  
  [EstadoExpediente.EN_REVISION]: [
    EstadoExpediente.INFORME_ENVIADO,
    EstadoExpediente.ESPERANDO_INFORMACION,
    EstadoExpediente.RECHAZADO,
    EstadoExpediente.CANCELADO
  ],
  
  [EstadoExpediente.INFORME_ENVIADO]: [
    EstadoExpediente.CERRADO,
    EstadoExpediente.CANCELADO
  ],
  
  [EstadoExpediente.CERRADO]: [],
  [EstadoExpediente.RECHAZADO]: [EstadoExpediente.CANCELADO],
  [EstadoExpediente.CANCELADO]: [],
  [EstadoExpediente.BLOQUEADO]: [EstadoExpediente.EXPEDIENTE_CREADO]
}
```

---

## Sistema de Eventos

### Eventos (nunca se modifican, solo se agregan)

```typescript
enum TipoEvento {
  // Expediente
  EXPEDIENTE_CREADO = "expediente:creado",
  EXPEDIENTE_ESTADO_CAMBIADO = "expediente:estado-cambiado",
  EXPEDIENTE_CANCELADO = "expediente:cancelado",
  EXPEDIENTE_RECHAZADO = "expediente:rechazado",
  
  // Documento
  DOCUMENTO_SUBIDO = "documento:subido",
  DOCUMENTO_ELIMINADO = "documento:eliminado",
  
  // Pago
  PAGO_RECIBIDO = "pago:recibido",
  PAGO_FALLIDO = "pago:fallido",
  PAGO_REEMBOLSADO = "pago:reembolsado",
  
  // Usuario
  USUARIO_ASIGNADO = "usuario:asignado",
  USUARIO_DESASIGNADO = "usuario:desasignado",
  
  // Informe
  INFORME_GENERADO = "informe:generado",
  INFORME_ENVIADO = "informe:enviado"
}

interface Evento {
  id: string;
  tipo: TipoEvento;
  expedienteId: string;
  datos: Record<string, unknown>;
  timestamp: Date;
  usuarioId: string;
  ipAddress?: string;
}
```

### Publicadores de eventos

```typescript
// src/lib/events/event-bus.ts
export class EventBus {
  async publicar(evento: Evento): Promise<void>
  suscribir(tipo: TipoEvento, handler: (evento: Evento) => Promise<void>): void
}

// Uso:
await eventBus.publicar({
  tipo: TipoEvento.EXPEDIENTE_ESTADO_CAMBIADO,
  expedienteId: exp.id,
  datos: { estadoAnterior, estadoNuevo },
  timestamp: new Date(),
  usuarioId: usuario.id
})
```

---

## Auditoría

### Registro de auditoría

Cada cambio en Expediente, Documento, Pago genera una Actividad:

```typescript
interface Actividad {
  id: string;
  expedienteId: string;
  usuarioId: string;
  tipo: TipoActividad;
  descripcion: string;
  cambiosAnteriores?: Record<string, unknown>;
  cambiosNuevos?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  fechaCreacion: Date;
}
```

### Información capturada

- **Quién:** usuarioId
- **Qué:** tipo + descripcion + cambios
- **Cuándo:** fechaCreacion
- **Desde dónde:** ipAddress + userAgent

### No mostrar en UI (por ahora)

La auditoría se registra pero no se muestra en la interfaz. Será visible en futuras versiones.

---

## Versionado

### Documentos

```typescript
interface Documento {
  version: number; // 1, 2, 3...
  documentoPadreId?: string; // Referencia a versión anterior
}
```

**Flujo:**
1. Usuario sube documento v1
2. Usuario sube documento v2 (nuevo documento con documentoPadreId = v1.id)
3. Historial disponible para auditoría

### Expedientes

```typescript
interface Expediente {
  version: number; // Incrementa con cada cambio
}
```

**Flujo:**
1. Expediente creado (version = 1)
2. Cambio de estado (version = 2)
3. Historial en Actividad

### Informes

Preparado para futuro:
```typescript
interface Informe {
  id: string;
  expedienteId: string;
  version: number;
  informePadreId?: string;
  contenido: string;
  fechaCreacion: Date;
}
```

---

## Almacenamiento

### Interfaz de storage (sin acoplamiento)

```typescript
// src/lib/storage/storage-interface.ts
export interface IStorageProvider {
  subir(
    archivo: File,
    ruta: string
  ): Promise<{ url: string; hash: string }>
  
  descargar(ruta: string): Promise<Buffer>
  
  eliminar(ruta: string): Promise<void>
  
  existe(ruta: string): Promise<boolean>
}
```

### Implementaciones (futuro)

```typescript
// src/lib/storage/supabase-storage.ts
export class SupabaseStorage implements IStorageProvider { ... }

// src/lib/storage/s3-storage.ts
export class S3Storage implements IStorageProvider { ... }

// src/lib/storage/cloudflare-r2-storage.ts
export class CloudflareR2Storage implements IStorageProvider { ... }
```

### Configuración

```typescript
// src/lib/storage/index.ts
export const storage: IStorageProvider = 
  process.env.STORAGE_PROVIDER === "s3"
    ? new S3Storage()
    : process.env.STORAGE_PROVIDER === "r2"
    ? new CloudflareR2Storage()
    : new SupabaseStorage()
```

### Estructura de rutas

```
/documentos/{expedienteId}/{documentoId}/v{version}/{nombre}
/informes/{expedienteId}/v{version}/{nombre}
/facturas/{pagoId}/{numeroFactura}
```

---

## Resumen de cambios

| Aspecto | Antes | Después |
|---------|-------|---------|
| Entidades | 6 | 8 (+ Documento, Pago) |
| Estados | 7 | 13 |
| Autenticación | No | Supabase Auth |
| Autorización | No | Middleware centralizado |
| Eventos | No | Event Bus |
| Auditoría | Básica | Completa (quién, qué, cuándo, dónde) |
| Versionado | No | Sí (documentos, expedientes, informes) |
| Storage | No | Interfaz agnóstica |

---

**Responsable:** Arquitectura Técnica Certilab  
**Fecha:** 29/06/2026  
**Versión:** 1.0  
**Estado:** Documento de diseño final

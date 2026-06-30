/**
 * TIPOS PARA LA PLATAFORMA CERTILAB
 * Entidades principales del sistema de gestión de expedientes
 */

// Estados permitidos para un expediente (13 total)
export enum EstadoExpediente {
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
  BLOQUEADO = "bloqueado",
}

// Niveles de prioridad
export enum Prioridad {
  BAJA = "baja",
  MEDIA = "media",
  ALTA = "alta",
  URGENTE = "urgente",
}

// Roles de usuario
export enum RolUsuario {
  ADMINISTRADOR = "administrador",
  ARQUITECTO_TECNICO = "arquitecto_tecnico",
  ADMINISTRATIVO = "administrativo",
  CLIENTE = "cliente",
}

// Estados de usuario
export enum EstadoUsuario {
  ACTIVO = "activo",
  INACTIVO = "inactivo",
  SUSPENDIDO = "suspendido",
}

// Tipos de inmueble
export enum TipoInmueble {
  VIVIENDA = "vivienda",
  LOCAL = "local",
  OFICINA = "oficina",
  INDUSTRIAL = "industrial",
  OTRO = "otro",
}

/**
 * ENTIDAD: Expediente
 * Entidad central del sistema
 */
export interface Expediente {
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
}

/**
 * ENTIDAD: Cliente
 * Usuario que compra un servicio
 */
export interface Cliente {
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
  estado: EstadoUsuario;
}

/**
 * ENTIDAD: Inmueble
 * Propiedad sobre la que se realiza el servicio
 */
export interface Inmueble {
  id: string;
  clienteId: string;

  // Identificación
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;

  // Características
  tipoInmueble: TipoInmueble;
  superficie: number; // m²
  anoConstriccion?: number;

  // Certificado energético
  certificadoEnergeticoId?: string;

  // Metadata
  notas?: string;
}

/**
 * ENTIDAD: Servicio
 * Tipo de servicio contratado
 */
export interface Servicio {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  precio: number;

  // Configuración
  diasLimite: number;
  requiereInspeccion: boolean;
  requiereDocumentacion: boolean;

  // Metadata
  activo: boolean;
}

/**
 * ENTIDAD: Usuario
 * Profesional que gestiona expedientes
 */
export interface Usuario {
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
}

/**
 * ENTIDAD: Actividad
 * Registro de cambios en expedientes (auditoría)
 */
export interface Actividad {
  id: string;
  expedienteId: string;
  usuarioId: string;

  tipo: "creacion" | "cambio_estado" | "asignacion" | "comentario" | "documento";
  descripcion: string;

  // Cambios
  cambiosAnteriores?: Record<string, unknown>;
  cambiosNuevos?: Record<string, unknown>;

  // Metadata
  fechaCreacion: Date;
}

/**
 * DTOs para APIs
 */

// Request para crear expediente
export interface CrearExpedienteRequest {
  clienteId: string;
  inmuebleId: string;
  servicioId: string;
  prioridad: Prioridad;
  fechaLimite: Date;
}

// Response para listar expedientes
export interface ListarExpedientesResponse {
  data: Expediente[];
  total: number;
  pagina: number;
  totalPaginas: number;
}

// Query params para listar expedientes
export interface ListarExpedientesQuery {
  page?: number;
  limit?: number;
  estado?: EstadoExpediente;
  clienteId?: string;
  tecnicoId?: string;
  prioridad?: Prioridad;
  busqueda?: string;
  ordenar?: "fecha" | "prioridad" | "estado";
  direccion?: "asc" | "desc";
}

// Request para actualizar expediente
export interface ActualizarExpedienteRequest {
  estado?: EstadoExpediente;
  tecnicoAsignadoId?: string;
  prioridad?: Prioridad;
  progreso?: number;
  notas?: string;
}

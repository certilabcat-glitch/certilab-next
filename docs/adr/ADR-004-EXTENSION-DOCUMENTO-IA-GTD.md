# ADR-004 — Extensión de Documento IA para Gestión Técnica Documental

| Campo | Valor |
|-------|-------|
| **Código** | ADR-004 |
| **Título** | Extensión del agregado Documento IA para soportar Gestión Técnica Documental (GTD) |
| **Estado** | 📋 PROPUESTA — Pendiente de aprobación |
| **Fecha** | 2026-07-06 |
| **Autores** | Arquitectura — Product |
| **Precedencia** | ADR-003 (GTD como línea de negocio), EP-102 (Análisis GTD) |
| **Impacto** | Core V1 — Documento IA, tipos, repositorio, servicio, migraciones |

---

## Contexto

La línea de negocio **GTD — Gestión Técnica Documental** requiere que el agregado Documento IA soporte la obtención, organización y verificación de documentación técnica de inmuebles. Esto va más allá del uso actual de Documento IA en ATI, donde se usa para almacenar documentos subidos por el cliente o generados por el sistema (dictámenes, correcciones).

El análisis EP-102 identifica que la extensión de Documento IA es necesaria para que GTD pueda:

1. **Categorizar documentos** según tipologías documentales (cédula, certificado, escritura, nota simple, etc.)
2. **Gestionar el origen del documento** (subido por cliente, obtenido de organismo oficial, generado por sistema)
3. **Soportar estados documentales** propios de GTD (pendiente de obtención, obtenido, verificado, caducado)
4. **Asociar metadatos específicos** por tipo de documento (fecha de emisión, organismo emisor, fecha de caducidad)

---

## Decisión

**Se aprueba la extensión controlada del agregado Documento IA** para soportar GTD mediante los siguientes cambios mínimos:

### 1. Nuevos tipos de documento (`document_type`)

Se añaden los siguientes valores al enum existente de `document_type`:

| Tipo GTD | Descripción |
|----------|-------------|
| `cedula_habitabilidad` | Cédula de Habitabilidad / Primera Ocupación |
| `escritura_propiedad` | Escritura de propiedad / nota registral |
| `nota_simple` | Nota Simple del Registro de la Propiedad |
| `certificado_energetico` | Certificado de Eficiencia Energética (también usado en ATI) |
| `certificado_antiguedad` | Certificado de antigüedad / vida del edificio |
| `certificado_instalacion_electrica` | BOE / ITC BT-05 |
| `certificado_gas` | Certificado de instalación de gas |
| `licencia_obras` | Licencia de obras / primera ocupación |
| `libro_edificio` | Libro del Edificio (si existe) |
| `registro_propiedad_horizontal` | Nota registral de propiedad horizontal |
| `seguro_hogar` | Póliza de seguro del hogar |
| `recibo_ibi` | Recibo del IBI / impuesto de bienes inmuebles |
| `certificado_deuda_comunidad` | Certificado de estar al corriente de pago con la comunidad |

### 2. Nuevo campo: `document_origin`

Se añade un campo opcional `document_origin` con los siguientes valores:

| Origen | Descripción |
|--------|-------------|
| `client_upload` | Subido por el cliente a través de la plataforma |
| `official_agency` | Obtenido de organismo oficial mediante consulta autorizada |
| `system_generated` | Generado por el sistema (dictamen, informe) |
| `professional_addition` | Añadido por un profesional (AT, gestor) |

### 3. Nuevos estados GTD (`document_status`)

Se añaden estados específicos para el flujo GTD:

| Estado | Descripción |
|--------|-------------|
| `pending_obtention` | Pendiente de obtener el documento |
| `obtaining` | En proceso de obtención (consulta a organismo) |
| `obtained` | Obtenido y disponible |
| `verified` | Verificado por profesional |
| `expired` | Caducado (requiere renovación) |
| `rejected` | Rechazado (no válido, incorrecto) |

### 4. Nuevo campo opcional: `document_metadata`

Campo JSONB con metadatos específicos por tipo de documento:

```typescript
type DocumentMetadata = {
  // Para documentos con fecha de emisión
  emission_date?: string // ISO 8601
  issuing_agency?: string // Nombre del organismo emisor
  expiration_date?: string // ISO 8601
  
  // Para documentos registrales
  registration_number?: string
  registry_office?: string // Nombre del registro
  
  // Para certificados
  certificate_number?: string
  technician_name?: string
  technician_collegiate?: string
  
  // Metadatos de obtención
  obtention_method?: 'api' | 'scraping' | 'manual'
  obtention_date?: string // ISO 8601
  obtention_cost?: number // Coste en euros
}
```

### 5. Sin cambios en la estructura del agregado

No se modifican:
- **Aggregate Root:** Sigue siendo `DocumentoIA`.
- **Repositorio:** Se extiende con nuevos métodos de consulta, pero no se reestructura.
- **Servicio:** Se añaden nuevos métodos específicos GTD, pero no se modifica la lógica ATI existente.
- **Eventos del dominio:** Los eventos actuales se mantienen. Se añaden eventos GTD como extensiones.

---

## Consecuencias

### Positivas

- **Mínimo impacto en ATI:** Los cambios son aditivos (nuevos campos opcionales, nuevos tipos). Ningún cambio existente se modifica.
- **Reutilización completa:** GTD no necesita un nuevo agregado. Documento IA se adapta con campos opcionales.
- **Migración sencilla:** Los nuevos campos tienen valores por defecto. No requiere migración de datos existentes.
- **Preparado para evolución futura:** Si GTD escala, los metadatos JSONB permiten añadir campos sin migraciones.

### Negativas

- **Documento IA se vuelve más complejo:** Almacena tanto documentos ATI como GTD. La lógica de consulta debe filtrar correctamente.
- **JSONB en metadata:** Los metadatos no tienen validación a nivel de base de datos. La validación debe hacerse en la capa de servicio.
- **Posible acoplamiento futuro:** Si GTD requiere comportamientos muy diferentes, podría ser necesario separar en el futuro.

### Impacto en migraciones existentes

- La migración `20260709_00001_create_core_documento.sql` no se modifica (congelada por CF-001A).
- Se creará una **nueva migración** que añada:
  - Columna `document_origin` (TEXT, nullable, con CHECK constraint para valores válidos)
  - Columna `document_status` (TEXT, con CHECK constraint, default 'obtained' para ATI)
  - Columna `document_metadata` (JSONB, nullable)
  - Nuevos valores en el CHECK constraint de `document_type` (si existe)

---

## Alternativas consideradas

| Alternativa | Razón para rechazarla |
|-------------|----------------------|
| **Crear un nuevo agregado DocumentoGTD** | Violaría MVP Discipline y Regla de Mínima Expansión. Documento IA puede extenderse sin romper nada. |
| **Crear un nuevo Bounded Context para GTD** | Innecesario en V1. GTD comparte Client, Inmueble, Expediente con ATI. La separación prematura añade complejidad. |
| **Usar JSONB completamente (sin tipado)** | Funcional pero inseguro. Los nuevos campos tipados permiten queries eficientes y validación en base de datos. |
| **No hacer nada y que GTD use Documento IA sin cambios** | Funcionalmente limitado. Sin tipos GTD, no se puede consultar ni categorizar eficientemente. |

---

## Referencias

- ADR-003-GTD-LINEA-DE-NEGOCIO.md
- EP-102-GESTION-TECNICA-DOCUMENTAL.md
- CF-001A-ACTA-CIERRE-ARQUITECTURA-V1.md (Arquitectura congelada)
- supabase/migrations/20260709_00001_create_core_documento.sql

---

*Fin del documento ADR-004*
# CKB-GUIDE — Guía de uso del Repositorio Oficial de Conocimiento

> **Propósito:** Procedimiento breve para consultar, actualizar y mantener el CKB.
> Tiempo estimado de lectura: 2 minutos.

---

## 1. Consultar el índice

Al inicio de cada sesión:

1. Leer los documentos AUTOLOAD: GOV-000, GOV-001, GOV-002, GOV-003 (AGENTS.md, CF-000, CF-001, CF-001A).
2. Abrir `docs/CKB-INDEX.md` y revisar las familias relevantes para la épica en curso.
3. Leer los documentos identificados.

Si no encuentras un documento relevante en el índice en menos de 30 segundos, puede que deba añadirse (ver sección 2).

## 2. Añadir un documento al índice

Solo cuando el documento constituya **conocimiento activo del proyecto** (necesario para el desarrollo presente, no es análisis exploratorio ni informe de proceso).

```
1. VERIFICAR que el documento existe físicamente (test -f <ruta>).
2. VERIFICAR que no está ya indexado (buscar por título o ruta en CKB-INDEX.md).
3. VERIFICAR que no existe duplicado (mismo concepto en otro documento ya indexado).
4. ASIGNAR CKB-ID secuencial dentro de su familia (GOV, ARCH, DOM, ADR, ROAD).
5. AÑADIR fila en CKB-INDEX.md con todos los campos.
6. HACER commit con formato: "CKB: add FAMILIA-NNN — Título del documento"
```

## 3. Actualizar el estado de un documento

Cuando un documento es reemplazado o deprecado:

1. Localizar su fila en CKB-INDEX.md.
2. Cambiar "Estado" de `Vigente` a `Superseded`.
3. Añadir en la descripción o columna de referencias el CKB-ID del documento que lo reemplaza.
4. Hacer commit con formato: `CKB: mark FAMILIA-NNN as Superseded (replaced by FAMILIA-MMM)`

**Nunca se elimina una fila del índice** como sustitución de marcarla como Superseded. La trazabilidad es importante.

## 4. Eliminar un documento del índice

Solo cuando el documento físico se elimina del repositorio (limpieza real, no deprecación).

1. Eliminar la fila completa de CKB-INDEX.md.
2. Hacer commit con formato: `CKB: remove FAMILIA-NNN — Título del documento (eliminado del repositorio)`

## 5. Resolver conflictos de solapamiento

Si dos documentos indexados parecen describir el mismo concepto:

1. Aplicar **RULE PRECEDENCE** de AGENTS.md:
   - Constitución (CF-000)
   - CF-001A — Acta de Cierre de Arquitectura V1
   - ADRs aprobadas
   - AGENTS.md
   - Documentos CF-XXX
   - Prompts de sesión
2. El documento de mayor precedencia prevalece.
3. Si están en el mismo nivel de precedencia y hay conflicto real, crear una ADR que resuelva la ambigüedad.

## 6. Lo que NO se hace

- ❌ No modificar el contenido de los documentos fuente.
- ❌ No añadir frontmatter YAML a documentos existentes.
- ❌ No reorganizar físicamente la carpeta `docs/`.
- ❌ No duplicar contenido de los documentos originales en el índice.
- ❌ No indexar análisis exploratorios, auditorías cerradas, producto, diseño visual, informes de sesión o documentación histórica (salvo excepción explícita).

## 7. Health check rápido

Antes de cada commit que modifique el CKB:

- [ ] Todas las rutas en el índice existen (`test -f <ruta>`).
- [ ] No hay documentos duplicados (mismo concepto en dos filas).
- [ ] Cada documento pertenece a una única familia.
- [ ] El índice no contiene contenido duplicado de los originales.
- [ ] Los estados reflejan la realidad (Vigente / Superseded).

---

> **Duración estimada de mantenimiento:** < 2 minutos por sesión.
> **Formato commit:** `CKB: (add|update|deprecate|remove) FAMILIA-NNN — Título del documento`
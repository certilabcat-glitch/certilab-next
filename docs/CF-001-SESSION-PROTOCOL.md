# CF-001 — SESSION PROTOCOL

> **El ritual de inicio obligatorio.**
>
> Ninguna sesión de desarrollo comienza sin ejecutar este protocolo. No es opcional. No es recomendable. Es obligatorio.
>
> Este documento define los pasos que cualquier IA o desarrollador debe ejecutar antes de escribir una sola línea de código, realizar un commit o tomar cualquier decisión técnica.

---

**Versión:** 1.0.0
**Fecha:** 01/07/2026
**Autor:** Equipo Certilab
**Estado:** ✅ Vigente
**Tipo:** Protocolo Obligatorio

---

## ÍNDICE

1. [Propósito](#1-propósito)
2. [Precondiciones](#2-precondiciones)
3. [Protocolo paso a paso](#3-protocolo-paso-a-paso)
4. [Generación de informe](#4-generación-de-informe)
5. [Reglas absolutas del protocolo](#5-reglas-absolutas-del-protocolo)
6. [Resolución de problemas](#6-resolución-de-problemas)

---

## 1. Propósito

### 1.1 ¿Por qué existe este protocolo?

El proyecto Certilab es complejo. Su documentación (el Framework CF) es extensa y está interconectada. Una IA o desarrollador que no haya ejecutado el protocolo de sesión puede:

- Modificar código basándose en información desactualizada.
- Romper la coherencia entre la documentación y el código.
- Ignorar reglas absolutas del Framework.
- Introducir cambios que contradigan la arquitectura definida.
- Perder el contexto de trabajo al cambiar de sesión.

CF-001 existe para garantizar que **cada sesión comienza con el mismo nivel de conocimiento** que la sesión anterior, independientemente de quién o qué la ejecute.

### 1.2 Qué garantiza

- Que el repositorio está en un estado conocido.
- Que el código compila sin errores antes de empezar.
- Que la IA o desarrollador ha leído la documentación relevante.
- Que existe un punto de referencia (commit hash) para la sesión.
- Que cualquier desviación entre documentación y código se detecta al inicio.

### 1.3 Para quién es

- **IA asistentes** (Claude, OpenAI, etc.) — deben ejecutar este protocolo en cada nueva sesión.
- **Desarrolladores humanos** — deben ejecutar este protocolo al empezar su jornada o al retomar el proyecto tras más de 24h.
- **Revisores de PR** — deben ejecutar el paso de verificación Git y build antes de aprobar.

---

## 2. Precondiciones

Antes de ejecutar el protocolo, asegurar que:

- [ ] El entorno de desarrollo está configurado (Node.js, npm, Git).
- [ ] Se tiene acceso de lectura al repositorio.
- [ ] Se tiene permiso para ejecutar `npm run build`.
- [ ] No hay procesos bloqueantes en el terminal (servidores, watchers).

---

## 3. Protocolo paso a paso

### Paso 1: Verificación Git

```bash
# 1. Verificar el estado del repositorio
git status

# 2. Obtener el commit actual como referencia de sesión
git rev-parse HEAD

# 3. Verificar que no hay cambios sin commit (a menos que sea intencional)
#    Si los hay, documentar por qué no se han commiteado.
git diff --stat

# 4. Verificar la rama actual
git branch --show-current
```

**Resultado esperado:**
- Commit hash conocido y anotado como `SESSION_REFERENCE`.
- Rama correcta (generalmente `main` o `feature/*`).
- Ausencia de cambios sin commit, o cambios documentados y justificados.

### Paso 2: Build de verificación

```bash
# 1. Limpiar caché (opcional pero recomendado)
rm -rf .next

# 2. Ejecutar build completo
npm run build 2>&1
```

**Resultado esperado:**
- Build exitoso sin errores ni warnings.
- Si el build falla, detener el protocolo aquí. No se puede empezar una sesión sobre un código que no compila.

**Si el build falla:**
1. Documentar el error exacto en el informe de sesión.
2. Decidir si el error es preexistente (heredado de la sesión anterior) o nuevo.
3. Si es preexistente, priorizar su corrección en la sesión actual.
4. Si es nuevo, revertir los cambios que lo causaron.

### Paso 3: Lectura del Project Brain (CF-000)

Leer el documento completo:

```
docs/CF-000-PROJECT-BRAIN.md
```

**Atención especial a:**
- **Sección 1 (VISIÓN):** Para entender el propósito del proyecto.
- **Sección 2 (FILOSOFÍA):** Para conocer los principios que gobiernan cada decisión.
- **Sección 5 (FRAMEWORK CERTILAB):** Para conocer la estructura documental completa.
- **Sección 14 (PRINCIPIOS DE DESARROLLO):** Para conocer SOLID, Clean Architecture, DDD.
- **Sección 15 (REGLAS ABSOLUTAS):** Para conocer las 20 reglas que no pueden romperse.
- **Sección 17 (PRÓXIMOS PASOS):** Para conocer la Release actual y qué debe/no debe hacerse.
- **Sección 16 (ESTADO ACTUAL):** Para conocer el estado de cada módulo.
- **SESSION START PROTOCOL:** Si existe, leer la sección que referencia este documento.

**Resultado esperado:**
- Comprensión completa de la visión, filosofía y reglas del proyecto.
- Conocimiento de la Release actual (V1.3 Consolidación) y sus prioridades.
- Identificación de restricciones activas (ej. "NO añadir IA en V1.3").

### Paso 4: Lectura de AGENTS.md

Leer el archivo raíz:

```
AGENTS.md
```

**Atención especial a:**
- Reglas específicas para el comportamiento de la IA.
- Restricciones de Next.js (el proyecto puede tener breaking changes).
- Cualquier instrucción adicional del equipo.

**Resultado esperado:**
- Conocimiento pleno de las reglas que gobiernan la interacción IA-proyecto.
- Advertencia sobre Next.js no estándar (si aplica).

### Paso 5: Lectura de documentos CF relevantes

Según el objetivo de la sesión, leer los documentos CF aplicables:

| Objetivo | Documentos a leer |
|----------|-------------------|
| Expedientes | CF-002 (EXPEDIENTE DIGITAL) |
| Arquitectura base | CF-011 (FOUNDATION) |
| Motor PITR™ | CF-012 (PITR MOTOR) |
| Cualquier objetivo | CF-000 ya leído en Paso 3 |
| Nuevo desarrollo | CF-000 + CF-011 (siempre) |

**Regla:** Si no estás seguro de qué documentos leer, lee al menos CF-000 + CF-011.

**Resultado esperado:**
- Comprensión detallada del módulo o sistema que se va a modificar.
- Identificación de interfaces, contratos y dependencias.

### Paso 6: Comparación documentación / repositorio

Verificar que la documentación del Framework refleja el estado actual del repositorio:

- **Estructura de directorios:** ¿Coincide `docs/CF-000-PROJECT-BRAIN.md` sección 4.4 con la estructura real?
- **Entidades:** ¿Coinciden los tipos en `src/types/` con los descritos en CF-002 y CF-000?
- **Estados:** ¿Coincide la máquina de estados en `src/lib/expediente-estados.ts` con la documentada?
- **Eventos:** ¿Coinciden los eventos en `src/lib/eventos.ts` con los documentados?

**Resultado esperado:**
- Lista de discrepancias encontradas (si las hay).
- Si hay discrepancias, deben documentarse en el informe de sesión y priorizarse para corrección.

### Paso 7: Generación de informe

Completar el informe de sesión (ver sección 4).

### Paso 8: Confirmación y comienzo

Una vez completados todos los pasos anteriores:

- [ ] El protocolo está completo.
- [ ] La sesión puede comenzar.
- [ ] El `SESSION_REFERENCE` (commit hash) está documentado.

---

## 4. Generación de informe

Al finalizar el protocolo, generar un informe de sesión con el siguiente formato. El informe debe incluirse al inicio del contexto de trabajo o pegarse en el primer mensaje de la sesión.

### Formato del informe

```
┌─────────────────────────────────────────────┐
│       CERTILAB — INFORME DE SESIÓN          │
└─────────────────────────────────────────────┘

SESSION_REFERENCE:  [commit hash]
FECHA:              [fecha y hora]
RAMA:               [nombre de rama]
DESARROLLADOR/IA:   [nombre o identificador]

--- VERIFICACIONES ---
✓ Git status: limpio / [explicar cambios]
✓ Build:       exitoso / [explicar fallo]
✓ CF-000:      leído / no leído
✓ AGENTS.md:   leído / no leído
✓ CF-[N]:      leído / no leído
✓ Comparación: [coincide / discrepancias encontradas]

--- DISCREPANCIAS (si las hay) ---
- [descripción de la discrepancia]
- [archivo(s) afectados]

--- OBJETIVO DE LA SESIÓN ---
[descripción clara de lo que se va a hacer]

--- RESTRICCIONES ACTIVAS ---
- [restricción 1, ej. "No modificar la Web"]
- [restricción 2, ej. "Release actual: V1.3 — Consolidación"]

--- REGLAS ABSOLUTAS RECORDADAS ---
- [regla relevante para esta sesión]
```

### Ejemplo de informe completo

```
SESSION_REFERENCE:  040296d
FECHA:              01/07/2026 19:00
RAMA:               main
DESARROLLADOR/IA:   Claude

✓ Git status: limpio
✓ Build:       exitoso
✓ CF-000:      leído
✓ AGENTS.md:   leído
✓ CF-011:      leído
✓ Comparación: coincide

OBJETIVO: Documentar el protocolo de inicio de sesión

RESTRICCIONES ACTIVAS:
- No modificar funcionalidades existentes
- No modificar la Web
- No modificar la Plataforma
- Release actual: V1.3 — Consolidación
```

---

## 5. Reglas absolutas del protocolo

Estas reglas no pueden romperse bajo ninguna circunstancia durante la ejecución del protocolo.

### 5.1 Reglas de ejecución

1. **El protocolo debe ejecutarse completo.** No se puede saltar ningún paso. Si un paso no aplica, debe documentarse por qué.

2. **Si el build falla, la sesión no comienza.** No se puede escribir código nuevo sobre un código que no compila. La prioridad de la sesión pasa a ser arreglar el build.

3. **Si hay cambios sin commit al inicio, deben documentarse.** No se permite empezar una sesión con cambios sin registrar sin justificación.

4. **El `SESSION_REFERENCE` (commit hash) debe registrarse.** Es el punto de referencia para toda la sesión. Permite comparar al final qué cambió.

### 5.2 Reglas de documentación

5. **El informe de sesión debe generarse siempre.** Sin informe, no hay sesión válida.

6. **Las discrepancias documentación/repositorio deben reportarse.** No se puede ignorar una discrepancia. Si no se va a corregir en esta sesión, debe crearse una tarea pendiente.

### 5.3 Reglas de prioridad

7. **Errores de build > Tareas planificadas.** Si el build está roto, arreglarlo tiene máxima prioridad.

8. **Discrepancias documentales > Nuevas funcionalidades.** Si la documentación no refleja la realidad, corregirla antes de añadir algo nuevo.

### 5.4 Reglas de sesión

9. **Una sesión no puede abarcar más de un objetivo principal.** Si surge un segundo objetivo, debe crearse una nueva sesión.

10. **Al finalizar la sesión, debe ejecutarse un build de verificación.** Si se introdujeron cambios, `npm run build` debe pasar antes del commit.

---

## 6. Resolución de problemas

### Error: "No tengo permisos para ejecutar npm run build"

**Solución:** Solicitar los permisos necesarios al administrador del proyecto. No iniciar la sesión sin build verificado.

### Error: "El build falla y no sé por qué"

**Solución:**
1. Leer el mensaje de error completo.
2. Verificar si el error es preexistente (ejecutar `git stash` y hacer build para comparar).
3. Si es preexistente, documentarlo y planificar su corrección.
4. Si es nuevo, identificar el commit o cambio que lo introdujo.

### Error: "No encuentro el documento CF-XXX referenciado"

**Solución:**
1. Verificar que el documento existe en `docs/`.
2. Si no existe, registrar la referencia rota en el informe.
3. Si es necesario para la sesión, detener el protocolo hasta localizar la información equivalente.

### Error: "La estructura del repositorio no coincide con la documentación"

**Solución:**
1. Documentar las diferencias exactas en el informe.
2. Decidir si se actualiza la documentación o se reorganiza el repositorio.
3. En cualquier caso, no empezar la sesión sin alinear ambos.

---

*Fin del documento CF-001-SESSION-PROTOCOL.md — El ritual de inicio obligatorio de Certilab*
# 05 — RECUPERACIÓN ANTE DESASTRES

Seis escenarios. Seis procedimientos. Siempre hay un camino de vuelta.

---

## Escenario 1 — He perdido el portátil

**Situación:** El portátil físico ha desaparecido (robo, pérdida, rotura total).

**Qué hacer:**

1. **Revocar credenciales inmediatamente:**
   - Anthropic API Key → console.anthropic.com → revocar y regenerar.
   - OpenAI API Key → platform.openai.com → revocar.
   - Supabase → Settings → API → regenerar JWT secret.
   - SMTP → Panel del proveedor → regenerar clave.
   - MyPOS → Panel → regenerar API key.
   - GitHub → Settings → Developer settings → revocar tokens.

2. **Verificar que GitHub no ha sido manipulado:**
   - Entra en https://github.com/certilabcat-glitch/certilab-next
   - Revisa Settings → Deploy keys, Secrets, Actions.
   - Confirma que no hay commits extraños.

3. **Conseguir un equipo nuevo y seguir `04-NEW-COMPUTER.md`.**

4. **Recuperar `.env.local` desde tu backup externo** (OneDrive, Google Drive, USB).

5. **Si no tienes backup externo:**
   - Sigue `02-ENVIRONMENT-CHECKLIST.md`.
   - Configura cada variable de nuevo desde los paneles de origen.

---

## Escenario 2 — Windows ha dejado de funcionar

**Situación:** El ordenador enciende pero Windows no arranca (pantalla azul, corrupción).

**Qué hacer:**

1. **Rescatar los datos con un USB live de Linux:**
   - Descarga Ubuntu ISO en otro equipo.
   - Crea un USB booteable con Rufus.
   - Arranca desde USB en el equipo dañado (modo "Try Ubuntu").
   - Navega a `C:\Users\TU_USUARIO\Documents\web-garraf`.
   - Copia todo, especialmente `.env.local`, a un disco externo.

2. **Si no puedes rescatar datos:**
   - Sigue `04-NEW-COMPUTER.md` desde cero.
   - Recupera `.env.local` de tu backup externo.

3. **Restaurar o reinstalar Windows:**
   - Opción A: Restaurar sistema desde punto de restauración.
   - Opción B: Reinstalar Windows desde USB (conservando archivos si es posible).
   - Opción C: Formatear y seguir `04-NEW-COMPUTER.md`.

---

## Escenario 3 — He borrado el proyecto

**Situación:** La carpeta `web-garraf` ya no existe en el disco local.

**Qué hacer:**

1. **No entres en pánico.** Todo el código está en GitHub.

2. **Clonar de nuevo:**
   ```cmd
   cd C:\Users\%USERNAME%\Documents
   git clone https://github.com/certilabcat-glitch/certilab-next.git web-garraf
   cd web-garraf
   ```

3. **Recuperar `.env.local`:**
   - Desde tu backup externo → copiar a la raíz del proyecto.
   - O desde la papelera de reciclaje si fue borrado recientemente.

4. **Reconstruir:**
   ```cmd
   npm install
   npm run build
   npm run dev
   ```

5. **Verificar** siguiendo la checklist de `04-NEW-COMPUTER.md` Fase 7.

---

## Escenario 4 — GitHub sigue existiendo

**Situación:** Has perdido el código local, pero el repositorio en GitHub está intacto.

**Qué hacer:**

Este es el escenario más sencillo.

1. Clonar: `git clone https://github.com/certilabcat-glitch/certilab-next.git web-garraf`
2. Recuperar `.env.local` del backup externo.
3. `npm install && npm run build && npm run dev`
4. Verificar que todo funciona.

**Este escenario se resuelve en menos de 15 minutos.**

---

## Escenario 5 — GitHub ha desaparecido

**Situación:** El repositorio en GitHub ha sido eliminado o es inaccesible.

**Qué hacer:**

1. **Verificar que no sea un problema de acceso:**
   - ¿Tu cuenta de GitHub sigue activa?
   - ¿La organización `certilabcat-glitch` existe?
   - Contacta con soporte de GitHub: https://support.github.com

2. **Recuperar desde backup local:**
   - Si tienes el proyecto en otro equipo, ese equipo TIENE el historial Git completo.
   - Ejecuta `git remote -v` para ver el remoto.
   - Crea un nuevo repositorio en GitHub.
   - Sube todo: `git push --mirror https://github.com/NUEVO-ORG/NUEVO-REPO.git`

3. **Recuperar desde backup ZIP externo:**
   - Extrae el ZIP.
   - `cd` a la carpeta extraída.
   - Verifica que tiene carpeta `.git`.
   - Crea nuevo repo en GitHub.
   - Añade remoto: `git remote add origin NUEVA_URL`.
   - Push: `git push -u origin main --tags`.

4. **Si no tienes ningún backup con `.git`:**
   - Extrae el ZIP del proyecto.
   - Inicializa nuevo repo: `git init && git add . && git commit -m "recovery"`
   - Crea repo en GitHub y haz push.
   - **Pierdes el historial de commits**, pero conservas TODO el código.

---

## Escenario 6 — Solo tengo un backup

**Situación:** Ni GitHub ni el equipo local existen. Solo tienes un archivo ZIP del proyecto.

**Qué hacer:**

1. **Extraer el ZIP** en `C:\Users\%USERNAME%\Documents\web-garraf`.

2. **Verificar el contenido:**
   - ¿Tiene `package.json`? → Bien.
   - ¿Tiene `.env.local`? → Crítico. Si no lo tiene, necesitas reconstruirlo.
   - ¿Tiene carpeta `.git`? → Recuperaste el historial. Si no, no.

3. **Instalar dependencias y reconstruir:**
   ```cmd
   npm install
   npm run build
   ```

4. **Si el build falla:**
   - Revisa los errores.
   - Posiblemente falten variables de entorno.
   - Consulta `02-ENVIRONMENT-CHECKLIST.md` y configúralas.

5. **Crear repositorio nuevo:**
   ```cmd
   git init
   git add .
   git commit -m "recovery from backup"
   ```
   - Crea repo en GitHub (nuevo o restaurado).
   - `git remote add origin URL`
   - `git push -u origin main`

6. **Verificar** siguiendo Fase 7 de `04-NEW-COMPUTER.md`.

---

## Tabla resumen de recuperación

| Escenario | Tiempo estimado | Herramienta clave |
|---|---|---|
| 1. Portátil perdido | 1-2 h | `04-NEW-COMPUTER.md` + revocar claves |
| 2. Windows roto | 30 min - 2 h | USB live Linux + backup externo |
| 3. Proyecto borrado | 15 min | `git clone` + backup `.env.local` |
| 4. Solo GitHub | 15 min | `git clone` + `npm install` |
| 5. GitHub caído | 30 min | Backup local con `.git` |
| 6. Solo backup ZIP | 1 h | ZIP + reconstrucción manual |

---

## Regla de oro

**Siempre** ten al menos DOS copias en lugares distintos:

1. GitHub (código sin secretos).
2. Backup externo (código CON `.env.local`).

Con esas dos copias, ningún desastre puede detenerte.
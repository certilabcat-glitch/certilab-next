# 04 — PROCEDIMIENTO: ORDENADOR NUEVO

Este documento explica exactamente qué hacer al recibir un ordenador nuevo para recuperar Certilab. Sigue el orden. No omitas pasos.

---

## Fase 1 — Preparación del sistema (30 min)

### 1.1 Instalar Windows Update
- Ve a Configuración → Windows Update.
- Instala todas las actualizaciones pendientes.
- Reinicia si es necesario.

### 1.2 Instalar navegador
- Descarga Chrome o Edge actualizado.

### 1.3 Activar servicio en la nube
- Instala OneDrive, Google Drive o Dropbox.
- Sincroniza tus archivos (aquí estará tu backup).

---

## Fase 2 — Herramientas base (20 min)

### 2.1 Instalar Git
- Descarga: https://git-scm.com/download/win
- Opciones por defecto. Editor: VS Code. Branch: main.

### 2.2 Configurar Git
```cmd
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### 2.3 Instalar Node.js LTS
- Descarga: https://nodejs.org (versión LTS, número par).
- Opciones por defecto.

### 2.4 Verificar
```cmd
git --version
node --version
npm --version
```

---

## Fase 3 — Editor y extensiones (30 min)

### 3.1 Instalar VS Code
- Descarga: https://code.visualstudio.com
- Marca "Add to PATH".

### 3.2 Activar Settings Sync
1. Abre VS Code.
2. Rueda dentada abajo izquierda → "Turn on Settings Sync".
3. Inicia sesión con GitHub o Microsoft.
4. Tus extensiones y configuraciones se descargan automáticamente.

### 3.3 Si no usas Sync, instala manualmente:
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- MDX
- GitLens
- Thunder Client
- Cline (`saoudrizwan.claude-dev`)

---

## Fase 4 — Clonar el proyecto (10 min)

```cmd
cd C:\Users\%USERNAME%\Documents
git clone https://github.com/certilabcat-glitch/certilab-next.git web-garraf
cd web-garraf
```

---

## Fase 5 — Variables de entorno (5 min)

### 5.1 Recuperar `.env.local`
- Copia tu archivo `.env.local` desde tu backup externo.
- Pégalo en `C:\Users\%USERNAME%\Documents\web-garraf\.env.local`

### 5.2 Si no tienes backup
- Consulta `02-ENVIRONMENT-CHECKLIST.md`.
- Pide las claves al administrador.
- Crea `.env.local` manualmente.

---

## Fase 6 — Instalar y construir (15 min)

```cmd
npm install
npm run build
```

El build debe terminar sin errores. Si hay errores, verifica `.env.local`.

---

## Fase 7 — Verificar funcionamiento (15 min)

```cmd
npm run dev
```

Abre http://localhost:3000.

### Checklist de verificación
- [ ] Home carga correctamente
- [ ] Blog muestra artículos
- [ ] Buscador de certificados funciona
- [ ] Formularios de contacto envían
- [ ] Plataforma: login, dashboard, expedientes
- [ ] PITR: segunda opinión responde
- [ ] Backoffice accesible
- [ ] Consola del navegador sin errores

---

## Fase 8 — Configurar Cline

Si Cline no detecta `ANTHROPIC_API_KEY`:
1. Ve a extensiones de VS Code → Cline → Configuración.
2. Añade la API key.
3. Reinicia VS Code.

---

## Resumen

| Fase | Tiempo estimado |
|---|---|
| 1. Sistema | 30 min |
| 2. Herramientas | 20 min |
| 3. Editor | 30 min |
| 4. Clonar | 10 min |
| 5. Variables | 5 min |
| 6. Build | 15 min |
| 7. Verificar | 15 min |
| 8. Cline | 5 min |
| **Total** | **~2 horas** |

---

## Lo que NO debes hacer

- NO instalar Node desde Windows Store (usa nodejs.org).
- NO modificar `package.json` sin documentarlo.
- NO olvidar el `.env.local` en el backup externo.
- NO saltarte el `npm run build` — detecta errores temprano.
- NO trabajar sin Settings Sync — perderás configuraciones.
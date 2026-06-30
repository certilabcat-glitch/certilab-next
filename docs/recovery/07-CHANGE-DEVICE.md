# 07 — CHECKLIST: CAMBIO DE PORTÁTIL

Procedimiento completo para cambiar de ordenador sin perder nada. Sigue cada fase en orden.

---

## Fase A — ANTES del cambio

### A.1 Backup completo del proyecto
- [ ] `git status` limpio — todo commiteado.
- [ ] `git push origin main` — todo subido a GitHub.
- [ ] `git tag` — verificar que los tags están subidos (`git push --tags`).
- [ ] Copia de seguridad ZIP de `web-garraf` completa a disco externo o nube.
- [ ] `.env.local` copiado a ubicación segura externa (NO dentro del ZIP público).

### A.2 Verificar build
- [ ] `npm install` sin errores.
- [ ] `npm run build` completa sin errores.
- [ ] `npm run dev` arranca correctamente.

### A.3 VS Code
- [ ] Settings Sync activado y sincronizado (rueda dentada → Settings Sync).
- [ ] Verificar que las extensiones están sincronizadas.
- [ ] Apuntar lista de extensiones manualmente por si falla Sync.

### A.4 Credenciales
- [ ] Lista de todas las API keys en lugar seguro.
- [ ] Contraseña de GitHub recordada / en gestor de contraseñas.
- [ ] Acceso a Supabase, Anthropic, OpenAI, SMTP, MyPOS, n8n verificado desde web.
- [ ] Token de Vercel accesible.

### A.5 Documentación
- [ ] `docs/recovery/` completo y actualizado.
- [ ] Project Brain (`CF-000`) al día.
- [ ] Leer `04-NEW-COMPUTER.md` para el nuevo equipo.

### A.6 Notificaciones
- [ ] Informar al equipo del cambio (si aplica).
- [ ] Programar el cambio en horario sin urgencias de desarrollo.

---

## Fase B — DURANTE el cambio

### B.1 En el equipo viejo
- [ ] Cerrar todos los programas.
- [ ] Cerrar VS Code.
- [ ] Desconectar servicios en nube (OneDrive, Google Drive, Dropbox).
- [ ] Apagar el equipo.

### B.2 En el equipo nuevo
- [ ] Seguir `04-NEW-COMPUTER.md` COMPLETO. No saltar pasos.
- [ ] Instalar Windows Update.
- [ ] Instalar Git, Node LTS, VS Code.
- [ ] Activar Settings Sync en VS Code.
- [ ] Instalar Cline.
- [ ] Configurar Git (`user.name`, `user.email`).

### B.3 Clonar y construir
- [ ] `git clone https://github.com/certilabcat-glitch/certilab-next.git web-garraf`
- [ ] Copiar `.env.local` desde backup externo a la raíz.
- [ ] `npm install`
- [ ] `npm run build`
- [ ] `npm run dev` — verificar http://localhost:3000.

---

## Fase C — DESPUÉS del cambio

### C.1 Verificación funcional completa
- [ ] Home carga correctamente.
- [ ] Blog muestra todos los artículos.
- [ ] Buscador de certificados devuelve resultados.
- [ ] Formularios de contacto envían y se reciben.
- [ ] Plataforma: login, dashboard, expedientes.
- [ ] PITR: segunda opinión carga y responde preguntas.
- [ ] Backoffice: expedientes, clientes, inmuebles, usuarios, config.
- [ ] Páginas legales: aviso legal, privacidad, cookies.
- [ ] Páginas de servicios: segunda opinión, express, informe técnico.
- [ ] Landings: 7 señales CE.
- [ ] Consola del navegador sin errores rojos.
- [ ] `npm run build` en el nuevo equipo termina sin errores.

### C.2 Git y GitHub
- [ ] `git status` limpio.
- [ ] `git remote -v` apunta a `certilabcat-glitch/certilab-next`.
- [ ] Prueba de push: haz un cambio menor de prueba, commitea y push.

### C.3 Cline
- [ ] Extensión Cline instalada y funcionando.
- [ ] `ANTHROPIC_API_KEY` configurada y verificada.
- [ ] Cline responde correctamente a un prompt de prueba.

### C.4 Backup del nuevo equipo
- [ ] Configurar backup automático en nube de la carpeta `web-garraf`.
- [ ] Crear backup ZIP etiquetado con fecha de hoy.
- [ ] Guardar `.env.local` en ubicación segura externa.

### C.5 Documentar el cambio
- [ ] Actualizar `RECOVERY-REPORT.md` con la fecha del cambio.
- [ ] Anotar incidencias si las hubo.

---

## Fase D — LIMPIEZA del equipo viejo

Solo cuando el nuevo equipo esté completamente verificado:

- [ ] Esperar al menos 48 horas tras verificar el nuevo equipo.
- [ ] Copiar cualquier archivo personal no sincronizado.
- [ ] Cerrar sesión en todos los servicios (GitHub, VS Code Sync, nube).
- [ ] Desvincular Windows del equipo (Configuración → Cuentas).
- [ ] Formatear o restaurar de fábrica si se va a vender/regalar.
- [ ] Destruir físicamente el disco si se va a reciclar (datos sensibles).

---

## Tabla resumen

| Fase | Cuándo | Tiempo estimado |
|---|---|---|
| A. Antes | 1-2 días antes | 30 min |
| B. Durante | Día del cambio | 2 horas |
| C. Después | Mismo día | 30 min |
| D. Limpieza | 48 h después | 1 hora |

---

## Lo que NUNCA debes hacer

- NO formatear el equipo viejo antes de verificar el nuevo.
- NO confiar solo en Settings Sync — guarda lista de extensiones.
- NO olvidar el `.env.local` — es lo único que no está en GitHub.
- NO hacer el cambio un viernes a las 18:00.
- NO asumir que `npm install` funciona sin `.env.local`.
# 03 — CHECKLIST DE BACKUP COMPLETO

Ejecuta esta checklist antes de cualquier cambio importante de equipo, al menos una vez al mes, o después de cada release.

---

## Git y repositorio

- [ ] **GitHub actualizado** — Todo el código subido al remoto `origin`.
- [ ] **Último commit** — `git log -1` muestra el trabajo más reciente.
- [ ] **Último tag** — `git tag` muestra los tags de release (`v1.2.0`, etc.).
- [ ] **Rama `main` sincronizada** — `git status` limpio, sin cambios pendientes.
- [ ] **No hay archivos sensibles** — Verificar que `.env.local`, claves, certificados NO están en el repositorio.

---

## Build y dependencias

- [ ] **`npm install` correcto** — Sin errores ni warnings graves.
- [ ] **`npm run build` correcto** — Build de Next.js completa sin errores TypeScript/ESLint.
- [ ] **`npm run dev` correcto** — Servidor de desarrollo arranca y carga la web.
- [ ] **Prueba visual** — Home, blog, buscador, formularios, plataforma, backoffice visibles.
- [ ] **Prueba funcional** — Formularios envían, búsquedas devuelven resultados, PITR responde.

---

## Documentación y framework

- [ ] **Project Brain actualizado** — `docs/CF-000-PROJECT-BRAIN.md` refleja el estado real.
- [ ] **Framework actualizado** — `docs/CF-011-FOUNDATION.md` al día.
- [ ] **Arquitectura documentada** — `docs/AUDITORIA-ARQUITECTURA-V1.1.md` vigente.
- [ ] **Releases documentadas** — `docs/releases/` contiene notas de cada versión.
- [ ] **Recovery Kit actualizado** — `docs/recovery/` contiene todos los documentos.

---

## Variables de entorno y claves

- [ ] **`.env.local` guardado** — Copia externa en ubicación segura (USB, nube cifrada).
- [ ] **API Keys guardadas** — Anthropic, OpenAI, Supabase, SMTP, MyPOS, n8n.
- [ ] **Credenciales verificadas** — Probar que cada API key funciona.
- [ ] **Variables documentadas** — `02-ENVIRONMENT-CHECKLIST.md` lista todas las vars.

---

## Backup externo

- [ ] **Backup externo realizado** — Copia completa del proyecto (con `.env.local`) en disco externo o nube cifrada (Google Drive, OneDrive, Dropbox con carpeta privada).
- [ ] **Backup en formato ZIP** — `certilab-backup-YYYY-MM-DD.zip` con todo el proyecto.
- [ ] **Backup etiquetado** — Fecha, versión y commit en el nombre del archivo.

---

## VS Code y herramientas

- [ ] **VS Code sincronizado** — Settings Sync activado con GitHub o Microsoft.
- [ ] **Extensiones sincronizadas** — Verificar lista en `01-RECOVERY-GUIDE.md`.
- [ ] **Cline configurado** — Extensión instalada y `ANTHROPIC_API_KEY` funcionando.
- [ ] **Git configurado** — `git config --global user.name` y `user.email` correctos.

---

## Verificación final

- [ ] **npm run build sin errores** en entorno limpio.
- [ ] **npm run dev** funciona y carga localhost:3000.
- [ ] **Todas las páginas** cargan sin errores 404 ni 500.
- [ ] **Consola del navegador limpia** — sin errores JS en producción.
- [ ] **Formulario de contacto** envía y se recibe correctamente.
- [ ] **Base de datos** responde (Supabase conectado).
- [ ] **CI/CD** (si existe) pasa todos los checks.

---

## Frecuencia recomendada

| Frecuencia | Acción |
|---|---|
| Cada commit | Push a GitHub |
| Cada release | Backup externo + tag |
| Cada mes | Checklist completa |
| Antes de cambiar de equipo | Checklist completa + ZIP de backup |
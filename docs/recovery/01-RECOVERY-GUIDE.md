# 01 — GUÍA DE RECUPERACIÓN COMPLETA DE CERTILAB

**Objetivo:** Recuperar el proyecto Certilab desde cero en cualquier máquina Windows.

---

## Paso 1 — Instalar Git

1. Descarga Git desde: https://git-scm.com/download/win
2. Ejecuta el instalador (.exe).
3. En la pantalla "Choosing the default editor", selecciona "Use Visual Studio Code as Git's default editor".
4. En "Adjusting the name of the initial branch", selecciona "Override... main".
5. En "Configuring the line ending conversions", selecciona "Checkout Windows-style, commit Unix-style".
6. El resto de opciones: déjalas por defecto. Next, Next, Install.
7. Abre un terminal (Win+R → cmd) y verifica:

```cmd
git --version
```

Debes ver algo como `git version 2.48.x`.

---

## Paso 2 — Configurar Git

```cmd
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

---

## Paso 3 — Instalar Node.js LTS

1. Ve a: https://nodejs.org
2. Descarga la versión **LTS** (número par, ej: 22.x.x).
3. Ejecuta el instalador. Todo por defecto.
4. Verifica:

```cmd
node --version
npm --version
```

Debes ver versiones 22.x.x (node) y 10.x.x (npm).

---

## Paso 4 — Instalar Visual Studio Code

1. Descarga desde: https://code.visualstudio.com
2. Instala con opciones por defecto.
3. Marca "Add to PATH" durante la instalación.
4. Al abrir VS Code, ve a File → Auto Save (actívalo).

---

## Paso 5 — Instalar extensiones de VS Code

Abre VS Code. Ve a View → Extensions (Ctrl+Shift+X). Instala:

- **ES7+ React/Redux/React-Native snippets** (`dsznajder.es7-react-js-snippets`)
- **Prettier - Code formatter** (`esbenp.prettier-vscode`)
- **ESLint** (`dbaeumer.vscode-eslint`)
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
- **MDX** (`unifiedjs.vscode-mdx`)
- **GitLens** (`eamodio.gitlens`)
- **Thunder Client** (`rangav.vscode-thunder-client`)

Configura Prettier como formateador por defecto:

1. Ctrl+Shift+P → "Format Document With..."
2. Selecciona "Configure Default Formatter"
3. Elige "Prettier - Code formatter"

---

## Paso 6 — Instalar Cline (extensión de VS Code)

1. En VS Code, ve a Extensiones (Ctrl+Shift+X).
2. Busca "Cline".
3. Instala `saoudrizwan.claude-dev`.
4. Cline usará la variable `ANTHROPIC_API_KEY` de tu `.env.local` si está configurada.

---

## Paso 7 — Clonar el repositorio

Abre un terminal (en VS Code: Terminal → New Terminal).

```cmd
cd C:\Users\%USERNAME%\Documents
git clone https://github.com/certilabcat-glitch/certilab-next.git web-garraf
cd web-garraf
```

---

## Paso 8 — Configurar variables de entorno

Crea el archivo `.env.local` en la raíz del proyecto.

Copia las variables desde tu backup de `.env.local`.

Si no tienes backup, consulta `02-ENVIRONMENT-CHECKLIST.md` para saber qué variables necesitas y pide las claves al administrador.

---

## Paso 9 — Instalar dependencias

```cmd
npm install
```

Espera a que termine. No debe mostrar errores.

---

## Paso 10 — Construir el proyecto

```cmd
npm run build
```

El build debe completarse sin errores.

Si hay errores de TypeScript, revisa que todas las variables de entorno estén configuradas.

---

## Paso 11 — Iniciar servidor de desarrollo

```cmd
npm run dev
```

Abre http://localhost:3000 en el navegador.

La web de Certilab debe cargar correctamente.

---

## Paso 12 — Verificar que todo funciona

- [ ] Navegación completa (todas las páginas cargan)
- [ ] Blog visible con artículos
- [ ] Buscador de certificados funcional
- [ ] Formularios de contacto funcionales
- [ ] Plataforma: login, dashboard, expedientes
- [ ] PITR: motor de segunda opinión funcional
- [ ] Backoffice accesible

---

## Paso 13 — Sincronizar VS Code

Si usabas Settings Sync en tu equipo anterior:

1. Ve a VS Code → Manage (rueda dentada abajo izquierda).
2. "Turn on Settings Sync".
3. Inicia sesión con GitHub o Microsoft.
4. Todas tus configuraciones, extensiones y snippets se descargarán.

---

## Notas importantes

- **Nunca** subas `.env.local` a GitHub (está en `.gitignore`).
- Guarda siempre una copia de `.env.local` en un lugar seguro externo.
- Mantén Git, Node y npm actualizados a versiones LTS.
- Ejecuta `npm run build` antes de cada despliegue para verificar integridad.
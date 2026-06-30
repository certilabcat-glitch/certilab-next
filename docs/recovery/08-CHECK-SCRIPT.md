# 08 — SCRIPT DE VERIFICACIÓN AUTOMÁTICA

Script PowerShell que comprueba el estado completo del proyecto Certilab en un solo comando.

---

## Cómo usarlo

1. Abre PowerShell como administrador (o Terminal de VS Code).
2. Navega a la raíz del proyecto:
   ```powershell
   cd C:\Users\$env:USERNAME\Documents\web-garraf
   ```
3. Ejecuta el script:
   ```powershell
   .\docs\recovery\check-certilab.ps1
   ```

---

## Script completo

Crea el archivo `docs/recovery/check-certilab.ps1` con este contenido:

```powershell
# ============================================================
# CERTILAB RECOVERY CHECK SCRIPT v1.0
# ============================================================
# Verifica que el entorno de desarrollo Certilab está completo.
# Ejecutar desde la raíz del proyecto:
#   .\docs\recovery\check-certilab.ps1
# ============================================================

$ErrorActionPreference = "Continue"
$Pass = 0
$Fail = 0
$Warn = 0
$StartTime = Get-Date

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CERTILAB RECOVERY CHECK v1.0" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Inicio: $($StartTime.ToString('HH:mm:ss'))" -ForegroundColor Gray
Write-Host ""

# ----------------------------------------------------------
# FUNCIÓN: Registrar resultado
# ----------------------------------------------------------
function Check {
    param($Label, $Result, $Detail)
    if ($Result -eq "PASS") {
        Write-Host "  [PASS] " -ForegroundColor Green -NoNewline
        Write-Host "$Label" -ForegroundColor White
        if ($Detail) { Write-Host "         $Detail" -ForegroundColor Gray }
        $global:Pass++
    } elseif ($Result -eq "FAIL") {
        Write-Host "  [FAIL] " -ForegroundColor Red -NoNewline
        Write-Host "$Label" -ForegroundColor White
        if ($Detail) { Write-Host "         $Detail" -ForegroundColor Red }
        $global:Fail++
    } else {
        Write-Host "  [WARN] " -ForegroundColor Yellow -NoNewline
        Write-Host "$Label" -ForegroundColor White
        if ($Detail) { Write-Host "         $Detail" -ForegroundColor Yellow }
        $global:Warn++
    }
}

# ============================================================
# BLOQUE 1: HERRAMIENTAS DEL SISTEMA
# ============================================================
Write-Host "--- HERRAMIENTAS DEL SISTEMA ---" -ForegroundColor Cyan

# Git
try {
    $gitVersion = git --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Check "Git instalado" "PASS" $gitVersion
    } else {
        Check "Git instalado" "FAIL" "Git no encontrado. Instalar desde https://git-scm.com"
    }
} catch {
    Check "Git instalado" "FAIL" "Git no encontrado. Instalar desde https://git-scm.com"
}

# Node
try {
    $nodeVersion = node --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Check "Node instalado" "PASS" $nodeVersion
    } else {
        Check "Node instalado" "FAIL" "Node no encontrado. Instalar LTS desde https://nodejs.org"
    }
} catch {
    Check "Node instalado" "FAIL" "Node no encontrado. Instalar LTS desde https://nodejs.org"
}

# npm
try {
    $npmVersion = npm --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Check "npm instalado" "PASS" "v$npmVersion"
    } else {
        Check "npm instalado" "FAIL" "npm no encontrado"
    }
} catch {
    Check "npm instalado" "FAIL" "npm no encontrado"
}

# VS Code
try {
    $codeVersion = code --version 2>&1 | Select-Object -First 1
    if ($LASTEXITCODE -eq 0 -or $codeVersion) {
        Check "VS Code instalado" "PASS" $codeVersion
    } else {
        Check "VS Code instalado" "WARN" "VS Code CLI no accesible. Puede estar instalado pero sin comando 'code' en PATH."
    }
} catch {
    Check "VS Code instalado" "WARN" "VS Code CLI no accesible"
}

# Cline (se verifica como extensión de VS Code)
$clineExt = code --list-extensions 2>&1 | Select-String "cline"
if ($clineExt) {
    Check "Cline instalado" "PASS" "Extensión VS Code encontrada"
} else {
    Check "Cline instalado" "WARN" "No detectado. Instalar desde marketplace de VS Code."
}

Write-Host ""

# ============================================================
# BLOQUE 2: GIT Y GITHUB
# ============================================================
Write-Host "--- GIT Y GITHUB ---" -ForegroundColor Cyan

# ¿Estamos en un repo git?
try {
    $gitRoot = git rev-parse --show-toplevel 2>&1
    if ($LASTEXITCODE -eq 0) {
        Check "Directorio es repo Git" "PASS" $gitRoot
    } else {
        Check "Directorio es repo Git" "FAIL" "No es un repositorio Git. Ejecuta git clone."
    }
} catch {
    Check "Directorio es repo Git" "FAIL" "Error al verificar"
}

# git remote
try {
    $remote = git remote get-url origin 2>&1
    if ($remote -match "certilab") {
        Check "Remote origin correcto" "PASS" $remote
    } else {
        Check "Remote origin correcto" "WARN" "Remote: $remote (¿es correcto?)"
    }
} catch {
    Check "Remote origin" "FAIL" "No hay remote 'origin' configurado"
}

# Conexión a GitHub
try {
    $githubTest = git ls-remote origin 2>&1
    if ($LASTEXITCODE -eq 0) {
        Check "Conexión a GitHub" "PASS" "Repositorio accesible"
    } else {
        Check "Conexión a GitHub" "FAIL" "No se puede acceder a GitHub. Verifica red y credenciales."
    }
} catch {
    Check "Conexión a GitHub" "FAIL" "Error de conexión"
}

# Último commit
try {
    $lastCommit = git log -1 --format="%h - %s (%ai)" 2>&1
    Check "Último commit" "PASS" $lastCommit
} catch {
    Check "Último commit" "WARN" "No se pudo obtener"
}

# Tags
try {
    $latestTag = git tag --sort=-creatordate 2>&1 | Select-Object -First 1
    if ($latestTag) {
        Check "Tags" "PASS" "Último tag: $latestTag"
    } else {
        Check "Tags" "WARN" "No hay tags en el repositorio"
    }
} catch {
    Check "Tags" "WARN" "No se pudieron leer"
}

Write-Host ""

# ============================================================
# BLOQUE 3: VARIABLES DE ENTORNO
# ============================================================
Write-Host "--- VARIABLES DE ENTORNO (.env.local) ---" -ForegroundColor Cyan

$envFile = ".env.local"
if (Test-Path $envFile) {
    Check "Archivo .env.local" "PASS" "Presente en la raíz"

    $envVars = @(
        "ANTHROPIC_API_KEY",
        "OPENAI_API_KEY",
        "NEXT_PUBLIC_SUPABASE_URL",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        "SUPABASE_URL",
        "SUPABASE_ANON_KEY",
        "SUPABASE_SERVICE_ROLE_KEY",
        "SMTP_HOST",
        "SMTP_PORT",
        "SMTP_USER",
        "SMTP_PASSWORD",
        "MYPOS_API_KEY",
        "N8N_WEBHOOK_URL"
    )

    foreach ($var in $envVars) {
        $found = Select-String -Path $envFile -Pattern "^$var=" -Quiet
        if ($found) {
            Check "  $var" "PASS" "Configurada"
        } else {
            Check "  $var" "WARN" "No encontrada en .env.local"
        }
    }
} else {
    Check "Archivo .env.local" "FAIL" "NO EXISTE. Crítico. Recuperar de backup externo o crear desde 02-ENVIRONMENT-CHECKLIST.md"
}

Write-Host ""

# ============================================================
# BLOQUE 4: DEPENDENCIAS (node_modules)
# ============================================================
Write-Host "--- DEPENDENCIAS ---" -ForegroundColor Cyan

if (Test-Path "node_modules") {
    $modCount = (Get-ChildItem "node_modules" -Directory).Count
    Check "node_modules presente" "PASS" "$modCount paquetes en node_modules"
} else {
    Check "node_modules presente" "FAIL" "No existe. Ejecuta npm install."
}

if (Test-Path "package.json") {
    $pkg = Get-Content "package.json" | ConvertFrom-Json
    Check "package.json" "PASS" "Proyecto: $($pkg.name) v$($pkg.version)"
} else {
    Check "package.json" "FAIL" "No existe. Proyecto corrupto."
}

Write-Host ""

# ============================================================
# BLOQUE 5: BUILD
# ============================================================
Write-Host "--- BUILD ---" -ForegroundColor Cyan

if (Test-Path ".next") {
    Check "Carpeta .next presente" "PASS" "Build previo encontrado"
} else {
    Check "Carpeta .next presente" "WARN" "No hay build previo"
}

# Intentar build si no hay .next
if (-not (Test-Path ".next") -and (Test-Path "node_modules")) {
    Write-Host "  Intentando npm run build..." -ForegroundColor Yellow
    $buildOutput = npm run build 2>&1
    if ($LASTEXITCODE -eq 0) {
        Check "npm run build" "PASS" "Build completado correctamente"
    } else {
        $buildErrors = ($buildOutput | Select-String "error" | Select-Object -First 3) -join "; "
        Check "npm run build" "FAIL" "Errores: $buildErrors"
    }
}

# Verificar si .next existe después del intento
if (Test-Path ".next") {
    $buildSize = (Get-ChildItem ".next" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Check "Tamaño del build" "PASS" "$([math]::Round($buildSize, 1)) MB"
}

Write-Host ""

# ============================================================
# BLOQUE 6: DOCUMENTACIÓN DE RECOVERY
# ============================================================
Write-Host "--- DOCUMENTACIÓN DE RECOVERY ---" -ForegroundColor Cyan

$docs = @(
    "docs/recovery/01-RECOVERY-GUIDE.md",
    "docs/recovery/02-ENVIRONMENT-CHECKLIST.md",
    "docs/recovery/03-BACKUP-CHECKLIST.md",
    "docs/recovery/04-NEW-COMPUTER.md",
    "docs/recovery/05-DISASTER-RECOVERY.md",
    "docs/recovery/06-PROJECT-ASSETS.md",
    "docs/recovery/07-CHANGE-DEVICE.md",
    "docs/recovery/08-CHECK-SCRIPT.md",
    "docs/CF-000-PROJECT-BRAIN.md",
    "docs/CF-011-FOUNDATION.md"
)

foreach ($doc in $docs) {
    if (Test-Path $doc) {
        Check "$doc" "PASS" "Presente"
    } else {
        Check "$doc" "FAIL" "Falta"
    }
}

Write-Host ""

# ============================================================
# BLOQUE 7: ESTRUCTURA CRÍTICA DE CÓDIGO
# ============================================================
Write-Host "--- ESTRUCTURA CRÍTICA ---" -ForegroundColor Cyan

$criticalPaths = @(
    "src/app/page.tsx",
    "src/app/layout.tsx",
    "next.config.ts",
    "package.json",
    ".gitignore",
    "src/lib/pitr/motor.ts",
    "src/components/layout/Header.tsx"
)

foreach ($path in $criticalPaths) {
    if (Test-Path $path) {
        Check "$path" "PASS" "Presente"
    } else {
        Check "$path" "FAIL" "Falta archivo crítico"
    }
}

# ============================================================
# RESUMEN FINAL
# ============================================================
$EndTime = Get-Date
$Duration = $EndTime - $StartTime
$Total = $Pass + $Fail + $Warn

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RESUMEN FINAL" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "  Pruebas ejecutadas: $Total" -ForegroundColor White
Write-Host "  PASS: $Pass" -ForegroundColor Green
Write-Host "  WARN: $Warn" -ForegroundColor Yellow
Write-Host "  FAIL: $Fail" -ForegroundColor Red
Write-Host "  Duración: $($Duration.TotalSeconds.ToString('0'))s" -ForegroundColor Gray
Write-Host ""

if ($Fail -eq 0 -and $Warn -eq 0) {
    Write-Host "  >> CERTILAB OPERATIVO. Todo correcto." -ForegroundColor Green
} elseif ($Fail -eq 0) {
    Write-Host "  >> CERTILAB OPERATIVO con avisos. Revisa los WARN." -ForegroundColor Yellow
} else {
    Write-Host "  >> CERTILAB NO ESTÁ OPERATIVO. Corrige los FAIL." -ForegroundColor Red
    Write-Host ""
    Write-Host "  Acciones recomendadas:" -ForegroundColor White
    Write-Host "  1. Lee docs/recovery/04-NEW-COMPUTER.md" -ForegroundColor Gray
    Write-Host "  2. Lee docs/recovery/01-RECOVERY-GUIDE.md" -ForegroundColor Gray
    Write-Host "  3. Verifica .env.local con docs/recovery/02-ENVIRONMENT-CHECKLIST.md" -ForegroundColor Gray
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
```

---

## Instalación del script

Copia el contenido anterior a un archivo nuevo:

```
docs/recovery/check-certilab.ps1
```

O ejecuta este comando desde la raíz del proyecto:

```powershell
New-Item -Path docs/recovery -ItemType Directory -Force
```

Y guarda el script con el contenido anterior.

---

## Ejecución rápida

```powershell
# Desde la raíz del proyecto web-garraf:
powershell -ExecutionPolicy Bypass -File docs/recovery/check-certilab.ps1
```

---

## Lo que verifica

| Bloque | Qué comprueba |
|---|---|
| 1. Sistema | Git, Node, npm, VS Code, Cline |
| 2. Git/GitHub | Repo, remote, conexión, último commit, tags |
| 3. Variables | `.env.local` y cada variable requerida |
| 4. Dependencias | `node_modules`, `package.json` |
| 5. Build | `.next`, intento de build si falta |
| 6. Documentos | Los 10 documentos clave del proyecto |
| 7. Código | Archivos críticos (`page.tsx`, `layout.tsx`, `motor.ts`...) |

---

## Interpretación del resultado

- **PASS** = Sin problemas.
- **WARN** = No bloquea el desarrollo pero deberías revisarlo.
- **FAIL** = Bloquea el funcionamiento. Debes corregirlo antes de continuar.
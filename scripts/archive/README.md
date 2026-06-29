# Scripts Archive

Archivos de scripts obsoletos o en desuso. Estos scripts fueron utilizados en fases anteriores del proyecto para procesamiento de datos, análisis y transformación de contenido.

## Contenido

### Procesamiento de Artículos
- **rewrite-articles.mjs** - Reescritura de artículos (versión 1)
- **rewrite-v2.mjs** - Reescritura de artículos (versión 2)
- **apply-rewritten.mjs** - Aplicación de artículos reescritos
- **extract-all-articles.mjs** - Extracción de todos los artículos
- **extract-slugs.mjs** - Extracción de slugs de artículos

### Análisis
- **analyze-cannibalization.js** - Análisis de canibalizaciones entre artículos
- **analyze-extracted.mjs** - Análisis de artículos extraídos

### Utilidades
- **remove-emojis.js** - Eliminación de emojis de contenido

## Nota

Estos scripts no están integrados en el flujo de trabajo actual (package.json). Se conservan como referencia histórica pero no se ejecutan automáticamente.

Para usar cualquiera de estos scripts, ejecutar manualmente desde la línea de comandos:
```bash
node scripts/archive/[nombre-script]
```

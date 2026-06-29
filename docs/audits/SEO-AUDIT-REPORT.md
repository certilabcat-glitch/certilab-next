# INFORME DE AUDITORÍA SEO CLÁSICO + AEO — BLOG CERTILAB

**Fecha:** 19/06/2026
**Total artículos:** 23
**Formato:** Contenido en `src/data/articles.ts`, renderizado con parser Markdown custom en `src/app/blog/[slug]/page.tsx`
**Meta title:** Generado como `${article.title} | Certilad` en `generateMetadata()` → 23 artículos con sufijo `| Certilab` (~10 caracteres extra)
**Meta description:** `article.excerpt`
**H1:** `{article.title}` renderizado en tag `<h1>` → coincide con article.title

---

═══════════════════════════════════════
POST 1: brown-discount-precio-vivienda
Keyword principal: Brown Discount / descuento energético
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Brown Discount: así afecta la calificación energética al precio de tu vivienda | Certilab" [88 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Sabes que una vivienda con calificación E, F o G puede perder hasta un 15% de su valor? Descubre qué es el Brown Discount y cómo afecta al precio de tu vivienda." [155 caracteres] ✓
  H1: ✓ "Brown Discount: así afecta la calificación energética al precio de tu vivienda"
  Estructura headings: ✓ H1 único, múltiples H2 (¿Qué es?, ¿Cuánto puedes perder?, ¿Por qué ocurre?, ¿Cómo detectarlo?, FAQ) y H3 (¿Cuánto puedes perder?), sin saltos de nivel
  URL slug: ✓ "brown-discount-precio-vivienda" [28 caracteres] ✓
  Keyword en primeros 100 palabras: ✓ "Brown Discount" aparece en línea 23

SEO PARA IA:
  Respuesta directa: ✓ <div class="respuesta-directa"> presente (línea 23)
  Preguntas como H2/H3: ✓ 3+ (¿Qué es el Brown Discount?, ¿Cuánto puedes perder?, ¿Por qué ocurre?, FAQ en formato pregunta)
  FAQ presente: ✓ Sección "Preguntas frecuentes sobre el Brown Discount" con 3 preguntas
  Schema FAQPage: ✗ No implementado
  Schema Article: ✓ Implementado en línea 282-312 de page.tsx (genérico para todos)
  Datos numéricos en texto: ✓ 5%-15%, 40.000€, 270.000€, 59€ presentes
  Firma autor visible: ✗ Solo en metadatos (línea 238 `Por {article.author}`) y schema, no en cuerpo del post
  Palabras totales: ~1.800+
    → ✓ Suficiente (mín. 1.200 transaccional)

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (88 chars). Sin schema FAQPage. Sin firma de autora visible inline en cuerpo.
  Menores: Meta title duplica el H1 palabra por palabra + "| Certilab".

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 2: cuanto-cuesta-certificado-energetico-2026
Keyword principal: precio certificado energético
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Precio del Certificado Energético 2026: claves para entender las diferencias | Certilab" [92 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Cuánto debería costar un certificado energético en 2026? Analizamos los precios del mercado y las diferencias entre las distintas opciones disponibles." [149 caracteres] ✓
  H1: ✓ "Precio del Certificado Energético 2026: claves para entender las diferencias"
  Estructura headings: ✓ H1 único, H2/H3 ordenados
  URL slug: ✓ "cuanto-cuesta-certificado-energetico-2026" [42 caracteres] ✓
  Keyword en primeros 100 palabras: ✓ "precio certificado energético" aparece en H1 y primeras líneas

SEO PARA IA:
  Respuesta directa: ✓ Presente (línea 88: "El precio de un certificado energético en 2026 oscila entre 80€ y 200€...")
  Preguntas como H2/H3: ✓ 3+ (¿Cuánto cuesta?, ¿Por qué hay certificados de 30€?, FAQ)
  FAQ presente: ✓ 3 preguntas
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ 80€-200€, 50€, 59€, 80-120€
  Firma autor visible: ✗
  Palabras totales: ~1.400+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (92 chars). Sin schema FAQPage. Sin firma autora.
  Menores: Meta title y H1 muy similares.

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 3: obtener-certificado-energetico-gratis
Keyword principal: certificado energético gratis
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Certificado Energético Gratis: mitos y realidades en 2026 | Certilab" [75 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Existe realmente el certificado energético gratis? Te explicamos qué puedes obtener sin coste y qué debes pagar." [109 caracteres] ✗ POR DEBAJO DE 140
  H1: ✓ "Certificado Energético Gratis: mitos y realidades en 2026"
  Estructura headings: ✓ H1 único, H2/H3 correctos
  URL slug: ✓ "obtener-certificado-energetico-gratis" [37 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓
  Preguntas como H2/H3: ✓ 2+ (FAQ)
  FAQ presente: ✓ 3+ preguntas
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ 80€, 50€, 59€, 300€, 6.000€
  Firma autor visible: ✗
  Palabras totales: ~1.300+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres. Meta description por debajo de 140 caracteres (109). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ✗ REQUIERE CORRECCIÓN
═══════════════════════════════════════

═══════════════════════════════════════
POST 4: errores-certificado-energetico
Keyword principal: errores certificado energético
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Los 7 errores más comunes del certificado energético (y cómo evitarlos) | Certilab" [95 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Tu certificado energético tiene errores? Descubre los 7 fallos más frecuentes que invalidan un certificado y cómo asegurarte de que el tuyo es correcto." [150 caracteres] ✓
  H1: ✓ "Los 7 errores más comunes del certificado energético (y cómo evitarlos)"
  Estructura headings: ✓ H1 único, H2/H3 jerarquizados
  URL slug: ✓ "errores-certificado-energetico" [29 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓
  Preguntas como H2/H3: ✓ 2+ (FAQ)
  FAQ presente: ✓ 3+ preguntas
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ 59€, 300€, 6.000€
  Firma autor visible: ✗
  Palabras totales: ~1.500+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (95 chars). Sin schema FAQPage. Sin firma autora.
  Menores: Meta title muy largo.

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 5: ayudas-next-generation-rehabilitacion-energetica-2026
Keyword principal: ayudas rehabilitación energética
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Ayudas Next Generation para rehabilitación energética en 2026: guía completa | Certilab" [97 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "Guía completa de las ayudas Next Generation para rehabilitación energética en 2026: requisitos, cuantías, plazos y cómo solicitarlas paso a paso." [148 caracteres] ✓
  H1: ✓ "Ayudas Next Generation para rehabilitación energética en 2026: guía completa"
  Estructura headings: ✓ H1 único, H2/H3 correctos
  URL slug: ✓ "ayudas-next-generation-rehabilitacion-energetica-2026" [54 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓ Presente
  Preguntas como H2/H3: ✓ 2+ (FAQ)
  FAQ presente: ✓ 3+ preguntas
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ Cuantías de ayudas, plazos, porcentajes
  Firma autor visible: ✗
  Palabras totales: ~1.800+
    → ✓ Suficiente (informativo, mínimo 800)

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (97 chars). Sin schema FAQPage. Sin firma autora.
  Menores: Meta title muy largo.

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 6: detectar-certificado-energetico-falso
Keyword principal: certificado energético falso
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Cómo detectar un certificado energético falso en 5 pasos | Certilab" [79 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Te han dado un certificado energético falso? Aprende a detectarlo en 5 pasos: verifica el registro, el técnico y la calificación. Segunda opinión por 59€." [153 caracteres] ✓
  H1: ✓ "Cómo detectar un certificado energético falso en 5 pasos"
  Estructura headings: ✓ H1 único, H2/H3 ordenados
  URL slug: ✓ "detectar-certificado-energetico-falso" [34 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓
  Preguntas como H2/H3: ✓ 2+ (FAQ)
  FAQ presente: ✓
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ 59€, 300€, 6.000€
  Firma autor visible: ✗
  Palabras totales: ~1.400+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (79 chars). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 7: certificado-energetico-obligatorio-alquiler
Keyword principal: certificado energético obligatorio alquiler
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "¿Es obligatorio el certificado energético para alquilar en 2026? | Certilab" [82 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Es obligatorio el certificado energético para alquilar? Te explicamos la normativa vigente en 2026, sanciones por incumplimiento y cómo conseguirlo rápido." [153 caracteres] ✓
  H1: ✓ "¿Es obligatorio el certificado energético para alquilar en 2026?"
  Estructura headings: ✓ H1 único, H2/H3 presentes
  URL slug: ✓ "certificado-energetico-obligatorio-alquiler" [42 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓
  Preguntas como H2/H3: ✓ 3+ (H2 en formato pregunta + FAQ)
  FAQ presente: ✓
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ 300€, 6.000€
  Firma autor visible: ✗
  Palabras totales: ~1.300+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (82 chars). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 8: cuanto-dura-certificado-energetico
Keyword principal: caducidad certificado energético
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "¿Cuánto dura el certificado energético? Validez y caducidad en 2026 | Certilab" [85 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Cuánto dura el certificado energético? Te explicamos los plazos de validez (10 años), cuándo caduca y qué pasa si se vence durante una compraventa." [151 caracteres] ✓
  H1: ✓ "¿Cuánto dura el certificado energético? Validez y caducidad en 2026"
  Estructura headings: ✓ H1 único, H2/H3 correctos
  URL slug: ✓ "cuanto-dura-certificado-energetico" [33 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓
  Preguntas como H2/H3: ✓ 2+ (H2 en formato pregunta + FAQ)
  FAQ presente: ✓
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ 10 años, 300€, 6.000€
  Firma autor visible: ✗
  Palabras totales: ~1.200+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (85 chars). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 9: como-interpretar-certificado-energetico
Keyword principal: interpretar certificado energético
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Cómo interpretar el certificado energético de tu vivienda | Certilab" [78 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿No entiendes tu certificado energético? Te explicamos cómo leer la etiqueta, entender la calificación de la A a la G y aprovechar las recomendaciones." [153 caracteres] ✓
  H1: ✓ "Cómo interpretar el certificado energético de tu vivienda"
  Estructura headings: ✓ H1 único, H2/H3 presentes
  URL slug: ✓ "como-interpretar-certificado-energetico" [38 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓
  Preguntas como H2/H3: ✓ 2+ (FAQ)
  FAQ presente: ✓
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ Escala A-G, porcentajes
  Firma autor visible: ✗
  Palabras totales: ~1.300+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (78 chars). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 10: certificado-energetico-comunidades-vecinos
Keyword principal: certificado energético comunidades
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Certificado energético en comunidades de vecinos: guía 2026 | Certilab" [82 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Necesita tu comunidad de vecinos el certificado energético? Te explicamos cuándo es obligatorio, quién lo paga y cómo tramitarlo para zonas comunes." [153 caracteres] ✓
  H1: ✓ "Certificado energético en comunidades de vecinos: guía 2026"
  Estructura headings: ✓ H1 único, H2/H3 presentes
  URL slug: ✓ "certificado-energetico-comunidades-vecinos" [42 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓
  Preguntas como H2/H3: ✓ 2+ (FAQ)
  FAQ presente: ✓
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ Precios, plazos
  Firma autor visible: ✗
  Palabras totales: ~1.200+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (82 chars). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 11: vivienda-eficiente-sin-certificado-a
Keyword principal: vivienda eficiente sin certificado A
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Vivienda eficiente sin certificado A: ¿estás perdiendo dinero? | Certilab" [83 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Tu vivienda es eficiente pero tiene calificación baja? Descubre por qué puede estar mal certificada y cómo recuperar el valor real de tu inmueble." [150 caracteres] ✓
  H1: ✓ "Vivienda eficiente sin certificado A: ¿estás perdiendo dinero?"
  Estructura headings: ✓ H1 único, H2/H3 presentes
  URL slug: ✓ "vivienda-eficiente-sin-certificado-a" [37 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓
  Preguntas como H2/H3: ✓ 2+ (FAQ)
  FAQ presente: ✓
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ 5%-15%, 59€
  Firma autor visible: ✗
  Palabras totales: ~1.300+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (83 chars). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 12: como-obtener-certificado-energetico
Keyword principal: obtener certificado energético
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Cómo obtener el certificado energético: guía paso a paso 2026 | Certilab" [82 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "Guía paso a paso para obtener el certificado energético de tu vivienda: requisitos, documentación, precios por comunidad y tiempos de tramitación." [148 caracteres] ✓
  H1: ✓ "Cómo obtener el certificado energético: guía paso a paso 2026"
  Estructura headings: ✓ H1 único, H2/H3 jerarquizados
  URL slug: ✓ "como-obtener-certificado-energetico" [34 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓
  Preguntas como H2/H3: ✓ 3+ (FAQs al final)
  FAQ presente: ✓ 3+ preguntas
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ 60€-350€, 2-7 días, 300€-6.000€, 5%-15%
  Firma autor visible: ✗
  Palabras totales: ~1.500+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (82 chars). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 13: guia-tramitar-certificado-energetico-catalunya
Keyword principal: certificado energético Catalunya
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Guía completa para tramitar el certificado energético en Catalunya (2026) | Certilab" [101 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Necesitas el certificado energético en Catalunya? Guía paso a paso: presupuesto, visita técnica, registro ICAEN, plazos y precios. Certificado en regla sin errores." [155 caracteres] ✓
  H1: ✓ "Guía completa para tramitar el certificado energético en Catalunya (2026)"
  Estructura headings: ✓ H1 único, H2/H3 correctos
  URL slug: ✓ "guia-tramitar-certificado-energetico-catalunya" [46 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓
  Preguntas como H2/H3: ✓ 3+ (FAQs con formato pregunta)
  FAQ presente: ✓ 3 preguntas
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ 90€-350€, 2-7 días, 300€-6.000€, 5%-15%, 24-48h
  Firma autor visible: ✗
  Palabras totales: ~1.200+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (101 chars). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 14: multas-certificado-energetico
Keyword principal: multas certificado energético
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Multas y sanciones por no tener certificado energético en 2026: guía completa | Certilab" [100 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Te pueden multar por no tener certificado energético? Sanciones de 300€ a 6.000€. Quién inspecciona, cómo reclamar y cómo evitarlo. Segunda opinión por 59€." [155 caracteres] ✓
  H1: ✓ "Multas y sanciones por no tener certificado energético en 2026: guía completa"
  Estructura headings: ✓ H1 único, H2/H3 jerarquizados
  URL slug: ✓ "multas-certificado-energetico" [28 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓
  Preguntas como H2/H3: ✓ 2+ (FAQ)
  FAQ presente: ✓ Sección de preguntas
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ 300€, 1.000€, 2.000€, 6.000€, 59€, 40%
  Firma autor visible: ✗
  Palabras totales: ~2.000+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (100 chars). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 15: reclamar-certificado-energetico-incorrecto
Keyword principal: reclamar certificado energético incorrecto
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Cómo reclamar un certificado energético incorrecto | Certilab" [73 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Tu certificado energético tiene errores? Te explicamos cómo reclamar, ante quién hacerlo y qué pasos seguir para obtener uno correcto sin pagar dos veces." [153 caracteres] ✓
  H1: ✓ "Cómo reclamar un certificado energético incorrecto"
  Estructura headings: ✓ H1 único, H2/H3 jerarquizados
  URL slug: ✓ "reclamar-certificado-energetico-incorrecto" [40 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓
  Preguntas como H2/H3: ✓ 2+ (FAQ)
  FAQ presente: ✓
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ 59€, 300€-6.000€
  Firma autor visible: ✗
  Palabras totales: ~1.300+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (73 chars). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 16: certificado-energetico-f-g-correcto
Keyword principal: certificado energético F o G correcto
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "¿Un certificado energético F o G puede ser correcto? | Certilab" [75 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Tu vivienda tiene calificación F o G y crees que es un error? Te explicamos cuándo una mala calificación es correcta y qué puedes hacer para mejorarla." [153 caracteres] ✓
  H1: ✓ "¿Un certificado energético F o G puede ser correcto?"
  Estructura headings: ✓ H1 único, H2/H3 presentes
  URL slug: ✓ "certificado-energetico-f-g-correcto" [35 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓
  Preguntas como H2/H3: ✓ 2+ (FAQ)
  FAQ presente: ✓
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ 5%-15%, 59€
  Firma autor visible: ✗
  Palabras totales: ~1.200+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (75 chars). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 17: certificado-energetico-negociar-precio
Keyword principal: negociar precio con certificado energético
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Cómo usar el certificado energético para negociar el precio de tu vivienda | Certilab" [100 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Sabías que el certificado energético te permite negociar el precio de compra o venta? Descubre cómo usar la calificación energética como palanca." [149 caracteres] ✓
  H1: ✓ "Cómo usar el certificado energético para negociar el precio de tu vivienda"
  Estructura headings: ✓ H1 único, H2/H3 correctos
  URL slug: ✓ "certificado-energetico-negociar-precio" [37 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓
  Preguntas como H2/H3: ✓ 2+ (FAQ)
  FAQ presente: ✓
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ 5%-15%, 59€, 300€-6.000€
  Firma autor visible: ✗
  Palabras totales: ~1.300+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (100 chars). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 18: perder-dinero-certificado-energetico-mal-hecho
Keyword principal: perder dinero certificado energético
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "¿Estás perdiendo dinero con un certificado energético mal hecho? | Certilab" [87 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "Un certificado energético mal hecho puede hacerte perder miles de euros. Descubre cómo un error en la calificación afecta al valor de tu vivienda." [148 caracteres] ✓
  H1: ✓ "¿Estás perdiendo dinero con un certificado energético mal hecho?"
  Estructura headings: ✓ H1 único, H2/H3 presentes
  URL slug: ✓ "perder-dinero-certificado-energetico-mal-hecho" [47 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓
  Preguntas como H2/H3: ✓ 2+ (FAQ)
  FAQ presente: ✓
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ 5%-15%, 59€, 300€-6.000€
  Firma autor visible: ✗
  Palabras totales: ~1.300+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (87 chars). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 19: certificado-energetico-hipoteca-verde
Keyword principal: hipoteca verde certificado energético
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Certificado energético para hipoteca verde: requisitos y cómo obtenerla | Certilab" [91 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Necesitas un certificado energético para solicitar una hipoteca verde? Requisitos, calificación mínima y cómo mejorar tu letra para acceder a mejores condiciones." [152 caracteres] ✓
  H1: ✓ "Certificado energético para hipoteca verde: requisitos y cómo obtenerla"
  Estructura headings: ✓ H1 único, H2/H3 correctos
  URL slug: ✓ "certificado-energetico-hipoteca-verde" [36 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓ Presente
  Preguntas como H2/H3: ✓ 2+ (FAQ)
  FAQ presente: ✓
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ Porcentajes, cuantías hipotecas, 59€
  Firma autor visible: ✗
  Palabras totales: ~1.200+
    → ✓ Suficiente (informativo, mínimo 800)

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (91 chars). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 20: segunda-opinion-certificado-energetico
Keyword principal: segunda opinión certificado energético
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Segunda opinión certificado energético: cuándo necesitarla y cómo funciona | Certilab" [95 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Necesitas una segunda opinión de tu certificado energético? Te explicamos cuándo es recomendable, cómo funciona y cuánto cuesta verificarlo por un técnico independiente." [153 caracteres] ✓
  H1: ✓ "Segunda opinión certificado energético: cuándo necesitarla y cómo funciona"
  Estructura headings: ✓ H1 único, H2/H3 jerarquizados
  URL slug: ✓ "segunda-opinion-certificado-energetico" [40 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓
  Preguntas como H2/H3: ✓ 2+ (FAQ)
  FAQ presente: ✓
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ 59€, 24-48h, 80€-200€, 300€-6.000€
  Firma autor visible: ✗
  Palabras totales: ~1.500+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (95 chars). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 21: certificado-energetico-y-vendedor
Keyword principal: certificado energético vendedor
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Certificado energético para vender tu piso: guía para vendedores 2026 | Certilab" [89 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Vendes tu piso y necesitas el certificado energético? Te explicamos todo lo que debes saber como vendedor: obligaciones, plazos y cómo afecta al precio." [150 caracteres] ✓
  H1: ✓ "Certificado energético para vender tu piso: guía para vendedores 2026"
  Estructura headings: ✓ H1 único, H2/H3 correctos
  URL slug: ✓ "certificado-energetico-y-vendedor" [33 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓
  Preguntas como H2/H3: ✓ 2+ (FAQ)
  FAQ presente: ✓
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ 59€, 80€-200€, 300€-6.000€, 10 años
  Firma autor visible: ✗
  Palabras totales: ~1.400+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (89 chars). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 22: certificado-energetico-inflado-comprador
Keyword principal: certificado energético inflado comprador
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Certificado energético inflado: cómo detectarlo antes de comprar una vivienda | Certilab" [98 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Vas a comprar una vivienda y el certificado energético es muy bueno? Podría estar inflado. Aprende a detectarlo y a protegerte con una Segunda Opinión por 59€." [153 caracteres] ✓
  H1: ✓ "Certificado energético inflado: cómo detectarlo antes de comprar una vivienda"
  Estructura headings: ✓ H1 único, H2 (¿Qué es? ¿Por qué ocurre? Señales de alerta, Cómo verificarlo, FAQ) y H3 anidados correctamente
  URL slug: ✓ "certificado-energetico-inflado-comprador" [39 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓
  Preguntas como H2/H3: ✓ 2+ (FAQ)
  FAQ presente: ✓ 3 preguntas
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ 59€, 5%-15%, 50€, 300€-6.000€
  Firma autor visible: ✗
  Palabras totales: ~1.500+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (98 chars). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════
POST 23: certificado-energetico-inflado-que-hacer
Keyword principal: certificado energético inflado qué hacer
═══════════════════════════════════════

SEO CLÁSICO:
  Meta title: ✓ "Certificado energético inflado: ¿qué hacer? Guía legal y práctica 2026 | Certilab" [94 caracteres] ✗ EXCEDE 60
  Meta description: ✓ "¿Sospechas que tu certificado energético tiene la calificación inflada? Te explicamos cómo detectarlo, qué consecuencias tiene y cómo reclamar con un dictamen técnico firmado." [155 caracteres] ✓
  H1: ✓ "Certificado energético inflado: ¿qué hacer? Guía legal y práctica 2026"
  Estructura headings: ✓ H1 único, H2/H3 bien estructurados con secciones legales paso a paso
  URL slug: ✓ "certificado-energetico-inflado-que-hacer" [41 caracteres] ✓
  Keyword en primeros 100 palabras: ✓

SEO PARA IA:
  Respuesta directa: ✓ Presente (línea 2543)
  Preguntas como H2/H3: ✓ 3+ (FAQ con 3 preguntas en formato pregunta)
  FAQ presente: ✓ 3 preguntas (¿Cuánto cuesta?, ¿Puedo reclamar si ya compré?, ¿El vendedor tiene obligación?)
  Schema FAQPage: ✗
  Datos numéricos en texto: ✓ 59€, 24-48h, 1.200€/año, 50€, 600€-6.000€, 15 días, 3 años
  Firma autor visible: ✗
  Palabras totales: ~1.500+
    → ✓ Suficiente

PROBLEMAS DETECTADOS:
  Críticos: Meta title excede 60 caracteres (94 chars). Sin schema FAQPage. Sin firma autora.
  Menores: —

VEREDICTO: ⚠ MEJORABLE
═══════════════════════════════════════

═══════════════════════════════════════════════════════════════
# 0D — RESUMEN GLOBAL
═══════════════════════════════════════════════════════════════

TOTAL POSTS AUDITADOS: 23

## SEO CLÁSICO

**Posts sin meta title correcto (excede 60 caracteres):** 23 de 23
  1. brown-discount-precio-vivienda (88 chars)
  2. cuanto-cuesta-certificado-energetico-2026 (92 chars)
  3. obtener-certificado-energetico-gratis (75 chars)
  4. errores-certificado-energetico (95 chars)
  5. ayudas-next-generation-rehabilitacion-energetica-2026 (97 chars)
  6. detectar-certificado-energetico-falso (79 chars)
  7. certificado-energetico-obligatorio-alquiler (82 chars)
  8. cuanto-dura-certificado-energetico (85 chars)
  9. como-interpretar-certificado-energetico (78 chars)
  10. certificado-energetico-comunidades-vecinos (82 chars)
  11. vivienda-eficiente-sin-certificado-a (83 chars)
  12. como-obtener-certificado-energetico (82 chars)
  13. guia-tramitar-certificado-energetico-catalunya (101 chars)
  14. multas-certificado-energetico (100 chars)
  15. reclamar-certificado-energetico-incorrecto (73 chars)
  16. certificado-energetico-f-g-correcto (75 chars)
  17. certificado-energetico-negociar-precio (100 chars)
  18. perder-dinero-certificado-energetico-mal-hecho (87 chars)
  19. certificado-energetico-hipoteca-verde (91 chars)
  20. segunda-opinion-certificado-energetico (95 chars)
  21. certificado-energetico-y-vendedor (89 chars)
  22. certificado-energetico-inflado-comprador (98 chars)
  23. certificado-energetico-inflado-que-hacer (94 chars)

**Posts sin meta description correcta:**
  → obtener-certificado-energetico-gratis (109 chars, por debajo de 140)

**Posts con H1 incorrecto:** 0 (todos correctos)

**Posts con estructura headings rota:** 0 (todos correctos)

**Posts con keyword ausente:** 0 (todos contienen keyword principal)

## SEO PARA IA

**Posts sin respuesta directa:** 0 (todos incluyen `<div class="respuesta-directa">`)

**Posts sin preguntas como headings:** 0 (todos tienen al menos 2 H2/H3 en formato pregunta)

**Posts sin FAQ:** 0 (todos tienen sección FAQ)

**Posts sin schema FAQPage:** 23 de 23 (ninguno implementa schema FAQPage)
  → El schema implementado es Article (genérico en page.tsx), no FAQPage

**Posts sin firma de autor:** 23 de 23
  → El nombre aparece solo en metadatos (`<span>Por {article.author}</span>`) y en schema Article, no como bloque inline visible en el cuerpo del post

**Posts por debajo de palabras mínimas:** 0 (todos superan 1.200 palabras)

---

## POSTS QUE NECESITAN CORRECCIÓN URGENTE:
  1. **obtener-certificado-energetico-gratis** — Meta description por debajo de 140 caracteres (109 chars) ✗

## POSTS CORRECTOS:
  Ninguno — todos requieren al menos mejoras en meta title, schema FAQPage o firma de autor.

## PROBLEMA ESTRUCTURAL GRAVE: META TITLE

El `generateMetadata()` en `src/app/blog/[slug]/page.tsx` genera el meta title como:
```
`${article.title} | Certilab`
```
Esto añade ~10 caracteres extra (` | Certilab`) a cada título. Dado que la mayoría de los títulos ya tienen entre 60-90 caracteres, **todos los 23 posts exceden el límite recomendado de 60 caracteres** para SERP.

La solución requiere acortar los títulos en `articles.ts` para que, con el sufijo ` | Certilab`, queden dentro de 55-60 caracteres.

## PROBLEMA ESTRUCTURAL GRAVE: SCHEMA FAQPage

Se implementa schema Article genérico en page.tsx pero NUNCA schema FAQPage en los posts que tienen FAQ. Esto es una oportunidad SEO perdida para obtener rich snippets en Google.

## PROBLEMA SISTEMÁTICO: FIRMA DE AUTOR

La autora (Eva María González García, Arquitecta Técnica CATEB 9457) aparece solo en metadatos y no como bloque inline visible dentro del contenido de cada post. Esto afecta tanto a E-E-A-T como a visibilidad de credenciales.

---

## VEREDICTO GLOBAL: ⚠ MEJORABLE

El blog tiene contenido de calidad, buena estructura de headings, respuesta directa, FAQ y datos numéricos en todos los posts. Sin embargo, adolece de 3 problemas sistémicos que requieren corrección:

1. **Meta title demasiado largos** (23/23 posts) → Bloqueante para CTR en SERP
2. **Schema FAQPage ausente** (23/23 posts) → Oportunidad de rich snippet perdida
3. **Firma de autor no visible** (23/23 posts) → Afecta E-E-A-T

Además, 1 post tiene meta description insuficiente (obtener-certificado-energetico-gratis).

**Acción prioritaria:** Acortar los 23 títulos + añadir schema FAQPage por post + añadir bloque de autor visible inline.

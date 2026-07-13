# CF-030 — PITR™ Expert Knowledge Engine

> **⚠️ V2+ — NO IMPLEMENTAR EN MVP V1**
> Este documento corresponde al módulo avanzado de inspección PITR™, planificado para V2+. Define el motor de conocimiento experto para auditoría remota de certificados energéticos, un producto/servicio futuro fuera del alcance del MVP V1. No debe implementarse ni integrarse durante el desarrollo del MVP.
> Durante V1 se utiliza el flujo simplificado definido en CF-028 (Expediente Workflow) en lugar de este motor completo.

> **El activo más importante de Certilab no es código. No es un formulario. Es la metodología PITR™.**
>
> Este documento codifica el conocimiento experto necesario para que un Arquitecto Técnico pueda completar un CE3X con la máxima precisión posible SIN desplazamiento al inmueble.
>
> No sustituye al Arquitecto Técnico. No sustituye CE3X. No promete precisión absoluta. El objetivo es reducir al máximo la incertidumbre.

---

**Versión:** 1.0.0  
**Fecha:** 02/07/2026  
**Autor:** Certilab Knowledge Engineering  
**Estado:** ✅ Vigente  
**Tipo:** Conocimiento Experto  
**Relación:** CF-012 (PITR Motor), CF-000 (Project Brain)

---

## ÍNDICE

1. [Propósito y filosofía](#1-propósito-y-filosofía)
2. [Mapa de variables CE3X](#2-mapa-de-variables-ce3x)
3. [Grupo A — Datos generales del edificio](#3-grupo-a--datos-generales-del-edificio)
4. [Grupo B — Clima y emplazamiento](#4-grupo-b--clima-y-emplazamiento)
5. [Grupo C — Envolvente térmica: Fachadas](#5-grupo-c--envolvente-térmica-fachadas)
6. [Grupo D — Envolvente térmica: Cubiertas](#6-grupo-d--envolvente-térmica-cubiertas)
7. [Grupo E — Envolvente térmica: Suelos](#7-grupo-e--envolvente-térmica-suelos)
8. [Grupo F — Envolvente térmica: Huecos (ventanas)](#8-grupo-f--envolvente-térmica-huecos-ventanas)
9. [Grupo G — Envolvente térmica: Puentes térmicos](#9-grupo-g--envolvente-térmica-puentes-térmicos)
10. [Grupo H — Instalaciones: Calefacción](#10-grupo-h--instalaciones-calefacción)
11. [Grupo I — Instalaciones: Refrigeración](#11-grupo-i--instalaciones-refrigeración)
12. [Grupo J — Instalaciones: ACS](#12-grupo-j--instalaciones-acs)
13. [Grupo K — Instalaciones: Ventilación](#13-grupo-k--instalaciones-ventilación)
14. [Grupo L — Instalaciones: Iluminación (terciario)](#14-grupo-l--instalaciones-iluminación-terciario)
15. [Grupo M — Energías renovables](#15-grupo-m--energías-renovables)
16. [Grupo N — Demanda y consumo](#16-grupo-n--demanda-y-consumo)
17. [Grupo O — Certificado original auditado](#17-grupo-o--certificado-original-auditado)
18. [Matriz de inferencia y contradicciones](#18-matriz-de-inferencia-y-contradicciones)
19. [Glosario de términos CE3X](#19-glosario-de-términos-ce3x)
20. [Árbol de Decisión Dinámico PITR™](#20-árbol-de-decisión-dinámico-pitr)
21. [Apéndice A — Protocolo Oficial de Captura Fotográfica](#21-apéndice-a--protocolo-oficial-de-captura-fotográfica)
22. [Apéndice B — Flujo de decisión para revisión manual](#22-apéndice-b--flujo-de-decisión-para-revisión-manual)
23. [Apéndice C — Referencias normativas](#23-apéndice-c--referencias-normativas)

---

## 1. Propósito y filosofía

### 1.1 ¿Qué es este documento?

Es un **motor de conocimiento experto** que organiza por variable CE3X (no por preguntas) toda la información necesaria para realizar una inspección técnica remota. Cada variable incluye:

- **Variable CE3X** — Identificador y nombre según el software oficial.
- **Qué representa** — Significado físico y normativo de la variable.
- **Cómo se obtiene** — Método de obtención remota.
- **Evidencias válidas** — Documentos, datos, testimonios que la sustentan.
- **Fotografías necesarias** — Imágenes específicas que debe aportar el cliente.
- **Documentación útil** — Documentos que pueden complementar o verificar la variable.
- **Preguntas al cliente** — Preguntas en lenguaje llano para obtener el dato.
- **Reglas de inferencia** — Cómo deducir la variable cuando no es directamente observable.
- **Posibles contradicciones** — Señales de alerta que indican que el dato puede ser incorrecto.
- **Nivel de confianza** — Estimación de fiabilidad de la variable obtenida remotamente.
- **Casos donde es obligatoria la revisión manual** — Circunstancias que requieren visita presencial.

### 1.2 Principios rectores

1. **El cliente nunca hace trabajo técnico.** Las preguntas están en lenguaje llano. El cliente no calcula, no interpreta normativa, no decide qué es relevante.
2. **Máxima información, mínima carga.** Obtener el máximo de datos con el mínimo de preguntas al cliente. La información se obtiene primero de fuentes documentales y solo se pregunta lo que no puede inferirse.
3. **Toda variable tiene un nivel de confianza.** El Arquitecto Técnico sabe en todo momento qué grado de certidumbre tiene cada dato.
4. **La contradicción es información.** Cuando dos fuentes discrepan, eso no es un error: es un dato que debe registrarse y evaluarse.
5. **La revisión manual no es un fracaso.** Hay variables que no pueden determinarse sin visita. Documentarlas como tal es parte del proceso.

### 1.3 Flujo de obtención de variables

```
1. DOCUMENTACIÓN → Certificado original, catastro, escrituras
   │
   ▼
2. FOTOGRAFÍAS → Evidencia visual del cliente
   │
   ▼
3. PREGUNTAS AL CLIENTE → Lo que no se puede ver ni documentar
   │
   ▼
4. INFERENCIA → Aplicación de reglas sobre los datos obtenidos
   │
   ▼
5. VALIDACIÓN → Detección de contradicciones
   │
   ▼
6. ASIGNACIÓN DE CONFIANZA → Evaluación de fiabilidad
```

---

## 2. Mapa de variables CE3X

### 2.1 Clasificación general

| Grupo | Variables | Categoría |
|-------|-----------|-----------|
| A | A1-A10 | Datos generales del edificio |
| B | B1-B8 | Clima y emplazamiento |
| C | C1-C20 | Envolvente térmica: Fachadas |
| D | D1-D12 | Envolvente térmica: Cubiertas |
| E | E1-E10 | Envolvente térmica: Suelos |
| F | F1-F18 | Envolvente térmica: Huecos (ventanas) |
| G | G1-G8 | Puentes térmicos |
| H | H1-H18 | Calefacción |
| I | I1-I12 | Refrigeración |
| J | J1-J10 | ACS |
| K | K1-K6 | Ventilación |
| L | L1-L8 | Iluminación (terciario) |
| M | M1-M10 | Energías renovables |
| N | N1-N8 | Demanda y consumo |
| O | O1-O10 | Certificado original auditado |

### 2.2 Variables totales

Este documento cubre aproximadamente **150 variables** necesarias para un certificado energético CE3X completo. Cada variable puede tener múltiples sub-variables (ej. espesor de aislamiento, tipo de material) que se desglosan en el cuerpo del documento.

---

## 3. Grupo A — Datos generales del edificio

### A1 — Dirección del inmueble

**Variable CE3X:** Dirección completa (calle, número, piso, puerta, código postal, municipio, provincia).

**Qué representa:** Identificación única del inmueble. Determina la zona climática al cruzarse con el código postal.

**Cómo se obtiene:**
- Del certificado energético original (si existe).
- De la referencia catastral consultando la Sede Electrónica del Catastro.
- Pregunta directa al cliente (verificar con documentación).

**Evidencias válidas:**
- Certificado energético original (PDF).
- Escrituras o nota simple del Registro de la Propiedad.
- Recibo del IBI.
- Contrato de alquiler o compraventa.

**Fotografías necesarias:**
- No aplica (dato alfanumérico).

**Documentación útil:**
- Sede Electrónica del Catastro (validación cruzada).
- Google Maps / Street View (verificación visual de la ubicación).

**Preguntas al cliente:**
- "¿Cuál es la dirección completa del inmueble? Incluye piso y puerta si aplica."
- "¿Tienes el recibo del IBI a mano? La dirección que aparece allí es la referencia que necesito."

**Reglas de inferencia:**
- Si se dispone de referencia catastral, la dirección puede obtenerse automáticamente desde el Catastro.
- La dirección del certificado debe coincidir con la del IBI y con la declarada por el cliente. Si discrepan, hay que determinar cuál es la correcta.

**Posibles contradicciones:**
- La dirección del certificado no coincide con la del IBI.
- El cliente declara una dirección que no existe en Catastro.
- El código postal no corresponde con el municipio declarado.

**Nivel de confianza:**
- Con documentos oficiales: 95%
- Solo con declaración del cliente: 70%
- Con contradicciones no resueltas: 40%

**Casos donde es obligatoria la revisión manual:**
- Cuando no se puede verificar la dirección con ninguna fuente documental.
- Cuando hay discrepancias entre fuentes que no pueden resolverse por teléfono.

---

### A2 — Referencia catastral

**Variable CE3X:** RC de 14 o 20 caracteres (formato: 0000000XX0000X0000XX o similar según normativa catastral).

**Qué representa:** Identificador único del inmueble en el Catastro Inmobiliario Español. Permite cruzar datos oficiales de superficie, año de construcción, uso, etc.

**Cómo se obtiene:**
- Del certificado energético original (todos los certificados deben incluir la RC).
- Del recibo del IBI.
- De las escrituras del inmueble.
- Pregunta directa al cliente.

**Evidencias válidas:**
- Certificado energético original (la RC debe aparecer en el encabezado).
- Recibo del IBI.
- Escrituras.
- Sede Electrónica del Catastro (consulta directa).

**Fotografías necesarias:**
- Foto del recibo del IBI (se puede ocultar el importe, pero debe verse la RC).
- Foto de la página del certificado donde aparece la RC.

**Documentación útil:**
- Sede Electrónica del Catastro: https://www.sedecatastro.gob.es/
- Certificado energético original.

**Preguntas al cliente:**
- "¿Tienes el recibo del IBI? La referencia catastral es un código de 14 o 20 caracteres que aparece en la parte superior."
- "En tu certificado energético, ¿aparece la referencia catastral? Puedes buscar en la primera página."

**Reglas de inferencia:**
- El formato de 14 caracteres corresponde a inmuebles (urbana). El de 20 a parcelas (rústica).
- El último dígito es un carácter de control que puede validarse algorítmicamente.
- La RC permite obtener automáticamente: superficie construida, superficie del suelo, año de construcción, uso principal, y coordenadas.

**Posibles contradicciones:**
- La RC no pasa la validación de formato (dígito de control incorrecto).
- La RC del certificado no coincide con la del IBI.
- La RC corresponde a un uso diferente al declarado (ej. la RC dice "industrial" pero el cliente dice "vivienda").

**Nivel de confianza:**
- Con RC verificada en Catastro: 100% (dato oficial).
- Con RC del certificado sin verificar: 85% (puede tener errores tipográficos).
- Con solo declaración del cliente: 50%.

**Casos donde es obligatoria la revisión manual:**
- Cuando la RC no puede validarse en Catastro y el cliente no tiene documentación que la acredite.
- En inmuebles sin RC asignada (inmuebles ilegales, en proceso de regularización).

---

### A3 — Año de construcción

**Variable CE3X:** Año de construcción del edificio (YYYY). Determina el año de referencia normativa (CTE 2006, CTE 2013, CTE 2019) y los valores por defecto de transmitancia.

**Qué representa:** El año en que se finalizó la construcción del edificio. Es crítico porque determina qué normativa era aplicable en el momento de la construcción y, por tanto, qué valores de aislamiento son esperables.

**Cómo se obtiene:**
- Consulta en la Sede Electrónica del Catastro (dato oficial: "Año de construcción" del inmueble).
- Del certificado energético original.
- De las escrituras del inmueble (acta de finalización de obra).
- Pregunta directa al cliente (con menor fiabilidad).

**Evidencias válidas:**
- Consulta catastral (la fuente más fiable).
- Certificado energético original.
- Escrituras.
- Licencia de obra o cédula de habitabilidad.

**Fotografías necesarias:**
- No hay una foto directa, pero el estilo arquitectónico visible en fotos de fachada puede servir como indicio (ver reglas de inferencia).

**Documentación útil:**
- Sede Electrónica del Catastro (consulta por RC o dirección).
- Google Street View (versiones históricas pueden mostrar el edificio en construcción o recién construido).
- Fotografías históricas del barrio o zona.

**Preguntas al cliente:**
- "¿Sabes en qué año se construyó el edificio?"
- "Si no estás seguro, ¿podrías mirarlo en el recibo del IBI? A veces aparece el año de construcción."
- "¿El edificio es anterior a 1980? ¿Posterior a 2006?"

**Reglas de inferencia:**
- **Por década constructiva:** Edificios de los 60-70 suelen tener poca o ninguna aislamiento. Los de los 80 pueden tener aislamiento parcial (NBE-CT-79). Los posteriores a 2006 deben tener aislamiento según CTE. Los posteriores a 2013 según CTE-2013. Los posteriores a 2019 según CTE-2019/DB-HE.
- **Por estilo arquitectónico:** Fachadas de ladrillo visto sin aislamiento → probable pre-1980. Cerramientos con cámara de aire → probable post-1980. Edificios con SATE o fachada ventilada → probable post-2006.
- **Por zona urbana:** Barrios de desarrollo planificado (ej. PAU, ensanche) tienen fechas de construcción acotadas.
- **Por tipología de ventanas:** Ventanas de aluminio sin RPT → pre-2000. Ventanas de PVC o aluminio con RPT → post-2000. Ventanas con triple acristalamiento → post-2010.

**Posibles contradicciones:**
- El año de construcción catastral difiere del declarado o del que aparece en el certificado (esto es frecuente: Catastro suele tener el año de la construcción original, pero puede no reflejar reformas integrales).
- El cliente dice "edificio nuevo" pero la fachada muestra desgaste propio de >20 años.
- Las ventanas parecen de una época diferente al año declarado.
- El año de construcción es anterior a la normativa pero el cliente asegura tener aislamiento. Puede ser cierto si hubo rehabilitación, pero debe verificarse.

**Nivel de confianza:**
- Con consulta catastral: 90% (Catastro a veces tiene errores de ±5 años en edificios antiguos).
- Con escrituras: 95%.
- Con certificado original: 80%.
- Con solo declaración del cliente: 50%.

**Casos donde es obligatoria la revisión manual:**
- Cuando el año de construcción es indeterminado y no hay ninguna fuente documental.
- Cuando se sospecha una rehabilitación integral que pueda haber cambiado la envolvente.
- En edificios con ampliaciones o reformas parciales que puedan tener diferentes fechas para diferentes partes.

---

### A4 — Superficie habitable / construida

**Variable CE3X:** Superficie habitable (m²) y superficie construida (m²).

**Qué representa:**
- **Superficie construida:** Área total construida del inmueble incluyendo muros y elementos estructurales.
- **Superficie habitable:** Área útil del inmueble, excluyendo muros, pilares, y zonas no habitables.
- CE3X utiliza principalmente la superficie habitable para el cálculo energético, pero la construida sirve para validación.

**Cómo se obtiene:**
- De la referencia catastral (consulta en Catastro: ofrece superficie construida).
- Del certificado energético original.
- De las escrituras (superficie construida y útil).
- Del recibo del IBI.
- Pregunta directa al cliente.

**Evidencias válidas:**
- Consulta catastral (proporciona superficie construida total, no siempre desglosada por vivienda).
- Certificado energético original.
- Escrituras.
- Recibo del IBI.
- Plano del inmueble (si está disponible).

**Fotografías necesarias:**
- No hay foto directa, pero fotos del interior desde varios ángulos pueden ayudar a estimar la superficie por comparación visual.
- Plano del inmueble (foto de un plano físico si existe).

**Documentación útil:**
- Sede Electrónica del Catastro.
- Google Maps / medición de huella del edificio (para edificios completos).
- Planos del inmueble (formato papel o digital).

**Preguntas al cliente:**
- "¿Cuántos metros cuadrados tiene la vivienda aproximadamente?"
- "¿Aparece la superficie en tu certificado energético o en las escrituras?"
- "¿La vivienda tiene algún espacio no contabilizado como terraza, trastero o garaje?"

**Reglas de inferencia:**
- **Por comparación catastral:** Si el Catastro da la superficie construida del edificio completo, y el cliente sabe cuántas viviendas hay por planta, se puede estimar la superficie por cociente.
- **Por fotografía:** Una cama estándar mide 1.50m × 1.90m ≈ 2.85m². Un azulejo estándar mide 20×20cm o 30×30cm. Se puede usar como referencia visual para estimar dimensiones de estancias.
- **Por tipología:** Un piso de 3 dormitorios en España suele tener entre 70-90m². Un piso de 2 dormitorios entre 50-70m². Una casa unifamiliar entre 100-200m².
- **Por planos:** Si se dispone del plano en formato de imagen y se conoce una dimensión de referencia, se puede escalar y medir.

**Posibles contradicciones:**
- La superficie del certificado difiere de la catastral (común: el certificado inflado suele declarar más superficie para justificar mayor consumo).
- La superficie declarada por el cliente no es coherente con el número de habitaciones (ej. 40m² con 3 dormitorios).
- La superficie no cuadra con la huella del edificio visible en Google Maps.

**Nivel de confianza:**
- Con escrituras o Catastro: 90%.
- Con certificado original: 75% (puede estar inflado).
- Con declaración del cliente: 50%.

**Casos donde es obligatoria la revisión manual:**
- Cuando hay diferencias >20% entre fuentes.
- Cuando no se dispone de ninguna fuente documental.
- En inmuebles con distribuciones atípicas o reformas que hayan modificado la superficie.

---

### A5 — Número de plantas del edificio / Altura de planta

**Variable CE3X:** Número de plantas sobre rasante y bajo rasante. Altura libre de planta (m).

**Qué representa:**
- El número de plantas determina la compacidad del edificio y la exposición de fachadas y cubierta.
- La altura libre de planta (de suelo a techo) influye en el volumen calefactado y, por tanto, en la demanda energética.

**Cómo se obtiene:**
- Observación visual del edificio (fotografías de fachada desde lejos y desde cerca).
- Google Street View (para ver la altura del edificio desde la calle).
- Consulta catastral (a veces incluye "Número de plantas").
- Certificado energético original.
- Pregunta al cliente.

**Evidencias válidas:**
- Foto de fachada completa del edificio (desde la acera de enfrente, si es posible).
- Foto de la puerta de entrada con referencia de altura (persona al lado).
- Certificado energético original.
- Consulta catastral.

**Fotografías necesarias:**
- [F01] Fachada completa del edificio desde el exterior (alejado, mostrando todo el alzado).
- [F02] Detalle de la entrada con persona como referencia de escala.
- [F03] Interior de una habitación mostrando la altura de techo (incluyendo una referencia de tamaño conocida).

**Documentación útil:**
- Google Street View.
- Consulta catastral (datos del inmueble).
- Fotos aéreas / Google Maps (satélite).

**Preguntas al cliente:**
- "¿En qué planta está la vivienda? ¿Cuántas plantas tiene el edificio en total?"
- "¿Tiene el edificio sótano, garaje subterráneo o plantas bajo rasante?"
- "¿Sabes la altura del techo? Suele ser entre 2.30m y 2.70m."

**Reglas de inferencia:**
- **Altura estándar:** En edificios residenciales, la altura libre suele ser 2.50m ± 0.20m. En edificios anteriores a 1980 puede ser mayor (2.70-3.00m). En locales comerciales suele ser >3.00m.
- **Número de plantas:** La altura total del edificio dividido por 3m (incluyendo forjados) da una estimación del número de plantas.
- **Sótano:** Si el edificio tiene ventilación baja (rejillas a nivel de calle), probablemente tiene sótano o garaje.
- **Ático:** Las plantas ático suelen tener techos inclinados o menor altura en algunas zonas.

**Posibles contradicciones:**
- El cliente dice 10 plantas pero el edificio visiblemente tiene 8.
- La altura declarada no es coherente con el año de construcción (edificios antiguos suelen tener mayor altura).
- El número de plantas del certificado no coincide con la realidad observable en fotos.

**Nivel de confianza:**
- Con fotografía de fachada completa: 95% (número de plantas).
- Con Street View: 90%.
- Con declaración del cliente: 70%.
- Altura: 60% sin medición directa.

**Casos donde es obligatoria la revisión manual:**
- Cuando la geometría del edificio es compleja (desniveles, escalonamientos, plantas retranqueadas).
- Cuando hay entreplantas o altillos no registrados.
- Cuando la altura de techo es necesaria con precisión (edificios singulares).

---

### A6 — Número de viviendas del edificio / Ubicación de la vivienda en el edificio

**Variable CE3X:** Número total de viviendas del edificio. Posición de la vivienda dentro del edificio (bajo, medio, ático, entre medianeras, esquinero).

**Qué representa:**
- El número de viviendas ayuda a determinar la superficie media y el reparto de consumos comunes.
- La posición determina la exposición a la envolvente: una vivienda entre medianeras tiene menos pérdidas que una esquinera o un ático.
- Las viviendas en planta baja pueden tener pérdidas por el suelo. Las de ático por la cubierta.

**Cómo se obtiene:**
- Pregunta directa al cliente.
- Certificado energético original.
- Consulta catastral (datos del edificio completo).
- Observación visual (número de puertas, buzones, ventanas en fachada).

**Evidencias válidas:**
- Foto de los buzones del edificio (número de unidades).
- Foto de la fachada (número de ventanas por planta indica número de viviendas).
- Certificado energético original.

**Fotografías necesarias:**
- [F04] Fachada completa del edificio (para ver el número de viviendas por planta).
- [F05] Buzones del edificio (opcional, pero útil).

**Documentación útil:**
- Google Street View.
- Consulta catastral.
- Escrituras (describen la posición de la vivienda en el edificio).

**Preguntas al cliente:**
- "¿En qué planta está tu vivienda exactamente?"
- "¿Tu vivienda está entre dos vecinos (entre medianeras) o es esquinera?"
- "¿Tienes vecinos arriba y abajo? ¿O estás en un ático o en planta baja?"
- "¿Cuántas viviendas hay en total en el edificio?"

**Reglas de inferencia:**
- **Posición por fotos de ventanas:** Mirando la fachada, si la vivienda tiene ventanas a un solo lado → probablemente entre medianeras. Si tiene ventanas a dos fachadas → esquinera.
- **Planta baja vs. ático:** Si las ventanas están alineadas con la acera → planta baja. Si están cerca de la cornisa → ático.
- **Edificio plurifamiliar:** En edificios de viviendas, el número de buzones suele equivaler al número de viviendas.

**Posibles contradicciones:**
- La posición declarada no coincide con las fotos de ventanas (ej. dice "ático" pero las ventanas están a nivel de calle).
- El número de viviendas declarado no cuadra con el número de buzones o contadores.

**Nivel de confianza:**
- Con fotos de fachada: 85%.
- Con declaración del cliente: 80%.
- Con certificado: 75%.

**Casos donde es obligatoria la revisión manual:**
- Cuando la distribución del edificio es compleja (locales comerciales que comparten envolvente con viviendas, dúplex, áticos con terrazas privativas).

---

### A7 — Uso del edificio

**Variable CE3X:** Uso principal del edificio (residencial, terciario, industrial). En CE3X se distingue entre vivienda unifamiliar, vivienda en bloque, y usos terciarios (oficinas, comercial, hotel, etc.).

**Qué representa:** El perfil de uso determina las cargas internas, los horarios de ocupación, y las temperaturas de consigna. Un uso residencial tiene cargas internas diferentes a un uso de oficina.

**Cómo se obtiene:**
- Pregunta directa al cliente.
- Certificado energético original.
- Consulta catastral (uso catastral del inmueble).
- Escrituras.

**Evidencias válidas:**
- Certificado energético original.
- Consulta catastral.
- Escrituras.
- Fotografías del interior (distribución y mobiliario típico del uso).

**Fotografías necesarias:**
- [F06] Interior de cada estancia (salón, dormitorios, cocina, baños) para confirmar el uso residencial o identificar usos mixtos.

**Documentación útil:**
- Licencia de actividad (para usos terciarios o industriales).
- Catastro.

**Preguntas al cliente:**
- "¿La vivienda se usa como residencia habitual, vacacional, o está alquilada?"
- "¿Hay algún espacio que se use como despacho, taller o negocio?"

**Reglas de inferencia:**
- El uso es el que determina el perfil de demanda horaria. CE3X tiene perfiles predefinidos.
- Si hay usos mixtos (ej. vivienda con despacho profesional), debe considerarse el uso principal.

**Posibles contradicciones:**
- El cliente declara uso residencial pero las fotos muestran mobiliario y distribución de oficina.
- El Catastro indica uso diferente al declarado.

**Nivel de confianza:**
- Con Catastro + fotos: 95%.
- Con declaración del cliente: 80%.

**Casos donde es obligatoria la revisión manual:**
- Usos mixtos complejos.
- Locales comerciales con trastienda o vivienda incorporada.

---

### A8 — Tipo de edificio / Agrupación

**Variable CE3X:** Tipo de edificio: unifamiliar aislada, unifamiliar pareada, unifamiliar adosada, edificio plurifamiliar entre medianeras, edificio plurifamiliar exento, edificio plurifamiliar en esquina.

**Qué representa:** La agrupación del edificio determina cuántas caras de la envolvente están expuestas al exterior y cuántas son medianeras con otros edificios. Esto impacta directamente en las pérdidas por transmisión.

**Cómo se obtiene:**
- Fotografías de la fachada y los laterales del edificio.
- Google Street View (vista 360° del edificio y sus colindantes).
- Pregunta directa al cliente.
- Certificado energético original.

**Evidencias válidas:**
- [F07] Foto de la fachada principal.
- [F08] Foto de la fachada trasera si es accesible.
- [F09] Fotos de los laterales del edificio (mostrando si hay separación con otros edificios o si están adosados).
- Google Street View (capturas de pantalla).

**Fotografías necesarias:**
- [F07] Fachada principal desde la acera de enfrente.
- [F08] Lateral izquierdo (si es visible desde la vía pública).
- [F09] Lateral derecho (si es visible desde la vía pública).
- [F10] Fachada trasera (si el cliente puede acceder a la parte trasera del edificio).

**Documentación útil:**
- Google Maps / Street View (esencial para determinar agrupación).
- Catastro (los planos catastrales muestran la forma y agrupación del edificio).

**Preguntas al cliente:**
- "¿El edificio está pegado a otros edificios por los lados? ¿O está separado?"
- "¿Tienes vecinos a izquierda y derecha? ¿O el edificio está aislado?"
- "¿Hay separación entre tu edificio y el de al lado?"

**Reglas de inferencia:**
- **Medianería:** Si el edificio no tiene separación visible entre edificios colindantes → entre medianeras. Si hay separación de al menos 0.5m → pareado o exento.
- **Adosada vs. pareada:** Adosada: pegada por ambos lados. Pareada: pegada por un lado. Exenta: sin contacto con otros edificios.
- **En esquina:** Esquinero cuando el edificio da a dos calles diferentes. Es visible en Google Street View.
- **Plano catastral:** La forma del edificio en el plano catastral (consulta por RC) indica claramente la agrupación.

**Posibles contradicciones:**
- El cliente dice "adosado" pero las fotos muestran separación lateral.
- El certificado indica "entre medianeras" pero el edificio es visiblemente esquinero.

**Nivel de confianza:**
- Con fotos + Street View: 95%.
- Con solo fotos: 80%.
- Con solo declaración: 60%.

**Casos donde es obligatoria la revisión manual:**
- Cuando no hay acceso visual a los laterales del edificio (ej. calles estrechas sin vista lateral).
- En edificios con geometrías complejas (retranqueos, patios interiores compartidos).

---

### A9 — Orientación del inmueble

**Variable CE3X:** Orientación de la fachada principal y de las fachadas expuestas (N, S, E, O, NE, NO, SE, SO). En CE3X, la orientación afecta a la radiación solar incidente sobre fachadas y ventanas.

**Qué representa:** La dirección cardinal hacia la que miran las fachadas del inmueble. La orientación sur recibe más radiación solar (beneficiosa en invierno, perjudicial en verano sin protección). La orientación norte recibe mínima radiación.

**Cómo se obtiene:**
- De la dirección del inmueble (las calles tienen orientación conocida en la mayoría de los casos).
- De Google Maps (ver la orientación del edificio en mapa satelital).
- De una brújula digital (el cliente puede usar el móvil).
- De fotografías con hora conocida (la posición del sol indica la orientación).

**Evidencias válidas:**
- Captura de Google Maps con la orientación del edificio marcada.
- Foto de la fachada con la hora y fecha EXIF.
- Certificado energético original (normalmente incluye la orientación).
- Declaración del cliente con verificación por mapa.

**Fotografías necesarias:**
- [F11] Fachada principal (la que da a la calle) — si es posible con luz solar que permita identificar la orientación.
- [F12] Fachada sur (la que recibe más sol) si es identificable por el cliente.

**Documentación útil:**
- Google Maps (satélite + vista callejero).
- Catastro (planos parcelarios con orientación).
- Aplicaciones de brújula en smartphone.
- Página web: suncalc.org para calcular la posición solar según hora y ubicación.

**Preguntas al cliente:**
- "¿Sabes hacia dónde mira la fachada principal de tu casa? ¿Sale el sol por la mañana en tu salón?"
- "Con el móvil, puedes usar la brújula para ver hacia dónde mira tu calle."
- "¿El sol da en las ventanas por la mañana, al mediodía o por la tarde?"

**Reglas de inferencia:**
- **Por hora solar:** Si el cliente dice "el sol me da en la fachada principal por la mañana" → orientación ESTE. "A mediodía" → SUR. "Por la tarde" → OESTE.
- **Por mapa:** Una vez conocidas las coordenadas (por dirección o RC), Google Maps muestra la orientación exacta del edificio.
- **Por nombre de calle:** Las calles que cruzan una ciudad de este a oeste tienen fachadas norte y sur. Las que van de norte a sur tienen fachadas este y oeste.
- **Por coordenadas geográficas:** La latitud y longitud permiten calcular el ángulo de orientación de la fachada respecto al norte geográfico.

**Posibles contradicciones:**
- La orientación del certificado difiere de la que se deduce de Google Maps.
- El cliente dice "sur" pero las fotos muestran que el sol no da en esa fachada en el horario esperado.
- La orientación declarada es incompatible con la hora solar de las fotografías.

**Nivel de confianza:**
- Con Google Maps: 100% (dato verificable).
- Con fotos + hora EXIF: 90%.
- Con declaración del cliente: 60%.

**Casos donde es obligatoria la revisión manual:**
- Cuando no se puede acceder a Google Maps (zonas sin cobertura de mapa satelital de alta resolución).
- En edificios con geometrías complejas (muchos planos de fachada con diferentes orientaciones).

---

### A10 — Tipo de perfil de uso (CE3X)

**Variable CE3X:** Perfil de uso definido en CE3X (Residencial 24h, Terciario según usos). Se utiliza para definir los horarios de ocupación, cargas internas y temperaturas de consigna.

**Qué representa:** El patrón temporal de ocupación y uso del edificio. Un uso residencial tiene un perfil continuo (24h) con mayor ocupación nocturna. Un uso de oficinas tiene perfil discontinuo con ocupación diurna.

**Cómo se obtiene:**
- Del uso del edificio (variable A7). CE3X tiene perfiles predefinidos:
  - Residencial: ocupación 24h, cargas internas bajas.
  - Terciario: perfiles específicos por actividad.
- Pregunta directa al cliente sobre horarios de ocupación.

**Evidencias válidas:**
- Declaración del cliente sobre horario de ocupación.
- El propio uso del edificio (vivienda familiar = residencial 24h).

**Fotografías necesarias:**
- No aplica.

**Documentación útil:**
- Manual de CE3X (define los perfiles estándar).
- Normativa CTE DB-HE 2019.

**Preguntas al cliente:**
- "¿La vivienda está ocupada durante todo el día? ¿O solo por las tardes y noches?"
- "¿Hay personas en casa durante el día habitualmente?"

**Reglas de inferencia:**
- Una vivienda habitual con ocupación diurna y nocturna → perfil residencial 24h.
- Una vivienda vacacional → mismo perfil residencial 24h (aunque la ocupación sea menor, CE3X no tiene perfil específico para vacacional).
- Local comercial → perfil específico de su categoría (oficina, comercial, hotel, etc.).

**Posibles contradicciones:**
- El perfil declarado no corresponde con el sistema de climatización instalado (ej. perfil residencial 24h con sistema de climatización de alta potencia y programación horaria de oficina).

**Nivel de confianza:**
- Con confirmación de uso: 95%.
- Sin confirmación: 80%.

**Casos donde es obligatoria la revisión manual:**
- Usos mixtos que requieren perfiles combinados.
- Edificios con ocupación atípica (ej. vivienda compartida con turnos rotativos).

---

## 4. Grupo B — Clima y emplazamiento

### B1 — Zona climática (CTE)

**Variable CE3X:** Zona climática según CTE DB-HE (ej. D3, C2, A4). La letra (A-E) corresponde a la severidad climática de invierno. El número (1-5) corresponde a la severidad de verano.

**Qué representa:** La clasificación climática del municipio según el CTE. Determina las exigencias mínimas de aislamiento, los factores de corrección de demanda, y los valores de temperatura exterior de cálculo.

**Cómo se obtiene:**
- Automáticamente a partir del código postal y municipio (variable A1).
- Tabla de zonas climáticas del CTE DB-HE (Apéndice B).
- Consulta en la web del Código Técnico de la Edificación.

**Evidencias válidas:**
- Municipio y código postal verificados (variable A1).
- Tabla oficial de zonas climáticas del CTE.

**Fotografías necesarias:**
- No aplica (se obtiene de tablas oficiales).

**Documentación útil:**
- CTE DB-HE 2019, Apéndice B: Zonas climáticas.
- Herramientas online: "Zona climática por municipio" del MITECO.
- El propio CE3X asigna la zona climática automáticamente al introducir el municipio.

**Preguntas al cliente:**
- No es necesario preguntar. Se obtiene automáticamente de la ubicación.

**Reglas de inferencia:**
- La zona climática de una capital de provincia se aplica a todos los municipios de su zona climática definida en el CTE.
- Si el municipio no está en la tabla, usar la zona de la capital de provincia más cercana.
- La zona climática determina la temperatura exterior de cálculo (invierno y verano) que CE3X utiliza en los cálculos de demanda.

**Posibles contradicciones:**
- El certificado original declara una zona climática diferente a la que corresponde por municipio (posible error en el certificado).
- El cliente dice que "hace más frío/calor" de lo que corresponde a su zona climática (percepción subjetiva ≠ dato climático oficial).

**Nivel de confianza:**
- Con municipio verificado: 100% (dato oficial tabulado).

**Casos donde es obligatoria la revisión manual:**
- Municipios no incluidos en la tabla de zonas climáticas del CTE (caso raro, pero puede ocurrir en pedanías o núcleos de población muy pequeños).

---

### B2 — Temperatura exterior de cálculo (invierno)

**Variable CE3X:** Temperatura seca exterior de cálculo para la demanda de calefacción (°C). Se obtiene de la zona climática.

**Qué representa:** La temperatura exterior de diseño para el cálculo de la carga térmica de calefacción. No es la temperatura mínima absoluta, sino la temperatura estadística de diseño.

**Cómo se obtiene:**
- Automáticamente al asignar la zona climática (B1).
- Tablas del CTE DB-HE o del Documento Básico HS (Salubridad).

**Evidencias válidas:**
- Zona climática (B1).

**Fotografías necesarias:**
- No aplica.

**Documentación útil:**
- CTE DB-HE.
- Manual CE3X.

**Preguntas al cliente:**
- No aplica. Dato tabulado.

**Reglas de inferencia:**
- Es un dato estándar para cada zona climática. No se obtiene del cliente.

**Posibles contradicciones:**
- El certificado original usa una temperatura diferente a la tabulada (posible manipulación para inflar o deflactar la demanda).

**Nivel de confianza:**
- Con zona climática correcta: 100%.

**Casos donde es obligatoria la revisión manual:**
- No aplica.

---

### B3 — Temperatura exterior de cálculo (verano)

**Variable CE3X:** Temperatura seca exterior de cálculo para la demanda de refrigeración (°C).

**Qué representa:** Temperatura de diseño para el cálculo de la carga térmica de refrigeración. Similar a B2 pero para el periodo estival.

**Cómo se obtiene:**
- Automáticamente al asignar la zona climática (B1).
- Tablas del CTE.

**Evidencias válidas:**
- Zona climática (B1).

**Fotografías necesarias:**
- No aplica.

**Documentación útil:**
- CTE DB-HE.
- Manual CE3X.

**Preguntas al cliente:**
- No aplica. Dato tabulado.

**Reglas de inferencia:**
- Es un dato estándar para cada zona climática.

**Posibles contradicciones:**
- Temperatura de cálculo incoherente con el sistema de refrigeración instalado.

**Nivel de confianza:**
- Con zona climática correcta: 100%.

**Casos donde es obligatoria la revisión manual:**
- No aplica.

---

### B4 — Altitud sobre el nivel del mar

**Variable CE3X:** Altitud del municipio (m) o del emplazamiento del edificio.

**Qué representa:** La altitud influye en la temperatura exterior y en la densidad del aire, afectando al cálculo de la demanda energética, especialmente en invierno.

**Cómo se obtiene:**
- Automáticamente a partir del código postal o coordenadas.
- Consulta en Google Maps/Earth (altitud del punto).
- Consulta en datos abiertos del IGN (Instituto Geográfico Nacional).
- Certificado original (si la incluye).

**Evidencias válidas:**
- Coordenadas geográficas del inmueble.
- Datos del IGN.
- Google Earth.

**Fotografías necesarias:**
- No aplica.

**Documentación útil:**
- Google Earth (altitud del punto).
- IGN: https://www.ign.es/
- Datos municipales de altitud (Wikipedia, datos abiertos).

**Preguntas al cliente:**
- "¿El edificio está en una zona llana, en una colina, o en una montaña?" (para verificar que la altitud es coherente con el municipio).

**Reglas de inferencia:**
- La altitud del municipio puede obtenerse de bases de datos abiertas.
- En ciudades costeras la altitud es cercana a 0m. En ciudades de interior puede variar mucho.
- Por cada 100m de altitud adicional, la temperatura media aproximada desciende ≈0.65°C.

**Posibles contradicciones:**
- El edificio está en una zona más elevada que el centro del municipio (ej. urbanizaciones en colinas). Esto es relevante y debe tenerse en cuenta.

**Nivel de confianza:**
- Con coordenadas: 100%.
- Con municipio: 90%.

**Casos donde es obligatoria la revisión manual:**
- Edificios en zonas de altitud muy variable dentro del mismo municipio.

---

### B5 — Exposición al viento / Protección de la fachada

**Variable CE3X:** Grado de protección de la fachada frente al viento (protegida, normal, expuesta).

**Qué representa:** La exposición al viento modifica el coeficiente superficial de transmisión térmica (h_e) y, por tanto, la transmitancia térmica (U) de los cerramientos en contacto con el exterior. Una fachada expuesta tiene mayores pérdidas que una protegida.

**Cómo se obtiene:**
- Observación del entorno mediante fotografías y Google Street View.
- Conocimiento de la zona (urbana consolidada vs. polígono abierto).
- Pregunta al cliente.

**Evidencias válidas:**
- [F13] Foto del entorno del edificio (mostrando otros edificios cercanos, arbolado, orografía).
- Google Street View (vista panorámica del entorno).
- Mapas de viento de la zona (AEMET, datos abiertos).

**Fotografías necesarias:**
- [F13] Entorno del edificio: desde la acera de enfrente mostrando la calle y los edificios colindantes.
- [F14] Vista de la azotea/cubierta si es accesible (en áticos, la exposición es mayor).

**Documentación útil:**
- Google Maps / Street View.
- Datos de viento de AEMET (Agencia Estatal de Meteorología).
- Observación de la vegetación (árboles inclinados por el viento dominante).

**Preguntas al cliente:**
- "¿Es una calle ancha, estrecha, peatonal? ¿Hay edificios altos cerca que protejan del viento?"
- "¿Notas que corre mucho viento en tu calle? ¿O es una zona tranquila?"
- "¿Hay árboles grandes cerca que puedan dar sombra o proteger del viento?"

**Reglas de inferencia:**
- **Protegida:** Centro urbano consolidado con edificios de altura similar a ambos lados. Fachada a calle peatonal estrecha.
- **Normal:** Calles anchas, avenidas, zonas con edificios de baja altura. Es el valor por defecto en la mayoría de casos.
- **Expuesta:** Edificios aislados en zonas abiertas, últimas plantas de edificios altos, fachadas a puertos o grandes espacios abiertos. Zonas costeras expuestas al viento marítimo.
- En CE3X, la exposición al viento modifica ligeramente la transmitancia térmica de la fachada. El efecto suele ser pequeño (<5% en la demanda total), pero debe considerarse.

**Posibles contradicciones:**
- Cliente dice "mucho viento" pero el edificio está en centro urbano consolidado con edificios que lo protegen.
- La exposición declarada en el certificado original no coincide con la observable en Street View.

**Nivel de confianza:**
- Con Street View: 90%.
- Con fotos: 75%.
- Con declaración del cliente: 50%.

**Casos donde es obligatoria la revisión manual:**
- Edificios singulares en ubicaciones extremas (acantilados, cumbres, zonas costeras muy expuestas).
- Cuando la variable tiene un impacto significativo (>10% en la demanda total).

---

### B6 — Sombreamiento de fachadas y ventanas

**Variable CE3X:** Factor de sombra de obstáculos externos (árboles, edificios colindantes, elementos arquitectónicos). Se define como un coeficiente entre 0 y 1 que multiplica la radiación solar incidente.

**Qué representa:** La reducción de la radiación solar que llega a las ventanas y fachadas debido a obstáculos. Es una variable crítica: puede reducir drásticamente las ganancias solares en invierno (negativo) o reducir la sobrecarga térmica en verano (positivo).

**Cómo se obtiene:**
- Mediante fotografías de las ventanas desde el exterior y del entorno.
- Google Street View (visibilidad de obstáculos en la calle).
- Mapas de sombras (SunCalc, Google Earth con sombras activadas).
- Pregunta al cliente.

**Evidencias válidas:**
- [F15] Foto de cada ventana desde el exterior (mostrando si hay toldos, persianas, aleros, u otros elementos de sombra).
- [F16] Foto del entorno cercano mostrando árboles, edificios colindantes, u obstáculos.
- [F17] Foto de la fachada en diferentes momentos del día (si es posible).

**Fotografías necesarias:**
- [F15] Cada ventana visible desde el exterior (con el obstáculo que le da sombra en el encuadre).
- [F16] Panorámica del entorno del edificio (edificios vecinos, árboles, postes).
- [F17] Fachada completa con los elementos de protección solar visibles.
- [F18] Detalle de toldos, persianas venecianas, lamas, o cualquier elemento de sombra.

**Documentación útil:**
- Google Earth (herramienta de simulación de sombras).
- SunCalc (https://www.suncalc.org) para calcular la trayectoria solar en la ubicación.
- Planos del edificio (indican aleros, vuelos, pórticos).

**Preguntas al cliente:**
- "¿Hay algún edificio delante que le quite el sol a tus ventanas?"
- "¿Hay árboles grandes cerca de las ventanas que den sombra?"
- "¿Tienes toldos, persianas, o algún elemento que dé sombra en las ventanas?"
- "¿Durante el verano, te da el sol directamente en las ventanas? ¿Pones persianas o toldos?"
- "¿Las ventanas tienen aleros o algún voladizo encima?"

**Reglas de inferencia:**
- **Obstáculos fijos:** Edificios colindantes en calles estrechas pueden dar sombra permanente a las plantas bajas. La altura del edificio de enfrente y la anchura de la calle determinan el ángulo de sombra.
- **Obstáculos estacionales:** Árboles de hoja caduca dan sombra en verano pero permiten el paso del sol en invierno. Árboles de hoja perenne dan sombra todo el año.
- **Toldos y lamas:** Reducen la radiación solar en verano pero no afectan en invierno (si son orientables).
- **Persianas:** Las persianas bajadas reducen la radiación solar pero también la luz natural. Su efecto depende del grado de cierre y del material.
- **Cálculo aproximado:** En Street View se puede medir la altura del edificio de enfrente y la anchura de la calle para calcular el ángulo de sombra.

**Posibles contradicciones:**
- El cliente dice "no tengo sombra" pero las fotos muestran un edificio que claramente da sombra a ciertas horas.
- El certificado original no considera el sombreamiento (un error común que infla las ganancias solares y la letra energética).
- Hay árboles de hoja caduca: el sombreamiento es diferente en invierno (cálculo de calefacción) que en verano (cálculo de refrigeración).

**Nivel de confianza:**
- Con fotos + Street View + SunCalc: 85%.
- Con solo fotos: 70%.
- Sin fotos ni Street View: 30%.

**Casos donde es obligatoria la revisión manual:**
- Cuando el sombreamiento es muy variable (muchos árboles, obstáculos complejos) y tiene un impacto significativo en la letra energética.
- En edificios con protecciones solares motorizadas o automatizadas cuyo comportamiento no puede determinarse remotamente.
- Cuando la diferencia entre la situación con sombra y sin sombra cambia la letra energética en 2 o más letras.

---

### B7 — Zona de costa / Continentalidad

**Variable CE3X:** No es una variable directa de CE3X, pero debe considerarse en la interpretación de los datos climáticos y de demanda. En zonas costeras, la humedad es mayor y las oscilaciones térmicas son menores.

**Qué representa:** La influencia marítima modera las temperaturas extremas. Las zonas costeras tienen inviernos más suaves y veranos menos extremos que el interior. Esto puede reducir la necesidad de calefacción y refrigeración.

**Cómo se obtiene:**
- De la ubicación del inmueble (A1).
- Distancia a la costa (Google Maps).
- Tablas climáticas de AEMET.

**Evidencias válidas:**
- Municipio costero o interior (dato objetivo).
- Datos climáticos de AEMET.

**Fotografías necesarias:**
- No aplica (dato geográfico).

**Documentación útil:**
- Mapas de AEMET.
- Datos históricos de temperatura del municipio.

**Preguntas al cliente:**
- No aplica (se obtiene de la ubicación).

**Reglas de inferencia:**
- Municipios a menos de 5km de la costa → influencia marítima significativa.
- Municipios a más de 30km de la costa → continentalidad (mayor oscilación térmica).
- Entre 5-30km → influencia moderada.

**Posibles contradicciones:**
- El cliente en zona costera dice que "necesita mucha calefacción" (posible: mala envolvente).
- El certificado original no considera la continentalidad y usa los mismos factores que para zona costera.

**Nivel de confianza:**
- Con ubicación: 100%.

**Casos donde es obligatoria la revisión manual:**
- No aplica.

---

### B8 — Temperatura de consigna / temperaturas de climatización

**Variable CE3X:** Temperaturas de consigna de calefacción y refrigeración en °C (estándar CE3X: 20°C calefacción, 25°C refrigeración para residencial).

**Qué representa:** La temperatura interior de referencia para el cálculo de la demanda energética. CE3X utiliza valores estándar (20°C calefacción, 25°C refrigeración) salvo que se justifiquen otros valores.

**Cómo se obtiene:**
- No se pregunta al cliente. Se usan valores estándar de CE3X.
- Excepcionalmente, si el cliente declara temperaturas de consigna diferentes, puede ajustarse.

**Evidencias válidas:**
- Manual CE3X (valores por defecto).
- Declaración del cliente (si justifica temperaturas diferentes).

**Fotografías necesarias:**
- [F19] Foto del termostato (si existe) mostrando la temperatura programada.

**Documentación útil:**
- Manual CE3X.
- CTE DB-HE.

**Preguntas al cliente:**
- "¿A qué temperatura sueles poner la calefacción en invierno?"
- "¿Y el aire acondicionado en verano?"

**Reglas de inferencia:**
- Si el cliente no sabe/no responde: usar valores estándar (20°C calefacción, 25°C refrigeración).
- Si el cliente declara temperaturas diferentes: usar las declaradas, pero documentarlo.
- Temperaturas declaradas por debajo de 18°C en calefacción o por encima de 27°C en refrigeración pueden indicar un problema de la envolvente (el cliente no enciende la calefacción porque no puede permitírselo o porque no le llega).

**Posibles contradicciones:**
- Cliente declara 22°C en invierno pero las facturas de consumo energético son muy bajas (incoherente).
- Cliente declara 22°C pero el certificado original usó 20°C.

**Nivel de confianza:**
- Sin declaración: 100% (usando valores estándar).
- Con declaración del cliente: 70% (puede no ser representativo de toda la temporada).

**Casos donde es obligatoria la revisión manual:**
- Cuando las temperaturas declaradas se desvían significativamente de los valores estándar y hay facturas de consumo que contradicen la declaración.
- En edificios con sistemas de control de temperatura avanzados (domótica, zonificación).

---

## 5. Grupo C — Envolvente térmica: Fachadas

### C1 — Tipo de fachada / Composición del cerramiento exterior

**Variable CE3X:** Composición del muro de fachada: materiales, espesores, y disposición de las capas (de exterior a interior). Determinante para el cálculo de la transmitancia térmica (U).

**Qué representa:** La fachada es la mayor superficie de intercambio térmico con el exterior. Su composición determina las pérdidas de calor en invierno y las ganancias en verano.

**Cómo se obtiene:**
- Fotografías detalladas de la fachada exterior y del interior de los muros (si hay reformas visibles).
- Catálogo de tipologías constructivas por época y zona (conocimiento experto).
- Consulta catastral (no incluye composición, pero sí año de construcción que orienta sobre tipología).
- Preguntas al cliente sobre el tipo de construcción.

**Evidencias válidas:**
- [F20] Foto detallada de la fachada exterior (material visible: ladrillo, enfoscado, piedra, SATE).
- [F21] Foto de la pared interior (si hay una zona donde se vea el grosor del muro: enchufe, caja de persiana, hueco de obra).
- [F22] Foto de un corte o sección visible (obras, reformas, rozas).
- Certificado energético original (describe la composición de la fachada).

**Fotografías necesarias:**
- [F20] Fachada exterior: primer plano del material de acabado (ladrillo cara vista, monocapa, SATE, piedra, etc.).
- [F21] Pared interior: mostrar el espesor de la pared (ideal: desde un enchufe o caja de mecanismos donde se vea el grosor).
- [F22] Sección constructiva: si hay obras visibles, foto del corte del muro mostrando las capas.

**Documentación útil:**
- Guía de tipologías constructivas del CTE.
- Catálogo de elementos constructivos del CTE (DAE-DB-HE).
- Manuales de cálculo de transmitancia térmica.
- Libro del edificio (si existe).
- Proyecto de construcción original (si está disponible).

**Preguntas al cliente:**
- "¿De qué material es la fachada de tu edificio? ¿Es de ladrillo visto, está pintada, tiene piedra?"
- "¿La pared exterior es gruesa? ¿Puedes medir el grosor de la pared desde el interior de una ventana?"
- "¿Hay alguna zona donde se vea el interior de la pared? Como una obra, una roza, o un enchufe desmontado."
- "¿El edificio tiene algún tipo de aislamiento en la fachada? ¿Has visto paneles aislantes en las paredes?"
- "¿Sabes si se ha hecho alguna rehabilitación de fachada recientemente? ¿Le han puesto 'corcho' o paneles aislantes?"

**Reglas de inferencia:**
- **Por época constructiva:**
  - Pre-1940: Muros de piedra o ladrillo macizo de 1 pie (≈30cm) o más. Sin aislamiento.
  - 1940-1970: Muros de ladrillo hueco doble con cámara de aire (≈25-30cm total). Sin aislamiento.
  - 1970-1980: Muros de ladrillo hueco doble con cámara de aire. Algunos comienzan a incluir aislamiento en la cámara (poliestireno expandido, lana mineral).
  - 1981-2006 (NBE-CT-79): Muros con aislamiento en cámara de aire. Espesor típico: 2-5cm de poliestireno expandido o lana mineral.
  - 2007-2013 (CTE-2006): Muros con aislamiento en cámara o SATE. Espesor típico: 5-8cm.
  - 2013-2019 (CTE-2013): Aislamiento mejorado. Espesor típico: 8-12cm.
  - Post-2019 (CTE-2019/DB-HE): Aislamiento muy mejorado. Espesor típico: 10-16cm. SATE o fachada ventilada.
- **Por tipología de acabado:**
  - Ladrillo cara vista → probable sin aislamiento (o con aislamiento por el interior en rehabilitación).
  - Enfoscado pintado → puede tener o no aislamiento.
  - SATE (Sistema de Aislamiento Térmico Exterior) → visible como una capa continua de color sobre la fachada original, con esquineros y remates específicos.
  - Fachada ventilada → visible como placas (cerámica, composite, piedra) separadas de la fachada original.
  - Panel sándwich metálico → típico de naves industriales, con aislamiento incorporado.
- **Por espesor:**
  - Muro sin aislamiento: ≈30cm (ladrillo hueco doble + cámara + enlucido).
  - Muro con aislamiento: ≈32-38cm (dependiendo del espesor del aislamiento).
  - Muro de piedra: >40cm.

**Posibles contradicciones:**
- El cliente dice que el edificio "tiene aislamiento" pero la foto de la fachada muestra ladrillo cara vista sin SATE y no se observa capa aislante. Puede tener aislamiento en cámara, pero no SATE. O puede ser falso.
- El año de construcción sugiere que no debería tener aislamiento, pero el cliente asegura que sí. Posible si hubo rehabilitación posterior.
- Foto del espesor del muro mostrando 25cm (sin aislamiento) pero el cliente dice que sí tiene.
- El certificado original declara una composición de fachada diferente a la que se deduce de las fotos y el año de construcción.

**Nivel de confianza:**
- Con fotos de fachada + fotos de corte + año de construcción: 85%.
- Con solo fotos de fachada + año: 70%.
- Con solo año de construcción: 50%.
- Con solo declaración del cliente: 35%.

**Casos donde es obligatoria la revisión manual:**
- Cuando el tipo de fachada no puede determinarse (materiales no identificables, espesor no observable).
- Cuando se sospecha que el aislamiento no es continuo o tiene defectos de instalación.
- En edificios con rehabilitaciones parciales (aislamiento solo en algunas fachadas).
- Cuando la diferencia entre fachada con y sin aislamiento cambia la letra energética en 1 o más letras.

---

### C2 — Transmitancia térmica de la fachada (U)

**Variable CE3X:** Valor U (W/m²·K) de la fachada. Es la variable que CE3X utiliza para calcular las pérdidas por transmisión a través de los muros exteriores.

**Qué representa:** El flujo de calor que atraviesa 1m² de fachada por cada grado de diferencia de temperatura entre el interior y el exterior. A menor valor U, mejor aislamiento.

**Cómo se obtiene:**
- Cálculo a partir de la composición del muro (C1) usando la fórmula de la transmitancia térmica: 1/U = Σ (e_i / λ_i) + R_si + R_se
  - e_i: espesor de cada capa (m)
  - λ_i: conductividad térmica de cada material (W/m·K)
  - R_si: resistencia superficial interior (m²·K/W) — según CTE (0.13 para flujo horizontal)
  - R_se: resistencia superficial exterior (m²·K/W) — según CTE (0.04 para flujo horizontal)
- Uso de tablas del CTE (DAE-DB-HE) con valores típicos por tipología constructiva.
- Del certificado energético original (si declara el valor U).
- Medición con termografía (no disponible remotamente, solo presencial).

**Evidencias válidas:**
- Composición del muro (C1) verificada.
- Cálculo de transmitancia según CTE.
- Certificado original (si incluye el cálculo de U).
- Tablas de valores orientativos del CTE.

**Fotografías necesarias:**
- Las mismas que para C1 (composición del muro).

**Documentación útil:**
- CTE DB-HE 2019, Documento de Apoyo DAE-DB-HE (Catálogo de elementos constructivos).
- UNE-EN ISO 6946: Componentes y elementos para la edificación. Resistencia térmica y transmitancia térmica.
- Calculadoras online de transmitancia térmica.

**Preguntas al cliente:**
- No se pregunta directamente. Se obtiene de la composición del muro y los espesores.

**Reglas de inferencia:**
- **Fachada sin aislamiento (pre-1980):** U ≈ 1.5-2.0 W/m²·K (dependiendo del tipo de ladrillo y espesor).
- **Fachada con cámara de aire sin aislamiento:** U ≈ 1.2-1.5 W/m²·K.
- **Fachada con aislamiento básico (2-3cm):** U ≈ 0.8-1.0 W/m²·K.
- **Fachada con aislamiento medio (4-6cm):** U ≈ 0.5-0.7 W/m²·K.
- **Fachada con aislamiento alto (8-12cm):** U ≈ 0.35-0.50 W/m²·K.
- **Fachada con aislamiento muy alto (>12cm):** U ≈ 0.25-0.35 W/m²·K.
- **Valores límite CTE:**
  - CTE-2006: U ≤ 0.82-1.35 según zona climática.
  - CTE-2013: U ≤ 0.60-1.00 según zona climática.
  - CTE-2019 (DB-HE 2019): U ≤ 0.37-0.70 según zona climática.

**Posibles contradicciones:**
- El valor U del certificado original es mejor (menor) de lo que corresponde a la composición del muro observada (posible inflado).
- El certificado original declara un valor U muy bajo (buen aislamiento) pero las fotos muestran una fachada que claramente no tiene aislamiento.
- La transmitancia calculada no cumple con los valores límite del CTE para el año de construcción (pero puede ser legal si el edificio es anterior a la normativa).

**Nivel de confianza:**
- Con composición verificada y cálculo: 85%.
- Con composición inferida: 65%.
- Con solo año de construcción: 45%.
- Con valor del certificado original sin verificar: 40% (el certificado original puede estar inflado).

**Casos donde es obligatoria la revisión manual:**
- Cuando la composición del muro no puede determinarse (ver C1).
- Cuando el valor U del certificado original es significativamente mejor (más bajo) de lo esperable y la diferencia cambia la letra energética.
- En edificios con sistemas constructivos atípicos o de difícil clasificación.

---

### C3 a C10 — Materiales de la fachada por capas

**Variable CE3X:** Para cada capa del muro: material, espesor (m), conductividad térmica (W/m·K), densidad (kg/m³). Capas típicas: revestimiento exterior, ladrillo/capa principal, cámara de aire (ventilada o no), aislamiento (si existe), ladrillo/capa interior, enlucido interior.

**Qué representa:** La composición detallada de la fachada es necesaria para el cálculo preciso de la transmitancia térmica. Cada capa aporta una resistencia térmica diferente.

**Cómo se obtiene:**
- Identificación de materiales mediante fotos (exterior e interior).
- Inferencia por época constructiva.
- Catálogo de elementos constructivos del CTE (DAE-DB-HE).
- Preguntas al cliente sobre materiales visibles.

**Evidencias válidas:**
- [F20]-[F22] Fotografías de fachada y cortes.
- Certificado original.
- Catálogo CTE.

**Fotografías necesarias:**
- [F20] Detalle de fachada exterior (material visible).
- [F21] Pared interior (para ver espesor y material de la hoja interior).
- [F22] Corte constructivo si hay obras visibles.

**Documentación útil:**
- DAE-DB-HE (Catálogo de elementos constructivos).
- Fichas técnicas de materiales.

**Preguntas al cliente:**
- "¿La pared interior está hecha de ladrillo, de yeso, de pladur?"
- "¿Hay alguna zona donde se vea el interior de la pared? ¿Como una obra reciente?"

**Reglas de inferencia por época (detalle de capas):**

| Época | Capa exterior | Cámara | Aislamiento | Capa interior | U aproximado |
|-------|--------------|--------|-------------|---------------|-------------|
| Pre-1940 | Piedra 40-60cm | No | No | Enlucido cal 2cm | 1.8-2.5 |
| 1940-1970 | Ladrillo perforado 12cm | 5-8cm | No | Ladrillo hueco 7cm + enlucido 1.5cm | 1.5-1.8 |
| 1970-1980 | Ladrillo hueco 12cm | 5-8cm | No | Ladrillo hueco 7cm + enlucido 1.5cm | 1.3-1.6 |
| 1981-2006 | Ladrillo hueco 12cm | 5-8cm | EPS 3-5cm | Ladrillo hueco 7cm + enlucido 1.5cm | 0.7-0.9 |
| 2007-2013 | Ladrillo hueco 12cm | 5-8cm | EPS 5-8cm | Ladrillo hueco 7cm + enlucido 1.5cm | 0.50-0.70 |
| 2013-2019 | Ladrillo hueco 12cm o SATE | Variable | EPS/MW 8-12cm | Ladrillo hueco 7cm + enlucido 1.5cm o pladur | 0.35-0.50 |
| Post-2019 | SATE/fachada ventilada | Variable | EPS/MW 10-16cm | Pladur/ladrillo | 0.25-0.35 |

Donde EPS = poliestireno expandido, MW = lana mineral.

**Posibles contradicciones:**
- El espesor de la cámara de aire no es uniforme (problemas de ejecución típicos).
- El aislamiento declarado no corresponde con el visible (si hay SATE en exterior, no hay aislamiento en cámara, y viceversa).
- La cámara de aire puede estar "ventilada" o "sin ventilar", lo que cambia su resistencia térmica.

**Nivel de confianza:**
- Con cortes visibles: 90%.
- Con composición inferida por época: 70%.

**Casos donde es obligatoria la revisión manual:**
- Composición de fachada dudosa (rehabilitaciones parciales, materiales no identificables).
- Cámaras de aire ventiladas (la ventilación modifica la resistencia térmica).

---

### C11 — Color de la fachada

**Variable CE3X:** No es una variable directa de CE3X, pero influye en el factor de absorción solar del cerramiento y, por tanto, en las ganancias solares en verano. Colores oscuros absorben más radiación que colores claros.

**Qué representa:** La absortividad solar del acabado exterior de la fachada. Colores claros (blanco, beige, gris claro) reflejan más radiación. Colores oscuros (gris oscuro, marrón, rojo oscuro, negro) absorben más radiación y se calientan más.

**Cómo se obtiene:**
- Fotografías de la fachada (visible a simple vista).

**Evidencias válidas:**
- [F20] Foto de fachada (el color es evidente).

**Fotografías necesarias:**
- [F20] Fachada exterior donde se vea claramente el color dominante.

**Documentación útil:**
- Tabla de absortividad solar según color (CTE DB-HE, UNE-EN ISO 13790).

**Preguntas al cliente:**
- No es necesario preguntar. Se ve en las fotos.

**Reglas de inferencia:**
- Blanco/beige/crema: absortividad ≈ 0.3-0.5 (factor de absorción bajo).
- Amarillo/verde claro/gris claro: absortividad ≈ 0.4-0.6.
- Naranja/rojo/gris medio: absortividad ≈ 0.6-0.7.
- Marrón/rojo oscuro/verde oscuro: absortividad ≈ 0.7-0.8.
- Negro/gris oscuro muy oscuro: absortividad ≈ 0.8-0.9.
- El CTE utiliza valores por defecto: 0.7 para colores medios. Si la fachada es claramente clara u oscura, debe ajustarse.

**Posibles contradicciones:**
- El color de la fachada en la calle puede diferir del de las fotos por iluminación o filtros. Pedir fotos con luz natural.

**Nivel de confianza:**
- Con fotos con luz natural: 100%.

**Casos donde es obligatoria la revisión manual:**
- No aplica (visible desde el exterior en fotos).

---

### C12 — Estado de conservación de la fachada

**Variable CE3X:** No es una variable directa, pero afecta a la transmitancia efectiva. Grietas, humedades, desprendimientos, o suciedad pueden reducir la eficiencia del cerramiento.

**Qué representa:** El deterioro físico de la fachada puede aumentar su permeabilidad al aire y reducir su resistencia térmica. Fachadas en mal estado tienen un rendimiento inferior al teórico.

**Cómo se obtiene:**
- Fotografías detalladas de la fachada.
- Preguntas al cliente sobre humedades, filtraciones, o problemas.
- Observación de manchas de humedad en paredes interiores (variable N7).

**Evidencias válidas:**
- [F23] Foto detallada de la fachada mostrando el estado general.
- [F24] Foto de grietas, fisuras, o desconchados en la fachada.
- [F25] Foto de manchas de humedad en paredes interiores.
- Google Street View (puede mostrar el estado general del edificio).

**Fotografías necesarias:**
- [F23] Fachada completa (estado general).
- [F24] Detalle de cualquier anomalía visible (grietas, humedades, desprendimientos).
- [F25] Paredes interiores con manchas de humedad (si las hay).
- [F26] Esquinas y encuentros con otros elementos (balcones, cornisas) donde suele haber problemas.

**Documentación útil:**
- Google Street View (puede tener imágenes de diferentes años para ver evolución del estado).
- Informes previos de inspección (si existen).

**Preguntas al cliente:**
- "¿Hay alguna grieta o fisura visible en las paredes exteriores?"
- "¿Tienes problemas de humedad en alguna pared? ¿Manchas de agua o moho?"
- "¿Se ha filtrado agua por la fachada alguna vez?"
- "¿La fachada se ha reparado o pintado recientemente?"

**Reglas de inferencia:**
- **Grietas finas (<1mm):** Pueden indicar asentamientos o movimientos térmicos normales. Afectan poco a la transmitancia.
- **Grietas >2mm:** Indican problemas de movimiento estructural o defectos de ejecución. Afectan a la permeabilidad al aire.
- **Humedades ascendentes:** Manchas en la parte baja de las fachadas (primeros 1-2m). Indican capilaridad desde el terreno.
- **Humedades por filtración:** Manchas localizadas generalmente en esquinas, encuentros, o alrededor de ventanas. Indican filtraciones de agua de lluvia.
- **Eflorescencias:** Manchas blancas de sales en la fachada. Indican humedad y posterior evaporación.
- **Desprendimientos:** Indican problemas graves del revestimiento. Requieren reparación.
- **Mohos en paredes interiores:** Indican condensación o filtraciones. Afectan a la calidad del aire y a la salud, además de a la eficiencia energética.

**Posibles contradicciones:**
- El cliente dice que no hay humedades pero las fotos de la fachada muestran manchas evidentes.
- Las fotos de la fachada muestran humedad pero el cliente dice que es "sombra" o "suciedad".
- El certificado original no menciona grietas o humedades visibles en las fotos.

**Nivel de confianza:**
- Con fotos detalladas: 80%.
- Con Street View: 60%.

**Casos donde es obligatoria la revisión manual:**
- Cuando hay grietas >2mm o problemas estructurales visibles.
- Cuando hay humedades generalizadas en fachada y paredes interiores.
- Cuando se sospecha que el estado de la fachada puede reducir significativamente su eficiencia térmica.

---

### C13 a C20 — Fachadas por orientación

**Variable CE3X:** Cada fachada tiene una orientación diferente (N, S, E, O, NE, NO, SE, SO) y puede tener una composición diferente (especialmente si algunas fachadas han sido rehabilitadas y otras no).

**Qué representa:** Cada orientación de fachada recibe diferente radiación solar y puede tener diferente composición o estado. Las fachadas sur y oeste son más críticas por su exposición solar.

**Cómo se obtiene:**
- Para cada orientación: aplicar las variables C1 a C12 de forma independiente.
- Identificar cuántas fachadas tiene el inmueble (por A6 y A8) y qué orientación tiene cada una.
- Preguntar si todas las fachadas son iguales o si alguna es diferente.

**Evidencias válidas:**
- [F07]-[F10] Fotos de cada fachada (principal, lateral izquierda, lateral derecha, trasera).
- [F27] Fotos de cada fachada con indicación de la orientación (si es posible, con brújula o referencia solar).

**Fotografías necesarias:**
- [F27] Conjunto de fotos de todas las fachadas del inmueble, identificando cada una por su orientación.

**Documentación útil:**
- Google Maps / Street View.
- Planos del edificio.

**Preguntas al cliente:**
- "¿Todas las fachadas de tu vivienda son iguales? ¿O alguna tiene un material diferente?"
- "¿Alguna fachada tiene más ventanas o balcones que otra?"

**Reglas de inferencia:**
- En edificios entre medianeras, solo hay fachada principal y trasera (2 orientaciones).
- En edificios esquinero, hay fachada principal, trasera y un lateral.
- En edificios exentos, hay las 4 orientaciones.
- Si ha habido rehabilitación, debe preguntarse si se hizo en todas las fachadas o solo en alguna.

**Posibles contradicciones:**
- El cliente dice "todas las fachadas son iguales" pero las fotos muestran diferentes materiales o estados.
- El certificado original declara la misma composición para todas las fachadas pero las fotos muestran diferencias (especialmente si hay rehabilitación parcial).

**Nivel de confianza:**
- Con fotos de todas las fachadas: 85%.
- Sin fotos de alguna fachada: 50%.

**Casos donde es obligatoria la revisión manual:**
- Cuando no se tiene acceso visual a alguna fachada (especialmente la trasera en edificios sin acceso a patio interior).
- Cuando hay rehabilitación parcial (solo algunas fachadas).

---

## 6. Grupo D — Envolvente térmica: Cubiertas

### D1 — Tipo de cubierta

**Variable CE3X:** Tipo de cubierta: plana (transitable, no transitable, invertida) o inclinada (teja, pizarra, panel sándwich, chapa metálica).

**Qué representa:** La cubierta es una de las superficies de mayor pérdida térmica, especialmente en áticos y plantas superiores. El tipo de cubierta determina su composición y su capacidad aislante.

**Cómo se obtiene:**
- Fotografías de la cubierta (si el cliente puede acceder) o del edificio desde la calle mostrando el perfil de la cubierta.
- Google Street View (vista del perfil del edificio).
- Google Maps / satélite (vista cenital del edificio).
- Certificado energético original.
- Pregunta al cliente.

**Evidencias válidas:**
- [F28] Foto del perfil del edificio desde la calle (tejado visible).
- [F29] Foto de la cubierta desde arriba (si el cliente puede acceder a una ventana superior, terraza, o azotea comunitaria).
- [F30] Foto del interior de la última planta (ático) mostrando el techo (para ver si hay falso techo, si el techo está inclinado, etc.).
- Google Maps (vista satélite).
- Certificado original.

**Fotografías necesarias:**
- [F28] Perfil del edificio desde la calle (mostrando la forma de la cubierta).
- [F29] Cubierta desde arriba (acceso a azotea o piso superior).
- [F30] Interior del ático/última planta (mostrando si el techo es plano o inclinado).

**Documentación útil:**
- Google Maps (vista satélite del edificio).
- Google Street View.
- Planos del edificio.
- Libro del edificio.

**Preguntas al cliente:**
- "¿La última planta tiene terraza o azotea? ¿Es transitable?"
- "¿La cubierta del edificio es plana (como una terraza) o inclinada (con tejas)?"
- "¿Hay algún vecino que viva en el ático? ¿Cómo es su techo?"
- "¿Has visto alguna vez la cubierta? ¿Se puede acceder a ella?"

**Reglas de inferencia:**
- **Vista satélite:** Las cubiertas inclinadas se ven como techos de teja (color rojizo/marrón). Las cubiertas planas se ven como superficies grises/blancas (grava, lámina asfáltica, terrazo).
- **Edificios residenciales >5 plantas:** Suelen tener cubierta plana.
- **Unifamiliares y edificios pequeños:** Suelen tener cubierta inclinada de teja.
- **Edificios modernos (>2000):** Pueden tener cubierta plana o inclinada, pero las planas son más comunes.
- **Cubierta plana invertida:** El aislamiento está sobre la impermeabilización (protegido por grava o suelo técnico). Es la solución más común en edificios modernos.
- **Cubierta plana convencional:** El aislamiento está bajo la impermeabilización.
- **Cubierta inclinada ventilada:** La cámara de aire bajo la teja está ventilada. Aísla menos que una no ventilada (en términos prácticos, pero reduce riesgo de condensaciones).

**Posibles contradicciones:**
- El cliente dice "cubierta plana" pero el perfil del edificio muestra teja.
- El cliente dice "ático" pero el Certificado dice "planta baja sin pérdidas por cubierta".
- El satélite muestra cubierta plana pero el cliente dice "tejado".

**Nivel de confianza:**
- Con fotos + satélite: 95%.
- Con solo fotos de perfil: 80%.
- Con solo satélite: 85%.
- Con solo declaración: 60%.

**Casos donde es obligatoria la revisión manual:**
- Cuando el acceso a la cubierta no es posible ni visualmente desde ningún punto.
- Cubiertas con geometría compleja (varios planos, lucernarios, claraboyas).

---

### D2 — Composición de la cubierta

**Variable CE3X:** Capas de la cubierta: material de acabado, impermeabilización, aislamiento (espesor y tipo), soporte estructural.

**Qué representa:** Similar a C1-C10 pero aplicado a la cubierta. La composición determina la transmitancia térmica (U) de la cubierta.

**Cómo se obtiene:**
- Si la cubierta es plana y accesible, fotos de la superficie (grava, terrazo, lámina) y del canto de la cubierta (si hay una junta de dilatación o borde visible).
- Si la cubierta es inclinada, fotos del interior del ático (vigas, material bajo teja, aislamiento visible).
- Por época constructiva (inferencia).
- Certificado original.
- Preguntas al cliente.

**Evidencias válidas:**
- [F31] Canto de la cubierta plana (borde: muestra el espesor total y posibles capas).
- [F32] Bajo cubierta inclinada (interior del ático: muestra la cara inferior de la cubierta, vigas, aislamiento).
- [F33] Junta de dilatación o encuentro con peto de cubierta (puede mostrar el espesor del aislamiento).
- Certificado original.

**Fotografías necesarias:**
- [F31] Borde de la cubierta plana (si es visible desde la calle o desde una terraza vecina).
- [F32] Interior del ático (si el cliente puede acceder).
- [F33] Encuentro de la cubierta con el peto o con otro elemento constructivo.

**Documentación útil:**
- DAE-DB-HE (Catálogo de elementos constructivos).
- Libro del edificio.
- Proyecto de construcción.

**Preguntas al cliente:**
- "¿Hay acceso al espacio bajo la cubierta? ¿Se puede ver la estructura del tejado?"
- "¿Se ve el espesor de la cubierta desde alguna terraza o desde la azotea?"
- "¿Sabes si la cubierta tiene aislamiento?"

**Reglas de inferencia:**
- **Cubierta plana sin aislamiento (pre-1980):** U ≈ 1.5-2.0 W/m²·K.
- **Cubierta plana con aislamiento básico (2-5cm):** U ≈ 0.6-1.0 W/m²·K.
- **Cubierta plana con aislamiento estándar (5-8cm):** U ≈ 0.4-0.6 W/m²·K.
- **Cubierta plana con aislamiento CTE-2019 (>10cm):** U ≈ 0.25-0.40 W/m²·K.
- **Cubierta inclinada de teja sin aislamiento:** U ≈ 1.8-2.5 W/m²·K.
- **Cubierta inclinada con aislamiento entre vigas (4-8cm):** U ≈ 0.5-0.8 W/m²·K.
- **Cubierta inclinada con aislamiento sobre forjado (ático habitable):** U depende del espesor del aislamiento, similar a fachada.

**Posibles contradicciones:**
- El cliente dice que tiene "aislamiento en el ático" pero las fotos del interior muestran que no hay aislamiento bajo las tejas.
- El certificado declara una cubierta con buen aislamiento pero el año y tipo constructivo no lo respaldan.
- Cubierta plana con grava: la grava añade protección pero no es aislamiento.

**Nivel de confianza:**
- Con fotos del perfil + acceso a cubierta: 80%.
- Con fotos del perfil + año: 65%.
- Sin acceso a cubierta: 40%.

**Casos donde es obligatoria la revisión manual:**
- Cuando la vivienda es un ático y la cubierta no es accesible.
- Cuando el perfil del edificio no es visible (calles estrechas, edificios en esquina sin vista lateral).
- Cubiertas ajardinadas (composición compleja).

---

### D3 a D6 — Estado de la cubierta / Humedades

**Variable CE3X:** No es directa, pero una cubierta en mal estado puede tener filtraciones y/o pérdida de capacidad aislante.

**Qué representa:** Goteras, humedades, o acumulación de agua en cubiertas planas indican que la impermeabilización está dañada, lo que puede afectar al aislamiento y a la durabilidad del edificio.

**Cómo se obtiene:**
- Fotos de la cubierta (desde arriba) mostrando acumulación de agua, vegetación, o daños.
- Fotos del interior (última planta) mostrando manchas de humedad en el techo.
- Preguntas al cliente.

**Evidencias válidas:**
- [F34] Fotos de la cubierta con charcos, vegetación, o deterioro visible.
- [F35] Manchas de humedad en el techo de la última planta.
- [F36] Grietas o levantamientos en la impermeabilización.

**Fotografías necesarias:**
- [F34] Cubierta desde arriba (estado general).
- [F35] Techos interiores de la última planta (manchas de humedad).
- [F36] Detalle de cualquier anomalía en la cubierta (grietas, abombamientos, vegetación).

**Documentación útil:**
- Google Maps (vista satélite: puede verse acumulación de agua en cubiertas).

**Preguntas al cliente:**
- "¿Ha tenido goteras en el techo alguna vez?"
- "¿Hay manchas de humedad en el techo de alguna habitación?"
- "¿Se ha reparado la cubierta recientemente?"

**Reglas de inferencia:**
- **Charcos en cubierta plana:** Indican que no hay pendiente suficiente o que los sumideros están obstruidos. El agua acumulada acaba filtrándose.
- **Vegetación en cubierta:** Indican acumulación de suciedad y humedad. Puede haber raíces que dañen la impermeabilización.
- **Manchas de humedad en techo:** Indican filtración activa (o pasada) desde la cubierta.

**Nivel de confianza:**
- Con fotos: 85%.
- Sin fotos: 40%.

**Casos donde es obligatoria la revisión manual:**
- Filtraciones activas desde la cubierta.
- Cubiertas con vegetación abundante o daños estructurales.

---

### D7 a D12 — Cubierta: transmitancia térmica

Ver reglas de inferencia en D2 (composición → transmitancia). Aplicar mismas reglas de cálculo que para fachadas (C2), usando la composición específica de la cubierta.

---

## 7. Grupo E — Envolvente térmica: Suelos

### E1 — Tipo de suelo

**Variable CE3X:** Tipo de suelo en contacto con el terreno (losas de cimentación, soleras) o en contacto con el exterior (voladizos, porches). También suelos sobre garajes o locales no calefactados.

**Qué representa:** El suelo es una superficie de pérdida térmica, especialmente en plantas bajas y en viviendas unifamiliares. La pérdida depende del tipo de suelo y de la temperatura del terreno o del espacio adyacente.

**Cómo se obtiene:**
- Pregunta directa al cliente (ubicación de la vivienda en el edificio).
- Planos del edificio.
- Certificado original.
- Fotografías del suelo interior (material y espesor visible en el perímetro).

**Evidencias válidas:**
- [F37] Foto del suelo interior (para ver el material y el espesor si hay un borde visible).
- [F38] Foto de la junta perimetral del suelo con la pared (puede mostrar el espesor).
- [F39] Sótano o garaje bajo la vivienda (si el cliente puede acceder).
- Certificado original.
- Planos del edificio.

**Fotografías necesarias:**
- [F37] Suelo interior (acabado: tarima, gres, mármol, etc.). Útil para estimar la inercia térmica.
- [F38] Junta perimetral suelo-pared (esquina de la habitación).
- [F39] Espacio bajo la vivienda (sótano, garaje, cámara de aire) si existe y es accesible.

**Documentación útil:**
- DAE-DB-HE (Catálogo de elementos constructivos: suelos y forjados).
- Planos del edificio.
- CTE DB-HE (valores de resistencia térmica del terreno).

**Preguntas al cliente:**
- "¿Tu vivienda está en una planta baja? ¿Qué hay debajo: terreno, garaje, otro piso?"
- "¿Hay un sótano o garaje debajo de tu casa?"
- "¿El suelo de tu casa está directamente sobre el terreno o hay una cámara de aire?"

**Reglas de inferencia:**
- **Planta baja sobre terreno:** En contacto con el terreno. La transmitancia se calcula según el tipo de terreno y el perímetro del edificio.
- **Planta baja sobre cámara de aire:** Espacio ventilado bajo el forjado. Hay pérdidas adicionales por ventilación de la cámara.
- **Plantas intermedias:** Forjado entre plantas calefactadas. No hay pérdidas (o muy pequeñas) por el suelo/techo entre viviendas.
- **Planta baja sobre garaje:** El garaje no suele estar calefactado. Hay pérdidas a través del forjado hacia el garaje. Se considera como "espacio no calefactado".
- **Unifamiliar con sótano:** El sótano puede estar parcialmente enterrado. Dependiendo del nivel de aislamiento y de la temperatura del sótano, las pérdidas varían.

**Posibles contradicciones:**
- El cliente dice "planta baja sobre terreno" pero el certificado original dice "sobre garaje".
- La foto de la junta perimetral muestra un espesor de forjado que no coincide con el declarado.

**Nivel de confianza:**
- Con confirmación de ubicación + fotos: 90%.
- Con solo declaración: 70%.

**Casos donde es obligatoria la revisión manual:**
- Suelos radiantes (la losa con tuberías incorporadas cambia la composición y la inercia térmica).
- Forjados sanitarios (cámara de aire ventilada bajo el suelo).
- Edificios con sistemas de calefacción por suelo radiante y aislamiento específico bajo las tuberías.

---

### E2 a E5 — Composición del suelo / transmitancia

**Variable CE3X:** Composición detallada del suelo: material de acabado, capa de compresión, aislamiento (si existe), forjado (bovedilla + viguetas o losa maciza), cámara de aire, terreno.

**Qué representa:** Similar a las capas de la fachada, pero para el suelo. Las pérdidas se calculan mediante el perímetro del edificio (en contacto con el terreno) o mediante la transmitancia del forjado (sobre espacios no calefactados).

**Cómo se obtiene:**
- De la información disponible (planos, fotos de juntas, tipo constructivo).
- Por inferencia (época constructiva y tipo de edificio).

**Evidencias válidas:**
- [F37]-[F39] Fotos mencionadas.
- Certificado original.
- Planos.

**Fotografías necesarias:**
- Las mismas que para E1.

**Documentación útil:**
- DAE-DB-HE.
- CTE DB-HE (método de cálculo para suelos en contacto con el terreno).

**Reglas de inferencia:**
- **Forjado unidireccional** (bovedilla + viguetas): espesor típico 25-30cm (sin incluir acabados). Es el más común en edificios residenciales de 1960-2010.
- **Forjado reticular** (losas aligeradas): espesor típico 30-45cm. Más común en edificios terciarios.
- **Losa maciza de hormigón:** espesor típico 20-40cm. Más común en edificios modernos.
- **Suelo en contacto con el terreno:** CE3X utiliza el método de la UNE-EN ISO 13370. La transmitancia depende del perímetro, la superficie y la resistencia térmica del aislamiento perimetral.
- **Forjado sobre espacio no calefactado (garaje):** La transmitancia se calcula con la composición del forjado, considerando el espacio no calefactado como una temperatura intermedia.
- **Suelo radiante:** Requiere conocer el espesor del mortero que cubre las tuberías y el aislamiento bajo ellas (espesor mínimo recomendado: 3-5cm de poliestireno expandido).

**Posibles contradicciones:**
- El certificado declara un valor U del suelo que no corresponde con la tipología constructiva esperable.
- El cliente dice que tiene "suelo radiante" pero la antigüedad del edificio y la tipología del forjado no lo soportan (los suelos radiantes comenzaron a ser comunes en los 2000, pero en rehabilitaciones pueden ser posteriores).

**Nivel de confianza:**
- Con información completa: 80%.
- Con solo tipología: 60%.

**Casos donde es obligatoria la revisión manual:**
- Suelo radiante (requiere conocer el espesor exacto del mortero y del aislamiento).
- Cámaras de aire sanitarias ventiladas.
- Edificios con diferentes tipos de suelo en diferentes zonas.

---

### E6 a E10 — Suelo: perímetro / resistencia térmica del terreno

**Variable CE3X:** Perímetro del edificio en contacto con el terreno (m) y resistencia térmica del terreno (m²·K/W). Se usan para calcular la transmitancia equivalente del suelo según UNE-EN ISO 13370.

**Qué representa:** El perímetro del edificio determina la zona de borde por donde las pérdidas son mayores. La resistencia del terreno depende de su tipo (arcilla, arena, roca).

**Cómo se obtiene:**
- Perímetro: de la geometría del edificio (superficie construida y forma).
- Resistencia del terreno: de mapas geotécnicos o tablas del CTE.
- Certificado original.

**Evidencias válidas:**
- Certificado original.
- Planos (perímetro del edificio).
- Información geotécnica de la zona (poco común en certificados).

**Fotografías necesarias:**
- No aplica directamente.

**Documentación útil:**
- CTE DB-HE (Apéndice E: Resistencia térmica del terreno).
- Mapas geotécnicos del IGME (Instituto Geológico y Minero de España).

**Preguntas al cliente:**
- No suele preguntarse directamente.

**Reglas de inferencia:**
- **Resistencia térmica del terreno:**
  - Arcilla/limo: R ≈ 0.8-1.2 m²·K/W.
  - Arena/grava: R ≈ 0.5-0.8 m²·K/W.
  - Roca: R ≈ 0.2-0.5 m²·K/W.
  - Por defecto en CE3X: 1.0 m²·K/W (valor conservador).
- **Perímetro del suelo:** Para una superficie cuadrada, perímetro = 4 × √(superficie). Para una superficie rectangular con relación de aspecto 2:1, perímetro ≈ 6 × √(superficie).

**Posibles contradicciones:**
- El perímetro declarado en el certificado no corresponde con la superficie construida.

**Nivel de confianza:**
- Con superficie y certificado: 80%.

**Casos donde es obligatoria la revisión manual:**
- Terrenos con características geotécnicas muy específicas (arcillas expansivas, terrenos con nivel freático alto).
- Edificios con sótanos habitables o semisótanos.

---

## 8. Grupo F — Envolvente térmica: Huecos (ventanas)

### F1 — Tipo de ventana / Material del marco

**Variable CE3X:** Material del marco de la ventana (madera, aluminio sin RPT, aluminio con RPT, PVC, mixta madera-aluminio, acero).

**Qué representa:** El material del marco determina la transmitancia térmica de la ventana (U_marco) y, por tanto, la transmitancia total del hueco. Los marcos de madera y PVC tienen mejor aislamiento que los de aluminio sin rotura de puente térmico (RPT).

**Cómo se obtiene:**
- Fotografías de las ventanas (marco visible desde el interior y/o exterior).
- Certificado original.
- Pregunta directa al cliente.

**Evidencias válidas:**
- [F40] Foto de cada ventana desde el interior (marco, perfil, junquillo visible).
- [F41] Foto de cada ventana desde el exterior (marco, perfil).
- [F42] Detalle del perfil del marco (sección visible si la ventana está ligeramente abierta).
- Certificado original.

**Fotografías necesarias:**
- [F40] Interior: marco completo de la ventana.
- [F41] Exterior: marco completo desde fuera.
- [F42] Detalle del perfil del marco (si la ventana está entreabierta, mostrar la sección).
- [F43] Foto de todas las ventanas de la vivienda (para verificar si todas son del mismo tipo).

**Documentación útil:**
- Catálogo de elementos constructivos del CTE (DAE-DB-HE).
- Fichas técnicas de ventanas (si el cliente las conserva).

**Preguntas al cliente:**
- "¿De qué material son los marcos de tus ventanas? ¿Madera, aluminio o PVC?"
- "¿Puedes hacer una foto al perfil del marco? Normalmente tiene un número o marca que ayuda a identificar el modelo."
- "¿Todas las ventanas son del mismo tipo? ¿O alguna es diferente?"
- "Si son de aluminio: ¿sabes si tienen 'rotura de puente térmico'?"

**Reglas de inferencia:**
- **Madera:** Color marrón, veteado natural (o pintada). Aspecto macizo, esquinas ensambladas a 45°.
- **Aluminio sin RPT:** Perfiles metálicos, generalmente de sección delgada, al tacto frío en invierno. Muy común en edificios de 1980-2000.
- **Aluminio con RPT:** Tienen una banda de material aislante (poliamida) entre los perfiles interior y exterior. Visible como una línea oscura en el perfil. Al tacto, el perfil interior no está tan frío como el exterior en invierno.
- **PVC:** Perfiles blancos (o de color, pero más común blanco). Sección más gruesa que el aluminio. Esquinas soldadas (sin juntas visibles).
- **Mixta madera-aluminio:** Marco de madera por dentro, aluminio por fuera. El perfil exterior es metálico.
- **Acero:** Perfiles metálicos, generalmente en ventanas de tipo industrial o muy antiguas. Pesados y difíciles de abrir.

**Posibles contradicciones:**
- El cliente dice "PVC" pero la foto muestra perfil metálico (es aluminio).
- El cliente dice "rotura de puente térmico" pero la foto del perfil no muestra la banda aislante.
- El certificado original declara un material de marco diferente al visible en las fotos.

**Nivel de confianza:**
- Con fotos de interior + exterior: 95%.
- Con fotos solo de interior: 80%.
- Con solo declaración: 50%.

**Casos donde es obligatoria la revisión manual:**
- Cuando no se puede ver el marco desde el exterior ni el interior (ventanas muy altas, inaccesibles).
- Marcos de materiales compuestos o especiales.

---

### F2 — Tipo de acristalamiento

**Variable CE3X:** Tipo de vidrio: simple, doble (cámara), triple, bajo emisivo, laminar, blindado, etc. También el espesor del vidrio y de la cámara (mm).

**Qué representa:** El vidrio es la parte del hueco con mayor transmitancia térmica. Un vidrio simple tiene U ≈ 5.7 W/m²·K. Un doble acristalamiento con cámara de aire de 12mm tiene U ≈ 2.8 W/m²·K. Un doble acristalamiento bajo emisivo con argón puede tener U ≈ 1.2-1.5 W/m²·K.

**Cómo se obtiene:**
- Fotografías detalladas de la ventana (buscando el distintivo o marcado en el perfil separador o en el vidrio).
- Certificado original.
- Observación del reflejo (el doble acristalamiento produce doble reflejo).
- Pregunta directa al cliente.

**Evidencias válidas:**
- [F44] Foto del vidrio desde el interior (buscando la serigrafía o marcado en el vidrio o en el perfil separador).
- [F45] Foto del vidrio desde el exterior (misma búsqueda).
- [F46] Foto del perfil separador (la pieza metálica que separa los vidrios en un doble acristalamiento). El espesor del separador indica el espesor de la cámara.
- Certificado original.
- Factura de instalación de las ventanas (si el cliente la conserva).

**Fotografías necesarias:**
- [F44] Vidrio interior: marcas, serigrafías, pegatinas (suelen poner la marca, el tipo de vidrio, la fecha de fabricación).
- [F45] Vidrio exterior (si es accesible).
- [F46] Perfil separador entre vidrios: el espesor del separador indica la cámara (4mm, 6mm, 9mm, 12mm, 15mm, 20mm).
- [F47] Esquina de la ventana (donde se ve el espesor total del acristalamiento y el número de vidrios).

**Documentación útil:**
- Fichas técnicas de acristalamientos.
- DAE-DB-HE (valores de transmitancia de vidrios).
- UNE-EN 673 (cálculo de transmitancia de acristalamientos).

**Preguntas al cliente:**
- "¿Las ventanas son de un solo vidrio, de doble (climalit) o de triple?"
- "¿Sabes si el vidrio tiene algún tratamiento especial? ¿Como 'bajo emisivo' o 'control solar'?"
- "¿Puedes hacer una foto a la esquina del vidrio donde se vea el canto? Así podemos ver el grosor."
- "¿Hay alguna pegatina o marca en el vidrio? A veces pone el tipo de vidrio."

**Reglas de inferencia:**
- **Vidrio simple:** Un solo reflejo visible. Espesor típico 3-6mm. U ≈ 5.7-5.9 W/m²·K.
- **Vidrio doble (cámara):** Doble reflejo visible (se ve el reflejo de la ventana duplicado). Espesor total típico: 15-28mm (4mm vidrio + 6-20mm cámara + 4mm vidrio). U ≈ 2.5-3.5 W/m²·K con cámara de aire.
- **Vidrio doble bajo emisivo:** El vidrio puede tener un tinte ligeramente dorado o azulado (depende del recubrimiento). U ≈ 1.0-2.0 W/m²·K (con cámara de argón).
- **Vidrio triple:** Tres reflejos (más difícil de ver). Espesor total >30mm. U ≈ 0.6-1.2 W/m²·K.
- **Cámara de aire vs. argón:** A simple vista no se distingue. Si el cliente no lo sabe, asumir aire (argón suele ser específico de ventanas de alta eficiencia).
- **Perfil separador:** El espesor del separador (la pieza metálica entre vidrios) da el espesor de la cámara:
  - Separador de 6mm → cámara de 6mm.
  - Separador de 9mm → cámara de 9mm.
  - Separador de 12mm → cámara de 12mm.
  - Separador de 15mm → cámara de 15mm.
  - Separador de 20mm → cámara de 20mm.
  - El espesor total del acristalamiento = vidrio exterior + cámara + vidrio interior.

**Posibles contradicciones:**
- El cliente dice "doble acristalamiento" pero la foto muestra un solo vidrio (simple reflejo).
- El cliente dice "climalit" (marca comercial) pero puede ser un doble acristalamiento básico sin cámara de gas.
- El certificado original declara un acristalamiento de alta eficiencia que no es visible en las fotos.
- El perfil separador es de aluminio (el más común) pero puede ser de "borde caliente" (mejor aislamiento), no distinguible a simple vista.

**Nivel de confianza:**
- Con fotos del perfil separador + marcas: 90%.
- Con fotos del reflejo (doble/simple) + espesor en esquina: 85%.
- Con solo fotos del reflejo: 70%.
- Con solo declaración del cliente: 40%.

**Casos donde es obligatoria la revisión manual:**
- Acristalamientos con capas bajo emisivas no identificables visualmente.
- Vidrios de seguridad o laminados (el espesor y composición pueden diferir).
- Dobles ventanas (dos ventanas independientes en lugar de un doble acristalamiento). Esto es común en edificios antiguos de zonas frías.

---

### F3 — Transmitancia térmica del hueco (U_total)

**Variable CE3X:** U_total del hueco (W/m²·K). Combina la transmitancia del marco (U_marco), la del vidrio (U_vidrio), y el factor de corrección del marco (fracción del área total del hueco ocupada por el marco).

**Qué representa:** Es el valor U combinado de toda la ventana (marco + vidrio). CE3X lo calcula como: U_hueco = (U_marco × F_marco) + (U_vidrio × (1 - F_marco)), donde F_marco es el porcentaje del marco respecto al hueco total.

**Cómo se obtiene:**
- A partir de F1 (material del marco) y F2 (tipo de acristalamiento), usando tablas del CTE o del DAE-DB-HE.
- De la certificado original (si declara el valor U del hueco).
- Cálculo manual si se conocen los valores U de marco y vidrio.

**Evidencias válidas:**
- F1 y F2 verificados.
- Certificado original.
- DAE-DB-HE (tablas de valores U por tipo de ventana).

**Fotografías necesarias:**
- No aplica (se calcula).

**Documentación útil:**
- DAE-DB-HE (Tablas de transmitancia térmica de huecos).
- UNE-EN ISO 10077-1 (cálculo de transmitancia de ventanas).
- Fichas técnicas.

**Preguntas al cliente:**
- No aplica (se calcula de los datos anteriores).

**Reglas de inferencia:**

| Tipo de marco | U_marco (W/m²·K) |
|--------------|-------------------|
| Madera (espesor >60mm) | 2.0-2.5 |
| Madera (espesor >80mm) | 1.5-2.0 |
| Aluminio sin RPT | 5.0-6.0 |
| Aluminio con RPT | 3.0-4.0 |
| PVC (2 cámaras) | 1.5-2.0 |
| PVC (3 cámaras) | 1.2-1.8 |
| Mixta madera-aluminio | 2.0-3.0 |

| Tipo de acristalamiento | U_vidrio (W/m²·K) |
|------------------------|-------------------|
| Vidrio simple 4mm | 5.7 |
| Doble acristalamiento 4+6+4 (aire) | 3.5 |
| Doble acristalamiento 4+9+4 (aire) | 3.1 |
| Doble acristalamiento 4+12+4 (aire) | 2.8 |
| Doble acristalamiento 4+12+4 (argón) | 2.6 |
| Doble acristalamiento 4+16+4 (aire) | 2.7 |
| Doble acristalamiento 4+16+4 (argón) | 2.5 |
| Doble acristalamiento bajo emisivo (aire) | 1.8-2.0 |
| Doble acristalamiento bajo emisivo (argón) | 1.2-1.5 |
| Triple acristalamiento (aire) | 1.6-2.0 |
| Triple acristalamiento (argón) | 0.6-1.2 |

Fracción de marco (F_marco):
- Ventana pequeña (<1m²): 30-40%.
- Ventana mediana (1-2m²): 20-30%.
- Ventana grande (>2m²): 15-25%.
- Puerta-ventana/balconera: 25-35%.

**Posibles contradicciones:**
- El certificado declara un U_hueco menor (mejor) del que corresponde a marco + vidrio en las fotos.
- El certificado usa un F_marco menor del real (subestima la superficie de marco, mejorando el U_hueco).

**Nivel de confianza:**
- Con marco + vidrio verificados: 85%.
- Con solo marco o solo vidrio: 60%.

**Casos donde es obligatoria la revisión manual:**
- Ventanas con marcos muy complejos (perfiles múltiples, rotura de puente térmico de alto rendimiento).
- Ventanas correderas (el marco tiene mayor fracción que las abatibles).
- Lucernarios y claraboyas (geometría de instalación diferente).

---

### F4 — Factor solar del acristalamiento (g)

**Variable CE3X:** Factor solar g (o SHGC, Solar Heat Gain Coefficient) del vidrio. Fracción de la energía solar incidente que se transmite al interior. Varía entre 0 (ninguna transmisión) y 1 (transmisión total).

**Qué representa:** El factor solar determina cuánto calor del sol entra a través del vidrio. En invierno, un g alto es beneficioso (ganancias solares gratuitas). En verano, un g alto puede ser perjudicial (sobrecalentamiento).

**Cómo se obtiene:**
- Del tipo de acristalamiento identificado en F2 (cada tipo tiene su valor g típico).
- De las marcas en el vidrio (F44) si incluyen el factor solar.
- De tablas del DAE-DB-HE.
- Certificado original.

**Evidencias válidas:**
- F2 (tipo de acristalamiento) → valor g asociado.
- Marcado CE del vidrio (incluye el valor g).
- Ficha técnica.
- Certificado original.

**Fotografías necesarias:**
- [F44] Marcas en el vidrio (pueden incluir el factor solar).

**Documentación útil:**
- DAE-DB-HE (Tabla de factores solares de acristalamientos).
- UNE-EN 410 (determinación del factor solar).
- Fichas técnicas.

**Preguntas al cliente:**
- No aplica (se deduce del tipo de vidrio).

**Reglas de inferencia:**

| Tipo de acristalamiento | g (factor solar) |
|------------------------|-----------------|
| Vidrio simple 4mm | 0.85-0.87 |
| Doble acristalamiento 4+12+4 | 0.75-0.80 |
| Doble acristalamiento 4+16+4 | 0.75-0.80 |
| Doble acristalamiento bajo emisivo | 0.55-0.70 |
| Doble acristalamiento bajo emisivo + control solar | 0.30-0.50 |
| Triple acristalamiento | 0.50-0.70 |
| Vidrio de control solar (reflectante) | 0.20-0.50 |

**Posibles contradicciones:**
- El certificado original usa un factor solar que no corresponde con el tipo de vidrio visible.
- El cliente dice "control solar" pero el vidrio es un simple doble acristalamiento sin tratamiento.
- El factor solar declarado es muy bajo (alta protección solar) pero la ventana no tiene ningún tratamiento visible.

**Nivel de confianza:**
- Con tipo de vidrio confirmado: 80%.
- Sin confirmación: 50%.

**Casos donde es obligatoria la revisión manual:**
- Vidrios con tratamientos solares no identificables visualmente.
- Vidrios que han sido substituidos en parte de la vivienda pero no en todas las ventanas.

---

### F5 — Dimensiones de las ventanas (ancho × alto)

**Variable CE3X:** Dimensiones de cada ventana (m): ancho y alto del hueco (no del marco). Superficie total de huecos por orientación.

**Qué representa:** La superficie de ventanas determina la cantidad de pérdida térmica a través del hueco y la cantidad de ganancia solar. Es una de las variables más influyentes en la demanda energética.

**Cómo se obtiene:**
- Medición directa (el cliente mide con una cinta métrica).
- Estimación visual a partir de fotos con referencia de tamaño (puerta, persona, azulejo).
- Certificado original.
- Planos del edificio.

**Evidencias válidas:**
- [F48] Foto de cada ventana con una referencia de tamaño conocida (metro, persona, cama, azulejo de 30×30cm).
- [F49] Medición realizada por el cliente (foto de la cinta métrica midiendo ancho y alto).
- Certificado original.
- Planos.

**Fotografías necesarias:**
- [F48] Ventana completa con referencia de tamaño conocida.
- [F49] Cinta métrica midiendo ancho de la ventana (si el cliente puede).
- [F50] Cinta métrica midiendo alto de la ventana (si el cliente puede).
- [F51] Foto de cada ventana de la vivienda para identificar diferencias.

**Documentación útil:**
- Planos de fachada.
- Certificado original.

**Preguntas al cliente:**
- "¿Podrías medir el ancho y el alto de la ventana? Mide el hueco de la obra (el agujero en la pared), no el marco."
- "Si no tienes cinta métrica, ¿me puedes hacer una foto de la ventana con algo de tamaño conocido al lado? Por ejemplo, una persona, o una puerta."
- "¿Todas las ventanas son del mismo tamaño? ¿O hay alguna diferente?"

**Reglas de inferencia:**
- **Referencia de persona:** Una persona mide aproximadamente 1.70m. Comparar la altura de la ventana con la altura de la persona.
- **Referencia de puerta:** Una puerta estándar mide 2.00-2.10m de alto y 0.70-0.80m de ancho.
- **Referencia de azulejo:** Azulejo estándar de cocina/baño: 30×30cm, 30×60cm, 20×20cm. Contar azulejos en la foto para estimar dimensiones.
- **Referencia de cama:** Cama individual: 0.90×1.90m. Cama de matrimonio: 1.50×1.90m. Camas de medidas especiales: 1.35×1.90m (cama de una plaza y media), 1.80×2.00m (cama king size).
- **Referencia de ventana estándar:** Ventana de dormitorio típica: 1.00-1.50m de ancho × 1.00-1.50m de alto. Balconera: 0.70-0.90m de ancho × 2.00-2.20m de alto. Ventana de baño pequeña: 0.40-0.80 × 0.40-0.80m.

**Posibles contradicciones:**
- El tamaño de ventana declarado en el certificado no se corresponde con el visible en las fotos.
- El cliente dice que todas las ventanas son iguales pero las fotos muestran diferentes tamaños.
- La superficie total de ventanas parece excesiva para el tamaño de la vivienda (posible inflado en el certificado).

**Nivel de confianza:**
- Con medición directa (foto de cinta métrica): 95%.
- Con referencia de tamaño en foto: 75%.
- Con solo estimación visual: 60%.
- Con solo planos/certificado: 50%.

**Casos donde es obligatoria la revisión manual:**
- Cuando no se puede obtener una referencia de tamaño fiable.
- Ventanas de geometría no rectangular (arcos, círculos, triángulos).
- Muros cortina o acristalamientos de gran superficie.

---

### F6 — Factor de corrección de sombra del hueco

**Variable CE3X:** Factor de sombra del hueco por obstáculos externos. Es la reducción de la radiación solar incidente sobre el vidrio debido a obstáculos previos (edificios, árboles) y elementos de protección (toldos, lamas, voladizos).

**Qué representa:** El factor de sombra reduce las ganancias solares que entran por la ventana. Va de 0 (sombra total) a 1 (sin sombra). Se compone de:
- Sombra por obstáculos externos (edificios, árboles) → F_obst
- Sombra por protecciones solares (toldos, persianas, lamas) → F_prot
- Sombra por voladizos y retranqueos → F_vol

Factor de sombra total = F_obst × F_prot × F_vol

**Cómo se obtiene:**
- Fotografías del exterior de las ventanas mostrando obstáculos y protecciones.
- Google Street View (para obstáculos externos).
- Medición aproximada de la distancia y altura de los obstáculos.
- Preguntas al cliente.

**Evidencias válidas:**
- [F52] Foto de la ventana desde el exterior (mostrando toldo, persiana, alero, u otra protección).
- [F53] Foto del edificio desde la calle (mostrando árboles, edificios colindantes).
- [F54] Foto de la ventana desde el interior (mostrando la protección solar desde dentro).
- Google Street View.
- Google Earth (medición de alturas).

**Fotografías necesarias:**
- [F52] Cada ventana con su protección solar visible (toldo, persiana exterior, lamas, etc.).
- [F53] Entorno de cada ventana: árboles, edificios, u otros obstáculos.
- [F54] Ventana desde el interior (para ver si hay cortinas o estores que puedan reducir las ganancias).

**Documentación útil:**
- CTE DB-HE (método de cálculo del factor de sombra).
- DAE-DB-HE (tablas de factores de sombra).
- SunCalc (trayectoria solar).

**Preguntas al cliente:**
- "¿Tienes toldos, persianas, o lamas en las ventanas? ¿Los usas habitualmente en verano?"
- "¿Hay un edificio delante que dé sombra a tus ventanas a ciertas horas?"
- "¿Hay algún árbol grande cerca de las ventanas?"
- "¿Tienes cortinas o estores? ¿Sueles tenerlos echados durante el día?"

**Reglas de inferencia:**
- **Toldos:** Un toldo horizontal reduce la radiación solar en un 30-60% en verano (depende de la altura del sol y la inclinación del toldo). Factor típico: 0.5-0.8.
- **Persianas:** Las persianas bajadas (lamas cerradas) reducen la radiación en un 60-80%. Las persianas de lamas orientables pueden reducir entre 30-70%. Factor típico: 0.2-0.7 (dependiendo del grado de cierre y material).
- **Lamas fijas o voladizos:** La reducción depende del ángulo y de la latitud. Un alero de 0.5m sobre una ventana de 1.5m de alto reduce la radiación en verano pero permite el paso en invierno.
- **Vegetación de hoja caduca:** Árboles que pierden las hojas en invierno: factor de sombra en verano ≈ 0.5-0.7; en invierno ≈ 0.8-0.9.
- **Vegetación de hoja perenne:** Factor de sombra constante todo el año ≈ 0.5-0.7.
- **Edificio colindante:** Si el edificio de enfrente es más alto y la calle es estrecha, la planta baja puede tener sombra la mayor parte del día. El factor depende de la altura del edificio de enfrente, la anchura de la calle y la altura de la ventana.

**Cálculo aproximado del factor de sombra por edificio colindante:**
```
h = altura del edificio de enfrente (desde la base de la ventana)
d = distancia al edificio de enfrente (anchura de calle)
α = ángulo de sombra = arctan(h / d)

Factor de sombra = 1 - (α / 90°)   (simplificado)
```

- Si α > 90° (edificio de enfrente más bajo que la ventana): sin sombra (factor = 1.0).
- Si α ≈ 45° (edificio de enfrente a la misma altura que la ventana, calle de anchura igual a la altura): factor ≈ 0.5.

**Posibles contradicciones:**
- El certificado original no considera la sombra de un edificio colindante que es claramente visible en Street View.
- El cliente dice que no tiene toldos pero las fotos de fachada muestran toldos instalados.
- Hay árboles de hoja caduca: el factor de sombra es diferente en el cálculo de calefacción (invierno, sin hojas) que en refrigeración (verano, con hojas).

**Nivel de confianza:**
- Con fotos + Street View + medición aproximada: 70%.
- Con solo fotos: 50%.
- Sin información visual: 20%.

**Casos donde es obligatoria la revisión manual:**
- Cuando el factor de sombra es altamente variable (muchos árboles, toldos retráctiles, lamas orientables automáticas).
- Cuando la diferencia entre el caso con sombra y sin sombra cambia la letra energética en 1 o más letras.
- En climas muy soleados (zonas climáticas de verano severo: 3, 4), donde la sombra es crítica.

---

### F7 a F12 — Protecciones solares / Permeabilidad al aire

**Variable CE3X:** Las siguientes variables complementan el hueco:
- **F7 — Permeabilidad al aire de la ventana (m³/h·m²):** Clasificación según UNE-EN 12207 (Clase 1, 2, 3, 4). Influencia en las pérdidas por infiltración.
- **F8 — Tipo de apertura:** Abatible (mejor estanqueidad), oscilobatiente, corredera (peor estanqueidad), pivotante.
- **F9 — Estado de juntas y burletes:** Si están en buen estado, si hay corrientes de aire alrededor del marco.
- **F10 — Número de ventanas por orientación:** Cantidad de huecos en cada fachada.
- **F11 — Porcentaje de superficie acristalada por orientación:** Superficie de vidrio respecto a la superficie de fachada de esa orientación.
- **F12 — Puertas de acceso (si aplica):** Puerta de entrada a la vivienda, puerta de terraza (si es de paso no acristalada).

**F7 — Permeabilidad al aire:**
- **Cómo se obtiene:** Del tipo de ventana (abatible → mejor, corredera → peor) y la antigüedad. Ventanas nuevas suelen tener Clase 3 o 4. Ventanas viejas (pre-2000) pueden ser Clase 1 o 2.
- **Reglas de inferencia:**
  - Ventana abatible con burletes (post-2005): Clase 3-4.
  - Ventana corredera con burletes (post-2005): Clase 2-3.
  - Ventana abatible sin burletes visibles (pre-2000): Clase 1-2.
  - Ventana corredera sin burletes (pre-2000): Clase 1.
  - Ventana de madera antigua (pre-1980): Clase 1 (muy permeable).
- **Fotografía:** [F55] Detalle de los burletes de la ventana (si se ven).

**F8 — Tipo de apertura:**
- **Cómo se obtiene:** Visible en las fotos (la bisagra y el sistema de apertura).
- **Fotografía:** [F56] Bisagra de la ventana (abatible, oscilobatiente, corredera). [F57] Ventana abierta (para ver el sistema de apertura).

**F9 — Estado de juntas y burletes:**
- **Cómo se obtiene:** Pregunta al cliente y fotos de detalle.
- **Pregunta:** "¿Notas corrientes de aire alrededor de las ventanas cuando está cerradas? ¿Los burletes (las gomas alrededor del marco) están en buen estado?"
- **Fotografía:** [F55] Detalle de burletes.

**F10 — Número de ventanas por orientación:**
- **Cómo se obtiene:** Recuento visual en las fotos de fachadas (F07-F10). Pregunta al cliente.
- **Pregunta:** "¿Cuántas ventanas tiene tu vivienda? ¿Puedes decirme cuántas hay en cada fachada (las que dan a la calle principal, las que dan a atrás, las laterales)?"

**F11 — Porcentaje de superficie acristalada:**
- Se calcula dividiendo la superficie total de huecos por la superficie total de fachada de esa orientación.
- **Regla de inferencia:** Un porcentaje de huecos >40% puede indicar que los huecos son los principales responsables de la pérdida térmica.

**F12 — Puertas de acceso:**
- **Cómo se obtiene:** Fotos de la puerta de entrada y de la puerta de terraza (si aplica).
- **Fotografía:** [F58] Puerta de entrada (material, espesor, burletes). [F59] Puerta de terraza/balcón (si no es acristalada).
- **Pregunta:** "¿La puerta de entrada tiene alguna junta o burlete? ¿Notas que entra aire por debajo?"

**Nivel de confianza (general de F7-F12):**
- Con fotos detalladas: 80%.
- Sin fotos de detalle: 50%.

---

### F13 a F18 — Huecos por orientación

**Variable CE3X:** Las variables F1 a F12 deben aplicarse de forma independiente para cada orientación (N, S, E, O). No todos los huecos tienen el mismo tipo de ventana, la misma protección solar, o las mismas dimensiones.

**Qué representa:** Cada orientación puede tener ventanas diferentes (por ejemplo, las ventanas sur pueden tener toldos mientras que las norte no). El cálculo debe hacerse por separado para cada orientación.

**Cómo se obtiene:**
- Fotos de todas las ventanas de la vivienda, clasificadas por orientación.
- Pregunta al cliente si todas las ventanas son del mismo tipo.

**Fotografías necesarias:**
- Un juego completo de las fotos F40-F59 para cada orientación.

**Reglas de inferencia:**
- En viviendas típicas, todas las ventanas suelen ser del mismo tipo y material.
- Sin embargo, las ventanas de la cocina y el baño pueden ser diferentes (más pequeñas, de material diferente).
- Las ventanas de una terraza cerrada o galería pueden tener un acristalamiento diferente.
- Si el cliente dice "todas son iguales" y las fotos lo confirman, se puede tomar el mismo tipo para todas.

**Posibles contradicciones:**
- El cliente dice "todas iguales" pero las fotos muestran ventanas de diferente material (ej. aluminio en salón, PVC en dormitorios — posible sustitución progresiva).
- El certificado original asume todas iguales pero las fotos muestran diferencias.

**Nivel de confianza:**
- Con fotos de todas las ventanas: 95%.
- Con declaración de "todas iguales" pero sin verificar: 60%.

**Casos donde es obligatoria la revisión manual:**
- Cuando hay ventanas de diferentes materiales o tipos en la misma vivienda.
- Cuando hay claraboyas, lucernarios, o ventanas de geometría especial.

---

## 9. Grupo G — Envolvente térmica: Puentes térmicos

### G1 — Puentes térmicos en fachada

**Variable CE3X:** Puentes térmicos lineales: encuentros de fachada con forjados, pilares, cajas de persiana, y esquinas de fachada. Se definen mediante su transmitancia lineal (ψ, en W/m·K).

**Qué representa:** Los puentes térmicos son zonas de la envolvente donde el aislamiento no es continuo, lo que genera mayores pérdidas térmicas. Pueden representar entre el 10% y el 30% de las pérdidas totales de un edificio.

**Cómo se obtiene:**
- Por tipología constructiva y época (algunas épocas tienen peores puentes térmicos).
- Del certificado original (si los considera).
- Por defecto: CE3X tiene valores por defecto para puentes térmicos según la tipología.

**Evidencias válidas:**
- Certificado original.
- Proyecto de ejecución (detalles constructivos).
- Fotografías de los encuentros (esquinas, cajas de persiana, juntas de forjado).

**Fotografías necesarias:**
- [F60] Esquina interior de la vivienda (para ver si hay condensación o moho en las esquinas).
- [F61] Caja de persiana (desde el interior, si es visible).
- [F62] Junta entre pared y techo (para ver si hay grietas o condensaciones).
- [F63] Encuentro de la fachada con el forjado (si es visible desde el exterior).

**Documentación útil:**
- CTE DB-HE (Apéndice C: Puentes térmicos).
- DAE-DB-HE (Catálogo de puentes térmicos).
- UNE-EN ISO 10211 (cálculo de puentes térmicos).
- Manual de puentes térmicos del Instituto de Ciencias de la Construcción Eduardo Torroja.

**Preguntas al cliente:**
- "¿Hay moho o humedad en las esquinas de las habitaciones?"
- "¿La caja de persiana deja pasar aire? ¿Se nota frío alrededor de la ventana?"
- "¿Hay zonas de la pared que estén más frías que el resto (al tacto)?"

**Reglas de inferencia:**
- **Puente térmico de forjado:** En edificios sin aislamiento exterior continuo (fachada sin SATE), el forjado atraviesa la fachada y crea un puente térmico. Es más grave en edificios pre-2000 sin aislamiento exterior.
- **Puente térmico de pilar:** Los pilares de hormigón tienen mayor conductividad (λ ≈ 2.5 W/m·K) que el ladrillo (λ ≈ 0.4-0.7 W/m·K). En edificios donde los pilares están en la fachada, crean puentes térmicos.
- **Puente térmico de caja de persiana:** Las cajas de persiana suelen tener poco aislamiento y son una fuente común de pérdidas. Especialmente en ventanas pre-2000.
- **Puente térmico de esquina:** Las esquinas de fachada tienen mayor pérdida porque la superficie de intercambio térmico es mayor que la superficie interior (efecto geométrico).
- **Condensación en esquinas:** Si hay moho en las esquinas, es señal de que el puente térmico es significativo (la temperatura superficial es baja).
- **Valores por defecto en CE3X:**
  - Edificio con aislamiento continuo exterior: ψ ≈ 0.05-0.15 W/m·K.
  - Edificio sin aislamiento continuo exterior: ψ ≈ 0.20-0.50 W/m·K.
  - Esquinas de fachada: ψ ≈ 0.05-0.15 W/m·K.
  - Caja de persiana: ψ ≈ 0.10-0.30 W/m·K.

**Posibles contradicciones:**
- El certificado original declara puentes térmicos muy bajos (sin considerar los reales).
- Las fotos muestran moho en esquinas pero el certificado dice que no hay puentes térmicos.
- El edificio tiene SATE (aislamiento continuo) y, por tanto, los puentes térmicos deberían ser mínimos.

**Nivel de confianza:**
- Con fotos + tipo constructivo: 65%.
- Sin fotos: 40%.

**Casos donde es obligatoria la revisión manual:**
- Cuando hay moho o condensaciones en esquinas y cajas de persiana.
- Cuando el certificado original tiene puentes térmicos muy bajos en un edificio sin aislamiento continuo.
- En edificios donde la corrección de puentes térmicos mejoraría significativamente la eficiencia.

---

### G2 a G8 — Tipos de puentes térmicos

CE3X considera varios tipos de puentes térmicos lineales. Para cada uno se define su longitud (m) y su transmitancia lineal (ψ):

- **G2 — Encuentro fachada-forjado (perímetro de forjado):** Longitud = perímetro del edificio en cada planta.
- **G3 — Encuentro fachada-pilar:** Número de pilares en fachada × altura de cada pilar.
- **G4 — Encuentro fachada-cubierta:** Perímetro del edificio en la última planta.
- **G5 — Esquinas de fachada:** Suma de longitudes de todas las esquinas (verticales).
- **G6 — Cajas de persiana:** Suma de longitudes de todas las cajas de persiana.
- **G7 — Encuentro fachada-suelo:** Perímetro del edificio en planta baja (contacto con el terreno).
- **G8 — Otros puentes térmicos:** Elementos singulares (balcones, terrazas voladas, etc.).

**Reglas de inferencia:**
- En edificios con SATE (aislamiento exterior continuo), los puentes térmicos se reducen drásticamente (ψ ≈ 0.05-0.10 W/m·K).
- En edificios sin aislamiento exterior (fachada de ladrillo visto o enfoscado), los puentes térmicos son significativos (ψ ≈ 0.20-0.50 W/m·K).
- Las terrazas voladas (balcones de hormigón que atraviesan la fachada) crean puentes térmicos muy graves (ψ ≈ 0.50-1.00 W/m·K). Si el edificio tiene balcones de hormigón visibles desde la fachada, los puentes térmicos son elevados.
- Los puentes térmicos tienen mayor impacto en zonas climáticas frías (letras D, E) que en zonas suaves (A, B).

**Documentación útil para todos los puentes térmicos:**
- DAE-DB-HE: Catálogo de soluciones de puentes térmicos.
- Herramienta CE3X: permite seleccionar entre valores por defecto y valores calculados.

---

## 10. Grupo H — Instalaciones: Calefacción

### H1 — Sistema de calefacción / Tipo

**Variable CE3X:** Tipo de equipo de calefacción:
- Caldera individual (gas natural, gasóleo, propano, biomasa, eléctrica).
- Caldera colectiva / centralizada (gas natural, gasóleo, biomasa).
- Bomba de calor (aire-aire, aire-agua, geotérmica).
- Calefacción eléctrica (acumuladores, radiadores, suelo radiante eléctrico).
- Aerotermia (bomba de calor aire-agua para calefacción + ACS).
- Estufas (leña, pellets, gas).
- Sistemas de distrito (district heating).
- Sin calefacción.

**Qué representa:** El sistema de calefacción es, junto con la envolvente, el factor más determinante del consumo energético. Su eficiencia y el combustible utilizado determinan el consumo de energía primaria y las emisiones de CO₂.

**Cómo se obtiene:**
- Certificado energético original.
- Fotografías del equipo de calefacción (caldera, split, radiadores, estufa).
- Facturas de combustible (gas, electricidad, pellets, gasóleo).
- Pregunta directa al cliente.

**Evidencias válidas:**
- [H01] Foto del equipo principal de calefacción (caldera, bomba de calor, estufa).
- [H02] Foto de los radiadores o emisores (para confirmar el sistema).
- [H03] Foto de la placa de características del equipo (modelo, potencia, eficiencia).
- [H04] Factura de gas, electricidad, o combustible.
- Certificado original.

**Fotografías necesarias:**
- [H01] Equipo de calefacción: caldera (vista frontal, mostrando la marca y modelo), split de bomba de calor, estufa.
- [H02] Emisor: radiador (panel, toallero), fancoil, suelo radiante (visible en el suelo si hay una junta o la caldera tiene el circuito identificado).
- [H03] Placa de características del equipo (suele estar en un lateral o en la parte inferior de la caldera, o detrás de una tapa).
- [H04] Termostato o programador (si existe).
- [H05] Depósito de combustible (gasóleo, propano, pellets) si existe.

**Documentación útil:**
- Ficha técnica del equipo (si el cliente la conserva).
- Facturas de mantenimiento (revisiones de la caldera).
- Certificado de instalación.
- Libro del edificio (instalaciones colectivas).

**Preguntas al cliente:**
- "¿Qué sistema de calefacción tienes? ¿Caldera de gas, bomba de calor, estufa, radiadores eléctricos?"
- "¿La caldera es individual (solo para tu vivienda) o es colectiva (centralizada para todo el edificio)?"
- "¿Qué combustible usa? ¿Gas natural, gasóleo, propano, pellets, leña?"
- "¿Tienes aire acondicionado que también calienta (bomba de calor)?"
- "¿Cuándo se instaló el sistema de calefacción actual?"
- "¿Puedes hacer una foto a la placa de características del equipo? Ahí pone la marca, el modelo y la potencia."
- "¿Conservas el manual de la caldera o algún certificado de instalación?"

**Reglas de inferencia:**
- **Por tipo de edificio y ubicación:** Edificios en ciudad con gas natural canalizado → alta probabilidad de caldera de gas. Zonas rurales → mayor probabilidad de gasóleo, propano o biomasa.
- **Por año de construcción:** Edificios post-2000 pueden tener calefacción centralizada o individual. Edificios post-2010 pueden tener aerotermia o bomba de calor. Edificios pre-1990 pueden tener caldera de gasóleo o gas natural.
- **Por presencia de radiadores:** Radiadores de agua (panel, toallero) → sistema de caldera o bomba de calor aire-agua. Radiadores eléctricos (con resistencia visible) → calefacción eléctrica directa.
- **Por presencia de splits:** Splits en varias estancias → bomba de calor aire-aire. Un solo split en el salón → bomba de calor parcial (puede no cubrir toda la vivienda).
- **Por facturas:** Factura de gas → caldera de gas o calefacción centralizada. Factura eléctrica alta en invierno → bomba de calor o calefacción eléctrica. Factura de gasóleo → caldera de gasóleo.
- **Por el termostato:** Termostato simple → sistema básico. Termostato programable → puede tener zonificación o programación horaria.

**Posibles contradicciones:**
- El cliente dice "tengo calefacción de gas" pero la foto muestra un split de bomba de calor (puede tener ambos sistemas: caldera + aire acondicionado).
- El cliente dice "calefacción central" pero no hay radiadores ni tuberías visibles (puede ser calefacción central por conductos de aire).
- El certificado original declara un sistema de calefacción diferente al visible en las fotos.
- La caldera es antigua (>15 años) pero el cliente dice "es nueva" (posible confusión entre cambio de titular y cambio de equipo).
- El cliente dice que no tiene calefacción pero hay radiadores visibles en las fotos del interior.

**Nivel de confianza:**
- Con fotos del equipo + placa de características: 95%.
- Con fotos del equipo sin placa: 80%.
- Con certificado original: 70%.
- Con solo declaración del cliente: 50%.

**Casos donde es obligatoria la revisión manual:**
- Cuando hay múltiples sistemas de calefacción (ej. caldera de gas + bomba de calor + estufa de leña). Debe determinarse cuál es el principal.
- Sistemas de calefacción por suelo radiante (es difícil verificar el sistema sin acceder al termostato o a la centralita).
- Calefacción centralizada con contadores individuales (necesario verificar la eficiencia de la central).
- Cuando la placa de características no es legible y el modelo no puede identificarse por fotos.

---

### H2 — Potencia del sistema de calefacción

**Variable CE3X:** Potencia nominal del equipo de calefacción (kW). Determina la capacidad del sistema para calentar la vivienda.

**Qué representa:** La potencia instalada debe ser suficiente para cubrir la carga térmica máxima de calefacción. Una potencia excesiva o insuficiente afecta a la eficiencia del sistema.

**Cómo se obtiene:**
- De la placa de características del equipo (foto [H03]).
- Del modelo y marca (búsqueda online de la ficha técnica).
- Del certificado original.
- Factura de instalación.

**Evidencias válidas:**
- [H03] Placa de características (indica la potencia nominal en kW o kcal/h).
- Certificado original.
- Ficha técnica del modelo.

**Fotografías necesarias:**
- [H03] Placa de características legible.
- [H06] Etiqueta energética del equipo (si existe).

**Documentación útil:**
- Ficha técnica del fabricante (búsqueda online por marca y modelo).
- Manual de instalación.

**Preguntas al cliente:**
- "¿Podrías hacer una foto a la placa de características? Normalmente está en un lateral o en la parte de abajo de la caldera."
- "Si no ves la placa, ¿sabes la marca y el modelo? Podemos buscarlo."

**Reglas de inferencia:**
- **Caldera individual de gas:** Potencia típica 24-28 kW.
- **Caldera de gasóleo:** Potencia típica 20-35 kW.
- **Bomba de calor aire-aire (split):** Potencia típica 2.5-5 kW por unidad interior.
- **Bomba de calor aire-agua (aerotermia):** Potencia típica 5-16 kW.
- **Calefacción eléctrica directa (radiadores):** No aplica potencia fija (cada radiador tiene su potencia, normalmente 1-2 kW).

**Posibles contradicciones:**
- La potencia de la caldera es excesiva para la superficie de la vivienda (ej. 28 kW para 50m²).
- El certificado original declara una potencia diferente a la de la placa.

**Nivel de confianza:**
- Con placa legible: 100%.
- Con modelo identificado: 95%.
- Con certificado original: 70%.
- Sin identificación: 30%.

**Casos donde es obligatoria la revisión manual:**
- Placa de características ilegible.
- Equipos antiguos sin placa visible.

---

### H3 — Rendimiento / Eficiencia del sistema de calefacción

**Variable CE3X:** Rendimiento estacional del sistema (η, en %), también conocido como COP (Coeficiente de Rendimiento) en bombas de calor, o eficiencia según la directiva de ecodiseño.

**Qué representa:** El rendimiento determina cuánta energía útil se obtiene por cada unidad de energía consumida. Por ejemplo, una caldera de condensación tiene η ≈ 90-98%, mientras que una caldera estándar tiene η ≈ 70-85%. Una bomba de calor tiene COP > 2.5 (es decir, produce 2.5 veces más energía de la que consume).

**Cómo se obtiene:**
- De la placa de características (indica el rendimiento o COP).
- Del modelo y marca (búsqueda online).
- Por antigüedad y tipo de equipo (inferencia).
- Certificado original.

**Evidencias válidas:**
- [H03] Placa de características (rendimiento, COP o EER).
- [H06] Etiqueta energética del equipo.
- Certificado original.
- Ficha técnica del fabricante.

**Fotografías necesarias:**
- [H03] Placa de características.
- [H06] Etiqueta energética del equipo (si está visible).

**Documentación útil:**
- Directiva ErP (Energy-related Products).
- Ficha técnica del fabricante.
- Bases de datos de equipos eficientes (p.ej., Base de Datos de Equipos de Climatización del MITECO).

**Preguntas al cliente:**
- No aplica directamente (se obtiene de la identificación del equipo).

**Reglas de inferencia por antigüedad y tipo:**

| Tipo de caldera | Año | Rendimiento estacional (η) |
|----------------|-----|--------------------------|
| Caldera estándar (gas) | <2000 | 65-75% |
| Caldera estándar (gas) | 2000-2010 | 75-85% |
| Caldera de bajo NOx (gas) | 2005-2015 | 80-88% |
| Caldera de condensación (gas) | >2010 | 90-98% |
| Caldera de gasóleo estándar | <2010 | 75-85% |
| Caldera de gasóleo de condensación | >2010 | 88-95% |
| Caldera de biomasa (pellets/leña) | Cualquiera | 60-85% |
| Bomba de calor aire-aire (COP) | <2005 | 1.8-2.5 |
| Bomba de calor aire-aire (COP) | 2005-2015 | 2.5-3.5 |
| Bomba de calor aire-aire (COP) | >2015 | 3.0-4.5 |
| Bomba de calor aire-agua (COP) | Cualquiera | 2.5-4.0 |
| Bomba de calor geotérmica (COP) | Cualquiera | 3.5-5.5 |
| Calefacción eléctrica por resistencia | Cualquiera | 100% (1kW produce 1kW) |
| Estufa de leña (rendimiento) | <2010 | 50-65% |
| Estufa de leña (rendimiento) | >2010 | 65-80% |
| Estufa de pellets (rendimiento) | Cualquiera | 75-90% |

**Nota importante:** El rendimiento estacional (η) no es igual al rendimiento a plena carga. Para calderas, el rendimiento estacional considera las pérdidas en funcionamiento parcial y en standby. Para bombas de calor, se usa el SCOP (Seasonal Coefficient of Performance) en lugar del COP nominal.

**Posibles contradicciones:**
- El certificado original declara un rendimiento superior al típico para la antigüedad y tipo del equipo.
- El cliente dice "tengo caldera de condensación" pero el modelo visible en las fotos es una caldera estándar.
- El rendimiento declarado parece mejor que el de equipos similares de la misma época.

**Nivel de confianza:**
- Con placa legible + modelo identificado: 95%.
- Con modelo identificado solo: 85%.
- Con solo antigüedad y tipo: 65%.
- Con solo certificado original: 50%.

**Casos donde es obligatoria la revisión manual:**
- Equipos de biomasa (el rendimiento varía mucho según el tipo de combustible y la calidad del equipo).
- Calderas de condensación antiguas (>10 años) donde la eficiencia real puede haber disminuido.
- Bombas de calor sin etiqueta energética ni documentación.

---

### H4 — Combustible / Vector energético

**Variable CE3X:** Combustible utilizado por el sistema de calefacción (gas natural, gasóleo, propano, biomasa, electricidad, solar térmica, geotermia).

**Qué representa:** El combustible determina el factor de conversión a energía primaria y las emisiones de CO₂. Por ejemplo, el gas natural tiene un factor de paso a energía primaria no renovable de 1.045, mientras que la electricidad tiene 1.954 (según normativa vigente). Las emisiones de CO₂ también varían: gas natural → 0.252 kg CO₂/kWh, electricidad → 0.330 kg CO₂/kWh (valores orientativos, según normativa aplicable).

**Cómo se obtiene:**
- Identificando el equipo de calefacción (H1).
- Facturas de suministro (gas, electricidad, gasóleo).
- Fotografías del contador o del depósito de combustible.
- Certificado original.
- Pregunta al cliente.

**Evidencias válidas:**
- [H07] Factura de gas, electricidad o gasóleo (se puede ocultar el importe, pero debe verse el concepto de suministro).
- [H08] Contador de gas o eléctrico.
- [H05] Depósito de combustible (gasóleo, propano, pellets).
- Certificado original.

**Fotografías necesarias:**
- [H07] Factura de suministro (con el tipo de combustible visible).
- [H08] Contador de gas (si existe).
- [H05] Depósito de combustible (si existe).

**Documentación útil:**
- Facturas de suministro (mejor si son de varios meses para ver el consumo estacional).
- Factores de paso del CTE DB-HE (o del Real Decreto de certificación energética).
- Certificado original.

**Preguntas al cliente:**
- "¿Qué combustible usa tu calefacción? ¿Gas natural (de la red), gasóleo (depósito), propano (bombona), pellets, leña?"
- "¿Podrías enviarme una foto de una factura de gas o electricidad? No necesito ver el importe, solo el tipo de suministro."
- "¿Tienes un depósito de gasóleo o propano? ¿Dónde está ubicado?"

**Reglas de inferencia:**
- **Gas natural:** Típico en ciudades con red de gas canalizada. El contador de gas suele estar en una arqueta en la acera o en un armario en la fachada.
- **Gasóleo:** Típico en zonas rurales sin red de gas. Depósito metálico o de plástico (generalmente en el exterior, en el jardín o en un cuarto de calderas).
- **Propano:** Depósitos o bombonas. Típico en urbanizaciones sin red de gas. Las bombonas de butano (naranja) son de 12.5kg. Las de propano (verde) son de 11kg o 35kg.
- **Biomasa:** Pellets (bolitas de madera, se almacenan en sacos), leña (troncos, se almacenan en pilas), cáscara de frutos secos. Son combustibles sólidos.
- **Eléctrica:** No hay depósito ni contador específico. Se usa la electricidad de la red.

**Posibles contradicciones:**
- El cliente dice "gas natural" pero las fotos muestran una bombona de propano.
- El cliente dice "gas natural" pero la factura muestra "gasóleo" (posible confusión).
- El certificado original indica un combustible diferente al real (posible inflado: el gas natural emite menos CO₂ que el gasóleo).

**Nivel de confianza:**
- Con factura o contador visible: 100%.
- Con foto del equipo (caldera de gas = gas natural o propano según la zona): 75%.
- Con solo declaración: 60%.

**Casos donde es obligatoria la revisión manual:**
- Cuando no se puede determinar el combustible (caldera de gas sin contador visible, en zona con y sin red de gas).
- Instalaciones con doble combustible (caldera que puede usar gasóleo y gas, o biomasa y gasóleo).

---

### H5 — Sistema de distribución de calefacción

**Variable CE3X:** Tipo de sistema de distribución (agua caliente por radiadores, fancoils, suelo radiante, aire por conductos). También las condiciones de distribución (temperatura de impulsión, aislamiento de tuberías).

**Qué representa:** El sistema de distribución determina cómo se transporta el calor desde el generador hasta los emisores. Las pérdidas en distribución pueden ser significativas, especialmente en sistemas centralizados con tuberías largas y mal aisladas.

**Cómo se obtiene:**
- Fotografías de los emisores (radiadores, splits, suelo radiante).
- Certificado original.
- Pregunta al cliente.

**Evidencias válidas:**
- [H02] Radiadores, splits, fancoils.
- [H09] Tuberías visibles en el exterior o en zonas comunes (si aplica).
- Certificado original.

**Fotografías necesarias:**
- [H02] Emisores: radiador típico (panel de agua), split, fancoil.
- [H09] Tuberías (si son visibles en zonas comunes, sótano, etc.).
- [H10] Suelo radiante: termostato o manifold (colector) visible en la pared (si existe).

**Documentación útil:**
- Certificado de instalación.
- Manual del sistema.

**Preguntas al cliente:**
- "¿Cómo distribuyes el calor? ¿Tienes radiadores de agua, suelo radiante, splits de aire, o radiadores eléctricos?"
- "¿El agua de la calefacción va por tuberías que pasan por zonas sin calefacción? ¿Por ejemplo, por un garaje o un pasillo sin radiadores?"
- "¿Sabes si las tuberías están aisladas?"

**Reglas de inferencia:**
- **Radiadores de agua:** Sistema clásico de caldera con tuberías de ida y retorno. Temperatura de impulsión típica: 60-80°C (calderas estándar) o 35-55°C (calderas de condensación).
- **Suelo radiante:** Tuberías de agua caliente embebidas en el suelo. Temperatura de impulsión baja: 30-45°C. Más eficiente que radiadores pero mayor inercia térmica.
- **Fancoils:** Unidades con ventilador que mueven el aire a través de un intercambiador de agua. Se usan en sistemas centralizados o con bomba de calor aire-agua.
- **Split/conductos:** Bomba de calor aire-aire. Distribución por aire a través de conductos (sistema centralizado) o unidades individuales splits.
- **Calefacción eléctrica directa:** No hay distribución. Cada radiador genera calor in situ.
- **Pérdidas en distribución:** En sistemas centralizados (varias viviendas), las pérdidas pueden ser del 10-20% si las tuberías no están aisladas. En sistemas individuales, las pérdidas son mínimas (5-10%).

**Posibles contradicciones:**
- El cliente dice "suelo radiante" pero las fotos muestran radiadores de panel (no puede haber ambos si el sistema es el principal. Podría tener suelo radiante en baños y radiadores en el resto — verificar).
- El certificado declara un sistema de distribución diferente al visible.
- Las tuberías no están aisladas (se ven al descubierto en zonas frías) pero el certificado asume que sí.

**Nivel de confianza:**
- Con fotos de emisores: 90%.
- Con solo declaración: 60%.

**Casos donde es obligatoria la revisión manual:**
- Suelo radiante (es necesario verificar el tipo de suelo, el aislamiento bajo las tuberías, y la temperatura de impulsión).
- Sistemas de conductos de aire (es necesario verificar la sección, el aislamiento y las pérdidas).
- Sistemas centralizados con contadores individuales (la eficiencia depende del equilibrio del sistema).

---

### H6 — Sistema de control / Regulación

**Variable CE3X:** Tipo de control de la calefacción: termostato ambiente, termostato programable, sonda exterior, válvulas termostáticas en radiadores, control por zonas.

**Qué representa:** El sistema de control determina cómo se regula la temperatura interior. Un buen control (termostato programable + válvulas termostáticas) puede reducir el consumo hasta un 20% respecto a un sistema sin control o con control manual.

**Cómo se obtiene:**
- Fotografías del termostato y de los mandos de los radiadores.
- Certificado original.
- Pregunta al cliente.

**Evidencias válidas:**
- [H04] Termostato o programador visible.
- [H11] Válvula termostática en un radiador (visible como una pieza giratoria en la entrada del radiador).
- Certificado original.

**Fotografías necesarias:**
- [H04] Termostato ambiente (fijo en la pared) o termostato programable.
- [H11] Válvula en la base del radiador (para ver si es manual o termostática).
- [H12] Panel de control de la caldera o de la bomba de calor.

**Documentación útil:**
- Manual de la caldera o del sistema de control.

**Preguntas al cliente:**
- "¿Tienes un termostato en la pared? ¿Es programable (se puede programar por horas)?"
- "¿Los radiadores tienen una rueda para regular la temperatura individualmente? ¿Es una rueda numerada o lisa?"
- "¿Sueles apagar la calefacción por la noche o cuando no estás en casa?"

**Reglas de inferencia:**
- **Sin termostato:** El usuario regula manualmente la caldera (enciende/apaga). Muy ineficiente.
- **Termostato simple (mecánico):** Regula la temperatura general. No programable. Eficiencia básica.
- **Termostato programable:** Permite programar temperaturas diferentes por horas y días. Puede reducir el consumo 10-15%.
- **Termostato con sonda exterior:** Regula la temperatura de impulsión en función de la temperatura exterior (curva de calefacción). Mejora la eficiencia hasta un 10%.
- **Válvulas termostáticas en radiadores:** Permiten regular la temperatura de cada estancia individualmente. Pueden reducir el consumo otro 10-15%.
- **Control por zonas:** Diferentes termostatos para diferentes zonas de la vivienda. Máxima eficiencia de regulación.
- **Sistema domótico:** Control centralizado, a veces con acceso remoto. Eficiencia óptima.

**Valores típicos de mejora por control (sobre el consumo base):**
- Sin control: 0% (base).
- Termostato simple: 5% de ahorro.
- Termostato programable: 15% de ahorro.
- Válvulas termostáticas: 10-15% adicional.
- Sonda exterior + curva de calefacción: 5-10% adicional.

**Posibles contradicciones:**
- El cliente dice que tiene programador pero en las fotos no se ve ningún termostato (puede tenerlo integrado en la caldera).
- El cliente dice que apaga la calefacción por la noche, pero el consumo de las facturas sugiere que no (el consumo nocturno también es bajo por la menor temperatura exterior, no necesariamente por apagar la calefacción).

**Nivel de confianza:**
- Con fotos del termostato: 90%.
- Con solo declaración: 50%.

**Casos donde es obligatoria la revisión manual:**
- Sistemas de control integrados en la caldera sin interfaz visible.
- Sistemas de domótica compleja.

---

### H7 — Emisores de calefacción

**Variable CE3X:** Ver H5 (distribución). Los emisores están directamente relacionados con el sistema de distribución.

---

### H8 — Antigüedad del sistema de calefacción

**Variable CE3X:** Año de instalación del sistema de calefacción actual. Determina la normativa de eficiencia aplicable y la tecnología del equipo.

**Qué representa:** La antigüedad es un factor crítico para determinar el rendimiento real del equipo. Una caldera de gas de 20 años tiene un rendimiento significativamente menor que una nueva de condensación.

**Cómo se obtiene:**
- De la placa de características (fecha de fabricación).
- Del modelo (año de comercialización).
- Factura de instalación.
- Pregunta al cliente.
- Etiqueta de mantenimiento (revisiones anuales: las más antiguas indican el año de instalación).

**Evidencias válidas:**
- [H03] Placa de características (año de fabricación).
- [H13] Etiqueta de mantenimiento o revisión (visible en la caldera).
- Factura de compra o instalación.
- Certificado original.

**Fotografías necesarias:**
- [H03] Placa de características (año visible).
- [H13] Etiqueta de mantenimiento de la caldera (suele tener las fechas de las revisiones).

**Documentación útil:**
- Factura de instalación.
- Manual del equipo.
- Certificado de instalación.

**Preguntas al cliente:**
- "¿Cuándo se instaló la caldera actual?"
- "¿Sabe la antigüedad de la caldera? Normalmente viene en la placa de características."
- "¿Tiene alguna factura de la instalación de la caldera?"

**Reglas de inferencia:**
- **Vida útil típica:**
  - Caldera de gas estándar: 15-20 años.
  - Caldera de condensación: 20-25 años.
  - Bomba de calor: 15-20 años.
  - Caldera de gasóleo: 20-25 años.
  - Calefacción eléctrica: 20-30 años.
- Si el cliente no sabe la antigüedad y no se ve en la placa, se puede estimar por:
  - El diseño y tamaño de la caldera (las modernas son más compactas).
  - El tipo de control (termostato programable es post-2005).
  - La presencia de condensación (tubería de plástico para el condensado → caldera de condensación, probablemente post-2010).

**Posibles contradicciones:**
- La caldera parece antigua (>15 años) según las fotos, pero el cliente dice "recién instalada" (puede ser de segunda mano o de exposición).
- El año de instalación declarado no coincide con el año de fabricación del modelo.

**Nivel de confianza:**
- Con placa legible: 100%.
- Con modelo identificado: 90%.
- Con solo declaración: 50%.

**Casos donde es obligatoria la revisión manual:**
- Equipos sin placa visible ni modelo identificable.

---

### H9 a H14 — Datos adicionales de calefacción

- **H9 — Mantenimiento del sistema:** Fecha de la última revisión. Preguntar: "¿Cuándo fue la última revisión de la caldera? ¿Tienes el certificado de mantenimiento?"
- **H10 — Horas de uso diario:** Preguntar: "¿Cuántas horas al día tienes encendida la calefacción en invierno?".
- **H11 — Meses de uso al año:** Preguntar: "¿En qué meses enciendes la calefacción? Normalmente de noviembre a marzo, ¿o más?"
- **H12 — Temperatura de consigna de calefacción:** Ver B8.
- **H13 — Zonificación:** Si la calefacción se puede regular por zonas (dormitorios independiente del salón).
- **H14 — Tipo de instalación:** Individual o colectiva/centralizada.

**H10, H11 — Horas y meses de uso:**
- **Reglas de inferencia:**
  - Zona climática D/E: generalmente 5-6 meses (noviembre a abril).
  - Zona climática B/C: 3-4 meses (diciembre a marzo).
  - Zona climática A: 0-2 meses (solo en días muy fríos).
  - Horas diarias típicas: 6-10 horas en invierno.
- **Posibles contradicciones:** El cliente declara muchas horas de uso pero la factura es baja (poco consumo real). El cliente declara pocas horas pero la factura es alta.

**H14 — Individual vs. colectiva:**
- **Fotografía:** [H14] Cuarto de calderas central (si aplica y es accesible). [H15] Contador individual de calefacción (si existe).
- **Cómo obtener:** Del cliente y de las fotos de las zonas comunes. Los radiadores con contadores individuales (repartidores de costes) indican calefacción centralizada con facturación individualizada.

---

### H15 — Consumo de calefacción (facturas)

**Variable CE3X:** Consumo anual de combustible/energía para calefacción (kWh/año o la unidad de medida del combustible: m³ de gas, litros de gasóleo, kg de pellets).

**Qué representa:** El consumo real es la mejor manera de validar la estimación de CE3X. Si el consumo real es muy diferente del calculado, el modelo puede tener errores en la envolvente, los equipos o los hábitos de uso.

**Cómo se obtiene:**
- Facturas de suministro (mínimo 12 meses para tener el ciclo anual completo).
- Certificado original (a veces incluye el consumo estimado).
- Pregunta directa al cliente (con menor precisión).

**Evidencias válidas:**
- [H07] Facturas de gas, electricidad o gasóleo de los últimos 12 meses.
- Historial de consumos (descargable de la web de la compañía suministradora).
- Certificado original (si incluye el consumo real medido).

**Fotografías necesarias:**
- [H07] Factura de suministro (mostrando el consumo en kWh, m³, o litros).
- [H16] Captura de pantalla del historial de consumo de la web de la compañía.

**Documentación útil:**
- Facturas de gas (al menos de los meses de invierno y verano para desglosar ACS del consumo de calefacción).
- Facturas de electricidad (para desglosar calefacción eléctrica del resto de usos).
- Historial de consumo en la web de la compañía.

**Preguntas al cliente:**
- "¿Podrías compartir tus facturas de gas o electricidad de los últimos meses? Podemos ver el consumo real y compararlo con la estimación."
- "¿Tienes acceso al historial de consumo en la web de tu compañía?"
- "¿Sabes cuánto gastas al año aproximadamente en calefacción?"

**Reglas de inferencia:**
- **Desglose del consumo de gas:** Para separar el consumo de calefacción del de ACS y cocina:
  1. Tomar el consumo de los meses de verano (sin calefacción: junio-septiembre) → consumo base (ACS + cocina).
  2. Restar ese consumo base de los meses de invierno → consumo de calefacción.
  3. Consumo anual de calefacción = Σ (consumo mensual invierno - consumo base verano).
- **Desglose del consumo eléctrico para bomba de calor:**
  1. Identificar el consumo eléctrico de los meses de verano (solo refrigeración, si aplica) e invierno (calefacción).
  2. Si el sistema es de aerotermia (bomba de calor para calefacción + ACS), el consumo eléctrico total incluye ambos usos.
  3. Estimar la parte de ACS (un hogar medio consume ≈ 800-1500 kWh/año para ACS eléctrica).
- **Conversión de unidades:**
  - 1 m³ de gas natural ≈ 10.5 kWh (poder calorífico inferior, PCI) — puede variar según la composición del gas.
  - 1 litro de gasóleo ≈ 10.0 kWh (PCI).
  - 1 kg de pellets ≈ 4.8 kWh (PCI).
  - 1 kg de leña ≈ 4.0 kWh (PCI) — varía según la humedad de la leña.
  - 1 kg de propano ≈ 13.8 kWh (PCI).
  - 1 kg de butano ≈ 13.7 kWh (PCI).

**Posibles contradicciones:**
- El consumo real es muy superior (>30%) al estimado por CE3X (posible envolvente peor de la declarada, o sistema de calefacción mal dimensionado).
- El consumo real es muy inferior (<30%) al estimado (posible envolvente mejor de la declarada, o el cliente usa menos la calefacción de lo normal — perfil de uso atípico).
- El certificado original declara un consumo teórico muy diferente al real.

**Nivel de confianza:**
- Con facturas de 12 meses: 95%.
- Con facturas parciales: 70%.
- Con certificado original: 60%.
- Con solo estimación del cliente: 30%.

**Casos donde es obligatoria la revisión manual:**
- Cuando no se dispone de facturas y el cliente no sabe su consumo.
- Cuando el consumo real y el estimado difieren >50% y no hay una explicación clara.

---

### H16 a H18 — Variables complementarias de calefacción

- **H16 — Calefacción colectiva/centralizada:** Si es colectiva, el rendimiento del sistema central debe estimarse (ver H3) y aplicarse a todo el edificio. Si hay contadores individuales, se aplica la parte proporcional.
- **H17 — Fracción de la vivienda calefactada:** Si no todas las estancias tienen calefacción (ej. baños sin radiador, habitaciones sin calefacción), debe considerarse como superficie parcialmente calefactada.
- **H18 — Calefacción secundaria:** Estufas de leña/pellets adicionales que se usan como apoyo.

**H17 — Fracción calefactada:**
- **Pregunta:** "¿Todas las habitaciones tienen calefacción? ¿O hay alguna que no?"
- **Regla de inferencia:** Si faltan emisores en alguna estancia, reducir la superficie calefactada proporcionalmente.

**H18 — Calefacción secundaria:**
- **Pregunta:** "¿Además de la calefacción principal, usas algún otro sistema? ¿Una estufa de leña, un radiador eléctrico portátil?"
- **Regla de inferencia:** Si el cliente usa calefacción secundaria de forma habitual, debe incluirse como sistema adicional en CE3X. El consumo de combustible de la calefacción secundaria debe estimarse.

---

## 11. Grupo I — Instalaciones: Refrigeración

### I1 — Sistema de refrigeración / Tipo

**Variable CE3X:** Tipo de sistema de refrigeración: bomba de calor (aire-aire, aire-agua), sistema centralizado (con conductos), equipo autónomo (split), enfriadora, sistema de refrigeración por absorción. Ausencia de refrigeración.

**Qué representa:** Similar a calefacción (H1) pero para refrigeración. El tipo de sistema determina su eficiencia y consumo energético.

**Cómo se obtiene:**
- Fotografías del equipo de refrigeración (splits, conductos de aire, unidad exterior).
- Certificado original.
- Pregunta al cliente.

**Evidencias válidas:**
- [I01] Split o unidad interior de refrigeración (visible en pared o techo).
- [I02] Unidad exterior (condensadora) visible desde el exterior o desde una terraza.
- [I03] Conductos de aire (en falsos techos, visibles en zonas comunes).
- Certificado original.

**Fotografías necesarias:**
- [I01] Unidad interior de refrigeración: split de pared, cassette de techo, conductos.
- [I02] Unidad exterior: compresor en fachada, azotea, o terraza.
- [I03] Termostato del sistema de refrigeración (si es diferente del de calefacción).
- [I04] Rejillas de impulsión de aire (en falso techo).

**Documentación útil:**
- Certificado original.
- Facturas de instalación.
- Manual del equipo.

**Preguntas al cliente:**
- "¿Tienes aire acondicionado? ¿Es de splits (los aparatos que se ven en la pared) o central por conductos?"
- "¿La bomba de calor que tienes para calefacción también refrigera?"
- "¿En qué estancias tienes aire acondicionado? ¿En todas o solo en algunas?"
- "¿Cuándo se instaló el aire acondicionado?"
- "¿Cuántas unidades interiores tienes? ¿Todas son iguales?"

**Reglas de inferencia:**
- **Bomba de calor aire-aire (split):** El sistema de calefacción (H1) también refrigera. Verificar si el split tiene modo frío/calor (la mayoría de splits modernos sí).
- **Bomba de calor aire-agua (aerotermia):** Puede refrigerar mediante fancoils o suelo radiante refrescante. Verificar si el sistema tiene esta funcionalidad.
- **Sistema centralizado:** Edificios grandes (terciario) suelen tener enfriadora central y fancoils. En residencial es menos común.
- **Refrigeración por absorción:** Muy poco común en residencial. Típica en grandes instalaciones.
- **Sin refrigeración:** Clientes de zonas climáticas A1, A2, o B1 pueden no tener refrigeración. En zonas más cálidas, la falta de refrigeración es inusual.
- **Número de splits por superficie:** Una vivienda de 80-100m² suele tener 2-3 splits (salón + 1-2 dormitorios). Viviendas pequeñas <60m²: 1 split (salón).

**Posibles contradicciones:**
- El cliente dice "no tengo aire" pero las fotos muestran splits en la pared.
- El cliente dice "sí, tengo aire" pero en las fotos de todas las estancias no se ve ningún split.
- El certificado original declara refrigeración cuando las fotos no muestran equipos.

**Nivel de confianza:**
- Con fotos de unidades interiores: 95%.
- Con fotos de unidad exterior: 90%.
- Con solo declaración: 50%.

**Casos donde es obligatoria la revisión manual:**
- Sistemas centralizados por conductos (dificultad para verificar la eficiencia y el estado).
- Sistemas de refrigeración por suelo radiante (difícil de verificar remotamente).

---

### I2 — Potencia del equipo de refrigeración

**Variable CE3X:** Potencia nominal del equipo (kW) o capacidad frigorífica (kW). Determina la capacidad de enfriamiento.

**Cómo se obtiene:**
- Placa de características del equipo.
- Modelo y marca (búsqueda online).
- Certificado original.

**Evidencias válidas:**
- [I02] Unidad exterior (en la placa de características suele venir la capacidad frigorífica).
- [I05] Placa de características de la unidad interior (si es accesible).
- Certificado original.

**Fotografías necesarias:**
- [I02] Unidad exterior (placa de características).
- [I05] Unidad interior (placa de características, suele estar en el lateral del split).

**Documentación útil:**
- Ficha técnica del fabricante.
- Manual de instalación.

**Preguntas al cliente:**
- "¿Podrías hacer una foto a la placa de la unidad exterior? Ahí suele venir la capacidad de refrigeración."
- "¿Sabes la marca y el modelo del aire acondicionado?"

**Reglas de inferencia:**
- Split residencial típico: 2.5-3.5 kW de capacidad frigorífica.
- Split para salón grande: 3.5-5.0 kW.
- Split para dormitorio: 2.0-3.0 kW.
- Sistema central (conductos): 10-20 kW para una vivienda completa.
- Relación potencia/área orientativa: 80-120 W/m² para refrigeración en zona climática de verano 3-4.

**Nivel de confianza:**
- Con placa legible: 100%.
- Con modelo identificado: 90%.
- Sin identificación: 40%.

**Casos donde es obligatoria la revisión manual:**
- Placa ilegible o no accesible.

---

### I3 — Eficiencia del equipo de refrigeración

**Variable CE3X:** EER (Energy Efficiency Ratio) o SEER (Seasonal Energy Efficiency Ratio) del equipo. Para sistemas de absorción, puede ser COP de refrigeración.

**Qué representa:** Similar al COP en calefacción pero para refrigeración. A mayor EER/SEER, mayor eficiencia.

**Cómo se obtiene:**
- Placa de características (EER o SEER).
- Etiqueta energética.
- Modelo y marca (búsqueda online).
- Certificado original.

**Evidencias válidas:**
- [I05] Placa de características.
- [I06] Etiqueta energética del equipo.
- Certificado original.

**Fotografías necesarias:**
- [I05] Placa de características.
- [I06] Etiqueta energética.

**Documentación útil:**
- Ficha técnica del fabricante.
- Bases de datos de equipos eficientes (MITECO).

**Reglas de inferencia:**

| Tipo de equipo | Año | EER | SEER |
|---------------|-----|-----|------|
| Split <2005 | <2005 | 2.0-2.5 | — |
| Split 2005-2010 | 2005-2010 | 2.5-3.0 | 3.0-3.5 |
| Split >2010 (eficiencia A) | >2010 | 3.0-3.5 | 3.5-5.0 |
| Split >2015 (eficiencia A++ o superior) | >2015 | — | 5.0-8.0 |
| Sistema central (enfriadora) | <2010 | 2.5-3.5 | — |
| Sistema central (enfriadora) | >2010 | 3.0-5.0 | — |

**Normativa de etiquetado energético (Directiva ErP 2010):**
- Clase A+++: SEER ≥ 8.5
- Clase A++: SEER ≥ 6.1
- Clase A+: SEER ≥ 5.6
- Clase A: SEER ≥ 5.1

**Nota:** CE3X utiliza el EER o SEER para calcular el consumo eléctrico de refrigeración. Si solo se dispone del EER, puede convertirse a SEER aproximadamente multiplicando por 1.1-1.2 (factor empírico).

**Posibles contradicciones:**
- El certificado original declara un EER/SEER superior al típico para el tipo de equipo y su antigüedad.
- La etiqueta energética visible muestra una clase inferior a la declarada en el certificado.

**Nivel de confianza:**
- Con placa/etiqueta: 100%.
- Con modelo: 90%.
- Con solo antigüedad: 60%.

**Casos donde es obligatoria la revisión manual:**
- Equipos sin placa ni etiqueta identificables.

---

### I4 — Refrigerante / Impacto ambiental

**Variable CE3X:** No es una variable directa, pero influye en las emisiones equivalentes de CO₂ en caso de fugas. Los refrigerantes comunes son R-410A, R-32, R-290 (propano), R-134a. El potencial de calentamiento global (GWP) varía entre 1 (R-290) y 2088 (R-410A).

**Cómo se obtiene:**
- Placa de características (indica el tipo de refrigerante).
- Modelo y marca.

**Evidencias válidas:**
- [I05] Placa de características (tipo de refrigerante).

**Fotografías necesarias:**
- [I05] Placa.

**Reglas de inferencia:**
- Equipos pre-2010: R-410A (GWP = 2088) o R-22 (GWP = 1810, prohibido desde 2015).
- Equipos 2010-2020: R-410A o R-32 (GWP = 675).
- Equipos post-2020: R-32 es el más común. R-290 (propano, GWP=1) en equipos de bajo impacto.
- El tipo de refrigerante tiene poco impacto en el cálculo de CE3X (solo para emisiones indirectas), pero es relevante para el informe técnico.

---

### I5 a I12 — Datos adicionales de refrigeración

- **I5 — Fracción de superficie refrigerada:** Igual que H17, pero para refrigeración.
- **I6 — Meses de uso:** Preguntar: "¿En qué meses usas el aire acondicionado?". Regla: zona climática de verano 3-4 → generalmente 3-4 meses (junio-septiembre).
- **I7 — Horas de uso diario:** Preguntar: "¿Cuántas horas al día enciendes el aire en verano?".
- **I8 — Temperatura de consigna de refrigeración:** Ver B8 (estándar CE3X: 25°C).
- **I9 — Control:** Termostato del aire acondicionado (puede ser el mismo que el de calefacción en bombas de calor reversibles).
- **I10 — Zonificación:** Si algunas estancias tienen aire y otras no.
- **I11 — Sistema de refrigeración centralizada:** Edificios terciarios con enfriadora central.
- **I12 — Consumo de refrigeración (facturas):** El consumo eléctrico de refrigeración puede estimarse comparando facturas de verano con facturas de primavera/otoño (de transición, sin climatización).

---

## 12. Grupo J — Instalaciones: ACS

### J1 — Sistema de ACS / Tipo

**Variable CE3X:** Sistema de producción de Agua Caliente Sanitaria:
- Caldera individual de gas (mixta o solo ACS).
- Caldera centralizada (ACS colectiva).
- Termo eléctrico (acumulador).
- Calentador de gas (instantáneo, sin acumulación).
- Bomba de calor (aerotermia para ACS).
- Solar térmica.
- Biomasa.
- Eléctrico instantáneo (poco común).
- ACS desde la caldera de calefacción (mixta).

**Qué representa:** El sistema de ACS es el segundo consumidor de energía en una vivienda típica (después de la calefacción). Su eficiencia y el combustible utilizado determinan el consumo.

**Cómo se obtiene:**
- Fotografías del equipo de ACS (calentador, termo, caldera mixta).
- Certificado original.
- Pregunta al cliente.

**Evidencias válidas:**
- [J01] Equipo de ACS: calentador de gas, termo eléctrico, caldera mixta.
- [J02] Depósito de ACS acumulador (si existe).
- [J03] Placa de características del equipo.
- Certificado original.

**Fotografías necesarias:**
- [J01] Equipo de ACS visible (calentador en la cocina o baño, termo en el baño o trastero).
- [J02] Depósito acumulador (si existe, con su capacidad visible).
- [J03] Placa de características del equipo (rendimiento, capacidad, consumo).
- [J04] Instalación solar térmica (si existe): placas solares en la cubierta visibles desde la calle o desde satélite.

**Documentación útil:**
- Certificado original.
- Factura de suministro.
- Manual del equipo.

**Preguntas al cliente:**
- "¿Cómo obtienes el agua caliente? ¿Tienes un calentador de gas, un termo eléctrico, o lo hace la caldera de calefacción?"
- "¿El agua caliente es de la caldera de calefacción (instantánea) o tienes un depósito separado?"
- "¿Tienes placas solares para el agua caliente?"
- "¿Es un sistema individual (solo para tu vivienda) o centralizado (para todo el edificio)?"
- "¿Cuándo se instaló el sistema actual de ACS?"

**Reglas de inferencia:**
- **Caldera mixta:** El equipo que se ve para calefacción (H1) también produce ACS. Si hay caldera de gas, lo más probable es que también genere ACS.
- **Calentador de gas:** Equipo más pequeño que la caldera, generalmente en la cocina o en el baño. Sin acumulación. Se enciende al abrir el grifo.
- **Termo eléctrico:** Depósito cilíndrico (vertical u horizontal) de 50-150 litros, con una resistencia eléctrica. Es el sistema más común cuando no hay gas natural.
- **Bomba de calor para ACS (aerotermia):** Depósito similar al termo eléctrico pero con una bomba de calor integrada en la parte superior (visible como un módulo cilíndrico con ventilador).
- **Solar térmica:** Paneles solares en la cubierta (distintos de las placas fotovoltaicas: los paneles solares térmicos son más pequeños y tienen un aspecto diferente, generalmente con tubos de vacío o superficies negras con cubierta de vidrio). El depósito de inercia suele estar en un cuarto de instalaciones.
- **ACS centralizada:** No hay equipo visible en la vivienda. El ACS viene de una instalación central del edificio. Preguntar por el sistema central.

**Posibles contradicciones:**
- El cliente dice que la caldera de calefacción no produce ACS (es posible si la caldera es solo de calefacción y tiene un termo eléctrico para ACS).
- El cliente dice "tengo placas solares" pero son fotovoltaicas (generan electricidad), no térmicas (para agua caliente). Distinguir por el aspecto: las térmicas suelen tener tubos de vacío visibles y son de menor tamaño.
- El certificado original declara un tipo de ACS diferente al visible.

**Nivel de confianza:**
- Con foto del equipo: 95%.
- Con certificado original: 75%.
- Con solo declaración: 60%.

**Casos donde es obligatoria la revisión manual:**
- ACS centralizada con sistema de producción no visible desde la vivienda.
- Sistemas de ACS con bomba de calor (aerotermia) — difícil de distinguir de un termo eléctrico sin ver la placa.
- Instalaciones solares térmicas sin acceso visual (cubierta no visible).

---

### J2 — Potencia/capacidad del sistema de ACS

**Variable CE3X:** Potencia del equipo de ACS (kW) o capacidad del depósito (litros).

**Cómo se obtiene:**
- Placa de características del equipo.
- Modelo y marca.
- Certificado original.

**Evidencias válidas:**
- [J03] Placa de características.
- [J02] Depósito (capacidad visible en litros).

**Fotografías necesarias:**
- [J03] Placa de características.
- [J02] Depósito (capacidad).

**Reglas de inferencia:** |
- Termo eléctrico típico: 50-150 litros, potencia 1.2-2.0 kW.
- Calentador de gas instantáneo: 20-28 kW (caudal 10-16 litros/minuto).
- Caldera mixta: la misma potencia que la calefacción (24-28 kW típica).
- Bomba de calor para ACS: 180-300 litros de depósito, potencia 0.8-1.5 kW eléctricos.
- Solar térmica: superficie de captación 2-5m², depósito 150-300 litros.

---

### J3 — Rendimiento del sistema de ACS

**Variable CE3X:** Rendimiento estacional del sistema de ACS (%) o COP.

**Cómo se obtiene:**
- Placa de características.
- Modelo y marca.
- Etiqueta energética.
- Certificado original.

**Evidencias válidas:**
- [J03] Placa de características.
- [J06] Etiqueta energética (para termos eléctricos y bombas de calor).
- Certificado original.

**Fotografías necesarias:**
- [J03] Placa.
- [J06] Etiqueta energética.

**Reglas de inferencia:**

| Sistema de ACS | Rendimiento típico (η) |
|---------------|----------------------|
| Termo eléctrico (clásico) | 85-95% |
| Termo eléctrico (bomba de calor integrada) | COP 2.5-4.0 |
| Calentador de gas instantáneo (estándar) | 75-85% |
| Calentador de gas instantáneo (condensación) | 90-98% |
| Caldera mixta (estándar) | 75-85% |
| Caldera mixta (condensación) | 90-98% |
| ACS desde caldera centralizada | 70-85% (incluye pérdidas en distribución) |
| Bomba de calor (aerotermia) ACS | COP 2.5-4.5 |
| Solar térmica (con apoyo) | 40-70% de cobertura solar (el resto con apoyo eléctrico o de gas) |

---

### J4 — Consumo de ACS (estimación)

**Variable CE3X:** Demanda de ACS (litros/día o kWh/año). CE3X la calcula automáticamente según el número de ocupantes y el perfil de uso. No es una variable que se obtenga del cliente, sino que se calcula.

**Reglas de inferencia:**
- CE3X utiliza los valores del CTE DB-HE:
  - Vivienda: 28 litros/día por persona a 60°C.
  - Número de ocupantes estándar: 4 personas (por defecto en CE3X).
  - Consumo anual de referencia: ≈ 2.000-3.000 kWh/año para una vivienda media de 4 personas.
- Si el cliente dice que hay más o menos ocupantes, ajustar.
- **Pregunta:** "¿Cuántas personas viven en la vivienda de forma habitual?"

---

### J5 a J10 — Variables complementarias de ACS

- **J5 — Depósito de acumulación:** Capacidad y tipo (vitrificado, inoxidable, esmaltado). Las pérdidas del depósito se consideran en el rendimiento.
- **J6 — Aislamiento del depósito:** Si el depósito tiene aislamiento (lo tienen todos los termos modernos) y de qué espesor.
- **J7 — Sistema de apoyo solar:** Si hay solar térmica, qué sistema de apoyo tiene (resistencia eléctrica, caldera de gas). Preguntar: "¿Tienes placas solares para el agua caliente? ¿Y qué sistema usas cuando no hay sol?"
- **J8 — Distribución de ACS:** Tuberías de ACS (longitud, aislamiento). Relevante en viviendas grandes y en sistemas centralizados.
- **J9 — Recirculación de ACS:** Si hay un circuito de retorno (agua caliente disponible al instante en todos los grifos). Aumenta las pérdidas en distribución.
- **J10 — ACS centralizada:** Si es colectiva, la eficiencia del sistema central y la fracción de pérdidas en distribución deben estimarse.

**J7 — Sistema de apoyo solar:**
- **Regla de inferencia:** Los sistemas solares térmicos en España suelen tener una cobertura solar del 50-70% anual. El resto se cubre con resistencia eléctrica (la mayoría) o con la caldera de gas. Si la cobertura solar es >70%, el sistema está sobredimensionado.
- **Contradicciones:** El cliente dice "placas solares" pero el consumo de gas o electricidad para ACS es muy alto (posible sistema solar no operativo o mal dimensionado).

---

## 13. Grupo K — Instalaciones: Ventilación

### K1 — Tipo de ventilación

**Variable CE3X:** Sistema de ventilación: natural (ventanas, infiltración), mecánica (extractores), mecánica controlada con recuperación de calor (VMC).

**Qué representa:** La ventilación renueva el aire interior para mantener la calidad del aire, pero implica pérdidas térmicas. El tipo de ventilación determina la tasa de renovación de aire (n, en ren/h) y las pérdidas asociadas.

**Cómo se obtiene:**
- Certificado original.
- Fotografías de extractores, rejillas de ventilación, o unidades de VMC.
- Pregunta al cliente.

**Evidencias válidas:**
- [K01] Ventilación natural: rejillas de ventilación en ventanas o en fachada.
- [K02] Extractores mecánicos: campana extractora en cocina, extractor en baño.
- [K03] VMC: unidad de ventilación mecánica controlada (visible en falso techo o en un armario).
- [K04] Rejillas de admisión de aire en las habitaciones.
- Certificado original.

**Fotografías necesarias:**
- [K01] Rejillas de ventilación en las ventanas (si existen).
- [K02] Extractores en cocina y baños.
- [K03] Unidad de VMC (si existe).
- [K04] Rejillas de admisión en fachada o en paredes.
- [K05] Conductos de ventilación (si son visibles).

**Documentación útil:**
- Certificado original.
- CTE DB-HS (Salubridad).
- Manual del sistema de ventilación.

**Preguntas al cliente:**
- "¿Tienes algún sistema de ventilación mecánica? ¿Extractores en el baño y la cocina?"
- "¿Las ventanas tienen rejillas de ventilación?" (Esas rejillas que están en la parte superior del marco).
- "¿Tienes un sistema de ventilación con recuperación de calor?" (Aparato en el falso techo o en un armario, con conductos).
- "¿Sueles abrir las ventanas para ventilar? ¿Cuánto tiempo al día?"

**Reglas de inferencia:**
- **Ventilación natural (solo ventanas):** La tasa de renovación depende de la permeabilidad de la envolvente y de si el cliente abre las ventanas. En CE3X, se asume un valor por defecto según la normativa (0.63 ren/h para residencial con ventanas permeables, o el valor calculado según DB-HS).
- **Ventilación natural con rejillas:** Edificios construidos según CTE (>2006) deben tener rejillas de ventilación en las ventanas o en la fachada. Esto garantiza una ventilación mínima.
- **Ventilación mecánica simple:** Extractores en baño y cocina que se encienden manualmente. Es el sistema más común en edificios existentes.
- **VMC (Ventilación Mecánica Controlada):** Sistema que asegura una tasa de ventilación constante (0.3-0.6 ren/h típico) con recuperación de calor (eficiencia de recuperación 60-85%). Muy eficiente. Obligatorio en edificios de consumo casi nulo (nZEB).
- **VMC con recuperación de calor:** Reduce las pérdidas por ventilación en un 60-85% respecto a la ventilación natural.

**Nivel de confianza:**
- Con fotos de rejillas/extractores: 80%.
- Con certificado original: 70%.
- Con solo declaración: 50%.

**Casos donde es obligatoria la revisión manual:**
- VMC con recuperación de calor (necesario conocer el caudal y la eficiencia del recuperador).
- Edificios con ventilación híbrida (natural + mecánica controlada automáticamente).

---

### K2 a K6 — Variables complementarias de ventilación

- **K2 — Tasa de renovación de aire (n, ren/h):** CE3X la calcula según el tipo de ventilación y la permeabilidad de la envolvente. Valores típicos:
  - Ventilación natural con ventanas cerradas: 0.2-0.5 ren/h.
  - Ventilación natural con rejillas (CTE DB-HS): 0.63 ren/h.
  - VMC simple caudal constante: 0.5-0.8 ren/h.
  - VMC con recuperación de calor: 0.3-0.6 ren/h (con eficiencia de recuperación).
- **K3 — Permeabilidad de la envolvente (n50):** Tasa de renovación a 50 Pa. Se determina mediante ensayo Blower Door (no disponible remotamente). En CE3X se estima según el tipo de ventanas y el estado de las juntas.
- **K4 — Eficiencia del recuperador de calor (%):** Si existe VMC, la eficiencia del intercambiador. Valores típicos: 60-85%.
- **K5 — Caudal de ventilación (m³/h):** Caudal de aire exterior. Se calcula según DB-HS (5-8 l/s por persona en residencial, o según el número de dormitorios).
- **K6 — Ventilación natural cruzada:** Si la vivienda tiene ventilación cruzada (ventanas en fachadas opuestas), la ventilación natural es más efectiva.

---

## 14. Grupo L — Instalaciones: Iluminación (terciario)

**Nota:** Este grupo aplica principalmente a edificios de uso terciario (oficinas, comercial, hotel, etc.). En uso residencial (viviendas), la iluminación no se considera en CE3X salvo casos específicos (el consumo de iluminación residencial es fijo por defecto).

### L1 — Tipo de iluminación

**Variable CE3X:** Tipo de lámparas y luminarias instaladas en zonas comunes y en el propio edificio (terciario): LED, fluorescente, halogenuro metálico, halogenuro, incandescente, bajo consumo.

**Para edificios residenciales:** Solo se considera la iluminación de las zonas comunes (portal, escaleras, garaje) si el edificio las tiene y son de responsabilidad del propietario.

**Cómo se obtiene:**
- Fotografías de las luminarias en zonas comunes.
- Certificado original.
- Pregunta al cliente.

**Evidencias válidas:**
- [L01] Luminarias en zonas comunes (portal, pasillos, escaleras).
- [L02] Tipo de lámpara visible (LED, fluorescente, bombilla).
- Certificado original.

**Fotografías necesarias:**
- [L01] Luminarias de zonas comunes (portal, escaleras, garaje).
- [L02] Detalle de la lámpara (tipo, casquillo, forma).

**Documentación útil:**
- Certificado original.
- Factura de electricidad de la comunidad.

**Preguntas al cliente:**
- "¿Sabes qué tipo de bombillas hay en las zonas comunes del edificio?"
- "¿La comunidad ha hecho algún cambio de iluminación recientemente? ¿Han puesto LED?"

**Reglas de inferencia:**
- Edificios residenciales construidos después de 2006 (CTE): deben tener iluminación eficiente (LED o fluorescente) en zonas comunes.
- Edificios antiguos: pueden tener fluorescentes o incluso incandescentes.
- Muchas comunidades han hecho la transición a LED en los últimos años.

**Nivel de confianza:**
- Con fotos: 90%.
- Sin fotos: 40%.

---

## 15. Grupo M — Energías renovables

### M1 — Solar térmica para ACS

**Variable CE3X:** Superficie de captación solar (m²), orientación, inclinación, rendimiento del captador, tipo de captador (plano, tubos de vacío). Contribución solar a la demanda de ACS (%).

**Qué representa:** La energía solar térmica reduce el consumo de combustible para ACS. En edificios construidos según CTE (>2006), la contribución solar mínima es obligatoria (entre 30% y 70% según zona climática).

**Cómo se obtiene:**
- Fotografías de los captadores solares en la cubierta (desde la calle, desde un vecino, desde satélite).
- Certificado original.
- Factura de instalación.
- Pregunta al cliente.

**Evidencias válidas:**
- [M01] Captadores solares en cubierta visibles desde la calle (si el ángulo lo permite).
- [M02] Google Maps (vista satélite con los captadores visibles).
- [M03] Depósito de acumulación solar (en el cuarto de instalaciones, si es accesible).
- Certificado original.
- Factura de instalación.

**Fotografías necesarias:**
- [M01] Cubierta del edificio (captadores solares visibles desde la calle o terraza).
- [M02] Captura de Google Maps (satélite) con los captadores señalados.
- [M03] Depósito de acumulación solar (si es accesible, con la capacidad visible).
- [M04] Placa de características del captador (si es accesible).

**Documentación útil:**
- Certificado original.
- Proyecto de instalación solar (si existe).
- CTE DB-HE (contribución solar mínima obligatoria).
- Factura de instalación.

**Preguntas al cliente:**
- "¿El edificio tiene placas solares para el agua caliente?"
- "¿Se ven desde la calle o desde alguna ventana superior?"
- "¿Sabes si están en funcionamiento?"
- "¿Cuándo se instalaron?"

**Reglas de inferencia:**
- **Obligatoriedad:** Edificios de nueva construcción post-2006 deben tener solar térmica (salvo excepciones por normativa local o por uso de otras renovables).
- **Tipo de captador:**
  - Captador plano: una caja rectangular con cubierta de vidrio, montada sobre la cubierta o integrada en ella.
  - Tubos de vacío: varios tubos de vidrio paralelos, montados sobre un colector. Mayor rendimiento que los planos.
  - Distinguir de fotovoltaica (FV): los paneles FV son más grandes, de color azulado oscuro o negro, con celdas cuadradas visibles. Los térmicos tienen un aspecto más "industrial" y suelen ser más pequeños.
- **Superficie típica:** Para una vivienda unifamiliar: 2-4 m² de captación. Para un edificio plurifamiliar: 20-60 m².
- **Estado:** Si el cliente no sabe si funcionan, se puede preguntar si nota el agua caliente en verano con el sol (si no hay apoyo, el agua debería estar caliente en días soleados).

**Posibles contradicciones:**
- El certificado original declara solar térmica pero los captadores no se ven en las fotos de la cubierta ni en satélite.
- Los captadores solares están en mal estado (cristales rotos, conexiones oxidadas, tierra acumulada) y probablemente no funcionan.
- El cliente dice "tengo placas solares" pero son fotovoltaicas (no térmicas).

**Nivel de confianza:**
- Con fotos/satélite de los captadores: 95%.
- Con certificado original: 75%.
- Con solo declaración: 50%.

**Casos donde es obligatoria la revisión manual:**
- Cuando los captadores no son visibles desde ningún punto (cubierta plana sin acceso visual).
- Cuando se sospecha que la instalación solar no está operativa.

---

### M2 — Fotovoltaica

**Variable CE3X:** Potencia instalada de generación fotovoltaica (kWp). Energía eléctrica generada (kWh/año). Autoconsumo o vertido a red.

**Qué representa:** La generación fotovoltaica reduce el consumo de electricidad de la red y, por tanto, las emisiones de CO₂ y el consumo de energía primaria no renovable.

**Cómo se obtiene:**
- Fotografías de los paneles fotovoltaicos.
- Google Maps (vista satélite).
- Factura de instalación.
- Certificado original.
- Pregunta al cliente.

**Evidencias válidas:**
- [M05] Paneles fotovoltaicos en cubierta visibles desde la calle.
- [M06] Inversor fotovoltaico (visible en el cuarto de instalaciones o en la fachada).
- [M07] Contador de generación o de balance neto.
- Certificado original.
- Factura de instalación.

**Fotografías necesarias:**
- [M05] Paneles FV en cubierta (desde la calle, terraza, o ventana superior).
- [M06] Inversor (si es visible).
- [M07] Contador de generación o de autoconsumo (si existe).

**Documentación útil:**
- Certificado original.
- Factura de instalación.
- Proyecto de instalación fotovoltaica.
- Historial de generación (si el inversor tiene monitorización online).

**Preguntas al cliente:**
- "¿Tienes placas solares para generar electricidad?"
- "¿Sabes cuánta potencia tienen instalada?"
- "¿Es para autoconsumo (usas la electricidad generada) o viertes a la red?"

**Reglas de inferencia:**
- **Paneles FV:** Paneles rectangulares grandes (>1.5m²), de color azul oscuro o negro, con celdas solares cuadradas visibles. Se distinguen de los térmicos (más pequeños, tubos de vacío o captadores planos).
- **Potencia típica:**
  - Vivienda unifamiliar con autoconsumo parcial: 3-5 kWp (8-15 paneles).
  - Vivienda con autoconsumo total: 5-10 kWp.
  - Edificio plurifamiliar: 10-100 kWp (dependiendo de la superficie de cubierta).
- **Orientación e inclinación:** Lo ideal es orientación sur e inclinación 30-35°. Orientaciones este u oeste reducen la generación aproximadamente un 15-20%. La inclinación diferente (plana, 10°, 45°) también reduce la generación.
- **Generación estimada:** En España, 1 kWp genera aproximadamente 1.200-1.500 kWh/año (varía según ubicación y orientación).

**Posibles contradicciones:**
- Los paneles visibles desde satélite pero el cliente dice "no tengo placas" (es posible que sean de la comunidad y no del cliente individual).
- El certificado original no considera la fotovoltaica (posible: la instalación es posterior al certificado).

**Nivel de confianza:**
- Con fotos + satélite: 95%.
- Con certificado original: 75%.
- Con solo declaración: 50%.

**Casos donde es obligatoria la revisión manual:**
- Instalaciones FV en fachada o en suelo (no visibles desde satélite ni desde la calle).
- Sistemas de almacenamiento (baterías) que afectan al perfil de autoconsumo.

---

### M3 — Otras renovables

**Variable CE3X:** Otras fuentes renovables: geotermia (bomba de calor geotérmica), biomasa, eólica, aerotermia (considerada renovable si cumple los requisitos del CTE).

**Cómo se obtiene:**
- Identificación del sistema de climatización (H1, I1) si es bomba de calor geotérmica o aerotermia.
- Fotografías del equipo (captadores geotérmicos en el terreno, bomba de calor geotérmica, caldera de biomasa).
- Certificado original.
- Pregunta al cliente.

**Evidencias válidas:**
- [M08] Caldera de biomasa (pellets, leña).
- [M09] Bomba de calor geotérmica (unidad interior con placas de intercambio geotérmico).
- [M10] Captadores geotérmicos (en jardín, si son visibles).
- Certificado original.

**Fotografías necesarias:**
- [M08] Caldera de biomasa (vista frontal con la tolva de pellets o la cámara de combustión).
- [M09] Bomba de calor geotérmica (unidad interior).
- [M10] Captadores geotérmicos (si son visibles en el exterior).

**Documentación útil:**
- Certificado original.
- Factura de instalación.
- Ficha técnica del equipo.

**Preguntas al cliente:**
- "¿Tienes algún sistema de energía renovable adicional? ¿Geotermia, biomasa?"
- "¿La caldera de pellets, sabes cuánto consumes al año?"

**Reglas de inferencia:**
- **Aerotermia:** Se considera renovable si el SCOP (COP estacional de calefacción) > 2.5. La mayoría de las bombas de calor modernas cumplen.
- **Geotermia:** El sistema de captación puede ser horizontal (tuberías enterradas en el jardín a poca profundidad) o vertical (sondeos profundos). La unidad interior es similar a una bomba de calor convencional.
- **Biomasa:** Las calderas de pellets son las más comunes. Consumen pellets almacenados en una tolva. La combustión se controla automáticamente. Las estufas de leña tienen menor rendimiento but no se consideran "sistema principal" a menos que sean el único sistema de calefacción.

**Nivel de confianza:**
- Con fotos del equipo: 95%.
- Con certificado original: 75%.

**Casos donde es obligatoria la revisión manual:**
- Geotermia de captación vertical (los sondeos no son visibles).
- Biomasa con calderas de leña manuales (el rendimiento depende del usuario).

---

### M4 a M10 — Variables complementarias de renovables

- **M4 — Contribución renovable a calefacción (%):** Fracción de la demanda de calefacción cubierta por energías renovables.
- **M5 — Contribución renovable a refrigeración (%):** Fracción de la demanda de refrigeración cubierta por energías renovables (poco común, solo en sistemas de enfriamiento gratuito).
- **M6 — Certificados de energía renovable:** Si el edificio o la comunidad tiene certificados verdes.
- **M7 — Almacenamiento energético (baterías):** Capacidad de las baterías (kWh) y su gestión.
- **M8 — Venta de excedentes:** Si la instalación fotovoltaica vierte excedentes a la red.
- **M9 — Comunidad energética local:** Si el edificio participa en una comunidad energética (balance neto entre varios edificios).
- **M10 — Histórico de generación renovable:** Datos de producción de los últimos 12 meses.

---

## 16. Grupo N — Demanda y consumo

### N1 — Demanda de calefacción (kWh/m²·año)

**Variable CE3X:** Resultado del cálculo de la demanda energética de calefacción por unidad de superficie (kWh/m²·año). CE3X la calcula automáticamente a partir de las variables de la envolvente y el clima.

**Qué representa:** Es el indicador principal de la calidad de la envolvente térmica. Una demanda baja (<50 kWh/m²·año) indica buena envolvente. Una demanda alta (>150 kWh/m²·año) indica mala envolvente.

**Cómo se obtiene:**
- Cálculo de CE3X (no se pregunta al cliente).
- Validación cruzada con las variables de envolvente (C, D, E, F, G).

**Reglas de validación:**
- Demanda de calefacción muy baja en un edificio sin aislamiento → probable error en los datos de entrada.
- Demanda de calefacción muy alta en un edificio moderno con SATE → probable error en los datos de entrada.

---

### N2 — Demanda de refrigeración (kWh/m²·año)

**Variable CE3X:** Demanda energética de refrigeración. Similar a N1 pero para refrigeración.

---

### N3 — Consumo de energía primaria no renovable (kWh/m²·año)

**Variable CE3X:** Consumo de energía primaria no renovable (kWh/m²·año). Se obtiene multiplicando el consumo final de cada combustible por su factor de paso a energía primaria no renovable.

**Qué representa:** Es la variable principal para la obtención de la letra de calificación energética (junto con las emisiones de CO₂). Una letra A corresponde a <20 kWh/m²·año para viviendas. Una letra G corresponde a >280 kWh/m²·año.

**Factores de paso típicos (CTE DB-HE 2019):**
- Gas natural: 1.045 (energía primaria no renovable/kWh consumido).
- Gasóleo: 1.082.
- Propano: 1.045.
- Biomasa: 0.034 (considerada casi renovable).
- Electricidad: 1.954.
- Solar térmica/fotovoltaica: 0.0 (energía renovable).

**Factores de emisiones de CO₂ típicos (CTE DB-HE 2019):**
- Gas natural: 0.252 kg CO₂/kWh.
- Gasóleo: 0.311 kg CO₂/kWh.
- Propano: 0.252 kg CO₂/kWh.
- Biomasa: 0.018 kg CO₂/kWh.
- Electricidad: 0.330 kg CO₂/kWh.
- Solar térmica/fotovoltaica: 0.0 kg CO₂/kWh.

---

### N4 a N8 — Variables complementarias de demanda y consumo

- **N4 — Letra de calificación energética (calefacción):** Letra obtenida de la demanda de calefacción.
- **N5 — Letra de calificación energética (refrigeración):** Letra obtenida de la demanda de refrigeración.
- **N6 — Letra de calificación energética (global):** Letra combinada de consumo de energía primaria no renovable.
- **N7 — Emisiones de CO₂ (kg CO₂/m²·año):** Emisiones totales anuales de CO₂ por unidad de superficie.
- **N8 — Letra de emisiones de CO₂:** Letra obtenida de las emisiones.

**N4-N6 — Letras energéticas:**
- Las letras se asignan según los límites del Real Decreto de certificación energética (RD 390/2021 o normativa autonómica aplicable).
- La letra global (N6) es la que aparece en el certificado energético.
- Una letra A o B indica alta eficiencia. Una letra D o E es la media típica del parque edificatorio español. Las letras F y G indican baja eficiencia.

---

## 17. Grupo O — Certificado original auditado

### O1 — Datos del certificado original

**Variable CE3X:** Datos del certificado energético original que se está auditando: número de registro, fecha de emisión, técnico certificador, organismo competente, normativa aplicada.

**Qué representa:** El certificado original es el punto de partida de la auditoría. Es crítico identificar si el certificado es válido, si está registrado, y si fue emitido por un técnico competente.

**Cómo se obtiene:**
- Copia en PDF del certificado original.
- Registro oficial (consulta en el organismo competente de la CCAA).

**Evidencias válidas:**
- [O01] PDF del certificado original (completo, no solo la primera página).
- [O02] Captura de pantalla del registro oficial del certificado.
- [O03] Número de registro del certificado.

**Fotografías necesarias:**
- No aplica (documento PDF).

**Documentación útil:**
- Registro oficial de certificados de la CCAA.
- Web del organismo competente.

**Preguntas al cliente:**
- "¿Tienes el certificado energético en PDF? ¿Puedes compartirlo completo?"
- "¿Sabes el número de registro del certificado? Está en la primera página."

**Reglas de validación:**
- Verificar que el certificado está registrado en el organismo competente (consulta online).
- Verificar que el técnico certificador está habilitado (colegiado).
- Verificar que la fecha de emisión no ha caducado (los certificados tienen una validez de 10 años).

**Nivel de confianza:**
- Con PDF completo: 100%.

---

### O2 — Letra declarada en el certificado original

**Variable CE3X:** Letra de calificación energética que aparece en el certificado original.

**Qué representa:** Es el valor que se va a auditar. La discrepancia entre la letra declarada y la letra estimada por el Arquitecto Técnico es el núcleo del servicio de Segunda Opinión.

**Cómo se obtiene:**
- Del PDF del certificado original (primera página, etiqueta energética).

**Evidencias válidas:**
- [O01] PDF del certificado original (etiqueta energética visible).

---

### O3 — Consumo declarado en el certificado original

**Variable CE3X:** Consumo de energía primaria no renovable (kWh/m²·año) y emisiones de CO₂ (kg CO₂/m²·año) según el certificado original.

---

### O4 a O10 — Variables de auditoría del certificado original

- **O4 — Software utilizado para generar el certificado:** CE3X, HULC, CYPETHERM, etc.
- **O5 — Datos de entrada declarados en el certificado:** Superficie, año de construcción, etc. (comparar con los obtenidos en la inspección).
- **O6 — Discrepancias detectadas:** Lista de variables donde el valor del certificado original difiere del valor estimado.
- **O7 — Importancia de las discrepancias:** Si las discrepancias detectadas cambian la letra energética.
- **O8 — Metodología de cálculo utilizada:** Método simplificado o método general (CE3X puede usar ambos).
- **O9 — Cumplimiento normativo:** Si el certificado cumple con la normativa aplicable (CTE, RD de certificación, normativa autonómica).
- **O10 — Valoración general:** Conclusión del Arquitecto Técnico sobre la validez del certificado original.

---

## 18. Matriz de inferencia y contradicciones

### 18.1 Patrones de contradicción frecuentes

Esta sección recoge las contradicciones más comunes entre variables, que indican que algún dato puede ser incorrecto o que el certificado original puede estar inflado.

| # | Contradicción | Variables implicadas | Posible causa |
|---|--------------|---------------------|---------------|
| 1 | Año de construcción <1980 pero envolvente con buen aislamiento | A3 vs. C1, D2, E2 | Rehabilitación no declarada |
| 2 | Ventanas de aluminio sin RPT en edificio post-2010 | F1 vs. A3 | Sustitución de ventanas de baja calidad |
| 3 | Año de construcción <2006 pero se declara solar térmica | A3 vs. M1 | Instalación posterior no reflejada en el año |
| 4 | Demanda de calefacción baja (buena envolvente) pero factura de gas alta | N1 vs. H15 | Datos de envolvente incorrectos, o clima más severo |
| 5 | Demanda de calefacción alta (mala envolvente) pero factura de gas baja | N1 vs. H15 | Cliente no usa la calefacción (pobreza energética) |
| 6 | Edificio con SATE pero consumo muy alto | C2 vs. H15 | SATE mal instalado, o puentes térmicos no resueltos |
| 7 | Ventanas con triple acristalamiento en edificio pre-1980 | F2 vs. A3 | Sustitución de ventanas reciente |
| 8 | Cliente dice "no tiene calefacción" pero hay radiadores en las fotos | H1 vs. [fotos] | Desconocimiento del sistema |
| 9 | Certificado declara letra A pero el cliente tiene facturas altas | O2 vs. H15 | Posible certificado inflado |
| 10 | Superficie del certificado muy diferente a Catastro | A4 vs. A2 | Error en la superficie declarada (inflado típico) |

### 18.2 Reglas de inferencia combinadas

| Situación | Inferencia | Confianza |
|-----------|-----------|-----------|
| Edificio 1960-1980, fachada ladrillo visto, sin SATE visible | Sin aislamiento en fachada (U ≈ 1.5-1.8 W/m²·K) | Alta (85%) |
| Edificio 1990-2000, fachada enfoscada, sin SATE | Probable aislamiento en cámara de 3-5cm (U ≈ 0.7-0.9) | Media (65%) |
| Edificio >2010, fachada con SATE visible | Aislamiento continuo de 6-10cm (U ≈ 0.35-0.50) | Alta (85%) |
| Ventanas de aluminio sin RPT + edificio <2000 | U_marco ≈ 5.7, vidrio simple o doble básico | Alta (90%) |
| Ventanas de PVC blanco + edificio >2010 | U_marco ≈ 1.5-2.0, vidrio doble bajo emisivo probable | Alta (85%) |
| Edificio sin caldera visible + radiadores de agua | Caldera oculta (trastero, armario) — pedir más fotos | Media (50%) |
| Cliente dice "no tengo aire" pero hay splits en el salón | Tiene aire acondicionado pero no lo usa o lo ha olvidado | Alta (90%) |
| Edificio >2006 sin rejillas de ventilación visibles | Rejillas pueden estar en la parte superior del marco de ventana (difícil de ver) | Media (60%) |
| Consumo de gas muy bajo en invierno (CIERTO: factura) pero caldera de gas | Cliente no calefacta, o calefacción auxiliar no registrada | Alta la contradicción |
| Placas solares visibles en satélite pero cliente no sabe | Pueden ser de la comunidad, no del cliente individual | Media |

### 18.3 Niveles de confianza asignables

| Nivel | Rango | Significado |
|-------|-------|-------------|
| Muy alto | 90-100% | Dato verificado con documento oficial o foto directa |
| Alto | 75-90% | Dato inferido con múltiples evidencias convergentes |
| Medio | 50-75% | Dato inferido con una evidencia o declaración del cliente |
| Bajo | 25-50% | Dato basado solo en inferencia débil o contradicciones sin resolver |
| Muy bajo | <25% | Dato puramente especulativo. Se recomienda revisión manual |

**Regla:** Si una variable tiene nivel de confianza <50%, debe documentarse como "pendiente de verificación" y considerarse la necesidad de revisión manual.

---

## 19. Glosario de términos CE3X

| Término | Definición |
|---------|-----------|
| **ACS** | Agua Caliente Sanitaria. Agua caliente para uso doméstico (ducha, lavabo, cocina). |
| **Bomba de calor** | Equipo que transfiere calor del exterior al interior (o viceversa) usando un ciclo termodinámico. Puede ser aire-aire, aire-agua, o geotérmica. |
| **Cámara de aire** | Espacio de aire dentro de un cerramiento (fachada, cubierta) que mejora el aislamiento térmico. Puede ser ventilada o sin ventilar. |
| **CE3X** | Software oficial de certificación energética de edificios en España. Desarrollado por el Ministerio de Industria, Turismo y Comercio. |
| **COP** | Coefficient of Performance (Coeficiente de Rendimiento). Relación entre la energía térmica producida y la energía eléctrica consumida en una bomba de calor. |
| **CTE** | Código Técnico de la Edificación. Normativa española que regula los requisitos básicos de calidad de los edificios. |
| **DAE-DB-HE** | Documento de Apoyo al Documento Básico de Ahorro de Energía. Catálogo de elementos constructivos y soluciones técnicas. |
| **Demanda energética** | Cantidad de energía necesaria para mantener el edificio en condiciones de confort (calefacción y refrigeración). |
| **EER** | Energy Efficiency Ratio (Ratio de Eficiencia Energética). Similar al COP pero para refrigeración. |
| **Energía primaria** | Energía contenida en los combustibles tal como se encuentran en la naturaleza. No incluye las pérdidas de transformación y transporte. |
| **Energía primaria no renovable** | Parte de la energía primaria que proviene de fuentes no renovables (combustibles fósiles). |
| **Energía final** | Energía que llega al consumidor (electricidad en el contador, gas en el contador). |
| **Envolvente térmica** | Conjunto de cerramientos que separan el interior del edificio del exterior (fachadas, cubierta, suelo, huecos). |
| **Factor solar (g)** | Fracción de la radiación solar incidente que se transmite al interior a través del acristalamiento. |
| **Permeabilidad al aire** | Caudal de aire que pasa a través de una ventana o de la envolvente por unidad de superficie y presión. |
| **Puente térmico** | Zona de la envolvente donde el aislamiento no es continuo, generando mayores pérdidas térmicas. |
| **PITR™** | Procedimiento de Inspección Técnica Remota. Metodología propietaria de Certilab. |
| **Radiación solar** | Energía electromagnética emitida por el sol que incide sobre el edificio. |
| **Rendimiento estacional** | Eficiencia media de un sistema de climatización a lo largo de una temporada, considerando condiciones de carga parcial. |
| **RPT** | Rotura de Puente Térmico. Elemento aislante entre los perfiles interior y exterior de un marco de aluminio. |
| **SATE** | Sistema de Aislamiento Térmico Exterior. Capa de aislamiento colocada en el exterior de la fachada. |
| **SEER** | Seasonal Energy Efficiency Ratio (Ratio de Eficiencia Energética Estacional). Versión estacional del EER. |
| **SCOP** | Seasonal Coefficient of Performance (Coeficiente de Rendimiento Estacional). Versión estacional del COP. |
| **Transmitancia térmica (U)** | Flujo de calor que atraviesa 1m² de un cerramiento por cada grado de diferencia de temperatura (W/m²·K). |
| **VMC** | Ventilación Mecánica Controlada. Sistema de ventilación que asegura una tasa de renovación de aire constante, a menudo con recuperación de calor. |
| **Zona climática** | Clasificación del municipio según severidad climática (invierno: letras A-E, verano: números 1-5). |

---

## Apéndice A — Protocolo Oficial de Captura Fotográfica PITR™

### A.1 Estructura del protocolo

Cada fotografía del protocolo se define mediante 12 campos:

1. **Código** — Identificador único (F-001, F-002, etc.)
2. **Nombre** — Descripción breve de la fotografía
3. **Objetivo técnico** — Qué información se busca obtener
4. **Variable CE3X relacionada** — Qué variable(s) del motor de conocimiento se alimentan
5. **Prioridad** — Esencial / Alta / Media / Baja
6. **Cuándo solicitarla** — Fase del proceso en que se pide
7. **Cómo hacer la fotografía** — Instrucciones para el cliente en lenguaje llano
8. **Qué debe verse** — Elementos que deben aparecer en el encuadre
9. **Qué errores evitar** — Fallos comunes que invalidan la foto
10. **Qué puede deducir el Arquitecto Técnico** — Conclusiones técnicas que se extraen
11. **Nivel de confianza** — Fiabilidad de la deducción si la foto es correcta
12. **Casos donde sigue siendo necesaria revisión manual** — Limitaciones de la fotografía

### A.2 Requisitos técnicos generales

- **Resolución mínima:** 1920×1080 (Full HD). No se aceptan fotos borrosas o con menos de 1920 píxeles en el lado más largo.
- **Formato:** JPG o PNG. No se aceptan formatos RAW, HEIC, o WebP (pueden no ser legibles por el sistema PITR™).
- **Iluminación:** Luz natural preferiblemente. Evitar fotos con flash directo (aplana los detalles). Si es necesario flash, usarlo como relleno (flash indirecto o con difusor).
- **Enfoque:** La imagen debe ser nítida. Si se fotografía una placa de características, acercar el teléfono para que el texto sea legible. Si el texto es muy pequeño, hacer dos fotos: una general y una en detalle.
- **Orientación:** Preferiblemente horizontal (apaisada) para fachadas y exteriores, y vertical para interiores y detalles (puertas, ventanas, equipos).
- **Metadatos:** No eliminar los metadatos EXIF (fecha, hora, posible geolocalización). Son útiles para verificar la hora solar, la ubicación y la fecha de la captura.
- **Estabilización:** Apoyar el teléfono contra una superficie firme o usar el temporizador para evitar trepidación en fotos de detalle con poca luz.
- **Marcado:** No es necesario marcar las fotos. Se asignarán automáticamente por el sistema PITR™ al código correspondiente mediante análisis de contenido.
- **Organización:** Las fotos deben tomarse en el orden en que se solicitan. No es necesario renombrar los archivos.
- **Privacidad:** Si aparecen personas en las fotos, deben ser irreconocibles (de espaldas, desde lejos, o pixeladas por el sistema). No fotografiar menores de edad. No fotografiar objetos personales (fotos familiares, documentos personales, etc.).

---
### A.3 Catálogo completo de fotografías

---

#### BLOQUE 1: DATOS GENERALES DEL EDIFICIO

---

**F-001** — Fachada completa del edificio

| Campo | Descripción |
|-------|-------------|
| **Código** | F-001 |
| **Nombre** | Fachada completa del edificio desde la acera de enfrente |
| **Objetivo técnico** | Identificar el número de plantas, la tipología del edificio, el material de acabado de la fachada, la presencia de elementos singulares (balcones, terrazas, toldos), y el estado general de conservación. |
| **Variable CE3X relacionada** | A5 (Número de plantas), A6 (Ubicación en el edificio), A8 (Tipo de edificio), C1 (Tipo de fachada), C12 (Estado de conservación) |
| **Prioridad** | Esencial |
| **Cuándo solicitarla** | Al inicio del proceso, como primera fotografía. Permite establecer el contexto del inmueble. |
| **Cómo hacer la fotografía** | "Haz una foto a la fachada de tu edificio desde la acera de enfrente. Aléjate lo suficiente para que se vea el edificio completo, desde la acera hasta el tejado. Si la calle es muy estrecha, cruza al otro lado o busca un punto elevado (un paso de peatones, una rotonda) desde el que se vea todo." |
| **Qué debe verse** | El edificio completo (desde la base hasta la cubierta), la acera, el número de portal si es visible, las plantas completas, los balcones o terrazas, los toldos o persianas, y el material de la fachada. |
| **Qué errores evitar** | Foto demasiado cerca (solo se ve una parte del edificio). Foto inclinada (deformación de la vertical). Foto con sol frontal (deslumbramiento, sombras duras). Foto desde un ángulo que no muestra la fachada completa. |
| **Qué puede deducir el Arquitecto Técnico** | Número de plantas (A5), tipología (A8: aislado, entre medianeras, esquinero), material de fachada (C1: ladrillo visto, enfoscado, SATE, piedra), estado de conservación (C12), presencia de balcones/terrazas (G8). |
| **Nivel de confianza** | Alta (85%) si la foto es nítida y muestra el edificio completo. |
| **Casos donde sigue siendo necesaria revisión manual** | Edificios con geometría compleja (retranqueos, voladizos, patios interiores). Cuando la fachada no es visible desde la vía pública (edificios en calles muy estrechas o con arbolado denso). |

---

**F-002** — Entrada del edificio con referencia de escala

| Campo | Descripción |
|-------|-------------|
| **Código** | F-002 |
| **Nombre** | Entrada del edificio con persona como referencia de altura |
| **Objetivo técnico** | Estimar la altura de planta (distancia entre forjados) usando una persona como referencia de escala. Identificar el tipo de puerta de entrada y su material. |
| **Variable CE3X relacionada** | A5 (Altura de planta), C1 (Tipo de fachada), F12 (Puertas de acceso) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Junto con F-001. Si el cliente está solo, pedir que alguien le acompañe para la escala. Si no es posible, usar una puerta estándar como referencia. |
| **Cómo hacer la fotografía** | "Ponte al lado de la puerta de entrada del edificio (de pie, sin subir a ningún escalón). Pide a alguien que te haga una foto desde unos 5 metros de distancia, de forma que se vea la puerta completa y tu cuerpo entero. La cámara debe estar a la altura de tus ojos, no por encima ni por debajo." |
| **Qué debe verse** | La puerta de entrada completa (incluyendo el dintel), una persona de pie al lado (cuerpo entero), el marco de la puerta, el material de la puerta (madera, metal, vidrio). |
| **Qué errores evitar** | Persona sentada o agachada. Foto desde arriba (comprime la altura). Foto con gran angular (distorsiona las proporciones). Persona demasiado cerca de la puerta (oculta parte). |
| **Qué puede deducir el Arquitecto Técnico** | Altura de planta estimada (A5): una persona de 1.70m de altura permite escalar la altura de la puerta (2.00-2.10m estándar) y la distancia entre forjados (2.50-3.00m típica). Material de la puerta (F12). Tipo de acceso (portal con escaleras, ascensor, acceso directo). |
| **Nivel de confianza** | Alta (85%) con persona como escala. Media (60%) sin persona (usando la puerta como referencia). |
| **Casos donde sigue siendo necesaria revisión manual** | Edificios con alturas de planta no uniformes (locales comerciales en planta baja con altura diferente). Edificios con falsos techos que ocultan la altura real. |

---

**F-003** — Interior de una estancia con referencia de altura de techo

| Campo | Descripción |
|-------|-------------|
| **Código** | F-003 |
| **Nombre** | Interior de una estancia mostrando la altura de techo |
| **Objetivo técnico** | Medir o estimar la altura libre de techo (de suelo a techo) usando una referencia conocida. |
| **Variable CE3X relacionada** | A5 (Altura de planta) |
| **Prioridad** | Media |
| **Cuándo solicitarla** | En la misma ronda que las fotos del interior (F-006). Especialmente importante si la altura parece no estándar. |
| **Cómo hacer la fotografía** | "Desde una esquina de la habitación, haz una foto que muestre el suelo y el techo en la misma imagen. Coloca una persona de pie, o una puerta (mide 2 metros aproximadamente), o un mueble de altura conocida (una nevera mide unos 1.80m, una mesa unos 0.75m) al lado de la pared." |
| **Qué debe verse** | Suelo y techo en la misma imagen (idealmente en una esquina), una referencia de altura conocida al lado de la pared, el tipo de techo (plano, inclinado, con falso techo). |
| **Qué errores evitar** | Foto desde el centro de la habitación (no se ve la altura completa). Foto con gran angular (distorsiona las proporciones). Sin referencia de tamaño. Techo con falso techo que oculte la altura real. |
| **Qué puede deducir el Arquitecto Técnico** | Altura libre de techo (A5). En viviendas estándar: 2.40-2.70m. Edificios antiguos (>1960) pueden tener 2.80-3.20m. Edificios modernos: 2.50m típico. La altura influye en el volumen calefactado y, por tanto, en la demanda. |
| **Nivel de confianza** | Alta (85%) con referencia de tamaño. Media (60%) sin referencia. |
| **Casos donde sigue siendo necesaria revisión manual** | Falsos techos que ocultan la altura real. Techos inclinados (áticos) donde la altura varía. |

---

**F-004** — Buzones del edificio

| Campo | Descripción |
|-------|-------------|
| **Código** | F-004 |
| **Nombre** | Buzones del edificio |
| **Objetivo técnico** | Identificar el número de viviendas del edificio (cada buzón suele corresponder a una vivienda). |
| **Variable CE3X relacionada** | A6 (Número de viviendas), H14 (Calefacción individual/colectiva — los contadores de gas suelen estar junto a los buzones) |
| **Prioridad** | Media (opcional si se puede determinar por otros medios) |
| **Cuándo solicitarla** | Durante la primera ronda de fotos. Es una foto rápida que no requiere desplazamiento adicional. |
| **Cómo hacer la fotografía** | "Haz una foto a los buzones del edificio. Suelen estar en el portal o en la entrada. Aléjate lo suficiente para que se vean todos los buzones en una sola imagen." |
| **Qué debe verse** | Todos los buzones del edificio visibles en una imagen. Si hay varias filas, hacer una foto general y una de detalle de cada fila. |
| **Qué errores evitar** | Foto borrosa (los nombres en los buzones pueden ser pequeños). Foto parcial (solo se ve una parte de los buzones). Buzones tapados por otros elementos. |
| **Qué puede deducir el Arquitecto Técnico** | Número de viviendas (A6). Si los buzones tienen calefacción individual (contadores de gas junto a buzones → H14 individual). Si hay buzones de comunidades o locales comerciales. |
| **Nivel de confianza** | Alta (90%) si se ven todos los buzones. |
| **Casos donde sigue siendo necesaria revisión manual** | Edificios sin buzones visibles (buzones electrónicos, porteros automáticos sin lista). Edificios con buzones compartidos (varias viviendas por buzón — poco común). |

---

**F-005** — Contadores de gas o electricidad (opcional)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-005 |
| **Nombre** | Contadores de gas o electricidad del edificio (armario de contadores) |
| **Objetivo técnico** | Identificar el número de viviendas (una alternativa a los buzones), el tipo de suministro (gas natural, electricidad), y si la calefacción es individual o colectiva. |
| **Variable CE3X relacionada** | A6 (Número de viviendas), H4 (Combustible), H14 (Calefacción individual/colectiva) |
| **Prioridad** | Baja (solo si los buzones no son accesibles) |
| **Cuándo solicitarla** | Solo si los buzones F-004 no están disponibles o no son legibles. |
| **Cómo hacer la fotografía** | "Si el armario de contadores está accesible (suele estar en el portal o en la fachada exterior), haz una foto que muestre todos los contadores. No abras ninguna puerta que esté cerrada con llave. Si está abierto, haz la foto sin tocar nada." |
| **Qué debe verse** | Todos los contadores visibles, el tipo de contador (gas, electricidad), el número de contadores (equivale al número de viviendas). |
| **Qué errores evitar** | Fotos borrosas (los números en los contadores son pequeños). Abrir puertas que no deben abrirse. Fotos solo de un contador (no del conjunto). |
| **Qué puede deducir el Arquitecto Técnico** | Número de viviendas (A6), combustible (H4: gas natural si hay contadores de gas), tipo de instalación (H14: contadores individuales = instalación individual; un solo contador grande = instalación colectiva). |
| **Nivel de confianza** | Alta (90%) si todos los contadores son visibles. |
| **Casos donde sigue siendo necesaria revisión manual** | Armarios de contadores cerrados con llave. Edificios con contadores inteligentes telegestionados (sin acceso físico visible). |

---

**F-006** — Interior de todas las estancias

| Campo | Descripción |
|-------|-------------|
| **Código** | F-006 |
| **Nombre** | Interior de todas las estancias de la vivienda |
| **Objetivo técnico** | Verificar el uso del inmueble (residencial/terciario), identificar el tipo de cerramiento interior (tabiquería), ver radiadores/splits/emisores, detectar humedades, identificar el tipo de suelo, y estimar dimensiones. |
| **Variable CE3X relacionada** | A7 (Uso), C12 (Estado de conservación — humedades), E1 (Tipo de suelo), H2 (Emisores de calefacción), I1 (Refrigeración), todas las variables que requieren verificación visual. |
| **Prioridad** | Esencial |
| **Cuándo solicitarla** | Una vez confirmada la participación del cliente. Es la carga más pesada para el cliente, por lo que debe explicarse bien su importancia. |
| **Cómo hacer la fotografía** | "Haz una foto de cada habitación de la casa: salón, cada dormitorio, cocina, cada baño, pasillo, y cualquier otra estancia (trastero, despacho, terraza cubierta, galería). Para cada habitación: sitúate en una esquina (preferiblemente la entrada) y haz una foto amplia que muestre la mayor superficie posible de la habitación. Si la habitación es grande, haz dos fotos desde esquinas opuestas." |
| **Qué debe verse** | El suelo completo (para ver el material), las paredes (para ver humedades, grietas, tipo de acabado), el techo (para ver altura y posibles humedades), las ventanas (para ver el tipo de marco y el acristalamiento), los radiadores o splits (para identificar el sistema de climatización). |
| **Qué errores evitar** | Fotos borrosas o con mucho contraluz. Fotos con flash que crean sombras duras y ocultan detalles. Fotos muy cercanas (no se ve el contexto). Fotos que no muestren el techo (importante para ver altura). Olvidar alguna estancia (especialmente pasillos, baños, trasteros). |
| **Qué puede deducir el Arquitecto Técnico** | Distribución de la vivienda (A7), tipo de suelo (E1: tarima, gres, mármol), presencia de humedades (C12, N7), tipo de ventanas (F1-F2), emisores de calefacción (H2: radiadores, splits, suelo radiante), unidades de refrigeración (I1), posible superficie por comparación con muebles estándar. |
| **Nivel de confianza** | Alta (85%) si las fotos son nítidas y cubren todas las estancias. |
| **Casos donde sigue siendo necesaria revisión manual** | Viviendas con muchas estancias donde alguna foto no es representativa. Estancias con mobiliario que oculta paredes y suelos. Humedades que no son visibles en el momento de la foto (solo aparecen después de lluvias intensas). |

---

#### BLOQUE 2: FACHADAS Y ENVOLVENTE

---

**F-007** — Fachada principal (orientación conocida)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-007 |
| **Nombre** | Fachada principal del edificio desde la acera de enfrente |
| **Objetivo técnico** | Identificar la orientación de la fachada principal, el material, el número de ventanas por planta, y los elementos de protección solar. |
| **Variable CE3X relacionada** | A8 (Tipo de edificio), A9 (Orientación), C13-C20 (Fachadas por orientación), F10 (Número de ventanas por orientación) |
| **Prioridad** | Esencial |
| **Cuándo solicitarla** | Junto con F-001 (puede ser la misma foto si la fachada está bien iluminada y orientada). |
| **Cómo hacer la fotografía** | "Haz una foto de la fachada principal del edificio (la que da a la calle). Aléjate lo suficiente para que se vea toda la fachada. Señala en la foto hacia dónde mira aproximadamente (por ejemplo: 'esta fachada mira al norte')." |
| **Qué debe verse** | Toda la fachada principal (de acera a cubierta), las ventanas y balcones, los toldos o persianas, el material de la fachada, el número de portal. |
| **Qué errores evitar** | Misma que F-001. No confundir fachada principal con la fachada que da a la calle más ancha (a veces la entrada está por una calle secundaria). |
| **Qué puede deducir el Arquitecto Técnico** | Orientación (A9) si la foto tiene EXIF con hora y ubicación. Material de fachada (C1). Número de ventanas por planta (F10). Elementos de protección solar (F6). |
| **Nivel de confianza** | Alta (85%) con EXIF y referencia de orientación. |
| **Casos donde sigue siendo necesaria revisión manual** | Fachadas con orientación dudosa (nubes, sombras, sin referencia de hora). Edificios en calles que no siguen la orientación cardinal. |

---

**F-008** — Lateral izquierdo del edificio

| Campo | Descripción |
|-------|-------------|
| **Código** | F-008 |
| **Nombre** | Lateral izquierdo del edificio (desde la calle) |
| **Objetivo técnico** | Verificar si el edificio está adosado (medianera) o separado, y si hay ventanas en esa fachada. Identificar el material y el estado de esa fachada lateral. |
| **Variable CE3X relacionada** | A8 (Tipo de edificio), C14 (Fachada lateral izquierda), C12 (Estado de conservación) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Durante la ronda de fotos de fachadas. Buscar un punto desde el que se vea el lateral (a veces hay que alejarse). |
| **Cómo hacer la fotografía** | "Desde la acera, mira hacia la izquierda de la fachada de tu edificio. Si ves el lateral (la pared que da al edificio de al lado), haz una foto que muestre si está pegado al edificio vecino o si hay separación." |
| **Qué debe verse** | La pared lateral del edificio, la separación (o no) con el edificio vecino, si hay ventanas en ese lateral, el material de la pared, el estado (humedades, grietas). |
| **Qué errores evitar** | Confundir la fachada lateral con la fachada trasera. Foto demasiado cerca (solo se ve una parte). Foto desde un ángulo que no muestra la separación. |
| **Qué puede deducir el Arquitecto Técnico** | Si el edificio está adosado (F-008 muestra pared con edificio vecino) o separado (hay separación visible). Si hay ventanas en ese lateral (A6, A8: si hay ventanas, la vivienda puede ser esquinera). Material y estado de la fachada lateral. |
| **Nivel de confianza** | Alta (85%) si la separación es visible. |
| **Casos donde sigue siendo necesaria revisión manual** | Laterales no visibles desde la vía pública (edificios en esquina donde el lateral da a un patio interior). Calles muy estrechas donde no se puede ver la separación. |

---

**F-009** — Lateral derecho del edificio

| Campo | Descripción |
|-------|-------------|
| **Código** | F-009 |
| **Nombre** | Lateral derecho del edificio (desde la calle) |
| **Objetivo técnico** | Mismo que F-008 pero para el lateral derecho. Si el edificio está entre medianeras, este lateral tampoco será visible (solo se verá la fachada del edificio vecino). |
| **Variable CE3X relacionada** | A8 (Tipo de edificio), C15 (Fachada lateral derecha) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Junto con F-008. |
| **Cómo hacer la fotografía** | "Ahora mira hacia la derecha de la fachada de tu edificio. Haz una foto que muestre si está pegado o separado del edificio de al lado, igual que con el lateral izquierdo." |
| **Qué debe verse** | El lateral derecho y la separación con el edificio vecino. |
| **Qué errores evitar** | Mismos que F-008. |
| **Qué puede deducir el Arquitecto Técnico** | Si el edificio está adosado por ambos lados (entre medianeras), solo por un lado (pareado) o por ninguno (exento). |
| **Nivel de confianza** | Alta (85%) si la separación es visible. |
| **Casos donde sigue siendo necesaria revisión manual** | Mismos que F-008. |

---

**F-010** — Fachada trasera del edificio (si es accesible)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-010 |
| **Nombre** | Fachada trasera del edificio (desde el patio interior o la calle trasera) |
| **Objetivo técnico** | Identificar la fachada trasera, su material, sus ventanas, y si hay rehabilitación visible (a veces solo se rehabilita la fachada principal). |
| **Variable CE3X relacionada** | A8 (Tipo de edificio), C16 (Fachada trasera), C12 (Estado de conservación), C13-C20 (Fachadas por orientación) |
| **Prioridad** | Alta (si la fachada trasera es visible) |
| **Cuándo solicitarla** | Si el cliente puede acceder a la parte trasera del edificio (patio interior, calle trasera, o ventana que dé a la fachada trasera). |
| **Cómo hacer la fotografía** | "Si puedes acceder a la parte de atrás del edificio (por un patio interior, una calle trasera, o desde una ventana que dé a la fachada trasera), haz una foto similar a la de la fachada principal: desde lejos, mostrando toda la altura." |
| **Qué debe verse** | La fachada trasera completa, el material, las ventanas, si hay balcones o terrazas, el estado de conservación. |
| **Qué errores evitar** | No hacer la foto si el acceso no es seguro (patios oscuros, escaleras sin barandilla, etc.). Foto borrosa o con poca luz (los patios interiores suelen tener poca luz). |
| **Qué puede deducir el Arquitecto Técnico** | Si la fachada trasera tiene el mismo material que la principal (o diferente — posible rehabilitación parcial). El número de ventanas traseras y su orientación aproximada. |
| **Nivel de confianza** | Media (70%) porque las condiciones de luz suelen ser peores en patios interiores. |
| **Casos donde sigue siendo necesaria revisión manual** | Fachada trasera no accesible (edificios sin patio interior, sin acceso a la calle trasera). Es una de las limitaciones más comunes de la inspección remota. |

---

**F-011** — Fachada con indicación de orientación solar

| Campo | Descripción |
|-------|-------------|
| **Código** | F-011 |
| **Nombre** | Fachada principal con indicación de la orientación cardinal |
| **Objetivo técnico** | Determinar la orientación exacta de la fachada principal usando una brújula (física o del móvil). |
| **Variable CE3X relacionada** | A9 (Orientación del inmueble) |
| **Prioridad** | Alta (si la orientación no puede determinarse por Google Maps) |
| **Cuándo solicitarla** | Cuando la orientación no sea obvia por Google Maps (calles curvas, edificios con geometría compleja). |
| **Cómo hacer la fotografí** | "Usa la brújula del móvil para saber hacia dónde mira la fachada de tu casa. Haz una foto de la fachada con el móvil en la mano mostrando la brújula en la pantalla, o simplemente dime: la fachada da al [Norte/Sur/Este/Oeste]." |
| **Qué debe verse** | La fachada y la orientación indicada (en la foto o en el texto). |
| **Qué errores evitar** | Confundir norte magnético con norte geográfico (la diferencia es pequeña en España, ≈2-3°). Brújula descalibrada (mover el teléfono en forma de 8 para calibrar). |
| **Qué puede deducir el Arquitecto Técnico** | Con la orientación conocida, se puede determinar la radiación solar incidente (B6, F4) y las ganancias solares en invierno y verano. |
| **Nivel de confianza** | 100% si se usa Google Maps (coordenadas exactas). 90% si se usa brújula. |
| **Casos donde sigue siendo necesaria revisión manual** | Edificios con múltiples planos de fachada con diferentes orientaciones (geometría compleja). |

---

**F-012** — Fachada sur (o la que recibe más sol)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-012 |
| **Nombre** | Fachada que recibe más horas de sol al día |
| **Objetivo técnico** | Confirmar la orientación de la fachada más expuesta al sol (generalmente la sur) y evaluar si hay protecciones solares o sombreamiento. |
| **Variable CE3X relacionada** | A9 (Orientación), B6 (Sombreamiento de ventanas), F6 (Factor de sombra del hueco) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Si el cliente sabe qué fachada recibe más sol. Especialmente útil en edificios con geometría compleja. |
| **Cómo hacer la fotografía** | "¿En qué fachada da más el sol? Si es la que tiene el salón o la terraza, haz una foto de esa fachada desde el exterior a media mañana (cuando el sol está alto)." |
| **Qué debe verse** | La fachada con más exposición solar, sus ventanas, los elementos de protección solar (toldos, persianas, aleros), y los posibles obstáculos (edificios, árboles). |
| **Qué errores evitar** | Foto a contraluz (el sol de frente deslumbra y no se ven detalles). Foto a mediodía en verano (el sol está muy alto y las sombras son mínimas — no se ven las protecciones solares en uso). |
| **Qué puede deducir el Arquitecto Técnico** | La orientación más desfavorable en verano (sobrecalentamiento) y más favorable en invierno (ganancias solares). La presencia de protecciones solares y su efectividad. |
| **Nivel de confianza** | Alta (85%) con foto en condiciones adecuadas. |
| **Casos donde sigue siendo necesaria revisión manual** | Fachadas con protecciones solares motorizadas o automatizadas (no se puede verificar su uso real remotamente). |

---

#### BLOQUE 3: ENTORNO Y SOMBRAS

---

**F-013** — Panorámica del entorno del edificio

| Campo | Descripción |
|-------|-------------|
| **Código** | F-013 |
| **Nombre** | Panorámica del entorno del edificio (calle, edificios vecinos, arbolado) |
| **Objetivo técnico** | Evaluar la exposición al viento (B5) y la presencia de obstáculos que proyecten sombra (B6). |
| **Variable CE3X relacionada** | B5 (Exposición al viento), B6 (Sombreamiento de fachadas) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Durante la ronda de fotos de fachadas. Es una foto panorámica que complementa a F-001. |
| **Cómo hacer la fotografía** | "Desde la acera de enfrente, haz una foto panorámica (moviendo el teléfono de izquierda a derecha lentamente) que muestre todo el entorno de tu edificio: la calle, los edificios de enfrente, los árboles, y el cielo." |
| **Qué debe verse** | El edificio completo y su entorno inmediato: anchura de la calle, altura de los edificios de enfrente, árboles cercanos, postes, farolas, toldos de comercios, etc. |
| **Qué errores evitar** | Movimiento rápido que distorsiona la panorámica. Exposición desigual (partes muy claras y muy oscuras). Olvidar incluir el edificio en la panorámica. |
| **Qué puede deducir el Arquitecto Técnico** | Exposición al viento (B5: calle ancha y despejada → expuesta; calle estrecha con edificios altos → protegida). Presencia de obstáculos que dan sombra (B6: edificios de enfrente, árboles). |
| **Nivel de confianza** | Alta (85%) si la panorámica es completa y nítida. |
| **Casos donde sigue siendo necesaria revisión manual** | Calles con cambios de sección (anchura variable). Entornos con muchos árboles de hoja caduca (el sombreamiento cambia con las estaciones). |

---

**F-014** — Vista de la azotea/cubierta (si es accesible)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-014 |
| **Nombre** | Vista de la azotea o cubierta del edificio desde un punto elevado |
| **Objetivo técnico** | Identificar el tipo de cubierta (plana, inclinada), su estado, y la presencia de instalaciones (antenas, placas solares, maquinaria de climatización). |
| **Variable CE3X relacionada** | B5 (Exposición al viento — en áticos), D1 (Tipo de cubierta), D3-D6 (Estado de cubierta), M1 (Solar térmica), M2 (Fotovoltaica) |
| **Prioridad** | Media (solo si el cliente puede acceder a una ventana superior, terraza, o azotea comunitaria) |
| **Cuándo solicitarla** | Si el cliente vive en un ático o tiene acceso a una azotea comunitaria. Si no, se usará Google Maps (satélite) para la cubierta. |
| **Cómo hacer la fotografía** | "Si puedes subir a la azotea o asomarte a una ventana del piso superior, haz una foto de la cubierta del edificio desde arriba. También puedes hacerla desde la ventana de un vecino de arriba si te deja." |
| **Qué debe verse** | La superficie de la cubierta (tejas, grava, lámina impermeabilizante), las antenas, las placas solares (si las hay), los equipos de climatización (unidades exteriores), y el estado general. |
| **Qué errores evitar** | Fotos borrosas (la cubierta suele estar lejos). Fotos con mucho contraluz (sol detrás de la cubierta). No mostrar el borde de la cubierta (importante para ver el espesor y el peto). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de cubierta (D1), presencia de instalaciones (M1, M2, I2), estado de la cubierta (D3-D6). |
| **Nivel de confianza** | Alta (85%) si la foto es nítida y muestra la cubierta completa. |
| **Casos donde sigue siendo necesaria revisión manual** | Cubiertas no accesibles visualmente (edificios sin acceso a azotea, sin vecinos superiores). |

---

**F-015** — Protecciones solares de ventanas (exterior)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-015 |
| **Nombre** | Protecciones solares visibles desde el exterior (toldos, persianas, lamas, aleros) |
| **Objetivo técnico** | Identificar los elementos de protección solar instalados en las ventanas y evaluar su efectividad. |
| **Variable CE3X relacionada** | B6 (Sombreamiento de fachadas), F6 (Factor de sombra del hueco) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Durante la ronda de fotos de fachadas. Especialmente importante en ventanas orientadas al sur y al oeste. |
| **Cómo hacer la fotografía** | "Haz una foto de cada ventana desde el exterior, de forma que se vea si tiene toldo, persiana exterior, lamas, o alero. Acércate lo suficiente para que se vea el elemento de protección completo." |
| **Qué debe verse** | El toldo (plegado o extendido), la persiana exterior (enrollada o bajada), las lamas (fijas u orientables), el alero o voladizo sobre la ventana. |
| **Qué errores evitar** | Foto desde el interior (no se ve la protección exterior). Foto demasiado lejana (el elemento de protección es pequeño en la imagen). Foto con el toldo recogido (si el cliente dice que lo usa, pedir que lo extienda para la foto). |
| **Qué puede deducir el Arquitecto Técnico** | Factor de sombra de la ventana (F6). Un toldo horizontal en ventana sur puede reducir la ganancia solar en verano un 50-70%. Una persiana bajada puede reducirla un 60-80%. |
| **Nivel de confianza** | Alta (85%) si el toldo/persiana es visible. |
| **Casos donde sigue siendo necesaria revisión manual** | Toldos retráctiles motorizados (no se puede verificar su uso real). Persianas de lamas orientables (el ángulo de las lamas cambia el factor de sombra). Protecciones solares interiores (cortinas, estores) que no son visibles desde el exterior. |

---

**F-016** — Obstáculos que proyectan sombra sobre las ventanas

| Campo | Descripción |
|-------|-------------|
| **Código** | F-016 |
| **Nombre** | Obstáculos externos que proyectan sombra sobre las ventanas (edificios, árboles) |
| **Objetivo técnico** | Identificar los obstáculos (edificios, árboles, postes) que pueden dar sombra a las ventanas y reducir las ganancias solares. |
| **Variable CE3X relacionada** | B6 (Sombreamiento de fachadas), F6 (Factor de sombra del hueco) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Durante la ronda de fotos de entorno. |
| **Cómo hacer la fotografía** | "Mira hacia las ventanas de tu casa desde la calle. ¿Hay algún edificio, árbol, o poste delante que pueda darles sombra? Haz una foto que muestre la ventana y el obstáculo en la misma imagen." |
| **Qué debe verse** | La ventana y el obstáculo que le da sombra (edificio, árbol, poste, farola), con suficiente distancia para ver la relación entre ambos. |
| **Qué errores evitar** | Foto solo del obstáculo sin la ventana (no se puede evaluar la sombra). Foto en un momento del día en que el obstáculo no proyecta sombra (hacer la foto cuando el sol está detrás del obstáculo). |
| **Qué puede deducir el Arquitecto Técnico** | Factor de sombra del hueco (F6): si hay un edificio de enfrente más alto que la ventana, la sombra es permanente en invierno (reducción de ganancias solares). Si hay un árbol de hoja caduca, la sombra solo opera en verano. |
| **Nivel de confianza** | Media (70%) porque la sombra efectiva depende de la hora del día y la época del año. |
| **Casos donde sigue siendo necesaria revisión manual** | Cuando hay múltiples obstáculos que cambian la sombra a lo largo del día. Cuando la sombra es muy densa (edificio de enfrente muy cercano) y el factor de sombra es difícil de cuantificar. |

---

**F-017** — Fachada completa con protecciones solares visibles

| Campo | Descripción |
|-------|-------------|
| **Código** | F-017 |
| **Nombre** | Fachada completa mostrando todas las protecciones solares de la vivienda |
| **Objetivo técnico** | Tener una visión de conjunto de todas las protecciones solares de la vivienda (no solo de una ventana). |
| **Variable CE3X relacionada** | B6 (Sombreamiento), F6 (Factor de sombra) |
| **Prioridad** | Media (complementaria a F-015) |
| **Cuándo solicitarla** | Después de las fotos individuales de protecciones. |
| **Cómo hacer la fotografía** | "Desde la acera de enfrente, haz una foto de toda la fachada de tu vivienda (no del edificio completo) que muestre todas las ventanas con sus protecciones solares." |
| **Qué debe verse** | Todas las ventanas de la vivienda, con sus toldos/persianas/lamas visibles. |
| **Qué errores evitar** | Mismos que F-001 (mala iluminación, encuadre incorrecto). |
| **Qué puede deducir el Arquitecto Técnico** | Si todas las ventanas tienen el mismo tipo de protección solar o si alguna es diferente. |
| **Nivel de confianza** | Alta (85%) si la foto es nítida. |
| **Casos donde sigue siendo necesaria revisión manual** | Cuando hay diferentes tipos de protección en diferentes ventanas (ej. toldo en salón, persiana en dormitorio). |

---

**F-018** — Detalle de toldos, persianas venecianas, lamas

| Campo | Descripción |
|-------|-------------|
| **Código** | F-018 |
| **Nombre** | Detalle del elemento de protección solar (toldo, persiana, lama) |
| **Objetivo técnico** | Identificar el tipo exacto de protección solar (toldo extensible, toldo vertical, persiana de lamas orientables, lamas fijas) para calcular su factor de sombra. |
| **Variable CE3X relacionada** | B6, F6 |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Si hay elementos de protección solar que necesitan identificación precisa. |
| **Cómo hacer la fotografía** | "Acércate al toldo o persiana y haz una foto de detalle. Si es un toldo, muestra cómo está fijado a la pared, la tela, y cómo se extiende. Si es una persiana, muestra las lamas de cerca." |
| **Qué debe verse** | El mecanismo de fijación, el material (tela, aluminio, PVC), la orientación de las lamas (si son orientables), el estado de conservación. |
| **Qué errores evitar** | Foto muy lejana (no se ve el detalle). Foto con flash (la tela del toldo puede saturarse). Foto del elemento recogido (si es posible, pedir que lo extiendan). |
| **Qué puede deducir el Arquitecto Técnico** | Factor de sombra específico (F6) según el tipo de protección. Por ejemplo: toldo horizontal de lona opaca → factor 0.4-0.6. Persiana de lamas de aluminio → factor 0.3-0.5 (lamas cerradas). |
| **Nivel de confianza** | Alta (90%) si la foto de detalle es nítida. |
| **Casos donde sigue siendo necesaria revisión manual** | Toldos con tejidos de diferentes densidades (el factor de sombra varía). Persianas automatizadas con sensores de sol (no se puede verificar la programación). |

---

#### BLOQUE 4: CERRAMIENTOS Y FACHADAS

---

**F-019** — Termostato ambiente

| Campo | Descripción |
|-------|-------------|
| **Código** | F-019 |
| **Nombre** | Termostato ambiente de calefacción/refrigeración |
| **Objetivo técnico** | Identificar el tipo de control de climatización (manual, programable, digital), la temperatura de consigna programada, y si hay zonificación. |
| **Variable CE3X relacionada** | B8 (Temperatura de consigna), H6 (Sistema de control) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Durante la ronda de fotos del interior (F-006). |
| **Cómo hacer la fotografía** | "Busca el termostato de la calefacción (suele estar en el pasillo o en el salón, en la pared). Haz una foto de cerca que muestre la pantalla y los botones. Si tiene programación horaria, enciéndelo para que se vea la pantalla." |
| **Qué debe verse** | La pantalla del termostato (temperatura actual, temperatura programada, modo: calefacción/refrigeración/off), los botones de control, la marca y modelo (si es visible). |
| **Qué errores evitar** | Foto borrosa (la pantalla puede ser pequeña). Foto con reflejos (la luz de la pantalla puede deslumbrar). No encender la pantalla si está apagada (no se ve la temperatura). |
| **Qué puede deducir el Arquitecto Técnico** | Temperatura de consigna (B8), tipo de control (H6: manual, programable, digital), presencia de zonificación (si hay más de un termostato). |
| **Nivel de confianza** | Alta (90%) si la pantalla es legible. |
| **Casos donde sigue siendo necesaria revisión manual** | Termostatos sin pantalla (termostatos mecánicos de dial). Sistemas de control centralizado (domótica) donde el termostato no es accesible. Termostatos inteligentes con control remoto (la programación puede no ser visible en la pantalla). |

---

**F-020** — Detalle de la fachada exterior (primer plano del material)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-020 |
| **Nombre** | Primer plano del material de acabado de la fachada exterior |
| **Objetivo técnico** | Identificar el material exacto de la fachada (ladrillo cara vista, enfoscado monocapa, SATE, piedra, panel sándwich) para determinar la composición del cerramiento. |
| **Variable CE3X relacionada** | C1 (Tipo de fachada), C2 (Transmitancia térmica), C11 (Color de la fachada) |
| **Prioridad** | Esencial |
| **Cuándo solicitarla** | Junto con F-001 (fachada completa). Puede ser un recorte de esa foto si es lo suficientemente nítida. |
| **Cómo hacer la fotografía** | "Acércate a la pared exterior del edificio y haz una foto de cerca del material de la fachada. Tiene que verse bien la textura: si es ladrillo, si está pintado, si tiene piedra, o si tiene paneles aislantes." |
| **Qué debe verse** | La textura del material (ladrillos individuales, grano del enfoscado, paneles de SATE, juntas), el color (para determinar la absortividad solar), y el estado (grietas, desconchones, suciedad). |
| **Qué errores evitar** | Foto demasiado cerca (solo se ve un ladrillo, no el patrón). Foto con flash (el ladrillo o el enfoscado pueden saturarse). Foto en sombra (el color puede verse diferente). Foto desde el interior (no se ve el material exterior). |
| **Qué puede deducir el Arquitecto Técnico** | Material de fachada (C1): ladrillo cara vista, enfoscado, SATE, piedra natural, panel sándwich. Color (C11): claro, medio, oscuro. Presencia de SATE: visible como una capa continua de color liso (generalmente blanco, beige, o gris claro) con esquineros y juntas de dilatación visibles. |
| **Nivel de confianza** | Muy alta (95%) si la foto es nítida y con buena luz. |
| **Casos donde sigue siendo necesaria revisión manual** | Fachadas con múltiples materiales (ej. planta baja de piedra, plantas superiores de ladrillo). Fachadas con revestimiento continuo que puede ocultar el material subyacente (ej. monocapa sobre ladrillo). |

---

**F-021** — Pared interior (espesor del muro)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-021 |
| **Nombre** | Pared interior mostrando el espesor del muro (desde un enchufe, caja de persiana, o hueco de obra) |
| **Objetivo técnico** | Estimar el espesor del muro exterior, lo que permite inferir la presencia o ausencia de cámara de aire y aislamiento. |
| **Variable CE3X relacionada** | C1 (Tipo de fachada), C3-C10 (Capas del muro) |
| **Prioridad** | Media (difícil de obtener sin una obra visible) |
| **Cuándo solicitarla** | Solo si hay un hueco visible en la pared (enchufe desmontado, caja de persiana abierta, obra reciente, roza de fontanería/electricidad). |
| **Cómo hacer la fotografía** | "Si tienes alguna zona donde se vea el interior de la pared (por ejemplo, un enchufe que hayas desmontado, una caja de persiana abierta, o una obra), haz una foto de cerca que muestre el grosor de la pared y los materiales que se ven." |
| **Qué debe verse** | El espesor total del muro (desde el interior hasta el exterior), las capas visibles (ladrillo, cámara de aire, aislamiento, enlucido), y una referencia de tamaño (moneda, regla, dedo) para estimar el espesor. |
| **Qué errores evitar** | Foto borrosa (los detalles son importantes). Sin referencia de tamaño (no se puede estimar el espesor). Foto solo de una capa (no del espesor completo). |
| **Qué puede deducir el Arquitecto Técnico** | Espesor total del muro: <25cm → probable muro de ladrillo hueco sencillo (sin cámara). 25-30cm → muro de ladrillo hueco doble con cámara (sin aislamiento). 30-38cm → muro con cámara y aislamiento. >38cm → muro con aislamiento grueso o muro de piedra. |
| **Nivel de confianza** | Muy alta (95%) si se ve el espesor completo y hay referencia de tamaño. |
| **Casos donde sigue siendo necesaria revisión manual** | Cuando no hay ningún hueco visible en la pared (la mayoría de los casos). En ese caso, el espesor debe inferirse por la época constructiva. |

---

**F-022** — Corte constructivo (obra visible)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-022 |
| **Nombre** | Sección constructiva del muro (si hay obras visibles) |
| **Objetivo técnico** | Ver la composición completa del muro por capas (revestimiento exterior, ladrillo, cámara, aislamiento, ladrillo interior, enlucido). |
| **Variable CE3X relacionada** | C1-C10 (Composición del muro) |
| **Prioridad** | Alta (si hay obras, es la foto más valiosa) |
| **Cuándo solicitarla** | Solo si el cliente tiene obras en casa (reforma, instalación eléctrica, fontanería) que hayan abierto un hueco en la pared exterior. |
| **Cómo hacer la fotografía** | "Si tienes una obra en casa que haya abierto la pared exterior, haz una foto de cerca que muestre todas las capas: desde el exterior (ladrillo, piedra) hasta el interior (yeso, pladur). Incluye una regla o un objeto de tamaño conocido para saber el grosor de cada capa." |
| **Qué debe verse** | Todas las capas del muro: (1) revestimiento exterior, (2) ladrillo/capa exterior, (3) cámara de aire (si existe), (4) aislamiento (si existe, con su espesor), (5) ladrillo/capa interior, (6) enlucido interior. Una referencia de tamaño para cada capa. |
| **Qué errores evitar** | Foto borrosa (las capas pueden ser finas). Sin referencia de tamaño. Foto desde un ángulo que distorsiona los espesores. No mostrar la capa exterior (si la obra solo ha abierto la pared interior). |
| **Qué puede deducir el Arquitecto Técnico** | La composición exacta del muro (C3-C10), que permite calcular la transmitancia térmica (U) con alta precisión. Por ejemplo: ladrillo hueco 12cm + cámara 5cm + EPS 4cm + ladrillo hueco 7cm + enlucido 1.5cm → U ≈ 0.65 W/m²·K. |
| **Nivel de confianza** | Muy alta (98%) si todas las capas son visibles y medibles. |
| **Casos donde sigue siendo necesaria revisión manual** | No suele ser necesaria si la foto es completa. Excepción: si la obra solo muestra una parte del muro (ej. solo la hoja interior) y no la composición completa. |

---

#### BLOQUE 5: ESTADO DE LA FACHADA

---

**F-023** — Estado general de la fachada

| Campo | Descripción |
|-------|-------------|
| **Código** | F-023 |
| **Nombre** | Estado general de la fachada (conservación, suciedad, desprendimientos) |
| **Objetivo técnico** | Evaluar el estado de conservación de la fachada: grietas, humedades, desconchados, suciedad, vegetación. |
| **Variable CE3X relacionada** | C12 (Estado de conservación de la fachada) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Junto con F-001 y F-020. Una foto general desde la acera de enfrente. |
| **Cómo hacer la fotografía** | "Haz una foto de toda la altura de la fachada desde la acera de enfrente, con buena luz. Fíjate si hay manchas, grietas, o zonas donde la pintura se haya desprendido." |
| **Qué debe verse** | Toda la fachada, con suficiente detalle para ver el estado general. |
| **Qué errores evitar** | Foto con poca luz (las manchas y grietas no se ven). Foto con sol frontal (las sombras pueden ocultar grietas). |
| **Qué puede deducir el Arquitecto Técnico** | Estado general (C12): buena conservación (sin defectos visibles), regular (manchas de suciedad, pequeñas grietas), malo (grietas >2mm, humedades generalizadas, desprendimientos). |
| **Nivel de confianza** | Alta (85%) si la foto es nítida y con buena luz. |
| **Casos donde sigue siendo necesaria revisión manual** | Grietas finas (<1mm) que no son visibles en fotos. Humedades internas que no se manifiestan en la fachada. Problemas estructurales no visibles superficialmente. |

---

**F-024** — Detalle de grietas, fisuras, o desconchados

| Campo | Descripción |
|-------|-------------|
| **Código** | F-024 |
| **Nombre** | Detalle de grietas, fisuras, o desconchados en la fachada |
| **Objetivo técnico** | Documentar el tamaño, la forma y la localización de las grietas para evaluar su gravedad. |
| **Variable CE3X relacionada** | C12 (Estado de conservación) |
| **Prioridad** | Media (solo si hay grietas visibles) |
| **Cuándo solicitarla** | Si el cliente ve grietas en la fachada (F-023). |
| **Cómo hacer la fotografía** | "Acércate a la grieta y haz una foto de cerca. Pon una moneda (de 2€ mide 25mm) o una regla al lado para que se vea el tamaño de la grieta. También haz una foto desde más lejos que muestre dónde está la grieta en la fachada." |
| **Qué debe verse** | La grieta de cerca (con el tamaño de la abertura visible), el recorrido de la grieta (vertical, horizontal, diagonal), y su localización en la fachada (cerca de una ventana, en una esquina, en el centro del paño). |
| **Qué errores evitar** | Foto borrosa (las grietas finas no se ven). Sin referencia de tamaño. Foto solo de cerca (no se sabe dónde está la grieta). |
| **Qué puede deducir el Arquitecto Técnico** | Gravedad de la grieta: <1mm → fisura superficial (no relevante). 1-2mm → fisura que puede indicar movimiento térmico o asentamiento. >2mm → grieta que requiere evaluación estructural (revisión manual obligatoria). |
| **Nivel de confianza** | Alta (90%) con referencia de tamaño. |
| **Casos donde sigue siendo necesaria revisión manual** | Grietas >2mm (se requiere evaluación estructural presencial). Grietas que cruzan todo el paño de fachada (posible problema de cimentación). |

---

**F-025** — Manchas de humedad en paredes interiores

| Campo | Descripción |
|-------|-------------|
| **Código** | F-025 |
| **Nombre** | Manchas de humedad en paredes interiores (especialmente en esquinas y techos) |
| **Objetivo técnico** | Detectar humedades por condensación (puentes térmicos) o por filtración (cubierta, fachada). |
| **Variable CE3X relacionada** | C12 (Estado de conservación), D3-D6 (Estado de cubierta), G1 (Puentes térmicos), N7 (Humendades y patologías) |
| **Prioridad** | Esencial |
| **Cuándo solicitarla** | Durante la ronda de fotos del interior (F-006). Prestar especial atención a las esquinas de las habitaciones exteriores, a los techos de la última planta, y a las paredes alrededor de las ventanas. |
| **Cómo hacer la fotografía** | "Si tienes manchas de humedad en las paredes (mohos negros, manchas marrones, ampollas en la pintura), haz una foto de cerca que muestre la mancha. También haz otra foto desde más lejos que muestre dónde está (en qué esquina, cerca de qué ventana, en el techo)." |
| **Qué debe verse** | La mancha de humedad (color, forma, tamaño), su localización (esquina, techo, pared medianera, alrededor de una ventana), y el tipo de mancha (moho negro, mancha de agua, eflorescencias blancas). |
| **Qué errores evitar** | Foto borrosa (las manchas sutiles no se ven). Foto con flash (puede ocultar el color real de la mancha). Manchas viejas que ya no están activas (preguntar si la humedad es actual o pasada). |
| **Qué puede deducir el Arquitecto Técnico** | Origen de la humedad: moho negro en esquinas → condensación por puente térmico (G1). Mancha marrón en techo → filtración de cubierta (D3-D6). Mancha alrededor de ventana → filtración por ventana (F9). Humedad en la base de la pared → capilaridad desde el terreno (E6-E10). |
| **Nivel de confianza** | Alta (85%) si la foto muestra claramente la mancha y su localización. |
| **Casos donde sigue siendo necesaria revisión manual** | Humedades internas que no son visibles en la superficie (detrás de muebles, en falsos techos). Manchas que ya fueron reparadas (pintadas) pero el problema persiste. |

---

**F-026** — Esquinas y encuentros con otros elementos (balcones, cornisas)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-026 |
| **Nombre** | Esquinas de la fachada y encuentros con balcones, cornisas, o terrazas |
| **Objetivo técnico** | Identificar puentes térmicos en esquinas y encuentros, y detectar humedades o grietas en estos puntos críticos. |
| **Variable CE3X relacionada** | C12 (Estado de conservación), G1-G8 (Puentes térmicos) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Durante la ronda de fotos de fachada. Son los puntos donde suele haber más problemas. |
| **Cómo hacer la fotografí** | "Haz una foto de cada esquina del edificio desde la calle (especialmente las esquinas de tu vivienda). También haz fotos de los encuentros de la fachada con balcones, terrazas, o cornisas." |
| **Qué debe verse** | La esquina del edificio, el encuentro de la fachada con el balcón/terraza (junta, posible grieta), el borde de la cornisa o del alero. |
| **Qué errores evitar** | Foto demasiado lejana (no se ve el detalle de la junta). Foto con sol de costado (sombras que ocultan grietas). |
| **Qué puede deducir el Arquitecto Técnico** | Presencia de puentes térmicos en esquinas (G5) y en encuentros con balcones (G8: las terrazas voladas de hormigón son puentes térmicos graves). Grietas en encuentros que indican movimientos diferenciales. |
| **Nivel de confianza** | Media (70%) porque las juntas y encuentros suelen ser difíciles de ver desde la calle. |
| **Casos donde sigue siendo necesaria revisión manual** | Balcones y terrazas voladas (el puente térmico solo es evaluable presencialmente midiendo la temperatura superficial). Encuentros con cubierta (difíciles de ver desde la calle). |

---

#### BLOQUE 6: CUBIERTA

---

**F-027** — Perfil del edificio (tejado/cubierta visible desde la calle)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-027 |
| **Nombre** | Perfil del edificio mostrando la forma de la cubierta (tejado) |
| **Objetivo técnico** | Identificar el tipo de cubierta (plana, inclinada, tejado a dos aguas, cubierta compleja). |
| **Variable CE3X relacionada** | D1 (Tipo de cubierta) |
| **Prioridad** | Esencial |
| **Cuándo solicitarla** | Junto con F-001 (fachada completa). Alejarse lo suficiente para ver el perfil superior del edificio. |
| **Cómo hacer la fotografía** | "Aléjate de tu edificio hasta que puedas ver el tejado o la parte superior del edificio. Haz una foto que muestre la forma del tejado: si es plano (como una terraza), inclinado (como un tejado de tejas), o si tiene antenas, placas solares, o chimeneas." |
| **Qué debe verse** | El perfil completo del edificio (desde la base hasta el punto más alto), la forma de la cubierta (plana, inclinada, a dos aguas, a cuatro aguas), los elementos en la cubierta (antenas, placas solares, chimeneas, equipos de climatización). |
| **Qué errores evitar** | Foto desde un punto bajo (no se ve el tejado, solo las fachadas). Foto con el sol detrás del edificio (el tejado queda en sombra y no se ve su forma). Edificios en calles estrechas donde el tejado no es visible (buscar un punto elevado: un puente, una rotonda, un piso superior vecino). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de cubierta (D1): plana (visible como una línea horizontal en la parte superior) o inclinada (visible como un triángulo o línea inclinada). Presencia de instalaciones (M1, M2, I2). |
| **Nivel de confianza** | Alta (85%) si el perfil es claramente visible. |
| **Casos donde sigue siendo necesaria revisión manual** | Cubiertas no visibles desde ningún punto de la calle (edificios en calles muy estrechas, con aleros que ocultan la cubierta). Cubiertas con geometría compleja (varios planos, lucernarios, claraboyas). |

---

**F-028** — Cubierta desde arriba (satélite o acceso a azotea)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-028 |
| **Nombre** | Vista cenital de la cubierta (desde satélite o desde una ventana/terraza superior) |
| **Objetivo técnico** | Ver la superficie de la cubierta: material, estado, instalaciones, antenas, placas solares, claraboyas. |
| **Variable CE3X relacionada** | D1 (Tipo de cubierta), D3-D6 (Estado de cubierta), M1 (Solar térmica), M2 (Fotovoltaica) |
| **Prioridad** | Media (alternativa: Google Maps satélite) |
| **Cuándo solicitarla** | Si el cliente puede acceder a una ventana superior (ático, terraza comunitaria) o si se necesita confirmar la presencia de instalaciones en cubierta. |
| **Cómo hacer la fotografí** | "Si puedes asomarte a una ventana del piso superior o subir a la azotea, haz una foto de la cubierta desde arriba. Tiene que verse la superficie: si es de tejas, de grava, de lámina negra, o de terrazo." |
| **Qué debe verse** | La superficie de la cubierta (material, color, textura), los elementos instalados (placas solares, antenas, chimeneas, claraboyas, equipos de aire acondicionado), y el estado (charcos, vegetación, grava desplazada). |
| **Qué errores evitar** | Foto borrosa (la cubierta puede estar lejos). Foto con mucho contraluz. No mostrar los bordes de la cubierta (no se ve la transición con la fachada). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo exacto de cubierta (D1) y su estado (D3-D6). Presencia y tipo de instalaciones solares (M1, M2). |
| **Nivel de confianza** | Alta (90%) si la foto es nítida y muestra la cubierta completa. |
| **Casos donde sigue siendo necesaria revisión manual** | Cubiertas no accesibles visualmente. Cubiertas ajardinadas (composición compleja no visible). |

---

**F-029** — Interior del ático/última planta (techo)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-029 |
| **Nombre** | Interior de la última planta (ático) mostrando el techo |
| **Objetivo técnico** | Ver si el techo es plano o inclinado (confirma el tipo de cubierta), y detectar humedades en el techo (filtraciones de cubierta). |
| **Variable CE3X relacionada** | D1 (Tipo de cubierta), D3-D6 (Estado de cubierta) |
| **Prioridad** | Alta (si la vivienda es un ático o la última planta) |
| **Cuándo solicitarla** | Solo si el cliente vive en la última planta o en un ático. Especialmente importante si hay sospecha de filtraciones. |
| **Cómo hacer la fotografía** | "Desde una esquina de la habitación, haz una foto que muestre el techo completo. Si el techo es inclinado (como un tejado), muestra también la pared inclinada. Si hay manchas de humedad en el techo, haz una foto de cerca." |
| **Qué debe verse** | El techo completo (plano o inclinado), el tipo de acabado del techo (yeso, falso techo, madera, vigas vistas), y cualquier mancha de humedad o grieta. |
| **Qué errores evitar** | Foto solo de una parte del techo. Foto con flash que oculta las manchas de humedad. Falso techo que oculta la cubierta real. |
| **Qué puede deducir el Arquitecto Técnico** | Si el techo es inclinado → cubierta inclinada (D1). Si es plano → cubierta plana (D1). Manchas en el techo → posible filtración de cubierta (D3-D6). |
| **Nivel de confianza** | Alta (90%) si la foto muestra todo el techo. |
| **Casos donde sigue siendo necesaria revisión manual** | Falsos techos que ocultan la cubierta real (no se puede ver si hay aislamiento ni el estado de la cubierta). Techos inclinados con buhardilla habitable (el aislamiento puede estar entre las vigas, bajo el falso techo). |

---

**F-030** — Borde de la cubierta plana (si es visible)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-030 |
| **Nombre** | Borde o canto de la cubierta plana (visible desde la calle o desde una terraza vecina) |
| **Objetivo técnico** | Estimar el espesor de la cubierta (para inferir la presencia de aislamiento) y ver el tipo de acabado (grava, lámina, terrazo). |
| **Variable CE3X relacionada** | D1 (Tipo de cubierta), D2 (Composición de la cubierta) |
| **Prioridad** | Media (solo si el borde es visible) |
| **Cuándo solicitarla** | Si el cliente puede ver el borde de la cubierta desde una ventana o terraza (normalmente visible en edificios con cubierta plana y peto bajo). |
| **Cómo hacer la fotografía** | "Si ves el borde de la cubierta (el canto, donde termina) desde una ventana o terraza, haz una foto de cerca que muestre el espesor. Moneda o regla al lado para referencia." |
| **Qué debe verse** | El espesor total de la cubierta (desde el techo interior hasta la superficie exterior), las capas visibles (forjado, aislamiento, impermeabilización, acabado). |
| **Qué errores evitar** | Foto borrosa o desde muy lejos (no se ve el espesor). Sin referencia de tamaño. |
| **Qué puede deducir el Arquitecto Técnico** | Espesor de la cubierta: 20-25cm → forjado sin aislamiento (D2). 30-40cm → forjado con aislamiento (D2). Tipo de acabado: grava, lámina asfáltica, terrazo, teja. |
| **Nivel de confianza** | Media (70%) porque el borde de la cubierta suele ser difícil de ver y medir desde lejos. |
| **Casos donde sigue siendo necesaria revisión manual** | Bordes de cubierta no visibles (petos altos, edificios sin acceso visual a la cubierta). |

---

**F-031** — Bajo cubierta inclinada (interior del ático/desván)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-031 |
| **Nombre** | Interior del ático, desván, o espacio bajo cubierta (si es accesible) |
| **Objetivo técnico** | Ver la composición de la cubierta inclinada: el material bajo las tejas, la presencia de aislamiento entre las vigas, y el estado de la estructura. |
| **Variable CE3X relacionada** | D1 (Tipo de cubierta), D2 (Composición de la cubierta) |
| **Prioridad** | Alta (si el cliente tiene acceso al desván o al espacio bajo cubierta) |
| **Cuándo solicitarla** | Si el cliente tiene un ático habitable o un desván accesible. Es una de las fotos más valiosas para determinar la composición de la cubierta. |
| **Cómo hacer la fotografía** | "Si tienes acceso al espacio bajo el tejado (un desván, un trastero en el ático, o un falso techo practicable), haz una foto que muestre la cara inferior de la cubierta: las vigas, el material entre las vigas (si hay aislamiento), y el material bajo las tejas." |
| **Qué debe verse** | Las vigas de la cubierta, el material entre las vigas (aislamiento de lana mineral, poliestireno, o ningún material), el material bajo las tejas (rastreles, tablero, lámina), y el estado (humedades, excrementos de animales, moho). |
| **Qué errores evitar** | Foto borrosa (la poca luz del desván puede dar fotos movidas). Usar flash con cuidado (puede saturar los detalles cercanos y dejar el fondo oscuro). No entrar si no es seguro (suelo irregular, altura insuficiente, peligro de caídas). |
| **Qué puede deducir el Arquitecto Técnico** | Presencia y espesor del aislamiento (D2). Tipo de aislamiento (lana mineral → fibroso; poliestireno → placas rígidas blancas). Estado de la cubierta (D3-D6): humedades en la cara inferior indican filtraciones. |
| **Nivel de confianza** | Muy alta (95%) si el interior del ático es accesible y visible. |
| **Casos donde sigue siendo necesaria revisión manual** | Espacios bajo cubierta no accesibles (áticos no habitables sin acceso, cubiertas sin cámara de aire). Aislamiento oculto por un falso techo (no se puede verificar su presencia ni espesor). |

---

**F-032** — Junta de dilatación o encuentro de cubierta con peto

| Campo | Descripción |
|-------|-------------|
| **Código** | F-032 |
| **Nombre** | Junta de dilatación de la cubierta o encuentro con el peto |
| **Objetivo técnico** | Evaluar el estado de las juntas de dilatación y los encuentros de la cubierta con elementos verticales (petos, chimeneas), que son puntos críticos de filtración. |
| **Variable CE3X relacionada** | D3-D6 (Estado de cubierta) |
| **Prioridad** | Media (si el cliente tiene acceso a la cubierta) |
| **Cuándo solicitarla** | Si el cliente puede acceder a la cubierta y ve juntas o encuentros. |
| **Cómo hacer la fotografía** | "Si estás en la azotea, busca las juntas de dilatación (son líneas de separación en el suelo de la cubierta) y los encuentros de la cubierta con las paredes (petos) o con chimeneas. Haz una foto de cerca que muestre si la junta está sellada y en buen estado." |
| **Qué debe verse** | La junta (sellada, abierta, con materiales degradados), el encuentro con el peto (impermeabilización levantada, sellado deteriorado), y cualquier señal de filtración (manchas, eflorescencias). |
| **Qué errores evitar** | Foto borrosa o con poca luz. No mostrar el estado del sellado (demasiado lejos). |
| **Qué puede deducir el Arquitecto Técnico** | Estado de la impermeabilización (D4): si las juntas están abiertas o el sellado está deteriorado, hay alto riesgo de filtración. |
| **Nivel de confianza** | Alta (85%) si la foto muestra claramente la junta. |
| **Casos donde sigue siendo necesaria revisión manual** | Cubiertas no accesibles. Juntas que parecen en buen estado pero tienen defectos internos no visibles. |

---

#### BLOQUE 7: SUELOS Y FORJADOS

---

**F-033** — Suelo interior (material de acabado)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-033 |
| **Nombre** | Suelo interior de la vivienda (acabado: tarima, gres, mármol, parquet) |
| **Objetivo técnico** | Identificar el material del suelo (afecta a la inercia térmica y a la transmitancia del forjado). |
| **Variable CE3X relacionada** | E1 (Tipo de suelo), E2-E5 (Composición del suelo) |
| **Prioridad** | Media |
| **Cuándo solicitarla** | Durante la ronda de fotos del interior (F-006). |
| **Cómo hacer la fotografía** | "Haz una foto del suelo de cada habitación desde un ángulo que muestre el material: si es tarima (madera), gres (baldosas de cerámica), mármol, parquet, o moqueta." |
| **Qué debe verse** | El patrón del suelo (baldosas, lamas de madera), el material (cerámica, madera, piedra), y el color. |
| **Qué errores evitar** | Foto con flash (el suelo puede reflejar y no se ve el material). Foto muy cerca (no se ve el patrón general). Foto con una alfombra que oculta el suelo. |
| **Qué puede deducir el Arquitecto Técnico** | Material del suelo (E1): tarima/parquet → madera (baja inercia térmica). Gres/mármol → cerámica/piedra (alta inercia térmica). Moqueta → baja inercia, pero añade resistencia térmica superficial. La inercia térmica afecta a cómo responde la vivienda a los cambios de temperatura. |
| **Nivel de confianza** | Muy alta (95%) si la foto muestra claramente el material. |
| **Casos donde sigue siendo necesaria revisión manual** | Suelos bajo alfombras o muebles fijos (no se ve el material real). Suelos de materiales compuestos (vinilo, linóleo) que pueden confundirse con madera o piedra. |

---

**F-034** — Junta perimetral suelo-pared

| Campo | Descripción |
|-------|-------------|
| **Código** | F-034 |
| **Nombre** | Junta perimetral entre el suelo y la pared (esquina de la habitación) |
| **Objetivo técnico** | Estimar el espesor del forjado (suelo) viendo el encuentro con la pared. Detectar posibles puentes térmicos en el perímetro. |
| **Variable CE3X relacionada** | E1 (Tipo de suelo), E2-E5 (Composición del suelo) |
| **Prioridad** | Baja (es difícil ver el espesor del forjado desde el interior) |
| **Cuándo solicitarla** | Solo si hay un rodapié desmontado o una zona donde se vea el canto del forjado. |
| **Cómo hacer la fotografía** | "Si hay alguna zona donde se vea el canto del suelo (por ejemplo, donde el rodapié está desmontado, o en un hueco del suelo), haz una foto de cerca que muestre el espesor." |
| **Qué debe verse** | El espesor del forjado (desde el acabado del suelo hasta el techo del piso inferior), si es posible con una referencia de tamaño. |
| **Qué errores evitar** | Foto sin referencia de tamaño (no se puede estimar el espesor). |
| **Qué puede deducir el Arquitecto Técnico** | Espesor del forjado: 20-25cm → forjado unidireccional de bovedilla. 25-35cm → forjado reticular o losa maciza. |
| **Nivel de confianza** | Media (60%) porque rara vez se ve el espesor completo del forjado. |
| **Casos donde sigue siendo necesaria revisión manual** | Cuando no hay ninguna zona donde se vea el espesor del forjado. |

---

**F-035** — Espacio bajo la vivienda (sótano, garaje, cámara de aire)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-035 |
| **Nombre** | Espacio bajo la vivienda (sótano, garaje, cámara de aire) |
| **Objetivo técnico** | Identificar qué hay debajo de la vivienda (terreno, garaje, otra vivienda, cámara de aire) para determinar las pérdidas por el suelo. |
| **Variable CE3X relacionada** | E1 (Tipo de suelo), E6-E10 (Perímetro/resistencia del terreno) |
| **Prioridad** | Alta (si el cliente tiene acceso a un sótano o garaje bajo la vivienda) |
| **Cuándo solicitarla** | Si la vivienda está en planta baja y hay un sótano, garaje, o cámara de aire accesible. |
| **Cómo hacer la fotografía** | "Si debajo de tu casa hay un sótano, un garaje, o una cámara de aire, haz una foto del techo de ese espacio (que es el suelo de tu casa). También haz una foto del espacio en general para ver si está cerrado, ventilado, o si tiene aislamiento en el techo." |
| **Qué debe verse** | El techo del espacio inferior (cara inferior del forjado de la vivienda), el tipo de espacio (garaje, sótano, cámara de aire), la presencia de aislamiento en el techo, y el estado (humedades, ventilación). |
| **Qué errores evitar** | Foto borrosa (los sótanos suelen tener poca luz). Usar flash con cuidado. No entrar si no es seguro (sótanos en mal estado, riesgo de derrumbe). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de contacto con el terreno (E1): forjado sobre terreno (si no hay espacio bajo), forjado sobre garaje (espacio no calefactado), forjado sobre cámara de aire (espacio ventilado). La presencia de aislamiento en el techo del garaje/sótano mejora la transmitancia del suelo. |
| **Nivel de confianza** | Muy alta (95%) si el espacio es visible. |
| **Casos donde sigue siendo necesaria revisión manual** | Sótanos no accesibles (cerrados, con llave, inundados). Cámaras de aire sanitarias (espacio muy bajo, no accesible sin trampilla). |

---

#### BLOQUE 8: VENTANAS Y HUECOS

---

**F-036** — Marco de ventana desde el interior

| Campo | Descripción |
|-------|-------------|
| **Código** | F-036 |
| **Nombre** | Marco de la ventana desde el interior (mostrando el perfil completo) |
| **Objetivo técnico** | Identificar el material del marco (madera, aluminio, PVC, mixto), el tipo de perfil, y el estado de las juntas. |
| **Variable CE3X relacionada** | F1 (Tipo de ventana / Marco) |
| **Prioridad** | Esencial |
| **Cuándo solicitarla** | Durante la ronda de fotos del interior (F-006). Hacer una foto de cada tipo de ventana (si todas son iguales, basta con una). |
| **Cómo hacer la fotografía** | "Haz una foto a la ventana desde el interior, de frente, mostrando el marco completo (el perfil que rodea el vidrio). Incluye también el borde donde se encuentra con la pared (la junta). Si la ventana tiene la manilla de apertura, que se vea también." |
| **Qué debe verse** | El perfil del marco (sección, color, material), la junta entre el marco y la pared (burletes, sellado), la manilla y el mecanismo de apertura, y el acristalamiento. |
| **Qué errores evitar** | Foto desde un ángulo (el perfil se ve distorsionado). Foto con contraluz (el marco se ve oscuro). Foto muy cerca (solo se ve una parte del marco). Foto con cortinas o persianas que ocultan el marco. |
| **Qué puede deducir el Arquitecto Técnico** | Material del marco (F1): madera (veteado, color marrón), aluminio (perfiles metálicos delgados, generalmente blancos o grises), PVC (perfiles blancos más gruesos, aspecto plástico). Presencia de RPT en aluminio (F1): se ve como una línea oscura (poliamida) entre los perfiles interior y exterior. |
| **Nivel de confianza** | Muy alta (95%) si la foto muestra claramente el perfil. |
| **Casos donde sigue siendo necesaria revisión manual** | Marcos de materiales compuestos (madera-aluminio) donde el perfil interior es de madera y el exterior de aluminio (difícil de distinguir desde el interior). |

---

**F-037** — Marco de ventana desde el exterior

| Campo | Descripción |
|-------|-------------|
| **Código** | F-037 |
| **Nombre** | Marco de la ventana desde el exterior |
| **Objetivo técnico** | Confirmar el material del marco (especialmente importante en marcos mixtos madera-aluminio, donde el exterior puede ser de aluminio y el interior de madera). |
| **Variable CE3X relacionada** | F1 (Tipo de ventana / Marco) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Si el marco interior no permite identificar el material (ej. perfil pintado que no se distingue). |
| **Cómo hacer la fotografía** | "Desde la calle, haz una foto de la ventana desde el exterior que muestre el marco. Acércate lo suficiente (usa el zoom) para que se vea el perfil." |
| **Qué debe verse** | El perfil del marco desde el exterior, el color, y si hay algún elemento distintivo (RPT, junquillo, bisagras). |
| **Qué errores evitar** | Foto con mucho zoom (puede salir borrosa). Foto con sol frontal (deslumbramiento). |
| **Qué puede deducir el Arquitecto Técnico** | Confirmación del material (F1). En marcos mixtos, el exterior suele ser de aluminio y el interior de madera (se ve la diferencia de material entre F-036 y F-037). |
| **Nivel de confianza** | Alta (85%) si el zoom es suficiente para ver el perfil. |
| **Casos donde sigue siendo necesaria revisión manual** | Ventanas en pisos muy altos donde el marco exterior no es visible ni con zoom. |

---

**F-038** — Detalle del perfil del marco (sección visible)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-038 |
| **Nombre** | Detalle del perfil del marco (sección visible con la ventana entreabierta) |
| **Objetivo técnico** | Identificar el número de cámaras del perfil (en PVC) o la presencia de RPT (en aluminio). |
| **Variable CE3X relacionada** | F1 (Tipo de ventana / Marco), F3 (Transmitancia del hueco) |
| **Prioridad** | Media (si el cliente puede hacerla fácilmente) |
| **Cuándo solicitarla** | Si la ventana es de PVC o aluminio, y se puede abrir ligeramente para ver la sección del perfil. |
| **Cómo hacer la fotografía** | "Abre un poco la ventana (unos centímetros, como para ventilar) y haz una foto del perfil del marco desde el lado de la bisagra, donde se ve la sección (el corte). Tiene que verse el interior del perfil, si tiene varias cámaras (en PVC) o una banda de plástico entre dos metales (RPT en aluminio)." |
| **Qué debe verse** | La sección del perfil: en PVC, se ven las cámaras internas (2, 3, 4, 5 o más cámaras). En aluminio con RPT, se ve una banda de poliamida (plástico oscuro) entre los perfiles interior y exterior. |
| **Qué errores evitar** | Foto borrosa (la sección es pequeña). Foto con flash (el perfil puede saturarse). No abrir la ventana del todo (solo entreabrir). |
| **Qué puede deducir el Arquitecto Técnico** | Calidad del marco (F1): 2 cámaras en PVC → perfil básico (U ≈ 2.0-2.5 W/m²·K). 3-4 cámaras → perfil medio (U ≈ 1.5-2.0). 5+ cámaras → perfil de alta eficiencia (U ≈ 1.2-1.5). RPT en aluminio → U ≈ 3.0-4.0 (vs. 5.0-6.0 sin RPT). |
| **Nivel de confianza** | Alta (85%) si la sección es claramente visible. |
| **Casos donde sigue siendo necesaria revisión manual** | Perfiles de madera (no tienen sección de cámara visible). Perfiles de aluminio sin RPT (la sección es un perfil hueco simple). |

---

**F-039** — Vidrio de la ventana (marcas, serigrafías, pegatinas)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-039 |
| **Nombre** | Marcas, serigrafías, o pegatinas en el vidrio de la ventana |
| **Objetivo técnico** | Identificar el tipo de vidrio (simple, doble, triple, bajo emisivo) mediante las marcas del fabricante en el vidrio o en el perfil separador. |
| **Variable CE3X relacionada** | F2 (Tipo de acristalamiento), F3 (Transmitancia del hueco), F4 (Factor solar) |
| **Prioridad** | Esencial |
| **Cuándo solicitarla** | Durante la ronda de fotos de ventanas. Es la foto más valiosa para identificar el acristalamiento. |
| **Cómo hacer la fotografía** | "Mira el vidrio de la ventana desde el interior. Busca marcas escritas en el propio vidrio (suelen estar en una esquina, serigrafiadas en blanco), o pegatinas en el marco o en el vidrio. También busca en el perfil separador (la pieza metálica entre los vidrios) algún número o marca. Haz una foto de cerca con el móvil bien enfocado." |
| **Qué debe verse** | Las marcas en el vidrio (suelen incluir: marca del fabricante, tipo de vidrio, espesor, fecha de fabricación, norma UNE). La pegatina de la ventana (suele tener: marca, modelo, fecha de instalación, características técnicas). El perfil separador (la pieza entre los vidrios, con su espesor visible). |
| **Qué errores evitar** | Foto borrosa (el texto es muy pequeño). Usar flash (el reflejo en el vidrio oculta las marcas). Poner el dedo en la marca (tapa el texto). Olvidar la esquina donde suele estar la serigrafía (esquina inferior derecha normalmente). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de vidrio (F2): "4/12/4" → doble acristalamiento de 4mm vidrio + 12mm cámara + 4mm vidrio. "Low-E" o "Bajo Emisivo" → vidrio con capa baja emisiva. "4/12Ar/4" → cámara de argón. "3 vidrios" → triple acristalamiento. Factor solar (F4): si la marca incluye "g=0.6" o similar, es el factor solar. |
| **Nivel de confianza** | Muy alta (98%) si la marca es legible. |
| **Casos donde sigue siendo necesaria revisión manual** | Vidrios sin marcas visibles (muchos vidrios no tienen serigrafía). Ventanas muy antiguas (<1990) que no tienen marcado CE. |

---

**F-040** — Perfil separador del doble acristalamiento

| Campo | Descripción |
|-------|-------------|
| **Código** | F-040 |
| **Nombre** | Perfil separador (la pieza metálica entre los vidrios del doble acristalamiento) |
| **Objetivo técnico** | Medir el espesor de la cámara de aire (o argón) entre los vidrios, que determina la transmitancia térmica del acristalamiento. |
| **Variable CE3X relacionada** | F2 (Tipo de acristalamiento), F3 (Transmitancia del hueco) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Si no se encuentran marcas en el vidrio (F-039), el perfil separador es la mejor alternativa. |
| **Cómo hacer la fotografía** | "Mira el borde del vidrio donde se ve la pieza metálica (plateada o negra) que separa los dos vidrios. Haz una foto de cerca para que se vea el espesor de esa pieza metálica. Pon una regla o moneda al lado para referencia." |
| **Qué debe verse** | El perfil separador (la pieza entre los vidrios), su espesor (4, 6, 9, 12, 15, 20mm), y el material (aluminio plateado, acero inoxidable, o "borde caliente" negro). |
| **Qué errores evitar** | Foto borrosa (el separador es fino). Sin referencia de tamaño (el espesor no se puede medir). Confundir el separador con la junta de estanqueidad (el separador está entre los vidrios, no en el borde exterior). |
| **Qué puede deducir el Arquitecto Técnico** | Espesor de la cámara (F2): 6mm → cámara pequeña (U ≈ 3.5). 9mm → cámara media (U ≈ 3.1). 12mm → cámara estándar (U ≈ 2.8). 15mm → cámara grande (U ≈ 2.7). 20mm → cámara muy grande (U ≈ 2.6). U_vidrio correspondiente para doble acristalamiento con aire. |
| **Nivel de confianza** | Alta (85%) si el espesor del separador es medible. |
| **Casos donde sigue siendo necesaria revisión manual** | Separador de "borde caliente" (el material negro no permite ver el espesor real de la cámara). Ventanas con triple acristalamiento (tienen dos separadores, uno para cada cámara). |

---

**F-041** — Esquina de la ventana (espesor total del acristalamiento)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-041 |
| **Nombre** | Esquina de la ventana mostrando el espesor total del acristalamiento |
| **Objetivo técnico** | Ver el número de vidrios (simple, doble, triple) midiendo el espesor total desde el borde. |
| **Variable CE3X relacionada** | F2 (Tipo de acristalamiento) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Si no hay marcas ni separador visible (F-039, F-040). |
| **Cómo hacer la fotografía** | "Haz una foto a la esquina de la ventana donde se vea el canto del vidrio. Tiene que verse el borde del vidrio (el espesor total) y si hay un solo vidrio, dos vidrios separados, o tres. Pon una regla o moneda al lado." |
| **Qué debe verse** | El borde del acristalamiento (el espesor total), el número de vidrios (si se ve la separación entre ellos), y el espesor del marco que rodea el vidrio. |
| **Qué errores evitar** | Foto borrosa (el borde es fino). Sin referencia de tamaño. Foto solo del marco (no del vidrio). |
| **Qué puede deducir el Arquitecto Técnico** | Número de vidrios (F2): un solo vidrio → simple (espesor 3-6mm). Dos vidrios con separación → doble (espesor total 15-28mm). Tres vidrios → triple (espesor >30mm). |
| **Nivel de confianza** | Alta (85%) si el borde es visible y hay referencia de tamaño. |
| **Casos donde sigue siendo necesaria revisión manual** | Acristalamientos con perfil de marco ancho que oculta el borde del vidrio. |

---

**F-042** — Detalle del perfil separador (medición precisa)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-042 |
| **Nombre** | Medición del perfil separador con cinta métrica o regla |
| **Objetivo técnico** | Obtener la medida exacta del espesor de la cámara de aire (en mm). |
| **Variable CE3X relacionada** | F2 (Tipo de acristalamiento) |
| **Prioridad** | Media (si el cliente tiene cinta métrica) |
| **Cuándo solicitarla** | Si el cliente está dispuesto a medir con precisión. |
| **Cómo hacer la fotografía** | "Pon una regla o cinta métrica al lado del perfil separador (la pieza metálica entre los vidrios) y haz una foto de cerca que muestre la medida." |
| **Qué debe verse** | La cinta métrica/regla al lado del separador, la medida en mm, y el separador completo. |
| **Qué errores evitar** | Medir desde el borde exterior del marco (no es el espesor del separador). Cinta métrica torcida (la medida no es precisa). |
| **Qué puede deducir el Arquitecto Técnico** | Espesor exacto de la cámara (F2), que permite calcular U_vidrio con precisión. |
| **Nivel de confianza** | Muy alta (95%) si la medición es correcta. |
| **Casos donde sigue siendo necesaria revisión manual** | No suele ser necesaria si la medición es correcta. |

---

**F-043** — Todas las ventanas de la vivienda (para verificar uniformidad)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-043 |
| **Nombre** | Conjunto de todas las ventanas de la vivienda (una foto de cada una) |
| **Objetivo técnico** | Verificar que todas las ventanas son del mismo tipo o identificar diferencias (posible sustitución progresiva). |
| **Variable CE3X relacionada** | F13-F18 (Huecos por orientación) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Durante la ronda de fotos del interior. Hacer una foto de cada ventana de la vivienda. |
| **Cómo hacer la fotografía** | "Haz una foto de cada ventana de la casa desde el interior, de frente, como la foto F-036. Si hay alguna ventana diferente (más pequeña, de otro material, de otro color), dímelo." |
| **Qué debe verse** | Cada ventana completa, con su marco y vidrio visibles. |
| **Qué errores evitar** | Olvidar alguna ventana (especialmente las de baños y cocina, que pueden ser diferentes). |
| **Qué puede deducir el Arquitecto Técnico** | Uniformidad de las ventanas (F13-F18): si todas son del mismo tipo, se puede asignar el mismo valor U a todas. Si alguna es diferente, debe tratarse por separado. |
| **Nivel de confianza** | Muy alta (95%) si se fotografían todas. |
| **Casos donde sigue siendo necesaria revisión manual** | Cuando hay muchas ventanas (>10) y es difícil verificar todas. |

---

**F-044** — Medición de ventana con cinta métrica (ancho)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-044 |
| **Nombre** | Medición del ancho de la ventana con cinta métrica |
| **Objetivo técnico** | Obtener la dimensión exacta del ancho del hueco (no del marco). |
| **Variable CE3X relacionada** | F5 (Dimensiones de las ventanas) |
| **Prioridad** | Alta (especialmente importante si la superficie de ventanas es grande) |
| **Cuándo solicitarla** | Si el cliente tiene cinta métrica y está dispuesto a medir. Si no, usar F-048 (referencia visual). |
| **Cómo hacer la fotografía** | "Mide el ancho del hueco de la ventana (el agujero en la pared, no el marco). Pon la cinta métrica de lado a lado, por dentro del marco, y haz una foto que muestre la medida." |
| **Qué debe verse** | La cinta métrica extendida de lado a lado del hueco, la medida en cm o metros, y el hueco completo (para confirmar que se mide el ancho correcto). |
| **Qué errores evitar** | Medir el marco exterior (no el hueco). Cinta métrica torcida. Medir solo la parte de vidrio (no el hueco completo). |
| **Qué puede deducir el Arquitecto Técnico** | Ancho exacto del hueco (F5), que se usa para calcular la superficie de la ventana. |
| **Nivel de confianza** | Muy alta (98%) si la medición es correcta. |
| **Casos donde sigue siendo necesaria revisión manual** | Ventanas de geometría no rectangular (arcos, círculos). |

---

**F-045** — Medición de ventana con cinta métrica (alto)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-045 |
| **Nombre** | Medición del alto de la ventana con cinta métrica |
| **Objetivo técnico** | Obtener la dimensión exacta del alto del hueco. |
| **Variable CE3X relacionada** | F5 (Dimensiones de las ventanas) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Junto con F-044. |
| **Cómo hacer la fotografí** | "Mide el alto del hueco de la ventana (de arriba a abajo, por dentro del marco). Pon la cinta métrica de arriba a abajo y haz una foto que muestre la medida." |
| **Qué debe verse** | La cinta métrica de arriba a abajo, la medida, y el hueco completo. |
| **Qué errores evitar** | Mismos que F-044. |
| **Nivel de confianza** | Muy alta (98%). |
| **Casos donde sigue siendo necesaria revisión manual** | Mismos que F-044. |

---

**F-046** — Referencia de tamaño para ventana (sin cinta métrica)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-046 |
| **Nombre** | Ventana con referencia de tamaño conocida (persona, puerta, azulejo, cama) |
| **Objetivo técnico** | Estimar las dimensiones de la ventana cuando no se dispone de cinta métrica. |
| **Variable CE3X relacionada** | F5 (Dimensiones de las ventanas) |
| **Prioridad** | Alta (si no se puede medir) |
| **Cuándo solicitarla** | Si el cliente no tiene cinta métrica. |
| **Cómo hacer la fotografía** | "Ponte al lado de la ventana (de pie, cuerpo entero) y pide que te hagan una foto desde unos 3 metros de distancia. La ventana y tú tenéis que salir completos en la foto. Si no hay otra persona, usa una puerta (que mide 2 metros de alto) o una cama (1.50 o 1.90m)." |
| **Qué debe verse** | La ventana completa y la referencia de tamaño (persona, puerta, cama, azulejo) al lado o debajo. |
| **Qué errores evitar** | Persona sentada (no se puede estimar la altura). Persona demasiado cerca de la ventana (oculta parte). Foto con gran angular (distorsiona las proporciones). |
| **Qué puede deducir el Arquitecto Técnico** | Dimensiones estimadas (F5): una persona de 1.70m permite escalar la altura de la ventana. Una puerta estándar (2.00-2.10m × 0.70-0.80m) también sirve como referencia. |
| **Nivel de confianza** | Alta (80%) si la referencia es clara y la foto no está distorsionada. |
| **Casos donde sigue siendo necesaria revisión manual** | Ventanas muy grandes (>2.5m) o muy pequeñas (<0.5m) donde la referencia no escala bien. Ventanas con geometría no rectangular. |

---

**F-047** — Sombra de la ventana (desde el exterior, mostrando obstáculos)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-047 |
| **Nombre** | Ventana desde el exterior mostrando los obstáculos que le dan sombra |
| **Objetivo técnico** | Evaluar el factor de sombra del hueco (F_obst) por obstáculos externos. |
| **Variable CE3X relacionada** | F6 (Factor de sombra del hueco) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Durante la ronda de fotos de fachada. |
| **Cómo hacer la fotografía** | "Desde la calle, haz una foto de cada ventana que muestre los obstáculos que pueden darle sombra: el edificio de enfrente, un árbol, un toldo del vecino de arriba. La ventana debe verse en la foto junto con el obstáculo." |
| **Qué debe verse** | La ventana y el obstáculo en la misma imagen, con suficiente distancia para ver la relación espacial. |
| **Qué errores evitar** | Foto solo del obstáculo sin la ventana. Foto en un momento del día sin sombra (hacerla cuando el obstáculo proyecta sombra sobre la ventana). |
| **Qué puede deducir el Arquitecto Técnico** | Factor de sombra (F6) por obstáculos externos. Un edificio de enfrente más alto que la ventana → factor <0.5 (sombra permanente). Un árbol de hoja caduca → factor ~0.7 en verano, ~0.9 en invierno. |
| **Nivel de confianza** | Media (70%) porque la sombra efectiva depende de la hora y la estación. |
| **Casos donde sigue siendo necesaria revisión manual** | Obstáculos que cambian con las estaciones (árboles de hoja caduca). Múltiples obstáculos que se combinan. |

---

**F-048** — Ventana desde el interior (protección solar interior)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-048 |
| **Nombre** | Ventana desde el interior mostrando las protecciones solares interiores (cortinas, estores) |
| **Objetivo técnico** | Identificar si hay protecciones solares interiores (cortinas opacas, estores, persianas venecianas) que reducen las ganancias solares. |
| **Variable CE3X relacionada** | F6 (Factor de sombra del hueco) |
| **Prioridad** | Media |
| **Cuándo solicitarla** | Junto con F-036 (marco interior). |
| **Cómo hacer la fotografía** | "Haz una foto de la ventana desde el interior mostrando las cortinas o estores. Si tienes persianas, baja un poco la persiana para que se vea en la foto." |
| **Qué debe verse** | La cortina/estor/persiana, el tipo de material (tela opaca, tela semitransparente, lamas de aluminio, persiana de PVC), y el grado de cobertura (si cubre toda la ventana o solo parte). |
| **Qué errores evitar** | Foto de la cortina cerrada (no se ve la ventana ni el tipo de cortina). Foto con la cortina recogida (no se ve su efecto). |
| **Qué puede deducir el Arquitecto Técnico** | Factor de sombra adicional (F6) por protecciones interiores. Cortina opaca cerrada → factor ~0.3-0.5. Estor semitransparente → factor ~0.6-0.8. Persiana de lamas orientables → factor variable (0.3-0.7 según el ángulo). |
| **Nivel de confianza** | Alta (85%) si se ve el tipo de protección y su uso habitual. |
| **Casos donde sigue siendo necesaria revisión manual** | No suele ser necesaria si la protección interior es claramente visible. |

---

#### BLOQUE 9: PUERTAS Y BURLETES

---

**F-049** — Detalle de burletes de la ventana

| Campo | Descripción |
|-------|-------------|
| **Código** | F-049 |
| **Nombre** | Detalle de los burletes (gomas) de la ventana |
| **Objetivo técnico** | Verificar el estado de las juntas de estanqueidad, que determinan la permeabilidad al aire de la ventana (F7). |
| **Variable CE3X relacionada** | F7 (Permeabilidad al aire), F9 (Estado de juntas y burletes) |
| **Prioridad** | Media |
| **Cuándo solicitarla** | Si el cliente nota corrientes de aire alrededor de las ventanas, o si las ventanas son antiguas. |
| **Cómo hacer la fotografía** | "Abre la ventana y haz una foto de las gomas (burletes) que hay alrededor del marco. Tienen que verse si están en buen estado (flexibles, completas) o si están rotas, duras, o faltan trozos." |
| **Qué debe verse** | El burlete (goma) en todo su recorrido, su estado (flexible, quebradizo, roto, ausente), y si está bien adherido al marco. |
| **Qué errores evitar** | Foto borrosa (los burletes son finos). Foto solo de un trozo (no del recorrido completo). No se ve si el burlete está despegado o roto. |
| **Qué puede deducir el Arquitecto Técnico** | Permeabilidad al aire (F7): burletes en buen estado → Clase 3-4 (baja permeabilidad). Burletes deteriorados o ausentes → Clase 1-2 (alta permeabilidad). Estado de las juntas (F9). |
| **Nivel de confianza** | Alta (85%) si los burletes son claramente visibles. |
| **Casos donde sigue siendo necesaria revisión manual** | Burletes integrados en el perfil del marco (no visibles exteriormente). Ventanas correderas (los burletes son diferentes y más difíciles de evaluar). |

---

**F-050** — Tipo de apertura de la ventana

| Campo | Descripción |
|-------|-------------|
| **Código** | F-050 |
| **Nombre** | Tipo de apertura de la ventana (abatible, oscilobatiente, corredera, pivotante) |
| **Objetivo técnico** | Identificar el sistema de apertura, que determina la estanqueidad y la permeabilidad al aire. |
| **Variable CE3X relacionada** | F8 (Tipo de apertura) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Durante la ronda de fotos de ventanas. |
| **Cómo hacer la fotografí** | "Abre la ventana y haz una foto que muestre cómo se abre: si se abre hacia dentro (abatible), si se inclina hacia dentro (oscilobatiente), si se desplaza lateralmente (corredera), o si gira sobre un eje (pivotante)." |
| **Qué debe verse** | La ventana abierta, el mecanismo de apertura (bisagras, guías, raíles), y la dirección de apertura (hacia dentro, hacia fuera, lateral). |
| **Qué errores evitar** | Foto de la ventana cerrada (no se ve el tipo de apertura). Foto solo de la bisagra (no se ve el movimiento completo). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de apertura (F8): abatible → mejor estanqueidad (Clase 3-4). Oscilobatiente → muy buena estanqueidad (Clase 4). Corredera → peor estanqueidad (Clase 1-3). Pivotante → estanqueidad variable. |
| **Nivel de confianza** | Muy alta (95%) si la ventana aparece abierta en la foto. |
| **Casos donde sigue siendo necesaria revisión manual** | Ventanas que no se pueden abrir (bloqueadas, pintadas, atascadas). |

---

**F-051** — Puerta de entrada a la vivienda

| Campo | Descripción |
|-------|-------------|
| **Código** | F-051 |
| **Nombre** | Puerta de entrada a la vivienda (material, espesor, burletes) |
| **Objetivo técnico** | Identificar el tipo de puerta de acceso, su material, y su estanqueidad (pérdidas por infiltración). |
| **Variable CE3X relacionada** | F12 (Puertas de acceso) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Durante la ronda de fotos del interior. |
| **Cómo hacer la fotografí** | "Haz una foto de la puerta de entrada de tu casa desde el interior. Muestra la puerta completa, el marco, y los burletes (las gomas alrededor). Si tiene mirilla o ventana, que se vea también." |
| **Qué debe verse** | La puerta completa (altura, ancho), el material (madera maciza, madera hueca, metal, PVC), los burletes (gomas en el marco), la mirilla o ventana (si tiene acristalamiento), y el estado general. |
| **Qué errores evitar** | Foto desde el exterior (no se ve el interior de la puerta ni los burletes). Foto muy cerca (solo se ve una parte). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de puerta (F12): madera maciza → buena estanqueidad, poca pérdida. Madera hueca → baja estanqueidad. Metal con aislamiento → buena estanqueidad. Presencia de burletes → mejor estanqueidad. |
| **Nivel de confianza** | Alta (85%) si la puerta es claramente visible. |
| **Casos donde sigue siendo necesaria revisión manual** | Puertas con ventanas o paneles acristalados (la superficie de vidrio de la puerta debe considerarse como un hueco). |

---

**F-052** — Puerta de terraza o balcón (si no es acristalada)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-052 |
| **Nombre** | Puerta de terraza o balcón (si es de paso, no acristalada) |
| **Objetivo técnico** | Identificar el tipo de puerta de terraza/balcón, que es parte de la envolvente. |
| **Variable CE3X relacionada** | F12 (Puertas de acceso) |
| **Prioridad** | Media (si existe) |
| **Cuándo solicitarla** | Si la vivienda tiene terraza o balcón con puerta de paso (no acristalada). |
| **Cómo hacer la fotografía** | "Haz una foto de la puerta de la terraza o del balcón desde el interior. Muestra el material, si tiene burletes, y si tiene algún acristalamiento." |
| **Qué debe verse** | La puerta completa, su material, los burletes, y si tiene vidrio o es completamente opaca. |
| **Qué errores evitar** | Confundir con una ventana-balconera (si es acristalada, es un hueco F1-F2, no una puerta F12). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de puerta (F12) y su contribución a las pérdidas por infiltración. |
| **Nivel de confianza** | Alta (85%) si la puerta es visible. |
| **Casos donde sigue siendo necesaria revisión manual** | Puertas correderas de terraza (difíciles de sellar, alta permeabilidad). |

---

#### BLOQUE 10: PUENTES TÉRMICOS

---

**F-053** — Esquina interior de la vivienda (posible condensación)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-053 |
| **Nombre** | Esquina interior de una habitación exterior (posible moho por puente térmico) |
| **Objetivo técnico** | Detectar moho o condensación en las esquinas, que indican puentes térmicos significativos. |
| **Variable CE3X relacionada** | G1 (Puentes térmicos en fachada), G5 (Esquinas de fachada) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Durante la ronda de fotos del interior (F-006). Especialmente en habitaciones que dan al exterior (no medianeras). |
| **Cómo hacer la fotografía** | "Haz una foto de cada esquina de las habitaciones que dan al exterior. Si hay moho negro o manchas de humedad en la esquina, haz una foto de cerca. Si no hay nada, también haz una foto general de la esquina." |
| **Qué debe verse** | La esquina completa (paredes y techo), el estado (moho negro, manchas, pintura desprendida, o sin defectos), y la localización (esquina exterior o medianera). |
| **Qué errores evitar** | Foto borrosa (el moho puede ser sutil). Foto con flash (el moho puede no verse bien). No fotografiar las esquinas que están ocultas por muebles. |
| **Qué puede deducir el Arquitecto Técnico** | Presencia de puente térmico (G1): si hay moho en una esquina exterior, la temperatura superficial de la esquina es inferior al punto de rocío, lo que indica que el puente térmico es significativo. Sin moho → el puente térmico puede ser moderado o el cliente ventila adecuadamente. |
| **Nivel de confianza** | Alta (85%) si el moho es visible. |
| **Casos donde sigue siendo necesaria revisión manual** | Moho detrás de muebles (no visible). Esquinas sin moho pero con puentes térmicos moderados (no visibles pero presentes). Mediciones termográficas para cuantificar. |

---

**F-054** — Caja de persiana (desde el interior)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-054 |
| **Nombre** | Caja de persiana desde el interior (visible desde el techo o desde un armario) |
| **Objetivo técnico** | Evaluar el aislamiento y la estanqueidad de la caja de persiana, uno de los puentes térmicos más comunes. |
| **Variable CE3X relacionada** | G6 (Cajas de persiana) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Si la caja de persiana es visible (generalmente está sobre la ventana, oculta por un falso techo o un armario). |
| **Cómo hacer la fotografía** | "Si ves la caja de la persiana (el hueco donde se enrolla la persiana, sobre la ventana), haz una foto de cerca. Tiene que verse si tiene aislamiento, si deja pasar la luz, y si hay corriente de aire." |
| **Qué debe verse** | La caja de persiana (abierta o con la tapa desmontada si es posible), el interior (aislamiento, mecanismo, poleas), la estanqueidad (si se ve luz exterior, si hay corrientes de aire). |
| **Qué errores evitar** | Foto borrosa (el interior de la caja suele ser oscuro). Usar flash con cuidado. No desmontar nada que no se pueda volver a montar (si la tapa está fija, no forzarla). |
| **Qué puede deducir el Arquitecto Técnico** | Calidad de la caja de persiana (G6): caja con aislamiento (poliestireno o lana mineral) → puente térmico reducido (ψ ≈ 0.10-0.15). Caja sin aislamiento → puente térmico significativo (ψ ≈ 0.20-0.30). Caja que deja pasar luz o aire → puente térmico grave (ψ > 0.30). |
| **Nivel de confianza** | Alta (85%) si el interior de la caja es visible. |
| **Casos donde sigue siendo necesaria revisión manual** | Cajas de persiana no accesibles (ocultas por falso techo, armarios empotrados, o tabiquería). Cajas de persiana motorizadas (el mecanismo puede ocupar espacio y no se ve el aislamiento). |

---

**F-055** — Junta entre pared y techo

| Campo | Descripción |
|-------|-------------|
| **Código** | F-055 |
| **Nombre** | Junta entre la pared y el techo en una habitación exterior |
| **Objetivo técnico** | Detectar grietas o fisuras en la junta, que pueden indicar movimientos estructurales o problemas de aislamiento. |
| **Variable CE3X relacionada** | G1 (Puentes térmicos), C12 (Estado de conservación) |
| **Prioridad** | Media |
| **Cuándo solicitarla** | Durante la ronda de fotos del interior. |
| **Cómo hacer la fotografía** | "Haz una foto de la junta entre la pared y el techo en una habitación exterior. Si hay una grieta o una separación, haz una foto de cerca." |
| **Qué debe verse** | La junta perimetral entre pared y techo, su estado (sin defectos, con grieta fina, con separación visible), y la localización (habitación exterior o interior). |
| **Qué errores evitar** | Foto borrosa. No indicar si es una habitación exterior o interior. |
| **Qué puede deducir el Arquitecto Técnico** | Posible movimiento estructural (grietas en la junta pueden indicar asentamientos). La junta entre pared y techo es también un punto crítico de puente térmico (G1) si el forjado atraviesa la fachada. |
| **Nivel de confianza** | Media (70%) porque las grietas finas pueden no ser visibles en fotos. |
| **Casos donde sigue siendo necesaria revisión manual** | Grietas no visibles superficialmente (ocultas por pintura o falso techo). |

---

**F-056** — Encuentro de fachada con forjado (exterior)

| Campo | Descripción |
|-------|-------------|
| **Código** | F-056 |
| **Nombre** | Encuentro de la fachada con el forjado (visible desde el exterior) |
| **Objetivo técnico** | Identificar el puente térmico de forjado (G2), que se manifiesta como una línea horizontal en la fachada donde el forjado atraviesa el cerramiento. |
| **Variable CE3X relacionada** | G2 (Encuentro fachada-forjado) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Durante la ronda de fotos de fachada. Especialmente importante en edificios sin SATE. |
| **Cómo hacer la fotografí** | "Desde la calle, haz una foto de la fachada donde se vean las líneas horizontales que marcan los pisos (los forjados). Si se ve una junta o una línea en la fachada a la altura de cada piso, haz una foto de cerca." |
| **Qué debe verse** | La línea horizontal del forjado en la fachada, la junta (si es visible), y el material del forjado (hormigón). |
| **Qué errores evitar** | Foto desde muy lejos (la línea del forjado no se ve). Foto con sol rasante (las sombras pueden ocultar la junta). |
| **Qué puede deducir el Arquitecto Técnico** | Presencia de puente térmico de forjado (G2): visible como una línea horizontal en la fachada. En edificios con SATE, el aislamiento continuo cubre el forjado y la línea no es visible (el puente térmico es mínimo). En edificios sin SATE, la línea del forjado es visible y el puente térmico es significativo. |
| **Nivel de confianza** | Alta (85%) si la línea del forjado es visible. |
| **Casos donde sigue siendo necesaria revisión manual** | Edificios con fachada ventilada (el forjado no es visible). Edificios con SATE (el aislamiento oculta el forjado). |

---

#### BLOQUE 11: CALEFACCIÓN

---

**H-001** — Equipo de calefacción (caldera, bomba de calor, estufa)

| Campo | Descripción |
|-------|-------------|
| **Código** | H-001 |
| **Nombre** | Equipo principal de calefacción (vista frontal mostrando marca y modelo) |
| **Objetivo técnico** | Identificar el tipo de equipo (caldera de gas, bomba de calor, estufa de pellets), la marca y el modelo. |
| **Variable CE3X relacionada** | H1 (Sistema de calefacción), H2 (Potencia), H3 (Rendimiento), H4 (Combustible) |
| **Prioridad** | Esencial |
| **Cuándo solicitarla** | Durante la ronda de fotos del interior. Buscar en la cocina (caldera mural), en el salón (split de bomba de calor), en el trastero (caldera de pie, estufa). |
| **Cómo hacer la fotografía** | "Haz una foto del equipo de calefacción desde unos 2 metros de distancia, de frente, mostrando toda la carcasa. Si es una caldera, que se vea la marca y el modelo (suelen estar escritos en la parte frontal). Si es un split, que se vea la unidad interior completa." |
| **Qué debe verse** | El equipo completo (marca y modelo visibles), el tipo de combustible (gas → tubería de gas visible; eléctrico → cable de alimentación; pellets → tolva visible), y el estado general (óxido, fugas, suciedad). |
| **Qué errores evitar** | Foto borrosa (la marca puede ser pequeña). Foto muy cerca (solo se ve una parte). Foto con la carcasa cerrada (no se ve el interior pero suele ser suficiente). No fotografiar el equipo si no se sabe qué es (preguntar primero al cliente). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de sistema (H1): caldera de gas (mural, con tuberías de gas y agua), bomba de calor (split con conductos de refrigerante), estufa de pellets (tolva visible, tubo de humos). Marca y modelo → permite buscar la ficha técnica para obtener potencia y rendimiento (H2, H3). |
| **Nivel de confianza** | Alta (90%) si la marca y modelo son visibles. Media (70%) si solo se ve el tipo de equipo. |
| **Casos donde sigue siendo necesaria revisión manual** | Calderas sin placa visible. Equipos antiguos donde la marca no es legible. Calefacción centralizada (el equipo no está en la vivienda). |

---

**H-002** — Emisores de calefacción (radiadores, splits, fancoils)

| Campo | Descripción |
|-------|-------------|
| **Código** | H-002 |
| **Nombre** | Emisores de calefacción en cada estancia |
| **Objetivo técnico** | Confirmar el tipo de sistema de distribución (agua, eléctrico, aire) y la presencia de emisores en cada estancia. |
| **Variable CE3X relacionada** | H5 (Sistema de distribución), H17 (Fracción calefactada) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Durante la ronda de fotos del interior (F-006). Incluir los emisores en las fotos de cada estancia. |
| **Cómo hacer la fotografía** | "Haz una foto del radiador o del aparato de calefacción de cada habitación. Si es un radiador de agua (panel blanco metálico), muestra toda su longitud. Si es un split, muestra la unidad completa en la pared. Si es suelo radiante, muestra el termostato o el manifold (colector)." |
| **Qué debe verse** | El emisor completo (radiador panel, toallero, split, fancoil), su tamaño (para estimar la potencia), el tipo (agua: tuberías de ida y retorno visibles; eléctrico: cable de alimentación; aire: conductos), y la ubicación en la estancia. |
| **Qué errores evitar** | Foto muy cerca (solo se ve una parte del radiador). Foto del radiador oculto por cortinas o muebles. No fotografiar los emisores de todas las estancias (puede faltar calefacción en algún sitio). |
| **Qué puede deducir el Arquitecto Técnico** | Sistema de distribución (H5): radiadores de agua → sistema de caldera o aerotermia. Splits → bomba de calor aire-aire. Radiadores eléctricos → calefacción eléctrica directa. Fancoils → sistema centralizado de agua. Suelo radiante → sistema de baja temperatura (caldera de condensación o aerotermia). |
| **Nivel de confianza** | Muy alta (95%) si los emisores son claramente visibles. |
| **Casos donde sigue siendo necesaria revisión manual** | Suelo radiante (difícil de verificar sin acceso al manifold o al termostato). Calefacción por conductos de aire (las rejillas de impulsión pueden confundirse con ventilación). |

---

**H-003** — Placa de características de la caldera (o del equipo de calefacción)

| Campo | Descripción |
|-------|-------------|
| **Código** | H-003 |
| **Nombre** | Placa de características del equipo de calefacción (datos técnicos) |
| **Objetivo técnico** | Obtener los datos técnicos del equipo: marca, modelo, potencia (kW), rendimiento (%), año de fabricación, tipo de combustible, y normativa aplicable. |
| **Variable CE3X relacionada** | H2 (Potencia), H3 (Rendimiento), H8 (Antigüedad), H4 (Combustible) |
| **Prioridad** | Esencial |
| **Cuándo solicitarla** | Junto con H-001. La placa suele estar en un lateral de la caldera, en la parte inferior, o detrás de una tapa abatible. |
| **Cómo hacer la fotografía** | "Busca la placa de características de la caldera. Suele ser una pegatina metálica o plástica en un lateral, en la parte de abajo, o detrás de una tapa. Haz una foto de cerca, con buena luz, para que el texto sea legible. Si la letra es muy pequeña, haz dos fotos: una general y otra con el zoom al máximo." |
| **Qué debe verse** | La placa completa: marca, modelo, número de serie, potencia nominal (kW), potencia térmica (kW), rendimiento (%), año de fabricación, tipo de gas (natural, propano, butano), presión de trabajo, y normas aplicables (CE, UNE). |
| **Qué errores evitar** | Foto borrosa (el texto suele ser pequeño y grabado en relieve). Foto con flash (el reflejo en la placa metálica hace ilegible el texto). Foto parcial (falta parte de la información: la potencia y el año son lo más importante). No limpiar la placa si está sucia (puede ser necesaria). |
| **Qué puede deducir el Arquitecto Técnico** | Potencia (H2): indicada en kW en la placa. Rendimiento (H3): a veces indicado directamente, o puede calcularse por el modelo y año. Antigüedad (H8): año de fabricación en la placa. Combustible (H4): tipo de gas o eléctrico. |
| **Nivel de confianza** | Muy alta (99%) si la placa es legible. |
| **Casos donde sigue siendo necesaria revisión manual** | Placa ilegible (desgastada, sucia, oxidada). Placa no accesible (caldera empotrada en un armario sin espacio para ver la placa). Equipos sin placa (muy antiguos o de fabricación artesanal). |

---

**H-004** — Termostato o programador de calefacción

| Campo | Descripción |
|-------|-------------|
| **Código** | H-004 |
| **Nombre** | Termostato ambiente o programador de calefacción |
| **Objetivo técnico** | Identificar el tipo de control (manual, programable, digital) y la temperatura de consigna. |
| **Variable CE3X relacionada** | H6 (Sistema de control) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Durante la ronda de fotos del interior. Buscar en el pasillo o salón (ubicación típica del termostato). |
| **Cómo hacer la fotografía** | "Busca el termostato de la calefacción en la pared. Haz una foto de cerca que muestre la pantalla (si tiene), los botones, y la marca. Si tiene programación, enciende la pantalla para que se vea la temperatura programada." |
| **Qué debe verse** | La pantalla (temperatura actual, temperatura programada, modo: calefacción/off/programado), los botones (tipo de control), la marca y modelo. |
| **Qué errores evitar** | Foto borrosa o con reflejos (la pantalla puede brillar). No encender la pantalla (no se ve la información). Confundir el termostato con un interruptor de luz. |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de control (H6): termostato simple → control básico. Termostato programable → permite ahorro energético. Termostato digital con Wi-Fi → sistema avanzado. Temperatura de consigna (B8): la temperatura programada visible en la pantalla. |
| **Nivel de confianza** | Alta (90%) si la pantalla es legible. |
| **Casos donde sigue siendo necesaria revisión manual** | Termostatos mecánicos (dial sin pantalla, difícil de leer). Sistemas de control centralizados (domótica) sin termostato visible en la vivienda. |

---

**H-005** — Depósito de combustible (gasóleo, propano, pellets)

| Campo | Descripción |
|-------|-------------|
| **Código** | H-005 |
| **Nombre** | Depósito de combustible (gasóleo, propano, pellets) |
| **Objetivo técnico** | Confirmar el tipo de combustible y estimar la capacidad del depósito. |
| **Variable CE3X relacionada** | H4 (Combustible), H1 (Sistema de calefacción) |
| **Prioridad** | Alta (si el combustible no es gas natural) |
| **Cuándo solicitarla** | Si el sistema de calefacción no es de gas natural (caldera de gasóleo, propano, pellets). |
| **Cómo hacer la fotografía** | "Haz una foto del depósito de combustible (gasóleo, propano, o pellets). Tiene que verse el tamaño del depósito, la marca, y el tipo de combustible (suele estar escrito en el depósito)." |
| **Qué debe verse** | El depósito completo (tamaño, forma), la etiqueta (tipo de combustible, capacidad), las conexiones (tuberías de llenado, salida), y el estado (óxido, fugas, suciedad). |
| **Qué errores evitar** | Foto borrosa (las etiquetas pueden ser pequeñas). Foto solo de una parte del depósito (no se ve la capacidad). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de combustible (H4): gasóleo C (color rojo en el depósito), propano (depósito esférico o cilíndrico, generalmente verde o blanco), pellets (silos o sacos). Capacidad del depósito → ayuda a estimar el consumo anual (un depósito de 1.000 litros de gasóleo → aproximadamente 10.000 kWh). |
| **Nivel de confianza** | Alta (90%) si la etiqueta del depósito es legible. |
| **Casos donde sigue siendo necesaria revisión manual** | Depósitos enterrados (no visibles). Depósitos sin etiqueta de capacidad. |

---

**H-006** — Etiqueta energética del equipo (si existe)

| Campo | Descripción |
|-------|-------------|
| **Código** | H-006 |
| **Nombre** | Etiqueta energética del equipo de calefacción o ACS |
| **Objetivo técnico** | Obtener la clasificación energética del equipo (A+++, A++, A+, A, B, C...) y los datos de eficiencia (COP, EER, rendimiento estacional). |
| **Variable CE3X relacionada** | H3 (Rendimiento), J3 (Rendimiento ACS) |
| **Prioridad** | Alta (si la etiqueta existe y es visible) |
| **Cuándo solicitarla** | Si el equipo tiene una etiqueta energética adhesiva visible (equipos nuevos suelen tenerla). |
| **Cómo hacer la fotografía** | "Busca la etiqueta energética del equipo (una pegatina rectangular con barras de colores y letras, como la de los electrodomésticos). Haz una foto de cerca con buena luz para que se lean todos los datos." |
| **Qué debe verse** | La etiqueta completa: clase energética (A+++, A++, etc.), consumo anual (kWh/año), capacidad (kW), COP o EER, nivel de ruido, y cualquier otro dato específico. |
| **Qué errores evitar** | Foto borrosa (la letra pequeña de la etiqueta es importante). Foto con flash (el papel satinado puede reflejar). |
| **Qué puede deducir el Arquitecto Técnico** | Rendimiento del equipo (H3, J3) directamente de la etiqueta. Por ejemplo, una caldera de condensación con clase A → η ≈ 90-94%. Una bomba de calor con clase A+++ → SCOP > 5.1. |
| **Nivel de confianza** | Muy alta (98%) si la etiqueta es legible. |
| **Casos donde sigue siendo necesaria revisión manual** | Equipos sin etiqueta energética visible (antiguos, o etiqueta retirada). Equipos donde la etiqueta está en otro idioma o no sigue la normativa europea. |

---

**H-007** — Factura de suministro (gas, electricidad, gasóleo)

| Campo | Descripción |
|-------|-------------|
| **Código** | H-007 |
| **Nombre** | Factura de suministro (gas, electricidad, o gasóleo) mostrando el consumo |
| **Objetivo técnico** | Obtener el consumo real de combustible para validar el cálculo de CE3X y detectar discrepancias. |
| **Variable CE3X relacionada** | H15 (Consumo de calefacción), H4 (Combustible), J4 (Consumo ACS) |
| **Prioridad** | Esencial |
| **Cuándo solicitarla** | Una vez que el cliente ha confirmado su participación. Es uno de los documentos más valiosos. |
| **Cómo hacer la fotografía** | "Haz una foto de tu factura de gas o electricidad. No necesito ver el importe ni tus datos personales (puedes taparlos con un papel). Lo que necesito ver es: el tipo de suministro (gas natural, electricidad), el consumo en kWh o m³, el periodo de facturación, y el CUP (Código Universal del Punto de Suministro)." |
| **Qué debe verse** | El tipo de suministro (gas natural, electricidad), el consumo del periodo (kWh para electricidad, kWh o m³ para gas), el periodo de facturación (fechas de inicio y fin), y el CUP o CUPS (identificador del punto de suministro). |
| **Qué errores evitar** | Foto borrosa (los números pueden ser pequeños). No tapar los datos personales si el cliente quiere privacidad (pero no tapar el consumo ni el CUP). Foto solo de una parte de la factura (el consumo suele estar en la segunda página). |
| **Qué puede deducir el Arquitecto Técnico** | Consumo real de gas/electricidad (H15): permite desglosar el consumo de calefacción (restando el consumo base de verano). Validación del cálculo de CE3X: si el consumo real es muy diferente al estimado, los datos de entrada pueden tener errores. |
| **Nivel de confianza** | Muy alta (98%) si la factura es legible y corresponde a un periodo completo. |
| **Casos donde sigue siendo necesaria revisión manual** | Facturas que no desglosan el consumo (tarifas planas). Facturas de comunidades de propietarios (calefacción centralizada) que no detallan el consumo individual. |

---

**H-008** — Contador de gas o electricidad

| Campo | Descripción |
|-------|-------------|
| **Código** | H-008 |
| **Nombre** | Contador de gas (o electricidad) mostrando la lectura actual |
| **Objetivo técnico** | Verificar el tipo de suministro (gas natural, electricidad) y obtener la lectura actual del contador (si no se dispone de factura). |
| **Variable CE3X relacionada** | H4 (Combustible), H15 (Consumo de calefacción) |
| **Prioridad** | Media (si no hay factura) |
| **Cuándo solicitarla** | Si el cliente no tiene acceso a las facturas (pago domiciliado, no recibe las facturas). |
| **Cómo hacer la fotografía** | "Haz una foto del contador de gas o electricidad. Suele estar en el portal, en la fachada exterior, o en un armario en la calle. Tiene que verse la lectura actual (los números) y el tipo de contador." |
| **Qué debe verse** | La lectura actual (números del contador), el tipo de contador (gas: unidad m³; electricidad: unidad kWh), y el número de serie del contador. |
| **Qué errores evitar** | Foto borrosa (los números son pequeños). Foto con flash (el reflejo en el cristal del contador puede ocultar los números). No confundir contador de gas con contador de agua (el de gas tiene una unidad en m³, el de agua en litros o m³). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de suministro (H4): contador de gas → gas natural. Contador eléctrico → electricidad. La lectura actual, combinada con la lectura anterior (de una factura), permite calcular el consumo. |
| **Nivel de confianza** | Alta (85%) si la lectura es legible. |
| **Casos donde sigue siendo necesaria revisión manual** | Contadores inteligentes telegestionados (sin pantalla visible, solo LED). Contadores en armarios cerrados con llave. |

---

#### BLOQUE 12: REFRIGERACIÓN

---

**I-001** — Unidad interior de refrigeración (split, cassette)

| Campo | Descripción |
|-------|-------------|
| **Código** | I-001 |
| **Nombre** | Unidad interior de refrigeración (split de pared, cassette de techo, conductos) |
| **Objetivo técnico** | Identificar el sistema de refrigeración (tipo, marca, modelo). |
| **Variable CE3X relacionada** | I1 (Sistema de refrigeración), I2 (Potencia), I3 (Eficiencia) |
| **Prioridad** | Esencial |
| **Cuándo solicitarla** | Durante la ronda de fotos del interior (F-006). Prestar atención a splits en paredes o techos. |
| **Cómo hacer la fotografía** | "Haz una foto del aparato de aire acondicionado (split) desde abajo, mostrando la unidad completa en la pared o en el techo. Tiene que verse la marca (suele estar en la parte frontal) y el modelo." |
| **Qué debe verse** | La unidad interior completa, la marca y modelo (visibles en la carcasa), las rejillas de entrada y salida de aire, y el mando a distancia (si está cerca). |
| **Qué errores evitar** | Foto borrosa (la marca puede estar en relieve y ser difícil de leer). Foto muy cerca (solo se ve una parte). Foto con la unidad apagada (no hay problema, la marca se ve igual). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de sistema (I1): split de pared → sistema individual por estancia. Cassette de techo → sistema centralizado. Conductos → sistema centralizado por conductos. Marca y modelo → permite buscar la ficha técnica para potencia (I2) y eficiencia (I3). |
| **Nivel de confianza** | Alta (90%) si la marca y modelo son visibles. |
| **Casos donde sigue siendo necesaria revisión manual** | Sistemas centralizados por conductos (las unidades interiores están ocultas en falsos techos, solo se ven las rejillas). |

---

**I-002** — Unidad exterior de refrigeración (condensadora)

| Campo | Descripción |
|-------|-------------|
| **Código** | I-002 |
| **Nombre** | Unidad exterior de refrigeración (condensadora, compresor) |
| **Objetivo técnico** | Confirmar el sistema de refrigeración y obtener la placa de características (marca, modelo, capacidad, refrigerante). |
| **Variable CE3X relacionada** | I1 (Sistema de refrigeración), I2 (Potencia), I3 (Eficiencia), I4 (Refrigerante) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Si se encuentra la unidad interior (I-001), buscar la unidad exterior correspondiente (terraza, balcón, fachada, azotea). |
| **Cómo hacer la fotografía** | "Busca la unidad exterior del aire acondicionado (el compresor, que suele estar en una terraza, en el balcón, o colgado en la fachada). Haz una foto que muestre la unidad completa, la marca, y la placa de características (suele estar en un lateral)." |
| **Qué debe verse** | La unidad exterior completa, la marca y modelo, y la placa de características (capacidad frigorífica en kW, tipo de refrigerante, año de fabricación). |
| **Qué errores evitar** | Foto borrosa. No encontrar la unidad exterior (preguntar al cliente dónde está). Unidad exterior en ubicación peligrosa (no pedir que se asomen a balcones peligrosos ni que suban a la azotea si no es seguro). |
| **Qué puede deducir el Arquitecto Técnico** | Potencia (I2) de la placa (capacidad frigorífica). Eficiencia (I3) por modelo y año. Refrigerante (I4): R-410A (común), R-32 (moderno), R-22 (antiguo, prohibido). |
| **Nivel de confianza** | Muy alta (95%) si la placa es legible. |
| **Casos donde sigue siendo necesaria revisión manual** | Unidades exteriores en cubiertas no accesibles. Unidades en fachadas muy altas (no visibles desde el suelo). |

---

**I-003** — Termostato del aire acondicionado

| Campo | Descripción |
|-------|-------------|
| **Código** | I-003 |
| **Nombre** | Termostato o mando a distancia del aire acondicionado |
| **Objetivo técnico** | Identificar el tipo de control y la temperatura de consigna de refrigeración. |
| **Variable CE3X relacionada** | I8 (Temperatura de consigna refrigeración), I9 (Control) |
| **Prioridad** | Media |
| **Cuándo solicitarla** | Junto con I-001. Mostrar el mando a distancia o el termostato de pared. |
| **Cómo hacer la fotografía** | "Haz una foto del mando a distancia del aire acondicionado (la pantalla, si tiene) o del termostato de pared. Tiene que verse la temperatura programada y el modo (frío/calor/auto)." |
| **Qué debe verse** | La pantalla del mando (temperatura, modo), los botones principales, y la marca. |
| **Qué errores evitar** | Foto borrosa (la pantalla del mando es pequeña). Foto con el mando apagado (no se ve la temperatura). |
| **Qué puede deducir el Arquitecto Técnico** | Temperatura de consigna de refrigeración (I8): típicamente 24-26°C en verano. Tipo de control (I9): manual o programable. |
| **Nivel de confianza** | Alta (85%) si la pantalla es legible. |
| **Casos donde sigue siendo necesaria revisión manual** | Sistemas centralizados con control único (termostato en el pasillo que controla todo). |

---

**I-004** — Rejillas de impulsión de aire (sistemas centralizados)

| Campo | Descripción |
|-------|-------------|
| **Código** | I-004 |
| **Nombre** | Rejillas de impulsión de aire en techo o pared (sistemas centralizados por conductos) |
| **Objetivo técnico** | Identificar si el sistema de refrigeración es centralizado por conductos (típico en edificios terciarios y viviendas de alta gama). |
| **Variable CE3X relacionada** | I1 (Sistema de refrigeración) |
| **Prioridad** | Media (solo si hay sospecha de sistema centralizado) |
| **Cuándo solicitarla** | Si en las fotos del interior se ven rejillas en el techo o en la pared (diferentes de los splits). |
| **Cómo hacer la fotografí** | "Haz una foto de las rejillas que ves en el techo o en la pared por donde sale el aire. También busca la unidad interior (suele estar en un falso techo, accesible por una trampilla)." |
| **Qué debe verse** | La rejilla de impulsión (tamaño, forma), el conducto (si es visible), y la unidad interior (si es accesible). |
| **Qué errores evitar** | Confundir rejillas de ventilación con rejillas de climatización (las de climatización suelen ser más grandes y tener aletas orientables). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de sistema (I1): conductos → sistema centralizado (más eficiente pero más caro de instalar). La presencia de una sola unidad exterior para varias rejillas indica sistema multi-split o centralizado. |
| **Nivel de confianza** | Media (70%) porque las rejillas no siempre indican refrigeración (pueden ser de ventilación). |
| **Casos donde sigue siendo necesaria revisión manual** | Sistemas de conductos sin acceso a la unidad interior (difícil verificar la potencia y eficiencia). |

---

**I-005** — Placa de características de la unidad exterior (refrigeración)

| Campo | Descripción |
|-------|-------------|
| **Código** | I-005 |
| **Nombre** | Placa de características de la unidad exterior (capacidad frigorífica, modelo) |
| **Objetivo técnico** | Obtener los datos técnicos del equipo de refrigeración: capacidad frigorífica (kW), eficiencia (EER/SEER), tipo de refrigerante, año. |
| **Variable CE3X relacionada** | I2 (Potencia), I3 (Eficiencia), I4 (Refrigerante) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Si se puede acceder a la unidad exterior. |
| **Cómo hacer la fotografí** | "Localiza la placa de características en la unidad exterior (suele ser una pegatina metálica en un lateral o en la parte trasera). Haz una foto de cerca con buena luz." |
| **Qué debe verse** | Capacidad frigorífica (kW), capacidad calorífica (kW, si es bomba de calor), EER o SEER, COP o SCOP, tipo de refrigerante (R-410A, R-32, etc.), año de fabricación, y tensión eléctrica. |
| **Qué errores evitar** | Mismos que H-003. |
| **Nivel de confianza** | Muy alta (99%) si la placa es legible. |
| **Casos donde sigue siendo necesaria revisión manual** | Mismos que H-003. |

---

**I-006** — Etiqueta energética del equipo de refrigeración

| Campo | Descripción |
|-------|-------------|
| **Código** | I-006 |
| **Nombre** | Etiqueta energética del equipo de aire acondicionado (si existe) |
| **Objetivo técnico** | Obtener la clasificación energética y los datos de eficiencia (SEER, SCOP). |
| **Variable CE3X relacionada** | I3 (Eficiencia) |
| **Prioridad** | Alta (si la etiqueta existe) |
| **Cuándo solicitarla** | Si el equipo tiene etiqueta energética visible. |
| **Cómo hacer la fotografía** | "Busca la etiqueta energética del aire acondicionado (similar a la de los electrodomésticos). Haz una foto de cerca." |
| **Qué debe verse** | Clase energética (A+++, A++, etc.), SEER (eficiencia estacional en refrigeración), SCOP (eficiencia estacional en calefacción, si aplica), consumo anual (kWh/año). |
| **Qué errores evitar** | Mismos que H-006. |
| **Nivel de confianza** | Muy alta (98%) si la etiqueta es legible. |
| **Casos donde sigue siendo necesaria revisión manual** | Equipos sin etiqueta (antiguos). Equipos donde la etiqueta no incluye SEER/SCOP (formatos antiguos). |

---

#### BLOQUE 13: ACS

---

**J-001** — Equipo de ACS (calentador, termo, caldera mixta)

| Campo | Descripción |
|-------|-------------|
| **Código** | J-001 |
| **Nombre** | Equipo de producción de ACS (calentador de gas, termo eléctrico, caldera mixta) |
| **Objetivo técnico** | Identificar el sistema de ACS, su marca y modelo. |
| **Variable CE3X relacionada** | J1 (Sistema de ACS) |
| **Prioridad** | Esencial |
| **Cuándo solicitarla** | Durante la ronda de fotos del interior. Buscar en la cocina (calentador de gas bajo el fregadero o en la pared), en el baño (termo eléctrico), o junto a la caldera de calefacción (caldera mixta). |
| **Cómo hacer la fotografía** | "Haz una foto del equipo que produce el agua caliente: el calentador de gas, el termo eléctrico, o la caldera mixta. Tiene que verse la marca y el modelo." |
| **Qué debe verse** | El equipo completo, la marca y el modelo (en la carcasa o en una pegatina), el tipo de equipo (calentador instantáneo, termo acumulador, caldera mixta), y las conexiones (tuberías de agua, gas, electricidad). |
| **Qué errores evitar** | Foto borrosa. Confundir el calentador de gas con la caldera de calefacción (el calentador es más pequeño y solo tiene tuberías de agua). No fotografiar el equipo de ACS si la caldera de calefacción también produce ACS (caldera mixta). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de ACS (J1): calentador de gas instantáneo → no acumula, eficiencia media. Termo eléctrico → acumula, eficiencia media, consume electricidad. Caldera mixta → produce calefacción y ACS. Bomba de calor para ACS → eficiencia alta (COP > 2.5). |
| **Nivel de confianza** | Alta (90%) si la marca y modelo son visibles. |
| **Casos donde sigue siendo necesaria revisión manual** | ACS centralizada (el equipo no está en la vivienda). Calentadores de gas sin placa visible. |

---

**J-002** — Depósito de ACS acumulador (termo, interacumulador)

| Campo | Descripción |
|-------|-------------|
| **Código** | J-002 |
| **Nombre** | Depósito de acumulación de ACS (termo, interacumulador) |
| **Objetivo técnico** | Identificar la capacidad del depósito (litros) y el tipo de acumulación. |
| **Variable CE3X relacionada** | J1 (Sistema de ACS), J5 (Depósito de acumulación) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Si el sistema de ACS tiene un depósito de acumulación visible. |
| **Cómo hacer la fotografí** | "Haz una foto del depósito de agua caliente. Tiene que verse la capacidad en litros (suele estar en una pegatina) y la marca." |
| **Qué debe verse** | El depósito completo, la capacidad (litros, visible en la etiqueta), la marca y modelo, el tipo (vertical u horizontal), y el aislamiento (visible si el depósito no tiene carcasa). |
| **Qué errores evitar** | Foto borrosa (la capacidad suele estar en una pegatina con letra pequeña). Foto solo de una parte del depósito (no se ve la capacidad). |
| **Qué puede deducir el Arquitecto Técnico** | Capacidad del depósito (J5): 50-80 litros → termo para 1-2 personas. 100-150 litros → termo para 3-4 personas. >200 litros → termo grande o acumulador centralizado. Las pérdidas del depósito dependen del aislamiento y de la temperatura de consigna. |
| **Nivel de confianza** | Alta (90%) si la capacidad es legible. |
| **Casos donde sigue siendo necesaria revisión manual** | Depósitos sin etiqueta de capacidad. Depósitos enterrados o en falsos techos (no visibles). |

---

**J-003** — Placa de características del equipo de ACS

| Campo | Descripción |
|-------|-------------|
| **Código** | J-003 |
| **Nombre** | Placa de características del equipo de ACS (potencia, rendimiento, capacidad) |
| **Objetivo técnico** | Obtener los datos técnicos del equipo de ACS: potencia (kW), rendimiento (%), capacidad (litros), año de fabricación. |
| **Variable CE3X relacionada** | J2 (Potencia/capacidad), J3 (Rendimiento), J1 (Sistema de ACS) |
| **Prioridad** | Esencial |
| **Cuándo solicitarla** | Junto con J-001. Buscar la placa en el lateral del equipo. |
| **Cómo hacer la fotografía** | "Busca la placa de características del calentador o termo. Haz una foto de cerca para que se vea la potencia, la capacidad, y el año." |
| **Qué debe verse** | Para calentador de gas: potencia nominal (kW), caudal (l/min), tipo de gas, año. Para termo eléctrico: capacidad (litros), potencia (kW), año. Para caldera mixta: ver H-003. |
| **Qué errores evitar** | Mismos que H-003. |
| **Nivel de confianza** | Muy alta (99%) si la placa es legible. |
| **Casos donde sigue siendo necesaria revisión manual** | Mismos que H-003. |

---

**J-004** — Instalación solar térmica visible en cubierta

| Campo | Descripción |
|-------|-------------|
| **Código** | J-004 |
| **Nombre** | Captadores solares térmicos en la cubierta |
| **Objetivo técnico** | Identificar la presencia de solar térmica para ACS, el tipo de captador (plano, tubos de vacío), y la superficie aproximada. |
| **Variable CE3X relacionada** | M1 (Solar térmica) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Si el cliente sabe que hay placas solares para agua caliente, o si se ven desde la calle. |
| **Cómo hacer la fotografí** | "Si hay placas solares para el agua caliente en el tejado, haz una foto desde la calle (o desde una ventana superior) que muestre las placas. Si puedes acercarte, haz una foto de detalle para ver el tipo de captador." |
| **Qué debe verse** | Los captadores solares completos (número de paneles), el tipo (plano: caja rectangular con vidrio; tubos de vacío: varios tubos de vidrio paralelos), la orientación (deberían mirar al sur), y el estado (vidrios limpios, sin roturas). |
| **Qué errores evitar** | Confundir con fotovoltaica (FV): los paneles FV son más grandes y tienen celdas cuadradas visibles; los térmicos son más pequeños y tienen un aspecto más industrial. Foto borrosa (los captadores suelen estar lejos). |
| **Qué puede deducir el Arquitecto Técnico** | Superficie de captación (M1): contar los paneles y estimar la superficie (un captador plano típico mide 2m²). Tipo (M1): plano (más común, menor rendimiento) o tubos de vacío (mayor rendimiento, más caro). Orientación (M1): la óptima es sur. La desviación reduce la producción. |
| **Nivel de confianza** | Alta (85%) si la foto muestra claramente los captadores. |
| **Casos donde sigue siendo necesaria revisión manual** | Captadores no visibles desde ningún punto (cubierta plana sin acceso visual). Captadores en mal estado (sucios, rotos) que pueden no estar operativos. |

---

**J-005** — Depósito de acumulación solar (interacumulador)

| Campo | Descripción |
|-------|-------------|
| **Código** | J-005 |
| **Nombre** | Depósito de acumulación del sistema solar térmico (interacumulador) |
| **Objetivo técnico** | Identificar la capacidad del depósito de inercia solar y confirmar la instalación solar térmica. |
| **Variable CE3X relacionada** | M1 (Solar térmica) |
| **Prioridad** | Media |
| **Cuándo solicitarla** | Si el cliente tiene acceso al cuarto de instalaciones donde está el depósito. |
| **Cómo hacer la fotografí** | "Busca el depósito que acumula el agua caliente de las placas solares. Suele ser un depósito cilíndrico más grande que un termo normal, con varias conexiones (tuberías que van a las placas y al sistema de apoyo)." |
| **Qué debe verse** | El depósito (capacidad visible), las tuberías (dos tuberías que van a las placas solares, generalmente aisladas), el sistema de apoyo (resistencia eléctrica o conexión a la caldera), y la bomba de circulación. |
| **Qué errores evitar** | Confundir con un termo eléctrico convencional (el depósito solar tiene tuberías que van al tejado, el termo solo tiene tuberías de agua fría y caliente). |
| **Qué puede deducir el Arquitecto Técnico** | Capacidad del depósito (M1): 150-300 litros para una vivienda unifamiliar. La presencia de un sistema de apoyo (resistencia eléctrica o caldera) indica cómo se cubre la demanda cuando no hay sol. |
| **Nivel de confianza** | Alta (85%) si el depósito y sus conexiones son visibles. |
| **Casos donde sigue siendo necesaria revisión manual** | Depósitos no accesibles (en falsos techos, en armarios cerrados). |

---

**J-006** — Etiqueta energética del equipo de ACS (termo)

| Campo | Descripción |
|-------|-------------|
| **Código** | J-006 |
| **Nombre** | Etiqueta energética del termo eléctrico o bomba de calor para ACS |
| **Objetivo técnico** | Obtener la clasificación energética y el perfil de consumo del equipo. |
| **Variable CE3X relacionada** | J3 (Rendimiento ACS) |
| **Prioridad** | Alta (si la etiqueta existe) |
| **Cuándo solicitarla** | Si el termo tiene etiqueta energética (equipos nuevos). |
| **Cómo hacer la fotografía** | "Busca la etiqueta energética del termo (una pegatina rectangular). Haz una foto de cerca." |
| **Qué debe verse** | Clase energética (A+, A, B, etc.), perfil de consumo (XXS, XS, S, M, L, XL, XXL), consumo anual (kWh/año), capacidad (litros), y nivel de ruido. |
| **Qué errores evitar** | Mismos que H-006. |
| **Nivel de confianza** | Muy alta (98%) si la etiqueta es legible. |
| **Casos donde sigue siendo necesaria revisión manual** | Equipos sin etiqueta (antiguos). |

---

#### BLOQUE 14: VENTILACIÓN

---

**K-001** — Rejillas de ventilación en ventanas

| Campo | Descripción |
|-------|-------------|
| **Código** | K-001 |
| **Nombre** | Rejillas de ventilación en las ventanas (en la parte superior del marco) |
| **Objetivo técnico** | Identificar la presencia de ventilación natural por rejillas (obligatoria en edificios post-CTE 2006). |
| **Variable CE3X relacionada** | K1 (Tipo de ventilación) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Durante la ronda de fotos de ventanas. |
| **Cómo hacer la fotografí** | "Mira la parte superior del marco de la ventana. Si hay una rejilla (una abertura con lamas o un pequeño conducto), haz una foto de cerca." |
| **Qué debe verse** | La rejilla en el marco (tamaño, material, si tiene lamas fijas o regulables), y su localización (parte superior de la ventana). |
| **Qué errores evitar** | Foto borrosa (las rejillas son pequeñas). Confundir con el drenaje del marco (los agujeros de drenaje son más pequeños y están en la parte inferior). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de ventilación (K1): rejillas en ventanas → ventilación natural por admisión de aire (CTE DB-HS). Edificios post-2006 suelen tenerlas. La ausencia de rejillas puede indicar que la ventilación es solo por infiltración o que el cliente las ha tapado. |
| **Nivel de confianza** | Alta (85%) si la rejilla es claramente visible. |
| **Casos donde sigue siendo necesaria revisión manual** | Rejillas integradas en el perfil del marco (difíciles de ver). Rejillas tapadas por el cliente (por corrientes de aire o ruido). |

---

**K-002** — Extractores en cocina y baños

| Campo | Descripción |
|-------|-------------|
| **Código** | K-002 |
| **Nombre** | Extractores mecánicos en cocina (campana extractora) y baños |
| **Objetivo técnico** | Identificar la ventilación mecánica existente (campana extractora, extractor de baño). |
| **Variable CE3X relacionada** | K1 (Tipo de ventilación), K2 (Tasa de renovación de aire) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Durante la ronda de fotos del interior. Buscar la campana extractora sobre la cocina y el extractor en el techo o pared del baño. |
| **Cómo hacer la fotografí** | "Haz una foto de la campana extractora de la cocina (desde abajo, mostrando los filtros y los botones). También haz una foto del extractor del baño (suele estar en el techo o en la pared, con una rejilla)." |
| **Qué debe verse** | La campana extractora (marca, filtros, botones de control), el extractor de baño (rejilla, tamaño, y si tiene conducto visible), y el conducto de extracción (si es visible en el exterior). |
| **Qué errores evitar** | Foto borrosa. No fotografiar el extractor si está en el techo (usar el zoom o pedir al cliente que suba a una silla con seguridad). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de ventilación (K1): campana extractora → extracción localizada en cocina (no es ventilación general). Extractor de baño → extracción localizada (mejora la ventilación general). La presencia de extractores no garantiza una ventilación mecánica controlada (VMC). |
| **Nivel de confianza** | Alta (85%) si los extractores son visibles. |
| **Casos donde sigue siendo necesaria revisión manual** | Extractores que no funcionan (no se puede verificar su estado). Campanas extractoras que recirculan el aire (no tienen conducto al exterior). |

---

**K-003** — Unidad de VMC (Ventilación Mecánica Controlada)

| Campo | Descripción |
|-------|-------------|
| **Código** | K-003 |
| **Nombre** | Unidad de Ventilación Mecánica Controlada (VMC) con recuperación de calor |
| **Objetivo técnico** | Identificar la presencia de un sistema de VMC, que mejora la eficiencia energética al recuperar el calor del aire extraído. |
| **Variable CE3X relacionada** | K1 (Tipo de ventilación), K4 (Eficiencia del recuperador) |
| **Prioridad** | Alta (si existe) |
| **Cuándo solicitarla** | Si el cliente sabe que tiene un sistema de ventilación mecánica, o si se ve una unidad en el falso techo (suele tener una trampilla de acceso). |
| **Cómo hacer la fotografía** | "Si tienes un sistema de ventilación mecánica (un aparato en el falso techo o en un armario, con conductos que van a las habitaciones), haz una foto de la unidad. Tiene que verse la marca, el modelo, y los conductos." |
| **Qué debe verse** | La unidad de VMC (marca, modelo), los conductos de admisión y extracción, el filtro (si es accesible), y el mando de control (si existe). |
| **Qué errores evitar** | Foto borrosa (la unidad suele estar en un espacio oscuro del falso techo). No confundir con una unidad de aire acondicionado centralizado (la VMC tiene conductos más pequeños y no produce frío/calor). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de ventilación (K1): VMC con recuperación de calor → el sistema más eficiente. Permite mantener la calidad del aire con mínimas pérdidas térmicas (eficiencia del recuperador 60-85%). Caudal estimado (K5) según el tamaño de la unidad. |
| **Nivel de confianza** | Alta (85%) si la unidad y sus conductos son visibles. |
| **Casos donde sigue siendo necesaria revisión manual** | VMC sin acceso a la unidad (unidad oculta en falso techo sin trampilla). Sistemas de ventilación híbridos (natural + mecánica automática). |

---

**K-004** — Rejillas de admisión de aire en fachada o en paredes

| Campo | Descripción |
|-------|-------------|
| **Código** | K-004 |
| **Nombre** | Rejillas de admisión de aire en fachada o en paredes exteriores |
| **Objetivo técnico** | Identificar los puntos de admisión de aire exterior (para ventilación natural o mecánica). |
| **Variable CE3X relacionada** | K1 (Tipo de ventilación) |
| **Prioridad** | Media |
| **Cuándo solicitarla** | Durante la ronda de fotos de fachada. Buscar rejillas en las paredes exteriores (no en las ventanas). |
| **Cómo hacer la fotografí** | "Mira las paredes exteriores de tu casa. Si hay una rejilla (una abertura con lamas metálicas o de plástico), haz una foto de cerca. Suelen estar cerca del techo o del suelo." |
| **Qué debe verse** | La rejilla en la fachada (tamaño, material, lamas), su localización (cerca del techo, cerca del suelo), y si tiene conducto visible. |
| **Qué errores evitar** | Confundir con salidas de extractores (las rejillas de admisión suelen ser más grandes y están en habitaciones secas, no en baños o cocinas). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de ventilación (K1): rejillas de admisión en fachada + extractores en baños/cocina → sistema de ventilación natural asistida (CTE DB-HS). |
| **Nivel de confianza** | Alta (85%) si la rejilla es claramente visible. |
| **Casos donde sigue siendo necesaria revisión manual** | Rejillas de admisión en plantas altas no visibles desde la calle. Rejillas obstruidas por suciedad o pintura. |

---

**K-005** — Conductos de ventilación (visibles en el exterior o en zonas comunes)

| Campo | Descripción |
|-------|-------------|
| **Código** | K-005 |
| **Nombre** | Conductos de ventilación visibles en el exterior (en cubierta o en fachada) |
| **Objetivo técnico** | Identificar la presencia de conductos de ventilación (extracción o admisión) y su estado. |
| **Variable CE3X relacionada** | K1 (Tipo de ventilación), K5 (Caudal de ventilación) |
| **Prioridad** | Media |
| **Cuándo solicitarla** | Durante la ronda de fotos de fachada y cubierta. |
| **Cómo hacer la fotografía** | "Haz una foto de cualquier conducto o tubería que salga de la fachada o del tejado, especialmente si tiene una rejilla o un sombrero (tapa) en el extremo." |
| **Qué debe verse** | El conducto completo (material, diámetro), el extremo (rejilla, sombrero, tapa), y la localización (fachada, cubierta). |
| **Qué errores evitar** | Confundir con chimeneas de calderas (las chimeneas suelen ser metálicas y más pequeñas). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de ventilación (K1): conductos de extracción en cubierta → sistema de ventilación mecánica (VMC) o extracción natural por chimenea (shunt). Conductos en fachada → extracción mecánica localizada (cocina, baño). |
| **Nivel de confianza** | Alta (85%) si el conducto es claramente visible. |
| **Casos donde sigue siendo necesaria revisión manual** | Conductos en cubiertas no accesibles. Conductos de sistemas de ventilación por shunt (los conductos están dentro de la pared, solo las rejillas son visibles). |

---

#### BLOQUE 15: ILUMINACIÓN (TERCIARIO)

---

**L-001** — Luminarias en zonas comunes (portal, escaleras, garaje)

| Campo | Descripción |
|-------|-------------|
| **Código** | L-001 |
| **Nombre** | Luminarias de las zonas comunes del edificio (portal, escaleras, pasillos, garaje) |
| **Objetivo técnico** | Identificar el tipo de iluminación en zonas comunes (LED, fluorescente, halogenuro, incandescente) y su estado. |
| **Variable CE3X relacionada** | L1 (Tipo de iluminación) |
| **Prioridad** | Media (solo para edificios residenciales con zonas comunes) |
| **Cuándo solicitarla** | Durante la primera visita del cliente al portal o al garaje. Se puede hacer junto con F-004 (buzones). |
| **Cómo hacer la fotografía** | "Haz una foto de las luces del portal, de las escaleras, y del garaje (si hay). Tiene que verse la bombilla o el tubo fluorescente, no solo la pantalla." |
| **Qué debe verse** | El tipo de luminaria (bombilla LED, tubo fluorescente, halógeno, incandescente), la potencia (si es visible en la bombilla), y el estado (fundida, funcionando). |
| **Qué errores evitar** | Foto borrosa. Foto de la pantalla (no se ve el tipo de bombilla). Foto con la luz apagada (no se puede identificar el tipo). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de iluminación (L1): LED → alta eficiencia. Fluorescente → eficiencia media. Halógeno o incandescente → baja eficiencia. |
| **Nivel de confianza** | Alta (85%) si la bombilla es claramente visible. |
| **Casos donde sigue siendo necesaria revisión manual** | Luminarias empotradas donde la bombilla no es visible. Luminarias con detectores de presencia (el tipo de bombilla puede ser diferente al de las luminarias sin detector). |

---

**L-002** — Detalle del tipo de lámpara

| Campo | Descripción |
|-------|-------------|
| **Código** | L-002 |
| **Nombre** | Detalle del tipo de lámpara (bombilla LED, tubo fluorescente, halógeno) |
| **Objetivo técnico** | Identificar con precisión el tipo de lámpara para determinar su eficiencia. |
| **Variable CE3X relacionada** | L1 (Tipo de iluminación) |
| **Prioridad** | Media (solo si no se identifica claramente en L-001) |
| **Cuándo solicitarla** | Si L-001 no permite identificar el tipo exacto de lámpara. |
| **Cómo hacer la fotografía** | "Si puedes, haz una foto de cerca de la bombilla o del tubo de luz. Tiene que verse la forma: si es una bombilla LED con aletas de refrigeración, un tubo fluorescente largo, o una bombilla halógena pequeña." |
| **Qué debe verse** | La lámpara completa, la forma (bombilla LED con aletas, tubo fluorescente, bombilla halógena, foco LED), y la marca/potencia si es visible. |
| **Qué errores evitar** | Foto borrosa. No tocar la bombilla si está encendida (puede estar caliente). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo exacto de lámpara (L1): LED (forma de bombilla con aletas de aluminio), fluorescente compacto (forma de tubo doblado), halógeno (bombilla pequeña con forma de gota). |
| **Nivel de confianza** | Alta (90%) si la lámpara es claramente visible. |
| **Casos donde sigue siendo necesaria revisión manual** | Lámparas LED integradas en la luminaria (no reemplazables, no se ve el tipo). |

---

#### BLOQUE 16: ENERGÍAS RENOVABLES

---

**M-001** — Paneles solares (térmicos o fotovoltaicos) en cubierta

| Campo | Descripción |
|-------|-------------|
| **Código** | M-001 |
| **Nombre** | Paneles solares en la cubierta (térmicos o fotovoltaicos) visibles desde la calle |
| **Objetivo técnico** | Identificar la presencia de paneles solares, diferenciar entre térmicos y fotovoltaicos, y estimar la superficie instalada. |
| **Variable CE3X relacionada** | M1 (Solar térmica), M2 (Fotovoltaica) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Si el cliente dice tener placas solares, o si se ven desde la calle. |
| **Cómo hacer la fotografí** | "Haz una foto de las placas solares desde la calle (o desde una ventana superior). Tiene que verse el tejado completo con todas las placas. Si puedes acercarte, haz una foto de detalle para ver si son térmicas (para agua caliente) o fotovoltaicas (para electricidad)." |
| **Qué debe verse** | Todos los paneles en la cubierta (número y disposición), el tipo (térmicos: más pequeños, con tubos de vacío o superficie negra con cubierta de vidrio; fotovoltaicos: más grandes, azul oscuro o negro, con celdas cuadradas visibles), la orientación (deberían mirar al sur), y la inclinación. |
| **Qué errores evitar** | Confundir con claraboyas (las claraboyas son transparentes, los paneles son opacos). Foto borrosa (los paneles suelen estar lejos). No contar todos los paneles (algunos pueden estar en otra vertiente del tejado). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de instalación (M1 o M2): paneles térmicos (para ACS) o fotovoltaicos (para electricidad). Superficie estimada (M1, M2): contar los paneles y multiplicar por la superficie típica (FV: ~1.6-2.0 m²/panel, térmico: ~2.0 m²/panel). |
| **Nivel de confianza** | Alta (85%) si los paneles son claramente visibles y distinguibles. |
| **Casos donde sigue siendo necesaria revisión manual** | Paneles no visibles desde ningún punto (cubierta plana sin acceso visual). Paneles sucios o en mal estado (pueden no estar operativos). |

---

**M-002** — Google Maps (vista satélite) con captadores marcados

| Campo | Descripción |
|-------|-------------|
| **Código** | M-002 |
| **Nombre** | Captura de Google Maps (satélite) mostrando los paneles solares en la cubierta |
| **Objetivo técnico** | Verificar la presencia y disposición de los paneles solares desde una fuente independiente (satélite). |
| **Variable CE3X relacionada** | M1 (Solar térmica), M2 (Fotovoltaica) |
| **Prioridad** | Alta (si no se puede obtener M-001) |
| **Cuándo solicitarla** | Si los paneles no son visibles desde la calle. El cliente puede hacer una captura de pantalla de Google Maps en su móvil u ordenador. |
| **Cómo hacer la fotografí** | "Abre Google Maps en tu móvil, busca la dirección de tu edificio, cambia a vista satélite, y haz una captura de pantalla que muestre el tejado de tu edificio. Si ves las placas solares, márcalas con un círculo en la captura." |
| **Qué debe verse** | La cubierta del edificio en vista satélite, con los paneles solares visibles (si los hay). La dirección del edificio para confirmar que es el correcto. |
| **Qué errores evitar** | Captura con poca resolución (alejarse lo suficiente para ver el edificio completo pero no tanto que los paneles no se distingan). No marcar la ubicación de los paneles. |
| **Qué puede deducir el Arquitecto Técnico** | Presencia de paneles (M1, M2) desde una fuente independiente. Superficie aproximada (contando píxeles o usando la escala de Google Maps). Orientación de los paneles. |
| **Nivel de confianza** | Alta (85%) si la resolución del satélite es suficiente. |
| **Casos donde sigue siendo necesaria revisión manual** | Satélite con resolución insuficiente (zonas rurales, edificios muy pequeños). Paneles en fachada (no visibles desde satélite). |

---

**M-003** — Depósito de acumulación solar (inercia)

| Campo | Descripción |
|-------|-------------|
| **Código** | M-003 |
| **Nombre** | Depósito de acumulación del sistema solar (interacumulador) |
| **Objetivo técnico** | Ver la capacidad del depósito y confirmar la instalación solar térmica. |
| **Variable CE3X relacionada** | M1 (Solar térmica) |
| **Prioridad** | Media |
| **Cuándo solicitarla** | Si el cliente tiene acceso al depósito de inercia solar. |
| **Cómo hacer la fotografía** | "Si tienes acceso al depósito de agua caliente que va con las placas solares, haz una foto donde se vea su tamaño y las tuberías que van al tejado." |
| **Qué debe verse** | El depósito (capacidad, marca), las tuberías de ida y retorno a los captadores solares (generalmente aisladas con coquilla negra), la bomba de circulación, y el sistema de apoyo (resistencia o conexión a caldera). |
| **Qué errores evitar** | Mismos que J-005. |
| **Nivel de confianza** | Alta (85%) si el depósito y las conexiones son visibles. |
| **Casos donde sigue siendo necesaria revisión manual** | Depósitos no accesibles. Sistemas solares compactos (todo en uno, sin depósito separado visible). |

---

**M-004** — Inversor fotovoltaico

| Campo | Descripción |
|-------|-------------|
| **Código** | M-004 |
| **Nombre** | Inversor del sistema fotovoltaico (convierte la corriente continua de los paneles en alterna para la vivienda) |
| **Objetivo técnico** | Confirmar la instalación fotovoltaica y obtener la potencia del inversor. |
| **Variable CE3X relacionada** | M2 (Fotovoltaica) |
| **Prioridad** | Alta |
| **Cuándo solicitarla** | Si hay paneles fotovoltaicos (M-001 o M-002). Buscar el inversor en el cuarto de instalaciones, en el garaje, o en la fachada exterior. |
| **Cómo hacer la fotografí** | "Busca el inversor de las placas solares (un aparato metálico con una pantalla o LED, generalmente en el garaje, en el cuarto de contadores, o en la fachada). Haz una foto de la placa de características." |
| **Qué debe verse** | El inversor (marca, modelo), la placa de características (potencia nominal en kW, tensión de entrada/salida, eficiencia), y la pantalla (producción actual, energía total generada). |
| **Qué errores evitar** | Foto borrosa (la pantalla puede tener letra pequeña). No confundir con un regulador de carga (más pequeño, típico de instalaciones aisladas). |
| **Qué puede deducir el Arquitecto Técnico** | Potencia del inversor (M2): la potencia nominal del inversor suele ser ligeramente inferior a la potencia pico de los paneles. Por ejemplo, 5 kWp de paneles → inversor de 4-5 kW. Energía generada estimada (M2): en España, 1 kWp genera ~1.200-1.500 kWh/año. |
| **Nivel de confianza** | Muy alta (95%) si la placa del inversor es legible. |
| **Casos donde sigue siendo necesaria revisión manual** | Microinversores (pequeños inversores detrás de cada panel, difíciles de ver). Inversores en cubierta (no accesibles). |

---

**M-005** — Contador de generación o de balance neto

| Campo | Descripción |
|-------|-------------|
| **Código** | M-005 |
| **Nombre** | Contador de generación fotovoltaica o de balance neto (autoconsumo) |
| **Objetivo técnico** | Verificar la conexión a la red eléctrica y el tipo de autoconsumo (con o sin excedentes). |
| **Variable CE3X relacionada** | M2 (Fotovoltaica), M8 (Venta de excedentes) |
| **Prioridad** | Media |
| **Cuándo solicitarla** | Si hay instalación fotovoltaica y el cliente tiene un contador específico de generación. |
| **Cómo hacer la fotografía** | "Busca el contador de generación (suele estar junto al contador eléctrico principal, o en un armario separado). Haz una foto de la pantalla donde se vea la energía generada." |
| **Qué debe verse** | El contador (marca, modelo, tipo), la lectura de energía generada (kWh), y el tipo de contador (generación, balance neto, o bidireccional). |
| **Qué errores evitar** | Confundir con el contador de consumo (el contador de generación suele tener una etiqueta que lo identifica). |
| **Qué puede deducir el Arquitecto Técnico** | Tipo de autoconsumo (M2): contador de generación → autoconsumo con excedentes (vertido a red). Sin contador de generación → autoconsumo sin excedentes (la energía sobrante no se vierte a red). |
| **Nivel de confianza** | Alta (85%) si el contador es claramente identificable. |
| **Casos donde sigue siendo necesaria revisión manual** | Contadores inteligentes integrados (la función de generación puede estar dentro del mismo contador de consumo). |

---

#### BLOQUE 17: DOCUMENTACIÓN COMPLEMENTARIA

---

**D-001** — Certificado energético original (PDF completo)

| Campo | Descripción |
|-------|-------------|
| **Código** | D-001 |
| **Nombre** | Certificado energético original en PDF (documento completo, no solo la primera página) |
| **Objetivo técnico** | Obtener el certificado original completo para auditar las variables declaradas. |
| **Variable CE3X relacionada** | O1-O10 (Certificado original auditado) |
| **Prioridad** | Esencial |
| **Cuándo solicitarla** | Al inicio del proceso. Es el documento de partida de la auditoría. |
| **Cómo hacer la fotografía** | "Comparte el certificado energético en PDF completo, no solo la primera página. Necesito ver todas las páginas, especialmente donde se describen los datos de entrada (superficie, año, composición de fachadas, ventanas, instalaciones)." |
| **Qué debe verse** | Todas las páginas del certificado: primera página (etiqueta, datos generales, referencia catastral), páginas intermedias (datos de entrada del edificio: envolvente, instalaciones, renovables), y últimas páginas (recomendaciones, medidas de mejora). |
| **Qué errores evitar** | Compartir solo la primera página (falta la información técnica esencial). PDF escaneado de baja resolución (no se leen los números). PDF incompleto (faltan páginas). |
| **Qué puede deducir el Arquitecto Técnico** | Todos los datos de entrada del certificado original (O1-O10) para compararlos con los obtenidos en la inspección. |
| **Nivel de confianza** | 100% si el PDF es completo y legible. |

---

**D-002** — Facturas de suministro (múltiples meses)

| Campo | Descripción |
|-------|-------------|
| **Código** | D-002 |
| **Nombre** | Facturas de suministro (gas, electricidad, gasóleo) de los últimos 12 meses |
| **Objetivo técnico** | Obtener el consumo real anual para validar el cálculo de CE3X. |
| **Variable CE3X relacionada** | H15 (Consumo de calefacción), J4 (Consumo ACS), I12 (Consumo refrigeración) |
| **Prioridad** | Esencial |
| **Cuándo solicitarla** | Junto con H-007 (factura simple). Para una validación completa, se necesitan 12 meses de facturas. |
| **Cómo hacer la fotografía** | "Comparte las facturas de gas y/o electricidad de los últimos 12 meses. Puedes tapar los datos personales y el importe. Necesito ver el consumo de cada mes y el periodo de facturación." |
| **Qué debe verse** | Para cada factura: tipo de suministro, consumo (kWh o m³), periodo de facturación (fechas), y CUP/CUPS. |
| **Qué errores evitar** | Facturas de menos de 12 meses (no cubren el ciclo anual completo). Facturas donde no se distingue el consumo (tarifas planas). |
| **Qué puede deducir el Arquitecto Técnico** | Consumo real anual de calefacción (H15), ACS (J4), y refrigeración (I12). Validación del cálculo de CE3X: si el consumo real difiere >20% del estimado, revisar los datos de entrada. |
| **Nivel de confianza** | Muy alta (95%) con 12 meses de facturas. |
| **Casos donde sigue siendo necesaria revisión manual** | Facturas de comunidades de propietarios con calefacción centralizada (el consumo individual no está detallado). Clientes con tarifa plana (no hay consumo real). |

---

### A.4 Reglas para la toma de fotografías (instrucciones para el cliente)

1. **Siempre con luz natural:** Las fotos deben hacerse de día, con luz natural, preferiblemente por la mañana (entre las 10:00 y las 14:00). Evitar el atardecer (luces anaranjadas) y el amanecer (sombras largas).
2. **Sin flash:** El flash directo aplana los detalles y puede ocultar información crítica (grietas, marcas en placas, burletes). Si es absolutamente necesario, usar un flash difuso (papel de seda delante del flash) o luz ambiental adicional.
3. **Enfoque nítido:** Tocar la pantalla del móvil en el objeto que se quiere enfocar antes de hacer la foto. Esperar a que el móvil enfoque (el cuadrado se ponga verde o el contorno se marque).
4. **Estabilidad:** Para fotos de detalle (placas de características, perfiles de ventana), apoyar el móvil contra una superficie firme o usar el temporizador (3 segundos) para evitar la trepidación.
5. **Perspectiva frontal:** Para fachadas y ventanas, la cámara debe estar paralela al objeto fotografiado (evitar ángulos que distorsionen las proporciones).
6. **Escala de referencia:** Siempre que sea posible, incluir un objeto de tamaño conocido (moneda de 2€ = 25mm, tarjeta bancaria = 85×54mm, regla, cinta métrica) para poder escalar la imagen.
7. **No editar las fotos:** No aplicar filtros, no recortar, no modificar el brillo o el contraste. Las fotos deben ser RAW (según salen de la cámara del móvil).
8. **No eliminar metadatos EXIF:** Los metadatos de fecha, hora, y ubicación son críticos para verificar la hora solar y la ubicación geográfica.

### A.5 Clasificación por prioridad

| Prioridad | Códigos | Tiempo estimado para el cliente |
|-----------|---------|----------------------------------|
| **Esencial** (obligatorio) | F-001, F-006, F-020, F-025, F-036, F-039, H-001, H-003, J-001, J-003, I-001, D-001, D-002 | ~30 minutos |
| **Alta** (muy recomendable) | F-002, F-007, F-008, F-009, F-010, F-011, F-012, F-013, F-015, F-016, F-017, F-018, F-019, F-022, F-023, F-024, F-026, F-027, F-029, F-031, F-035, F-037, F-040, F-041, F-043, F-044, F-045, F-046, F-047, F-050, F-051, F-053, F-054, F-056, H-002, H-004, H-005, H-006, I-002, I-005, I-006, J-002, J-004, K-001, K-002, K-003, M-001, M-002, M-004 | ~45 minutos adicionales |
| **Media** (útil, no crítica) | F-003, F-004, F-011, F-014, F-017, F-021, F-028, F-030, F-032, F-033, F-034, F-038, F-042, F-048, F-049, F-052, F-055, H-008, I-003, I-004, J-005, J-006, K-004, K-005, L-001, L-002, M-003, M-005 | ~20 minutos adicionales |
| **Baja** (solo si es fácil) | F-005, F-029 (si no es ático), F-031 (si no es accesible) | ~5 minutos adicionales |

**Tiempo total estimado para el cliente:** 60-90 minutos para completar todas las fotografías.

### A.6 Validación de las fotografías recibidas

Antes de aceptar las fotografías como válidas, el sistema PITR™ debe verificar:

1. **Formato:** JPG o PNG. No aceptar RAW, HEIC, WebP, BMP, GIF.
2. **Resolución mínima:** 1920×1080 píxeles. Si la imagen tiene menos resolución, solicitar una nueva foto.
3. **Nitidez:** Si la imagen está borrosa (especialmente en placas de características o marcas de vidrio), solicitar una nueva foto con mejor enfoque.
4. **Iluminación:** Si la imagen está sobreexpuesta (quemada) o subexpuesta (demasiado oscura), solicitar una nueva foto con mejor luz.
5. **EXIF:** Verificar que los metadatos EXIF están presentes (fecha, hora, posible geolocalización). Si se han eliminado, documentarlo como "EXIF ausente".
6. **Completitud:** Verificar que se han recibido todas las fotografías de la lista (A.3). Si falta alguna prioridad "Esencial", no continuar con el análisis hasta que se reciba.

### A.7 Datos que el cliente debe recopilar además de las fotografías

Además de las fotografías, el cliente debe proporcionar:

1. **Certificado energético original** en PDF (D-001).
2. **Facturas de suministro** de los últimos 12 meses (D-002).
3. **Recibo del IBI** (foto donde se vea la referencia catastral y la superficie).
4. **Escrituras o nota simple** (si el cliente las tiene a mano, no es obligatorio).
5. **Respuestas a las preguntas del cuestionario** (organizadas por variable CE3X, no por pregunta — el sistema PITR™ presenta las preguntas en orden lógico para el cliente).

---

---

## Apéndice B — Flujo de decisión para revisión manual

### B.1 Cuándo es obligatoria la revisión manual

Se requiere revisión manual (visita presencial) cuando se cumple **cualquiera** de las siguientes condiciones:

1. **Variables críticas con nivel de confianza <50%:** Cualquier variable en los grupos C, D, E, F, H, I, J con confianza baja.
2. **Contradicciones no resueltas:** Las contradicciones de la matriz (sección 18) que no pueden resolverse con más información documental o telefónica.
3. **Sospecha de falseamiento:** Cuando hay indicios de que el certificado original ha sido manipulado intencionadamente.
4. **Patología constructiva:** Grietas >2mm, humedades generalizadas, problemas estructurales.
5. **Instalaciones complejas:** Sistemas de climatización de difícil identificación, múltiples sistemas, instalaciones centralizadas.
6. **Rehabilitaciones complejas:** Edificios con rehabilitaciones parciales de envolvente, ampliaciones, o cambios de uso.
7. **Edificios singulares:** Construcciones con geometría compleja, materiales atípicos, o sistemas constructivos no estandarizados.
8. **Conflictos legales:** Inmuebles en proceso de litigio, herencias, o reclamaciones donde la precisión del certificado sea crítica.
9. **Diferencia de letra crítica:** Cuando la diferencia entre la letra original del certificado y la estimación indica un posible cambio de 2 o más letras.
10. **Petición expresa del cliente o del Arquitecto Técnico:** Si alguna de las partes considera necesaria la visita, se realiza.

### B.2 Cuándo NO es necesaria la revisión manual

1. **Datos convergentes:** Todas las variables tienen confianza >75% y no hay contradicciones.
2. **Viviendas estándar:** Edificios de tipología constructiva conocida, sin rehabilitaciones complejas.
3. **Instalaciones simples:** Sistemas de calefacción y ACS convencionales con documentación accesible.
4. **Facturas disponibles:** Se dispone de facturas de suministro que corroboran el consumo estimado.
5. **Acceso a documentación completa:** Certificado original, Catastro, fotos de todas las estancias.
6. **Certificado previo fiable:** El certificado original ha sido emitido recientemente por un técnico de confianza y los datos de entrada coinciden con los observados.

---

## Apéndice C — Referencias normativas

| Normativa | Descripción |
|-----------|-------------|
| CTE DB-HE 2019 | Documento Básico de Ahorro de Energía del Código Técnico de la Edificación. |
| RD 390/2021 | Real Decreto de certificación energética de edificios. |
| UNE-EN ISO 6946 | Cálculo de la resistencia térmica y transmitancia térmica de elementos de edificación. |
| UNE-EN ISO 10077-1 | Comportamiento térmico de ventanas y puertas. Cálculo de la transmitancia térmica. |
| UNE-EN ISO 13370 | Comportamiento térmico de edificios. Transmisión de calor a través del terreno. |
| UNE-EN ISO 10211 | Puentes térmicos en edificación. Flujos térmicos y temperaturas superficiales. |
| UNE-EN 410 | Determinación de las características luminosas y solares de los acristalamientos. |
| UNE-EN 12207 | Ventanas. Permeabilidad al aire. Clasificación. |
| NBE-CT-79 | Norma Básica de la Edificación sobre Condiciones Térmicas (derogada, pero aplicable a edificios construidos entre 1981 y 2006). |

---

*Fin del documento CF-030-PITR-EXPERT-KNOWLEDGE-ENGINE.md*

*Este documento es propiedad intelectual de Certilab®. La metodología PITR™ es una marca registrada.*
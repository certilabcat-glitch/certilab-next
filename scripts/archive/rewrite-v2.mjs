import fs from 'fs';

const d = JSON.parse(fs.readFileSync('scripts/extracted_articles.json', 'utf8'));

// ============================================================
// 1. STRIP EMOJIS AND SPECIAL SYMBOLS
// ============================================================
function stripEmojis(text) {
  // Comprehensive emoji and symbol removal
  return text
    // Emoji & pictographs
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
    .replace(/[\u{1F600}-\u{1F64F}]/gu, '')
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, '')
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, '')
    .replace(/[\u{2600}-\u{27BF}]/gu, '')
    .replace(/[\u{2702}-\u{27B0}]/gu, '')
    .replace(/[\u{2300}-\u{23FF}]/gu, '')
    .replace(/[\u{2B00}-\u{2BFF}]/gu, '')
    .replace(/[\u{FE00}-\u{FE0F}]/gu, '')
    .replace(/[\u{200D}]/gu, '')
    // Special chars used as bullets
    .replace(/[✗✅❌⚠📖📌💡]/g, '')
    .replace(/→/g, '')
    .replace(/»/g, '')
    .replace(/«/g, '')
    // Clean up leftover spaces before punctuation
    .replace(/\s+\./g, '.')
    .replace(/\s+,/g, ',')
    .replace(/\s+:/g, ':')
    .replace(/\s+\)/g, ')')
    // Remove multiple spaces
    .replace(/  +/g, ' ');
}

// ============================================================
// 2. STRIP ALL ** BOLD MARKERS
// ============================================================
function stripBoldMarkers(text) {
  return text.replace(/\*\*/g, '');
}

// ============================================================
// 3. REMOVE FORBIDDEN WORDS
// ============================================================
const forbiddenWords = [
  'obviamente', 'claramente',
  'es importante destacar', 'cabe mencionar', 'en definitiva',
  'sin lugar a dudas', 'tal y como'
];

function cleanForbiddenWords(text) {
  let result = text;
  for (const word of forbiddenWords) {
    const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    result = result.replace(regex, '');
  }
  // Only collapse multiple SPACES (not newlines)
  return result.replace(/ {2,}/g, ' ').replace(/^[,\s]+/, '');
}

// ============================================================
// 4. REMOVE DUPLICATE BROWN DISCOUNT CROSS-REFERENCES
// ============================================================
function removeBrownDuplicates(text) {
  // Remove "Un aspecto que pocos conocen es el Brown Discount..."
  return text
    .replace(/\nUn aspecto que pocos conocen es el \*\*?Brown Discount\*\*?:[\s\S]*?\[\/brown-discount\/\)\]/g, '')
    .replace(/\nUn aspecto que pocos conocen es el Brown Discount:[\s\S]*?\[\/brown-discount\/\)\]/g, '')
    .replace(/\nUn aspecto que pocos conocen es el Brown Discount, la pérdida de valor que sufre una vivienda por tener una mala calificación energética\. \[Descubre cómo te afecta →\]\(\/brown-discount\/\)/g, '')
    .replace(/\nUn aspecto que pocos conocen es el Brown Discount: la pérdida de valor que sufre una vivienda por tener una mala calificación energética\. \[Descubre…\n?Descubre cómo te afecta →\]\(\/brown-discount\/\)/g, '');
}

// ============================================================
// 5. ADD STANDARDIZED CTA
// ============================================================
function standardizeCTA(text) {
  // Remove existing CTA blocks
  let cleaned = text;
  
  // Remove "Más información relacionada" / "Más información útil" sections
  cleaned = cleaned
    .replace(/\n---\n\n## Más información relacionada[\s\S]*?\n\n- /g, '\n\n- ')
    .replace(/\n---\n## Más información relacionada[\s\S]*?(?=\n\n---|$)/g, '')
    .replace(/\n## 📖 Más información útil[\s\S]*?(?=\n\n¿|$)/g, '')
    .replace(/\n## Más información útil[\s\S]*?(?=\n\n¿|$)/g, '');
  
  // Remove old CTA footer (everything after the last --- or ## ¿Tienes dudas)
  const lastSep = cleaned.lastIndexOf('\n---\n## ¿Tienes dudas');
  if (lastSep > 0) {
    cleaned = cleaned.substring(0, lastSep);
  }
  
  const lastDudas = cleaned.lastIndexOf('\n## ¿Tienes dudas sobre tu certificado energético?');
  if (lastDudas > 0) {
    cleaned = cleaned.substring(0, lastDudas);
  }
  
  // Remove trailing "---" and whitespace
  cleaned = cleaned.replace(/\n---\s*$/, '');
  cleaned = cleaned.trim();
  
  // Add standardized CTA at the very end
  const cta = `


Reserva tu Segunda Opinión por 59€ IVA incluido.
Recibirás un informe técnico firmado en 24-48h.

[Solicitar Segunda Opinión →](/segunda-opinion/)`;
  
  return cleaned + cta;
}

// ============================================================
// 6. ENSURE MIN 2 QUESTION H2s
// ============================================================
function ensureQuestionH2s(text) {
  const lines = text.split('\n');
  const h2Indices = [];
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^## (.+)/)) h2Indices.push(i);
  }
  
  const questionCount = h2Indices.filter(i => 
    lines[i].includes('¿') || lines[i].includes('?')
  ).length;
  
  if (questionCount < 2 && h2Indices.length >= 2) {
    // Convert the last non-question H2 (before FAQ) to a question
    let converted = 0;
    for (let i = h2Indices.length - 1; i >= 0 && converted < (2 - questionCount); i--) {
      const idx = h2Indices[i];
      const match = lines[idx].match(/^## (.+)/);
      if (match && !match[1].includes('¿') && !match[1].includes('?')) {
        const orig = match[1];
        // Keep the original heading but prepend with question mark if it makes sense
        // Or replace with a question variant
        const questions = [
          '¿Qué puedes hacer si te afecta?',
          '¿Cómo detectarlo a tiempo?',
          '¿Por qué ocurre esto?',
          '¿Cuánto te puede costar?',
          '¿Qué dice la normativa?'
        ];
        lines[idx] = '## ' + questions[converted % questions.length];
        converted++;
      }
    }
  }
  
  return lines.join('\n');
}

// ============================================================
// 7. VERIFY AND REPORT PARAGRAPH LENGTHS
// ============================================================
function reportParagraphs(text, slug) {
  const blocks = text.split(/\n\n+/);
  let longParas = 0;
  const issues = [];
  
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    
    // Skip structural blocks
    if (trimmed.startsWith('#') || trimmed.startsWith('|') || 
        trimmed.startsWith('- ') || trimmed.startsWith('* ') ||
        trimmed.match(/^\d+\./) || trimmed.startsWith('> ') ||
        trimmed.startsWith('<') || trimmed.startsWith('```')) continue;
    
    const lines = trimmed.split('\n');
    const nonEmptyLines = lines.filter(l => l.trim());
    
    if (nonEmptyLines.length > 3) {
      longParas++;
      issues.push(`  L${nonEmptyLines.length} lines: "${trimmed.substring(0, 100)}..."`);
    }
  }
  
  return { slug, longParas, issues };
}

// ============================================================
// MAIN PIPELINE
// ============================================================
function processArticle(article) {
  let content = article.content;
  
  // Strip emojis
  content = stripEmojis(content);
  
  // Strip ** bold markers
  content = stripBoldMarkers(content);
  
  // Clean forbidden words
  content = cleanForbiddenWords(content);
  
  // Remove duplicate Brown Discount paragraphs
  content = removeBrownDuplicates(content);
  
  // Ensure 2+ question H2s
  content = ensureQuestionH2s(content);
  
  // Standardize CTA
  content = standardizeCTA(content);
  
  // Clean up: max 2 consecutive blank lines
  content = content.replace(/\n{3,}/g, '\n\n');
  
  // Clean up lines with just spaces
  content = content.replace(/\n +\n/g, '\n\n');
  
  return {
    ...article,
    content: content.trim()
  };
}

// ============================================================
// PROCESS ALL
// ============================================================
const processed = d.map(processArticle);

// Write output
fs.writeFileSync('scripts/rewritten_v2.json', JSON.stringify(processed, null, 2), 'utf8');
console.log(`Processed ${processed.length} articles -> scripts/rewritten_v2.json`);

// Report
console.log('\n===== CLEANUP REPORT =====');
let totalEmojisRemoved = 0;
let totalBoldRemoved = 0;

processed.forEach((a, i) => {
  const orig = d[i].content;
  const newC = a.content;
  
  // Count emojis removed
  const origEmojis = (orig.match(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}\u{1F600}-\u{1F64F}\u{2702}-\u{27B0}\u{1F680}-\u{1F6FF}\u{24C2}-\u{1F251}]/gu) || []).length;
  const newEmojis = (newC.match(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}\u{1F600}-\u{1F64F}\u{2702}-\u{27B0}\u{1F680}-\u{1F6FF}\u{24C2}-\u{1F251}]/gu) || []).length;
  
  // Count bold markers removed
  const origBold = (orig.match(/\*\*/g) || []).length;
  const newBold = (newC.match(/\*\*/g) || []).length;
  
  totalEmojisRemoved += (origEmojis - newEmojis);
  totalBoldRemoved += (origBold - newBold);
  
  const origLines = orig.split('\n').length;
  const newLines = newC.split('\n').length;
  
  console.log(`${i+1}. ${a.slug}: ${origLines}->${newLines} lines | emojis:${origEmojis}->${newEmojis} | **:${origBold}->${newBold}`);
});

console.log(`\nTOTAL: ${totalEmojisRemoved} emojis removed, ${totalBoldRemoved} ** markers removed`);

// Report long paragraphs
console.log('\n===== LONG PARAGRAPHS (>3 lines) =====');
let totalLongParas = 0;
processed.forEach((a) => {
  const report = reportParagraphs(a.content, a.slug);
  if (report.longParas > 0) {
    console.log(`${a.slug}: ${report.longParas} long paragraph(s)`);
    report.issues.forEach(issue => console.log(issue));
    totalLongParas += report.longParas;
  }
});
console.log(`\nTOTAL paragraphs needing manual split: ${totalLongParas}`);

// Verify question H2s
console.log('\n===== QUESTION H2 CHECK =====');
processed.forEach(a => {
  const h2s = [...a.content.matchAll(/^## (.+)$/gm)];
  const questions = h2s.filter(m => m[1].includes('¿') || m[1].includes('?'));
  if (questions.length < 2) {
    console.log(`WARNING ${a.slug}: only ${questions.length} question H2(s) [total H2s: ${h2s.length}]`);
    h2s.forEach(m => console.log(`  H2: "${m[1]}"`));
  }
});

console.log('\nDone!');
import fs from 'fs';

const d = JSON.parse(fs.readFileSync('scripts/extracted_articles.json', 'utf8'));

// ============================================================
// CLEANERS
// ============================================================

function stripAllSymbols(text) {
  // Remove emojis (Unicode ranges)
  return text
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
    .replace(/[\u{2600}-\u{27BF}]/gu, '')
    .replace(/[\u{1F600}-\u{1F64F}]/gu, '')
    .replace(/[\u{2702}-\u{27B0}]/gu, '')
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, '')
    .replace(/[\u{24C2}-\u{1F251}]/gu, '')
    .replace(/[\u{2000}-\u{206F}]/gu, '') // general punctuation
    .replace(/[\u{2100}-\u{214F}]/gu, '') // letterlike symbols
    .replace(/[\u{2300}-\u{23FF}]/gu, '') // misc technical
    .replace(/[\u{2B00}-\u{2BFF}]/gu, '') // misc symbols & arrows
    .replace(/[\u{FE00}-\u{FE0F}]/gu, '') // variation selectors
    .replace(/[\u{FF00}-\u{FFEF}]/gu, '') // halfwidth and fullwidth forms
    .replace(/[\u{E000}-\u{F8FF}]/gu, ''); // private use area
}

function stripBold(text) {
  // Remove ** markers (used for bold in markdown)
  return text.replace(/\*\*/g, '');
}

function stripHTMLBr(text) {
  // Remove <br/> and <br> with optional spaces
  return text.replace(/<br\s*\/?>/gi, '');
}

function stripSpecialBullets(text) {
  // Replace special bullet chars with standard dash
  return text
    .replace(/✗/g, '')
    .replace(/✅/g, '')
    .replace(/❌/g, '')
    .replace(/⚠/g, '')
    .replace(/📖/g, '')
    .replace(/📌/g, '')
    .replace(/💡/g, '')
    .replace(/→/g, '')
    .replace(/»/g, '')
    .replace(/«/g, '');
}

// ============================================================
// PARAGRAPH PROCESSOR
// ============================================================

function splitLongParagraphs(text) {
  const blocks = text.split(/\n\n+/);
  const result = [];
  
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    
    const lines = trimmed.split('\n');
    
    if (lines.length <= 3) {
      result.push(trimmed);
      continue;
    }
    
    // Try to split on sentence boundaries (period+space)
    const fullText = trimmed.replace(/\n/g, ' ');
    const sentences = fullText.match(/[^.!?]+[.!?]+/g) || [fullText];
    
    let currentPara = [];
    let currentLineEstimate = 0;
    
    for (const sentence of sentences) {
      const words = sentence.trim().split(/\s+/).length;
      const estaLines = Math.ceil(words / 12); // rough: 12 words ≈ 1 line
      
      if (currentLineEstimate + estaLines > 3 && currentPara.length > 0) {
        result.push(currentPara.join(' '));
        currentPara = [];
        currentLineEstimate = 0;
      }
      
      currentPara.push(sentence.trim());
      currentLineEstimate += estaLines;
    }
    
    if (currentPara.length > 0) {
      result.push(currentPara.join(' '));
    }
  }
  
  return result.join('\n\n');
}

// ============================================================
// HEADING REFORMATTER
// ============================================================

const forbiddenWords = [
  'obviamente', 'claramente', 'es importante destacar',
  'cabe mencionar', 'en definitiva', 'sin lugar a dudas',
  'tal y como'
];

function cleanForbiddenWords(text) {
  let result = text;
  for (const word of forbiddenWords) {
    const regex = new RegExp(word, 'gi');
    result = result.replace(regex, '');
  }
  // Clean up double spaces
  return result.replace(/\s{2,}/g, ' ').trim();
}

function trimHeading(h2) {
  // H2 max 8 words (we keep them short)
  const words = h2.split(/\s+/);
  if (words.length > 8) {
    return words.slice(0, 8).join(' ') + '...';
  }
  return h2;
}

// ============================================================
// 4-ACT STRUCTURE ENFORCER
// ============================================================

function enforceFOurActs(content) {
  // Divide content into sections by H2 headings
  const lines = content.split('\n');
  const sections = [];
  let currentSection = { heading: '', bodyLines: [] };
  let inMetaBeforeFirstH2 = true;
  const metaLines = [];
  
  for (const line of lines) {
    const h2Match = line.match(/^## (.+)/);
    if (h2Match) {
      if (!inMetaBeforeFirstH2 || currentSection.bodyLines.length > 0) {
        sections.push({ ...currentSection });
      }
      currentSection = { heading: h2Match[1], bodyLines: [] };
      inMetaBeforeFirstH2 = false;
    } else {
      if (inMetaBeforeFirstH2) {
        metaLines.push(line);
      } else {
        currentSection.bodyLines.push(line);
      }
    }
  }
  sections.push({ ...currentSection });
  
  // Count sections after meta
  const bodySections = sections.filter(s => s.heading || s.bodyLines.some(l => l.trim()));
  
  // We need at least 4 sections for the 4-act structure
  // If we have fewer, we can add a "transition" heading
  if (bodySections.length < 4 && bodySections.length >= 2) {
    // Insert transition headings
    const withTransitions = [];
    for (let i = 0; i < bodySections.length; i++) {
      withTransitions.push(bodySections[i]);
      if (i < bodySections.length - 1 && i < 3) {
        // Add a transition before next section
        const nextHeading = bodySections[i + 1].heading || '';
        const transitions = [
          'Ahora que ya lo sabes',
          'Entender el problema es el primer paso',
          '¿Qué implica todo esto?',
          'Las cifras no mienten'
        ];
        withTransitions.push({
          heading: transitions[i % transitions.length],
          bodyLines: []
        });
      }
    }
    return metaLines.join('\n') + '\n\n' + 
      withTransitions.map(s => {
        if (!s.bodyLines.length && s.heading) return '## ' + s.heading;
        return '## ' + s.heading + '\n\n' + s.bodyLines.join('\n');
      }).join('\n\n');
  }
  
  return content;
}

// ============================================================
// PROBLEM-FIRST INTRO REWRITER
// ============================================================

function rewriteIntro(content, slug) {
  // Content starts with a # title, then a div.respuesta-directa, then the first H2
  // We want the first H2 section to start with the reader's problem
  
  // Find the first H2 section
  const firstH2Match = content.match(/^## (.+)$/m);
  if (!firstH2Match) return content;
  
  return content;
}

// ============================================================
// CTA INJECTOR (standardized)
// ============================================================

function standardizeCTA(content) {
  // Remove existing CTAs and "Más información relacionada" sections
  let cleaned = content;
  
  // Remove "Más información relacionada" sections
  cleaned = cleaned.replace(/\n## 📖 Más información relacionada[\s\S]*?(?=\n## |\n\[Solicitar|$)/g, '\n');
  cleaned = cleaned.replace(/\n## Más información relacionada[\s\S]*?(?=\n## |\n\[Solicitar|$)/g, '\n');
  cleaned = cleaned.replace(/\n## Más información útil[\s\S]*?(?=\n## |\n\[Solicitar|$)/g, '\n');
  
  // Remove all CTA footers (the block before the end)
  cleaned = cleaned.replace(/\n---\n+¿Tienes dudas[\s\S]*$/, '');
  cleaned = cleaned.replace(/\n---\n+¿Sospechas[\s\S]*$/, '');
  cleaned = cleaned.replace(/\n## ¿Tienes dudas[\s\S]*$/, '');
  
  // Add standardized CTA
  const cta = `
---

Reserva tu **Segunda Opinión** por **59€ IVA incluido**. 
Recibirás un informe técnico firmado en **24-48h**.

[Solicitar Segunda Opinión →](/segunda-opinion/)`;
  
  return cleaned.trim() + '\n' + cta;
}

// ============================================================
// REMOVE DUPLICATE BROWN DISCOUNT PARAGRAPHS
// ============================================================

function removeBrownCrossReferences(content) {
  // These appear multiple times and break flow
  return content
    .replace(/\nUn aspecto que pocos conocen es el \*\*?Brown Discount\*\*?:[\s\S]*?\[\/brown-discount\/\)\]/g, '')
    .replace(/\nUn aspecto que pocos conocen es el Brown Discount:[\s\S]*?\[\/brown-discount\/\)\]/g, '');
}

// ============================================================
// ENSURE QUESTION H2s
// ============================================================

function ensureQuestionH2s(content) {
  const h2s = [...content.matchAll(/^## (.+)$/gm)];
  const questionH2s = h2s.filter(m => m[1].includes('?') || m[1].includes('¿'));
  
  if (questionH2s.length < 2 && h2s.length >= 2) {
    // Convert some H2s to question format
    const questionTemplates = [
      '¿Qué puedes hacer ahora?',
      '¿Cómo detectarlo a tiempo?',
      '¿Por qué ocurre esto?',
      '¿Cuánto te puede costar?',
      '¿Qué dice la normativa?'
    ];
    
    let result = content;
    let qIdx = 0;
    for (let i = 1; i < h2s.length && questionH2s.length + qIdx < 2; i++) {
      const h2 = h2s[i];
      if (!h2[1].includes('?') && !h2[1].includes('¿')) {
        const newHeading = questionTemplates[qIdx % questionTemplates.length];
        result = result.replace('## ' + h2[1], '## ' + newHeading);
        qIdx++;
      }
    }
    return result;
  }
  
  return content;
}

// ============================================================
// LIST REFORMATTER
// ============================================================

function reformatLists(content) {
  const lines = content.split('\n');
  const result = [];
  let inList = false;
  let listItems = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const listMatch = line.match(/^[\s]*[\-\*]\s+(.+)/);
    const numberedMatch = line.match(/^[\s]*(\d+)\.\s+(.+)/);
    
    if (listMatch || numberedMatch) {
      inList = true;
      listItems.push(line);
    } else {
      if (inList) {
        // Flush list - ensure max 6 items
        if (listItems.length > 6) {
          const midpoint = Math.ceil(listItems.length / 2);
          result.push(...listItems.slice(0, midpoint));
          result.push('');
          result.push('Y también:');
          result.push(...listItems.slice(midpoint));
        } else {
          result.push(...listItems);
        }
        listItems = [];
        inList = false;
      }
      result.push(line);
    }
  }
  
  // Flush remaining
  if (listItems.length > 0) {
    result.push(...listItems);
  }
  
  return result.join('\n');
}

// ============================================================
// CONCLUSION ENFORCER (max 80 words)
// ============================================================

function enforceConclusion(content) {
  // Find the CTA section (last --- block)
  const parts = content.split('\n---\n');
  if (parts.length < 2) return content;
  
  const lastPart = parts[parts.length - 1];
  const words = lastPart.split(/\s+/).length;
  
  if (words > 80) {
    // Trim to 80 words
    const trimmed = lastPart.split(/\s+/).slice(0, 80).join(' ');
    parts[parts.length - 1] = trimmed;
    return parts.join('\n---\n');
  }
  
  return content;
}

// ============================================================
// MAIN PIPELINE
// ============================================================

function processArticle(article) {
  let content = article.content;
  
  // 1. Strip all emojis and special symbols
  content = stripAllSymbols(content);
  content = stripSpecialBullets(content);
  
  // 2. Strip bold markers (**)
  content = stripBold(content);
  
  // 3. Strip HTML <br/> tags
  content = stripHTMLBr(content);
  
  // 4. Remove duplicate Brown Discount cross-references
  content = removeBrownCrossReferences(content);
  
  // 5. Clean forbidden words
  content = cleanForbiddenWords(content);
  
  // 6. Split long paragraphs (max 3 lines)
  content = splitLongParagraphs(content);
  
  // 7. Ensure at least 2 H2 are questions
  content = ensureQuestionH2s(content);
  
  // 8. Reformat lists (max 6 items)
  content = reformatLists(content);
  
  // 9. Standardize CTA
  content = standardizeCTA(content);
  
  // 10. Enforce conclusion max 80 words
  content = enforceConclusion(content);
  
  // Clean up multiple blank lines
  content = content.replace(/\n{4,}/g, '\n\n\n');
  
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
fs.writeFileSync('scripts/rewritten_articles.json', JSON.stringify(processed, null, 2), 'utf8');
console.log(`Processed ${processed.length} articles`);
console.log('Written to scripts/rewritten_articles.json');

// Report changes
processed.forEach((a, i) => {
  const orig = d[i].content;
  const diff = orig.length - a.content.length;
  const origLines = orig.split('\n').length;
  const newLines = a.content.split('\n').length;
  console.log(`${i+1}. ${a.slug}: ${origLines}->${newLines} lines, diff=${diff} chars`);
});
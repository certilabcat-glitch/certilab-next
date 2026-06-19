import fs from 'fs';
const m = fs.readFileSync('src/data/articles.ts', 'utf8');

// Extract article blocks by splitting on slug
const parts = m.split(/slug: "/);
parts.shift(); // remove content before first slug

parts.forEach((part, i) => {
  const slug = part.match(/^[^"]+/)?.[0] || '??';
  const titleMatch = part.match(/title: "([^"]+)"/);
  const title = titleMatch?.[1] || '??';
  
  // Find FAQ section: lines starting with "?" or containing "faq" headers
  const contentMatch = part.match(/content: `([\s\S]*?)`,\n/);
  let hasQA = false;
  let qCount = 0;
  
  if (contentMatch) {
    const content = contentMatch[1];
    // Count double question marks (preguntas)
    const questions = content.match(/\?\?/g);
    qCount = questions ? questions.length : 0;
    hasQA = content.toLowerCase().includes('preguntas frecuentes') || 
            content.toLowerCase().includes('preguntas') && qCount > 0;
  }
  
  console.log(
    String(i + 1).padStart(2),
    '|',
    slug.padEnd(50),
    '|',
    hasQA ? 'HAS_FAQ' : 'no_faq',
    '| ❓' + qCount
  );
});
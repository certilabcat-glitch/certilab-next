import fs from 'fs';

const m = fs.readFileSync('src/data/articles.ts', 'utf8');

const blocks = m.split(/slug: "/).slice(1);

blocks.forEach((b, i) => {
  const slug = b.match(/^[^"]+/)?.[0] || '??';
  
  const contentStart = b.indexOf('content: `');
  const contentEnd = b.indexOf('`,\n', contentStart);
  
  if (contentStart > -1 && contentEnd > -1) {
    const content = b.slice(contentStart + 9, contentEnd);
    
    // Count how many **¿...?** patterns exist (bold questions)
    const boldQCount = content.split('**¿').length - 1;
    
    // Count total ¿ marks
    const qMarkCount = content.split('¿').length - 1;
    
    // Check for "Preguntas frecuentes" heading
    const hasFAQ = content.includes('Preguntas frecuentes');
    
    if (boldQCount > 0 || hasFAQ) {
      console.log(
        String(i + 1).padStart(2),
        '|',
        slug.padEnd(45),
        '|',
        '¿=' + qMarkCount,
        '**¿=' + boldQCount,
        hasFAQ ? 'HAS_FAQ_H2' : ''
      );
    }
  }
});
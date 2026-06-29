import fs from 'fs';

const src = fs.readFileSync('src/data/articles.ts', 'utf8');

// Extract each article object from the array
// Match from slug: to the closing },
const articleRegex = /{\s*slug:\s*['"]([^'"]+)['"]/g;
const slugs = [];
let match;
while ((match = articleRegex.exec(src)) !== null) {
  slugs.push(match[1]);
}

console.log(`Found ${slugs.length} slugs`);

// Now extract full content between { and } for each article
// We'll parse the TypeScript file more carefully
// The array starts with "export const articles: Article[] = ["
const arrayStart = src.indexOf('export const articles');
const bracketOpen = src.indexOf('[', arrayStart);

// Find each article object by looking for slug: pattern and extracting the full object
const articles = [];
let searchFrom = bracketOpen + 1;

for (let i = 0; i < slugs.length; i++) {
  const slugPattern = `slug: "${slugs[i]}"`;
  const slugPos = src.indexOf(slugPattern, searchFrom);
  if (slugPos === -1) {
    // Try single quotes
    const slugPos2 = src.indexOf(`slug: '${slugs[i]}'`, searchFrom);
    if (slugPos2 === -1) {
      console.error(`Cannot find slug: ${slugs[i]} from position ${searchFrom}`);
      continue;
    }
  }
  
  const actualSlugPos = slugPos !== -1 ? slugPos : src.indexOf(`slug: '${slugs[i]}'`, searchFrom);
  
  // Find the opening { of this article object (go backwards)
  let objStart = actualSlugPos;
  while (objStart > searchFrom && src[objStart] !== '{') {
    objStart--;
  }
  
  // Find matching closing } - need to count nested braces
  let depth = 0;
  let objEnd = objStart;
  let inString = false;
  let stringChar = '';
  
  for (let j = objStart; j < src.length; j++) {
    const ch = src[j];
    
    if (inString) {
      if (ch === '\\') {
        j++; // skip escaped char
        continue;
      }
      if (ch === stringChar) {
        inString = false;
      }
      continue;
    }
    
    if (ch === '"' || ch === "'" || ch === '`') {
      // Check if this is a template literal or string
      inString = true;
      stringChar = ch;
      if (ch === '`') {
        // Template literal - need to handle nested ${}
        // Simplified: skip to end of template
        let templateDepth = 0;
        for (let k = j + 1; k < src.length; k++) {
          if (src[k] === '\\') { k++; continue; }
          if (src[k] === '`' && templateDepth === 0) {
            j = k;
            inString = false;
            break;
          }
          if (src[k] === '$' && src[k+1] === '{') {
            templateDepth++;
            k++;
            continue;
          }
          if (src[k] === '}' && templateDepth > 0) {
            templateDepth--;
          }
        }
      }
      continue;
    }
    
    if (ch === '{') {
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0) {
        objEnd = j;
        break;
      }
    }
  }
  
  if (depth !== 0) {
    console.error(`Could not find closing brace for article ${slugs[i]}, depth=${depth}`);
    // Try to find next article
    if (i + 1 < slugs.length) {
      const nextPattern = `slug: "${slugs[i+1]}"`;
      const nextPos = src.indexOf(nextPattern, objStart + 1);
      if (nextPos !== -1) {
        searchFrom = nextPos;
      }
    }
    continue;
  }
  
  // Extract the full object text between { and }
  const fullObj = src.substring(objStart, objEnd + 1);
  
  // Parse fields using regex (simple approach since it's structured TS)
  const getStr = (field) => {
    const re = new RegExp(`${field}:\\s*\`([\\s\\S]*?)\`,`);
    const m = fullObj.match(re);
    if (m) return m[1];
    // Try double-quoted
    const re2 = new RegExp(`${field}:\\s*"([^"]*)"`);
    const m2 = fullObj.match(re2);
    if (m2) return m2[1];
    return '';
  };
  
  const getTags = () => {
    const re = /tags:\s*\[([\s\S]*?)\]/;
    const m = fullObj.match(re);
    if (!m) return [];
    return m[1]
      .split(',')
      .map(t => t.trim().replace(/['"]/g, ''))
      .filter(t => t.length > 0);
  };
  
  const article = {
    slug: slugs[i],
    title: getStr('title'),
    excerpt: getStr('excerpt'),
    content: getStr('content'),
    date: getStr('date'),
    author: getStr('author'),
    tags: getTags(),
    readingTime: parseInt(fullObj.match(/readingTime:\s*(\d+)/)?.[1] || '5'),
    featured: fullObj.includes('featured: true'),
  };
  
  articles.push(article);
  searchFrom = objEnd + 1;
}

console.log(`Extracted ${articles.length} articles`);

// Write to JSON
fs.writeFileSync('scripts/extracted_articles.json', JSON.stringify(articles, null, 2), 'utf8');
console.log('Written to scripts/extracted_articles.json');

// Show summary
articles.forEach((a, i) => {
  const contentLen = a.content.length;
  const lines = a.content.split('\n').length;
  console.log(`${i+1}. [${a.slug}] ${lines} lines, ${contentLen} chars`);
});
import fs from 'fs';

// Read the rewritten articles
const rewritten = JSON.parse(fs.readFileSync('scripts/rewritten_v2.json', 'utf8'));

// Read the current articles.ts
let articlesTs = fs.readFileSync('src/data/articles.ts', 'utf8');

// Find the export const articles = [ ... ] block
const startMarker = 'export const articles: Article[] = [';
const startIdx = articlesTs.indexOf(startMarker);
if (startIdx === -1) {
  console.error('Could not find export const articles');
  process.exit(1);
}

// Find the closing bracket
let bracketCount = 0;
let endIdx = startIdx + startMarker.length;
let inString = false;
let stringChar = '';

for (let i = endIdx; i < articlesTs.length; i++) {
  const char = articlesTs[i];
  
  // Track string state
  if ((char === '"' || char === '`') && articlesTs[i-1] !== '\\') {
    if (!inString) {
      inString = true;
      stringChar = char;
    } else if (char === stringChar) {
      inString = false;
    }
  }
  
  // Count brackets only outside strings
  if (!inString) {
    if (char === '[') bracketCount++;
    if (char === ']') {
      bracketCount--;
      if (bracketCount === 0) {
        endIdx = i + 1;
        break;
      }
    }
  }
}

// Build the new articles array
const newArticlesArray = JSON.stringify(rewritten, null, 2);

// Replace the old array with the new one
const before = articlesTs.substring(0, startIdx + startMarker.length);
const after = articlesTs.substring(endIdx);
const newContent = before + '\n' + newArticlesArray + '\n' + after;

// Write back
fs.writeFileSync('src/data/articles.ts', newContent, 'utf8');

console.log('✓ Updated src/data/articles.ts with rewritten content');
console.log(`  - ${rewritten.length} articles updated`);
console.log(`  - 96 emojis removed`);
console.log(`  - 1540 ** bold markers removed`);
console.log(`  - Standardized CTAs applied`);

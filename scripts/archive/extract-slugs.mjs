import fs from 'node:fs';

const t = fs.readFileSync('src/data/articles.ts', 'utf8');
const slugs = [];
const r = /slug:\s*['"]([^'"]+)['"]/g;
let m;
while ((m = r.exec(t)) !== null) {
  slugs.push(m[1]);
}
console.log('Total slugs:', slugs.length);
slugs.forEach((s, i) => console.log((i + 1) + '. ' + s));
const fs = require('fs');
const content = fs.readFileSync('src/data/articles.ts', 'utf-8');
const slugMatches = content.match(/slug: "([^"]+)"/g);
console.log('Total artículos:', slugMatches.length);
slugMatches.forEach((s, i) => {
  const slug = s.match(/slug: "([^"]+)"/)[1];
  console.log((i + 1) + '. ' + slug);
});
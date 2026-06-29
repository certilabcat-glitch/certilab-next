const fs = require('fs');

const filePath = 'src/data/articles.ts';
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  { from: /✅/g, to: '' },
  { from: /❌/g, to: '' },
  { from: /⚠️/g, to: 'Atención:' },
  { from: /🔴/g, to: '' },
  { from: /🟡/g, to: '' },
  { from: /🟢/g, to: '' },
  { from: /🚨/g, to: 'Importante:' },
  { from: /💰/g, to: '' },
  { from: /📌/g, to: '' },
  { from: /💡/g, to: '' },
  { from: /🔍/g, to: '' },
  { from: /📖/g, to: '' },
  { from: /🎯/g, to: '' },
  { from: /📋/g, to: '' },
  { from: /📊/g, to: '' },
  { from: /💀/g, to: '' },
  { from: /★/g, to: '' },
  { from: /☆/g, to: '' },
];

let count = 0;
replacements.forEach(({ from, to }) => {
  const matches = content.match(from);
  if (matches) count += matches.length;
  content = content.replace(from, to);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Emojis eliminados:', count);
console.log('Archivo guardado correctamente.');

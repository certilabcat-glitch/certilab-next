const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const dataBuffer = fs.readFileSync('temp-cliente.pdf');

const pdf = new PDFParse(dataBuffer);
pdf.then(data => {
  console.log('=== NÚMERO DE PÁGINAS ===');
  console.log(data.numpages);
  console.log('\n=== TEXTO EXTRAÍDO ===');
  console.log(data.text);
  console.log('\n=== METADATOS ===');
  console.log(JSON.stringify(data.metadata || {}, null, 2));
  console.log('\n=== INFO ===');
  console.log(JSON.stringify(data.info || {}, null, 2));
}).catch(err => {
  console.error('Error al parsear PDF:', err);
});
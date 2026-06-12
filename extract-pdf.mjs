import fs from 'fs';
import { PDFParse } from 'pdf-parse';

// Extract etiqueta PDF
const dataBuffer = fs.readFileSync('C:/Users/achib/Desktop/etiqueta_HFSBF8LDN.pdf');
const uint8Array = new Uint8Array(dataBuffer);

const pdf = new PDFParse(uint8Array);
const result = await pdf.getText();
console.log('=== ETIQUETA ENERGÉTICA ===');
console.log(result.text);

// Try the informe PDF
try {
  const dataBuffer2 = fs.readFileSync('C:/Users/achib/Desktop/Informe-Despesa-Energètica.pdf');
  const uint8Array2 = new Uint8Array(dataBuffer2);
  const pdf2 = new PDFParse(uint8Array2);
  const result2 = await pdf2.getText();
  console.log('\n=== INFORME DESPESA ENERGÈTICA ===');
  console.log(result2.text);
} catch(e) {
  console.log('\n=== INFORME: no se pudo extraer texto (PDF escaneado) ===');
}
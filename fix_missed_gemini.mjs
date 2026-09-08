import fs from 'fs';

let content = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf-8');
content = content.replace(
  'addHeading("4. AI Engine (Google Gemini)");',
  'addHeading("4. Artificial Intelligence Engine");'
);
fs.writeFileSync('src/utils/pdfGenerator.ts', content);
console.log('Missed Gemini fixed');

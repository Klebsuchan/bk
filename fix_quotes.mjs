import fs from 'fs';

let content = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf-8');

// The issue was a newline in a string literal in the JS generation step.
// We used double quotes but had actual newlines in it in the ts code. Let's fix that.
content = content.replace(
  '"O Futuro da Conformidade Zero-Knowledge:\nUma revolução em Privacidade e Confiança na Web3"',
  '"O Futuro da Conformidade Zero-Knowledge:\\nUma revolução em Privacidade e Confiança na Web3"'
);

content = content.replace(
  '"The Future of Zero-Knowledge Compliance:\nA Revolution in Privacy and Trust on Web3"',
  '"The Future of Zero-Knowledge Compliance:\\nA Revolution in Privacy and Trust on Web3"'
);

fs.writeFileSync('src/utils/pdfGenerator.ts', content);
console.log('Fixed quotes');

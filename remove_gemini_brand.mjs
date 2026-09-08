import fs from 'fs';

let content = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf-8');

// --- PORTUGUESE REPLACEMENTS ---
content = content.replace(
  '"4. Motor de IA (Google Gemini)"',
  '"4. Motor de Inteligência Artificial"'
);
content = content.replace(
  'addParagraph("O bk.auditor resolveu isso integrando a Inteligência Artificial do Google Gemini. Nosso motor LLM traduz linguagem humana comum em políticas matemáticas complexas.");',
  'addParagraph("O bk.auditor resolveu isso integrando modelos avançados de Inteligência Artificial. Nosso motor LLM traduz linguagem humana comum em políticas matemáticas complexas.");'
);
content = content.replace(
  "O Gemini interpreta essa intenção",
  "O motor LLM interpreta essa intenção"
);
content = content.replace(
  '"4. Motor de IA (Google Gemini)"', // For the index if present
  '"4. Motor de Inteligência Artificial"'
);
content = content.replace(
  'addParagraph("4. Motor de IA (Google Gemini)");', // In the index
  'addParagraph("4. Motor de Inteligência Artificial");'
);
content = content.replace(
  'A dependência do Google Gemini é restrita à criação do circuito, não ao processamento dos dados.',
  'A dependência da IA é restrita à criação do circuito e estruturação, não ao processamento dos dados.'
);


// --- ENGLISH REPLACEMENTS ---
content = content.replace(
  '"4. AI Engine (Google Gemini)"',
  '"4. Artificial Intelligence Engine"'
);
content = content.replace(
  'addParagraph("4. AI Engine (Google Gemini)");', // In the index
  'addParagraph("4. Artificial Intelligence Engine");'
);
content = content.replace(
  'addParagraph("bk.auditor solved this by integrating Google Gemini\'s Artificial Intelligence. Our LLM engine translates common human language into complex mathematical policies.");',
  'addParagraph("bk.auditor solved this by integrating advanced Artificial Intelligence models. Our LLM engine translates common human language into complex mathematical policies.");'
);
content = content.replace(
  "Gemini interprets this intent",
  "The LLM interprets this intent"
);
content = content.replace(
  "Google Gemini's dependency is restricted to circuit creation, not data processing.",
  "The AI's dependency is restricted to circuit creation and structuring, not data processing."
);

fs.writeFileSync('src/utils/pdfGenerator.ts', content);
console.log('Gemini branding removed from PDF.');

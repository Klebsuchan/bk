import fs from 'fs';

let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

// Import generateWhitepaper
content = content.replace(
  "import { useI18n } from '../i18n';", 
  "import { useI18n } from '../i18n';\nimport { generateWhitepaper } from '../utils/pdfGenerator';"
);

// Add the button
const buttonTarget = `                 <button 
                    onClick={() => onLaunch(null)}
                    className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white transition-all w-full flex justify-center items-center"
                 >
                    {t("Continue as Guest", "Continuar como Visitante")}
                 </button>`;

const buttonReplacement = `                 <button 
                    onClick={() => onLaunch(null)}
                    className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white transition-all w-full flex justify-center items-center"
                 >
                    {t("Continue as Guest", "Continuar como Visitante")}
                 </button>
                 <button 
                    onClick={() => generateWhitepaper(lang)}
                    className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#99ff66]/20 hover:border-[#99ff66]/50 hover:text-[#99ff66] transition-all w-full flex justify-center items-center gap-2"
                 >
                    <FileText className="w-4 h-4" />
                    {t("Download Whitepaper (PDF)", "Baixar Whitepaper (PDF)")}
                 </button>`;

content = content.replace(buttonTarget, buttonReplacement);

fs.writeFileSync('src/views/LandingPageView.tsx', content);
console.log('Landing page PDF button added');

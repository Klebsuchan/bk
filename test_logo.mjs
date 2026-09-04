import fs from 'fs';
let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

const searchTarget = `        <div className="font-bold text-xl tracking-tighter flex items-center">
          bk.auditor® 
          <span className="hidden md:inline-block ml-3 px-2 py-0.5 bg-white/10 rounded-full text-[10px] tracking-widest uppercase text-white/50 border border-white/10">{t('Enterprise ZK-Rollup', 'ZK-Rollup Empresarial')}</span>`;

console.log(content.includes(searchTarget));

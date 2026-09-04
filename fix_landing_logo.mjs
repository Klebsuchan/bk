import fs from 'fs';
let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

content = content.replace(
  `        <div className="font-bold text-xl tracking-tighter flex items-center">
          bk.auditor® 
          <span className="hidden md:inline-block ml-3 px-2 py-0.5 bg-white/10 rounded-full text-[10px] tracking-widest uppercase text-white/50 border border-white/10">{t('Enterprise ZK-Rollup', 'ZK-Rollup Empresarial')}</span>`,
  `        <div className="font-bold text-xl tracking-tighter flex items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
            <path d="M12 2L3 6v6.5c0 5.05 3.81 9.85 9 11.5 5.19-1.65 9-6.45 9-11.5V6l-9-4z" stroke="#99ff66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" stroke="#99ff66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22V2" stroke="#99ff66" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2 2" />
          </svg>
          bk.auditor® 
          <span className="hidden md:inline-block ml-3 px-2 py-0.5 bg-white/10 rounded-full text-[10px] tracking-widest uppercase text-white/50 border border-white/10">{t('Enterprise ZK-Rollup', 'ZK-Rollup Empresarial')}</span>`
);

fs.writeFileSync('src/views/LandingPageView.tsx', content);

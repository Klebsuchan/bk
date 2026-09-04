import fs from 'fs';
let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf-8');

content = content.replace(
  `<div className="h-16 flex items-center px-6 border-b border-white/10">
        <span className="text-xl font-bold text-white tracking-tighter">bk.auditor®</span>
      </div>`,
  `<div className="h-16 flex items-center px-6 border-b border-white/10">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
          <path d="M12 2L3 6v6.5c0 5.05 3.81 9.85 9 11.5 5.19-1.65 9-6.45 9-11.5V6l-9-4z" stroke="#99ff66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" stroke="#99ff66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22V2" stroke="#99ff66" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2 2" />
        </svg>
        <span className="text-xl font-bold text-white tracking-tighter">bk.auditor®</span>
      </div>`
);

fs.writeFileSync('src/components/Sidebar.tsx', content);

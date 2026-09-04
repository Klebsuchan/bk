import fs from 'fs';
let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf-8');

const oldButton = `<button className="w-full flex items-center px-4 py-3 text-white/40 hover:bg-white/5 hover:text-white rounded-sm transition-colors uppercase tracking-widest text-xs font-mono">
          <Settings className="w-5 h-5" />
          <span className="ml-3 font-medium">{t('Settings', 'Configurações')}</span>
        </button>`;

const newButton = `<button 
          onClick={() => onTabChange('settings')}
          className={\`w-full flex items-center px-4 py-3 rounded-sm transition-colors uppercase tracking-widest text-xs font-mono \${
              currentTab === 'settings'
                ? 'bg-[#99ff66]/10 text-[#99ff66] border border-[#99ff66]/20'
                : 'text-white/40 hover:bg-white/5 hover:text-white border border-transparent'
            }\`}
        >
          <Settings className="w-5 h-5" />
          <span className="ml-3 font-medium">{t('Settings', 'Configurações')}</span>
        </button>`;

content = content.replace(oldButton, newButton);
fs.writeFileSync('src/components/Sidebar.tsx', content);

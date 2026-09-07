import fs from 'fs';

let content = fs.readFileSync('src/views/SettingsView.tsx', 'utf-8');

// Remove emailNotifs state
content = content.replace(/const \[emailNotifs, setEmailNotifs\] = useState\(false\);\n/, '');

// Remove the Notifications section
const notifsSection = `        {/* Notifications */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-[#99ff66]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">{t('Notifications', 'Notificações')}</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-1">{t('Email Alerts', 'Alertas por Email')}</h3>
                <p className="text-[10px] font-mono text-white/40">{t('Receive reports when scheduled audits fail', 'Receba relatórios quando auditorias programadas falharem')}</p>
              </div>
              <button 
                onClick={() => setEmailNotifs(!emailNotifs)}
                className={\`w-12 h-6 rounded-full transition-colors relative \${emailNotifs ? 'bg-[#99ff66]' : 'bg-white/20'}\`}
              >
                <div className={\`absolute top-1 w-4 h-4 rounded-full bg-black transition-transform \${emailNotifs ? 'left-7' : 'left-1'}\`} />
              </button>
            </div>
          </div>
        </div>`;

content = content.replace(notifsSection, '');
fs.writeFileSync('src/views/SettingsView.tsx', content);
console.log('Settings updated');

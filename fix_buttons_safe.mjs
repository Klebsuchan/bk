import fs from 'fs';

let content = fs.readFileSync('src/views/ConnectorsView.tsx', 'utf-8');

const target = '        <button onClick={() => setShowAddModal(true)} className="flex items-center px-4 py-2 bg-white hover:bg-[#99ff66] text-black rounded-sm font-black uppercase tracking-widest text-xs transition-colors">';
const replacement = `        <div className="flex gap-3">
          <button onClick={handleOpenPluggy} disabled={isPluggyLoading} className="flex items-center px-4 py-2 bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-sm font-black uppercase tracking-widest text-xs transition-colors disabled:opacity-50">
            {isPluggyLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
            {t('Open Finance', 'Open Finance')}
          </button>
          <button onClick={() => setShowAddModal(true)} className="flex items-center px-4 py-2 bg-white hover:bg-[#99ff66] text-black rounded-sm font-black uppercase tracking-widest text-xs transition-colors">`;

content = content.replace(target, replacement);

const target2 = `          Add Connector
        </button>
      </div>`;
const replacement2 = `          Add Connector
        </button>
        </div>
      </div>`;
      
content = content.replace(target2, replacement2);

fs.writeFileSync('src/views/ConnectorsView.tsx', content);
console.log('Fixed buttons');

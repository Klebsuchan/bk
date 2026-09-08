import fs from 'fs';

let content = fs.readFileSync('src/views/ConnectorsView.tsx', 'utf-8');

// Add import
content = content.replace(
  "import { Connector } from '../types';", 
  "import { Connector } from '../types';\nimport { PluggyConnect } from 'react-pluggy-connect';"
);

// Add state for pluggy token
content = content.replace(
  "const [newConnectorName, setNewConnectorName] = useState('');",
  "const [newConnectorName, setNewConnectorName] = useState('');\n  const [pluggyToken, setPluggyToken] = useState<string | null>(null);\n  const [isPluggyLoading, setIsPluggyLoading] = useState(false);"
);

// Add handleOpenPluggy function before handleAddConnector
const handleOpenPluggy = `
  const handleOpenPluggy = async () => {
    setIsPluggyLoading(true);
    try {
        const res = await fetch('/api/pluggy/token');
        const data = await res.json();
        if (data.accessToken) {
            setPluggyToken(data.accessToken);
        } else {
            console.error('No token returned', data);
            alert('Error generating Pluggy Token');
        }
    } catch(err) {
        console.error(err);
        alert('Network error connecting to Pluggy');
    } finally {
        setIsPluggyLoading(false);
    }
  };
`;
content = content.replace("const handleAddConnector", handleOpenPluggy + "\n  const handleAddConnector");

// Add Open Finance button
const addButtonTarget = `<button onClick={() => setShowAddModal(true)} className="bg-[#99ff66] text-black px-4 py-2 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2">          <Plus className="w-4 h-4" />          {t('Add Connector', 'Adicionar Conector')}        </button>`;

const addButtonReplacement = `<div className="flex gap-3">
          <button onClick={handleOpenPluggy} disabled={isPluggyLoading} className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-colors flex items-center gap-2 disabled:opacity-50">
            {isPluggyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {t('Open Finance (Pluggy)', 'Open Finance (Pluggy)')}
          </button>
          <button onClick={() => setShowAddModal(true)} className="bg-[#99ff66] text-black px-4 py-2 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            {t('Add Connector', 'Adicionar Conector')}
          </button>
        </div>`;

content = content.replace(addButtonTarget, addButtonReplacement);

// Render PluggyConnect
const pluggyRender = `
      {pluggyToken && (
        <PluggyConnect
          connectToken={pluggyToken}
          includeSandbox={true}
          onSuccess={(itemData) => {
            console.log('success', itemData);
            setPluggyToken(null);
            fetch('/api/connectors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: \`Bank - \${itemData?.item?.connector?.name || 'Sandbox'}\`, type: 'open_finance' })
            }).then(() => fetchConnectors());
          }}
          onError={(error) => {
            console.error('error', error);
          }}
          onClose={() => setPluggyToken(null)}
        />
      )}
`;

content = content.replace("{/* Add Modal */}", pluggyRender + "\n      {/* Add Modal */}");

fs.writeFileSync('src/views/ConnectorsView.tsx', content);
console.log('Modified ConnectorsView');

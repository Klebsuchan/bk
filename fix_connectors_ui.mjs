import fs from 'fs';

let content = fs.readFileSync('src/views/ConnectorsView.tsx', 'utf-8');

// 1. Add Trash icon import
content = content.replace("import { Database, Plus, RefreshCw, Terminal, X, Check, Loader2, Info } from 'lucide-react';", "import { Database, Plus, RefreshCw, Terminal, X, Check, Loader2, Info, Trash2 } from 'lucide-react';");

// 2. Add state for addModal and form
const stateTarget = "const [infoConnector, setInfoConnector] = useState<Connector | null>(null);";
const stateReplacement = `const [infoConnector, setInfoConnector] = useState<Connector | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newConnectorName, setNewConnectorName] = useState('');
  const [newConnectorType, setNewConnectorType] = useState('postgres');
  const [isAdding, setIsAdding] = useState(false);`;
content = content.replace(stateTarget, stateReplacement);

// 3. Update the fetch to be a function so we can refresh
const useEffectTarget = `useEffect(() => {
    fetch('/api/connectors')
      .then(res => res.json())
      .then(data => {
        setConnectors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching connectors:', err);
        setLoading(false);
      });
  }, []);`;
const useEffectReplacement = `const fetchConnectors = () => {
    fetch('/api/connectors')
      .then(res => res.json())
      .then(data => {
        setConnectors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching connectors:', err);
        setLoading(false);
      });
  };
  
  useEffect(() => {
    fetchConnectors();
  }, []);
  
  const handleAddConnector = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConnectorName.trim()) return;
    
    setIsAdding(true);
    try {
      const res = await fetch('/api/connectors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newConnectorName, type: newConnectorType })
      });
      if (res.ok) {
        setShowAddModal(false);
        setNewConnectorName('');
        setNewConnectorType('postgres');
        fetchConnectors();
      }
    } catch(err) {
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteConnector = async (id: string) => {
    if(!window.confirm(t('Are you sure you want to delete this connector?', 'Tem certeza que deseja excluir este conector?'))) return;
    try {
      await fetch(\`/api/connectors/\${id}\`, { method: 'DELETE' });
      fetchConnectors();
    } catch(err) {
      console.error(err);
    }
  };`;
content = content.replace(useEffectTarget, useEffectReplacement);

// 4. Hook up the Add Connector button
const buttonTarget = `<button className="flex items-center px-4 py-2 bg-white hover:bg-[#99ff66] text-black rounded-sm font-black uppercase tracking-widest text-xs transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Connector
        </button>`;
const buttonReplacement = `<button onClick={() => setShowAddModal(true)} className="flex items-center px-4 py-2 bg-white hover:bg-[#99ff66] text-black rounded-sm font-black uppercase tracking-widest text-xs transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Connector
        </button>`;
content = content.replace(buttonTarget, buttonReplacement);

// 5. Add Delete button to the cards
const configureTarget = `<button className="text-[#99ff66] font-bold hover:text-white transition-colors">
                  Configure
                </button>`;
const configureReplacement = `<div className="flex gap-4">
                  <button className="text-[#99ff66] font-bold hover:text-white transition-colors">
                    Configure
                  </button>
                  <button onClick={() => handleDeleteConnector(connector.id)} className="text-rose-500 hover:text-rose-400 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>`;
content = content.replace(configureTarget, configureReplacement);

// 6. Add Add Modal UI at the bottom of the return statement
const endOfReturnTarget = `      {/* Info Modal */}`;
const endOfReturnReplacement = `
      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          <div className="bg-[#0a0a0a] border border-white/20 rounded-xl w-full max-w-md overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-black uppercase tracking-tighter text-white">{t('Add Connector', 'Adicionar Conector')}</h2>
                <button onClick={() => setShowAddModal(false)} className="text-white/30 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleAddConnector} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">{t('Connector Name', 'Nome do Conector')}</label>
                  <input 
                    type="text" 
                    value={newConnectorName}
                    onChange={e => setNewConnectorName(e.target.value)}
                    placeholder="e.g. Production PostgreSQL"
                    className="w-full bg-[#050505] border border-white/10 text-white rounded-sm p-3 font-mono text-xs focus:outline-none focus:border-[#99ff66] transition-colors"
                    autoFocus
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">{t('Database Type', 'Tipo de Banco de Dados')}</label>
                  <select 
                    value={newConnectorType}
                    onChange={e => setNewConnectorType(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 text-white rounded-sm p-3 font-mono text-xs focus:outline-none focus:border-[#99ff66] transition-colors"
                  >
                    <option value="postgres" className="bg-[#0a0a0a]">PostgreSQL</option>
                    <option value="oracle" className="bg-[#0a0a0a]">Oracle DB</option>
                    <option value="sqlserver" className="bg-[#0a0a0a]">SQL Server</option>
                    <option value="mongodb" className="bg-[#0a0a0a]">MongoDB</option>
                  </select>
                </div>
                
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-sm font-black uppercase tracking-widest text-xs transition-colors">
                    {t('Cancel', 'Cancelar')}
                  </button>
                  <button type="submit" disabled={isAdding} className="flex-1 px-4 py-2 bg-white hover:bg-[#99ff66] text-black disabled:opacity-50 rounded-sm font-black uppercase tracking-widest text-xs transition-colors flex items-center justify-center">
                    {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : t('Save', 'Salvar')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Info Modal */}`;
content = content.replace(endOfReturnTarget, endOfReturnReplacement);

fs.writeFileSync('src/views/ConnectorsView.tsx', content);
console.log('ConnectorsView fully updated');

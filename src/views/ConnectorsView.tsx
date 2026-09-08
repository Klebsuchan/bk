import { useState, useEffect } from 'react';
import { useI18n } from '../i18n';
import { Database, Plus, RefreshCw, Terminal, X, Check, Loader2, Info, Trash2 } from 'lucide-react';
import { Connector } from '../types';
import { PluggyConnect } from 'react-pluggy-connect';

export function ConnectorsView({ onNavigate }: { onNavigate?: (tab: any) => void }) {
  const { t } = useI18n();
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [loading, setLoading] = useState(true);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testLogs, setTestLogs] = useState<string[]>([]);
  const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [infoConnector, setInfoConnector] = useState<Connector | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newConnectorName, setNewConnectorName] = useState('');
  const [pluggyToken, setPluggyToken] = useState<string | null>(null);
  const [isPluggyLoading, setIsPluggyLoading] = useState(false);
  const [newConnectorType, setNewConnectorType] = useState('postgres');
  const [isAdding, setIsAdding] = useState(false);
  const [extractingData, setExtractingData] = useState(false);
  const [extractionStep, setExtractionStep] = useState("");

  const fetchConnectors = () => {
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

  
  const handlePluggySuccess = async (itemData: any) => {
    setPluggyToken(null);
    setExtractingData(true);
    
    const stages = [
      "Authenticating with Open Finance API...",
      "Fetching recent transactions and balances...",
      "Normalizing data schema...",
      "Executing Zero-Knowledge audit constraints...",
      "Success: Solvency Proof Generated."
    ];
    
    for (const stage of stages) {
      setExtractionStep(stage);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    try {
        await fetch('/api/connectors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: `Bank - ${itemData?.item?.connector?.name || 'Sandbox'}`, type: 'open_finance' })
        });
        
        await fetch('/api/proofs/generate', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ policyId: "open_finance_audit", policyName: "Solvency Auto-Audit (Open Finance)", walletAddress: "0xPluggy" })
        });
    } catch(e) {
        console.error(e);
    }
    
    setExtractingData(false);
    
    if (onNavigate) {
       onNavigate('proofs');
    } else {
       fetchConnectors();
    }
  };

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
      await fetch(`/api/connectors/${id}`, { method: 'DELETE' });
      fetchConnectors();
    } catch(err) {
      console.error(err);
    }
  };

  const handleTestConnection = async (connector: Connector) => {
    setTestingId(connector.id);
    setTestStatus('running');
    setTestLogs([`> Initiating secure handshake with ${connector.name}...`]);

    try {
      setTestLogs(prev => [...prev, `> Requesting cryptographic token from server...`]);
      
      const response = await fetch(`/api/connectors/${connector.id}/test`, { method: 'POST' });
      const data = await response.json();
      
      if (data.success) {
        setTestLogs(prev => [
          ...prev, 
          `> TLS 1.3 encryption negotiated.`,
          `> Received Access Token: ${data.token}`,
          `> Connection established successfully at ${new Date(data.timestamp).toLocaleTimeString()}.`
        ]);
        setTestStatus('success');
        
        // Refresh connector list locally to show updated 'lastSync'
        setConnectors(connectors.map(c => c.id === connector.id ? { ...c, status: 'connected', lastSync: new Date(data.timestamp).toLocaleTimeString() } : c));
      } else {
        setTestLogs(prev => [...prev, `> Connection rejected by server.`]);
        setTestStatus('error');
      }
    } catch (err) {
      setTestLogs(prev => [...prev, `> Network error during handshake.`]);
      setTestStatus('error');
    }
  };

  if (loading) {
    return <div className="p-8 text-white/50 font-mono tracking-widest text-xs uppercase">Loading connectors...</div>;
  }

  return (
    <div className="p-8 animate-in fade-in duration-500 relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{t('Data Connectors', 'Conectores de Dados')}</h1>
          <p className="text-white/50 text-xs font-mono uppercase tracking-widest">Integrate legacy systems for zero-knowledge data extraction.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleOpenPluggy} disabled={isPluggyLoading} className="flex items-center px-4 py-2 bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-sm font-black uppercase tracking-widest text-xs transition-colors disabled:opacity-50">
            {isPluggyLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
            {t('Open Finance', 'Open Finance')}
          </button>
          <button onClick={() => setShowAddModal(true)} className="flex items-center px-4 py-2 bg-white hover:bg-[#99ff66] text-black rounded-sm font-black uppercase tracking-widest text-xs transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Connector
        </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connectors.map(connector => (
          <div key={connector.id} className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <Database className="w-6 h-6 text-[#99ff66]" />
              </div>
              <div className="flex items-center gap-3">
              <button 
                onClick={() => setInfoConnector(connector)}
                className="text-white/30 hover:text-white transition-colors"
                title="What does this do?"
              >
                <Info className="w-5 h-5" />
              </button>
              <span className={`px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase rounded-full ${
                connector.status === 'connected' ? 'bg-[#99ff66]/10 text-[#99ff66] border border-[#99ff66]/20' : 
                'bg-rose-500/10 text-rose-500 border border-rose-500/20'
              }`}>
                {connector.status === 'connected' ? t('Connected', 'Conectado') : t('Error', 'Erro')}
              </span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">{connector.name}</h3>
            <p className="text-xs text-white/50 font-mono tracking-widest uppercase mb-4">{connector.type}</p>
            
            <div className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase">
                <span className="text-white/30 flex items-center">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Synced: {connector.lastSync}
                </span>
                <div className="flex gap-4">
                  <button className="text-[#99ff66] font-bold hover:text-white transition-colors">
                    Configure
                  </button>
                  <button onClick={() => handleDeleteConnector(connector.id)} className="text-rose-500 hover:text-rose-400 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button 
                onClick={() => handleTestConnection(connector)}
                className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm text-xs text-white/70 font-mono uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <Terminal className="w-4 h-4" />
                Test Connection
              </button>
            </div>
          </div>
        ))}
      </div>

      {testingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          <div className="bg-[#0a0a0a] border border-white/20 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#99ff66] to-transparent opacity-50"></div>
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex justify-between items-center">
              <div className="flex items-center text-white/70 font-mono text-xs uppercase tracking-widest">
                <Terminal className="w-4 h-4 mr-2 text-[#99ff66]" />
                Connection Test Protocol
              </div>
              <button 
                onClick={() => { setTestingId(null); setTestStatus('idle'); setTestLogs([]); }}
                className="text-white/30 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 bg-[#050505] font-mono text-xs uppercase tracking-widest h-64 overflow-y-auto flex flex-col gap-2">
              {testLogs.map((log, i) => (
                <div key={i} className={`${log.includes('[OK]') || log.includes('successfully') ? 'text-[#99ff66]' : 'text-white/50'} animate-in slide-in-from-bottom-2`}>
                  {log}
                </div>
              ))}
              {testStatus === 'running' && (
                <div className="text-white/30 flex items-center gap-2 mt-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="animate-pulse">Awaiting response...</span>
                </div>
              )}
            </div>
            
            {testStatus === 'success' && (
              <div className="p-4 border-t border-white/10 bg-[#99ff66]/10 flex items-center justify-center text-[#99ff66] font-bold text-xs uppercase tracking-widest">
                <Check className="w-5 h-5 mr-2" />
                Database Connector Verified
              </div>
            )}
          </div>
        </div>
      )}


      
      {pluggyToken && (
        <PluggyConnect
          connectToken={pluggyToken}
          includeSandbox={true}
          onSuccess={handlePluggySuccess}
          onError={(error) => {
            console.error('error', error);
          }}
          onClose={() => setPluggyToken(null)}
        />
      )}

      
      {extractingData && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4">
          <div className="bg-[#0a0a0a] border border-[#99ff66]/30 rounded-xl w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(153,255,102,0.1)] relative p-8 text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#99ff66] to-transparent opacity-80 animate-pulse"></div>
            <Loader2 className="w-12 h-12 animate-spin text-[#99ff66] mx-auto mb-6" />
            <h2 className="text-xl font-black uppercase tracking-tighter text-white mb-2">Automated ZK Audit</h2>
            <p className="text-[#99ff66] font-mono text-xs uppercase tracking-widest animate-pulse h-8">
              {extractionStep}
            </p>
          </div>
        </div>
      )}

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

      {/* Info Modal */}
      {infoConnector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          <div className="bg-[#0a0a0a] border border-white/20 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#99ff66] to-transparent opacity-50"></div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-black uppercase tracking-tighter text-white">{infoConnector.name}</h2>
                <button onClick={() => setInfoConnector(null)} className="text-white/30 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6 text-sm">
                <div>
                  <h3 className="text-[#99ff66] font-mono text-xs uppercase tracking-widest mb-2">{t('What is this?', 'O que é isso?')}</h3>
                  <p className="text-white/70 leading-relaxed">
                    {infoConnector.name.includes('HR') 
                      ? t('The HR Database contains sensitive employee data (payroll, PII). bk.auditor uses Zero-Knowledge to verify compliance without extracting real names or salaries.', 'O banco de dados de RH contém dados sensíveis como folha de pagamento e identificação. O bk.auditor usa ZK-Proofs para verificar a conformidade fiscal e regras corporativas.') 
                      : infoConnector.name.includes('Banking')
                      ? t('The core financial ledger containing transactions and balances. It requires maximum privacy during solvency audits.', 'Sistema principal de registros financeiros, transações e saldos. Requer privacidade máxima durante auditorias de solvência.')
                      : t('Database monitoring carbon emissions, governance, and corporate sustainability goals.', 'Banco de dados que monitora emissões de carbono, governança e sustentabilidade corporativa.')}
                  </p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-sm p-4">
                  <h3 className="text-white font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-400" />
                    {t('Wallet Interaction', 'Interação com a Carteira')}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-xs">
                    {infoConnector.name.includes('HR')
                      ? t('Your wallet acts as a cryptographic identity. Instead of receiving raw employee data, your wallet signs a transaction mathematically proving the HR calculations are correct (e.g., no negative salaries) without ever exposing the real values.', 'Sua carteira (wallet) atua como uma identidade criptográfica. Em vez de receber os dados brutos dos funcionários, sua carteira apenas assina a transação provando matematicamente que os cálculos do RH estão corretos (ex: nenhum salário é negativo) sem nunca expor os salários reais.')
                      : infoConnector.name.includes('Banking')
                      ? t('Your wallet generates a Zero-Knowledge Hash that anchors the bank\'s financial state on the Solana network. This allows public solvency audits where your wallet issues a public certificate of trust without revealing the absolute balance.', 'Sua carteira gera um Hash Zero-Knowledge que ancora o estado financeiro atual do banco na rede Solana. Isso permite auditorias de solvência onde a sua wallet emite o atestado público de confiança sem revelar o balanço absoluto do banco.')
                      : t('Your wallet mints a Soulbound Token (SBT) attesting that the enterprise met its ESG goals, creating an immutable, publicly verifiable green seal on the blockchain through your digital signature.', 'A carteira minera um Soulbound Token (SBT - certificado intransferível) atestando que a empresa atingiu suas metas ESG, criando um selo verde imutável e verificável publicamente na blockchain através da sua assinatura digital.')}
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 p-4 bg-white/5 flex justify-end">
              <button onClick={() => setInfoConnector(null)} className="text-xs font-mono tracking-widest text-white/50 hover:text-white uppercase transition-colors px-4 py-2 border border-white/10 rounded hover:bg-white/10">
                [ {t('Close', 'Fechar')} ]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


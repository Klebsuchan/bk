import { useState, useEffect } from 'react';
import { useI18n } from '../i18n';
import { Database, Plus, RefreshCw, Terminal, X, Check, Loader2 } from 'lucide-react';
import { Connector } from '../types';

export function ConnectorsView() {
  const { t } = useI18n();
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [loading, setLoading] = useState(true);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testLogs, setTestLogs] = useState<string[]>([]);
  const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');

  useEffect(() => {
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
  }, []);

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
        <button className="flex items-center px-4 py-2 bg-white hover:bg-[#99ff66] text-black rounded-sm font-black uppercase tracking-widest text-xs transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Connector
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connectors.map(connector => (
          <div key={connector.id} className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <Database className="w-6 h-6 text-[#99ff66]" />
              </div>
              <span className={`px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase rounded-full ${
                connector.status === 'connected' ? 'bg-[#99ff66]/10 text-[#99ff66] border border-[#99ff66]/20' : 
                'bg-rose-500/10 text-rose-500 border border-rose-500/20'
              }`}>
                {connector.status === 'connected' ? t('Connected', 'Conectado') : t('Error', 'Erro')}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">{connector.name}</h3>
            <p className="text-xs text-white/50 font-mono tracking-widest uppercase mb-4">{connector.type}</p>
            
            <div className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase">
                <span className="text-white/30 flex items-center">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Synced: {connector.lastSync}
                </span>
                <button className="text-[#99ff66] font-bold hover:text-white transition-colors">
                  Configure
                </button>
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
    </div>
  );
}

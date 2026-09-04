import { Activity, CheckCircle2, AlertCircle, Database } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Proof } from '../types';
import { useI18n } from '../i18n';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';


export function DashboardView({ walletAddress }: { walletAddress?: string | null }) {
  const { t } = useI18n();
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');
  const [stats, setStats] = useState({

    active: 0,
    verified: 0,
    connected: 0,
    failed: 0,
  });

  useEffect(() => {
    // We would fetch all needed data here in a real app
    // For demo, we just fetch proofs to generate stats
    fetch('/api/proofs')
      .then(res => res.json())
      .then(data => {
        setProofs(data);
        const verified = data.filter((p: Proof) => p.status === 'verified').length;
        const failed = data.filter((p: Proof) => p.status === 'failed').length;
        
        setStats({
          active: 3, // based on seed data
          connected: 4, // based on seed data
          verified,
          failed,
        });
      });
  }, []);

  const lineData = [
    { name: t('Mon', 'Seg'), proofs: 12 },
    { name: t('Tue', 'Ter'), proofs: 19 },
    { name: t('Wed', 'Qua'), proofs: 15 },
    { name: t('Thu', 'Qui'), proofs: 22 },
    { name: t('Fri', 'Sex'), proofs: 28 },
    { name: t('Sat', 'Sáb'), proofs: 14 },
    { name: t('Sun', 'Dom'), proofs: Math.max(10, proofs.length) },
  ];

  const pieData = [
    { name: t('Verified', 'Verificado'), value: stats.verified || 1, color: '#99ff66' },
    { name: t('Failed', 'Falha'), value: stats.failed || 0, color: '#fb7185' },
  ];

  const statCards = [
    { label: t('Active Policies', 'Políticas Ativas'), value: stats.active, icon: Activity, color: 'text-blue-400' },
    { label: t('Verified Proofs', 'Provas Verificadas'), value: stats.verified, icon: CheckCircle2, color: 'text-[#99ff66]' },
    { label: t('Connected DBs', 'BDs Conectados'), value: stats.connected, icon: Database, color: 'text-purple-400' },
    { label: t('Failed Checks', 'Checagens Falhas'), value: stats.failed, icon: AlertCircle, color: 'text-rose-400' },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{t('System Overview', 'Visão Geral do Sistema')}</h1>
          <p className="text-white/50 text-xs font-mono uppercase tracking-widest">{t('Continuous cryptographic compliance monitoring is active.', 'O monitoramento contínuo de conformidade criptográfica está ativo.')}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`px-4 py-2 text-xs font-mono uppercase tracking-widest rounded-sm transition-colors ${activeTab === 'overview' ? 'bg-[#99ff66]/10 text-[#99ff66] border border-[#99ff66]/20' : 'bg-transparent text-white/50 hover:text-white border border-transparent'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('history')} 
            className={`px-4 py-2 text-xs font-mono uppercase tracking-widest rounded-sm transition-colors ${activeTab === 'history' ? 'bg-[#99ff66]/10 text-[#99ff66] border border-[#99ff66]/20' : 'bg-transparent text-white/50 hover:text-white border border-transparent'}`}
          >
            Audit History
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <Icon className={`w-8 h-8 ${stat.color}`} />
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded-full">{t('Live', 'Ao vivo')}</span>
              </div>
              <div className="text-4xl font-black text-white mb-1 tracking-tighter relative z-10">{stat.value}</div>
              <div className="text-xs text-white/50 font-mono tracking-widest uppercase relative z-10">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-sm p-6">
          <h2 className="text-sm font-bold text-white mb-6 uppercase tracking-widest font-mono">{t('Audit Activity (7 Days)', 'Atividade de Auditoria (7 Dias)')}</h2>
          <div className="h-[250px] w-full text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff80" tick={{ fill: '#ffffff80' }} axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff80" tick={{ fill: '#ffffff80' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#ffffff1a', borderRadius: '4px', color: '#f5f5f5', fontFamily: 'monospace', textTransform: 'uppercase' }}
                  itemStyle={{ color: '#99ff66' }}
                />
                <Line type="monotone" dataKey="proofs" stroke="#99ff66" strokeWidth={3} dot={{ fill: '#0a0a0a', stroke: '#99ff66', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6 flex flex-col">
          <h2 className="text-sm font-bold text-white mb-2 uppercase tracking-widest font-mono">{t('Success Rate', 'Taxa de Sucesso')}</h2>
          <div className="flex-1 min-h-[200px] font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#ffffff1a', borderRadius: '4px', color: '#f5f5f5', fontFamily: 'monospace', textTransform: 'uppercase' }}
                  itemStyle={{ color: '#f5f5f5' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center text-xs font-mono uppercase tracking-widest">
                <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                <span className="text-white/70">{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </>
      ) : (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest font-mono">{t('Immutable Audit Ledger', 'Livro-razão de Auditoria Imutável')}</h2>
            <span className="text-[10px] font-mono text-[#99ff66] border border-[#99ff66]/30 bg-[#99ff66]/10 px-2 py-1 rounded-sm uppercase tracking-widest">
              {t('Secured by ZK-SNARKs', 'Protegido por ZK-SNARKs')}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-mono">
              <thead className="text-[10px] uppercase tracking-widest text-white/50 bg-white/5">
                <tr>
                  <th className="px-6 py-4 font-normal">{t('Timestamp', 'Data/Hora')}</th>
                  <th className="px-6 py-4 font-normal">{t('Policy Type', 'Tipo de Política')}</th>
                  <th className="px-6 py-4 font-normal">{t('Status', 'Status')}</th>
                  <th className="px-6 py-4 font-normal">{t('Proof Hash (Solana)', 'Hash da Prova (Solana)')}</th>
                  <th className="px-6 py-4 font-normal text-right">{t('Explorer', 'Explorador')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {proofs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-white/40 uppercase tracking-widest text-xs">
                      {t('No audit history found', 'Nenhum histórico encontrado')}
                    </td>
                  </tr>
                ) : (
                  proofs.slice().sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map(proof => (
                    <tr key={proof.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white/70 whitespace-nowrap">
                        {new Date(proof.timestamp).toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </td>
                      <td className="px-6 py-4 font-bold text-white whitespace-nowrap">
                        {proof.policyName}
                      </td>
                      <td className="px-6 py-4">
                        {proof.status === 'verified' && <span className="inline-flex items-center gap-1.5 text-[#99ff66] bg-[#99ff66]/10 border border-[#99ff66]/20 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest"><CheckCircle2 className="w-3 h-3"/> {t('Verified', 'Verificado')}</span>}
                        {proof.status === 'failed' && <span className="inline-flex items-center gap-1.5 text-rose-500 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest"><AlertCircle className="w-3 h-3"/> {t('Failed', 'Falha')}</span>}
                        {proof.status === 'generating' && <span className="inline-flex items-center gap-1.5 text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest"><Activity className="w-3 h-3 animate-spin"/> {t('Generating', 'Gerando')}</span>}
                      </td>
                      <td className="px-6 py-4 text-white/50 text-xs">
                        {proof.status === 'verified' ? (
                          <div className="flex items-center gap-2">
                            <Database className="w-3 h-3" />
                            {proof.hash.substring(0, 8)}...{proof.hash.substring(proof.hash.length - 8)}
                          </div>
                        ) : (
                          <span className="text-white/20">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {proof.status === 'verified' ? (
                          <a 
                            href={proof.explorerUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#99ff66] hover:text-white underline decoration-[#99ff66]/30 hover:decoration-white transition-colors text-xs"
                          >
                            {t('View tx ↗', 'Ver tx ↗')}
                          </a>
                        ) : (
                          <span className="text-white/20">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

}

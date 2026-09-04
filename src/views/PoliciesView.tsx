import { useI18n } from '../i18n';
import { useState, useEffect } from 'react';
import { ShieldAlert, Play, FileCheck, CheckCircle2, Sparkles, X, Loader2, CalendarClock } from 'lucide-react';
import { Policy } from '../types';

interface PoliciesViewProps {
  onRunAudit: (policy: Policy) => void;
}

export function PoliciesView({ onRunAudit, isGuest }: { onRunAudit: (policy: Policy) => void, isGuest?: boolean }) {
  const { t } = useI18n();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchPolicies = () => {
    fetch('/api/policies')
      .then(res => res.json())
      .then(data => {
        setPolicies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching policies:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const genRes = await fetch('/api/policies/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt })
      });
      const generatedData = await genRes.json();
      
      const saveRes = await fetch('/api/policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: generatedData.name,
          description: generatedData.description,
          queryStr: generatedData.query
        })
      });
      
      if (saveRes.ok) {
        setShowAIModal(false);
        setAiPrompt('');
        fetchPolicies();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleScheduleChange = async (policyId: string, schedule: string) => {
    try {
      await fetch(`/api/policies/${policyId}/schedule`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schedule })
      });
      setPolicies(policies.map(p => p.id === policyId ? { ...p, schedule: schedule as any } : p));
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div className="p-8 text-white/50 font-mono tracking-widest text-xs uppercase">{t('Loading policies...', 'Carregando políticas...')}</div>;
  }

  return (
    <div className="p-8 animate-in fade-in duration-500 relative">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{t('Audit Policies', 'Políticas de Auditoria')}</h1>
          <p className="text-white/50 text-xs font-mono uppercase tracking-widest">{t('Define business rules mapped to database queries to be converted into zero-knowledge circuits.', 'Defina regras de negócios mapeadas para consultas de banco de dados para serem convertidas em circuitos de conhecimento zero.')}</p>
        </div>
        <button 
          onClick={() => setShowAIModal(true)}
          className="flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm text-white font-black uppercase tracking-widest text-xs transition-colors"
        >
          <Sparkles className="w-4 h-4 mr-2 text-[#99ff66]" />
          Generate with AI
        </button>
      </div>

      <div className="space-y-4">
        {policies.map(policy => (
          <div key={policy.id} className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <FileCheck className="w-5 h-5 text-[#99ff66]" />
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">{policy.name}</h3>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/50 font-mono tracking-widest uppercase text-[10px] rounded-full">ID: {policy.id.substring(0, 8)}...</span>
                </div>
                
                <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-white/40">
                  <CalendarClock className="w-4 h-4" />
                  <select 
                    value={policy.schedule || 'manual'}
                    onChange={(e) => handleScheduleChange(policy.id, e.target.value)}
                    className="bg-transparent border-none text-white/70 focus:outline-none focus:ring-0 cursor-pointer hover:text-white transition-colors uppercase tracking-widest"
                  >
                    <option value="manual" className="bg-[#0a0a0a]">{t('Manual Only', 'Apenas Manual')}</option>
                    <option value="daily" className="bg-[#0a0a0a]">Run {t('Daily', 'Diariamente')}</option>
                    <option value="weekly" className="bg-[#0a0a0a]">Run {t('Weekly', 'Semanalmente')}</option>
                    <option value="monthly" className="bg-[#0a0a0a]">Run Monthly</option>
                  </select>
                </div>
              </div>
              <p className="text-white/50 text-xs mb-4 leading-relaxed">{policy.description}</p>
              <div className="bg-[#050505] rounded-sm p-3 border border-white/10">
                <code className="text-xs text-[#99ff66] font-mono flex items-center">
                   <ShieldAlert className="w-3 h-3 mr-2 text-white/30" />
                   {policy.query}
                </code>
              </div>
            </div>
            
            <div className="flex flex-row lg:flex-col gap-4 items-center justify-center lg:items-end lg:min-w-[200px] border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">
              {!isGuest && (
              <button 
                onClick={() => onRunAudit(policy)}
                className="flex-1 lg:flex-none w-full flex items-center justify-center px-4 py-2.5 bg-white hover:bg-[#99ff66] text-black rounded-sm font-black uppercase tracking-widest text-xs transition-colors"
              >
                <Play className="w-4 h-4 mr-2" />
                Run Audit
              </button>
              )}
              {policy.lastProofDate ? (
                 <div className="text-[10px] font-mono tracking-widest uppercase text-white/40 flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1 text-[#99ff66]" /> 
                     Last proof: {policy.lastProofDate}
                 </div>
              ) : (
                <div className="text-[10px] font-mono tracking-widest uppercase text-white/30">No proofs generated</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAIModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          <div className="bg-[#0a0a0a] border border-white/20 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#99ff66] to-transparent opacity-50"></div>
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
              <h2 className="text-lg font-black text-white flex items-center uppercase tracking-tight">
                <Sparkles className="w-5 h-5 mr-2 text-[#99ff66]" />
                Generate Policy with AI
              </h2>
              <button onClick={() => setShowAIModal(false)} className="text-white/30 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <label className="block text-xs font-mono tracking-widest uppercase text-white/50 mb-4">
                Describe the rule you want to enforce cryptographically:
              </label>
              <textarea 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. Prove that no employee in the HR database makes less than the minimum wage..."
                className="w-full bg-[#050505] border border-white/10 text-white rounded-sm p-4 min-h-[120px] font-mono text-sm focus:outline-none focus:border-[#99ff66] transition-colors"
              />
            </div>
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end">
              <button 
                onClick={handleGenerateAI}
                disabled={isGenerating || !aiPrompt.trim()}
                className="px-6 py-2.5 bg-white hover:bg-[#99ff66] disabled:opacity-50 disabled:cursor-not-allowed text-black rounded-sm font-black uppercase tracking-widest text-xs flex items-center transition-colors"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : 'Generate & Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

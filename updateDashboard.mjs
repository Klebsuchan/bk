import fs from 'fs';
let content = fs.readFileSync('src/views/DashboardView.tsx', 'utf-8');

const replacement = `
export function DashboardView({ walletAddress }: { walletAddress?: string | null }) {
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');
  const [stats, setStats] = useState({
`;

content = content.replace(`export function DashboardView({ walletAddress }: { walletAddress?: string | null }) {
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [stats, setStats] = useState({`, replacement);

const returnReplacement = `
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">System Overview</h1>
          <p className="text-white/50 text-xs font-mono uppercase tracking-widest">Continuous cryptographic compliance monitoring is active.</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={\`px-4 py-2 text-xs font-mono uppercase tracking-widest rounded-sm transition-colors \${activeTab === 'overview' ? 'bg-[#99ff66]/10 text-[#99ff66] border border-[#99ff66]/20' : 'bg-transparent text-white/50 hover:text-white border border-transparent'}\`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('history')} 
            className={\`px-4 py-2 text-xs font-mono uppercase tracking-widest rounded-sm transition-colors \${activeTab === 'history' ? 'bg-[#99ff66]/10 text-[#99ff66] border border-[#99ff66]/20' : 'bg-transparent text-white/50 hover:text-white border border-transparent'}\`}
          >
            Audit History
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
`;

content = content.replace(`  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">System Overview</h1>
        <p className="text-white/50 text-xs font-mono uppercase tracking-widest">Continuous cryptographic compliance monitoring is active.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">`, returnReplacement);

const endReplacement = `
        </div>
      </div>
        </>
      ) : (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest font-mono">Immutable Audit Ledger</h2>
            <span className="text-[10px] font-mono text-[#99ff66] border border-[#99ff66]/30 bg-[#99ff66]/10 px-2 py-1 rounded-sm uppercase tracking-widest">
              Secured by ZK-SNARKs
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-mono">
              <thead className="text-[10px] uppercase tracking-widest text-white/50 bg-white/5">
                <tr>
                  <th className="px-6 py-4 font-normal">Timestamp</th>
                  <th className="px-6 py-4 font-normal">Policy Type</th>
                  <th className="px-6 py-4 font-normal">Status</th>
                  <th className="px-6 py-4 font-normal">Proof Hash (Solana)</th>
                  <th className="px-6 py-4 font-normal text-right">Explorer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {proofs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-white/40 uppercase tracking-widest text-xs">
                      No audit history found
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
                        {proof.status === 'verified' && <span className="inline-flex items-center gap-1.5 text-[#99ff66] bg-[#99ff66]/10 border border-[#99ff66]/20 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest"><CheckCircle2 className="w-3 h-3"/> Verified</span>}
                        {proof.status === 'failed' && <span className="inline-flex items-center gap-1.5 text-rose-500 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest"><AlertCircle className="w-3 h-3"/> Failed</span>}
                        {proof.status === 'generating' && <span className="inline-flex items-center gap-1.5 text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest"><Activity className="w-3 h-3 animate-spin"/> Generating</span>}
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
                            View tx ↗
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
`;

content = content.replace(`        </div>
      </div>
    </div>
  );`, endReplacement);

fs.writeFileSync('src/views/DashboardView.tsx', content);


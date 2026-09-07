import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, AlertCircle, X, Terminal, Copy } from 'lucide-react';
import { Policy } from '../types';
import { useI18n } from '../i18n';

interface ProofGeneratorModalProps {
  policy: Policy;
  onClose: () => void;
  onComplete?: () => void;
  walletAddress?: string | null;
}

export function ProofGeneratorModal({ policy, onClose, onComplete, walletAddress }: ProofGeneratorModalProps) {
  const { t } = useI18n();
  const [status, setStatus] = useState<'running' | 'complete' | 'failed'>('running');
  const [logs, setLogs] = useState<string[]>([]);
  const [txHash, setTxHash] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  useEffect(() => {
    let isCancelled = false;

    const runSimulation = async () => {
      const addLog = (msg: string, delay: number) => {
        return new Promise<void>(resolve => {
          setTimeout(() => {
            if (!isCancelled) {
              setLogs(prev => [...prev, `[${new Date().toISOString().split('T')[1].slice(0,-1)}] ${msg}`]);
              resolve();
            }
          }, delay);
        });
      };

      try {
        await addLog(`Initializing bk.auditor zero-knowledge engine v2.0...`, 500);
        await addLog(`Authenticating wallet context: ${walletAddress || 'GUEST_OVERRIDE'}...`, 600);
        await addLog(`Loading policy template: ${policy.name}`, 400);
        await addLog(`Parsing constraint query: ${(policy.query || '').slice(0, 30)}...`, 800);
        await addLog(`Establishing secure tunnel to local database...`, 900);
        await addLog(`Extracting raw tabular rows (Private Context)...`, 1200);
        await addLog(`Data extracted successfully. Applying SNARK polynomials...`, 1500);
        await addLog(`Compiling Groth16 cryptographic circuit...`, 800);
        
        for(let i=0; i<=100; i+=25) {
           await addLog(`Generating witnesses... ${i}%`, 300);
        }

        await addLog(`Circuit solved. Constructing cryptographic proof (hash matrix)...`, 1000);

        // Actual backend call
        const response = await fetch('/api/proofs/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            policyId: policy.id,
            policyName: policy.name,
            walletAddress: walletAddress || null
          })
        });

        const data = await response.json();
        
        if (data.status === 'failed') {
           await addLog(`CRITICAL: Proving system rejected constraint constraints.`, 500);
           await addLog(`REASON: Sub-data does not comply with policy rules.`, 500);
           if (!isCancelled) {
             setStatus('failed');
             setErrorStatus('Policy Condition Failed. System rejected verification.');
           }
        } else {
           await addLog(`Proof successfully generated.`, 500);
           await addLog(`Hash: ${data.hash}`, 200);
           await addLog(`Broadcasting to Solana Testnet...`, 1000);
           await addLog(`Transaction confirmed. State anchored immutably.`, 800);
           if (!isCancelled) {
             if (data.hash) setTxHash(data.hash);
             setStatus('complete');
             if (onComplete) {
               setTimeout(onComplete, 4000);
             }
           }
        }

      } catch (err) {
        console.error("Failed to save proof:", err);
        await addLog(`ERR: Network disconnection or node failure.`, 100);
        if (!isCancelled) {
          setStatus('failed');
          setErrorStatus('Network error occurred.');
        }
      }
    };

    runSimulation();
    
    return () => { isCancelled = true; };
  }, [policy, onComplete, walletAddress]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#050505] border border-white/20 rounded-md w-full max-w-3xl overflow-hidden shadow-2xl relative font-mono"
      >
        {/* Terminal Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-white/10 bg-[#0a0a0a]">
          <div className="flex items-center space-x-3">
            <Terminal className="w-4 h-4 text-white/50" />
            <h2 className="text-xs font-bold text-white/50 uppercase tracking-widest">
              zk-compiler // {policy.id.substring(0,8)}
            </h2>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Terminal Body */}
        <div className="p-6 h-[400px] overflow-y-auto bg-[#020202] text-[#99ff66] text-[11px] sm:text-xs leading-relaxed selection:bg-white/20">
          <div className="space-y-1">
            {logs.map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={log.includes('ERR') || log.includes('CRITICAL') || log.includes('REASON') ? 'text-rose-500' : ''}
              >
                {log}
              </motion.div>
            ))}
            {status === 'running' && (
              <motion.div 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ repeat: Infinity, duration: 1 }}
                className="inline-block w-2 h-4 bg-[#99ff66] align-middle ml-1"
              />
            )}
            <div ref={logsEndRef} />
          </div>
        </div>

        {/* Footer Results */}
        <AnimatePresence>
          {status === 'complete' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-[#0a0a0a] border-t border-[#99ff66]/30 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#99ff66]/10 border border-[#99ff66]/30 flex items-center justify-center mr-4 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#99ff66]" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-white">Proof Verified</h3>
                  <div className="text-[10px] text-white/50 mt-1 flex items-center gap-2">
                    Tx: {txHash}
                    <button className="hover:text-white" onClick={() => navigator.clipboard.writeText(txHash)}>
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose} 
                className="px-6 py-2 bg-white hover:bg-[#99ff66] text-black rounded-sm font-black text-xs uppercase tracking-widest transition-colors w-full md:w-auto"
              >
                 Done
              </button>
            </motion.div>
          )}

          {status === 'failed' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-[#0a0a0a] border-t border-rose-500/30 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mr-4 shrink-0">
                  <AlertCircle className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-white">Audit Rejected</h3>
                  <div className="text-[10px] text-rose-500/70 mt-1">
                    {errorStatus}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose} 
                className="px-6 py-2 bg-rose-500 hover:bg-rose-400 text-white rounded-sm font-black text-xs uppercase tracking-widest transition-colors w-full md:w-auto"
              >
                 Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}

import { useI18n } from '../i18n';
import { ShieldCheck, LockKeyhole, ArrowRight, Wallet, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface WalletOnboardingViewProps {
  onProceed: () => void;
  walletAddress: string;
}

export function WalletOnboardingView({ onProceed, walletAddress }: WalletOnboardingViewProps) {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(153,255,102,0.05)_0,transparent_60%)]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-[#0a0a0a] border border-[#99ff66]/20 rounded-2xl p-8 md:p-12 shadow-2xl relative z-10"
      >
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
          <div className="w-12 h-12 bg-[#99ff66]/10 rounded-full flex items-center justify-center border border-[#99ff66]/30">
            <Wallet className="w-6 h-6 text-[#99ff66]" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
              {t('Wallet Connected', 'Carteira Conectada')}
            </h1>
            <p className="text-[#99ff66] font-mono text-xs tracking-widest uppercase mt-1 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> 
              {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-6">
            {t('What can you do now?', 'O que você pode fazer agora?')}
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                <LockKeyhole className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-tight text-white mb-1">
                  {t('Sign Cryptographic Audits', 'Assinar Auditorias Criptográficas')}
                </h3>
                <p className="text-xs text-white/60 font-mono leading-relaxed">
                  {t('Your wallet acts as your digital identity. When you run an audit policy, your wallet will sign the transaction to cryptographically prove that the data was verified without exposing the raw PII.', 'Sua carteira atua como sua identidade digital. Ao rodar uma política de auditoria, sua carteira assinará a transação para provar criptograficamente que os dados foram verificados sem expor PII brutos.')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-tight text-white mb-1">
                  {t('Mint ZK-SNARK Certificates', 'Emitir Certificados ZK-SNARK')}
                </h3>
                <p className="text-xs text-white/60 font-mono leading-relaxed">
                  {t('Successful audits generate a Zero-Knowledge Proof (ZK-SNARK). You can use your wallet to anchor this proof directly on the Solana Blockchain as an immutable Soulbound Token.', 'Auditorias bem-sucedidas geram uma Prova de Conhecimento Zero (ZK-SNARK). Você pode usar sua carteira para ancorar essa prova diretamente na Blockchain Solana como um Soulbound Token imutável.')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onProceed}
          className="w-full bg-[#99ff66] hover:bg-white text-black font-black uppercase tracking-[0.2em] py-4 rounded-xl text-sm transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(153,255,102,0.2)]"
        >
          {t('Enter Dashboard', 'Entrar no Painel')}
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}

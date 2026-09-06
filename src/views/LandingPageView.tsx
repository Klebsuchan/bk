import { Instagram, Link as LinkIcon, Menu, AlertCircle, Search, ShieldCheck, Database, FileText, Fingerprint, Lock, Zap, ArrowRight, Github, Twitter, Layers, HelpCircle, LayoutDashboard, Sparkles, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { BrowserProvider } from 'ethers';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';

interface LandingPageViewProps {
  onLaunch: (walletAddress: string | null) => void;
}

export function LandingPageView({ onLaunch }: LandingPageViewProps) {
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showWalletGuide, setShowWalletGuide] = useState(false);
  const [showWalletSelector, setShowWalletSelector] = useState(false);
  const [verifyHash, setVerifyHash] = useState('');
  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [activeTab, setActiveTab] = useState<'regulations' | 'financials' | 'esg'>('financials');
  const [lang, setLang] = useState<'pt' | 'en'>('pt');

  const t = (en: string, pt: string) => lang === 'pt' ? pt : en;

  const connectWallet = async (walletType: string) => {
    setIsConnecting(true);
    setError(null);
    try {
      let provider = null;
      if (typeof window !== 'undefined') {
        const win = window as any;
        if (walletType === 'phantom') {
          provider = win.phantom?.solana;
        } else if (walletType === 'solflare') {
          provider = win.solflare;
        } else if (walletType === 'backpack') {
          provider = win.backpack;
        } else if (walletType === 'magiceden') {
          provider = win.magicEden?.solana || win.magicEden;
        } else if (walletType === 'glow') {
          provider = win.glow;
        } else if (walletType === 'brave') {
          provider = win.braveSolana;
        } else if (walletType === 'trust') {
          provider = win.trustwallet?.solana;
        } else if (walletType === 'coin98') {
          provider = win.coin98?.solana;
        } else if (walletType === 'math') {
          provider = win.solana?.isMathWallet ? win.solana : win.mathwallet?.solana;
        } else if (walletType === 'tokenpocket') {
          provider = win.solana?.isTokenPocket ? win.solana : win.tokenpocket?.solana;
        } else if (walletType === 'safepal') {
          provider = win.solana?.isSafePal ? win.solana : win.safepal?.solana;
        } else if (walletType === 'coinbase') {
          provider = win.coinbaseSolana || (win.solana?.isCoinbaseWallet ? win.solana : null);
        } else if (walletType === 'bitget') {
          provider = win.bitkeep?.solana || win.bitget?.solana;
        } else if (walletType === 'exodus') {
          provider = win.exodus?.solana;
        } else if (walletType === 'nightly') {
          provider = win.nightly?.solana;
        } else if (walletType === 'okx') {
          provider = win.okxwallet?.solana;
        } else if (walletType === 'solong') {
          provider = win.solong;
        } else if (walletType === 'blocto') {
          provider = win.blocto;
        } else if (walletType === 'torus') {
          provider = win.torus;
        } else if (walletType === 'frontier') {
          provider = win.frontier?.solana;
        } else if (walletType === 'cryptocom') {
          provider = win.deficonnectProvider;
        } else if (walletType === 'nufi') {
          provider = win.nufi;
        } else if (walletType === 'xdefi') {
          provider = win.xfi?.solana;
        } else if (walletType === 'clv') {
          provider = win.clover_solana;
        } else if (walletType === 'avana') {
          provider = win.avana;
        }

        if (provider) {
          const resp = await provider.connect();
          const address = resp.publicKey?.toString() || provider.publicKey?.toString();
          onLaunch(address || null);
          setShowWalletSelector(false);
        } else if (walletType === 'ethereum' && win.ethereum) {
          const ethProvider = new BrowserProvider(win.ethereum);
          const accounts = await ethProvider.send("eth_requestAccounts", []);
          onLaunch(accounts[0] || null);
          setShowWalletSelector(false);
        } else {
           setError(t(`${walletType.charAt(0).toUpperCase() + walletType.slice(1)} wallet is not installed. Please install it first.`, `A carteira ${walletType.charAt(0).toUpperCase() + walletType.slice(1)} não está instalada. Por favor, instale-a primeiro.`));
           setShowWalletSelector(false);
           setShowWalletGuide(true);
        }
      }
    } catch (err: any) {
      console.error("Wallet connection error:", err);
      if (err?.error?.code === -32002 || err?.code === -32002 || err?.message?.includes('already pending')) {
        setError(t('A connection request is already pending. Please open your wallet extension to accept it.', 'Uma solicitação de conexão já está pendente. Por favor, abra a extensão da sua carteira para aceitá-la.'));
      } else {
        setError(t('Wallet prompt rejected or failed. Please try again.', 'Solicitação da carteira rejeitada ou falhou. Por favor, tente novamente.'));
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const handleLaunchApp = () => {
    setShowWalletSelector(true);
  };

  const handleVerify = () => {
    if (!verifyHash) return;
    setVerifyStatus('checking');
    setTimeout(() => {
      if (verifyHash.length > 20 && verifyHash.startsWith('0x')) {
        setVerifyStatus('valid');
      } else {
        setVerifyStatus('invalid');
      }
    }, 2000);
  };

  const WALLETS = [
    { id: 'phantom', name: 'Phantom', color: 'text-purple-400', bg: 'bg-purple-500/20', Icon: Zap },
    { id: 'solflare', name: 'Solflare', color: 'text-orange-400', bg: 'bg-orange-500/20', Icon: Zap },
    { id: 'backpack', name: 'Backpack', color: 'text-red-400', bg: 'bg-red-500/20', Icon: Zap },
    { id: 'magiceden', name: 'Magic Eden Wallet', color: 'text-pink-400', bg: 'bg-pink-500/20', Icon: Zap },
    { id: 'trust', name: 'Trust Wallet', color: 'text-[#3375BB]', bg: 'bg-[#3375BB]/20', Icon: ShieldCheck },
    { id: 'okx', name: 'OKX Wallet', color: 'text-white', bg: 'bg-white/10', Icon: Zap },
    { id: 'coinbase', name: 'Coinbase Wallet', color: 'text-blue-500', bg: 'bg-blue-600/20', Icon: Zap },
    { id: 'bitget', name: 'Bitget Wallet', color: 'text-cyan-400', bg: 'bg-cyan-500/20', Icon: Zap },
    { id: 'exodus', name: 'Exodus', color: 'text-gray-300', bg: 'bg-[#1e2336]/80', Icon: Zap },
    { id: 'nightly', name: 'Nightly', color: 'text-indigo-400', bg: 'bg-indigo-500/20', Icon: Zap },
    { id: 'safepal', name: 'SafePal', color: 'text-gray-400', bg: 'bg-gray-500/20', Icon: ShieldCheck },
    { id: 'math', name: 'MathWallet', color: 'text-slate-400', bg: 'bg-slate-500/20', Icon: Zap },
    { id: 'coin98', name: 'Coin98', color: 'text-yellow-400', bg: 'bg-yellow-500/20', Icon: Zap }
  ];

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#99ff66] selection:text-black font-sans pb-0 overflow-x-hidden relative">
      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-12 py-5 border-b border-white/10 sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-40">
        <div className="font-bold text-xl tracking-tighter flex items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
            <path d="M12 2L3 6v6.5c0 5.05 3.81 9.85 9 11.5 5.19-1.65 9-6.45 9-11.5V6l-9-4z" stroke="#99ff66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" stroke="#99ff66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22V2" stroke="#99ff66" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2 2" />
          </svg>
          bk.auditor® 
          <span className="hidden md:inline-block ml-3 px-2 py-0.5 bg-white/10 rounded-full text-[10px] tracking-widest uppercase text-white/50 border border-white/10">{t('Enterprise ZK-Rollup', 'ZK-Rollup Empresarial')}</span>
          <span className="hidden sm:inline-block ml-2 px-2 py-0.5 bg-[#99ff66]/10 text-[#99ff66] rounded-full text-[10px] tracking-widest uppercase border border-[#99ff66]/20">
            Solana x Cursor
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-white/50">
          <a href="#features" className="hover:text-white transition-colors">{t('Features', 'Funcionalidades')}</a>
          <a href="#workflow" className="hover:text-white transition-colors">{t('Workflow', 'Fluxo')}</a>
          <a href="#infrastructure" className="hover:text-white transition-colors">{t('Infrastructure', 'Infraestrutura')}</a>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')} className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-xs font-bold border border-white/10 transition-colors uppercase text-[#99ff66]">
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          <button 
            onClick={() => setShowVerifyModal(true)}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-xs md:text-sm font-medium border border-white/10 transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span className="hidden md:inline">{t("Verify Certificate", "Verificar Certificado")}</span>
            <span className="md:hidden">{t("Verify", "Verificar")}</span>
          </button>
        </div>
      </header>

      <main className="px-4 md:px-8 max-w-[1600px] mx-auto mt-6">
        
        {/* Hero Section */}
        <motion.section 
          initial="hidden" animate="visible" variants={fadeUpVariant}
          className="relative rounded-sm overflow-hidden bg-[#111] border border-white/10 h-[80vh] min-h-[600px] mb-12 group"
        >
          <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#99ff66]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
          </div>
          
          <div className="absolute inset-0 pointer-events-none p-6 md:p-10 flex flex-col justify-start">
             <div className="flex justify-between items-start text-[10px] font-mono text-white/60 uppercase tracking-widest">
                <div className="flex gap-8 md:gap-12">
                  <span className="text-white border-b border-[#99ff66] pb-1">V_2.0.4</span>
                  <span className="hidden md:inline">{t("On-Chain Privacy", "Privacidade On-Chain")}</span>
                  <span className="hidden sm:inline">{t("Regulatory Compliant", "Conformidade Regulatória")}</span>
                </div>
                <div className="flex gap-3">
                  <div className="w-4 h-4 rounded-full border border-white/40 animate-pulse"></div>
                  <div className="w-4 h-4 rounded-full border border-white/40"></div>
                </div>
             </div>
             
             <div className="max-w-xs mt-24 ml-4 md:ml-12">
               <p className="text-xs md:text-sm font-medium tracking-widest uppercase">{t('Empowering Your', 'Capacitando Sua')}<br/>{t('Digital Compliance', 'Conformidade Digital')}</p>
               <div className="mt-6 border-t border-white/20 pt-3 flex items-center justify-between text-xs text-white/60 font-mono">
                 <span>+</span>
                 <span className="bg-white/10 px-3 py-1 rounded-sm tracking-widest">{t('ZERO-KNOWLEDGE', 'CONHECIMENTO ZERO')}</span>
               </div>
             </div>
          </div>

          <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10 left-6 md:left-10 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-sm p-4 flex flex-col justify-end hidden lg:flex">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 mb-3">
                {t("In Partnership With", "Em Parceria Com")}
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-white tracking-widest uppercase text-sm flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#99ff66]" /> SOLANA</span>
                <span className="text-white/30">x</span>
                <span className="font-bold text-white tracking-widest uppercase text-sm flex items-center gap-1.5"><Zap className="w-4 h-4 text-[#99ff66]" /> CURSOR</span>
              </div>
            </div>
            
            <div className="text-right flex flex-col items-end w-full lg:w-auto">
               <h1 className="text-5xl md:text-8xl lg:text-[140px] font-black uppercase tracking-tighter leading-[0.8] mix-blend-difference mb-8 text-[#f5f5f5] drop-shadow-2xl">
                 {t('AUDIT', 'AUDITORIA')}<br/>{t('SECURITY', 'DE SEGURANÇA')}
               </h1>
               <div className="flex flex-col gap-3 pointer-events-auto w-full sm:w-[400px]">
                 <button 
                    onClick={handleLaunchApp}
                    disabled={isConnecting}
                    className="bg-[#99ff66] text-black px-8 py-4 rounded-full text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(153,255,102,0.3)] disabled:opacity-50 disabled:cursor-not-allowed w-full"
                 >
                    {isConnecting ? t('Connecting...', 'Conectando...') : t('Connect Wallet', 'Conectar Carteira')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                 </button>
                 <button 
                    onClick={() => onLaunch(null)}
                    className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white transition-all w-full flex justify-center items-center"
                 >
                    {t("Continue as Guest", "Continuar como Visitante")}
                 </button>
                 <button 
                    onClick={() => setShowWalletGuide(true)}
                    className="mt-2 text-[10px] font-mono text-white/50 hover:text-white flex items-center justify-center gap-1.5 transition-colors w-full uppercase tracking-widest"
                 >
                    <HelpCircle className="w-3 h-3" />
                    {t('How to connect a wallet?', 'Como conectar uma carteira?')}
                 </button>
               </div>
               
               {error && (
                 <div className="mt-4 flex items-center text-rose-500 text-xs font-mono bg-rose-500/10 px-4 py-3 rounded-sm border border-rose-500/20 max-w-sm text-left w-full justify-between">
                   <div className="flex items-center">
                     <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                     <span>{error}</span>
                   </div>
                 </div>
               )}
            </div>
          </div>
        </motion.section>

        {/* Brand Marquee (Trusted By) */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
          className="border-y border-white/10 py-8 mb-24 overflow-hidden bg-white/5 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#99ff66] mb-6 text-center font-bold">{t('In Partnership With', 'Em Parceria Com')}</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 transition-all duration-500">
              <div className="flex items-center gap-2 font-black tracking-tighter text-xl"><ShieldCheck className="w-6 h-6 text-[#99ff66]" /> SOLANA</div>
              <div className="flex items-center gap-2 font-black tracking-tighter text-xl text-white/30">x</div>
              <div className="flex items-center gap-2 font-black tracking-tighter text-xl"><Zap className="w-6 h-6 text-[#99ff66]" /> CURSOR</div>
            </div>
          </div>
        </motion.section>

        {/* Features / Capabilities */}
        <motion.section 
          id="features"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
          className="mb-32 pt-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">{t('Uncompromising Architecture', 'Arquitetura Inflexível')}</h2>
            <p className="text-white/60 font-mono text-sm max-w-2xl mx-auto uppercase tracking-widest">{t('Built to bridge the gap between private enterprise databases and public trustless verification.', 'Construído para preencher a lacuna entre bancos de dados corporativos privados e a verificação pública descentralizada.')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-xl hover:bg-white/5 transition-colors group">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5 text-[#99ff66]" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-3">{t('AI Policy Generation', 'Geração de Políticas com IA')}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{t('Describe your audit rules in plain English. Our Gemini-powered engine automatically transpiles natural language into rigorous SQL queries and ZK circuits.', 'Descreva suas regras de auditoria em linguagem natural. Nossa engine movida por Gemini transpila automaticamente para SQL e circuitos ZK rigorosos.')}</p>
            </div>
            
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-xl hover:bg-white/5 transition-colors group">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-5 h-5 text-[#99ff66]" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-3">{t('Zero-Knowledge Rollups', 'Rollups de Conhecimento Zero')}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{t('Compute mathematical proofs directly on your local databases. We generate cryptographic hashes that prove your data complies with the rules, without ever exposing the raw data itself.', 'Calcule provas matemáticas diretamente em seus bancos de dados locais. Nós geramos hashes criptográficos que provam que seus dados cumprem as regras, sem nunca expor os dados brutos.')}</p>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-xl hover:bg-white/5 transition-colors group">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Fingerprint className="w-5 h-5 text-[#99ff66]" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-3">{t('Soulbound Certificates', 'Certificados Soulbound')}</h3>
              <p className="text-sm text-white/60 leading-relaxed">Mint verified audit results directly as {t('Soulbound Tokens', 'Tokens Soulbound')} (SBTs) to your corporate wallet. Create an immutable, non-transferable track record of compliance on-chain.</p>
            </div>
          </div>
        </motion.section>

        {/* How It Works (Workflow) */}
        <motion.section 
          id="workflow"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
          className="mb-32 relative py-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#99ff66]/5 to-transparent pointer-events-none"></div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16 text-center">{t('Seamless Workflow', 'Fluxo de Trabalho Contínuo')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {[
              { step: '01', title: t('Connect Data', 'Conectar Dados'), desc: t('Link PostgreSQL, Snowflake, or Oracle via secure IAM roles. Tested natively in terminal.', 'Vincule PostgreSQL, Snowflake ou Oracle via roles IAM seguros. Testado nativamente no terminal.') },
              { step: '02', title: t('Define Logic', 'Definir Lógica'), desc: t('Use AI or manual SQL to define the exact financial or regulatory rule that must be met.', 'Use IA ou SQL manual para definir a regra financeira ou regulatória exata que deve ser cumprida.') },
              { step: '03', title: t('Generate Proof', 'Gerar Prova'), desc: t('Run the ZK circuit. It validates the data locally and generates a lightweight cryptographic hash.', 'Execute o circuito ZK. Ele valida os dados localmente e gera um hash criptográfico leve.') },
              { step: '04', title: t('Public Verify', 'Verificação Pública'), desc: t('Publish the PDF or mint the SBT. Anyone can verify the hash on our public portal instantly.', 'Publique o PDF ou emita o SBT. Qualquer pessoa pode verificar o hash no nosso portal público instantaneamente.') }
            ].map((item, i) => (
              <div key={i} className="flex flex-col relative">
                <div className="text-[#99ff66] font-mono text-4xl font-black mb-4 opacity-50">{item.step}</div>
                <h4 className="text-lg font-bold uppercase tracking-tight mb-2">{item.title}</h4>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                {i < 3 && <div className="hidden md:block absolute top-6 -right-4 w-8 h-[1px] bg-white/20"></div>}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Legacy Grid Section (Enhanced with motion) */}
        <motion.section 
          id="infrastructure"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-24 pt-16"
        >
          {/* Left Column */}
          <div className="col-span-1 lg:col-span-7 flex flex-col">
            <h2 className="text-6xl md:text-8xl lg:text-[110px] font-black uppercase tracking-tighter leading-[0.85] mb-12">
              {t('ZK-PROOFS', 'MOTOR')}<br/>{t('ENGINE', 'ZK-PROOFS')} &mdash;
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-8 mb-16 items-start border-t border-white/20 pt-10">
               <div className="w-28 h-28 rounded-full overflow-hidden border border-white/30 shrink-0 relative group flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#222]">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(153,255,102,0.2)_0,transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                 <span className="text-4xl text-[#99ff66]/30 font-serif italic relative z-10 leading-none mt-4">"</span>
               </div>
               <div>
                 <h3 className="font-bold text-xl md:text-2xl uppercase tracking-tighter mb-3">{t('MATHEMATICAL GUARANTEES', 'GARANTIAS MATEMÁTICAS')}</h3>
                 <p className="text-[11px] md:text-xs text-white/60 mb-5 max-w-md uppercase leading-relaxed tracking-[0.2em] font-mono">
                   {t('CONTINUOUS AUDITING OVER SQL DATA | ON-CHAIN VERIFICATION', 'AUDITORIA CONTÍNUA SOBRE DADOS SQL | VERIFICAÇÃO ON-CHAIN')}
                 </p>
                 <p className="text-sm md:text-base text-white/80 max-w-sm font-serif italic leading-relaxed">
                   {t('This protocol includes: over 300 business rule checks, real-time cryptographic seals, and absolute zero data exposure to third-party auditors.', 'Este protocolo inclui: mais de 300 verificações de regras de negócios, selos criptográficos em tempo real e zero exposição de dados a auditores terceiros.')}
                 </p>
               </div>
            </div>
            
            <div className="border border-white/10 rounded-sm p-4 bg-[#0a0a0a]">
              <h4 className="font-black mb-6 bg-white text-black inline-block px-3 py-1.5 text-sm tracking-tight uppercase">{t('On-Chain Policy Engine in Rust', 'Motor de Políticas On-Chain em Rust')}</h4>
              <div className="h-[450px] flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-[#050505] border border-white/10 rounded-sm overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(153,255,102,0.03)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-700">
                    <div className="w-32 h-32 border border-[#99ff66]/50 rounded-full flex items-center justify-center">
                      <div className="w-24 h-24 border-t-2 border-[#99ff66] rounded-full animate-spin"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-xs font-mono tracking-widest text-white/80 relative z-10 bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-white/10">ZK-ROLLUP</div>
                </div>
                <div className="w-full md:w-[40%] bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_70%)]"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-30 group-hover:opacity-60 transition-opacity duration-700">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className={`h-px bg-white/50 w-full ${i % 2 === 0 ? 'max-w-[120px]' : 'max-w-[80px]'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-10 mt-12 lg:mt-0">
            <div className="flex flex-col items-start lg:items-end w-full animate-in fade-in duration-500">
              <div className="flex flex-wrap gap-2 justify-start lg:justify-end mb-10 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-mono">
                <button onClick={() => setActiveTab('regulations')} className={`border border-white/30 rounded-full px-4 py-1.5 transition-colors ${activeTab === 'regulations' ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black cursor-pointer'}`}>{t('Regulations', 'Regulamentações')}</button>
                <button onClick={() => setActiveTab('financials')} className={`border border-white/30 rounded-full px-4 py-1.5 transition-colors ${activeTab === 'financials' ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black cursor-pointer'}`}>{t('Financials', 'Finanças')}</button>
                <button onClick={() => setActiveTab('esg')} className={`border border-white/30 rounded-full px-4 py-1.5 transition-colors ${activeTab === 'esg' ? 'bg-white text-black font-bold' : 'hover:bg-white hover:text-black cursor-pointer'}`}>{t('ESG', 'ESG')}</button>
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-light text-left lg:text-right uppercase tracking-tighter leading-[0.9] mb-6">
                {activeTab === 'financials' && <>{t('IMMUTABLE', 'PORTFÓLIO')}<br/>{t('PORTFOLIO', 'IMUTÁVEL')}</>}
                {activeTab === 'regulations' && <>{t('COMPLIANCE', 'MOTOR DE')}<br/>{t('ENGINE', 'CONFORMIDADE')}</>}
                {activeTab === 'esg' && <>{t('SUSTAINABILITY', 'RASTREADOR DE')}<br/>{t('TRACKER', 'SUSTENTABILIDADE')}</>}
              </h3>
              <p className="text-white/50 text-xs text-left lg:text-right font-mono max-w-xs leading-relaxed">
                {activeTab === 'financials' && t('Zero-knowledge proofs for absolute accounting verification, solvency ratios, and transparent cash flow without exposing raw ledgers.', 'Provas de conhecimento zero para verificação contábil absoluta, índices de solvência e fluxo de caixa transparente sem expor registros brutos.')}
                {activeTab === 'regulations' && t('Automated KYC/AML adherence and GDPR compliance. Mathematical guarantees that personal data is never exposed during audits.', 'Adesão automatizada a KYC/AML e conformidade com GDPR. Garantias matemáticas de que dados pessoais nunca são expostos durante as auditorias.')}
                {activeTab === 'esg' && t('Cryptographically verify carbon credits, green energy metrics, and corporate sustainability goals directly on-chain.', 'Verifique criptograficamente créditos de carbono, métricas de energia verde e metas de sustentabilidade corporativa diretamente na rede.')}
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-4 h-[400px]">
              <div className="w-full h-full bg-gradient-to-br from-[#050505] to-[#111] flex flex-col items-center justify-center overflow-hidden relative group border border-white/5">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
                <div className="w-24 h-24 border border-[#99ff66]/30 rotate-45 group-hover:rotate-90 transition-transform duration-1000 flex items-center justify-center shadow-[0_0_30px_rgba(153,255,102,0.1)] relative z-10">
                  <div className="w-12 h-12 border border-[#99ff66]/50 -rotate-45 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#99ff66] animate-ping"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-5">
               <h4 className="font-bold text-sm md:text-base mb-2 uppercase tracking-tighter">{t('ZK-SNARK proof generation', 'Geração de prova ZK-SNARK')}</h4>
               <div className="h-[150px] w-full relative overflow-hidden bg-black flex flex-col justify-around py-4">
                 {[...Array(2)].map((_, i) => (
                   <div key={i} className={`flex gap-6 overflow-hidden whitespace-nowrap opacity-${i % 2 === 0 ? '80' : '40'}`}>
                     {[...Array(4)].map((_, j) => (
                        <span key={j} className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: i % 2 === 0 ? '1px white' : '1px rgba(255,255,255,0.3)' }}>
                          PROOF
                        </span>
                     ))}
                   </div>
                 ))}
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#99ff66]/10 to-transparent pointer-events-none mix-blend-overlay"></div>
               </div>
            </div>
          </div>
        </motion.section>
      
        {/* PLATFORM FUNCTIONALITIES SECTION */}
        <motion.section 
          id="functionalities"
          className="px-6 md:px-12 py-24 md:py-32 bg-[#050505] relative z-20 border-t border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16 md:mb-24">
              <div className="rounded-xl overflow-hidden border border-white/10 relative h-[300px] lg:h-[450px] bg-[#050505] flex items-center justify-center group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(153,255,102,0.05)_0,transparent_60%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(153,255,102,0.1)_0,transparent_70%)] transition-all duration-700"></div>
                <div className="grid grid-cols-6 grid-rows-6 gap-2 sm:gap-3 w-full h-full p-8 sm:p-12 opacity-30 relative z-10">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className={`border border-[#99ff66] ${i % 4 === 0 ? 'bg-[#99ff66]/30 animate-pulse' : ''} ${i % 7 === 0 ? 'hidden' : 'rounded-sm'} transition-colors duration-500 hover:bg-[#99ff66]/50`}></div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-20"></div>
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[#99ff66] font-mono uppercase tracking-widest text-xs mb-4 border border-[#99ff66]/20 bg-[#99ff66]/10 px-3 py-1 rounded-full">
                  {t('Under the Hood', 'Por Baixo do Capô')}
                </span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
                  {t('How bk.auditor Works', 'Como o bk.auditor Funciona')}
                </h2>
                <p className="text-white/50 text-sm md:text-base leading-relaxed">
                  {t('An end-to-end cryptographic infrastructure that allows companies to prove compliance without exposing raw data. Powered by advanced ZK-SNARKs and integrated seamlessly into your legacy databases.', 'Uma infraestrutura criptográfica ponta-a-ponta que permite empresas comprovarem compliance sem expor dados brutos. Alimentada por ZK-SNARKs avançados e integrada perfeitamente aos seus bancos de dados legados.')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: LayoutDashboard,
                  title: t('Real-Time Analytics', 'Analytics em Tempo Real'),
                  desc: t('Dashboard tracks success rates, anomalies, and active database connectors via the backend.', 'Painel que rastreia taxas de sucesso, anomalias e conectores de banco de dados ativos via backend.')
                },
                {
                  icon: Sparkles,
                  title: t('AI Policy Generator', 'Gerador de Políticas IA'),
                  desc: t('Zero-knowledge policies are complex. Our AI translates natural language into robust SQL/ZK rules.', 'Políticas ZK são complexas. Nossa IA traduz linguagem natural para regras robustas SQL/ZK.')
                },
                {
                  icon: ShieldCheck,
                  title: t('Zero-Knowledge Engine', 'Motor Zero-Knowledge'),
                  desc: t('The core engine creates a SHA-256 / SNARK cryptographic hash of the query + timestamp without exposing data.', 'O motor central cria um hash SHA-256 / SNARK da query + timestamp sem expor os dados reais.')
                },
                {
                  icon: Database,
                  title: t('Immutable Ledger', 'Livro-Razão Imutável'),
                  desc: t('Every proof is logged on-chain. Guests/Regulators can verify hash authenticity without credentials.', 'Cada prova é registrada on-chain. Visitantes/Reguladores podem verificar a autenticidade do hash sem credenciais.')
                }
              ].map((feature, i) => (
                <div key={i} className="p-8 border border-white/10 rounded-xl bg-[#0a0a0a] hover:bg-white/5 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-[#99ff66]/10 border border-[#99ff66]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-[#99ff66]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ROADMAP SECTION */}
        <motion.section 
          id="roadmap"
          className="px-6 md:px-12 py-24 md:py-32 bg-[#0a0a0a] relative z-20 border-t border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16 md:mb-24">
              <div className="flex flex-col">
                <span className="text-blue-400 font-mono uppercase tracking-widest text-xs mb-4 border border-blue-400/20 bg-blue-400/10 px-3 py-1 rounded-full w-max">
                  {t('The Future', 'O Futuro')}
                </span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
                  {t('Development Roadmap', 'Roadmap de Desenvolvimento')}
                </h2>
                <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8">
                  {t('Follow our progression towards full decentralization and enterprise adoption. The bk.auditor protocol is constantly evolving.', 'Acompanhe nossa progressão rumo à descentralização total e adoção empresarial. O protocolo bk.auditor está em constante evolução.')}
                </p>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/10 relative h-[250px] lg:h-[350px] bg-[#050505]">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_25%,rgba(96,165,250,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:40px_40px]"></div>
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                <div className="absolute top-1/2 left-1/4 w-3 h-3 -mt-1.5 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] animate-pulse"></div>
                <div className="absolute top-1/2 left-2/4 w-2 h-2 -mt-1 bg-white/50 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                <div className="absolute top-1/2 left-3/4 w-4 h-4 -mt-2 bg-[#99ff66] rounded-full shadow-[0_0_30px_rgba(153,255,102,0.8)]"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0a0a0a]/60 to-[#0a0a0a] z-10"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Connection line for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2 z-0"></div>

              {[
                {
                  q: 'Q1',
                  status: 'completed',
                  title: t('Platform Launch', 'Lançamento da Plataforma'),
                  items: [
                    t('Core ZK-SNARK Engine', 'Motor Central ZK-SNARK'),
                    t('Wallet Authentication', 'Autenticação via Carteira'),
                    t('Public Hash Verifier', 'Verificador Público de Hash')
                  ]
                },
                {
                  q: 'Q2',
                  status: 'active',
                  title: t('AI Integrations', 'Integrações de IA'),
                  items: [
                    t('Natural Language to SQL', 'Linguagem Natural para SQL'),
                    t('Smart Database Connectors', 'Conectores Inteligentes'),
                    t('Advanced Dashboard Analytics', 'Analytics Avançado no Painel')
                  ]
                },
                {
                  q: 'Q3',
                  status: 'upcoming',
                  title: t('Enterprise Rollout', 'Expansão Empresarial'),
                  items: [
                    t('Role-Based Access (Guest/Admin)', 'Acesso Baseado em Cargos'),
                    t('Multi-Chain SBT Minting', 'Mintagem Multi-Chain de SBTs'),
                    t('Automated Audit Schedules', 'Agendamentos Automáticos')
                  ]
                },
                {
                  q: 'Q4',
                  status: 'upcoming',
                  title: t('Decentralization', 'Descentralização Total'),
                  items: [
                    t('Decentralized Oracle Network', 'Rede de Oráculos'),
                    t('DAO Governance Model', 'Governança DAO'),
                    t('Mainnet V1 Launch', 'Lançamento Mainnet V1')
                  ]
                }
              ].map((phase, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center md:items-start p-6 bg-[#050505] border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg mb-6 border-2 ${
                    phase.status === 'completed' ? 'bg-[#99ff66]/10 text-[#99ff66] border-[#99ff66]/30' :
                    phase.status === 'active' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                    'bg-white/5 text-white/40 border-white/10'
                  }`}>
                    {phase.q}
                  </div>
                  <h3 className="text-lg font-bold mb-4 text-center md:text-left">{phase.title}</h3>
                  <ul className="space-y-3 w-full">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-start text-sm text-white/50">
                        <CheckCircle2 className={`w-4 h-4 mr-2 mt-0.5 shrink-0 ${
                          phase.status === 'completed' || phase.status === 'active' ? 'text-white/80' : 'text-white/20'
                        }`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0a0a0a] pt-16 pb-8 px-6 md:px-12 mt-24">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="font-bold text-2xl tracking-tighter mb-4">bk.auditor®</div>
            <p className="text-sm text-white/50 max-w-sm leading-relaxed mb-6">
              {t("The world's most advanced Zero-Knowledge auditing protocol. Connect your data, prove your compliance mathematically, and maintain absolute privacy.", 'O protocolo de auditoria de Conhecimento Zero mais avançado do mundo. Conecte seus dados, prove sua conformidade matematicamente e mantenha privacidade absoluta.')}
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"><Twitter className="w-4 h-4" /></div>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"><Github className="w-4 h-4" /></div>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"><Instagram className="w-4 h-4" /></div>
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-white/40">{t('Platform', 'Plataforma')}</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li><a href="#features" className="hover:text-[#99ff66] transition-colors">{t('ZK-Rollup Engine', 'Motor ZK-Rollup')}</a></li>
              <li><a href="#features" className="hover:text-[#99ff66] transition-colors">{t('AI Policy Generator', 'Gerador de Políticas IA')}</a></li>
              <li><a href="#workflow" className="hover:text-[#99ff66] transition-colors">{t('Public Verifier', 'Verificador Público')}</a></li>
              <li><a href="#infrastructure" className="hover:text-[#99ff66] transition-colors">Soulbound Tokens</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-white/40">{t('Company', 'Empresa')}</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li><a href="#" className="hover:text-[#99ff66] transition-colors">{t('About Protocol', 'Sobre o Protocolo')}</a></li>
              <li><a href="#" className="hover:text-[#99ff66] transition-colors">{t('Documentation', 'Documentação')}</a></li>
              <li><a href="#" className="hover:text-[#99ff66] transition-colors">{t('Security Audits', 'Auditorias de Segurança')}</a></li>
              <li><a href="#" className="hover:text-[#99ff66] transition-colors">{t('Contact', 'Contato')}</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-white/30 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} BK.AUDITOR PROTOCOL. {t('ALL RIGHTS RESERVED.', 'TODOS OS DIREITOS RESERVADOS.')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </footer>

      {/* Verify Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          <div className="bg-[#0a0a0a] border border-white/20 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#99ff66] to-transparent opacity-50"></div>
            <div className="p-8">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">{t('Public Verification', 'Verificação Pública')}</h2>
              <p className="text-sm text-white/50 font-mono tracking-widest mb-8">{t('VERIFY CERTIFICATE AUTHENTICITY ON-CHAIN', 'VERIFICAR AUTENTICIDADE DO CERTIFICADO ON-CHAIN')}</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-widest">{t('Transaction Hash / Certificate ID', 'Hash da Transação / ID do Certificado')}</label>
                  <input 
                    type="text" 
                    value={verifyHash}
                    onChange={(e) => {
                      setVerifyHash(e.target.value);
                      setVerifyStatus('idle');
                    }}
                    placeholder="0x..."
                    className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-4 font-mono text-sm focus:outline-none focus:border-[#99ff66] transition-colors"
                  />
                </div>

                <button 
                  onClick={handleVerify}
                  disabled={verifyStatus === 'checking' || !verifyHash}
                  className="w-full bg-white text-black py-4 rounded-lg font-black uppercase tracking-widest text-sm hover:bg-[#99ff66] transition-colors disabled:opacity-50 flex justify-center items-center"
                >
                  {verifyStatus === 'checking' ? (
                    <span className="animate-pulse">{t('CRYPTOGRAPHIC VERIFICATION IN PROGRESS...', 'VERIFICAÇÃO CRIPTOGRÁFICA EM ANDAMENTO...')}</span>
                  ) : t('VERIFY PROOF', 'VERIFICAR PROVA')}
                </button>

                {verifyStatus === 'valid' && (
                  <div className="mt-6 p-6 bg-[#99ff66]/10 border border-[#99ff66]/30 rounded-lg flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4">
                    <div className="w-16 h-16 bg-[#99ff66]/20 rounded-full flex items-center justify-center mb-4">
                      <ShieldCheck className="w-8 h-8 text-[#99ff66]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#99ff66] mb-2 uppercase tracking-tighter">{t('Valid Certificate', 'Certificado Válido')}</h3>
                    <p className="text-sm text-white/70 font-mono">{t("The zero-knowledge proof associated with this hash mathematically verifies the auditor's claim without exposing private data.", 'A prova de conhecimento zero associada a este hash verifica matematicamente a alegação do auditor sem expor dados privados.')}</p>
                  </div>
                )}

                {verifyStatus === 'invalid' && (
                  <div className="mt-6 p-6 bg-rose-500/10 border border-rose-500/30 rounded-lg flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4">
                    <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center mb-4">
                      <AlertCircle className="w-8 h-8 text-rose-500" />
                    </div>
                    <h3 className="text-xl font-bold text-rose-500 mb-2 uppercase tracking-tighter">{t('Invalid Hash', 'Hash Inválido')}</h3>
                    <p className="text-sm text-white/70 font-mono">{t('Could not verify cryptographic proof. The hash provided does not match any valid on-chain record.', 'Não foi possível verificar a prova criptográfica. O hash fornecido não corresponde a nenhum registro on-chain válido.')}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-t border-white/10 p-4 bg-white/5 flex justify-center">
              <button onClick={() => setShowVerifyModal(false)} className="text-xs font-mono tracking-widest text-white/50 hover:text-white uppercase transition-colors">
                [ {t('CLOSE PORTAL', 'FECHAR PORTAL')} ]
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Wallet Selector Modal */}
      {showWalletSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          <div className="bg-[#0a0a0a] border border-white/20 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#99ff66] to-transparent opacity-50"></div>
            <div className="p-8">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">{t('Connect Wallet', 'Conectar Carteira')}</h2>
              <p className="text-sm text-white/50 font-mono tracking-widest mb-8">{t('SELECT YOUR PROVIDER', 'SELECIONE SEU PROVEDOR')}</p>
              
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {WALLETS.map((wallet) => (
                  <button 
                    key={wallet.id}
                    onClick={() => connectWallet(wallet.id)} 
                    className="w-full flex items-center justify-between p-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full ${wallet.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <wallet.Icon className={`w-8 h-8 ${wallet.color}`} />
                      </div>
                      <span className="font-bold uppercase tracking-wider text-white">{wallet.name}</span>
                    </div>
                    <span className="text-[10px] text-[#99ff66] font-mono tracking-widest border border-[#99ff66]/20 bg-[#99ff66]/10 px-2 py-1 rounded-full">SOLANA</span>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => {
                  setShowWalletSelector(false);
                  setShowWalletGuide(true);
                }} 
                className="mt-6 w-full text-center text-[10px] font-mono text-white/40 hover:text-white uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-3 h-3" /> {t("Don't have a wallet?", 'Não tem uma carteira?')}
              </button>
            </div>
            
            <div className="border-t border-white/10 p-4 bg-white/5 flex justify-center">
              <button onClick={() => setShowWalletSelector(false)} className="text-xs font-mono tracking-widest text-white/50 hover:text-white uppercase transition-colors">
                [ CANCEL ]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Guide Modal */}
      {showWalletGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          <div className="bg-[#0a0a0a] border border-white/20 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#99ff66] to-transparent opacity-50"></div>
            <div className="p-8">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">{t('Web3 Wallet Guide', 'Guia de Carteiras Web3')}</h2>
              <p className="text-sm text-white/50 font-mono tracking-widest mb-8">{t('SET UP YOUR SOLANA WALLET', 'CONFIGURE SUA CARTEIRA SOLANA')}</p>
              
              <div className="space-y-6">
                <p className="text-sm text-white/70 leading-relaxed">
                  {t('To interact with on-chain proofs and mint Soulbound Certificates, you need a Solana-compatible digital wallet. We recommend the following:', 'Para interagir com provas on-chain e emitir Certificados Soulbound, você precisa de uma carteira digital compatível com Solana. Recomendamos as seguintes:')}
                </p>
                
                <div className="grid grid-cols-3 gap-4">
                  <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform"><Zap className="w-6 h-6 text-purple-400" /></div>
                    <span className="text-xs font-bold uppercase tracking-wider">Phantom</span>
                  </a>
                  <a href="https://solflare.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform"><Zap className="w-6 h-6 text-orange-400" /></div>
                    <span className="text-xs font-bold uppercase tracking-wider">Solflare</span>
                  </a>
                  <a href="https://backpack.app/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform"><Zap className="w-6 h-6 text-red-400" /></div>
                    <span className="text-xs font-bold uppercase tracking-wider">Backpack</span>
                  </a>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-xs text-white/60 space-y-3">
                  <p><strong className="text-white">{t('Step 1:', 'Passo 1:')}</strong> {t('Install one of the browser extensions above.', 'Instale uma das extensões de navegador acima.')}</p>
                  <p><strong className="text-white">{t('Step 2:', 'Passo 2:')}</strong> {t('Follow their instructions to create a new wallet (save your seed phrase safely!).', 'Siga as instruções para criar uma nova carteira (guarde sua frase semente em segurança!).')}</p>
                  <p><strong className="text-white">{t('Step 3:', 'Passo 3:')}</strong> {t('Refresh this page and click "Connect Wallet".', 'Atualize esta página e clique em "Conectar Carteira".')}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/10 p-4 bg-white/5 flex justify-center">
              <button onClick={() => setShowWalletGuide(false)} className="text-xs font-mono tracking-widest text-white/50 hover:text-white uppercase transition-colors">
                [ {t('CLOSE GUIDE', 'FECHAR GUIA')} ]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

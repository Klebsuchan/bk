import fs from 'fs';

let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

// 1. Reduce Heights
content = content.replace(/h-\[450px\]/g, 'h-[300px]');
content = content.replace(/h-\[300px\] lg:h-\[450px\]/g, 'h-[200px] lg:h-[250px]');

// 2. Add Cookie & Link Modal States
const stateTarget = "  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');";
const stateReplacement = `  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [showCookies, setShowCookies] = useState(true);
  const [popupContent, setPopupContent] = useState<{title: string, body: string} | null>(null);`;
content = content.replace(stateTarget, stateReplacement);

// 3. Helper to open link popups
const activeTabTarget = "  const [activeTab, setActiveTab] = useState<'regulations' | 'financials' | 'esg'>('financials');";
const activeTabReplacement = `  const [activeTab, setActiveTab] = useState<'regulations' | 'financials' | 'esg'>('financials');
  
  const handleLinkClick = (e: React.MouseEvent, title: string, body: string) => {
    e.preventDefault();
    setPopupContent({ title, body });
  };`;
content = content.replace(activeTabTarget, activeTabReplacement);

// 4. Update Footer Links
// We need to replace the footer links with the handleLinkClick
// Let's replace the whole footer links section
content = content.replace(
  /<li><a href="#features" className="hover:text-\[#99ff66\] transition-colors">\{t\('ZK-Rollup Engine', 'Motor ZK-Rollup'\)\}<\/a><\/li>/g,
  `<li><a href="#" onClick={(e) => handleLinkClick(e, t('ZK-Rollup Engine', 'Motor ZK-Rollup'), t('Our engine processes millions of transactions off-chain and submits a single mathematical proof.', 'Nosso motor processa milhões de transações off-chain e submete uma única prova matemática.'))} className="hover:text-[#99ff66] transition-colors">{t('ZK-Rollup Engine', 'Motor ZK-Rollup')}</a></li>`
);
content = content.replace(
  /<li><a href="#features" className="hover:text-\[#99ff66\] transition-colors">\{t\('AI Policy Generator', 'Gerador de Políticas IA'\)\}<\/a><\/li>/g,
  `<li><a href="#" onClick={(e) => handleLinkClick(e, t('AI Policy Generator', 'Gerador de Políticas IA'), t('Powered by Google Gemini to translate natural language into ZK circuits.', 'Alimentado pelo Google Gemini para traduzir linguagem natural em circuitos ZK.'))} className="hover:text-[#99ff66] transition-colors">{t('AI Policy Generator', 'Gerador de Políticas IA')}</a></li>`
);
content = content.replace(
  /<li><a href="#workflow" className="hover:text-\[#99ff66\] transition-colors">\{t\('Public Verifier', 'Verificador Público'\)\}<\/a><\/li>/g,
  `<li><a href="#" onClick={(e) => handleLinkClick(e, t('Public Verifier', 'Verificador Público'), t('Anyone can verify a proof using the hash without seeing the original data.', 'Qualquer um pode verificar uma prova usando o hash sem ver os dados originais.'))} className="hover:text-[#99ff66] transition-colors">{t('Public Verifier', 'Verificador Público')}</a></li>`
);
content = content.replace(
  /<li><a href="#infrastructure" className="hover:text-\[#99ff66\] transition-colors">Soulbound Tokens<\/a><\/li>/g,
  `<li><a href="#" onClick={(e) => handleLinkClick(e, 'Soulbound Tokens', t('Non-transferable certificates issued upon successful audits.', 'Certificados intransferíveis emitidos após auditorias bem-sucedidas.'))} className="hover:text-[#99ff66] transition-colors">Soulbound Tokens</a></li>`
);

content = content.replace(
  /<li><a href="#" className="hover:text-\[#99ff66\] transition-colors">\{t\('About Protocol', 'Sobre o Protocolo'\)\}<\/a><\/li>/g,
  `<li><a href="#" onClick={(e) => handleLinkClick(e, t('About Protocol', 'Sobre o Protocolo'), t('bk.auditor is a decentralized zero-knowledge compliance protocol.', 'bk.auditor é um protocolo descentralizado de conformidade zero-knowledge.'))} className="hover:text-[#99ff66] transition-colors">{t('About Protocol', 'Sobre o Protocolo')}</a></li>`
);
content = content.replace(
  /<li><a href="#" className="hover:text-\[#99ff66\] transition-colors">\{t\('Documentation', 'Documentação'\)\}<\/a><\/li>/g,
  `<li><a href="#" onClick={(e) => handleLinkClick(e, t('Documentation', 'Documentação'), t('Technical docs are available in the GitHub repository.', 'A documentação técnica está disponível no repositório GitHub.'))} className="hover:text-[#99ff66] transition-colors">{t('Documentation', 'Documentação')}</a></li>`
);
content = content.replace(
  /<li><a href="#" className="hover:text-\[#99ff66\] transition-colors">\{t\('Security Audits', 'Auditorias de Segurança'\)\}<\/a><\/li>/g,
  `<li><a href="#" onClick={(e) => handleLinkClick(e, t('Security Audits', 'Auditorias de Segurança'), t('Smart contracts audited by independent security firms.', 'Smart contracts auditados por firmas de segurança independentes.'))} className="hover:text-[#99ff66] transition-colors">{t('Security Audits', 'Auditorias de Segurança')}</a></li>`
);
content = content.replace(
  /<li><a href="#" className="hover:text-\[#99ff66\] transition-colors">\{t\('Contact', 'Contato'\)\}<\/a><\/li>/g,
  `<li><a href="#" onClick={(e) => handleLinkClick(e, t('Contact', 'Contato'), t('Contact us at security@bk.auditor for enterprise onboarding.', 'Contate-nos em security@bk.auditor para integração empresarial.'))} className="hover:text-[#99ff66] transition-colors">{t('Contact', 'Contato')}</a></li>`
);

content = content.replace(
  /<a href="#" className="hover:text-white">Privacy<\/a>/g,
  `<a href="#" onClick={(e) => handleLinkClick(e, 'Privacy', t('Your privacy is guaranteed by mathematics. We do not store PII.', 'Sua privacidade é garantida por matemática. Nós não armazenamos PII.'))} className="hover:text-white">Privacy</a>`
);
content = content.replace(
  /<a href="#" className="hover:text-white">Terms<\/a>/g,
  `<a href="#" onClick={(e) => handleLinkClick(e, 'Terms', t('By using this protocol, you agree to cryptographic accountability.', 'Ao usar este protocolo, você concorda com a responsabilidade criptográfica.'))} className="hover:text-white">Terms</a>`
);
content = content.replace(
  /<a href="#" className="hover:text-white">Cookies<\/a>/g,
  `<a href="#" onClick={(e) => handleLinkClick(e, 'Cookies', t('We only use essential functional cookies.', 'Nós apenas usamos cookies funcionais essenciais.'))} className="hover:text-white">Cookies</a>`
);


// 5. Add Modals at the end of the file before final closing tags
const modalsCode = `
      {/* Generic Link Popup Modal */}
      {popupContent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          <div className="bg-[#0a0a0a] border border-white/20 rounded-xl w-full max-w-md overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#99ff66] to-transparent opacity-50"></div>
            <div className="p-8 text-center">
              <h2 className="text-xl font-black uppercase tracking-tighter text-white mb-4">{popupContent.title}</h2>
              <p className="text-white/70 font-mono text-sm leading-relaxed mb-8">{popupContent.body}</p>
              <button 
                onClick={() => setPopupContent(null)}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-sm font-bold uppercase tracking-widest text-xs transition-colors"
              >
                {t('Close', 'Fechar')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Consent Banner/Modal */}
      {showCookies && (
        <div className="fixed bottom-0 left-0 w-full z-[70] bg-[#050505] border-t border-[#99ff66]/30 p-4 md:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#99ff66]/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#99ff66]" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-1">{t('Cookie Policy', 'Política de Cookies')}</h3>
                <p className="text-white/60 font-mono text-xs leading-relaxed max-w-2xl">
                  {t('We use strictly essential cryptographic local storage and minimal functional cookies to maintain your session and UI preferences. No tracking. No analytics. Pure zero-knowledge design.', 'Nós usamos apenas armazenamento local criptográfico estritamente essencial e cookies funcionais mínimos para manter sua sessão e preferências de interface. Sem rastreamento. Sem analytics. Design puro zero-knowledge.')}
                </p>
              </div>
            </div>
            <div className="flex gap-3 shrink-0 w-full md:w-auto">
              <button 
                onClick={() => setShowCookies(false)}
                className="flex-1 md:flex-none border border-white/20 hover:bg-white/5 text-white px-6 py-3 rounded-sm font-bold uppercase tracking-widest text-xs transition-colors"
              >
                {t('Decline', 'Recusar')}
              </button>
              <button 
                onClick={() => setShowCookies(false)}
                className="flex-1 md:flex-none bg-[#99ff66] hover:bg-white text-black px-6 py-3 rounded-sm font-bold uppercase tracking-widest text-xs transition-colors shadow-[0_0_15px_rgba(153,255,102,0.2)]"
              >
                {t('Accept', 'Aceitar')}
              </button>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace("    </div>\n  );\n}", modalsCode + "\n    </div>\n  );\n}");

fs.writeFileSync('src/views/LandingPageView.tsx', content);
console.log('Landing page patched');

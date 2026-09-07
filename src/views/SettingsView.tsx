import { useState } from 'react';
import { useI18n } from '../i18n';
import { Save, Bell, Globe, Shield, Database } from 'lucide-react';

export function SettingsView() {
  const { t, lang, setLang } = useI18n();
  const [network, setNetwork] = useState('mainnet');
  const [autoVerify, setAutoVerify] = useState(true);
    const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 pb-32 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{t('Platform Settings', 'Configurações da Plataforma')}</h1>
          <p className="text-white/50 font-mono text-xs tracking-widest uppercase">{t('Manage your workspace preferences', 'Gerencie as preferências do seu espaço')}</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-[#99ff66] text-black px-6 py-2.5 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {saved ? t('Saved!', 'Salvo!') : t('Save Changes', 'Salvar Alterações')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Language & Region */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-[#99ff66]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">{t('Language & Region', 'Idioma e Região')}</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-white/40 uppercase tracking-widest mb-2">{t('Display Language', 'Idioma de Exibição')}</label>
              <div className="flex gap-4">
                <button 
                  onClick={() => setLang('en')}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest border transition-colors ${lang === 'en' ? 'bg-white/10 border-white text-white' : 'border-white/10 text-white/50 hover:bg-white/5 hover:text-white'}`}
                >
                  English (US)
                </button>
                <button 
                  onClick={() => setLang('pt')}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest border transition-colors ${lang === 'pt' ? 'bg-white/10 border-white text-white' : 'border-white/10 text-white/50 hover:bg-white/5 hover:text-white'}`}
                >
                  Português (BR)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blockchain Network */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-5 h-5 text-[#99ff66]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">{t('Blockchain Network', 'Rede Blockchain')}</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-white/40 uppercase tracking-widest mb-2">{t('Solana Environment', 'Ambiente Solana')}</label>
              <select 
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white rounded-sm p-3 font-mono text-xs focus:outline-none focus:border-[#99ff66] transition-colors"
              >
                <option value="mainnet" className="bg-[#0a0a0a]">Mainnet Beta (Production)</option>
                <option value="devnet" className="bg-[#0a0a0a]">Devnet (Testing)</option>
                <option value="testnet" className="bg-[#0a0a0a]">Testnet</option>
                <option value="localnet" className="bg-[#0a0a0a]">Local Anchor</option>
              </select>
              <p className="text-[10px] font-mono text-white/30 mt-2">{t('Changing networks requires a wallet reconnection.', 'Alterar as redes requer uma reconexão da carteira.')}</p>
            </div>
          </div>
        </div>

        {/* Security & ZK */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-[#99ff66]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">{t('Security & Validation', 'Segurança e Validação')}</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-1">{t('Auto-Verify Proofs', 'Auto-Verificar Provas')}</h3>
                <p className="text-[10px] font-mono text-white/40">{t('Automatically verify ZK-SNARKs on-chain upon generation', 'Verificar automaticamente ZK-SNARKs na rede após a geração')}</p>
              </div>
              <button 
                onClick={() => setAutoVerify(!autoVerify)}
                className={`w-12 h-6 rounded-full transition-colors relative ${autoVerify ? 'bg-[#99ff66]' : 'bg-white/20'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-black transition-transform ${autoVerify ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
}

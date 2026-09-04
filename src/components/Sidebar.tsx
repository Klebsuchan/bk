import { Shield, Database, FileCheck, LockKeyhole, Settings, LayoutDashboard } from 'lucide-react';
import { Tab } from '../types';
import { ReactNode } from 'react';
import { useI18n } from '../i18n';

interface SidebarProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function Sidebar({ currentTab, onTabChange }: SidebarProps) {
  const { t } = useI18n();
  const navItems: { id: Tab; label: string; icon: ReactNode }[] = [
    { id: 'dashboard', label: t('Dashboard', 'Painel'), icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'connectors', label: t('Data Connectors', 'Conectores de Dados'), icon: <Database className="w-5 h-5" /> },
    { id: 'policies', label: t('Audit Policies', 'Políticas de Auditoria'), icon: <FileCheck className="w-5 h-5" /> },
    { id: 'proofs', label: t('ZK Proofs', 'Provas ZK'), icon: <LockKeyhole className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 bg-[#0a0a0a] border-r border-white/10 h-screen flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
          <path d="M12 2L3 6v6.5c0 5.05 3.81 9.85 9 11.5 5.19-1.65 9-6.45 9-11.5V6l-9-4z" stroke="#99ff66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" stroke="#99ff66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22V2" stroke="#99ff66" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2 2" />
        </svg>
        <span className="text-xl font-bold text-white tracking-tighter">bk.auditor®</span>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center px-4 py-3 rounded-sm transition-colors uppercase tracking-widest text-xs font-mono ${
              currentTab === item.id
                ? 'bg-[#99ff66]/10 text-[#99ff66] border border-[#99ff66]/20'
                : 'text-white/40 hover:bg-white/5 hover:text-white border border-transparent'
            }`}
          >
            {item.icon}
            <span className="ml-3 font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={() => onTabChange('settings')}
          className={`w-full flex items-center px-4 py-3 rounded-sm transition-colors uppercase tracking-widest text-xs font-mono ${
              currentTab === 'settings'
                ? 'bg-[#99ff66]/10 text-[#99ff66] border border-[#99ff66]/20'
                : 'text-white/40 hover:bg-white/5 hover:text-white border border-transparent'
            }`}
        >
          <Settings className="w-5 h-5" />
          <span className="ml-3 font-medium">{t('Settings', 'Configurações')}</span>
        </button>
      </div>
    </div>
  );
}

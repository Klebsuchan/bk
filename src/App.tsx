/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ProofGeneratorModal } from './components/ProofGeneratorModal';
import { DashboardView } from './views/DashboardView';
import { ConnectorsView } from './views/ConnectorsView';
import { PoliciesView } from './views/PoliciesView';
import { ProofsView } from './views/ProofsView';
import { LandingPageView } from './views/LandingPageView';
import { WalletOnboardingView } from './views/WalletOnboardingView';
import { ManualView } from './views/ManualView';
import { SettingsView } from './views/SettingsView';
import { useI18n } from './i18n';
import { Tab, Policy, AppNotification } from './types';
import { Bell, Search, AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export default function App() {
  const [isLandingPage, setIsLandingPage] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<Tab>('dashboard');
  const [activeAudit, setActiveAudit] = useState<Policy | null>(null);
  
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { t, lang, setLang } = useI18n();

  const fetchNotifications = () => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(console.error);
  };

  useEffect(() => {
    if (!isLandingPage && !showOnboarding) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 10000); // poll every 10s
      return () => clearInterval(interval);
    }
  }, [isLandingPage, showOnboarding]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (e) {
      console.error(e);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (isLandingPage) {
    return <LandingPageView onLaunch={(addr) => {
      setWalletAddress(addr);
      setIsLandingPage(false);
      if (addr) {
        setShowOnboarding(true);
      }
    }} />;
  }

  if (showOnboarding && walletAddress) {
    return <WalletOnboardingView walletAddress={walletAddress} onProceed={() => setShowOnboarding(false)} />;
  }

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardView walletAddress={walletAddress} />;
      case 'connectors':
        return <ConnectorsView onNavigate={setCurrentTab} />;
      case 'policies':
        return <PoliciesView onRunAudit={setActiveAudit} isGuest={!walletAddress} />;
      case 'proofs':
        return <ProofsView />;
      case 'manual':
        return <ManualView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView walletAddress={walletAddress} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] font-sans text-[#f5f5f5] selection:bg-[#99ff66] selection:text-black">
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} isGuest={!walletAddress} />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#0a0a0a]/80 backdrop-blur-sm z-20">
          <div className="flex items-center w-96">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input 
                type="text" 
                placeholder={t('Search policies, connectors, or hashes...', 'Buscar políticas, conectores ou hashes...')} 
                className="w-full bg-white/5 border border-white/10 text-sm text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-[#99ff66]/50 focus:ring-1 focus:ring-[#99ff66]/50 transition-all font-mono"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-6 relative">
            {walletAddress && (
              <div className="text-xs bg-[#99ff66]/10 text-[#99ff66] border border-[#99ff66]/20 px-3 py-1.5 rounded-full font-mono">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </div>
            )}
            
            <button onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')} className="text-xs font-bold uppercase text-white/50 hover:text-white transition-colors">
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-white/40 hover:text-white relative p-1 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#0a0a0a]"></span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute top-full right-0 mt-3 w-80 bg-[#0a0a0a] border border-white/10 shadow-2xl rounded-xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="font-semibold text-white tracking-widest uppercase text-xs">{t('Notifications', 'Notificações')}</h3>
                    <button onClick={() => setShowNotifications(false)} className="text-white/40 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-white/40 text-sm font-mono">{t('No notifications', 'Sem notificações')}</div>
                    ) : (
                      notifications.map(notif => (
                        <div 
                          key={notif.id} 
                          className={`p-4 border-b border-white/5 flex space-x-3 cursor-pointer hover:bg-white/5 transition-colors ${!notif.read ? 'bg-[#99ff66]/5' : 'opacity-70'}`}
                          onClick={() => !notif.read && handleMarkAsRead(notif.id)}
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            {notif.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-500" />}
                            {notif.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#99ff66]" />}
                            {notif.type === 'info' && <Info className="w-4 h-4 text-blue-500" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white uppercase tracking-tight">{notif.title}</p>
                            <p className="text-xs text-white/50 mt-1 line-clamp-2 leading-relaxed">{notif.message}</p>
                            <p className="text-[10px] text-white/40 mt-2 font-mono">
                              {new Date(notif.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3 pl-6 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#99ff66]/40 to-transparent border border-[#99ff66]/50 flex items-center justify-center text-[#99ff66] font-bold text-xs overflow-hidden relative group shrink-0">
                <div className="absolute inset-0 bg-[#99ff66]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">{walletAddress ? 'AU' : 'GU'}</span>
              </div>
              <span className="text-xs font-mono tracking-widest text-white/60 uppercase">
                {walletAddress ? t('Auditor', 'Auditor') : t('Admin', 'Administrador')}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {activeAudit && (
        <ProofGeneratorModal 
          policy={activeAudit} 
          onClose={() => setActiveAudit(null)} 
          onComplete={() => {
            setActiveAudit(null);
            setCurrentTab('proofs');
            fetchNotifications(); // Refresh notifications immediately
          }}
          walletAddress={walletAddress}
        />
      )}
    </div>
  );
}

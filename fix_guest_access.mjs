import fs from 'fs';

let appContent = fs.readFileSync('src/App.tsx', 'utf-8');
let dashboardContent = fs.readFileSync('src/views/DashboardView.tsx', 'utf-8');
let proofsContent = fs.readFileSync('src/views/ProofsView.tsx', 'utf-8');
let policiesContent = fs.readFileSync('src/views/PoliciesView.tsx', 'utf-8');

// 1. In App.tsx, conditionally render Sidebar tabs based on walletAddress
appContent = appContent.replace(
  "<Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />",
  "<Sidebar currentTab={currentTab} onTabChange={setCurrentTab} isGuest={!walletAddress} />"
);

// 2. In Sidebar.tsx (we need to read and update it)
let sidebarContent = fs.readFileSync('src/components/Sidebar.tsx', 'utf-8');
sidebarContent = sidebarContent.replace(
  "export function Sidebar({ currentTab, onTabChange }: { currentTab: Tab, onTabChange: (tab: Tab) => void }) {",
  "export function Sidebar({ currentTab, onTabChange, isGuest }: { currentTab: Tab, onTabChange: (tab: Tab) => void, isGuest?: boolean }) {"
);

const oldNav = `  const navItems = [
    { id: 'dashboard', label: t('Dashboard', 'Painel de Controle'), icon: LayoutDashboard },
    { id: 'policies', label: t('Policies', 'Políticas'), icon: FileCode2 },
    { id: 'proofs', label: t('ZK Proofs', 'Provas ZK'), icon: ShieldCheck },
    { id: 'connectors', label: t('Connectors', 'Conectores'), icon: Database },
    { id: 'settings', label: t('Settings', 'Configurações'), icon: Settings },
  ] as const;`;

const newNav = `  const navItems = [
    { id: 'dashboard', label: t('Dashboard', 'Painel de Controle'), icon: LayoutDashboard },
    { id: 'policies', label: t('Policies', 'Políticas'), icon: FileCode2 },
    { id: 'proofs', label: t('ZK Proofs', 'Provas ZK'), icon: ShieldCheck },
    // Hide connectors and settings from guests
    ...(isGuest ? [] : [{ id: 'connectors', label: t('Connectors', 'Conectores'), icon: Database }]),
    ...(isGuest ? [] : [{ id: 'settings', label: t('Settings', 'Configurações'), icon: Settings }]),
  ] as const;`;
  
sidebarContent = sidebarContent.replace(oldNav, newNav);


// 3. In PoliciesView.tsx, hide the "New Policy" and "Run Audit" buttons if guest
policiesContent = policiesContent.replace(
  "export function PoliciesView({ onRunAudit }: { onRunAudit: (policy: Policy) => void }) {",
  "export function PoliciesView({ onRunAudit, isGuest }: { onRunAudit: (policy: Policy) => void, isGuest?: boolean }) {"
);
policiesContent = policiesContent.replace(
  "<button onClick={() => setShowNewPolicy(true)} className=",
  "{!isGuest && <button onClick={() => setShowNewPolicy(true)} className="
);
policiesContent = policiesContent.replace(
  "Add Policy",
  "Add Policy\n        </button>}"
);

policiesContent = policiesContent.replace(
  `<button onClick={() => onRunAudit(policy)}`,
  `{!isGuest && <button onClick={() => onRunAudit(policy)}`
);

policiesContent = policiesContent.replace(
  `Run ZK Audit\n              </button>`,
  `Run ZK Audit\n              </button>}`
);

// We need to pass isGuest from App.tsx to PoliciesView
appContent = appContent.replace(
  "<PoliciesView onRunAudit={setActiveAudit} />",
  "<PoliciesView onRunAudit={setActiveAudit} isGuest={!walletAddress} />"
);


fs.writeFileSync('src/App.tsx', appContent);
fs.writeFileSync('src/components/Sidebar.tsx', sidebarContent);
fs.writeFileSync('src/views/PoliciesView.tsx', policiesContent);

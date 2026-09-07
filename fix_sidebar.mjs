import fs from 'fs';

let content = fs.readFileSync('src/components/Sidebar.tsx', 'utf-8');

// 1. Add BookOpen icon
content = content.replace("import { Shield, Database, FileCheck, LockKeyhole, Settings, LayoutDashboard } from 'lucide-react';", "import { Shield, Database, FileCheck, LockKeyhole, Settings, LayoutDashboard, BookOpen } from 'lucide-react';");

// 2. Add manual tab to navItems
const navItemsTarget = `    { id: 'proofs', label: t('ZK Proofs', 'Provas ZK'), icon: <LockKeyhole className="w-5 h-5" /> },`;
const navItemsReplacement = `    { id: 'proofs', label: t('ZK Proofs', 'Provas ZK'), icon: <LockKeyhole className="w-5 h-5" /> },
    { id: 'manual', label: t('Manual', 'Manual'), icon: <BookOpen className="w-5 h-5" /> },`;
content = content.replace(navItemsTarget, navItemsReplacement);

fs.writeFileSync('src/components/Sidebar.tsx', content);
console.log('Sidebar updated');

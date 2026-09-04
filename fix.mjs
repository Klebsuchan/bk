import fs from 'fs';
let content = fs.readFileSync('src/views/DashboardView.tsx', 'utf-8');

const target = `  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">System Overview</h1>
        <p className="text-white/50 text-xs font-mono uppercase tracking-widest">Continuous cryptographic compliance monitoring is active.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">`;

const targetCRLF = target.replace(/\n/g, '\r\n');
const targetLF = target;

const replacement = `  return (
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">`;

if (content.includes(targetCRLF)) {
    content = content.replace(targetCRLF, replacement.replace(/\n/g, '\r\n'));
} else if (content.includes(targetLF)) {
    content = content.replace(targetLF, replacement);
} else {
    console.error("Target not found!");
    process.exit(1);
}

fs.writeFileSync('src/views/DashboardView.tsx', content);

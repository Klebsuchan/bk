import fs from 'fs';

let content = fs.readFileSync('src/views/PoliciesView.tsx', 'utf-8');

// 1. Add Download import
content = content.replace("import { ShieldAlert, Play, FileCheck, CheckCircle2, Sparkles, X, Loader2, CalendarClock } from 'lucide-react';", "import { ShieldAlert, Play, FileCheck, CheckCircle2, Sparkles, X, Loader2, CalendarClock, Download } from 'lucide-react';");

// 2. Add Export function
const fetchCode = `
  const fetchPolicies = () => {`;
const exportCode = `
  const exportCSV = () => {
    const headers = ['ID', 'Policy Name', 'Description', 'SQL Query', 'Status', 'Schedule'];
    const csvContent = [
      headers.join(','),
      ...policies.map(p => \`\${p.id},"\${p.name}","\${p.description}","\${p.query}",\${p.status},\${p.schedule || 'manual'}\`)
    ].join('\\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'bk_auditor_policies.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchPolicies = () => {`;
content = content.replace(fetchCode, exportCode);

// 3. Add Export button to header next to the AI button
const headerTarget = `<button 
          onClick={() => setShowAIModal(true)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-sm font-black uppercase tracking-widest text-xs transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {t('AI Generator', 'Gerador de IA')}
        </button>
      </div>`;
const headerReplacement = `<div className="flex items-center gap-3">
          <button onClick={exportCSV} className="hidden md:flex items-center px-4 py-2 border border-white/20 hover:bg-white/10 text-white rounded-sm font-bold uppercase tracking-widest text-[10px] transition-colors">
             <Download className="w-3 h-3 mr-2" />
             Export Excel
          </button>
          <button 
            onClick={() => setShowAIModal(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-sm font-black uppercase tracking-widest text-xs transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {t('AI Generator', 'Gerador de IA')}
          </button>
        </div>
      </div>`;
content = content.replace(headerTarget, headerReplacement);

fs.writeFileSync('src/views/PoliciesView.tsx', content);
console.log('Policies updated');

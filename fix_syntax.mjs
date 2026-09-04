import fs from 'fs';
let c = fs.readFileSync('src/views/PoliciesView.tsx', 'utf-8');

c = c.replace(
  `              <button 
                onClick={() => onRunAudit(policy)}
                className="flex-1 lg:flex-none w-full flex items-center justify-center px-4 py-2.5 bg-white hover:bg-[#99ff66] text-black rounded-sm font-black uppercase tracking-widest text-xs transition-colors"
              >
                <Play className="w-4 h-4 mr-2" />
                Run Audit
              </button>}`,
  `              {!isGuest && (
              <button 
                onClick={() => onRunAudit(policy)}
                className="flex-1 lg:flex-none w-full flex items-center justify-center px-4 py-2.5 bg-white hover:bg-[#99ff66] text-black rounded-sm font-black uppercase tracking-widest text-xs transition-colors"
              >
                <Play className="w-4 h-4 mr-2" />
                Run Audit
              </button>
              )}`
);

c = c.replace(
  `{!isGuest && <button onClick={() => setShowAIModal(true)} className="flex items-center px-4 py-2 bg-white hover:bg-[#99ff66] text-black rounded-sm font-black uppercase tracking-widest text-xs transition-colors">
          <Sparkles className="w-4 h-4 mr-2" />
          AI Assistant
        </button>}`,
  `{!isGuest && (
        <button onClick={() => setShowAIModal(true)} className="flex items-center px-4 py-2 bg-white hover:bg-[#99ff66] text-black rounded-sm font-black uppercase tracking-widest text-xs transition-colors">
          <Sparkles className="w-4 h-4 mr-2" />
          AI Assistant
        </button>
        )}`
);

fs.writeFileSync('src/views/PoliciesView.tsx', c);

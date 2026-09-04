import fs from 'fs';
let c = fs.readFileSync('src/views/PoliciesView.tsx', 'utf-8');

c = c.replace(
  "export function PoliciesView({ onRunAudit }: PoliciesViewProps) {",
  "export function PoliciesView({ onRunAudit, isGuest }: { onRunAudit: (policy: Policy) => void, isGuest?: boolean }) {"
);

// We need to find the Add Policy button and wrap it
// Searching for Add Policy
c = c.replace(
  `<button onClick={() => setShowAIModal(true)} className="flex items-center px-4 py-2 bg-white hover:bg-[#99ff66] text-black rounded-sm font-black uppercase tracking-widest text-xs transition-colors">`,
  `{!isGuest && <button onClick={() => setShowAIModal(true)} className="flex items-center px-4 py-2 bg-white hover:bg-[#99ff66] text-black rounded-sm font-black uppercase tracking-widest text-xs transition-colors">`
);

c = c.replace(
  `AI Assistant\n        </button>`,
  `AI Assistant\n        </button>}`
);

// Run Audit Button
c = c.replace(
  `<button \n                onClick={() => onRunAudit(policy)}\n                className="flex items-center text-[#99ff66] hover:text-white transition-colors"`,
  `{!isGuest && <button \n                onClick={() => onRunAudit(policy)}\n                className="flex items-center text-[#99ff66] hover:text-white transition-colors"`
);

c = c.replace(
  `Run Audit\n              </button>`,
  `Run Audit\n              </button>}`
);


fs.writeFileSync('src/views/PoliciesView.tsx', c);

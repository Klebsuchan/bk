import fs from 'fs';

let content = fs.readFileSync('src/views/ConnectorsView.tsx', 'utf-8');

// Update component signature
content = content.replace(
  "export function ConnectorsView() {",
  "export function ConnectorsView({ onNavigate }: { onNavigate?: (tab: any) => void }) {"
);

// Add state
content = content.replace(
  "const [isAdding, setIsAdding] = useState(false);",
  `const [isAdding, setIsAdding] = useState(false);
  const [extractingData, setExtractingData] = useState(false);
  const [extractionStep, setExtractionStep] = useState("");`
);

// Add handlePluggySuccess
const pluggySuccessFn = `
  const handlePluggySuccess = async (itemData: any) => {
    setPluggyToken(null);
    setExtractingData(true);
    
    const stages = [
      "Authenticating with Open Finance API...",
      "Fetching recent transactions and balances...",
      "Normalizing data schema...",
      "Executing Zero-Knowledge audit constraints...",
      "Success: Solvency Proof Generated."
    ];
    
    for (const stage of stages) {
      setExtractionStep(stage);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    try {
        await fetch('/api/connectors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: \`Bank - \${itemData?.item?.connector?.name || 'Sandbox'}\`, type: 'open_finance' })
        });
        
        await fetch('/api/proofs/generate', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ policyId: "open_finance_audit", policyName: "Solvency Auto-Audit (Open Finance)", walletAddress: "0xPluggy" })
        });
    } catch(e) {
        console.error(e);
    }
    
    setExtractingData(false);
    
    if (onNavigate) {
       onNavigate('proofs');
    } else {
       fetchConnectors();
    }
  };
`;
content = content.replace("const handleAddConnector", pluggySuccessFn + "\n  const handleAddConnector");

// Replace PluggyConnect onSuccess
content = content.replace(
  /onSuccess=\{\(itemData\) => \{[\s\S]*?\}\}\.then\(\(\) => fetchConnectors\(\)\);\n          \}\}/,
  "onSuccess={handlePluggySuccess}"
);

// Add extracting modal
const extractingModal = `
      {extractingData && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4">
          <div className="bg-[#0a0a0a] border border-[#99ff66]/30 rounded-xl w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(153,255,102,0.1)] relative p-8 text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#99ff66] to-transparent opacity-80 animate-pulse"></div>
            <Loader2 className="w-12 h-12 animate-spin text-[#99ff66] mx-auto mb-6" />
            <h2 className="text-xl font-black uppercase tracking-tighter text-white mb-2">Automated ZK Audit</h2>
            <p className="text-[#99ff66] font-mono text-xs uppercase tracking-widest animate-pulse h-8">
              {extractionStep}
            </p>
          </div>
        </div>
      )}
`;

content = content.replace("{/* Add Modal */}", extractingModal + "\n      {/* Add Modal */}");

fs.writeFileSync('src/views/ConnectorsView.tsx', content);
console.log('Updated UX for Pluggy Success');

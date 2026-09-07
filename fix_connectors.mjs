import fs from 'fs';

let content = fs.readFileSync('src/views/ConnectorsView.tsx', 'utf-8');

// 1. Add Info icon import
content = content.replace("import { Database, Plus, RefreshCw, Terminal, X, Check, Loader2 } from 'lucide-react';", "import { Database, Plus, RefreshCw, Terminal, X, Check, Loader2, Info } from 'lucide-react';");

// 2. Add state for infoModal
content = content.replace("const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');", "const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');\n  const [infoConnector, setInfoConnector] = useState<Connector | null>(null);");

// 3. Add Info button in the card header
const cardHeaderTarget = `<span className={\`px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase rounded-full \${
                connector.status === 'connected' ? 'bg-[#99ff66]/10 text-[#99ff66] border border-[#99ff66]/20' : 
                'bg-rose-500/10 text-rose-500 border border-rose-500/20'
              }\`}>
                {connector.status === 'connected' ? t('Connected', 'Conectado') : t('Error', 'Erro')}
              </span>
            </div>`;

const cardHeaderReplacement = `<div className="flex items-center gap-3">
              <button 
                onClick={() => setInfoConnector(connector)}
                className="text-white/30 hover:text-white transition-colors"
                title="What does this do?"
              >
                <Info className="w-5 h-5" />
              </button>
              <span className={\`px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase rounded-full \${
                connector.status === 'connected' ? 'bg-[#99ff66]/10 text-[#99ff66] border border-[#99ff66]/20' : 
                'bg-rose-500/10 text-rose-500 border border-rose-500/20'
              }\`}>
                {connector.status === 'connected' ? t('Connected', 'Conectado') : t('Error', 'Erro')}
              </span>
              </div>
            </div>`;

content = content.replace(cardHeaderTarget, cardHeaderReplacement);

// 4. Add the Info Modal component at the end of the return statement
const infoModalCode = `
      {/* Info Modal */}
      {infoConnector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          <div className="bg-[#0a0a0a] border border-white/20 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#99ff66] to-transparent opacity-50"></div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-black uppercase tracking-tighter text-white">{infoConnector.name}</h2>
                <button onClick={() => setInfoConnector(null)} className="text-white/30 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6 text-sm">
                <div>
                  <h3 className="text-[#99ff66] font-mono text-xs uppercase tracking-widest mb-2">{t('What is this?', 'O que é isso?')}</h3>
                  <p className="text-white/70 leading-relaxed">
                    {infoConnector.name.includes('HR') 
                      ? t('The HR Database contains sensitive employee data (payroll, PII). bk.auditor uses Zero-Knowledge to verify compliance without extracting real names or salaries.', 'O banco de dados de RH contém dados sensíveis como folha de pagamento e identificação. O bk.auditor usa ZK-Proofs para verificar a conformidade fiscal e regras corporativas.') 
                      : infoConnector.name.includes('Banking')
                      ? t('The core financial ledger containing transactions and balances. It requires maximum privacy during solvency audits.', 'Sistema principal de registros financeiros, transações e saldos. Requer privacidade máxima durante auditorias de solvência.')
                      : t('Database monitoring carbon emissions, governance, and corporate sustainability goals.', 'Banco de dados que monitora emissões de carbono, governança e sustentabilidade corporativa.')}
                  </p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-sm p-4">
                  <h3 className="text-white font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-400" />
                    {t('Wallet Interaction', 'Interação com a Carteira')}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-xs">
                    {infoConnector.name.includes('HR')
                      ? t('Your wallet acts as a cryptographic identity. Instead of receiving raw employee data, your wallet signs a transaction mathematically proving the HR calculations are correct (e.g., no negative salaries) without ever exposing the real values.', 'Sua carteira (wallet) atua como uma identidade criptográfica. Em vez de receber os dados brutos dos funcionários, sua carteira apenas assina a transação provando matematicamente que os cálculos do RH estão corretos (ex: nenhum salário é negativo) sem nunca expor os salários reais.')
                      : infoConnector.name.includes('Banking')
                      ? t('Your wallet generates a Zero-Knowledge Hash that anchors the bank\\'s financial state on the Solana network. This allows public solvency audits where your wallet issues a public certificate of trust without revealing the absolute balance.', 'Sua carteira gera um Hash Zero-Knowledge que ancora o estado financeiro atual do banco na rede Solana. Isso permite auditorias de solvência onde a sua wallet emite o atestado público de confiança sem revelar o balanço absoluto do banco.')
                      : t('Your wallet mints a Soulbound Token (SBT) attesting that the enterprise met its ESG goals, creating an immutable, publicly verifiable green seal on the blockchain through your digital signature.', 'A carteira minera um Soulbound Token (SBT - certificado intransferível) atestando que a empresa atingiu suas metas ESG, criando um selo verde imutável e verificável publicamente na blockchain através da sua assinatura digital.')}
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 p-4 bg-white/5 flex justify-end">
              <button onClick={() => setInfoConnector(null)} className="text-xs font-mono tracking-widest text-white/50 hover:text-white uppercase transition-colors px-4 py-2 border border-white/10 rounded hover:bg-white/10">
                [ {t('Close', 'Fechar')} ]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`;

content = content.replace("    </div>\n  );\n}", infoModalCode);

fs.writeFileSync('src/views/ConnectorsView.tsx', content);
console.log('ConnectorsView updated');

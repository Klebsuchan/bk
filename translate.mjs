import fs from 'fs';

let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

// 1. Add lang state
content = content.replace(
  "const [activeTab, setActiveTab] = useState<'regulations' | 'financials' | 'esg'>('financials');",
  "const [activeTab, setActiveTab] = useState<'regulations' | 'financials' | 'esg'>('financials');\n  const [lang, setLang] = useState<'pt' | 'en'>('pt');\n\n  const t = (en: string, pt: string) => lang === 'pt' ? pt : en;"
);

// 2. Add language toggle button in header
content = content.replace(
  '<Search className="w-4 h-4" />',
  '<Search className="w-4 h-4" />'
); // wait, let's find the header button

content = content.replace(
  /<button \n\s*onClick=\{\(\) => setShowVerifyModal\(true\)\}/,
  `<button onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-xs font-bold border border-white/10 transition-colors uppercase mr-4">\n          {lang === 'pt' ? 'EN' : 'PT'}\n        </button>\n        <button \n          onClick={() => setShowVerifyModal(true)}`
);

// Helper function to safely replace text within tags
const r = (orig, en, pt) => {
  content = content.replace(orig, `{t(\`${en}\`, \`${pt}\`)}`);
};
const rString = (orig, en, pt) => {
  content = content.replace(orig, `t(\`${en}\`, \`${pt}\`)`);
};

// 3. Replace text
content = content.replace(/>Features<\/a>/g, ">{t('Features', 'Funcionalidades')}</a>");
content = content.replace(/>Workflow<\/a>/g, ">{t('Workflow', 'Fluxo')}</a>");
content = content.replace(/>Infrastructure<\/a>/g, ">{t('Infrastructure', 'Infraestrutura')}</a>");

content = content.replace(/<span className="hidden md:inline">Verify Certificate<\/span>/g, '<span className="hidden md:inline">{t("Verify Certificate", "Verificar Certificado")}</span>');
content = content.replace(/<span className="md:hidden">Verify<\/span>/g, '<span className="md:hidden">{t("Verify", "Verificar")}</span>');

content = content.replace(/<span className="hidden md:inline">On-Chain Privacy<\/span>/g, '<span className="hidden md:inline">{t("On-Chain Privacy", "Privacidade On-Chain")}</span>');
content = content.replace(/<span className="hidden sm:inline">Regulatory Compliant<\/span>/g, '<span className="hidden sm:inline">{t("Regulatory Compliant", "Conformidade Regulatória")}</span>');

content = content.replace(/Empowering Your<br\/>Digital Compliance/g, "{t('Empowering Your', 'Capacitando Sua')}<br/>{t('Digital Compliance', 'Conformidade Digital')}");
content = content.replace(/>ZERO-KNOWLEDGE</g, ">{t('ZERO-KNOWLEDGE', 'CONHECIMENTO ZERO')}<");
content = content.replace(/>In Partnership With</g, ">{t('In Partnership With', 'Em Parceria Com')}<");
content = content.replace(/>AUDIT<br\/>SECURITY</g, ">{t('AUDIT', 'AUDITORIA DE')}<br/>{t('SECURITY', 'SEGURANÇA')}<");

content = content.replace(/{isConnecting \? 'Connecting\.\.\.' : 'Connect Wallet'}/g, "{isConnecting ? t('Connecting...', 'Conectando...') : t('Connect Wallet', 'Conectar Carteira')}");
content = content.replace(/>Continue as Guest</g, ">{t('Continue as Guest', 'Continuar como Visitante')}<");
content = content.replace(/>How to connect a wallet\?</g, ">{t('How to connect a wallet?', 'Como conectar uma carteira?')}<");
content = content.replace(/{error}<\/span>/g, "{error}</span>"); // error text is dynamic

content = content.replace(/>Uncompromising Architecture</g, ">{t('Uncompromising Architecture', 'Arquitetura Inflexível')}<");
content = content.replace(/>Built to bridge the gap between private enterprise databases and public trustless verification\.</g, ">{t('Built to bridge the gap between private enterprise databases and public trustless verification.', 'Construído para preencher a lacuna entre bancos de dados corporativos privados e a verificação pública descentralizada.')}<");

content = content.replace(/>AI Policy Generation</g, ">{t('AI Policy Generation', 'Geração de Políticas com IA')}<");
content = content.replace(/>Enterprise rulesets parsed by LLMs into deterministic ZK circuits.</g, ">{t('Enterprise rulesets parsed by LLMs into deterministic ZK circuits.', 'Regras corporativas analisadas por LLMs em circuitos ZK determinísticos.')}<");
content = content.replace(/>Cryptographic Proofs</g, ">{t('Cryptographic Proofs', 'Provas Criptográficas')}<");
content = content.replace(/>Mathematical certainty of compliance without exposing underlying data.</g, ">{t('Mathematical certainty of compliance without exposing underlying data.', 'Certeza matemática de conformidade sem expor os dados subjacentes.')}<");
content = content.replace(/>Soulbound Issuance</g, ">{t('Soulbound Issuance', 'Emissão Soulbound')}<");
content = content.replace(/>Non-transferable on-chain certificates acting as immutable audit trails.</g, ">{t('Non-transferable on-chain certificates acting as immutable audit trails.', 'Certificados on-chain não transferíveis atuando como trilhas de auditoria imutáveis.')}<");

content = content.replace(/>How It Works</g, ">{t('How It Works', 'Como Funciona')}<");

content = content.replace(/>1. Ingest</g, ">{t('1. Ingest', '1. Ingestão')}<");
content = content.replace(/>Connect to private silos \(PostgreSQL, Snowflake\).</g, ">{t('Connect to private silos (PostgreSQL, Snowflake).', 'Conecte a silos privados (PostgreSQL, Snowflake).')}<");

content = content.replace(/>2. Compute</g, ">{t('2. Compute', '2. Computação')}<");
content = content.replace(/>Generate ZK-SNARK proofs locally. No data leaves the premise.</g, ">{t('Generate ZK-SNARK proofs locally. No data leaves the premise.', 'Gere provas ZK-SNARK localmente. Nenhum dado sai do local.')}<");

content = content.replace(/>3. Verify</g, ">{t('3. Verify', '3. Verificação')}<");
content = content.replace(/>Settle proof on Solana for fraction of a cent.</g, ">{t('Settle proof on Solana for fraction of a cent.', 'Liquide a prova na Solana por uma fração de centavo.')}<");

content = content.replace(/>4. Issue</g, ">{t('4. Issue', '4. Emissão')}<");
content = content.replace(/>Mint Soulbound NFT certificate to enterprise wallet.</g, ">{t('Mint Soulbound NFT certificate to enterprise wallet.', 'Crie certificado Soulbound NFT para a carteira corporativa.')}<");

content = content.replace(/>Supported Frameworks</g, ">{t('Supported Frameworks', 'Frameworks Suportados')}<");

content = content.replace(/>Regulations</g, ">{t('Regulations', 'Regulamentações')}<");
content = content.replace(/>Financials</g, ">{t('Financials', 'Finanças')}<");
content = content.replace(/>ESG</g, ">{t('ESG', 'ESG')}<");

content = content.replace(/>GDPR Compliance</g, ">{t('GDPR Compliance', 'Conformidade GDPR')}<");
content = content.replace(/>HIPAA Standards</g, ">{t('HIPAA Standards', 'Padrões HIPAA')}<");
content = content.replace(/>SOC2 Type II</g, ">{t('SOC2 Type II', 'SOC2 Tipo II')}<");

content = content.replace(/>GAAP Reconciliation</g, ">{t('GAAP Reconciliation', 'Reconciliação GAAP')}<");
content = content.replace(/>Basel III Ratios</g, ">{t('Basel III Ratios', 'Índices de Basileia III')}<");
content = content.replace(/>Reserve Proofs</g, ">{t('Reserve Proofs', 'Provas de Reserva')}<");

content = content.replace(/>Carbon Offsets</g, ">{t('Carbon Offsets', 'Compensação de Carbono')}<");
content = content.replace(/>Supply Chain Labor</g, ">{t('Supply Chain Labor', 'Trabalho na Cadeia de Suprimentos')}<");
content = content.replace(/>Board Diversity</g, ">{t('Board Diversity', 'Diversidade no Conselho')}<");

content = content.replace(/>Connect Wallet</g, ">{t('Connect Wallet', 'Conectar Carteira')}<");
content = content.replace(/>SELECT YOUR PROVIDER</g, ">{t('SELECT YOUR PROVIDER', 'SELECIONE SEU PROVEDOR')}<");
content = content.replace(/>Don't have a wallet\?</g, ">{t(\"Don't have a wallet?\", 'Não tem uma carteira?')}<");
content = content.replace(/>\[ CANCEL \]</g, ">{t('[ CANCEL ]', '[ CANCELAR ]')}<");

content = content.replace(/>Web3 Wallet Guide</g, ">{t('Web3 Wallet Guide', 'Guia de Carteiras Web3')}<");
content = content.replace(/>SET UP YOUR SOLANA WALLET</g, ">{t('SET UP YOUR SOLANA WALLET', 'CONFIGURE SUA CARTEIRA SOLANA')}<");
content = content.replace(/>To interact with on-chain proofs and mint Soulbound Certificates, you need a Solana-compatible digital wallet\. We recommend the following:</g, ">{t('To interact with on-chain proofs and mint Soulbound Certificates, you need a Solana-compatible digital wallet. We recommend the following:', 'Para interagir com provas on-chain e emitir Certificados Soulbound, você precisa de uma carteira digital compatível com Solana. Recomendamos as seguintes:')}<");

content = content.replace(/>Step 1:</g, ">{t('Step 1:', 'Passo 1:')}<");
content = content.replace(/>Step 2:</g, ">{t('Step 2:', 'Passo 2:')}<");
content = content.replace(/>Step 3:</g, ">{t('Step 3:', 'Passo 3:')}<");

content = content.replace(/Install one of the browser extensions above\./g, "{t('Install one of the browser extensions above.', 'Instale uma das extensões de navegador acima.')}");
content = content.replace(/Follow their instructions to create a new wallet \(save your seed phrase safely!\)\./g, "{t('Follow their instructions to create a new wallet (save your seed phrase safely!).', 'Siga as instruções para criar uma nova carteira (guarde sua frase semente em segurança!).')}");
content = content.replace(/Refresh this page and click "Connect Wallet"\./g, "{t('Refresh this page and click \"Connect Wallet\".', 'Atualize esta página e clique em \"Conectar Carteira\".')}");

content = content.replace(/>\[ CLOSE GUIDE \]</g, ">{t('[ CLOSE GUIDE ]', '[ FECHAR GUIA ]')}<");

content = content.replace(/>On-Chain Verification</g, ">{t('On-Chain Verification', 'Verificação On-Chain')}<");
content = content.replace(/placeholder="Enter Report Hash \(0x\.\.\.\)"/g, "placeholder={t('Enter Report Hash (0x...)', 'Insira o Hash do Relatório (0x...)')}");
content = content.replace(/>Verify Cryptographically</g, ">{t('Verify Cryptographically', 'Verificar Criptograficamente')}<");
content = content.replace(/>Checking ZK Proof\.\.\.</g, ">{t('Checking ZK Proof...', 'Verificando Prova ZK...')}<");
content = content.replace(/>Valid Certificate</g, ">{t('Valid Certificate', 'Certificado Válido')}<");
content = content.replace(/>This audit report has been cryptographically verified on the blockchain\.</g, ">{t('This audit report has been cryptographically verified on the blockchain.', 'Este relatório de auditoria foi verificado criptograficamente na blockchain.')}<");
content = content.replace(/>Invalid or Not Found</g, ">{t('Invalid or Not Found', 'Inválido ou Não Encontrado')}<");
content = content.replace(/>Could not verify the authenticity of this hash\. It may have been tampered with\.</g, ">{t('Could not verify the authenticity of this hash. It may have been tampered with.', 'Não foi possível verificar a autenticidade deste hash. Ele pode ter sido adulterado.')}<");
content = content.replace(/>\[ CLOSE \]</g, ">{t('[ CLOSE ]', '[ FECHAR ]')}<");

content = content.replace(/' wallet is not installed\. Please install it first\.'/g, "t(' wallet is not installed. Please install it first.', ' não está instalada. Por favor, instale primeiro.')");
content = content.replace(/"A connection request is already pending\. Please open your wallet extension to accept it\."/g, "t('A connection request is already pending. Please open your wallet extension to accept it.', 'Uma solicitação de conexão já está pendente. Por favor, abra a extensão da sua carteira para aceitá-la.')");
content = content.replace(/"Wallet prompt rejected or failed\. Please try again\."/g, "t('Wallet prompt rejected or failed. Please try again.', 'Solicitação da carteira rejeitada ou falhou. Por favor, tente novamente.')");

fs.writeFileSync('src/views/LandingPageView.tsx', content);

import fs from 'fs';
let content = fs.readFileSync('src/components/ProofGeneratorModal.tsx', 'utf-8');

content = content.replace("import { X,", "import { useI18n } from '../i18n';\nimport { X,");
content = content.replace("export function ProofGeneratorModal({ policy, onClose, onComplete, walletAddress }: ProofGeneratorModalProps) {", "export function ProofGeneratorModal({ policy, onClose, onComplete, walletAddress }: ProofGeneratorModalProps) {\n  const { t } = useI18n();");

content = content.replace(/>Running Audit: /g, ">{t('Running Audit:', 'Executando Auditoria:')} ");
content = content.replace(/>Close</g, ">{t('Close', 'Fechar')}<");
content = content.replace(/>View Logs</g, ">{t('View Logs', 'Ver Logs')}<");
content = content.replace(/>Compiling ZK Circuit\.\.\.</g, ">{t('Compiling ZK Circuit...', 'Compilando Circuito ZK...')}<");
content = content.replace(/>Extracting data from silo\.\.\.</g, ">{t('Extracting data from silo...', 'Extraindo dados do silo...')}<");
content = content.replace(/>Generating ZK-SNARK proof\.\.\.</g, ">{t('Generating ZK-SNARK proof...', 'Gerando prova ZK-SNARK...')}<");
content = content.replace(/>Settling proof on Solana\.\.\.</g, ">{t('Settling proof on Solana...', 'Liquidando prova na Solana...')}<");
content = content.replace(/>Audit Complete</g, ">{t('Audit Complete', 'Auditoria Concluída')}<");
content = content.replace(/>Proof successfully verified and anchored\.</g, ">{t('Proof successfully verified and anchored.', 'Prova verificada e ancorada com sucesso.')}<");
content = content.replace(/>Go to Proofs</g, ">{t('Go to Proofs', 'Ir para Provas')}<");
content = content.replace(/>Generating proof\.\.\.</g, ">{t('Generating proof...', 'Gerando prova...')}<");

fs.writeFileSync('src/components/ProofGeneratorModal.tsx', content);

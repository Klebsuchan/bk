import fs from 'fs';
let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

content = content.replace("AUDIT<br/>SECURITY", "{t('AUDIT', 'SEGURANÇA')}<br/>{t('SECURITY', 'DE AUDITORIA')}");
content = content.replace("The world's most advanced Zero-Knowledge auditing protocol. Connect your data, prove your compliance mathematically, and maintain absolute privacy.", "{t(\"The world's most advanced Zero-Knowledge auditing protocol. Connect your data, prove your compliance mathematically, and maintain absolute privacy.\", 'O protocolo de auditoria de Conhecimento Zero mais avançado do mundo. Conecte seus dados, prove sua conformidade matematicamente e mantenha privacidade absoluta.')}");

fs.writeFileSync('src/views/LandingPageView.tsx', content);

let policies = fs.readFileSync('src/views/PoliciesView.tsx', 'utf-8');
policies = policies.replace(">Run Audit<", ">{t('Run Audit', 'Executar Auditoria')}<");
fs.writeFileSync('src/views/PoliciesView.tsx', policies);

let proofs = fs.readFileSync('src/views/ProofsView.tsx', 'utf-8');
proofs = proofs.replace(">Immutable Audit Seals<", ">{t('Immutable Audit Seals', 'Selos de Auditoria Imutáveis')}<");
proofs = proofs.replace(">Auditor<", ">{t('Auditor', 'Auditor')}<");
fs.writeFileSync('src/views/ProofsView.tsx', proofs);

let dash = fs.readFileSync('src/views/DashboardView.tsx', 'utf-8');
dash = dash.replace(">            Audit History          </button>", ">{t('Audit History', 'Histórico de Auditoria')}          </button>");
fs.writeFileSync('src/views/DashboardView.tsx', dash);

let modal = fs.readFileSync('src/components/ProofGeneratorModal.tsx', 'utf-8');
modal = modal.replace(">Generating ZK Audit Proof<", ">{t('Generating ZK Audit Proof', 'Gerando Prova de Auditoria ZK')}<");
modal = modal.replace("The audit proof has been verified and permanently anchored on-chain. Sensitive data was never exposed.", "{t('The audit proof has been verified and permanently anchored on-chain. Sensitive data was never exposed.', 'A prova de auditoria foi verificada e permanentemente ancorada na rede. Dados confidenciais nunca foram expostos.')}");
modal = modal.replace(">Audit Rejected<", ">{t('Audit Rejected', 'Auditoria Rejeitada')}<");
fs.writeFileSync('src/components/ProofGeneratorModal.tsx', modal);



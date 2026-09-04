import fs from 'fs';
let content = fs.readFileSync('src/views/DashboardView.tsx', 'utf-8');

content = content.replace("import { LineChart,", "import { useI18n } from '../i18n';\nimport { LineChart,");
content = content.replace("export function DashboardView({ walletAddress }: { walletAddress?: string | null }) {", "export function DashboardView({ walletAddress }: { walletAddress?: string | null }) {\n  const { t } = useI18n();");

// Translations
content = content.replace(/'Active Policies'/g, "t('Active Policies', 'Políticas Ativas')");
content = content.replace(/'Verified Proofs'/g, "t('Verified Proofs', 'Provas Verificadas')");
content = content.replace(/'Connected DBs'/g, "t('Connected DBs', 'BDs Conectados')");
content = content.replace(/'Failed Checks'/g, "t('Failed Checks', 'Checagens Falhas')");

content = content.replace(/>System Overview</g, ">{t('System Overview', 'Visão Geral do Sistema')}<");
content = content.replace(/>Continuous cryptographic compliance monitoring is active\.</g, ">{t('Continuous cryptographic compliance monitoring is active.', 'O monitoramento contínuo de conformidade criptográfica está ativo.')}<");
content = content.replace(/>Overview</g, ">{t('Overview', 'Visão Geral')}<");
content = content.replace(/>Audit History</g, ">{t('Audit History', 'Histórico')}<");

content = content.replace(/>Live</g, ">{t('Live', 'Ao vivo')}<");
content = content.replace(/>Audit Activity \(7 Days\)</g, ">{t('Audit Activity (7 Days)', 'Atividade de Auditoria (7 Dias)')}<");
content = content.replace(/>Success Rate</g, ">{t('Success Rate', 'Taxa de Sucesso')}<");
content = content.replace(/'Verified'/g, "t('Verified', 'Verificado')");
content = content.replace(/'Failed'/g, "t('Failed', 'Falha')");
content = content.replace(/>Immutable Audit Ledger</g, ">{t('Immutable Audit Ledger', 'Livro-razão de Auditoria Imutável')}<");
content = content.replace(/>Secured by ZK-SNARKs</g, ">{t('Secured by ZK-SNARKs', 'Protegido por ZK-SNARKs')}<");

content = content.replace(/>Timestamp</g, ">{t('Timestamp', 'Data/Hora')}<");
content = content.replace(/>Policy Type</g, ">{t('Policy Type', 'Tipo de Política')}<");
content = content.replace(/>Status</g, ">{t('Status', 'Status')}<");
content = content.replace(/>Proof Hash \(Solana\)</g, ">{t('Proof Hash (Solana)', 'Hash da Prova (Solana)')}<");
content = content.replace(/>Explorer</g, ">{t('Explorer', 'Explorador')}<");
content = content.replace(/>No audit history found</g, ">{t('No audit history found', 'Nenhum histórico encontrado')}<");

content = content.replace(/> Verified<\/span>/g, "> {t('Verified', 'Verificado')}</span>");
content = content.replace(/> Failed<\/span>/g, "> {t('Failed', 'Falha')}</span>");
content = content.replace(/> Generating<\/span>/g, "> {t('Generating', 'Gerando')}</span>");
content = content.replace(/>View tx ↗</g, ">{t('View tx ↗', 'Ver tx ↗')}<");

// Days
content = content.replace(/'Mon'/g, "t('Mon', 'Seg')");
content = content.replace(/'Tue'/g, "t('Tue', 'Ter')");
content = content.replace(/'Wed'/g, "t('Wed', 'Qua')");
content = content.replace(/'Thu'/g, "t('Thu', 'Qui')");
content = content.replace(/'Fri'/g, "t('Fri', 'Sex')");
content = content.replace(/'Sat'/g, "t('Sat', 'Sáb')");
content = content.replace(/'Sun'/g, "t('Sun', 'Dom')");


fs.writeFileSync('src/views/DashboardView.tsx', content);

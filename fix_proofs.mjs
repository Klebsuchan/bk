import fs from 'fs';
let content = fs.readFileSync('src/views/ProofsView.tsx', 'utf-8');

content = content.replace("import { LockKeyhole,", "import { useI18n } from '../i18n';\nimport { LockKeyhole,");
content = content.replace("export function ProofsView() {", "export function ProofsView() {\n  const { t } = useI18n();");

content = content.replace(/>Cryptographic Proofs</g, ">{t('Cryptographic Proofs', 'Provas Criptográficas')}<");
content = content.replace(/>Verifiable audit trails settled on Solana\.</g, ">{t('Verifiable audit trails settled on Solana.', 'Trilhas de auditoria verificáveis liquidadas na Solana.')}<");
content = content.replace(/>Refresh</g, ">{t('Refresh', 'Atualizar')}<");
content = content.replace(/>Policy<\/th>/g, ">{t('Policy', 'Política')}</th>");
content = content.replace(/>Date<\/th>/g, ">{t('Date', 'Data')}</th>");
content = content.replace(/>Status<\/th>/g, ">{t('Status', 'Status')}</th>");
content = content.replace(/>ZK Hash<\/th>/g, ">{t('ZK Hash', 'Hash ZK')}</th>");
content = content.replace(/>Explorer<\/th>/g, ">{t('Explorer', 'Explorador')}</th>");
content = content.replace(/>Actions<\/th>/g, ">{t('Actions', 'Ações')}</th>");
content = content.replace(/> Verified<\/span>/g, "> {t('Verified', 'Verificado')}</span>");
content = content.replace(/> Failed<\/span>/g, "> {t('Failed', 'Falha')}</span>");
content = content.replace(/> Generating<\/span>/g, "> {t('Generating', 'Gerando')}</span>");
content = content.replace(/>Mint Soulbound Certificate</g, ">{t('Mint Soulbound Certificate', 'Emitir Certificado Soulbound')}<");
content = content.replace(/>Minted</g, ">{t('Minted', 'Emitido')}<");

fs.writeFileSync('src/views/ProofsView.tsx', content);

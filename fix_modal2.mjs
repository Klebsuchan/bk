import fs from 'fs';
let content = fs.readFileSync('src/components/ProofGeneratorModal.tsx', 'utf-8');

content = content.replace("label: 'Extracting Local DB Data'", "label: t('Extracting Local DB Data', 'Extraindo Dados Locais do BD')");
content = content.replace("label: 'Computing Polynomials'", "label: t('Computing Polynomials', 'Computando Polinômios')");
content = content.replace("label: 'Generating ZK-SNARK'", "label: t('Generating ZK-SNARK', 'Gerando ZK-SNARK')");
content = content.replace("label: 'On-Chain Verification'", "label: t('On-Chain Verification', 'Verificação On-Chain')");
content = content.replace("label: 'Audit Seal Issued'", "label: t('Audit Seal Issued', 'Selo de Auditoria Emitido')");
content = content.replace(">Audit Failed<", ">{t('Audit Failed', 'Auditoria Falhou')}<");
content = content.replace(">The cryptographic proof could not be verified or the policy conditions were not met.<", ">{t('The cryptographic proof could not be verified or the policy conditions were not met.', 'A prova criptográfica não pôde ser verificada ou as condições da política não foram atendidas.')}<");

fs.writeFileSync('src/components/ProofGeneratorModal.tsx', content);

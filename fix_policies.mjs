import fs from 'fs';
let content = fs.readFileSync('src/views/PoliciesView.tsx', 'utf-8');

content = content.replace("import { FileCheck,", "import { useI18n } from '../i18n';\nimport { FileCheck,");
content = content.replace("export function PoliciesView({ onRunAudit }: { onRunAudit: (p: Policy) => void }) {", "export function PoliciesView({ onRunAudit }: { onRunAudit: (p: Policy) => void }) {\n  const { t } = useI18n();");

content = content.replace(/>Audit Policies</g, ">{t('Audit Policies', 'Políticas de Auditoria')}<");
content = content.replace(/>Define rulesets that will be compiled into ZK circuits\.</g, ">{t('Define rulesets that will be compiled into ZK circuits.', 'Defina conjuntos de regras que serão compilados em circuitos ZK.')}<");
content = content.replace(/>New Policy</g, ">{t('New Policy', 'Nova Política')}<");
content = content.replace(/>Run Audit</g, ">{t('Run Audit', 'Executar Auditoria')}<");
content = content.replace(/>Active</g, ">{t('Active', 'Ativo')}<");
content = content.replace(/>Inactive</g, ">{t('Inactive', 'Inativo')}<");
content = content.replace(/>Circuit Source</g, ">{t('Circuit Source', 'Código do Circuito')}<");
content = content.replace(/>Edit</g, ">{t('Edit', 'Editar')}<");
content = content.replace(/>Last proof: /g, ">{t('Last proof:', 'Última prova:')} ");
content = content.replace(/>Never</g, ">{t('Never', 'Nunca')}<");

fs.writeFileSync('src/views/PoliciesView.tsx', content);

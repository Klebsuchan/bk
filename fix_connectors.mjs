import fs from 'fs';
let content = fs.readFileSync('src/views/ConnectorsView.tsx', 'utf-8');

content = content.replace("import { Database,", "import { useI18n } from '../i18n';\nimport { Database,");
content = content.replace("export function ConnectorsView() {", "export function ConnectorsView() {\n  const { t } = useI18n();");

content = content.replace(/>Data Connectors</g, ">{t('Data Connectors', 'Conectores de Dados')}<");
content = content.replace(/>Manage connections to private enterprise data silos\.</g, ">{t('Manage connections to private enterprise data silos.', 'Gerencie conexões para silos de dados corporativos privados.')}<");
content = content.replace(/>Add Connection</g, ">{t('Add Connection', 'Adicionar Conexão')}<");

content = content.replace(/\{connector\.status === 'connected' \? 'Connected' : /g, "{connector.status === 'connected' ? t('Connected', 'Conectado') : ");
content = content.replace(/connector\.status === 'error' \? 'Error' : 'Disconnected'\}/g, "connector.status === 'error' ? t('Error', 'Erro') : t('Disconnected', 'Desconectado')}");

content = content.replace(/>Last sync: /g, ">{t('Last sync:', 'Última sinc.:')} ");

content = content.replace(/>Configure</g, ">{t('Configure', 'Configurar')}<");
content = content.replace(/>Test Connection</g, ">{t('Test Connection', 'Testar Conexão')}<");

fs.writeFileSync('src/views/ConnectorsView.tsx', content);

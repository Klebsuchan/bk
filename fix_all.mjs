import fs from 'fs';

// 1. PoliciesView
let policies = fs.readFileSync('src/views/PoliciesView.tsx', 'utf-8');
policies = policies.replace("Define business rules mapped to database queries to be converted into zero-knowledge circuits.", "{t('Define business rules mapped to database queries to be converted into zero-knowledge circuits.', 'Defina regras de negócios mapeadas para consultas de banco de dados para serem convertidas em circuitos de conhecimento zero.')}");
policies = policies.replace("Loading policies...", "{t('Loading policies...', 'Carregando políticas...')}");
policies = policies.replace(">Generate AI Policy<", ">{t('Generate AI Policy', 'Gerar Política com IA')}<");
policies = policies.replace("Translate natural language compliance rules into deterministic SQL and ZK configurations.", "{t('Translate natural language compliance rules into deterministic SQL and ZK configurations.', 'Traduza regras de conformidade em linguagem natural para SQL determinístico e configurações ZK.')}");
policies = policies.replace('placeholder="e.g., Verify that all EU customer data is stored in region \'eu-central-1\'..."', "placeholder={t('e.g., Verify that all EU customer data is stored in region \\'eu-central-1\\'...', 'ex: Verifique se todos os dados de clientes da UE estão armazenados na região \\'eu-central-1\\'...')} ");
policies = policies.replace(">Cancel<", ">{t('Cancel', 'Cancelar')}<");
policies = policies.replace(/>Generate Circuit</g, ">{t('Generate Circuit', 'Gerar Circuito')}<");
policies = policies.replace(/>Generating\.\.\.</g, ">{t('Generating...', 'Gerando...')}<");
fs.writeFileSync('src/views/PoliciesView.tsx', policies);

// 2. ConnectorsView
let connectors = fs.readFileSync('src/views/ConnectorsView.tsx', 'utf-8');
connectors = connectors.replace("Connection verified and stable.", "{t('Connection verified and stable.', 'Conexão verificada e estável.')}");
connectors = connectors.replace("Failed to connect. Check credentials.", "{t('Failed to connect. Check credentials.', 'Falha ao conectar. Verifique as credenciais.')}");
connectors = connectors.replace("Waiting for initial sync.", "{t('Waiting for initial sync.', 'Aguardando sincronização inicial.')}");
fs.writeFileSync('src/views/ConnectorsView.tsx', connectors);



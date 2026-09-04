import fs from 'fs';
let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

// Features (List)
content = content.replace("ZK-Rollup Engine", "{t('ZK-Rollup Engine', 'Motor ZK-Rollup')}");
content = content.replace("AI Policy Generator", "{t('AI Policy Generator', 'Gerador de Políticas IA')}");
content = content.replace("Public Verifier", "{t('Public Verifier', 'Verificador Público')}");
content = content.replace("Soulbound Tokens", "{t('Soulbound Tokens', 'Tokens Soulbound')}");

// Footer links
content = content.replace("About Protocol", "{t('About Protocol', 'Sobre o Protocolo')}");
content = content.replace("Documentation", "{t('Documentation', 'Documentação')}");
content = content.replace("Security Audits", "{t('Security Audits', 'Auditorias de Segurança')}");
content = content.replace("Contact", "{t('Contact', 'Contato')}");
content = content.replace("Platform<", "{t('Platform', 'Plataforma')}<");
content = content.replace("Company<", "{t('Company', 'Empresa')}<");
content = content.replace("ALL RIGHTS RESERVED.", "{t('ALL RIGHTS RESERVED.', 'TODOS OS DIREITOS RESERVADOS.')}");

// Features (Blocks)
content = content.replace("Describe your audit rules in plain English. Our Gemini-powered engine automatically transpiles natural language into rigorous SQL queries and ZK circuits.", "{t('Describe your audit rules in plain English. Our Gemini-powered engine automatically transpiles natural language into rigorous SQL queries and ZK circuits.', 'Descreva suas regras de auditoria em linguagem natural. Nossa engine movida por Gemini transpila automaticamente para SQL e circuitos ZK rigorosos.')}");
content = content.replace(">Zero-Knowledge Rollups<", ">{t('Zero-Knowledge Rollups', 'Rollups de Conhecimento Zero')}<");
content = content.replace("Compute mathematical proofs directly on your local databases. We generate cryptographic hashes that prove your data complies with the rules, without ever exposing the raw data itself.", "{t('Compute mathematical proofs directly on your local databases. We generate cryptographic hashes that prove your data complies with the rules, without ever exposing the raw data itself.', 'Calcule provas matemáticas diretamente em seus bancos de dados locais. Nós geramos hashes criptográficos que provam que seus dados cumprem as regras, sem nunca expor os dados brutos.')}");
content = content.replace(">Soulbound Certificates<", ">{t('Soulbound Certificates', 'Certificados Soulbound')}<");
content = content.replace("Mint verified audit results directly as Soulbound Tokens (SBTs) to your corporate wallet. Create an immutable, non-transferable track record of compliance on-chain.", "{t('Mint verified audit results directly as Soulbound Tokens (SBTs) to your corporate wallet. Create an immutable, non-transferable track record of compliance on-chain.', 'Emita resultados de auditoria verificados como Soulbound Tokens (SBTs) para sua carteira corporativa. Crie um histórico imutável e intransferível de conformidade na rede.')}");

// Workflow
content = content.replace(">Seamless Workflow<", ">{t('Seamless Workflow', 'Fluxo de Trabalho Contínuo')}<");
content = content.replace(/title: 'Connect Data'/g, "title: t('Connect Data', 'Conectar Dados')");
content = content.replace(/desc: 'Link PostgreSQL, Snowflake, or Oracle via secure IAM roles. Tested natively in terminal.'/g, "desc: t('Link PostgreSQL, Snowflake, or Oracle via secure IAM roles. Tested natively in terminal.', 'Vincule PostgreSQL, Snowflake ou Oracle via roles IAM seguros. Testado nativamente no terminal.')");
content = content.replace(/title: 'Define Logic'/g, "title: t('Define Logic', 'Definir Lógica')");
content = content.replace(/desc: 'Use AI or manual SQL to define the exact financial or regulatory rule that must be met.'/g, "desc: t('Use AI or manual SQL to define the exact financial or regulatory rule that must be met.', 'Use IA ou SQL manual para definir a regra financeira ou regulatória exata que deve ser cumprida.')");
content = content.replace(/title: 'Generate Proof'/g, "title: t('Generate Proof', 'Gerar Prova')");
content = content.replace(/desc: 'Run the ZK circuit. It validates the data locally and generates a lightweight cryptographic hash.'/g, "desc: t('Run the ZK circuit. It validates the data locally and generates a lightweight cryptographic hash.', 'Execute o circuito ZK. Ele valida os dados localmente e gera um hash criptográfico leve.')");
content = content.replace(/title: 'Public Verify'/g, "title: t('Public Verify', 'Verificação Pública')");
content = content.replace(/desc: 'Publish the PDF or mint the SBT. Anyone can verify the hash on our public portal instantly.'/g, "desc: t('Publish the PDF or mint the SBT. Anyone can verify the hash on our public portal instantly.', 'Publique o PDF ou emita o SBT. Qualquer pessoa pode verificar o hash no nosso portal público instantaneamente.')");

// Legacy Grid Section
content = content.replace("ZK-PROOFS<br/>ENGINE", "{t('ZK-PROOFS', 'MOTOR')}<br/>{t('ENGINE', 'ZK-PROOFS')}");
content = content.replace("MATHEMATICAL GUARANTEES", "{t('MATHEMATICAL GUARANTEES', 'GARANTIAS MATEMÁTICAS')}");
content = content.replace("CONTINUOUS AUDITING OVER SQL DATA | ON-CHAIN VERIFICATION", "{t('CONTINUOUS AUDITING OVER SQL DATA | ON-CHAIN VERIFICATION', 'AUDITORIA CONTÍNUA SOBRE DADOS SQL | VERIFICAÇÃO ON-CHAIN')}");
content = content.replace("This protocol includes: over 300 business rule checks, real-time cryptographic seals, and absolute zero data exposure to third-party auditors.", "{t('This protocol includes: over 300 business rule checks, real-time cryptographic seals, and absolute zero data exposure to third-party auditors.', 'Este protocolo inclui: mais de 300 verificações de regras de negócios, selos criptográficos em tempo real e zero exposição de dados a auditores terceiros.')}");
content = content.replace("On-Chain Policy Engine in Rust", "{t('On-Chain Policy Engine in Rust', 'Motor de Políticas On-Chain em Rust')}");

content = content.replace("IMMUTABLE<br/>PORTFOLIO", "{t('IMMUTABLE', 'PORTFÓLIO')}<br/>{t('PORTFOLIO', 'IMUTÁVEL')}");
content = content.replace("COMPLIANCE<br/>ENGINE", "{t('COMPLIANCE', 'MOTOR DE')}<br/>{t('ENGINE', 'CONFORMIDADE')}");
content = content.replace("SUSTAINABILITY<br/>TRACKER", "{t('SUSTAINABILITY', 'RASTREADOR DE')}<br/>{t('TRACKER', 'SUSTENTABILIDADE')}");

content = content.replace("'Zero-knowledge proofs for absolute accounting verification, solvency ratios, and transparent cash flow without exposing raw ledgers.'", "t('Zero-knowledge proofs for absolute accounting verification, solvency ratios, and transparent cash flow without exposing raw ledgers.', 'Provas de conhecimento zero para verificação contábil absoluta, índices de solvência e fluxo de caixa transparente sem expor registros brutos.')");
content = content.replace("'Automated KYC/AML adherence and GDPR compliance. Mathematical guarantees that personal data is never exposed during audits.'", "t('Automated KYC/AML adherence and GDPR compliance. Mathematical guarantees that personal data is never exposed during audits.', 'Adesão automatizada a KYC/AML e conformidade com GDPR. Garantias matemáticas de que dados pessoais nunca são expostos durante as auditorias.')");
content = content.replace("'Cryptographically verify carbon credits, green energy metrics, and corporate sustainability goals directly on-chain.'", "t('Cryptographically verify carbon credits, green energy metrics, and corporate sustainability goals directly on-chain.', 'Verifique criptograficamente créditos de carbono, métricas de energia verde e metas de sustentabilidade corporativa diretamente na rede.')");

content = content.replace("ZK-SNARK proof generation", "{t('ZK-SNARK proof generation', 'Geração de prova ZK-SNARK')}");
content = content.replace(">Public Verification<", ">{t('Public Verification', 'Verificação Pública')}<");
content = content.replace("VERIFY CERTIFICATE AUTHENTICITY ON-CHAIN", "{t('VERIFY CERTIFICATE AUTHENTICITY ON-CHAIN', 'VERIFICAR AUTENTICIDADE DO CERTIFICADO ON-CHAIN')}");

content = content.replace("The zero-knowledge proof associated with this hash mathematically verifies the auditor's claim without exposing private data.", "{t(\"The zero-knowledge proof associated with this hash mathematically verifies the auditor's claim without exposing private data.\", 'A prova de conhecimento zero associada a este hash verifica matematicamente a alegação do auditor sem expor dados privados.')}");
content = content.replace(">Invalid Hash<", ">{t('Invalid Hash', 'Hash Inválido')}<");
content = content.replace("Could not verify cryptographic proof. The hash provided does not match any valid on-chain record.", "{t('Could not verify cryptographic proof. The hash provided does not match any valid on-chain record.', 'Não foi possível verificar a prova criptográfica. O hash fornecido não corresponde a nenhum registro on-chain válido.')}");

fs.writeFileSync('src/views/LandingPageView.tsx', content);

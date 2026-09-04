import fs from 'fs';

let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

content = content.replace(/>Enterprise ZK-Rollup</g, ">{t('Enterprise ZK-Rollup', 'ZK-Rollup Empresarial')}<");
content = content.replace(/>Engineered for modern data stacks & blockchains</g, ">{t('Engineered for modern data stacks & blockchains', 'Projetado para stacks de dados modernos e blockchains')}<");
content = content.replace(/>Policy models are converted into arithmetic circuits. Any deviation from the enterprise policy results in a mathematically invalid proof.</g, ">{t('Policy models are converted into arithmetic circuits. Any deviation from the enterprise policy results in a mathematically invalid proof.', 'Modelos de políticas são convertidos em circuitos aritméticos. Qualquer desvio da política corporativa resulta em uma prova matematicamente inválida.')}<");
content = content.replace(/>Compliance proofs are submitted to the Solana network, where they are verified by validators without exposing the source data.</g, ">{t('Compliance proofs are submitted to the Solana network, where they are verified by validators without exposing the source data.', 'Provas de conformidade são enviadas à rede Solana, onde são verificadas por validadores sem expor os dados de origem.')}<");
content = content.replace(/>Successful verification mints a non-transferable NFT certificate to the enterprise wallet, proving adherence to specific standards.</g, ">{t('Successful verification mints a non-transferable NFT certificate to the enterprise wallet, proving adherence to specific standards.', 'A verificação bem-sucedida emite um certificado NFT não transferível para a carteira corporativa, comprovando a adesão a padrões específicos.')}<");
content = content.replace(/>Data source<\/span>/g, ">{t('Data source', 'Fonte de dados')}</span>");
content = content.replace(/>Public Network<\/span>/g, ">{t('Public Network', 'Rede Pública')}</span>");
content = content.replace(/>Proof Anchor<\/span>/g, ">{t('Proof Anchor', 'Âncora da Prova')}</span>");

fs.writeFileSync('src/views/LandingPageView.tsx', content);

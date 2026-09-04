import fs from 'fs';
let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

content = content.replace("How to connect a wallet?", "{t('How to connect a wallet?', 'Como conectar uma carteira?')}");
content = content.replace("Don't have a wallet?", "{t(\"Don't have a wallet?\", 'Não tem uma carteira?')}");
content = content.replace(
    "To interact with on-chain proofs and mint Soulbound Certificates, you need a Solana-compatible digital wallet. We recommend the following:",
    "{t('To interact with on-chain proofs and mint Soulbound Certificates, you need a Solana-compatible digital wallet. We recommend the following:', 'Para interagir com provas on-chain e emitir Certificados Soulbound, você precisa de uma carteira digital compatível com Solana. Recomendamos as seguintes:')}"
);

content = content.replace(
    "`${walletType.charAt(0).toUpperCase() + walletType.slice(1)} wallet is not installed. Please install it first.`",
    "t(`${walletType.charAt(0).toUpperCase() + walletType.slice(1)} wallet is not installed. Please install it first.`, `A carteira ${walletType.charAt(0).toUpperCase() + walletType.slice(1)} não está instalada. Por favor, instale-a primeiro.`)"
);

content = content.replace("[ CLOSE ]", "[ {t('CLOSE', 'FECHAR')} ]");

fs.writeFileSync('src/views/LandingPageView.tsx', content);

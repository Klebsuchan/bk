import fs from 'fs';
let content = fs.readFileSync('src/views/ProofsView.tsx', 'utf-8');

content = content.replace(
    'title=t("Download Certificate PDF", "Baixar Certificado PDF")',
    'title={t("Download Certificate PDF", "Baixar Certificado PDF")}'
);

content = content.replace(
    'title=!proof.walletAddress ? t("Wallet required", "Carteira obrigatória") : t("Mint as Soulbound Token", "Emitir como Token Soulbound")',
    'title={!proof.walletAddress ? t("Wallet required", "Carteira obrigatória") : t("Mint as Soulbound Token", "Emitir como Token Soulbound")}'
);

fs.writeFileSync('src/views/ProofsView.tsx', content);

import fs from 'fs';
let content = fs.readFileSync('src/views/ProofsView.tsx', 'utf-8');

content = content.replace('"Wallet required"', 't("Wallet required", "Carteira obrigatória")');
content = content.replace('"Mint as Soulbound Token"', 't("Mint as Soulbound Token", "Emitir como Token Soulbound")');
content = content.replace("'Minted' :", "t('Minted', 'Emitido') :");
content = content.replace('"Download Certificate PDF"', 't("Download Certificate PDF", "Baixar Certificado PDF")');

fs.writeFileSync('src/views/ProofsView.tsx', content);

import fs from 'fs';
let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

content = content.replace(
    "Transaction Hash / Certificate ID",
    "{t('Transaction Hash / Certificate ID', 'Hash da Transação / ID do Certificado')}"
);
content = content.replace(
    "CRYPTOGRAPHIC VERIFICATION IN PROGRESS...",
    "{t('CRYPTOGRAPHIC VERIFICATION IN PROGRESS...', 'VERIFICAÇÃO CRIPTOGRÁFICA EM ANDAMENTO...')}"
);
content = content.replace(
    "'VERIFY PROOF'",
    "t('VERIFY PROOF', 'VERIFICAR PROVA')"
);

fs.writeFileSync('src/views/LandingPageView.tsx', content);

import fs from 'fs';
let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

content = content.replace("[ CLOSE PORTAL ]", "[ {t('CLOSE PORTAL', 'FECHAR PORTAL')} ]");
content = content.replace("[ CLOSE GUIDE ]", "[ {t('CLOSE GUIDE', 'FECHAR GUIA')} ]");

fs.writeFileSync('src/views/LandingPageView.tsx', content);

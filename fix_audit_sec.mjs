import fs from 'fs';
let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

content = content.replace("{t('AUDIT', 'SEGURANÇA')}<br/>{t('SECURITY', 'DE AUDITORIA')}", "{t('AUDIT', 'AUDITORIA')}<br/>{t('SECURITY', 'DE SEGURANÇA')}");

fs.writeFileSync('src/views/LandingPageView.tsx', content);

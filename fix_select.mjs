import fs from 'fs';
let content = fs.readFileSync('src/views/PoliciesView.tsx', 'utf-8');

content = content.replace("Manual Only", "{t('Manual Only', 'Apenas Manual')}");
content = content.replace("Hourly", "{t('Hourly', 'Por Hora')}");
content = content.replace("Daily", "{t('Daily', 'Diariamente')}");
content = content.replace("Weekly", "{t('Weekly', 'Semanalmente')}");

fs.writeFileSync('src/views/PoliciesView.tsx', content);

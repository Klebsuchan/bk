import fs from 'fs';
let content = fs.readFileSync('src/views/ConnectorsView.tsx', 'utf-8');

content = content.replace("? t('Connected', 'Conectado') : 'Error'", "? t('Connected', 'Conectado') : t('Error', 'Erro')");

fs.writeFileSync('src/views/ConnectorsView.tsx', content);

let app = fs.readFileSync('src/App.tsx', 'utf-8');
app = app.replace("case 'dashboard':", "case 'dashboard':");


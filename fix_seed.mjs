import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf-8');

content = content.replace(
    "{ name: 'HR Data Warehouse', type: 'sqlserver', status: 'error', lastSync: 'Failed' }",
    "{ name: 'HR Data Warehouse', type: 'sqlserver', status: 'connected', lastSync: 'Just now' }"
);

fs.writeFileSync('server.ts', content);

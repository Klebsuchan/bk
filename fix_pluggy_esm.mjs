import fs from 'fs';

let content = fs.readFileSync('api/index.ts', 'utf-8');

// Use dynamic import since top-level import requires changing the structure
const regex = /const \{ PluggyClient \} = require\('pluggy-sdk'\);/g;
content = content.replace(regex, "const { PluggyClient } = await import('pluggy-sdk');");

fs.writeFileSync('api/index.ts', content);
console.log('Fixed ESM');

import fs from 'fs';

let content = fs.readFileSync('index.html', 'utf-8');

const titleTag = '<title>Bk.Auditor | Zero-Knowledge Compliance</title>';
const replacement = '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />\n    <title>bk.auditor® | ZK Compliance</title>';

content = content.replace(titleTag, replacement);

fs.writeFileSync('index.html', content);
console.log('index.html updated');

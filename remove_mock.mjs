import fs from 'fs';

let content = fs.readFileSync('api/index.ts', 'utf-8');

const seedCodeRegex = /\/\/ Seed initial data if empty[\s\S]*?seedDatabase\(\);/m;

if (content.match(seedCodeRegex)) {
  content = content.replace(seedCodeRegex, '');
  fs.writeFileSync('api/index.ts', content);
  console.log('Removed seedDatabase');
} else {
  console.log('Could not find seedDatabase');
}

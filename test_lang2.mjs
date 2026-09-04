import fs from 'fs';
const v = fs.readFileSync('src/views/DashboardView.tsx', 'utf8');

const lines = v.split('\n');
const results = [];
for (let i = 0; i < lines.length; i++) {
   const l = lines[i];
   if (!l.includes('className') && !l.includes('import') && !l.includes('xmlns') && !l.includes('<img')) {
     if (l.match(/>[A-Za-z0-9 ,.-]+</) && !l.includes('{t(')) {
       results.push(l.trim());
     }
   }
}

console.log(results);

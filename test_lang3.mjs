import fs from 'fs';
const files = [
  'src/views/ConnectorsView.tsx',
  'src/views/PoliciesView.tsx',
  'src/views/ProofsView.tsx',
  'src/components/Sidebar.tsx',
  'src/components/ProofGeneratorModal.tsx'
];

for (const file of files) {
  const v = fs.readFileSync(file, 'utf8');
  const lines = v.split('\n');
  const results = [];
  for (let i = 0; i < lines.length; i++) {
     const l = lines[i];
     if (!l.includes('className') && !l.includes('import') && !l.includes('xmlns') && !l.includes('<img')) {
       // Look for anything between > and < that contains letters, and doesn't contain t(
       if (l.match(/>\s*[A-Za-z]+[A-Za-z0-9 ,.-]*\s*</) && !l.includes('{t(')) {
         results.push(`${file}:${i+1}: ${l.trim()}`);
       }
     }
  }
  if (results.length > 0) {
    console.log(`--- ${file} ---`);
    console.log(results.join('\n'));
  }
}


import fs from 'fs';
let content = fs.readFileSync('src/views/DashboardView.tsx', 'utf-8');
const lines = content.split('\n');
for (let i = 55; i < 65; i++) {
    console.log(`Line ${i + 1}: ${JSON.stringify(lines[i])}`);
}

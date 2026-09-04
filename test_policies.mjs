import fs from 'fs';
let c = fs.readFileSync('src/views/PoliciesView.tsx', 'utf-8');
console.log(c.includes('{!isGuest && <button onClick={() => setShowNewPolicy(true)}'));

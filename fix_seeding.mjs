import fs from 'fs';

let content = fs.readFileSync('api/index.ts', 'utf-8');

const seedCodeTarget = /\/\/ Seed initial data if empty[\s\S]*?console\.error\('Seeding error:', e\);\n  \}/m;

const seedCodeReplacement = `// Seed initial data if empty
  async function seedDatabase() {
    try {
      const q = query(collection(db, 'policies'), limit(1));
      const policiesSnap = await getDocs(q);
      if (policiesSnap.empty) {
        console.log('Seeding initial data...');
        const policies = [
          { name: 'Solvency Rule > 120%', description: 'Proves total liquid assets exceed total liabilities by at least 20%, without revealing absolute values.', query: 'SELECT assets, liabilities FROM core_banking', status: 'active', lastProofDate: '2 hours ago' },
          { name: 'ESG Carbon Target 2024', description: 'Proves gross carbon output is below regulatory threshold based on telemetry data.', query: 'SELECT total_emissions, offset_credits FROM esg_metrics', status: 'active', lastProofDate: '1 day ago' },
          { name: 'Tax Compliance Q3', description: 'Cryptographic proof that regional tax payments match minimum expected brackets.', query: 'SELECT paid_tax, taxable_income FROM oracle_finance', status: 'active' }
        ];
        for (const p of policies) {
          await addDoc(collection(db, 'policies'), { ...p, createdAt: serverTimestamp() });
        }
  
        const connectors = [
          { name: 'Core Banking DB', type: 'postgres', status: 'connected', lastSync: '2 mins ago' },
          { name: 'Legacy Oracle', type: 'oracle', status: 'connected', lastSync: '1 hour ago' },
          { name: 'HR Data Warehouse', type: 'sqlserver', status: 'connected', lastSync: 'Just now' },
          { name: 'ESG Metrics', type: 'mongodb', status: 'connected', lastSync: '5 mins ago' }
        ];
        for (const c of connectors) {
          await addDoc(collection(db, 'connectors'), { ...c, createdAt: serverTimestamp() });
        }
        
      }
    } catch(e) {
      console.error('Seeding error:', e);
    }
  }
  seedDatabase();`;

if (content.match(seedCodeTarget)) {
  content = content.replace(seedCodeTarget, seedCodeReplacement);
  fs.writeFileSync('api/index.ts', content);
  console.log('Fixed top-level await in seeding');
} else {
  console.log('Could not find seed code block');
}

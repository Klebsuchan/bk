import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf-8');

const dashboardApi = `
  // 9. Dashboard Stats
  app.get('/api/stats', async (req, res) => {
    try {
      const proofsSnap = await getDocs(collection(db, 'proofs'));
      const policiesSnap = await getDocs(collection(db, 'policies'));
      const connectorsSnap = await getDocs(collection(db, 'connectors'));
      
      const proofs = proofsSnap.docs.map(d => d.data());
      const policies = policiesSnap.docs.map(d => d.data());
      const connectors = connectorsSnap.docs.map(d => d.data());
      
      const activePolicies = policies.filter(p => p.status === 'active').length;
      const verifiedProofs = proofs.filter(p => p.status === 'verified').length;
      const failedProofs = proofs.filter(p => p.status === 'failed').length;
      const activeConnectors = connectors.filter(c => c.status === 'connected').length;

      // Group proofs by date for the line chart (last 7 days)
      const now = new Date();
      const last7Days = Array.from({length: 7}, (_, i) => {
        const d = new Date(now);
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split('T')[0];
      });
      
      const lineDataMap = last7Days.reduce((acc, date) => {
        acc[date] = 0;
        return acc;
      }, {});
      
      proofs.forEach(p => {
        const dateStr = new Date(p.timestamp).toISOString().split('T')[0];
        if (lineDataMap[dateStr] !== undefined) {
          lineDataMap[dateStr]++;
        }
      });
      
      const daysStr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      const lineData = last7Days.map(date => {
        const d = new Date(date);
        // adjust for timezone issues just mapping directly
        const dayName = daysStr[d.getUTCDay()]; 
        return {
          name: dayName,
          date,
          proofs: lineDataMap[date]
        };
      });

      res.json({
        active: activePolicies,
        connected: activeConnectors,
        verified: verifiedProofs,
        failed: failedProofs,
        lineData
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
`;

content = content.replace("// Vite middleware for development", dashboardApi + "\n  // Vite middleware for development");
fs.writeFileSync('server.ts', content);

import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf-8');

const verifyApi = `
  // 10. Verify Hash natively
  app.post('/api/proofs/verify', async (req, res) => {
    try {
      const { hash } = req.body;
      if (!hash || !hash.startsWith('0x')) {
        return res.json({ valid: false });
      }
      
      const proofsSnap = await getDocs(query(collection(db, 'proofs'), where('hash', '==', hash)));
      
      if (!proofsSnap.empty && proofsSnap.docs[0].data().status === 'verified') {
        res.json({ valid: true });
      } else {
        res.json({ valid: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
`;

content = content.replace("// Vite middleware for development", verifyApi + "\n  // Vite middleware for development");
fs.writeFileSync('server.ts', content);

import fs from 'fs';
let serverCode = fs.readFileSync('server.ts', 'utf-8');

const postConnectorApi = `
  // 3a. Add Connector
  app.post('/api/connectors', async (req, res) => {
    try {
      const { name, type } = req.body;
      const newConnector = {
        name,
        type,
        status: 'disconnected', // Initially disconnected until tested
        lastSync: 'Never',
        createdAt: serverTimestamp()
      };
      const docRef = await addDoc(collection(db, 'connectors'), newConnector);
      res.status(201).json({ id: docRef.id, ...newConnector });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // 3c. Delete Connector
  app.delete('/api/connectors/:id', async (req, res) => {
    try {
      const { deleteDoc } = require('firebase/firestore'); // Import needed for delete
      await deleteDoc(doc(db, 'connectors', req.params.id));
      res.json({ success: true });
    } catch(err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // 3b. Test Connector`;

serverCode = serverCode.replace("// 3b. Test Connector", postConnectorApi);

// Make sure deleteDoc is imported properly at the top of server.ts if possible, or just inside the handler.
// The route imports it inline which is fine for CommonJS, but since this is ESM/compiled it might be better to add to the top imports.
const topImportMatch = serverCode.match(/import {.*?getFirestore.*? } from 'firebase\/firestore';/s);
if (topImportMatch) {
    const updatedImport = topImportMatch[0].replace('updateDoc,', 'updateDoc, deleteDoc,');
    serverCode = serverCode.replace(topImportMatch[0], updatedImport);
}

fs.writeFileSync('server.ts', serverCode);
console.log('API routes added');

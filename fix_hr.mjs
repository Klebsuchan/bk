import fs from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp, config.firestoreDatabaseId);

async function fix() {
  const q = query(collection(db, 'connectors'), where('name', '==', 'HR Data Warehouse'));
  const snap = await getDocs(q);
  if (!snap.empty) {
    for (const d of snap.docs) {
      await updateDoc(doc(db, 'connectors', d.id), {
        status: 'connected',
        lastSync: 'Just now'
      });
      console.log('Fixed:', d.id);
    }
  } else {
    console.log('Not found');
  }
  process.exit(0);
}
fix();

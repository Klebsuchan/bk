import fs from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc } from 'firebase/firestore';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp, config.firestoreDatabaseId);

async function clear() {
  const snap = await getDocs(collection(db, 'proofs'));
  for (const d of snap.docs) {
    await deleteDoc(d.ref);
  }
  console.log('Cleared mock proofs');
  process.exit(0);
}
clear();

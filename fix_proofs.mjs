import fs from 'fs';

let content = fs.readFileSync('api/index.ts', 'utf-8');

const regex = /const policyDoc = await getDocs\(query\(collection\(db, 'policies'\), where\('__name__', '==', policyId\)\)\);\n      if \(\!policyDoc\.empty\) \{\n         queryStr = policyDoc\.docs\[0\]\.data\(\)\.query \|\| queryStr;\n      \}/;

const newCode = `      const { getDoc } = require('firebase/firestore');
      const policyDoc = await getDoc(doc(db, 'policies', policyId));
      if (policyDoc.exists()) {
         queryStr = policyDoc.data().query || queryStr;
      }`;

content = content.replace(regex, newCode);
fs.writeFileSync('api/index.ts', content);
console.log('Fixed proofs generate');

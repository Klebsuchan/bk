import fs from 'fs';

let content = fs.readFileSync('api/index.ts', 'utf-8');

// Replace dynamic require of crypto with top level import
if (!content.includes("import crypto from 'crypto';")) {
   content = "import crypto from 'crypto';\n" + content;
}
content = content.replace(/const crypto = require\('crypto'\);/g, "");

// Replace dynamic require of deleteDoc with getDoc
content = content.replace("import { getFirestore, collection, getDocs, addDoc, serverTimestamp, doc, updateDoc, deleteDoc, orderBy, query, limit, where } from 'firebase/firestore';", "import { getFirestore, collection, getDocs, addDoc, serverTimestamp, doc, updateDoc, deleteDoc, orderBy, query, limit, where, getDoc } from 'firebase/firestore';");
content = content.replace(/const \{ deleteDoc \} = require\('firebase\/firestore'\); \/\/ Import needed for delete/g, "");
content = content.replace(/const \{ getDoc \} = require\('firebase\/firestore'\);/g, "");

fs.writeFileSync('api/index.ts', content);
console.log('Fixed ESM require errors');

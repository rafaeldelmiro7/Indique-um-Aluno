import { readFileSync } from "node:fs";
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(readFileSync(new URL("../serviceAccountKey.json", import.meta.url)));
initializeApp({ credential: cert(serviceAccount) });

const auth = getAuth();
const db = getFirestore();

const { users } = await auth.listUsers();
console.log(`Usuários no Authentication: ${users.length}`);
for (const u of users) {
  const adminDoc = await db.doc(`admins/${u.uid}`).get();
  console.log(`- ${u.email} (uid: ${u.uid}) — admin: ${adminDoc.exists ? "SIM" : "não"}`);
}

const schoolsSnap = await db.collection("schools").get();
console.log(`Escolas cadastradas: ${schoolsSnap.size}`);

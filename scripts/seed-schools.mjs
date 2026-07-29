import { readFileSync } from "node:fs";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const SCHOOLS = [
  { id: "caji", name: "CAJI - Colégio Adventista de Ji-Paraná", slug: "caji" },
  { id: "eaji", name: "EAJI - Escola Adventista de Ji-Paraná", slug: "eaji" },
  { id: "eaop", name: "EAOP - Escola Adventista de Ouro Preto do Oeste", slug: "eaop" },
  { id: "eav", name: "EAV - Escola Adventista de Vilhena", slug: "eav" },
  { id: "car", name: "CAR - Colégio Adventista de Rondônia", slug: "car" },
];

const serviceAccount = JSON.parse(readFileSync(new URL("../serviceAccountKey.json", import.meta.url)));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

for (const school of SCHOOLS) {
  await db.doc(`schools/${school.id}`).set({ ...school, active: true }, { merge: true });
  console.log(`OK: ${school.name}`);
}

console.log("Escolas cadastradas com sucesso.");

import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Referral, ReferralStatus, School } from "./types";

export async function listSchools(): Promise<School[]> {
  const snap = await getDocs(collection(db, "schools"));
  return snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as Omit<School, "id">) }))
    .filter((s) => s.active);
}

export async function isAdmin(uid: string): Promise<boolean> {
  const snap = await getDoc(doc(db, "admins", uid));
  return snap.exists();
}

export async function listAllReferrals(): Promise<Referral[]> {
  const q = query(collection(db, "referrals"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Referral, "id">) }));
}

export async function updateReferralStatus(
  id: string,
  status: ReferralStatus
): Promise<void> {
  await updateDoc(doc(db, "referrals", id), {
    status,
    updatedAt: Date.now(),
  });
}

export async function updateReferralVisitDate(
  id: string,
  visitDate: string
): Promise<void> {
  await updateDoc(doc(db, "referrals", id), {
    visitDate,
    updatedAt: Date.now(),
  });
}

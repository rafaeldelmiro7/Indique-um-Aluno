import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Referral, School } from "./types";

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

const REFERRAL_DEFAULTS: Omit<Referral, "id"> = {
  ambassadorType: "pais",
  ambassadorName: "",
  ambassadorEmail: "",
  ambassadorPhone: "",
  ambassadorCpf: "",
  ambassadorBirthDate: "",
  studentResponsibleName: "",
  studentName: "",
  studentEmail: "",
  studentPhone: "",
  schoolId: "",
  schoolName: "",
  status: "pendente",
  visitDate: "",
  visitResult: "nao_registrada",
  contactAttemptDate: "",
  contactAttemptNote: "",
  contactResult: "nao_registrado",
  createdAt: 0,
  updatedAt: 0,
};

export async function listAllReferrals(): Promise<Referral[]> {
  const q = query(collection(db, "referrals"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    ...REFERRAL_DEFAULTS,
    ...(d.data() as Omit<Referral, "id">),
    id: d.id,
  }));
}

export async function updateReferral(
  id: string,
  data: Partial<Omit<Referral, "id">>
): Promise<void> {
  await updateDoc(doc(db, "referrals", id), {
    ...data,
    updatedAt: Date.now(),
  });
}

export async function deleteReferral(id: string): Promise<void> {
  await deleteDoc(doc(db, "referrals", id));
}

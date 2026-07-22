import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function getCustomers() {
  const snapshot = await getDocs(collection(db, "customers"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
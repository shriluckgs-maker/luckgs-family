import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function getCustomers() {
  const snapshot = await getDocs(collection(db, "customers"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export function getOnboardingStats(customers) {
  return customers.reduce(
    (stats, customer) => {
      if (customer.whatsapp?.status === "sent") stats.whatsAppSent += 1;
      if (customer.whatsapp?.status === "queued") stats.whatsAppQueued += 1;
      if (customer.whatsapp?.status === "failed") stats.whatsAppFailed += 1;
      return stats;
    },
    { whatsAppSent: 0, whatsAppQueued: 0, whatsAppFailed: 0 }
  );
}

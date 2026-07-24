import { doc, getDoc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function hasUsedLuckySpin(customerId) {
  if (!customerId) return false;
  const spin = await getDoc(doc(db, "luckySpins", customerId));
  return spin.exists();
}

export async function claimLuckySpin(customer, reward) {
  if (!customer?.id) return false;
  const spinRef = doc(db, "luckySpins", customer.id);
  return runTransaction(db, async (transaction) => {
    const existingSpin = await transaction.get(spinRef);
    if (existingSpin.exists()) return false;
    transaction.set(spinRef, {
      customerId: customer.id,
      customerName: customer.name || "",
      mobile: customer.mobile || "",
      reward: reward.title,
      coupon: reward.coupon || "",
      spunAt: serverTimestamp(),
    });
    return true;
  });
}

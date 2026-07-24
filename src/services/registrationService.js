import {
  collection,
  doc,
  getDocsFromServer,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { normalizeIndianMobile } from "../utils/mobileNumber";

export async function registerCustomer(form) {
  const mobile = normalizeIndianMobile(form.mobile);
  // Older records can contain +91, spaces, or a number value. Compare their
  // normalized mobile numbers so they cannot be registered a second time.
  const existingCustomer = await getDocsFromServer(collection(db, "customers"));
  const isAlreadyRegistered = existingCustomer.docs.some((customerDoc) => {
    const data = customerDoc.data();
    return normalizeIndianMobile(data.mobile || data.phone) === mobile;
  });

  if (isAlreadyRegistered) {
    const error = new Error("This mobile number is already registered.");
    error.code = "already-registered";
    throw error;
  }

  const customer = {
    name: form.name.trim(),
    mobile,
    birthday: form.birthday,
    gender: form.gender || null,
    place: form.place || null,
    marketingConsent: Boolean(form.marketingConsent),
    joinedOn: new Date().toISOString(),
    createdAt: serverTimestamp(),
    onboardingStatus: "registered-awaiting-spin",
    whatsapp: {
      status: form.marketingConsent ? "awaiting-spin" : "not-consented",
      type: "reward",
    },
  };

  const customerRef = doc(collection(db, "customers"));
  const mobileRef = doc(db, "customerMobiles", mobile);

  await runTransaction(db, async (transaction) => {
    const mobileReservation = await transaction.get(mobileRef);
    if (mobileReservation.exists()) {
      const error = new Error("This mobile number is already registered.");
      error.code = "already-registered";
      throw error;
    }

    transaction.set(customerRef, customer);
    transaction.set(mobileRef, {
      customerId: customerRef.id,
      mobile,
      createdAt: serverTimestamp(),
    });
  });

  return { id: customerRef.id, ...customer };
}

import {
  collection,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  runTransaction,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

/* =====================================================
   SAVE REWARD PASS
===================================================== */

export async function saveRewardPass({
  rewardPassId,
  customerId,
  customerName,
  mobile,
  reward,
}) {
  try {
    const issuedDate = new Date();

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    await setDoc(doc(db, "rewardPasses", rewardPassId), {
      rewardPassId,
      customerId,
      customerName,
      mobile,
      reward,

      status: "ACTIVE",

      redeemed: false,
      redeemedDate: null,

      issuedDate,
      expiryDate,

      whatsappSent: false,
      shared: false,

      createdAt: serverTimestamp(),
    });

    console.log("✅ Reward Pass Created");

    return true;
  } catch (error) {
    console.error("❌ Error Saving Reward Pass:", error);

    return false;
  }
}

/* =====================================================
   CHECK ACTIVE REWARD PASS
===================================================== */

export async function hasActiveRewardPass(customerId) {
  try {
    const rewardCollection = collection(
      db,
      "rewardPasses"
    );

    const q = query(
      rewardCollection,
      where("customerId", "==", customerId),
      where("status", "==", "ACTIVE")
    );

    const snapshot = await getDocs(q);

    return !snapshot.empty;
  } catch (error) {
    console.error(
      "❌ Error Checking Reward Pass:",
      error
    );

    return false;
  }
}

/* =====================================================
   GET ACTIVE REWARD PASS
===================================================== */

export async function getActiveRewardPass(customerId) {
  try {
    const rewardCollection = collection(
      db,
      "rewardPasses"
    );

    const q = query(
      rewardCollection,
      where("customerId", "==", customerId),
      where("status", "==", "ACTIVE")
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    return {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data(),
    };
  } catch (error) {
    console.error(
      "❌ Error Loading Reward Pass:",
      error
    );

    return null;
  }
}

/* =====================================================
   GET ALL PASSES OF CUSTOMER
===================================================== */

export async function getCustomerRewardPasses(
  customerId
) {
  try {
    const rewardCollection = collection(
      db,
      "rewardPasses"
    );

    const q = query(
      rewardCollection,
      where("customerId", "==", customerId)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(error);

    return [];
  }
}

/* =====================================================
   REDEEM REWARD PASS
===================================================== */

export async function redeemRewardPass(
  rewardPassId
) {
  try {
    await updateDoc(
      doc(db, "rewardPasses", rewardPassId),
      {
        status: "REDEEMED",
        redeemed: true,
        redeemedDate: serverTimestamp(),
      }
    );

    console.log("✅ Reward Redeemed");

    return true;
  } catch (error) {
    console.error(
      "❌ Redeem Failed:",
      error
    );

    return false;
  }
}

/* =====================================================
   LOAD ALL REWARD PASSES
===================================================== */

export async function redeemCustomerReward(rewardPassId) {
  try {
    const passRef = doc(db, "rewardPasses", rewardPassId);

    return await runTransaction(db, async (transaction) => {
      const pass = await transaction.get(passRef);

      if (!pass.exists()) {
        throw new Error("Reward pass not found.");
      }

      if (pass.data().status !== "ACTIVE" || pass.data().redeemed === true) {
        return false;
      }

      transaction.update(passRef, {
        status: "redeemed",
        redeemed: true,
        redeemedDate: serverTimestamp(),
        redeemedAt: serverTimestamp(),
      });

      return true;
    });
  } catch (error) {
    console.error("Customer reward redemption failed:", error);
    throw error;
  }
}

export async function getAllRewardPasses() {
  try {
    const snapshot = await getDocs(
      collection(db, "rewardPasses")
    );

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(error);

    return [];
  }
}

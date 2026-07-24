import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { defaultRewards } from "../components/rewards/RewardData";

const rewardCollection = collection(db, "spinRewards");

function orderRewards(rewards) {
  return [...rewards].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function getSpinRewards() {
  const snapshot = await getDocs(rewardCollection);
  if (snapshot.empty) return defaultRewards.map((reward, index) => ({ ...reward, id: `default-${index}` }));
  return orderRewards(snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })));
}

export async function seedSpinRewards() {
  const snapshot = await getDocs(rewardCollection);
  if (!snapshot.empty) return getSpinRewards();
  await Promise.all(defaultRewards.map((reward) => addDoc(rewardCollection, reward)));
  return getSpinRewards();
}

export async function createSpinReward(reward) {
  await addDoc(rewardCollection, reward);
}

export async function updateSpinReward(id, changes) {
  await updateDoc(doc(db, "spinRewards", id), changes);
}

export async function deleteSpinReward(id) {
  await deleteDoc(doc(db, "spinRewards", id));
}

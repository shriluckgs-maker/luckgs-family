import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
 apiKey: "AIzaSyCaATWNEyG2lbRo4E36L48B7ATT2uszlaE",
  authDomain: "luckgs-family.firebaseapp.com",
  projectId: "luckgs-family",
  storageBucket: "luckgs-family.firebasestorage.app",
  messagingSenderId: "738831279276",
  appId: "1:738831279276:web:0bf73262d54f24f252eb09",
  measurementId: "G-ZK8KRD2XZJ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAOSCugULnjKEFaBGeDLpo3Cle5qDdThe0",
  authDomain: "vcubeworld-3801d.firebaseapp.com",
  projectId: "vcubeworld-3801d",
  storageBucket: "vcubeworld-3801d.appspot.com",
  messagingSenderId: "924294220668",
  appId: "1:924294220668:web:2528c9503a59da215df2f9",
  measurementId: "G-6DRL8VFMBL",
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ✅ Enable Login Persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("✅ Firebase session persistence enabled"))
  .catch((err) => console.error("❌ Firebase persistence error", err));

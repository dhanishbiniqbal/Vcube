import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Firebase configuration with updated credentials
const firebaseConfig = {
  apiKey: "AIzaSyAOSCugULnjKEFaBGeDLpo3Cle5qDdThe0",
  authDomain: "vcubeworld-3801d.firebaseapp.com",
  projectId: "vcubeworld-3801d",
  storageBucket: "vcubeworld-3801d.appspot.com",
  messagingSenderId: "924294220668",
  appId: "1:924294220668:web:2528c9503a59da215df2f9",
  measurementId: "G-6DRL8VFMBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (for tracking website usage)
export const analytics = getAnalytics(app);

// Export auth and database instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

console.log("🔥 Firebase Project:", firebaseConfig.projectId);

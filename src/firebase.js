import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOSCUgULnjKEFaBGDeLDpo3C1e5qDdThe0",
  authDomain: "vcubeworld-3801d.firebaseapp.com",
  projectId: "vcubeworld-3801d",
  storageBucket: "vcubeworld-3801d.appspot.com",
  messagingSenderId: "924294220668",
  appId: "1:924294220668:web:a5164c2c869d28655df2f9",
  measurementId: "G-GL5T7B62KW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgG7t-pPwjcE2U9wtTmxtwfOxmIxfecig",
  authDomain: "rn-social-a9ddb.firebaseapp.com",
  projectId: "rn-social-a9ddb",
  storageBucket: "rn-social-a9ddb.appspot.com",
  messagingSenderId: "314516102402",
  appId: "1:314516102402:web:9c0288c16ebf3279c8f61b",
  measurementId: "G-838X9ECGHM",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();

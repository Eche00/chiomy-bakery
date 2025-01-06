import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbU2iGzn39wbd-P3JdBnDuxT-emx_tdwA",
  authDomain: "chatme-ae9e7.firebaseapp.com",
  projectId: "chatme-ae9e7",
  storageBucket: "chatme-ae9e7.appspot.com",
  messagingSenderId: "704645971111",
  appId: "1:704645971111:web:522f486b23efc9e5e2af82",
  measurementId: "G-RZ7B0XL3PE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storageF = getStorage(app);

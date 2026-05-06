import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpfISi18pI7EiXReNhSH_j-xeJ76wM36A",
  authDomain: "estate-b4c72.firebaseapp.com",
  projectId: "estate-b4c72",
  storageBucket: "estate-b4c72.firebasestorage.app",
  messagingSenderId: "196494131460",
  appId: "1:196494131460:web:68b915c07f0d3059bc9051",
};

console.log("[firebaseConfig] Firebase configuration:", {
  apiKey: firebaseConfig.apiKey
    ? "***" + firebaseConfig.apiKey.slice(-4)
    : "MISSING",
  authDomain: firebaseConfig.authDomain || "MISSING",
  projectId: firebaseConfig.projectId || "MISSING",
  storageBucket: firebaseConfig.storageBucket || "MISSING",
  messagingSenderId: firebaseConfig.messagingSenderId || "MISSING",
  appId: firebaseConfig.appId
    ? "***" + firebaseConfig.appId.slice(-4)
    : "MISSING",
});

const app = initializeApp(firebaseConfig);
console.log("[firebaseConfig] Firebase app initialized:", app.name);

export const auth = getAuth(app);
console.log("[firebaseConfig] Auth initialized:", auth ? "SUCCESS" : "FAILED");

export default app;

export const db = getFirestore(app);
console.log(
  "[firebaseConfig] Firestore initialized:",
  db ? "SUCCESS" : "FAILED",
);
console.log("[firebaseConfig] Firestore app:", db.app.name);

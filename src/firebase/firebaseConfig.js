import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCpfISi18pI7EiXReNhSH_j-xeJ76wM36A',
  authDomain: 'estate-b4c72.firebaseapp.com',
  projectId: 'estate-b4c72',
  storageBucket: 'estate-b4c72.firebasestorage.app',
  messagingSenderId: '196494131460',
  appId: '1:196494131460:web:68b915c07f0d3059bc9051',
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
console.log("✅ Firebase initialized successfully!");
console.log("Auth object:", auth);
export default app;
// export const db = getFirestore(firebaseApp)

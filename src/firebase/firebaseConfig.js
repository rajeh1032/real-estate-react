import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  // apiKey: 'AIzaSyCpfISi18pI7EiXReNhSH_j-xeJ76wM36A',
  // authDomain: 'estate-b4c72.firebaseapp.com',
  // projectId: 'estate-b4c72',
  // storageBucket: 'estate-b4c72.firebasestorage.app',
  // messagingSenderId: '196494131460',
  // appId: '1:196494131460:web:68b915c07f0d3059bc9051',
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
console.log("Auth object:", auth);
export default app;
export const db = getFirestore(app);

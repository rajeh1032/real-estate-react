import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getFirestore } from "firebase/firestore";

export function getCollectionRef(collectionName) {
  return collection(db, collectionName);
}

export async function getAllDocuments(collectionName) {
  console.log(
    "[firestoreHelper] Getting all documents from collection:",
    collectionName,
  );
  try {
    const collectionRef = getCollectionRef(collectionName);
    console.log(
      "[firestoreHelper] Collection reference created:",
      collectionRef.path,
    );

    const snapshot = await getDocs(collectionRef);
    console.log("[firestoreHelper] ===== FIREBASE RESPONSE START =====");
    console.log("[firestoreHelper] Snapshot received:", snapshot);
    console.log("[firestoreHelper] Snapshot size:", snapshot.size);
    console.log("[firestoreHelper] Snapshot empty?", snapshot.empty);
    console.log("[firestoreHelper] Snapshot metadata:", snapshot.metadata);
    console.log("[firestoreHelper] Number of docs:", snapshot.docs.length);

    const documents = snapshot.docs.map((item, index) => {
      const data = item.data();
      console.log(`[firestoreHelper] Document ${index + 1}:`, {
        id: item.id,
        data: data,
        exists: item.exists,
        metadata: item.metadata,
      });
      return {
        id: item.id,
        ...data,
      };
    });

    console.log("[firestoreHelper] All documents mapped:", documents);
    console.log("[firestoreHelper] ===== FIREBASE RESPONSE END =====");
    return documents;
  } catch (error) {
    console.error("[firestoreHelper] ===== FIREBASE ERROR START =====");
    console.error("[firestoreHelper] Error object:", error);
    console.error("[firestoreHelper] Error name:", error.name);
    console.error("[firestoreHelper] Error code:", error.code);
    console.error("[firestoreHelper] Error message:", error.message);
    console.error("[firestoreHelper] Error stack:", error.stack);
    if (error.customData) {
      console.error("[firestoreHelper] Error customData:", error.customData);
    }
    console.error("[firestoreHelper] ===== FIREBASE ERROR END =====");
    throw error;
  }
}

export async function getDocumentById(collectionName, documentId) {
  const documentRef = doc(db, collectionName, documentId);
  const snapshot = await getDoc(documentRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

export async function addDocument(collectionName, data) {
  const response = await addDoc(getCollectionRef(collectionName), data);
  return response.id;
}

export async function setDocumentById(collectionName, documentId, data) {
  const documentRef = doc(db, collectionName, documentId);
  await setDoc(documentRef, data);
  return documentId;
}

export async function updateDocumentById(collectionName, documentId, data) {
  const documentRef = doc(db, collectionName, documentId);
  await updateDoc(documentRef, data);
  return documentId;
}

export async function deleteDocumentById(collectionName, documentId) {
  const documentRef = doc(db, collectionName, documentId);
  await deleteDoc(documentRef);
  return documentId;
}

export async function getDocumentsByField(collectionName, fieldName, value) {
  const collectionRef = getCollectionRef(collectionName);
  const filteredQuery = query(collectionRef, where(fieldName, "==", value));
  const snapshot = await getDocs(filteredQuery);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

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
} from 'firebase/firestore'
import { db } from './firebaseConfig'

export function getCollectionRef(collectionName) {
  return collection(db, collectionName)
}

export async function getAllDocuments(collectionName) {
  const snapshot = await getDocs(getCollectionRef(collectionName))
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }))
}

export async function getDocumentById(collectionName, documentId) {
  const documentRef = doc(db, collectionName, documentId)
  const snapshot = await getDoc(documentRef)

  if (!snapshot.exists()) {
    return null
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  }
}

export async function addDocument(collectionName, data) {
  const response = await addDoc(getCollectionRef(collectionName), data)
  return response.id
}

export async function setDocumentById(collectionName, documentId, data) {
  const documentRef = doc(db, collectionName, documentId)
  await setDoc(documentRef, data)
  return documentId
}

export async function updateDocumentById(collectionName, documentId, data) {
  const documentRef = doc(db, collectionName, documentId)
  await updateDoc(documentRef, data)
  return documentId
}

export async function deleteDocumentById(collectionName, documentId) {
  const documentRef = doc(db, collectionName, documentId)
  await deleteDoc(documentRef)
  return documentId
}

export async function getDocumentsByField(collectionName, fieldName, value) {
  const collectionRef = getCollectionRef(collectionName)
  const filteredQuery = query(collectionRef, where(fieldName, '==', value))
  const snapshot = await getDocs(filteredQuery)

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }))
}

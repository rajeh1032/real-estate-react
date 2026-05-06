
import {
  collection,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
  doc,
} from 'firebase/firestore'
import { db } from '../../../firebase/firebaseConfig'

const USERS_COLLECTION = 'users'
const PROPERTIES_COLLECTION = 'properties'
const FAVORITES_COLLECTION = 'favorites'

function normalizeArray(value) {
  if (!value) {
    return []
  }

  if (Array.isArray(value)) {
    return value.filter(Boolean)
  }

  return [value].filter(Boolean)
}

function normalizeUserProfile(authUser, profile = {}) {
  const displayName = profile.name || profile.displayName || authUser.displayName || 'DreamHome Member'

  return {
    id: authUser.uid,
    uid: authUser.uid,
    avatar: profile.avatar || profile.photoURL || authUser.photoURL || '',
    name: displayName,
    email: profile.email || authUser.email || '',
    phone: profile.phone || profile.phoneNumber || authUser.phoneNumber || '',
    address: profile.address || profile.location || '',
    savedPropertyIds: [
      ...normalizeArray(profile.savedPropertyIds),
      ...normalizeArray(profile.savedProperties),
      ...normalizeArray(profile.favorites),
      ...normalizeArray(profile.favoritePropertyIds),
    ],
    raw: profile,
  }
}

function normalizeProperty(property) {
  const images = Array.isArray(property.images) ? property.images : []
  const image = property.image || images[0] || ''

  return {
    id: property.id,
    image,
    title: property.title || 'Untitled property',
    location: [property.location, property.city].filter(Boolean).join(', ') || 'Location unavailable',
    price: Number(property.price) || 0,
    area: Number(property.area) || 0,
    bedrooms: Number(property.bedrooms) || 0,
    bathrooms: Number(property.bathrooms) || 0,
  }
}

async function getUserDocument(authUser) {
  const byIdSnapshot = await getDoc(doc(db, USERS_COLLECTION, authUser.uid))

  if (byIdSnapshot.exists()) {
    return {
      id: byIdSnapshot.id,
      ...byIdSnapshot.data(),
    }
  }

  const byUidSnapshot = await getDocs(
    query(collection(db, USERS_COLLECTION), where('uid', '==', authUser.uid)),
  )

  if (byUidSnapshot.empty) {
    return null
  }

  const userDoc = byUidSnapshot.docs[0]

  return {
    id: userDoc.id,
    ...userDoc.data(),
  }
}

async function getPropertiesByIds(propertyIds) {
  const uniqueIds = [...new Set(propertyIds)].filter(Boolean)

  if (uniqueIds.length === 0) {
    return []
  }

  const chunks = []

  for (let index = 0; index < uniqueIds.length; index += 10) {
    chunks.push(uniqueIds.slice(index, index + 10))
  }

  const snapshots = await Promise.all(
    chunks.map((ids) =>
      getDocs(
        query(collection(db, PROPERTIES_COLLECTION), where(documentId(), 'in', ids)),
      ),
    ),
  )

  return snapshots.flatMap((snapshot) =>
    snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    })),
  )
}

async function getFavoritePropertyIds(userId) {
  try {
    const snapshot = await getDocs(
      query(collection(db, FAVORITES_COLLECTION), where('userId', '==', userId)),
    )

    return snapshot.docs
      .map((item) => item.data().propertyId || item.data().property)
      .filter(Boolean)
  } catch {
    return []
  }
}

export async function getAccountProfile(authUser) {
  const profileDocument = await getUserDocument(authUser)
  return normalizeUserProfile(authUser, profileDocument || {})
}

export async function getUserProperties(profile) {
  const ownedSnapshot = await getDocs(
    query(collection(db, PROPERTIES_COLLECTION), where('ownerId', '==', profile.uid)),
  )

  const favoritePropertyIds = await getFavoritePropertyIds(profile.uid)
  const savedProperties = await getPropertiesByIds([
    ...profile.savedPropertyIds,
    ...favoritePropertyIds,
  ])

  const propertiesById = new Map()

  ownedSnapshot.docs.forEach((item) => {
    propertiesById.set(item.id, {
      id: item.id,
      ...item.data(),
    })
  })

  savedProperties.forEach((property) => {
    propertiesById.set(property.id, property)
  })

  return [...propertiesById.values()].map(normalizeProperty)
}

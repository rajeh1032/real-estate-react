import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

const FAVORITES_COLLECTION = "favorites";

/**
 * Toggle favorite status for a property
 * @param {string} userId - The authenticated user's ID
 * @param {string} propertyId - The property ID to favorite/unfavorite
 * @returns {Promise<{isFavorite: boolean}>} - New favorite status
 */
export async function toggleFavorite(userId, propertyId) {
  if (!userId || !propertyId) {
    throw new Error("User ID and Property ID are required");
  }

  const favoritesRef = collection(db, FAVORITES_COLLECTION);
  const q = query(
    favoritesRef,
    where("userId", "==", userId),
    where("propertyId", "==", propertyId),
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    await addDoc(favoritesRef, {
      userId,
      propertyId,
      createdAt: serverTimestamp(),
    });
    return { isFavorite: true };
  } else {
    const favoriteDoc = snapshot.docs[0];
    await deleteDoc(doc(db, FAVORITES_COLLECTION, favoriteDoc.id));
    return { isFavorite: false };
  }
}

/**
 * Check if a property is favorited by a user
 * @param {string} userId - The authenticated user's ID
 * @param {string} propertyId - The property ID to check
 * @returns {Promise<boolean>} - True if favorited, false otherwise
 */
export async function checkIsFavorite(userId, propertyId) {
  if (!userId || !propertyId) {
    return false;
  }

  try {
    const favoritesRef = collection(db, FAVORITES_COLLECTION);
    const q = query(
      favoritesRef,
      where("userId", "==", userId),
      where("propertyId", "==", propertyId),
    );

    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error("[favoritesService] Error checking favorite status:", error);
    return false;
  }
}

/**
 * Get all favorite property IDs for a user
 * @param {string} userId - The authenticated user's ID
 * @returns {Promise<string[]>} - Array of property IDs
 */
export async function getUserFavorites(userId) {
  if (!userId) {
    return [];
  }

  try {
    const favoritesRef = collection(db, FAVORITES_COLLECTION);
    const q = query(favoritesRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((item) => item.data().propertyId).filter(Boolean);
  } catch (error) {
    console.error("[favoritesService] Error getting user favorites:", error);
    return [];
  }
}

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../../firebase/firebaseConfig";
import { setDocumentById } from "../../../firebase/firestoreHelper";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

/**
 * Save or update user data in Firestore
 * @param {Object} user - Firebase Auth user object
 * @param {Object} additionalData - Additional user data (firstName, lastName, phone, etc.)
 */
async function saveUserToFirestore(user, additionalData = {}) {
  try {
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || additionalData.displayName || "",
      photoURL: user.photoURL || "",
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber || additionalData.phone || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...additionalData,
    };

    await setDocumentById("users", user.uid, userData);
    console.log("✅ User data saved to Firestore:", user.uid);
    return userData;
  } catch (error) {
    console.error("❌ Failed to save user to Firestore:", error);
    throw error;
  }
}

//Register Bale E-mail
export async function registerWithEmail({
  firstName,
  lastName,
  email,
  password,
  phone,
}) {
  try {
    console.log(" Starting registration for:", email);
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(" User created with UID:", res.user.uid);

    const displayName = `${firstName} ${lastName}`;
    await updateProfile(res.user, {
      displayName,
    });
    console.log(" Display name set to:", displayName);

    // Save user data to Firestore
    await saveUserToFirestore(res.user, {
      displayName,
      firstName,
      lastName,
      phone: phone || "",
    });

    await sendEmailVerification(res.user, {
      url: `${window.location.origin}/login`,
      handleCodeInApp: false,
    });
    console.log("Verification email sent to:", email);
    console.log(" Please check your inbox (and spam folder!)");
    // w b3den signOut
    await signOut(auth);
    console.log("✅ User signed out - must verify email before login");

    return res.user;
  } catch (error) {
    console.error("❌ Registration failed:");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    throw error;
  }
}
// login with email
export async function loginWithEmail(email, password) {
  try {
    console.log(" Attempting login for:", email);

    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(" Login successful");
    console.log("Email verified:", res.user.emailVerified);

    // Check is verified wala la
    if (!res.user.emailVerified) {
      await signOut(auth);
      console.log(" Email not verified - user signed out");
      throw new Error("EMAIL_NOT_VERIFIED");
    }

    return res.user;
  } catch (error) {
    console.error(" sorry Login failed:", error.code);
    throw error;
  }
}

// h login with google
export async function loginWithGoogle() {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    console.log("User:", res.user.displayName);

    // Save or update user data in Firestore
    await saveUserToFirestore(res.user, {
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
    });

    return res.user;
  } catch (error) {
    console.error(" Google login failed:", error.code);
    throw error;
  }
}

// LOGOUT
export async function logout() {
  try {
    await signOut(auth);
    console.log("✅ User logged out successfully");
  } catch (error) {
    console.error("❌ Logout failed:", error);
    throw error;
  }
}

// atfrg 3 authstatechange
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(" User state changed:", user.email);
      console.log("Email verified:", user.emailVerified);
    } else {
      console.log(" User state: No user logged in");
    }
    callback(user);
  });
}

// ERROR MESSAGES bta3 verfication
export function getAuthErrorMessage(error) {
  // Custom error for email verification
  if (error.message === "EMAIL_NOT_VERIFIED") {
    return "Email not verified. Please verify your email first. Check your inbox and spam folder.";
  }

  // Firebase error codes
  const errorMessages = {
    "auth/email-already-in-use":
      "This email is already registered. Try logging in instead.",
    "auth/invalid-email": "Invalid email address format.",
    "auth/weak-password": "Password must be at least 6 characters long.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/too-many-requests":
      "Too many failed attempts. Please try again later.",
    "auth/network-request-failed":
      "Network error. Check your internet connection.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/operation-not-allowed":
      "Email/Password sign-in is not enabled. Contact support.",
  };

  const message = errorMessages[error.code];

  if (message) {
    console.log("📋 User-friendly error:", message);
    return message;
  }

  console.error("⚠️ Unhandled error code:", error.code);
  return "Something went wrong. Please try again.";
}

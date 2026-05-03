// src/features/auth/services/authService.js
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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export async function registerWithEmail({ firstName, lastName, email, password }) {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(res.user, { displayName: `${firstName} ${lastName}` });
  await sendEmailVerification(res.user);
  return res.user;
}

// ── Login ─────────────────────────────────────────────────────────
export async function loginWithEmail(email, password) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  if (!res.user.emailVerified) {
    await signOut(auth);
    throw new Error("EMAIL_NOT_VERIFIED");
  }
  return res.user;
}

// ── Google ────────────────────────────────────────────────────────
export async function loginWithGoogle() {
  const res = await signInWithPopup(auth, googleProvider);
  return res.user;
}

// ── Resend Verification ───────────────────────────────────────────
export async function resendVerificationEmail() {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");
  await sendEmailVerification(user);
}

// ── Logout ────────────────────────────────────────────────────────
export async function logout() {
  await signOut(auth);
}

// ── Watch Auth State ──────────────────────────────────────────────
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

// ── Error Messages ────────────────────────────────────────────────
export function getAuthErrorMessage(error) {
  if (error.message === "EMAIL_NOT_VERIFIED")
    return "Please verify your email first. Check your inbox.";

  const map = {
    "auth/email-already-in-use":    "This email is already registered.",
    "auth/invalid-email":           "Invalid email address.",
    "auth/weak-password":           "Password must be at least 6 characters.",
    "auth/user-not-found":          "No account found with this email.",
    "auth/wrong-password":          "Incorrect password.",
    "auth/invalid-credential":      "Invalid email or password.",
    "auth/too-many-requests":       "Too many attempts. Try again later.",
    "auth/network-request-failed":  "Network error. Check your connection.",
    "auth/popup-closed-by-user":    "Google sign-in was cancelled.",
  };

  return map[error.code] || "Something went wrong. Please try again.";
}
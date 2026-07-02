import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Static payload identifying which project/landing-page the signup came from.
const PROJECT_NAME = "Shared Living";

const WISHLIST_COLLECTION = "wishlist_signups";

export interface WishlistSignupPayload {
  email: string;
  project: string;
  createdAt: unknown; // Firestore server timestamp
}

export class WishlistServiceError extends Error {
  code: "invalid-email" | "unknown";
  constructor(message: string, code: WishlistServiceError["code"]) {
    super(message);
    this.name = "WishlistServiceError";
    this.code = code;
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Registers an email to the wishlist for the "Shared Living" project.
 * Throws WishlistServiceError on validation failure or write failure.
 *
 * Note: duplicate checking is intentionally NOT done client-side here,
 * since Firestore security rules for this collection are write-only
 * (no client reads allowed). Dedupe server-side (Cloud Function) or
 * during admin review if needed.
 */
export async function registerWishlistEmail(email: string): Promise<void> {
  const trimmedEmail = email.trim().toLowerCase();

  if (!isValidEmail(trimmedEmail)) {
    throw new WishlistServiceError("Please enter a valid email address.", "invalid-email");
  }

  try {
    await addDoc(collection(db, WISHLIST_COLLECTION), {
      email: trimmedEmail,
      project: PROJECT_NAME,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to register wishlist email:", error);
    const firebaseCode =
      typeof error === "object" && error !== null && "code" in error
        ? (error as { code: string }).code
        : null;
    throw new WishlistServiceError(
      firebaseCode
        ? `Something went wrong (${firebaseCode}). Please try again.`
        : "Something went wrong. Please try again.",
      "unknown"
    );
  }
}
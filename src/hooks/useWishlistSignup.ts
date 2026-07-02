import { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  registerWishlistEmail,
  WishlistServiceError,
} from "@/services/wishlistService";

type Status = "idle" | "loading" | "success" | "error";

interface UseWishlistSignupResult {
  status: Status;
  errorMessage: string | null;
  submitEmail: (email: string) => Promise<boolean>; // returns true on success
  reset: () => void;
}

export function useWishlistSignup(): UseWishlistSignupResult {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submitEmail = useCallback(async (email: string): Promise<boolean> => {
    setStatus("loading");
    setErrorMessage(null);

    try {
      await registerWishlistEmail(email);
      setStatus("success");
      toast.success("Thanks for Joining! 🎉", {
        description: "You're on the app wishlist.",
      });
      return true;
    } catch (error) {
      const message =
        error instanceof WishlistServiceError
          ? error.message
          : "Something went wrong. Please try again.";
      setErrorMessage(message);
      setStatus("error");
      toast.error("Couldn't join the wishlist", {
        description: message,
      });
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setErrorMessage(null);
  }, []);

  return { status, errorMessage, submitEmail, reset };
}
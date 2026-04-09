import { useAuth } from "./useAuth";
import { useAuthModalStore } from "@/src/store/authModal.store";

export const useProtectedAction = () => {
  const { isAuthenticated } = useAuth();
  const { openLogin } = useAuthModalStore();

  const runIfAuthenticated = (callback: () => void) => {
    if (!isAuthenticated) {
      openLogin();
      return;
    }

    callback();
  };

  return runIfAuthenticated;
};
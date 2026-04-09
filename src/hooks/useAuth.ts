import { useAuthStore } from "@/src/store/auth.store";

export const useAuth = () => {
  const { user, token, loading, login, register, logout, hasHydrated } = useAuthStore();

  return {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    isReady: hasHydrated,
  };
};
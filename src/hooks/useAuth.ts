import { useAuthStore } from "@/src/store/auth.store";

export const useAuth = () => {
  const { user, loading, login, register, logout, hasHydrated,fetchCurrentUser } = useAuthStore();

  return {
    user,
    fetchCurrentUser,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isReady: hasHydrated,
  };
};
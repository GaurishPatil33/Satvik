import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "@/src/types/user-types";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "@/src/services/auth.service";
import { error } from "console";

interface AuthState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  hasHydrated: boolean;
  error: string | null

  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      hasHydrated: false,
      error: null,

      /* LOGIN */
      login: async (email, password) => {
        set({ loading: true });

        try {
          const res = await loginUser({ email, password });

          set({
            user: res.user,
            token: res.token,
          });
        } finally {
          set({ loading: false });
        }
      },

      /* REGISTER */
      register: async (data) => {
        set({ loading: true });

        try {
          //  create account
          await registerUser(data);

          // auto login
          const res = await loginUser({
            email: data.email,
            password: data.password,
          });

          set({
            user: res.user,
            token: res.token,
          });
        } finally {
          set({ loading: false });
        }
      },

      logout: () => {

        set({
          user: null,
          token: null,
          error: null
        });
        // useAuthStore.persist.clearStorage();
      },

      fetchCurrentUser: async () => {
        const token = useAuthStore.getState().token;

        if (!token) return; // no token → skip

        set({ loading: true });

        try {
          const user = await getCurrentUser();

          set({ user });
        } catch (err) {
          // token might be invalid → logout
          useAuthStore.getState().logout();
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ hasHydrated: true });
      },
    }
  )
);
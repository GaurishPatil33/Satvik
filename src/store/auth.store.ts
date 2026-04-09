import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "@/src/types/user-types";
import {
  loginUser,
  registerUser,
} from "@/src/services/auth.service";

interface AuthState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  hasHydrated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      hasHydrated: false,

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

        useAuthStore.persist.clearStorage;
        set({
          user: null,
          token: null,
        });
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
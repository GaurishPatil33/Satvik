"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "@/src/types/user-types";

import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
} from "@/src/services/auth.service";

interface AuthState {
  user: IUser | null;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<void>;

  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<IUser | null>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,

      /* LOGIN */
      login: async (email, password) => {
        set({ loading: true, error: null });

        try {
          const res = await loginUser({ email, password });

          set({ user: res.user });
        } catch (err: any) {
          const message =
            err?.response?.data?.message ||
            err?.message ||
            "Login failed";

          set({ error: message });
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      /* REGISTER */
      register: async (data) => {
        set({ loading: true, error: null });

        try {
          await registerUser(data);

          const res = await loginUser({
            email: data.email,
            password: data.password,
          });

          set({ user: res.user });
        } catch (err: any) {
          const message =
            err?.response?.data?.message ||
            err?.message ||
            "Register failed";

          set({ error: message });
        } finally {
          set({ loading: false });
        }
      },

      /* GET CURRENT USER */
      fetchCurrentUser: async (): Promise<IUser | null> => {
        const existingUser = get().user;

        // optional optimization: avoid extra API call
        if (existingUser) return existingUser;

        set({ loading: true });

        try {
          const user = await getCurrentUser();
          set({ user });
          return user;
        } catch {
          set({ user: null });
          return null;
        } finally {
          set({ loading: false });
        }
      },
      /* LOGOUT */
      logout: async () => {
        try {
          await logoutUser();
        } finally {
          set({ user: null, error: null });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
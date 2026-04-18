import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "@/src/types/user-types";
import {
  getCurrentUser,
  loginUser,
  logout,
  registerUser,
} from "@/src/services/auth.service";
import { error } from "console";

interface AuthState {
  user: IUser | null;
  // token: string | null; getting no token err
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
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      // token: null,
      loading: false,
      hasHydrated: false,
      error: null,

      /* LOGIN */
      login: async (email, password) => {
        set({ loading: true, error: null });

        try {
          const res = await loginUser({ email, password });

          set({
            user: res.user,
            // token: res.token,
          });
        } catch (err: any) {
          set({ error: err.message || "login failed!" })
        } finally {
          set({ loading: false });
        }
      },

      /* REGISTER */
      register: async (data) => {
        set({ loading: true, error: null });

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
            // token: res.token,
          });
        } catch (err: any) {
          set({ error: err.message || "Register failed" });
        } finally {
          set({ loading: false });
        }
      },



      fetchCurrentUser: async () => {
        // const token = useAuthStore.getState().token;

        // if (!token) return; // no token → skip

        set({ loading: true });

        try {
          const user = await getCurrentUser();

          set({ user });
        } catch {
          // catch (err) {
          // token might be invalid → logout
          // useAuthStore.getState().logout();

          set({ user: null })

        }
        finally {
          set({ loading: false });
        }
      },

      logout: async () => {

        // set({
        //   user: null,
        //   token: null,
        //   error: null
        // });
        // useAuthStore.persist.clearStorage();
        try {
          await logout()
        } finally {
          set({ user: null })
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
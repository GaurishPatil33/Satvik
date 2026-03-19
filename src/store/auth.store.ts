import { create } from "zustand";
import { IUser } from "@/src/types/user-types";

interface AuthState {
  user: IUser | null;
  token: string | null;
  setAuth: (user: IUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  setAuth: (user, token) => {
    localStorage.setItem("token", token);

    set({
      user,
      token,
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
    });
  },
}));
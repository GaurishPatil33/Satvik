import { create } from "zustand";
import { IUser } from "@/src/types/user-types";

import { useAuthStore } from "./auth.store";
import { getMyProfile, updateMyProfile, deleteMyAccount } from "../services/user.services";

interface UserState {
  profile: IUser | null;
  loading: boolean;

  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<IUser>) => Promise<void>;
  deleteAccount: () => Promise<void>;
  clearProfile: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  loading: false,

  /* FETCH PROFILE */
  fetchProfile: async () => {
    set({ loading: true });
    try {
      const profile = await getMyProfile();
      set({ profile });
    } finally {
      set({ loading: false });
    }
  },

  /* UPDATE PROFILE */
  updateProfile: async (data) => {
    set({ loading: true });
    try {
      const updated = await updateMyProfile(data);
      set({ profile: updated });

      // sync with auth store user
      useAuthStore.setState({ user: updated });
    } finally {
      set({ loading: false });
    }
  },

  /* DELETE ACCOUNT */
  deleteAccount: async () => {
    set({ loading: true });
    try {
      await deleteMyAccount();

      // logout after delete
      await useAuthStore.getState().logout();
      set({ profile: null });
    } finally {
      set({ loading: false });
    }
  },

  clearProfile: () => set({ profile: null }),
}));
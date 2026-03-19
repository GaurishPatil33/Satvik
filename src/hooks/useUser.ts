"use client";

import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "@/src/services/user.service";
import { IUser } from "@/src/types/user-types";

export const useUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const data = await getUserProfile();
      setUser(data);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updates: Partial<IUser>) => {
    const updated = await updateUserProfile(updates);
    setUser(updated);
    return updated;
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    loading,
    updateUser,
    refetch: fetchUser,
  };
};
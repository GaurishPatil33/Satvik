"use client";

import { useState } from "react";
import { loginUser, registerUser } from "@/src/services/auth.service";
import { IUser } from "@/src/types/user-types";

export const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const loggedUser = await loginUser({ email, password });
      setUser(loggedUser);
      return loggedUser;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    setLoading(true);

    try {
      const newUser = await registerUser(data);
      setUser(newUser);
      return newUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return {
    user,
    login,
    register,
    logout,
    loading,
  };
};
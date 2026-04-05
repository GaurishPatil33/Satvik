import { IUser } from "../types/user-types";
import { apiFetch } from "./api";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  const res = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  localStorage.setItem("token", res.token);

  return res.user as IUser;
};

export const registerUser = async (data: RegisterData) => {
  const res = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

  localStorage.setItem("token", res.token);

  return res.user as IUser;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = async () => {
  return apiFetch("/auth/me")
}
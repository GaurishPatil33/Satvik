import { IUser } from "../types/user-types";
import { apiFetch } from "./api";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}

/* LOGIN → returns user + token */
export const loginUser = async (data: LoginData): Promise<{
  user: IUser;
  token: string;
}> => {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/* REGISTER → returns ONLY USER */
export const registerUser = async (data: RegisterData): Promise<IUser> => {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getCurrentUser = async (): Promise<IUser> => {
  return apiFetch("/auth/me");
};
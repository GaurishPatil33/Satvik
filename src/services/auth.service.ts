import { IUser } from "../types/user-types";
import { api } from "./api";

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
  // return apiFetch("/auth/login", {
  //   method: "POST",
  //   body: JSON.stringify(data),
  // });
  const res = await api.post("/auth/login", data)
  return res.data
};

/* REGISTER → returns ONLY USER */
export const registerUser = async (data: RegisterData): Promise<IUser> => {
  // return apiFetch("/auth/register", {
  //   method: "POST",
  //   body: JSON.stringify(data),
  // });
  const res = await api.post("/auth/register", data)
  return res.data
};

export const logout = async (): Promise<void> => {
  // return apiFetch("/auth/me");
  await api.get("/auth/logout")
};


export const getCurrentUser = async (): Promise<IUser> => {
  // return apiFetch("/auth/me");
  const res = await api.get("/auth/me")
  return res.data
};
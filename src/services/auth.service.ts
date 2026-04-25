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

export const loginUser = async (data: LoginData): Promise<{
  user: IUser;
  token: string;
}> => {
  // return apiFetch("/auth/login", {
  //   method: "POST",
  //   body: JSON.stringify(data),
  // });
  const res = await api.post("/auth/login", data)
  // console.log(res)
  return res.data
};

export const registerUser = async (data: RegisterData): Promise<IUser> => {
 
  const res = await api.post("/auth/register", data)
  return res.data
};

export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout")
};


export const getCurrentUser = async (): Promise<IUser> => {
  const res = await api.get("/auth/me")
  return res.data
};
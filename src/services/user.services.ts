import { api } from "./api";
import { IUser } from "@/src/types/user-types";

/* get profle */
export const getMyProfile = async (): Promise<IUser> => {

  const res = await api.get("/users/profile");
  return res.data
};

/* update */
export const updateMyProfile = async (
  data: Partial<IUser>
): Promise<IUser> => {
  const res = await api.put("/users/profile");
  return res.data
};

/* delete account */
export const deleteMyAccount = async (): Promise<void> => {

  return api.delete("/users/profile");
};

/* ADMIN* get all users*/
export const getAllUsers = async (): Promise<IUser[]> => {
  const res = await api.put("/users");
  return res.data
};
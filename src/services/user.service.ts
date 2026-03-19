import { apiFetch } from "./api";
import { IUser } from "@/types/user-types";

export const getUserProfile = async (): Promise<IUser> => {
  return apiFetch("/users/profile");
};

export const updateUserProfile = async (
  updates: Partial<IUser>
): Promise<IUser> => {
  return apiFetch("/users/profile", {
    method: "PUT",
    body: JSON.stringify(updates),
  });
};

export const deleteAccount = async () => {
  return apiFetch("/users/profile", {
    method: "DELETE",
  });
};
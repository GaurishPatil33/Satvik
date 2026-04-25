import { IAddress } from "../types/user-types";
import { api } from "./api";
export type CreateAddressPayload = {
  full_name: string;
  phone: string;
  street: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
  is_default: boolean;
};


// Get user address
export const getUserAddresses = async (): Promise<IAddress[]> => {
  const res = await api.get("/addresses/user");
  return res.data;
};


//  Get addrss by id
export const getAddressById = async (id: string): Promise<IAddress> => {
  const res = await api.get(`/addresses/${id}`);
  return res.data;
};


//  CReate
export const createAddress = async (
  data: CreateAddressPayload
) => {
  const res = await api.post("/addresses", data);
  return res.data;
};


//  Update
export const updateAddress = async (
  id: string,
  data: Partial<IAddress>
): Promise<IAddress> => {
  const res = await api.put(`/addresses/${id}`, data);
  return res.data;
};


//  Delete
export const deleteAddress = async (id: string): Promise<void> => {
  await api.delete(`/addresses/${id}`);
};
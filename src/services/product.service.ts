import { IProduct } from "../types/products-types";
import { apiFetch } from "./api";

export const getProducts = async () => {
  return apiFetch("/products");
};

export const getProductById = async (id: string) => {
  return apiFetch(`/products/${id}`);
};

export const createProduct = async (data: Partial<IProduct>) => {
  return apiFetch("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateProduct = async (id: string, data: Partial<IProduct>) => {
  return apiFetch(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteProduct = async (id: string) => {
  return apiFetch(`/products/${id}`, {
    method: "DELETE",
  });
};
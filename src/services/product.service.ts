
import { IProduct } from "../types/products-types";
import { api } from "./api";

/* GET ALL */
export const getProducts = async (): Promise<IProduct[]> => {
  return api.get("/products");
};

/* GET BY ID */
export const getProductById = async (id: string): Promise<IProduct> => {
  return api.get(`/products/${id}`);
};

/* CREATE */
export const createProduct = async (data: Partial<IProduct>): Promise<IProduct> => {
  return api.post("/products", data);
};

/* UPDATE */
export const updateProduct = async (
  id: string,
  data: Partial<IProduct>
): Promise<IProduct> => {
  return api.put(`/products/${id}`, data);
};

/* DELETE */
export const deleteProduct = async (id: string): Promise<void> => {
  return api.delete(`/products/${id}`);
};
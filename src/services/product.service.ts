import { IProduct } from "../types/products-types";
import { api, apiFetch } from "./api";


//get all
export const getProducts = async (): Promise<IProduct[]> => {
  // const res = await api.get("/products");
  // return res.data;

  return apiFetch("/products", {
    method: "GET",
    // body: JSON.stringify(),
  });
};


// Get single product
export const getProductById = async (id: string): Promise<IProduct> => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};


// Create
export const createProduct = async (data: Partial<IProduct>): Promise<IProduct> => {
  // const res = await api.post("/products", data);
  // return res.data;
  return apiFetch("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
};


// update
export const updateProduct = async (
  id: string,
  data: Partial<IProduct>
): Promise<IProduct> => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};


// Delete
export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
  //   return apiFetch(`/products/${id}`, {
  //   method: "DELETE",
  //   // body: JSON.stringify(data),
  // });
};
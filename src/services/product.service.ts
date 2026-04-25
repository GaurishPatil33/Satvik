import { IProduct } from "../types/products-types";
import { api } from "./api";


//get all
export const getProducts = async (): Promise<IProduct[]> => {
  const res = await api.get("/products");
  return res.data;


};

// Get single product
export const getProductById = async (id: string): Promise<IProduct> => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

// Get multiple products by ids
export const getProductsByIds = async (ids: string[]): Promise<IProduct[]> => {
  const uniqueIds = Array.from(new Set(ids));

  const res = await api.get("/products", {
    params: { ids: uniqueIds.join(",") }
  });

  return res.data;
};


//Admin only
// Create
export const createProduct = async (data: Partial<IProduct>): Promise<IProduct> => {
  const res = await api.post("/products", data);
  return res.data;
}


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
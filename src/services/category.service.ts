import { ICategory } from "../types/category-types";
import { api } from "./api";


//  Get all CAtegories
export const getCategories = async (): Promise<ICategory[]> => {
  const res = await api.get("/categories");
  return res.data;
};


//  Get Cat By ID
export const getCategoryById = async (id: string): Promise<ICategory> => {
  const res = await api.get(`/categories/${id}`);
  return res.data;
};


//  Get Cat by slug
export const getCategoryBySlug = async (slug: string): Promise<ICategory> => {
  const res = await api.get(`/categories/slug/${slug}`);
  return res.data;
};



// Admin

//  CREATE CATEGORY 
export const createCategory = async (
  data: Omit<ICategory, "id" | "created_at" | "updated_at">
): Promise<ICategory> => {
  const res = await api.post("/categories", data);
  return res.data;
};

//update
export const updateCategory = async (
  id: string,
  data: Partial<ICategory>
): Promise<ICategory> => {
  const res = await api.put(`/categories/${id}`, data);
  return res.data;
};


//delete
export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/categories/${id}`);
};
import { IReview } from "../types/review-types";
import { api } from "./api";


// all revies
export const getAllReviews = async (): Promise<IReview[]> => {
    const res = await api.get("/reviews");
    return res.data;
};


// user review
export const getUserReviews = async (): Promise<IReview[]> => {
    const res = await api.get("/reviews/user");
    return res.data;
};


// product review
export const getProductReviews = async (productId: string): Promise<IReview[]> => {
    const res = await api.get(`/reviews/product/${productId}`);
    return res.data;
};


// review by id
export const getReviewById = async (id: string): Promise<IReview> => {
    const res = await api.get(`/reviews/${id}`);
    return res.data;
};


// create
export const createReview = async (
    data: Omit<IReview, "id" | "created_at" | "updated_at">
): Promise<IReview> => {
    const res = await api.post("/reviews", data);
    return res.data;
};


//update
export const updateReview = async (
    id: string,
    data: Partial<IReview>
): Promise<IReview> => {
    const res = await api.put(`/reviews/${id}`, data);
    return res.data;
};


// delet
export const deleteReview = async (id: string): Promise<void> => {
    await api.delete(`/reviews/${id}`);
};
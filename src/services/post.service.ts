import { IPost } from "../types/post-types";
import { api } from "./api";

//all posts
export const getPosts = async (): Promise<IPost[]> => {
    const res = await api.get("/posts");
    return res.data;
};

//single post
export const getPost = async (id: string): Promise<IPost> => {
    const res = await api.get(`/posts/${id}`);
    return res.data;
};

//create 
export const createPost = async (data: Partial<IPost>): Promise<IPost> => {
    const res = await api.post("/posts", data);
    return res.data;
};

//update
export const updatePost = async (id: string, data: Partial<IPost>): Promise<IPost> => {
    const res = await api.put(`/posts/${id}`, data);
    return res.data;
};

// delete
export const deletePost = async (id: string): Promise<void> => {
    await api.delete(`/posts/${id}`);
};
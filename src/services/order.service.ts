import { IOrder } from "../types/order-types";
import { api } from "./api";


//  Create (checkout)
export const createOrder = async (
    data: Omit<IOrder, "id" | "created_at" | "updated_at">
): Promise<IOrder> => {
    const res = await api.post("/orders", data);
    return res.data;
};


//  Get orders for user
export const getMyOrders = async (): Promise<IOrder[]> => {
    const res = await api.get("/orders/user");
    return res.data;
};


//  Get ordr by id
export const getOrderById = async (id: string): Promise<IOrder> => {
    const res = await api.get(`/orders/${id}`);
    return res.data;
};



// Admin
//  All orders
export const getAllOrders = async (): Promise<IOrder[]> => {
    const res = await api.get("/orders");
    return res.data;
};


// Update
export const updateOrder = async (
    id: string,
    data: Partial<IOrder>
): Promise<IOrder> => {
    const res = await api.put(`/orders/${id}`, data);
    return res.data;
};


//  Delete
export const deleteOrder = async (id: string): Promise<void> => {
    await api.delete(`/orders/${id}`);
};
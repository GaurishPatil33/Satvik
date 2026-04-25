import { IOrder } from "./order-types";

export interface IOrderItemUI {
  product_id: string;
  title: string;
  quantity: number;
  price_at_purchase: number;
  image: string; // hydrated from product
}

export interface IOrderUI extends Omit<IOrder, "items"> {
  items: IOrderItemUI[];
}
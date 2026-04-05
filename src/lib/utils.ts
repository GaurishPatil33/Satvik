
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { products } from "./data";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: string = "INR") {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
    }).format(amount);
}

export const getProductById = (id: string) => {
  return products.find(p => p.id.toString() === id);
};
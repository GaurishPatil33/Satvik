
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

export const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;


export function fmtCard(v: string) {
    return v.replace(/\D/g, "").substring(0, 16).replace(/(.{4})/g, "$1  ").trim();
}
export function fmtExpiry(v: string) {
    const d = v.replace(/\D/g, "");
    return d.length >= 2 ? d.substring(0, 2) + " / " + d.substring(2, 4) : d;
}
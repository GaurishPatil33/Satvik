export interface categories {
    id: string;
    slug: string;
    title: string

}
export interface Product {
    id: number | string;
    title: string;
    brand: string;
    price?: number | string;
    discountPercentage?: string | number;
    description: string;
    category: string;
    stock: number | string,
    rating: number | string,
    reviews: [],
    media: { url: string, public_id: string, type: "image" | "video" | "youtube"; }[];
    variants: { size: string | number, price: string | number, discount: string | number }[],
    badge: string,
    KeyBenefits: string[],
    coupons: { discount: string | number, coupon: string }[]

}
export interface Product1 {
    id: number | string;
    title: string;
    brand: string;
    price?: number | string;
    discountPercentage?: string | number;
    description: { title: string, text: string };
    category: string;
    stock: number,
    rating: number,
    reviews: Review[],
    media: { url: string, public_id: string, type: "image" | "video" | "youtube"; }[];
    variants: { size: string | number, price: string | number, discount: string | number }[],
    badge: string,
    coupons: { discount: number, coupon: string }[]
    KeyBenefits: { title: string, text: string }[],
    nutritions: { key: string, val: string }[]
    howToUse: { title: string, text: string }[]
    product_details: { key: string, val: string }[]
}
export interface Review {
    username: string;
    rating: number;
    reviewTitle: string;
    comment: string;
    image?: string
    date: string;
}

export interface categories {
    id: string;
    slug: string;
    title: string

}

export interface Product {
    id: number;
    title: string;
    brand: string;
    price?: number | string;
    discountPercentage?: string | number;
    description: string;
    category: string;
    stock: number | string,
    rating: number | string,
    reviews: [],
    media: { url: string, public_id: string, type: string }[];
    variants: { size: string | number, price: string | number, discount: string | number }[],
    badge: string,
    KeyBenefits: string[],
    coupons: { discount: string | number, coupon: string }[]

}
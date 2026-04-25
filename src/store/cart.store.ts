import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../lib/types";


export interface CartVariant {
    size?: string | number;
    price?: number | string;
    discount?: number | string;
}

export interface CartItem {
    productId: string | number;
    product: Product;
    quantity: number;
    variant?: {
        size: string | number;
        price: number | string;
        discount: number | string;
    };
}

interface CartState {
    items: CartItem[];

    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string | number, variant?: CartVariant) => void;
    increaseQty: (productId: string | number, variant?: CartVariant) => void;
    decreaseQty: (productId: string | number, variant?: CartVariant) => void;
    clearCart: () => void;

    getSubtotal: () => number;
    getDiscountTotal: () => number;
    getGrandTotal: () => number;
    hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void
}

const toNumber = (value: string | number | undefined): number => {
    if (value == null) return 0;
    return typeof value === "string" ? Number(value) : value;
};
const isSameVariant = (a?: CartVariant, b?: CartVariant) => {
    if (!a && !b) return true;
    if (!a || !b) return false;

    return (
        a.size === b.size &&
        a.price === b.price &&
        a.discount === b.discount
    );
};

const getDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return price - (price * discount) / 100;
};



export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            //   add
            addToCart: (newItem) =>
                set((state) => {
                    const existing = state.items.find(
                        (item) =>
                            item.productId === newItem.productId &&
                            isSameVariant(item.variant, newItem.variant)
                    );

                    if (existing) {
                        return {
                            items: state.items.map((item) =>
                                item.productId === newItem.productId &&
                                    isSameVariant(item.variant, newItem.variant)
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { ...newItem, quantity: 1 }],
                    };
                }),

            removeFromCart: (productId, variant) =>
                set((state) => ({
                    items: state.items.filter(
                        (item) =>
                            !(
                                item.productId === productId &&
                                isSameVariant(item.variant, variant)
                            )
                    ),
                })),

            //+qty
            increaseQty: (productId, variant) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.productId === productId &&
                            isSameVariant(item.variant, variant)
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                })),

            //-qty
            decreaseQty: (productId, variant) =>
                set((state) => ({
                    items: state.items
                        .map((item) =>
                            item.productId === productId &&
                                isSameVariant(item.variant, variant)
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                        .filter((item) => item.quantity > 0),
                })),

            // clear
            clearCart: () => set({ items: [] }),

            //calculate
            getSubtotal: () => {
                return get().items.reduce((total, item) => {
                    const price = toNumber(item.variant?.price ?? item.product?.price ?? 0);
                    return total + price * item.quantity;
                }, 0);
            },
            getDiscountTotal: () => {
                return get().items.reduce((total, item) => {
                    const basePrice = toNumber(item.variant?.price ?? item.product?.price);

                    const discount = toNumber(item.variant?.discount ?? item.product?.discountPercentage ?? 0)

                    const discounted = basePrice - (basePrice * discount) / 100;

                    return total + (basePrice - discounted) * item.quantity;
                }, 0);
            },
            getGrandTotal: () => {
                const subtotal = get().getSubtotal();
                const discount = get().getDiscountTotal();
                return subtotal - discount;
            },

            hasHydrated: false,
            setHasHydrated: (state) => set({ hasHydrated: state }),
        }),
        {
            name: "cart-storage",
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true)
            },
        }
    )
);
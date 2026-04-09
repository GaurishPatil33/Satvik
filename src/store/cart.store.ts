import { create } from "zustand";
import { persist } from "zustand/middleware";


export interface CartVariant {
    size?: string | number;
    price?: number;
    discount?: number;
}

export interface CartItem {
    productId: string | number;
    title: string;
    brand: string;
    thumbnail: string;
    price: number;
    discountPercentage?: number;
    quantity: number;
    variant?: CartVariant;
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
}


const isSameVariant = (a?: CartVariant, b?: CartVariant) => {
    return a?.size === b?.size;
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

                    return { items: [...state.items, { ...newItem, quantity: 1 }] };
                }),

            //remove
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
                return get().items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            },

            getDiscountTotal: () => {
                return get().items.reduce((total, item) => {
                    const discounted = getDiscountedPrice(
                        item.price,
                        item.discountPercentage
                    );
                    const discountPerItem = item.price - discounted;
                    return total + discountPerItem * item.quantity;
                }, 0);
            },

            getGrandTotal: () => {
                const subtotal = get().getSubtotal();
                const discount = get().getDiscountTotal();
                return subtotal - discount;
            },
        }),
        {
            name: "cart-storage",
        }
    )
);
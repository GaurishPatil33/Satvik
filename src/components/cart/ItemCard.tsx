import { CartItem } from "@/src/store/cart.store";
import { Trash2, Minus, Plus } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
type Props = {
    item: CartItem;
    onRemove: (productId: string | number, variant?: any) => void;
    onIncrease: (productId: string | number, variant?: any) => void;
    onDecrease: (productId: string | number, variant?: any) => void;
};

export function CartItemCard({
    item, onRemove, onIncrease, onDecrease
}: Props) {


    const router = useRouter()
    const [removing, setRemoving] = useState(false);

    const basePrice = Number(item.variant?.price ?? item?.product?.variants[0].price);

    const discount = Number(item.variant?.discount ?? item?.product?.variants[0].discount);

    const finalPrice = basePrice - (basePrice * discount) / 100;
    const totalPrice = finalPrice * item.quantity;

    const savingsPerItem = (basePrice * discount) / 100;
    const savings = savingsPerItem * item.quantity;

    // console.log(basePrice,discount,totalPrice)

    const handleRemove = () => {
        setRemoving(true);
        setTimeout(() => {
            onRemove(item.productId, item.variant);
        }, 250); // match animation duration
    };

    return (
        <div
            className={`flex gap-3 p-4 transition-all duration-300 animate-fade-in ${removing ? "opacity-0 scale-95 -translate-x-4" : "opacity-100"
                }`}
        >
            {/* Image */}
            <div onClick={() => router.push(`/product/${item.productId}`)} className="relative w-[68px] h-[68px] rounded-xl overflow-hidden bg-[#FAF0DC] shrink-0 border border-[#F0E6CC]">
                <Image
                    src={item.product?.media[0].url}
                    alt={item.product?.title}
                    fill
                    className="object-cover"
                    sizes="68px"
                />
                {/* {item.variant?.price && (
                    <div className="absolute top-0 right-0 bg-[#C4622D] text-white text-[8px] font-bold px-1 py-0.5 rounded-bl-lg">
                        SALE
                    </div>
                )} */}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-start justify-between gap-2">
                    <p className="text-[13px] font-semibold text-[#2C4A2E] leading-tight line-clamp-2 font-[family-name:var(--font-display,serif)]">
                        {item.product?.title}
                    </p>
                    <button
                        onClick={handleRemove}
                        className="shrink-0 text-[#C8B8A0] hover:text-red-500 transition-colors mt-0.5"
                        aria-label="Remove item"
                    >
                        <Trash2 size={13} />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#8B5E3C] bg-[#FAF0DC] px-2 py-0.5 rounded-full border border-[#E8D8BC]">
                        {item.variant?.size}
                    </span>
                    <span className="text-[10px] text-[#8B5E3C]/60">{item.product?.category}</span>
                </div>

                <div className="flex items-center justify-between">
                    {/* Price */}
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-[14px] font-bold text-[#2C4A2E] font-[family-name:var(--font-display,serif)]">
                            {totalPrice}
                        </span>
                        {discount && (
                            <span className="text-[11px] text-[#C8B8A0] line-through">
                                {basePrice * item.quantity}
                            </span>
                        )}
                    </div>

                    {/* quantity */}
                    <div className="flex items-center rounded-lg border border-[#E0D4C0] bg-white overflow-hidden">
                        <button
                            onClick={() => onDecrease(item.productId, item.variant)}
                            disabled={item.quantity <= 1}
                            className="w-7 h-7 flex items-center justify-center text-[#2C4A2E] hover:bg-[#FAF0DC] disabled:opacity-30 transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <Minus size={11} />
                        </button>
                        <span className="w-6 text-center text-[12px] font-semibold text-[#2C4A2E] select-none">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onIncrease(item.productId, item.variant)}
                            className="w-7 h-7 flex items-center justify-center text-[#2C4A2E] hover:bg-[#FAF0DC] transition-colors"
                            aria-label="Increase quantity"
                        >
                            <Plus size={11} />
                        </button>
                    </div>
                </div>

                {savings > 0 && (
                    <p className="text-[10px] text-green-700 font-medium">
                        You save {(savings)} on this item ↓
                    </p>
                )}
            </div>
        </div>
    );
}
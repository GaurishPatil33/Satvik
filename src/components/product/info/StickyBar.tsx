import { ShoppingCart } from "lucide-react";

type StickyAddToCartBarProps = {
    visible: boolean;
    productIcon?: string;
    title: string;
    variant?: string|number;
    rating?: number;
    reviewText?: string;
    price: number | string;
    added?: boolean;
    onAddToCart: () => void;
    StarRow: React.ComponentType<{ rating: number; size?: number }>;
};
export default function StickyAddToCartBar({
    visible,
    productIcon = "🫒",
    title,
    variant,
    rating = 4.9,
    reviewText = "1,240 reviews",
    price,
    added,
    onAddToCart,
    StarRow,
}: StickyAddToCartBarProps) {
    return (
        <div
            className={`fixed bottom-0 left-0 right-0 bg-white border-t border-cream-200 shadow-2xl shadow-black/10 z-50 flex items-center gap-4 px-5 py-3 transition-transform duration-500 ${visible ? "translate-y-0" : "translate-y-full"
                }`}
        >
            {/* Icon */}
            <span className="text-3xl flex-shrink-0">{productIcon}</span>

            {/* Product Info */}
            <div>
                <p className="font-playfair font-semibold text-sm text-gray-900">
                    {title} · {variant}
                </p>

                <div className="flex items-center gap-1.5 mt-0.5">
                    <StarRow rating={rating} size={11} />
                    <span className="text-[11px] text-gray-400">
                        {rating} · {reviewText}
                    </span>
                </div>
            </div>

            {/* Price */}
            <span className="font-playfair font-bold text-xl text-forest-600 ml-auto flex-shrink-0">
                ₹{price}
            </span>

            {/* Button */}
            <button
                onClick={onAddToCart}
                className={`flex items-center gap-2 font-dm font-bold text-sm px-5 py-2.5 rounded-xl flex-shrink-0 transition-all ${added
                        ? "bg-forest text-white"
                        : "bg-forest hover:bg-forest-600 text-white"
                    }`}
            >
                <ShoppingCart className="w-4 h-4" />
                {added ? "Added ✓" : "Add to Cart"}
            </button>
        </div>
    );
}
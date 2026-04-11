import Image from "next/image";
import { Edit2, Trash2, Star } from "lucide-react";
import { StockBadge } from "./StockBadge";
import { cn } from "@/src/lib/utils";
import { Product } from "@/src/lib/types";


interface Props {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete?: (product: Product) => void;
}

export default function ProductsTable({ products, onEdit, onDelete }: Props) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-100">
                        {["Product", "Category", "Price", "Rating", "Stock", "Badge", "Actions"].map((h) => (
                            <th
                                key={h}
                                className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider font-body"
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                            {/* Product */}
                            <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                        <Image
                                            src={product.media?.[0]?.url || "/placeholder.png"}
                                            alt={product.title}
                                            fill
                                            className="object-cover"
                                            sizes="48px"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-xs font-body">
                                            {product.title}
                                        </p>
                                        <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-2">
                                            {product.description}
                                        </p>
                                    </div>
                                </div>
                            </td>

                            {/* Category */}
                            <td className="px-5 py-4">
                                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg capitalize">
                                    {product.category}
                                </span>
                            </td>

                            {/* Price */}
                            <td className="px-5 py-4">
                                <p className="font-bold text-gray-900 text-sm">
                                    ₹{product.variants[0].price}
                                </p>
                            </td>

                            {/* Rating */}
                            <td className="px-5 py-4">
                                <div className="flex items-center gap-1">
                                    <Star size={11} className="fill-amber-400 text-amber-400" />
                                    <span className="text-xs font-semibold text-gray-800">
                                        {product.rating ?? 0}
                                    </span>
                                    <span className="text-[10px] text-gray-400">
                                        ({product.reviews ?? 0})
                                    </span>
                                </div>
                            </td>

                            {/* Stock */}
                            <td className="px-5 py-4">
                                <StockBadge qty={Number(product.stock) ?? 0} />
                            </td>

                            {/* Badge */}
                            <td className="px-5 py-4">
                                {product.badge ? (
                                    <span
                                        className={cn(
                                            "text-[11px] px-2.5 py-1 rounded-full font-semibold",
                                            product.badge === "trending"
                                                ? "bg-orange-100 text-orange-600"
                                                : product.badge === "best-seller"
                                                    ? "bg-amber-100 text-amber-700"
                                                    : "bg-emerald-100 text-emerald-700"
                                        )}
                                    >
                                        {product.badge === "trending"
                                            ? "🔥 Trending"
                                            : product.badge === "Best Seller"
                                                ? "⭐ Best Seller"
                                                : "✨ New"}
                                    </span>
                                ) : (
                                    <span className="text-[11px] text-gray-300">—</span>
                                )}
                            </td>

                            {/* Actions */}
                            <td className="px-5 py-4">
                                <div className="flex gap-1 opacity-70 group-hover:opacity-100 transition">
                                    <button
                                        onClick={() => onEdit(product)}
                                        className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                                    >
                                        <Edit2 size={12} />
                                    </button>

                                    <button
                                        onClick={() => onDelete?.(product)}
                                        className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {/* no products */}
                    {products.length === 0 && (
                        <tr>
                            <td colSpan={7} className="text-center py-10 text-gray-400">
                                No products found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
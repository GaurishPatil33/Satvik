import Image from "next/image";
import { Edit2, Trash2, Star } from "lucide-react";
import { StockBadge } from "./StockBadge";
import { cn } from "@/src/lib/utils";
import { IProduct } from "@/src/types/products-types";
import { useEffect, useState } from "react";
import { ICategory } from "@/src/types/category-types";


interface Props {
    products: IProduct[] | undefined;
    categories: ICategory[]
    onEdit: (product: IProduct) => void;
    onDelete?: (product: IProduct) => void;
    isloading?: boolean;
}

export default function ProductsTable({ products, onEdit, onDelete, isloading = false,categories }: Props) {
    const categoryMap = new Map(
        categories.map(cat => [cat.id, cat.name])
    );


    const getProductCategoryNames = (ids?: string[]) => {
        if (!ids || !ids.length) return [];

        return ids
            .map(id => categoryMap.get(id))
            .filter(Boolean);
    };


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalItems = products?.length ?? 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginatedProducts = products?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    useEffect(() => {
        setCurrentPage(1);
    }, [products]);

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-300">
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
                    {isloading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i} className="animate-pulse">
                                {Array.from({ length: 7 }).map((__, j) => (
                                    <td key={j} className="px-y py-4">
                                        <div className="h-3 bg-gray-200 rounded w-full" />
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        paginatedProducts?.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                {/* Product */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                            <Image
                                                src={product.images?.[0]}
                                                alt={product.title}
                                                fill
                                                className="object-cover"
                                                sizes="48px"
                                            />
                                        </div>
                                        <div className=" overflow-hidden">
                                            <p className="font-semibold text-gray-900 text-xs font-body truncate line-clamp-2 w-32">
                                                {product.title}
                                            </p>
                                            {/* <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-2">
                                            {product.description}
                                        </p> */}
                                        </div>
                                    </div>
                                </td>

                                {/* Category */}
                                <td className="px-4 py-3 flex flex-wrap">
                                    {getProductCategoryNames(product.category_ids).map(n => (
                                        <span key={n} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg capitalize">
                                            {n}
                                        </span>
                                    ))}
                                </td>

                                {/* Price */}
                                <td className="px-4 py-3">
                                    <p className="font-bold text-gray-900 text-sm">
                                        {/* ₹{product.variants[0].price} */}
                                        ₹{product.price}
                                    </p>
                                </td>

                                {/* Rating */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-1">
                                        <Star size={11} className="fill-amber-400 text-amber-400" />
                                        <span className="text-xs font-semibold text-gray-800">
                                            {product.average_rating ?? 0}
                                        </span>
                                        <span className="text-[10px] text-gray-400">
                                            ({product.review_ids ?? 0})
                                        </span>
                                    </div>
                                </td>

                                {/* Stock */}
                                <td className="px-4 py-3">
                                    <StockBadge qty={Number(product.stock_quantity) ?? 0} />
                                </td>

                                {/* Badge */}
                                <td className="px-4 py-3">
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
                                <td className="px-4 py-3">
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
                        ))
                    )}


                    {/* no products */}
                    {!isloading && products?.length === 0 && (
                        <tr>
                            <td colSpan={7} className="text-center py-10 text-gray-400">
                                No products found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* pagination */}
            <div className="flex items-center justify-between mt-4 px-2">
                <p className="text-xs text-gray-500">
                    Page {currentPage} of {totalPages || 1}
                </p>

                <div className="flex gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="px-3 py-1 text-xs rounded-md border disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="px-3 py-1 text-xs rounded-md border disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
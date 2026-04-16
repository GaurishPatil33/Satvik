"use client";

import { Edit2, Package, Trash2 } from "lucide-react";
import Image from "next/image";
import { ICategory } from "@/src/types/category-types";
import { useEffect, useState } from "react";

interface Props {
  categories?: ICategory[] | null;
  onEdit: (category: ICategory) => void;
  onDelete: (category: ICategory) => void;
}

export default function CategoriesTable({
  categories,
  onEdit,
  onDelete,
}: Props) {



  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = categories?.length ?? 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginated = categories?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    setCurrentPage(1);
  }, [categories]);

  if (!categories?.length) {
    return (
      <div className="text-center py-10 text-sm text-gray-500">
        No categories found
      </div>
    );
  }

  const getParentName = (parentId: string | null) => {
    if (!parentId) return "-";
    const parent = categories.find((c) => c.id === parentId);
    return parent?.name || "-";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Slug</th>
            <th className="py-3 px-4">Parent</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Created</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginated?.map((cat) => (
            <tr key={cat.id} className="border-b hover:bg-gray-50">
              {/* Category (image + name) */}
              <td className="py-3 px-4 flex items-center gap-3">
                {cat.media?.[0]?.url ? (
                  <Image
                    src={cat.media[0].url ?? "/placeholder.png"}
                    alt={cat.name}
                    width={40}
                    height={40}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <Package className="size-9 bg-gray-100 rounded-lg text-forest-700" />
                )}
                <span className="font-medium">{cat.name}</span>
              </td>

              <td className="py-3 px-4 text-gray-500">{cat.slug}</td>

              <td className="py-3 px-4">
                {getParentName(cat.parent_id)}
              </td>

              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${cat.is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                    }`}
                >
                  {cat.is_active ? "Active" : "Inactive"}
                </span>
              </td>

              <td className="py-3 px-4 text-gray-500">
                {new Date(cat.created_at).toLocaleDateString()}
              </td>

              <td className="px-5 py-4">
                <div className="flex gap-1 opacity-70 group-hover:opacity-100 transition">
                  <button
                    onClick={() => onEdit(cat)}
                    className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                  >
                    <Edit2 size={12} />
                  </button>

                  <button
                    onClick={() => onDelete?.(cat)}
                    className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


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




// export default function ProductsTable({ products, onEdit, onDelete }: Props) {

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const totalItems = products?.length ?? 0;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const paginatedProducts = products?.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );


//   useEffect(() => {
//     setCurrentPage(1);
//   }, [products]);

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-sm">
//         <thead>
//           <tr className="border-b border-gray-100">
//             {["Product", "Category", "Price", "Rating", "Stock", "Badge", "Actions"].map((h) => (
//               <th
//                 key={h}
//                 className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider font-body"
//               >
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody className="divide-y divide-gray-50">
//           {paginatedProducts?.map((product) => (
//             <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
//               {/* Product */}
//               <td className="px-5 py-4">
//                 <div className="flex items-center gap-3">
//                   <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
//                     <Image
//                       src={product.images?.[0] || "/placeholder.png"}
//                       alt={product.title}
//                       fill
//                       className="object-cover"
//                       sizes="48px"
//                     />
//                   </div>
//                   <div className=" overflow-hidden">
//                     <p className="font-semibold text-gray-900 text-xs font-body truncate line-clamp-2 ">
//                       {product.title}
//                     </p>
//                     {/* <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-2">
//                                             {product.description}
//                                         </p> */}
//                   </div>
//                 </div>
//               </td>

//               {/* Category */}
//               <td className="px-5 py-4">
//                 <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg capitalize">
//                   {product.category_ids}
//                 </span>
//               </td>

//               {/* Price */}
//               <td className="px-5 py-4">
//                 <p className="font-bold text-gray-900 text-sm">
//                   {/* ₹{product.variants[0].price} */}
//                   ₹{product.price}
//                 </p>
//               </td>

//               {/* Rating */}
//               <td className="px-5 py-4">
//                 <div className="flex items-center gap-1">
//                   <Star size={11} className="fill-amber-400 text-amber-400" />
//                   <span className="text-xs font-semibold text-gray-800">
//                     {product.average_rating ?? 0}
//                   </span>
//                   <span className="text-[10px] text-gray-400">
//                     ({product.review_ids ?? 0})
//                   </span>
//                 </div>
//               </td>

//               {/* Stock */}
//               <td className="px-5 py-4">
//                 <StockBadge qty={Number(product.stock_quantity) ?? 0} />
//               </td>

//               {/* Badge */}
//               <td className="px-5 py-4">
//                 {product.badge ? (
//                   <span
//                     className={cn(
//                       "text-[11px] px-2.5 py-1 rounded-full font-semibold",
//                       product.badge === "trending"
//                         ? "bg-orange-100 text-orange-600"
//                         : product.badge === "best-seller"
//                           ? "bg-amber-100 text-amber-700"
//                           : "bg-emerald-100 text-emerald-700"
//                     )}
//                   >
//                     {product.badge === "trending"
//                       ? "🔥 Trending"
//                       : product.badge === "Best Seller"
//                         ? "⭐ Best Seller"
//                         : "✨ New"}
//                   </span>
//                 ) : (
//                   <span className="text-[11px] text-gray-300">—</span>
//                 )}
//               </td>

//               {/* Actions */}

//             </tr>
//           ))}

//           {/* no products */}
//           {products?.length === 0 && (
//             <tr>
//               <td colSpan={7} className="text-center py-10 text-gray-400">
//                 No products found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <div className="flex items-center justify-between mt-4 px-2">
//         <p className="text-xs text-gray-500">
//           Page {currentPage} of {totalPages || 1}
//         </p>

//         <div className="flex gap-2">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((p) => p - 1)}
//             className="px-3 py-1 text-xs rounded-md border disabled:opacity-50"
//           >
//             Prev
//           </button>

//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((p) => p + 1)}
//             className="px-3 py-1 text-xs rounded-md border disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
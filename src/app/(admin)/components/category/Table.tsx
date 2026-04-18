"use client";

import { Edit2, Package, Trash2 } from "lucide-react";
import Image from "next/image";
import { ICategory } from "@/src/types/category-types";
import { useEffect, useState } from "react";

interface Props {
  categories?: ICategory[] | null;
  onEdit: (category: ICategory) => void;
  onDelete: (category: ICategory) => void;
  isLoading?: boolean
}

export default function CategoriesTable({
  categories,
  onEdit,
  onDelete,
  isLoading = false
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



  const getParentName = (parentId: string | null) => {
    if (!parentId) return "-";
    const parent = categories?.find((c) => c.id === parentId);
    return parent?.name || "-";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>

          <tr className="border-b border-gray-300">
            {["Category", "slug", "Parent", "Status", "Updated", "Actions"].map((h) => (
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
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                {Array.from({ length: 7 }).map((__, j) => (
                  <td key={j} className="px-5 py-4">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </td>
                ))}
              </tr>
            ))
          ) : (
            paginated?.map((cat) => (
              <tr key={cat.id} className=" hover:bg-gray-50">
                {/* Category (image + name) */}
                <td className="py-3 px-4 flex items-center gap-3">
                  {cat.media?.[0]?.url ? (
                    <Image
                      src={cat.media[0].url}
                      alt={cat.name}
                      width={50}
                      height={40}
                      className="rounded-lg object-contain"
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

                <td className="px-5 py-4 flex">
                  <div className="flex gap-1 opacity-70 group-hover:opacity-100 transition ">
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
            ))
          )}

          {/* no products */}
          {!isLoading && categories?.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-10 text-gray-400">
                No categories found
              </td>
            </tr>
          )}
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





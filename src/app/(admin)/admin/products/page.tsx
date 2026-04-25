"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Search, Edit2, Trash2, Star, AlertTriangle, X, Pen } from "lucide-react";
import { Product } from "@/src/lib/types";
import { cn, formatPrice } from "@/src/lib/utils";
import { SectionCard } from "../../components/Ui";
import Image from "next/image";
import ProductsTable from "../../components/product/Table";
import { IProduct } from "@/src/types/products-types";
import { deleteProduct, getProducts } from "@/src/services/product.service";
import { ProductForm } from "../../components/product/ProductModal";
import { getCategories } from "@/src/services/category.service";
import { ICategory } from "@/src/types/category-types";



export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string|"all">("all");
  const [allProducts, setProducts] = useState<IProduct[]>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const fetchingRef = useRef(false);

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | null>(null);
  const [loading, setLoading] = useState(true);

  // const categoriesFiltersLabel = ["all", "oil", "jaggery", "sugar", "salt"];
const categoriesFilters = [
  { id: "all", name: "All" },
  ...categories.map((c) => ({
    id: c.id,
    name: c.name
  }))
];

const filtered = allProducts?.filter((p) => {
  const matchSearch = p.title
    .toLowerCase()
    .includes(search.toLowerCase());

  if (categoryFilter === "all") return matchSearch;

  const matchCat = p.category_ids
    .map(String)
    .includes(String(categoryFilter));

  return matchSearch && matchCat;
});


  const lowStockProduct = allProducts?.find(p => Number(p.stock_quantity) <= 15);


  const fetchAll = async () => {
    if (fetchingRef.current) return;

    fetchingRef.current = true;
    setLoading(true);

    try {
      const [p, c] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);

      setProducts(p);
      setCategories(c);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSuccess = async () => {
    await fetchAll();
    setMode(null);
    setSelectedProduct(null);
  };

  const handleDelete = async (id: string) => {
    setProducts((prev) => prev?.filter((p) => p.id !== id));

    try {
      await deleteProduct(id);
    } catch {
      await fetchAll(); // rollback
    }
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setMode("create");
  };
  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setMode("edit");
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setMode(null);
  };

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 font-body mt-0.5">{allProducts?.length} products listed</p>
        </div>
        <button
          // onClick={() => setModalProduct(null)}
          onClick={handleCreate}
          className="flex items-center gap-2 bg-[#2C4A2E] text-white px-4 py-2.5 rounded-xl text-sm font-body font-medium hover:bg-[#3D6B40] transition-colors"
        >
          <Plus size={14} /> Add Product
        </button>
      </div>

      {/* Low stock alert */}
      {lowStockProduct && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <AlertTriangle size={16} className="text-red-500 shrink-0" />
          <p className="text-sm text-red-700 font-body">
            <strong>Low stock alert:</strong> {lowStockProduct.title} has only {lowStockProduct.stock_quantity} units remaining.
          </p>
          {/* <button className="ml-auto text-xs text-red-600 underline font-body">Restock</button> */}
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-3 flex-wrap items-center pb-3 p-2">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-white outline-none focus:border-gray-300 w-52 font-body"
          />
        </div>
        <div className="flex gap-2">
          {categoriesFilters.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoryFilter(c.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-body font-medium transition-all capitalize",
                categoryFilter === c.id
                  ? "bg-[#1A2E1B] text-white"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
              )}
            >
              {/* {c === "all" ? "All" : c.name} */}
              { c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products table */}
      <SectionCard >
        <ProductsTable
          isloading={loading}
          categories={categories}
          products={filtered}
          onEdit={(product) => handleEdit(product)}
          onDelete={(product) => handleDelete(product.id)}
        />
      </SectionCard>


      {mode && (
        // <ProductModal product={modalProduct} onClose={() => setModalProduct(undefined)} />
        <ProductForm onClose={handleClose} onSuccess={handleSuccess} initialData={selectedProduct ?? undefined} id={mode === "edit" ? selectedProduct?.id : undefined} />

      )}
    </div>
  );
}
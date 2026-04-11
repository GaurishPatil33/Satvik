"use client";

import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Star, AlertTriangle, X, Pen } from "lucide-react";
import { products } from "@/src/lib/data";
import { Product } from "@/src/lib/types";
import { cn, formatPrice } from "@/src/lib/utils";
import { SectionCard } from "../../components/Ui";
import Image from "next/image";
import ProductsTable from "../../components/product/Table";
import ProductModal, { ProductForm } from "../../components/product/ProductModal";
import { IProduct } from "@/src/types/products-types";

export const mockProducts: IProduct[] = [
  {
    id: "prod_001",
    title: "Wireless Bluetooth Headphones",
    brand: "SoundMax",
    price: 2999,
    discount_percentage: 10,
    category_ids: ["electronics", "audio"],
    description: "High-quality wireless headphones with noise cancellation.",
    stock_quantity: 50,
    average_rating: 4.5,
    images: [
      "https://example.com/images/headphones1.jpg",
      "https://example.com/images/headphones2.jpg"
    ],
    review_ids: ["rev_001", "rev_002"],
    created_at: "2026-04-01T10:00:00Z",
    updated_at: "2026-04-05T12:00:00Z"
  },
  {
    id: "prod_002",
    title: "Men's Casual T-Shirt",
    brand: "UrbanWear",
    price: 799,
    discount_percentage: 20,
    category_ids: ["fashion", "men"],
    description: "Comfortable cotton t-shirt for everyday wear.",
    stock_quantity: 120,
    average_rating: 4.2,
    images: [
      "https://example.com/images/tshirt1.jpg"
    ],
    review_ids: ["rev_003"],
    created_at: "2026-03-28T09:30:00Z",
    updated_at: "2026-04-02T11:15:00Z"
  },
  {
    id: "prod_003",
    title: "Smartphone 128GB",
    brand: "TechNova",
    price: 15999,
    category_ids: ["electronics", "mobile"],
    description: "Powerful smartphone with 128GB storage and great camera.",
    stock_quantity: 30,
    average_rating: 4.7,
    images: [
      "https://example.com/images/phone1.jpg",
      "https://example.com/images/phone2.jpg"
    ],
    created_at: "2026-04-03T14:20:00Z",
    updated_at: "2026-04-07T08:45:00Z"
  },
  {
    id: "prod_004",
    title: "Running Shoes",
    brand: "FitStep",
    price: 2499,
    discount_percentage: 15,
    category_ids: ["sports", "footwear"],
    description: "Lightweight running shoes with excellent grip.",
    stock_quantity: 75,
    average_rating: 4.3,
    images: [
      "https://example.com/images/shoes1.jpg"
    ],
    review_ids: [],
    created_at: "2026-03-25T16:10:00Z",
    updated_at: "2026-04-01T10:05:00Z"
  },
  {
    id: "prod_005",
    title: "Office Laptop 16GB RAM",
    brand: "CompEdge",
    price: 54999,
    category_ids: ["electronics", "computers"],
    description: "High-performance laptop suitable for office and development work.",
    stock_quantity: 20,
    average_rating: 4.6,
    images: [
      "https://example.com/images/laptop1.jpg",
      "https://example.com/images/laptop2.jpg"
    ],
    review_ids: ["rev_004", "rev_005"],
    created_at: "2026-04-06T13:00:00Z",
    updated_at: "2026-04-09T15:30:00Z"
  }
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [modalProduct, setModalProduct] = useState<Product | null | undefined>(undefined);
  const [product, setProduct] = useState<IProduct|null|undefined>(undefined);

  const categories = ["all", "oil", "jaggery", "sugar", "salt"];
  const filtered = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });
  const lowStockProduct = products.find(p => Number(p.stock) <= 15);

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 font-body mt-0.5">{products.length} products listed</p>
        </div>
        <button
          onClick={() => setModalProduct(null)}
          // onClick={() => setProduct(null)}
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
            <strong>Low stock alert:</strong> {lowStockProduct.title} has only {lowStockProduct.stock} units remaining.
          </p>
          <button className="ml-auto text-xs text-red-600 underline font-body">Restock</button>
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
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-body font-medium transition-all capitalize",
                categoryFilter === c
                  ? "bg-[#1A2E1B] text-white"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
              )}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
      </div>


      {
        mockProducts.map(p => (
          <div className=" flex gap-1 justify-between items-center" key={p.id}>
            <div className="">{p.id}</div>
            <div className="">{p.title}</div>
            {/* <Image src={p.images[0]} height={100} width={100} alt={p.title} /> */}
            {/* <img src={p.images[0]} alt={p.id} className="size-10" /> */}

            <button onClick={() => setProduct(p)} className=" p-1 bg-blue-500 text-white flex items-center justify-center gap-2"><Pen className="size-4" /> Edit</button>
          </div>
        ))
      }

      {/* Products table */}
      <SectionCard >
        <ProductsTable
          products={filtered}
          onEdit={(product) => setModalProduct(product)}
          onDelete={(product) => console.log("Delete", product)}
        />
      </SectionCard>

      {/* Modal */}
      {modalProduct !== undefined && (
        <ProductModal product={modalProduct} onClose={() => setModalProduct(undefined)} />
        // <ProductForm onClose={() => setModalProduct(undefined)} initialData={product} id={product?.id} />

      )}
      {product && (
        // <ProductModal product={modalProduct} onClose={() => setModalProduct(undefined)} />
        <ProductForm onClose={() => setProduct(undefined)} initialData={product} id={product?.id} />

      )}
    </div>
  );
}
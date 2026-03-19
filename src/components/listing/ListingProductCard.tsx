"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { ViewType } from "@/src/lib/listing";
import { Product } from "@/src/lib/types";

const BADGE_MAP = {
  bestseller: { label: "⭐ Best Seller", className: "bg-amber-100 text-amber-800" },
  trending:   { label: "🔥 Trending",    className: "bg-red-100 text-red-700" },
  new:        { label: "✨ New",          className: "bg-green-100 text-green-700" },
  deal:       { label: "💸 Deal",        className: "bg-violet-100 text-violet-700" },
};

const CATEGORY_BG: Record<string, string> = {
  Oil: "#FFFDF5", Jaggery: "#FFF8EE", Sugar: "#F9FAFB",
  Salt: "#F5F5F5", Ghee: "#FFF7ED", Deals: "#F0FDF4",
};

interface Props {
  product: Product;
  view: ViewType;
}

export default function ListingProductCard({ product: p, view }: Props) {
  const [selectedSize, setSelectedSize] = useState(p.sizes[Math.min(1, p.sizes.length - 1)]);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const badge = p.badge ? BADGE_MAP[p.badge] : null;
  const isList = view === "list";

  return (
    <div
      className={`group bg-white border border-cream-200 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/8 ${
        isList ? "flex flex-row" : "flex flex-col"
      }`}
    >
      {/* Image */}
      <div
        className={`relative flex items-center justify-center flex-shrink-0 overflow-hidden ${
          isList ? "w-44 min-h-[170px]" : "h-44"
        }`}
        style={{ background: CATEGORY_BG[p.category] || "#FEFDF8" }}
      >
        {badge && (
          <span className={`absolute top-2.5 left-2.5 z-10 text-[10px] font-dm font-bold px-2 py-1 rounded-full ${badge.className}`}>
            {badge.label}
          </span>
        )}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white border border-cream-200 flex items-center justify-center shadow-sm transition-all duration-200 ${
            wishlisted
              ? "border-rose-300 bg-rose-50 opacity-100"
              : "opacity-0 group-hover:opacity-100 hover:border-rose-300"
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-rose-500 text-rose-500" : "text-gray-400"}`} />
        </button>
        <span
          className="text-6xl drop-shadow-sm group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500"
          style={{ lineHeight: 1 }}
        >
          {p.emoji}
        </span>
      </div>

      {/* Body */}
      <div className={`flex flex-col flex-1 p-4 ${isList ? "sm:flex-row sm:items-center sm:gap-6" : ""}`}>
        {/* Left info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-playfair font-semibold text-[14px] text-gray-900 leading-snug mb-0.5 line-clamp-2">
            {p.name}
          </h3>
          <p className="text-[11px] font-dm text-earth-400 mb-2">{p.sub}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {p.tags.slice(0, isList ? 4 : 3).map(t => (
              <span key={t} className="text-[10px] font-dm font-semibold bg-forest-50 text-forest-600 px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(s => (
                <Star
                  key={s}
                  className={`w-3 h-3 ${s <= Math.round(p.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                />
              ))}
            </div>
            <span className="text-[11px] font-dm text-gray-500">
              {p.rating} · {p.reviews.toLocaleString()} reviews
            </span>
          </div>

          {/* Size pills */}
          <div className="flex gap-1.5 flex-wrap mb-0 sm:mb-0">
            {p.sizes.slice(0, 4).map(s => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`text-[10px] font-dm font-semibold px-2.5 py-1 rounded-full border transition-all duration-150 ${
                  selectedSize === s
                    ? "bg-forest/50 border-forest text-white"
                    : "border-gray-500 text-gray-500 hover:border-forest"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Right / Price + Add */}
        <div className={`${isList ? "flex-shrink-0 flex flex-col items-end gap-3 pt-3 sm:pt-0" : "mt-3"}`}>
          <div className={isList ? "text-right" : ""}>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-playfair font-bold text-xl text-forest-600">₹{p.price}</span>
              <span className="text-sm text-gray-300 line-through font-dm">₹{p.mrp}</span>
              <span className="text-[10px] font-bold bg-amber-400 text-forest-800 px-1.5 py-0.5 rounded-full">
                -{p.discount}%
              </span>
            </div>
            {p.discount >= 15 && (
              <p className="text-[10px] font-dm text-amber-600 font-semibold mt-0.5">
                🏷️ Extra 10% with SATVIK10
              </p>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 font-dm font-bold text-sm px-4 py-2.5 rounded-xl transition-all duration-300 ${
              isList ? "" : "w-full justify-center"
            } ${
              added
                ? "bg-forest-700 text-white"
                : "bg-forest-500 hover:bg-forest-600 text-white hover:shadow-lg hover:shadow-forest-500/25"
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

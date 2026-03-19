"use client";

import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";

const oils = [
  { id: 1, name: "Groundnut", emoji: "🥜", benefit: "Rich in Vit E, Heart Health", price: 350, active: true, color: "#fef9c3", tag: "Most Popular" },
  { id: 2, name: "Mustard", emoji: "🌿", benefit: "Digestion & Anti-bacterial", price: 299, active: false, color: "#fefce8", tag: "" },
  { id: 3, name: "Sunflower", emoji: "🌻", benefit: "Light & Cholesterol-friendly", price: 280, active: false, color: "#fffbeb", tag: "" },
  { id: 4, name: "Olive", emoji: "🫒", benefit: "Antioxidant-rich, Mediterranean", price: 680, active: false, color: "#f0fdf4", tag: "Premium" },
  { id: 5, name: "Coconut", emoji: "🥥", benefit: "MCTs, Skin & Immunity Booster", price: 420, active: false, color: "#f0fdf4", tag: "Best Seller" },
];

export default function ColdPressedOils() {
  const [selectedOil, setSelectedOil] = useState(oils[0]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-8">
        <p className="font-body text-xs text-forest/60 uppercase tracking-widest font-medium mb-1">
          Our Speciality
        </p>
        <h2 className="font-display text-3xl font-semibold text-forest">
          Explore Cold-Pressed Oils
        </h2>
      </div>

      {/* Oil selector pills */}
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-2 mb-8 justify-center flex-wrap">
        {oils.map((oil) => (
          <button
            key={oil.id}
            onClick={() => setSelectedOil(oil)}
            className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl transition-all duration-200 flex-shrink-0 min-w-[80px] ${
              selectedOil.id === oil.id
                ? "bg-forest text-cream shadow-md scale-105"
                : "bg-white border border-gray-100 text-gray-700 hover:border-forest/30"
            }`}
          >
            <span className="text-3xl">{oil.emoji}</span>
            <span className="text-[11px] font-body font-medium leading-none">{oil.name}</span>
          </button>
        ))}
      </div>

      {/* Selected oil detail card */}
      <div
        className="rounded-3xl overflow-hidden flex flex-col md:flex-row gap-0 shadow-sm"
        style={{ background: `linear-gradient(135deg, ${selectedOil.color}, white)` }}
      >
        {/* Visual */}
        <div className="md:w-1/2 flex items-center justify-center py-12 px-8">
          <div className="relative">
            <div className="w-48 h-48 bg-white/60 rounded-full flex items-center justify-center shadow-inner">
              <span className="text-8xl">{selectedOil.emoji}</span>
            </div>
            {selectedOil.tag && (
              <span className="absolute top-0 right-0 bg-forest text-cream text-[10px] font-body font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                {selectedOil.tag}
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h3 className="font-display text-3xl font-semibold text-forest mb-2">
            {selectedOil.name} Oil
          </h3>
          <p className="font-body text-gray-600 text-sm mb-4">{selectedOil.benefit}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {["Cold Pressed", "No Chemicals", "Stone Ground", "FSSAI Certified"].map((tag) => (
              <span key={tag} className="text-xs font-body bg-forest/10 text-forest px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="font-display text-3xl font-semibold text-forest">₹{selectedOil.price}</span>
            <span className="font-body text-sm text-gray-400">/ 1000ml</span>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-forest text-cream px-6 py-3 rounded-full font-body font-semibold text-sm hover:bg-forest-light transition-all active:scale-95">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
            <button className="px-6 py-3 rounded-full border-2 border-forest text-forest font-body font-medium text-sm hover:bg-forest hover:text-cream transition-all">
              View Details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

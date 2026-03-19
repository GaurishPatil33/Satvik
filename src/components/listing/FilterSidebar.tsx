"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { FilterState, MAX_PRICE, CategoryType, ConcernType, CATEGORY_OPTIONS, CONCERN_OPTIONS } from "@/src/lib/listing";

interface Props {
  filters: FilterState;
  onChange: (next: Partial<FilterState>) => void;
  onClear: () => void;
}

function Section({
  title, defaultOpen = true, children,
}: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-cream-200 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-dm font-bold text-gray-700 hover:text-forest-600 transition-colors"
      >
        {title}
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="px-5 pb-4">{children}</div>}
    </div>
  );
}

export default function FilterSidebar({ filters, onChange, onClear }: Props) {
  const hasAnyFilter =
    filters.categories.length > 0 ||
    filters.priceMin > 0 ||
    filters.priceMax < MAX_PRICE ||
    filters.minRating > 0 ||
    filters.concerns.length > 0;

  const toggleCategory = (cat: CategoryType) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter(c => c !== cat)
      : [...filters.categories, cat];
    onChange({ categories: next });
  };

  const toggleConcern = (concern: ConcernType) => {
    const next = filters.concerns.includes(concern)
      ? filters.concerns.filter(c => c !== concern)
      : [...filters.concerns, concern];
    onChange({ concerns: next });
  };

  const pctMin = (filters.priceMin / MAX_PRICE) * 100;
  const pctMax = (filters.priceMax / MAX_PRICE) * 100;

  return (
    <aside className="bg-white border border-cream-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200">
        <span className="font-playfair text-base font-bold text-gray-900">Filters</span>
        {hasAnyFilter && (
          <button
            onClick={onClear}
            className="text-xs font-dm font-bold text-forest-500 hover:text-forest-700 transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <Section title="Category">
        <div className="space-y-1.5">
          {CATEGORY_OPTIONS.map(opt => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.categories.includes(opt.value)}
                onChange={() => toggleCategory(opt.value)}
                className="w-4 h-4 rounded accent-forest-500 cursor-pointer"
              />
              <span className="text-sm font-dm text-gray-600 group-hover:text-forest-600 flex-1 transition-colors">
                {opt.label}
              </span>
              <span className="text-xs text-gray-400 font-dm">{opt.count}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Price Range */}
      <Section title="Price Range">
        <div>
          <div className="flex justify-between text-xs font-dm font-bold text-forest-500 mb-3">
            <span>₹{filters.priceMin}</span>
            <span>₹{filters.priceMax.toLocaleString()}</span>
          </div>

          {/* Dual range slider */}
          <div className="relative h-5 flex items-center mb-4">
            {/* Track */}
            <div className="absolute left-0 right-0 h-1 bg-cream-200 rounded-full" />
            {/* Fill */}
            <div
              className="absolute h-1 bg-forest-500 rounded-full"
              style={{ left: `${pctMin}%`, right: `${100 - pctMax}%` }}
            />
            <input
              type="range" min={0} max={MAX_PRICE} step={50}
              value={filters.priceMin}
              onChange={e => {
                const v = Math.min(Number(e.target.value), filters.priceMax - 50);
                onChange({ priceMin: v });
              }}
              className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-forest-500 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <input
              type="range" min={0} max={MAX_PRICE} step={50}
              value={filters.priceMax}
              onChange={e => {
                const v = Math.max(Number(e.target.value), filters.priceMin + 50);
                onChange({ priceMax: v });
              }}
              className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-forest-500 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>

          {/* Input boxes */}
          <div className="flex gap-2">
            <input
              type="number" placeholder="₹ Min" min={0} max={MAX_PRICE}
              value={filters.priceMin}
              onChange={e => onChange({ priceMin: Math.max(0, Math.min(Number(e.target.value), filters.priceMax - 50)) })}
              className="flex-1 min-w-0 border border-cream-300 rounded-lg px-2.5 py-1.5 text-xs font-dm outline-none focus:border-forest-400 transition-colors"
            />
            <input
              type="number" placeholder="₹ Max" min={0} max={MAX_PRICE}
              value={filters.priceMax}
              onChange={e => onChange({ priceMax: Math.max(filters.priceMin + 50, Math.min(Number(e.target.value), MAX_PRICE)) })}
              className="flex-1 min-w-0 border border-cream-300 rounded-lg px-2.5 py-1.5 text-xs font-dm outline-none focus:border-forest-400 transition-colors"
            />
          </div>
        </div>
      </Section>

      {/* Rating */}
      <Section title="Rating">
        <div className="space-y-1">
          {[4.5, 4, 3.5, 3].map(r => (
            <button
              key={r}
              onClick={() => onChange({ minRating: filters.minRating === r ? 0 : r })}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-dm transition-all ${
                filters.minRating === r
                  ? "bg-forest-50 text-forest-600 font-semibold"
                  : "text-gray-500 hover:bg-cream-100"
              }`}
            >
              <span className="text-amber-400 text-xs">{"★".repeat(Math.floor(r))}{r % 1 ? "½" : ""}</span>
              <span className="flex-1 text-left">{r}★ & above</span>
              {filters.minRating === r && <span className="w-2 h-2 bg-forest-500 rounded-full" />}
            </button>
          ))}
        </div>
      </Section>

      {/* Size / Volume */}
      <Section title="Size / Volume">
        <div className="space-y-1.5">
          {["250ml", "500ml", "1L", "2L", "5L"].map(size => (
            <label key={size} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 accent-forest-500 cursor-pointer" />
              <span className="text-sm font-dm text-gray-600 group-hover:text-forest-600 transition-colors">
                {size === "1L" ? "1 Litre / 1kg" : size === "2L" ? "2 Litre / 2kg" : size === "5L" ? "5 Litre / 5kg" : `${size} / ${size.replace("ml", "g")}`}
              </span>
            </label>
          ))}
        </div>
      </Section>

      {/* Health Concern */}
      <Section title="Health Concern">
        <div className="flex flex-wrap gap-2">
          {CONCERN_OPTIONS.map(c => (
            <button
              key={c.value}
              onClick={() => toggleConcern(c.value)}
              className={`flex items-center gap-1.5 text-xs font-dm font-semibold px-3 py-1.5 rounded-full border-[1.5px] transition-all duration-200 ${
                filters.concerns.includes(c.value)
                  ? "bg-forest-500 border-forest-500 text-white shadow-md shadow-forest-500/20"
                  : "bg-white border-cream-300 text-gray-600 hover:border-forest-400 hover:text-forest-500"
              }`}
            >
              <span>{c.emoji}</span>
              {c.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section title="Certifications" defaultOpen={false}>
        <div className="space-y-1.5">
          {["FSSAI Certified", "Organic India", "Lab Tested", "Gluten Free", "Vegan"].map(c => (
            <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 accent-forest-500 cursor-pointer" />
              <span className="text-sm font-dm text-gray-600 group-hover:text-forest-600 transition-colors">{c}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Press Method */}
      <Section title="Press Method" defaultOpen={false}>
        <div className="space-y-1.5">
          {["Wood Kolhu", "Stone Pressed", "Kachchi Ghani", "Bilona Method"].map(m => (
            <label key={m} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 accent-forest-500 cursor-pointer" />
              <span className="text-sm font-dm text-gray-600 group-hover:text-forest-600 transition-colors">{m}</span>
            </label>
          ))}
        </div>
      </Section>
    </aside>
  );
}

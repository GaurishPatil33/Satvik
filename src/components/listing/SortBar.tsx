"use client";

import { FilterState, SortType, MAX_PRICE, ViewType } from "@/src/lib/listing";
import { X, LayoutGrid, List, SlidersHorizontal } from "lucide-react";

interface Props {
  filters: FilterState;
  total: number;
  onChange: (next: Partial<FilterState>) => void;
  onClear: () => void;
  onOpenMobileFilter: () => void;
}

const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: "popular",    label: "Most Popular" },
  { value: "rating",     label: "Highest Rated" },
  { value: "price_asc",  label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "newest",     label: "Newest First" },
  { value: "discount",   label: "Biggest Discount" },
];

export default function SortBar({ filters, total, onChange, onClear, onOpenMobileFilter }: Props) {
  // Build active chip list
  const chips: { label: string; onRemove: () => void }[] = [];

  filters.categories.forEach(c =>
    chips.push({ label: c, onRemove: () => onChange({ categories: filters.categories.filter(x => x !== c) }) })
  );
  if (filters.priceMin > 0 || filters.priceMax < MAX_PRICE)
    chips.push({ label: `₹${filters.priceMin}–₹${filters.priceMax}`, onRemove: () => onChange({ priceMin: 0, priceMax: MAX_PRICE }) });
  if (filters.minRating > 0)
    chips.push({ label: `${filters.minRating}★+`, onRemove: () => onChange({ minRating: 0 }) });
  filters.concerns.forEach(c =>
    chips.push({ label: c, onRemove: () => onChange({ concerns: filters.concerns.filter(x => x !== c) }) })
  );
  if (filters.search)
    chips.push({ label: `"${filters.search}"`, onRemove: () => onChange({ search: "" }) });

  const viewBtns: { value: ViewType; icon: React.ReactNode; title: string }[] = [
    { value: 3,      icon: <span className="text-xs font-bold">3</span>, title: "3 columns" },
    { value: 4,      icon: <LayoutGrid className="w-3.5 h-3.5" />,       title: "4 columns" },
    { value: "list", icon: <List className="w-3.5 h-3.5" />,             title: "List view" },
  ];

  return (
    <div className="mb-5">
      {/* Sort row */}
      <div className="flex items-center gap-3 flex-wrap mb-3">
        {/* Mobile filter button */}
        <button
          onClick={onOpenMobileFilter}
          className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-white border border-cream-300 rounded-xl text-sm font-dm font-semibold text-gray-600 hover:border-forest-400 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {chips.length > 0 && (
            <span className="bg-forest-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {chips.length}
            </span>
          )}
        </button>

        {/* Result count */}
        <span className="text-sm font-dm text-gray-500">
          <strong className="text-gray-900">{total}</strong>{" "}
          product{total !== 1 ? "s" : ""} found
        </span>

        {/* Right side */}
        <div className="flex items-center gap-2.5 ml-auto">
          <span className="text-xs font-dm font-semibold text-gray-400 hidden sm:block">Sort:</span>
          <select
            value={filters.sort}
            onChange={e => onChange({ sort: e.target.value as SortType, page: 1 })}
            className="appearance-none bg-white border border-cream-300 rounded-xl px-3.5 py-2 pr-8 text-sm font-dm font-semibold text-gray-700 cursor-pointer outline-none focus:border-forest-400 transition-colors"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23A8865A'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
            }}
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* View toggle */}
          <div className="flex border border-cream-300 rounded-xl overflow-hidden">
            {viewBtns.map(btn => (
              <button
                key={String(btn.value)}
                onClick={() => onChange({ view: btn.value })}
                title={btn.title}
                className={`w-9 h-9 flex items-center justify-center transition-colors ${
                  filters.view === btn.value
                    ? "bg-forest-500 text-white"
                    : "bg-white text-gray-400 hover:bg-cream-100"
                }`}
              >
                {btn.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active filter chips */}
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {chips.map((chip, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 bg-forest-50 border border-forest-300/30 text-forest-700 text-xs font-dm font-semibold px-3 py-1.5 rounded-full"
            >
              {chip.label}
              <button
                onClick={chip.onRemove}
                className="text-forest-400 hover:text-forest-700 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            onClick={onClear}
            className="text-xs font-dm font-bold text-gray-400 hover:text-forest-500 border border-cream-300 rounded-full px-3 py-1.5 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

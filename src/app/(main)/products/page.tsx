"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { Search, X, ChevronRight } from "lucide-react";
import FilterSidebar from "@/src/components/listing/FilterSidebar";
import ListingProductCard from "@/src/components/listing/ListingProductCard";
import SortBar from "@/src/components/listing/SortBar";
import { FilterState, MAX_PRICE, filterAndSort, ITEMS_PER_PAGE } from "@/src/lib/listing";
import { products } from "@/src/lib/data";
import { Pagination } from "@/src/components/listing/Pagination";
import { MobileFilterDrawer } from "@/src/components/listing/MobilefilterDrawer";

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  priceMin: 0,
  priceMax: MAX_PRICE,
  minRating: 0,
  // concerns: [],
  sort: "popular",
  view: 4,
  page: 1,
  search: "",
};




export default function ListingPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchDraft, setSearchDraft] = useState("");
  const mainRef = useRef<HTMLDivElement>(null);
  const searchTimer = useRef<NodeJS.Timeout | null>(null);

  const updateFilters = useCallback((next: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...next, page: next.page ?? 1 }));
  }, []);

  const clearAll = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSearchDraft("");
  }, []);

  // Debounce search
  const handleSearch = (val: string) => {
    setSearchDraft(val);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      updateFilters({ search: val, page: 1 });
    }, 280);
  };

  const filtered = useMemo(() => filterAndSort(products, filters), [filters]);
  const total = filtered.length;
  const paginated = useMemo(() => {
    const start = (filters.page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, filters.page]);

  // Grid class
  const gridClass = {
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
    list: "grid-cols-1",
  }[filters.view];

  const scrollToTop = () => mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="pt-12">
   

      {/* Page Hero */}
      <div className="hidden md:block md:relative bg-gradient-to-br from-forest-700 to-forest-500 overflow-hidden py-8 px-5 top-20 mb-10">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-1.5 mb-3 flex-wrap">
            <a href="/" className="text-cream-200/60 text-xs font-dm hover:text-amber-400 transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-cream-200/30" />
            <span className="text-amber-400 text-xs font-dm font-bold">All Products</span>
          </nav>
          <h1 className="font-playfair text-3xl font-bold text-cream-100 mb-2">All Products</h1>
          <p className="text-sm font-dm text-cream-200/65 max-w-md leading-relaxed">
            Explore our full range of cold-pressed oils, organic jaggery, salts & more — pure, natural, traditional.
          </p>
        </div>
      </div>

      {/* Search bar below hero */}
      {/* <div className="bg-white border-b border-cream-200 px-5 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center bg-cream-50 border border-cream-300 rounded-xl px-4 py-2.5 gap-2.5 max-w-xl focus-within:border-forest-400 focus-within:shadow-md focus-within:shadow-forest-500/10 transition-all">
            <Search className="w-4 h-4 text-earth-300 flex-shrink-0" />
            <input
              type="text"
              value={searchDraft}
              onChange={e => handleSearch(e.target.value)}
              placeholder='Search products… e.g. "coconut oil", "jaggery"'
              className="flex-1 bg-transparent text-sm font-dm text-gray-700 placeholder-earth-300 outline-none"
            />
            {searchDraft && (
              <button onClick={() => { setSearchDraft(""); updateFilters({ search: "", page: 1 }); }}>
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div> */}

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-5 py-6 flex gap-6 items-start mt-16" >

        {/* Sidebar — desktop */}
        <div className="w-64 flex-shrink-0 hidden lg:block sticky top-24">
          <FilterSidebar filters={filters} onChange={updateFilters} onClear={clearAll} />
        </div>

        {/* Mobile drawer */}
        <MobileFilterDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          filters={filters}
          onChange={updateFilters}
          onClear={clearAll}
        />

        {/* Content */}
        <div className="flex-1 min-w-0" ref={mainRef}>
          <SortBar
            filters={filters}
            total={total}
            onChange={updateFilters}
            onClear={clearAll}
            onOpenMobileFilter={() => setDrawerOpen(true)}
          />

          {/* Grid */}
          {paginated.length === 0 ? (
            <div className="text-center py-20 px-4">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-playfair text-xl font-bold text-gray-700 mb-2">No products found</h3>
              <p className="text-sm font-dm text-gray-400 mb-5">
                Try adjusting your filters or clearing your search.
              </p>
              <button
                onClick={clearAll}
                className="bg-forest-500 hover:bg-forest-600 text-white font-dm font-bold text-sm px-6 py-2.5 rounded-xl transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={`grid gap-4 ${gridClass}`}>
              {paginated.map(product => (
                <ListingProductCard key={product.id} product={product} view={filters.view} />
              ))}
            </div>
          )}

          <Pagination
            page={filters.page}
            total={total}
            perPage={ITEMS_PER_PAGE}
            onChange={p => { updateFilters({ page: p }); scrollToTop(); }}
          />
        </div>
      </div>

    </div>
  );
}

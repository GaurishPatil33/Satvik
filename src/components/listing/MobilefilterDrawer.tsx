import { FilterState } from "@/src/lib/listing";
import { X } from "lucide-react";
import FilterSidebar from "./FilterSidebar";

export function MobileFilterDrawer({
  open, onClose, filters, onChange, onClear,
}: {
  open: boolean; onClose: () => void;
  filters: FilterState; onChange: (f: Partial<FilterState>) => void; onClear: () => void;
}) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[200] lg:hidden transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-[min(320px,90vw)] bg-white z-[201] shadow-2xl flex flex-col transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200 flex-shrink-0">
          <span className="font-playfair font-bold text-base">Filters</span>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-cream-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <FilterSidebar filters={filters} onChange={onChange} onClear={onClear} />
        </div>
        <div className="flex gap-2.5 p-4 border-t border-cream-200 flex-shrink-0">
          <button
            onClick={onClear}
            className="flex-shrink-0 px-4 py-2.5 border border-cream-300 rounded-xl text-sm font-dm font-bold text-gray-500"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-forest-500 hover:bg-forest-600 text-white rounded-xl py-2.5 text-sm font-dm font-bold transition-colors"
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  );
}

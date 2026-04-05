import { AlertTriangle } from "lucide-react";

export function StockBadge({ qty }: { qty: number }) {
  if (qty <= 15)
    return (
      <span className="flex items-center gap-1 text-[11px] text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full font-body">
        <AlertTriangle size={9} /> {qty} left
      </span>
    );
  if (qty <= 50)
    return <span className="text-[11px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-body">{qty} in stock</span>;
  return <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-body">{qty} in stock</span>;
}
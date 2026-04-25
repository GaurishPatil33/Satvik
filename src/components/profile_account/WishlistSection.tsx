import { WishlistItem } from "@/src/app/account/page";
import { useState } from "react";
import Image from "next/image";

export function WishlistSection() {
  const [items, setItems] = useState<WishlistItem[]>();
  const [added, setAdded] = useState<string[]>([]);

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const addToCart = (id: string) => {
    setAdded((prev) => [...prev, id]);
    setTimeout(() => setAdded((prev) => prev.filter((i) => i !== id)), 2000);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-brand-earth font-body">{items?.length} items saved</p>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        {items?.map((item) => (
          <div key={item.id} className="bg-brand-off-white rounded-2xl border border-brand-ivory overflow-hidden group hover:shadow-lg hover:shadow-brand-forest/10 transition-all hover:-translate-y-0.5">
            <div className="relative h-36 bg-brand-ivory">
              <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-400" sizes="200px" />
              <button onClick={() => remove(item.id)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 hover:bg-red-50 flex items-center justify-center transition-colors shadow-sm">
                <X size={12} className="text-red-500" />
              </button>
              {!item.inStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="bg-white text-xs font-semibold text-brand-forest px-2 py-1 rounded-full font-body">Out of Stock</span>
                </div>
              )}
            </div>
            <div className="p-3 space-y-2">
              <p className="text-xs font-semibold text-brand-forest font-body leading-tight line-clamp-2">{item.name}</p>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-sm font-bold text-brand-forest">{fmt(item.price)}</span>
                {item.originalPrice && (
                  <span className="text-[11px] text-brand-earth/50 line-through">{fmt(item.originalPrice)}</span>
                )}
              </div>
              {item.inStock ? (
                <button onClick={() => addToCart(item.id)}
                  className={`w-full py-2 rounded-xl text-[11px] font-semibold font-body transition-all ${added.includes(item.id) ? "bg-green-700 text-white" : "bg-brand-forest text-brand-cream hover:bg-brand-forest-light"}`}>
                  {added.includes(item.id) ? "Added ✓" : "Add to Cart"}
                </button>
              ) : (
                <button className="w-full py-2 rounded-xl text-[11px] font-semibold font-body bg-brand-earth/10 text-brand-earth/60 cursor-not-allowed">
                  Notify When Available
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
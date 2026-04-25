"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ChevronRight,
  ShoppingBag,
  Leaf,
  ArrowRight,
  CheckCircle2,
  Truck,
  ShoppingCart,
} from "lucide-react";
import { CartItem, useCartStore } from "@/src/store/cart.store";
import { useRouter } from "next/navigation";
import { CartItemCard } from "./ItemCard";
import { DeliveryProgress } from "./DeliveryProgress";
import { Product } from "@/src/lib/types";
import { products } from "@/src/lib/data";
import { FREE_DELIVERY_THRESHOLD } from "@/src/lib/constants";

/* ─── Types ─────────────────────────────────────────── */
export interface CartProduct {
  id: string;
  name: string;
  shortName: string;
  image: string;
  price: number;
  originalPrice?: number;
  size: string;
  category: string;
}



interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;

}

/* ─── Constants ──────────────────────────────────────── */





function CouponInput() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const apply = () => {
    if (!value.trim()) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus(value.toUpperCase() === "SATVIK20" ? "success" : "error");
    }, 900);
  };

  return (
    <div className="px-5 py-3 border-t border-[#EEE8DC]">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Tag size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C8B8A0]" />
          <input
            type="text"
            value={value}
            onChange={(e) => { setValue(e.target.value); setStatus("idle"); }}
            onKeyDown={(e) => e.key === "Enter" && apply()}
            placeholder="Coupon code"
            className="w-full pl-8 pr-3 py-2 text-[12px] rounded-lg border border-[#E0D4C0] bg-white focus:outline-none focus:border-[#C8961C] focus:ring-1 focus:ring-[#C8961C]/20 text-[#2C4A2E] placeholder:text-[#C8B8A0] transition-all"
          />
        </div>
        <button
          onClick={apply}
          disabled={status === "loading" || status === "success"}
          className="px-4 py-2 rounded-lg text-[12px] font-semibold transition-all
            bg-[#2C4A2E] text-[#FDF6EC] hover:bg-[#3D6B40] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "..." : status === "success" ? "✓" : "Apply"}
        </button>
      </div>
      {status === "success" && (
        <p className="mt-1.5 text-[11px] text-green-700 flex items-center gap-1">
          <CheckCircle2 size={11} /> SATVIK20 applied — 20% off!
        </p>
      )}
      {status === "error" && (
        <p className="mt-1.5 text-[11px] text-red-600">Invalid or expired code.</p>
      )}
    </div>
  );
}

function SuggestedProduct({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCartStore()
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    addToCart({
      productId: product.id,
      product,
      quantity: 1,
      variant: {
        size: product.variants[0].size,
        price: product.variants[0].price,
        discount: product.variants[0].discount,
      },
    });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex items-center gap-3 shrink-0 w-44 bg-white rounded-xl p-2.5 border border-[#EEE8DC] hover:border-[#C8961C]/40 transition-colors">
      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#FAF0DC] shrink-0">
        <Image src={product.media[0].url} alt={product.title} fill className="object-cover" sizes="48px" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-[#2C4A2E] leading-tight line-clamp-2 mb-1">
          {product.title}
        </p>
        <p className="text-[11px] font-bold text-[#2C4A2E]">{(product.price)}</p>
        <button
          onClick={handleAdd}
          className={`mt-1 w-full text-[10px] py-1 rounded-lg font-semibold transition-all ${added
            ? "bg-green-700 text-white"
            : "bg-[#FDF6EC] text-[#2C4A2E] border border-[#E0D4C0] hover:bg-[#2C4A2E] hover:text-[#FDF6EC] hover:border-[#2C4A2E]"
            }`}
        >
          {added ? "Added ✓" : "+ Add"}
        </button>
      </div>
    </div>
  );
}



export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const router = useRouter()

  const { items, getSubtotal, removeFromCart, increaseQty, decreaseQty, clearCart, getDiscountTotal, getGrandTotal, addToCart } = useCartStore()
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = getSubtotal();
  const discount = getDiscountTotal();

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 49;
  const grandTotal = subtotal - discount + deliveryFee;



  return (
    <>
      {isOpen && (

        <>
          {/* overlay */}
          < div
            onClick={onClose}
            aria-hidden="true"
            className={`fixed inset-0 z-40 transition-all duration-300 ${isOpen
              ? "bg-black/40 backdrop-blur-[2px] pointer-events-auto"
              : "bg-transparent pointer-events-none"
              }`}
          />

          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className={`fixed top-0 right-0 z-50 h-full w-full max-w-[400px] bg-[#FEFBF5] shadow-2xl
            flex flex-col transform transition-all duration-400 ease-[cubic-bezier(0.24,1,0.36,1)] 
            ${isOpen ? "animate-slide-in-right" : "animate-slide-out-right"}`}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EEE8DC] bg-[#FDF6EC]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#2C4A2E] flex items-center justify-center">
                  {/* <Leaf size={13} className="text-[#FDF6EC]" /> */}
                  <ShoppingCart size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-[#2C4A2E] leading-none font-[family-name:var(--font-display,serif)]">
                    Your Cart
                  </h2>
                  {itemCount > 0 && (
                    <p className="text-[10px] text-[#8B5E3C] mt-0.5">
                      {itemCount} item{itemCount !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-[#EEE8DC] flex items-center justify-center transition-colors text-[#8B5E3C]"
                aria-label="Close cart"
              >
                <X size={16} />
              </button>
            </div>

            {/* ── Delivery progress ── */}
            {items.length > 0 && <DeliveryProgress total={subtotal - discount} />}
            {/* Savings banner */}
            {getDiscountTotal() > 0 && (
              <div className="mx-4 my-3 px-3 py-2 rounded-xl bg-green-50 border border-green-100 flex items-center gap-2">
                <span className="text-green-700 text-[11px]">🎁</span>
                <p className="text-[11px] text-green-800 font-medium">
                  You&apos;re saving <strong>{getDiscountTotal()}</strong> on this order!
                </p>
              </div>
            )}

            {/* ── Body ── */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {items.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-[#FAF0DC] flex items-center justify-center">
                    <ShoppingBag size={32} className="text-[#C8B8A0]" />
                  </div>
                  <div>
                    <p className="text-[17px] font-bold text-[#2C4A2E] font-[family-name:var(--font-display,serif)] mb-1">
                      Your cart is empty
                    </p>
                    <p className="text-[13px] text-[#8B5E3C] leading-relaxed">
                      Discover our pure cold-pressed oils and organic foods.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-2 inline-flex items-center gap-1.5 bg-[#2C4A2E] text-[#FDF6EC] px-5 py-2.5 rounded-full text-[13px] font-semibold hover:bg-[#3D6B40] transition-colors"
                  >
                    Start Shopping <ArrowRight size={13} />
                  </button>
                </div>
              ) : (
                <>
                  {/* Item list */}
                  <div className="divide-y divide-[#EEE8DC]">

                    {items.map((item, i) => (
                      <CartItemCard item={item} key={i} onRemove={removeFromCart} onIncrease={increaseQty} onDecrease={decreaseQty} />
                    ))}
                  </div>




                </>
              )}
            </div>

            {/* ── Footer (only when cart has items) ── */}
            {items.length > 0 && (
              <div className="">
                {/* Suggested / you may like */}
                {products.length > 0 && (
                  <div className="px-5 py-4 border-t border-[#EEE8DC]">
                    <p className="text-[11px] font-semibold text-[#8B5E3C] uppercase tracking-wider mb-3">
                      Frequently bought together
                    </p>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {products.map((p) => (
                        <SuggestedProduct
                          key={p.id}
                          product={p}
                        />
                      ))}
                    </div>
                  </div>
                )}


                <div className="border-t border-[#EEE8DC] bg-[#FDF6EC]">

                  {/* Coupon */}
                  {/* <CouponInput /> */}

                  {/* Order summary */}
                  <div className="px-5 pt-3 pb-2 space-y-2">
                    <div className="flex justify-between text-[12px]">
                      <span className="text-[#8B5E3C]">Subtotal ({itemCount} items)</span>
                      <span className="text-[#2C4A2E] font-semibold">{getSubtotal()}</span>
                    </div>
                    {getGrandTotal() > 0 && (
                      <div className="flex justify-between text-[12px]">
                        <span className="text-green-700">Discount savings</span>
                        <span className="text-green-700 font-semibold">− {getDiscountTotal()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[12px]">
                      <span className="text-[#8B5E3C]">Delivery</span>
                      <span
                        className={
                          deliveryFee === 0 ? "text-green-700 font-semibold" : "text-[#2C4A2E] font-semibold"
                        }
                      >
                        {deliveryFee === 0 ? "FREE" : (deliveryFee)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[#EEE8DC]">
                      <span className="text-[14px] font-bold text-[#2C4A2E] font-[family-name:var(--font-display,serif)]">
                        Total
                      </span>
                      <div className="text-right">
                        <span className="text-[17px] font-bold text-[#2C4A2E] font-[family-name:var(--font-display,serif)]">
                          {(grandTotal)}
                        </span>
                        <p className="text-[9px] text-[#C8B8A0]">incl. taxes</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="px-5 pb-5 pt-2 space-y-2">
                    <button className="w-full py-3.5 rounded-xl bg-[#2C4A2E] text-[#FDF6EC] text-[14px] font-bold
                hover:bg-[#3D6B40] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2
                font-[family-name:var(--font-display,serif)]" onClick={() => router.push("/checkout")}>
                      Proceed to Checkout
                      <ChevronRight size={16} />
                    </button>
                    <button
                      onClick={onClose}
                      className="w-full py-2.5 rounded-xl border border-[#D0C8B8] text-[#8B5E3C] text-[12px] font-medium
                    hover:bg-[#FAF0DC] transition-colors"
                    >
                      Continue Shopping
                    </button>
                    <p className="text-center text-[10px] text-[#C8B8A0]">
                      🔒 Secure checkout · 7-day returns
                    </p>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </>
      )}
    </>
  );
}
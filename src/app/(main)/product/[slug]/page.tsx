"use client";

import { useState, useEffect, useRef } from "react";
import {
  Star, Truck, RotateCcw,
  Heart, ShoppingCart, Zap, Copy, Check,
  ChevronRight, Package,

} from "lucide-react";
import { InfoTabs } from "@/src/components/product/info/InfoTabs";
import { useParams } from "next/navigation";
import { Product } from "@/src/lib/types";
import { products } from "@/src/lib/data";
import { ProductNotFound } from "@/src/components/NotFound";
import MediaGallery from "@/src/components/product/media/MediaGallery";
import Loading from "@/src/components/Loading";
import { TbRotateClockwise } from "react-icons/tb";
import { ProductCard } from "@/src/components/product/ProductCard";
import StickyAddToCartBar from "@/src/components/product/info/StickyBar";
import { RiSecurePaymentLine, RiTruckLine } from "react-icons/ri";
import { PiCertificate } from "react-icons/pi";

// ─── Types ──────────────────────────────────────────────────────────────────
interface SizeOption {
  label: string;
  price: number;
}


// ─── Data ────────────────────────────────────────────────────────────────────
const SIZES: SizeOption[] = [
  { label: "500ml", price: 180 },
  { label: "1000ml", price: 350 },
  { label: "2L", price: 640 },
  { label: "5L", price: 1150 },
];





type TabId = "description" | "benefits" | "nutrition" | "how-to-use" | "reviews";
const TABS: { id: TabId; label: string }[] = [
  { id: "description", label: "Description" },
  { id: "benefits", label: "Key Benefits" },
  { id: "nutrition", label: "Nutrition & Certs" },
  { id: "how-to-use", label: "How to Use" },
  { id: "reviews", label: "Reviews (1,240)" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────
function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          style={{ width: size, height: size }}
          className={s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}
        />
      ))}
    </div>
  );
}

export default function ProductPage() {
  const params = useParams();
  // const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = params.slug?.toString();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedlproducts, setrelatedProducts] = useState<Product[] | null>(null);
  const [loading, setloading] = useState(false)

  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("description");
  const [stickyVisible, setStickyVisible] = useState(false);
  const addBtnRef = useRef<HTMLButtonElement>(null);


  const [selectedVariant, setSelectedVariant] = useState<Product["variants"][0] | null>(null);


  // Sticky bar visibility
  useEffect(() => {
    const element = addBtnRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStickyVisible(!entry.isIntersecting)
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(element)
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleCopyCoupon = () => {
    navigator.clipboard?.writeText("SATVIK10").catch(() => { });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  // Ensure price is a number, default to 0 if null
  const price = selectedVariant ? Number(selectedVariant.price) : 0;

  // Now safe to do arithmetic
  const discountedPrice = Math.round(price * 0.9);
  const originalPrice = Math.round(price * 1.18);
  const savings = originalPrice - discountedPrice;
  const savingsPct = originalPrice > 0 ? Math.round((savings / originalPrice) * 100) : 0;

  // fetching product
  useEffect(() => {
    if (!id) return

    setloading(true)
    const fetch = products.find(p => p.id.toString() === id)
    console.log("product", fetch)
    if (fetch) {
      setProduct(fetch)
      setrelatedProducts(products)
    }
    setloading(false)
  }, [id])


  useEffect(() => {
    if (product?.variants.length) {
      setSelectedVariant(product.variants[0])
    }
  }, [product])

  if (loading) return <Loading />;

  if (!product) return <ProductNotFound />




  return (
    <div className="mx-auto">

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-5 py-3 hidden md:flex items-center gap-1.5 text-xs font-dm flex-wrap top-20 mt-28 ">
        {["Home", "Oils", "Cold-Pressed Oils"].map((b) => (
          <span key={b} className="flex items-center gap-1.5">
            <a href="#" className="text-earth-400 hover:text-forest-500 font-medium transition-colors">{b}</a>
            <ChevronRight className="w-3 h-3 text-earth-300" />
          </span>
        ))}
        <span className="text-gray-700 font-semibold">Wood Pressed Groundnut Oil</span>
      </nav>

      {/* ── Product Section ── */}
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start pb-4">

        {/* Gallery */}
        <MediaGallery media={product.media} />

        {/* Product Info */}
        <div className="pb-10">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-dm font-bold text-forest-500 bg-forest-50 border border-forest-500/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            {product?.brand}
          </div>

          <h1 className="font-playfair text-[28px] sm:text-[32px] font-bold text-gray-900 leading-tight mb-1.5">
            {product.title}
          </h1>
          <p className="text-sm font-dm text-earth-400 font-medium mb-4">
            {/* Traditional Kolhu Method · Stone-Ground · Unrefined */}
          </p>

          {/* Rating row */}
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <StarRow rating={4.9} size={16} />
            <span className="font-playfair font-bold text-lg text-gray-900">4.9</span>
            <button
              onClick={() => setActiveTab("reviews")}
              className="text-xs font-dm text-gray-400 underline hover:text-forest-500 transition-colors"
            >
              {product.reviews}
            </button>
            <div className="w-px h-4 bg-cream-300" />
            <div>
              {
                Number(product.stock) > 0 ? (
                  <div
                    className="flex items-center gap-1.5 text-xs font-dm font-bold text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <div className="">
                      In Stock · Ships Today
                    </div>
                  </div>
                )
                  :
                  <div
                    className="flex items-center gap-1.5 text-xs font-dm font-bold text-red-600">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <div className="">
                      Out Of Stock
                    </div>
                  </div>
              }
            </div>
          </div>

          {/* Benefit pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            {/* {["❤️ Heart Healthy", "🧠 Rich in Vit E", "🚫 Zero Chemicals", "🌡️ Cold-Pressed", "🏆 FSSAI Certified"].map((b) => (
              <span key={b} className="text-xs font-dm font-semibold bg-white border-[1.5px] border-cream-300 px-3 py-1.5 rounded-full text-gray-600">
                {b}
              </span>
            ))} */}

            {product.KeyBenefits.map(k => (
              <span key={k} className="text-xs font-dm font-semibold bg-white border-[1.5px] border-cream-300 px-3 py-1.5 rounded-full text-gray-600">
                {k}
              </span>
            ))}
          </div>

          <div className="h-px bg-cream-200 my-4" />

          {/* Size Selector */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-dm font-bold text-gray-500 uppercase tracking-widest">Size</span>
              <span className="text-xs font-dm text-earth-400">{selectedVariant?.size} selected</span>
            </div>
            {/*  */}
            <div className="flex gap-2 overflow-x-auto">
              {product.variants.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setSelectedVariant(s)}
                  className={`min-w-[72px] px-4 py-2 rouneded-xl border-2 text-sm font-dm font-semibold transition-all duration-200 text-center ${selectedVariant?.size === s.size
                    ? "border-forest-500 bg-forest-50 text-forest-600 shadow-md shadow-forest-500/10"
                    : "border-cream-300 bg-white text-gray-500 hover:border-forest-400 hover:text-forest-500"
                    }`}
                >
                  {s.size}
                  <span className="block text-[10px] font-medium opacity-70 mt-0.5">₹{s.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 flex-wrap mb-1.5">
            <span className="font-playfair text-[36px] font-bold text-forest-600">₹{selectedVariant?.price}</span>
            <span className="text-lg text-gray-300 line-through">₹{originalPrice}</span>
            <span className="text-xs font-dm font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
              Save {savingsPct}%
            </span>
          </div>

          {/* Coupon */}
          <div className="flex items-center gap-2 flex-wrap bg-gradient-to-r from-amber-50 to-yellow-50 border-[1.5px] border-dashed border-amber-300 rounded-xl px-4 py-2.5 mb-5">
            <span className="bg-amber-400 text-forest-800 text-xs font-bold px-2.5 py-0.5 rounded-md tracking-wide flex-shrink-0">

            </span>
            <span className="text-xs font-dm text-gray-600 flex-1">
              Apply for    {product.coupons[0].discount} extra off — pay just <strong className="text-gray-800">₹{discountedPrice}</strong>
            </span>
            <button
              onClick={handleCopyCoupon}
              className="flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-500 transition-colors flex-shrink-0"
            >
              {copied ? <><Check className="w-3 h-3 text-green-500" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
            </button>
          </div>

          {/* Qty + Add to Cart */}
          <div className="flex gap-2.5 mb-2.5 items-center">
            <div className="flex items-center border-2 border-cream-300 rounded-xl bg-white overflow-hidden flex-shrink-0">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-12 text-2xl font-light text-gray-500 hover:bg-cream-100 transition-colors flex items-center justify-center">−</button>
              <span className="w-10 text-center text-base font-bold text-gray-900">{qty}</span>
              <button onClick={() => setQty(Math.min(10, qty + 1))} className="w-10 h-12 text-2xl font-light text-gray-500 hover:bg-cream-100 transition-colors flex items-center justify-center">+</button>
            </div>
            <button
              ref={addBtnRef}
              onClick={handleAddToCart}
              className={`flex-1 h-12 rounded-xl font-dm font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-300 ${added
                ? "bg-forest text-white"
                : "bg-forest hover:bg-forest text-white hover:-translate-y-0.5 hover:shadow-xl hover:shadow-forest/25"
                }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {added ? "Added ✓" : "Add to Cart"}
            </button>
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${wishlisted
                ? "border-rose-400 bg-rose-50 text-rose-500"
                : "border-cream bg-white text-gray-400 hover:border-forest-800 hover:bg-gold-300/30"
                }`}
            >
              <Heart className={`w-5 h-5 ${wishlisted ? "fill-rose-500" : ""}`} />
            </button>
          </div>

          <button className="w-full h-12 bg-white text-forest border-2 border-forest rounded-xl font-dm font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-gold-300/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-forest/15 mb-4">
            <Zap className="w-4 h-4" /> Buy Now
          </button>

          {/* Trust badges */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { icon: <RiSecurePaymentLine />, text: "Secure Payment" },
              { icon: <TbRotateClockwise />, text: "7-Day Returns" },
              { icon: <RiTruckLine />, text: "Free Delivery ₹499+" },
              { icon: <PiCertificate />, text: "FSSAI Certified" },
            ].map((b) => (
              <div key={b.text} className="bg-cream-100 border border-cream-300 rounded-xl p-2.5 text-center">
                <span className="text-lg  mb-1 flex items-center justify-center text-forest-800">{b.icon}</span>
                <span className="text-[10px] font-dm font-bold text-gray-500 leading-tight">{b.text}</span>
              </div>
            ))}
          </div>

          {/* Delivery */}
          <div className="bg-white border border-cream-200 rounded-xl p-4 space-y-3 mb-4">
            <div className="flex items-start gap-3">
              <Truck className="w-4 h-4 text-forest-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-dm font-semibold text-gray-800">Free Delivery</p>
                <p className="text-xs text-gray-500 mt-0.5">Expected by <strong>Thursday, Mar 20</strong></p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Package className="w-4 h-4 text-forest-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-dm font-semibold text-gray-800 mb-1.5">Check Delivery Date</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="Enter PIN code" maxLength={6} className="flex-1 min-w-0 border border-cream-300 rounded-lg px-3 py-1.5 text-xs font-dm outline-none focus:border-forest-400 transition-colors" />
                  <button className="bg-forest-500 hover:bg-forest-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">Check</button>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw className="w-4 h-4 text-forest-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-dm font-semibold text-gray-800">Easy Returns</p>
                <p className="text-xs text-gray-500 mt-0.5">Return within 7 days if not satisfied</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-dm text-gray-400">
            <span>🏪</span>
            <span>Sold by <strong className="text-gray-700">Satvik Foods Pvt. Ltd.</strong></span>
            <span className="ml-auto text-forest-500 font-bold text-xs">4.9 ★ Seller</span>
          </div>
        </div>
      </div >



      {/* ── TABS ── */}
      <InfoTabs />

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-5 pb-16">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-[11px] font-dm font-bold text-forest-500 uppercase tracking-widest mb-1">✦ You Might Also Like</p>
            <h2 className="font-playfair text-2xl font-bold text-gray-900">Frequently Bought Together</h2>
          </div>
          <a href="/products" className="text-sm font-dm font-bold text-forest-500 hover:text-forest-600 transition-colors">View all →</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedlproducts?.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>


      {/* ── Sticky Cart Bar ── */}

      <StickyAddToCartBar
        visible={stickyVisible}
        productIcon="🫒"
        title="Wood Pressed Groundnut Oil"
        variant={selectedVariant?.size}
        price={selectedVariant?.price ?? 0}
        added={added}
        onAddToCart={handleAddToCart}
        StarRow={StarRow}
      />
    </div >
  );
}

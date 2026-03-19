"use client";

import { useState, useEffect, useRef } from "react";
import {
  Star, Shield, Truck, RotateCcw, CheckCircle,
  Heart, ShoppingCart, Zap, Share2, Copy, Check,
  ChevronRight, Package
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
interface SizeOption {
  label: string;
  price: number;
}

interface Review {
  name: string;
  location: string;
  avatar: string;
  rating: number;
  title: string;
  text: string;
  product: string;
  date: string;
  helpful: number;
  verified: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const SIZES: SizeOption[] = [
  { label: "500ml",  price: 180 },
  { label: "1000ml", price: 350 },
  { label: "2L",     price: 640 },
  { label: "5L",     price: 1150 },
];

const THUMBS = ["🫒", "🏭", "🌾", "📦", "🥜"];

const BENEFITS = [
  { icon: "❤️", bg: "#FEF3C7", title: "Heart Health",
    text: "Rich in monounsaturated fatty acids (oleic acid) that help maintain healthy cholesterol levels and support cardiovascular wellness." },
  { icon: "🧠", bg: "#FFF1F2", title: "Vitamin E Powerhouse",
    text: "Naturally packed with tocopherols — a potent antioxidant that protects cells from oxidative damage and supports skin health." },
  { icon: "🦴", bg: "#F0FDF4", title: "Joint & Bone Support",
    text: "Contains resveratrol and phytosterols with anti-inflammatory properties, supporting joint health and reducing inflammation." },
  { icon: "✨", bg: "#EFF6FF", title: "Skin & Hair Nourishment",
    text: "Vitamin E and fatty acids deeply moisturise skin and strengthen hair. A traditional massage oil used for generations." },
  { icon: "🔥", bg: "#FEFCE8", title: "Suitable for High Heat",
    text: "Natural smoke point of ~160°C makes it excellent for everyday Indian cooking — tadkas, sautéing, and shallow frying." },
  { icon: "🧬", bg: "#FDF4FF", title: "Rich in Phytonutrients",
    text: "Unrefined pressing retains all naturally occurring polyphenols, sterols, and squalene — lost entirely in refined oils." },
];

const HOW_TO_USE = [
  { icon: "🍳", title: "Everyday Cooking", text: "Use for tadkas, sautéing vegetables, rotis, or shallow frying. Ideal for Indian cuisine. Smoke point: ~160°C." },
  { icon: "🥗", title: "Salad Dressing",   text: "Drizzle over salads or mix with lemon juice and rock salt for a simple, flavourful vinaigrette." },
  { icon: "💆", title: "Body Massage",     text: "Warm slightly and apply for a traditional body massage. Deeply nourishing for skin and joints." },
  { icon: "💇", title: "Hair Care",        text: "Apply to scalp 30 mins before washing. Strengthens hair roots and reduces breakage." },
  { icon: "🌅", title: "Oil Pulling",      text: "Swish 1 tablespoon for 10–15 mins before breakfast. An ancient Ayurvedic practice for oral health." },
  { icon: "📦", title: "Storage Tips",     text: "Store cool and dry, away from sunlight. Don't refrigerate. Cloudiness = purity. Shake before use." },
];

const REVIEWS: Review[] = [
  { name: "Priya Menon", location: "Bangalore", avatar: "🧕", rating: 5, title: "Finally, oil that actually smells like groundnut!", text: "Switched to Satvik after my nutritionist's advice. The difference is immediate — the aroma when you open the bottle is incredible. My food tastes richer and more authentic.", product: "1000ml", date: "3 weeks ago", helpful: 32, verified: true },
  { name: "Dr. Vikram Nair", location: "Hyderabad", avatar: "👨‍⚕️", rating: 5, title: "Recommending this to all my patients", text: "As a cardiologist, I'm particular about cooking oils. Satvik's cold-pressed groundnut oil has the right fatty acid profile — high oleic acid, natural Vitamin E, zero trans fats. Consistent quality across batches.", product: "5L", date: "1 month ago", helpful: 78, verified: true },
  { name: "Rekha Sharma", location: "Jaipur", avatar: "👩‍🍳", rating: 4, title: "Great oil, slight cloudiness at first", text: "Excellent for cooking — the flavour is authentic and my family loves it. Was initially concerned about cloudiness but it's natural sedimentation from unrefined pressing. Shakes clear easily.", product: "2L", date: "2 months ago", helpful: 19, verified: true },
];

const RELATED = [
  { emoji: "🌿", name: "Cold-Pressed Mustard Oil", sub: "Kachchi Ghani · 1000ml", price: 280, rating: 4.7, bg: "bg-yellow-50" },
  { emoji: "🥥", name: "Virgin Coconut Oil",        sub: "Cold-Pressed · 500ml",  price: 220, rating: 4.8, bg: "bg-amber-50" },
  { emoji: "🧈", name: "A2 Cow Ghee",               sub: "Bilona Method · 500g",  price: 680, rating: 4.9, bg: "bg-orange-50" },
  { emoji: "🍫", name: "Palm Jaggery",               sub: "Organic · 500g",       price: 180, rating: 4.8, bg: "bg-yellow-50" },
];

const RATING_BREAKDOWN = [
  { star: 5, pct: 89 }, { star: 4, pct: 7 },
  { star: 3, pct: 2 },  { star: 2, pct: 1 }, { star: 1, pct: 1 },
];

type TabId = "description" | "benefits" | "nutrition" | "how-to-use" | "reviews";
const TABS: { id: TabId; label: string }[] = [
  { id: "description", label: "Description" },
  { id: "benefits",    label: "Key Benefits" },
  { id: "nutrition",   label: "Nutrition & Certs" },
  { id: "how-to-use",  label: "How to Use" },
  { id: "reviews",     label: "Reviews (1,240)" },
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

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState<SizeOption>(SIZES[1]);
  const [activeThumb, setActiveThumb] = useState(0);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("description");
  const [stickyVisible, setStickyVisible] = useState(false);
  const addBtnRef = useRef<HTMLButtonElement>(null);

  // Sticky bar visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (addBtnRef.current) observer.observe(addBtnRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleCopyCoupon = () => {
    navigator.clipboard?.writeText("SATVIK10").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const discountedPrice = Math.round(selectedSize.price * 0.9);
  const originalPrice = Math.round(selectedSize.price * 1.18);
  const savings = originalPrice - selectedSize.price;
  const savingsPct = Math.round((savings / originalPrice) * 100);

  return (
    <>

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-5 py-3 flex items-center gap-1.5 text-xs font-dm flex-wrap">
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
        <div className="lg:sticky lg:top-24">
          <div className="relative aspect-square bg-gradient-to-br from-cream-100 to-cream-200 rounded-3xl border border-cream-300 flex items-center justify-center overflow-hidden group cursor-zoom-in">
            <div className="absolute inset-0 bg-gradient-radial from-amber-400/10 to-transparent pointer-events-none" />
            <div className="absolute top-3 left-3 bg-forest-500 text-white text-[11px] font-dm font-bold px-3 py-1.5 rounded-full shadow-lg shadow-forest-500/30 z-10">
              ⭐ Best Seller
            </div>
            <div className="absolute top-3 right-3 bg-white border border-cream-300 text-amber-600 text-[11px] font-bold px-3 py-1.5 rounded-full z-10">
              🌿 Organic
            </div>
            <span
              className="text-[150px] drop-shadow-xl group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-500 leading-none"
              style={{ filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.12))" }}
            >
              {THUMBS[activeThumb]}
            </span>
            <span className="absolute bottom-4 right-5 font-playfair text-[80px] font-bold text-forest-500/5 leading-none select-none pointer-events-none">
              Satvik
            </span>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2.5 mt-3">
            {THUMBS.map((emoji, i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                className={`w-[68px] h-[68px] rounded-[14px] border-2 flex items-center justify-center text-2xl transition-all duration-200 flex-shrink-0 ${
                  activeThumb === i
                    ? "border-forest-500 bg-forest-50 shadow-md shadow-forest-500/15"
                    : "border-cream-200 bg-cream-100 hover:border-forest-400"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Share */}
          <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-cream-200">
            <span className="text-xs font-dm font-medium text-earth-400">Share:</span>
            {["💬", "📸", "🔗", "🐦"].map((icon, i) => (
              <button key={i} className="w-8 h-8 rounded-full border-[1.5px] border-cream-300 bg-white flex items-center justify-center text-sm hover:border-forest-400 hover:bg-forest-50 transition-all">
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="pb-10">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-dm font-bold text-forest-500 bg-forest-50 border border-forest-500/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            🌱 Cold-Pressed Oils
          </div>

          <h1 className="font-playfair text-[28px] sm:text-[32px] font-bold text-gray-900 leading-tight mb-1.5">
            Wood Pressed Groundnut Oil
          </h1>
          <p className="text-sm font-dm text-earth-400 font-medium mb-4">
            Traditional Kolhu Method · Stone-Ground · Unrefined
          </p>

          {/* Rating row */}
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <StarRow rating={4.9} size={16} />
            <span className="font-playfair font-bold text-lg text-gray-900">4.9</span>
            <button
              onClick={() => setActiveTab("reviews")}
              className="text-xs font-dm text-gray-400 underline hover:text-forest-500 transition-colors"
            >
              1,240 reviews
            </button>
            <div className="w-px h-4 bg-cream-300" />
            <span className="flex items-center gap-1.5 text-xs font-dm font-bold text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              In Stock · Ships Today
            </span>
          </div>

          {/* Benefit pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            {["❤️ Heart Healthy", "🧠 Rich in Vit E", "🚫 Zero Chemicals", "🌡️ Cold-Pressed", "🏆 FSSAI Certified"].map((b) => (
              <span key={b} className="text-xs font-dm font-semibold bg-white border-[1.5px] border-cream-300 px-3 py-1.5 rounded-full text-gray-600">
                {b}
              </span>
            ))}
          </div>

          <div className="h-px bg-cream-200 my-4" />

          {/* Size Selector */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-dm font-bold text-gray-500 uppercase tracking-widest">Size</span>
              <span className="text-xs font-dm text-earth-400">{selectedSize.label} selected</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {SIZES.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSelectedSize(s)}
                  className={`min-w-[72px] px-4 py-2 rounded-xl border-2 text-sm font-dm font-semibold transition-all duration-200 text-center ${
                    selectedSize.label === s.label
                      ? "border-forest-500 bg-forest-50 text-forest-600 shadow-md shadow-forest-500/10"
                      : "border-cream-300 bg-white text-gray-500 hover:border-forest-400 hover:text-forest-500"
                  }`}
                >
                  {s.label}
                  <span className="block text-[10px] font-medium opacity-70 mt-0.5">₹{s.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 flex-wrap mb-1.5">
            <span className="font-playfair text-[36px] font-bold text-forest-600">₹{selectedSize.price}</span>
            <span className="text-lg text-gray-300 line-through">₹{originalPrice}</span>
            <span className="text-xs font-dm font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
              Save {savingsPct}%
            </span>
          </div>

          {/* Coupon */}
          <div className="flex items-center gap-2 flex-wrap bg-gradient-to-r from-amber-50 to-yellow-50 border-[1.5px] border-dashed border-amber-300 rounded-xl px-4 py-2.5 mb-5">
            <span className="bg-amber-400 text-forest-800 text-xs font-bold px-2.5 py-0.5 rounded-md tracking-wide flex-shrink-0">
              SATVIK10
            </span>
            <span className="text-xs font-dm text-gray-600 flex-1">
              Apply for 10% extra off — pay just <strong className="text-gray-800">₹{discountedPrice}</strong>
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
              className={`flex-1 h-12 rounded-xl font-dm font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-300 ${
                added
                  ? "bg-forest-600 text-white"
                  : "bg-forest-500 hover:bg-forest-600 text-white hover:-translate-y-0.5 hover:shadow-xl hover:shadow-forest-500/25"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {added ? "Added ✓" : "Add to Cart"}
            </button>
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                wishlisted
                  ? "border-rose-400 bg-rose-50 text-rose-500"
                  : "border-cream-300 bg-white text-gray-400 hover:border-rose-300 hover:bg-rose-50"
              }`}
            >
              <Heart className={`w-5 h-5 ${wishlisted ? "fill-rose-500" : ""}`} />
            </button>
          </div>

          <button className="w-full h-12 bg-white text-forest-600 border-2 border-forest-500 rounded-xl font-dm font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-forest-50 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-forest-500/15 mb-4">
            <Zap className="w-4 h-4" /> Buy Now
          </button>

          {/* Trust badges */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { icon: "🔒", text: "Secure Payment" },
              { icon: "↩️", text: "7-Day Returns" },
              { icon: "🚚", text: "Free Delivery ₹499+" },
              { icon: "✅", text: "FSSAI Certified" },
            ].map((b) => (
              <div key={b.text} className="bg-cream-100 border border-cream-200 rounded-xl p-2.5 text-center">
                <span className="text-lg block mb-1">{b.icon}</span>
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
      </div>

      {/* Recently Viewed */}
      <div className="bg-cream-100 border-y border-cream-200 px-5 py-3 flex items-center gap-3 overflow-x-auto mt-4">
        <span className="text-[11px] font-dm font-bold text-earth-400 uppercase tracking-widest flex-shrink-0">Recently Viewed</span>
        {["🌿 Mustard Oil", "🥥 Coconut Oil", "🧈 A2 Cow Ghee", "🍫 Palm Jaggery", "🧂 Rock Salt"].map((item) => (
          <a key={item} href="#" className="flex items-center gap-1.5 bg-white border border-cream-200 rounded-full px-3 py-1.5 text-xs font-dm font-semibold text-gray-600 hover:border-forest-400 hover:text-forest-500 transition-colors whitespace-nowrap flex-shrink-0">
            {item}
          </a>
        ))}
      </div>

      {/* ── TABS ── */}
      <div className="max-w-7xl mx-auto px-5 mt-8">
        <div className="flex border-b-2 border-cream-200 overflow-x-auto gap-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3.5 text-sm font-dm font-semibold whitespace-nowrap border-b-[3px] -mb-[2px] transition-all ${
                activeTab === tab.id
                  ? "border-forest-500 text-forest-600"
                  : "border-transparent text-gray-400 hover:text-forest-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-7 pb-12">

          {/* Description */}
          {activeTab === "description" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <h3 className="font-playfair text-xl font-bold text-gray-900">Pure Tradition in a Bottle</h3>
                <p className="text-sm font-dm text-gray-500 leading-loose">Satvik's Wood Pressed Groundnut Oil is cold-extracted using the age-old <em>Kolhu</em> (wooden press) method, running at low RPM to ensure the oil never exceeds 45°C. This careful process preserves the natural aroma, golden colour, and full nutritional profile of organically-grown groundnuts.</p>
                <p className="text-sm font-dm text-gray-500 leading-loose">Unlike commercially refined oils that go through bleaching, deodorising, and chemical solvent extraction, our oil is single-ingredient — just groundnuts. Nothing added. Nothing removed.</p>
                <p className="text-sm font-dm font-semibold text-gray-700">What you'll notice:</p>
                <ul className="list-disc list-inside space-y-1.5">
                  {["Rich, nutty aroma that fills your kitchen when cooking","Golden amber colour — natural cloudiness is a sign of purity","Higher smoke point (~160°C) for everyday Indian cooking","No harsh aftertaste; lets the flavours of your food shine"].map((item) => (
                    <li key={item} className="text-sm font-dm text-gray-500 leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-cream-100 border border-cream-200 rounded-2xl p-5">
                <h4 className="font-playfair font-bold text-base text-gray-900 mb-4">Product Details</h4>
                {[
                  ["Ingredients", "Organic Groundnuts (100%)", false],
                  ["Press Method", "Wood Kolhu (Cold-Pressed)", true],
                  ["Processing Temp", "Below 45°C", true],
                  ["Filtered?", "Gravity-Filtered, Unrefined", false],
                  ["Shelf Life", "12 months from pressing", false],
                  ["Storage", "Cool, dry, away from sunlight", false],
                  ["Origin", "India 🇮🇳", false],
                  ["Certifications", "FSSAI · Organic India", true],
                  ["Packaging", "BPA-Free PET / Glass bottle", false],
                ].map(([key, val, green]) => (
                  <div key={String(key)} className="flex justify-between items-center py-2.5 border-b border-cream-200 last:border-b-0 gap-3">
                    <span className="text-[11px] font-dm font-bold text-gray-400 uppercase tracking-wider flex-shrink-0">{key}</span>
                    <span className={`text-xs font-dm font-semibold text-right ${green ? "text-forest-500" : "text-gray-700"}`}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {activeTab === "benefits" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BENEFITS.map((b) => (
                <div key={b.title} className="bg-white border border-cream-200 rounded-2xl p-5 flex gap-4 hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: b.bg }}>{b.icon}</div>
                  <div>
                    <h4 className="font-dm font-bold text-sm text-gray-800 mb-1.5">{b.title}</h4>
                    <p className="text-xs font-dm text-gray-500 leading-relaxed">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Nutrition */}
          {activeTab === "nutrition" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-white border border-cream-200 rounded-2xl overflow-hidden">
                  <div className="bg-forest-500 px-5 py-4">
                    <h3 className="font-playfair font-semibold text-base text-white">Nutritional Information</h3>
                    <p className="text-[11px] text-white/70 mt-0.5">Per 100ml serving</p>
                  </div>
                  {[
                    ["Energy", "884 kcal", false, true],
                    ["Total Fat", "100g", false, true],
                    ["— Saturated Fat", "17g", true, false],
                    ["— Monounsaturated", "46g", true, false],
                    ["— Polyunsaturated", "32g", true, false],
                    ["Trans Fat", "0g ✓", false, false, true],
                    ["Cholesterol", "0mg ✓", false, false, true],
                    ["Vitamin E", "15.7mg", false, false],
                    ["Carbohydrates", "0g", false, false],
                    ["Sodium", "0mg ✓", false, false, true],
                  ].map(([key, val, indent, bold, green]) => (
                    <div key={String(key)} className={`flex justify-between items-center px-5 py-2.5 border-b border-cream-100 last:border-b-0 text-sm ${indent ? "pl-8" : ""} ${bold ? "font-bold" : ""}`}>
                      <span className={indent ? "text-gray-400" : "text-gray-500"}>{key}</span>
                      <span className={`font-semibold ${green ? "text-green-600" : "text-gray-800"}`}>{val}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-gray-400 mt-2 px-1 leading-relaxed">* Per 100ml. Values may vary slightly by batch due to natural seed variation.</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-playfair font-bold text-base text-gray-900 mb-1">Certifications & Quality</h4>
                {[
                  { icon: "🏛️", name: "FSSAI Certified",         desc: "Licence No. 10023022003015. All products comply with Indian food safety standards." },
                  { icon: "🌿", name: "Organic India Certified",  desc: "Seeds from farms certified under National Programme for Organic Production (NPOP)." },
                  { icon: "🔬", name: "Lab Tested — Every Batch", desc: "Third-party tested for pesticide residues, heavy metals, and microbial safety before dispatch." },
                  { icon: "♻️", name: "Eco-Friendly Packaging",   desc: "BPA-free bottles. Glass option available. Recyclable caps and soy-based ink labels." },
                ].map((c) => (
                  <div key={c.name} className="bg-white border border-cream-200 rounded-xl p-4 flex gap-3 items-start">
                    <span className="text-2xl flex-shrink-0">{c.icon}</span>
                    <div><p className="font-dm font-bold text-sm text-gray-800 mb-0.5">{c.name}</p><p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How to Use */}
          {activeTab === "how-to-use" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {HOW_TO_USE.map((h) => (
                <div key={h.title} className="bg-white border border-cream-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
                  <span className="text-4xl block mb-3">{h.icon}</span>
                  <h4 className="font-dm font-bold text-sm text-gray-800 mb-2">{h.title}</h4>
                  <p className="text-xs font-dm text-gray-500 leading-relaxed">{h.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Reviews */}
          {activeTab === "reviews" && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-8 mb-8 items-center">
                <div className="bg-gradient-to-br from-forest-700 to-forest-500 rounded-2xl p-7 text-center text-white">
                  <div className="font-playfair text-6xl font-bold leading-none">4.9</div>
                  <div className="text-amber-300 text-xl tracking-wider my-1.5">★★★★★</div>
                  <div className="text-xs text-white/60">Based on 1,240 reviews</div>
                </div>
                <div className="space-y-2">
                  {RATING_BREAKDOWN.map((r) => (
                    <div key={r.star} className="flex items-center gap-3">
                      <span className="text-xs font-dm font-semibold text-gray-500 w-8 flex-shrink-0">{r.star} ★</span>
                      <div className="flex-1 h-2 bg-cream-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full transition-all duration-700" style={{ width: `${r.pct}%` }} />
                      </div>
                      <span className="text-xs font-dm text-gray-400 w-8 text-right flex-shrink-0">{r.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="bg-white border border-cream-200 rounded-2xl p-5 relative overflow-hidden hover:shadow-md transition-shadow">
                    <span className="absolute top-3 right-4 font-playfair text-6xl text-forest-500/6 leading-none pointer-events-none">"</span>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-cream-200 rounded-full flex items-center justify-center text-lg flex-shrink-0">{r.avatar}</div>
                      <div>
                        <p className="font-dm font-bold text-sm text-gray-800">{r.name}</p>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          <StarRow rating={r.rating} size={11} />
                          {r.verified && <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-0.5 rounded-full">✓ Verified</span>}
                          <span className="text-[11px] text-gray-400">{r.date} · {r.location}</span>
                        </div>
                      </div>
                    </div>
                    <p className="font-dm font-bold text-sm text-gray-800 mb-1.5">{r.title}</p>
                    <p className="text-sm font-dm text-gray-500 leading-relaxed">{r.text}</p>
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-cream-100 flex-wrap">
                      <span className="text-[11px] font-bold bg-forest-50 text-forest-500 px-2.5 py-0.5 rounded-full">{r.product}</span>
                      <button className="ml-auto text-xs text-gray-400 border border-cream-300 rounded-full px-3 py-1 hover:border-forest-400 hover:text-forest-500 transition-colors">
                        👍 Helpful ({r.helpful})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <button className="bg-forest-50 border border-forest-300/40 text-forest-600 font-dm font-bold text-sm px-7 py-3 rounded-full hover:bg-forest-100 transition-colors">
                  Load More Reviews
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

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
          {RELATED.map((p) => (
            <div key={p.name} className="bg-white border border-cream-200 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className={`${p.bg} h-36 flex items-center justify-center text-5xl`}>{p.emoji}</div>
              <div className="p-3">
                <p className="font-playfair font-semibold text-sm text-gray-900 leading-tight mb-0.5">{p.name}</p>
                <p className="text-[11px] text-earth-400 font-dm mb-1.5">{p.sub}</p>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  <span className="text-[11px] text-gray-500 font-dm">{p.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-playfair font-bold text-base text-forest-600">₹{p.price}</span>
                  <button
                    onClick={handleAddToCart}
                    className="bg-forest-500 hover:bg-forest-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <ShoppingCart className="w-3 h-3" /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ── Sticky Cart Bar ── */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-cream-200 shadow-2xl shadow-black/10 z-50 flex items-center gap-4 px-5 py-3 transition-transform duration-500 ${
          stickyVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <span className="text-3xl flex-shrink-0">🫒</span>
        <div>
          <p className="font-playfair font-semibold text-sm text-gray-900">Wood Pressed Groundnut Oil · {selectedSize.label}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <StarRow rating={4.9} size={11} />
            <span className="text-[11px] text-gray-400">4.9 · 1,240 reviews</span>
          </div>
        </div>
        <span className="font-playfair font-bold text-xl text-forest-600 ml-auto flex-shrink-0">
          ₹{selectedSize.price}
        </span>
        <button
          onClick={handleAddToCart}
          className={`flex items-center gap-2 font-dm font-bold text-sm px-5 py-2.5 rounded-xl flex-shrink-0 transition-all ${
            added ? "bg-forest text-white" : "bg-forest hover:bg-forest-600 text-white"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </>
  );
}

"use client";

import { Profiler, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User, MapPin, ShoppingBag, Heart, Wallet, Bell, LogOut,
  ChevronRight, Plus, Pencil, Trash2, CheckCircle2, Clock,
  Truck, Package, RotateCcw, Star, Leaf, Phone, Mail,
  Calendar, Shield, Settings, Camera, Check, X, Copy,
} from "lucide-react";
import { ProfileSection } from "@/src/components/profile_account/ProfileSection";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/auth.store";
import { fmt } from "@/src/lib/utils";
import ProfileSidebar from "@/src/components/profile_account/SideBar";
import { AddressesSection } from "@/src/components/profile_account/AddressSection";
import { OrdersSection } from "@/src/components/profile_account/OrdersSection";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
export type Tab = "profile" | "orders" | "addresses" | "wishlist" | "wallet" 
// | "notifications";
export const NAV: { id: Tab; label: string; icon: React.ElementType; badge?: number }[] = [
  { id: "profile", label: "My Profile", icon: User },
  { id: "orders", label: "My Orders", icon: ShoppingBag, badge: 1 },
  { id: "addresses", label: "Saved Addresses", icon: MapPin },
  // { id: "wishlist", label: "Wishlist", icon: Heart, badge: 4 },
  // { id: "wallet", label: "Wallet & Credits", icon: Wallet },
  // { id: "notifications", label: "Notifications", icon: Bell },
];



interface Address {
  id: string; label: string; name: string; phone: string;
  line1: string; line2?: string; city: string; state: string;
  pincode: string; isDefault: boolean;
}

interface OrderItem { name: string; qty: number; price: number; image: string }
interface Order {
  id: string; date: string; total: number; status: "delivered" | "shipped" | "processing" | "cancelled" | "returned";
  items: OrderItem[]; paymentMethod: string; trackingId?: string;
}

interface WishlistItem { id: string; name: string; price: number; originalPrice?: number; image: string; inStock: boolean }

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const USER = {
  name: "Priya Sharma", phone: "+91 98765 43210", email: "priya.sharma@gmail.com",
  joinDate: "Member since March 2023", avatar: "PS",
  stats: { orders: 12, savedAddresses: 3, loyaltyPoints: 840 },
};



const ORDERS: Order[] = [
  { id: "SAT-24081", date: "12 Apr 2025", total: 980, status: "delivered", paymentMethod: "UPI", trackingId: "DTDC00123456", items: [{ name: "Groundnut Oil 1L", qty: 2, price: 700, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=120&q=80" }, { name: "Jaggery Powder 500g", qty: 1, price: 180, image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=120&q=80" }] },
  { id: "SAT-24067", date: "28 Mar 2025", total: 420, status: "shipped", paymentMethod: "COD", trackingId: "DTDC00098234", items: [{ name: "Virgin Coconut Oil 500ml", qty: 1, price: 420, image: "https://images.unsplash.com/photo-1526346698789-22fd84314424?w=120&q=80" }] },
  { id: "SAT-24050", date: "10 Mar 2025", total: 560, status: "processing", paymentMethod: "Card", items: [{ name: "Mustard Oil 1L", qty: 2, price: 560, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=80" }] },
  { id: "SAT-24031", date: "14 Feb 2025", total: 270, status: "cancelled", paymentMethod: "UPI", items: [{ name: "Rock Salt 500g", qty: 1, price: 120, image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=120&q=80" }, { name: "Cane Sugar 500g", qty: 1, price: 150, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=120&q=80" }] },
  { id: "SAT-24015", date: "2 Jan 2025", total: 350, status: "returned", paymentMethod: "UPI", items: [{ name: "Sunflower Oil 1L", qty: 1, price: 310, image: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=120&q=80" }] },
];

const WISHLIST: WishlistItem[] = [
  { id: "w1", name: "Wood Pressed Groundnut Oil 2L", price: 650, originalPrice: 780, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=80", inStock: true },
  { id: "w2", name: "Extra Virgin Olive Oil 250ml", price: 680, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=80", inStock: true },
  { id: "w3", name: "Organic Coconut Sugar 500g", price: 220, originalPrice: 260, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80", inStock: false },
  { id: "w4", name: "Cold Pressed Sesame Oil 500ml", price: 390, image: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=300&q=80", inStock: true },
];

const TRANSACTIONS = [
  { id: "t1", label: "Cashback — Order SAT-24081", date: "12 Apr 2025", amount: +49, type: "credit" },
  { id: "t2", label: "Redeemed — Order SAT-24067", date: "28 Mar 2025", amount: -100, type: "debit" },
  { id: "t3", label: "Referral bonus — Anjali K.", date: "20 Mar 2025", amount: +200, type: "credit" },
  { id: "t4", label: "Cashback — Order SAT-24050", date: "10 Mar 2025", amount: +28, type: "credit" },
  { id: "t5", label: "Redeemed — Order SAT-24031", date: "14 Feb 2025", amount: -150, type: "debit" },
];



/* ─────────────────────────────────────────────
   STATUS CONFIG
───────────────────────────────────────────── */
const statusConfig = {
  delivered: { label: "Delivered", color: "text-green-700 bg-green-50 border-green-100", icon: CheckCircle2 },
  shipped: { label: "On the way", color: "text-blue-700 bg-blue-50 border-blue-100", icon: Truck },
  processing: { label: "Processing", color: "text-amber-700 bg-amber-50 border-amber-100", icon: Clock },
  cancelled: { label: "Cancelled", color: "text-red-600 bg-red-50 border-red-100", icon: X },
  returned: { label: "Returned", color: "text-purple-700 bg-purple-50 border-purple-100", icon: RotateCcw },
};






/* ── Orders ── */




/* ── Wishlist ── */
function WishlistSection() {
  const [items, setItems] = useState<WishlistItem[]>(WISHLIST);
  const [added, setAdded] = useState<string[]>([]);

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const addToCart = (id: string) => {
    setAdded((prev) => [...prev, id]);
    setTimeout(() => setAdded((prev) => prev.filter((i) => i !== id)), 2000);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-brand-earth font-body">{items.length} items saved</p>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        {items.map((item) => (
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

/* ── Wallet ── */
function WalletSection() {
  const balance = TRANSACTIONS.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-5">
      {/* Balance card */}
      <div className="bg-gradient-to-br from-brand-gold to-brand-gold-light rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute right-4 top-4 opacity-10 text-[100px] leading-none select-none">₹</div>
        <p className="text-xs font-body font-semibold uppercase tracking-widest text-white/70 mb-1">Satvik Wallet Balance</p>
        <p className="font-display text-4xl font-bold mb-1">{fmt(balance)}</p>
        <p className="text-xs text-white/70 font-body">Use at checkout · No expiry</p>
        <div className="mt-5 flex gap-3">
          <button className="flex-1 py-2.5 rounded-xl bg-white text-brand-gold text-sm font-semibold font-body hover:bg-brand-cream transition-colors">
            Add Money
          </button>
          <button className="flex-1 py-2.5 rounded-xl bg-white/20 text-white text-sm font-semibold font-body hover:bg-white/30 transition-colors">
            Transfer
          </button>
        </div>
      </div>

      {/* Loyalty points */}
      <div className="bg-brand-off-white rounded-2xl border border-brand-ivory p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-display text-sm font-semibold text-brand-forest">Loyalty Points</p>
            <p className="text-xs text-brand-earth/60 font-body">1 point = ₹1 off on your next order</p>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl font-bold text-brand-gold">{USER.stats.loyaltyPoints}</p>
            <p className="text-[10px] text-brand-earth/50 font-body">pts available</p>
          </div>
        </div>
        {/* Progress to next reward */}
        <div className="mb-2 flex justify-between text-[11px] text-brand-earth/60 font-body">
          <span>{USER.stats.loyaltyPoints} pts</span>
          <span>1000 pts → ₹100 voucher</span>
        </div>
        <div className="h-2 bg-brand-ivory rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-gold to-brand-gold-light" style={{ width: `${(USER.stats.loyaltyPoints / 1000) * 100}%` }} />
        </div>
        <p className="text-[11px] text-brand-earth/60 mt-1.5 font-body">{1000 - USER.stats.loyaltyPoints} pts more to unlock ₹100 voucher</p>
      </div>

      {/* Transactions */}
      <div className="bg-brand-off-white rounded-2xl border border-brand-ivory overflow-hidden">
        <div className="px-5 py-4 border-b border-brand-ivory">
          <h3 className="font-display text-sm font-semibold text-brand-forest">Transaction History</h3>
        </div>
        <div className="divide-y divide-brand-ivory">
          {TRANSACTIONS.map((t) => (
            <div key={t.id} className="flex items-center gap-3 px-5 py-3.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${t.type === "credit" ? "bg-green-50" : "bg-red-50"}`}>
                <span className={`text-sm ${t.type === "credit" ? "text-green-700" : "text-red-600"}`}>{t.type === "credit" ? "+" : "−"}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-brand-forest font-body truncate">{t.label}</p>
                <p className="text-[11px] text-brand-earth/50 font-body">{t.date}</p>
              </div>
              <span className={`text-sm font-bold font-display shrink-0 ${t.type === "credit" ? "text-green-700" : "text-red-600"}`}>
                {t.type === "credit" ? "+" : "−"}{fmt(Math.abs(t.amount))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Notifications ── */
function NotificationsSection() {
  const [prefs, setPrefs] = useState({
    orderUpdates: true, promotions: false, newArrivals: true,
    weeklyDigest: false, whatsapp: true, sms: true, email: false,
  });

  const toggle = (key: keyof typeof prefs) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const Toggle = ({ k }: { k: keyof typeof prefs }) => (
    <button onClick={() => toggle(k)}
      className={`w-11 h-6 rounded-full transition-all duration-200 relative shrink-0 ${prefs[k] ? "bg-brand-forest" : "bg-brand-earth/20"}`}>
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${prefs[k] ? "left-6" : "left-1"}`} />
    </button>
  );

  return (
    <div className="space-y-5">
      {[
        {
          title: "What to notify me about",
          items: [
            { key: "orderUpdates", label: "Order Updates", sub: "Shipping, delivery, and status changes" },
            { key: "promotions", label: "Offers & Promotions", sub: "Deals, coupons, and sale alerts" },
            { key: "newArrivals", label: "New Arrivals", sub: "New products in our catalog" },
            { key: "weeklyDigest", label: "Weekly Digest", sub: "Weekly health tips & new recipes" },
          ],
        },
        {
          title: "How to reach me",
          items: [
            { key: "whatsapp", label: "WhatsApp", sub: "Get updates on WhatsApp" },
            { key: "sms", label: "SMS", sub: "Receive text messages" },
            { key: "email", label: "Email", sub: `Notifications to ${USER.email}` },
          ],
        },
      ].map((group) => (
        <div key={group.title} className="bg-brand-off-white rounded-2xl border border-brand-ivory overflow-hidden">
          <div className="px-5 py-4 border-b border-brand-ivory">
            <h3 className="font-display text-sm font-semibold text-brand-forest">{group.title}</h3>
          </div>
          <div className="divide-y divide-brand-ivory">
            {group.items.map((item) => (
              <div key={item.key} className="flex items-center gap-3 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-brand-forest font-body">{item.label}</p>
                  <p className="text-xs text-brand-earth/60 font-body">{item.sub}</p>
                </div>
                <Toggle k={item.key as keyof typeof prefs} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════ */
export default function ProfilePage() {
  const router = useRouter()
  const { user, fetchCurrentUser, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState<Tab>("profile");


  const sectionTitle: Record<Tab, string> = {
    profile: "My Profile",
    orders: "My Orders",
    addresses: "Saved Addresses",
    wishlist: "My Wishlist",
    wallet: "Wallet & Credits",
    // notifications: "Notifications",
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <header className="bg-white border-b border-cream-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <img src="/logo.png" className=" h-16" alt="" />
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/")}
            className="text-xs font-dm font-semibold text-earth-400 hover:text-forest-500 transition-colors">
            ← {"Back to Store"}
          </button>

        </div>
      </header>


      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <div className="flex gap-6 lg:gap-8">

          {/* ── Sidebar ── */}
          <ProfileSidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} logout={logout} NAV={NAV} />

          {/* ── Mobile Tab bar ── */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-brand-off-white border-t border-brand-ivory px-2 py-2 flex gap-1 justify-around">
            {NAV.slice(0, 5).map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-colors relative ${activeTab === item.id ? "text-brand-forest" : "text-brand-earth/50"}`}>
                <item.icon size={18} />
                <span className="text-[9px] font-body">{item.label.split(" ")[0]}</span>
                {item.badge && <span className="absolute top-0 right-1 w-3.5 h-3.5 rounded-full bg-brand-terracotta text-white text-[8px] font-bold flex items-center justify-center">{item.badge}</span>}
              </button>
            ))}
          </div>

          {/* ── Main content ── */}
          <main className="flex-1 min-w-0 pb-24 md:pb-0">
            {/* Section header */}
            <div className="flex items-center gap-3 mb-5">
              <h1 className="font-display text-2xl font-bold text-forest">{sectionTitle[activeTab]}</h1>
              {activeTab === "orders" && (
                <span className="text-xs bg-terracotta text-white px-2 py-0.5 rounded-full font-body font-semibold">
                  {ORDERS.filter((o) => o.status === "shipped").length} active
                </span>
              )}
            </div>

            {/* Sections */}
            {activeTab === "profile" && <ProfileSection />}
            {activeTab === "orders" && <OrdersSection />}
            {activeTab === "addresses" && <AddressesSection />}
            {activeTab === "wishlist" && <WishlistSection />}
            {activeTab === "wallet" && <WalletSection />}
            {/* {activeTab === "notifications" && <NotificationsSection />} */}
          </main>
        </div>
      </div>
    </div>
  );
}
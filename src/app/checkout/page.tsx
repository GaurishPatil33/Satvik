"use client";

import { useState } from "react";
import {
  ShieldCheck, Truck, RotateCcw, CheckCircle, Copy, Check,
  ChevronRight, CreditCard, Smartphone, Landmark, Wallet, Banknote,
  Package, MapPin, User, Lock, Zap, Calendar
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
type Step = 1 | 2 | 3 | 4;
type PayMethod = "upi" | "card" | "netbanking" | "wallet" | "cod";
type DeliveryType = "standard" | "express" | "scheduled";

interface CartItem {
  emoji: string;
  name: string;
  sub: string;
  qty: number;
  price: number;
  bg: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const CART_ITEMS: CartItem[] = [
  { emoji: "🫒", name: "Wood Pressed Groundnut Oil", sub: "1000ml · Cold-Pressed", qty: 1, price: 350, bg: "bg-amber-50" },
  { emoji: "🥥", name: "Virgin Coconut Oil", sub: "500ml · Unrefined", qty: 2, price: 440, bg: "bg-cream-200" },
  { emoji: "🍫", name: "Palm Jaggery", sub: "500g · Organic", qty: 1, price: 180, bg: "bg-yellow-50" },
];

const SUBTOTAL = CART_ITEMS.reduce((a, c) => a + c.price, 0); // 970

const DELIVERY_OPTIONS = [
  { id: "standard" as DeliveryType, icon: <Truck className="w-5 h-5" />, name: "Standard Delivery", sub: "Thu, 20 Mar – Fri, 21 Mar", price: 0 },
  { id: "express" as DeliveryType, icon: <Zap className="w-5 h-5" />, name: "Express Delivery", sub: "Tomorrow · Before 8 PM", price: 49 },
  { id: "scheduled" as DeliveryType, icon: <Calendar className="w-5 h-5" />, name: "Scheduled Delivery", sub: "Choose your date & time slot", price: 29 },
];

const UPI_APPS = [
  { icon: "🟢", name: "GPay" }, { icon: "🟣", name: "PhonePe" },
  { icon: "🔵", name: "Paytm" }, { icon: "🟡", name: "BHIM" }, { icon: "🔴", name: "Amazon" },
];

const BANKS = [
  { icon: "🔵", name: "HDFC" }, { icon: "🟠", name: "SBI" },
  { icon: "🔴", name: "ICICI" }, { icon: "🟢", name: "Axis" },
  { icon: "🟣", name: "Kotak" }, { icon: "⚫", name: "Other" },
];

const STEPS = ["Contact", "Delivery", "Payment", "Confirmed"];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function StepCircle({ n, current }: { n: number; current: Step }) {
  const done = n < current;
  const active = n === current;
  return (
    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0
      ${done ? "bg-forest/60 border-forest/40 text-white" : ""}
      ${active ? "bg-forest/80 border-forest text-white shadow-lg shadow-forest/25 ring-4 ring-forest/45" : ""}
      ${!done && !active ? "bg-white border-cream text-gray-300" : ""}`}
    >
      {done ? <Check className="w-3.5 h-3.5" /> : n}
    </div>
  );
}

function SummaryPanel({ label, value, onClick }: { label: string; value: string; onClick: () => void }) {
  return (
    <div className="bg-white border border-cream-200 rounded-2xl mb-3 overflow-hidden">
      <div className="px-5 py-3.5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <CheckCircle className="w-4 h-4 text-forest-500" />
            <span className="font-playfair font-bold text-sm text-gray-800">{label}</span>
          </div>
          <p className="text-xs text-gray-400 font-dm ml-6">{value}</p>
        </div>
        <button onClick={onClick} className="text-xs font-dm font-bold text-forest-500 hover:text-forest transition-colors">Edit</button>
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const [step, setStep] = useState<Step>(1);

  // Contact
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState(true);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // Delivery
  const [selectedAddr, setSelectedAddr] = useState(0);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("standard");
  const [showNewAddr, setShowNewAddr] = useState(false);

  // Payment
  const [payMethod, setPayMethod] = useState<PayMethod>("upi");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [selectedUpiApp, setSelectedUpiApp] = useState<string | null>(null);

  // UI states
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [copied, setCopied] = useState(false);

  // Computed totals
  const deliveryFee = deliveryType === "express" ? 49 : deliveryType === "scheduled" ? 29 : 0;
  const codFee = payMethod === "cod" ? 29 : 0;
  const discount = couponApplied ? Math.round(SUBTOTAL * 0.1) : 0;
  const total = SUBTOTAL - discount + deliveryFee + codFee;

  // ── Validation ──
  function validateStep1() {
    const newErrors: Record<string, boolean> = {};
    if (!firstName.trim()) newErrors.firstName = true;
    if (!lastName.trim()) newErrors.lastName = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = true;
    if (!/^\d{10}$/.test(phone.replace(/\s/g, ""))) newErrors.phone = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function advanceStep(next: Step) {
    if (next > step) {
      if (step === 1 && !validateStep1()) return;
    }
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Coupon ──
  function applyCoupon() {
    if (couponCode.toUpperCase() === "SATVIK10") {
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 1500);
    }
  }

  // ── Place order ──
  async function placeOrder() {
    setPlacing(true);
    await new Promise(r => setTimeout(r, 2000));
    setPlacing(false);
    setPlaced(true);
    setStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Card format ──
  function fmtCard(v: string) {
    return v.replace(/\D/g, "").substring(0, 16).replace(/(.{4})/g, "$1  ").trim();
  }
  function fmtExpiry(v: string) {
    const d = v.replace(/\D/g, "");
    return d.length >= 2 ? d.substring(0, 2) + " / " + d.substring(2, 4) : d;
  }

  // ── Confirmed screen ──
  if (placed) {
    return (
      <div className="min-h-screen bg-cream-50 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-cream-200 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-forest-500 rounded-full flex items-center justify-center text-sm">🌿</div>
            <span className="font-playfair font-bold text-lg text-forest-700">Satvik</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-dm font-bold text-forest-500 bg-forest-50 border border-forest-200 px-3 py-1.5 rounded-full">
            <Lock className="w-3 h-3" /> Secure Checkout
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center px-5 py-12">
          <div className="bg-white border border-cream-200 rounded-3xl p-10 text-center max-w-lg w-full shadow-2xl shadow-black/5">
            {/* Success icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-forest-600 to-forest-400 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-xl shadow-forest-500/25"
              style={{ animation: "pop-in .5s cubic-bezier(.34,1.56,.64,1) both" }}>
              ✓
            </div>

            <p className="text-xs font-dm font-bold text-forest-500 uppercase tracking-widest mb-2">Order #STK-2024-00847</p>
            <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-3">Order Placed!</h1>
            <p className="text-sm font-dm text-gray-500 leading-relaxed mb-7">
              Thank you, <strong className="text-gray-700">{firstName || "there"}</strong>! Your order is confirmed.<br />
              Confirmation sent to <strong className="text-gray-700">{email || "your email"}</strong>
            </p>

            {/* Items recap */}
            <div className="bg-cream-100 border border-cream-200 rounded-2xl p-4 mb-5 text-left space-y-3">
              {CART_ITEMS.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className={`w-11 h-11 ${item.bg} rounded-xl border border-cream-200 flex items-center justify-center text-xl flex-shrink-0`}>{item.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-dm font-semibold text-gray-800 truncate">{item.name}</p>
                    <p className="text-[11px] text-gray-400">{item.sub} · Qty: {item.qty}</p>
                  </div>
                  <span className="font-playfair font-bold text-sm text-forest-600 flex-shrink-0">₹{item.price}</span>
                </div>
              ))}
              <div className="flex justify-between pt-3 border-t border-cream-200">
                <span className="font-playfair font-bold text-sm text-gray-900">Total Paid</span>
                <span className="font-playfair font-bold text-lg text-forest-600">₹{total}</span>
              </div>
            </div>

            {/* ETA */}
            <div className="flex items-center gap-3 bg-forest-50 border border-forest-200 rounded-xl px-4 py-3 mb-6 text-left">
              <Truck className="w-5 h-5 text-forest-500 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-dm">Estimated Delivery</p>
                <p className="text-sm font-dm font-bold text-forest-600">
                  {deliveryType === "express" ? "Tomorrow, 19 Mar · Before 8 PM" : "Thursday, 20 March · Standard Free Delivery"}
                </p>
              </div>
            </div>

            {/* Order tracker */}
            <div className="flex items-center justify-between mb-8 px-1">
              {["Confirmed", "Packed", "Shipped", "Delivered"].map((s, i) => (
                <div key={s} className="flex flex-col items-center gap-1.5 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-forest-500 text-white shadow-md shadow-forest-500/25" : "bg-cream-200 text-gray-400"}`}>
                    {i === 0 ? "✓" : ["📦", "🚚", "🎉"][i - 1]}
                  </div>
                  <span className={`text-[10px] font-dm font-semibold ${i === 0 ? "text-forest-500" : "text-gray-300"}`}>{s}</span>
                  {i < 3 && <div className="absolute h-0.5 bg-cream-200" />}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="flex-1 h-11 bg-forest-500 hover:bg-forest-600 text-white font-dm font-bold text-sm rounded-xl transition-colors">
                📦 Track Order
              </button>
              <button
                onClick={() => { setPlaced(false); setStep(1); }}
                className="flex-1 h-11 bg-white border-2 border-forest-400 text-forest-600 hover:bg-forest-50 font-dm font-bold text-sm rounded-xl transition-colors"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main checkout layout ──
  const contactSummary = `${firstName} ${lastName} · ${email} · ${phone}`.trim().replace(/^·|·$/g, '').trim();
  const addrSummary = selectedAddr === 0
    ? "42, Indiranagar 2nd Stage · Bangalore 560 038"
    : "Level 3, Diamond District, Old Airport Rd · Bangalore 560 008";

  return (
    <div className="min-h-screen bg-cream-50">

      {/* Header */}
      <header className="bg-white border-b border-cream-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <img src="/logo.png" className=" h-16" alt="" />
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => step > 1 ? advanceStep((step - 1) as Step) : null}
            className="text-xs font-dm font-semibold text-earth-400 hover:text-forest-500 transition-colors">
            ← {step === 1 ? "Back to cart" : "Back"}
          </button>
          <div className="flex items-center gap-1.5 text-xs font-dm font-bold text-forest-500 bg-forest-50 border border-forest-200 px-3 py-1.5 rounded-full">
            <Lock className="w-3 h-3" /> Secure Checkout
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-4xl mx-auto px-5 flex items-center">
          {STEPS.map((label, i) => {
            const n = i + 1;
            return (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => n < step ? advanceStep(n as Step) : undefined}
                  className="flex flex-col items-center py-4 gap-1.5 min-w-[70px]"
                >
                  <StepCircle n={n} current={step} />
                  <span className={`text-[11px] font-dm font-semibold transition-colors ${n < step ? "text-forest" : n === step ? "text-fores" : "text-gray-300"}`}>
                    {label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 mb-3 transition-colors duration-300 ${n < step ? "bg-forest" : "bg-cream"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-5 py-7 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

        {/* ── LEFT ── */}
        <div>

          {/* ── STEP 1: Contact ── */}
          {step === 1 && (
            <div className="bg-white border border-cream-200 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-cream-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-forest-50 rounded-xl flex items-center justify-center"><User className="w-4 h-4 text-forest-500" /></div>
                <span className="font-playfair font-bold text-base text-gray-900">Contact Information</span>
              </div>
              <div className="p-5">
                {/* Login nudge */}
                <div className="flex items-center gap-2 flex-wrap bg-forest-50 border border-forest-200 rounded-xl px-4 py-2.5 mb-5 text-sm font-dm">
                  <span className="text-gray-500">Already have an account?</span>
                  <button onClick={() => { setFirstName("Priya"); setLastName("Menon"); setEmail("priya.menon@gmail.com"); setPhone("9876543210"); }}
                    className="font-bold text-forest-500 hover:text-forest-600 underline transition-colors text-xs">
                    Log in for faster checkout
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  {([["First Name", firstName, setFirstName, "firstName", "Priya"],
                  ["Last Name", lastName, setLastName, "lastName", "Menon"]] as const).map(([label, val, setter, key, ph]) => (
                    <div key={key} className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-dm font-bold text-gray-500 uppercase tracking-wider">{label} *</label>
                      <input
                        value={val} onChange={e => setter(e.target.value)}
                        placeholder={ph}
                        className={`border rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none transition-all ${errors[key] ? "border-red-400 bg-red-50 focus:ring-red-200" : "border-cream-300 focus:border-forest-400 focus:ring-forest-500/10"} focus:ring-4`}
                      />
                      {errors[key] && <p className="text-[11px] text-red-500">Required</p>}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5 mb-3">
                  <label className="text-[11px] font-dm font-bold text-gray-500 uppercase tracking-wider">Email Address *</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="priya@email.com"
                    className={`border rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none transition-all ${errors.email ? "border-red-400 bg-red-50 focus:ring-red-200" : "border-cream-300 focus:border-forest-400 focus:ring-forest-500/10"} focus:ring-4`}
                  />
                  {errors.email ? <p className="text-[11px] text-red-500">Valid email required</p> : <p className="text-[11px] text-gray-400">Order confirmation sent here</p>}
                </div>

                <div className="flex flex-col gap-1.5 mb-4">
                  <label className="text-[11px] font-dm font-bold text-gray-500 uppercase tracking-wider">Phone *</label>
                  <div className="flex gap-2">
                    <select className="border border-cream-300 rounded-xl px-3 py-2.5 font-dm text-sm outline-none bg-white w-20 flex-shrink-0">
                      <option>+91</option><option>+1</option><option>+44</option>
                    </select>
                    <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="98765 43210"
                      className={`flex-1 border rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none transition-all ${errors.phone ? "border-red-400 bg-red-50" : "border-cream-300 focus:border-forest-400 focus:ring-forest-500/10"} focus:ring-4`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-500">Valid 10-digit number required</p>}
                </div>

                <label className="flex items-center gap-2 cursor-pointer mb-2">
                  <input type="checkbox" checked={whatsapp} onChange={e => setWhatsapp(e.target.checked)} className="accent-forest-500 w-4 h-4" />
                  <span className="text-xs font-dm text-gray-500">Send order updates on WhatsApp</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer mb-5">
                  <input type="checkbox" className="accent-forest-500 w-4 h-4" />
                  <span className="text-xs font-dm text-gray-500">Subscribe to Satvik health tips & exclusive offers</span>
                </label>

                <button onClick={() => advanceStep(2)} className="w-full h-12 bg-forest/80 hover:bg-forest text-white font-dm font-bold text-[15px] rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-forest/25 flex items-center justify-center gap-2">
                  Continue to Delivery <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Delivery ── */}
          {step === 2 && (
            <>
              <SummaryPanel label="Contact" value={contactSummary} onClick={() => advanceStep(1)} />

              <div className="bg-white border border-cream-200 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-cream-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center"><MapPin className="w-4 h-4 text-amber-500" /></div>
                  <span className="font-playfair font-bold text-base text-gray-900">Delivery Address</span>
                </div>
                <div className="p-5">
                  {/* Saved addresses */}
                  <div className="space-y-2.5 mb-3">
                    {[
                      { name: "Priya Menon", addr: "42, Indiranagar 2nd Stage, HAL 2nd Stage\nBangalore – 560 038, Karnataka", badge: "Home", badgeColor: "bg-amber-100 text-amber-700" },
                      { name: "Priya Menon (Office)", addr: "Level 3, Diamond District, Old Airport Rd\nBangalore – 560 008, Karnataka", badge: "Office", badgeColor: "bg-forest-100 text-forest-600" },
                    ].map((a, i) => (
                      <div key={i} onClick={() => setSelectedAddr(i)}
                        className={`border-2 rounded-xl p-4 cursor-pointer flex gap-3 items-start relative transition-all duration-200 ${selectedAddr === i ? "border-forest-500 bg-forest-50 shadow-md shadow-forest-500/10" : "border-cream-300 hover:border-forest-300"}`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center transition-all ${selectedAddr === i ? "border-forest-500 bg-forest-500" : "border-cream-300"}`}>
                          {selectedAddr === i && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <div>
                          <p className="font-dm font-bold text-sm text-gray-800 mb-0.5">{a.name}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{a.addr.split("\n").map((line, j) => <span key={j}>{line}<br /></span>)}</p>
                        </div>
                        <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${a.badgeColor}`}>{a.badge}</span>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => setShowNewAddr(!showNewAddr)}
                    className="w-full border-2 border-dashed border-cream-300 hover:border-forest-400 hover:bg-forest-50 rounded-xl py-3 px-4 flex items-center gap-2 text-sm font-dm font-semibold text-forest-500 transition-all mb-5">
                    <span className="text-lg">＋</span> Add a new address
                  </button>

                  {showNewAddr && (
                    <div className="border-t border-cream-200 pt-5 mb-5 space-y-3">
                      <p className="text-[11px] font-dm font-bold text-gray-400 uppercase tracking-widest">New Address</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Full Name *</label><input placeholder="Priya Menon" className="w-full border border-cream-300 rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none focus:border-forest-400 transition-colors" /></div>
                        <div><label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Phone *</label><input placeholder="98765 43210" type="tel" className="w-full border border-cream-300 rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none focus:border-forest-400 transition-colors" /></div>
                      </div>
                      <div><label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Address Line 1 *</label><input placeholder="House/Flat No., Building, Street" className="w-full border border-cream-300 rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none focus:border-forest-400 transition-colors" /></div>
                      <div><label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Address Line 2</label><input placeholder="Area, Locality, Landmark" className="w-full border border-cream-300 rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none focus:border-forest-400 transition-colors" /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">City *</label><input placeholder="Bangalore" className="w-full border border-cream-300 rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none focus:border-forest-400 transition-colors" /></div>
                        <div><label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">PIN Code *</label><input placeholder="560038" maxLength={6} className="w-full border border-cream-300 rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none focus:border-forest-400 transition-colors" /></div>
                      </div>
                    </div>
                  )}

                  {/* Delivery method */}
                  <p className="text-[11px] font-dm font-bold text-gray-400 uppercase tracking-widest mb-3">Delivery Method</p>
                  <div className="space-y-2 mb-5">
                    {DELIVERY_OPTIONS.map((opt) => (
                      <div key={opt.id} onClick={() => setDeliveryType(opt.id)}
                        className={`border-2 rounded-xl p-3.5 cursor-pointer flex items-center gap-3 transition-all duration-200 ${deliveryType === opt.id ? "border-forest/60 bg-gold/5 shadow-md shadow-forest-500/10" : "border-cream-300 hover:border-forest-300"}`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${deliveryType === opt.id ? "border-forest bg-forest/60" : "border-cream"}`}>
                          {deliveryType === opt.id && <div className="w-1.5 h-1.5  rounded-full" />}
                        </div>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${deliveryType === opt.id ? "text-forest-500 bg-forest-100" : "text-gray-400 bg-cream-100"}`}>{opt.icon}</div>
                        <div className="flex-1">
                          <p className="font-dm font-bold text-sm text-gray-800">{opt.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{opt.sub}</p>
                        </div>
                        <div className={`font-playfair font-bold text-sm flex-shrink-0 ${opt.price === 0 ? "text-green-600" : "text-gray-700"}`}>
                          {opt.price === 0 ? "FREE" : `₹${opt.price}`}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-5">
                    <label className="text-[11px] font-dm font-bold text-gray-400 uppercase tracking-widest mb-2 block">Delivery Instructions (Optional)</label>
                    <textarea placeholder="Leave at door · Ring bell · Call on arrival…" className="w-full border border-cream-300 rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none focus:border-forest-400 transition-colors resize-none min-h-[60px]" />
                  </div>

                  <button onClick={() => advanceStep(3)} className="w-full h-12 bg-forest/80 hover:bg-forest text-white font-dm font-bold text-[15px] rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-forest-500/25 flex items-center justify-center gap-2">
                    Continue to Payment <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 3: Payment ── */}
          {step === 3 && (
            <>
              <SummaryPanel label="Contact" value={contactSummary} onClick={() => advanceStep(1)} />
              <SummaryPanel label="Delivering to" value={`${addrSummary} · ${DELIVERY_OPTIONS.find(d => d.id === deliveryType)?.name}`} onClick={() => advanceStep(2)} />

              <div className="bg-white border border-cream-200 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-cream-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center"><CreditCard className="w-4 h-4 text-amber-500" /></div>
                  <span className="font-playfair font-bold text-base text-gray-900">Payment</span>
                </div>
                <div className="p-5">

                  {/* Coupon */}
                  <p className="text-[11px] font-dm font-bold text-gray-400 uppercase tracking-widest mb-2.5">Apply Coupon</p>
                  {couponApplied ? (
                    <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 mb-4 text-sm font-dm font-semibold text-green-700">
                      <Check className="w-4 h-4" />
                      <span><strong>SATVIK10</strong> applied — You save ₹{Math.round(SUBTOTAL * 0.1)}!</span>
                      <button onClick={() => { setCouponApplied(false); setCouponCode(""); }} className="ml-auto text-green-600 hover:text-green-700 font-bold text-xs">✕</button>
                    </div>
                  ) : (
                    <div className={`flex gap-2 mb-4 ${couponError ? "animate-shake" : ""}`}>
                      <input value={couponCode} onChange={e => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Enter coupon code"
                        onKeyDown={e => e.key === "Enter" && applyCoupon()}
                        className={`flex-1 border rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none transition-all min-w-0 ${couponError ? "border-red-400 bg-red-50" : "border-cream-300 focus:border-forest-400 focus:ring-4 focus:ring-forest-500/10"}`}
                      />
                      <button onClick={applyCoupon} className="bg-forest-500 hover:bg-forest-600 text-white font-dm font-bold text-sm px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap">Apply</button>
                    </div>
                  )}

                  <div className="h-px bg-cream-200 mb-4" />
                  <p className="text-[11px] font-dm font-bold text-gray-400 uppercase tracking-widest mb-3">Choose Payment</p>

                  {/* Payment methods */}
                  <div className="space-y-2.5">

                    {/* UPI */}
                    {([
                      { id: "upi" as PayMethod, icon: <Smartphone className="w-4 h-4" />, name: "UPI", sub: "GPay, PhonePe, Paytm & more", badges: ["Instant", "Recommended"], badgeClasses: ["bg-green-50 text-green-700 border-green-200", "bg-amber-50 text-amber-700 border-amber-200"] },
                      { id: "card" as PayMethod, icon: <CreditCard className="w-4 h-4" />, name: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay, Amex", badges: ["Visa", "MC", "RuPay"], badgeClasses: [] },
                      { id: "netbanking" as PayMethod, icon: <Landmark className="w-4 h-4" />, name: "Net Banking", sub: "All major banks supported", badges: [], badgeClasses: [] },
                      { id: "wallet" as PayMethod, icon: <Wallet className="w-4 h-4" />, name: "Wallets", sub: "Paytm Wallet, Amazon Pay, Mobikwik", badges: [], badgeClasses: [] },
                      { id: "cod" as PayMethod, icon: <Banknote className="w-4 h-4" />, name: "Cash on Delivery", sub: "Pay when you receive your order", badges: ["+₹29 fee"], badgeClasses: ["bg-red-50 text-red-700 border-red-200"] },
                    ] as const).map((pm) => (
                      <div key={pm.id}
                        className={`border-2 rounded-2xl overflow-hidden transition-all duration-200 ${payMethod === pm.id ? "border-forest-500" : "border-cream-300 hover:border-cream-400"}`}
                      >
                        <div onClick={() => setPayMethod(pm.id)} className="flex items-center gap-3 px-4 py-3.5 cursor-pointer">
                          <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${payMethod === pm.id ? "border-forest-500 bg-forest-500" : "border-cream-300"}`}>
                            {payMethod === pm.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${payMethod === pm.id ? "bg-forest-100 text-forest-500" : "bg-cream-100 text-gray-400"}`}>{pm.icon}</div>
                          <div className="flex-1 min-w-0">
                            <p className="font-dm font-bold text-sm text-gray-800">{pm.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{pm.sub}</p>
                          </div>
                          <div className="flex gap-1.5 flex-wrap justify-end">
                            {pm.badges.map((b, bi) => (
                              <span key={b} className={`text-[9px] font-bold border px-1.5 py-0.5 rounded ${pm.badgeClasses[bi] || "bg-cream-100 text-gray-400 border-cream-300"}`}>{b}</span>
                            ))}
                          </div>
                        </div>

                        {payMethod === pm.id && (
                          <div className="px-4 pb-4 pt-1 border-t border-cream-100">

                            {pm.id === "upi" && (
                              <>
                                <div className="flex gap-2 flex-wrap mt-2">
                                  {UPI_APPS.map((app) => (
                                    <button key={app.name} onClick={() => setSelectedUpiApp(app.name)}
                                      className={`flex flex-col items-center gap-1.5 px-3.5 py-2.5 border-2 rounded-xl transition-all ${selectedUpiApp === app.name ? "border-forest-500 bg-forest-50" : "border-cream-300 hover:border-forest-300"}`}>
                                      <span className="text-xl">{app.icon}</span>
                                      <span className="text-[10px] font-dm font-semibold text-gray-500">{app.name}</span>
                                    </button>
                                  ))}
                                </div>
                                <div className="flex items-center gap-2 my-3">
                                  <div className="flex-1 h-px bg-cream-200" />
                                  <span className="text-[10px] font-bold text-gray-400">OR ENTER UPI ID</span>
                                  <div className="flex-1 h-px bg-cream-200" />
                                </div>
                                <div className="flex gap-2">
                                  <input value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@upi" className="flex-1 border border-cream-300 rounded-xl px-3.5 py-2 font-dm text-sm outline-none focus:border-forest-400 transition-colors" />
                                  <button className="bg-forest-500 hover:bg-forest-600 text-white font-dm font-bold text-sm px-4 py-2 rounded-xl transition-colors">Verify</button>
                                </div>
                              </>
                            )}

                            {pm.id === "card" && (
                              <div className="space-y-3 mt-2">
                                <div>
                                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Card Number</label>
                                  <input value={cardNum} onChange={e => setCardNum(fmtCard(e.target.value))} placeholder="1234  5678  9012  3456"
                                    className="w-full border border-cream-300 rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none focus:border-forest-400 transition-colors" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Expiry</label>
                                    <input value={cardExpiry} onChange={e => setCardExpiry(fmtExpiry(e.target.value))} placeholder="MM / YY"
                                      className="w-full border border-cream-300 rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none focus:border-forest-400 transition-colors" />
                                  </div>
                                  <div>
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">CVV</label>
                                    <input value={cardCvv} onChange={e => setCardCvv(e.target.value)} type="password" placeholder="•••" maxLength={4}
                                      className="w-full border border-cream-300 rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none focus:border-forest-400 transition-colors" />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Name on Card</label>
                                  <input value={cardName} onChange={e => setCardName(e.target.value.toUpperCase())} placeholder="PRIYA MENON"
                                    className="w-full border border-cream-300 rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none focus:border-forest-400 transition-colors" />
                                </div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="checkbox" defaultChecked className="accent-forest-500 w-4 h-4" />
                                  <span className="text-xs font-dm text-gray-500">Save card securely for future purchases</span>
                                </label>
                              </div>
                            )}

                            {pm.id === "netbanking" && (
                              <div className="grid grid-cols-3 gap-2 mt-3">
                                {BANKS.map((bank) => (
                                  <button key={bank.name} onClick={() => setSelectedUpiApp(bank.name)}
                                    className={`flex flex-col items-center gap-1.5 py-2.5 border-2 rounded-xl transition-all ${selectedUpiApp === bank.name ? "border-forest-500 bg-forest-50" : "border-cream-300 hover:border-forest-300"}`}>
                                    <span className="text-xl">{bank.icon}</span>
                                    <span className="text-[10px] font-dm font-semibold text-gray-500">{bank.name}</span>
                                  </button>
                                ))}
                              </div>
                            )}

                            {pm.id === "wallet" && (
                              <div className="flex gap-2 mt-3 flex-wrap">
                                {[{ icon: "🔵", name: "Paytm" }, { icon: "🟠", name: "Amazon" }, { icon: "🟣", name: "Mobikwik" }].map((w) => (
                                  <button key={w.name} onClick={() => setSelectedUpiApp(w.name)}
                                    className={`flex flex-col items-center gap-1.5 px-5 py-2.5 border-2 rounded-xl transition-all ${selectedUpiApp === w.name ? "border-forest-500 bg-forest-50" : "border-cream-300 hover:border-forest-300"}`}>
                                    <span className="text-xl">{w.icon}</span>
                                    <span className="text-[10px] font-dm font-semibold text-gray-500">{w.name}</span>
                                  </button>
                                ))}
                              </div>
                            )}

                            {pm.id === "cod" && (
                              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mt-3 text-xs font-dm text-amber-800 leading-relaxed">
                                ⚠️ COD available for orders up to ₹5,000. A handling fee of ₹29 applies. Please keep exact change ready.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

        {/* ── RIGHT: Order Summary ── */}
        <div className="lg:sticky lg:top-24">
          <div className="bg-white border border-cream-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="bg-gradient-to-br from-forest-700 to-forest-500 px-5 py-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px,white 1px,transparent 0)", backgroundSize: "18px 18px" }} />
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-400/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />
              <p className="font-playfair font-bold text-base text-white relative z-10">Order Summary</p>
              <p className="text-xs text-white/60 mt-0.5 relative z-10">3 items</p>
            </div>

            <div className="p-5">
              {/* Items */}
              <div className="space-y-3 mb-4">
                {CART_ITEMS.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${item.bg} rounded-xl border border-cream-200 flex items-center justify-center text-xl flex-shrink-0 relative`}>
                      {item.emoji}
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-forest-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{item.qty}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-dm font-semibold text-xs text-gray-800 truncate">{item.name}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{item.sub}</p>
                    </div>
                    <span className="font-playfair font-bold text-sm text-forest-600 flex-shrink-0">₹{item.price}</span>
                  </div>
                ))}
              </div>

              {/* Price lines */}
              <div className="border-t border-cream-200 pt-4 space-y-2.5">
                <div className="flex justify-between text-sm font-dm">
                  <span className="text-gray-500">Subtotal (4 items)</span>
                  <span className="font-semibold text-gray-700">₹{SUBTOTAL}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm font-dm">
                    <span className="text-gray-500">Coupon (SATVIK10)</span>
                    <span className="font-semibold text-green-600">−₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-dm">
                  <span className="text-gray-500">Delivery</span>
                  <span className={`font-semibold ${deliveryFee === 0 ? "text-green-600" : "text-gray-700"}`}>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
                {codFee > 0 && (
                  <div className="flex justify-between text-sm font-dm">
                    <span className="text-gray-500">COD Handling</span>
                    <span className="font-semibold text-gray-700">₹{codFee}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-baseline pt-3.5 mt-2 border-t-2 border-cream-200">
                <span className="font-playfair font-bold text-base text-gray-900">Total</span>
                <span className="font-playfair font-bold text-2xl text-forest-600">₹{total}</span>
              </div>

              {couponApplied && discount > 0 && (
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 mt-3 text-xs font-dm font-semibold text-amber-800">
                  🎉 You&apos;re saving <strong>₹{discount}</strong> on this order!
                </div>
              )}

              {/* Place order - only on step 3 */}
              {step === 3 && (
                <>
                  <button
                    onClick={placeOrder}
                    disabled={placing}
                    className="w-full h-13 mt-4 bg-gradient-to-br from-forest-600 to-forest-500 hover:from-forest-700 hover:to-forest-600 disabled:opacity-80 text-white font-dm font-bold text-base rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-forest-500/30 flex items-center justify-center gap-2.5 py-3.5 relative overflow-hidden"
                    style={{ height: "52px" }}
                  >
                    {placing ? (
                      <><span className="animate-spin text-lg">⏳</span> Processing…</>
                    ) : (
                      <><Lock className="w-4 h-4" /> Place Order · ₹{total}</>
                    )}
                  </button>
                  <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 mt-2.5 font-dm">
                    <ShieldCheck className="w-3.5 h-3.5" /> 256-bit SSL encrypted · PCI DSS compliant
                  </p>
                </>
              )}
            </div>

            {/* Trust footer */}
            <div className="border-t border-cream-100 px-5 py-3 flex flex-wrap gap-3">
              {[{ icon: <ShieldCheck className="w-3.5 h-3.5" />, t: "Secure" }, { icon: <RotateCcw className="w-3.5 h-3.5" />, t: "7-day Return" }, { icon: <Truck className="w-3.5 h-3.5" />, t: "Free Delivery" }].map(({ icon, t }) => (
                <div key={t} className="flex items-center gap-1.5 text-[11px] font-dm font-semibold text-gray-400">{icon}{t}</div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

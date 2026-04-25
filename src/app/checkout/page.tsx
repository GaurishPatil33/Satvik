"use client";

import { useEffect, useState } from "react";
import {
  ShieldCheck, Truck, RotateCcw, CheckCircle, Copy, Check,
  ChevronRight, CreditCard, Smartphone, Landmark, Wallet, Banknote,
  Package, MapPin, User, Lock, Zap, Calendar
} from "lucide-react";
import { useCartStore } from "@/src/store/cart.store";
import Image from "next/image";
import { SummaryPanel } from "@/src/components/checkout/SummaryPanel";
import OrderSummary from "@/src/components/checkout/OrderSummary";
import SuccessMessage from "../../components/checkout/Success";
import CheckoutProgress from "@/src/components/checkout/Progress";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/auth.store";
import { fmtCard, fmtExpiry } from "@/src/lib/utils";
import { getUserAddresses } from "@/src/services/address.service";
import { IAddress } from "@/src/types/user-types";
import { createOrder } from "@/src/services/order.service";

// ─── Types ──────────────────────────────────────────────────────────────────
type Step = 1 | 2 | 3
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

interface AddressformData {
  // id?: string;
  // user_id: string;
  full_name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;

}

// ─── Data ────────────────────────────────────────────────────────────────────

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

const STEPS = [
  // "Contact",
  "Delivery", "Payment", "Confirmed"];

export default function CheckoutPage() {
  const router = useRouter()
  const { items, removeFromCart, getSubtotal, getGrandTotal, getDiscountTotal } = useCartStore()

  const { user } = useAuthStore()
  const [step, setStep] = useState<Step>(1);

  // Contact
  const [firstName, setFirstName] = useState(user ? user.first_name : "");
  const [lastName, setLastName] = useState(user ? user.last_name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [whatsapp, setWhatsapp] = useState(true);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // Delivery
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<IAddress>();
  const [loading, setLoading] = useState(true);
  const [selectedAddr, setSelectedAddr] = useState(0);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("standard");
  const [showNewAddr, setShowNewAddr] = useState(false);

  const [addressForm, setAddressForm] = useState<AddressformData>({
    full_name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    is_default: false
  })

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

  // Computed totals
  const deliveryFee = deliveryType === "express" ? 49 : deliveryType === "scheduled" ? 29 : 0;
  const codFee = payMethod === "cod" ? 29 : 0;


  const finalPrice =
    getGrandTotal() +
    deliveryFee +
    codFee

  // ── Validation ──
  // function validateStep1() {
  //   const newErrors: Record<string, boolean> = {};
  //   if (!firstName.trim()) newErrors.firstName = true;
  //   if (!lastName.trim()) newErrors.lastName = true;
  //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = true;
  //   if (!/^\d{10}$/.test(phone.replace(/\s/g, ""))) newErrors.phone = true;
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // }

  function advanceStep(next: Step) {
    // if (next > step) {
    //   // if (step === 1 && !validateStep1()) return;
    // }
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
    handlePlaceOrder()
    setPlacing(true);
    await new Promise(r => setTimeout(r, 2000));
    setPlacing(false);
    setPlaced(true);
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getUserAddresses();
        setAddresses(data)
        if (data?.length) {
          setSelectedAddr(0);
        }
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);


  const itemsPayload = items.flatMap(i => ({
    product_id: i.productId as string,
    title: i.product.title as string,
    quantity: Number(i.quantity) ,
    price_at_purchase: i.variant?.price 
  }))
  
  const addresPayload = ({
    full_name: selectedAddress?.full_name as string,
    phone: selectedAddress?.phone as string,
    street: selectedAddress?.street as string,
    city: selectedAddress?.city as string,
    state: selectedAddress?.state as string,
    postal_code: selectedAddress?.postal_code as string,
    country: selectedAddress?.country as string
  })

  const handlePlaceOrder = async () => {
    try {
      await createOrder({
        items: itemsPayload,
        shipping_address: addresPayload,
        total_amount: finalPrice
      })
    } catch (err) {
      console.log(err)
    }
  }

  // confirmation
  if (placed) return (
    <SuccessMessage firstName={firstName}
      email={email}
      items={items}
      total={finalPrice}
      deliveryType={deliveryType}
      onContinue={() => {
        setPlaced(false);
        router.push('/')
        // setStep(1);
      }} />
  )



  const addrSummary = selectedAddress ? `${selectedAddress.full_name},${selectedAddress.city}` : "No Address Selected"
  return (
    <div className="min-h-screen bg-cream-50">

      {/* Header */}
      <header className="bg-white border-b border-cream-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <img src="/logo.png" className=" h-16" alt="" />
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => step > 1 ? advanceStep((step - 1) as Step) : router.push("/")}
            className="text-xs font-dm font-semibold text-earth-400 hover:text-forest-500 transition-colors">
            ← {step === 1 ? "Back to Store" : "Back"}
          </button>
          <div className="flex items-center gap-1.5 text-xs font-dm font-bold text-forest-500 bg-forest-50 border border-forest-200 px-3 py-1.5 rounded-full">
            <Lock className="w-3 h-3" /> Secure Checkout
          </div>
        </div>
      </header>

      {/* Progress */}
      <CheckoutProgress
        steps={STEPS}
        currentStep={step}
        onStepClick={(s) => advanceStep(s)}
      />

      {/* Body */}
      <div className="max-w-4xl mx-auto px-5 py-7 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

        {/* LEFT */}
        <div>

          {/*STEP 1: Delivery address */}
          {step === 1 && (
            <>
              {/* <SummaryPanel label="Contact" value={contactSummary} onClick={() => advanceStep(1)} /> */}

              <div className="bg-white border border-cream-200 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-cream-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center"><MapPin className="w-4 h-4 text-amber-500" /></div>
                  <span className="font-playfair font-bold text-base text-gray-900">Delivery Address</span>
                </div>
                <div className="p-5">
                  {/* Saved addresses */}
                  <div className="space-y-2.5 mb-3">
                    {addresses.map((a, i) => (
                      <div key={i} onClick={() => {
                        setSelectedAddr(i)
                        setSelectedAddress(a)
                      }}
                        className={`border-2 rounded-xl p-4 cursor-pointer flex gap-3 items-start relative transition-all duration-200 ${selectedAddr === i ? "border-forest-500 bg-forest-50 shadow-md shadow-forest-500/10" : "border-cream-300 hover:border-forest-300"}`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center transition-all ${selectedAddr === i ? "border-forest-500 bg-forest-500" : "border-cream-300"}`}>
                          {selectedAddr === i && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <div>
                          <p className="font-dm font-bold text-sm text-gray-800 mb-0.5">{a.full_name}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{a.street}, {a.city},  <br />     {a.state}, {a.postal_code}, {a.country}</p>
                          <p className=" font-semibold text-sm text-gray-500 mb-0.5">{a.phone}</p>
                        </div>
                        {/* <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${a.badgeColor}`}>{a.badge}</span> */}
                      </div>
                    ))}
                  </div>

                  <button onClick={() => setShowNewAddr(!showNewAddr)}
                    className="w-full border-2 border-dashed border-cream-300 hover:border-forest-400 hover:bg-forest-50 rounded-xl py-3 px-4 flex items-center gap-2 text-sm font-dm font-semibold text-forest-500 transition-all mb-5">
                    <span className="text-lg">＋</span> Add a new address
                  </button>

                  {showNewAddr && (
                    <div className="border-t border-cream-200 pt-5 mb-5 space-y-3 animate-fade-up">
                      <p className="text-[11px] font-dm font-bold text-gray-400 uppercase tracking-widest">New Address</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Full Name *</label><input placeholder="Enter your name" className="w-full border border-cream-300 rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none focus:border-forest-400 transition-colors" /></div>
                        <div><label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Phone *</label><input placeholder="12345 67890" type="tel" className="w-full border border-cream-300 rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none focus:border-forest-400 transition-colors" /></div>
                      </div>
                      <div><label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Street *</label><input placeholder="House/Flat No., Building, Street" className="w-full border border-cream-300 rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none focus:border-forest-400 transition-colors" /></div>
                      <div><label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">City</label><input placeholder="Enter city" className="w-full border border-cream-300 rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none focus:border-forest-400 transition-colors" /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">State</label><input placeholder="Enter state" className="w-full border border-cream-300 rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none focus:border-forest-400 transition-colors" /></div>
                        <div><label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">PIN Code *</label><input placeholder="123456" maxLength={6} className="w-full border border-cream-300 rounded-xl px-3.5 py-2.5 font-dm text-sm outline-none focus:border-forest-400 transition-colors" /></div>
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

                  <button onClick={() => advanceStep(2)} className="w-full h-12 bg-forest/80 hover:bg-forest text-white font-dm font-bold text-[15px] rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-forest-500/25 flex items-center justify-center gap-2">
                    Continue to Payment <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* STEP 2: Payment*/}
          {step === 2 && (
            <>
              <SummaryPanel label="Delivering to" value={`${addrSummary} · ${DELIVERY_OPTIONS.find(d => d.id === deliveryType)?.name}`} onClick={() => advanceStep(1)} />

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
                      <span><strong>SATVIK10</strong> applied — You save ₹{Math.round(getGrandTotal() * 0.1)}!</span>
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
        <OrderSummary step={step}
          placing={placing}
          onPlaceOrder={placeOrder}
          couponApplied={couponApplied}
          deliveryFee={deliveryFee}
          codFee={codFee} />

        <div className="px-2">
          <label className="flex items-center gap-2 cursor-pointer mb-2">
            <input type="checkbox" checked={whatsapp} onChange={e => setWhatsapp(e.target.checked)} className="accent-forest-500 w-4 h-4" />
            <span className="text-xs font-dm text-gray-500">Send order updates on WhatsApp</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer mb-5">
            <input type="checkbox" className="accent-forest-500 w-4 h-4" />
            <span className="text-xs font-dm text-gray-500">Subscribe to Satvik health tips & exclusive offers</span>
          </label>
        </div>
      </div>
    </div>
  );
}      
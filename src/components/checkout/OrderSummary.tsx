import { useCartStore } from '@/src/store/cart.store'
import { ShieldCheck, RotateCcw, Truck, Lock } from 'lucide-react';
import Image from 'next/image'
import React, { useState } from 'react'

interface Props {
    step: number;
    placing: boolean;
    onPlaceOrder: () => void;
    couponApplied: boolean;
    deliveryFee: number;
    codFee: number;
}


const OrderSummary = ({
    step,
    placing,
    onPlaceOrder,
    couponApplied,
    deliveryFee,
    codFee,
}: Props) => {
    const { items, removeFromCart, hasHydrated, getSubtotal, getGrandTotal, getDiscountTotal } = useCartStore()
    const itemDiscount = getDiscountTotal()
    const finalPrice =
        Number(getGrandTotal()) +
        deliveryFee +
        codFee

    const totalItems = items.length
    const subTotal = getSubtotal()
    const discountTotal = getDiscountTotal()

    if (!hasHydrated) return null

    return (
        <div className="lg:sticky lg:top-24">
            <div className="bg-white border border-cream-200 rounded-2xl overflow-hidden shadow-sm">
                {/* Header */}
                <div className="bg-gradient-to-br from-forest-700 to-forest-500 px-5 py-4 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px,white 1px,transparent 0)", backgroundSize: "18px 18px" }} />
                    <div className="absolute top-0 right-0 w-20 h-20 bg-amber-400/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />
                    <p className="font-playfair font-bold text-base text-white relative z-10">Order Summary</p>
                    <p className="text-xs text-white/60 mt-0.5 relative z-10">{items?.length}</p>
                </div>

                <div className="p-5">
                    {/* Items */}
                    <div className="space-y-3 mb-4">
                        {items?.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className={`w-12 h-12  rounded-xl border border-cream-200 flex items-center justify-center text-xl flex-shrink-0 relative`}>
                                    {/* {item.product?.media[0].url} */}
                                    <Image src={item.product.media[0].url} height={50} width={50} alt={""} className=" rounded-sm" />
                                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-forest-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{item.quantity}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-dm font-semibold text-xs text-gray-800 truncate">{item?.product?.title}</p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">{item.variant?.size}</p>
                                </div>
                                <span className="font-playfair font-bold text-sm text-forest-600 flex-shrink-0">₹{item.variant?.price}</span>
                            </div>
                        ))}
                    </div>

                    {/* Price lines */}
                    <div className="border-t border-cream-200 pt-4 space-y-2.5">
                        <div className="flex justify-between text-sm font-dm">
                            <span className="text-gray-500">Subtotal ({totalItems})</span>
                            <span className="font-semibold text-gray-700">₹{subTotal}</span>
                        </div>
                        <div className="flex justify-between text-sm font-dm">
                            <span className="text-gray-500">Product Discount</span>
                            <span className="font-semibold text-gray-700">₹{itemDiscount}</span>
                        </div>
                        {couponApplied && (
                            <div className="flex justify-between text-sm font-dm">
                                <span className="text-gray-500">Coupon (SATVIK10)</span>
                                <span className="font-semibold text-green-600">−₹{discountTotal}</span>
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
                        <span className="font-playfair font-bold text-2xl text-forest-600">₹{finalPrice}</span>
                    </div>

                    {/* {couponApplied && discount > 0 && (
                        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 mt-3 text-xs font-dm font-semibold text-amber-800">
                            🎉 You&apos;re saving <strong>₹{discount}</strong> on this order!
                        </div>
                    )} */}

                    {/* Place order - only on step 3 */}
                    {step === 2 && (
                        <>
                            <button
                                onClick={onPlaceOrder}
                                disabled={placing}
                                className="w-full h-13 mt-4 bg-gradient-to-br from-forest-600 to-forest-500 hover:from-forest-700 hover:to-forest-600 disabled:opacity-80 text-white font-dm font-bold text-base rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-forest-500/30 flex items-center justify-center gap-2.5 py-3.5 relative overflow-hidden"
                                style={{ height: "52px" }}
                            >
                                {placing ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin">⏳</span>
                                        Processing…
                                    </span>
                                ) : (
                                    <>
                                        <Lock className="w-4 h-4" />
                                        Place Order · ₹{finalPrice}
                                    </>
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
    )
}

export default OrderSummary

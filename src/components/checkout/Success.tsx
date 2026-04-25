
import { Truck, Lock } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface SuccessMessageProps {
    firstName?: string;
    email?: string;
    items: any[];
    total: number;
    deliveryType: "standard" | "express" | "scheduled";
    onContinue: () => void;
}

const SuccessMessage = ({
    firstName,
    email,
    items,
    total,
    deliveryType,
    onContinue,
}: SuccessMessageProps) => {

    const getDeliveryDate = (type: "standard" | "express" | "scheduled") => {
        const today = new Date();

        let deliveryDate = new Date(today);

        if (type === "express") {
            deliveryDate.setDate(today.getDate() + 1);
        } else if (type === "standard") {
            deliveryDate.setDate(today.getDate() + 3);
        } else if (type === "scheduled") {
            deliveryDate.setDate(today.getDate() + 5); // or custom logic
        }

        return deliveryDate.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
        });
    };

    const deliveryText = () => {
        const date = getDeliveryDate(deliveryType);

        if (deliveryType === "express") {
            return `Tomorrow, ${date} · Before 8 PM · Express Delivery `;
        }

        if (deliveryType === "scheduled") {
            return `${date} · Scheduled Delivery`;
        }

        return `${date} · Standard Free Delivery`;
    };

    useEffect(() => {
        const duration = 1500;
        const end = Date.now() + duration;

        const colors = ["#16a34a", "#22c55e", "#4ade80"];

        (function frame() {
            // confetti({
            //     particleCount: 4,
            //     angle: 60,
            //     spread: 70,
            //     origin: { x: 0 },
            //     // colors,
            // });

            // confetti({
            //     particleCount: 4,
            //     angle: 120,
            //     spread: 70,
            //     origin: { x: 1 },
            //     // colors,
            // });
            confetti({
                particleCount:3 ,
                spread: 50,
                origin: { y: 0.3 ,z:-10},
            });
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }, []);

    return (
        <div>
            <div className="min-h-screen bg-cream-50 flex flex-col">
                {/* Header */}
                <header className="bg-white border-b border-cream-200 px-6 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* <div className="w-8 h-8 bg-forest-500 rounded-full flex items-center justify-center text-sm">🌿</div>
                        <span className="font-playfair font-bold text-lg text-forest-700">Satvik</span> */}
                        <img src="/logo.png" className=" h-16" alt="" />
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
                            {items.map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={`w-11 h-11 rounded-xl border border-cream-200 flex items-center justify-center text-xl flex-shrink-0`}>
                                        <Image src={item.product.media[0].url} height={50} width={50} alt={""} className=" rounded-sm" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-dm font-semibold text-gray-800 truncate">{item.product.title}</p>
                                        <p className="text-[11px] text-gray-400">{item.variant?.size} · Qty: {item.quantity}</p>
                                    </div>
                                    <span className="font-playfair font-bold text-sm text-forest-600 flex-shrink-0">₹{item.variant?.price}</span>
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
                                    {deliveryText()}
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
                                onClick={onContinue}
                                className="flex-1 h-11 bg-white border-2 border-forest-400 text-forest-600 hover:bg-forest-50 font-dm font-bold text-sm rounded-xl transition-colors"
                            >
                                ← Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessMessage

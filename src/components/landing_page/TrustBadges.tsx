import React from "react";
import { Leaf, Truck, Award, FlaskConical } from "lucide-react";

const badges = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "100% Organic",
    desc: "Certified & chemical-free",
    color: "bg-green-50 text-forest border-green-100",
    iconBg: "bg-forest text-cream",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Free Delivery",
    desc: "On orders above ₹499",
    color: "bg-amber-50 text-amber-800 border-amber-100",
    iconBg: "bg-amber-500 text-cream",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Lab Certified",
    desc: "FSSAI approved quality",
    color: "bg-orange-50 text-orange-800 border-orange-100",
    iconBg: "bg-orange-500 text-cream",
  },
  {
    icon: <FlaskConical className="w-6 h-6" />,
    title: "Cold Pressed",
    desc: "No heat, all nutrients intact",
    color: "bg-lime-50 text-lime-800 border-lime-100",
    iconBg: "bg-lime-500 text-cream",
  },
];

export default function TrustBadges() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {badges.map((b, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-4 py-4 rounded-2xl border ${b.color} transition-all hover:-translate-y-0.5 duration-200`}
          >
            <div className={`${b.iconBg} p-2 rounded-xl flex-shrink-0`}>{b.icon}</div>
            <div>
              <p className="font-body font-semibold text-sm leading-tight">{b.title}</p>
              <p className="font-body text-xs opacity-70 mt-0.5">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

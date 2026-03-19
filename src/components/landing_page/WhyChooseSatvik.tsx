import React from "react";
import { Zap, Shield, FlaskConical, TreePine, Users, Award } from "lucide-react";

const reasons = [
  { icon: <FlaskConical className="w-7 h-7" />, title: "Traditional Cold-Press", desc: "Ancient wooden churner method — zero heat, zero chemicals, 100% purity retained.", color: "bg-forest text-cream" },
  { icon: <Shield className="w-7 h-7" />, title: "FSSAI Certified", desc: "Every batch tested for purity, microbial safety, and nutritional integrity.", color: "bg-amber text-white" },
  { icon: <TreePine className="w-7 h-7" />, title: "Source-Traceable Farms", desc: "We know every farmer. You know where your oil comes from.", color: "bg-leaf text-white" },
  { icon: <Zap className="w-7 h-7" />, title: "No Additives Ever", desc: "No preservatives, no artificial colours, no solvent extractions.", color: "bg-earth text-cream" },
  { icon: <Users className="w-7 h-7" />, title: "50,000+ Happy Families", desc: "Trusted across India since 2018. Real people, real results.", color: "bg-forest-light text-cream" },
  { icon: <Award className="w-7 h-7" />, title: "Award-Winning Quality", desc: "Recognised by India Organic Fair 2023 for best cold-pressed oils.", color: "bg-terracotta text-cream" },
];

export default function WhyChooseSatvik() {
  return (
    <section className="bg-gradient-to-br from-[#f0fdf4] to-[#fefce8] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="font-body text-xs text-forest/60 uppercase tracking-widest font-medium mb-2">
            Our Promise
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-forest mb-3">
            Why Choose Satvik?
          </h2>
          <p className="font-body text-gray-600 max-w-xl mx-auto text-sm leading-relaxed">
            We bring back the wisdom of our ancestors — pure, natural, and nourishing. No shortcuts. No compromises.
          </p>
        </div>

        {/* Icon grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex gap-4 items-start"
            >
              <div className={`${reason.color} p-3 rounded-xl flex-shrink-0`}>
                {reason.icon}
              </div>
              <div>
                <h3 className="font-body font-semibold text-sm text-gray-800 mb-1">{reason.title}</h3>
                <p className="font-body text-xs text-gray-500 leading-relaxed">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stat strip */}
        <div className="mt-8 bg-forest rounded-2xl px-6 py-5 grid grid-cols-3 gap-4 text-center">
          {[
            { num: "50K+", label: "Happy Customers" },
            { num: "4.8★", label: "Average Rating" },
            { num: "15+", label: "Product Variants" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="font-display text-2xl md:text-3xl font-semibold text-amber-300">{stat.num}</p>
              <p className="font-body text-xs text-cream/70 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Leaf, Flame, ShieldCheck, Truck, RotateCcw, Heart } from "lucide-react";

const reasons = [
  {
    icon: <Leaf className="w-5 h-5" />,
    title: "100% Organic Seeds",
    desc: "Sourced directly from certified organic farms across India, free from pesticides.",
  },
  {
    icon: <Flame className="w-5 h-5" />,
    title: "Traditional Cold-Press",
    desc: "Stone and wood-pressed below 45°C to preserve all nutrients, flavour & aroma.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "FSSAI Certified",
    desc: "All products are lab-tested and certified safe for daily consumption.",
  },
  {
    icon: <Truck className="w-5 h-5" />,
    title: "Free Delivery",
    desc: "Complimentary shipping on orders above ₹499 across India.",
  },
  {
    icon: <RotateCcw className="w-5 h-5" />,
    title: "Easy Returns",
    desc: "Not satisfied? Return within 7 days, no questions asked.",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Made with Love",
    desc: "Small-batch production to ensure freshness in every bottle.",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-14 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-700 to-forest-600" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-dm font-semibold text-amber-400 uppercase tracking-widest mb-2">
            ✦ Our Promise
          </p>
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-cream-100">
            Why Choose Satvik?
          </h2>
          <p className="text-cream-200/70 font-dm text-sm mt-2 max-w-md mx-auto">
            We believe food should be as close to nature as possible — pure,
            unprocessed, and alive with nutrients.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/12 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-amber-400/20 border border-amber-400/30 rounded-xl flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                {r.icon}
              </div>
              <h3 className="font-dm font-semibold text-cream-100 text-sm mb-1">
                {r.title}
              </h3>
              <p className="font-dm text-cream-200/60 text-xs leading-relaxed">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

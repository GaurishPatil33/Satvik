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

export default function WhySatvik() {
  return (
    <section className="py-20 bg-cream overflow-hidden relative">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-forest/5 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold/8 translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-forest mb-3 flex items-center justify-center gap-2">
            <span className="w-4 h-px bg-forest inline-block" /> Our Promise
          </p>
          <h2
            className="text-3xl sm:text-4xl font-display font-bold text-forest-800 leading-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Why Choose <em className="not-italic text-forest">Satvik</em>?
          </h2>
          <p className="text-bark/50 font-body text-sm mt-4 leading-relaxed">
            We founded Satvik because we believed that good food shouldn't require a chemistry degree to understand.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-6 border border-cream-dark hover:border-forest/25 hover:shadow-lg hover:shadow-forest/8 transition-all duration-300"
            >
             <span className="w-10 h-10 bg-amber-400/20 border border-amber-400/30 rounded-xl flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
          {r.icon}</span>
              <h3 className="font-body font-semibold text-bark text-base mb-2">{r.title}</h3>
              <p className="text-bark/55 font-body text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

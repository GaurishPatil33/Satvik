"use client";
import { ArrowRight, Shield, Truck, Award } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative mx-4 sm:mx-6 lg:mx-auto max-w-7xl rounded-3xl overflow-hidden grain-overlay">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-700 via-forest-600 to-forest-500" />
      {/* Decorative circles */}
      <div className="absolute -top-16 -right-16 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-forest-400/30 rounded-full blur-2xl" />
      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 px-8 py-12 sm:py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-8">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-400 text-xs font-dm font-semibold px-3 py-1.5 rounded-full mb-4 tracking-wide">
            ✦ New Harvest Collection 2024
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-100 leading-tight mb-4">
            Pure Cold-Pressed
            <br />
            <span className="italic text-amber-400">Goodness</span> in
            <br />
            Every Drop
          </h1>
          <p className="font-dm text-cream-200/80 text-sm sm:text-base max-w-md mb-6 leading-relaxed">
            Hand-picked organic seeds, traditionally cold-pressed to retain
            every nutrient. No chemicals. No heat. Just pure oil as nature
            intended.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <a
              href="/products"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-forest-800 font-dm font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/30 hover:-translate-y-0.5"
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 border border-cream-200/40 text-cream-100 font-dm font-medium px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Our Process
            </a>
          </div>
        </div>

        {/* Floating product visual */}
        <div className="flex-1 flex justify-center">
          <div className="relative">
            {/* Bottle mockup */}
            <div className="w-40 h-56 bg-gradient-to-b from-amber-300/30 to-amber-500/20 rounded-[40px] border border-amber-400/40 backdrop-blur-sm flex items-center justify-center animate-float shadow-2xl">
              <div className="text-center">
                <div className="text-5xl mb-2">🫙</div>
                <div className="font-playfair text-cream-100 text-sm font-semibold">
                  Groundnut
                </div>
                <div className="text-cream-200/60 text-xs font-dm">
                  Cold Pressed
                </div>
              </div>
            </div>
            {/* Badges floating */}
            <div className="absolute -top-3 -right-4 bg-white rounded-xl px-3 py-1.5 shadow-lg text-xs font-dm font-semibold text-forest-600 border border-forest-100">
              🌿 100% Organic
            </div>
            <div className="absolute -bottom-3 -left-4 bg-amber-400 rounded-xl px-3 py-1.5 shadow-lg text-xs font-dm font-bold text-forest-800">
              ⭐ 4.9 Rating
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="relative z-10 border-t border-white/10 bg-forest-700/50 px-8 py-4">
        <div className="flex flex-wrap items-center justify-around gap-4 max-w-2xl mx-auto">
          {[
            { icon: <Shield className="w-4 h-4" />, text: "100% Organic" },
            { icon: <Truck className="w-4 h-4" />, text: "Free Delivery" },
            { icon: <Award className="w-4 h-4" />, text: "FSSAI Certified" },
          ].map(({ icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 text-cream-200 text-sm font-dm"
            >
              <span className="text-amber-400">{icon}</span>
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

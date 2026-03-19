"use client";
import { Play } from "lucide-react";

const steps = [
  { num: "01", title: "Seed Selection", desc: "Only the finest organic seeds from trusted farmers." },
  { num: "02", title: "Stone Grinding", desc: "Traditional wooden/stone press below 45°C." },
  { num: "03", title: "Natural Filtering", desc: "Slow gravity filtration — no bleach, no chemicals." },
  { num: "04", title: "Bottled Fresh", desc: "Small-batch bottled and dispatched within days." },
];

export default function OurProcess() {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-xs font-dm font-semibold text-forest-500 uppercase tracking-widest mb-1">
          ✦ Transparency First
        </p>
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900">
          Our Process
        </h2>
        <p className="text-gray-500 font-dm text-sm mt-2 max-w-md mx-auto">
          No shortcuts. No compromises. Watch how we make the purest oil
          you've ever tasted.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-center">
        {/* Video player mockup */}
        <div className="relative rounded-2xl overflow-hidden bg-forest-700 aspect-video flex items-center justify-center group cursor-pointer shadow-xl shadow-forest-700/20">
          {/* BG gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-forest-700 to-forest-500" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 50% 50%, white 0%, transparent 70%)",
            }}
          />
          {/* Farm visual */}
          <div className="relative z-10 text-center">
            <div className="text-6xl mb-3">🌾</div>
            <p className="font-playfair text-cream-100 text-lg font-semibold mb-1">
              Satvik Farm to Bottle
            </p>
            <p className="text-cream-200/60 text-sm font-dm">3:45 min</p>
          </div>

          {/* Play button */}
          <div className="absolute z-20 w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 shadow-2xl">
            <Play className="w-7 h-7 text-white ml-1" />
          </div>
        </div>

        {/* Process steps */}
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="flex gap-4 items-start group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 flex-shrink-0 bg-forest-500/10 border border-forest-400/30 rounded-xl flex items-center justify-center">
                <span className="font-playfair font-bold text-xs text-forest-600">
                  {step.num}
                </span>
              </div>
              <div>
                <h4 className="font-dm font-semibold text-sm text-gray-800">
                  {step.title}
                </h4>
                <p className="font-dm text-xs text-gray-500 mt-0.5 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

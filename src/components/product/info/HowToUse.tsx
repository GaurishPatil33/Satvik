import React from 'react'
const HOW_TO_USE = [
  { icon: "🍳", title: "Everyday Cooking", text: "Use for tadkas, sautéing vegetables, rotis, or shallow frying. Ideal for Indian cuisine. Smoke point: ~160°C." },
  { icon: "🥗", title: "Salad Dressing", text: "Drizzle over salads or mix with lemon juice and rock salt for a simple, flavourful vinaigrette." },
  { icon: "💆", title: "Body Massage", text: "Warm slightly and apply for a traditional body massage. Deeply nourishing for skin and joints." },
  { icon: "💇", title: "Hair Care", text: "Apply to scalp 30 mins before washing. Strengthens hair roots and reduces breakage." },
  { icon: "🌅", title: "Oil Pulling", text: "Swish 1 tablespoon for 10–15 mins before breakfast. An ancient Ayurvedic practice for oral health." },
  { icon: "📦", title: "Storage Tips", text: "Store cool and dry, away from sunlight. Don't refrigerate. Cloudiness = purity. Shake before use." },
];
const HowToUse = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {HOW_TO_USE.map((h) => (
        <div key={h.title} className="bg-white border border-cream-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
          <span className="text-4xl block mb-3">{h.icon}</span>
          <h4 className="font-dm font-bold text-sm text-gray-800 mb-2">{h.title}</h4>
          <p className="text-xs font-dm text-gray-500 leading-relaxed">{h.text}</p>
        </div>
      ))}
    </div>
  )
}

export default HowToUse
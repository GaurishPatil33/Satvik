import React from 'react'
const BENEFITS = [
  {
    icon: "❤️", bg: "#FEF3C7", title: "Heart Health",
    text: "Rich in monounsaturated fatty acids (oleic acid) that help maintain healthy cholesterol levels and support cardiovascular wellness."
  },
  {
    icon: "🧠", bg: "#FFF1F2", title: "Vitamin E Powerhouse",
    text: "Naturally packed with tocopherols — a potent antioxidant that protects cells from oxidative damage and supports skin health."
  },
  {
    icon: "🦴", bg: "#F0FDF4", title: "Joint & Bone Support",
    text: "Contains resveratrol and phytosterols with anti-inflammatory properties, supporting joint health and reducing inflammation."
  },
  {
    icon: "✨", bg: "#EFF6FF", title: "Skin & Hair Nourishment",
    text: "Vitamin E and fatty acids deeply moisturise skin and strengthen hair. A traditional massage oil used for generations."
  },
  {
    icon: "🔥", bg: "#FEFCE8", title: "Suitable for High Heat",
    text: "Natural smoke point of ~160°C makes it excellent for everyday Indian cooking — tadkas, sautéing, and shallow frying."
  },
  {
    icon: "🧬", bg: "#FDF4FF", title: "Rich in Phytonutrients",
    text: "Unrefined pressing retains all naturally occurring polyphenols, sterols, and squalene — lost entirely in refined oils."
  },
];
const Benefits = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {BENEFITS.map((b) => (
        <div key={b.title} className="bg-white border border-cream-200 rounded-2xl p-5 flex gap-4 hover:shadow-lg transition-shadow">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: b.bg }}>{b.icon}</div>
          <div>
            <h4 className="font-dm font-bold text-sm text-gray-800 mb-1.5">{b.title}</h4>
            <p className="text-xs font-dm text-gray-500 leading-relaxed">{b.text}</p>
          </div>
        </div>
      ))}
    </div> 
  )
}

export default Benefits
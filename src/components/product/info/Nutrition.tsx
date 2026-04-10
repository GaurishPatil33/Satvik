import React from 'react'
import { FaBuilding, FaLeaf, FaFlask, FaRecycle } from 'react-icons/fa'

const Nutrition = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="bg-white border border-cream-200 rounded-2xl overflow-hidden">
          <div className="bg-forest-600 px-5 py-4">
            <h3 className="font-playfair font-semibold text-base text-white">Nutritional Information</h3>
            <p className="text-[11px] text-white/70 mt-0.5">Per 100ml serving</p>
          </div>
          {[
            ["Energy", "884 kcal", false, true],
            ["Total Fat", "100g", false, true],
            ["— Saturated Fat", "17g", true, false],
            ["— Monounsaturated", "46g", true, false],
            ["— Polyunsaturated", "32g", true, false],
            ["Trans Fat", "0g ✓", false, false, true],
            ["Cholesterol", "0mg ✓", false, false, true],
            ["Vitamin E", "15.7mg", false, false],
            ["Carbohydrates", "0g", false, false],
            ["Sodium", "0mg ✓", false, false, true],
          ].map(([key, val, indent, bold, green]) => (
            <div key={String(key)} className={`flex justify-between items-center px-5 py-2.5 border-b border-cream-100 last:border-b-0 text-sm ${indent ? "pl-8" : ""} ${bold ? "font-bold" : ""}`}>
              <span className={indent ? "text-gray-400" : "text-gray-500"}>{key}</span>
              <span className={`font-semibold ${green ? "text-green-700" : "text-gray-800"}`}>{val}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-gray-400 mt-2 px-1 leading-relaxed">* Per 100ml. Values may vary slightly by batch due to natural seed variation.</p>
      </div>
      <div className="space-y-3">
        <h4 className="font-playfair font-bold text-base text-gray-900 mb-1">Certifications & Quality</h4>
        {[
          { icon: <FaBuilding />, name: "FSSAI Certified", desc: "Licence No. 10023022003015. All products comply with Indian food safety standards." },
          { icon: <FaLeaf />, name: "Organic India Certified", desc: "Seeds from farms certified under National Programme for Organic Production (NPOP)." },
          { icon: <FaFlask />, name: "Lab Tested — Every Batch", desc: "Third-party tested for pesticide residues, heavy metals, and microbial safety before dispatch." },
          { icon: <FaRecycle />, name: "Eco-Friendly Packaging", desc: "BPA-free bottles. Glass option available. Recyclable caps and soy-based ink labels." },
        ].map((c) => (
          <div key={c.name} className="bg-white border border-cream-200 rounded-xl p-4 flex gap-3 items-center ">
            <span className="text-2xl flex-shrink-0 text-forest-600 items-center justify-center ">{c.icon}</span>
            <div><p className="font-dm font-bold text-sm text-gray-800 mb-0.5">{c.name}</p><p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Nutrition
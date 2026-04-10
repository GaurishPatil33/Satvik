import React from 'react'

const Description = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-3">
        <h3 className="font-playfair text-xl font-bold text-gray-900">Pure Tradition in a Bottle</h3>
        <p className="text-sm font-dm text-gray-500 leading-loose">Satvik's Wood Pressed Groundnut Oil is cold-extracted using the age-old <em>Kolhu</em> (wooden press) method, running at low RPM to ensure the oil never exceeds 45°C. This careful process preserves the natural aroma, golden colour, and full nutritional profile of organically-grown groundnuts.</p>
        <p className="text-sm font-dm text-gray-500 leading-loose">Unlike commercially refined oils that go through bleaching, deodorising, and chemical solvent extraction, our oil is single-ingredient — just groundnuts. Nothing added. Nothing removed.</p>
        <p className="text-sm font-dm font-semibold text-gray-700">What you'll notice:</p>
        <ul className="list-disc list-inside space-y-1.5">
          {["Rich, nutty aroma that fills your kitchen when cooking", "Golden amber colour — natural cloudiness is a sign of purity", "Higher smoke point (~160°C) for everyday Indian cooking", "No harsh aftertaste; lets the flavours of your food shine"].map((item) => (
            <li key={item} className="text-sm font-dm text-gray-500 leading-relaxed">{item}</li>
          ))}
        </ul>
      </div>
      <div className="bg-cream-100 border border-cream-200 rounded-2xl p-5">
        <h4 className="font-playfair font-bold text-base text-gray-900 mb-4">Product Details</h4>
        {[
          ["Ingredients", "Organic Groundnuts (100%)", false],
          ["Press Method", "Wood Kolhu (Cold-Pressed)", true],
          ["Processing Temp", "Below 45°C", true],
          ["Filtered?", "Gravity-Filtered, Unrefined", false],
          ["Shelf Life", "12 months from pressing", false],
          ["Storage", "Cool, dry, away from sunlight", false],
          ["Origin", "India 🇮🇳", false],
          ["Certifications", "FSSAI · Organic India", true],
          ["Packaging", "BPA-Free PET / Glass bottle", false],
        ].map(([key, val, green]) => (
          <div key={String(key)} className="flex justify-between items-center py-2.5 border-b border-cream-200 last:border-b-0 gap-3">
            <span className="text-[11px] font-dm font-bold text-gray-400 uppercase tracking-wider flex-shrink-0">{key}</span>
            <span className={`text-xs font-dm font-semibold text-right ${green ? "text-forest-500" : "text-gray-700"}`}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Description
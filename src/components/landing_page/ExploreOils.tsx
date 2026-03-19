'use client'
import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { products } from '@/src/lib/data'
import { ProductCard } from '../product/ProductCard'

const oils = [
  {
    name: 'Groundnut',
    emoji: '🥜',
  },
  {
    name: 'Mustard',
    emoji: '🌻',
  },
  {
    name: 'Sunflower',
    emoji: '🌼',
  },
  {
    name: 'Olive',
    emoji: '🫒',
  },
  {
    name: 'Coconut',
    emoji: '🥥',
  },
]

export default function ExploreOils() {
  const [selected, setSelected] = useState(0)
  const oil = oils[selected]

  return (
    <section className="py-20 bg-cream-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-forest mb-3 flex items-center justify-center gap-2">
            <span className="w-4 h-px bg-forest inline-block" /> Explore Range
          </p>
          <h2
            className="text-3xl sm:text-4xl font-display font-bold text-bark"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Our Cold-Pressed Oils
          </h2>
        </div>

        {/* Oil selector pills */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {oils.map((o, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 ${selected === i
                  ? 'bg-forest text-cream shadow-md'
                  : 'bg-cream border border-cream-dark text-bark hover:border-forest/30'
                }`}
            >
              <span>{o.emoji}</span>
              {o.name}
            </button>
          ))}
        </div>

        {/* Selected oil detail */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.slice(0,6).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

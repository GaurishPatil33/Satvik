'use client'
import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { products } from '@/src/lib/data'
import { ProductCard } from '../product/ProductCard'
import { FaShieldAlt, FaTint, FaWeight } from 'react-icons/fa'
import { GiStomach } from 'react-icons/gi'

const concerns = [
  {
    name: 'Weight Loss',
    icon: <FaWeight />,

  },
  {
    name: 'Gut Health',
    icon: <GiStomach />,

  },
  {
    name: 'Immunity',
    icon: <FaShieldAlt />,

  },
  {
    name: 'Diabetes Care',
    icon: <FaTint />,

  },
]

export default function ShopByConcern() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-forest mb-3 flex items-center justify-center gap-2">
            <span className="w-4 h-px bg-forest inline-block" /> Personalised Picks
          </p>
          <h2
            className="text-3xl sm:text-4xl font-display font-bold text-forest-800"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Shop by Concern
          </h2>
          <p className="text-bark/50 font-body text-sm mt-3">Find the right products for your health goals</p>
        </div>

        {/* Concern tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {concerns.map((c, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-body font-medium transition-all duration-300 border ${active === i
                ? 'bg-forest text-cream border-forest shadow-md'
                : 'bg-cream border-cream-dark text-forest-600 hover:border-forest/30'
                }`}
            >
              <span className="text-xl ">{c.icon}</span>
              <span className="text-left leading-tight">{c.name}</span>
            </button>
          ))}
        </div>

        {/* Products for selected concern */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'
import { useState } from 'react'
import { ProductCard } from '../product/ProductCard'
import { products } from '@/src/lib/data'
// const allProducts = [
//   {
//     id: 10,
//     name: 'Sunflower Oil Cold Pressed',
//     subtitle: 'Light & heart-healthy',
//     price: 310,
//     mrp: 380,
//     rating: 4.6,
//     reviews: 432,
//     size: '1000ml',
//     keyBenefits: ['Vit E Rich', 'Low Saturated Fat'],
//     img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
//   },
//   {
//     id: 11,
//     name: 'Extra Virgin Olive Oil',
//     subtitle: 'Imported, first cold press',
//     price: 680,
//     mrp: 850,
//     badge: 'Premium',
//     rating: 4.8,
//     reviews: 329,
//     size: '500ml',
//     keyBenefits: ['Anti-inflammatory', 'Polyphenols'],
//     img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80',
//   },
//   {
//     id: 12,
//     name: 'Himalayan Rock Salt',
//     subtitle: 'Pink, unrefined, mineral-rich',
//     price: 149,
//     mrp: 200,
//     rating: 4.9,
//     reviews: 1876,
//     size: '1kg',
//     keyBenefits: ['84 Minerals', 'Chemical Free'],
//     img: 'https://images.unsplash.com/photo-1535500255158-1228a55ae2e8?w=400&q=80',
//   },
//   {
//     id: 13,
//     name: 'Organic Cane Sugar',
//     subtitle: 'Unrefined, amber colour',
//     price: 229,
//     mrp: 280,
//     rating: 4.7,
//     reviews: 743,
//     size: '1kg',
//     keyBenefits: ['No Bleaching', 'Natural Colour'],
//     img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
//   },
// ]

const filters = ['All', 'Oil', 'Jaggery', 'Sugar', 'Salt', 'Deals']

export default function AllProducts() {
  const [active, setActive] = useState('All')

  return (
    <section className="py-16 bg-cream-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-forest mb-2 flex items-center gap-2">
              <span className="w-4 h-px bg-forest inline-block" /> Browse
            </p>
            <h2
              className="text-3xl font-display font-bold text-bark"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              All Products
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-200 ${
                  active === f
                    ? 'bg-bark text-cream'
                    : 'bg-cream border border-bark/15 text-bark/60 hover:border-bark/40 hover:text-bark'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="px-8 py-3 rounded-full border-2 border-forest text-forest font-body font-semibold text-sm hover:bg-forest hover:text-cream transition-all duration-300 hover:scale-105">
            See All Products →
          </button>
        </div>
      </div>
    </section>
  )
}

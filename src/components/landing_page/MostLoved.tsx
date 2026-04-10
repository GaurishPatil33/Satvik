import { products } from '@/src/lib/data'
import { ProductCard } from '../product/ProductCard'
import Link from 'next/link'



export default function MostLoved() {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-forest mb-2 flex items-center gap-2">
              <span className="w-4 h-px bg-forest inline-block" /> Customer Favourites
            </p>
            <h2
              className="text-3xl sm:text-4xl font-display font-bold text-forest-800 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Most Loved
            </h2>
          </div>
          <Link
            href='/products'
            className="hidden sm:flex items-center gap-1.5 text-sm font-body font-medium text-forest hover:text-bark transition-colors border-b border-forest/40 hover:border-bark pb-0.5"
          >
            Shop more →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.slice(0,4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <a href="#" className="text-sm font-body font-medium text-forest border-b border-forest/40 pb-0.5">
            Shop all products →
          </a>
        </div>
      </div>
    </section>
  )
}

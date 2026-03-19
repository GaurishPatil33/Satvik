'use client'
import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    date: '2 weeks ago',
    review: "I've been using Satvik's groundnut oil for 3 months now. The taste is incredible — nutty and rich. You can actually tell the difference from refined oils. My family loves it.",
    product: 'Groundnut Oil 1L',
    avatar: 'PS',
  },
  {
    name: 'Rahul Nair',
    location: 'Bangalore',
    rating: 5,
    date: '1 month ago',
    review: "The jaggery is unlike anything I've tasted from a supermarket. You can taste the actual sugarcane. No metallic aftertaste. Highly recommended for anyone trying to reduce refined sugar.",
    product: 'Raw Jaggery 500g',
    avatar: 'RN',
  },
  {
    name: 'Anita Gupta',
    location: 'Delhi',
    rating: 5,
    date: '3 weeks ago',
    review: "Switched my entire kitchen to Satvik products. The coconut oil is divine and the Himalayan salt has me never going back to regular salt. Fast delivery, great packaging too.",
    product: 'Coconut Oil + Salt Bundle',
    avatar: 'AG',
  },
  {
    name: 'Vikram Menon',
    location: 'Chennai',
    rating: 4,
    date: '1 month ago',
    review: "Good quality products. The mustard oil has a strong authentic pungency that you expect from real cold-pressed oil. Only wish the 1L bottle had a better dispensing cap.",
    product: 'Mustard Oil 1L',
    avatar: 'VM',
  },
]

const stats = [
  { value: '4.9', label: 'Average Rating' },
  { value: '12K+', label: 'Reviews' },
  { value: '98%', label: 'Would Recommend' },
]

export default function Reviews() {
  return (
    <section className="py-20 bg-forest relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-gold mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-gold inline-block" /> Social Proof
            </p>
            <h2
              className="text-3xl sm:text-4xl font-display font-bold text-cream"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              What Our Customers Say
            </h2>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-display font-bold text-gold" style={{ fontFamily: 'var(--font-playfair)' }}>{s.value}</p>
                <p className="text-xs font-body text-cream/60 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white/8 border border-white/10 rounded-2xl p-5 hover:bg-white/12 transition-colors duration-300"
            >
              <Quote size={20} className="text-gold/60 mb-3" />
              <p className="text-cream/80 font-body text-sm leading-relaxed mb-4 line-clamp-4">{r.review}</p>

              <div className="flex mb-3">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={12} className={s <= r.rating ? 'text-gold fill-gold' : 'text-white/20'} fill={s <= r.rating ? 'currentColor' : 'none'} />
                ))}
              </div>

              <span className="text-[10px] font-body text-gold/70 border border-gold/20 px-2 py-0.5 rounded-full block w-fit mb-3">
                {r.product}
              </span>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-xs font-body font-bold text-gold">
                  {r.avatar}
                </div>
                <div>
                  <p className="text-cream text-xs font-body font-medium">{r.name}</p>
                  <p className="text-cream/40 text-[10px] font-body">{r.location} · {r.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

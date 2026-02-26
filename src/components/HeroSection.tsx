'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

const slides = [
  {
    tag: 'Cold-Pressed & Pure',
    title: 'Nature\'s Finest\nGroundnut Oil',
    subtitle: 'Wood-pressed at low temperatures. Zero chemicals. Full nutrition retained.',
    cta: 'Shop Groundnut Oil',
    ctaSecondary: 'See How It\'s Made',
    accent: '#2D5016',
    img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
    tag2: '100% Natural',
  },
  {
    tag: 'Farm to Bottle',
    title: 'Raw & Unrefined\nMustard Oil',
    subtitle: 'Sourced from certified organic farms. Packed with omega-3 fatty acids.',
    cta: 'Shop Mustard Oil',
    ctaSecondary: 'View All Oils',
    accent: '#C4622D',
    img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
    tag2: 'Certified Organic',
  },
  {
    tag: 'Artisan Jaggery',
    title: 'Traditional\nJaggery & Sugar',
    subtitle: 'Hand-crafted from sugarcane. No chemicals, no bleaching. Just sweetness.',
    cta: 'Shop Jaggery',
    ctaSecondary: 'Explore Range',
    accent: '#D4A017',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    tag2: 'No Additives',
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const go = (idx: number) => {
    if (animating) return
    setAnimating(true)
    setCurrent(idx)
    setTimeout(() => setAnimating(false), 500)
  }

  useEffect(() => {
    const t = setInterval(() => go((current + 1) % slides.length), 5000)
    return () => clearInterval(t)
  })

  const s = slides[current]

  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-cream">
      {/* Background image */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${animating ? 'opacity-0' : 'opacity-100'}`}
      >
        <img
          src={s.img}
          alt="hero"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-amber-100 via-amber-50/80 to-cream/20" />
        <div className="absolute inset-0 bg-linear-to-t from-cream/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 flex items-center pt-32 pb-20">
        <div className={`max-w-xl transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-px bg-forest" />
            <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-forest">
              {s.tag}
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-bark leading-tight mb-5 whitespace-pre-line"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {s.title}
          </h1>

          <p className="text-base sm:text-lg font-body text-bark/60 leading-relaxed mb-8 max-w-md">
            {s.subtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              className="px-7 py-3.5 rounded-full text-sm font-body font-semibold text-cream transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: s.accent }}
            >
              {s.cta}
            </button>
            <button className="px-7 py-3.5 rounded-full text-sm font-body font-semibold text-bark border border-black/50 hover:border-bark/50 hover:bg-cream-dark transition-all duration-300 flex items-center gap-2">
              <Play size={14} fill="currentColor" />
              {s.ctaSecondary}
            </button>
          </div>

          {/* Mini trust */}
          <div className="flex items-center gap-4 mt-8">
            {['10K+ Happy Families', '100% Organic', 'Lab Tested'].map((t) => (
              <span key={t} className="text-xs font-body text-bark/50 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-forest inline-block" />{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pb-8 flex items-center justify-between">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-8 h-2 bg-green-800' : 'w-2 h-2 bg-black/20 hover:bg-black/40'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => go((current - 1 + slides.length) % slides.length)}
            className="w-10 h-10 rounded-full border border-green-800/20 flex items-center justify-center hover:bg-cream-dark transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go((current + 1) % slides.length)}
            className="w-10 h-10 rounded-full bg-green-900 text-amber-50 flex items-center justify-center hover:bg-bark-light transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

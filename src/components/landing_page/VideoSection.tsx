'use client'
import { useState } from 'react'
import { Play, X } from 'lucide-react'

const videos = [
  {
    thumb: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80',
    title: 'How We Cold-Press Oils',
    duration: '3:24',
    src: null
  },
  {
    thumb: "a",
    title: 'From Farm to Bottle',
    duration: '5:12', src: null
  },
  {
    thumb: "null",
    title: 'From Farm to Bottle',
    duration: '5:12', src: null
  },

]

export default function VideoSection() {
  const [playing, setPlaying] = useState<number | null>(null)

  return (
    <section className="py-16 bg-bark">
      {/* Lightbox */}
      {playing !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPlaying(null)}
        >
          <button className="absolute top-6 right-6 text-white hover:text-gold transition-colors">
            <X size={28} />
          </button>
          <div className="w-full max-w-3xl aspect-video bg-bark-light/20 rounded-2xl flex items-center justify-center border border-white/10">
            <div className="text-center text-white/50 font-body text-sm">
              <Play size={48} className="mx-auto mb-3 opacity-30" />
              Video player would render here
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-gold mb-2 flex items-center justify-center gap-2">
            <span className="w-4 h-px bg-gold inline-block" /> Behind the Brand
          </p>
          <h2
            className="text-3xl sm:text-4xl font-display font-bold text-cream"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            See How It's Made
          </h2>
          <p className="text-cream/50 font-body text-sm mt-3 max-w-md mx-auto">
            Watch our craftsmen at work. No shortcuts. No compromises.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {videos.map((v, i) => (
            <button
              key={i}
              onClick={() => setPlaying(i)}
              className="group relative rounded-2xl overflow-hidden aspect-video text-left"
            >
              <img
                src={v.thumb}
                alt={v.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-gold/30">
                  <Play size={22} fill="white" className="text-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-cream font-body font-semibold text-sm">{v.title}</p>
                <p className="text-cream/50 font-body text-xs mt-0.5">{v.duration}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

const categories = [
  { name: 'All Oils', emoji: '🫙', href: '#', active: false },
  { name: 'Cold Pressed', emoji: '🌿', href: '#', active: true },
  { name: 'Jaggery', emoji: '🍯', href: '#', active: false },
  { name: 'Sugar', emoji: '🌾', href: '#', active: false },
  { name: 'Salt', emoji: '🧂', href: '#', active: false },
  { name: 'Deals', emoji: '🏷️', href: '#', active: false },
]

export default function CategoryNav() {
  return (
    <section className="py-8 bg-cream border-b border-cream-dark/60 sticky top-[88px] z-40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={cat.href}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-body font-medium transition-all duration-300 whitespace-nowrap ${
                cat.active
                  ? 'bg-forest text-cream shadow-md shadow-forest/25'
                  : 'bg-cream-dark text-bark hover:bg-forest/10 hover:text-forest border border-transparent hover:border-forest/20'
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

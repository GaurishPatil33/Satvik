const items = [
  '🌿 100% Organic', '🚚 Free Delivery on ₹499+', '🔬 Lab Tested',
  '⭐ 4.9/5 Rating', '🌾 Farm Direct', '♻️ Eco Packaging',
  '🌿 100% Organic', '🚚 Free Delivery on ₹499+', '🔬 Lab Tested',
  '⭐ 4.9/5 Rating', '🌾 Farm Direct', '♻️ Eco Packaging',
]

export default function MarqueeBanner() {
  return (
    <div className="bg-gold-light/30 border-y border-gold/20 py-3 overflow-hidden">
      <div className="marquee-track flex gap-12 w-max">
        {items.map((item, i) => (
          <span key={i} className="text-xs font-body font-semibold text-bark whitespace-nowrap tracking-wide">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

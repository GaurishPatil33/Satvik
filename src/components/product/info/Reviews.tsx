import React from 'react'
import { StarRow } from './StarRow';


interface Review {
  name: string;
  location: string;
  avatar: string;
  rating: number;
  title: string;
  text: string;
  product: string;
  date: string;
  helpful: number;
  verified: boolean;
}
const RATING_BREAKDOWN = [
  { star: 5, pct: 89 }, { star: 4, pct: 7 },
  { star: 3, pct: 2 }, { star: 2, pct: 1 }, { star: 1, pct: 1 },
];
const REVIEWS: Review[] = [
  { name: "Priya Menon", location: "Bangalore", avatar: "https:", rating: 5, title: "Finally, oil that actually smells like groundnut!", text: "Switched to Satvik after my nutritionist's advice. The difference is immediate — the aroma when you open the bottle is incredible. My food tastes richer and more authentic.", product: "1000ml", date: "3 weeks ago", helpful: 32, verified: true },
  { name: "Dr. Vikram Nair", location: "Hyderabad", avatar: "👨‍⚕️", rating: 5, title: "Recommending this to all my patients", text: "As a cardiologist, I'm particular about cooking oils. Satvik's cold-pressed groundnut oil has the right fatty acid profile — high oleic acid, natural Vitamin E, zero trans fats. Consistent quality across batches.", product: "5L", date: "1 month ago", helpful: 78, verified: true },
  { name: "Rekha Sharma", location: "Jaipur", avatar: "👩‍🍳", rating: 4, title: "Great oil, slight cloudiness at first", text: "Excellent for cooking — the flavour is authentic and my family loves it. Was initially concerned about cloudiness but it's natural sedimentation from unrefined pressing. Shakes clear easily.", product: "2L", date: "2 months ago", helpful: 19, verified: true },
];
const Reviews = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-8 mb-8 items-center">
        <div className="bg-gradient-to-br from-forest-700 to-forest-500 rounded-2xl p-7 text-center text-white">
          <div className="font-playfair text-6xl font-bold leading-none">4.9</div>
          <div className="text-amber-300 text-xl tracking-wider my-1.5">★★★★★</div>
          <div className="text-xs text-white/60">Based on 1,240 reviews</div>
        </div>
        <div className="space-y-2">
          {RATING_BREAKDOWN.map((r) => (
            <div key={r.star} className="flex items-center gap-3">
              <span className="text-xs font-dm font-semibold text-gray-500 w-8 flex-shrink-0">{r.star} ★</span>
              <div className="flex-1 h-2 bg-cream-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full transition-all duration-700" style={{ width: `${r.pct}%` }} />
              </div>
              <span className="text-xs font-dm text-gray-400 w-8 text-right flex-shrink-0">{r.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {REVIEWS.map((r, i) => (
          <div key={i} className="bg-white border border-cream-200 rounded-2xl p-5 relative overflow-hidden hover:shadow-md transition-shadow">
            <span className="absolute top-3 right-4 font-playfair text-6xl text-forest-500/6 leading-none pointer-events-none">"</span>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-cream-200 rounded-full flex items-center justify-center text-lg flex-shrink-0">{r.avatar}</div>
              <div>
                <p className="font-dm font-bold text-sm text-gray-800">{r.name}</p>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <StarRow rating={r.rating} size={11} />
                  {r.verified && <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-0.5 rounded-full">✓ Verified</span>}
                  <span className="text-[11px] text-gray-400">{r.date} · {r.location}</span>
                </div>
              </div>
            </div>
            <p className="font-dm font-bold text-sm text-gray-800 mb-1.5">{r.title}</p>
            <p className="text-sm font-dm text-gray-500 leading-relaxed">{r.text}</p>
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-cream-100 flex-wrap">
              <span className="text-[11px] font-bold bg-forest-50 text-forest-500 px-2.5 py-0.5 rounded-full">{r.product}</span>
              <button className="ml-auto text-xs text-gray-400 border border-cream-300 rounded-full px-3 py-1 hover:border-forest-400 hover:text-forest-500 transition-colors">
                👍 Helpful ({r.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button className="bg-forest-50 border border-forest-300/40 text-forest-600 font-dm font-bold text-sm px-7 py-3 rounded-full hover:bg-forest-100 transition-colors">
          Load More Reviews
        </button>
      </div>
    </div>
  )
}

export default Reviews
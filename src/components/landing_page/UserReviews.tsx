import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Priya Menon",
    location: "Bangalore",
    avatar: "🧕",
    rating: 5,
    review:
      "Finally found an oil that actually smells and tastes like groundnut! You can feel the difference from day one. The packaging is also eco-friendly which is a bonus.",
    product: "Groundnut Oil 1L",
    date: "3 weeks ago",
    verified: true,
  },
  {
    name: "Rajan Iyer",
    location: "Chennai",
    avatar: "👨‍🍳",
    rating: 5,
    review:
      "I've switched completely to Satvik oils for cooking. The mustard oil has that authentic pungency that refined oils just can't replicate. 100% recommend!",
    product: "Mustard Oil 1L",
    date: "1 month ago",
    verified: true,
  },
  {
    name: "Shreya Kapoor",
    location: "Delhi",
    avatar: "👩",
    rating: 5,
    review:
      "My doctor recommended switching to cold-pressed oils and Satvik has been a game changer. Love the palm jaggery too — my chai has never tasted better.",
    product: "Palm Jaggery 500g",
    date: "2 weeks ago",
    verified: true,
  },
  {
    name: "Dr. Vikram Nair",
    location: "Hyderabad",
    avatar: "👨‍⚕️",
    rating: 4,
    review:
      "As a nutritionist, I always recommend cold-pressed oils over refined ones. Satvik's quality is consistently excellent and the pricing is very reasonable.",
    product: "Coconut Oil 500ml",
    date: "1 month ago",
    verified: true,
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${
            s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function UserReviews() {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-xs font-dm font-semibold text-forest-500 uppercase tracking-widest mb-1">
            ✦ Real Stories
          </p>
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-forest-50 border border-forest-200 rounded-xl px-4 py-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="font-playfair font-bold text-forest-700">4.8</span>
          <span className="text-xs font-dm text-gray-500">/ 5 · 3,200+ reviews</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            {/* Quote icon */}
            <Quote className="absolute top-3 right-3 w-8 h-8 text-forest-100 group-hover:text-forest-200 transition-colors" />

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-cream-200 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                {r.avatar}
              </div>
              <div>
                <p className="font-dm font-semibold text-sm text-gray-800">
                  {r.name}
                </p>
                <p className="text-[11px] font-dm text-gray-400">{r.location}</p>
              </div>
            </div>

            <StarRow rating={r.rating} />

            <p className="font-dm text-xs text-gray-600 mt-2 mb-3 leading-relaxed">
              &ldquo;{r.review}&rdquo;
            </p>

            <div className="flex items-center justify-between mt-auto pt-2 border-t border-cream-200">
              <span className="text-[10px] font-dm font-medium bg-forest-50 text-forest-600 px-2 py-0.5 rounded-full">
                {r.product}
              </span>
              <div className="flex items-center gap-1">
                {r.verified && (
                  <span className="text-[10px] font-dm text-amber-600 font-medium">
                    ✓ Verified
                  </span>
                )}
                <span className="text-[10px] font-dm text-gray-400">
                  · {r.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

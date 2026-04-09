"use client";

import Link from "next/link";

const categories = [
  { emoji: "🫒", name: "Cold-Pressed Oils", slug: "oils" },
  { emoji: "🍯", name: "Jaggery", slug: "jaggery" },
  { emoji: "🌿", name: "Organic Sugar", slug: "sugar" },
  // { emoji: "🧂", name: "Natural Salt", slug: "salt" },
  // { emoji: "🌾", name: "Flours", slug: "flours" },
  // { emoji: "🫙", name: "Pickles", slug: "pickles" },
  // { emoji: "🌰", name: "Dry Fruits", slug: "dry-fruits" },
  { emoji: "✨", name: "Deals", slug: "deals" },
];

export default function CategoryRow() {
  return (
    <section className="py-8 pb-3 bg-cream border-b border-cream-dark/60 md:sticky top-[90px] md:top-[100px] z-40 backdrop-blur-sm">
      <div className="flex gap-4 overflow-x-auto pb-2  justify-center flex-wrap ">
        {categories.map((cat, i) => (
          <Link
            key={cat.slug}
            href={`/products?cat=${cat.slug}`}
            className="flex flex-col items-center gap-2 flex-shrink-0 group"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="w-16 h-16 bg-white rounded-full border-2 border-cream-200 shadow-sm flex items-center justify-center text-2xl group-hover:border-forest-400 group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
              {cat.emoji}
            </div>
            <span className="text-xs font-dm font-medium text-gray-600 group-hover:text-forest-600 transition-colors text-center leading-tight max-w-[70px]">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

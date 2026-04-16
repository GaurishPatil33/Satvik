"use client";

import Link from "next/link";
import { FaLeaf, FaTags } from "react-icons/fa";
import { GiOlive, GiSugarCane } from "react-icons/gi";


const categories = [
  { Icon: <GiOlive />, name: "Cold-Pressed Oils", slug: "oils" },
  { Icon: <GiSugarCane />, name: "Jaggery", slug: "jaggery" },
  { Icon: <FaLeaf />, name: "Organic Sugar", slug: "sugar" },

  // { Icon: GiSaltShaker, name: "Natural Salt", slug: "salt" },
  // { Icon: GiWheat, name: "Flours", slug: "flours" },
  // { Icon: IoFastFoodOutline, name: "Pickles", slug: "pickles" },

  { Icon: <FaTags />, name: "Deals", slug: "deals" },
];

export default function CategoryRow() {
  return (
    <section className=" pt-2 pb-3 bg-cream border-b border-cream-dark/60 md:sticky top-[90px]  z-30 backdrop-blur-sm">
      <div className="flex gap-4 overflow-x-auto pb-2  pt-1 justify-center flex-wrap ">
        {categories.map((cat, i) => (
          <Link
            key={cat.slug}
            href={`/products?cat=${cat.slug}`}
            className="flex flex-col items-center gap-2 flex-shrink-0 group"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="w-16 h-16 bg-white text-forest-800 rounded-full border-2 border-cream-300 shadow-sm flex items-center justify-center text-2xl group-hover:border-gold-300 group-hover:shadow-md group-hover:scale-105 transition-all duration-300 group-hover:bg-forest-800/10">
              {cat.Icon}
            </div>
            <span className="text-xs font-dm font-medium text-forest-800 group-hover:text-forest-600 transition-colors text-center leading-tight max-w-[70px]">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

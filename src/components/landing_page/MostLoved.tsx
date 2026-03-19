import { products } from '@/src/lib/data'
import { ProductCard } from '../product/ProductCard'

// const products = [
//   {
//     id: 1,
//     name: 'Wood Pressed Groundnut Oil',
//     subtitle: 'Traditional chekku method',
//     price: 350,
//     mrp: 420,
//     couponPrice: 300,
//     rating: 4.9,
//     reviews: 1284,
//     badge: 'Trending',
//     size: '1000ml',
//     keyBenefits: ['High Smoke Point', 'Rich in Vit E', 'Heart Healthy'],
//     img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
//   },
//   {
//     id: 2,
//     name: 'Cold Pressed Coconut Oil',
//     subtitle: 'Virgin & unrefined',
//     price: 390,
//     mrp: 480,
//     couponPrice: 340,
//     rating: 4.8,
//     reviews: 987,
//     badge: 'Best Seller',
//     size: '500ml',
//     keyBenefits: ['Boosts Immunity', 'Skin & Hair'],
//     img: 'https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=400&q=80',
//   },
//   {
//     id: 3,
//     name: 'Organic Mustard Oil',
//     subtitle: 'Cold-pressed, single origin',
//     price: 280,
//     mrp: 340,
//     rating: 4.7,
//     reviews: 654,
//     badge: 'New',
//     size: '1000ml',
//     keyBenefits: ['Anti-bacterial', 'Omega-3 Rich'],
//     img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80',
//   },
//   {
//     id: 4,
//     name: 'Raw Sugarcane Jaggery',
//     subtitle: 'Unprocessed & mineral-rich',
//     price: 199,
//     mrp: 250,
//     couponPrice: 180,
//     rating: 4.9,
//     reviews: 2103,
//     badge: 'Best Seller',
//     size: '500g',
//     keyBenefits: ['Iron Rich', 'No Chemicals'],
//     img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
//   },
// ]

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
              className="text-3xl sm:text-4xl font-display font-bold text-bark leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Most Loved
            </h2>
          </div>
          <a
            href="#"
            className="hidden sm:flex items-center gap-1.5 text-sm font-body font-medium text-forest hover:text-bark transition-colors border-b border-forest/40 hover:border-bark pb-0.5"
          >
            Shop more →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

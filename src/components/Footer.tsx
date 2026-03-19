import { Leaf, Instagram, Youtube, Twitter, Facebook } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const links = {
    Shop: ['All Products', 'Cold Pressed Oils', 'Jaggery', 'Sugar', 'Salt', 'Deals'],
    Company: ['Our Story', 'Our Process', 'Farms & Farmers', 'Blog', 'Press'],
    Support: ['FAQs', 'Shipping Policy', 'Returns', 'Track Order', 'Contact Us'],
  }

  return (
    <footer className="bg-bark text-cream">
      {/* CTA strip */}
      <div className="bg-gold py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-2xl text-bark" style={{ fontFamily: 'var(--font-playfair)' }}>
              Get 10% off your first order
            </h3>
            <p className="text-bark/60 font-body text-sm mt-1">Join 50,000+ families eating better with Satvik</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 sm:w-64 px-4 py-2.5 rounded-full bg-white text-bark text-sm font-body outline-none focus:ring-2 focus:ring-forest"
            />
            <button className="px-6 py-2.5 rounded-full bg-bark text-cream font-body font-semibold text-sm hover:bg-forest transition-colors flex-shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              {/* <div className="w-9 h-9 rounded-full bg-forest flex items-center justify-center">
                <Leaf size={18} className="text-cream" />
              </div>
              <span className="text-2xl font-display font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
                Satvik
              </span> */}
              <Image alt='logo' src={'/logo.png'} height={100 } width={100}/>
            </div>
            <p className="text-cream/50 font-body text-sm leading-relaxed max-w-xs mb-6">
              Bringing back the goodness of traditional, chemical-free foods. Pure, honest, and crafted with care.
            </p>
            <div className="flex gap-3">
              {[Instagram, Youtube, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-forest transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <h4 className="font-body font-semibold text-sm uppercase tracking-widest text-cream/60 mb-4">{cat}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm font-body text-cream/50 hover:text-cream transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-cream/30">
          <p>© 2025 Satvik Foods Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-cream/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cream/60 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cream/60 transition-colors">FSSAI: 1234567890</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

'use client'
import { useState, useEffect } from 'react'
import { Search, Heart, ShoppingCart, Menu, X, Leaf } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = ['Oils', 'Jaggery', 'Sugar', 'Salt', 'Deals', 'Our Story']

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-cream-dark'
          : 'bg-transparent'
        }`}
    >
      {/* Top announcement bar */}
      <div className="bg-forest text-cream text-xs font-body font-medium text-center py-2 px-4 tracking-wide">
        🌿 Free delivery on orders above ₹499 &nbsp;|&nbsp; Use code <span className="font-semibold text-gold-light">SATVIK10</span> for 10% off
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 py-2 md:py-4">
          {/* Logo */}
          
          <Link href={'/'} className=''>
            <Image src={'/logo.png'} alt='logo' height={100} width={100} />
          </Link>


          {/* Search bar */}
          <div
            className={`hidden md:flex flex-1 max-w-xl mx-auto items-center gap-2 rounded-full border transition-all duration-300 px-4 py-2.5 ${searchFocused
                ? 'border-forest bg-white shadow-md shadow-forest/10'
                : 'border-cream-dark bg-cream-dark/60'
              }`}
          >
            <Search size={16} className={`flex-shrink-0 transition-colors ${searchFocused ? 'text-forest' : 'text-bark-light'}`} />
            <input
              type="text"
              placeholder='Try "cold pressed groundnut oil"'
              className="flex-1 bg-transparent text-sm font-body text-bark placeholder-bark-light/60 outline-none"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          {/* Nav + Icons */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-body font-medium text-bark/70 hover:text-bark transition-colors duration-200 relative group"
              >
                {link}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-forest group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3 ml-auto lg:ml-0">
            <button className="relative p-2 rounded-full hover:bg-cream-dark transition-colors group">
              <Heart size={20} className="text-bark/70 group-hover:text-terra transition-colors" />
              {/* <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-terra text-cream text-[9px] font-bold rounded-full flex items-center justify-center">2</span> */}
            </button>
            <button className="relative p-2 rounded-full hover:bg-cream-dark transition-colors group">
              <ShoppingCart size={20} className="text-bark/70 group-hover:text-forest transition-colors" />
              {/* <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-forest text-cream text-[9px] font-bold rounded-full flex items-center justify-center">3</span> */}
            </button>
            <button
              className="lg:hidden p-2 rounded-full hover:bg-cream-dark transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
       <div className=""></div>
      )}
    </header>
  )
}

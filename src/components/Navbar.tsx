'use client'

import React, { useState } from 'react'
import { Menu, ShoppingCart, User, Search, ChevronDown, Heart } from 'lucide-react'
import MobileMenu from './MobileMenu'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [cartCount, setCartCount] = useState(0)

    return (
        <>
            {/* Main Navbar */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left: Menu + Logo */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-50 hover:scale-102 transition-colors cursor-pointer"
                                aria-label="Open menu"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                            {/* desktop logo */}
                            <Link href="/" className="hidden md:block text-2xl font-bold text-green-800 hover:text-green-900 transition-colors">
                                <Image src={'/logo.png'} alt='logo' className='' width={110} height={60} />
                            </Link>
                        </div>

                        {/* mobile logo */}
                        <Link href="/" className="md:hidden text-2xl font-bold text-green-800 hover:text-green-900 transition-colors">
                            <Image src={'/logo.png'} alt='logo' className='' width={110} height={60} />
                        </Link>

                        {/* Center: Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <div className="relative group">
                                <button className="flex items-center text-gray-700 hover:text-green-700 font-medium transition-colors">
                                    Shop <ChevronDown className="ml-1 h-4 w-4" />
                                </button>
                                {/* Desktop dropdown menu would go here */}
                            </div>
                            <a
                                href="/shop"
                                className="text-gray-700 hover:text-green-700 font-medium transition-colors"
                            >
                                Shop by
                            </a>
                            <a
                                href="/about"
                                className="text-gray-700 hover:text-green-700 font-medium transition-colors"
                            >
                                About
                            </a>
                            <a
                                href="/connect"
                                className="text-gray-700 hover:text-green-700 font-medium transition-colors"
                            >
                                Connect
                            </a>
                        </div>

                        {/* Right: Action Icons */}
                        <div className="flex items-center md:gap-2">
                            <button
                                className="sm:flex p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                aria-label="Search"
                            >
                                <Search className="h-5 w-5" />
                            </button>
                            <Link
                                href="/account"
                                className=" hidden md:block p-2  text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                aria-label="Account"
                            >
                                <User className="h-5 w-5" />
                            </Link>

                            <button
                                className="p-2 text-gray-700 hover:bg-gray-100 rounded-md relative transition-colors"
                                aria-label="Shopping cart"
                            >
                                <Heart className="h-5 w-5" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0.5 right-0.5 bg-green-700 text-white text-xs rounded-full h-4 min-w-4 px-1 flex items-center justify-center font-semibold">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            <button
                                className="p-2 text-gray-700 hover:bg-gray-100 rounded-md relative transition-colors"
                                aria-label="Shopping cart"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0.5 right-0.5 bg-green-700 text-white text-xs rounded-full h-4 min-w-4 px-1 flex items-center justify-center font-semibold">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Component */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    )
}

export default Navbar
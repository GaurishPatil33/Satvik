'use client'

import React, { useEffect, useState } from 'react'
import { Menu, ShoppingCart, User, ChevronDown, Heart, X } from 'lucide-react'
import MobileMenu from './MobileMenu'
import Link from 'next/link'
import Image from 'next/image'
import Announcement_strip from './Announcement_strip'
import Searchbar from './Searchbar'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [cartCount, setCartCount] = useState(0)
    const [scrolled, setScrolled] = useState(false)


    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-cream-dark'
                    : 'bg-transparent'
                }`}
        > {/* Top announcement strip */}
            <Announcement_strip />


            {/* Main Navbar */}
            <nav className="bg-yellow-100/30 bg-linear-30 from-green-100 to-yellow-50 border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto md:px-4 px-2 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left: Menu + Logo */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="lg:hidden p-2 rounded-md text-green-800 hover:bg-green-50 hover:scale-102 transition-colors cursor-pointer"
                                aria-label="Open menu"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                            {/* desktop logo */}
                            <Link href="/" className="hidden lg:block text-2xl font-bold text-green-800 hover:text-green-900 transition-colors">
                                <Image src={'/logo.png'} alt='logo' className='' width={110} height={60} />
                            </Link>
                        </div>

                        {/* mobile logo */}
                        <Link href="/" className="lg:hidden text-2xl font-bold text-green-800 hover:text-green-900 transition-colors">
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



                        {/*  Actions */}
                        <div className="flex items-center gap-3">
                            {/* search */}
                            <div className="hidden md:flex">
                                <Searchbar />
                            </div>

                            {/* Right: Action Icons */}
                            <div className="flex items-center md:gap-2">
                                {/* <button
                                    className="sm:flex p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                    aria-label="Search"
                                >
                                    <Search className="h-5 w-5" />
                                </button> */}
                                <Link
                                    href="/account"
                                    className=" hidden md:block p-2  text-green-900 hover:bg-gray-100 rounded-md transition-colors"
                                    aria-label="Account"
                                >
                                    <User className="h-5 w-5" />
                                </Link>

                                <button
                                    className="p-2 text-green-900 hover:bg-gray-100 rounded-md relative transition-colors"
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
                                    className="p-2 text-green-900 hover:bg-gray-100 rounded-md relative transition-colors"
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
                    <div className=" px-2 md:hidden pb-2">
                        <Searchbar />
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Component */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            </header>
            )
}

            export default Navbar
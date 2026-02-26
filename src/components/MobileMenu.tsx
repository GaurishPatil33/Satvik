import React, { useState } from 'react'
import { X, ChevronDown, Gift, User } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import Link from 'next/link'

interface Props {
    isOpen: boolean
    onClose: () => void
}

interface CategoryItem {
    name: string
    icon: string
    href: string
}

interface MenuSection {
    title: string
    icon?: string
    expandable: boolean
    items?: { name: string; href: string }[]
}

const MobileMenu = ({ isOpen, onClose }: Props) => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null)

    const categories: CategoryItem[] = [
        { name: 'Ghee', icon: '', href: '/category/ghee' },
        { name: 'Oil', icon: '', href: '/category/oil' },
        { name: 'Spices', icon: '', href: '/category/spices' },
        { name: 'Jaggery', icon: '', href: '/category/jaggery' },
        { name: 'Breakfast & Snacks', icon: '', href: '/category/breakfast-snacks' },
        // { name: 'Immunity', icon: '', href: '/category/immunity' },
        // { name: 'Flours', icon: '', href: '/category/flours' },
        // { name: 'Grain & Pulses', icon: '', href: '/category/grain-pulses' },
    ]

    const menuSections: MenuSection[] = [
        {
            title: 'SHOP ALL',
            expandable: false,
        },
        {
            title: 'SHOP BY',
            expandable: true,
            items: [
                // { name: 'Digestive Health', href: '/concern/digestive' },
                // { name: 'Heart Health', href: '/concern/heart' },
                // { name: 'Weight Management', href: '/concern/weight' },
                // { name: 'Immunity Boost', href: '/concern/immunity' },
            ],
        },
        // {
        //     title: 'FARM LIFE',
        //     icon: '🌱',
        //     expandable: true,
        //     items: [
        //         { name: 'Our Story', href: '/farm-life/story' },
        //         { name: 'Sustainability', href: '/farm-life/sustainability' },
        //         { name: 'Visit Farm', href: '/farm-life/visit' },
        //     ],
        // },
        {
            title: 'CONNECT',
            expandable: false,
        },
    ]

    const toggleSection = (title: string) => {
        setExpandedSection(expandedSection === title ? null : title)
    }

    const handleCategoryClick = () => {
        onClose()
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-[80%] max-w-[320px] bg-white shadow-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] z-50 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 left-3 p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors z-10"
                    aria-label="Close menu"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Scrollable Content */}
                <div className="h-full overflow-y-auto pt-14 pb-6">
                    {/* Categories Grid */}
                    <div className="px-4 mb-4">
                        <div className="grid grid-cols-3 gap-3">
                            {categories.map((category, index) => (
                                <Link
                                    key={index}
                                    href={category.href}
                                    onClick={handleCategoryClick}
                                    className="flex flex-col items-center text-center group"
                                >
                                    <div className="w-14 h-14 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center mb-1.5 group-hover:bg-green-100 group-hover:border-green-300 transition-all duration-200">
                                        <span className="text-2xl">{category.icon}</span>
                                    </div>
                                    <span className="text-[10px] leading-tight text-green-800 font-semibold">
                                        {category.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Menu Sections */}
                    <div className="px-2">
                        {menuSections.map((section, index) => (
                            <div key={index} className="mb-1">
                                {section.expandable ? (
                                    <>
                                        <button
                                            onClick={() => toggleSection(section.title)}
                                            className="w-full flex items-center justify-between py-3 px-3 text-green-800 font-bold text-xs hover:bg-gray-50 rounded-md transition-colors"
                                        >
                                            <span className="flex items-center gap-2">
                                                {section.icon && <span>{section.icon}</span>}
                                                {section.title}
                                            </span>
                                            <ChevronDown
                                                className={`h-4 w-4 transition-transform duration-200 ${
                                                    expandedSection === section.title ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </button>
                                        {expandedSection === section.title && section.items && (
                                            <div className="pl-6 pr-3 pb-2 space-y-1">
                                                {section.items.map((item, itemIndex) => (
                                                    <a
                                                        key={itemIndex}
                                                        href={item.href}
                                                        onClick={handleCategoryClick}
                                                        className="block py-2 text-sm text-gray-700 hover:text-green-700 hover:bg-gray-50 rounded px-2 transition-colors"
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <a
                                        href={`/${section.title.toLowerCase().replace(/ /g, '-')}`}
                                        onClick={handleCategoryClick}
                                        className="block py-3 px-3 text-green-800 font-bold text-xs hover:bg-gray-50 rounded-md transition-colors"
                                    >
                                        {section.title}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Whatsapp Button */}
                    <div className="px-4 mb-4 flex items-center gap-2" >
                        <button
                            className="  overflow-visible justify-center hover:bg-green-900 hover:shadow-xl transition-all duration-200 hover:scale-105"
                        >
                            <FaWhatsapp className=" text-green-500" size={40} />
                        </button>
                        <div className=" text-green-600">9999999999</div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Account Link */}
                    <div className="px-4">
                        <a
                            href="/account"
                            onClick={handleCategoryClick}
                            className="flex items-center py-3 text-gray-800 hover:text-green-700 transition-colors"
                        >
                            <User className="h-5 w-5 mr-3 text-gray-600" />
                            <span className="font-medium text-sm">Account</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileMenu
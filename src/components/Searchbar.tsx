import { SearchIcon, X } from 'lucide-react';
import React, { useState } from 'react'

const Searchbar = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");


    return (
        <div className="">
            {/* Search bar */}
            <div
                className={`
                    "relative transition-all duration-300",
                    searchOpen ? "w-48 sm:w-64" : "w-9"
                `}
            >
                <div className="flex items-center border border-green-800/90 rounded-full px-3 py-1 md:py-1.5 bg-white">
                    <SearchIcon size={14} className="text-green-800 shrink-0" />
                    <input
                        autoFocus
                        type="text"
                        placeholder='Try "groundnut oil"'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ml-2 text-xs bg-transparent outline-none text-green-800 placeholder:text-brand-earth/50 w-full"
                        onBlur={() => !searchQuery && setSearchOpen(false)}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => { setSearchQuery(""); setSearchOpen(false); }}
                            className="ml-1 text-white bg-green-600/80 rounded-full p-0.5 hover:text-brand-forest"
                        >
                            <X size={12} />
                        </button>
                    )}
                </div>
            </div>
            {/* <button
                onClick={() => setSearchOpen(true)}
                className=" md:hidden w-9 h-9 rounded-full hover:bg-brand-ivory flex items-center justify-center transition-colors"
                aria-label="Search"
            >
                <SearchIcon size={20} className="text-brand-forest" />
            </button> */}
            {searchOpen && (
                <div className=" fixed "></div>
            )}
        </div>
    )
}

export default Searchbar
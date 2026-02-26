import React from 'react'

const Announcement_strip = () => {
    return (
        <>
            {/* Top announcement strip */}
            <div className="bg-green-800 text-white text-center text-xs py-1.5 font-body overflow-hidden">
                <div className="marquee whitespace-nowrap">
                    <span className="mx-6">🌿 Free delivery on orders above ₹499</span>
                    <span className="mx-6">🔬 100% Lab-tested purity</span>
                    <span className="mx-6">🌿 Use code SATVIK20 for 20% off</span>
                    <span className="mx-6">📦 Glass-bottled, no plastic</span>

                    {/* Duplicate for seamless effect */}
                    <span className="mx-6">🌿 Free delivery on orders above ₹499</span>
                    <span className="mx-6">🔬 100% Lab-tested purity</span>
                    <span className="mx-6">🌿 Use code SATVIK20 for 20% off</span>
                    <span className="mx-6">📦 Glass-bottled, no plastic</span>
                </div>
            </div>
        </>

    )
}

export default Announcement_strip
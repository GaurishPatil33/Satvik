"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: "🏠", path: "/" },
  { name: "Analytics", icon: "📊", path: "/analytics" },
  { name: "Users", icon: "👤", path: "/users" },
  { name: "Settings", icon: "⚙️", path: "/settings" },
];
interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function MobileSidebar({ isOpen, onClose }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {isOpen && (

        <>
          {/* overlay */}
          < div
            onClick={onClose}
            aria-hidden="true"
            className={`fixed inset-0 z-40 transition-all duration-300 ${isOpen
              ? "bg-black/40 backdrop-blur-[2px] pointer-events-auto"
              : "bg-transparent pointer-events-none"
              }`}
          />

          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className={`fixed top-0 right-0 z-50 h-full w-full max-w-[400px] bg-[#FEFBF5] shadow-2xl
            flex flex-col transform transition-all duration-400 ease-[cubic-bezier(0.24,1,0.36,1)] 
            ${isOpen ? "animate-slide-in-right" : "animate-slide-out-right"}`}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EEE8DC] bg-[#FDF6EC]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 flex items-center justify-center">
                  {/* <Leaf size={13} className="text-[#FDF6EC]" /> */}
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-[#2C4A2E] leading-none font-[family-name:var(--font-display,serif)]">
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-[#EEE8DC] flex items-center justify-center transition-colors text-[#8B5E3C]"
                aria-label="Close cart"
              >
                <X size={16} />
              </button>
            </div>
          </aside>
        </>)}
    </>
  )
}
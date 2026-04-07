"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, Bell, ChevronDown, Sun, ExternalLink } from "lucide-react";
import Link from "next/link";

const breadcrumbMap: Record<string, string> = {
    "/admin/dashboard": "Dashboard",
    "/admin/orders": "Orders",
    "/admin/products": "Products",
    "/admin/customers": "Customers",
    "/admin/analytics": "Analytics",
    "/admin/reviews": "Reviews",
    "/admin/coupons": "Coupons",
    "/admin/settings": "Settings",
    "/admin/notifications": "Notifications",
};

export function AdminTopbar() {
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState("");
    const title = breadcrumbMap[pathname] ?? "Admin";

    const router = useRouter();

    const getSearchRoute = (query: string) => {
        const q = query.toLowerCase();

        if (q.includes("order")) return "/admin/orders";
        if (q.includes("product") || q.includes("oil") || q.includes("item")) return "/admin/products";
        if (q.includes("customer") || q.includes("user") || q.includes("name")) return "/admin/customers";

        // fallback
        return "/admin/products";
    }
    useEffect(() => {
        const delay = setTimeout(() => {
            router.push(`?search=${searchQuery}`);
        }, 400);

        return () => clearTimeout(delay);
    }, [searchQuery]);

    return (
        <header className="h-16 bg-white border-b border-gray-100 px-6 lg:px-8 flex items-center justify-between shrink-0 z-10">
            {/* Left: breadcrumb */}
            <div className="flex items-center gap-2 text-sm font-body">
                <span className="text-gray-400">Satvik</span>
                <span className="text-gray-300">/</span>
                <span className="font-semibold text-[#1A2E1B]">{title}</span>
            </div>

            {/* Center: search */}
            <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 w-72">
                <Search size={14} className="text-gray-400 shrink-0" />
                <input
                    type="text"
                    placeholder="Search orders, products, customers…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none w-full font-body"
                />
                {searchQuery && (
                    <button onClick={() => setSearchQuery("")}>✕</button>
                )}
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-3">
                {/* View storefront */}
                <Link
                    href="/"
                    target="_blank"
                    className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#1A2E1B] transition-colors font-body border border-gray-200 px-3 py-1.5 rounded-lg hover:border-gray-300"
                >
                    <ExternalLink size={12} />
                    View Store
                </Link>

                {/* Notifications */}
                <button className="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <Bell size={15} className="text-gray-500" />
                    {/* <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">3</span> */}
                </button>

                {/* Profile */}
                <button className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 hover:bg-gray-100 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-[#C8961C] flex items-center justify-center text-white text-[10px] font-bold">
                        SA
                    </div>
                    <span className="text-sm font-body font-medium text-gray-700 hidden sm:inline">Admin</span>
                    <ChevronDown size={12} className="text-gray-400 hidden sm:block" />
                </button>
            </div>
        </header>
    );
}
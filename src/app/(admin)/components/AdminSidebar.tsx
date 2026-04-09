"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Package, ShoppingCart, Users,
    BarChart2, Settings, ChevronRight, Tag, Star,
    Bell, LogOut, Leaf,
    ChevronLeft
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { useAuth } from "@/src/hooks/useAuth";

const navGroups = [
    {
        label: "Main",
        items: [
            { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
            { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
            { label: "Products", href: "/admin/products", icon: Package },
            { label: "Customers", href: "/admin/customers", icon: Users },
        ],
    },
    {
        label: "Insights",
        items: [
            { label: "Analytics", href: "/admin/analytics", icon: BarChart2 },
            { label: "Reviews", href: "/admin/reviews", icon: Star },
            { label: "Coupons", href: "/admin/coupons", icon: Tag },
        ],
    },
    {
        label: "System",
        items: [
            { label: "Notifications", href: "/admin/notifications", icon: Bell },
            { label: "Settings", href: "/admin/settings", icon: Settings },
        ],
    },
];

export function AdminSidebar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const [collapsed, setCollapsed] = useState(false);

    // Load saved state
    useEffect(() => {
        const saved = localStorage.getItem("sidebar-collapsed");
        if (saved) setCollapsed(JSON.parse(saved));
    }, []);

    // Persist state
    useEffect(() => {
        localStorage.setItem("sidebar-collapsed", JSON.stringify(collapsed));
    }, [collapsed]);

    return (
        <aside
            className={cn(
                "bg-[#1A2E1B] text-white flex flex-col h-full shrink-0 transition-all duration-300 z-60",
                collapsed ? "w-20 " : "w-64"
            )}
        >
            {/* Logo */}
            <div className="px-4 py-5 border-b border-white/10 flex items-center gap-3">
                {collapsed ? (
                    // <Leaf size={20} />
                    <div className=""></div>
                ) : (
                    <Image src="/logo.png" alt="logo" width={80} height={20} />
                )}
                {/* <div className=" h-20 w-80 ">
                    <Image src="/logo.png" alt="logo" width={80} height={20} className="h-full w-full" />
                </div> */}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="ml-auto text-white/50 hover:text-white"
                >
                    <ChevronLeft
                        size={16}
                        className={cn("transition-transform", collapsed && "rotate-180")}
                    />
                </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-2 py-4 overflow-y-auto space-y-6 overflow-x-hidden">
                {navGroups.map((group) => (
                    <div key={group.label}>

                        {!collapsed && (
                            <p className="text-[10px]  font-semibold uppercase tracking-widest text-white/30 px-3 mb-2">
                                {group.label}
                            </p>
                        )}

                        <ul className="space-y-1">
                            {group.items.map((item) => {
                                const Icon = item.icon;
                                const active =
                                    pathname === item.href ||
                                    pathname.startsWith(item.href + "/");

                                return (
                                    <li key={item.href} className="relative group">
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                                                collapsed ? "justify-center" : "gap-3",
                                                active
                                                    ? "bg-[#C8961C] text-white shadow-lg"
                                                    : "text-white/60 hover:text-white hover:bg-white/10"
                                            )}
                                        >
                                            <Icon
                                                size={16}
                                                className={cn(
                                                    active ? "text-white" : "text-white/50 group-hover:text-white"
                                                )}
                                            />

                                            {/* Label */}
                                            {!collapsed && (
                                                <span className="flex-1">{item.label}</span>
                                            )}

                                            {/* Active indicator */}
                                            {!collapsed && active && (
                                                <ChevronRight size={12} className="text-white/60" />
                                            )}
                                        </Link>

                                        {/* Tooltip */}
                                        {collapsed && (
                                            <div className="absolute left-16 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
                                                <div className="
                                                  relative bg-gray-900 text-white text-xs px-3 py-1.5 rounded-md
                                                 shadow-lg border border-white/10
                                                  opacity-0 translate-x-2 scale-95
                                                      group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100
                                              transition-all duration-200 whitespace-nowrap
                                                     ">
                                                    {item.label}

                                                    {/* Arrow */}
                                                    <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 
                                                         w-2 h-2 bg-gray-900 rotate-45 border-l border-t border-white/10"></div>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>

            {/* User */}
            <div className="px-2 py-4 border-t border-white/10">
                <div
                    className={cn(
                        "flex items-center gap-3 px-3 py-2",
                        collapsed && "justify-center"
                    )}
                >
                    <div className="w-8 h-8 rounded-full bg-[#C8961C] flex items-center justify-center text-xs font-bold">
                        {user?.first_name?.[0]}
                    </div>

                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">
                                {user?.first_name}
                            </p>
                            <p className="text-[10px] text-white/40 truncate">
                                {user?.email}
                            </p>
                        </div>
                    )}

                    <button
                        onClick={logout}
                        className="text-white/30 hover:text-white"
                    >
                        <LogOut size={14} />
                    </button>
                </div>
            </div>
        </aside>
    );
}
"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: "🏠", path: "/" },
  { name: "Analytics", icon: "📊", path: "/analytics" },
  { name: "Users", icon: "👤", path: "/users" },
  { name: "Settings", icon: "⚙️", path: "/settings" },
];

export default function MobileSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      {/* <div
        className={`h-screen bg-gray-900 text-white transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          {!collapsed && <h1 className="text-lg font-bold">Admin</h1>}
          <button onClick={() => setCollapsed(!collapsed)}>
            <Menu size={20} />
          </button>
        </div>

        <ul className="mt-6 space-y-2">
          {menuItems.map((item) => (
            <li key={item.name} className="relative group">
              <Link
                href={item.path}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded"
              >
                <span>{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </Link>

              {collapsed && (
                <span className="absolute left-20 top-1/2 -translate-y-1/2 
                  whitespace-nowrap bg-gray-800 text-sm px-2 py-1 rounded 
                  opacity-0 group-hover:opacity-100 transition">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div> */}
    </div>
  );
}
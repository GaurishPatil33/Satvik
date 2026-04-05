"use client";

import { Customer, customers } from "@/src/lib/adminData";
import { formatPrice, cn } from "@/src/lib/utils";
import { MapPin, ShoppingBag, TrendingUp, Mail, Phone, Search } from "lucide-react";
import { useState } from "react";
import { SectionCard } from "../../components/Ui";


function CustomerRow({ customer, onClick }: { customer: Customer; onClick: () => void }) {
  return (
    <tr className="hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={onClick}>
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#C8961C]/20 text-[#C8961C] text-xs font-bold flex items-center justify-center shrink-0">
            {customer.avatar}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-900 font-body">{customer.name}</p>
            <p className="text-[10px] text-gray-400 font-body">{customer.email}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-4 text-xs text-gray-600 font-body">{customer.phone}</td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-1 text-xs text-gray-500 font-body">
          <MapPin size={10} />
          {customer.city}, {customer.state}
        </div>
      </td>
      <td className="px-5 py-4 text-xs font-semibold text-gray-900 font-body text-center">{customer.totalOrders}</td>
      <td className="px-5 py-4">
        <span className="font-bold text-sm text-gray-900 font-body">{formatPrice(customer.totalSpent)}</span>
      </td>
      <td className="px-5 py-4 text-xs text-gray-400 font-body">
        {new Date(customer.lastOrderAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
      </td>
      <td className="px-5 py-4">
        <span className={cn(
          "text-[11px] px-2.5 py-1 rounded-full font-body font-semibold",
          customer.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
        )}>
          {customer.status}
        </span>
      </td>
      <td className="px-5 py-4">
        <div className="flex gap-1 flex-wrap">
          {customer.tags.map((tag) => (
            <span key={tag} className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-body capitalize">
              {tag}
            </span>
          ))}
        </div>
      </td>
    </tr>
  );
}

function CustomerDetailPanel({ customer, onClose }: { customer: Customer; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end" onClick={onClose}>
      <div
        className="w-full max-w-sm bg-white h-full overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1A2E1B] to-[#2C4A2E] px-6 py-8 text-white">
          <button onClick={onClose} className="text-white/50 hover:text-white text-xs mb-4 font-body">← Back</button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#C8961C] flex items-center justify-center text-2xl font-bold">
              {customer.avatar}
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">{customer.name}</h2>
              <p className="text-white/60 text-xs font-body">Member since {new Date(customer.joinedAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</p>
              <span className={cn(
                "inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-body",
                customer.status === "active" ? "bg-emerald-500/30 text-emerald-300" : "bg-gray-500/30 text-gray-400"
              )}>
                {customer.status}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: ShoppingBag, label: "Orders", value: customer.totalOrders },
              { icon: TrendingUp, label: "Total Spent", value: formatPrice(customer.totalSpent) },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-4 text-center">
                <Icon size={16} className="text-[#C8961C] mx-auto mb-1" />
                <p className="font-display text-lg font-bold text-gray-900">{value}</p>
                <p className="text-[10px] text-gray-400 font-body">{label}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 font-body">Contact Details</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-700 font-body">
                <Mail size={14} className="text-gray-400 shrink-0" />
                {customer.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 font-body">
                <Phone size={14} className="text-gray-400 shrink-0" />
                {customer.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 font-body">
                <MapPin size={14} className="text-gray-400 shrink-0" />
                {customer.city}, {customer.state}
              </div>
            </div>
          </div>

          {/* Tags */}
          {customer.tags.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 font-body">Segments</p>
              <div className="flex gap-2 flex-wrap">
                {customer.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-[#C8961C]/10 text-[#C8961C] px-3 py-1.5 rounded-full font-body capitalize font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button className="w-full py-2.5 bg-[#2C4A2E] text-white rounded-xl text-sm font-body font-medium hover:bg-[#3D6B40] transition-colors">
              📧 Send Email
            </button>
            <button className="w-full py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-body hover:bg-gray-50 transition-colors">
              📋 View Order History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive" | "vip">("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filtered = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "vip" && c.tags.includes("vip")) ||
      c.status === filter;
    return matchSearch && matchFilter;
  });

  const totalRevenue = customers.reduce((s, c) => s + c.totalSpent, 0);

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 font-body mt-0.5">{customers.length} registered customers</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Customers", value: customers.length, icon: "👥" },
          { label: "Active", value: customers.filter((c) => c.status === "active").length, icon: "✅" },
          { label: "VIP Members", value: customers.filter((c) => c.tags.includes("vip")).length, icon: "⭐" },
          { label: "Total Revenue", value: formatPrice(totalRevenue), icon: "₹" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100">
            <span className="text-2xl">{s.icon}</span>
            <p className="font-sans text-2xl font-bold text-gray-900 mt-2">{s.value}</p>
            <p className="text-xs text-gray-400 font-body">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap items-center">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-white outline-none focus:border-gray-300 w-52 font-body"
          />
        </div>
        {(["all", "active", "vip", "inactive"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-body font-medium capitalize transition-all",
              filter === f ? "bg-[#1A2E1B] text-white" : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <SectionCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Customer", "Phone", "Location", "Orders", "Total Spent", "Last Order", "Status", "Tags"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider font-body whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  onClick={() => setSelectedCustomer(customer)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {selectedCustomer && (
        <CustomerDetailPanel customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
      )}
    </div>
  );
}
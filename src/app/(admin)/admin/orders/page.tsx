"use client";

import { OrderStatus, orders } from "@/src/lib/adminData";
import { cn, formatPrice } from "@/src/lib/utils";
import { Download, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionCard, OrderStatusBadge } from "../../components/Ui";


const statusFilters: { label: string; value: OrderStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const statusCounts = orders.reduce((acc, o) => {
  acc[o.status] = (acc[o.status] ?? 0) + 1;
  return acc;
}, {} as Record<string, number>);

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleSelect = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const toggleAll = () =>
    setSelected(selected.length === filtered.length ? [] : filtered.map((o) => o.id));

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500 font-body mt-0.5">{orders.length} total orders</p>
        </div>
        <button className="flex items-center gap-2 bg-[#2C4A2E] text-white px-4 py-2.5 rounded-xl text-sm font-body font-medium hover:bg-[#3D6B40] transition-colors">
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Status filter pills */}
      <div className="flex gap-2 flex-wrap">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-body font-medium transition-all",
              statusFilter === f.value
                ? "bg-[#1A2E1B] text-white shadow-sm"
                : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
            )}
          >
            {f.label}
            {f.value !== "all" && statusCounts[f.value] != null && (
              <span className={cn(
                "ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full",
                statusFilter === f.value ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
              )}>
                {statusCounts[f.value]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table card */}
      <SectionCard
        action={
          <div className="flex items-center gap-3">
            {selected.length > 0 && (
              <span className="text-sm text-[#C8961C] font-semibold font-body">
                {selected.length} selected
              </span>
            )}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-gray-300 w-52 font-body"
              />
            </div>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-3 w-10">
                  <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0}
                    onChange={toggleAll} className="rounded accent-[#C8961C]" />
                </th>
                {["Order #", "Customer", "Date", "Items", "Total", "Payment", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider font-body whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order) => (
                <>
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={selected.includes(order.id)}
                        onChange={() => toggleSelect(order.id)} className="rounded accent-[#C8961C]" />
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-gray-900 text-xs font-body">{order.orderNumber}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#C8961C]/20 text-[#C8961C] text-[11px] font-bold flex items-center justify-center shrink-0">
                          {order.customer.avatar}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-800 font-body">{order.customer.name}</p>
                          <p className="text-[10px] text-gray-400 font-body">{order.customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-500 font-body whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs text-gray-600 font-body">{order.items.length} item{order.items.length > 1 ? "s" : ""}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-semibold text-gray-900 text-sm font-body">{formatPrice(order.total)}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-body">{order.paymentMethod}</span>
                    </td>
                    <td className="px-4 py-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-4 text-right">
                      <ChevronDown size={14} className={cn("text-gray-400 transition-transform", expandedOrder === order.id && "rotate-180")} />
                    </td>
                  </tr>

                  {/* Expanded row */}
                  {expandedOrder === order.id && (
                    <tr key={`${order.id}-expanded`} className="bg-amber-50/30">
                      <td colSpan={9} className="px-5 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Items */}
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 font-body">Order Items</p>
                            <ul className="space-y-2">
                              {order.items.map((item, i) => (
                                <li key={i} className="flex justify-between text-xs font-body">
                                  <span className="text-gray-700">{item.name} <span className="text-gray-400">({item.size})</span> ×{item.qty}</span>
                                  <span className="font-semibold text-gray-900">{formatPrice(item.price * item.qty)}</span>
                                </li>
                              ))}
                              <li className="flex justify-between text-xs font-semibold pt-2 border-t border-gray-200 font-body">
                                <span className="text-gray-700">Total</span>
                                <span className="text-gray-900">{formatPrice(order.total)}</span>
                              </li>
                            </ul>
                          </div>

                          {/* Delivery address*/}
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 font-body">Delivery Address</p>
                            <p className="text-xs text-gray-700 font-body leading-relaxed">
                              {order.customer.name}<br />
                              {order.address}<br />
                              {order.city}, {order.state}<br />
                              {order.customer.phone}
                            </p>
                          </div>

                          {/* Actions */}
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 font-body">Update Status</p>
                            <div className="flex flex-wrap gap-2">
                              {(["confirmed", "shipped", "delivered"] as OrderStatus[]).map((s) => (
                                <button key={s} className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-[#2C4A2E] hover:text-[#2C4A2E] transition-colors font-body capitalize">
                                  → {s}
                                </button>
                              ))}
                              <button className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors font-body">
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400 font-body">
              <p className="text-3xl mb-2">🔍</p>
              <p className="text-sm">No orders match your filters</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-400 font-body">Showing {filtered.length} of {orders.length} orders</p>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button key={p} className={cn(
                "w-8 h-8 rounded-lg text-sm font-body",
                p === 1 ? "bg-[#1A2E1B] text-white" : "text-gray-500 hover:bg-gray-100"
              )}>{p}</button>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
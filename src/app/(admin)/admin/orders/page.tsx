"use client";

import { OrderStatus, orders1 } from "@/src/lib/adminData";
import { cn, formatPrice } from "@/src/lib/utils";
import { Download, Search, ChevronDown, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SectionCard, OrderStatusBadge } from "../../components/Ui";
import { IOrder } from "@/src/types/order-types";
import { getAllOrders, updateOrder } from "@/src/services/order.service";
import { IUser } from "@/src/types/user-types";
import { getAllUsers } from "@/src/services/user.services";
import OrdersTable from "../../components/orders/Table";

export interface IOrderWithUser extends IOrder {
  user?: IUser;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

type OrderStatusFilter = IOrder["order_status"] | "all";

const statusFilters: { label: string; value: OrderStatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  // { label: "Returned", value: "returned" },
];


const statusCounts = orders1.reduce((acc, o) => {
  acc[o.status] = (acc[o.status] ?? 0) + 1;
  return acc;
}, {} as Record<string, number>);

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>()
  const [users, setUsers] = useState<IUser[]>()
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<IOrder["order_status"] | "all">("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {

        const fetchOrder = await getAllOrders()
        setOrders(fetchOrder)
        const fetchUsers = await getAllUsers()
        setUsers(fetchUsers)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])


  const handleUpdateStatus = async (
    orderId: string,
    status: IOrder["order_status"]
  ) => {
    try {
      setUpdatingId(orderId);

      const updated = await updateOrder(orderId, {
        order_status: status,
      });

      setOrders((prev) =>
        prev?.map((o) => (o.id === orderId ? { ...o, order_status: updated.order_status } : o))
      );
    } catch (err) {
      console.error("Failed to update order status", err);
      alert("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };


  const ordersWithUsers: IOrderWithUser[] = (orders ?? []).map((order) => {
    const user = (users ?? []).find((u) => u.id === order.user_id);

    return {
      ...order,
      user,
      customerName: user ? `${user.first_name} ${user.last_name}` : "Unknown User",
      customerEmail: user?.email ?? "—",
      customerPhone: user?.phone ?? "—",
    };
  });

  const filtered: IOrderWithUser[] = ordersWithUsers?.filter((o) => {
    const searchLower = search.toLowerCase()
    const matchSearch =
      o.id.toLowerCase().includes(searchLower) ||
      o.user?.first_name.toLowerCase().includes(searchLower) ||
      o.user?.last_name.toLowerCase().includes(searchLower) ||
      o.user?.email.toLowerCase().includes(searchLower) ||
      o.user?.phone.toLowerCase().includes(searchLower)
    const matchStatus = statusFilter === "all" || o.order_status === statusFilter;
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
          <p className="text-sm text-gray-500 font-body mt-0.5">{orders?.length} total orders</p>
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
        <OrdersTable orders={filtered} updatingId={updatingId} handleUpdateStatus={handleUpdateStatus} isLoading={loading} />
      </SectionCard>
    </div>
  );
}
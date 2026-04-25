"use client";

import { ChevronDown, Edit2, Package, Trash2, User } from "lucide-react";
import Image from "next/image";
import { ICategory } from "@/src/types/category-types";
import { useEffect, useState } from "react";
import { IOrderWithUser } from "../../admin/orders/page";
import React from "react";
import { cn, formatPrice } from "@/src/lib/utils";
import { categories } from "@/src/lib/data";
import { IOrder } from "@/src/types/order-types";
import { OrderStatusBadge } from "../Ui";

interface Props {
  orders?: IOrderWithUser[] | null;
  updatingId: string | null
  handleUpdateStatus: (
    orderId: string,
    status: IOrder["order_status"]
  ) => void;
  // onDelete: (category: ICategory) => void;
  isLoading?: boolean
}

export default function OrdersTable({
  orders,
  updatingId,
  handleUpdateStatus,
  isLoading = false
}: Props) {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<IOrder["order_status"] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = orders?.length ?? 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginated = orders?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    setCurrentPage(1);
  }, [orders]);



  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>

          <tr className="border-b border-gray-300">
            {["Order id", "customer", "date", "items", "total", "payment", "status", ""].map((h) => (
              <th
                key={h}
                className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider font-body"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                {Array.from({ length: 7 }).map((__, j) => (
                  <td key={j} className="px-5 py-4">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </td>
                ))}
              </tr>
            ))
          ) : (
            paginated?.map((order, i) => (
              <React.Fragment key={i}>
                <tr
                  className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >

                  <td className="px-4 py-4">
                    <p className="font-semibold text-gray-900 text-xs font-body">{order.id.slice(0,8)}</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#C8961C]/20 text-[#C8961C] text-[11px] font-bold flex items-center justify-center shrink-0">
                        {/* {order.customer.avatar} */}
                        <User />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800 font-body">
                          {/* {order.customerName } */}
                          {order.user?.first_name}
                        </p>
                        <p className="text-[10px] text-gray-400 font-body">{order.customerEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-500 font-body whitespace-nowrap">
                    {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs text-gray-600 font-body">{order.items.length} item{order.items.length > 1 ? "s" : ""}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-semibold text-gray-900 text-sm font-body">{formatPrice(order.total_amount)}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-body">{order.payment_status}</span>
                  </td>
                  <td className="px-4 py-4">
                    <OrderStatusBadge status={order.order_status} />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <ChevronDown size={14} className={cn("text-gray-400 transition-transform", expandedOrder === order.id && "rotate-180")} />
                  </td>
                </tr>

                {/* Expanded row */}
                {expandedOrder === order.id && (
                  <tr key={`${order.id}-expanded`} className="bg-amber-50/30">
                    <td colSpan={8} className="px-5 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Items */}
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 font-body">Order Items</p>
                          <ul className="space-y-2">
                            {order.items.map((item, i) => (
                              <li key={i} className="flex justify-between text-xs font-body">
                                <span className="text-gray-700">{item.title}
                                  {/* <span className="text-gray-400">({item.size})</span> */}
                                  <span className="text-gray-400">({item.price_at_purchase})</span>
                                  ×{item.quantity}
                                </span>
                                <span className="font-semibold text-gray-900">{formatPrice(item.price_at_purchase * item.quantity)}</span>
                              </li>
                            ))}
                            <li className="flex justify-between text-xs font-semibold pt-2 border-t border-gray-200 font-body">
                              <span className="text-gray-700">Total</span>
                              <span className="text-gray-900">{formatPrice(order.total_amount)}</span>
                            </li>
                          </ul>
                        </div>

                        {/* Delivery address*/}
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 font-body">Delivery Address</p>
                          <p className="text-xs text-gray-700 font-body leading-relaxed">
                            {order.shipping_address?.full_name}<br />
                            {order.shipping_address?.street}<br />
                            {order.shipping_address?.city}, {order.shipping_address?.state}<br />
                            {order.shipping_address?.phone}
                          </p>
                        </div>

                        {/* Actions */}
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 font-body">Update Status</p>
                          <div className="flex flex-wrap gap-2">
                            {(["processing", "shipped", "delivered", "cancelled"] as IOrder["order_status"][]).map((s) => (
                              <button
                                key={s}
                                disabled={updatingId === order.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setUpdatingStatus(s);
                                  handleUpdateStatus(order.id, s);
                                }}
                                className={cn(
                                  "text-xs px-3 py-1.5 rounded-lg border transition-colors font-body capitalize",
                                  updatingId === order.id
                                    ? "opacity-50 cursor-not-allowed"
                                    : "border-gray-200 text-gray-600 hover:border-[#2C4A2E] hover:text-[#2C4A2E]"
                                )}
                              >
                               {updatingId === order.id && updatingStatus === s ? "Updating..." : `→ ${s}`}
                              </button>
                            ))}
                            {/* <button className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors font-body">
                                Cancel
                              </button> */}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}

          {/* no products */}
          {!isLoading && orders?.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-10 text-gray-400">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>


      <div className="flex items-center justify-between mt-4 px-2">
        <p className="text-xs text-gray-500">
          Page {currentPage} of {totalPages || 1}
        </p>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 text-xs rounded-md border disabled:opacity-50"
          >
            Prev
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 text-xs rounded-md border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}





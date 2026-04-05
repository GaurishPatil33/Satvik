import { formatPrice } from "@/src/lib/utils";
import { Package } from "lucide-react";
import { OrderStatusBadge } from "../Ui";
import { OrderStatus } from "@/src/lib/adminData";

interface Order {
    id: string;
    orderNumber: string;
    createdAt: string;
    total: number;
    status: OrderStatus;
    city?: string;
    customer: {
        name: string;
        avatar: string; // initials
    };
    items: any[];
}

interface Props {
    orders: Order[];
}

export default function RecentOrdersTable({ orders }: Props) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-50">
                        {["Order", "Customer", "Items", "Total", "Status"].map((h) => (
                            <th
                                key={h}
                                className="px-6 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider font-body"
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">

                            {/* Order */}
                            <td className="px-6 py-3.5">
                                <p className="font-semibold text-gray-800 text-xs">
                                    {order.orderNumber}
                                </p>
                                <p className="text-[10px] text-gray-400">
                                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                    })}
                                </p>
                            </td>

                            {/* Customer */}
                            <td className="px-6 py-3.5">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-[#C8961C] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                                        {order.customer.avatar}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-800">
                                            {order.customer.name}
                                        </p>
                                        <p className="text-[10px] text-gray-400">
                                            {order.city}
                                        </p>
                                    </div>
                                </div>
                            </td>

                            {/* Items */}
                            <td className="px-6 py-3.5">
                                <div className="flex items-center gap-1.5">
                                    <Package size={12} className="text-gray-400" />
                                    <span className="text-xs text-gray-600">
                                        {order.items.length} item
                                        {order.items.length > 1 ? "s" : ""}
                                    </span>
                                </div>
                            </td>

                            {/* Total */}
                            <td className="px-6 py-3.5">
                                <span className="font-semibold text-gray-900 text-xs">
                                    {formatPrice(order.total)}
                                </span>
                            </td>

                            {/* Status */}
                            <td className="px-6 py-3.5">
                                <OrderStatusBadge status={order.status} />
                            </td>
                        </tr>
                    ))}

                    {/* Empty state */}
                    {orders.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center py-10 text-gray-400 text-sm">
                                No recent orders
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
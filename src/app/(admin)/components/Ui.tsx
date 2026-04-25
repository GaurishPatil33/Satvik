import { cn } from "@/src/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" | "refunded"|"processing"|"returned";
// ─── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
    label: string;
    value: string | number;
    change: number;
    icon: string;
    prefix?: string;
    suffix?: string;
    color?: "gold" | "forest" | "earth" | "sage";
}

const colorMap = {
    gold: "bg-amber-50 text-amber-600",
    forest: "bg-emerald-50 text-emerald-700",
    earth: "bg-orange-50 text-orange-600",
    sage: "bg-teal-50 text-teal-600",
};

export function StatCard({ label, value, change, icon, prefix = "", suffix = "", color = "gold" }: StatCardProps) {
    const positive = change >= 0;
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center text-xl", colorMap[color])}>
                    {icon}
                </div>
                <div className={cn(
                    "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
                    positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                )}>
                    {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                    {Math.abs(change)}%
                </div>
            </div>
            <p className="text-2xl font-mono font-bold text-gray-900 mb-1">
                {prefix}{typeof value === "number" ? value.toLocaleString("en-IN") : value}{suffix}
            </p>
            <p className="text-xs text-gray-500 font-body">{label} · vs last month</p>
        </div>
    );
}

// ─── Order Status Badge ───────────────────────────────────────────────────────
const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
    pending: { label: "Pending", className: "bg-yellow-50 text-yellow-700 border-yellow-200" },
    processing: { label: "Processing", className: "bg-yellow-50 text-yellow-700 border-yellow-200" },
    confirmed: { label: "Confirmed", className: "bg-blue-50 text-blue-700 border-blue-200" },
    shipped: { label: "Shipped", className: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    delivered: { label: "Delivered", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    cancelled: { label: "Cancelled", className: "bg-red-50 text-red-600 border-red-200" },
    refunded: { label: "Refunded", className: "bg-gray-50 text-gray-600 border-gray-200" },
    returned: { label: "Returned", className: "bg-gray-50 text-gray-600 border-gray-200" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
    const cfg = statusConfig[status];
    return (
        <span className={cn("text-[11px] font-semibold px-2.5 py-1 rounded-full border font-body", cfg.className)}>
            {cfg.label}
        </span>
    );
}

// ─── Section Card wrapper ─────────────────────────────────────────────────────
export function SectionCard({
    title, subtitle, action, children, className,
}: {
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("bg-white rounded-2xl border border-gray-100 overflow-hidden", className)}>
            {(title || action) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                    <div>
                        {title && <h3 className="font-display font-semibold text-gray-900">{title}</h3>}
                        {subtitle && <p className="text-xs text-gray-500 font-body mt-0.5">{subtitle}</p>}
                    </div>
                    {action}
                </div>
            )}
            {children}
        </div>
    );
}

// ─── Mini Revenue Bar Chart (pure CSS/SVG) ────────────────────────────────────
interface MiniBarChartProps {
    data: { month: string; revenue: number; orders: number }[];
}

export function MiniBarChart({ data }: MiniBarChartProps) {
    const maxRevenue = Math.max(...data.map((d) => d.revenue));
    return (
        <div className="flex items-end gap-2 h-32">
            {data.map((d, i) => {
                const heightPct = (d.revenue / maxRevenue) * 100;
                const isLast = i === data.length - 1;
                return (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5 group">
                        <div className="relative w-full flex items-end justify-center h-24">
                            <div
                                className={cn(
                                    "w-full rounded-t-lg transition-all duration-300 cursor-pointer",
                                    isLast ? "bg-[#C8961C]" : "bg-[#2C4A2E]/15 group-hover:bg-[#2C4A2E]/30"
                                )}
                                style={{ height: `${heightPct}%` }}
                            />
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-1.5 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                ₹{(d.revenue / 1000).toFixed(0)}K · {d.orders} orders
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-400 font-body">{d.month}</p>
                    </div>
                );
            })}
        </div>
    );
}

// ─── Mini Donut Chart (SVG) ───────────────────────────────────────────────────
interface DonutChartProps {
    data: { category: string; value: number; color: string }[];
}

export function DonutChart({ data }: DonutChartProps) {
    const total = data.reduce((s, d) => s + d.value, 0);
    let cumulative = 0;
    const size = 120;
    const r = 45;
    const cx = size / 2;
    const cy = size / 2;
    const circumference = 2 * Math.PI * r;

    return (
        <div className="flex items-center gap-6">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
                {data.map((d) => {
                    const ratio = d.value / total;
                    const dashArray = ratio * circumference;
                    const offset = -cumulative * circumference;
                    cumulative += ratio;
                    return (
                        <circle
                            key={d.category}
                            cx={cx} cy={cy} r={r}
                            fill="none"
                            stroke={d.color}
                            strokeWidth="22"
                            strokeDasharray={`${dashArray} ${circumference - dashArray}`}
                            strokeDashoffset={offset}
                            className="transition-all duration-500"
                        />
                    );
                })}
                <circle cx={cx} cy={cy} r={r - 11} fill="white" />
            </svg>
            <ul className="space-y-2">
                {data.map((d) => (
                    <li key={d.category} className="flex items-center gap-2 text-xs font-body">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                        <span className="text-gray-500">{d.category}</span>
                        <span className="font-semibold text-gray-800 ml-auto">{d.value}%</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
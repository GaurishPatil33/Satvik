

import { orders, dashboardStats, revenueData, categoryRevenue, topProducts, recentActivity } from "@/src/lib/adminData";
import { ArrowRight, Package } from "lucide-react";
import Link from "next/link";
import { StatCard, SectionCard, MiniBarChart, DonutChart, OrderStatusBadge } from "../../components/Ui";
import { formatPrice } from "@/src/lib/utils";
import RecentOrdersTable from "../../components/dashboard/RecentOrdersTable";
import LiveActivity from "../../components/dashboard/LiveActivity";
import { TopProducts } from "../../components/dashboard/TopProducts";

export default function DashboardPage() {
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Welcome back, Admin </h1>
          <p className="text-sm text-gray-500 font-body mt-0.5">Here&apos;s what&apos;s happening with Satvik today.</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-xs text-gray-400 font-body">Last updated</p>
          <p className="text-sm font-semibold text-gray-700 font-body">{new Date().toLocaleString("en-In")}</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={dashboardStats.totalRevenue.label} value={dashboardStats.totalRevenue.value}
          change={dashboardStats.totalRevenue.change} icon="₹" prefix="₹" color="gold" />
        <StatCard label={dashboardStats.totalOrders.label} value={dashboardStats.totalOrders.value}
          change={dashboardStats.totalOrders.change} icon="🛒" color="forest" />
        <StatCard label={dashboardStats.totalCustomers.label} value={dashboardStats.totalCustomers.value}
          change={dashboardStats.totalCustomers.change} icon="👥" color="earth" />
        <StatCard label={dashboardStats.avgOrderValue.label} value={dashboardStats.avgOrderValue.value}
          change={dashboardStats.avgOrderValue.change} icon="📦" prefix="₹" color="sage" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue bar chart */}
        <SectionCard
          className="lg:col-span-2"
          title="Revenue Overview"
          subtitle="Last 6 months"
          action={
            <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg font-body">Monthly</span>
          }
        >
          <div className="px-6 py-5">
            <div className="flex items-baseline gap-3 mb-6">
              <p className="font-mono text-3xl font-bold text-gray-900">₹3,82,000</p>
              <span className="text-sm text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full font-body">
                ↑ 18.4%
              </span>
            </div>
            <MiniBarChart data={revenueData} />
          </div>
        </SectionCard>

        {/* Donut chart */}
        <SectionCard title="Sales by Category" subtitle="This month">
          <div className="px-6 py-5">
            <DonutChart data={categoryRevenue} />
          </div>
        </SectionCard>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent orders */}
        <SectionCard
          className="lg:col-span-2"
          title="Recent Orders"
          action={
            <Link href="/admin/orders" className="text-xs text-[#C8961C] font-semibold flex items-center gap-1 hover:underline font-body">
              View all <ArrowRight size={12} />
            </Link>
          }
        >
          <RecentOrdersTable orders={recentOrders} />
        </SectionCard>

        {/* Activity feed + Top products */}
        <div className="space-y-4">
          {/* Top products */}
          <SectionCard title="Top Products" subtitle="By revenue this month">
            <TopProducts products={topProducts} />
          </SectionCard>

          {/* Activity */}
          <SectionCard title="Live Activity">
            <LiveActivity activities={recentActivity} />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
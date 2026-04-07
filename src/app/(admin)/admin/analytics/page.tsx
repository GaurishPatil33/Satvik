import { revenueData, categoryRevenue, topProducts } from "@/src/lib/adminData";
import { formatPrice } from "@/src/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { SectionCard, MiniBarChart, DonutChart } from "../../components/Ui";
import MetricsGrid from "../../components/analytics/MetricsGrid";
import { TopProductsProgress } from "../../components/dashboard/TopProducts";

const monthlyMetrics = [
  { label: "Conversion Rate", value: "3.2%", change: 0.4, positive: true },
  { label: "Avg Session Duration", value: "4m 12s", change: 0.8, positive: true },
  { label: "Cart Abandonment", value: "62%", change: -4.1, positive: false },
  { label: "Return Customer Rate", value: "38%", change: 5.2, positive: true },
];

const stateData = [
  { state: "Maharashtra", orders: 145, revenue: 102300 },
  { state: "Karnataka", orders: 112, revenue: 78400 },
  { state: "Tamil Nadu", orders: 89, revenue: 62100 },
  { state: "Delhi", orders: 76, revenue: 58900 },
  { state: "Gujarat", orders: 68, revenue: 47600 },
  { state: "Kerala", orders: 54, revenue: 38200 },
  { state: "Telangana", orders: 48, revenue: 33600 },
  { state: "Others", orders: 89, revenue: 63400 },
];

const maxOrders = Math.max(...stateData.map((s) => s.orders));

export default function AnalyticsPage() {
  return (
    <div className="space-y-5 max-w-[1400px]">
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500 font-body mt-0.5">Performance overview · Last 6 months</p>
      </div>

      {/* Metrics row */}
      <MetricsGrid metrics={monthlyMetrics} />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard className="lg:col-span-2" title="Monthly Revenue & Orders" subtitle="6-month trend">
          <div className="px-6 py-5 space-y-4">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Total Revenue", value: "₹3,82,000", delta: "+18.4%" },
                { label: "Total Orders", value: "524", delta: "+12.1%" },
                { label: "Avg Order Value", value: "₹729", delta: "+5.6%" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-sans text-xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-[10px] text-gray-400 font-body">{s.label}</p>
                  <p className="text-xs text-emerald-600 font-semibold font-body">{s.delta}</p>
                </div>
              ))}
            </div>

            <MiniBarChart data={revenueData} />

            {/* Orders line (simulated) */}
            <div className="flex items-center justify-center gap-6 text-xs font-body text-gray-400">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#C8961C]" />Revenue (current month)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#2C4A2E]/15" />Previous months</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Revenue by Category">
          <div className="px-6 py-5 space-y-4">

            <DonutChart data={categoryRevenue} />

            <div className="space-y-2 mt-4">
              {categoryRevenue.map((d) => (
                <div key={d.category} className="flex items-center gap-2">
                  <div className="h-1.5 rounded-full flex-1 bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${d.value}%`, backgroundColor: d.color }} />
                  </div>
                  <span className="text-[10px] text-gray-500 w-6 text-right font-body">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top products */}
        <SectionCard title="Top Products" subtitle="By revenue this month">
          <TopProductsProgress products={topProducts} />
        </SectionCard>

        {/* Sales by State */}
        {/* <SectionCard title="Orders by State" subtitle="Geographic distribution">
          <div className="px-5 py-4 space-y-3">
            {stateData.map((s) => (
              <div key={s.state} className="flex items-center gap-3">
                <p className="text-xs font-body text-gray-600 w-28 shrink-0">{s.state}</p>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2C4A2E] rounded-full"
                    style={{ width: `${(s.orders / maxOrders) * 100}%` }}
                  />
                </div>
                <div className="text-right w-24 shrink-0">
                  <p className="text-[10px] font-semibold text-gray-800 font-body">{formatPrice(s.revenue)}</p>
                  <p className="text-[9px] text-gray-400 font-body">{s.orders} orders</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard> */}
      </div>
    </div>
  );
}
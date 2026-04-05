"use client";

import { cn } from "@/src/lib/utils";
import { Store, Truck, CreditCard, Bell, Shield, Save } from "lucide-react";
import { useState } from "react";
import { SectionCard } from "../../components/Ui";
import SettingsTabs from "../../components/settings/SettingsTabs";


const tabs = [
  { id: "store", label: "Store", icon: Store },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

function ToggleSwitch({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={cn(
        "relative inline-flex w-10 h-5.5 h-[22px] rounded-full transition-colors duration-200 focus:outline-none",
        enabled ? "bg-[#2C4A2E]" : "bg-gray-200"
      )}
    >
      <span className={cn(
        "inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 mt-[3px]",
        enabled ? "translate-x-5" : "translate-x-1"
      )} />
    </button>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("store");
  const [storeSettings, setStoreSettings] = useState({
    storeName: "Satvik Foods",
    storeEmail: "hello@satvik.in",
    phone: "+91 80000 00000",
    currency: "INR",
    timezone: "Asia/Kolkata",
    fssaiNumber: "12345678901234",
    gstNumber: "29AAAAA0000A1Z5",
  });
  const [notifSettings, setNotifSettings] = useState({
    newOrders: true,
    payments: true,
    lowStock: true,
    reviews: false,
    newsletters: false,
    smsAlerts: true,
  });
  const [shippingSettings, setShippingSettings] = useState({
    freeDeliveryThreshold: "499",
    standardRate: "59",
    expressRate: "99",
    processingDays: "1-2",
    codEnabled: true,
    codExtraCharge: "29",
  });

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 font-body mt-0.5">Manage your store configuration</p>
      </div>

      {/* Tab navigation */}

      <SettingsTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Store Settings */}
      {activeTab === "store" && (
        <div className="space-y-4">
          <SectionCard title="Store Information" subtitle="Basic details about your business">
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: "Store Name", key: "storeName", placeholder: "Satvik Foods" },
                { label: "Store Email", key: "storeEmail", placeholder: "hello@satvik.in" },
                { label: "Phone Number", key: "phone", placeholder: "+91 80000 00000" },
                { label: "Currency", key: "currency", placeholder: "INR" },
                { label: "Timezone", key: "timezone", placeholder: "Asia/Kolkata" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-body">{field.label}</label>
                  <input
                    value={storeSettings[field.key as keyof typeof storeSettings]}
                    onChange={(e) => setStoreSettings({ ...storeSettings, [field.key]: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2C4A2E] font-body"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Compliance" subtitle="FSSAI & GST details">
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: "FSSAI License Number", key: "fssaiNumber" },
                { label: "GST Number", key: "gstNumber" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-body">{field.label}</label>
                  <input
                    value={storeSettings[field.key as keyof typeof storeSettings]}
                    onChange={(e) => setStoreSettings({ ...storeSettings, [field.key]: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2C4A2E]  font-mono"
                  />
                </div>
              ))}
            </div>
          </SectionCard>

          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-[#2C4A2E] text-white px-5 py-2.5 rounded-xl text-sm font-body font-medium hover:bg-[#3D6B40] transition-colors">
              <Save size={14} /> Save Store Settings
            </button>
          </div>
        </div>
      )}

      {/* Shipping Settings */}
      {activeTab === "shipping" && (
        <div className="space-y-4">
          <SectionCard title="Shipping Rates" subtitle="Configure delivery pricing">
            <div className="px-6 py-5 space-y-5">
              {[
                { label: "Free Delivery Threshold (₹)", key: "freeDeliveryThreshold", hint: "Orders above this amount get free delivery" },
                { label: "Standard Delivery Rate (₹)", key: "standardRate", hint: "Flat rate for standard shipping" },
                { label: "Express Delivery Rate (₹)", key: "expressRate", hint: "Next-day delivery charge" },
                { label: "Processing Time (days)", key: "processingDays", hint: "Time before shipment dispatch" },
              ].map((field) => (
                <div key={field.key} className="grid grid-cols-2 gap-4 items-start">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 font-body">{field.label}</label>
                    <p className="text-xs text-gray-400 font-body mt-0.5">{field.hint}</p>
                  </div>
                  <input
                    value={shippingSettings[field.key as keyof typeof shippingSettings] as string}
                    onChange={(e) => setShippingSettings({ ...shippingSettings, [field.key]: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2C4A2E] font-body"
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4 items-center border-t border-gray-100 pt-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700 font-body">Cash on Delivery (COD)</p>
                  <p className="text-xs text-gray-400 font-body">Enable COD for customers</p>
                </div>
                <div className="flex items-center gap-3">
                  <ToggleSwitch
                    enabled={shippingSettings.codEnabled}
                    onChange={(v) => setShippingSettings({ ...shippingSettings, codEnabled: v })}
                  />
                  {shippingSettings.codEnabled && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 font-body">COD charge: ₹</span>
                      <input
                        value={shippingSettings.codExtraCharge}
                        onChange={(e) => setShippingSettings({ ...shippingSettings, codExtraCharge: e.target.value })}
                        className="w-16 px-2 py-1 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none font-body"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SectionCard>
          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-[#2C4A2E] text-white px-5 py-2.5 rounded-xl text-sm font-body font-medium hover:bg-[#3D6B40] transition-colors">
              <Save size={14} /> Save Shipping Settings
            </button>
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === "notifications" && (
        <div className="space-y-4">
          <SectionCard title="Email Notifications" subtitle="Choose what alerts you receive">
            <div className="px-6 py-2 divide-y divide-gray-50">
              {[
                { key: "newOrders", label: "New Orders", desc: "Get notified when a new order is placed" },
                { key: "payments", label: "Payment Received", desc: "Alert when payment is confirmed" },
                { key: "lowStock", label: "Low Stock Alerts", desc: "When product quantity falls below 15" },
                { key: "reviews", label: "New Reviews", desc: "Customer review notifications" },
                { key: "newsletters", label: "Newsletter Stats", desc: "Weekly newsletter performance report" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-800 font-body">{item.label}</p>
                    <p className="text-xs text-gray-400 font-body mt-0.5">{item.desc}</p>
                  </div>
                  <ToggleSwitch
                    enabled={notifSettings[item.key as keyof typeof notifSettings] as boolean}
                    onChange={(v) => setNotifSettings({ ...notifSettings, [item.key]: v })}
                  />
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="SMS Alerts">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800 font-body">SMS Order Alerts</p>
                <p className="text-xs text-gray-400 font-body mt-0.5">Send SMS to customers on order updates</p>
              </div>
              <ToggleSwitch
                enabled={notifSettings.smsAlerts}
                onChange={(v) => setNotifSettings({ ...notifSettings, smsAlerts: v })}
              />
            </div>
          </SectionCard>
        </div>
      )}

      {/* Security */}
      {activeTab === "security" && (
        <SectionCard title="Security Settings" subtitle="Manage admin access and authentication">
          <div className="px-6 py-5 space-y-5">
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-gray-500 font-body">Current Password</label>
              <input type="password" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none font-body" placeholder="••••••••" />
            </div>
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-gray-500 font-body">New Password</label>
              <input type="password" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none font-body" placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <div>
                <p className="text-sm font-semibold text-gray-800 font-body">Two-Factor Authentication</p>
                <p className="text-xs text-gray-400 font-body mt-0.5">Secure your account with 2FA</p>
              </div>
              <button className="text-sm text-[#C8961C] font-semibold font-body hover:underline">Enable</button>
            </div>
            <div className="flex justify-end">
              <button className="flex items-center gap-2 bg-[#2C4A2E] text-white px-5 py-2.5 rounded-xl text-sm font-body font-medium hover:bg-[#3D6B40] transition-colors">
                <Save size={14} /> Update Password
              </button>
            </div>
          </div>
        </SectionCard>
      )}

      {/* Payments tab placeholder */}
      {activeTab === "payments" && (
        <SectionCard title="Payment Gateways" subtitle="Configure your payment providers">
          <div className="px-6 py-5 space-y-4">
            {[
              { name: "Razorpay", logo: "💳", status: "Connected", desc: "UPI, Cards, Netbanking, Wallets" },
              { name: "PhonePe Business", logo: "📱", status: "Connected", desc: "UPI payments via PhonePe" },
              { name: "Stripe", logo: "⚡", status: "Not connected", desc: "International card payments" },
            ].map((gw) => (
              <div key={gw.name} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{gw.logo}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 font-body">{gw.name}</p>
                    <p className="text-xs text-gray-400 font-body">{gw.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "text-[11px] px-2.5 py-1 rounded-full font-body font-semibold",
                    gw.status === "Connected" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
                  )}>
                    {gw.status}
                  </span>
                  <button className="text-xs text-[#C8961C] font-semibold font-body hover:underline">
                    {gw.status === "Connected" ? "Manage" : "Connect"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
import { fmt } from "@/src/lib/utils";

export function WalletSection() {
  const balance = TRANSACTIONS.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-5">
      {/* Balance card */}
      <div className="bg-gradient-to-br from-brand-gold to-brand-gold-light rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute right-4 top-4 opacity-10 text-[100px] leading-none select-none">₹</div>
        <p className="text-xs font-body font-semibold uppercase tracking-widest text-white/70 mb-1">Satvik Wallet Balance</p>
        <p className="font-display text-4xl font-bold mb-1">{fmt(balance)}</p>
        <p className="text-xs text-white/70 font-body">Use at checkout · No expiry</p>
        <div className="mt-5 flex gap-3">
          <button className="flex-1 py-2.5 rounded-xl bg-white text-brand-gold text-sm font-semibold font-body hover:bg-brand-cream transition-colors">
            Add Money
          </button>
          <button className="flex-1 py-2.5 rounded-xl bg-white/20 text-white text-sm font-semibold font-body hover:bg-white/30 transition-colors">
            Transfer
          </button>
        </div>
      </div>

      {/* Loyalty points */}
      <div className="bg-brand-off-white rounded-2xl border border-brand-ivory p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-display text-sm font-semibold text-brand-forest">Loyalty Points</p>
            <p className="text-xs text-brand-earth/60 font-body">1 point = ₹1 off on your next order</p>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl font-bold text-brand-gold">{USER.stats.loyaltyPoints}</p>
            <p className="text-[10px] text-brand-earth/50 font-body">pts available</p>
          </div>
        </div>
        {/* Progress to next reward */}
        <div className="mb-2 flex justify-between text-[11px] text-brand-earth/60 font-body">
          <span>{USER.stats.loyaltyPoints} pts</span>
          <span>1000 pts → ₹100 voucher</span>
        </div>
        <div className="h-2 bg-brand-ivory rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-gold to-brand-gold-light" style={{ width: `${(USER.stats.loyaltyPoints / 1000) * 100}%` }} />
        </div>
        <p className="text-[11px] text-brand-earth/60 mt-1.5 font-body">{1000 - USER.stats.loyaltyPoints} pts more to unlock ₹100 voucher</p>
      </div>

      {/* Transactions */}
      <div className="bg-brand-off-white rounded-2xl border border-brand-ivory overflow-hidden">
        <div className="px-5 py-4 border-b border-brand-ivory">
          <h3 className="font-display text-sm font-semibold text-brand-forest">Transaction History</h3>
        </div>
        <div className="divide-y divide-brand-ivory">
          {TRANSACTIONS.map((t) => (
            <div key={t.id} className="flex items-center gap-3 px-5 py-3.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${t.type === "credit" ? "bg-green-50" : "bg-red-50"}`}>
                <span className={`text-sm ${t.type === "credit" ? "text-green-700" : "text-red-600"}`}>{t.type === "credit" ? "+" : "−"}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-brand-forest font-body truncate">{t.label}</p>
                <p className="text-[11px] text-brand-earth/50 font-body">{t.date}</p>
              </div>
              <span className={`text-sm font-bold font-display shrink-0 ${t.type === "credit" ? "text-green-700" : "text-red-600"}`}>
                {t.type === "credit" ? "+" : "−"}{fmt(Math.abs(t.amount))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
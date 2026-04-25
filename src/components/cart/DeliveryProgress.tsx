import { Truck } from "lucide-react";

const FREE_DELIVERY_THRESHOLD = 499;
export function DeliveryProgress({ total }: { total: number }) {
    const pct = Math.min((total / FREE_DELIVERY_THRESHOLD) * 100, 100);
    const remaining = FREE_DELIVERY_THRESHOLD - total;
    const achieved = total >= FREE_DELIVERY_THRESHOLD;

    return (
        <div className="px-5 py-3 bg-[#F0F7F0] border-b border-[#E8EFE8]">
            <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                    <Truck size={13} className={achieved ? "text-[#3D6B40]" : "text-[#8B5E3C]"} />
                    <span className="text-[11px] font-medium font-[family-name:var(--font-body,sans-serif)]">
                        {achieved ? (
                            <span className="text-[#3D6B40]">🎉 Free delivery unlocked!</span>
                        ) : (
                            <span className="text-[#8B5E3C]">
                                Add <strong>{(remaining)}</strong> for free delivery
                            </span>
                        )}
                    </span>
                </div>
                <span className="text-[10px] text-[#8B5E3C]/70">{(FREE_DELIVERY_THRESHOLD)}</span>
            </div>
            <div className="h-1.5 bg-[#D6E8D6] rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                        width: `${pct}%`,
                        background: achieved
                            ? "linear-gradient(90deg, #3D6B40, #5A9E5E)"
                            : "linear-gradient(90deg, #C8961C, #E8B84B)",
                    }}
                />
            </div>
        </div>
    );
}

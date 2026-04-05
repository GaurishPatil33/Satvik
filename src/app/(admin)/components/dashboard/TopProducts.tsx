import { formatPrice } from "@/src/lib/utils";

interface TopProduct {
    name: string;
    sales: number;
    revenue: number;
    change: number;
}

interface Props {
    products: TopProduct[];
    limit?: number;
}

export function TopProducts({ products, limit = 4 }: Props) {

    return (
        <ul className="divide-y divide-gray-50">
            {products.slice(0, limit).map((p, i) => (
                <li key={p.name} className="px-5 py-3 flex items-center gap-3">

                    {/* Rank */}
                    <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-[10px] flex items-center justify-center font-bold shrink-0">
                        {i + 1}
                    </span>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 truncate font-body">
                            {p.name}
                        </p>
                        <p className="text-[10px] text-gray-400 font-body">
                            {p.sales} sold
                        </p>
                    </div>

                    {/* Revenue */}
                    <div className="text-right">
                        <p className="text-xs font-bold text-gray-900 font-body">
                            {formatPrice(p.revenue)}
                        </p>

                        <p
                            className={`text-[10px] font-semibold ${p.change >= 0 ? "text-emerald-600" : "text-red-500"
                                }`}
                        >
                            {p.change >= 0 ? "↑" : "↓"}
                            {Math.abs(p.change)}%
                        </p>
                    </div>
                </li>
            ))}
            {
                products.length === 0 && (
                    <p className="text-center text-gray-400 text-sm py-6">
                        No top products yet
                    </p>
                )
            }
        </ul>
    );
}



export function TopProductsProgress({ products, limit }: Props) {
    const data = limit ? products.slice(0, limit) : products;

    const maxRevenue = Math.max(...products.map(p => p.revenue), 1);

    return (
        <div className="px-5 py-4 space-y-3">
            {data.map((p, i) => {
                const percentage = (p.revenue / maxRevenue) * 100;

                return (
                    <div key={p.name} className="flex items-center gap-3">

                        {/* Rank */}
                        <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-[11px] flex items-center justify-center font-bold shrink-0">
                            {i + 1}
                        </span>

                        {/* Content */}
                        <div className="flex-1 min-w-0">

                            {/* Title + Change */}
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-xs font-semibold text-gray-800 truncate">
                                    {p.name}
                                </p>

                                <span
                                    className={`text-[10px] font-semibold ml-2 shrink-0 ${p.change >= 0 ? "text-emerald-600" : "text-red-500"
                                        }`}
                                >
                                    {p.change >= 0 ? "↑" : "↓"}
                                    {Math.abs(p.change)}%
                                </span>
                            </div>

                            {/* Progress */}
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#C8961C] to-[#E8B84B] rounded-full transition-all"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>

                            {/* Footer */}
                            <div className="flex justify-between mt-1">
                                <span className="text-[10px] text-gray-400">
                                    {p.sales} units
                                </span>
                                <span className="text-[10px] font-semibold text-gray-600">
                                    {formatPrice(p.revenue)}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Empty state */}
            {products.length === 0 && (
                <p className="text-center text-gray-400 text-sm py-6">
                    No top products yet
                </p>
            )}
        </div>
    );
}
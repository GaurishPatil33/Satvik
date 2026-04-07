import { TrendingUp, TrendingDown } from "lucide-react";

interface Metric {
    label: string;
    value: string | number;
    change: number;
    positive: boolean;
}

interface Props {
    metrics: Metric[];
}

export default function MetricsGrid({ metrics }: Props) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m) => (
                <div
                    key={m.label}
                    className="bg-white rounded-2xl p-5 border border-gray-100"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs text-gray-500">{m.label}</p>

                        <div
                            className={`flex items-center gap-0.5 text-[11px] font-semibold ${m.positive ? "text-emerald-600" : "text-red-500"
                                }`}
                        >
                            {m.positive ? (
                                <TrendingUp size={11} />
                            ) : (
                                <TrendingDown size={11} />
                            )}
                            {Math.abs(m.change)}%
                        </div>
                    </div>

                    {/* Value */}
                    <p className="text-2xl font-bold text-gray-900">
                        {m.value}
                    </p>
                </div>
            ))}
        </div>
    );
}
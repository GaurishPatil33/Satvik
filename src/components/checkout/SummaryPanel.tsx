import { CheckCircle } from "lucide-react";

export function SummaryPanel({ label, value, onClick }: { label: string; value: string; onClick: () => void }) {
    return (
        <div className="bg-white border border-cream-200 rounded-2xl mb-3 overflow-hidden">
            <div className="px-5 py-3.5 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-0.5">
                        <CheckCircle className="w-4 h-4 text-forest-500" />
                        <span className="font-playfair font-bold text-sm text-gray-800">{label}</span>
                    </div>
                    <p className="text-xs text-gray-400 font-dm ml-6">{value}</p>
                </div>
                <button onClick={onClick} className="text-xs font-dm font-bold text-forest-500 hover:text-forest transition-colors">Edit</button>
            </div>
        </div>
    );
}
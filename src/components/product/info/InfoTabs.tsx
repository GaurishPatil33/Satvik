import { useState } from "react";
import Benefits from "./Benefits";
import Description from "./Description";
import HowToUse from "./HowToUse";
import Nutrition from "./Nutrition";
import Reviews from "./Reviews";

type TabId = "description" | "benefits" | "nutrition" | "how-to-use" | "reviews";
const TABS: { id: TabId; label: string }[] = [
    { id: "description", label: "Description" },
    { id: "benefits", label: "Key Benefits" },
    { id: "nutrition", label: "Nutrition & Certs" },
    { id: "how-to-use", label: "How to Use" },
    { id: "reviews", label: "Reviews (1,240)" },
];

export function InfoTabs() {
    const [activeTab, setActiveTab] = useState<TabId>("description");



    return (
        <div className="max-w-7xl mx-auto px-5 mt-8">

            {/* Tabs Header */}
            <div className="flex border-b-2 border-cream-200 overflow-x-auto">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-5 py-3.5 text-sm font-dm font-semibold whitespace-nowrap border-b-[3px] -mb-[2px] transition-all ${activeTab === tab.id
                            ? "border-forest-500 text-forest-600"
                            : "border-transparent text-gray-400 hover:text-forest-500"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="py-7 pb-12">
                {activeTab === "description" && <Description />}
                {activeTab === "benefits" && <Benefits />}
                {activeTab === "nutrition" && <Nutrition />}
                {activeTab === "how-to-use" && <HowToUse />}
                {activeTab === "reviews" && <Reviews />}
            </div>
        </div>
    );
}
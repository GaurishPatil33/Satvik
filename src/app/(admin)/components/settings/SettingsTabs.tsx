import { cn } from "@/src/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: React.ElementType;
}

interface Props {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function SettingsTabs({ tabs, activeTab, onChange }: Props) {
  return (
    <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-full overflow-x-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {Icon && <Icon size={14} />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
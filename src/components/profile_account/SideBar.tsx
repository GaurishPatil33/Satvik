import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  user: any;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  logout: () => void;
  NAV: any[];
}

export default function ProfileSidebar({
  user,
  activeTab,
  setActiveTab,
  logout,
  NAV,
}: Props) {
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.replace("/")
  }
  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 gap-3 animate-slide-in">
      {/* User card */}
      <div className="bg-brand-off-white rounded-2xl border border-brand-ivory p-4 flex items-center gap-3">

        <div className="w-10 h-10 rounded-full overflow-hidden p-1 ring-forest-700 ring-1 bg-forest/45 flex items-center justify-center text-2xl font-display font-bold text-forest-800 shadow-lg">
          {/* {user.avatar} */}
          <User className="size-full" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold truncate">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="text-xs text-brand-earth/60 truncate">
            +91 {user?.phone}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="bg-brand-off-white rounded-2xl border border-brand-ivory overflow-hidden">
        {NAV.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 text-left
              ${i !== 0 ? "border-t border-brand-ivory" : ""}
              ${activeTab === item.id
                ? "bg-brand-forest/5 border-l-2 border-l-brand-forest"
                : "hover:bg-brand-ivory/60"
              }`}
          >
            <item.icon size={16} />
            <span className="flex-1 text-sm">{item.label}</span>
            {item.badge && (
              <span className="w-5 h-5 bg-brand-terracotta text-white text-[10px] rounded-full flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3.5 border-t hover:bg-red-50"
        >
          <LogOut size={16} className="text-red-500" />
          <span className="text-sm text-red-500">Sign Out</span>
        </button>
      </nav>
    </aside>
  );
}
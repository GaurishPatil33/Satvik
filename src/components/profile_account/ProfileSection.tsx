import { getCurrentUser } from "@/src/services/auth.service";
import { updateMyProfile } from "@/src/services/user.services";
import { useAuthStore } from "@/src/store/auth.store";
import { IUser } from "@/src/types/user-types";
import { Camera, Leaf, Pencil, CheckCircle2, User, Phone, Mail, Calendar, Shield, Bell, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface FormData {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
}
const fields = [
    { key: "first_name", label: "First Name", icon: User, type: "text" },
    { key: "last_name", label: "Last Name", icon: User, type: "text" },
    { key: "phone", label: "Mobile Number", icon: Phone, type: "tel" },
    { key: "email", label: "Email Address", icon: Mail, type: "email" },
] as const;

export function ProfileSection() {
    const router = useRouter()
    const { user, fetchCurrentUser, logout } = useAuthStore()
    const [editing, setEditing] = useState(false);

    const [saved, setSaved] = useState(false);

    const [form, setForm] = useState<FormData>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
    });

    const joiningDate = user?.created_at
        ? new Date(user.created_at).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
        })
        : "";

    useEffect(() => {
        const loadUser = async () => {
            let u = user;

            // fetch only if store empty (prevents extra calls)
            if (!u) u = await fetchCurrentUser();

            if (u) {
                setForm({
                    first_name: u.first_name || "",
                    last_name: u.last_name || "",
                    email: u.email || "",
                    phone: u.phone || "",
                })
            }
        };

        loadUser();
    }, []);


    const handleChange = (field: keyof FormData, value: string) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const handleLogout = () => {
        logout()
        router.replace("/")
    }

    const handleSave = async () => {
        try {
            await updateMyProfile(form);
            setSaved(true);
            setEditing(false);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            console.error("Profile update failed", err);
        }
    }

    return (
        <div className="space-y-6">
            {/* Avatar card */}
            <div className="bg-gradient-to-br from-brand-forest to-brand-forest-light rounded-2xl p-6 text-brand-cream flex items-center gap-5 relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 opacity-10">
                    <div className="w-48 h-48 rounded-full border border-brand-cream absolute -top-10 -right-10" />
                    <div className="w-32 h-32 rounded-full border border-brand-cream absolute bottom-5 right-20" />
                </div>
                <div className="relative group cursor-pointer shrink-0">
                    <div className="w-20 h-20 rounded-full overflow-hidden p-1 ring-forest-700 ring-1 bg-forest/45 flex items-center justify-center text-2xl font-display font-bold text-forest-800 shadow-lg">
                        {/* {user.avatar} */}
                        <User className="size-full" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera size={18} className="text-white" />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <h2 className="font-display text-2xl font-bold mb-0.5">{form.first_name} {form.last_name}</h2>
                    <p className="text-brand-cream/70 text-sm font-body flex items-center gap-1.5">
                        Member since {joiningDate}
                    </p>
                    {/* <div className="flex gap-4 mt-3">
                        {[
                            // { val: user.orders, label: "Orders" },
                            { val: user?.address_ids?.length, label: "Addresses" },
                            { val: USER.stats.loyaltyPoints + " pts", label: "Loyalty" },
                        ].map((s) => (
                            <div key={s.label} className="text-center">
                                <p className="font-display font-bold text-lg text-brand-gold-light">{s.val}</p>
                                <p className="text-[10px] text-brand-cream/50">{s.label}</p>
                            </div>
                        ))}
                    </div> */}
                </div>
                {/* {!editing && (
                    <button
                        onClick={() => setEditing(true)}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                        <Pencil size={14} className="text-brand-cream" />
                    </button>
                )} */}
            </div>

            {/* Save toast */}
            {saved && (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-100 px-4 py-2.5 rounded-xl text-sm font-body animate-fade-up">
                    <CheckCircle2 size={15} /> Profile updated successfully!
                </div>
            )}

            {/* Info fields */}
            <div className="bg-brand-off-white rounded-2xl border border-brand-ivory overflow-hidden animate-fade-up">
                <div className="flex items-center justify-between px-5 py-4 border-b border-brand-ivory">
                    <h3 className=" text-base font-semibold text-forest">Personal  Information</h3>
                    {!editing ? (
                        <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 text-xs text-brand-gold hover:text-brand-gold-light transition-colors font-body font-medium">
                            <Pencil size={12} /> Edit
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button onClick={() => setEditing(false)} className="text-xs text-brand-earth/60 hover:text-brand-earth px-3 py-1 rounded-lg border border-brand-earth/20 font-body">Cancel</button>
                            <button onClick={handleSave} className="text-xs text-cream bg-forest/70 hover:bg-brand-forest-light px-3 py-1 rounded-lg font-body font-semibold transition-colors">Save</button>
                        </div>
                    )}
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {fields.map((field) => (
                        <div key={field.key}>
                            <label className="text-[11px] text-brand-earth/60 font-body uppercase tracking-wider block mb-1.5">
                                {field.label}
                            </label>
                            {editing ? (
                                <input
                                    type={field.type}
                                    value={form[field.key]}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-xl border-2 border-brand-forest/20 focus:border-brand-forest outline-none text-sm text-brand-forest font-body bg-white transition-colors"
                                />
                            ) : (
                                <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-brand-ivory/60">
                                    <field.icon size={14} className="text-brand-earth/50 shrink-0" />
                                    <span className="text-sm text-brand-forest font-body">{form[field.key]}</span>
                                    {/* {!field.editable && <span className="ml-auto text-[10px] text-brand-earth/40 bg-brand-earth/10 px-2 py-0.5 rounded-full">Verified</span>} */}
                                </div>
                            )}
                        </div>
                    ))}

                </div>
            </div>

            <div className="w-full flex items-center md:hidden  justify-center gap-3 px-4 py-3.5 border-t hover:bg-red-50 animate-fade-up">

                <button
                    onClick={() => handleLogout()}
                    className="flex w-4/6 gap-3 justify-center items-center bg-red-500 px-4 rounded-full py-1 text-white"
                >
                    <LogOut size={16} />
                    <span className="text-lg">SIGN OUT</span>
                </button>
            </div>

            {/* Security */}
            {/* <div className="bg-brand-off-white rounded-2xl border border-brand-ivory overflow-hidden">
                <div className="px-5 py-4 border-b border-brand-ivory">
                    <h3 className=" text-base font-semibold text-forest">Security & Privacy</h3>
                </div>
                <div className="divide-y divide-brand-ivory">
                    {[
                        { icon: Shield, label: "Two-Factor Authentication", sub: "Protect your account with OTP login", action: "Enabled", actionColor: "text-green-700" },
                        { icon: Bell, label: "SMS Notifications", sub: "Order updates via SMS", action: "Manage" },
                        { icon: Settings, label: "Delete Account", sub: "Permanently delete all your data", action: "Request", actionColor: "text-red-500" },
                    ].map((item) => (
                        <div key={item.label} className="flex items-center gap-3 px-5 py-4">
                            <div className="w-9 h-9 rounded-xl bg-brand-ivory flex items-center justify-center shrink-0">
                                <item.icon size={16} className="text-brand-earth" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-brand-forest font-body">{item.label}</p>
                                <p className="text-xs text-brand-earth/60 font-body">{item.sub}</p>
                            </div>
                            <button className={`text-xs font-semibold font-body ${item.actionColor ?? "text-brand-forest"}`}>
                                {item.action}
                            </button>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    );
}
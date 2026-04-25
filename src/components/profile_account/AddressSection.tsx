import { createAddress, deleteAddress, getUserAddresses, updateAddress } from "@/src/services/address.service";
import { IAddress } from "@/src/types/user-types";
import { Address } from "cluster";
import { Plus, X, MapPin, Check, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import InputField from "../login&register/Inputfield";
import Loading from "../Loading";

interface AddressformData {
    // id?: string;
    // user_id: string;
    full_name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    is_default: boolean;

}
type ToastType = "success" | "error";

type Props = {
    form: AddressformData;
    editingId: string | null;
    onChange: (field: keyof AddressformData, value: string | boolean) => void;
    onCancel: () => void;
    onSubmit: () => void;
};

type AddressFormKeys = keyof AddressformData;

type FieldConfig = {
    label: string;
    placeholder: string;
    key: AddressFormKeys;
    maxlength?: number
};
const fields: FieldConfig[] = [
    { label: "Full Name", placeholder: "abc", key: "full_name" },
    { label: "Phone", placeholder: "9876543210", key: "phone", maxlength: 10 },
    { label: "Street", placeholder: "Street", key: "street" },
    { label: "City", placeholder: "City", key: "city" },
    { label: "State", placeholder: "State", key: "state" },
    { label: "Postal Code", placeholder: "560001", key: "postal_code", maxlength: 6 },
    { label: "Country", placeholder: "India", key: "country" },
];

export default function AddressForm({
    form,
    editingId,
    onChange,
    onCancel,
    onSubmit,
}: Props) {
    return (
        <div className="bg-brand-off-white rounded-2xl border-2 border-brand-forest/30 p-5 space-y-3 animate-fade-up">
            <div className="flex items-center justify-between mb-1">
                <p className="font-display text-sm font-semibold text-brand-forest">
                    {editingId ? "Edit Address" : "New Address"}
                </p>
                <button onClick={onCancel} className="text-brand-earth/50 hover:text-brand-forest">
                    <X size={16} />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {fields.map((item) => (
                    <InputField
                        key={item.key}
                        label={item.label}
                        placeholder={item.placeholder}
                        value={form[item.key] as string}
                        onChange={(e) => onChange(item.key, e.target.value)}
                        maxlength={item.maxlength}
                    />
                ))}
            </div>

            <div className="flex gap-2 pt-1">
                <button onClick={onCancel}
                    className="flex-1 py-2.5 rounded-xl border border-brand-earth/20">
                    Cancel
                </button>

                <button onClick={onSubmit}
                    className="flex-1 py-2.5 rounded-xl bg-forest/80 text-cream">
                    {editingId ? "Update Address" : "Save Address"}
                </button>
            </div>
        </div>
    );
}

export function AddressesSection() {
    const [addresses, setAddresses] = useState<IAddress[]>([]);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [form, setForm] = useState<AddressformData>({
        full_name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        is_default: false,
    })
    const [editingId, setEditingId] = useState<string | null>(null);


    const [toast, setToast] = useState<{
        show: boolean;
        message: string;
        type: ToastType;
    }>({
        show: false,
        message: "",
        type: "success",
    });
    const showToast = (message: string, type: ToastType = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast((t) => ({ ...t, show: false }));
        }, 2500);
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getUserAddresses();
                setAddresses(data)
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, []);

    const handleChange = (field: keyof AddressformData, value: string | boolean) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const setDefault = async (id: string) => {
        try {
            await updateAddress(id, { is_default: true });

            const data = await getUserAddresses();
            setAddresses(data);

            showToast("Default address updated");
        } catch (err) {
            console.error(err);
            showToast("Failed to update address", "error");
        }
    };

    const handleSubmit = async () => {
        try {
            if (editingId) {
                const updated = await updateAddress(editingId, form);

                setAddresses((prev) =>
                    prev.map((a) => (a.id === editingId ? updated : a))
                );

                showToast("Address updated");
            } else {
                const newAddress = await createAddress(form);
                setAddresses((prev) => [...prev, newAddress]);
                showToast("Address added");
            }

            setAdding(false);
            setEditingId(null);

            setForm({
                full_name: "",
                phone: "",
                street: "",
                city: "",
                state: "",
                postal_code: "",
                country: "",
                is_default: false,
            });
        } catch (err) {
            console.error(err);
            showToast("Operation failed", "error");
        }
    };

    const remove = async (id: string) => {
        const backup = addresses;

        // optimistic remove
        setAddresses((prev) => prev.filter((a) => a.id !== id));

        try {
            await deleteAddress(id);
            showToast("Address deleted");
        } catch (err) {
            console.error(err);
            setAddresses(backup); // rollback
            showToast("Delete failed", "error");
        }
    };

    const clearFormdata = () => {
        setForm({
            full_name: "",
            phone: "",
            street: "",
            city: "",
            state: "",
            postal_code: "",
            country: "",
            is_default: false,
        });
    }


    return (
        <div className="space-y-4">

            {loading && (
                <Loading />
            )}

            <div className="flex items-center justify-between">
                <p className="text-sm text-brand-earth font-body">{addresses.length} saved addresses</p>
                <button onClick={() => setAdding(true)}
                    className="flex items-center gap-1.5 text-sm font-semibold text-brand-forest bg-brand-ivory hover:bg-brand-gold/10 px-3 py-1.5 rounded-full transition-colors font-body">
                    <Plus size={14} /> Add New
                </button>
            </div>


            {toast.show && (
                <div
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-body animate-fade-up
                         ${toast.type === "success"
                            ? "text-green-700 bg-green-50 border border-green-100"
                            : "text-red-700 bg-red-50 border border-red-100"
                        }`}
                >
                    <Check size={15} />
                    {toast.message}
                </div>
            )}

            {/* Add form */}
            {adding && (
                <AddressForm
                    form={form}
                    editingId={editingId}
                    onChange={handleChange}
                    onCancel={() => {
                        setAdding(false);
                        setEditingId(null);
                        clearFormdata();
                    }}
                    onSubmit={handleSubmit}
                />
            )}
            {
                !adding && (
                    <div className="">
                        {addresses.map((addr) => (
                            <div key={addr.id} className={`bg-brand-off-white mb-3 rounded-2xl border overflow-hidden transition-all animate-fade-up ${addr.is_default ? "border-brand-forest/40" : "border-brand-ivory"}`}>
                                <div className="flex items-start gap-3 p-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${addr.is_default ? "bg-brand-forest" : "bg-brand-ivory"}`}>
                                        <MapPin size={16} className={addr.is_default ? "text-brand-cream" : "text-brand-earth"} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            {/* <span className="font-body text-sm font-semibold text-brand-forest">{addr.label}</span> */}
                                            {addr.is_default && (
                                                <span className="text-[10px] bg-brand-forest text-brand-cream px-2 py-0.5 rounded-full font-body font-semibold">Default</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-brand-forest font-body">{addr.full_name}</p>
                                        <p className="text-xs text-brand-earth/70 font-body leading-relaxed mt-0.5">
                                            {addr.street}<br />
                                            {addr.city}, {addr.state} {addr.postal_code}, {addr.country}
                                        </p>
                                        <p className="text-xs text-brand-earth/60 font-body mt-1">{addr.phone}</p>
                                    </div>
                                </div>
                                <div className="flex border-t border-brand-ivory">
                                    {!addr.is_default && (
                                        <button onClick={() => setDefault(addr.id)}
                                            className="flex-1 py-2.5 text-xs font-semibold text-brand-forest font-body hover:bg-brand-ivory transition-colors flex items-center justify-center gap-1.5">
                                            <Check size={12} /> Set Default
                                        </button>
                                    )}
                                    <button onClick={() => {
                                        setEditingId(addr.id);
                                        setForm({
                                            full_name: addr.full_name,
                                            phone: addr.phone,
                                            street: addr.street,
                                            city: addr.city,
                                            state: addr.state,
                                            postal_code: addr.postal_code,
                                            country: addr.country,
                                            is_default: addr.is_default,
                                        });
                                        setAdding(true);
                                    }}
                                        className="flex-1 py-2.5 text-xs font-semibold text-brand-earth font-body hover:bg-brand-ivory transition-colors flex items-center justify-center gap-1.5 border-l border-brand-ivory">
                                        <Pencil size={12} /> Edit
                                    </button>

                                    <button onClick={() => remove(addr.id)}
                                        className="flex-1 py-2.5 text-xs font-semibold text-red-500 font-body hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5 border-l border-brand-ivory">
                                        <Trash2 size={12} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
}
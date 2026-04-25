"use client";

import { useState } from "react";
import { MapPin, ChevronRight } from "lucide-react";
import { IAddress } from "@/src/types/user-types";
type Step = 1 | 2 | 3;

interface Props {
  addresses: IAddress[];
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
  setSelectedAddress: (a: IAddress) => void;
  deliveryOptions: any[];
  deliveryType: string;
  setDeliveryType: (t: any) => void;
  advanceStep: (step: Step) => void;
  showNewAddr: boolean;
  setShowNewAddr: (v: boolean) => void;
}

export interface AddressFormData {
  full_name: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  pincode: string;
}

interface AddressFormProps {
  initialValue?: Partial<AddressFormData>;
  onSubmit: (data: AddressFormData) => void;
  onCancel?: () => void;
}

export function AddressForm({ initialValue, onSubmit, onCancel }: AddressFormProps) {
  const [form, setForm] = useState<AddressFormData>({
    full_name: initialValue?.full_name || "",
    phone: initialValue?.phone || "",
    address1: initialValue?.address1 || "",
    address2: initialValue?.address2 || "",
    city: initialValue?.city || "",
    pincode: initialValue?.pincode || "",
  });

  function update<K extends keyof AddressFormData>(key: K, value: AddressFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit() {
    onSubmit(form);
  }

  return (
    <div className="border-t border-cream-200 pt-5 mb-5 space-y-3 animate-fade-up">
      <p className="text-[11px] font-dm font-bold text-gray-400 uppercase tracking-widest">
        New Address
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Full Name *</label>
          <input
            value={form.full_name}
            onChange={(e) => update("full_name", e.target.value)}
            className="input"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="label">Phone *</label>
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="input"
            placeholder="12345 67890"
          />
        </div>
      </div>

      <div>
        <label className="label">Address Line 1 *</label>
        <input
          value={form.address1}
          onChange={(e) => update("address1", e.target.value)}
          className="input"
          placeholder="House/Flat No., Street"
        />
      </div>

      <div>
        <label className="label">Address Line 2</label>
        <input
          value={form.address2}
          onChange={(e) => update("address2", e.target.value)}
          className="input"
          placeholder="Area, Landmark"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">City *</label>
          <input
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            className="input"
            placeholder="City"
          />
        </div>

        <div>
          <label className="label">PIN Code *</label>
          <input
            value={form.pincode}
            onChange={(e) => update("pincode", e.target.value)}
            className="input"
            maxLength={6}
            placeholder="123456"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-forest text-white font-dm font-bold py-2.5 rounded-xl"
        >
          Save Address
        </button>

        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 border border-cream-300 rounded-xl text-sm"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
export default function DeliveryAddressSection({
  addresses,
  selectedIndex,
  setSelectedIndex,
  setSelectedAddress,
  deliveryOptions,
  deliveryType,
  setDeliveryType,
  advanceStep,
  showNewAddr,
  setShowNewAddr,
}: Props) {
  function handleAddAddress(data: AddressFormData) {
    console.log("save address:", data);
    setShowNewAddr(false);
  }

  return (
    <div className="bg-white border border-cream-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-cream-100 flex items-center gap-3">
        <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center">
          <MapPin className="w-4 h-4 text-amber-500" />
        </div>
        <span className="font-playfair font-bold text-base text-gray-900">
          Delivery Address
        </span>
      </div>

      <div className="p-5">
        {/* Address list */}
        <div className="space-y-2.5 mb-3">
          {addresses.map((a, i) => (
            <div
              key={a.id || i}
              onClick={() => {
                setSelectedIndex(i);
                setSelectedAddress(a);
              }}
              className={`border-2 rounded-xl p-4 cursor-pointer flex gap-3 ${selectedIndex === i
                  ? "border-forest-500 bg-forest-50"
                  : "border-cream-300"
                }`}
            >
              <div className="w-4 h-4 border rounded-full mt-1 flex items-center justify-center">
                {selectedIndex === i && (
                  <div className="w-2 h-2 bg-forest-500 rounded-full" />
                )}
              </div>

              <div>
                <p className="font-dm font-bold text-sm">{a.full_name}</p>
                <p className="text-xs text-gray-500">
                  {a.street}, {a.city}, {a.state}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Add new */}
        <button
          onClick={() => setShowNewAddr(!showNewAddr)}
          className="w-full border-dashed border-2 border-cream-300 rounded-xl py-3 text-sm font-dm font-semibold text-forest-500 mb-5"
        >
          + Add a new address
        </button>

        {/* Form */}
        {showNewAddr && (
          <AddressForm
            onSubmit={handleAddAddress}
            onCancel={() => setShowNewAddr(false)}
          />
        )}

        {/* Delivery methods */}
        <p className="text-[11px] font-bold text-gray-400 uppercase mb-3">
          Delivery Method
        </p>

        <div className="space-y-2 mb-5">
          {deliveryOptions.map((opt) => (
            <div
              key={opt.id}
              onClick={() => setDeliveryType(opt.id)}
              className={`border-2 rounded-xl p-3 cursor-pointer flex items-center gap-3 ${deliveryType === opt.id
                  ? "border-forest-500 bg-forest-50"
                  : "border-cream-300"
                }`}
            >
              <div className="flex-1">
                <p className="text-sm font-bold">{opt.name}</p>
                <p className="text-xs text-gray-400">{opt.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => advanceStep(2)}
          className="w-full bg-forest text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
        >
          Continue to Payment <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
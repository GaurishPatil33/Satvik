import { Product } from "@/src/lib/types";
import { updateProduct, createProduct } from "@/src/services/product.service";
import { IProduct } from "@/src/types/products-types";
import { ChevronDown, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { ICategory } from "@/src/types/category-types";
import { getCategories } from "@/src/services/category.service";

interface ProductFormProps {
  initialData?: Partial<IProduct>;
  id?: string;
  onClose: () => void
  onSuccess?: () => void
}

interface Option {
  label: string;
  value: string;
}

interface PropsDropdown {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  label?: string;
}


export default function MultiSelectDropdown({
  options,
  value,
  onChange,
  placeholder = "Select...",
  label,
}: PropsDropdown) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div ref={ref} className="relative w-full">

      <div
        onClick={() => setOpen((p) => !p)}
        className="min-h-[42px] w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 flex flex-wrap items-center justify-between gap-2 cursor-pointer"
      >
        <div className="flex flex-wrap gap-1">
          {value.length ? (
            value.map((val) => {
              const option = options.find((o) => o.value === val);

              return (
                <span
                  key={val}
                  className="flex items-center gap-1 px-2 py-1 bg-[#2C4A2E] text-white text-xs rounded-full"
                >
                  {/* {option?.label || val} */}
                  {option?.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(val);
                    }}
                  >
                    <X size={10} />
                  </button>
                </span>
              );
            })
          ) : (
            <span className="text-gray-400 text-sm">{placeholder}</span>
          )}
        </div>

        <ChevronDown
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
          {options.map((opt) => {
            const isSelected = value.includes(opt.value);

            return (
              <div
                key={opt.value}
                onClick={() => toggle(opt.value)}
                className={cn(
                  "px-3 py-2 text-sm cursor-pointer flex justify-between items-center hover:bg-gray-100",
                  isSelected && "bg-gray-100 font-medium"
                )}
              >
                {opt.label}
                {isSelected && (
                  <span className="text-xs text-green-600">✓</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ProductForm({ initialData, id, onClose, onSuccess }: ProductFormProps) {
  const router = useRouter()
  const isEditMode = Boolean(id)
  const [form, setForm] = useState<Partial<IProduct>>({
    title: initialData?.title ?? "",
    brand: initialData?.brand ?? "",
    price: initialData?.price ?? 0,
    discount_percentage: initialData?.discount_percentage ?? 0,
    category_ids: initialData?.category_ids ?? [],
    description: initialData?.description ?? "",
    stock_quantity: initialData?.stock_quantity ?? 0,
    images: initialData?.images ?? [],
  });


  const [loading, setLoading] = useState(false);
  const [imageInput, setImageInput] = useState("");

  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetch();
  }, []);
  const categoryOptions = categories.map(cat => ({
    label: cat.name,
    value: cat.id
    // value:cat.name
  }))



  const handleChange = <K extends keyof IProduct>(
    field: K,
    value: IProduct[K]
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const addImage = () => {
    if (!imageInput) return;
    setForm(prev => ({
      ...prev,
      images: [...(prev.images || []), imageInput],
    }));
    setImageInput("");
  };

  const removeImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index),
    }));
  };

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const payload = {
        ...form,
        price: Number(form.price),
        stock_quantity: Number(form.stock_quantity),
        discount_percentage: Number(form.discount_percentage || 0),
        category_ids: form.category_ids ?? [],
        images: form.images ?? [],
      };

      if (isEditMode && id) {
        await updateProduct(id, payload);
        console.log("Product updated!");
      } else {
        await createProduct(payload);
        console.log("Product created!");
      }

      router.push("/admin/products");
      router.refresh();
      onSuccess?.()
      onClose()
    } catch (err: any) {
      console.error({ api: err.message });
      alert("Something went wrong" + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-display text-lg font-bold text-gray-900">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* main */}
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl space-y-4 bg-white p-6 rounded-xl shadow"
        >

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-body">Product Name</label>
              <input
                required
                value={form.title}
                onChange={e => handleChange("title", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2C4A2E] font-body" placeholder="e.g. Wood Pressed Groundnut Oil"
              />
            </div>
            <div className="col-span-2 relative">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-body">
                Categories
              </label>
              <MultiSelectDropdown
                label="Categories"
                options={categoryOptions}
                value={form.category_ids || []}
                onChange={(val) =>
                  setForm((prev) => ({
                    ...prev,
                    category_ids: val,
                  }))
                }
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-body">Price (₹)</label>
              <input
                type="number"
                required
                value={form.price}
                onChange={e => handleChange("price", Number(e.target.value))}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2C4A2E] font-body" placeholder="350" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-body">Brand</label>
              <input
                type="string"
                // required
                value={form.brand}
                onChange={e => handleChange("brand", (e.target.value))}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2C4A2E] font-body" placeholder="Satvik" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-body">Stock Quantity</label>
              <input
                type="number"
                required
                value={form.stock_quantity}
                onChange={e => handleChange("stock_quantity", Number(e.target.value))}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2C4A2E] font-body" placeholder="10" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-body">Discount %</label>
              <input
                type="number"
                required
                value={form.discount_percentage}
                onChange={e => handleChange("discount_percentage", Number(e.target.value))}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2C4A2E] font-body" placeholder="10" />
            </div>



            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-body">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2C4A2E] font-body resize-none" />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-body">
                Product Images
              </label>

              {/* Input + Add button */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  placeholder="Paste image URL..."
                  className="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2C4A2E]"
                />

                <button
                  type="button"
                  onClick={addImage}
                  className="px-3 py-2 bg-[#2C4A2E] text-white rounded-xl flex items-center gap-1 text-sm"
                >
                  <Upload size={14} /> Add
                </button>
              </div>

              {/* Preview Images */}
              <div className="flex gap-3 mt-3 flex-wrap">
                {form.images?.map((img, index) => (
                  <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden border">
                    <Image
                      src={img}
                      alt="product"
                      fill
                      className="object-cover"
                    />

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-body">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-5 py-2 text-sm bg-[#2C4A2E] text-white rounded-xl hover:bg-[#3D6B40] font-body font-medium">
              {loading ? "Saving..." : isEditMode ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}





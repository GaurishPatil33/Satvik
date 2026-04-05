import { Product } from "@/src/lib/types";
import { updateProduct, createProduct } from "@/src/services/product.service";
import { IProduct } from "@/src/types/products-types";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";


interface Props1 {
  initialData?: IProduct;
}
type Props = {
  product?: IProduct | null|undefined;
  onClose: () => void;
};
export function ProductForm({ initialData }: Props1) {
  const isEdit = !!initialData;

  const [form, setForm] = useState<Partial<IProduct>>(
    initialData || {
      title: "",
      brand: "",
      price: 0,
      category: [],
      description: "",
      stock: 0,
      media: [],
    }
  );

  const [loading, setLoading] = useState(false);

  // 🔥 Handle Input Change
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "category") {
      setForm({
        ...form,
        category: value.split(","),
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  // 🖼 Upload Image (Supabase / Cloudinary style)
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    // 🔁 Replace with your upload API
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    return {
      url: data.url,
      public_id: data.public_id,
      type: "image" as const,
    };
  };

  // 📸 Handle File Input
  const handleFileChange = async (e: any) => {
    const files = e.target.files;
    if (!files) return;

    const uploadedMedia = [];

    for (let file of files) {
      const uploaded = await handleImageUpload(file);
      uploadedMedia.push(uploaded);
    }

    setForm({
      ...form,
      media: [...(form.media || []), ...uploadedMedia],
    });
  };

  // ❌ Remove Image
  const removeImage = (index: number) => {
    const updated = [...(form.media || [])];
    updated.splice(index, 1);

    setForm({
      ...form,
      media: updated,
    });
  };

  // 🚀 Submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await updateProduct(initialData!.id, form);
        alert("Product updated");
      } else {
        await createProduct(form);
        alert("Product created");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow"
    >
      <h2 className="text-xl font-bold">
        {isEdit ? "Edit Product" : "Create Product"}
      </h2>

      {/* Title */}
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border p-2"
      />

      {/* Brand */}
      <input
        name="brand"
        placeholder="Brand"
        value={form.brand}
        onChange={handleChange}
        className="w-full border p-2"
      />

      {/* Price */}
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="w-full border p-2"
      />

      {/* Category */}
      <input
        name="category"
        placeholder="Category (comma separated)"
        value={form.category?.join(",")}
        onChange={handleChange}
        className="w-full border p-2"
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2"
      />

      {/* Stock */}
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        className="w-full border p-2"
      />

      {/* Image Upload */}
      <input type="file" multiple onChange={handleFileChange} />

      {/* Preview Images */}
      <div className="flex gap-3 flex-wrap">
        {form.media?.map((m, i) => (
          <div key={i} className="relative">
            <img
              src={m.url}
              className="w-24 h-24 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-0 right-0 bg-red-500 text-white px-1"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Product"
          : "Create Product"}
      </button>
    </form>
  );
}
const ProductModal = ({ product, onClose }: { product?: Product | null; onClose: () => void }) => {
    const isEdit = !!product;
    const [form, setForm] = useState({
        name: product?.title ?? "",
        category: product?.category ?? "oil",
        price: product?.price?.toString() ?? "",
        description: product?.description ?? "",
    });

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <h2 className="font-display text-lg font-bold text-gray-900">
                        {isEdit ? "Edit Product" : "Add New Product"}
                    </h2>
                    <button onClick={onClose} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <X size={14} />
                    </button>
                </div>

                <div className="px-6 py-5 space-y-4">
                    {/* Image upload area */}
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#C8961C] transition-colors cursor-pointer">
                        {product?.media ? (
                            <div className="relative w-20 h-20 mx-auto rounded-xl overflow-hidden">
                                <Image src={product.media[0].url} alt={product.title} fill className="object-cover" sizes="80px" />
                            </div>
                        ) : (
                            <div className="text-gray-400">
                                <p className="text-3xl mb-1 w-full items-center justify-center flex"><Upload/></p>
                                <p className="text-xs font-body">Click to upload product image</p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-body">Product Name</label>
                            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2C4A2E] font-body" placeholder="e.g. Wood Pressed Groundnut Oil" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-body">Category</label>
                            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2C4A2E] font-body">
                                {["oil", "jaggery", "sugar", "salt"].map((c) => (
                                    <option key={c} value={c} className="capitalize">{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-body">Price (₹)</label>
                            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2C4A2E] font-body" placeholder="350" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-body">Description</label>
                            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                                rows={3} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2C4A2E] font-body resize-none" />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
                    <button onClick={onClose} className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-body">
                        Cancel
                    </button>
                    <button className="px-5 py-2 text-sm bg-[#2C4A2E] text-white rounded-xl hover:bg-[#3D6B40] font-body font-medium">
                        {isEdit ? "Save Changes" : "Add Product"}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ProductModal


export function ProductModal1({ product, onClose }: Props) {
  const isEdit = !!product;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Partial<IProduct>>({
    title: product?.title ?? "",
    category: product?.category ?? ["oil"],
    price: product?.price ?? 0,
    description: product?.description ?? "",
    media: product?.media ?? [],
  });

  // 📸 Upload Image
  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    return {
      url: data.url as string,
      public_id: data.public_id as string,
      type: "image" as const,
    };
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploaded = await handleUpload(file);

    setForm((prev) => ({
      ...prev,
      media: [uploaded], // single image (can extend to multiple)
    }));
  };

  // 🚀 Submit
  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (isEdit) {
        await updateProduct(product!.id, form);
      } else {
        await createProduct(form);
      }

      onClose();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center">
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Image Upload */}
          <label className="block border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#C8961C]">
            {form.media?.length ? (
              <div className="relative w-24 h-24 mx-auto">
                <Image
                  src={form.media[0].url}
                  alt="product"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            ) : (
              <div className="text-gray-400">
                <p className="text-3xl">📦</p>
                <p className="text-xs">Upload Image</p>
              </div>
            )}

            <input type="file" hidden onChange={handleFileChange} />
          </label>

          {/* Inputs */}
          <div className="space-y-3">

            <input
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              placeholder="Product Title"
              className="w-full border p-2 rounded-xl"
            />

            <select
              value={form.category?.[0]}
              onChange={(e) =>
                setForm({ ...form, category: [e.target.value] })
              }
              className="w-full border p-2 rounded-xl"
            >
              {["oil", "jaggery", "sugar", "salt"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
              placeholder="Price"
              className="w-full border p-2 rounded-xl"
            />

            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Description"
              className="w-full border p-2 rounded-xl"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button onClick={onClose} className="border px-4 py-2 rounded-xl">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-700 text-white px-5 py-2 rounded-xl"
          >
            {loading
              ? "Saving..."
              : isEdit
              ? "Save Changes"
              : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
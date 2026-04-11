import { Product } from "@/src/lib/types";
import { updateProduct, createProduct } from "@/src/services/product.service";
import { IProduct } from "@/src/types/products-types";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


// interface Props1 {
//   initialData?: IProduct;
// }
// type Props = {
//   product?: IProduct | null | undefined;
//   onClose: () => void;
// };

// export interface ProductFormData {
//   title: string
//   brand?: string
//   price: number
//   discount_percentage?: number
//   category_ids: string[]
//   description?: string
//   stock_quantity: number
//   images: string[]
// }

// export function ProductForm({ initialData }: Props1) {
//   const isEdit = !!initialData;

//   const [form, setForm] = useState<ProductFormData>(
//     initialData
//       ? {
//         title: initialData.title,
//         brand: initialData.brand ?? "",
//         price: initialData.price,
//         discount_percentage: initialData.discount_percentage ?? 0,
//         category_ids: initialData.category_ids,
//         description: initialData.description ?? "",
//         stock_quantity: initialData.stock_quantity,
//         images: initialData.images,
//       }
//       : {
//         title: "",
//         brand: "",
//         price: 0,
//         discount_percentage: 0,
//         category_ids: [],
//         description: "",
//         stock_quantity: 0,
//         images: [],
//       }
//   );

//   const [loading, setLoading] = useState(false);

//   //  Handle Input Change
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;

//     setForm(prev => ({
//       ...prev,
//       [name]:
//         name === "price" ||
//           name === "discount_percentage" ||
//           name === "stock_quantity"
//           ? Number(value)
//           : value,
//     }));
//   };

//   //  Upload Image (Supabase / Cloudinary style)
//   const handleImageUpload = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await fetch("/api/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     return data.url as string; // 👈 only URL
//   };

//   //  Handle File Input
//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;

//     const urls: string[] = [];

//     for (const file of Array.from(e.target.files)) {
//       const url = await handleImageUpload(file);
//       urls.push(url);
//     }

//     setForm(prev => ({
//       ...prev,
//       images: [...prev.images, ...urls],
//     }));
//   };

//   //  Remove Image
//   const removeImage = (index: number) => {
//     const updated = [...(form.images || [])];
//     updated.splice(index, 1);

//     setForm({
//       ...form,
//       images: updated,
//     });
//   };

//   // Submit
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (isEdit) {
//         await updateProduct(initialData!.id, form);
//         alert("Product updated");
//       } else {
//         await createProduct(form);
//         alert("Product created");
//       }
//     } catch (err: any) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-4 bg-white p-6 rounded-xl shadow"
//     >
//       <h2 className="text-xl font-bold">
//         {isEdit ? "Edit Product" : "Create Product"}
//       </h2>

//       {/* Title */}
//       <input
//         name="title"
//         placeholder="Title"
//         value={form.title}
//         onChange={handleChange}
//         className="w-full border p-2"
//       />

//       {/* Brand */}
//       <input
//         name="brand"
//         placeholder="Brand"
//         value={form.brand}
//         onChange={handleChange}
//         className="w-full border p-2"
//       />

//       {/* Price */}
//       <input
//         type="number"
//         name="price"
//         placeholder="Price"
//         value={form.price}
//         onChange={handleChange}
//         className="w-full border p-2"
//       />

//       {/* Category */}
//       <input
//         name="category_ids"
//         placeholder="Categories (comma separated)"
//         value={form.category_ids.join(",")}
//         onChange={(e) =>
//           setForm({
//             ...form,
//             category_ids: e.target.value.split(",").map(c => c.trim()),
//           })
//         }
//         className="w-full border p-2"
//       />

//       {/* Description */}
//       <textarea
//         name="description"
//         placeholder="Description"
//         value={form.description}
//         onChange={handleChange}
//         className="w-full border p-2"
//       />

//       {/* Stock */}
//       <input
//         type="number"
//         name="stock"
//         placeholder="Stock"
//         value={form.stock_quantity}
//         onChange={handleChange}
//         className="w-full border p-2"
//       />

//       {/* Image Upload */}
//       <input type="file" multiple onChange={handleFileChange} />

//       {/* Preview Images */}
//       <div className="flex gap-3 flex-wrap">
//         {form.images.map((m, i) => (
//           <div key={i} className="relative">
//             <img
//               src={m}
//               className="w-24 h-24 object-cover rounded"
//             />
//             <button
//               type="button"
//               onClick={() => removeImage(i)}
//               className="absolute top-0 right-0 bg-red-500 text-white px-1"
//             >
//               X
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Submit */}
//       <button
//         disabled={loading}
//         className="bg-green-600 text-white px-4 py-2 rounded"
//       >
//         {loading
//           ? "Saving..."
//           : isEdit
//             ? "Update Product"
//             : "Create Product"}
//       </button>
//     </form>
//   );
// }
interface Props {
  initialData?: Partial<IProduct>;
  id?: string;
  onClose: () => void
}


// https://www.youtube.com/watch?v=87JAdYPC2n0

export function ProductForm({ initialData, id, onClose }: Props) {
  const router = useRouter()
  const isEditMode = Boolean(id)
  const [form, setForm] = useState<Partial<IProduct>>({
    title: initialData?.title || "",
    brand: initialData?.brand || "",
    price: initialData?.price || 0,
    discount_percentage: initialData?.discount_percentage || 0,
    category_ids: initialData?.category_ids || [],
    description: initialData?.description || "",
    stock_quantity: initialData?.stock_quantity || 0,
    images: initialData?.images || [],
  });

  const [loading, setLoading] = useState(false);
  const [imageInput, setImageInput] = useState("");

  const handleChange = (field: keyof IProduct, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
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

  const handleCategoryChange = (value: string) => {
    const arr = value.split(",").map(v => v.trim());
    setForm(prev => ({ ...prev, category_ids: arr }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEditMode && id) {
        await updateProduct(id, form);
        alert("Product updated!");
      } else {
        await createProduct(form);
        alert("Product created!");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
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
          <h2 className="text-2xl font-bold">
            {isEditMode ? "Edit Product" : "Create Product"}
          </h2>

          {/* Title */}
          <input
            required
            placeholder="Title"
            className="input"
            value={form.title}
            onChange={e => handleChange("title", e.target.value)}
          />

          {/* Brand */}
          <input
            placeholder="Brand"
            className="input"
            value={form.brand}
            onChange={e => handleChange("brand", e.target.value)}
          />

          {/* Price */}
          <input
            type="number"
            required
            placeholder="Price"
            className="input"
            value={form.price}
            onChange={e => handleChange("price", Number(e.target.value))}
          />

          {/* Discount */}
          <input
            type="number"
            placeholder="Discount %"
            className="input"
            value={form.discount_percentage}
            onChange={e =>
              handleChange("discount_percentage", Number(e.target.value))
            }
          />

          {/* Stock */}
          <input
            type="number"
            required
            placeholder="Stock Quantity"
            className="input"
            value={form.stock_quantity}
            onChange={e =>
              handleChange("stock_quantity", Number(e.target.value))
            }
          />

          {/* Categories */}
          <input
            placeholder="Category IDs (comma separated)"
            className="input"
            value={form.category_ids?.join(",")}
            onChange={e => handleCategoryChange(e.target.value)}
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            className="input"
            value={form.description}
            onChange={e => handleChange("description", e.target.value)}
          />

          {/* Image URLs */}
          <div>
            <div className="flex gap-2">
              <input
                placeholder="Image URL"
                className="input flex-1"
                value={imageInput}
                onChange={e => setImageInput(e.target.value)}
              />
              <button
                type="button"
                onClick={addImage}
                className="btn"
              >
                Add
              </button>
            </div>

            <div className="mt-2 space-y-1">
              {form.images?.map((img, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="truncate">{img}</span>
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="text-red-500"
                  >
                    remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button disabled={loading} className="btn-primary w-full">
            {loading ? "Saving..." : "Save Product"}
          </button>
        </form>

      </div>
    </div>
  )




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
                <p className="text-3xl mb-1 w-full items-center justify-center flex"><Upload /></p>
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



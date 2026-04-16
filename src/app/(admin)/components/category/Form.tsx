import { Product } from "@/src/lib/types";
import { updateProduct, createProduct } from "@/src/services/product.service";
import { IProduct } from "@/src/types/products-types";
import { ChevronDown, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { ICategory } from "@/src/types/category-types";
import { createCategory, getCategories, updateCategory } from "@/src/services/category.service";
import { deleteImage, uploadImage } from "@/src/services/upload.service";

interface CategoryFormProps {
    initialData?: Partial<ICategory>;
    id?: string;
    onClose: () => void
    onSuccess?: () => void
}

export function CategoryForm({ initialData, id, onClose, onSuccess }: CategoryFormProps) {
    const router = useRouter()
    const isEditMode = Boolean(id)

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [form, setForm] = useState<Partial<ICategory>>({
        slug: initialData?.slug ?? "",
        name: initialData?.name ?? "",
        description: initialData?.description ?? "",
        parent_id: initialData?.parent_id ?? "",
        media: initialData?.media ?? [],
        is_active: initialData?.is_active ?? true
    });
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);


    useEffect(() => {
        const fetch = async () => {
            const data = await getCategories();
            setCategories(data);
        };
        fetch();
    }, [])

    const handleChange = <K extends keyof ICategory>(
        field: K,
        value: ICategory[K]
    ) => {
        setForm(prev => ({
            ...prev,
            [field]: value,
        }));
    };


    // imageUpload
    const handleFilesUpload = async (files: FileList | null) => {
        if (!files) return;

        try {
            setUploading(true);

            const uploadedMedia: ICategory["media"] = [];

            for (const file of Array.from(files)) {
                const res = await uploadImage(file, "categories");
                uploadedMedia.push({
                    url: res.publicUrl,
                    public_id: res.path,
                    type: "image"
                });
            }

            setForm(prev => ({
                ...prev,
                media: [...(prev.media || []), ...uploadedMedia],
            }));
        } catch (err) {
            console.error(err);
            alert("Image upload failed");
        } finally {
            setUploading(false);
        }
    };
    // imageDelete
    const handleRemoveImage = async (publicId: string, index: number) => {
        try {
            await deleteImage(publicId);

            setForm(prev => ({
                ...prev,
                media: prev.media?.filter((_, i) => i !== index),
            }));
        } catch (err) {
            console.error(err);
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            const payload = {
                ...form,
                name: form.name || "",
                slug: form.slug || "",
                description: form.description || "",
                media: form.media || [],
                parent_id: form.parent_id || null,
                is_active: form.is_active ?? true,
            };

            // console.log(payload)

            if (isEditMode && id) {
                await updateCategory(id, payload);
                console.log("Category updated!");
            } else {
                await createCategory(payload);
                console.log("Category created!");
            }

            router.push("/admin/categories");
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
                        {isEditMode ? "Edit Category" : "Add New Category"}
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
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-body">Category Name</label>
                            <input
                                required
                                value={form.name}
                                onChange={e => {
                                    handleChange("name", e.target.value);
                                    handleChange("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"));
                                }}
                                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2C4A2E] font-body"
                                placeholder="e.g. Oil, Sugar, etc"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-body">Slug</label>
                            <input
                                required
                                value={form.slug}
                                onChange={e => handleChange("slug", e.target.value)}
                                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2C4A2E] font-body"
                                placeholder="e.g. oil, sugar"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-body">Parent Category</label>
                            <select
                                value={form.parent_id || ""}
                                onChange={(e) =>
                                    handleChange("parent_id", e.target.value || null)
                                }
                                className="w-full px-3 py-2 border rounded-xl text-sm"
                            >
                                <option value="">No Parent</option>
                                {categories
                                    .filter((c) => c.id !== id)
                                    .map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-body">Description</label>
                            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                                rows={3} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#2C4A2E] font-body resize-none" />
                        </div>

                        {/* PRODUCT IMAGES */}
                        <div className="col-span-2 space-y-3">
                            <label className="block text-xs font-semibold text-gray-500">
                                Category Images
                            </label>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                hidden
                                onChange={(e) => handleFilesUpload(e.target.files)}
                            />

                            {/* upload button */}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 bg-[#2C4A2E] text-white rounded-xl text-sm"
                            >
                                {uploading ? "Uploading..." : "Upload Images"}
                            </button>

                            {/* preview grid */}
                            <div className="grid grid-cols-4 gap-3">
                                {form.media?.map((img, index) => (
                                    <div key={index} className="relative w-full h-24 rounded-xl overflow-hidden border">
                                        <Image
                                            src={img.url}
                                            alt="product"
                                            fill
                                            className="object-cover"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(img.public_id, index)}
                                            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* Status */}
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={form.is_active}
                            onChange={() =>
                                handleChange("is_active", !form.is_active)
                            }
                        />
                        Active
                    </label>

                    <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-body">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="px-5 py-2 text-sm bg-[#2C4A2E] text-white rounded-xl hover:bg-[#3D6B40] font-body font-medium">
                            {loading ? "Saving..." : isEditMode ? "Save Changes" : "Create Category"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}





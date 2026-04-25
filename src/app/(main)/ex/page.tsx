"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Review {
  author: string;
  rating: number;
  comment: string;
  date?: string;
}

export interface Product1 {
  id: number | string;
  title: string;
  brand: string;
  price?: number | string;
  discountPercentage?: string | number;
  description: { title: string; text: string };
  category: string;
  rating: number;
  reviews: Review[];
  media: { url: string; public_id: string; type: "image" | "video" | "youtube" }[];
  variants: { size: string | number; price: string | number; discount: string | number; stock: number }[];
  badge: string;
  coupons: { discount: number; coupon: string }[];
  KeyBenefits: { title: string; text: string }[];
  nutritions: { key: string; val: string }[];
  howToUse: { title: string; text: string }[];
  product_details: { key: string; val: string }[];
}

type ProductForm = Omit<Product1, "id">;

interface ProductFormProps {
  id?: string | number;
  initialData?: Partial<Product1>;
  onSuccess?: () => void;
  onClose?: () => void;
  uploadImage?: (file: File, folder: string) => Promise<{ publicUrl: string; path: string }>;
  deleteImage?: (publicId: string) => Promise<void>;
  createProduct?: (payload: ProductForm) => Promise<void>;
  updateProduct?: (id: string | number, payload: ProductForm) => Promise<void>;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const defaultForm: ProductForm = {
  title: "",
  brand: "",
  price: "",
  discountPercentage: "",
  description: { title: "", text: "" },
  category: "",
  rating: 0,
  reviews: [],
  media: [],
  variants: [],
  badge: "",
  coupons: [],
  KeyBenefits: [],
  nutritions: [],
  howToUse: [],
  product_details: [],
};

// ─── UI Primitives ─────────────────────────────────────────────────────────────

const SectionTitle = ({ icon, title }: { icon: string; title: string }) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="text-lg">{icon}</span>
    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">{title}</h3>
    <div className="flex-1 h-px bg-zinc-800" />
  </div>
);

const Field = ({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
      {label}
      {required && <span className="text-amber-400 ml-1">*</span>}
    </label>
    {children}
    {hint && <p className="text-xs text-zinc-600">{hint}</p>}
  </div>
);

const inputCls =
  "w-full bg-zinc-900 border border-zinc-700/60 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/20 transition-all";

const btnSecondaryCls =
  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 transition-all";

const btnDangerCls =
  "flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded border border-red-900/40 text-red-500 hover:bg-red-950/40 transition-all";

// ─── Main Component ────────────────────────────────────────────────────────────

export default function ProductForm({
  id,
  initialData,
  onSuccess,
  onClose,
  uploadImage,
  deleteImage,
  createProduct,
  updateProduct,
}: ProductFormProps) {
  const router = useRouter();
  const isEditMode = !!id;
  const uploadPathRef = useRef<string[]>([]);

  const [form, setForm] = useState<ProductForm>({
    ...defaultForm,
    ...initialData,
    description: initialData?.description ?? defaultForm.description,
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("basics");
  const [errors, setErrors] = useState<Partial<Record<keyof ProductForm, string>>>({});

  useEffect(() => {
    if (initialData) {
      setForm({
        ...defaultForm,
        ...initialData,
        description: initialData.description ?? defaultForm.description,
      });
    }
  }, [initialData]);

  // ── Helpers ──────────────────────────────────────────────────────────────

  const set = useCallback(<K extends keyof ProductForm>(key: K, value: ProductForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const validate = () => {
    const e: typeof errors = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.brand.trim()) e.brand = "Brand is required";
    if (!form.category.trim()) e.category = "Category is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Media ─────────────────────────────────────────────────────────────────

  const handleFilesUpload = async (files: FileList | null) => {
    if (!files || !uploadImage) return;
    try {
      setUploading(true);
      const uploaded: Product1["media"] = [];
      for (const file of Array.from(files)) {
        const res = await uploadImage(file, "products");
        uploadPathRef.current.push(res.path);
        uploaded.push({
          url: res.publicUrl,
          public_id: res.path,
          type: file.type.startsWith("video") ? "video" : "image",
        });
      }
      setForm((prev) => ({ ...prev, media: [...prev.media, ...uploaded] }));
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveMedia = async (publicId: string, index: number) => {
    if (!deleteImage) return;
    try {
      await deleteImage(publicId);
      setForm((prev) => ({ ...prev, media: prev.media.filter((_, i) => i !== index) }));
      uploadPathRef.current = uploadPathRef.current.filter((p) => p !== publicId);
    } catch (err) {
      console.error(err);
    }
  };

  const addYouTube = () => {
    const url = prompt("Enter YouTube URL:");
    if (!url) return;
    setForm((prev) => ({
      ...prev,
      media: [...prev.media, { url, public_id: `yt_${Date.now()}`, type: "youtube" }],
    }));
  };

  // ── List helpers ──────────────────────────────────────────────────────────

  const addItem = <T,>(key: keyof ProductForm, blank: T) =>
    setForm((prev) => ({ ...prev, [key]: [...(prev[key] as T[]), blank] }));

  const removeItem = (key: keyof ProductForm, idx: number) =>
    setForm((prev) => ({
      ...prev,
      [key]: (prev[key] as unknown[]).filter((_, i) => i !== idx),
    }));

  const updateItem = <T,>(key: keyof ProductForm, idx: number, patch: Partial<T>) =>
    setForm((prev) => ({
      ...prev,
      [key]: (prev[key] as T[]).map((item, i) => (i === idx ? { ...item, ...patch } : item)),
    }));

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      const payload: ProductForm = {
        ...form,
        price: form.price === "" ? undefined : form.price,
        discountPercentage: form.discountPercentage === "" ? undefined : form.discountPercentage,
      };
      if (isEditMode && id) {
        await updateProduct?.(id, payload);
      } else {
        await createProduct?.(payload);
      }
      uploadPathRef.current = [];
      router.push("/admin/products");
      router.refresh();
      onSuccess?.();
      onClose?.();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error({ api: msg });
      for (const path of uploadPathRef.current) {
        try { await deleteImage?.(path); }
        catch (ce) { console.error("Cleanup failed:", ce); }
      }
      alert("Something went wrong: " + msg);
    } finally {
      setLoading(false);
    }
  };

  // ─── Tabs ─────────────────────────────────────────────────────────────────

  const tabs = [
    { id: "basics",   label: "Basics",   icon: "📦" },
    { id: "media",    label: "Media",    icon: "🖼️" },
    { id: "variants", label: "Variants", icon: "🔖" },
    { id: "content",  label: "Content",  icon: "📝" },
    { id: "meta",     label: "Meta",     icon: "⚙️" },
  ];

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur border-b border-zinc-800/60">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              {isEditMode ? "✏️" : "＋"}
            </div>
            <div>
              <h1 className="text-sm font-bold">{isEditMode ? "Edit Product" : "New Product"}</h1>
              {isEditMode && <p className="text-xs text-zinc-500">ID: {id}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {onClose && (
              <button type="button" onClick={onClose} className={btnSecondaryCls}>
                Cancel
              </button>
            )}
            <button
              type="submit"
              form="product-form"
              disabled={loading || uploading}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-lg bg-amber-500 text-zinc-950 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-amber-500/10"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"
                      strokeDasharray="60" strokeDashoffset="20" />
                  </svg>
                  Saving…
                </>
              ) : (
                <>{isEditMode ? "Update" : "Create"} Product</>
              )}
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="max-w-5xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 whitespace-nowrap transition-all ${
                activeTab === t.id
                  ? "border-amber-500 text-amber-400 bg-amber-500/5"
                  : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40"
              }`}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Form body ── */}
      <form id="product-form" onSubmit={handleSubmit} noValidate>
        <div className="max-w-5xl mx-auto px-6 py-8">

          {/* ══ BASICS ════════════════════════════════════════════════════════ */}
          {activeTab === "basics" && (
            <div className="space-y-8">
              <SectionTitle icon="📦" title="Core Information" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Title" required>
                  <input
                    className={`${inputCls} ${errors.title ? "border-red-500/70" : ""}`}
                    placeholder="e.g. Whey Protein 2kg"
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                  />
                  {errors.title && <p className="text-xs text-red-400">{errors.title}</p>}
                </Field>

                <Field label="Brand" required>
                  <input
                    className={`${inputCls} ${errors.brand ? "border-red-500/70" : ""}`}
                    placeholder="e.g. MuscleBlaze"
                    value={form.brand}
                    onChange={(e) => set("brand", e.target.value)}
                  />
                  {errors.brand && <p className="text-xs text-red-400">{errors.brand}</p>}
                </Field>

                <Field label="Category" required>
                  <input
                    className={`${inputCls} ${errors.category ? "border-red-500/70" : ""}`}
                    placeholder="e.g. Protein / Supplements"
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                  />
                  {errors.category && <p className="text-xs text-red-400">{errors.category}</p>}
                </Field>

                <Field label="Badge" hint="e.g. Best Seller, New Arrival, Sale">
                  <input
                    className={inputCls}
                    placeholder="e.g. Best Seller"
                    value={form.badge}
                    onChange={(e) => set("badge", e.target.value)}
                  />
                </Field>

                <Field label="Price (₹)">
                  <input
                    type="number"
                    className={inputCls}
                    placeholder="0.00"
                    value={form.price ?? ""}
                    onChange={(e) => set("price", e.target.value)}
                  />
                </Field>

                <Field label="Discount (%)">
                  <input
                    type="number"
                    className={inputCls}
                    placeholder="0"
                    min={0}
                    max={100}
                    value={form.discountPercentage ?? ""}
                    onChange={(e) => set("discountPercentage", e.target.value)}
                  />
                </Field>

                <Field label="Rating" hint="0 – 5">
                  <input
                    type="number"
                    className={inputCls}
                    placeholder="4.5"
                    min={0}
                    max={5}
                    step={0.1}
                    value={form.rating}
                    onChange={(e) => set("rating", parseFloat(e.target.value) || 0)}
                  />
                </Field>
              </div>

              {/* Description */}
              <SectionTitle icon="📄" title="Description" />
              <div className="space-y-4">
                <Field label="Description Title">
                  <input
                    className={inputCls}
                    placeholder="e.g. About this product"
                    value={form.description.title}
                    onChange={(e) => set("description", { ...form.description, title: e.target.value })}
                  />
                </Field>
                <Field label="Description Body">
                  <textarea
                    rows={5}
                    className={`${inputCls} resize-y`}
                    placeholder="Write a detailed product description…"
                    value={form.description.text}
                    onChange={(e) => set("description", { ...form.description, text: e.target.value })}
                  />
                </Field>
              </div>

              {/* Coupons */}
              <SectionTitle icon="🎟️" title="Coupons" />
              <div className="space-y-3">
                {form.coupons.map((c, i) => (
                  <div
                    key={i}
                    className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 grid grid-cols-2 gap-3"
                  >
                    <Field label="Coupon Code">
                      <input
                        className={inputCls}
                        placeholder="SAVE20"
                        value={c.coupon}
                        onChange={(e) =>
                          updateItem<typeof c>("coupons", i, { coupon: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Discount (%)">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          className={inputCls}
                          placeholder="20"
                          value={c.discount}
                          onChange={(e) =>
                            updateItem<typeof c>("coupons", i, {
                              discount: parseFloat(e.target.value) || 0,
                            })
                          }
                        />
                        <button
                          type="button"
                          onClick={() => removeItem("coupons", i)}
                          className={btnDangerCls}
                        >
                          ✕
                        </button>
                      </div>
                    </Field>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addItem("coupons", { coupon: "", discount: 0 })}
                  className={btnSecondaryCls}
                >
                  + Add Coupon
                </button>
              </div>
            </div>
          )}

          {/* ══ MEDIA ══════════════════════════════════════════════════════════ */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <SectionTitle icon="🖼️" title="Product Media" />

              {/* Upload zone */}
              {uploadImage && (
                <label className="relative flex flex-col items-center justify-center gap-3 w-full h-44 rounded-2xl border-2 border-dashed border-zinc-700 hover:border-amber-500/50 bg-zinc-900/40 hover:bg-amber-500/5 cursor-pointer transition-all group">
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => handleFilesUpload(e.target.files)}
                    disabled={uploading}
                  />
                  {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <svg
                        className="animate-spin w-6 h-6 text-amber-400"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="3"
                          strokeDasharray="60" strokeDashoffset="20"
                        />
                      </svg>
                      <span className="text-xs text-zinc-400">Uploading…</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 group-hover:bg-amber-500/10 flex items-center justify-center text-xl transition-all">
                        📁
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-zinc-300">
                          Drop files or click to upload
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          Images & videos supported
                        </p>
                      </div>
                    </>
                  )}
                </label>
              )}

              <button type="button" onClick={addYouTube} className={btnSecondaryCls}>
                ▶ Add YouTube URL
              </button>

              {/* Media grid */}
              {form.media.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {form.media.map((m, i) => (
                    <div
                      key={i}
                      className="relative group rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 aspect-square"
                    >
                      {m.type === "image" ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.url} alt="" className="w-full h-full object-cover" />
                      ) : m.type === "youtube" ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-red-950/30 gap-2">
                          <span className="text-3xl">▶</span>
                          <span className="text-xs text-zinc-400 px-2 truncate max-w-full">
                            YouTube
                          </span>
                        </div>
                      ) : (
                        <video src={m.url} className="w-full h-full object-cover" muted />
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveMedia(m.public_id, i)}
                          className="px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-500 text-white transition-all"
                        >
                          Remove
                        </button>
                      </div>
                      <span className="absolute top-1.5 left-1.5 text-xs bg-black/70 rounded px-1.5 py-0.5 text-zinc-300">
                        {m.type}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-10 text-zinc-600 text-sm">No media added yet</p>
              )}
            </div>
          )}

          {/* ══ VARIANTS ═══════════════════════════════════════════════════════ */}
          {activeTab === "variants" && (
            <div className="space-y-6">
              <SectionTitle icon="🔖" title="Product Variants" />
              <div className="space-y-3">
                {form.variants.map((v, i) => (
                  <div
                    key={i}
                    className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Field label="Size / Weight">
                        <input
                          className={inputCls}
                          placeholder="1kg, XL…"
                          value={v.size}
                          onChange={(e) =>
                            updateItem<typeof v>("variants", i, { size: e.target.value })
                          }
                        />
                      </Field>
                      <Field label="Price (₹)">
                        <input
                          type="number"
                          className={inputCls}
                          placeholder="0"
                          value={v.price}
                          onChange={(e) =>
                            updateItem<typeof v>("variants", i, { price: e.target.value })
                          }
                        />
                      </Field>
                      <Field label="Discount (%)">
                        <input
                          type="number"
                          className={inputCls}
                          placeholder="0"
                          value={v.discount}
                          onChange={(e) =>
                            updateItem<typeof v>("variants", i, { discount: e.target.value })
                          }
                        />
                      </Field>
                      <Field label="Stock">
                        <div className="flex gap-2">
                          <input
                            type="number"
                            className={inputCls}
                            placeholder="0"
                            value={v.stock}
                            onChange={(e) =>
                              updateItem<typeof v>("variants", i, {
                                stock: parseInt(e.target.value) || 0,
                              })
                            }
                          />
                          <button
                            type="button"
                            onClick={() => removeItem("variants", i)}
                            className={btnDangerCls}
                          >
                            ✕
                          </button>
                        </div>
                      </Field>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addItem("variants", { size: "", price: "", discount: "", stock: 0 })
                  }
                  className={btnSecondaryCls}
                >
                  + Add Variant
                </button>
              </div>
            </div>
          )}

          {/* ══ CONTENT ════════════════════════════════════════════════════════ */}
          {activeTab === "content" && (
            <div className="space-y-10">

              {/* Key Benefits */}
              <div>
                <SectionTitle icon="✅" title="Key Benefits" />
                <div className="space-y-3">
                  {form.KeyBenefits.map((b, i) => (
                    <div
                      key={i}
                      className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex gap-3"
                    >
                      <div className="flex-1 space-y-3">
                        <Field label="Title">
                          <input
                            className={inputCls}
                            placeholder="e.g. High Protein"
                            value={b.title}
                            onChange={(e) =>
                              updateItem<typeof b>("KeyBenefits", i, { title: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Description">
                          <textarea
                            rows={2}
                            className={`${inputCls} resize-none`}
                            placeholder="Benefit description…"
                            value={b.text}
                            onChange={(e) =>
                              updateItem<typeof b>("KeyBenefits", i, { text: e.target.value })
                            }
                          />
                        </Field>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem("KeyBenefits", i)}
                        className={`${btnDangerCls} mt-6 self-start`}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItem("KeyBenefits", { title: "", text: "" })}
                    className={btnSecondaryCls}
                  >
                    + Add Benefit
                  </button>
                </div>
              </div>

              {/* How To Use */}
              <div>
                <SectionTitle icon="📋" title="How To Use" />
                <div className="space-y-3">
                  {form.howToUse.map((h, i) => (
                    <div
                      key={i}
                      className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex gap-3"
                    >
                      <span className="text-xs font-bold text-zinc-600 w-5 text-center mt-8 shrink-0">
                        {i + 1}
                      </span>
                      <div className="flex-1 space-y-3">
                        <Field label="Step Title">
                          <input
                            className={inputCls}
                            placeholder="e.g. Mix with water"
                            value={h.title}
                            onChange={(e) =>
                              updateItem<typeof h>("howToUse", i, { title: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Instructions">
                          <textarea
                            rows={2}
                            className={`${inputCls} resize-none`}
                            placeholder="Step instructions…"
                            value={h.text}
                            onChange={(e) =>
                              updateItem<typeof h>("howToUse", i, { text: e.target.value })
                            }
                          />
                        </Field>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem("howToUse", i)}
                        className={`${btnDangerCls} mt-6 self-start`}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItem("howToUse", { title: "", text: "" })}
                    className={btnSecondaryCls}
                  >
                    + Add Step
                  </button>
                </div>
              </div>

              {/* Reviews */}
              <div>
                <SectionTitle icon="⭐" title="Reviews" />
                <div className="space-y-3">
                  {form.reviews.map((r, i) => (
                    <div
                      key={i}
                      className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                        <Field label="Author">
                          <input
                            className={inputCls}
                            placeholder="John Doe"
                            value={r.author}
                            onChange={(e) =>
                              updateItem<Review>("reviews", i, { author: e.target.value })
                            }
                          />
                        </Field>
                        <Field label="Rating (0–5)">
                          <input
                            type="number"
                            className={inputCls}
                            min={0} max={5} step={0.5}
                            value={r.rating}
                            onChange={(e) =>
                              updateItem<Review>("reviews", i, {
                                rating: parseFloat(e.target.value) || 0,
                              })
                            }
                          />
                        </Field>
                        <Field label="Date">
                          <input
                            type="date"
                            className={inputCls}
                            value={r.date ?? ""}
                            onChange={(e) =>
                              updateItem<Review>("reviews", i, { date: e.target.value })
                            }
                          />
                        </Field>
                      </div>
                      <Field label="Comment">
                        <div className="flex gap-2">
                          <textarea
                            rows={2}
                            className={`${inputCls} resize-none flex-1`}
                            placeholder="Review comment…"
                            value={r.comment}
                            onChange={(e) =>
                              updateItem<Review>("reviews", i, { comment: e.target.value })
                            }
                          />
                          <button
                            type="button"
                            onClick={() => removeItem("reviews", i)}
                            className={btnDangerCls}
                          >
                            ✕
                          </button>
                        </div>
                      </Field>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      addItem<Review>("reviews", {
                        author: "",
                        rating: 5,
                        comment: "",
                        date: "",
                      })
                    }
                    className={btnSecondaryCls}
                  >
                    + Add Review
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ══ META ═══════════════════════════════════════════════════════════ */}
          {activeTab === "meta" && (
            <div className="space-y-10">

              {/* Nutritions */}
              <div>
                <SectionTitle icon="🥗" title="Nutrition Facts" />
                <div className="space-y-2">
                  {form.nutritions.map((n, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        className={`${inputCls} flex-1`}
                        placeholder="Key (e.g. Protein)"
                        value={n.key}
                        onChange={(e) =>
                          updateItem<typeof n>("nutritions", i, { key: e.target.value })
                        }
                      />
                      <span className="text-zinc-600 shrink-0">→</span>
                      <input
                        className={`${inputCls} flex-1`}
                        placeholder="Value (e.g. 25g)"
                        value={n.val}
                        onChange={(e) =>
                          updateItem<typeof n>("nutritions", i, { val: e.target.value })
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removeItem("nutritions", i)}
                        className={btnDangerCls}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItem("nutritions", { key: "", val: "" })}
                    className={btnSecondaryCls}
                  >
                    + Add Row
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div>
                <SectionTitle icon="📊" title="Product Details" />
                <div className="space-y-2">
                  {form.product_details.map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        className={`${inputCls} flex-1`}
                        placeholder="Key (e.g. Net Weight)"
                        value={d.key}
                        onChange={(e) =>
                          updateItem<typeof d>("product_details", i, { key: e.target.value })
                        }
                      />
                      <span className="text-zinc-600 shrink-0">→</span>
                      <input
                        className={`${inputCls} flex-1`}
                        placeholder="Value (e.g. 2 kg)"
                        value={d.val}
                        onChange={(e) =>
                          updateItem<typeof d>("product_details", i, { val: e.target.value })
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removeItem("product_details", i)}
                        className={btnDangerCls}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItem("product_details", { key: "", val: "" })}
                    className={btnSecondaryCls}
                  >
                    + Add Detail
                  </button>
                </div>
              </div>

              {/* JSON debug */}
              <div>
                <SectionTitle icon="🔍" title="Form State (Debug)" />
                <pre className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-500 overflow-auto max-h-72 leading-relaxed">
                  {JSON.stringify(form, null, 2)}
                </pre>
              </div>
            </div>
          )}

        </div>
      </form>
    </div>
  );
}
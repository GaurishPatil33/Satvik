"use client";

import { useEffect, useState } from "react";
import { Plus, Search, AlertTriangle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { SectionCard } from "../../components/Ui";


import {
  getCategories,
  deleteCategory,
} from "@/src/services/category.service";

import { ICategory } from "@/src/types/category-types";
import CategoriesTable from "../../components/category/Table";
import { CategoryForm } from "../../components/category/Form";

export default function CategoryPage() {
  const [search, setSearch] = useState("");
  const [allCategories, setCategories] = useState<ICategory[] | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState<ICategory | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | null>(null);

  const filtered = allCategories?.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );



  useEffect(() => {
    const fetch = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetch();
  }, []);

  const refreshCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleSuccess = async () => {
    await refreshCategories();
    setMode(null);
    setSelectedCategory(null);
  };

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    await refreshCategories();
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setMode("create");
  };

  const handleEdit = (category: ICategory) => {
    setSelectedCategory(category);
    setMode("edit");
  };

  const handleClose = () => {
    setSelectedCategory(null);
    setMode(null);
  };

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">
            Categories
          </h1>
          <p className="text-sm text-gray-500 font-body mt-0.5">
            {allCategories?.length} categories listed
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-[#2C4A2E] text-white px-4 py-2.5 rounded-xl text-sm font-body font-medium hover:bg-[#3D6B40] transition-colors"
        >
          <Plus size={14} /> Add Category
        </button>
      </div>

      {/* Low usage alert */}
      {/* {lowUsageCategory && (
        <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
          <AlertTriangle size={16} className="text-yellow-500 shrink-0" />
          <p className="text-sm text-yellow-700 font-body">
            <strong>Low usage:</strong> {lowUsageCategory.name} has only{" "}
            {lowUsageCategory.product_count} products.
          </p>
        </div>
      )} */}

      {/* Search */}
      <div className="flex gap-3 flex-wrap items-center pb-3 p-2">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search categories…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-white outline-none focus:border-gray-300 w-52 font-body"
          />
        </div>
      </div>

      {/* Table */}
      <SectionCard>
        <CategoriesTable
          categories={filtered}
          onEdit={(category) => handleEdit(category)}
          onDelete={(category) => handleDelete(category.id)}
        />
      </SectionCard>

      {/* Modal */}
      {mode && (
        <CategoryForm
          onClose={handleClose}
          onSuccess={handleSuccess}
          initialData={selectedCategory ?? undefined}
          id={mode === "edit" ? selectedCategory?.id : undefined}
        />
      )}
    </div>
  );
}
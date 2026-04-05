"use client";

import { IProduct } from "@/src/types/products-types";


export default function ProductTable({
  products,
  onDelete,
}: {
  products: IProduct[];
  onDelete: (id: string) => void;
}) {
  return (
    <table className="w-full bg-white shadow rounded-xl">
      <thead>
        <tr className="text-left border-b">
          <th className="p-4">Name</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="border-b">
            <td className="p-4">{p.title}</td>
            <td>₹{p.price}</td>
            <td className="space-x-2">
              <a href={`/admin/products/${p.id}`}>Edit</a>
              <button onClick={() => onDelete(p.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
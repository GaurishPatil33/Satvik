import type { Metadata } from "next";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTop";

export const metadata: Metadata = {
  title: "Satvik Admin",
  description: "Satvik e-commerce admin panel",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#F4F6F9]  font-body">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
import { Order } from "@/src/lib/adminData";
import { fmt } from "@/src/lib/utils";
import { getMyOrders } from "@/src/services/order.service";
import { IOrder } from "@/src/types/order-types";
import { CheckCircle2, ChevronRight, Clock, Copy, RotateCcw, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IOrderUI } from "@/src/types/extra";
import { getProductsByIds } from "@/src/services/product.service";
import { IProduct } from "@/src/types/products-types";
import Loading from "../Loading";

const statusConfig = {
  delivered: { label: "Delivered", color: "text-green-700 bg-green-50 border-green-100", icon: CheckCircle2 },
  shipped: { label: "On the way", color: "text-blue-700 bg-blue-50 border-blue-100", icon: Truck },
  processing: { label: "Processing", color: "text-amber-700 bg-amber-50 border-amber-100", icon: Clock },
  cancelled: { label: "Cancelled", color: "text-red-600 bg-red-50 border-red-100", icon: X },
  // returned: { label: "Returned", color: "text-purple-700 bg-purple-50 border-purple-100", icon: RotateCcw },
};

export function OrdersSection() {
  const [filter, setFilter] = useState<"all" | IOrder["order_status"]>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [orders, setOrders] = useState<IOrderUI[]>()
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetch = async () => {
      try {
        //  Fetch raw orders
        const rawOrders = await getMyOrders();

        if (!rawOrders?.length) {
          setOrders([]);
          return;
        }

        //  Collect ALL product ids from all orders
        const productIds = rawOrders.flatMap(order =>
          order.items.map(item => item.product_id)
        );

        //  Fetch products in ONE request
        const products = await getProductsByIds(productIds);

        //  Create lookup map for O(1) access
        const productMap: Map<string, IProduct> = new Map(
          products.map(p => [p.id, p])
        );

        //  Hydrate orders with images
        const hydrated: IOrderUI[] = rawOrders.map(order => ({
          ...order,
          items: order.items.map(item => ({
            ...item,
            image:
              productMap.get(item.product_id)?.images?.[0] ||
              "/placeholder.png",
          })),
        }));

        setOrders(hydrated);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const filtered = filter === "all" ? orders : orders?.filter((o) => o.order_status === filter);



  return (
    <div className="space-y-4">
      {loading && (
        <Loading />
      )}
      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(["all", "delivered", "shipped", "processing", "cancelled"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`shrink-0 text-xs px-4 py-2 rounded-full font-body font-medium transition-all capitalize
              ${filter === f ? "bg-brand-forest text-brand-cream shadow-sm" : "bg-brand-ivory text-brand-earth hover:text-brand-forest"}`}>
            {f === "all" ? "All Orders" : statusConfig[f].label}
          </button>
        ))}
      </div>

      {filtered?.length === 0 && (
        <div className="text-center py-16 text-brand-earth/50 font-body">No orders found.</div>
      )}



      {filtered?.map((order) => {
        const cfg = statusConfig[order.order_status];
        const isExpanded = expanded === order.id;
        return (
          <div key={order.id} className="bg-brand-off-white rounded-2xl border border-brand-ivory overflow-hidden animate-fade-up">
            {/* Order header */}
            <div className="flex items-start gap-3 p-4">
              {/* First item image */}
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-brand-ivory shrink-0">
                <Image src={order.items[0].image} alt={order.items[0].title} fill className="object-cover" sizes="64px" />
                {order.items.length > 1 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold">
                    +{order.items.length - 1}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 ">
                  <div>
                    <p className="font-body text-xs text-brand-earth/60">{order.created_at} · {order.payment_status}</p>
                    <p className="font-display text-sm font-semibold text-brand-forest mt-0.5">#{order.id}</p>
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border font-body ${cfg.color}`}>
                    {cfg.label}
                  </span>
                </div>
                <p className="font-body text-xs text-brand-earth mt-1 line-clamp-1">
                  {order.items.map((i) => i.title).join(", ")}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-display text-base font-bold text-brand-forest">{fmt(order.total_amount)}</span>
                  <button onClick={() => setExpanded(isExpanded ? null : order.id)}
                    className="text-xs text-brand-earth/60 hover:text-brand-forest font-body transition-colors flex items-center gap-1">
                    {isExpanded ? "Less" : "Details"}
                    <ChevronRight size={12} className={`transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded details */}
            {isExpanded && (
              <div className="border-t border-brand-ivory px-4 pb-4 pt-3 space-y-3 animate-fade-up">
                {/* All items */}
                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-brand-ivory shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" sizes="40px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-brand-forest font-body truncate">{item.title}</p>
                        <p className="text-[11px] text-brand-earth font-body">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-bold text-brand-forest font-display shrink-0">{fmt(item.price_at_purchase)}</span>
                    </div>
                  ))}
                </div>

                {/* Tracking */}
                {order.id && (
                  <div className="flex items-center justify-between bg-brand-ivory/60 rounded-xl px-3 py-2.5">
                    <div>
                      <p className="text-[11px] text-brand-earth/60 font-body">Tracking ID</p>
                      <p className="text-xs font-semibold text-brand-forest font-body">{order.id}</p>
                    </div>
                    <button className="text-brand-gold hover:text-brand-gold-light transition-colors">
                      <Copy size={14} />
                    </button>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  {order.order_status === "delivered" && (
                    <>
                      <button className="flex-1 py-2 rounded-xl border-2 border-brand-forest text-brand-forest text-xs font-semibold font-body hover:bg-brand-forest hover:text-brand-cream transition-all">
                        Rate & Review
                      </button>
                      <button className="flex-1 py-2 rounded-xl bg-brand-forest text-brand-cream text-xs font-semibold font-body hover:bg-brand-forest-light transition-colors">
                        Reorder
                      </button>
                    </>
                  )}
                  {order.order_status === "shipped" && (
                    <button className="flex-1 py-2 rounded-xl bg-brand-forest text-brand-cream text-xs font-semibold font-body hover:bg-brand-forest-light transition-colors">
                      Track Order
                    </button>
                  )}
                  {order.order_status === "cancelled" && (
                    <button className="flex-1 py-2 rounded-xl bg-brand-forest text-brand-cream text-xs font-semibold font-body hover:bg-brand-forest-light transition-colors">
                      Reorder
                    </button>
                  )}
                  <button className="flex-1 py-2 rounded-xl border border-brand-earth/20 text-brand-earth text-xs font-body hover:bg-brand-ivory transition-colors">
                    Need Help?
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
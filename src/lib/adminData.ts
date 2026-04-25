
// ─── Orders ───────────────────────────────────────────────────────────────────
export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" | "refunded";

export interface OrderItem {
  productId: string;
  name: string;
  size: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: { name: string; email: string; phone: string; avatar: string };
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: "UPI" | "Card" | "COD" | "Netbanking";
  address: string;
  city: string;
  state: string;
  createdAt: string;
  updatedAt: string;
}

export const orders1: Order[] = [
  {
    id: "o1", orderNumber: "SAT-2024-1001",
    customer: { name: "Priya Sharma", email: "priya@gmail.com", phone: "+91 98765 43210", avatar: "PS" },
    items: [{ productId: "groundnut-oil-1l", name: "Wood Pressed Groundnut Oil", size: "1000ml", qty: 2, price: 350 }],
    total: 700, status: "delivered", paymentMethod: "UPI",
    address: "42, Bandra West", city: "Mumbai", state: "Maharashtra",
    createdAt: "2024-11-28T10:23:00Z", updatedAt: "2024-11-30T14:00:00Z",
  },
  {
    id: "o2", orderNumber: "SAT-2024-1002",
    customer: { name: "Rajesh Kumar", email: "rajesh@outlook.com", phone: "+91 87654 32109", avatar: "RK" },
    items: [
      { productId: "mustard-oil-1l", name: "Cold Pressed Mustard Oil", size: "1000ml", qty: 1, price: 280 },
      { productId: "jaggery-powder-500g", name: "Pure Cane Jaggery Powder", size: "500g", qty: 2, price: 180 },
    ],
    total: 640, status: "shipped", paymentMethod: "Card",
    address: "15, Indiranagar", city: "Bengaluru", state: "Karnataka",
    createdAt: "2024-11-29T08:15:00Z", updatedAt: "2024-11-30T09:00:00Z",
  },
  {
    id: "o3", orderNumber: "SAT-2024-1003",
    customer: { name: "Meena Reddy", email: "meena.r@yahoo.com", phone: "+91 76543 21098", avatar: "MR" },
    items: [{ productId: "coconut-oil-500ml", name: "Virgin Coconut Oil", size: "500ml", qty: 3, price: 420 }],
    total: 1260, status: "confirmed", paymentMethod: "UPI",
    address: "8, Banjara Hills", city: "Hyderabad", state: "Telangana",
    createdAt: "2024-11-30T12:45:00Z", updatedAt: "2024-11-30T13:10:00Z",
  },
  {
    id: "o4", orderNumber: "SAT-2024-1004",
    customer: { name: "Amit Patel", email: "amit.p@gmail.com", phone: "+91 65432 10987", avatar: "AP" },
    items: [
      { productId: "olive-oil-250ml", name: "Extra Virgin Olive Oil", size: "500ml", qty: 1, price: 680 },
      { productId: "sendha-namak-500g", name: "Himalayan Pink Rock Salt", size: "500g", qty: 2, price: 120 },
    ],
    total: 920, status: "pending", paymentMethod: "COD",
    address: "22, Satellite Road", city: "Ahmedabad", state: "Gujarat",
    createdAt: "2024-11-30T15:30:00Z", updatedAt: "2024-11-30T15:30:00Z",
  },
  {
    id: "o5", orderNumber: "SAT-2024-1005",
    customer: { name: "Sunita Menon", email: "sunita.m@gmail.com", phone: "+91 54321 09876", avatar: "SM" },
    items: [{ productId: "sunflower-oil-1l", name: "Cold Pressed Sunflower Oil", size: "1000ml", qty: 2, price: 310 }],
    total: 620, status: "cancelled", paymentMethod: "Netbanking",
    address: "5, T Nagar", city: "Chennai", state: "Tamil Nadu",
    createdAt: "2024-11-27T09:00:00Z", updatedAt: "2024-11-27T11:00:00Z",
  },
  {
    id: "o6", orderNumber: "SAT-2024-1006",
    customer: { name: "Vikram Singh", email: "vikram.s@gmail.com", phone: "+91 93827 46510", avatar: "VS" },
    items: [
      { productId: "groundnut-oil-1l", name: "Wood Pressed Groundnut Oil", size: "2L", qty: 1, price: 650 },
      { productId: "natural-sugar-500g", name: "Raw Cane Sugar", size: "1kg", qty: 1, price: 150 },
    ],
    total: 800, status: "delivered", paymentMethod: "UPI",
    address: "30, Lajpat Nagar", city: "Delhi", state: "Delhi",
    createdAt: "2024-11-26T14:00:00Z", updatedAt: "2024-11-29T16:00:00Z",
  },
  {
    id: "o7", orderNumber: "SAT-2024-1007",
    customer: { name: "Kavitha Nair", email: "kavitha.n@gmail.com", phone: "+91 82736 45190", avatar: "KN" },
    items: [{ productId: "coconut-oil-500ml", name: "Virgin Coconut Oil", size: "250ml", qty: 4, price: 240 }],
    total: 960, status: "shipped", paymentMethod: "Card",
    address: "12, Kakkanad", city: "Kochi", state: "Kerala",
    createdAt: "2024-11-29T16:20:00Z", updatedAt: "2024-11-30T08:00:00Z",
  },
  {
    id: "o8", orderNumber: "SAT-2024-1008",
    customer: { name: "Arjun Desai", email: "arjun.d@gmail.com", phone: "+91 71625 34089", avatar: "AD" },
    items: [
      { productId: "mustard-oil-1l", name: "Cold Pressed Mustard Oil", size: "500ml", qty: 2, price: 160 },
      { productId: "jaggery-powder-500g", name: "Pure Cane Jaggery Powder", size: "1kg", qty: 1, price: 340 },
    ],
    total: 660, status: "confirmed", paymentMethod: "UPI",
    address: "7, Koregaon Park", city: "Pune", state: "Maharashtra",
    createdAt: "2024-11-30T11:00:00Z", updatedAt: "2024-11-30T11:45:00Z",
  },
];

// ─── Customers ────────────────────────────────────────────────────────────────
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  city: string;
  state: string;
  totalOrders: number;
  totalSpent: number;
  joinedAt: string;
  lastOrderAt: string;
  status: "active" | "inactive";
  tags: string[];
}

export const customers: Customer[] = [
  { id: "c1", name: "Priya Sharma", email: "priya@gmail.com", phone: "+91 98765 43210", avatar: "PS", city: "Mumbai", state: "Maharashtra", totalOrders: 8, totalSpent: 5600, joinedAt: "2024-03-15", lastOrderAt: "2024-11-28", status: "active", tags: ["loyal", "oils"] },
  { id: "c2", name: "Rajesh Kumar", email: "rajesh@outlook.com", phone: "+91 87654 32109", avatar: "RK", city: "Bengaluru", state: "Karnataka", totalOrders: 5, totalSpent: 3200, joinedAt: "2024-05-22", lastOrderAt: "2024-11-29", status: "active", tags: ["bulk-buyer"] },
  { id: "c3", name: "Meena Reddy", email: "meena.r@yahoo.com", phone: "+91 76543 21098", avatar: "MR", city: "Hyderabad", state: "Telangana", totalOrders: 12, totalSpent: 8900, joinedAt: "2024-01-10", lastOrderAt: "2024-11-30", status: "active", tags: ["vip", "coconut-oil"] },
  { id: "c4", name: "Amit Patel", email: "amit.p@gmail.com", phone: "+91 65432 10987", avatar: "AP", city: "Ahmedabad", state: "Gujarat", totalOrders: 3, totalSpent: 2100, joinedAt: "2024-08-18", lastOrderAt: "2024-11-30", status: "active", tags: ["new"] },
  { id: "c5", name: "Sunita Menon", email: "sunita.m@gmail.com", phone: "+91 54321 09876", avatar: "SM", city: "Chennai", state: "Tamil Nadu", totalOrders: 2, totalSpent: 1240, joinedAt: "2024-09-05", lastOrderAt: "2024-11-27", status: "inactive", tags: [] },
  { id: "c6", name: "Vikram Singh", email: "vikram.s@gmail.com", phone: "+91 93827 46510", avatar: "VS", city: "Delhi", state: "Delhi", totalOrders: 15, totalSpent: 12400, joinedAt: "2023-11-20", lastOrderAt: "2024-11-26", status: "active", tags: ["vip", "loyal"] },
  { id: "c7", name: "Kavitha Nair", email: "kavitha.n@gmail.com", phone: "+91 82736 45190", avatar: "KN", city: "Kochi", state: "Kerala", totalOrders: 7, totalSpent: 6720, joinedAt: "2024-02-28", lastOrderAt: "2024-11-29", status: "active", tags: ["coconut-oil", "loyal"] },
  { id: "c8", name: "Arjun Desai", email: "arjun.d@gmail.com", phone: "+91 71625 34089", avatar: "AD", city: "Pune", state: "Maharashtra", totalOrders: 4, totalSpent: 2640, joinedAt: "2024-06-12", lastOrderAt: "2024-11-30", status: "active", tags: ["jaggery"] },
];

// ─── Analytics / Chart Data ───────────────────────────────────────────────────
export const revenueData = [
  { month: "Jun", revenue: 48000, orders: 62 },
  { month: "Jul", revenue: 52000, orders: 71 },
  { month: "Aug", revenue: 61000, orders: 85 },
  { month: "Sep", revenue: 58000, orders: 79 },
  { month: "Oct", revenue: 74000, orders: 103 },
  { month: "Nov", revenue: 89000, orders: 124 },
];

export const categoryRevenue = [
  { category: "Cold-Pressed Oils", value: 58, color: "#C8961C" },
  { category: "Jaggery", value: 18, color: "#2C4A2E" },
  { category: "Rock Salt", value: 12, color: "#8B5E3C" },
  { category: "Sugar", value: 8, color: "#7A9E7E" },
  { category: "Combos", value: 4, color: "#C4622D" },
];

export const topProducts = [
  { name: "Groundnut Oil 1L", sales: 234, revenue: 81900, change: 12 },
  { name: "Mustard Oil 1L", sales: 189, revenue: 52920, change: 8 },
  { name: "Virgin Coconut Oil", sales: 156, revenue: 65520, change: 22 },
  { name: "Jaggery Powder 500g", sales: 143, revenue: 25740, change: -3 },
  { name: "Himalayan Pink Salt", sales: 128, revenue: 15360, change: 15 },
];

export const dashboardStats = {
  totalRevenue: { value: 382000, change: 18.4, label: "Total Revenue" },
  totalOrders: { value: 524, change: 12.1, label: "Total Orders" },
  totalCustomers: { value: 312, change: 8.7, label: "Total Customers" },
  avgOrderValue: { value: 729, change: 5.6, label: "Avg Order Value" },
};

export const recentActivity = [
  { type: "order", message: "New order #SAT-2024-1008 from Arjun Desai", time: "2 min ago", icon: "🛒" },
  { type: "payment", message: "Payment received ₹920 for #SAT-2024-1004", time: "15 min ago", icon: "💰" },
  { type: "review", message: "New 5★ review on Groundnut Oil by Priya S.", time: "1 hr ago", icon: "⭐" },
  { type: "order", message: "Order #SAT-2024-1007 shipped via BlueDart", time: "2 hr ago", icon: "🚚" },
  { type: "stock", message: "Low stock alert: Mustard Oil 500ml (12 left)", time: "3 hr ago", icon: "⚠️" },
  { type: "customer", message: "New customer registration: Deepak Joshi", time: "5 hr ago", icon: "👤" },
];
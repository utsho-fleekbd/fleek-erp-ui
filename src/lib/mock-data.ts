// Mock data for Fleek ERP dashboard and modules

export const kpiData = {
  totalOrders: { value: 12847, change: 12.5, period: "vs last month" },
  revenue: { value: 284930, change: 8.2, period: "vs last month" },
  expenses: { value: 98420, change: -3.1, period: "vs last month" },
  customers: { value: 3429, change: 15.7, period: "vs last month" },
  profit: { value: 186510, change: 14.3, period: "vs last month" },
  pendingOrders: { value: 234, change: -5.2, period: "vs last month" },
};

export const revenueChartData = [
  { month: "Jan", income: 18500, expenses: 8200, profit: 10300 },
  { month: "Feb", income: 22300, expenses: 9100, profit: 13200 },
  { month: "Mar", income: 19800, expenses: 7800, profit: 12000 },
  { month: "Apr", income: 27400, expenses: 10200, profit: 17200 },
  { month: "May", income: 31200, expenses: 11500, profit: 19700 },
  { month: "Jun", income: 28900, expenses: 9800, profit: 19100 },
  { month: "Jul", income: 34100, expenses: 12300, profit: 21800 },
  { month: "Aug", income: 29700, expenses: 10900, profit: 18800 },
  { month: "Sep", income: 36500, expenses: 13100, profit: 23400 },
  { month: "Oct", income: 33200, expenses: 11800, profit: 21400 },
  { month: "Nov", income: 38900, expenses: 14200, profit: 24700 },
  { month: "Dec", income: 42100, expenses: 15600, profit: 26500 },
];

export const orderStatusData = [
  { month: "Jan", ordered: 320, pending: 45, delivered: 260, returned: 15 },
  { month: "Feb", ordered: 380, pending: 52, delivered: 310, returned: 18 },
  { month: "Mar", ordered: 350, pending: 38, delivered: 295, returned: 17 },
  { month: "Apr", ordered: 420, pending: 60, delivered: 340, returned: 20 },
  { month: "May", ordered: 480, pending: 65, delivered: 390, returned: 25 },
  { month: "Jun", ordered: 450, pending: 55, delivered: 375, returned: 20 },
  { month: "Jul", ordered: 520, pending: 70, delivered: 425, returned: 25 },
  { month: "Aug", ordered: 490, pending: 58, delivered: 410, returned: 22 },
  { month: "Sep", ordered: 560, pending: 72, delivered: 465, returned: 23 },
  { month: "Oct", ordered: 530, pending: 64, delivered: 440, returned: 26 },
  { month: "Nov", ordered: 610, pending: 78, delivered: 505, returned: 27 },
  { month: "Dec", ordered: 680, pending: 85, delivered: 565, returned: 30 },
];

export const ordersByChannel = [
  { name: "Website", value: 45, fill: "hsl(var(--chart-1))" },
  { name: "Mobile App", value: 28, fill: "hsl(var(--chart-2))" },
  { name: "Marketplace", value: 18, fill: "hsl(var(--chart-3))" },
  { name: "Social", value: 9, fill: "hsl(var(--chart-5))" },
];

export const ordersByRegion = [
  { name: "North", value: 35, fill: "hsl(var(--chart-1))" },
  { name: "South", value: 25, fill: "hsl(var(--chart-2))" },
  { name: "East", value: 22, fill: "hsl(var(--chart-3))" },
  { name: "West", value: 18, fill: "hsl(var(--chart-5))" },
];

export const topProducts = [
  { id: 1, name: "Premium Wireless Headphones", sku: "WH-PRO-001", sold: 1245, revenue: 62250, stock: 89 },
  { id: 2, name: "Smart Watch Pro", sku: "SW-PRO-002", sold: 987, revenue: 98700, stock: 45 },
  { id: 3, name: "Organic Cotton T-Shirt", sku: "CT-ORG-003", sold: 2340, revenue: 46800, stock: 234 },
  { id: 4, name: "Bluetooth Speaker Mini", sku: "BS-MIN-004", sold: 876, revenue: 30660, stock: 156 },
  { id: 5, name: "Running Shoes Elite", sku: "RS-ELT-005", sold: 654, revenue: 52320, stock: 67 },
];

export const topCustomers = [
  { id: 1, name: "Sarah Chen", email: "sarah@example.com", orders: 47, spent: 12480 },
  { id: 2, name: "Marcus Johnson", email: "marcus@example.com", orders: 38, spent: 9870 },
  { id: 3, name: "Elena Rodriguez", email: "elena@example.com", orders: 35, spent: 8920 },
  { id: 4, name: "David Kim", email: "david@example.com", orders: 31, spent: 7650 },
  { id: 5, name: "Aisha Patel", email: "aisha@example.com", orders: 28, spent: 6840 },
];

export const recentOrders = [
  { id: "ORD-7291", customer: "Sarah Chen", date: "2026-03-10", total: 234.50, status: "delivered", items: 3 },
  { id: "ORD-7290", customer: "James Wilson", date: "2026-03-10", total: 189.00, status: "dispatched", items: 2 },
  { id: "ORD-7289", customer: "Maria Garcia", date: "2026-03-09", total: 567.80, status: "confirmed", items: 5 },
  { id: "ORD-7288", customer: "Alex Turner", date: "2026-03-09", total: 92.30, status: "pending", items: 1 },
  { id: "ORD-7287", customer: "Lisa Park", date: "2026-03-09", total: 345.20, status: "packed", items: 4 },
  { id: "ORD-7286", customer: "Omar Hassan", date: "2026-03-08", total: 128.90, status: "delivered", items: 2 },
  { id: "ORD-7285", customer: "Emma Brown", date: "2026-03-08", total: 456.00, status: "returned", items: 3 },
  { id: "ORD-7284", customer: "Chen Wei", date: "2026-03-08", total: 78.50, status: "cancelled", items: 1 },
];

export const recentTransactions = [
  { id: "TXN-4521", type: "Payment", amount: 234.50, method: "Stripe", date: "2026-03-10", status: "completed" },
  { id: "TXN-4520", type: "Refund", amount: -89.00, method: "PayPal", date: "2026-03-10", status: "completed" },
  { id: "TXN-4519", type: "Payment", amount: 567.80, method: "bKash", date: "2026-03-09", status: "pending" },
  { id: "TXN-4518", type: "Payment", amount: 345.20, method: "Stripe", date: "2026-03-09", status: "completed" },
  { id: "TXN-4517", type: "Payout", amount: -2500.00, method: "Bank", date: "2026-03-08", status: "completed" },
];

export const lowStockItems = [
  { id: 1, name: "Smart Watch Pro", sku: "SW-PRO-002", stock: 5, reorderLevel: 20 },
  { id: 2, name: "USB-C Hub 7-in-1", sku: "UC-HUB-012", stock: 3, reorderLevel: 15 },
  { id: 3, name: "Mechanical Keyboard", sku: "MK-PRO-008", stock: 8, reorderLevel: 25 },
  { id: 4, name: "Laptop Stand Aluminum", sku: "LS-ALM-015", stock: 2, reorderLevel: 10 },
];

export const customerAcquisition = [
  { source: "Organic Search", value: 38 },
  { source: "Social Media", value: 24 },
  { source: "Referral", value: 18 },
  { source: "Direct", value: 12 },
  { source: "Email", value: 8 },
];

export const courierPerformance = [
  { courier: "FedEx", delivered: 1240, onTime: 95, avgDays: 2.1 },
  { courier: "DHL", delivered: 980, onTime: 92, avgDays: 2.4 },
  { courier: "UPS", delivered: 870, onTime: 89, avgDays: 2.8 },
  { courier: "Local Express", delivered: 650, onTime: 97, avgDays: 1.2 },
];

export const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Home & Garden", value: 18 },
  { name: "Sports", value: 12 },
  { name: "Beauty", value: 10 },
];

// Orders page data
export const allOrders = Array.from({ length: 50 }, (_, i) => {
  const statuses = ["pending", "confirmed", "packed", "dispatched", "delivered", "returned", "cancelled"] as const;
  const customers = ["Sarah Chen", "James Wilson", "Maria Garcia", "Alex Turner", "Lisa Park", "Omar Hassan", "Emma Brown", "Chen Wei", "Aisha Patel", "David Kim"];
  const channels = ["Website", "Mobile App", "Marketplace", "Social"];
  return {
    id: `ORD-${7291 - i}`,
    customer: customers[i % customers.length],
    email: `${customers[i % customers.length].toLowerCase().replace(" ", ".")}@example.com`,
    date: `2026-03-${String(10 - Math.floor(i / 5)).padStart(2, "0")}`,
    total: Math.round((Math.random() * 500 + 50) * 100) / 100,
    status: statuses[i % statuses.length],
    items: Math.floor(Math.random() * 5) + 1,
    channel: channels[i % channels.length],
    paymentMethod: ["Stripe", "PayPal", "bKash", "COD"][i % 4],
  };
});

// Products page data
export const allProducts = Array.from({ length: 30 }, (_, i) => {
  const names = ["Wireless Headphones", "Smart Watch", "Cotton T-Shirt", "Bluetooth Speaker", "Running Shoes", "Laptop Stand", "USB-C Hub", "Mechanical Keyboard", "Yoga Mat", "Water Bottle"];
  const categories = ["Electronics", "Clothing", "Sports", "Home & Garden", "Beauty"];
  const statuses = ["active", "draft", "archived"] as const;
  return {
    id: i + 1,
    name: `${["Premium", "Pro", "Elite", "Ultra", "Classic"][i % 5]} ${names[i % names.length]}`,
    sku: `SKU-${String(i + 1).padStart(4, "0")}`,
    category: categories[i % categories.length],
    price: Math.round((Math.random() * 200 + 20) * 100) / 100,
    stock: Math.floor(Math.random() * 300),
    sold: Math.floor(Math.random() * 2000),
    status: statuses[i % statuses.length],
    image: `/placeholder.svg`,
  };
});

export type OrderStatus = "pending" | "confirmed" | "packed" | "dispatched" | "delivered" | "returned" | "cancelled";

export const statusColors: Record<OrderStatus, string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  confirmed: "bg-primary/10 text-primary border-primary/20",
  packed: "bg-info/10 text-info border-info/20",
  dispatched: "bg-muted text-muted-foreground border-border",
  delivered: "bg-success/10 text-success border-success/20",
  returned: "bg-destructive/10 text-destructive border-destructive/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

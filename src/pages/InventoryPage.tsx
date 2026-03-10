import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { lowStockItems } from "@/lib/mock-data";
import { Warehouse, AlertTriangle, Package, ArrowUpDown } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const warehouseData = [
  { name: "Main Warehouse", location: "New York", items: 4521, capacity: 85, value: 89400 },
  { name: "West Hub", location: "Los Angeles", items: 2340, capacity: 62, value: 45200 },
  { name: "South Depot", location: "Dallas", items: 1890, capacity: 44, value: 32100 },
];

const stockMovements = [
  { id: "MOV-301", type: "IN", product: "Wireless Headphones", qty: 200, warehouse: "Main Warehouse", date: "2026-03-10" },
  { id: "MOV-300", type: "OUT", product: "Smart Watch Pro", qty: 15, warehouse: "West Hub", date: "2026-03-09" },
  { id: "MOV-299", type: "TRANSFER", product: "Cotton T-Shirt", qty: 100, warehouse: "Main → South", date: "2026-03-09" },
  { id: "MOV-298", type: "DAMAGE", product: "Bluetooth Speaker", qty: 3, warehouse: "Main Warehouse", date: "2026-03-08" },
  { id: "MOV-297", type: "IN", product: "Running Shoes", qty: 50, warehouse: "West Hub", date: "2026-03-08" },
];

const stockByCategory = [
  { category: "Electronics", value: 52400 },
  { category: "Clothing", value: 28300 },
  { category: "Sports", value: 19800 },
  { category: "Home", value: 15200 },
  { category: "Beauty", value: 8700 },
];

const chartTooltipStyle = {
  contentStyle: { background: "hsl(240 6% 10%)", border: "1px solid hsl(240 4% 20%)", borderRadius: "6px", fontSize: "12px" },
  labelStyle: { color: "hsl(240 5% 96%)" },
};

const movementTypeStyles: Record<string, string> = {
  IN: "bg-success/10 text-success border-success/20",
  OUT: "bg-warning/10 text-warning border-warning/20",
  TRANSFER: "bg-primary/10 text-primary border-primary/20",
  DAMAGE: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function InventoryPage() {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Inventory</h1>
        <p className="text-sm text-muted-foreground">Manage stock across warehouses</p>
      </div>

      {/* Warehouse cards */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {warehouseData.map((w) => (
          <Card key={w.name} className="border-border bg-card">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">{w.name}</p>
                  <p className="text-xs text-muted-foreground">{w.location}</p>
                </div>
                <Warehouse className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Capacity</span>
                  <span className="font-mono">{w.capacity}%</span>
                </div>
                <Progress value={w.capacity} className="h-1.5 [&>div]:rounded-none" />
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{w.items.toLocaleString()} items</span>
                  <span className="font-mono font-medium">${(w.value / 1000).toFixed(1)}K</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        {/* Stock Value by Category */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Stock Value by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={stockByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 20%)" />
                <XAxis dataKey="category" tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
                <Tooltip {...chartTooltipStyle} formatter={(v: number) => [`$${v.toLocaleString()}`, "Value"]} />
                <Bar dataKey="value" fill="hsl(239,84%,67%)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Alerts</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-[11px] text-muted-foreground">
                  <th className="px-5 py-2 text-left font-medium">Product</th>
                  <th className="px-3 py-2 text-right font-medium">Current</th>
                  <th className="px-3 py-2 text-right font-medium">Reorder Level</th>
                  <th className="px-5 py-2 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-3">
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{item.sku}</div>
                    </td>
                    <td className="px-3 py-3 text-right font-mono text-sm text-destructive">{item.stock}</td>
                    <td className="px-3 py-3 text-right font-mono text-sm text-muted-foreground">{item.reorderLevel}</td>
                    <td className="px-5 py-3 text-right">
                      <Button variant="outline" size="sm" className="h-7 text-xs">Reorder</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Stock Movements */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recent Stock Movements</CardTitle>
            <Button variant="outline" size="sm" className="gap-2 text-xs"><ArrowUpDown className="h-3 w-3" /> New Entry</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-[11px] text-muted-foreground">
                <th className="px-5 py-2 text-left font-medium">ID</th>
                <th className="px-3 py-2 text-center font-medium">Type</th>
                <th className="px-3 py-2 text-left font-medium">Product</th>
                <th className="px-3 py-2 text-right font-medium">Qty</th>
                <th className="px-3 py-2 text-left font-medium">Warehouse</th>
                <th className="px-5 py-2 text-left font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {stockMovements.map((m) => (
                <tr key={m.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                  <td className="px-5 py-3 font-mono text-sm">{m.id}</td>
                  <td className="px-3 py-3 text-center">
                    <span className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-medium ${movementTypeStyles[m.type]}`}>
                      {m.type}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-sm">{m.product}</td>
                  <td className="px-3 py-3 text-right font-mono text-sm">{m.qty}</td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">{m.warehouse}</td>
                  <td className="px-5 py-3 font-mono text-sm text-muted-foreground">{m.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </AppLayout>
  );
}

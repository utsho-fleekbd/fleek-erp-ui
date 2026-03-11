import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Warehouse, Eye, Printer } from "lucide-react";
import { useTheme } from "next-themes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const warehouseData = [
  {
    name: "Main Warehouse",
    location: "New York",
    items: 4521,
    capacity: 85,
    value: 89400,
  },
  {
    name: "West Hub",
    location: "Los Angeles",
    items: 2340,
    capacity: 62,
    value: 45200,
  },
  {
    name: "South Depot",
    location: "Dallas",
    items: 1890,
    capacity: 44,
    value: 32100,
  },
];

const stockMovements = [
  {
    id: "MOV-301",
    type: "IN",
    product: "Wireless Headphones",
    qty: 200,
    warehouse: "Main Warehouse",
    date: "2026-03-10",
  },
  {
    id: "MOV-300",
    type: "OUT",
    product: "Smart Watch Pro",
    qty: 15,
    warehouse: "West Hub",
    date: "2026-03-09",
  },
  {
    id: "MOV-299",
    type: "TRANSFER",
    product: "Cotton T-Shirt",
    qty: 100,
    warehouse: "Main → South",
    date: "2026-03-09",
  },
  {
    id: "MOV-298",
    type: "DAMAGE",
    product: "Bluetooth Speaker",
    qty: 3,
    warehouse: "Main Warehouse",
    date: "2026-03-08",
  },
  {
    id: "MOV-297",
    type: "IN",
    product: "Running Shoes",
    qty: 50,
    warehouse: "West Hub",
    date: "2026-03-08",
  },
];

const stockByCategory = [
  { category: "Electronics", value: 52400 },
  { category: "Clothing", value: 28300 },
  { category: "Sports", value: 19800 },
  { category: "Home", value: 15200 },
  { category: "Beauty", value: 8700 },
];

const movementTypeStyles: Record<string, string> = {
  IN: "bg-success/10 text-success border-success/20",
  OUT: "bg-warning/10 text-warning border-warning/20",
  TRANSFER: "bg-primary/10 text-primary border-primary/20",
  DAMAGE: "bg-destructive/10 text-destructive border-destructive/20",
};

const stockProducts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: [
    "Wireless Headphones",
    "Smart Watch",
    "Cotton T-Shirt",
    "Bluetooth Speaker",
    "Running Shoes",
  ][i % 5],
  business: i % 3 === 0 ? ["Acme Store", "Global Mart"] : ["Acme Store"],
  image: `https://picsum.photos/seed/product-${Math.random()}/300`,
  price: Math.round(Math.random() * 200 + 20),
  stock: Math.floor(Math.random() * 300),
}));

const barcodes = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  productName: [
    "Wireless Headphones",
    "Smart Watch",
    "Cotton T-Shirt",
    "Bluetooth Speaker",
    "Running Shoes",
  ][i % 5],
  barcode: `${8900000000 + i * 13}`,
  image: `https://picsum.photos/seed/product-${Math.random()}/300`,
}));

export default function InventoryPage() {
  const location = useLocation();
  const isBarcode = location.pathname === "/inventory/barcodes";
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const gridColor = isDark ? "hsl(240 4% 20%)" : "hsl(240 6% 90%)";
  const tickColor = isDark ? "hsl(240 5% 65%)" : "hsl(240 4% 46%)";
  const [addStockOpen, setAddStockOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState<
    (typeof stockProducts)[0] | null
  >(null);

  const chartTooltipStyle = {
    contentStyle: {
      background: isDark ? "hsl(240 6% 10%)" : "hsl(0 0% 100%)",
      border: `1px solid ${gridColor}`,
      borderRadius: "6px",
      fontSize: "12px",
    },
    labelStyle: { color: isDark ? "hsl(240 5% 96%)" : "hsl(240 10% 10%)" },
  };

  if (isBarcode) {
    return (
      <AppLayout>
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl font-semibold">Barcodes</h1>
          <p className="text-sm text-muted-foreground">
            {barcodes.length} barcodes
          </p>
        </div>
        <Card className="border-border bg-card animate-fade-in stagger-1">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-border text-[11px] text-muted-foreground">
                  <th className="px-4 py-3 text-left font-medium">Product</th>
                  <th className="px-3 py-3 text-left font-medium">Barcode</th>
                  <th className="px-4 py-3 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {barcodes.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                  >
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={b.image}
                        className="h-8 w-8 rounded bg-secondary"
                      />
                      <span className="text-sm font-medium">
                        {b.productName}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-mono text-sm text-muted-foreground">
                      {b.barcode}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Printer className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-semibold">Inventory</h1>
        <p className="text-sm text-muted-foreground">
          Manage stock across warehouses
        </p>
      </div>

      <Tabs
        defaultValue="stock"
        className="space-y-4 animate-fade-in stagger-1"
      >
        <TabsList className="bg-secondary">
          <TabsTrigger value="stock">Stock</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="stock">
          <Card className="border-border bg-card">
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-border text-[11px] text-muted-foreground">
                    <th className="px-4 py-3 text-left font-medium">Product</th>
                    <th className="px-3 py-3 text-left font-medium">
                      Business
                    </th>
                    <th className="px-3 py-3 text-right font-medium">Price</th>
                    <th className="px-3 py-3 text-right font-medium">Stock</th>
                    <th className="px-4 py-3 text-center font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stockProducts.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                    >
                      <td className="px-4 py-3 flex items-center gap-3">
                        <img
                          src={p.image}
                          className="h-8 w-8 rounded bg-secondary"
                        />
                        <span className="text-sm font-medium">{p.name}</span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-1">
                          {p.business.map((b) => (
                            <Badge
                              key={b}
                              variant="outline"
                              className="text-[10px]"
                            >
                              {b}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right font-mono text-sm">
                        ${p.price}
                      </td>
                      <td className="px-3 py-3 text-right font-mono text-sm">
                        {p.stock}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => setAddStockOpen(true)}
                          >
                            Add Stock
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => setViewProduct(p)}
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {warehouseData.map((w) => (
              <Card key={w.name} className="border-border bg-card">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{w.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {w.location}
                      </p>
                    </div>
                    <Warehouse className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Capacity</span>
                      <span className="font-mono">{w.capacity}%</span>
                    </div>
                    <Progress value={w.capacity} className="h-1.5" />
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        {w.items.toLocaleString()} items
                      </span>
                      <span className="font-mono font-medium">
                        ${(w.value / 1000).toFixed(1)}K
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Stock Value by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={stockByCategory}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis
                    dataKey="category"
                    tick={{ fill: tickColor, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: tickColor, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${v / 1000}K`}
                  />
                  <Tooltip
                    {...chartTooltipStyle}
                    formatter={(v: number) => [
                      `$${v.toLocaleString()}`,
                      "Value",
                    ]}
                  />
                  <Bar
                    dataKey="value"
                    fill="hsl(239,84%,67%)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={addStockOpen} onOpenChange={setAddStockOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Stock</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                placeholder="0"
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label>Warehouse</Label>
              <Input
                placeholder="Main Warehouse"
                className="bg-secondary border-border"
              />
            </div>
            <Button className="w-full" onClick={() => setAddStockOpen(false)}>
              Add Stock
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewProduct} onOpenChange={() => setViewProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          {viewProduct && (
            <div className="space-y-2">
              <p className="font-semibold">{viewProduct.name}</p>
              <p className="text-sm">Price: ${viewProduct.price}</p>
              <p className="text-sm">Stock: {viewProduct.stock}</p>
              <div className="flex gap-1">
                {viewProduct.business.map((b) => (
                  <Badge key={b} variant="outline">
                    {b}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}

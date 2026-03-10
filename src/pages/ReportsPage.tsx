import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Download, Calendar } from "lucide-react";
import { revenueChartData, orderStatusData, categoryData } from "@/lib/mock-data";

const chartTooltipStyle = {
  contentStyle: { background: "hsl(240 6% 10%)", border: "1px solid hsl(240 4% 20%)", borderRadius: "6px", fontSize: "12px" },
  labelStyle: { color: "hsl(240 5% 96%)" },
};
const COLORS = ["hsl(239,84%,67%)", "hsl(142,71%,45%)", "hsl(25,95%,53%)", "hsl(270,60%,60%)", "hsl(0,84%,60%)"];

const inventoryReport = [
  { category: "Electronics", inStock: 1240, sold: 3420, returned: 89, value: 52400 },
  { category: "Clothing", inStock: 2310, sold: 5670, returned: 234, value: 28300 },
  { category: "Sports", inStock: 890, sold: 1890, returned: 67, value: 19800 },
  { category: "Home & Garden", inStock: 670, sold: 1230, returned: 45, value: 15200 },
  { category: "Beauty", inStock: 450, sold: 980, returned: 23, value: 8700 },
];

export default function ReportsPage() {
  return (
    <AppLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground">Comprehensive business insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="30">
            <SelectTrigger className="w-36 bg-secondary border-border">
              <Calendar className="mr-2 h-3.5 w-3.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2"><Download className="h-3.5 w-3.5" /> Export</Button>
        </div>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 20%)" />
                    <XAxis dataKey="month" tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
                    <Tooltip {...chartTooltipStyle} formatter={(v: number) => [`$${v.toLocaleString()}`, undefined]} />
                    <Legend wrapperStyle={{ fontSize: "11px" }} />
                    <Line type="monotone" dataKey="income" stroke="hsl(239,84%,67%)" strokeWidth={2} dot={false} name="Revenue" />
                    <Line type="monotone" dataKey="profit" stroke="hsl(142,71%,45%)" strokeWidth={2} dot={false} name="Profit" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Sales by Category</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" stroke="none" label={({ name, value }) => `${name} ${value}%`}>
                      {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                    </Pie>
                    <Tooltip {...chartTooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Order Volume Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={orderStatusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 20%)" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip {...chartTooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  <Bar dataKey="ordered" fill="hsl(239,84%,67%)" name="Ordered" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="delivered" fill="hsl(142,71%,45%)" name="Delivered" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="returned" fill="hsl(0,84%,60%)" name="Returned" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Inventory Report</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-[11px] text-muted-foreground">
                    <th className="px-5 py-3 text-left font-medium">Category</th>
                    <th className="px-3 py-3 text-right font-medium">In Stock</th>
                    <th className="px-3 py-3 text-right font-medium">Sold</th>
                    <th className="px-3 py-3 text-right font-medium">Returned</th>
                    <th className="px-5 py-3 text-right font-medium">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryReport.map((r) => (
                    <tr key={r.category} className="border-b border-border last:border-0">
                      <td className="px-5 py-3 text-sm font-medium">{r.category}</td>
                      <td className="px-3 py-3 text-right font-mono text-sm">{r.inStock.toLocaleString()}</td>
                      <td className="px-3 py-3 text-right font-mono text-sm">{r.sold.toLocaleString()}</td>
                      <td className="px-3 py-3 text-right font-mono text-sm text-destructive">{r.returned}</td>
                      <td className="px-5 py-3 text-right font-mono text-sm">${r.value.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Revenue vs Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 20%)" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
                  <Tooltip {...chartTooltipStyle} formatter={(v: number) => [`$${v.toLocaleString()}`, undefined]} />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  <Bar dataKey="income" fill="hsl(239,84%,67%)" name="Revenue" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="expenses" fill="hsl(0,84%,60%)" name="Expenses" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}

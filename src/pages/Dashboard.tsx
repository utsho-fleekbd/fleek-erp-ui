import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  ShoppingCart, DollarSign, TrendingDown, Users, TrendingUp, Clock,
  Package, Truck, XCircle, Layers, BarChart3, AlertTriangle,
} from "lucide-react";
import {
  kpiData, revenueChartData, orderStatusData, ordersByChannel, ordersByRegion,
  topProducts, topCustomers, recentOrders, recentTransactions, lowStockItems,
  customerAcquisition, courierPerformance, categoryData,
  type OrderStatus,
} from "@/lib/mock-data";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const chartTooltipStyle = {
  contentStyle: { background: "hsl(240 6% 10%)", border: "1px solid hsl(240 4% 20%)", borderRadius: "6px", fontSize: "12px" },
  labelStyle: { color: "hsl(240 5% 96%)" },
  itemStyle: { color: "hsl(240 5% 65%)" },
};

const COLORS = ["hsl(239,84%,67%)", "hsl(142,71%,45%)", "hsl(25,95%,53%)", "hsl(270,60%,60%)", "hsl(0,84%,60%)"];

export default function Dashboard() {
  return (
    <AppLayout>
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Good morning, John</h1>
        <p className="mt-1 text-sm text-muted-foreground">Here's what's happening across your stores today.</p>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard title="Total Orders" value={kpiData.totalOrders.value.toLocaleString()} change={kpiData.totalOrders.change} period={kpiData.totalOrders.period} icon={ShoppingCart} />
        <KpiCard title="Revenue" value={`$${(kpiData.revenue.value / 1000).toFixed(1)}K`} change={kpiData.revenue.change} period={kpiData.revenue.period} icon={DollarSign} />
        <KpiCard title="Expenses" value={`$${(kpiData.expenses.value / 1000).toFixed(1)}K`} change={kpiData.expenses.change} period={kpiData.expenses.period} icon={TrendingDown} />
        <KpiCard title="Customers" value={kpiData.customers.value.toLocaleString()} change={kpiData.customers.change} period={kpiData.customers.period} icon={Users} />
        <KpiCard title="Profit" value={`$${(kpiData.profit.value / 1000).toFixed(1)}K`} change={kpiData.profit.change} period={kpiData.profit.period} icon={TrendingUp} />
        <KpiCard title="Pending" value={kpiData.pendingOrders.value.toString()} change={kpiData.pendingOrders.change} period={kpiData.pendingOrders.period} icon={Clock} />
      </div>

      {/* Revenue Charts */}
      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Income Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 20%)" />
                <XAxis dataKey="month" tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
                <Tooltip {...chartTooltipStyle} formatter={(v: number) => [`$${v.toLocaleString()}`, undefined]} />
                <Bar dataKey="income" fill="hsl(239,84%,67%)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sales Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 20%)" />
                <XAxis dataKey="month" tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
                <Tooltip {...chartTooltipStyle} formatter={(v: number) => [`$${v.toLocaleString()}`, undefined]} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Line type="monotone" dataKey="income" stroke="hsl(239,84%,67%)" strokeWidth={2} dot={false} name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="hsl(0,84%,60%)" strokeWidth={2} dot={false} name="Expenses" />
                <Line type="monotone" dataKey="profit" stroke="hsl(142,71%,45%)" strokeWidth={2} dot={false} name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Order Analytics */}
      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Order Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={orderStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 20%)" />
                <XAxis dataKey="month" tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...chartTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Area type="monotone" dataKey="delivered" stackId="1" fill="hsl(142,71%,45%)" stroke="hsl(142,71%,45%)" fillOpacity={0.6} name="Delivered" />
                <Area type="monotone" dataKey="ordered" stackId="1" fill="hsl(239,84%,67%)" stroke="hsl(239,84%,67%)" fillOpacity={0.6} name="Ordered" />
                <Area type="monotone" dataKey="pending" stackId="1" fill="hsl(25,95%,53%)" stroke="hsl(25,95%,53%)" fillOpacity={0.6} name="Pending" />
                <Area type="monotone" dataKey="returned" stackId="1" fill="hsl(0,84%,60%)" stroke="hsl(0,84%,60%)" fillOpacity={0.6} name="Returned" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribution: Channel & Region */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">By Channel</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={ordersByChannel} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" stroke="none">
                    {ordersByChannel.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip {...chartTooltipStyle} formatter={(v: number) => [`${v}%`, undefined]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1">
                {ordersByChannel.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    {item.name}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">By Region</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={ordersByRegion} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" stroke="none">
                    {ordersByRegion.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip {...chartTooltipStyle} formatter={(v: number) => [`${v}%`, undefined]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1">
                {ordersByRegion.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    {item.name}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product & Customer Insights */}
      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        {/* Top Products */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-[11px] text-muted-foreground">
                  <th className="px-5 py-2 text-left font-medium">Product</th>
                  <th className="px-3 py-2 text-right font-medium">Sold</th>
                  <th className="px-3 py-2 text-right font-medium">Revenue</th>
                  <th className="px-5 py-2 text-right font-medium">Stock</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                    <td className="px-5 py-2.5">
                      <div className="text-sm font-medium">{p.name}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{p.sku}</div>
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-sm">{p.sold.toLocaleString()}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-sm">${p.revenue.toLocaleString()}</td>
                    <td className="px-5 py-2.5 text-right font-mono text-sm">{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Customers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-[11px] text-muted-foreground">
                  <th className="px-5 py-2 text-left font-medium">Customer</th>
                  <th className="px-3 py-2 text-right font-medium">Orders</th>
                  <th className="px-5 py-2 text-right font-medium">Spent</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                    <td className="px-5 py-2.5">
                      <div className="text-sm font-medium">{c.name}</div>
                      <div className="text-[10px] text-muted-foreground">{c.email}</div>
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-sm">{c.orders}</td>
                    <td className="px-5 py-2.5 text-right font-mono text-sm">${c.spent.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Category & Customer Acquisition */}
      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 20%)" />
                <XAxis type="number" tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <YAxis dataKey="name" type="category" tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="value" fill="hsl(239,84%,67%)" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Customer Acquisition</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={customerAcquisition} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 20%)" />
                <XAxis type="number" tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <YAxis dataKey="source" type="category" tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="value" fill="hsl(142,71%,45%)" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Courier Performance */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Courier Performance</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-[11px] text-muted-foreground">
                  <th className="px-5 py-2 text-left font-medium">Courier</th>
                  <th className="px-3 py-2 text-right font-medium">On-Time</th>
                  <th className="px-5 py-2 text-right font-medium">Avg Days</th>
                </tr>
              </thead>
              <tbody>
                {courierPerformance.map((c) => (
                  <tr key={c.courier} className="border-b border-border last:border-0">
                    <td className="px-5 py-2.5 text-sm font-medium">{c.courier}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-sm">{c.onTime}%</td>
                    <td className="px-5 py-2.5 text-right font-mono text-sm">{c.avgDays}d</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Operations Widgets */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-6">
        {[
          { label: "Processing", value: "48", icon: Clock, color: "text-warning" },
          { label: "Out for Delivery", value: "127", icon: Truck, color: "text-primary" },
          { label: "Cancelled", value: "12", icon: XCircle, color: "text-destructive" },
          { label: "Categories", value: "24", icon: Layers, color: "text-muted-foreground" },
          { label: "Stock Value", value: "$142K", icon: BarChart3, color: "text-success" },
          { label: "Low Stock", value: "8", icon: AlertTriangle, color: "text-warning" },
        ].map((w) => (
          <Card key={w.label} className="border-border bg-card">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-secondary">
                <w.icon className={`h-4 w-4 ${w.color}`} />
              </div>
              <div>
                <p className="font-mono text-xl font-semibold">{w.value}</p>
                <p className="text-[11px] text-muted-foreground">{w.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Low Stock & Recent Activity */}
      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        {/* Low Stock */}
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
                  <th className="px-3 py-2 text-right font-medium">Stock</th>
                  <th className="px-5 py-2 text-right font-medium">Reorder</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-2.5">
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{item.sku}</div>
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-sm text-destructive">{item.stock}</td>
                    <td className="px-5 py-2.5 text-right font-mono text-sm text-muted-foreground">{item.reorderLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-[11px] text-muted-foreground">
                  <th className="px-5 py-2 text-left font-medium">ID</th>
                  <th className="px-3 py-2 text-left font-medium">Type</th>
                  <th className="px-3 py-2 text-right font-medium">Amount</th>
                  <th className="px-5 py-2 text-right font-medium">Method</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((t) => (
                  <tr key={t.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-2.5 font-mono text-sm">{t.id}</td>
                    <td className="px-3 py-2.5 text-sm">{t.type}</td>
                    <td className={`px-3 py-2.5 text-right font-mono text-sm ${t.amount < 0 ? 'text-destructive' : 'text-success'}`}>
                      {t.amount < 0 ? '-' : ''}${Math.abs(t.amount).toLocaleString()}
                    </td>
                    <td className="px-5 py-2.5 text-right text-sm text-muted-foreground">{t.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-[11px] text-muted-foreground">
                <th className="px-5 py-2 text-left font-medium">Order ID</th>
                <th className="px-3 py-2 text-left font-medium">Customer</th>
                <th className="px-3 py-2 text-left font-medium">Date</th>
                <th className="px-3 py-2 text-right font-medium">Total</th>
                <th className="px-3 py-2 text-center font-medium">Status</th>
                <th className="px-5 py-2 text-right font-medium">Items</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer">
                  <td className="px-5 py-2.5 font-mono text-sm font-medium text-primary">{o.id}</td>
                  <td className="px-3 py-2.5 text-sm">{o.customer}</td>
                  <td className="px-3 py-2.5 font-mono text-sm text-muted-foreground">{o.date}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-sm">${o.total.toFixed(2)}</td>
                  <td className="px-3 py-2.5 text-center"><StatusBadge status={o.status as OrderStatus} /></td>
                  <td className="px-5 py-2.5 text-right font-mono text-sm text-muted-foreground">{o.items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </AppLayout>
  );
}

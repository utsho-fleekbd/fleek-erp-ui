import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Clock,
  Users,
  Package,
  Truck,
  XCircle,
  AlertTriangle,
  ArrowRight,
  UserPlus,
  Warehouse,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { AppLayout } from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  kpiData,
  revenueChartData,
  orderStatusData,
  ordersByChannel,
  ordersByRegion,
  topProducts,
  topCustomers,
  recentOrders,
  customerAcquisition,
  courierPerformance,
  categoryData,
  type OrderStatus,
} from "@/lib/mock-data";

const COLORS = [
  "hsl(239,84%,67%)",
  "hsl(142,71%,45%)",
  "hsl(25,95%,53%)",
  "hsl(270,60%,60%)",
  "hsl(0,84%,60%)",
];

const employeeData = [
  { role: "Admin", active: 3, inactive: 0 },
  { role: "Manager", active: 5, inactive: 1 },
  { role: "Sales", active: 12, inactive: 2 },
  { role: "Support", active: 8, inactive: 1 },
  { role: "Warehouse", active: 6, inactive: 0 },
];

const missingProducts = [
  { name: "Laptop Stand Aluminum", count: 4, loss: 320 },
  { name: "USB-C Hub 7-in-1", count: 2, loss: 158 },
  { name: "Wireless Mouse Pro", count: 3, loss: 210 },
];

export default function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const chartTooltipStyle = {
    contentStyle: {
      background: isDark ? "hsl(240 6% 10%)" : "hsl(0 0% 100%)",
      border: `1px solid ${isDark ? "hsl(240 4% 20%)" : "hsl(240 6% 90%)"}`,
      borderRadius: "6px",
      fontSize: "12px",
    },
    labelStyle: { color: isDark ? "hsl(240 5% 96%)" : "hsl(240 10% 10%)" },
    itemStyle: { color: isDark ? "hsl(240 5% 65%)" : "hsl(240 4% 46%)" },
  };
  const gridColor = isDark ? "hsl(240 4% 20%)" : "hsl(240 6% 90%)";
  const tickColor = isDark ? "hsl(240 5% 65%)" : "hsl(240 4% 46%)";

  return (
    <AppLayout>
      {/* Greeting */}
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-semibold text-foreground">
          Good morning, John!
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here's what's happening across your stores today.
        </p>
      </div>

      {/* KPI Row 1: Revenue/Profit */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 animate-fade-in stagger-1">
        <KpiCard
          title="Total Revenue"
          value={`$${(kpiData.revenue.value / 1000).toFixed(1)}K`}
          change={kpiData.revenue.change}
          period={kpiData.revenue.period}
          icon={DollarSign}
        />
        <KpiCard
          title="Net Profit"
          value={`$${(kpiData.profit.value / 1000).toFixed(1)}K`}
          change={kpiData.profit.change}
          period={kpiData.profit.period}
          icon={TrendingUp}
        />
        <KpiCard
          title="Gross Profit"
          value="$210.5K"
          change={11.2}
          period="vs last month"
          icon={TrendingUp}
        />
        <KpiCard
          title="Total Orders"
          value={kpiData.totalOrders.value.toLocaleString()}
          change={kpiData.totalOrders.change}
          period={kpiData.totalOrders.period}
          icon={ShoppingCart}
        />
      </div>

      {/* KPI Row 2: Order statuses */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 animate-fade-in stagger-2">
        <KpiCard
          title="Processing Orders"
          value="48"
          change={-2.1}
          period="vs last week"
          icon={Clock}
        />
        <KpiCard
          title="Out for Delivery"
          value="127"
          change={8.5}
          period="vs last week"
          icon={Truck}
        />
        <KpiCard
          title="Cancelled Orders"
          value="12"
          change={-15.3}
          period="vs last month"
          icon={XCircle}
        />
        <KpiCard
          title="Returned Orders"
          value="23"
          change={3.2}
          period="vs last month"
          icon={Package}
        />
      </div>

      {/* KPI Row 3: Inventory & People */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 animate-fade-in stagger-3">
        <KpiCard
          title="Inventory Value"
          value="$142K"
          change={5.8}
          period="vs last month"
          icon={Warehouse}
        />
        <KpiCard
          title="Low Stock Products"
          value="8"
          change={-12.0}
          period="vs last month"
          icon={AlertTriangle}
        />
        <KpiCard
          title="Total Customers"
          value={kpiData.customers.value.toLocaleString()}
          change={kpiData.customers.change}
          period={kpiData.customers.period}
          icon={Users}
        />
        <KpiCard
          title="Total Suppliers"
          value="24"
          change={4.2}
          period="vs last month"
          icon={UserPlus}
        />
      </div>

      {/* Revenue Charts */}
      <div className="mb-6 grid gap-4 lg:grid-cols-2 animate-fade-in stagger-4">
        <Card className="border-border bg-card transition-shadow hover:shadow-lg">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Income Overview
            </CardTitle>
            <Tabs defaultValue="yearly" className="h-auto">
              <TabsList className="h-7 bg-secondary">
                <TabsTrigger value="yearly" className="text-[10px] h-5 px-2">
                  Yearly
                </TabsTrigger>
                <TabsTrigger value="monthly" className="text-[10px] h-5 px-2">
                  Monthly
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis
                  dataKey="month"
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
                    undefined,
                  ]}
                />
                <Bar
                  dataKey="income"
                  fill="hsl(239,84%,67%)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card transition-shadow hover:shadow-lg">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sales Performance
            </CardTitle>
            <Tabs defaultValue="yearly" className="h-auto">
              <TabsList className="h-7 bg-secondary">
                <TabsTrigger value="yearly" className="text-[10px] h-5 px-2">
                  Yearly
                </TabsTrigger>
                <TabsTrigger value="monthly" className="text-[10px] h-5 px-2">
                  Monthly
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis
                  dataKey="month"
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
                    undefined,
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="hsl(239,84%,67%)"
                  strokeWidth={2}
                  dot={false}
                  name="Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="hsl(0,84%,60%)"
                  strokeWidth={2}
                  dot={false}
                  name="Expenses"
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="hsl(142,71%,45%)"
                  strokeWidth={2}
                  dot={false}
                  name="Profit"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top 5 Cards Row */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in">
        {/* Top Categories */}
        <Card className="border-border bg-card transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Top Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {categoryData.slice(0, 5).map((c, i) => (
              <div key={c.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground w-4">
                    {i + 1}
                  </span>
                  <span className="text-sm">{c.name}</span>
                </div>
                <span className="text-sm font-mono text-muted-foreground">
                  {c.value}%
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Link to="/categories">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-[10px] gap-1"
              >
                Show All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Top Products */}
        <Card className="border-border bg-card transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {topProducts.slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground w-4">
                    {i + 1}
                  </span>
                  <span className="text-sm truncate max-w-[120px]">
                    {p.name}
                  </span>
                </div>
                <span className="text-sm font-mono text-muted-foreground">
                  {p.sold}
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Link to="/products">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-[10px] gap-1"
              >
                Show All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Top Customers */}
        <Card className="border-border bg-card transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Top Customers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {topCustomers.slice(0, 5).map((c, i) => (
              <div key={c.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground w-4">
                    {i + 1}
                  </span>
                  <span className="text-sm">{c.name}</span>
                </div>
                <span className="text-sm font-mono text-muted-foreground">
                  ${c.spent.toLocaleString()}
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Link to="/customers">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-[10px] gap-1"
              >
                Show All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Customer Acquisition */}
        <Card className="border-border bg-card transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Acquisition Source
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {customerAcquisition.slice(0, 5).map((c, i) => (
              <div key={c.source} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground w-4">
                    {i + 1}
                  </span>
                  <span className="text-sm">{c.source}</span>
                </div>
                <span className="text-sm font-mono text-muted-foreground">
                  {c.value}%
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="h-6 text-[10px] gap-1">
              Show All <ArrowRight className="h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Employees & Missing Products */}
      <div className="mb-6 grid gap-4 lg:grid-cols-2 animate-fade-in">
        {/* Employees */}
        <Card className="border-border bg-card transition-shadow hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Employees by Role
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={employeeData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis
                  dataKey="role"
                  tick={{ fill: tickColor, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: tickColor, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip {...chartTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar
                  dataKey="active"
                  fill="hsl(142,71%,45%)"
                  radius={[2, 2, 0, 0]}
                  name="Active"
                />
                <Bar
                  dataKey="inactive"
                  fill="hsl(0,84%,60%)"
                  radius={[2, 2, 0, 0]}
                  name="Inactive"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Missing Products */}
        <Card className="border-border bg-card transition-shadow hover:shadow-lg">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Missing Products
              </CardTitle>
              <div className="flex gap-4 mt-1">
                <span className="text-xs text-muted-foreground">
                  Items: <strong className="text-foreground">9</strong>
                </span>
                <span className="text-xs text-muted-foreground">
                  Est. Loss: <strong className="text-destructive">$688</strong>
                </span>
              </div>
            </div>
            <Link to="/products/missing">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-[10px] gap-1"
              >
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-[11px] text-muted-foreground">
                  <th className="px-5 py-2 text-left font-medium">Product</th>
                  <th className="px-3 py-2 text-right font-medium">Count</th>
                  <th className="px-5 py-2 text-right font-medium">Loss</th>
                </tr>
              </thead>
              <tbody>
                {missingProducts.map((p) => (
                  <tr
                    key={p.name}
                    className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                  >
                    <td className="px-5 py-2.5 text-sm font-medium">
                      {p.name}
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-sm text-warning">
                      {p.count}
                    </td>
                    <td className="px-5 py-2.5 text-right font-mono text-sm text-destructive">
                      ${p.loss}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Order Analytics & Courier Performance */}
      <div className="mb-6 grid gap-4 lg:grid-cols-2 animate-fade-in">
        <Card className="border-border bg-card transition-shadow hover:shadow-lg">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Order Analytics
            </CardTitle>
            <Tabs defaultValue="monthly" className="h-auto">
              <TabsList className="h-7 bg-secondary">
                <TabsTrigger value="monthly" className="text-[10px] h-5 px-2">
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="yearly" className="text-[10px] h-5 px-2">
                  Yearly
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={orderStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: tickColor, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: tickColor, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip {...chartTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Area
                  type="monotone"
                  dataKey="delivered"
                  stackId="1"
                  fill="hsl(142,71%,45%)"
                  stroke="hsl(142,71%,45%)"
                  fillOpacity={0.6}
                  name="Delivered"
                />
                <Area
                  type="monotone"
                  dataKey="ordered"
                  stackId="1"
                  fill="hsl(239,84%,67%)"
                  stroke="hsl(239,84%,67%)"
                  fillOpacity={0.6}
                  name="Ordered"
                />
                <Area
                  type="monotone"
                  dataKey="pending"
                  stackId="1"
                  fill="hsl(25,95%,53%)"
                  stroke="hsl(25,95%,53%)"
                  fillOpacity={0.6}
                  name="Pending"
                />
                <Area
                  type="monotone"
                  dataKey="returned"
                  stackId="1"
                  fill="hsl(0,84%,60%)"
                  stroke="hsl(0,84%,60%)"
                  fillOpacity={0.6}
                  name="Returned"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card transition-shadow hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Courier Performance (Top 5)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={courierPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis
                  type="number"
                  tick={{ fill: tickColor, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <YAxis
                  dataKey="courier"
                  type="category"
                  tick={{ fill: tickColor, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={90}
                />
                <Tooltip
                  {...chartTooltipStyle}
                  formatter={(v: number) => [`${v}%`, "On-time Rate"]}
                />
                <Bar
                  dataKey="onTime"
                  fill="hsl(239,84%,67%)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Distribution */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 animate-fade-in">
        <Card className="border-border bg-card transition-shadow hover:shadow-lg">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Orders by Channel
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={ordersByChannel}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  dataKey="value"
                  stroke="none"
                >
                  {ordersByChannel.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  {...chartTooltipStyle}
                  formatter={(v: number) => [`${v}%`, undefined]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1">
              {ordersByChannel.map((item, i) => (
                <div
                  key={item.name}
                  className="flex items-center gap-1 text-[10px] text-muted-foreground"
                >
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  {item.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card transition-shadow hover:shadow-lg">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Orders by Region
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={ordersByRegion}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  dataKey="value"
                  stroke="none"
                >
                  {ordersByRegion.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  {...chartTooltipStyle}
                  formatter={(v: number) => [`${v}%`, undefined]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1">
              {ordersByRegion.map((item, i) => (
                <div
                  key={item.name}
                  className="flex items-center gap-1 text-[10px] text-muted-foreground"
                >
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  {item.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="border-border bg-card animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[600px]">
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
                <tr
                  key={o.id}
                  className="border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-2.5 font-mono text-sm font-medium text-primary">
                    {o.id}
                  </td>
                  <td className="px-3 py-2.5 text-sm">{o.customer}</td>
                  <td className="px-3 py-2.5 font-mono text-sm text-muted-foreground">
                    {o.date}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-sm">
                    ${o.total.toFixed(2)}
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <StatusBadge status={o.status as OrderStatus} />
                  </td>
                  <td className="px-5 py-2.5 text-right font-mono text-sm text-muted-foreground">
                    {o.items}
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

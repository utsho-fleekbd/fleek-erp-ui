import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Wallet } from "lucide-react";

const accounts = [
  {
    id: 1,
    name: "Business Checking",
    type: "Bank",
    balance: 84520,
    currency: "USD",
  },
  {
    id: 2,
    name: "PayPal Business",
    type: "Gateway",
    balance: 12340,
    currency: "USD",
  },
  {
    id: 3,
    name: "Stripe Balance",
    type: "Gateway",
    balance: 8920,
    currency: "USD",
  },
  { id: 4, name: "Petty Cash", type: "Cash", balance: 2450, currency: "USD" },
  {
    id: 5,
    name: "bKash Merchant",
    type: "Mobile",
    balance: 5670,
    currency: "BDT",
  },
];

const expenseCategories = [
  { category: "Shipping", amount: 12400 },
  { category: "Marketing", amount: 8900 },
  { category: "Salaries", amount: 24500 },
  { category: "Software", amount: 3200 },
  { category: "Rent", amount: 5000 },
  { category: "Utilities", amount: 1800 },
];

const expenses = [
  {
    id: "EXP-101",
    category: "Shipping",
    desc: "FedEx monthly invoice",
    amount: 3420,
    date: "2026-03-08",
  },
  {
    id: "EXP-100",
    category: "Marketing",
    desc: "Facebook Ads Q1",
    amount: 2800,
    date: "2026-03-05",
  },
  {
    id: "EXP-099",
    category: "Software",
    desc: "SaaS subscriptions",
    amount: 890,
    date: "2026-03-01",
  },
  {
    id: "EXP-098",
    category: "Salaries",
    desc: "March payroll",
    amount: 24500,
    date: "2026-03-01",
  },
  {
    id: "EXP-097",
    category: "Rent",
    desc: "Warehouse rent",
    amount: 5000,
    date: "2026-03-01",
  },
];

const invoices = [
  {
    id: "INV-2001",
    customer: "Sarah Chen",
    amount: 1245.0,
    date: "2026-03-10",
    status: "paid",
    template: "modern",
  },
  {
    id: "INV-2000",
    customer: "Marcus Johnson",
    amount: 890.5,
    date: "2026-03-09",
    status: "sent",
    template: "classic",
  },
  {
    id: "INV-1999",
    customer: "Elena Rodriguez",
    amount: 2340.0,
    date: "2026-03-08",
    status: "paid",
    template: "minimal",
  },
  {
    id: "INV-1998",
    customer: "David Kim",
    amount: 567.8,
    date: "2026-03-07",
    status: "overdue",
    template: "modern",
  },
  {
    id: "INV-1997",
    customer: "Aisha Patel",
    amount: 1890.0,
    date: "2026-03-05",
    status: "draft",
    template: "classic",
  },
];

const chartTooltipStyle = {
  contentStyle: {
    background: "hsl(240 6% 10%)",
    border: "1px solid hsl(240 4% 20%)",
    borderRadius: "6px",
    fontSize: "12px",
  },
  labelStyle: { color: "hsl(240 5% 96%)" },
};

const invoiceStatusStyles: Record<string, string> = {
  paid: "border-success/20 bg-success/10 text-success",
  sent: "border-primary/20 bg-primary/10 text-primary",
  overdue: "border-destructive/20 bg-destructive/10 text-destructive",
  draft: "border-border bg-muted text-muted-foreground",
};

export default function FinancePage() {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Finance</h1>
        <p className="text-sm text-muted-foreground">
          Accounts, expenses, and invoices
        </p>
      </div>

      <Tabs defaultValue="accounts" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {accounts.map((a) => (
              <Card key={a.id} className="border-border bg-card">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{a.name}</p>
                      <span className="inline-flex items-center rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {a.type}
                      </span>
                    </div>
                    <Wallet className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="mt-3 font-mono text-2xl font-semibold">
                    ${a.balance.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {a.currency}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Expenses by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={expenseCategories} layout="vertical">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(240 4% 20%)"
                    />
                    <XAxis
                      type="number"
                      tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `$${v / 1000}K`}
                    />
                    <YAxis
                      dataKey="category"
                      type="category"
                      tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      width={80}
                    />
                    <Tooltip
                      {...chartTooltipStyle}
                      formatter={(v: number) => [
                        `$${v.toLocaleString()}`,
                        "Amount",
                      ]}
                    />
                    <Bar
                      dataKey="amount"
                      fill="hsl(0,84%,60%)"
                      radius={[0, 2, 2, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Recent Expenses
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-[11px] text-muted-foreground">
                      <th className="px-5 py-2 text-left font-medium">
                        Description
                      </th>
                      <th className="px-3 py-2 text-left font-medium">
                        Category
                      </th>
                      <th className="px-5 py-2 text-right font-medium">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((e) => (
                      <tr
                        key={e.id}
                        className="border-b border-border last:border-0"
                      >
                        <td className="px-5 py-2.5">
                          <div className="text-sm">{e.desc}</div>
                          <div className="font-mono text-[10px] text-muted-foreground">
                            {e.date}
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-sm text-muted-foreground">
                          {e.category}
                        </td>
                        <td className="px-5 py-2.5 text-right font-mono text-sm text-destructive">
                          ${e.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Invoices
                </CardTitle>
                <Button size="sm">Create Invoice</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-[11px] text-muted-foreground">
                    <th className="px-5 py-3 text-left font-medium">Invoice</th>
                    <th className="px-3 py-3 text-left font-medium">
                      Customer
                    </th>
                    <th className="px-3 py-3 text-right font-medium">Amount</th>
                    <th className="px-3 py-3 text-left font-medium">Date</th>
                    <th className="px-3 py-3 text-center font-medium">
                      Status
                    </th>
                    <th className="px-5 py-3 text-center font-medium">
                      Template
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr
                      key={inv.id}
                      className="border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer"
                    >
                      <td className="px-5 py-3 font-mono text-sm font-medium text-primary">
                        {inv.id}
                      </td>
                      <td className="px-3 py-3 text-sm">{inv.customer}</td>
                      <td className="px-3 py-3 text-right font-mono text-sm">
                        ${inv.amount.toFixed(2)}
                      </td>
                      <td className="px-3 py-3 font-mono text-sm text-muted-foreground">
                        {inv.date}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span
                          className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-medium capitalize ${invoiceStatusStyles[inv.status]}`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center text-sm capitalize text-muted-foreground">
                        {inv.template}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}

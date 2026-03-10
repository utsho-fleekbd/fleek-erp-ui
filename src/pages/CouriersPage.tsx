import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { CreditCard, Truck, MapPin, DollarSign } from "lucide-react";

const couriers = [
  { id: 1, name: "FedEx", status: "active", deliveries: 1240, onTime: 95, avgDays: 2.1, cod: true },
  { id: 2, name: "DHL Express", status: "active", deliveries: 980, onTime: 92, avgDays: 2.4, cod: true },
  { id: 3, name: "UPS", status: "active", deliveries: 870, onTime: 89, avgDays: 2.8, cod: false },
  { id: 4, name: "Local Express", status: "active", deliveries: 650, onTime: 97, avgDays: 1.2, cod: true },
  { id: 5, name: "PostMaster", status: "inactive", deliveries: 320, onTime: 85, avgDays: 3.5, cod: false },
];

const performanceData = couriers.filter(c => c.status === "active").map(c => ({
  name: c.name,
  onTime: c.onTime,
  deliveries: c.deliveries,
}));

const zones = [
  { id: 1, name: "Metro Area", cities: 12, baseCost: 5.99, perKg: 0.50 },
  { id: 2, name: "Suburban", cities: 28, baseCost: 8.99, perKg: 0.75 },
  { id: 3, name: "Rural", cities: 45, baseCost: 12.99, perKg: 1.20 },
  { id: 4, name: "Remote", cities: 15, baseCost: 18.99, perKg: 2.00 },
];

const gateways = [
  { id: 1, name: "Stripe", status: "active", transactions: 4521, volume: 128400 },
  { id: 2, name: "PayPal", status: "active", transactions: 2340, volume: 67800 },
  { id: 3, name: "bKash", status: "active", transactions: 1890, volume: 34200 },
  { id: 4, name: "SSLCommerz", status: "inactive", transactions: 0, volume: 0 },
  { id: 5, name: "Nagad", status: "active", transactions: 890, volume: 15600 },
  { id: 6, name: "Rocket", status: "inactive", transactions: 0, volume: 0 },
];

const chartTooltipStyle = {
  contentStyle: { background: "hsl(240 6% 10%)", border: "1px solid hsl(240 4% 20%)", borderRadius: "6px", fontSize: "12px" },
  labelStyle: { color: "hsl(240 5% 96%)" },
};

export default function CouriersPage() {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Couriers & Payments</h1>
        <p className="text-sm text-muted-foreground">Manage shipping and payment gateways</p>
      </div>

      <Tabs defaultValue="couriers" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="couriers">Couriers</TabsTrigger>
          <TabsTrigger value="zones">Delivery Zones</TabsTrigger>
          <TabsTrigger value="gateways">Payment Gateways</TabsTrigger>
        </TabsList>

        <TabsContent value="couriers" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Courier Performance</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 20%)" />
                    <XAxis dataKey="name" tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip {...chartTooltipStyle} />
                    <Bar dataKey="onTime" fill="hsl(142,71%,45%)" name="On-Time %" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Courier Companies</CardTitle></CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-[11px] text-muted-foreground">
                      <th className="px-5 py-2 text-left font-medium">Courier</th>
                      <th className="px-3 py-2 text-right font-medium">Deliveries</th>
                      <th className="px-3 py-2 text-right font-medium">On-Time</th>
                      <th className="px-3 py-2 text-center font-medium">COD</th>
                      <th className="px-5 py-2 text-center font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {couriers.map((c) => (
                      <tr key={c.id} className="border-b border-border last:border-0">
                        <td className="px-5 py-2.5 text-sm font-medium">{c.name}</td>
                        <td className="px-3 py-2.5 text-right font-mono text-sm">{c.deliveries.toLocaleString()}</td>
                        <td className="px-3 py-2.5 text-right font-mono text-sm">{c.onTime}%</td>
                        <td className="px-3 py-2.5 text-center">{c.cod ? "✓" : "—"}</td>
                        <td className="px-5 py-2.5 text-center">
                          <span className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-medium ${
                            c.status === "active" ? "border-success/20 bg-success/10 text-success" : "border-border bg-muted text-muted-foreground"
                          }`}>{c.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="zones">
          <Card className="border-border bg-card">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-[11px] text-muted-foreground">
                    <th className="px-5 py-3 text-left font-medium">Zone</th>
                    <th className="px-3 py-3 text-right font-medium">Cities</th>
                    <th className="px-3 py-3 text-right font-medium">Base Cost</th>
                    <th className="px-5 py-3 text-right font-medium">Per Kg</th>
                  </tr>
                </thead>
                <tbody>
                  {zones.map((z) => (
                    <tr key={z.id} className="border-b border-border last:border-0">
                      <td className="px-5 py-3 text-sm font-medium">{z.name}</td>
                      <td className="px-3 py-3 text-right font-mono text-sm">{z.cities}</td>
                      <td className="px-3 py-3 text-right font-mono text-sm">${z.baseCost}</td>
                      <td className="px-5 py-3 text-right font-mono text-sm">${z.perKg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gateways">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gateways.map((g) => (
              <Card key={g.id} className="border-border bg-card">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{g.name}</p>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {g.transactions.toLocaleString()} transactions
                      </p>
                    </div>
                    <Switch defaultChecked={g.status === "active"} />
                  </div>
                  {g.volume > 0 && (
                    <div className="mt-3 rounded border border-border bg-secondary p-3">
                      <p className="text-[10px] text-muted-foreground">Total Volume</p>
                      <p className="font-mono text-lg font-semibold">${(g.volume / 1000).toFixed(1)}K</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}

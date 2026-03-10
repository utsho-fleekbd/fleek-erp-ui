import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

const customers = Array.from({ length: 20 }, (_, i) => {
  const names = ["Sarah Chen", "Marcus Johnson", "Elena Rodriguez", "David Kim", "Aisha Patel", "James Wilson", "Maria Garcia", "Alex Turner", "Lisa Park", "Omar Hassan"];
  return {
    id: i + 1,
    name: names[i % names.length],
    email: `${names[i % names.length].toLowerCase().replace(" ", ".")}@example.com`,
    phone: `+1 (555) ${String(100 + i).padStart(3, "0")}-${String(1000 + i * 7).slice(0, 4)}`,
    orders: Math.floor(Math.random() * 50) + 5,
    spent: Math.round(Math.random() * 15000 + 500),
    location: ["New York", "Los Angeles", "Chicago", "Houston", "Dallas"][i % 5],
    status: i % 5 === 0 ? "vip" : "active",
    joinDate: `2025-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
  };
});

const suppliers = [
  { id: 1, name: "TechParts Co.", contact: "Mike Lee", email: "mike@techparts.com", products: 45, status: "active", rating: 4.8 },
  { id: 2, name: "FashionHub Ltd.", contact: "Anna Smith", email: "anna@fashionhub.com", products: 120, status: "active", rating: 4.5 },
  { id: 3, name: "SportGear Inc.", contact: "Tom Davis", email: "tom@sportgear.com", products: 78, status: "active", rating: 4.2 },
  { id: 4, name: "HomeStyle", contact: "Jenny Park", email: "jenny@homestyle.com", products: 56, status: "inactive", rating: 3.9 },
  { id: 5, name: "BeautyWorks", contact: "Sam Brown", email: "sam@beautyworks.com", products: 34, status: "active", rating: 4.6 },
];

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Customers & Suppliers</h1>
          <p className="text-sm text-muted-foreground">Manage your contacts</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Add Contact</Button>
      </div>

      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="customers">Customers ({customers.length})</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers ({suppliers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="customers">
          <div className="mb-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
            </div>
          </div>

          <Card className="border-border bg-card">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-[11px] text-muted-foreground">
                    <th className="px-5 py-3 text-left font-medium">Customer</th>
                    <th className="px-3 py-3 text-left font-medium">Location</th>
                    <th className="px-3 py-3 text-right font-medium">Orders</th>
                    <th className="px-3 py-3 text-right font-medium">Total Spent</th>
                    <th className="px-3 py-3 text-center font-medium">Status</th>
                    <th className="px-5 py-3 text-left font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.slice(0, 10).map((c) => (
                    <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                            {c.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{c.name}</div>
                            <div className="text-[10px] text-muted-foreground">{c.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm text-muted-foreground">{c.location}</td>
                      <td className="px-3 py-3 text-right font-mono text-sm">{c.orders}</td>
                      <td className="px-3 py-3 text-right font-mono text-sm">${c.spent.toLocaleString()}</td>
                      <td className="px-3 py-3 text-center">
                        {c.status === "vip" ? (
                          <span className="inline-flex items-center rounded border border-warning/20 bg-warning/10 px-2 py-0.5 text-[11px] font-medium text-warning">VIP</span>
                        ) : (
                          <span className="inline-flex items-center rounded border border-success/20 bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success">Active</span>
                        )}
                      </td>
                      <td className="px-5 py-3 font-mono text-sm text-muted-foreground">{c.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers">
          <Card className="border-border bg-card">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-[11px] text-muted-foreground">
                    <th className="px-5 py-3 text-left font-medium">Supplier</th>
                    <th className="px-3 py-3 text-left font-medium">Contact</th>
                    <th className="px-3 py-3 text-right font-medium">Products</th>
                    <th className="px-3 py-3 text-right font-medium">Rating</th>
                    <th className="px-5 py-3 text-center font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((s) => (
                    <tr key={s.id} className="border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer">
                      <td className="px-5 py-3">
                        <div className="text-sm font-medium">{s.name}</div>
                        <div className="text-[10px] text-muted-foreground">{s.email}</div>
                      </td>
                      <td className="px-3 py-3 text-sm text-muted-foreground">{s.contact}</td>
                      <td className="px-3 py-3 text-right font-mono text-sm">{s.products}</td>
                      <td className="px-3 py-3 text-right font-mono text-sm">{s.rating}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-medium ${
                          s.status === "active" ? "border-success/20 bg-success/10 text-success" : "border-border bg-muted text-muted-foreground"
                        }`}>
                          {s.status}
                        </span>
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

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { allOrders, type OrderStatus } from "@/lib/mock-data";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Search, Filter, Download, Plus, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 10;

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<typeof allOrders[0] | null>(null);
  const [sortField, setSortField] = useState<"date" | "total">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = allOrders
    .filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.customer.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortField === "date") return a.date.localeCompare(b.date) * dir;
      return (a.total - b.total) * dir;
    });

  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const toggleSort = (field: "date" | "total") => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("desc"); }
  };

  return (
    <AppLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Orders</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} orders found</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Create Order</Button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search orders..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} className="pl-9 bg-secondary border-border" />
        </div>
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(0); }}>
          <SelectTrigger className="w-40 bg-secondary border-border">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {["pending", "confirmed", "packed", "dispatched", "delivered", "returned", "cancelled"].map((s) => (
              <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="gap-2"><Download className="h-3.5 w-3.5" /> Export</Button>
      </div>

      {/* Table */}
      <Card className="border-border bg-card">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-[11px] text-muted-foreground">
                <th className="px-5 py-3 text-left font-medium">Order ID</th>
                <th className="px-3 py-3 text-left font-medium">Customer</th>
                <th className="cursor-pointer px-3 py-3 text-left font-medium hover:text-foreground" onClick={() => toggleSort("date")}>
                  Date {sortField === "date" && (sortDir === "asc" ? "↑" : "↓")}
                </th>
                <th className="cursor-pointer px-3 py-3 text-right font-medium hover:text-foreground" onClick={() => toggleSort("total")}>
                  Total {sortField === "total" && (sortDir === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-3 py-3 text-center font-medium">Status</th>
                <th className="px-3 py-3 text-left font-medium">Channel</th>
                <th className="px-5 py-3 text-left font-medium">Payment</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer" onClick={() => setSelectedOrder(o)}>
                  <td className="px-5 py-3 font-mono text-sm font-medium text-primary">{o.id}</td>
                  <td className="px-3 py-3 text-sm">{o.customer}</td>
                  <td className="px-3 py-3 font-mono text-sm text-muted-foreground">{o.date}</td>
                  <td className="px-3 py-3 text-right font-mono text-sm">${o.total.toFixed(2)}</td>
                  <td className="px-3 py-3 text-center"><StatusBadge status={o.status as OrderStatus} /></td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">{o.channel}</td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">{o.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of {filtered.length}
        </span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" disabled={page === 0} onClick={() => setPage(page - 1)} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
            <Button key={i} variant={page === i ? "default" : "outline"} size="icon" onClick={() => setPage(i)} className="h-8 w-8 text-xs">
              {i + 1}
            </Button>
          ))}
          <Button variant="outline" size="icon" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)} className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Order Detail Sheet */}
      <Sheet open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <SheetContent className="w-[480px] border-border bg-card sm:max-w-[480px]">
          {selectedOrder && (
            <>
              <SheetHeader>
                <SheetTitle className="font-mono">{selectedOrder.id}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <StatusBadge status={selectedOrder.status as OrderStatus} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Customer</span>
                  <span className="text-sm font-medium">{selectedOrder.customer}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Date</span>
                  <span className="font-mono text-sm">{selectedOrder.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-mono text-sm font-semibold">${selectedOrder.total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Items</span>
                  <span className="font-mono text-sm">{selectedOrder.items}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Channel</span>
                  <span className="text-sm">{selectedOrder.channel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Payment</span>
                  <span className="text-sm">{selectedOrder.paymentMethod}</span>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="mb-3 text-sm font-medium">Order Timeline</h3>
                  <div className="space-y-3">
                    {["Order placed", "Payment confirmed", "Packed", "Dispatched"].map((step, i) => (
                      <div key={step} className="flex items-start gap-3">
                        <div className={`mt-1 h-2 w-2 rounded-full ${i < 3 ? 'bg-success' : 'bg-border'}`} />
                        <div>
                          <div className="text-sm">{step}</div>
                          <div className="text-[10px] text-muted-foreground">{selectedOrder.date} 10:{String(i * 15).padStart(2, '0')}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">Update Status</Button>
                  <Button variant="outline" className="flex-1">Print Invoice</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AppLayout>
  );
}

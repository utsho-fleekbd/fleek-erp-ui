import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allOrders, type OrderStatus } from "@/lib/mock-data";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Pencil,
  Trash2,
  ShoppingCart,
  Clock,
  CheckCircle,
  RotateCcw,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const PAGE_SIZE = 10;

const missingProducts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: [
    "Laptop Stand",
    "USB Hub",
    "Wireless Mouse",
    "Keyboard",
    "Webcam",
    "Monitor Arm",
  ][i % 6],
  image: `https://picsum.photos/seed/product-${Math.random() * i}/300`,
  missingDate: `2026-03-${String(10 - (i % 10)).padStart(2, "0")}`,
  price: Math.round(Math.random() * 200 + 20),
  note: i % 3 === 0 ? "Lost during transit" : "",
}));

export default function OrdersPage() {
  const location = useLocation();
  const isMissing = location.pathname === "/orders/missing";

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<
    (typeof allOrders)[0] | null
  >(null);
  const [sortField, setSortField] = useState<"date" | "total">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [viewMissing, setViewMissing] = useState<
    (typeof missingProducts)[0] | null
  >(null);
  const [deleteMissing, setDeleteMissing] = useState<
    (typeof missingProducts)[0] | null
  >(null);

  if (isMissing) {
    const filteredMissing = missingProducts.filter(
      (p) => !search || p.name.toLowerCase().includes(search.toLowerCase()),
    );
    const paginatedMissing = filteredMissing.slice(page * 8, (page + 1) * 8);
    return (
      <AppLayout>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl font-semibold">Missing Products</h1>
            <p className="text-sm text-muted-foreground">
              {filteredMissing.length} items
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Report Missing
          </Button>
        </div>
        <div className="mb-4 relative w-full sm:w-64 animate-fade-in stagger-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="pl-9 bg-secondary border-border"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in stagger-2">
          {paginatedMissing.map((p) => (
            <Card
              key={p.id}
              className="border-border bg-card hover:shadow-lg transition-all"
            >
              <CardContent className="p-4">
                <img
                  src={p.image}
                  className="h-32 w-full object-cover rounded bg-secondary mb-3"
                />
                <h3 className="text-sm font-medium">{p.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Missing: {p.missingDate}
                </p>
                <p className="text-sm font-mono font-medium mt-1">${p.price}</p>
                {p.note && (
                  <p className="text-xs text-muted-foreground mt-1 italic">
                    {p.note}
                  </p>
                )}
                <div className="flex gap-1 mt-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setViewMissing(p)}
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive"
                    onClick={() => setDeleteMissing(p)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Dialog open={!!viewMissing} onOpenChange={() => setViewMissing(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{viewMissing?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <p className="text-sm">Price: ${viewMissing?.price}</p>
              <p className="text-sm">
                Missing Date: {viewMissing?.missingDate}
              </p>
              {viewMissing?.note && (
                <p className="text-sm">Note: {viewMissing.note}</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          open={!!deleteMissing}
          onOpenChange={() => setDeleteMissing(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Record</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete{" "}
              <strong>{deleteMissing?.name}</strong>?
            </p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setDeleteMissing(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => setDeleteMissing(null)}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </AppLayout>
    );
  }

  const filtered = allOrders
    .filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (
        search &&
        !o.id.toLowerCase().includes(search.toLowerCase()) &&
        !o.customer.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortField === "date") return a.date.localeCompare(b.date) * dir;
      return (a.total - b.total) * dir;
    });

  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const orderStats = [
    {
      label: "All Orders",
      value: allOrders.length,
      icon: ShoppingCart,
      color: "text-primary",
    },
    {
      label: "Orders Today",
      value: 24,
      icon: ShoppingCart,
      color: "text-primary",
    },
    {
      label: "Sales Today",
      value: "$3,420",
      icon: ShoppingCart,
      color: "text-success",
    },
    {
      label: "All Pending",
      value: allOrders.filter((o) => o.status === "pending").length,
      icon: Clock,
      color: "text-warning",
    },
    {
      label: "Delivered",
      value: allOrders.filter((o) => o.status === "delivered").length,
      icon: CheckCircle,
      color: "text-success",
    },
    {
      label: "Returned",
      value: allOrders.filter((o) => o.status === "returned").length,
      icon: RotateCcw,
      color: "text-destructive",
    },
  ];

  const toggleSort = (field: "date" | "total") => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold">Orders</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} orders found
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Create Order
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 animate-fade-in stagger-1">
        {orderStats.map((s) => (
          <Card key={s.label} className="border-border bg-card">
            <CardContent className="flex items-center gap-3 p-3">
              <s.icon className={`h-4 w-4 ${s.color}`} />
              <div>
                <p className="font-mono text-lg font-semibold">{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3 animate-fade-in stagger-2">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="pl-9 bg-secondary border-border"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v);
            setPage(0);
          }}
        >
          <SelectTrigger className="w-40 bg-secondary border-border">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {[
              "pending",
              "confirmed",
              "packed",
              "dispatched",
              "delivered",
              "returned",
              "cancelled",
            ].map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-3.5 w-3.5" /> Export
        </Button>
      </div>

      <Card className="border-border bg-card animate-fade-in stagger-3">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-border text-[11px] text-muted-foreground">
                <th className="px-4 py-3 text-left font-medium">Order ID</th>
                <th className="px-3 py-3 text-left font-medium">Customer</th>
                <th
                  className="cursor-pointer px-3 py-3 text-left font-medium hover:text-foreground"
                  onClick={() => toggleSort("date")}
                >
                  Date {sortField === "date" && (sortDir === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="cursor-pointer px-3 py-3 text-right font-medium hover:text-foreground"
                  onClick={() => toggleSort("total")}
                >
                  Total{" "}
                  {sortField === "total" && (sortDir === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-3 py-3 text-center font-medium">Status</th>
                <th className="px-3 py-3 text-left font-medium">Channel</th>
                <th className="px-3 py-3 text-left font-medium">Payment</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedOrder(o)}
                >
                  <td className="px-4 py-3 font-mono text-sm font-medium text-primary">
                    {o.id}
                  </td>
                  <td className="px-3 py-3 text-sm">{o.customer}</td>
                  <td className="px-3 py-3 font-mono text-sm text-muted-foreground">
                    {o.date}
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-sm">
                    ${o.total.toFixed(2)}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <StatusBadge status={o.status as OrderStatus} />
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">
                    {o.channel}
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">
                    {o.paymentMethod}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="mt-4 flex flex-col items-center justify-between gap-2 sm:flex-row">
        <span className="text-sm text-muted-foreground">
          Showing {page * PAGE_SIZE + 1}–
          {Math.min((page + 1) * PAGE_SIZE, filtered.length)} of{" "}
          {filtered.length}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
            <Button
              key={i}
              variant={page === i ? "default" : "outline"}
              size="icon"
              onClick={() => setPage(i)}
              className="h-8 w-8 text-xs"
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            disabled={page >= totalPages - 1}
            onClick={() => setPage(page + 1)}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Sheet open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <SheetContent className="w-full sm:w-[480px] border-border bg-card sm:max-w-[480px]">
          {selectedOrder && (
            <>
              <SheetHeader>
                <SheetTitle className="font-mono">
                  {selectedOrder.id}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {[
                  {
                    label: "Status",
                    val: (
                      <StatusBadge
                        status={selectedOrder.status as OrderStatus}
                      />
                    ),
                  },
                  { label: "Customer", val: selectedOrder.customer },
                  { label: "Date", val: selectedOrder.date },
                  { label: "Total", val: `$${selectedOrder.total.toFixed(2)}` },
                  { label: "Items", val: selectedOrder.items },
                  { label: "Channel", val: selectedOrder.channel },
                  { label: "Payment", val: selectedOrder.paymentMethod },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-muted-foreground">
                      {row.label}
                    </span>
                    <span className="text-sm font-medium">{row.val}</span>
                  </div>
                ))}
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">Update Status</Button>
                  <Button variant="outline" className="flex-1">
                    Print Invoice
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AppLayout>
  );
}

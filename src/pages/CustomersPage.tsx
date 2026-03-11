import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, ChevronLeft, ChevronRight, Eye, Pencil, Trash2 } from "lucide-react";

const customers = Array.from({ length: 30 }, (_, i) => {
  const names = ["Sarah Chen", "Marcus Johnson", "Elena Rodriguez", "David Kim", "Aisha Patel", "James Wilson", "Maria Garcia", "Alex Turner", "Lisa Park", "Omar Hassan"];
  return {
    id: i + 1,
    name: names[i % names.length],
    image: `/placeholder.svg`,
    address: ["New York", "Los Angeles", "Chicago", "Houston", "Dallas"][i % 5],
    phone: `+1 (555) ${String(100 + i).padStart(3, "0")}-${String(1000 + i * 7).slice(0, 4)}`,
    joinDate: `2025-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
    totalOrders: Math.floor(Math.random() * 50) + 5,
    returnedOrders: Math.floor(Math.random() * 5),
    totalPaid: Math.round(Math.random() * 15000 + 500),
  };
});

const PAGE_SIZE = 10;

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [viewItem, setViewItem] = useState<typeof customers[0] | null>(null);
  const [editItem, setEditItem] = useState<typeof customers[0] | null>(null);
  const [deleteItem, setDeleteItem] = useState<typeof customers[0] | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const filtered = customers.filter((c) => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search));
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
        <div><h1 className="text-2xl font-semibold">Customers</h1><p className="text-sm text-muted-foreground">{filtered.length} customers</p></div>
        <Button className="gap-2" onClick={() => setAddOpen(true)}><Plus className="h-4 w-4" /> Add Customer</Button>
      </div>

      <div className="mb-4 relative w-full sm:w-64 animate-fade-in stagger-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search customers..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} className="pl-9 bg-secondary border-border" />
      </div>

      <Card className="border-border bg-card animate-fade-in stagger-2">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border text-[11px] text-muted-foreground">
                <th className="px-4 py-3 text-left font-medium">Customer</th>
                <th className="px-3 py-3 text-left font-medium">Address</th>
                <th className="px-3 py-3 text-left font-medium">Phone</th>
                <th className="px-3 py-3 text-left font-medium">Joined</th>
                <th className="px-3 py-3 text-right font-medium">Orders</th>
                <th className="px-3 py-3 text-right font-medium">Returned</th>
                <th className="px-3 py-3 text-right font-medium">Total Paid</th>
                <th className="px-4 py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-medium">{c.name.split(" ").map(n => n[0]).join("")}</div>
                      <span className="text-sm font-medium">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">{c.address}</td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">{c.phone}</td>
                  <td className="px-3 py-3 font-mono text-sm text-muted-foreground">{c.joinDate}</td>
                  <td className="px-3 py-3 text-right font-mono text-sm">{c.totalOrders}</td>
                  <td className="px-3 py-3 text-right font-mono text-sm text-destructive">{c.returnedOrders}</td>
                  <td className="px-3 py-3 text-right font-mono text-sm">${c.totalPaid.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setViewItem(c)}><Eye className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditItem(c)}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteItem(c)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="mt-4 flex flex-col items-center justify-between gap-2 sm:flex-row">
        <span className="text-sm text-muted-foreground">Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of {filtered.length}</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" disabled={page === 0} onClick={() => setPage(page - 1)} className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
            <Button key={i} variant={page === i ? "default" : "outline"} size="icon" onClick={() => setPage(i)} className="h-8 w-8 text-xs">{i + 1}</Button>
          ))}
          <Button variant="outline" size="icon" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)} className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Customer Details</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-3">
            <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-sm font-medium">{viewItem.name.split(" ").map(n => n[0]).join("")}</div><div><p className="font-semibold">{viewItem.name}</p><p className="text-xs text-muted-foreground">{viewItem.phone}</p></div></div>
            <p className="text-sm">Address: {viewItem.address}</p><p className="text-sm">Joined: {viewItem.joinDate}</p>
            <p className="text-sm">Orders: {viewItem.totalOrders} | Returned: {viewItem.returnedOrders}</p>
            <p className="text-sm font-mono font-medium">Total Paid: ${viewItem.totalPaid.toLocaleString()}</p>
          </div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Edit Customer</DialogTitle></DialogHeader>
          {editItem && <div className="space-y-4">
            <div className="space-y-2"><Label>Name</Label><Input defaultValue={editItem.name} className="bg-secondary border-border" /></div>
            <div className="space-y-2"><Label>Phone</Label><Input defaultValue={editItem.phone} className="bg-secondary border-border" /></div>
            <div className="space-y-2"><Label>Address</Label><Input defaultValue={editItem.address} className="bg-secondary border-border" /></div>
            <Button className="w-full" onClick={() => setEditItem(null)}>Save</Button>
          </div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Delete Customer</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Delete <strong>{deleteItem?.name}</strong>?</p>
          <div className="flex gap-2 justify-end"><Button variant="outline" onClick={() => setDeleteItem(null)}>Cancel</Button><Button variant="destructive" onClick={() => setDeleteItem(null)}>Delete</Button></div>
        </DialogContent>
      </Dialog>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent><DialogHeader><DialogTitle>Add Customer</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Name</Label><Input placeholder="Full name" className="bg-secondary border-border" /></div>
            <div className="space-y-2"><Label>Phone</Label><Input placeholder="+1 (555) 000-0000" className="bg-secondary border-border" /></div>
            <div className="space-y-2"><Label>Address</Label><Input placeholder="City, State" className="bg-secondary border-border" /></div>
            <Button className="w-full" onClick={() => setAddOpen(false)}>Create Customer</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { allProducts } from "@/lib/mock-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, ChevronLeft, ChevronRight, Eye, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const PAGE_SIZE = 10;

const productStatusStyles: Record<string, string> = {
  active: "bg-success/10 text-success border-success/20",
  draft: "bg-muted text-muted-foreground border-border",
  archived: "bg-destructive/10 text-destructive border-destructive/20",
};

const missingProducts = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: ["Laptop Stand", "USB Hub", "Mouse Pad", "Webcam", "Cable Kit"][i % 5],
  image: "/placeholder.svg",
  missingDate: `2026-03-${String(10 - (i % 10)).padStart(2, "0")}`,
  price: Math.round(Math.random() * 200 + 20),
  note: i % 3 === 0 ? "Damaged in warehouse" : "",
}));

export default function ProductsPage() {
  const location = useLocation();
  const isMissing = location.pathname === "/products/missing";
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [viewItem, setViewItem] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [addOpen, setAddOpen] = useState(false);

  if (isMissing) {
    const filteredMissing = missingProducts.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()));
    const paginatedMissing = filteredMissing.slice(page * 8, (page + 1) * 8);
    return (
      <AppLayout>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
          <div><h1 className="text-2xl font-semibold">Missing Products</h1><p className="text-sm text-muted-foreground">{filteredMissing.length} items</p></div>
          <Button className="gap-2" onClick={() => setAddOpen(true)}><Plus className="h-4 w-4" /> Report Missing</Button>
        </div>
        <div className="mb-4 relative w-full sm:w-64"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} className="pl-9 bg-secondary border-border" /></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in stagger-1">
          {paginatedMissing.map((p) => (
            <Card key={p.id} className="border-border bg-card hover:shadow-lg transition-all hover:-translate-y-0.5">
              <CardContent className="p-4">
                <div className="h-32 rounded bg-secondary mb-3" />
                <h3 className="text-sm font-medium">{p.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">Missing: {p.missingDate}</p>
                <p className="text-sm font-mono font-medium mt-1">${p.price}</p>
                {p.note && <p className="text-xs text-muted-foreground mt-1 italic">{p.note}</p>}
                <div className="flex gap-1 mt-3">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setViewItem(p)}><Eye className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditItem(p)}><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteItem(p)}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Dialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
          <DialogContent><DialogHeader><DialogTitle>Delete</DialogTitle></DialogHeader>
            <p className="text-sm text-muted-foreground">Delete <strong>{deleteItem?.name}</strong>?</p>
            <div className="flex gap-2 justify-end"><Button variant="outline" onClick={() => setDeleteItem(null)}>Cancel</Button><Button variant="destructive" onClick={() => setDeleteItem(null)}>Delete</Button></div>
          </DialogContent>
        </Dialog>
      </AppLayout>
    );
  }

  const filtered = allProducts.filter((p) => {
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const categories = [...new Set(allProducts.map((p) => p.category))];

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
        <div><h1 className="text-2xl font-semibold">Products</h1><p className="text-sm text-muted-foreground">{filtered.length} products</p></div>
        <Button className="gap-2" onClick={() => setAddOpen(true)}><Plus className="h-4 w-4" /> Add Product</Button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3 animate-fade-in stagger-1">
        <div className="relative w-full sm:w-64"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search products..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} className="pl-9 bg-secondary border-border" /></div>
        <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); setPage(0); }}>
          <SelectTrigger className="w-40 bg-secondary border-border"><SelectValue placeholder="All Categories" /></SelectTrigger>
          <SelectContent><SelectItem value="all">All Categories</SelectItem>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      <Card className="border-border bg-card animate-fade-in stagger-2">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border text-[11px] text-muted-foreground">
                <th className="px-4 py-3 text-left font-medium">Product</th>
                <th className="px-3 py-3 text-left font-medium">SKU</th>
                <th className="px-3 py-3 text-left font-medium">Category</th>
                <th className="px-3 py-3 text-right font-medium">Price</th>
                <th className="px-3 py-3 text-right font-medium">Stock</th>
                <th className="px-3 py-3 text-right font-medium">Sold</th>
                <th className="px-3 py-3 text-center font-medium">Status</th>
                <th className="px-4 py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium">{p.name}</td>
                  <td className="px-3 py-3 font-mono text-sm text-muted-foreground">{p.sku}</td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">{p.category}</td>
                  <td className="px-3 py-3 text-right font-mono text-sm">${p.price.toFixed(2)}</td>
                  <td className="px-3 py-3 text-right font-mono text-sm">{p.stock}</td>
                  <td className="px-3 py-3 text-right font-mono text-sm">{p.sold.toLocaleString()}</td>
                  <td className="px-3 py-3 text-center">
                    <span className={cn("inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-medium capitalize", productStatusStyles[p.status])}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setViewItem(p)}><Eye className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditItem(p)}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteItem(p)}><Trash2 className="h-3.5 w-3.5" /></Button>
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

      {/* View Modal */}
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Product Details</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-3"><p className="text-lg font-semibold">{viewItem.name}</p><p className="text-sm text-muted-foreground">SKU: {viewItem.sku}</p><p className="text-sm">Category: {viewItem.category}</p><p className="text-sm font-mono">Price: ${viewItem.price?.toFixed(2)}</p><p className="text-sm">Stock: {viewItem.stock} | Sold: {viewItem.sold}</p></div>}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Edit Product</DialogTitle></DialogHeader>
          {editItem && <div className="space-y-4">
            <div className="space-y-2"><Label>Name</Label><Input defaultValue={editItem.name} className="bg-secondary border-border" /></div>
            <div className="space-y-2"><Label>Price</Label><Input defaultValue={editItem.price} type="number" className="bg-secondary border-border" /></div>
            <Button className="w-full" onClick={() => setEditItem(null)}>Save</Button>
          </div>}
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Delete Product</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Delete <strong>{deleteItem?.name}</strong>?</p>
          <div className="flex gap-2 justify-end"><Button variant="outline" onClick={() => setDeleteItem(null)}>Cancel</Button><Button variant="destructive" onClick={() => setDeleteItem(null)}>Delete</Button></div>
        </DialogContent>
      </Dialog>

      {/* Add Modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent><DialogHeader><DialogTitle>Add Product</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Name</Label><Input placeholder="Product name" className="bg-secondary border-border" /></div>
            <div className="space-y-2"><Label>SKU</Label><Input placeholder="SKU-0001" className="bg-secondary border-border" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Price</Label><Input type="number" placeholder="0.00" className="bg-secondary border-border" /></div>
              <div className="space-y-2"><Label>Stock</Label><Input type="number" placeholder="0" className="bg-secondary border-border" /></div>
            </div>
            <Button className="w-full" onClick={() => setAddOpen(false)}>Create Product</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}

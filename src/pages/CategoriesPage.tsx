import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

const categories = Array.from({ length: 25 }, (_, i) => {
  const names = [
    "Digital Devices",
    "Clothing",
    "Sports",
    "Home & Garden",
    "Beauty",
    "Toys",
    "Books",
    "FastFoods",
    "Automotive",
    "Jewelry",
  ];
  const parents = ["Electronics", "", "", "", "", "", "", "Food", "", ""];
  const childrenData = [
    ["Phones", "Laptops"],
    ["Men", "Women"],
    ["Running", "Gym"],
    ["Furniture"],
    ["Skincare"],
    [],
    ["Fiction"],
    ["Snacks"],
    ["Parts"],
    ["Rings"],
  ];
  const businesses = [
    ["Acme Store"],
    ["Acme Store", "Global Mart"],
    ["Acme Store"],
    ["Global Mart"],
    ["Acme Store", "Global Mart"],
  ];
  return {
    id: i + 1,
    name: names[i % names.length],
    image: `/placeholder.svg`,
    parent: parents[i % parents.length] || "—",
    children: childrenData[i % childrenData.length],
    businesses: businesses[i % businesses.length],
  };
});

const PAGE_SIZE = 10;

export default function CategoriesPage() {
  const [search, setSearch] = useState("");
  const [sortBiz, setSortBiz] = useState("all");
  const [page, setPage] = useState(0);
  const [viewItem, setViewItem] = useState<(typeof categories)[0] | null>(null);
  const [editItem, setEditItem] = useState<(typeof categories)[0] | null>(null);
  const [deleteItem, setDeleteItem] = useState<(typeof categories)[0] | null>(
    null,
  );
  const [addOpen, setAddOpen] = useState(false);

  const filtered = categories.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (sortBiz !== "all" && !c.businesses.includes(sortBiz)) return false;
    return true;
  });

  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} categories
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  placeholder="Category name"
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Parent Category</Label>
                <Select>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    {["None", "Electronics", "Clothing", "Sports"].map((c) => (
                      <SelectItem key={c} value={c.toLowerCase()}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={() => setAddOpen(false)}>
                Create Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3 animate-fade-in stagger-1">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="pl-9 bg-secondary border-border"
          />
        </div>
        <Select
          value={sortBiz}
          onValueChange={(v) => {
            setSortBiz(v);
            setPage(0);
          }}
        >
          <SelectTrigger className="w-40 bg-secondary border-border">
            <SelectValue placeholder="All Businesses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Businesses</SelectItem>
            <SelectItem value="Acme Store">Acme Store</SelectItem>
            <SelectItem value="Global Mart">Global Mart</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border-border bg-card animate-fade-in stagger-2">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border text-[11px] text-muted-foreground">
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-3 py-3 text-left font-medium">Image</th>
                <th className="px-3 py-3 text-left font-medium">Parent</th>
                <th className="px-3 py-3 text-left font-medium">Children</th>
                <th className="px-3 py-3 text-left font-medium">Businesses</th>
                <th className="px-4 py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium">{c.name}</td>
                  <td className="px-3 py-3">
                    <div className="h-8 w-8 rounded bg-secondary" />
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">
                    {c.parent}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-1">
                      {c.children.map((ch) => (
                        <Badge
                          key={ch}
                          variant="secondary"
                          className="text-[10px]"
                        >
                          {ch}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-1">
                      {c.businesses.map((b) => (
                        <Badge
                          key={b}
                          variant="outline"
                          className="text-[10px]"
                        >
                          {b}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setViewItem(c)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setEditItem(c)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={() => setDeleteItem(c)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
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

      {/* View Modal */}
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Category Details</DialogTitle>
          </DialogHeader>
          {viewItem && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-lg bg-secondary" />
                <div>
                  <h3 className="text-lg font-semibold">{viewItem.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Parent: {viewItem.parent}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">
                  Children
                </Label>
                <div className="mt-1 flex flex-wrap gap-1">
                  {viewItem.children.length ? (
                    viewItem.children.map((ch) => (
                      <Badge key={ch} variant="secondary">
                        {ch}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">None</span>
                  )}
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">
                  Businesses
                </Label>
                <div className="mt-1 flex flex-wrap gap-1">
                  {viewItem.businesses.map((b) => (
                    <Badge key={b} variant="outline">
                      {b}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          {editItem && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  defaultValue={editItem.name}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Parent Category</Label>
                <Select defaultValue={editItem.parent.toLowerCase()}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["—", "Electronics", "Clothing", "Sports"].map((c) => (
                      <SelectItem key={c} value={c.toLowerCase()}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={() => setEditItem(null)}>
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete <strong>{deleteItem?.name}</strong>?
            This action cannot be undone.
          </p>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setDeleteItem(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setDeleteItem(null)}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}

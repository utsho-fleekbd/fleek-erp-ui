import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 8;

// Mock data generators
const businesses = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: [
    "Acme Store",
    "Global Mart",
    "FashionHub",
    "TechWorld",
    "HomeStyle",
    "SportZone",
  ][i % 6],
  logo: `https://picsum.photos/seed/product-${Math.random() * i}/300`,
  phone: `+880 1${i}00-000000`,
  email: `biz${i}@example.com`,
  location: ["Dhaka", "Chittagong", "Sylhet"][i % 3],
  shippingPattern: ["Standard", "Express", "Same Day"][i % 3],
  insideDhaka: [60, 80, 100][i % 3],
  outsideDhaka: [120, 150, 200][i % 3],
}));

const warehouses = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: ["Main Warehouse", "West Hub", "South Depot", "North Center"][i % 4],
  location: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi"][i % 4],
  phone: `+880 1${i}11-111111`,
  status: i % 5 === 3 ? "inactive" : "active",
}));

const brands = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: ["Nike", "Samsung", "Apple", "Adidas", "Sony"][i % 5],
  logo: `https://picsum.photos/seed/product-${Math.random() * i}/300`,
  description: "Premium brand with global reach.",
}));

const roles = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: [
    "Admin",
    "Manager",
    "Sales Rep",
    "Warehouse Staff",
    "Support Agent",
    "Viewer",
  ][i],
  permissions: [
    ["All"],
    ["Orders", "Products", "Customers"],
    ["Orders", "Customers"],
    ["Inventory"],
    ["Orders", "Customers"],
    ["View Only"],
  ][i],
  description: [
    "Full access",
    "Manage operations",
    "Handle sales",
    "Stock management",
    "Customer support",
    "Read-only",
  ][i],
}));

const employees = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: [
    "John Doe",
    "Jane Smith",
    "Bob Wilson",
    "Alice Brown",
    "Charlie Davis",
  ][i % 5],
  email: `emp${i}@example.com`,
  phone: `+880 1${i}22-222222`,
  status: i % 6 === 4 ? "inactive" : "active",
  role: ["Admin", "Manager", "Sales Rep", "Warehouse Staff", "Support Agent"][
    i % 5
  ],
  photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${
    ["John Doe", "Jane Smith", "Bob Wilson", "Alice Brown", "Charlie Davis"][
      i % 5
    ]
  }`,
}));

const suppliers = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: [
    "TechParts Co.",
    "FashionHub Ltd.",
    "SportGear Inc.",
    "HomeStyle",
    "BeautyWorks",
  ][i % 5],
  email: `supplier${i}@example.com`,
  phone: `+880 1${i}33-333333`,
  description: "Reliable supplier with competitive pricing.",
  status: i % 4 === 3 ? "inactive" : "active",
  location: ["Dhaka", "Chittagong", "Sylhet"][i % 3],
  photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${
    [
      "TechParts Co.",
      "FashionHub Ltd.",
      "SportGear Inc.",
      "HomeStyle",
      "BeautyWorks",
    ][i % 5]
  }`,
}));

const invoiceTemplates = [
  { id: 1, name: "Classic Invoice", image: "/placeholder.svg" },
  { id: 2, name: "Modern Invoice", image: "/placeholder.svg" },
  { id: 3, name: "Minimal Invoice", image: "/placeholder.svg" },
  { id: 4, name: "Professional", image: "/placeholder.svg" },
  { id: 5, name: "Corporate", image: "/placeholder.svg" },
  { id: 6, name: "Creative", image: "/placeholder.svg" },
];

const courierApis = [
  { id: 1, name: "Pathao", logo: "/placeholder.svg", enabled: true },
  { id: 2, name: "Steadfast", logo: "/placeholder.svg", enabled: true },
  { id: 3, name: "RedX", logo: "/placeholder.svg", enabled: false },
  { id: 4, name: "Paperfly", logo: "/placeholder.svg", enabled: false },
  { id: 5, name: "eCourier", logo: "/placeholder.svg", enabled: true },
];

const settingsTabs = [
  { value: "business", label: "Business", path: "/settings/business" },
  { value: "warehouse", label: "Warehouse", path: "/settings/warehouse" },
  { value: "brand", label: "Brand", path: "/settings/brand" },
  { value: "role", label: "Role", path: "/settings/role" },
  { value: "employee", label: "Employee", path: "/settings/employee" },
  { value: "supplier", label: "Supplier", path: "/settings/supplier" },
  { value: "invoice", label: "Invoice", path: "/settings/invoice" },
  { value: "courier-api", label: "Courier API", path: "/settings/courier-api" },
];

function DataTable({
  columns,
  data,
  onView,
  onEdit,
  onDelete,
  searchPlaceholder = "Search...",
  onAdd,
  addLabel = "Add",
}: any) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const filtered = data.filter((item: any) => {
    if (!search) return true;
    return Object.values(item).some((v: any) =>
      String(v).toLowerCase().includes(search.toLowerCase()),
    );
  });
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="pl-9 bg-secondary border-border"
          />
        </div>
        {onAdd && (
          <Button className="gap-2 ml-auto" onClick={onAdd}>
            <Plus className="h-4 w-4" /> {addLabel}
          </Button>
        )}
      </div>
      <Card className="border-border bg-card">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border text-[11px] text-muted-foreground">
                {columns.map((col: any) => (
                  <th
                    key={col.key}
                    className={cn(
                      "px-4 py-3 font-medium",
                      col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                          ? "text-center"
                          : "text-left",
                    )}
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((item: any) => (
                <tr
                  key={item.id}
                  className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                >
                  {columns.map((col: any) => (
                    <td
                      key={col.key}
                      className={cn(
                        "px-4 py-3 text-sm",
                        col.align === "right"
                          ? "text-right"
                          : col.align === "center"
                            ? "text-center"
                            : "",
                      )}
                    >
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onView?.(item)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onEdit?.(item)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={() => onDelete?.(item)}
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
      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
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
      )}
    </div>
  );
}

export default function SettingsPage() {
  const location = useLocation();
  const currentTab =
    settingsTabs.find((t) => t.path === location.pathname)?.value || "business";
  const [viewItem, setViewItem] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [viewInvoice, setViewInvoice] = useState<any>(null);

  const StatusCell = ({ status }: { status: string }) => (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-medium capitalize",
        status === "active"
          ? "bg-success/10 text-success border-success/20"
          : "bg-muted text-muted-foreground border-border",
      )}
    >
      {status}
    </span>
  );

  return (
    <AppLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your application settings
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 animate-fade-in stagger-1">
        {settingsTabs.map((tab) => (
          <Link key={tab.value} to={tab.path}>
            <Button
              variant={currentTab === tab.value ? "default" : "outline"}
              size="sm"
              className="text-xs"
            >
              {tab.label}
            </Button>
          </Link>
        ))}
      </div>

      {/* Business */}
      {currentTab === "business" && (
        <DataTable
          searchPlaceholder="Search businesses..."
          onAdd={() => setAddOpen(true)}
          addLabel="Add Business"
          onView={setViewItem}
          onEdit={setEditItem}
          onDelete={setDeleteItem}
          columns={[
            {
              key: "logo",
              label: "Logo",
              render: () => <div className="h-8 w-8 rounded bg-secondary" />,
            },
            { key: "name", label: "Name" },
            { key: "phone", label: "Phone" },
            { key: "email", label: "Email" },
            { key: "location", label: "Location" },
            { key: "shippingPattern", label: "Shipping" },
            {
              key: "insideDhaka",
              label: "Inside Dhaka",
              align: "right",
              render: (r: any) => `৳${r.insideDhaka}`,
            },
            {
              key: "outsideDhaka",
              label: "Outside Dhaka",
              align: "right",
              render: (r: any) => `৳${r.outsideDhaka}`,
            },
          ]}
          data={businesses}
        />
      )}

      {/* Warehouse */}
      {currentTab === "warehouse" && (
        <DataTable
          searchPlaceholder="Search warehouses..."
          onAdd={() => setAddOpen(true)}
          addLabel="Add Warehouse"
          onView={setViewItem}
          onEdit={setEditItem}
          onDelete={setDeleteItem}
          columns={[
            { key: "name", label: "Name" },
            { key: "location", label: "Location" },
            { key: "phone", label: "Phone" },
            {
              key: "status",
              label: "Status",
              align: "center",
              render: (r: any) => <StatusCell status={r.status} />,
            },
          ]}
          data={warehouses}
        />
      )}

      {/* Brand */}
      {currentTab === "brand" && (
        <DataTable
          searchPlaceholder="Search brands..."
          onAdd={() => setAddOpen(true)}
          addLabel="Add Brand"
          onView={setViewItem}
          onEdit={setEditItem}
          onDelete={setDeleteItem}
          columns={[
            { key: "name", label: "Name" },
            {
              key: "logo",
              label: "Logo",
              render: () => <div className="h-8 w-8 rounded bg-secondary" />,
            },
            { key: "description", label: "Description" },
          ]}
          data={brands}
        />
      )}

      {/* Role */}
      {currentTab === "role" && (
        <DataTable
          searchPlaceholder="Search roles..."
          onAdd={() => setAddOpen(true)}
          addLabel="Add Role"
          onView={setViewItem}
          onEdit={setEditItem}
          onDelete={setDeleteItem}
          columns={[
            { key: "name", label: "Role Name" },
            {
              key: "permissions",
              label: "Permissions",
              render: (r: any) => (
                <div className="flex flex-wrap gap-1">
                  {r.permissions.map((p: string) => (
                    <Badge key={p} variant="secondary" className="text-[10px]">
                      {p}
                    </Badge>
                  ))}
                </div>
              ),
            },
            { key: "description", label: "Description" },
          ]}
          data={roles}
        />
      )}

      {/* Employee */}
      {currentTab === "employee" && (
        <DataTable
          searchPlaceholder="Search employees..."
          onAdd={() => setAddOpen(true)}
          addLabel="Add Employee"
          onView={setViewItem}
          onEdit={setEditItem}
          onDelete={setDeleteItem}
          columns={[
            {
              key: "photo",
              label: "Photo",
              render: () => (
                <div className="h-8 w-8 rounded-full bg-secondary" />
              ),
            },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            {
              key: "status",
              label: "Status",
              align: "center",
              render: (r: any) => <StatusCell status={r.status} />,
            },
            { key: "role", label: "Role" },
          ]}
          data={employees}
        />
      )}

      {/* Supplier */}
      {currentTab === "supplier" && (
        <DataTable
          searchPlaceholder="Search suppliers..."
          onAdd={() => setAddOpen(true)}
          addLabel="Add Supplier"
          onView={setViewItem}
          onEdit={setEditItem}
          onDelete={setDeleteItem}
          columns={[
            {
              key: "photo",
              label: "Photo",
              render: () => (
                <div className="h-8 w-8 rounded-full bg-secondary" />
              ),
            },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            { key: "description", label: "Description" },
            {
              key: "status",
              label: "Status",
              align: "center",
              render: (r: any) => <StatusCell status={r.status} />,
            },
            { key: "location", label: "Location" },
          ]}
          data={suppliers}
        />
      )}

      {/* Invoice */}
      {currentTab === "invoice" && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex flex-wrap items-center gap-3">
            <Select>
              <SelectTrigger className="w-40 bg-secondary border-border">
                <SelectValue placeholder="Filter by Product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40 bg-secondary border-border">
                <SelectValue placeholder="Filter by Business" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Businesses</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {invoiceTemplates.map((inv) => (
              <Card
                key={inv.id}
                className="border-border bg-card group cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5 relative overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="h-48 bg-secondary relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/60">
                      <Button size="sm" onClick={() => setViewInvoice(inv)}>
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-center">
                      {inv.name}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Courier API */}
      {currentTab === "courier-api" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
          {courierApis.map((courier) => (
            <Card key={courier.id} className="border-border bg-card">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-secondary" />
                    <span className="text-sm font-semibold">
                      {courier.name}
                    </span>
                  </div>
                  <Switch defaultChecked={courier.enabled} />
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Account Name</Label>
                    <Input
                      placeholder="Account name"
                      className="h-8 bg-secondary border-border text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Contact No.</Label>
                    <Input
                      placeholder="+880..."
                      className="h-8 bg-secondary border-border text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">API Key</Label>
                    <Input
                      placeholder="Enter API key"
                      className="h-8 bg-secondary border-border text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Secret Key</Label>
                    <Input
                      placeholder="Enter secret key"
                      type="password"
                      className="h-8 bg-secondary border-border text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Webhook URL</Label>
                    <Input
                      placeholder="https://..."
                      className="h-8 bg-secondary border-border text-xs"
                    />
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  Save Configuration
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* View Modal */}
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Details</DialogTitle>
          </DialogHeader>
          {viewItem && (
            <div className="space-y-2">
              {Object.entries(viewItem)
                .filter(([k]) => k !== "id")
                .map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-sm text-muted-foreground capitalize">
                      {k}
                    </span>
                    <span className="text-sm font-medium">
                      {Array.isArray(v)
                        ? (v as string[]).join(", ")
                        : String(v)}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit</DialogTitle>
          </DialogHeader>
          {editItem && (
            <div className="space-y-4">
              {Object.entries(editItem)
                .filter(([k]) => !["id", "logo", "photo", "image"].includes(k))
                .map(([k, v]) => (
                  <div key={k} className="space-y-2">
                    <Label className="capitalize">{k}</Label>
                    <Input
                      defaultValue={
                        Array.isArray(v)
                          ? (v as string[]).join(", ")
                          : String(v)
                      }
                      className="bg-secondary border-border"
                    />
                  </div>
                ))}
              <Button className="w-full" onClick={() => setEditItem(null)}>
                Save
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete <strong>{deleteItem?.name}</strong>?
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

      {/* Add Modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                placeholder="Enter name"
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                placeholder="email@example.com"
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                placeholder="+880..."
                className="bg-secondary border-border"
              />
            </div>
            <Button className="w-full" onClick={() => setAddOpen(false)}>
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Invoice View Modal */}
      <Dialog open={!!viewInvoice} onOpenChange={() => setViewInvoice(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{viewInvoice?.name}</DialogTitle>
          </DialogHeader>
          <div className="h-64 rounded bg-secondary flex items-center justify-center text-muted-foreground">
            Invoice Preview
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}

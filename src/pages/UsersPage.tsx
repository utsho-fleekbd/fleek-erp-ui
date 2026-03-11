import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Shield, Plus, Check } from "lucide-react";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@acme.com",
    role: "Admin",
    status: "active",
    lastLogin: "2026-03-10 09:15",
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah@acme.com",
    role: "Manager",
    status: "active",
    lastLogin: "2026-03-10 08:30",
  },
  {
    id: 3,
    name: "Alex Turner",
    email: "alex@acme.com",
    role: "Staff",
    status: "active",
    lastLogin: "2026-03-09 16:45",
  },
  {
    id: 4,
    name: "Maria Garcia",
    email: "maria@acme.com",
    role: "Staff",
    status: "inactive",
    lastLogin: "2026-02-28 12:00",
  },
  {
    id: 5,
    name: "David Kim",
    email: "david@acme.com",
    role: "Viewer",
    status: "active",
    lastLogin: "2026-03-10 07:00",
  },
];

const roles = [
  { id: 1, name: "Admin", users: 1, desc: "Full system access" },
  {
    id: 2,
    name: "Manager",
    users: 2,
    desc: "Manage orders, products, and customers",
  },
  {
    id: 3,
    name: "Staff",
    users: 5,
    desc: "Process orders and manage inventory",
  },
  { id: 4, name: "Viewer", users: 3, desc: "Read-only access to dashboards" },
];

const modules = [
  "Dashboard",
  "Orders",
  "Products",
  "Inventory",
  "Customers",
  "Finance",
  "Marketing",
  "Reports",
  "Settings",
];
const actions = ["View", "Create", "Edit", "Delete"];

// Permission matrix: Admin=all, Manager=most, Staff=some, Viewer=view-only
const permissionMatrix: Record<string, Record<string, boolean[]>> = {
  Admin: Object.fromEntries(modules.map((m) => [m, [true, true, true, true]])),
  Manager: Object.fromEntries(
    modules.map((m, i) => [
      m,
      i < 7 ? [true, true, true, i < 5] : [true, false, false, false],
    ]),
  ),
  Staff: Object.fromEntries(
    modules.map((m, i) => [
      m,
      i < 5 ? [true, i < 4, i < 3, false] : [true, false, false, false],
    ]),
  ),
  Viewer: Object.fromEntries(
    modules.map((m) => [m, [true, false, false, false]]),
  ),
};

const businessUsage = [
  { label: "Products", used: 245, limit: 500 },
  { label: "Websites", used: 2, limit: 5 },
  { label: "SMS Credits", used: 5720, limit: 10000 },
  { label: "Team Members", used: 5, limit: 10 },
  { label: "Storage", used: 2.4, limit: 5, unit: "GB" },
];

const packages = [
  {
    id: 1,
    name: "Starter",
    price: 29,
    products: 100,
    websites: 1,
    sms: 1000,
    users: 3,
    modules: ["Orders", "Products", "Inventory"],
  },
  {
    id: 2,
    name: "Professional",
    price: 79,
    products: 500,
    websites: 5,
    sms: 10000,
    users: 10,
    modules: ["All Modules"],
    current: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: 199,
    products: -1,
    websites: -1,
    sms: 50000,
    users: -1,
    modules: ["All Modules + Priority Support"],
  },
];

export default function UsersPage() {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Users, Roles & Business</h1>
        <p className="text-sm text-muted-foreground">
          Manage team access and business settings
        </p>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-end">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add User
            </Button>
          </div>
          <Card className="border-border bg-card">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-[11px] text-muted-foreground">
                    <th className="px-5 py-3 text-left font-medium">User</th>
                    <th className="px-3 py-3 text-left font-medium">Role</th>
                    <th className="px-3 py-3 text-center font-medium">
                      Status
                    </th>
                    <th className="px-5 py-3 text-left font-medium">
                      Last Login
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                            {u.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{u.name}</div>
                            <div className="text-[10px] text-muted-foreground">
                              {u.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span className="inline-flex items-center rounded border border-primary/20 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                          {u.role}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span
                          className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-medium ${
                            u.status === "active"
                              ? "border-success/20 bg-success/10 text-success"
                              : "border-border bg-muted text-muted-foreground"
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-mono text-sm text-muted-foreground">
                        {u.lastLogin}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="mb-4 grid gap-4 md:grid-cols-4">
            {roles.map((r) => (
              <Card key={r.id} className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{r.name}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{r.desc}</p>
                  <p className="mt-2 font-mono text-xs text-muted-foreground">
                    {r.users} users
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Permission Matrix */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Permission Matrix — Manager Role
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-[11px] text-muted-foreground">
                    <th className="px-5 py-3 text-left font-medium">Module</th>
                    {actions.map((a) => (
                      <th key={a} className="px-4 py-3 text-center font-medium">
                        {a}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modules.map((m) => (
                    <tr
                      key={m}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-5 py-2.5 text-sm">{m}</td>
                      {permissionMatrix["Manager"][m].map((checked, i) => (
                        <td key={i} className="px-4 py-2.5 text-center">
                          <Checkbox
                            checked={checked}
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-sm">Usage & Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {businessUsage.map((u) => (
                <div key={u.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span>{u.label}</span>
                    <span className="font-mono text-muted-foreground">
                      {u.used}
                      {u.unit ? ` ${u.unit}` : ""} /{" "}
                      {u.limit === -1 ? "∞" : u.limit}
                      {u.unit ? ` ${u.unit}` : ""}
                    </span>
                  </div>
                  <Progress
                    value={u.limit === -1 ? 10 : (u.used / u.limit) * 100}
                    className="h-1.5 [&>div]:rounded-none"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {packages.map((p) => (
              <Card
                key={p.id}
                className={`border-border bg-card ${p.current ? "ring-1 ring-primary" : ""}`}
              >
                <CardContent className="p-5">
                  {p.current && (
                    <span className="mb-2 inline-flex items-center rounded border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                      Current Plan
                    </span>
                  )}
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="mt-1 font-mono text-3xl font-bold">
                    ${p.price}
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-success" />{" "}
                      {p.products === -1 ? "Unlimited" : p.products} Products
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-success" />{" "}
                      {p.websites === -1 ? "Unlimited" : p.websites} Websites
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-success" />{" "}
                      {p.sms.toLocaleString()} SMS/mo
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-success" />{" "}
                      {p.users === -1 ? "Unlimited" : p.users} Team Members
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-success" />{" "}
                      {p.modules.join(", ")}
                    </li>
                  </ul>
                  <Button
                    className="mt-4 w-full"
                    variant={p.current ? "outline" : "default"}
                  >
                    {p.current ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}

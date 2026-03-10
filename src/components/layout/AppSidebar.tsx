import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, ShoppingCart, Package, Users, Warehouse, Truck,
  CreditCard, FileText, BarChart3, Settings, ChevronDown, ChevronRight,
  Globe, MessageSquare, Zap, Tag, DollarSign, Receipt, Bell,
  Shield, Building2, Layers, Bot, Megaphone, Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: { label: string; href: string }[];
}

const navigation: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  {
    label: "Orders", icon: ShoppingCart, children: [
      { label: "All Orders", href: "/orders" },
      { label: "Create Order", href: "/orders/create" },
    ],
  },
  {
    label: "Products", icon: Package, children: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/products/categories" },
      { label: "Create Product", href: "/products/create" },
    ],
  },
  {
    label: "Inventory", icon: Warehouse, children: [
      { label: "Stock Overview", href: "/inventory" },
      { label: "Warehouses", href: "/inventory/warehouses" },
      { label: "Stock Movements", href: "/inventory/movements" },
    ],
  },
  {
    label: "Customers", icon: Users, children: [
      { label: "All Customers", href: "/customers" },
      { label: "Suppliers", href: "/suppliers" },
    ],
  },
  {
    label: "Couriers", icon: Truck, children: [
      { label: "Companies", href: "/couriers" },
      { label: "Delivery Zones", href: "/couriers/zones" },
      { label: "Shipping Config", href: "/couriers/config" },
    ],
  },
  {
    label: "Finance", icon: DollarSign, children: [
      { label: "Accounts", href: "/finance/accounts" },
      { label: "Transactions", href: "/finance/transactions" },
      { label: "Expenses", href: "/finance/expenses" },
      { label: "Invoices", href: "/finance/invoices" },
    ],
  },
  {
    label: "Payments", icon: CreditCard, children: [
      { label: "Gateways", href: "/payments/gateways" },
      { label: "Settings", href: "/payments/settings" },
    ],
  },
  {
    label: "Marketing", icon: Megaphone, children: [
      { label: "SMS Campaigns", href: "/marketing/sms" },
      { label: "SMS Credits", href: "/marketing/credits" },
      { label: "Promotions", href: "/marketing/promotions" },
      { label: "AI Assistant", href: "/marketing/ai" },
    ],
  },
  {
    label: "Websites", icon: Globe, children: [
      { label: "My Websites", href: "/websites" },
      { label: "Templates", href: "/websites/templates" },
      { label: "AI Generator", href: "/websites/ai" },
    ],
  },
  { label: "Reports", icon: BarChart3, href: "/reports" },
  {
    label: "Users & Roles", icon: Shield, children: [
      { label: "Users", href: "/users" },
      { label: "Roles", href: "/users/roles" },
    ],
  },
  {
    label: "Business", icon: Building2, children: [
      { label: "Profile", href: "/business/profile" },
      { label: "Subscription", href: "/business/subscription" },
      { label: "Packages", href: "/business/packages" },
    ],
  },
  {
    label: "Settings", icon: Settings, children: [
      { label: "General", href: "/settings" },
      { label: "Security", href: "/settings/security" },
      { label: "Notifications", href: "/settings/notifications" },
      { label: "API Keys", href: "/settings/api-keys" },
      { label: "Branding", href: "/settings/branding" },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navigation.forEach((item) => {
      if (item.children?.some((child) => location.pathname === child.href)) {
        initial[item.label] = true;
      }
    });
    return initial;
  });

  const toggleExpand = (label: string) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
          <Zap className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-base font-semibold text-foreground">Fleek ERP</span>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-3">
        <nav className="flex flex-col gap-0.5">
          {navigation.map((item) => {
            const isActive = item.href
              ? location.pathname === item.href
              : item.children?.some((c) => location.pathname === c.href);
            const isOpen = expanded[item.label];

            if (item.href) {
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "flex h-9 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            }

            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleExpand(item.label)}
                  className={cn(
                    "flex h-9 w-full items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {isOpen ? (
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                  )}
                </button>
                {isOpen && (
                  <div className="ml-4 mt-0.5 flex flex-col gap-0.5 border-l border-sidebar-border pl-3">
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={cn(
                          "flex h-8 items-center rounded-md px-3 text-sm transition-colors",
                          location.pathname === child.href
                            ? "bg-sidebar-accent text-foreground font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
}

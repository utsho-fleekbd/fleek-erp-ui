import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Warehouse,
  Truck,
  CreditCard,
  FileText,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Globe,
  Zap,
  DollarSign,
  Megaphone,
  X,
  LogOut,
  User,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: { label: string; href: string }[];
}

const navigation: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  {
    label: "Settings",
    icon: Settings,
    children: [
      { label: "Business", href: "/settings/business" },
      { label: "Warehouse", href: "/settings/warehouse" },
      { label: "Brand", href: "/settings/brand" },
      { label: "Role", href: "/settings/role" },
      { label: "Employee", href: "/settings/employee" },
      { label: "Supplier", href: "/settings/supplier" },
      { label: "Invoice", href: "/settings/invoice" },
      { label: "Courier API", href: "/settings/courier-api" },
    ],
  },
  {
    label: "Products",
    icon: Package,
    children: [
      { label: "All Products", href: "/products" },
      { label: "Missing Products", href: "/products/missing" },
    ],
  },
  { label: "Categories", icon: Tag, href: "/categories" },
  { label: "Customers", icon: Users, href: "/customers" },
  {
    label: "Orders",
    icon: ShoppingCart,
    children: [{ label: "All Orders", href: "/orders" }],
  },
  {
    label: "Inventory",
    icon: Warehouse,
    children: [
      { label: "Stock", href: "/inventory" },
      { label: "Barcodes", href: "/inventory/barcodes" },
    ],
  },
  {
    label: "Couriers",
    icon: Truck,
    children: [
      { label: "Companies", href: "/couriers" },
      { label: "Delivery Zones", href: "/couriers/zones" },
      { label: "Shipping Config", href: "/couriers/config" },
    ],
  },
  {
    label: "Finance",
    icon: DollarSign,
    children: [
      { label: "Accounts", href: "/finance/accounts" },
      { label: "Transactions", href: "/finance/transactions" },
      { label: "Expenses", href: "/finance/expenses" },
      { label: "Invoices", href: "/finance/invoices" },
    ],
  },
  {
    label: "Marketing",
    icon: Megaphone,
    children: [
      { label: "SMS Campaigns", href: "/marketing/sms" },
      { label: "SMS Credits", href: "/marketing/credits" },
      { label: "Promotions", href: "/marketing/promotions" },
      { label: "AI Assistant", href: "/marketing/ai" },
    ],
  },
  {
    label: "Websites",
    icon: Globe,
    children: [
      { label: "My Websites", href: "/websites" },
      { label: "Templates", href: "/websites/templates" },
      { label: "AI Generator", href: "/websites/ai" },
    ],
  },
  { label: "Reports", icon: BarChart3, href: "/reports" },
];

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AppSidebar({ open, onClose }: AppSidebarProps) {
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

  useEffect(() => {
    const newExpanded: Record<string, boolean> = { ...expanded };
    navigation.forEach((item) => {
      if (item.children?.some((child) => location.pathname === child.href)) {
        newExpanded[item.label] = true;
      }
    });
    setExpanded(newExpanded);
  }, [location.pathname]);

  const toggleExpand = (label: string) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-base font-semibold text-foreground">
              Fleek ERP
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-muted-foreground hover:text-foreground lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
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
                    onClick={() => window.innerWidth < 1024 && onClose()}
                    className={cn(
                      "flex h-9 items-center gap-3 rounded-md px-3 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-sidebar-accent text-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
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
                      "flex h-9 w-full items-center gap-3 rounded-md px-3 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {isOpen ? (
                      <ChevronDown className="h-3.5 w-3.5 opacity-50 transition-transform duration-200" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 opacity-50 transition-transform duration-200" />
                    )}
                  </button>
                  <div
                    className={cn(
                      "ml-4 flex flex-col gap-0.5 border-l border-sidebar-border pl-3 overflow-hidden transition-all duration-300",
                      isOpen
                        ? "mt-0.5 max-h-96 opacity-100"
                        : "max-h-0 opacity-0",
                    )}
                  >
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={() => window.innerWidth < 1024 && onClose()}
                        className={cn(
                          "flex h-8 items-center rounded-md px-3 text-sm transition-colors duration-200",
                          location.pathname === child.href
                            ? "bg-sidebar-accent text-foreground font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
        </ScrollArea>

        {/* User section at bottom */}
        <div className="border-t border-sidebar-border p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  JD
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-foreground">
                    John Doe
                  </div>
                  <div className="text-[10px] text-muted-foreground">Admin</div>
                </div>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-48">
              <DropdownMenuItem className="gap-2">
                <User className="h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Settings className="h-4 w-4" /> Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-destructive">
                <LogOut className="h-4 w-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </>
  );
}

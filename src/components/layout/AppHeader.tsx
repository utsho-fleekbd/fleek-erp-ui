import { useState } from "react";
import { Search, Bell, Globe, ChevronDown, User, LogOut, Settings, Building2, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const notifications = [
  { id: 1, title: "New order received", desc: "Order #ORD-7291 from Sarah Chen", time: "2 min ago", read: false },
  { id: 2, title: "Low stock alert", desc: "Smart Watch Pro is running low (5 units)", time: "15 min ago", read: false },
  { id: 3, title: "Payment received", desc: "$567.80 via bKash", time: "1 hour ago", read: true },
  { id: 4, title: "Delivery completed", desc: "Order #ORD-7286 delivered successfully", time: "2 hours ago", read: true },
];

export function AppHeader() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-6">
      {/* Left: Search */}
      <div className="flex items-center gap-4">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders, products, customers..."
            className="h-9 border-border bg-secondary pl-9 text-sm placeholder:text-muted-foreground"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Workspace Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span className="text-sm">Acme Store</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-xs text-muted-foreground">Workspaces</DropdownMenuLabel>
            <DropdownMenuItem className="gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-[10px] font-bold text-primary-foreground">A</div>
              <div>
                <div className="text-sm font-medium">Acme Store</div>
                <div className="text-xs text-muted-foreground">$24.9K revenue</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-success text-[10px] font-bold text-success-foreground">G</div>
              <div>
                <div className="text-sm font-medium">Global Mart</div>
                <div className="text-xs text-muted-foreground">$18.3K revenue</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs text-muted-foreground">+ Create workspace</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Language */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>বাংলা</DropdownMenuItem>
            <DropdownMenuItem>العربية</DropdownMenuItem>
            <DropdownMenuItem>Español</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-sm font-semibold">Notifications</span>
              <Badge variant="secondary" className="text-[10px]">2 new</Badge>
            </div>
            <div className="max-h-72 overflow-auto">
              {notifications.map((n) => (
                <div key={n.id} className={`flex gap-3 border-b border-border px-4 py-3 last:border-0 ${!n.read ? 'bg-secondary/50' : ''}`}>
                  <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${!n.read ? 'bg-primary' : 'bg-transparent'}`} />
                  <div className="min-w-0">
                    <div className="text-sm font-medium">{n.title}</div>
                    <div className="text-xs text-muted-foreground">{n.desc}</div>
                    <div className="mt-1 text-[10px] text-muted-foreground">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border px-4 py-2 text-center">
              <button className="text-xs text-primary hover:underline">View all notifications</button>
            </div>
          </PopoverContent>
        </Popover>

        {/* User */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 pl-2 pr-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                JD
              </div>
              <div className="hidden text-left md:block">
                <div className="text-sm font-medium">John Doe</div>
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="font-normal">
              <div className="text-sm font-medium">John Doe</div>
              <div className="text-xs text-muted-foreground">john@acme.com</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2"><User className="h-4 w-4" /> Profile</DropdownMenuItem>
            <DropdownMenuItem className="gap-2"><Settings className="h-4 w-4" /> Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-destructive"><LogOut className="h-4 w-4" /> Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

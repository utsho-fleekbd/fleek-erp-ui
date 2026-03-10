import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Key, Bell, Palette, Globe, Copy } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your application preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader><CardTitle className="text-sm">General Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input defaultValue="Acme Store" className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <Label>Business Email</Label>
                  <Input defaultValue="contact@acme.com" className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern (UTC-5)</SelectItem>
                      <SelectItem value="pst">Pacific (UTC-8)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader><CardTitle className="text-sm">Security Settings</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Session Timeout</p>
                  <p className="text-xs text-muted-foreground">Auto-logout after inactivity</p>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-32 bg-secondary border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Login Notifications</p>
                  <p className="text-xs text-muted-foreground">Get notified on new logins</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader><CardTitle className="text-sm">Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "New Orders", desc: "When a new order is placed", enabled: true },
                { label: "Low Stock", desc: "When products fall below threshold", enabled: true },
                { label: "Payments", desc: "When payments are received", enabled: true },
                { label: "Deliveries", desc: "When orders are delivered", enabled: false },
                { label: "Returns", desc: "When returns are requested", enabled: true },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{n.label}</p>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  <Switch defaultChecked={n.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">API Keys</CardTitle>
                <Button size="sm" className="gap-2"><Key className="h-3.5 w-3.5" /> Generate Key</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Production Key", key: "sk_live_***************a4f2", created: "2026-01-15", status: "active" },
                { name: "Test Key", key: "sk_test_***************b3e1", created: "2026-02-20", status: "active" },
              ].map((k) => (
                <div key={k.name} className="flex items-center justify-between rounded border border-border bg-secondary p-4">
                  <div>
                    <p className="text-sm font-medium">{k.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">{k.key}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">Created {k.created}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8"><Copy className="h-3.5 w-3.5" /></Button>
                    <Button variant="destructive" size="sm">Revoke</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader><CardTitle className="text-sm">Brand Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Brand Name</Label>
                <Input defaultValue="Acme Store" className="bg-secondary border-border" />
              </div>
              <div className="space-y-2">
                <Label>Tagline</Label>
                <Input defaultValue="Quality products, delivered fast" className="bg-secondary border-border" />
              </div>
              <div className="space-y-2">
                <Label>Brand Color</Label>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded border border-border bg-primary" />
                  <Input defaultValue="#6366F1" className="w-32 bg-secondary border-border font-mono" />
                </div>
              </div>
              <Button>Save Branding</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}

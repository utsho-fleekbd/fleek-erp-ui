import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Plus, Bot, Sparkles, Layout, ShoppingBag, Laptop, Armchair, Pipette } from "lucide-react";
import { useState } from "react";

const websites = [
  { id: 1, name: "Acme Fashion", domain: "fashion.acme.com", template: "Fashion", status: "live", visitors: 12400, pages: 24 },
  { id: 2, name: "Tech Store", domain: "tech.acme.com", template: "Electronics", status: "live", visitors: 8900, pages: 18 },
  { id: 3, name: "Home Decor", domain: "home.acme.com", template: "Furniture", status: "draft", visitors: 0, pages: 12 },
];

const templates = [
  { id: 1, name: "Fashion Forward", category: "Fashion", desc: "Modern fashion e-commerce with lookbook style", icon: ShoppingBag },
  { id: 2, name: "TechVault", category: "Electronics", desc: "Clean electronics store with comparison features", icon: Laptop },
  { id: 3, name: "Casa Modern", category: "Furniture", desc: "Elegant furniture store with room visualization", icon: Armchair },
  { id: 4, name: "Glow Beauty", category: "Cosmetics", desc: "Minimalist beauty brand with product showcases", icon: Pipette },
];

const siteStatusStyles: Record<string, string> = {
  live: "border-success/20 bg-success/10 text-success",
  draft: "border-border bg-muted text-muted-foreground",
  maintenance: "border-warning/20 bg-warning/10 text-warning",
};

export default function WebsitesPage() {
  const [aiPrompt, setAiPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Websites</h1>
        <p className="text-sm text-muted-foreground">Manage your e-commerce websites</p>
      </div>

      <Tabs defaultValue="sites" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="sites">My Websites</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="ai">AI Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="sites" className="space-y-4">
          <div className="flex justify-end">
            <Button className="gap-2"><Plus className="h-4 w-4" /> Create Website</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {websites.map((w) => (
              <Card key={w.id} className="border-border bg-card">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{w.name}</p>
                      <p className="font-mono text-xs text-muted-foreground">{w.domain}</p>
                    </div>
                    <span className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-medium ${siteStatusStyles[w.status]}`}>
                      {w.status}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="font-mono text-lg font-semibold">{(w.visitors / 1000).toFixed(1)}K</p>
                      <p className="text-[10px] text-muted-foreground">Visitors</p>
                    </div>
                    <div>
                      <p className="font-mono text-lg font-semibold">{w.pages}</p>
                      <p className="text-[10px] text-muted-foreground">Pages</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{w.template}</p>
                      <p className="text-[10px] text-muted-foreground">Template</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs">Edit</Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">Preview</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {templates.map((t) => (
              <Card key={t.id} className="border-border bg-card hover:border-primary/50 cursor-pointer transition-colors">
                <CardContent className="p-5">
                  <div className="flex h-32 items-center justify-center rounded bg-secondary">
                    <t.icon className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium">{t.name}</p>
                    <span className="inline-flex items-center rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">{t.category}</span>
                    <p className="mt-2 text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 w-full text-xs">Use Template</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-primary" /> AI Website Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe your ideal e-commerce website... e.g., 'I want an online clothing store with a modern, minimalist design featuring a hero banner, featured collections, and a lookbook section.'"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="min-h-[120px] bg-secondary border-border"
              />
              <Button onClick={handleGenerate} disabled={generating || !aiPrompt.trim()} className="gap-2">
                <Bot className="h-4 w-4" />
                {generating ? "Generating..." : "Generate Website"}
              </Button>

              {generated && (
                <div className="space-y-4 pt-4">
                  <p className="text-sm font-medium">Generated Layout Preview:</p>
                  <div className="space-y-2">
                    {["Hero Banner — Full-width image with CTA", "Featured Collections — 3-column grid", "New Arrivals — Product carousel", "Lookbook Section — Masonry gallery", "Newsletter Signup — Email capture", "Footer — Links, social, contact"].map((section, i) => (
                      <div key={i} className="flex items-center gap-3 rounded border border-border bg-secondary p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 font-mono text-xs text-primary">{i + 1}</div>
                        <span className="text-sm">{section}</span>
                      </div>
                    ))}
                  </div>
                  <Button>Deploy Website</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}

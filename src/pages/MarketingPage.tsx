import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Send, Bot, Zap, CreditCard } from "lucide-react";
import { useState } from "react";

const campaigns = [
  {
    id: 1,
    name: "Spring Sale 2026",
    status: "completed",
    sent: 5420,
    delivered: 5280,
    clicked: 1240,
    date: "2026-02-15",
  },
  {
    id: 2,
    name: "New Collection Launch",
    status: "active",
    sent: 3200,
    delivered: 3100,
    clicked: 890,
    date: "2026-03-01",
  },
  {
    id: 3,
    name: "Flash Friday Deals",
    status: "scheduled",
    sent: 0,
    delivered: 0,
    clicked: 0,
    date: "2026-03-15",
  },
  {
    id: 4,
    name: "Loyalty Program",
    status: "draft",
    sent: 0,
    delivered: 0,
    clicked: 0,
    date: "",
  },
];

const smsPerformance = [
  { month: "Jan", sent: 4200, delivered: 4050, clicked: 980 },
  { month: "Feb", sent: 5100, delivered: 4920, clicked: 1240 },
  { month: "Mar", sent: 3800, delivered: 3680, clicked: 890 },
];

const chartTooltipStyle = {
  contentStyle: {
    background: "hsl(240 6% 10%)",
    border: "1px solid hsl(240 4% 20%)",
    borderRadius: "6px",
    fontSize: "12px",
  },
  labelStyle: { color: "hsl(240 5% 96%)" },
};

const campaignStatusStyles: Record<string, string> = {
  completed: "border-success/20 bg-success/10 text-success",
  active: "border-primary/20 bg-primary/10 text-primary",
  scheduled: "border-warning/20 bg-warning/10 text-warning",
  draft: "border-border bg-muted text-muted-foreground",
};

const promotions = [
  {
    id: 1,
    name: "Spring Sale",
    type: "Percentage",
    discount: "25%",
    start: "2026-03-01",
    end: "2026-03-15",
    status: "active",
  },
  {
    id: 2,
    name: "Flash Friday",
    type: "Fixed",
    discount: "$10",
    start: "2026-03-14",
    end: "2026-03-14",
    status: "scheduled",
  },
  {
    id: 3,
    name: "VIP Exclusive",
    type: "Percentage",
    discount: "40%",
    start: "2026-02-01",
    end: "2026-02-28",
    status: "expired",
  },
];

const promotionStatusStyles: Record<string, string> = {
  active: "border-success/20 bg-success/10 text-success",
  scheduled: "border-warning/20 bg-warning/10 text-warning",
  expired: "border-border bg-muted text-muted-foreground",
};

export default function MarketingPage() {
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResults, setAiResults] = useState<string[]>([]);

  const handleAiGenerate = () => {
    if (!aiPrompt.trim()) return;
    setAiResults([
      "🔥 Don't miss out! Get 30% OFF everything this weekend only. Shop now and save big!",
      "✨ New arrivals just dropped! Be the first to explore our latest collection. Limited stock!",
      "🎁 Exclusive deal for you: Buy 2, Get 1 FREE on all accessories. Use code: B2G1FREE",
    ]);
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Marketing</h1>
        <p className="text-sm text-muted-foreground">
          SMS campaigns, promotions, and AI assistant
        </p>
      </div>

      <Tabs defaultValue="sms" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="sms">SMS Campaigns</TabsTrigger>
          <TabsTrigger value="credits">SMS Credits</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="ai">AI Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="sms" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  SMS Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={smsPerformance}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(240 4% 20%)"
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "hsl(240 5% 65%)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip {...chartTooltipStyle} />
                    <Bar
                      dataKey="sent"
                      fill="hsl(239,84%,67%)"
                      name="Sent"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="clicked"
                      fill="hsl(142,71%,45%)"
                      name="Clicked"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-[11px] text-muted-foreground">
                      <th className="px-5 py-2 text-left font-medium">
                        Campaign
                      </th>
                      <th className="px-3 py-2 text-right font-medium">Sent</th>
                      <th className="px-5 py-2 text-center font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((c) => (
                      <tr
                        key={c.id}
                        className="border-b border-border last:border-0"
                      >
                        <td className="px-5 py-2.5">
                          <div className="text-sm font-medium">{c.name}</div>
                          {c.date && (
                            <div className="font-mono text-[10px] text-muted-foreground">
                              {c.date}
                            </div>
                          )}
                        </td>
                        <td className="px-3 py-2.5 text-right font-mono text-sm">
                          {c.sent > 0 ? c.sent.toLocaleString() : "—"}
                        </td>
                        <td className="px-5 py-2.5 text-center">
                          <span
                            className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-medium capitalize ${campaignStatusStyles[c.status]}`}
                          >
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="credits" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-border bg-card">
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground">
                  Available Credits
                </p>
                <p className="mt-1 font-mono text-3xl font-semibold">4,280</p>
                <Progress
                  value={42.8}
                  className="mt-3 h-1.5 [&>div]:rounded-none"
                />
                <p className="mt-1 text-[10px] text-muted-foreground">
                  4,280 of 10,000 remaining
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground">Used This Month</p>
                <p className="mt-1 font-mono text-3xl font-semibold">2,840</p>
                <p className="mt-2 text-[10px] text-muted-foreground">
                  Avg 94.6/day
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex h-full flex-col items-center justify-center p-5">
                <Button className="gap-2">
                  <CreditCard className="h-4 w-4" /> Recharge Credits
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="promotions" className="space-y-4">
          <div className="flex items-center justify-between">
            <div />
            <Button className="gap-2">
              <Zap className="h-4 w-4" /> Create Promotion
            </Button>
          </div>
          <Card className="border-border bg-card">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-[11px] text-muted-foreground">
                    <th className="px-5 py-3 text-left font-medium">
                      Promotion
                    </th>
                    <th className="px-3 py-3 text-left font-medium">Type</th>
                    <th className="px-3 py-3 text-right font-medium">
                      Discount
                    </th>
                    <th className="px-3 py-3 text-left font-medium">Period</th>
                    <th className="px-5 py-3 text-center font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {promotions.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-border last:border-0 hover:bg-secondary/50"
                    >
                      <td className="px-5 py-3 text-sm font-medium">
                        {p.name}
                      </td>
                      <td className="px-3 py-3 text-sm text-muted-foreground">
                        {p.type}
                      </td>
                      <td className="px-3 py-3 text-right font-mono text-sm">
                        {p.discount}
                      </td>
                      <td className="px-3 py-3 font-mono text-sm text-muted-foreground">
                        {p.start} → {p.end}
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span
                          className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-medium capitalize ${promotionStatusStyles[p.status]}`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Bot className="h-4 w-4 text-primary" /> AI Marketing Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="E.g., Write a promotional SMS for a 30% weekend sale on electronics..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="min-h-[100px] bg-secondary border-border"
                />
                <Button onClick={handleAiGenerate} className="gap-2">
                  <Send className="h-4 w-4" /> Generate
                </Button>
              </div>

              {aiResults.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    Generated Suggestions:
                  </p>
                  {aiResults.map((r, i) => (
                    <div
                      key={i}
                      className="rounded border border-border bg-secondary p-4"
                    >
                      <p className="text-sm">{r}</p>
                      <div className="mt-2 flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          Use This
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-muted-foreground"
                        >
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}

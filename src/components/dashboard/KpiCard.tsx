import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change: number;
  period: string;
  icon: LucideIcon;
}

export function KpiCard({ title, value, change, period, icon: Icon }: KpiCardProps) {
  const isPositive = change >= 0;

  return (
    <Card className="border-border bg-card">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">{title}</p>
            <p className="mt-1.5 font-mono text-2xl font-semibold text-foreground">{value}</p>
            <div className="mt-2 flex items-center gap-1.5">
              <div className={cn(
                "flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[11px] font-medium",
                isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              )}>
                {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(change)}%
              </div>
              <span className="text-[11px] text-muted-foreground">{period}</span>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded bg-secondary">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
